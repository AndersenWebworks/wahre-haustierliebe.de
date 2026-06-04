import http from 'node:http';
import net from 'node:net';
import tls from 'node:tls';

const config = {
  port: numberEnv('CONTACT_API_PORT', 8787),
  allowedOrigins: listEnv('CONTACT_ALLOWED_ORIGINS', ['https://wahre-haustierliebe.de']),
  smtpHost: requiredEnv('SMTP_HOST'),
  smtpPort: numberEnv('SMTP_PORT', 587),
  smtpSecure: boolEnv('SMTP_SECURE', false),
  smtpStartTls: boolEnv('SMTP_STARTTLS', true),
  smtpUser: requiredEnv('SMTP_USER'),
  smtpPass: requiredEnv('SMTP_PASS'),
  smtpFrom: requiredEnv('SMTP_FROM'),
  contactTo: requiredEnv('CONTACT_TO'),
  subjectPrefix: env('CONTACT_SUBJECT_PREFIX', 'Wa(h)re Haustier(liebe)'),
  maxBodyBytes: numberEnv('CONTACT_MAX_BODY_BYTES', 20000),
};

const server = http.createServer(async (request, response) => {
  try {
    if (request.method === 'OPTIONS') {
      writeCorsResponse(request, response, 204);
      return;
    }

    if (request.method !== 'POST' || request.url !== '/api/kontakt') {
      writeJson(request, response, 404, { ok: false, message: 'Nicht gefunden.' });
      return;
    }

    const payload = await readJsonBody(request);
    const result = normalizeContactPayload(payload);

    if (!result.ok) {
      writeJson(request, response, 400, { ok: false, message: result.message });
      return;
    }

    if (result.value.website) {
      writeJson(request, response, 200, { ok: true });
      return;
    }

    await sendContactMail(result.value);
    writeJson(request, response, 200, { ok: true });
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    writeJson(request, response, 500, {
      ok: false,
      message: 'Die Nachricht konnte gerade nicht gesendet werden.',
    });
  }
});

server.listen(config.port, () => {
  console.log(`Contact API listening on port ${config.port}`);
});

function env(name, fallback = '') {
  const value = process.env[name];
  return typeof value === 'string' && value.length > 0 ? value : fallback;
}

function requiredEnv(name) {
  const value = env(name);
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function numberEnv(name, fallback) {
  const value = env(name);
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) throw new Error(`Invalid number in ${name}`);
  return parsed;
}

