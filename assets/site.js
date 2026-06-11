var staticPageRoutes = {
  "startseite": "/index.html",
  "impressum": "/impressum/index.html",
  "datenschutz": "/datenschutz/index.html",
  "kontakt": "/kontakt/index.html",
  "mitmachen": "/mitmachen/index.html",
  "mensch": "/mensch/index.html",
  "hunde": "/hunde/index.html",
  "katzen": "/katzen/index.html",
  "voegel": "/voegel/index.html",
  "kleintiere": "/kleintiere/index.html",
  "exoten": "/exoten/index.html",
  "pferde": "/pferde/index.html",
  "kastration": "/kastration/index.html",
  "qualzucht": "/qualzucht/index.html",
  "adoption": "/adoption/index.html",
  "selbsttest": "/selbsttest/index.html",
  "notfall": "/notfall/index.html",
  "tierarzt-notdienst": "/notfall/tierarzt-notdienst/index.html",
  "wissen": "/wissen/index.html",
  "glossar": "/glossar/index.html",
  "hitzefalle-auto": "/hitzefalle-auto/index.html",
  "ernaehrung-taurin": "/ernaehrung-taurin/index.html",
  "realhaltung": "/realhaltung/index.html",
  "zucht-und-vermehrung": "/zucht-und-vermehrung/index.html",
  "wildtierhaltung": "/wildtierhaltung/index.html",
  "wildkatzenbaby-gefunden": "/wildkatzenbaby-gefunden/index.html",
  "noch-nicht-bereit": "/noch-nicht-bereit/index.html"
};
function staticRouteFor(page) {
  var target = staticPageRoutes[page] || '/';
  var prefix = document.body ? (document.body.dataset.routePrefix || '') : '';
  if (target === '/') return prefix ? prefix + 'index.html' : 'index.html';
  return prefix + target.replace(/^\//, '');
}
function assetUrl(src) {
  if (!src || /^(https?:|data:|\/)/.test(src)) return src;
  var prefix = document.body ? (document.body.dataset.assetPrefix || '') : '';
  return prefix + src;
}
function normalizeAssetUrls(root) {
  Array.from((root || document).querySelectorAll('img[src^="assets/"]')).forEach(function(img) {
    img.setAttribute('src', assetUrl(img.getAttribute('src')));
  });
}


    var articleHeroImages = {
      'mensch': { src: 'assets/images/cat-carrier-square.jpg', alt: 'Katze in Transporttasche als Bild für ehrliche Vorbereitung vor dem Einzug', position: 'center 46%', caption: 'Ein Tier zieht nicht in ein Gefühl ein, sondern in einen vorbereiteten Alltag.', purpose: 'Mensch-Seite: Vorbereitung und Verantwortung statt spontanes Wunschbild zeigen', shareReason: 'Das Bild soll den Satz stützen: Vor einem Tier kommt die ehrliche Entscheidung.' },
      'hunde': { src: 'assets/images/golden-retriever-agility-jump.jpg', alt: 'Hund beim Agility-Sprung als Bild für Training, Alltag und Beschäftigung', position: 'center 48%', caption: 'Hunde brauchen Zeit, Beziehung und Alltag, nicht nur Auslauf.', purpose: 'Hunde-Seite: Alltag und Training als echte Hundehaltung zeigen', shareReason: 'Der Share-Impuls soll vom Wunschhund zur Zeitrechnung führen.' },
      'katzen': { src: 'assets/images/two-cats-window.jpg', alt: 'Zwei Katzen sitzen gemeinsam am Fenster als Bild für soziale Wohnungshaltung', position: 'center 48%', caption: 'Wohnungshaltung muss Sozialkontakt und Rückzug mitdenken.', purpose: 'Katzen-Seite: stille Bedürfnisse sichtbar machen', shareReason: 'Das Bild soll Katzenhaltung als gestaltete Umgebung rahmen, nicht als Selbstläufer.' },
      'voegel': { src: 'assets/images/voegel-voliere-02.jpg', alt: 'Mehrere Wellensittiche in einer Voliere als Bild für Schwarm und Raum', position: 'center 44%', caption: 'Schwarm, Flugraum und Reize sind kein Extra.', purpose: 'Vögel-Seite: Schwarm und Raum statt Einzelvogel-Käfig zeigen', shareReason: 'Das Bild widerspricht dem Reflex, einen einzelnen Vogel als normales Haustier zu sehen.' },
      'kleintiere': { src: 'assets/images/guinea-pig-habitat.jpg', alt: 'Kleintier-Habitat mit Struktur statt Spielzeughaltung', position: 'center 50%', caption: 'Kleintiere brauchen Fläche, Struktur und Artgenossen.', purpose: 'Kleintier-Seite: Haltungskontext statt Kinderzimmerbild zeigen', shareReason: 'Das Bild soll den Mythos vom einfachen Einstiegstier brechen.' },
      'exoten': { src: 'assets/images/bearded-dragon-terrarium.jpg', alt: 'Bartagame im Terrarium als Bild für Technik, Licht und Klima', position: 'center 45%', caption: 'Leise Tiere brauchen oft die präziseste Technik.', purpose: 'Exoten-Seite: Klima, Licht und Fachwissen sichtbar machen', shareReason: 'Das Bild soll Faszination mit Verantwortung koppeln.' },
      'pferde': { src: 'assets/images/horse-paddocks-shelter.jpg', alt: 'Pferdekoppeln mit Unterständen als Bild für Raum und Haltungssysteme', position: 'center 50%', caption: 'Pferdehaltung beginnt bei Herde, Fläche und täglicher Bewegung.', purpose: 'Pferde-Seite: Haltungssystem statt romantisches Reitbild zeigen', shareReason: 'Das Bild soll die große Verpflichtung konkret machen.' },
      'kastration': { src: 'assets/images/feral-cat-tnr.jpg', alt: 'Streunerkatze mit gekennzeichnetem Ohr nach einer TNR-Kastration', position: 'center 44%', caption: 'Kastration verhindert Leid, bevor es sichtbar wird.', purpose: 'Kastrations-Seite: Prävention und Streunerkatzenkontext zeigen', shareReason: 'Das Bild macht klar, dass Kastration praktischer Tierschutz ist.' },
      'qualzucht': { src: 'assets/images/qualzucht-mops.jpg', alt: 'Mops als Beispiel für problematische Zuchtmerkmale', position: 'center 34%', caption: 'Süß darf kein Leidensmerkmal sein.', purpose: 'Qualzucht-Seite: problematische Zuchtmerkmale sachlich zeigen', shareReason: 'Das Bild soll Unbehagen erklären, ohne Clickbait zu werden.' },
      'adoption': { src: 'assets/images/tierheim-hund.jpg', alt: 'Hund im Tierheim als klares Bild für Adoption statt Kauf', position: 'center 45%', caption: 'Im Tierheim wartet kein Ersatz, sondern ein echtes Tier.', purpose: 'Adoptions-Seite: zweite Chance statt Kaufversprechen zeigen', shareReason: 'Das Bild soll Adoption als konkrete, gute Entscheidung rahmen.' },
      'selbsttest': { src: 'assets/images/cats-cat-tree-pair.jpg', alt: 'Zwei Katzen auf einem Kratzbaum als Bild für vorbereitete Haltung', position: 'center 46%', caption: 'Bereit sein heißt, Bedürfnisse vor dem Wunsch zu prüfen.', purpose: 'Selbsttest-Seite: vorbereitete Haltung statt spontaner Wunsch zeigen', shareReason: 'Das Bild soll den Test als Entscheidungshilfe greifbar machen.' },
      'notfall': { src: 'assets/images/vet-office-with-dog.jpg', alt: 'Hund sitzt ruhig in einer Tierarztpraxis als Bild für rechtzeitige Hilfe', position: 'center 50%', caption: 'Im Zweifel ruhig bleiben, anrufen, hinfahren.', purpose: 'Notfall-Seite: ruhige Handlungsfähigkeit statt Panik zeigen', shareReason: 'Das Bild soll Hemmung senken, früh tierärztliche Hilfe zu holen.' },
      'wissen': { src: 'assets/images/goldfish-aquarium.jpg', alt: 'Goldfische im Aquarium als Bild für hartnäckige Haustiermythen', position: 'center 48%', caption: 'Mythen klingen harmlos, bis Tiere darunter leiden müssen.', purpose: 'Wissen-Seite: Irrtümer als konkrete Haltungsfolgen zeigen', shareReason: 'Das Bild soll einen bekannten Mythos sofort teilbar machen.' },
      'glossar': { src: 'assets/images/goldfish-aquarium.jpg', alt: 'Goldfische im Aquarium als Bild für Nachschlagewissen zur Tierhaltung', position: 'center 48%', caption: 'Begriffe sind nur hilfreich, wenn sie zu besseren Entscheidungen führen.', purpose: 'Glossar-Seite: Fachbegriffe als Einstieg in verantwortliche Tierhaltung zeigen', shareReason: 'Das Bild soll Nachschlagewissen ruhig und wiedererkennbar rahmen.' },
      'wildkatzenbaby-gefunden': { src: 'assets/images/european-wildcat.jpg', alt: 'Europäische Wildkatze mit typischen Merkmalen wie breitem Kopf, fleischfarbener Nase und dichtem Fell', position: 'center 36%', caption: 'Gut gemeinte Hilfe beginnt manchmal damit, ein Jungtier nicht anzufassen.', purpose: 'Wildkatzenbaby-Seite: Verwechslungsgefahr sichtbar machen und Abstand als Hilfe rahmen', shareReason: 'Das Bild soll aus dem Reflex „mitnehmen“ die Entscheidung „erst prüfen“ machen.' },
      'noch-nicht-bereit': { src: 'assets/images/cat-soft-carrier.jpg', alt: 'Katze in einer weichen Transportbox als Bild für Warten und Übergang', position: 'center 46%', caption: 'Warten kann die tierliebste Entscheidung sein.', purpose: 'Noch-nicht-bereit-Seite: verantwortliches Warten statt Scheitern zeigen', shareReason: 'Das Bild soll Tierverzicht als Fürsorge normalisieren.' }
    };

    var articleEnhancements = {
      mensch: [
        {
          afterSelector: '.info-box',
          html: `<div class="article-rhythm decision-band" data-enhancement="mensch-decision">
            <span class="eyebrow">Spiegelmoment</span>
            <h3>Die wichtigste Frage ist nicht: Welches Tier will ich?</h3>
            <p>Die wichtigste Frage ist: Welches Leben kann ich einem Tier wirklich geben? Genau an dieser Stelle wird die Seite teilbar: für Menschen, die kurz vor einer Anschaffung stehen und noch offen genug sind, ehrlich zu prüfen.</p>
          </div>`
        },
        {
          afterHeading: 'Die häufigsten Selbstlügen',
          html: `<div class="article-rhythm argument-grid" data-enhancement="mensch-self-lies">
            <article class="rhythm-card"><span class="eyebrow">Wunsch</span><h3>„Ich kriege das schon hin.“</h3><p>Wenn Zeit, Geld oder Platz jetzt schon eng sind, wird das Tier später die Rechnung zahlen.</p></article>
            <article class="rhythm-card"><span class="eyebrow">Realität</span><h3>„Es ist doch nur ein Tier.“</h3><p>Genau deshalb ist die Verantwortung größer: Das Tier kann nicht kündigen, ausziehen oder widersprechen.</p></article>
            <article class="rhythm-card"><span class="eyebrow">Share-Grund</span><h3>Vor dem Kauf teilen</h3><p>Diese Seite gehört zu Menschen, die gerade „nur mal schauen“ und innerlich schon entschieden haben.</p></article>
          </div>`
        }
      ],
      hunde: [
        {
          afterSelector: '.info-box',
          html: `<div class="article-rhythm metric-grid" data-enhancement="hunde-stats">
            <div class="metric-card"><strong>4–5 h</strong><span>länger sollte ein erwachsener Hund nicht regelmäßig allein bleiben.</span></div>
            <div class="metric-card"><strong>12–20 Tsd. €</strong><span>realistische Lebenszeitkosten, bevor chronische Krankheiten dazukommen.</span></div>
            <div class="metric-card"><strong>täglich</strong><span>Beziehung, Bewegung und Beschäftigung. Nicht nur am Wochenende.</span></div>
          </div>`
        },
        {
          afterHeading: 'Allein zu Hause',
          html: `<div class="article-rhythm myth-truth" data-enhancement="hunde-allein">
            <div class="myth"><span class="eyebrow">Mythos</span><h3>„Ein Garten reicht.“</h3><p>Ein Garten ist nach kurzer Zeit bekanntes Gelände. Er ersetzt keine Spaziergänge, keine neuen Gerüche und keine gemeinsame Erkundung.</p></div>
            <div class="truth"><span class="eyebrow">Fakt</span><h3>Ein Hund wartet auf dich.</h3><p>Wenn dein Alltag keine verlässliche Betreuung erlaubt, ist Warten die bessere Entscheidung als ein Hund, der acht Stunden still leidet.</p></div>
          </div>`
        }
      ],
      katzen: [
        {
          afterHeading: 'Stilles Leiden erkennen',
          html: `<div class="article-rhythm argument-grid" data-enhancement="katzen-still">
            <article class="rhythm-card"><span class="eyebrow">Signal</span><h3>Rückzug</h3><p>Wenn eine Katze plötzlich weniger Kontakt sucht, ist das kein Charakterwechsel, sondern ein Warnsignal.</p></article>
            <article class="rhythm-card"><span class="eyebrow">Signal</span><h3>Unsauberkeit</h3><p>Das ist selten Protest. Häufig stecken Stress, Schmerzen oder Harnwegserkrankungen dahinter.</p></article>
            <article class="rhythm-card"><span class="eyebrow">Handlung</span><h3>Früher prüfen</h3><p>Lieber einmal zu viel zum Tierarzt als eine stille Erkrankung zu spät sehen.</p></article>
          </div>`
        }
      ],
      voegel: [
        {
          afterSelector: '.info-box',
          html: `<div class="article-rhythm quote-band" data-enhancement="voegel-schwarm">
            <span class="eyebrow">Share-Satz</span>
            <blockquote>Ein einzelner Vogel wird nicht zahm. Er wird einsam.</blockquote>
            <p>Diese Zeile gehört direkt neben jeden Käfigkauf, bei dem „erst mal einer“ geplant ist.</p>
          </div>`
        }
      ],
      kleintiere: [
        {
          afterSelector: '.info-box',
          html: `<div class="article-rhythm compare-mini" data-enhancement="kleintiere-vergleich">
            <div class="compare-card bad"><strong>Hamster</strong><span>Nachtaktiv, Einzelgänger, kein Anfasstier für Kinder.</span></div>
            <div class="compare-card risk"><strong>Kaninchen</strong><span>Gruppenhaltung, viel Fläche, hohe Tierarztkosten bei Zähnen und Gebärmutter.</span></div>
            <div class="compare-card risk"><strong>Ratten</strong><span>Intelligent, sozial, kurzlebig. Brauchen Gruppe, Höhe und Beschäftigung.</span></div>
          </div>`
        }
      ],
      exoten: [
        {
          afterSelector: '.info-box',
          html: `<div class="article-rhythm quote-band" data-enhancement="exoten-leise">
            <span class="eyebrow">Harte Wahrheit</span>
            <blockquote>Bei Exoten heißt „pflegeleicht“ oft nur: Das Tier stirbt leise.</blockquote>
            <p>Temperatur, UV-B, Feuchtigkeit, Futter und Meldepflichten sind keine Details. Sie sind die Haltung.</p>
          </div>`
        }
      ],
      pferde: [
        {
          afterSelector: '.info-box',
          html: `<div class="article-rhythm metric-grid" data-enhancement="pferde-stats">
            <div class="metric-card"><strong>15–30 km</strong><span>natürliche Tagesbewegung im Schritt, grasen und Sozialkontakt eingeschlossen.</span></div>
            <div class="metric-card"><strong>20+ Jahre</strong><span>Verpflichtung, Kosten und Alltag ändern sich über Jahrzehnte.</span></div>
            <div class="metric-card"><strong>Herde</strong><span>Ein Pferd ist kein Solist. Sozialkontakt ist Grundbedürfnis.</span></div>
          </div>`
        }
      ],
      kastration: [
        {
          afterHeading: 'Die häufigsten Gegenargumente',
          html: `<div class="article-rhythm myth-truth" data-enhancement="kastration-kosten">
            <div class="myth"><span class="eyebrow">Mythos</span><h3>„Einmal Babys wäre doch schön.“</h3><p>Für Menschen klingt das romantisch. Für Tiere bedeutet es Hormonstress, Risiko, Nachwuchs ohne sichere Plätze und oft zusätzliches Tierheimleid.</p></div>
            <div class="truth"><span class="eyebrow">Fakt</span><h3>Keine Geburt ist neutral.</h3><p>Jeder ungeplante Wurf braucht Futter, Tierarzt, Platz und verantwortungsvolle Vermittlung. Kastration verhindert Leid, bevor es anfängt.</p></div>
          </div>`
        }
      ],
      qualzucht: [
        {
          afterHeading: 'Die bekanntesten Beispiele',
          html: `<div class="article-rhythm signal-grid" data-enhancement="qualzucht-signale">
            <article class="signal-card"><strong>Atmung</strong><span>Röcheln, Schnarchen und schnelle Erschöpfung sind keine niedlichen Rassemerkmale.</span></article>
            <article class="signal-card"><strong>Bewegung</strong><span>Wenn Knochen, Gelenke oder Körperform normale Bewegung verhindern, ist Schönheit Leid.</span></article>
            <article class="signal-card"><strong>Wahrnehmung</strong><span>Fell, Augen, Ohren oder Kopfgefieder dürfen Sicht, Hören und Alltag nicht behindern.</span></article>
          </div>`
        },
        {
          afterHeading: 'Was du tun kannst',
          html: `<div class="article-rhythm article-split image-context-card" data-enhancement="qualzucht-adoption" data-image-purpose="Qualzucht-Lösungsabschnitt: Adoption als konkrete Alternative zu Nachfrage zeigen" data-share-reason="Das Bild soll den Ausweg zeigen, nicht nur das Problem bebildern.">
            <figure style="--image-position:center 48%;">
              <img src="assets/images/rabbit-adoption-enclosure.jpg" alt="Kaninchen wird vor einer Adoption in einem Außengehege gehalten" loading="lazy">
              <figcaption class="context-caption">Nicht kaufen. Nachfrage entziehen. Tierschutztieren eine Chance geben.</figcaption>
            </figure>
            <div class="article-split-copy">
              <span class="eyebrow">Ausweg</span>
              <h3>Du musst Leid nicht finanzieren.</h3>
              <p>Qualzucht endet nicht durch Mitleid mit einzelnen Rassen, sondern durch Nachfrage-Stopp. Adoption ist hier kein Trostpreis, sondern die konsequenteste Antwort.</p>
              <button class="btn btn-primary" onclick="navigateTo('adoption')">Adoption statt Kauf</button>
            </div>
          </div>`
        }
      ],
      adoption: [
        {
          afterHeading: 'Der Preis-Decoder',
          html: `<div class="article-rhythm share-callout" data-enhancement="adoption-price-share">
            <span class="eyebrow">Teilbarer Moment</span>
            <h3>Der billige Welpe ist oft das teuerste Tier.</h3>
            <p>Genau diese Rechnung sollte jemand sehen, bevor er bei Kleinanzeigen ein „Schnäppchen“ anklickt.</p>
            <div class="share-bar">
              <button class="share-btn" onclick="shareThis('whatsapp', 'Der billige Welpe ist oft das teuerste Tier. Lies das, bevor du über Kleinanzeigen kaufst:')">WhatsApp</button>
              <button class="share-btn" onclick="shareThis('copy')">Link kopieren</button>
            </div>
          </div>`
        }
      ],
      selbsttest: [
        {
          afterSelector: '#test-form',
          html: `<div class="article-rhythm decision-band" data-enhancement="selbsttest-share">
            <span class="eyebrow">Vorher teilen</span>
            <h3>Der beste Zeitpunkt für diesen Test ist vor dem Tier.</h3>
            <p>Schick ihn jemandem, der gerade „nur mal guckt“. Nach dem Kauf wird aus Einsicht viel schneller Rechtfertigung.</p>
          </div>`
        }
      ],
      notfall: [
        {
          afterSelector: '.warning-box',
          html: `<div class="article-rhythm compare-mini" data-enhancement="notfall-handeln">
            <div class="compare-card good"><strong>1. Anrufen</strong><span>Tierarzt oder Klinik, Symptom und Zeitpunkt knapp nennen.</span></div>
            <div class="compare-card good"><strong>2. Sichern</strong><span>Tier ruhig halten, Transport vorbereiten, Substanz/Verpackung mitnehmen.</span></div>
            <div class="compare-card bad"><strong>3. Nicht abwarten</strong><span>Bei Atemnot, Vergiftung, Krampf oder Harnstopp zählt jede Minute.</span></div>
          </div>`
        }
      ],
      wissen: [
        {
          afterHeading: '„Aber bei meinem Tier hat es geholfen“',
          html: `<div class="article-rhythm myth-truth" data-enhancement="wissen-korrelation">
            <div class="myth"><span class="eyebrow">Mythos</span><h3>„Es wurde besser, also hat es gewirkt.“</h3><p>Das ist ein verständlicher Schluss. Aber zeitliche Nähe ist kein Wirknachweis.</p></div>
            <div class="truth"><span class="eyebrow">Fakt</span><h3>Beobachtung ist keine Studie.</h3><p>Spontanheilung, Futterwechsel, Schonung oder echte Behandlung werden oft den Globuli zugeschrieben.</p></div>
          </div>`
        },
        {
          afterHeading: 'Was stattdessen hilft',
          html: `<div class="article-rhythm article-split image-context-card" data-enhancement="wissen-evidenz" data-image-purpose="Wissen-Seite: evidenzbasierte Tiermedizin als konkreter Ausweg statt Globuli zeigen" data-share-reason="Das Bild soll den Schritt weg vom Glauben und hin zur Untersuchung sichtbar machen.">
            <figure style="--image-position:center 45%;">
              <img src="assets/images/vet-office-with-dog.jpg" alt="Hund sitzt ruhig in einer Tierarztpraxis" loading="lazy">
              <figcaption class="context-caption">Wenn ein Tier krank wirkt, braucht es Untersuchung, keine Verzögerung.</figcaption>
            </figure>
            <div class="article-split-copy">
              <span class="eyebrow">Konkreter Ausweg</span>
              <h3>Beobachten, dokumentieren, untersuchen lassen.</h3>
              <p>Der hilfreiche Schritt ist nicht „irgendetwas geben“, sondern Symptome ernst nehmen, Veränderungen notieren und rechtzeitig tierärztlich abklären.</p>
              <button class="btn btn-primary" onclick="navigateTo('notfall')">Warnsignale prüfen</button>
            </div>
          </div>`
        }
      ],
      'noch-nicht-bereit': [
        {
          afterSelector: '.info-box',
          html: `<div class="article-rhythm quote-band" data-enhancement="nicht-bereit-entlastung">
            <span class="eyebrow">Entlastung</span>
            <blockquote>Kein Tier zu nehmen kann die tierliebste Entscheidung sein.</blockquote>
            <p>Diese Seite ist nicht das Nein gegen Tiere. Sie ist das Ja zu einem besseren Zeitpunkt.</p>
          </div>`
        }
      ]
    };

    var articleEnhancementAddons = {
      mensch: [
        {
          afterHeading: 'Die Entscheidung fällt im Bauch',
          html: `<div class="article-rhythm share-callout" data-enhancement="mensch-frueh-teilen">
            <span class="eyebrow">Für den Moment vor dem Kauf</span>
            <h3>Schick das jemandem, der gerade „nur mal schaut“.</h3>
            <p>Genau dann ist noch genug Abstand da, um Alltag, Geld, Zeit und Verantwortung ehrlich zu prüfen.</p>
            <div class="share-actions">
              <button class="share-btn" onclick="shareThis('whatsapp', 'Vor dem Haustierkauf: Die ehrlichste Frage ist nicht, welches Tier du willst, sondern welches Leben du ihm geben kannst:')">WhatsApp</button>
              <button class="share-btn" onclick="shareThis('copy')">Link kopieren</button>
            </div>
          </div>`
        }
      ],
      hunde: [
        {
          afterHeading: 'Soziale Bedürfnisse',
          html: `<div class="article-rhythm" data-enhancement="hunde-beschaeftigung">
            <span class="eyebrow">Beschäftigung, die wirklich guttut</span>
            <h3>Ein Hund braucht Aufgaben, die ihn ruhiger und sicherer machen.</h3>
            <p>Gute Beschäftigung ist nicht „auspowern bis zum Umfallen“, sondern gemeinsame Orientierung: suchen, warten, verstehen, wieder runterfahren.</p>
            <div class="argument-grid">
              <article class="rhythm-card"><span class="eyebrow">Nasenarbeit</span><h3>Suchen statt hochdrehen</h3><p>Futterbeutel, Geruchsspuren oder versteckte Leckerchen lasten viele Hunde besser aus als immer mehr Tempo.</p></article>
              <article class="rhythm-card"><span class="eyebrow">Alltagssignale</span><h3>Nützlich trainieren</h3><p>Rückruf, Decke, Warten, Tauschen und ruhiges Anleinen sind keine Kunststücke, sondern echte Sicherheit im Alltag.</p></article>
              <article class="rhythm-card"><span class="eyebrow">Ruhe</span><h3>Entspannung lernen</h3><p>Nach Beschäftigung braucht ein Hund Schlaf und Reizpause. Dauerprogramm macht viele Hunde nicht glücklich, sondern nervös.</p></article>
            </div>
          </div>`
        },
        {
          afterHeading: 'Bevor du dich entscheidest',
          html: `<div class="article-rhythm share-callout" data-enhancement="hunde-share">
            <span class="eyebrow">Vor dem Hundekauf teilen</span>
            <h3>Ein Hund wartet nicht auf „später“. Er wartet jeden Tag.</h3>
            <p>Diese Seite gehört zu Menschen, die den Hundewunsch ernst meinen und deshalb zuerst ihren Alltag prüfen sollten.</p>
            <div class="share-actions">
              <button class="share-btn" onclick="shareThis('whatsapp', 'Ein Hund braucht Alltag, Beziehung und Zeit. Lies das vor dem Hundekauf:')">WhatsApp</button>
              <button class="share-btn" onclick="shareThis('copy')">Link kopieren</button>
            </div>
          </div>`
        }
      ],
      katzen: [
        {
          afterHeading: 'Wohnungshaltung',
          html: `<div class="article-rhythm" data-enhancement="katzen-beschaeftigung">
            <span class="eyebrow">Beschäftigung, die wirklich guttut</span>
            <h3>Wohnungskatzen brauchen Jagd, Kontrolle und Rückzug.</h3>
            <p>Spielzeug allein reicht nicht. Entscheidend ist, ob die Katze wählen, beobachten, jagen, klettern und sich ungestört zurückziehen kann.</p>
            <div class="argument-grid">
              <article class="rhythm-card"><span class="eyebrow">Jagdspiel</span><h3>Richtig spielen</h3><p>Kurze Einheiten mit Lauern, Hetzen, Fangen und danach Futter passen besser zur Katze als hektisches Wedeln vor der Nase.</p></article>
              <article class="rhythm-card"><span class="eyebrow">Futter erarbeiten</span><h3>Nicht nur Napf</h3><p>Fummelbretter, Suchspiele und versteckte Trockenfutterstücke bringen Beschäftigung in den Alltag, ohne die Katze zu überfordern.</p></article>
              <article class="rhythm-card"><span class="eyebrow">Clicker</span><h3>Freiwillige Tricks</h3><p>Targettraining oder Pfote geben kann Spaß machen, wenn die Katze jederzeit gehen darf und die Einheit kurz bleibt.</p></article>
            </div>
          </div>`
        },
        {
          afterHeading: 'Einzeljäger bedeutet nicht Einzelgänger',
          html: `<div class="article-rhythm myth-truth" data-enhancement="katzen-einzeljaeger">
            <div class="myth"><span class="eyebrow">Mythos</span><h3>„Katzen sind Einzelgänger.“</h3><p>Der Satz wird oft benutzt, um Einzelhaltung in der Wohnung bequem zu machen.</p></div>
            <div class="truth"><span class="eyebrow">Fakt</span><h3>Sie jagen allein, leben aber nicht automatisch allein.</h3><p>Viele Katzen brauchen passende Artgenossen, Rückzugsorte und eine Wohnung, die mehr bietet als Sofa und Futternapf.</p></div>
          </div>`
        },
        {
          afterSelector: '.warning-box',
          html: `<div class="article-rhythm share-callout" data-enhancement="katzen-kastration-share">
            <span class="eyebrow">Kastration teilen</span>
            <h3>2 Millionen Streunerkatzen sind kein Naturproblem.</h3>
            <p>Sie sind die Folge davon, dass zu viele Freigänger nicht kastriert werden. Dieser Fakt muss vor dem nächsten „einmal Babys“-Satz sichtbar werden.</p>
            <div class="share-actions">
              <button class="share-btn" onclick="shareThis('whatsapp', '2 Millionen Streunerkatzen in Deutschland: Kastration ist praktischer Tierschutz. Lies das:')">WhatsApp</button>
              <button class="share-btn" onclick="shareThis('copy')">Link kopieren</button>
            </div>
          </div>`
        }
      ],
      voegel: [
        {
          afterHeading: 'Schwarmvögel gehören nicht allein',
          html: `<div class="article-rhythm myth-truth" data-enhancement="voegel-einzelhaltung">
            <div class="myth"><span class="eyebrow">Mythos</span><h3>„Ein einzelner Vogel wird zahmer.“</h3><p>Er richtet sich verzweifelt auf Menschen aus, weil kein Artgenosse antwortet.</p></div>
            <div class="truth"><span class="eyebrow">Fakt</span><h3>Zahmkeit darf keine Einsamkeit kosten.</h3><p>Mindestens ein passender Partner, Freiflug und Schwarmverhalten sind keine Extras, sondern Grundbedürfnisse.</p></div>
          </div>`
        },
        {
          afterHeading: 'Freiflug ist nicht optional',
          html: `<div class="article-rhythm warning-box" data-enhancement="voegel-teflon">
            <h3>Teflon kann Vögel in Minuten töten</h3>
            <p>Beschichtete Pfannen und andere PTFE-Oberflächen setzen beim Überhitzen Dämpfe frei, die für Vögel im selben Raum lebensgefährlich sind. Küchenluft und Vogelzimmer gehören getrennt.</p>
          </div>`
        },
        {
          afterHeading: 'Spiegel und Plastikvögel ersetzen keinen Partner',
          html: `<div class="article-rhythm" data-enhancement="voegel-beschaeftigung">
            <span class="eyebrow">Beschäftigung, die wirklich guttut</span>
            <h3>Vögel brauchen Reize, die zu Schwarm, Flug und Futtersuche passen.</h3>
            <p>Der wichtigste „Trick“ ist nicht, dass ein Vogel etwas für Menschen vorführt. Wichtig ist eine Umgebung, in der er selbst aktiv sein kann.</p>
            <div class="argument-grid">
              <article class="rhythm-card"><span class="eyebrow">Futtersuche</span><h3>Erarbeiten lassen</h3><p>Kräuter, Gräser, Kolbenhirse oder Futter an wechselnden Stellen regen natürliches Suchen und Knabbern an.</p></article>
              <article class="rhythm-card"><span class="eyebrow">Klettern</span><h3>Frische Zweige</h3><p>Ungiftige Naturäste, Schaukeln und Landeplätze machen den Raum interessanter als Plastikstangen im Käfig.</p></article>
              <article class="rhythm-card"><span class="eyebrow">Schwarm</span><h3>Gemeinsam statt zahm erzwingen</h3><p>Rituale, Ansprache und freiwilliges Targettraining können bereichern. Ein Partner bleibt trotzdem unersetzlich.</p></article>
            </div>
          </div>`
        }
      ],
      kleintiere: [
        {
          afterSelector: '.info-box',
          html: `<div class="article-rhythm" data-enhancement="kleintiere-beschaeftigung">
            <span class="eyebrow">Beschäftigung, die wirklich guttut</span>
            <h3>Kleintiere brauchen Struktur, nicht Kinderzimmer-Bespaßung.</h3>
            <p>Bei vielen Kleintieren ist die beste Beschäftigung ein Lebensraum, der Buddeln, Verstecken, Klettern, Nagen und Futtersuche ermöglicht.</p>
            <div class="argument-grid">
              <article class="rhythm-card"><span class="eyebrow">Kaninchen & Meerschweinchen</span><h3>Gehege gestalten</h3><p>Tunnel, erhöhte Ebenen, Häuschen mit zwei Ausgängen, Zweige und verteiltes Frischfutter machen den Alltag reicher.</p></article>
              <article class="rhythm-card"><span class="eyebrow">Hamster</span><h3>Graben dürfen</h3><p>Tiefe Einstreu, Sandbad, sichere Verstecke und verstreutes Körnerfutter sind wichtiger als Anfassen oder Wecken.</p></article>
              <article class="rhythm-card"><span class="eyebrow">Ratten</span><h3>Lernen und klettern</h3><p>Ratten profitieren von Kletterwegen, Auslauf, Futterrätseln und freiwilligem Target- oder Namenstraining.</p></article>
            </div>
          </div>`
        },
        {
          afterHeading: 'Kaninchen',
          html: `<div class="article-rhythm myth-truth" data-enhancement="kleintiere-kinder">
            <div class="myth"><span class="eyebrow">Mythos</span><h3>„Kleintiere sind gute Einstiegstiere.“</h3><p>Sie wirken handlich, billig und unkompliziert. Genau das macht sie so oft zu Fehlkäufen.</p></div>
            <div class="truth"><span class="eyebrow">Fakt</span><h3>Klein heißt nicht einfach.</h3><p>Fläche, Artgenossen, Zähne, Kastration, Tierarzt und Ruhe sind bei vielen Kleintieren anspruchsvoller als erwartet.</p></div>
          </div>`
        },
        {
          afterHeading: 'Hamster',
          html: `<div class="article-rhythm signal-grid" data-enhancement="kleintiere-signale">
            <article class="signal-card" data-nr="01"><strong>Verstecken</strong><span>Dauerhaftes Verstecken ist oft Stress, nicht „schüchtern und niedlich“.</span></article>
            <article class="signal-card" data-nr="02"><strong>Zähne</strong><span>Kaninchen und Meerschweinchen brauchen frühe Kontrolle, bevor Fressen sichtbar schwerfällt.</span></article>
            <article class="signal-card" data-nr="03"><strong>Fläche</strong><span>Ein Käfig ersetzt kein Gehege. Bewegung und Struktur sind Grundbedürfnisse.</span></article>
          </div>`
        }
      ],
      exoten: [
        {
          afterHeading: 'Reptilien',
          html: `<div class="article-rhythm" data-enhancement="exoten-beschaeftigung">
            <span class="eyebrow">Beschäftigung, die wirklich guttut</span>
            <h3>Bei Exoten heißt Beschäftigung vor allem: Lebensraum richtig bauen.</h3>
            <p>Viele Exoten wollen keine Tricks lernen. Sie brauchen Klima, Licht, Verstecke, Klettermöglichkeiten und Futterreize, die zu ihrer Art passen.</p>
            <div class="argument-grid">
              <article class="rhythm-card"><span class="eyebrow">Reptilien</span><h3>Zonen statt Deko</h3><p>Wärmeplätze, kühlere Bereiche, Korkröhren, Äste, Steine und Sichtschutz geben dem Tier echte Wahlmöglichkeiten.</p></article>
              <article class="rhythm-card"><span class="eyebrow">Aquarium</span><h3>Umgebung statt Glas</h3><p>Pflanzen, Strömung, Verstecke, passende Gruppen und stabile Wasserwerte beschäftigen Fische besser als jeder Menschkontakt.</p></article>
              <article class="rhythm-card"><span class="eyebrow">Schildkröten</span><h3>Freigehege strukturieren</h3><p>Sonnenplätze, Schatten, Futterpflanzen, Unebenheiten und Rückzug machen ein Gehege lebendiger und tiergerechter.</p></article>
            </div>
          </div>`
        },
        {
          afterHeading: 'Reptilien',
          html: `<div class="article-rhythm metric-grid" data-enhancement="exoten-technik">
            <div class="metric-card"><strong>UV-B</strong><span>ohne passende Lampe drohen Knochen- und Organschäden.</span></div>
            <div class="metric-card"><strong>30–60 €</strong><span>monatliche Stromkosten sind bei Terrarien kein Ausnahmefall.</span></div>
            <div class="metric-card"><strong>täglich</strong><span>Temperatur, Feuchtigkeit, Futter und Technik prüfen.</span></div>
          </div>`
        },
        {
          afterHeading: 'Fische',
          html: `<div class="article-rhythm myth-truth" data-enhancement="exoten-goldfisch">
            <div class="myth"><span class="eyebrow">Mythos</span><h3>„Goldfische passen ins Glas.“</h3><p>Das Glas ist ein Symbol für falsche Haustierbilder, nicht für einfache Haltung.</p></div>
            <div class="truth"><span class="eyebrow">Fakt</span><h3>Filter, Volumen, Wasserwerte.</h3><p>Fische sind nicht pflegeleicht, nur weil sie leise sterben. Aquariumhaltung ist Biologie plus Technik.</p></div>
          </div>`
        }
      ],
      pferde: [
        {
          afterHeading: 'Platzbedarf',
          html: `<div class="article-rhythm" data-enhancement="pferde-beschaeftigung">
            <span class="eyebrow">Beschäftigung, die wirklich guttut</span>
            <h3>Pferde brauchen Bewegung, Beziehung und ruhige Lernmomente.</h3>
            <p>Beschäftigung ersetzt keine Herde und keine Fläche. Sie kann aber helfen, Vertrauen, Körpergefühl und Alltagssicherheit aufzubauen.</p>
            <div class="argument-grid">
              <article class="rhythm-card"><span class="eyebrow">Bodenarbeit</span><h3>Führen, weichen, warten</h3><p>Klare, ruhige Übungen vom Boden stärken Kommunikation, ohne dass jedes Zusammensein Reiten sein muss.</p></article>
              <article class="rhythm-card"><span class="eyebrow">Gelassenheit</span><h3>Alltag üben</h3><p>Planen, Jacken, Geräusche, Hänger, Hufe geben: kleine Trainingseinheiten machen den Umgang sicherer und stressärmer.</p></article>
              <article class="rhythm-card"><span class="eyebrow">Erkunden</span><h3>Spaziergänge und Handarbeit</h3><p>Gemeinsames Gehen, unterschiedliche Untergründe und ruhige Umwelterfahrung können Pferde sinnvoll beschäftigen.</p></article>
            </div>
          </div>`
        },
        {
          afterHeading: 'Haltungsformen',
          html: `<div class="article-rhythm compare-mini" data-enhancement="pferde-haltung">
            <div class="compare-card good"><strong>Offenstall</strong><span>Bewegung, Luft, Herde und Rückzug zusammen gedacht.</span></div>
            <div class="compare-card risk"><strong>Box</strong><span>Nur mit viel Auslauf, Sozialkontakt und täglicher Bewegung vertretbar.</span></div>
            <div class="compare-card bad"><strong>Anbindung</strong><span>Dauerhafte Fixierung passt nicht zu einem Lauftier.</span></div>
          </div>`
        },
        {
          afterHeading: 'Reitbeteiligung',
          html: `<div class="article-rhythm share-callout" data-enhancement="pferde-reitbeteiligung">
            <span class="eyebrow">Ehrlicher Einstieg</span>
            <h3>Eine Reitbeteiligung ist oft tierlieber als ein eigenes Pferd.</h3>
            <p>Wer Verantwortung lernen will, muss nicht sofort Besitz erzeugen. Zeit, Pflege und Verlässlichkeit zählen mehr als Eigentum.</p>
            <div class="share-actions">
              <button class="share-btn" onclick="shareThis('whatsapp', 'Vor dem eigenen Pferd: Warum eine Reitbeteiligung oft die ehrlichere Entscheidung ist:')">WhatsApp</button>
              <button class="share-btn" onclick="shareThis('copy')">Link kopieren</button>
            </div>
          </div>`
        }
      ],
      kastration: [
        {
          afterSelector: '.info-box',
          html: `<div class="article-rhythm metric-grid" data-enhancement="kastration-kompakt">
            <div class="metric-card"><strong>80–250 €</strong><span>typische Katzen-Kastration nach GOT, je nach Geschlecht und Praxis.</span></div>
            <div class="metric-card"><strong>vorher</strong><span>Prävention wirkt, bevor Rolligkeit, Kämpfe oder Nachwuchs da sind.</span></div>
            <div class="metric-card"><strong>TNR</strong><span>Fangen, kastrieren, zurücksetzen ist praktischer Streunerkatzenschutz.</span></div>
          </div>`
        }
      ],
      qualzucht: [
        {
          afterSelector: '.info-box',
          html: `<div class="article-rhythm warning-box" data-enhancement="qualzucht-topwarnung">
            <h3>Süß ist kein Qualitätsmerkmal</h3>
            <p>Wenn ein Tier wegen seiner Körperform schlechter atmet, sieht, läuft, frisst oder lebt, ist das kein Stil. Es ist ein angezüchteter Nachteil.</p>
          </div>`
        },
        {
          afterHeading: 'Was ist Qualzucht',
          html: `<div class="article-rhythm myth-truth" data-enhancement="qualzucht-rassestandard">
            <div class="myth"><span class="eyebrow">Mythos</span><h3>„Rassestandard heißt gesund.“</h3><p>Standards beschreiben oft Aussehen. Sie garantieren nicht, dass ein Körper gut funktioniert.</p></div>
            <div class="truth"><span class="eyebrow">Fakt</span><h3>Funktion schlägt Form.</h3><p>Atmung, Bewegung, Wahrnehmung und Schmerzfreiheit müssen wichtiger sein als ein niedliches Merkmal.</p></div>
          </div>`
        }
      ],
      adoption: [
        {
          afterSelector: '.info-box',
          html: `<div class="article-rhythm compare-mini" data-enhancement="adoption-serioes">
            <div class="compare-card good"><strong>Seriös</strong><span>Schutzvertrag, Vorkontrolle, ehrliche Infos, Rücknahmezusage.</span></div>
            <div class="compare-card risk"><strong>Prüfen</strong><span>Druck, Mitleid, „sofort mitnehmen“ oder fehlende Gesundheitsinfos.</span></div>
            <div class="compare-card bad"><strong>Finger weg</strong><span>Kofferraum, Parkplatz, mehrere Rassen, kein Muttertier, Bargeld-Druck.</span></div>
          </div>`
        }
      ],
      selbsttest: [],
      notfall: [
        {
          afterHeading: 'Vergiftungsgefahren',
          html: `<div class="article-rhythm share-callout" data-enhancement="notfall-speichern">
            <span class="eyebrow">Speichern, bevor es ernst wird</span>
            <h3>Im Notfall suchst du nicht nach Haltungstipps. Du brauchst Nummern und klare Reihenfolge.</h3>
            <p>Teile diese Seite mit Menschen, die Tiere halten. Nicht später, sondern solange noch Ruhe ist.</p>
            <div class="share-actions">
              <button class="share-btn" onclick="shareThis('whatsapp', 'Tier-Notfall: Warnsignale, Vergiftungen und die richtige Reihenfolge. Speichern und teilen:')">WhatsApp</button>
              <button class="share-btn" onclick="shareThis('copy')">Link kopieren</button>
            </div>
          </div>`
        }
      ],
      wissen: [
        {
          afterSelector: '.myth-panel',
          html: `<div class="article-rhythm share-callout" data-enhancement="wissen-mythen-share">
            <span class="eyebrow">Mythen stoppen</span>
            <h3>Ein harmloser Satz kann schlechte Haltung normal machen.</h3>
            <p>Teile die Mythenliste, wenn jemand mit „das war schon immer so“ argumentiert.</p>
            <div class="share-actions">
              <button class="share-btn" onclick="shareThis('whatsapp', 'Haustier-Mythen: Was stimmt wirklich und was schadet Tieren?')">WhatsApp</button>
              <button class="share-btn" onclick="shareThis('copy')">Link kopieren</button>
            </div>
          </div>`
        }
      ],
      'noch-nicht-bereit': [
        {
          afterHeading: 'Kein Tier ist besser',
          html: `<div class="article-rhythm share-callout" data-enhancement="nicht-bereit-share">
            <span class="eyebrow">Entlastend teilen</span>
            <h3>Warten ist kein Scheitern. Warten kann Fürsorge sein.</h3>
            <p>Diese Perspektive hilft Menschen, die ein Tier wollen, aber eigentlich spüren, dass gerade zu viel wackelt.</p>
            <div class="share-actions">
              <button class="share-btn" onclick="shareThis('whatsapp', 'Kein Tier zu nehmen kann die tierliebste Entscheidung sein. Lies das:')">WhatsApp</button>
              <button class="share-btn" onclick="shareThis('copy')">Link kopieren</button>
            </div>
          </div>`
        }
      ]
    };

    Object.keys(articleEnhancementAddons).forEach(function(pageId) {
      articleEnhancements[pageId] = (articleEnhancements[pageId] || []).concat(articleEnhancementAddons[pageId]);
    });

    function hydrateArticleHeroImages() {
      Object.keys(articleHeroImages).forEach(function(pageId) {
        var page = document.getElementById(pageId);
        if (!page) return;
        var hero = page.querySelector('.hero');
        if (!hero) return;
        var container = hero.querySelector('.container');
        if (!container || container.querySelector('.article-hero-media')) return;

        var config = articleHeroImages[pageId];
        var copy = document.createElement('div');
        copy.className = 'article-hero-copy';
        while (container.firstChild) {
          copy.appendChild(container.firstChild);
        }

        var media = document.createElement('figure');
        media.className = 'article-hero-media image-context-card';
        media.style.setProperty('--image-position', config.position);
        media.dataset.imagePurpose = config.purpose;
        media.dataset.shareReason = config.shareReason;

        var img = document.createElement('img');
        img.src = assetUrl(config.src);
        img.alt = config.alt;
        img.loading = 'eager';
        img.decoding = 'async';

        media.appendChild(img);
        if (config.caption) {
          var caption = document.createElement('figcaption');
          caption.className = 'context-caption';
          caption.textContent = config.caption;
          media.appendChild(caption);
        }
        container.appendChild(copy);
        container.appendChild(media);
      });
    }

    function findHeading(page, text) {
      return Array.from(page.querySelectorAll('h2, h3')).find(function(heading) {
        return heading.textContent.replace(/\s+/g, ' ').trim().indexOf(text) !== -1;
      });
    }

    function hydrateArticleEnhancements() {
      Object.keys(articleEnhancements).forEach(function(pageId) {
        var page = document.getElementById(pageId);
        if (!page || page.dataset.enhancementsHydrated === 'true') return;

        articleEnhancements[pageId].forEach(function(item) {
          var target = item.afterSelector ? page.querySelector(item.afterSelector) : findHeading(page, item.afterHeading);
          if (!target) return;
          target.insertAdjacentHTML('afterend', item.html);
        });

        normalizeAssetUrls(page);

        page.dataset.enhancementsHydrated = 'true';
      });
    }

    function hydrateResponsiveTables() {
      document.querySelectorAll('.cost-table').forEach(function(table) {
        var headers = Array.from(table.querySelectorAll('thead th')).map(function(th) {
          return th.textContent.replace(/\s+/g, ' ').trim();
        });
        if (!headers.length) return;

        table.querySelectorAll('tbody tr').forEach(function(row) {
          var cells = Array.from(row.children);
          cells.forEach(function(cell, index) {
            if (cell.tagName !== 'TD') return;
            var span = Number(cell.getAttribute('colspan') || 1);
            var label = headers.slice(index, index + span).join(' / ');
            cell.dataset.label = label || headers[index] || '';
          });
        });
      });
    }

    function hydrateArticleKickers() {
      var labels = {
        mensch: ['Vor dem Kauf', 'Selbstlügen prüfen', 'Verzicht ist erlaubt'],
        hunde: ['4–5 h allein', '12–20 Tsd. €', 'Beziehung täglich'],
        katzen: ['Nicht allein denken', 'Kastration schützt', 'Leises Leiden'],
        voegel: ['Schwarm statt Spiegel', 'UV-Licht', 'Freiflug'],
        kleintiere: ['Klein ist nicht einfach', 'Fläche', 'Zähne und Tierarzt'],
        exoten: ['Technik ist Haltung', 'UV-B', 'Meldepflichten'],
        pferde: ['Herde', 'Bewegung', 'Kosten über Jahre'],
        kastration: ['Prävention', 'Streuner stoppen', 'Mythen klären'],
        qualzucht: ['Form darf nicht leiden', 'Nachfrage stoppen', 'Adoption'],
        adoption: ['Seriös prüfen', 'Nicht billig kaufen', 'Zweite Chance'],
        selbsttest: ['15 Fragen', 'Ehrlich antworten', 'Vor dem Tier'],
        notfall: ['Anrufen', 'Sichern', 'Hinfahren'],
        wissen: [
          { text: 'Mythen', href: '#mythen' },
          { text: 'Globuli', href: '#globuli' },
        ],
        'wildkatzenbaby-gefunden': ['Nicht mitnehmen', 'Merkmale prüfen', 'Fachstelle rufen'],
        glossar: [
          { text: 'Begriffe', href: '#begriffe' },
          { text: 'Suche', href: '#glossary-search' },
          { text: 'Tierschutzwissen', href: '#begriffe' }
        ],
        'noch-nicht-bereit': ['Warten erlaubt', 'Anders helfen', 'Später planen']
      };

      Object.keys(labels).forEach(function(pageId) {
        var page = document.getElementById(pageId);
        if (!page) return;
        var copy = page.querySelector('.article-hero-copy');
        if (!copy || copy.querySelector('.article-kicker')) return;
        var kicker = document.createElement('div');
        kicker.className = 'article-kicker';
        labels[pageId].forEach(function(label) {
          if (typeof label === 'string') {
            var span = document.createElement('span');
            span.textContent = label;
            kicker.appendChild(span);
            return;
          }

          var link = document.createElement('a');
          link.href = label.href;
          link.textContent = label.text;
          kicker.appendChild(link);
        });
        copy.appendChild(kicker);
      });
    }

    function hydrateMythRows() {
      var mythList = document.getElementById('myth-list');
      if (!mythList || mythList.dataset.rowsHydrated === 'true') return;
      var statuses = ['Kontext', 'Falsch', 'Falsch', 'Kontext', 'Falsch', 'Falsch', 'Falsch', 'Kontext', 'Falsch', 'Falsch', 'Falsch', 'Teils'];
      mythList.querySelectorAll('.accordion-header').forEach(function(header, index) {
        var claim = header.textContent.replace(/\s+/g, ' ').trim();
        header.textContent = '';
        var status = document.createElement('span');
        var value = statuses[index] || 'Falsch';
        status.className = 'myth-status' + (value === 'Kontext' ? ' context' : value === 'Teils' ? ' partly' : '');
        status.textContent = value;
        var text = document.createElement('span');
        text.className = 'claim-text';
        text.textContent = claim;
        header.appendChild(status);
        header.appendChild(text);
      });
      mythList.dataset.rowsHydrated = 'true';
    }

    var currentTestStep = 1;
    var TEST_TOTAL_QUESTIONS = 15;
    var TEST_STEP_SIZE = 1;
    var TEST_TOTAL_STEPS = Math.ceil(TEST_TOTAL_QUESTIONS / TEST_STEP_SIZE);
    var TEST_STEP_TITLES = [
      'Zeit im Alltag',
      'Finanzieller Puffer',
      'Stabilität',
      'Haushalt',
      'Lebenserwartung',
      'Betreuung',
      'Motiv',
      'Wissen',
      'Geduld',
      'Kastration',
      'Krankheit und Alter',
      'Tierarzt',
      'Lebensänderungen',
      'Platz',
      'Allergien'
    ];

    function hydrateTestProgress() {
      var form = document.getElementById('test-form');
      if (!form) return;
      updateTestProgress();
    }

    function getTestStepForQuestion(questionNumber) {
      return Math.ceil(questionNumber / TEST_STEP_SIZE);
    }

    function getAnsweredTestCount() {
      var answered = 0;
      for (var i = 1; i <= TEST_TOTAL_QUESTIONS; i++) {
        if (document.querySelector('input[name="q' + i + '"]:checked')) answered++;
      }
      return answered;
    }

    function isTestQuestionAnswered(questionNumber) {
      return Boolean(document.querySelector('input[name="q' + questionNumber + '"]:checked'));
    }

    function isCurrentTestStepComplete() {
      var start = ((currentTestStep - 1) * TEST_STEP_SIZE) + 1;
      var end = Math.min(start + TEST_STEP_SIZE - 1, TEST_TOTAL_QUESTIONS);
      for (var i = start; i <= end; i++) {
        if (!isTestQuestionAnswered(i)) return false;
      }
      return true;
    }

    function getFirstIncompleteTestQuestion() {
      for (var i = 1; i <= TEST_TOTAL_QUESTIONS; i++) {
        if (!isTestQuestionAnswered(i)) return i;
      }
      return null;
    }

    function setTestStepStatus(message) {
      var status = document.getElementById('test-step-status');
      if (status) status.textContent = message || '';
    }

    function updateTestProgress(options) {
      currentTestStep = Math.max(1, Math.min(currentTestStep, TEST_TOTAL_STEPS));

      document.querySelectorAll('#test-form .test-question').forEach(function(question) {
        var questionNumber = parseInt(question.dataset.question, 10);
        question.classList.toggle('is-hidden', getTestStepForQuestion(questionNumber) !== currentTestStep);
      });

      var answered = getAnsweredTestCount();
      var percent = Math.round((answered / TEST_TOTAL_QUESTIONS) * 100);
      var stepLabel = document.getElementById('test-progress-label');
      var answeredLabel = document.getElementById('test-answered-label');
      var stepTitle = document.getElementById('test-step-title');
      var bar = document.getElementById('test-progress-bar');
      var prev = document.getElementById('test-prev');
      var next = document.getElementById('test-next');
      var submit = document.getElementById('test-submit');

      if (stepLabel) stepLabel.textContent = 'Schritt ' + currentTestStep + ' von ' + TEST_TOTAL_STEPS;
      if (answeredLabel) answeredLabel.textContent = answered + '/' + TEST_TOTAL_QUESTIONS + ' beantwortet';
      if (stepTitle) stepTitle.textContent = TEST_STEP_TITLES[currentTestStep - 1] || 'Selbsttest';
      if (bar) bar.style.width = Math.max(7, percent) + '%';
      if (bar) bar.setAttribute('aria-valuenow', String(answered));
      if (prev) prev.hidden = currentTestStep === 1;
      if (next) next.hidden = currentTestStep === TEST_TOTAL_STEPS;
      if (submit) submit.hidden = currentTestStep !== TEST_TOTAL_STEPS;

      if (options && options.scroll) {
        var card = document.getElementById('test-progress-card');
        scrollElementIntoView(card, { behavior: 'smooth', block: 'start' });
      }
    }

    function changeTestStep(direction) {
      if (direction > 0 && !isCurrentTestStepComplete()) {
        setTestStepStatus('Bitte beantworte diese Frage, bevor du weitergehst.');
        return;
      }
      setTestStepStatus('');
      currentTestStep += direction;
      updateTestProgress({ scroll: true });
    }

    // ===== ROUTING =====
    function navigateTo(page) {
      if (document.body && document.body.dataset.staticSite === 'true') {
        window.location.href = staticRouteFor(page);
        return;
      }
      document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
      document.querySelectorAll('.nav-link[data-page]').forEach(function(l) { l.classList.remove('active'); });
      var target = document.getElementById(page);
      if (target) {
        target.classList.add('active');
        var link = document.querySelector('.nav-link[data-page="' + page + '"]');
        if (link) link.classList.add('active');
      }
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      closeMobileNav();
      closeDropdowns();
      history.replaceState(null, '', page === 'startseite' ? location.pathname : '#' + page);
    }

    window.addEventListener('hashchange', function() {
      var hash = location.hash.slice(1);
      if (hash) navigateTo(hash);
    });

    document.addEventListener('DOMContentLoaded', function() {
      hydrateArticleHeroImages();
      hydrateArticleEnhancements();
      hydrateArticleKickers();
      hydrateResponsiveTables();
      hydrateMythRows();
      hydrateTestProgress();
      normalizeAssetUrls(document);
      if (document.body && document.body.dataset.staticSite === 'true') {
        var pageId = document.body.dataset.pageId || 'startseite';
        var hash = location.hash.slice(1);
        if (hash && staticPageRoutes[hash] && hash !== pageId) {
          window.location.replace(staticRouteFor(hash));
          return;
        }
        document.querySelectorAll('[data-page]').forEach(function(link) {
          var active = link.dataset.page === pageId;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'page');
          else link.removeAttribute('aria-current');
        });
        document.querySelectorAll('.dropdown').forEach(function(dropdown) {
          var hasActive = dropdown.querySelector('[aria-current="page"]');
          var toggle = dropdown.querySelector('.dropdown-toggle');
          if (toggle && hasActive) toggle.setAttribute('aria-current', 'page');
        });
        initAccessibilityState();
        initContactForms();
        document.addEventListener('keydown', function(event) {
          if (event.key === 'Escape') {
            closeDropdowns();
            closeMobileNav();
          }
        });
        return;
      }
      initAccessibilityState();
      initContactForms();
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
          closeDropdowns();
          closeMobileNav();
        }
      });
      var hash = location.hash.slice(1);
      navigateTo(hash || 'startseite');
    });

    function initContactForms() {
      document.querySelectorAll('[data-contact-form]').forEach(function(form) {
        var submit = form.querySelector('[data-contact-submit]');
        var status = form.querySelector('[data-contact-status]');
        if (!submit || !status) return;

        form.addEventListener('submit', function(event) {
          event.preventDefault();
          submitContactForm(form, submit, status);
        });
      });
    }

    function setContactFormStatus(status, message, state) {
      if (!status) return;
      status.textContent = message || '';
      status.classList.toggle('is-success', state === 'success');
      status.classList.toggle('is-error', state === 'error');
    }

    function contactFormPayload(form) {
      var data = new FormData(form);
      var payload = {};

      data.forEach(function(value, key) {
        if (key.slice(-2) === '[]') {
          var listKey = key.slice(0, -2);
          if (!Array.isArray(payload[listKey])) payload[listKey] = [];
          payload[listKey].push(String(value));
          return;
        }
        payload[key] = String(value);
      });

      payload.pageUrl = window.location.href;
      payload.submittedAt = new Date().toISOString();
      return payload;
    }

    function contactReasonSentence(reason) {
      switch (reason) {
        case 'Ich habe Fragen BEVOR ich mir ein Tier anschaffe':
          return 'Ich möchte mich vor der Anschaffung eines Tieres gut informieren und hätte dazu eine Frage.';
        case 'Ich brauche Hilfe mit meinem Tier':
          return 'Ich brauche Unterstützung bei einer Frage rund um mein Tier.';
        case 'Ich suche ein Tier zur Adoption oder möchte eins vermitteln':
          return 'Ich melde mich, weil es um Adoption oder Vermittlung eines Tieres geht.';
        case 'Ich habe Feedback oder Korrekturen zur Website':
          return 'Ich habe Feedback oder eine Korrektur zur Website.';
        case 'Ich möchte das Projekt unterstützen oder zusammenarbeiten':
          return 'Ich möchte das Projekt unterstützen oder über eine Zusammenarbeit sprechen.';
        default:
          return 'Ich melde mich über Wa(h)re Haustierliebe.';
      }
    }

    function contactMailSubject(payload) {
      var name = payload.name ? ' von ' + payload.name : '';
      switch (payload.kontaktgrund) {
        case 'Ich habe Fragen BEVOR ich mir ein Tier anschaffe':
          return 'Wa(h)re Haustierliebe: Frage vor Tieranschaffung' + name;
        case 'Ich brauche Hilfe mit meinem Tier':
          return 'Wa(h)re Haustierliebe: Hilfe mit Tier' + name;
        case 'Ich suche ein Tier zur Adoption oder möchte eins vermitteln':
          return 'Wa(h)re Haustierliebe: Adoption oder Vermittlung' + name;
        case 'Ich habe Feedback oder Korrekturen zur Website':
          return 'Wa(h)re Haustierliebe: Feedback zur Website' + name;
        case 'Ich möchte das Projekt unterstützen oder zusammenarbeiten':
          return 'Wa(h)re Haustierliebe: Unterstützung oder Zusammenarbeit' + name;
        default:
          return 'Wa(h)re Haustierliebe: Kontaktanfrage' + name;
      }
    }

    function contactMailBody(payload) {
      var tierart = Array.isArray(payload.tierart) && payload.tierart.length ? payload.tierart.join(', ') : 'nicht angegeben';
      var name = payload.name || '';
      var lines = [
        'Hallo Annemarie und Erik,',
        '',
        contactReasonSentence(payload.kontaktgrund),
        ''
      ];

      if (payload.message) {
        lines.push(
          'Meine Nachricht',
          '----------------',
          payload.message,
          ''
        );
      }

      lines.push(
        'Meine Kontaktdaten',
        '------------------',
        'Name: ' + (payload.name || '-'),
        'E-Mail: ' + (payload.email || '-'),
        '',
        'Angaben zur Anfrage',
        '-------------------',
        'Kontaktgrund: ' + (payload.kontaktgrund || '-'),
        'Tierart: ' + tierart,
        'Seite: ' + (payload.pageUrl || '-'),
        '',
        'Viele Grüße',
        name,
        ''
      );

      return lines.join('\n');
    }

    function openContactMailDraft(form, payload) {
      var to = form.dataset.contactEmail || 'mail@andersen-webworks.de';
      var subject = contactMailSubject(payload);
      var href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(contactMailBody(payload));
      window.location.href = href;
    }

    function submitContactForm(form, submit, status) {
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var payload = contactFormPayload(form);
      if (payload.website) {
        setContactFormStatus(status, 'Danke. Deine Nachricht wurde vorbereitet.', 'success');
        return;
      }

      var previousLabel = submit.textContent;
      submit.disabled = true;
      submit.textContent = 'Mail-Entwurf wird geöffnet ...';
      setContactFormStatus(status, 'Wir öffnen dein E-Mail-Programm mit einem vorbereiteten Entwurf.', '');

      try {
        openContactMailDraft(form, payload);
        setContactFormStatus(status, 'Dein Mail-Entwurf wurde geöffnet. Bitte prüfe ihn kurz und sende ihn in deinem E-Mail-Programm ab.', 'success');
      } catch (error) {
        setContactFormStatus(status, 'Der Mail-Entwurf konnte nicht automatisch geöffnet werden. Schreibe uns bitte direkt an mail@andersen-webworks.de.', 'error');
      } finally {
        window.setTimeout(function() {
          submit.disabled = false;
          submit.textContent = previousLabel;
        }, 600);
      }
    }

    var feedbackModal = null;
    var feedbackForm = null;
    var feedbackStatus = null;
    var feedbackSelectionButton = null;
    var feedbackSelectionRange = null;
    var feedbackState = {};
    var feedbackReady = false;

    function initCollaborationFlow() {
      if (feedbackReady) return;
      feedbackReady = true;
      var page = document.querySelector(collaborationPageSelector());
      if (!page) return;
      decorateFeedbackSections();
      ensureFeedbackModal();
      initSelectionFeedback();
    }

    function collaborationPageSelector() {
      return '.page';
    }

    function collapseText(value) {
      var source = String(value || '');
      var result = '';
      var pendingSpace = false;
      for (var index = 0; index < source.length; index += 1) {
        var code = source.charCodeAt(index);
        var isSpace = code === 9 || code === 10 || code === 11 || code === 12 || code === 13 || code === 32 || code === 160;
        if (isSpace) {
          pendingSpace = result.length > 0;
          continue;
        }
        if (pendingSpace) {
          result += ' ';
          pendingSpace = false;
        }
        result += source.charAt(index);
      }
      return result;
    }

    function limitText(value, maxLength) {
      var text = collapseText(value);
      if (text.length <= maxLength) return text;
      return text.slice(0, maxLength - 1) + '…';
    }

    function feedbackPageForNode(node) {
      if (!node) return null;
      var element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
      if (!element) return null;
      return element.closest(collaborationPageSelector());
    }

    function sectionTitleForElement(element) {
      if (!element) return '';
      var current = element.nodeType === Node.ELEMENT_NODE ? element : element.parentElement;
      while (current) {
        var previous = current.previousElementSibling;
        while (previous) {
          if (previous.matches && previous.matches('.section-feedback-heading')) {
            var wrapped = previous.querySelector('h2');
            return wrapped ? collapseText(wrapped.textContent) : '';
          }
          if (previous.matches && previous.matches('h2')) return collapseText(previous.textContent);
          previous = previous.previousElementSibling;
        }
        if (current.matches && current.matches('.container')) break;
        current = current.parentElement;
      }
      return '';
    }

    function pageTitleFor(page) {
      if (!page) return document.title;
      var heading = page.querySelector('.hero h1, h1');
      return heading ? collapseText(heading.textContent) : document.title;
    }

    function decorateFeedbackSections() {
      var count = 0;
      document.querySelectorAll(collaborationPageSelector()).forEach(function(page) {
        page.querySelectorAll('.section > .container > .section-feedback-heading').forEach(function(wrapper) {
          var heading = wrapper.querySelector('h2');
          var button = wrapper.querySelector('.section-feedback-action');
          if (!heading || !button) return;
          bindSectionFeedbackButton(button, page, heading);
          count += 1;
        });

        page.querySelectorAll('.section > .container > h2').forEach(function(heading, index) {
          if (!heading.id) heading.id = 'hinweis-' + (page.id || 'seite') + '-' + (index + 1);

          var parent = heading.parentElement;
          var wrapper = document.createElement('div');
          wrapper.className = 'section-feedback-heading';
          parent.insertBefore(wrapper, heading);
          wrapper.appendChild(heading);

          var button = document.createElement('button');
          button.type = 'button';
          button.className = 'section-feedback-action';
          button.dataset.feedbackSection = heading.id;
          button.setAttribute('aria-label', 'Hinweis zu diesem Abschnitt senden');
          button.innerHTML = '<span class="feedback-action-mark" aria-hidden="true">?</span><span>Hinweis geben</span>';
          bindSectionFeedbackButton(button, page, heading);
          wrapper.appendChild(button);
          count += 1;
        });
      });
      return count;
    }

    function bindSectionFeedbackButton(button, page, heading) {
      if (!button || button._feedbackBound) return;
      button._feedbackBound = true;
      button.addEventListener('click', function() {
        openFeedbackDialog({
          mode: 'section',
          pageId: page.id || '',
          pageTitle: pageTitleFor(page),
          sectionTitle: collapseText(heading.textContent),
          selectedText: '',
          sourceUrl: window.location.href.split('#')[0] + '#' + heading.id
        }, button);
      });
    }

    function ensureFeedbackModal() {
      feedbackModal = document.getElementById('feedback-modal');
      if (!feedbackModal) {
        feedbackModal = document.createElement('div');
        feedbackModal.id = 'feedback-modal';
        feedbackModal.className = 'feedback-modal';
        feedbackModal.hidden = true;
        feedbackModal.innerHTML = [
          '<div class="feedback-dialog" role="dialog" aria-modal="true" aria-labelledby="feedback-title" aria-describedby="feedback-intro">',
          '  <div class="feedback-dialog-head">',
          '    <div>',
          '      <h2 id="feedback-title">Hinweis geben</h2>',
          '      <p id="feedback-intro">Wir prüfen Hinweise redaktionell. Warum und wie, steht auf der <a href="/mitmachen/">Mitmachen-Seite</a>.</p>',
          '    </div>',
          '    <button type="button" class="feedback-close" data-feedback-close aria-label="Hinweisformular schließen">×</button>',
          '  </div>',
          '  <div class="feedback-dialog-body">',
          '    <div class="feedback-context" data-feedback-context></div>',
          '    <div class="feedback-quote" data-feedback-quote-wrap hidden><strong>Ausgewählte Textstelle</strong><blockquote data-feedback-quote></blockquote></div>',
          '    <form data-feedback-form novalidate>',
          '      <div class="feedback-field">',
          '        <label for="feedback-message">Dein Hinweis</label>',
          '        <textarea id="feedback-message" name="message" required placeholder="Was stimmt nicht, was fehlt oder welche Quelle sollen wir prüfen?"></textarea>',
          '      </div>',
          '      <div class="feedback-field">',
          '        <label for="feedback-source">Quelle optional</label>',
          '        <input id="feedback-source" name="source" type="url" inputmode="url" placeholder="https://...">',
          '      </div>',
          '      <div class="sr-only" aria-hidden="true">',
          '        <label for="feedback-website">Website</label>',
          '        <input id="feedback-website" name="website" tabindex="-1" autocomplete="off">',
          '      </div>',
          '      <div class="feedback-actions">',
          '        <button type="submit" class="btn btn-primary" data-feedback-submit>Mail-Entwurf öffnen</button>',
          '        <button type="button" class="btn btn-outline" data-feedback-close>Abbrechen</button>',
          '      </div>',
          '      <p class="feedback-status" data-feedback-status aria-live="polite"></p>',
          '    </form>',
          '  </div>',
          '</div>'
        ].join('');
        document.body.appendChild(feedbackModal);
      }

      feedbackForm = feedbackModal.querySelector('[data-feedback-form]');
      feedbackStatus = feedbackModal.querySelector('[data-feedback-status]');

      feedbackModal.querySelectorAll('[data-feedback-close]').forEach(function(closeButton) {
        closeButton.addEventListener('click', closeFeedbackDialog);
      });

      feedbackModal.addEventListener('click', function(event) {
        if (event.target === feedbackModal) closeFeedbackDialog();
      });

      if (feedbackForm) {
        feedbackForm.addEventListener('submit', submitFeedbackForm);
      }
    }

    function initSelectionFeedback() {
      feedbackSelectionButton = document.getElementById('selection-feedback-button');
      if (!feedbackSelectionButton) {
        feedbackSelectionButton = document.createElement('button');
        feedbackSelectionButton.type = 'button';
        feedbackSelectionButton.id = 'selection-feedback-button';
        feedbackSelectionButton.className = 'selection-feedback-button';
        feedbackSelectionButton.innerHTML = '<span class="feedback-action-mark" aria-hidden="true">?</span><span>Hinweis zur Auswahl</span>';
        document.body.appendChild(feedbackSelectionButton);
      }

      feedbackSelectionButton.addEventListener('click', function() {
        var selection = window.getSelection ? window.getSelection() : null;
        var range = feedbackSelectionRange || (selection && selection.rangeCount ? selection.getRangeAt(0) : null);
        if (!range) return;
        var page = feedbackPageForNode(range.commonAncestorContainer);
        if (!page) return;
        openFeedbackDialog({
          mode: 'selection',
          pageId: page.id || '',
          pageTitle: pageTitleFor(page),
          sectionTitle: sectionTitleForElement(range.commonAncestorContainer),
          selectedText: limitText(range.toString(), 1200),
          sourceUrl: window.location.href.split('#')[0]
        }, feedbackSelectionButton);
        hideSelectionFeedbackButton();
      });

      document.addEventListener('mouseup', scheduleSelectionFeedbackCheck);
      document.addEventListener('keyup', scheduleSelectionFeedbackCheck);
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && feedbackModal && !feedbackModal.hidden) {
          closeFeedbackDialog();
        }
      });
      document.addEventListener('touchend', scheduleSelectionFeedbackCheck, { passive: true });
      document.addEventListener('scroll', hideSelectionFeedbackButton, { passive: true });
    }

    function scheduleSelectionFeedbackCheck() {
      window.setTimeout(updateSelectionFeedbackButton, 40);
    }

    function updateSelectionFeedbackButton() {
      if (!feedbackSelectionButton || (feedbackModal && !feedbackModal.hidden)) return;
      var selection = window.getSelection ? window.getSelection() : null;
      if (!selection || selection.isCollapsed || !selection.rangeCount) {
        hideSelectionFeedbackButton();
        return;
      }

      var range = selection.getRangeAt(0);
      var page = feedbackPageForNode(range.commonAncestorContainer);
      var selectedText = collapseText(range.toString());
      if (!page || selectedText.length < 3) {
        hideSelectionFeedbackButton();
        return;
      }

      feedbackSelectionRange = range.cloneRange();
      var rect = range.getBoundingClientRect();
      if (!rect || rect.bottom < 0 || rect.top > window.innerHeight || (rect.width < 1 && rect.height < 1)) {
        hideSelectionFeedbackButton();
        return;
      }
      var buttonWidth = feedbackSelectionButton.offsetWidth || 190;
      var buttonHeight = feedbackSelectionButton.offsetHeight || 40;
      var left = Math.max(12, Math.min(rect.left + (rect.width / 2) - (buttonWidth / 2), window.innerWidth - buttonWidth - 12));
      var top = Math.max(76, Math.min(rect.top - buttonHeight - 10, window.innerHeight - buttonHeight - 12));
      feedbackSelectionButton.style.left = left + 'px';
      feedbackSelectionButton.style.top = top + 'px';
      feedbackSelectionButton.classList.add('is-visible');
    }

    function hideSelectionFeedbackButton() {
      if (feedbackSelectionButton) feedbackSelectionButton.classList.remove('is-visible');
    }

    function setFeedbackStatus(message, state) {
      if (!feedbackStatus) return;
      feedbackStatus.textContent = message || '';
      feedbackStatus.classList.toggle('is-success', state === 'success');
      feedbackStatus.classList.toggle('is-error', state === 'error');
    }

    function openFeedbackDialog(state, trigger) {
      ensureFeedbackModal();
      feedbackState = state || {};
      feedbackState.trigger = trigger || null;

      var context = feedbackModal.querySelector('[data-feedback-context]');
      var quoteWrap = feedbackModal.querySelector('[data-feedback-quote-wrap]');
      var quote = feedbackModal.querySelector('[data-feedback-quote]');
      var contextHtml = '<strong>Bezug</strong><span>' + escapeFeedbackHtml(feedbackState.pageTitle || 'Aktuelle Seite') + '</span>';
      if (feedbackState.sectionTitle) {
        contextHtml += '<span>Abschnitt: ' + escapeFeedbackHtml(feedbackState.sectionTitle) + '</span>';
      }
      context.innerHTML = contextHtml;

      if (feedbackState.selectedText) {
        quote.textContent = '„' + feedbackState.selectedText + '“';
        quoteWrap.hidden = false;
      } else {
        quote.textContent = '';
        quoteWrap.hidden = true;
      }

      if (feedbackForm) feedbackForm.reset();
      setFeedbackStatus('', '');
      feedbackModal.hidden = false;
      document.body.classList.add('feedback-open');
      window.setTimeout(function() {
        var message = feedbackModal.querySelector('#feedback-message');
        if (message) message.focus();
      }, 0);
    }

    function closeFeedbackDialog() {
      if (!feedbackModal) return;
      feedbackModal.hidden = true;
      document.body.classList.remove('feedback-open');
      if (feedbackState.trigger && typeof feedbackState.trigger.focus === 'function') {
        feedbackState.trigger.focus();
      }
    }

    function escapeFeedbackHtml(value) {
      return String(value || '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
    }

    function feedbackMailSubject(payload) {
      var target = payload.sectionTitle || payload.pageTitle || 'Website';
      return 'Wa(h)re Haustierliebe: Hinweis zu ' + target;
    }

    function feedbackMailBody(payload) {
      var lines = [
        'Hallo Annemarie und Erik,',
        '',
        'ich habe einen Hinweis zu Wa(h)re Haustier(liebe):',
        '',
        'Hinweis',
        '-------',
        payload.message || '-',
        ''
      ];

      if (payload.selectedText) {
        lines.push(
          'Ausgewählte Textstelle',
          '----------------------',
          '„' + payload.selectedText + '“',
          ''
        );
      }

      if (payload.source) {
        lines.push(
          'Quelle oder Link',
          '----------------',
          payload.source,
          ''
        );
      }

      lines.push(
        'Bezug',
        '-----',
        'Seite: ' + (payload.pageTitle || '-'),
        'Abschnitt: ' + (payload.sectionTitle || '-'),
        'URL: ' + (payload.sourceUrl || window.location.href),
        '',
        'Zeitpunkt: ' + new Date().toISOString(),
        '',
        'Viele Grüße'
      );

      return lines.join('\n');
    }

    function openFeedbackMailDraft(payload) {
      var to = 'mail@andersen-webworks.de';
      var href = 'mailto:' + to + '?subject=' + encodeURIComponent(feedbackMailSubject(payload)) + '&body=' + encodeURIComponent(feedbackMailBody(payload));
      window.location.href = href;
    }

    function submitFeedbackForm(event) {
      event.preventDefault();
      if (!feedbackForm) return;
      if (!feedbackForm.checkValidity()) {
        feedbackForm.reportValidity();
        return;
      }

      var data = new FormData(feedbackForm);
      if (data.get('website')) {
        setFeedbackStatus('Danke. Dein Hinweis wurde vorbereitet.', 'success');
        return;
      }

      var payload = {
        pageId: feedbackState.pageId || '',
        pageTitle: feedbackState.pageTitle || '',
        sectionTitle: feedbackState.sectionTitle || '',
        selectedText: feedbackState.selectedText || '',
        sourceUrl: feedbackState.sourceUrl || window.location.href,
        message: String(data.get('message') || ''),
        source: String(data.get('source') || '')
      };
      var submit = feedbackForm.querySelector('[data-feedback-submit]');
      var previousLabel = submit ? submit.textContent : '';
      if (submit) {
        submit.disabled = true;
        submit.textContent = 'Mail-Entwurf wird geöffnet ...';
      }
      setFeedbackStatus('Wir öffnen dein E-Mail-Programm mit einem vorbereiteten Entwurf.', '');

      try {
        openFeedbackMailDraft(payload);
        setFeedbackStatus('Danke für den Hinweis. Bitte prüfe den Mail-Entwurf kurz und sende ihn in deinem E-Mail-Programm ab.', 'success');
      } catch (error) {
        setFeedbackStatus('Der Mail-Entwurf konnte nicht automatisch geöffnet werden. Schreibe uns bitte direkt an mail@andersen-webworks.de.', 'error');
      } finally {
        window.setTimeout(function() {
          if (submit) {
            submit.disabled = false;
            submit.textContent = previousLabel;
          }
        }, 600);
      }
    }

    var glossaryTooltip = null;
    var activeGlossaryTrigger = null;
    var glossaryTooltipReady = false;
    var glossaryHideTimer = null;

    function initGlossaryTooltips() {
      if (glossaryTooltipReady) return;
      var triggers = document.querySelectorAll('.glossary-term[data-glossary-title][data-glossary-text]');
      if (!triggers.length) return;

      glossaryTooltip = document.getElementById('glossary-term-popover');
      if (!glossaryTooltip) {
        glossaryTooltip = document.createElement('div');
        glossaryTooltip.id = 'glossary-term-popover';
        document.body.appendChild(glossaryTooltip);
      }
      glossaryTooltip.className = 'glossary-term-popover';
      glossaryTooltip.setAttribute('role', 'tooltip');
      glossaryTooltip.setAttribute('aria-label', 'Glossarbegriff');
      glossaryTooltip.textContent = '';
      glossaryTooltipReady = true;

      triggers.forEach(function(trigger) {
        trigger.setAttribute('aria-describedby', 'glossary-term-popover');
        if (!trigger.closest('a')) {
          trigger.setAttribute('tabindex', '0');
          trigger.setAttribute('role', 'button');
        }

        trigger.addEventListener('mouseenter', function() {
          cancelGlossaryTooltipHide();
          showGlossaryTooltip(trigger, false);
        });

        trigger.addEventListener('mouseleave', function() {
          if (activeGlossaryTrigger === trigger && !trigger.classList.contains('is-open')) {
            scheduleGlossaryTooltipHide();
          }
        });

        trigger.addEventListener('focus', function() {
          cancelGlossaryTooltipHide();
          showGlossaryTooltip(trigger, false);
        });

        trigger.addEventListener('blur', function() {
          if (activeGlossaryTrigger === trigger && !trigger.classList.contains('is-open')) {
            scheduleGlossaryTooltipHide();
          }
        });

        trigger.addEventListener('keydown', function(event) {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (activeGlossaryTrigger === trigger && trigger.classList.contains('is-open')) {
              hideGlossaryTooltip();
              return;
            }
            showGlossaryTooltip(trigger, true);
          }
          if (event.key === 'Escape') {
            hideGlossaryTooltip();
          }
        });

        trigger.addEventListener('click', function(event) {
          event.preventDefault();
          event.stopPropagation();
          if (activeGlossaryTrigger === trigger && trigger.classList.contains('is-open')) {
            hideGlossaryTooltip();
            return;
          }
          showGlossaryTooltip(trigger, true);
        });
      });

      glossaryTooltip.addEventListener('click', function(event) {
        event.stopPropagation();
      });

      glossaryTooltip.addEventListener('mouseenter', cancelGlossaryTooltipHide);

      glossaryTooltip.addEventListener('mouseleave', function() {
        if (activeGlossaryTrigger && !activeGlossaryTrigger.classList.contains('is-open')) {
          scheduleGlossaryTooltipHide();
        }
      });

      document.addEventListener('click', function(event) {
        if (event.target.closest('.glossary-term') || event.target.closest('.glossary-term-popover')) return;
        hideGlossaryTooltip();
      });

      window.addEventListener('resize', hideGlossaryTooltip);
      window.addEventListener('scroll', function() {
        if (activeGlossaryTrigger && glossaryTooltip && glossaryTooltip.classList.contains('is-visible')) {
          positionGlossaryTooltip(activeGlossaryTrigger);
        }
      }, { passive: true });
    }

    function cancelGlossaryTooltipHide() {
      if (!glossaryHideTimer) return;
      window.clearTimeout(glossaryHideTimer);
      glossaryHideTimer = null;
    }

    function scheduleGlossaryTooltipHide() {
      cancelGlossaryTooltipHide();
      glossaryHideTimer = window.setTimeout(function() {
        hideGlossaryTooltip();
      }, 240);
    }

    function showGlossaryTooltip(trigger, keepOpen) {
      if (!glossaryTooltip) return;
      cancelGlossaryTooltipHide();

      document.querySelectorAll('.glossary-term.is-active, .glossary-term.is-open').forEach(function(term) {
        term.classList.remove('is-active', 'is-open');
      });

      activeGlossaryTrigger = trigger;
      trigger.classList.add('is-active');
      if (keepOpen) trigger.classList.add('is-open');

      glossaryTooltip.textContent = '';
      var title = document.createElement('strong');
      title.textContent = trigger.dataset.glossaryTitle;
      var text = document.createElement('span');
      text.textContent = trigger.dataset.glossaryText;
      var link = document.createElement('a');
      link.href = trigger.dataset.glossaryHref || 'glossar/index.html';
      link.textContent = 'Zum Glossar';

      glossaryTooltip.appendChild(title);
      glossaryTooltip.appendChild(text);
      glossaryTooltip.appendChild(link);
      glossaryTooltip.classList.add('is-visible');
      positionGlossaryTooltip(trigger);
    }

    function hideGlossaryTooltip() {
      if (!glossaryTooltip) return;
      cancelGlossaryTooltipHide();
      glossaryTooltip.classList.remove('is-visible', 'is-above', 'is-below');
      document.querySelectorAll('.glossary-term.is-active, .glossary-term.is-open').forEach(function(term) {
        term.classList.remove('is-active', 'is-open');
      });
      activeGlossaryTrigger = null;
    }

    function usesViewportGlossaryTooltip() {
      return window.matchMedia
        && (window.matchMedia('(max-width: 640px)').matches || window.matchMedia('(pointer: coarse)').matches);
    }

    function positionGlossaryTooltip(trigger) {
      if (!glossaryTooltip || !trigger) return;

      var viewportWidth = document.documentElement.clientWidth;
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      var rect = trigger.getBoundingClientRect();
      var gap = usesViewportGlossaryTooltip() ? 12 : 8;
      var margin = usesViewportGlossaryTooltip() ? 8 : 12;

      glossaryTooltip.style.left = '0px';
      glossaryTooltip.style.top = '0px';
      glossaryTooltip.style.right = 'auto';
      glossaryTooltip.style.bottom = 'auto';
      glossaryTooltip.classList.remove('is-above', 'is-below');

      var tooltipRect = glossaryTooltip.getBoundingClientRect();
      var isViewportTooltip = usesViewportGlossaryTooltip();
      var leftBase = isViewportTooltip ? 0 : window.scrollX;
      var topBase = isViewportTooltip ? 0 : window.scrollY;
      var triggerCenter = rect.left + (rect.width / 2);
      var left = leftBase + triggerCenter - (tooltipRect.width / 2);
      var maxLeft = leftBase + viewportWidth - tooltipRect.width - margin;
      left = Math.max(leftBase + margin, Math.min(left, maxLeft));

      var belowTop = topBase + rect.bottom + gap;
      var aboveTop = topBase + rect.top - tooltipRect.height - gap;
      var top = belowTop;
      if (rect.bottom + gap + tooltipRect.height > viewportHeight - margin) {
        top = aboveTop;
        glossaryTooltip.classList.add('is-above');
      } else {
        glossaryTooltip.classList.add('is-below');
      }
      var maxTop = topBase + viewportHeight - tooltipRect.height - margin;
      if (maxTop < topBase + margin) {
        top = topBase + margin;
      } else {
        top = Math.max(topBase + margin, Math.min(top, maxTop));
      }

      var arrowLeft = leftBase + triggerCenter - left;
      arrowLeft = Math.max(18, Math.min(arrowLeft, tooltipRect.width - 18));

      glossaryTooltip.style.left = left + 'px';
      glossaryTooltip.style.top = top + 'px';
      glossaryTooltip.style.setProperty('--glossary-arrow-left', arrowLeft + 'px');
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initGlossaryTooltips);
    } else {
      initGlossaryTooltips();
    }

    function prefersReducedMotion() {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function scrollElementIntoView(element, options) {
      if (!element) return;
      var nextOptions = options || { block: 'start' };
      if (prefersReducedMotion()) {
        nextOptions = Object.assign({}, nextOptions, { behavior: 'auto' });
      }
      element.scrollIntoView(nextOptions);
    }

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }

    function setDropdownOpen(dropdown, open) {
      if (!dropdown) return;
      dropdown.classList.toggle('open', open);
      var toggle = dropdown.querySelector('.dropdown-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    function initDropdowns() {
      document.querySelectorAll('.dropdown').forEach(function(dropdown) {
        var toggle = dropdown.querySelector('.dropdown-toggle');
        var menu = dropdown.querySelector('.dropdown-menu');
        if (!toggle || !menu) return;
        if (!menu.id) menu.id = 'dropdown-menu-' + Math.random().toString(36).slice(2);
        toggle.type = 'button';
        toggle.setAttribute('aria-haspopup', 'true');
        toggle.setAttribute('aria-expanded', dropdown.classList.contains('open') ? 'true' : 'false');
        toggle.setAttribute('aria-controls', menu.id);
        toggle.addEventListener('click', function() {
          var willOpen = !dropdown.classList.contains('open');
          closeDropdowns(dropdown);
          setDropdownOpen(dropdown, willOpen);
        });
        toggle.addEventListener('keydown', function(event) {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggle.click();
          }
          if (event.key === 'Escape') {
            setDropdownOpen(dropdown, false);
            toggle.focus();
          }
        });
        menu.addEventListener('keydown', function(event) {
          if (event.key === 'Escape') {
            setDropdownOpen(dropdown, false);
            toggle.focus();
          }
        });
      });

      document.addEventListener('click', function(event) {
        if (!event.target.closest('.dropdown')) closeDropdowns();
      });
    }

    function initAccordions() {
      document.querySelectorAll('.accordion').forEach(function(accordion, index) {
        var header = accordion.querySelector('.accordion-header');
        var body = accordion.querySelector('.accordion-body');
        if (!header || !body) return;
        var baseId = accordion.id || 'accordion-' + index;
        if (!header.id) header.id = baseId + '-button';
        if (!body.id) body.id = baseId + '-panel';
        header.type = 'button';
        header.setAttribute('aria-controls', body.id);
        body.setAttribute('aria-labelledby', header.id);
        body.setAttribute('role', 'region');
        setAccordionOpen(accordion, accordion.classList.contains('open'));
      });
    }

    function setAccordionOpen(accordion, open) {
      if (!accordion) return;
      accordion.classList.toggle('open', open);
      var header = accordion.querySelector('.accordion-header');
      var body = accordion.querySelector('.accordion-body');
      if (header) header.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (body) body.hidden = !open;
    }

    function ensureStatusRegion(id, afterElement) {
      var existing = document.getElementById(id);
      if (existing) return existing;
      if (!afterElement || !afterElement.parentElement) return null;
      var status = document.createElement('p');
      status.id = id;
      status.className = 'sr-only';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      status.setAttribute('aria-atomic', 'true');
      afterElement.insertAdjacentElement('afterend', status);
      return status;
    }

    function initAccessibilityState() {
      initDropdowns();
      initAccordions();
      var mobileNav = document.getElementById('mobile-nav');
      if (mobileNav) mobileNav.setAttribute('aria-hidden', mobileNav.classList.contains('open') ? 'false' : 'true');
      var hamburger = document.querySelector('.hamburger');
      if (hamburger) hamburger.setAttribute('aria-expanded', mobileNav && mobileNav.classList.contains('open') ? 'true' : 'false');
      var main = document.getElementById('main-content');
      if (main && !main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
      var mythSearch = document.getElementById('myth-search');
      if (mythSearch) {
        mythSearch.setAttribute('aria-describedby', 'myth-filter-status');
        ensureStatusRegion('myth-filter-status', mythSearch);
        filterMyths();
      }
      var glossarySearch = document.getElementById('glossary-search');
      if (glossarySearch) {
        glossarySearch.setAttribute('aria-describedby', 'glossary-filter-status');
        ensureStatusRegion('glossary-filter-status', glossarySearch);
        filterGlossary();
      }
      var progressBar = document.getElementById('test-progress-bar');
      if (progressBar) {
        progressBar.setAttribute('role', 'progressbar');
        progressBar.setAttribute('aria-valuemin', '0');
        progressBar.setAttribute('aria-valuemax', String(TEST_TOTAL_QUESTIONS));
      }
      initCollaborationFlow();
    }

    // ===== MOBILE NAV =====
    function toggleMobileNav() {
      var nav = document.getElementById('mobile-nav');
      var button = document.querySelector('.hamburger');
      if (!nav) return;
      var open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      nav.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (button) button.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        var firstLink = nav.querySelector('.mobile-nav-link');
        if (firstLink) firstLink.focus();
      }
    }
    function closeMobileNav() {
      var nav = document.getElementById('mobile-nav');
      var button = document.querySelector('.hamburger');
      if (!nav) return;
      var wasOpen = nav.classList.contains('open');
      nav.classList.remove('open');
      nav.setAttribute('aria-hidden', 'true');
      if (button) {
        button.setAttribute('aria-expanded', 'false');
        if (wasOpen) button.focus();
      }
    }
    function closeDropdowns(except) {
      document.querySelectorAll('.dropdown').forEach(function(d) {
        if (d !== except) setDropdownOpen(d, false);
      });
    }

    // ===== ACCORDION =====
    function toggleAccordion(btn) {
      var accordion = btn.parentElement;
      setAccordionOpen(accordion, !accordion.classList.contains('open'));
    }

    // ===== SCROLL TOP BUTTON =====
    window.addEventListener('scroll', function() {
      var btn = document.getElementById('scrollTop');
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    // ===== GLOSSARY FILTER =====
    function filterGlossary() {
      var query = document.getElementById('glossary-search').value.toLowerCase();
      var items = document.querySelectorAll('#glossary-list .glossary-item');
      var visible = 0;
      items.forEach(function(item) {
        var term = item.querySelector('dt').textContent.toLowerCase();
        var desc = item.querySelector('dd').textContent.toLowerCase();
        if (term.indexOf(query) !== -1 || desc.indexOf(query) !== -1) {
          item.classList.remove('hidden');
          visible++;
        } else {
          item.classList.add('hidden');
        }
      });
      var status = document.getElementById('glossary-filter-status');
      if (status) status.textContent = visible + ' Glossar-Einträge sichtbar.';
    }

    // ===== MYTH FILTER =====
    function filterMyths() {
      var input = document.getElementById('myth-search');
      if (!input) return;
      var query = input.value.toLowerCase().trim();
      var visible = 0;
      document.querySelectorAll('#myth-list .accordion').forEach(function(item) {
        var text = item.textContent.toLowerCase();
        var hidden = query && text.indexOf(query) === -1;
        item.classList.toggle('hidden', hidden);
        if (!hidden) visible++;
      });
      var status = document.getElementById('myth-filter-status');
      if (status) status.textContent = visible + ' Mythen sichtbar.';
    }

    // ===== SELF-TEST EVALUATION =====
    function evaluateTest() {
      var total = 0;
      var answered = 0;
      for (var i = 1; i <= TEST_TOTAL_QUESTIONS; i++) {
        var selected = document.querySelector('input[name="q' + i + '"]:checked');
        if (selected) {
          total += parseInt(selected.value);
          answered++;
        }
      }

      if (answered < TEST_TOTAL_QUESTIONS) {
        var firstIncomplete = getFirstIncompleteTestQuestion();
        currentTestStep = getTestStepForQuestion(firstIncomplete);
        updateTestProgress({ scroll: true });
        setTestStepStatus('Es fehlt noch Frage ' + firstIncomplete + '. Danach kann ich deine Auswertung anzeigen.');
        return;
      }

      setTestStepStatus('');
      var resultDiv = document.getElementById('test-result');
      var maxScore = 30;
      var percent = Math.round((total / maxScore) * 100);
      var resultClass, title, text;

      if (total >= 24) {
        resultClass = 'result-green';
        title = 'Du scheinst bereit zu sein.';
        text = '<p>Deine Antworten zeigen, dass du dir ernsthafte Gedanken gemacht hast und deine Lebenssituation grundsätzlich zu einem Tier passt. Das ist ein gutes Zeichen.</p><p>Aber: Dieser Test ersetzt keine gründliche Recherche zur konkreten Tierart. Informiere dich bei der Tierart, die dich interessiert: <a href="#hunde" onclick="navigateTo(\'hunde\');return false">Hunde</a>, <a href="#katzen" onclick="navigateTo(\'katzen\');return false">Katzen</a>, <a href="#voegel" onclick="navigateTo(\'voegel\');return false">Vögel</a>, <a href="#kleintiere" onclick="navigateTo(\'kleintiere\');return false">Kleintiere</a>, <a href="#exoten" onclick="navigateTo(\'exoten\');return false">Exoten</a> oder <a href="#pferde" onclick="navigateTo(\'pferde\');return false">Pferde</a>. Und erwäge, dein Tier <a href="#adoption" onclick="navigateTo(\'adoption\');return false">aus dem Tierschutz zu adoptieren</a>.</p>';
      } else if (total >= 16) {
        resultClass = 'result-yellow';
        title = 'Es gibt Punkte, über die du nachdenken solltest.';
        text = '<p>Einige deiner Antworten zeigen, dass noch nicht alles passt – oder dass du dir über bestimmte Aspekte der Tierhaltung noch nicht im Klaren bist. Das ist kein Urteil. Es ist eine Einladung, ehrlich hinzuschauen.</p><p>Vielleicht ist jetzt nicht der richtige Zeitpunkt. Vielleicht wird es das in einem Jahr. Oder du findest Lösungen für die offenen Punkte. Nimm dir die Zeit.</p>';
      } else {
        resultClass = 'result-red';
        title = 'Ein Tier passt gerade nicht in dein Leben.';
        text = '<p>Das klingt härter, als es gemeint ist. Deine Antworten zeigen, dass deine aktuelle Lebenssituation einem Tier nicht gerecht werden würde – finanziell, zeitlich oder von den Rahmenbedingungen her.</p><p>Das ist keine Schande. Im Gegenteil: Dass du diesen Test machst, zeigt, dass dir Tiere am Herzen liegen. Und genau deshalb wäre die verantwortungsvollste Entscheidung, jetzt kein Tier zu holen. Lebenssituationen ändern sich. Vielleicht passt es irgendwann – und dann bist du bereit.</p>';
      }

      var shareText = 'Ich habe den Tierhalter-Selbsttest gemacht – ' + total + ' von ' + maxScore + ' Punkten. Wie bereit bist du?';

      resultDiv.className = 'test-result visible ' + resultClass;
      resultDiv.innerHTML = '<h2>' + title + '</h2><p class="text-muted">Ergebnis: ' + total + ' von ' + maxScore + ' Punkten (' + percent + ' %)</p>' + text + '<div class="mt-2"><button class="btn btn-outline" onclick="navigateTo(\'mensch\')">Mehr über die Psychologie der Tierhaltung</button></div>' + '<p class="share-label mt-2">Fordere Freunde heraus – teile den Test:</p><div class="share-bar"><button class="share-btn" onclick="shareThis(\'whatsapp\', \'' + shareText.replace(/'/g, "\\'") + '\')">WhatsApp</button><button class="share-btn" onclick="shareThis(\'facebook\')">Facebook</button><button class="share-btn" onclick="shareThis(\'email\', \'' + shareText.replace(/'/g, "\\'") + '\')">E-Mail</button><button class="share-btn" onclick="shareThis(\'copy\')">Link kopieren</button></div>';
      scrollElementIntoView(resultDiv, { behavior: 'smooth', block: 'start' });
    }

    // ===== SHARE FUNCTION =====
    function openExternalShare(url) {
      var win = window.open(url, '_blank', 'noopener,noreferrer');
      if (win) win.opener = null;
    }

    function shareThis(method, customText) {
      var url = window.location.href.split('#')[0];
      var pageTitle = document.querySelector('.page.active h1');
      var title = pageTitle ? pageTitle.textContent : 'Wa(h)re Haustier(liebe)';
      var text = customText || title + ' – Ehrliche Aufklärung über Tierhaltung';

      switch(method) {
        case 'whatsapp':
          openExternalShare('https://wa.me/?text=' + encodeURIComponent(text + '\n' + url));
          break;
        case 'facebook':
          openExternalShare('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url));
          break;
        case 'email':
          window.location.href = 'mailto:?subject=' + encodeURIComponent(title + ' – Wa(h)re Haustier(liebe)') + '&body=' + encodeURIComponent(text + '\n\n' + url);
          break;
        case 'copy':
          navigator.clipboard.writeText(url).then(function() { showToast('Link kopiert!'); });
          break;
      }
    }

    function showToast(msg) {
      var existing = document.querySelector('.toast');
      if (existing) existing.remove();
      var toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = msg;
      document.body.appendChild(toast);
      setTimeout(function() { toast.classList.add('show'); }, 50);
      setTimeout(function() { toast.classList.remove('show'); setTimeout(function() { toast.remove(); }, 300); }, 2500);
    }

    // ===== RADIO BUTTON STYLING =====
    document.addEventListener('change', function(e) {
      if (e.target.type === 'radio') {
        var question = e.target.closest('.test-question');
        if (question) {
          question.querySelectorAll('.test-option').forEach(function(opt) { opt.classList.remove('selected'); });
          e.target.closest('.test-option').classList.add('selected');
          setTestStepStatus('');
          updateTestProgress();
        }
      }
    });