function boolEnv(name, fallback) {
  const value = env(name);
  if (!value) return fallback;
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

function listEnv(name, fallback) {
  const value = env(name);
  if (!value) return fallback;
  return value.split(',').map((item) => item.trim()).filter(Boolean);
}

function originAllowed(origin) {
  if (!origin) return true;
  return config.allowedOrigins.includes(origin);
}

function corsHeaders(request) {
  const origin = request.headers.origin;
  const headers = {
    'Vary': 'Origin',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '86400',
  };

  if (originAllowed(origin)) {
    headers['Access-Control-Allow-Origin'] = origin || config.allowedOrigins[0];
  }

  return headers;
}

function writeCorsResponse(request, response, status) {
  response.writeHead(status, corsHeaders(request));
  response.end();
}

function writeJson(request, response, status, body) {
  response.writeHead(status, {
    ...corsHeaders(request),
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  response.end(JSON.stringify(body));
}

async function readJsonBody(request) {
  if (!originAllowed(request.headers.origin)) {
    throw new Error('Blocked origin');
  }

  let received = 0;
  const chunks = [];

  for await (const chunk of request) {
    received += chunk.length;
    if (received > config.maxBodyBytes) throw new Error('Request body too large');
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  return JSON.parse(raw);
}

function normalizeContactPayload(payload) {
  const value = {
    form: text(payload.form, 80),
    subject: text(payload.subject, 120),
    name: text(payload.name, 120),
    email: text(payload.email, 180),
    kontaktgrund: text(payload.kontaktgrund, 240),
    tierart: Array.isArray(payload.tierart) ? payload.tierart.map((item) => text(item, 80)).filter(Boolean) : [],
    message: text(payload.message, 2000),
    datenschutz: text(payload.datenschutz, 10),
    website: text(payload.website, 200),
    pageUrl: text(payload.pageUrl, 400),
    submittedAt: text(payload.submittedAt, 80),
  };

  if (!value.name) return { ok: false, message: 'Bitte gib deinen Namen an.' };
  if (!validEmail(value.email)) return { ok: false, message: 'Bitte gib eine gültige E-Mail-Adresse an.' };
  if (!value.message) return { ok: false, message: 'Bitte schreibe eine Nachricht.' };
  if (value.message.length < 20) return { ok: false, message: 'Bitte beschreibe dein Anliegen etwas genauer.' };
  if (value.datenschutz !== '1') return { ok: false, message: 'Bitte bestätige die Datenschutzerklärung.' };

  return { ok: true, value };
}

function text(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value.replaceAll('\r', ' ').replaceAll('\n', ' ').trim().slice(0, maxLength);
}

function validEmail(email) {
  if (!email || email.length > 180 || email.includes(' ')) return false;
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || !domain || domain.startsWith('.') || domain.endsWith('.')) return false;
  return domain.includes('.');
}

async function sendContactMail(contact) {
  const subject = headerValue(`${config.subjectPrefix}: ${contact.kontaktgrund || 'Kontaktanfrage'}`);
  const replyTo = headerValue(`${contact.name} <${contact.email}>`);
  const textBody = [
    'Neue Kontaktanfrage über Wa(h)re Haustier(liebe)',
    '',
    `Name: ${contact.name}`,
    `E-Mail: ${contact.email}`,
    `Kontaktgrund: ${contact.kontaktgrund || '-'}`,
    `Tierart: ${contact.tierart.length ? contact.tierart.join(', ') : '-'}`,
    `Seite: ${contact.pageUrl || '-'}`,
    `Zeitpunkt: ${contact.submittedAt || '-'}`,
    '',
    'Nachricht:',
    contact.message,
  ].join('\n');

  const htmlBody = `<!DOCTYPE html>
<html lang="de">
<body>
  <h1>Neue Kontaktanfrage</h1>
  <p><strong>Name:</strong> ${escapeHtml(contact.name)}</p>
  <p><strong>E-Mail:</strong> ${escapeHtml(contact.email)}</p>
  <p><strong>Kontaktgrund:</strong> ${escapeHtml(contact.kontaktgrund || '-')}</p>
  <p><strong>Tierart:</strong> ${escapeHtml(contact.tierart.length ? contact.tierart.join(', ') : '-')}</p>
  <p><strong>Seite:</strong> ${escapeHtml(contact.pageUrl || '-')}</p>
  <p><strong>Zeitpunkt:</strong> ${escapeHtml(contact.submittedAt || '-')}</p>
  <h2>Nachricht</h2>
  <p>${escapeHtml(contact.message).replaceAll('\n', '<br>')}</p>
</body>
</html>`;

  const boundary = `contact-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const message = [
    `From: ${headerValue(config.smtpFrom)}`,
    `To: ${headerValue(config.contactTo)}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    textBody,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=utf-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    htmlBody,
    '',
    `--${boundary}--`,
    '',
  ].join('\r\n');

  await smtpSend({
    from: addressOnly(config.smtpFrom),
    to: addressOnly(config.contactTo),
    message,
  });
}

function headerValue(value) {
  return String(value).replaceAll('\r', ' ').replaceAll('\n', ' ').trim();
}

function addressOnly(value) {
  const input = headerValue(value);
  const start = input.indexOf('<');
  const end = input.indexOf('>');
  if (start !== -1 && end > start) return input.slice(start + 1, end).trim();
  return input;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function smtpSend({ from, to, message }) {
  const client = new SmtpClient();
  await client.connect();
  await client.expect(220);
  await client.command(`EHLO ${hostname()}`, 250);

  if (!config.smtpSecure && config.smtpPort !== 465 && config.smtpStartTls) {
    await client.command('STARTTLS', 220);
    await client.upgradeToTls();
    await client.command(`EHLO ${hostname()}`, 250);
  }

  await client.command(`AUTH PLAIN ${Buffer.from(`\0${config.smtpUser}\0${config.smtpPass}`).toString('base64')}`, 235);
  await client.command(`MAIL FROM:<${from}>`, 250);
  await client.command(`RCPT TO:<${to}>`, [250, 251]);
  await client.command('DATA', 354);
  await client.command(dotStuff(message), 250);
  await client.command('QUIT', 221);
  client.close();
}

function hostname() {
  return 'wahre-haustierliebe.de';
}

function dotStuff(message) {
  return `${message.split('\r\n').map((line) => line.startsWith('.') ? `.${line}` : line).join('\r\n')}\r\n.`;
}

class SmtpClient {
  socket = null;
  buffer = '';

  connect() {
    return new Promise((resolve, reject) => {
      const onError = (error) => reject(error);
      const options = { host: config.smtpHost, port: config.smtpPort, servername: config.smtpHost };
      const secureConnection = config.smtpSecure || config.smtpPort === 465;
      this.socket = secureConnection ? tls.connect(options) : net.connect(options);
      this.socket.once('error', onError);
      this.socket.once(secureConnection ? 'secureConnect' : 'connect', () => {
        this.socket.off('error', onError);
        resolve();
      });
      this.socket.on('data', (chunk) => {
        this.buffer += chunk.toString('utf8');
      });
    });
  }

  async upgradeToTls() {
    this.socket = tls.connect({ socket: this.socket, servername: config.smtpHost });
    this.buffer = '';
    this.socket.on('data', (chunk) => {
      this.buffer += chunk.toString('utf8');
    });
    await new Promise((resolve, reject) => {
      this.socket.once('secureConnect', resolve);
      this.socket.once('error', reject);
    });
  }

  async command(command, expected) {
    if (command) this.socket.write(`${command}\r\n`);
    return this.expect(expected);
  }

  async expect(expected) {
    const expectedCodes = Array.isArray(expected) ? expected : [expected];
    const response = await this.readResponse();
    if (!expectedCodes.includes(response.code)) {
      throw new Error(`SMTP error ${response.code}: ${response.text}`);
    }
    return response;
  }

  readResponse() {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error('SMTP response timeout'));
      }, 15000);

      const onData = () => {
        const response = parseSmtpResponse(this.buffer);
        if (!response) return;
        this.buffer = this.buffer.slice(response.rawLength);
        cleanup();
        resolve(response);
      };

      const onError = (error) => {
        cleanup();
        reject(error);
      };

      const cleanup = () => {
        clearTimeout(timeout);
        this.socket.off('data', onData);
        this.socket.off('error', onError);
      };

      this.socket.on('data', onData);
      this.socket.once('error', onError);
      onData();
    });
  }

  close() {
    if (this.socket) this.socket.end();
  }
}

function parseSmtpResponse(buffer) {
  const lines = buffer.split('\r\n');
  let rawLength = 0;
  for (const line of lines) {
    if (!line) continue;
    rawLength += Buffer.byteLength(`${line}\r\n`);
    const code = Number(line.slice(0, 3));
    if (!Number.isFinite(code)) continue;
    if (line.charAt(3) === ' ') {
      return { code, text: line.slice(4), rawLength };
    }
  }
  return null;
}
