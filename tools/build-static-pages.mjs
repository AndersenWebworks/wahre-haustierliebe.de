import fsSync from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { glossaryAnnotationsByPage, glossaryTerms } from './glossary-data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const sourcePath = path.join(projectRoot, 'src', 'site-source.html');
const legacyIndexPath = path.join(projectRoot, 'index.html');
const baseUrl = 'https://wahre-haustierliebe.de';
const siteName = 'Wa(h)re Haustier(liebe)';
const lastmod = '2026-06-15';
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Wa(h)re Haustier(liebe)">
  <path fill="#b91f2f" d="M16 29 13.6 27C6.8 21.4 3 17.5 3 11.1 3 6.5 6.4 3.4 10.4 3.4c2.5 0 4.7 1.3 5.6 3.4.9-2.1 3.1-3.4 5.6-3.4 4 0 7.4 3.1 7.4 7.7 0 6.4-3.8 10.3-10.6 15.9L16 29Z"/>
  <path fill="#8f1524" d="M16 29 13.6 27C6.8 21.4 3 17.5 3 11.1 3 6.5 6.4 3.4 10.4 3.4c2.5 0 4.7 1.3 5.6 3.4.9-2.1 3.1-3.4 5.6-3.4 4 0 7.4 3.1 7.4 7.7 0 6.4-3.8 10.3-10.6 15.9L16 29Zm0-3.1.8-.7c6.1-5 9.5-8.3 9.5-13.9 0-3-2.1-5.1-4.9-5.1-2.3 0-4 1.4-4.8 4.1h-1.2c-.8-2.7-2.5-4.1-4.8-4.1-2.8 0-4.9 2.1-4.9 5.1 0 5.6 3.4 8.9 9.5 13.9l.8.7Z" opacity=".65"/>
  <ellipse cx="16" cy="20.4" rx="5.2" ry="4.2" fill="#fffaf3"/>
  <circle cx="9.9" cy="15" r="2.25" fill="#fffaf3"/>
  <circle cx="14.1" cy="12.1" r="2.35" fill="#fffaf3"/>
  <circle cx="17.9" cy="12.1" r="2.35" fill="#fffaf3"/>
  <circle cx="22.1" cy="15" r="2.25" fill="#fffaf3"/>
</svg>`;

const pages = [
  {
    id: 'startseite',
    slug: '',
    title: 'Wa(h)re Haustier(liebe) - Ehrliche Aufklärung über Tierhaltung',
    description: 'Faktenbasierte Aufklärung über artgerechte Tierhaltung: Hunde, Katzen, Vögel, Kleintiere, Pferde, Kastration, Qualzucht, Adoption, Notfall und Selbsttest.',
    intent: 'Startseite und Orientierung für verantwortungsvolle Haustierhaltung',
    priority: '1.0',
    changefreq: 'weekly',
    type: 'WebSite',
  },
  {
    id: 'impressum',
    slug: 'impressum',
    title: 'Impressum - Wa(h)re Haustier(liebe)',
    description: 'Impressum und Anbieterkennzeichnung für Wa(h)re Haustier(liebe), das private Informationsprojekt von Jan-Erik Andersen und Annemarie Andersen.',
    intent: 'Anbieterkennzeichnung und rechtliche Kontaktangaben',
    priority: '0.35',
    staticOnly: true,
  },
  {
    id: 'datenschutz',
    slug: 'datenschutz',
    title: 'Datenschutzerklärung',
    description: 'Datenschutzerklärung für Wa(h)re Haustier(liebe): Verantwortliche, Hosting über GitHub Pages, Server-Logfiles, Kontaktaufnahme, Cookies und Betroffenenrechte.',
    intent: 'Datenschutzinformationen nach DSGVO für die Website',
    priority: '0.35',
    staticOnly: true,
  },
  {
    id: 'kontakt',
    slug: 'kontakt',
    title: 'Kontakt - Wa(h)re Haustier(liebe)',
    description: 'Über Wa(h)re Haustier(liebe), Hilfe bei Haltungsfragen, persönliche Ansprache und Kontaktmöglichkeiten für Fragen, Anregungen oder Unterstützungsbedarf.',
    intent: 'Kontakt und Informationen zum privaten Projekt Wa(h)re Haustierliebe',
    priority: '0.45',
    staticOnly: true,
  },
  {
    id: 'mitmachen',
    slug: 'mitmachen',
    title: 'Mitmachen! - Wa(h)re Haustier(liebe)',
    description: 'Warum Hinweise, Korrekturen und gute Quellen Wa(h)re Haustier(liebe) besser machen und wie Besucher Textstellen oder ganze Abschnitte melden können.',
    intent: 'Mitwirkung, Korrekturen und Quellenhinweise redaktionell einreichen',
    priority: '0.55',
  },
  {
    id: 'mensch',
    slug: 'mensch',
    title: 'Vor dem Haustierkauf: Passt ein Tier wirklich in dein Leben?',
    description: 'Ehrlicher Realitätscheck vor dem Haustierkauf: Zeit, Geld, Wohnsituation, Motivation, Wunschbilder und Verantwortung prüfen, bevor ein Tier einzieht.',
    intent: 'Vor dem Haustierkauf Entscheidung, Motivation, Wunschbilder und Alltag prüfen',
    priority: '0.9',
  },
  {
    id: 'hunde',
    slug: 'hunde',
    title: 'Hund halten: Zeit, Kosten und Verantwortung realistisch prüfen',
    description: 'Was Hundehaltung wirklich bedeutet: tägliche Zeit, Alleinbleiben, Kosten, Erziehung, Gesundheit und typische Fehler vor der Anschaffung.',
    intent: 'Hund anschaffen oder Hundehaltung verbessern',
    priority: '0.9',
  },
  {
    id: 'hund-im-buero',
    slug: 'hunde/hund-im-buero',
    title: 'Hund im Büro: Wann ein Bürohund wirklich passt',
    description: 'Bürohund ehrlich prüfen: Rückzugsort, Ruhe, Regeln, Pausen, Zustimmung im Team und Warnzeichen, dass der Arbeitsplatz für den Hund zu viel ist.',
    intent: 'Bürohund und Hund am Arbeitsplatz tierschutzgerecht prüfen',
    priority: '0.8',
  },
  {
    id: 'katzen',
    slug: 'katzen',
    title: 'Katzen halten: Wohnung, Freigang, Kastration und stille Warnsignale',
    description: 'Katzenhaltung ehrlich erklärt: Wohnungsgestaltung, Sozialkontakt, Freigang, Kastration, Tierarztkosten und leise Anzeichen für Stress oder Krankheit.',
    intent: 'Katze anschaffen oder Katzenhaltung artgerechter machen',
    priority: '0.9',
  },
  {
    id: 'voegel',
    slug: 'voegel',
    title: 'Vögel halten: Schwarm, Flugraum, UV-Licht und häufige Fehler',
    description: 'Warum Vögel Schwarm, Raum, Freiflug, Licht und Beschäftigung brauchen und warum Einzelhaltung im Käfig keine artgerechte Haltung ist.',
    intent: 'Vogelhaltung und Wellensittichhaltung prüfen',
    priority: '0.8',
  },
  {
    id: 'kleintiere',
    slug: 'kleintiere',
    title: 'Kleintiere halten: Kaninchen, Meerschweinchen, Hamster und Ratten',
    description: 'Kleintiere sind keine einfachen Einstiegstiere: Fläche, Gruppenhaltung, Zähne, Tierarztkosten und typische Haltungsfehler im Überblick.',
    intent: 'Kaninchen, Meerschweinchen, Hamster oder Ratten verantwortungsvoll halten',
    priority: '0.8',
  },
  {
    id: 'exoten',
    slug: 'exoten',
    title: 'Exoten halten: Terrarium, Technik, UV-B und Verantwortung',
    description: 'Exotenhaltung ehrlich erklärt: Licht, Temperatur, Feuchtigkeit, Futter, Meldepflichten, Tierarztzugang und warum Faszination nicht reicht.',
    intent: 'Exotische Haustiere und Terrarientiere prüfen',
    priority: '0.75',
  },
  {
    id: 'pferde',
    slug: 'pferde',
    title: 'Pferde halten: Herde, Bewegung, Kosten und langfristige Verantwortung',
    description: 'Pferdehaltung realistisch prüfen: Herdenkontakt, tägliche Bewegung, Stallformen, Kosten, Tierarzt, Hufschmied und jahrzehntelange Verantwortung.',
    intent: 'Pferdehaltung und Pferdekauf realistisch prüfen',
    priority: '0.75',
  },
  {
    id: 'kastration',
    slug: 'kastration',
    title: 'Kastration bei Haustieren: Tierschutz, Kosten und Mythen',
    description: 'Kastration schützt Tiere und verhindert Leid: Fakten zu Katzen, Hunden, Kaninchen, Kosten, Kastrationspflicht und typischen Gegenargumenten.',
    intent: 'Kastration bei Haustieren verstehen und entscheiden',
    priority: '0.9',
  },
  {
    id: 'qualzucht',
    slug: 'qualzucht',
    title: 'Qualzucht und Rassekrankheiten erkennen',
    description: 'Qualzucht und Rassekrankheiten bei Hunden und Katzen erkennen: suchbares Lexikon zu Atemnot, Gelenkschmerzen, Herz-, Nieren- und Gendefekten mit Quellen.',
    intent: 'Qualzucht und Rassekrankheiten verstehen und beim Tierkauf vermeiden',
    priority: '0.85',
  },
  {
    id: 'adoption',
    slug: 'adoption',
    title: 'Adoption statt Kauf: Warum Tierheimtiere die bessere Wahl sind',
    description: 'Adoption aus dem Tierschutz statt Kauf: Tierheimtiere, Schutzgebühr, Vermittlung, Vorbereitung auf Tierheimfragen und unseriöse Quellen.',
    intent: 'Tier aus dem Tierheim adoptieren statt kaufen',
    priority: '0.9',
    lastmod: '2026-07-01',
  },
  {
    id: 'selbsttest',
    slug: 'selbsttest',
    title: 'Haustier-Selbsttest: Bin ich bereit für ein Tier?',
    description: '15 ehrliche Fragen zu Zeit, Geld, Alltag, Wohnsituation, Betreuung und Motivation vor der Entscheidung für ein Haustier.',
    intent: 'Selbsttest vor Haustieranschaffung',
    priority: '0.85',
  },
  {
    id: 'notfall',
    slug: 'notfall',
    title: 'Tier-Notfall: Warnsignale, Vergiftung und wann du sofort handeln musst',
    description: 'Atemnot, Krämpfe, Vergiftung, Harnstopp, Schmerzen oder Unfall: Warnsignale erkennen und wissen, wann ein Tier sofort tierärztliche Hilfe braucht.',
    intent: 'Tiermedizinische Warnsignale und Notfallentscheidung',
    priority: '0.9',
  },
  {
    id: 'tierarzt-notdienst',
    slug: 'notfall/tierarzt-notdienst',
    title: 'Tierärztlichen Notdienst finden: Bundesländer-Übersicht',
    description: 'Offizielle Kammern, Notrufnummern und regionale Notdienst-Systeme nach Bundesland: tierärztlichen Notdienst finden und vor der Fahrt telefonisch prüfen.',
    intent: 'Tierärztlichen Notdienst nach Bundesland finden',
    priority: '0.85',
    staticOnly: true,
  },
  {
    id: 'wissen',
    slug: 'wissen',
    title: 'Tiermythen und Homöopathie bei Tieren: Was stimmt wirklich?',
    description: 'Häufige Tierhaltungsmythen und Homöopathie bei Tieren kritisch, quellenbasiert und ohne Werbeinteresse eingeordnet.',
    intent: 'Tierhaltungsmythen und Homöopathie bei Tieren prüfen',
    priority: '0.8',
    lastmod: '2026-07-04',
  },
  {
    id: 'glossar',
    slug: 'glossar',
    title: 'Glossar für Tierhaltung und Tierschutz',
    description: 'Wichtige Begriffe rund um artgerechte Haltung, Krankheiten, Kastration, Tierschutz und Tiermedizin kurz und verständlich erklärt.',
    intent: 'Fachbegriffe aus Tierhaltung und Tierschutz nachschlagen',
    priority: '0.8',
  },
  {
    id: 'tiere-und-urlaub',
    slug: 'tiere-und-urlaub',
    title: 'Haustiere und Urlaub: Mitnehmen, Betreuung oder Tierpension?',
    description: 'Urlaub mit Haustieren tierschutzgerecht planen: Mitnehmen, Betreuung, Tierpension, Reiseformalitäten, Hitze, Flugreisen und Aussetzen richtig einordnen.',
    intent: 'Urlaub mit Haustieren und Tierbetreuung tierschutzgerecht planen',
    priority: '0.8',
  },
  {
    id: 'hitzefalle-auto',
    slug: 'hitzefalle-auto',
    title: 'Hund im Auto bei Hitze: Warum zehn Minuten lebensgefährlich sind',
    description: 'Warum Autos für Hunde schon bei milden Temperaturen zur Hitzefalle werden, welche Warnzeichen zählen und was Passanten in Deutschland tun sollten.',
    intent: 'Sommerhitze und Hund im Auto einschätzen',
    priority: '0.8',
    staticOnly: true,
  },
  {
    id: 'ernaehrung-taurin',
    slug: 'ernaehrung-taurin',
    title: 'Vegane Tierernährung, Katzen, Hunde und Taurin verständlich erklärt',
    description: 'Warum Hunde und Katzen ernährungsphysiologisch verschieden sind, was Taurin bei Katzen leistet und warum Katzen- und Hundefutter nicht austauschbar sind.',
    intent: 'Tierernährung, vegane Ernährung und Taurin verstehen',
    priority: '0.8',
    staticOnly: true,
  },
  {
    id: 'realhaltung',
    slug: 'realhaltung',
    title: 'Realhaltung vs. vertretbare Haltung: Was Tiere wirklich brauchen',
    description: 'Typische Haustierhaltung gegen wirklich vertretbare Haltung: Warum normal nicht automatisch artgerecht ist und der Kaufpreis nie die echten Kosten zeigt.',
    intent: 'Realistische Haltung und Kosten vor der Anschaffung prüfen',
    priority: '0.8',
    staticOnly: true,
  },
  {
    id: 'zucht-und-vermehrung',
    slug: 'zucht-und-vermehrung',
    title: 'Zucht und Vermehrung: Warum auch „gute Zucht“ nicht das Ideal ist',
    description: 'Unterschied zwischen Züchter und Vermehrer, warum zusätzliche Haustierproduktion problematisch bleibt und warum Adoption die konsequentere Entscheidung ist.',
    intent: 'Zucht, Vermehrung und Adoption einordnen',
    priority: '0.8',
    staticOnly: true,
  },
  {
    id: 'wildtierhaltung',
    slug: 'wildtierhaltung',
    title: 'Private Wildtierhaltung in Deutschland: Legal heißt nicht vertretbar',
    description: 'Warum gefährliche Wildtiere und Exoten keine Haustiere sind, wie Bundesrecht und Landesrecht ineinandergreifen und warum Leinenpflicht Wildtiere schützt.',
    intent: 'Private Wildtierhaltung, Exoten und Wildschutz verstehen',
    priority: '0.8',
    staticOnly: true,
  },
  {
    id: 'wildkatzenbaby-gefunden',
    slug: 'katzen/wildkatzenbaby-gefunden',
    title: 'Wildkatzenbaby gefunden: Nicht mitnehmen, richtig handeln',
    description: 'Wildkatzenjunge werden leicht mit Hauskatzen verwechselt. Woran du sie erkennst, warum Mitnehmen schadet und welche Schritte wirklich helfen.',
    intent: 'Wildkatzenjunge erkennen und bei einem Fund richtig handeln',
    priority: '0.8',
  },
  {
    id: 'noch-nicht-bereit',
    slug: 'noch-nicht-bereit',
    title: 'Noch nicht bereit für ein Tier: Warten kann Tierliebe sein',
    description: 'Warum kein Tier zu nehmen manchmal die verantwortungsvollste Entscheidung ist und wie du trotzdem Tierschutz unterstützen kannst.',
    intent: 'Verantwortlich warten statt vorschnell ein Tier anschaffen',
    priority: '0.75',
  },
  {
    id: 'budgie-brain',
    slug: 'budgie-brain',
    title: 'Budgie Brain - derzeit pausiert',
    description: 'Budgie Brain ist derzeit pausiert und nicht Teil der öffentlichen Navigation von Wa(h)re Haustier(liebe).',
    intent: 'Pausiertes internes Lernwerkzeug zur Wellensittich-Haltung',
    priority: '0.0',
    standalone: 'budgie',
    onHold: true,
  },
];

const topicPages = [
  ['hunde-soziale-beduerfnisse', 'hunde', 'hunde/soziale-beduerfnisse', 'Soziale Bedürfnisse beim Hund', 'Warum Hunde mehr brauchen als Futter, Garten, kurze Gassirunden und gelegentliche Aufmerksamkeit.', 'Soziale Bedürfnisse, Bindung und Beschäftigung beim Hund verstehen.'],
  ['hunde-stadtfest-rummel', 'hunde', 'hunde/stadtfest-rummel', 'Hund auf Stadtfest, Rummel oder Weihnachtsmarkt', 'Warum große Veranstaltungen für Hunde oft Lärm, Enge, Stress und Fluchtgefahr bedeuten und welche Warnzeichen du ernst nehmen solltest.', 'Hund auf Stadtfest, Rummel, Weihnachtsmarkt oder Großveranstaltung tierschutzgerecht einschätzen.', { priority: '0.78', lastmod: '2026-07-03' }],
  ['hunde-garten-auslauf', 'hunde', 'hunde/garten-auslauf', 'Garten ist kein Ersatz für Auslauf', 'Warum ein Garten hilfreich sein kann, aber Spaziergänge, Umweltreize und Beziehung nicht ersetzt.', 'Garten, Auslauf und Umweltreize für Hunde realistisch prüfen.'],
  ['hunde-allein-zu-hause', 'hunde', 'hunde/allein-zu-hause', 'Hund allein zu Hause', 'Wie viel Alleinbleiben ein Hund verkraftet und warum ein normaler Arbeitstag ohne Betreuung nicht fair ist.', 'Alleinbleiben und Betreuung für Hunde planen.'],
  ['hunde-kosten', 'hunde', 'hunde/kosten', 'Was ein Hund wirklich kostet', 'Laufende Kosten, Rücklagen, Steuer, Versicherung und Tierarztkosten vor dem Einzug ehrlich rechnen.', 'Hundekosten vor der Anschaffung realistisch einschätzen.'],
  ['hunde-kastration', 'hunde', 'hunde/kastration', 'Kastration beim Hund', 'Warum Kastration bei Hunden keine Standardantwort ist, sondern tierärztlich abgewogen werden muss.', 'Kastration beim Hund als Einzelfallentscheidung verstehen.'],
  ['hunde-hofhaltung-und-zwinger', 'hunde', 'hunde/hofhaltung-und-zwinger', 'Hofhaltung und Zwinger', 'Warum Hof, Grundstück und Zwinger keinen Sozialkontakt, keine Bewegung und keine echte Beschäftigung ersetzen.', 'Hofhaltung, Zwinger und Mindestanforderungen für Hunde einordnen.'],
  ['hunde-gesundheit', 'hunde', 'hunde/gesundheit', 'Häufige Gesundheitsprobleme beim Hund', 'Typische Risiken wie Übergewicht, Zahnerkrankungen, Ohrenprobleme und Gelenkleiden früh ernst nehmen.', 'Gesundheitsrisiken bei Hunden erkennen und vorbeugen.'],
  ['hunde-entscheidung', 'hunde', 'hunde/entscheidung', 'Bevor ein Hund einzieht', 'Die wichtigsten Fragen, bevor aus dem Wunsch nach einem Hund echte Verantwortung wird.', 'Entscheidung vor der Hundeadoption oder Anschaffung prüfen.'],
  ['katzen-sozialverhalten', 'katzen', 'katzen/sozialverhalten', 'Katzen sind keine einfachen Einzelgänger', 'Warum Katzen zwar allein jagen, aber trotzdem Sozialkontakt, Struktur und ein passendes Revier brauchen.', 'Sozialverhalten von Katzen verstehen.'],
  ['katzen-wohnungshaltung', 'katzen', 'katzen/wohnungshaltung', 'Wohnungshaltung bei Katzen', 'Wohnungshaltung ist ein Kompromiss und braucht Raum, Abwechslung, Rückzug und Klettermöglichkeiten.', 'Wohnungshaltung für Katzen artgerechter gestalten.'],
  ['katzen-kastration', 'katzen', 'katzen/kastration', 'Kastration bei Katzen', 'Warum Kastration bei Katzen praktischer Tierschutz ist und ungewolltes Leid verhindert.', 'Kastration bei Katzen verstehen.'],
  ['katzen-stilles-leiden', 'katzen', 'katzen/stilles-leiden', 'Stilles Leiden bei Katzen erkennen', 'Katzen zeigen Stress und Krankheit oft leise. Kleine Veränderungen im Alltag können wichtig sein.', 'Warnsignale bei Katzen erkennen.'],
  ['katzen-kosten', 'katzen', 'katzen/kosten', 'Was Katzen wirklich kosten', 'Futter, Streu, Tierarzt, Rücklagen und Alltag: Katzen sind keine günstigen Nebenbei-Tiere.', 'Katzenkosten vor der Anschaffung realistisch einschätzen.'],
  ['katzen-streunerkatzen', 'katzen', 'katzen/streunerkatzen', 'Streunerkatzen und Verantwortung', 'Warum Kastration, Futterstellen und Zuständigkeit bei Streunerkatzen echte Tierschutzfragen sind.', 'Streunerkatzen und Kastration einordnen.'],
  ['katzen-entscheidung', 'katzen', 'katzen/entscheidung', 'Bevor eine Katze einzieht', 'Die wichtigsten Fragen zu Wohnung, Freigang, Kosten, Kastration und Verantwortung.', 'Entscheidung vor der Katzenadoption oder Anschaffung prüfen.'],
  ['voegel-schwarmhaltung', 'voegel', 'voegel/schwarmhaltung', 'Schwarmhaltung bei Vögeln', 'Warum Wellensittiche und andere Heimvögel Artgenossen brauchen und Einzelhaltung keine normale Option ist.', 'Schwarmhaltung bei Vögeln verstehen.'],
  ['voegel-uv-licht', 'voegel', 'voegel/uv-licht', 'UV-Licht für Vögel', 'Warum normales Fensterglas wichtiges UV-Licht blockiert und Vögel gezielte Lichtversorgung brauchen.', 'UV-Licht und Lichtbedarf bei Vögeln einordnen.'],
  ['voegel-kuechenluft-und-daempfe-sind-lebensgefahr', 'voegel', 'voegel/kuechenluft-teflon', 'Küchenluft und Teflon sind Lebensgefahr', 'Warum Dämpfe aus Pfannen, Backöfen und Küchenluft für Vögel tödlich sein können.', 'Küchenluft, Teflon und Dämpfe als Gefahr für Vögel verstehen.'],
  ['voegel-freiflug-ist-nicht-optional', 'voegel', 'voegel/freiflug', 'Freiflug ist nicht optional', 'Warum Vögel täglich sicheren Flugraum brauchen und ein Käfig allein kein Lebensraum ist.', 'Freiflug und Flugraum für Vögel planen.'],
  ['voegel-partnerersatz', 'voegel', 'voegel/partnerersatz', 'Spiegel und Plastikvögel ersetzen keinen Partner', 'Warum falscher Partnerersatz Heimvögel fehlprägt und echtes Sozialverhalten verhindert.', 'Falschen Partnerersatz bei Vögeln vermeiden.'],
  ['voegel-krankheit-erkennen', 'voegel', 'voegel/krankheit-erkennen', 'Krankheit bei Vögeln erkennen', 'Warum Vögel Symptome verstecken und kleine Veränderungen schnell tierärztlich abgeklärt werden müssen.', 'Krankheitszeichen bei Vögeln ernst nehmen.'],
  ['voegel-qualzucht', 'voegel', 'voegel/qualzucht', 'Schauwellensittiche und Qualzucht', 'Warum überzüchtete Merkmale bei Vögeln nicht niedlich, sondern belastend sein können.', 'Qualzucht bei Heimvögeln erkennen.'],
  ['voegel-entscheidung', 'voegel', 'voegel/entscheidung', 'Bevor Vögel einziehen', 'Die wichtigsten Fragen zu Schwarm, Freiflug, Licht, Tierarzt und Alltag.', 'Entscheidung vor der Vogelhaltung prüfen.'],
  ['kleintiere-kaninchen', 'kleintiere', 'kleintiere/kaninchen', 'Kaninchen halten', 'Warum Kaninchen Platz, Artgenossen, Zähnekontrolle und ruhigen Umgang brauchen.', 'Kaninchenhaltung verantwortungsvoll planen.'],
  ['kleintiere-meerschweinchen', 'kleintiere', 'kleintiere/meerschweinchen', 'Meerschweinchen halten', 'Warum Meerschweinchen Gruppen, Platz, Verstecke und regelmäßige Zahnkontrolle brauchen.', 'Meerschweinchenhaltung verantwortungsvoll planen.'],
  ['kleintiere-hamster', 'kleintiere', 'kleintiere/hamster', 'Hamster halten', 'Warum Hamster nachtaktive Einzelgänger sind und keine einfachen Kindertiere.', 'Hamsterhaltung realistisch prüfen.'],
  ['kleintiere-ratten', 'kleintiere', 'kleintiere/ratten', 'Ratten halten', 'Warum Ratten soziale, intelligente Tiere sind und nicht allein in kleinen Käfigen leben dürfen.', 'Rattenhaltung verantwortungsvoll planen.'],
  ['kleintiere-degus-und-chinchillas', 'kleintiere', 'kleintiere/degus-chinchillas', 'Degus und Chinchillas halten', 'Warum Degus und Chinchillas Spezialwissen, Raum, Artgenossen und passende Temperaturen brauchen.', 'Degus und Chinchillas als anspruchsvolle Kleintiere einordnen.'],
  ['exoten-reptilien', 'exoten', 'exoten/reptilien', 'Reptilien halten', 'Warum Reptilien präzise Technik, UV-B, Temperaturzonen und Fachwissen brauchen.', 'Reptilienhaltung realistisch prüfen.'],
  ['exoten-schildkroeten', 'exoten', 'exoten/schildkroeten', 'Schildkröten halten', 'Warum Landschildkröten keine Wohnungstiere sind und eine Verantwortung über Jahrzehnte bedeuten.', 'Schildkrötenhaltung realistisch prüfen.'],
  ['exoten-fische', 'exoten', 'exoten/fische', 'Fische halten', 'Warum Aquarien stabile Wasserwerte, Einlaufzeit, Technik und echte Pflege brauchen.', 'Fischhaltung und Aquarium realistisch prüfen.'],
  ['pferde-herde', 'pferde', 'pferde/herde', 'Pferde brauchen Herde', 'Warum ein Pferd allein chronisch unter Stress steht und Artgenossen keine Dekoration sind.', 'Sozialkontakt und Herdenhaltung bei Pferden verstehen.'],
  ['pferde-platzbedarf', 'pferde', 'pferde/platzbedarf', 'Platzbedarf bei Pferden', 'Warum Koppel, Auslauf und tägliche Bewegung zusammen gedacht werden müssen.', 'Fläche und Bewegung bei Pferdehaltung prüfen.'],
  ['pferde-haltungsformen', 'pferde', 'pferde/haltungsformen', 'Haltungsformen bei Pferden', 'Offenstall, Aktivstall, Box und Anbindehaltung aus Sicht des Pferdes einordnen.', 'Pferdehaltungsformen vergleichen.'],
  ['pferde-kosten', 'pferde', 'pferde/kosten', 'Was ein Pferd wirklich kostet', 'Warum Pferdehaltung monatlich und langfristig gerechnet werden muss, nicht nur beim Kauf.', 'Pferdekosten realistisch einschätzen.'],
  ['pferde-reitbeteiligung', 'pferde', 'pferde/reitbeteiligung', 'Reitbeteiligung als ehrlicher Einstieg', 'Warum eine Reitbeteiligung oft der bessere erste Schritt ist als ein eigenes Pferd.', 'Reitbeteiligung als Alternative zum eigenen Pferd prüfen.'],
  ['pferde-entscheidung', 'pferde', 'pferde/entscheidung', 'Bevor ein Pferd einzieht', 'Die wichtigsten Fragen zu Jahrzehnten Verantwortung, Budget, Stall, Alltag und Versorgung.', 'Entscheidung vor dem eigenen Pferd prüfen.'],
].map(([id, sourcePage, slug, title, description, intent, meta = {}]) => ({
  id,
  sourcePage,
  sourceAnchor: id,
  slug,
  title: `${title} - Wa(h)re Haustier(liebe)`,
  description,
  intent,
  priority: meta.priority || '0.72',
  topicPage: true,
  ...meta,
}));

const firstKnowledgeIndex = pages.findIndex((page) => page.id === 'kastration');
pages.splice(firstKnowledgeIndex, 0, ...topicPages);

const pageById = new Map(pages.map((page) => [page.id, page]));
const publicPages = pages.filter((page) => !page.onHold);
const sectionPages = publicPages.filter((page) => !page.standalone && !page.staticOnly);
const prerenderPages = publicPages.filter((page) => !page.standalone);
const pageIds = sectionPages.map((page) => page.id);
const glossaryTermByKey = new Map(glossaryTerms.map((term) => [term.key, term]));
let staticCssForInline = '';

const faqByPage = {
  hunde: [
    ['Wie lange darf ein Hund allein zu Hause bleiben?', 'Erwachsene Hunde sollten nicht länger als 4–5 Stunden am Stück allein bleiben. Regelmäßige 8 Stunden oder mehr sind aus Tierschutzsicht nicht vertretbar.'],
    ['Was kostet ein Hund im Monat?', 'Für einen mittelgroßen Hund sind laufend etwa 100-200 Euro pro Monat realistisch. Über ein Hundeleben können 12.000-20.000 Euro zusammenkommen.'],
  ],
  'hund-im-buero': [
    ['Ist ein Hund im Büro automatisch besser als Alleinbleiben?', 'Nein. Ein Büro kann eine gute Lösung sein, wenn der Hund dort wirklich zur Ruhe kommt, betreut wird und einen geschützten Platz hat. Ist er dauerhaft gestresst, ist eine andere Betreuung fairer.'],
    ['Darf ein Bürohund in einer Box liegen?', 'Als freiwilliger, offener Rückzugsort kann eine Box sinnvoll sein. Als geschlossene Aufbewahrung über Stunden ist sie kein fairer Büroalltag und kann tierschutzrechtlich problematisch sein.'],
  ],
  'hunde-stadtfest-rummel': [
    ['Sollte ich meinen Hund mit aufs Stadtfest nehmen?', 'Meistens nein. Stadtfeste, Rummel, Weihnachtsmärkte und ähnliche Veranstaltungen bedeuten für Hunde oft Lärm, Enge, fremde Hände, Bodenrisiken und kaum echte Rückzugsmöglichkeiten.'],
    ['Woran erkenne ich, dass es meinem Hund zu viel wird?', 'Achte auf starkes Hecheln ohne Hitze, Wegziehen, Stehenbleiben, Lefzenlecken, auffälliges Gähnen, ständiges Scannen, Futterverweigerung oder einen Hund, der kaum noch ansprechbar ist.'],
  ],
  katzen: [
    ['Warum sollte ich meine Katze kastrieren lassen?', 'Kastration schützt vor Stress, hormonbedingten Erkrankungen und unkontrollierter Vermehrung. Besonders bei Freigängern ist sie praktischer Tierschutz.'],
  ],
  'wildkatzenbaby-gefunden': [
    ['Soll ich ein scheinbar verlassenes Wildkatzenbaby mitnehmen?', 'Nein. Abstand halten, Fundort merken, nach einigen Stunden aus der Ferne prüfen und fachkundige Stellen kontaktieren.'],
    ['Kann man junge Wildkatzen sicher von Hauskatzen unterscheiden?', 'Mit bloßem Auge oft nicht sicher. Merkmale sind nur Hinweise; eine sichere Bestimmung gelingt über DNA.'],
  ],
  voegel: [
    ['Kann man Wellensittiche allein halten?', 'Nein. Wellensittiche sind Schwarmvögel und brauchen mindestens einen Artgenossen, ausreichend Flugraum und Beschäftigung.'],
  ],
  kleintiere: [
    ['Wie viel Platz braucht ein Kaninchen?', 'Mindestens 2-3 Quadratmeter pro Kaninchen als dauerhaft zugängliche Grundfläche plus täglichen Auslauf. Handelsübliche Käfige sind fast immer zu klein.'],
  ],
  adoption: [
    ['Sollte ich ein Tier vom Züchter kaufen oder aus dem Tierheim adoptieren?', 'Solange viele Tiere in Tierheimen und auf Pflegestellen warten, ist Adoption die verantwortungsvollere Wahl. Sie gibt einem bestehenden Tier eine Chance und erzeugt keinen weiteren Nachschub.'],
    ['Warum stellen Tierheime so viele Fragen?', 'Seriöse Tierheime prüfen Alltag, Wohnsituation, Erfahrung und Absicherung, damit ein Tier nicht wieder in ein unpassendes Zuhause vermittelt wird. Die Fragen sollen das Tier schützen, nicht Bewerber bloßstellen.'],
  ],
  wissen: [
    ['Hilft Homöopathie bei Tieren?', 'Für Homöopathie gibt es in der Tiermedizin keinen belastbaren, anerkannten Wirksamkeitsnachweis. Das größte Risiko ist verlorene Zeit: Schmerzen, Infektionen, Atemnot, Harnprobleme oder andere Warnzeichen gehören tierärztlich abgeklärt.'],
    ['Was würde es bedeuten, Globuli wirklich ernst zu nehmen?', 'Dann wären Globuli keine harmlosen Zuckerkügelchen zum Ausprobieren, sondern Arzneien. Man müsste Einzelmittel, passende Auswahl, kleinste Gabe, Verlaufskontrolle, Abbruchkriterien und tierärztliche Grenzen streng beachten.'],
    ['Gibt es naturheilkundliche Mittel, die Tieren helfen können?', 'Einzelne ergänzende Maßnahmen können je nach Tierart und Beschwerde sinnvoll sein, etwa Ballaststoffe bei leichter Verstopfung, tierärztlich geeignete Probiotika bei unkompliziertem Durchfall beim Hund, medizinischer Honig für bestimmte oberflächliche Wunden oder EPA/DHA-Omega-3 als Begleitung bei chronischen Entzündungen. Sie ersetzen keine Diagnose und keine Notfallbehandlung.'],
    ['Welche natürlichen Stoffe sind für Tiere tabu?', 'Tabu sind zum Beispiel Teebaumöl und konzentrierte ätherische Öle bei Katzen und Vögeln, Knoblauch und Zwiebel bei Hunden und Katzen, Xylit bei Hunden, Trauben und Rosinen bei Hunden, phosphathaltige Einläufe bei Katzen sowie Nux vomica, Belladonna oder Aconitum als Urtinktur, Extrakt oder unklare Niedrigpotenz. Natürlich bedeutet nicht tierverträglich.'],
  ],
  'tiere-und-urlaub': [
    ['Sollte mein Tier mit in den Urlaub?', 'Nur, wenn Reiseweg, Klima, Unterkunft, Gesundheitszustand und Charakter wirklich zum Tier passen. Für Katzen, Vögel und viele Kleintiere ist Betreuung im vertrauten Zuhause oft besser.'],
    ['Wie früh sollte ich Betreuung organisieren?', 'So früh wie möglich. Betreuungsperson, Tierpension, Tierarztcheck, Impfstatus, Medikamente und Notfallkontakte gehören nicht in die letzte Urlaubswoche.'],
    ['Darf man ein Tier aussetzen, wenn man keine Betreuung findet?', 'Nein. Ein Haustier auszusetzen oder zurückzulassen, um sich der Verantwortung zu entziehen, ist nach dem Tierschutzgesetz verboten.'],
  ],
};

const evidenceByPage = {
  mensch: {
    facts: [
      'Ein Tier zieht in einen konkreten Alltag ein: Zeit, Geld, Wohnsituation, Betreuung und Rücklagen müssen vor der Anschaffung passen.',
      'Ein verantwortliches Nein verhindert späteres Abgeben, Aussetzen oder dauerhafte Minimalversorgung.',
      'Die Seite bewertet keine Wünsche, sondern prüft die Folgen für das Tier.',
    ],
    sources: [
      ['Tierschutzgesetz § 2', 'https://www.gesetze-im-internet.de/tierschg/__2.html'],
      ['Deutscher Tierschutzbund', 'https://www.tierschutzbund.de'],
    ],
    guardrails: [
      'Die Seite ersetzt keinen psychologischen Eignungstest.',
      'Die Aussagen sind Entscheidungshilfe, keine Rechtsberatung.',
    ],
  },
  hunde: {
    facts: [
      'Regelmäßiges Alleinbleiben über einen normalen Arbeitstag ist für Hunde nicht vertretbar, wenn keine Betreuung da ist.',
      'Ein Garten ersetzt keine Spaziergänge, keine Beziehung und keine neuen Umweltreize außerhalb des gewohnten Territoriums.',
      'Zwingerhaltung ist nicht pauschal verboten, aber sie ersetzt weder Auslauf außerhalb des Zwingers noch Sozialkontakt, Umgang und Beschäftigung.',
      'Laufende Kosten, Hundesteuer, Versicherung und Tierarztpuffer gehören vor dem Einzug in die Entscheidung.',
    ],
    sources: [
      ['TASSO e. V.', 'https://www.tasso.net'],
      ['Deutscher Tierschutzbund', 'https://www.tierschutzbund.de'],
      ['Tierschutz-Hundeverordnung', 'https://www.gesetze-im-internet.de/tierschhuv/'],
      ['Bundestierärztekammer', 'https://www.bundestieraerztekammer.de'],
    ],
    guardrails: [
      'Rasse, Alter, Gesundheit und Alltag verändern, was ein Hund konkret braucht.',
      'Die TierSchHuV nennt keine starre Minutenformel; Auslauf und Sozialkontakte müssen individuell passend sein.',
      'Zwingerhaltung ist rechtlich nur unter Mindestanforderungen möglich; grundsätzlich verboten ist die Anbindehaltung.',
      'Medizinische Symptome gehören in eine Tierarztpraxis.',
    ],
  },
  'hund-im-buero': {
    facts: [
      'Ein Bürohund profitiert nur, wenn der Arbeitsplatz hundegerecht organisiert ist und der Hund dort tatsächlich entspannen kann.',
      'Rückzugsort, frisches Wasser, geplante Pausen, Aufsicht und klare Regeln für Kolleginnen und Kollegen sind Grundbedingungen.',
      'Genehmigung, Zustimmung im Team, Hygiene, Sicherheit, Allergien, Ängste und hundefreie Bereiche gehören vorab geklärt.',
      'Ein Hund darf nicht als Stimmungsmacher, Pausenclown oder dauerhaft verfügbare Attraktion behandelt werden.',
      'Verschlossene Boxen über längere Zeit sind kein Ersatz für Ruhe, Betreuung, Bewegung und einen freiwillig nutzbaren Rückzugsort.',
    ],
    sources: [
      ['Deutscher Tierschutzbund: Aktionstag Kollege Hund', 'https://www.tierschutzbund.de/tiere-themen/haustiere/hunde/hunde-im-buero-aktionstag-kollege-hund/'],
      ['Deutscher Tierschutzbund: Leitfaden für hundefreundliche Arbeitsplätze', 'https://www.tierschutzbund.de/fileadmin/Seiten/tierschutzbund.de/Downloads/Sonstiges/Kollege_Hund_Leitfaden_fuer_hundefreundliche_Arbeitsplaetze.pdf'],
      ['Deutscher Tierschutzbund: Richtlinien und Guidelines für Hunde im Büro', 'https://www.tierschutzbund.de/fileadmin/Seiten/tierschutzbund.de/Downloads/Sonstiges/Kollege_Hund__Richtlinien_und_Guidelines_fuer_Hunde_im_Buero.pdf'],
      ['Tierschutz-Hundeverordnung § 2', 'https://www.gesetze-im-internet.de/tierschhuv/__2.html'],
      ['DGUV top eins: Hund am Arbeitsplatz', 'https://topeins.dguv.de/recht/hunde-am-arbeitsplatz/'],
      ['Bayerisches LGL: Hundeboxen und Tierschutz', 'https://www.lgl.bayern.de/tiergesundheit/tierschutz/jb22_tierschutzwidriges_zubehoer.htm'],
      ['TASSO e. V.: Körpersprache beim Hund', 'https://www.tasso.net/Tierschutz/verantwortungsvolle-tierhaltung/leben-mit-hund/koerpersprache-beim-hund'],
    ],
    guardrails: [
      'Ein Bürohund braucht Zustimmung, Regeln und einen passenden Arbeitsplatz; die Seite ersetzt keine Rechtsberatung.',
      'Arbeitsrecht, Hausrecht, Allergien, Ängste und Sicherheit müssen im konkreten Betrieb geklärt werden.',
      'Bei Angst, Aggression, Überforderung, Krankheit oder dauerndem Stress ist der Bürohund keine gute Lösung.',
      'Ein ruhiger Hund ist nicht automatisch entspannt; Schlaf, Wahlfreiheit und Rückzug prüfen.',
    ],
  },
  'hunde-stadtfest-rummel': {
    facts: [
      'Große Veranstaltungen sind für Hunde meist kein neutraler Ausflug, sondern eine Mischung aus Lärm, Enge, fremden Gerüchen, fremden Händen und wenig Rückzug.',
      'Stillhalten oder brav Mitlaufen beweist nicht, dass ein Hund entspannt ist; viele Hunde zeigen Überforderung leise.',
      'Stresszeichen müssen im Zusammenhang gelesen werden: Hecheln, Gähnen, Lefzenlecken, Ausweichen, Stehenbleiben, ständiges Scannen und Futterverweigerung können wichtige Hinweise sein.',
      'Wenn Mitnahme unvermeidbar ist, zählen kurze Dauer, Randbereiche, Abstand, Wasser, Schatten, sichere Leine und der schnelle Abbruch bei Stress.',
    ],
    sources: [
      ['Deutscher Tierschutzbund: Haustiere weder verkleiden noch zu Umzügen mitnehmen', 'https://www.tierschutzbund.de/ueber-uns/aktuelles/presse/meldung/haustiere-weder-verkleiden-noch-zu-umzuegen-mitnehmen/'],
      ['VIER PFOTEN: Open Air Veranstaltungen bitte ohne Hund', 'https://www.vier-pfoten.de/unseregeschichten/presse/august-2025/open-air-veranstaltungen-bitte-ohne-hund'],
      ['TASSO e. V.: Körpersprache beim Hund', 'https://www.tasso.net/Tierschutz/verantwortungsvolle-tierhaltung/leben-mit-hund/koerpersprache-beim-hund'],
      ['ASPCApro: Canine Body Language Tips', 'https://www.aspcapro.org/resource/canine-body-language-tips'],
      ['VCA: Signs Your Dog is Stressed and How to Relieve It', 'https://vcahospitals.com/know-your-pet/signs-your-dog-is-stressed-and-how-to-relieve-it'],
    ],
    guardrails: [
      'Nicht jeder Hund reagiert gleich; Alter, Gesundheit, Erfahrung, Rasse, Hitze und Tagesform verändern die Belastbarkeit.',
      'Ein einzelnes Signal ist keine Diagnose. Entscheidend sind Gesamtbild, Situation und Veränderung gegenüber dem normalen Verhalten.',
      'Bei anhaltendem Stress, Angst, Aggression, Schmerzen, Hitzesymptomen oder Zusammenbruch gehört der Hund aus der Situation heraus und bei Bedarf tierärztlich abgeklärt.',
      'Die Seite ersetzt keine individuelle Einschätzung durch Tierarzt, Hundetrainerin oder Verhaltenstherapie.',
    ],
  },
  katzen: {
    facts: [
      'Katzen sind Einzeljäger, aber nicht automatisch Einzelgänger.',
      'Kastration ist bei Freigängerkatzen praktischer Tierschutz gegen unkontrollierte Vermehrung und Streunerleid.',
      'Rückzug, Unsauberkeit oder verändertes Fressverhalten sind Warnsignale, keine Trotzreaktion.',
    ],
    sources: [
      ['Deutscher Tierschutzbund', 'https://www.tierschutzbund.de'],
      ['Streunerhilfe Plau e. V.', 'https://streunerhilfe-plau.de'],
      ['Bundestierärztekammer', 'https://www.bundestieraerztekammer.de'],
    ],
    guardrails: [
      'Wohnungshaltung bleibt ein Kompromiss, der nur mit Sozialkontakt, Struktur und Beschäftigung tragfähig wird.',
      'Keine Ferndiagnose bei Verhaltensänderungen.',
    ],
  },
  voegel: {
    facts: [
      'Wellensittiche und viele andere Heimvögel brauchen Artgenossen, Flugraum und Beschäftigung.',
      'Ein einzelner Vogel wirkt oft zahm, weil ihm ein artgleicher Sozialpartner fehlt.',
      'Licht, Luftqualität und sichere Freiflugbereiche sind Teil der Haltung, nicht Dekoration.',
    ],
    sources: [
      ['Tierärztliche Vereinigung für Tierschutz', 'https://www.tierschutz-tvt.de'],
      ['Deutscher Tierschutzbund', 'https://www.tierschutzbund.de'],
    ],
    guardrails: [
      'Einzelhaltung ist keine normale Option.',
      'Käfiggröße allein reicht nicht; Sozialkontakt und täglicher Freiflug gehören zur Haltung.',
    ],
  },
  kleintiere: {
    facts: [
      'Kaninchen, Meerschweinchen und Ratten sind soziale Tiere und brauchen passende Artgenossen.',
      'Hamster sind nachtaktive Einzelgänger und keine einfachen Kindertiere.',
      'Zähne, Verdauung und Stresssignale machen Kleintiere tierärztlich anspruchsvoller, als viele Käufer erwarten.',
    ],
    sources: [
      ['Tierärztliche Vereinigung für Tierschutz', 'https://www.tierschutz-tvt.de'],
      ['Deutscher Tierschutzbund', 'https://www.tierschutzbund.de'],
    ],
    guardrails: [
      'Die Fläche ist nur ein Teil der Haltung; Ruhe, Artgenossen, Futter und Tierarztzugang zählen genauso.',
      'Artgenossen heißt gleiche Art, nicht Kaninchen plus Meerschweinchen.',
    ],
  },
  exoten: {
    facts: [
      'Exotenhaltung steht und fällt mit Temperatur, UV-B, Luftfeuchtigkeit, Futter und tierärztlicher Fachkunde.',
      'Leise Tiere zeigen Fehler oft spät; scheinbare Anspruchslosigkeit ist kein Wohlbefinden.',
      'Artenschutz, Meldepflichten und Herkunftsnachweise müssen vor dem Kauf geprüft werden.',
    ],
    sources: [
      ['CITES Species+ Checklist', 'https://checklist.cites.org/'],
      ['Tierärztliche Vereinigung für Tierschutz', 'https://www.tierschutz-tvt.de'],
      ['Tierschutzgesetz § 2', 'https://www.gesetze-im-internet.de/tierschg/__2.html'],
    ],
    guardrails: [
      'Legalität nicht mit Vertretbarkeit gleichsetzen.',
      'Keine Haltungsparameter ohne konkrete Art ableiten.',
    ],
  },
  pferde: {
    facts: [
      'Pferde brauchen Herde, Bewegung, Raufutter, Witterungsschutz und langfristig tragbare Kosten.',
      'Reiten ersetzt keine pferdegerechte Haltung.',
      'Anbindehaltung und isolierte Einzelhaltung widersprechen den sozialen Grundbedürfnissen.',
    ],
    sources: [
      ['FN: Tierschutz im Pferdesport', 'https://www.pferdesport-deutschland.de/tierschutz/tierschutz'],
      ['Deutscher Tierschutzbund', 'https://www.tierschutzbund.de'],
      ['Tierschutzgesetz § 2', 'https://www.gesetze-im-internet.de/tierschg/__2.html'],
    ],
    guardrails: [
      'Der Kaufpreis ist nur der kleinste Teil; entscheidend sind laufende Kosten und Notfallrücklagen.',
      'Haltungssysteme nicht romantisieren; Herde und Bewegung sind Kernpunkte.',
    ],
  },
  kastration: {
    facts: [
      'Kastration verhindert bei Katzen unkontrollierte Vermehrung und reduziert Streunerleid.',
      'Beim Hund ist Kastration eine Einzelfallentscheidung und kein Ersatz für Training oder Haltungsarbeit.',
      'Bei Kaninchen ist Kastration besonders für Rammler und zur Gruppenhaltung praktisch relevant.',
    ],
    sources: [
      ['Deutscher Tierschutzbund', 'https://www.tierschutzbund.de'],
      ['Streunerhilfe Plau e. V.', 'https://streunerhilfe-plau.de'],
      ['Bundestierärztekammer', 'https://www.bundestieraerztekammer.de'],
    ],
    guardrails: [
      'Kastration muss je nach Tierart und Einzelfall eingeordnet werden.',
      'Medizinische Entscheidung immer tierärztlich abklären.',
    ],
  },
  qualzucht: {
    facts: [
      'Qualzucht liegt vor, wenn Zuchtmerkmale Schmerzen, Leiden, Schäden oder eingeschränkte normale Lebensfunktionen verursachen.',
      'Atemnot, extreme Körperformen, Augen-, Ohren-, Fell- und Bewegungsprobleme sind keine niedlichen Eigenheiten.',
      'Das Rassekrankheiten-Lexikon startet mit 20 Hund- und Katze-Einträgen und nennt Auftreten, Schwere, Häufigkeit und Quellen für belegte Zucht- und Erbkrankheitskomplexe.',
      'Nachfrage finanziert die Fortsetzung solcher Zuchtlinien.',
    ],
    sources: [
      ['Tierschutzgesetz § 11b', 'https://www.gesetze-im-internet.de/tierschg/__11b.html'],
      ['BMEL: Gutachten zur Auslegung von § 11b TierSchG', 'https://www.bmleh.de/DE/themen/tiere/tierschutz/gutachten-paragraf11b.html'],
      ['RVC VetCompass Brachycephaly', 'https://www.rvc.ac.uk/research/focus/brachycephaly/health-issues/epidemiology-vetcompass'],
      ['OMIA - Online Mendelian Inheritance in Animals', 'https://omia.org/home/'],
      ['UFAW Genetic Welfare Problems', 'https://www.ufaw.org.uk/genetic-welfare-problems-intro/genetic-welfare-problems-of-companion-animals-intro'],
      ['UC Davis Veterinary Genetics Laboratory', 'https://vgl.ucdavis.edu/dna-tests/cat'],
      ['LSU Deafness in Dogs & Cats', 'https://www.lsu.edu/vetmed/deafness/index.php'],
    ],
    guardrails: [
      'Es geht um Zuchtmerkmale und Nachfrage, nicht um Schuldzuweisungen an einzelne Halter.',
      'Den Kaufanreiz nicht durch verharmlosende Rasseästhetik verstärken.',
    ],
  },
  adoption: {
    facts: [
      'Adoption hilft einem bereits existierenden Tier und erzeugt keinen zusätzlichen Nachschub.',
      'Seriöse Vermittlung prüft Wohnsituation, Erfahrung und Passung, statt nur zu verkaufen.',
      'Eine gute Vorbereitung auf Tierheimfragen hilft, ehrlich über Alltag, Betreuung, Kosten und Grenzen zu sprechen.',
      'Schutzgebühr ist kein Kaufpreis, sondern deckt einen Teil der Versorgung.',
    ],
    sources: [
      ['Deutscher Tierschutzbund: Tierheime', 'https://www.tierschutzbund.de/tiere-themen/tierheime-helfen/tierheime/'],
      ['Streunerhilfe Plau e. V.', 'https://streunerhilfe-plau.de'],
      ['Tierschutzgesetz § 2', 'https://www.gesetze-im-internet.de/tierschg/__2.html'],
    ],
    guardrails: [
      'Adoption ist keine beliebige Einkaufsoption neben Zucht, sondern die konsequentere Entscheidung für ein bereits vorhandenes Tier.',
      'Seriöse Adoption braucht Zeit und ehrliche Beratung.',
    ],
  },
  selbsttest: {
    facts: [
      'Der Selbsttest prüft Alltag, Geld, Betreuung, Wohnsituation, Motivation und medizinischen Notfallpuffer.',
      'Strenge Antworten schützen das Tier vor späterer Überforderung.',
      'Ein schlechtes Ergebnis ist kein Urteil, sondern ein Hinweis, noch zu warten.',
    ],
    sources: [
      ['Tierschutzgesetz § 2', 'https://www.gesetze-im-internet.de/tierschg/__2.html'],
      ['Deutscher Tierschutzbund', 'https://www.tierschutzbund.de'],
    ],
    guardrails: [
      'Der Selbsttest ist eine Entscheidungshilfe, kein psychometrisches Gutachten.',
      'Ergebnis nicht über konkrete Tierart-Bedürfnisse stellen.',
    ],
  },
  notfall: {
    facts: [
      'Atemnot, Krämpfe, Vergiftungsverdacht, starke Blutung, Zusammenbruch und Harnstopp sind sofortige Tierarztfälle.',
      'Bei Vergiftung Verpackung oder Substanz sichern und nicht eigenmächtig Erbrechen auslösen.',
      'Notdienste sind regional organisiert; vor der Fahrt immer anrufen.',
    ],
    sources: [
      ['Bundestierärztekammer', 'https://www.bundestieraerztekammer.de'],
      ['TASSO e. V.', 'https://www.tasso.net'],
    ],
    guardrails: [
      'Immer klar sagen: keine tierärztliche Diagnose.',
      'Im Zweifel anrufen und hinfahren, nicht weiter recherchieren.',
    ],
  },
  'tierarzt-notdienst': {
    facts: [
      'Deutschland hat keine einheitliche zentrale Notdienstsuche für alle Regionen.',
      'Landestierärztekammern und regionale Systeme sind der verlässlichere Einstieg als allgemeine Suchmaschinen.',
      'Vor der Fahrt muss die Praxis oder Klinik telefonisch bestätigen, dass sie erreichbar ist.',
    ],
    sources: [
      ['Bundestierärztekammer', 'https://www.bundestieraerztekammer.de'],
    ],
    guardrails: [
      'Keine Garantie für Öffnungszeiten oder Erreichbarkeit geben.',
      'Bei akuten Notfällen nicht erst lange sortieren, sondern telefonieren.',
    ],
  },
  wissen: {
    facts: [
      'Die Seite trennt beobachtbare Haltungsfolgen von Mythen und Wunschdenken.',
      'Homöopathie ist kein Sammelbegriff für Naturheilkunde und ersetzt keine Diagnostik, keine Schmerzbehandlung, keine Antibiotika, keine Operation und keine Impfung.',
      'Wenn Globuli als wirksame Arznei verstanden werden, bräuchten sie Einzelmittelwahl, Dosiskontrolle, Verlaufskontrolle und klare Abbruchkriterien; beiläufige Selbstbehandlung passt nicht zu dieser Logik.',
      'Beliebte Ausgangsstoffe und Naturmittel wie Nux vomica, Belladonna, Aconitum, Arnica, Teebaumöl, Allium-Arten, Xylit, Trauben/Rosinen oder menschliche Einläufe können je nach Form, Konzentration und Tierart toxikologisch relevant sein.',
      'Bei Tierkrankheiten ist verlorene Zeit durch wirkungslose Mittel das zentrale Risiko.',
      'Ergänzende Verfahren dürfen eine konventionelle Behandlung nicht ersetzen oder verzögern.',
      'Einzelne ergänzende Maßnahmen wie Ballaststoffe, tierärztlich geeignete Probiotika, medizinischer Honig, EPA/DHA-Omega-3 oder Haltungs- und Fütterungsanpassungen können nur in eng begrenzten Situationen verantwortbar sein.',
    ],
    sources: [
      ['British Veterinary Association: Complementary medicine', 'https://www.bva.co.uk/take-action/our-policies/complementary-medicine/'],
      ['Royal College of Veterinary Surgeons: Complementary medicines statement', 'https://www.rcvs.org.uk/about-us/news-and-views/college-publishes-complementary-medicines-statement'],
      ['EASAC: Homeopathic products and practices', 'https://easac.eu/publications/details/homeopathic-products-and-practices'],
      ['NCCIH: Homeopathy', 'https://www.nccih.nih.gov/health/homeopathy'],
      ['Samuel Hahnemann: Organon aphorisms 266-272', 'https://www.vithoulkas.com/learning-tools/organon/organon-hahnemann/aphorisms-266-272/'],
      ['Samuel Hahnemann: Organon aphorisms 273-285', 'https://www.vithoulkas.com/learning-tools/organon/organon-hahnemann/aphorisms-273-285/'],
      ['Royal Veterinary College: Perceptual errors in veterinary homeopathy', 'https://www.rvc.ac.uk/research/news/general/scientists-at-royal-veterinary-college-show-homeopathy-only-appears-to-work-because-of-perceptual-errors'],
      ['Bundestierärztekammer: Tierleid durch falsche Diagnose', 'https://www.bundestieraerztekammer.de/presse/pressemeldung.php?X=20150717133525'],
      ['MSD Veterinary Manual: Strychnine poisoning in animals', 'https://www.msdvetmanual.com/toxicology/rodenticide-poisoning/strychnine-poisoning-in-animals'],
      ['Merck Veterinary Manual: Toxicoses from human dietary and herbal supplements', 'https://www.merckvetmanual.com/toxicology/toxicoses-from-human-vitamins-minerals-and-dietary-supplements/toxicoses-in-animals-from-human-dietary-and-herbal-supplements'],
      ['Pet Poison Helpline: Belladonna', 'https://www.petpoisonhelpline.com/poison/belladonna/'],
      ['Pet Poison Helpline: Monkshood', 'https://www.petpoisonhelpline.com/poison/monkshood/'],
      ['Pet Poison Helpline: Tea tree oil', 'https://www.petpoisonhelpline.com/poison/tea-tree-oil/'],
      ['Merck Veterinary Manual: Essential oils in animals', 'https://www.merckvetmanual.com/toxicology/toxicoses-from-household-hazards/toxicoses-from-essential-oils-in-animals'],
      ['Merck Veterinary Manual: Garlic and onion toxicosis', 'https://www.merckvetmanual.com/toxicology/food-hazards/garlic-and-onion-allium-spp-toxicosis-in-animals'],
      ['UC Davis Veterinary Medicine: Xylitol poisoning in dogs', 'https://healthtopics.vetmed.ucdavis.edu/health-topics/xylitol-poisoning-dogs'],
      ['Merck Veterinary Manual: Grape, raisin and tamarind toxicosis in dogs', 'https://www.merckvetmanual.com/toxicology/food-hazards/grape-raisin-and-tamarind-vitis-spp-tamarindus-spp-toxicosis-in-dogs'],
      ['VCA Animal Hospitals: Household hazards and dangers to birds', 'https://vcahospitals.com/know-your-pet/household-hazards-and-dangers-to-birds'],
      ['Merck Veterinary Manual: Gastric stasis in rabbits', 'https://www.merckvetmanual.com/exotic-and-laboratory-animals/rabbits/noninfectious-diseases-of-rabbits'],
      ['Merck Veterinary Manual: Constipation in small animals', 'https://www.merckvetmanual.com/digestive-system/diseases-of-the-large-intestine-in-small-animals/constipation-obstipation-and-megacolon-in-small-animals'],
      ['Veterinary Evidence: Probiotics in canine acute diarrhoea', 'https://www.veterinaryevidence.org/index.php/ve/article/view/252'],
      ['Merck Veterinary Manual: Topical agents in wound management', 'https://www.merckvetmanual.com/emergency-medicine-and-critical-care/wound-management-in-small-animals/topical-agents-in-wound-management-in-small-animals'],
      ['Ontario Veterinary College: Omega-3s in pet nutrition', 'https://ovcpetnutrition.uoguelph.ca/2024/12/04/the-abcs-of-omega-3s/'],
    ],
    guardrails: [
      'Medizinische Themen gehören im Zweifel in eine Tierarztpraxis.',
      'Mythen und persönliche Erfahrungen sind keine gleichwertige Gegenposition zu belegbarer Tiermedizin.',
      'Naturheilkunde, Phytotherapie, Physiotherapie und Homöopathie nicht begrifflich vermischen.',
      'Ergänzende Mittel nicht als sichere Hausmittel verkaufen; Tierart, Diagnose, Dosis, Nebenwirkungen, No-Go-Stoffe und Notfallgrenzen nennen.',
    ],
  },
  glossar: {
    facts: [
      'Das Glossar erklärt zentrale Begriffe aus Haltung, Tiermedizin und Tierschutz kurz und alltagstauglich.',
      'Begriffe wie Pyometra, Brachyzephalie, GOT, TNR oder TierSchG werden als Einstieg erklärt.',
      'Glossarbegriffe sind Einstiegshilfen, keine Fachliteratur und keine tierärztliche Diagnose.',
    ],
    sources: [
      ['Bundestierärztekammer', 'https://www.bundestieraerztekammer.de'],
      ['Deutscher Tierschutzbund', 'https://www.tierschutzbund.de'],
      ['Tierärztliche Vereinigung für Tierschutz', 'https://www.tierschutz-tvt.de'],
    ],
    guardrails: [
      'Das Glossar erklärt Begriffe knapp und ersetzt kein veterinärmedizinisches Nachschlagewerk.',
      'Bei Symptomen immer auf tierärztliche Abklärung verweisen.',
    ],
  },
  'tiere-und-urlaub': {
    facts: [
      'Urlaub mit Haustier ist keine reine Komfortfrage; entscheidend sind Tierart, Charakter, Gesundheit, Reiseweg, Klima, Unterkunft und zuverlässige Betreuung.',
      'Katzen, Vögel und kleine Heimtiere bleiben häufig stressärmer in ihrer vertrauten Umgebung, wenn dort fachkundige tägliche Versorgung gesichert ist.',
      'Das Aussetzen oder Zurücklassen eines Haustiers, um sich der Halter- oder Betreuerpflicht zu entziehen, ist nach dem Tierschutzgesetz verboten.',
    ],
    sources: [
      ['Deutscher Tierschutzbund: Urlaub mit Hund', 'https://www.tierschutzbund.de/tiere-themen/haustiere/hunde/urlaub-mit-hund/'],
      ['TASSO: Tierbetreuung im Urlaub', 'https://www.tasso.net/Service/Wissensportal/Urlaub-Reisen-mit-Tier/Urlaub-ohne-Tier'],
      ['BMLEH: Tipps zur Reiseplanung mit Tieren', 'https://www.bmleh.de/DE/themen/tiere/haus-und-zootiere/reiseplanung-tiere.html'],
      ['Tierschutzgesetz § 3', 'https://www.gesetze-im-internet.de/tierschg/__3.html'],
      ['Tierschutzgesetz § 18', 'https://www.gesetze-im-internet.de/tierschg/__18.html'],
      ['SWR: Tierheime voll, mehr Haustiere ausgesetzt', 'https://www.swr.de/swraktuell/baden-wuerttemberg/stuttgart/haustiere-ausgesetzt-volle-tierheime-tierleid-armut-100.html'],
      ['Hamburger Tierschutzverein: Sommerferien und Tieraussetzungen 2025', 'https://www.hamburger-tierschutzverein.de/ueber-uns/tierschutz-blog/sommerferien-beginnen-wieder-mit-vielen-tieraussetzungen'],
    ],
    guardrails: [
      'Nicht behaupten, jedes Tier müsse zu Hause bleiben oder jeder Hund reise gern mit.',
      'Reise- und Einreisevorschriften können sich ändern; vor Auslandsreisen immer aktuelle Länderregeln prüfen.',
      'Tiermedizinische Reisevorsorge ersetzt keine individuelle tierärztliche Beratung.',
    ],
  },
  'hitzefalle-auto': {
    facts: [
      'Autos heizen sich auch bei milden Außentemperaturen schnell gefährlich auf.',
      'Hunde können Hitzestress nicht zuverlässig durch Schwitzen ausgleichen.',
      'Bei akuter Gefahr zählt schnelles Handeln und tierärztliche Hilfe.',
    ],
    sources: [
      ['TiHo Hannover: Hitzefalle Auto', 'https://www.tiho-hannover.de/universitaet/aktuelles-veroeffentlichungen/pressemitteilungen/detail/hitzefalle-auto-lebensgefahr-fuer-hunde-bereits-nach-minuten'],
      ['Landestierschutzbeauftragte Brandenburg: Hitzestress bei Hunden', 'https://mleuv.brandenburg.de/mleuv/de/ueber-uns/landestierschutzbeauftragte/themen/hitzestress-bei-hunden/'],
      ['ADAC: Hitze im Auto und rechtliches Vorgehen', 'https://presse.adac.de/meldungen/adac-ev/recht/hitze-im-auto-fuehrt-zu-lebensbedrohlichen-situationen.html'],
      ['Thieme Tiermedizin: Hitzschlag beim Hund', 'https://tiermedizin.thieme.de/hund-katze-co/sommer-spezial/detail/hitzschlag-beim-hund-therapie-und-aufklaerung-921'],
    ],
    guardrails: [
      'Keine Rechtsberatung zum Einschlagen von Scheiben geben.',
      'Bei Hitzschlag nicht mit Eiswasser schocken.',
    ],
  },
  'ernaehrung-taurin': {
    facts: [
      'Katzen sind obligate Karnivoren und auf eine passende Taurinversorgung angewiesen.',
      'Hunde und Katzen haben unterschiedliche Ernährungsphysiologie.',
      'Futterumstellungen gehören bei Krankheit oder Spezialdiät tierärztlich begleitet.',
    ],
    sources: [
      ['Bundestierärztekammer', 'https://www.bundestieraerztekammer.de'],
      ['Deutscher Tierschutzbund', 'https://www.tierschutzbund.de'],
    ],
    guardrails: [
      'Die Seite erklärt Grundsätze und ersetzt keinen individuellen Futterplan.',
      'Vegane Tierernährung nicht pauschal empfehlen.',
    ],
  },
  realhaltung: {
    facts: [
      'Übliche Haltung ist nicht automatisch artgerecht.',
      'Der Kaufpreis ist fast nie der größte Kostenblock eines Haustieres.',
      'Vertretbare Haltung beginnt bei Bedürfnissen, nicht bei dem, was im Handel verkauft wird.',
    ],
    sources: [
      ['Tierschutzgesetz § 2', 'https://www.gesetze-im-internet.de/tierschg/__2.html'],
      ['Tierärztliche Vereinigung für Tierschutz', 'https://www.tierschutz-tvt.de'],
    ],
    guardrails: [
      'Kosten sind wichtig, aber Realhaltung meint auch Zeit, Raum, Beziehung und Belastbarkeit.',
      'Normalität immer gegen Tierbedürfnisse prüfen.',
    ],
  },
  'zucht-und-vermehrung': {
    facts: [
      'Vermehrung produziert Tiere für Nachfrage, während vorhandene Tiere bereits Zuhause suchen.',
      'Seriösere Zuchtbedingungen lösen nicht das Grundproblem zusätzlicher Haustierproduktion.',
      'Adoption ist die konsequentere Wahl, wenn kein zwingender Spezialfall vorliegt.',
    ],
    sources: [
      ['Deutscher Tierschutzbund: Tierheime', 'https://www.tierschutzbund.de/tiere-themen/tierheime-helfen/tierheime/'],
      ['Tierschutzgesetz § 11b', 'https://www.gesetze-im-internet.de/tierschg/__11b.html'],
    ],
    guardrails: [
      'Seriöse Zucht und illegale Vermehrung sind nicht dasselbe; zusätzliche Tierproduktion bleibt trotzdem ethisch erklärungsbedürftig.',
      'Die ethische Position der Seite nicht neutralisieren.',
    ],
  },
  wildtierhaltung: {
    facts: [
      'Legalität bedeutet nicht, dass private Wildtier- oder Exotenhaltung vertretbar ist.',
      'Gefahrtier- und Artenschutzfragen hängen von Bundesland, Art und Herkunft ab.',
      'Wildtiere brauchen Schutz vor Haustieren, Leinenpflicht und vermeidbarem Stress.',
    ],
    sources: [
      ['CITES Species+ Checklist', 'https://checklist.cites.org/'],
      ['Tierschutzgesetz § 2', 'https://www.gesetze-im-internet.de/tierschg/__2.html'],
    ],
    guardrails: [
      'Keine Rechtsberatung zu Gefahrtierlisten geben.',
      'Nicht aus Legalität eine Haltungsempfehlung ableiten.',
    ],
  },
  'wildkatzenbaby-gefunden': {
    facts: [
      'Wildkatzenjunge werden immer wieder mit getigerten Hauskatzenjungen verwechselt; junge Tiere sind mit bloßem Auge oft nicht sicher bestimmbar.',
      'Ein scheinbar verlassenes Kätzchen im Wald ist nicht automatisch hilflos, weil Wildkatzenmütter ihre Jungen während der Jagd zeitweise allein lassen.',
      'Gesunde Wildkatzen dürfen nicht aus der Natur mitgenommen werden; bei verletzten Tieren müssen fachkundige Stellen und die zuständige Naturschutzbehörde einbezogen werden.',
      'Der wichtigste erste Schritt ist Abstand halten, Fundort dokumentieren, aus der Ferne prüfen und Fachstellen kontaktieren.',
    ],
    sources: [
      ['BUND: Projekt Vorsicht Wildkatze', 'https://www.bund.net/themen/tiere-pflanzen/projekt-vorsicht-wildkatze/'],
      ['BUND: Handlungsleitfaden Vorsicht Verwechslungsgefahr', 'https://www.bund.net/fileadmin/user_upload_bund/publikationen/wildkatze/handlungsleitfaden-wildkatze-vorsicht-verwechslungsgefahr-bund.pdf'],
      ['BUND Thüringen: Vorsicht Wildkatze', 'https://www.bund-thueringen.de/wildkatze/vorsicht-verwechslungsgefahr/'],
      ['BUND NRW: Wild- oder Hauskatze?', 'https://www.bund-nrw.de/themen/wildkatze/europaeische-wildkatze/wild-oder-hauskatze/'],
      ['BfN: Artenportrait Felis silvestris', 'https://www.bfn.de/artenportraits/felis-silvestris'],
      ['Wildkatze Baden-Württemberg: Wildkätzchen gefunden?', 'https://www.wildkatze-bw.de/wildkatze/wildkaetzchen-gefunden'],
      ['NABU Hamburg: Jungvögel und Menschengeruch', 'https://hamburg.nabu.de/tiere-und-pflanzen/wildtiere-schuetzen/hunde.html'],
    ],
    guardrails: [
      'Nicht behaupten, jedes berührte Jungtier werde automatisch verstoßen; der Grund für Abstand ist Störung, Stress, Ansteckungsrisiko, falsche Versorgung und Artenschutzrecht.',
      'Äußere Merkmale geben Hinweise, aber keine sichere Laienbestimmung.',
      'Keine Anleitung zur privaten Wildtieraufzucht geben.',
      'Bei akuter Verletzung oder Gefahr immer Fachstellen einbeziehen.',
    ],
  },
  'noch-nicht-bereit': {
    facts: [
      'Warten verhindert Tierleid, wenn Zeit, Geld, Wohnsituation oder Stabilität noch nicht passen.',
      'Tierliebe kann auch über Ehrenamt, Patenschaften, Pflegestellen oder Spenden wirken.',
      'Ein späterer Einzug wird besser, wenn Rücklagen, Wissen und Betreuung vorher stehen.',
    ],
    sources: [
      ['Deutscher Tierschutzbund: Tierheime', 'https://www.tierschutzbund.de/tiere-themen/tierheime-helfen/tierheime/'],
      ['Streunerhilfe Plau e. V.', 'https://streunerhilfe-plau.de'],
    ],
    guardrails: [
      'Nicht beschämen; die Seite soll entlasten und Verantwortung normalisieren.',
      'Keine Anschaffung drängen, wenn die Bedingungen nicht passen.',
    ],
  },
  'budgie-brain': {
    facts: [
      'Budgie Brain ist ein Lernspiel über Wellensittich-Haltung.',
      'Die Simulation macht Schwarm, Freiflug, UV-Licht, Stress und Routine als Haltungsfaktoren erfahrbar.',
      'Das Spiel ersetzt keine Fachberatung, sondern übersetzt Grundbedürfnisse in eine interaktive Erfahrung.',
    ],
    sources: [
      ['Tierärztliche Vereinigung für Tierschutz', 'https://www.tierschutz-tvt.de'],
      ['Deutscher Tierschutzbund', 'https://www.tierschutzbund.de'],
    ],
    guardrails: [
      'Die Seite gibt Orientierung und ersetzt kein vollständiges Haltungsprotokoll.',
      'Immer auf echte Vogelhaltung mit Artgenossen und Freiflug zurückführen.',
    ],
  },
};

const brandLogo = 'assets/images/wahre-haustierliebe-logo.png';
const brandMark = 'assets/images/wahre-haustierliebe-mark.png';
const defaultSocialDescription = 'Ehrliche Aufklärung über Haustierhaltung, Tierwohl, Adoption, Qualzucht und Notfälle - privat, werbefrei und verständlich.';
const socialCardWidth = 1200;
const socialCardHeight = 630;

const imageDimensionCache = new Map();

const defaultSocialImage = {
  src: brandLogo,
  width: 1536,
  height: 1024,
  type: 'image/png',
  alt: 'Offizielles Logo von Wa(h)re Haustier(liebe).',
};

const firstContentImageByPage = {
  mensch: {
    src: 'assets/images/cat-carrier-square.jpg',
    width: 1400,
    height: 1394,
    type: 'image/jpeg',
    alt: 'Katze in Transporttasche als Bild für ehrliche Vorbereitung vor dem Einzug.',
  },
  hunde: {
    src: 'assets/images/golden-retriever-agility-jump.jpg',
    width: 2000,
    height: 1339,
    type: 'image/jpeg',
    alt: 'Hund beim Agility-Sprung als Bild für Training, Alltag und Beschäftigung.',
  },
  'hund-im-buero': {
    src: 'assets/images/dog-resting-under-table.jpg',
    width: 1280,
    height: 853,
    type: 'image/jpeg',
    alt: 'Hund liegt ruhig unter einem Tisch auf einem Teppich.',
  },
  katzen: {
    src: 'assets/images/two-cats-window.jpg',
    width: 843,
    height: 954,
    type: 'image/jpeg',
    alt: 'Zwei Katzen sitzen gemeinsam am Fenster als Bild für soziale Wohnungshaltung.',
  },
  voegel: {
    src: 'assets/images/voegel-voliere-02.jpg',
    width: 1600,
    height: 1064,
    type: 'image/jpeg',
    alt: 'Mehrere Wellensittiche in einer Voliere als Bild für Schwarm und Raum.',
  },
  kleintiere: {
    src: 'assets/images/guinea-pig-habitat.jpg',
    width: 800,
    height: 599,
    type: 'image/jpeg',
    alt: 'Kleintier-Habitat mit Struktur statt Spielzeughaltung.',
  },
  exoten: {
    src: 'assets/images/bearded-dragon-terrarium.jpg',
    width: 1000,
    height: 702,
    type: 'image/jpeg',
    alt: 'Bartagame im Terrarium als Bild für Technik, Licht und Klima.',
  },
  pferde: {
    src: 'assets/images/horse-paddocks-shelter.jpg',
    width: 640,
    height: 480,
    type: 'image/jpeg',
    alt: 'Pferdekoppeln mit Unterständen als Bild für Raum und Haltungssysteme.',
  },
  kastration: {
    src: 'assets/images/feral-cat-tnr.jpg',
    width: 432,
    height: 324,
    type: 'image/jpeg',
    alt: 'Streunerkatze mit gekennzeichnetem Ohr nach einer TNR-Kastration.',
  },
  qualzucht: {
    src: 'assets/images/qualzucht-mops.jpg',
    width: 960,
    height: 639,
    type: 'image/jpeg',
    alt: 'Mops als Beispiel für problematische Zuchtmerkmale.',
  },
  adoption: {
    src: 'assets/images/tierheim-hund.jpg',
    width: 960,
    height: 1280,
    type: 'image/jpeg',
    alt: 'Hund im Tierheim als klares Bild für Adoption statt Kauf.',
  },
  selbsttest: {
    src: 'assets/images/cats-cat-tree-pair.jpg',
    width: 1920,
    height: 1507,
    type: 'image/jpeg',
    alt: 'Zwei Katzen auf einem Kratzbaum als Bild für vorbereitete Haltung.',
  },
  notfall: {
    src: 'assets/images/vet-office-with-dog.jpg',
    width: 2048,
    height: 1536,
    type: 'image/jpeg',
    alt: 'Hund sitzt ruhig in einer Tierarztpraxis als Bild für rechtzeitige Hilfe.',
  },
  'tierarzt-notdienst': {
    src: 'assets/images/vet-office-with-dog.jpg',
    width: 2048,
    height: 1536,
    type: 'image/jpeg',
    alt: 'Hund sitzt ruhig in einer Tierarztpraxis als Bild für rechtzeitige Hilfe.',
  },
  kontakt: {
    src: 'assets/images/two-cats-window.jpg',
    width: 843,
    height: 954,
    type: 'image/jpeg',
    alt: 'Zwei Katzen sitzen gemeinsam am Fenster als ruhiges Bild für Fragen und Kontakt.',
  },
  mitmachen: {
    src: 'assets/images/animal-shelter-fundraiser.jpg',
    width: 1920,
    height: 1372,
    type: 'image/jpeg',
    alt: 'Tierschutzaktion als Bild für Hinweise, Korrekturen und gemeinsame Verbesserung.',
  },
  wissen: {
    src: 'assets/images/goldfish-aquarium.jpg',
    width: 1920,
    height: 1309,
    type: 'image/jpeg',
    alt: 'Goldfische im Aquarium als Bild für hartnäckige Haustiermythen.',
  },
  glossar: {
    src: 'assets/images/goldfish-aquarium.jpg',
    width: 1920,
    height: 1309,
    type: 'image/jpeg',
    alt: 'Goldfische im Aquarium als ruhiges Bild für Tierhaltungsbegriffe und Nachschlagewissen.',
  },
  'tiere-und-urlaub': {
    src: 'assets/images/cat-soft-carrier.jpg',
    width: 1254,
    height: 1638,
    type: 'image/jpeg',
    alt: 'Katze in einer weichen Transportbox als Bild für Urlaubsplanung und Betreuung.',
  },
  'hitzefalle-auto': {
    src: 'assets/images/vet-office-with-dog.jpg',
    width: 2048,
    height: 1536,
    type: 'image/jpeg',
    alt: 'Hund in einer Tierarztpraxis als Bild für rechtzeitige Hilfe bei Hitzestress.',
  },
  'ernaehrung-taurin': {
    src: 'assets/images/two-cats-window.jpg',
    width: 843,
    height: 954,
    type: 'image/jpeg',
    alt: 'Zwei Katzen am Fenster als Bild für katzenspezifische Bedürfnisse.',
  },
  realhaltung: {
    src: 'assets/images/hamster-home-built-enclosure.png',
    width: 1280,
    height: 685,
    type: 'image/png',
    alt: 'Großes selbst gebautes Hamstergehege als Gegenbild zur Käfighaltung.',
  },
  'zucht-und-vermehrung': {
    src: 'assets/images/animal-shelter-fundraiser.jpg',
    width: 1920,
    height: 1372,
    type: 'image/jpeg',
    alt: 'Tierschutzaktion als Bild für vorhandene Tiere statt weiterer Produktion.',
  },
  wildtierhaltung: {
    src: 'assets/images/exot-bartagame.jpg',
    width: 330,
    height: 212,
    type: 'image/jpeg',
    alt: 'Exotisches Reptil als Symbol für anspruchsvolle Wildtierhaltung.',
  },
  'wildkatzenbaby-gefunden': {
    src: 'assets/images/european-wildcat.jpg',
    width: 1496,
    height: 1729,
    type: 'image/jpeg',
    alt: 'Europäische Wildkatze mit typischen Merkmalen wie breitem Kopf, fleischfarbener Nase und dichtem Fell.',
  },
  'noch-nicht-bereit': {
    src: 'assets/images/cat-soft-carrier.jpg',
    width: 1254,
    height: 1638,
    type: 'image/jpeg',
    alt: 'Katze in einer weichen Transportbox als Bild für Warten und Übergang.',
  },
};

Object.assign(firstContentImageByPage, {
  'hunde-soziale-beduerfnisse': {
    src: 'assets/images/dog-resting-under-table.jpg',
    width: 1280,
    height: 853,
    type: 'image/jpeg',
    alt: 'Hund ruht in Menschennähe als Bild für Bindung, Rückzug und soziale Bedürfnisse.',
  },
  'hunde-stadtfest-rummel': {
    src: 'assets/images/dog-resting-under-table.jpg',
    width: 1280,
    height: 853,
    type: 'image/jpeg',
    alt: 'Ruhender Hund als Gegenbild zu Lärm, Gedränge und Veranstaltungsstress.',
  },
  'hunde-garten-auslauf': {
    src: 'assets/images/golden-retriever-agility-jump.jpg',
    width: 2000,
    height: 1339,
    type: 'image/jpeg',
    alt: 'Hund in Bewegung als Bild für Auslauf, Reize und Beschäftigung außerhalb des Gartens.',
  },
  'hunde-allein-zu-hause': {
    src: 'assets/images/dog-resting-under-table.jpg',
    width: 1280,
    height: 853,
    type: 'image/jpeg',
    alt: 'Ruhender Hund als Bild für Pausen, Betreuung und Alleinbleiben.',
  },
  'hunde-kosten': {
    src: 'assets/images/golden-retriever-agility-jump.jpg',
    width: 2000,
    height: 1339,
    type: 'image/jpeg',
    alt: 'Aktiver Hund als Bild für die laufenden Kosten von Training, Alltag und Versorgung.',
  },
  'hunde-kastration': {
    src: 'assets/images/vet-office-with-dog.jpg',
    width: 2048,
    height: 1536,
    type: 'image/jpeg',
    alt: 'Hund in einer Tierarztpraxis als Bild für medizinische Abwägung statt Routineentscheidung.',
  },
  'hunde-hofhaltung-und-zwinger': {
    src: 'assets/images/dog-resting-under-table.jpg',
    width: 1280,
    height: 853,
    type: 'image/jpeg',
    alt: 'Hund in geschützter Nähe als Gegenbild zu isolierter Hof- und Zwingerhaltung.',
  },
  'hunde-gesundheit': {
    src: 'assets/images/vet-office-with-dog.jpg',
    width: 2048,
    height: 1536,
    type: 'image/jpeg',
    alt: 'Hund in einer Tierarztpraxis als Bild für Vorsorge und frühes Handeln.',
  },
  'hunde-entscheidung': {
    src: 'assets/images/tierheim-hund.jpg',
    width: 960,
    height: 1280,
    type: 'image/jpeg',
    alt: 'Hund im Tierheim als Bild für die Entscheidung vor der Anschaffung.',
  },
  'katzen-sozialverhalten': {
    src: 'assets/images/two-cats-window.jpg',
    width: 843,
    height: 954,
    type: 'image/jpeg',
    alt: 'Zwei Katzen am Fenster als Bild für Sozialkontakt und eigenes Revier.',
  },
  'katzen-wohnungshaltung': {
    src: 'assets/images/cat-scratching-post.jpg',
    width: 1215,
    height: 1600,
    type: 'image/jpeg',
    alt: 'Katze auf einem Kratzbaum als Bild für strukturierte Wohnungshaltung.',
  },
  'katzen-kastration': {
    src: 'assets/images/feral-cat-tnr.jpg',
    width: 432,
    height: 324,
    type: 'image/jpeg',
    alt: 'Kastrierte Streunerkatze als Bild für praktischen Katzenschutz.',
  },
  'katzen-stilles-leiden': {
    src: 'assets/images/cat-window-perch.jpg',
    width: 1280,
    height: 960,
    type: 'image/jpeg',
    alt: 'Katze am Fenster als Bild für leise Signale, Rückzug und genaue Beobachtung.',
  },
  'katzen-kosten': {
    src: 'assets/images/cat-carrier-square.jpg',
    width: 1400,
    height: 1394,
    type: 'image/jpeg',
    alt: 'Katze in einer Transporttasche als Bild für Tierarztwege und Rücklagen.',
  },
  'katzen-streunerkatzen': {
    src: 'assets/images/feral-cat-tnr.jpg',
    width: 432,
    height: 324,
    type: 'image/jpeg',
    alt: 'Streunerkatze mit markiertem Ohr als Bild für TNR und Verantwortung.',
  },
  'katzen-entscheidung': {
    src: 'assets/images/two-cats-window.jpg',
    width: 843,
    height: 954,
    type: 'image/jpeg',
    alt: 'Zwei Katzen am Fenster als Bild für eine vorbereitete Katzenentscheidung.',
  },
  'voegel-schwarmhaltung': {
    src: 'assets/images/voegel-voliere.jpg',
    width: 1600,
    height: 1064,
    type: 'image/jpeg',
    alt: 'Wellensittiche in einer Voliere als Bild für Schwarmhaltung.',
  },
  'voegel-uv-licht': {
    src: 'assets/images/vogel-wellensittich.jpg',
    width: 600,
    height: 401,
    type: 'image/jpeg',
    alt: 'Wellensittich als Bild für Licht, Wahrnehmung und UV-Bedarf.',
  },
  'voegel-kuechenluft-und-daempfe-sind-lebensgefahr': {
    src: 'assets/images/voegel-voliere-02.jpg',
    width: 1600,
    height: 1064,
    type: 'image/jpeg',
    alt: 'Wellensittiche in einer Voliere als Bild für empfindliche Atemwege und sichere Räume.',
  },
  'voegel-freiflug-ist-nicht-optional': {
    src: 'assets/images/voegel-voliere.jpg',
    width: 1600,
    height: 1064,
    type: 'image/jpeg',
    alt: 'Wellensittiche mit Raum und Ästen als Bild für Bewegung und Freiflug.',
  },
  'voegel-partnerersatz': {
    src: 'assets/images/vogel-wellensittich.jpg',
    width: 600,
    height: 401,
    type: 'image/jpeg',
    alt: 'Wellensittich als Bild für echte Artgenossen statt falschen Partnerersatz.',
  },
  'voegel-krankheit-erkennen': {
    src: 'assets/images/vet-office-with-dog.jpg',
    width: 2048,
    height: 1536,
    type: 'image/jpeg',
    alt: 'Tierarztpraxis als Bild für schnelle Abklärung bei leisen Krankheitssignalen.',
  },
  'voegel-qualzucht': {
    src: 'assets/images/vogel-wellensittich.jpg',
    width: 600,
    height: 401,
    type: 'image/jpeg',
    alt: 'Wellensittich als Bild für Zuchtmerkmale und genaue Beobachtung.',
  },
  'voegel-entscheidung': {
    src: 'assets/images/voegel-voliere-02.jpg',
    width: 1600,
    height: 1064,
    type: 'image/jpeg',
    alt: 'Mehrere Wellensittiche in einer Voliere als Bild für die Entscheidung vor der Vogelhaltung.',
  },
  'kleintiere-kaninchen': {
    src: 'assets/images/rabbit-adoption-enclosure.jpg',
    width: 1920,
    height: 1280,
    type: 'image/jpeg',
    alt: 'Kaninchen in einem Außengehege als Bild für Platz und artgerechte Unterbringung.',
  },
  'kleintiere-meerschweinchen': {
    src: 'assets/images/kleintiere-zwei-meerschweinchen.jpg',
    width: 1200,
    height: 800,
    type: 'image/jpeg',
    alt: 'Zwei Meerschweinchen zusammen im Gras als Bild für Gruppenhaltung.',
  },
  'kleintiere-hamster': {
    src: 'assets/images/hamster-home-built-enclosure.png',
    width: 1280,
    height: 685,
    type: 'image/png',
    alt: 'Großes Hamstergehege als Bild für Platz, Einstreu und Struktur.',
  },
  'kleintiere-ratten': {
    src: 'assets/images/rat-cage-01.jpg',
    width: 640,
    height: 480,
    type: 'image/jpeg',
    alt: 'Strukturierter Rattenkäfig als Bild für Einrichtung und Beschäftigung.',
  },
  'kleintiere-degus-und-chinchillas': {
    src: 'assets/images/guinea-pig-habitat.jpg',
    width: 800,
    height: 599,
    type: 'image/jpeg',
    alt: 'Strukturiertes Kleintier-Habitat als Bild für Raum, Rückzug und Spezialwissen.',
  },
  'exoten-reptilien': {
    src: 'assets/images/bearded-dragon-terrarium.jpg',
    width: 1000,
    height: 702,
    type: 'image/jpeg',
    alt: 'Bartagame im Terrarium als Bild für Reptilienhaltung mit Licht und Temperaturzonen.',
  },
  'exoten-schildkroeten': {
    src: 'assets/images/exot-bartagame.jpg',
    width: 330,
    height: 212,
    type: 'image/jpeg',
    alt: 'Reptil als Bild für langfristige Verantwortung und fachkundige Exotenhaltung.',
  },
  'exoten-fische': {
    src: 'assets/images/goldfish-aquarium.jpg',
    width: 1920,
    height: 1309,
    type: 'image/jpeg',
    alt: 'Goldfische im Aquarium als Bild für Wasserwerte, Technik und Pflege.',
  },
  'pferde-herde': {
    src: 'assets/images/horse-herd-pasture.jpg',
    width: 1024,
    height: 683,
    type: 'image/jpeg',
    alt: 'Pferdeherde auf einer Weide als Bild für Sozialkontakt.',
  },
  'pferde-platzbedarf': {
    src: 'assets/images/horse-paddocks-shelter.jpg',
    width: 640,
    height: 480,
    type: 'image/jpeg',
    alt: 'Pferdekoppeln mit Unterständen als Bild für Fläche und Bewegung.',
  },
  'pferde-haltungsformen': {
    src: 'assets/images/horse-paddocks-shelter.jpg',
    width: 640,
    height: 480,
    type: 'image/jpeg',
    alt: 'Pferdekoppeln mit Unterständen als Bild für unterschiedliche Haltungsformen.',
  },
  'pferde-kosten': {
    src: 'assets/images/horse-herd-pasture.jpg',
    width: 1024,
    height: 683,
    type: 'image/jpeg',
    alt: 'Pferdeherde auf einer Weide als Bild für laufende Verantwortung und Kosten.',
  },
  'pferde-reitbeteiligung': {
    src: 'assets/images/horse-paddocks-shelter.jpg',
    width: 640,
    height: 480,
    type: 'image/jpeg',
    alt: 'Pferdekoppeln mit Unterständen als Bild für einen realistischen Einstieg in Pferdeverantwortung.',
  },
  'pferde-entscheidung': {
    src: 'assets/images/horse-herd-pasture.jpg',
    width: 1024,
    height: 683,
    type: 'image/jpeg',
    alt: 'Pferdeherde auf einer Weide als Bild für die Entscheidung vor dem eigenen Pferd.',
  },
});

const socialCopyByPage = {
  startseite: {
    eyebrow: 'Verantwortungsvolle Haustierhaltung',
    title: 'Wa(h)re Haustier(liebe)',
    description: 'Ehrliche Aufklärung, bevor ein Tier einzieht: Alltag, Kosten, Tierwohl, Notfall, Adoption und Qualzucht verständlich erklärt.',
    alt: 'Logo von Wa(h)re Haustier(liebe) auf einer Social-Card zur verantwortungsvollen Haustierhaltung.',
  },
  mensch: {
    eyebrow: 'Vor dem Haustierkauf',
    title: 'Passt ein Tier wirklich in dein Leben?',
    description: 'Der ehrliche Realitätscheck für Zeit, Geld, Wohnung, Alltag und Verantwortung, bevor ein Haustier einzieht.',
  },
  hunde: {
    eyebrow: 'Hundehaltung realistisch prüfen',
    title: 'Hund halten: Zeit, Kosten, Alltag',
    description: 'Was ein Hund wirklich braucht: Nähe, Training, Betreuung, Tierarztbudget und einen Alltag, der zum Tier passt.',
  },
  'hund-im-buero': {
    eyebrow: 'Bürohund ehrlich prüfen',
    title: 'Hund im Büro: passt das wirklich?',
    description: 'Fünf Fragen zu Ruhe, Rückzug, Regeln, Pausen und Stresssignalen, bevor ein Hund mit ins Büro kommt.',
  },
  'hunde-stadtfest-rummel': {
    eyebrow: 'Hund auf Veranstaltungen',
    title: 'Brav mitlaufen heißt nicht entspannt sein',
    description: 'Fünf Warnzeichen, wann Stadtfest, Rummel oder Weihnachtsmarkt für deinen Hund zu viel werden.',
  },
  katzen: {
    eyebrow: 'Katzenhaltung ohne Wunschbild',
    title: 'Katzen halten: Wohnung, Freigang, Kastration',
    description: 'Wie Katzen artgerechter leben: Struktur, Sozialkontakt, sichere Freiräume, Kastration und leise Warnsignale.',
  },
  voegel: {
    eyebrow: 'Vogelhaltung verstehen',
    title: 'Vögel brauchen Schwarm, Flugraum und Licht',
    description: 'Warum Einzelhaltung im Käfig nicht reicht und was Wellensittiche und andere Vögel im Alltag wirklich brauchen.',
  },
  kleintiere: {
    eyebrow: 'Kleintiere sind keine Einstiegstiere',
    title: 'Kaninchen, Meerschweinchen, Hamster und Ratten',
    description: 'Fläche, Gruppenhaltung, Zähne, Tierarztkosten und typische Fehler bei Kleintieren klar erklärt.',
  },
  exoten: {
    eyebrow: 'Exotenhaltung ehrlich einordnen',
    title: 'Terrarium, Technik, UV-B und Verantwortung',
    description: 'Warum Faszination nicht reicht und exotische Tiere spezialisierte Haltung, Wissen und Tierarztzugang brauchen.',
  },
  pferde: {
    eyebrow: 'Pferdehaltung langfristig denken',
    title: 'Pferde brauchen Herde, Bewegung und Budget',
    description: 'Stallform, tägliche Bewegung, Hufschmied, Tierarzt und jahrzehntelange Verantwortung realistisch prüfen.',
  },
  kastration: {
    eyebrow: 'Praktischer Tierschutz',
    title: 'Kastration verhindert Leid',
    description: 'Fakten zu Katzen, Hunden, Kaninchen, Kosten, Kastrationspflicht und typischen Mythen rund um Kastration.',
  },
  qualzucht: {
    eyebrow: 'Zuchtmerkmale kritisch sehen',
    title: 'Rassekrankheiten erkennen, bevor Nachfrage Leid finanziert',
    description: 'Suchbares Lexikon zu belegten Zucht- und Erbkrankheiten bei Hunden und Katzen, plus klare Qualzucht-Einordnung.',
  },
  adoption: {
    eyebrow: 'Tierschutz statt Nachfrage',
    title: 'Adoption statt Kauf',
    description: 'Warum Tierheim, Pflegestelle, Schutzgebühr, Vorbereitung und seriöse Vermittlung oft die verantwortungsvollere Wahl sind.',
  },
  selbsttest: {
    eyebrow: 'Bereit für ein Haustier?',
    title: 'Der Haustier-Selbsttest',
    description: '15 ehrliche Fragen zu Zeit, Geld, Wohnsituation, Betreuung und Motivation vor der Anschaffung.',
  },
  notfall: {
    eyebrow: 'Tier-Notfall erkennen',
    title: 'Wann du sofort handeln musst',
    description: 'Atemnot, Krämpfe, Vergiftung, Harnstopp, Schmerzen oder Unfall: Warnsignale klar einordnen.',
  },
  'tierarzt-notdienst': {
    eyebrow: 'Notdienst finden',
    title: 'Tierärztlicher Notdienst nach Bundesland',
    description: 'Offizielle Kammern, Notrufnummern und regionale Systeme, damit du im Ernstfall schneller richtig suchst.',
  },
  kontakt: {
    eyebrow: 'Privates Projekt',
    title: 'Kontakt und Hilfe',
    description: 'Wer hinter Wa(h)re Haustier(liebe) steht, warum wir die Seite machen und wie du uns erreichen kannst.',
  },
  wissen: {
    eyebrow: 'Tiermythen prüfen',
    title: 'Was stimmt wirklich?',
    description: 'Mythen und Homöopathie bei Tieren verständlich, kritisch und ohne Werbeinteresse eingeordnet.',
  },
  glossar: {
    eyebrow: 'Begriffe nachschlagen',
    title: 'Glossar für Tierhaltung und Tierschutz',
    description: 'Wichtige Begriffe rund um Haltung, Krankheiten, Kastration, Tierschutz und Tiermedizin kurz erklärt.',
  },
  'tiere-und-urlaub': {
    eyebrow: 'Urlaub mit Haustier planen',
    title: 'Erst das Tier einplanen',
    description: 'Mitnehmen, Betreuung oder Tierpension: wie Urlaub für Haustiere nicht zur Stress- oder Aussetzungsfalle wird.',
  },
  'hitzefalle-auto': {
    eyebrow: 'Hund im Auto',
    title: 'Zehn Minuten können lebensgefährlich sein',
    description: 'Warum Autos sich schnell aufheizen, welche Warnzeichen zählen und was Passanten in Deutschland tun sollten.',
  },
  'ernaehrung-taurin': {
    eyebrow: 'Tierernährung verständlich',
    title: 'Katzen, Hunde, vegane Ernährung und Taurin',
    description: 'Warum Katzen und Hunde ernährungsphysiologisch verschieden sind und Futter nicht einfach austauschbar ist.',
  },
  realhaltung: {
    eyebrow: 'Normal ist nicht automatisch artgerecht',
    title: 'Realhaltung vs. vertretbare Haltung',
    description: 'Warum übliche Haustierhaltung oft nicht reicht und der Kaufpreis nie die echten Kosten eines Tieres zeigt.',
  },
  'zucht-und-vermehrung': {
    eyebrow: 'Haustiermarkt kritisch sehen',
    title: 'Zucht, Vermehrung und Adoption',
    description: 'Warum zusätzliche Haustierproduktion problematisch bleibt, auch wenn sie sauberer wirkt als Vermehrung.',
  },
  wildtierhaltung: {
    eyebrow: 'Wildtiere sind keine Haustiere',
    title: 'Private Wildtierhaltung: legal heißt nicht vertretbar',
    description: 'Bundesrecht, Landesrecht, Exoten, Gefahrtierhaltung und Wildschutz für Deutschland verständlich eingeordnet.',
  },
  'wildkatzenbaby-gefunden': {
    eyebrow: 'Wildkatzenjunge im Wald',
    title: 'Wildkatzenbaby gefunden?',
    description: 'Nicht mitnehmen: Abstand halten, Fundort sichern, richtig unterscheiden und fachkundige Hilfe holen.',
  },
  'noch-nicht-bereit': {
    eyebrow: 'Warten kann Tierliebe sein',
    title: 'Noch nicht bereit für ein Tier',
    description: 'Warum kein Tier zu nehmen manchmal die verantwortungsvollste Entscheidung ist und wie Tierschutz trotzdem geht.',
  },
  mitmachen: {
    eyebrow: 'Wissen darf besser werden',
    title: 'Mitmachen!',
    description: 'Korrekturen, Quellen und Hinweise helfen, Wa(h)re Haustier(liebe) fachlich sauber und lebendig zu halten.',
  },
  'budgie-brain': {
    eyebrow: 'Interaktive Vogelhaltung',
    title: 'Budgie Brain',
    description: 'Eine spielbare Simulation, die Schwarm, UV-Licht, Freiflug, Stress und Wellensittich-Alltag erfahrbar macht.',
  },
};

const keywordByPage = {
  startseite: ['Haustierhaltung', 'Tierwohl', 'Tierschutz', 'Adoption', 'Qualzucht', 'Tiernotfall'],
  mensch: ['Haustier anschaffen', 'Haustierkauf', 'Verantwortung', 'Kosten', 'Alltag'],
  hunde: ['Hund halten', 'Hund anschaffen', 'Hundekosten', 'Alleinbleiben', 'Erziehung', 'Zwingerhaltung'],
  'hund-im-buero': ['Hund im Büro', 'Bürohund', 'Kollege Hund', 'Hund am Arbeitsplatz', 'Hundehaltung'],
  'hunde-stadtfest-rummel': ['Hund Stadtfest', 'Hund Rummel', 'Hund Weihnachtsmarkt', 'Hund Veranstaltung', 'Stresszeichen Hund'],
  katzen: ['Katze halten', 'Wohnungskatze', 'Freigang', 'Kastration', 'Katzenstress'],
  voegel: ['Vögel halten', 'Wellensittiche', 'Schwarmhaltung', 'Freiflug', 'UV-Licht'],
  kleintiere: ['Kleintiere halten', 'Kaninchen', 'Meerschweinchen', 'Hamster', 'Ratten'],
  exoten: ['Exoten halten', 'Terrarium', 'UV-B', 'Reptilien', 'Meldepflicht'],
  pferde: ['Pferde halten', 'Herde', 'Stallform', 'Hufschmied', 'Pferdekosten'],
  kastration: ['Kastration', 'Kastrationspflicht', 'Tierschutz', 'Katzen', 'Kaninchen'],
  qualzucht: ['Qualzucht', 'Rassekrankheiten', 'Rassemerkmale', 'Atemnot', 'Gendefekte', 'Tierleid'],
  adoption: ['Adoption', 'Tierheim', 'Tierschutz', 'Schutzgebühr', 'Pflegestelle'],
  selbsttest: ['Haustier Selbsttest', 'bereit für ein Tier', 'Zeit', 'Geld', 'Betreuung'],
  notfall: ['Tiernotfall', 'Vergiftung', 'Atemnot', 'Tierarzt', 'Warnsignale'],
  'tierarzt-notdienst': ['Tierarzt Notdienst', 'Notdienst Bundesland', 'Tierärztekammer', 'Notrufnummer'],
  kontakt: ['Kontakt', 'Haltungsfragen', 'Haustierberatung', 'Tierschutz', 'Privates Projekt'],
  mitmachen: ['Mitmachen', 'Korrekturhinweis', 'Quellenhinweis', 'Tierschutz-Wiki', 'redaktionelle Prüfung'],
  wissen: ['Tiermythen', 'Homöopathie bei Tieren', 'Globuli', 'Tierschutzwissen'],
  glossar: ['Glossar', 'Tierschutzwissen', 'Tiermedizin Begriffe', 'Tierhaltung Begriffe'],
  'tiere-und-urlaub': ['Haustiere Urlaub', 'Tierbetreuung', 'Tierpension', 'Urlaub mit Hund', 'Tiere aussetzen'],
  'hitzefalle-auto': ['Hund im Auto', 'Hitze', 'Hitzschlag', 'Sommer', 'Notfall'],
  'ernaehrung-taurin': ['Tierernährung', 'Taurin', 'Katzenfutter', 'Hundefutter', 'vegane Tierernährung'],
  realhaltung: ['Realhaltung', 'artgerechte Haltung', 'Haustierkosten', 'Haltungsfehler'],
  'zucht-und-vermehrung': ['Zucht', 'Vermehrung', 'Züchter', 'Tierheim', 'Adoption'],
  wildtierhaltung: ['Wildtierhaltung', 'Exoten', 'Gefahrtier', 'Wildschutz', 'Deutschland'],
  'wildkatzenbaby-gefunden': ['Wildkatzenbaby gefunden', 'Wildkätzchen', 'Wildkatze oder Hauskatze', 'Wildkatzenjunge', 'Wildtierfund'],
  'noch-nicht-bereit': ['noch nicht bereit', 'Tierschutz unterstützen', 'Haustier warten'],
  'budgie-brain': ['Budgie Brain', 'Wellensittich Simulation', 'Schwarm', 'Freiflug', 'Stress'],
};

function pagePath(page) {
  return page.slug ? `/${page.slug}/index.html` : '/index.html';
}

function canonicalUrl(page) {
  return `${baseUrl}${pagePath(page)}`;
}

function pageLastmod(page) {
  return page.lastmod || lastmod;
}

function socialCopy(page) {
  const fallback = socialCopyByPage.startseite;
  const image = socialImage(page);
  const rawTitle = socialCopyByPage[page.id]?.title || page.title;
  return {
    eyebrow: socialCopyByPage[page.id]?.eyebrow || fallback.eyebrow,
    title: socialTitle(page, rawTitle),
    description: socialCopyByPage[page.id]?.description || page.description || defaultSocialDescription,
    alt: socialCopyByPage[page.id]?.alt || image.alt,
  };
}

function socialTitle(page, title) {
  if (page.id === 'startseite') return 'Wa(h)re Haustier(liebe) - Tierschutz-Wiki';

  const brandedTitle = `${title} - ${siteName}`;
  if (title.length < 30 || (title.length < 45 && brandedTitle.length <= 60)) {
    return brandedTitle;
  }

  return title;
}

function socialImagePath(page) {
  return socialImage(page).src;
}

function sourceSocialImage(page) {
  if (page.id === 'startseite') return defaultSocialImage;
  return firstContentImageByPage[page.id] || firstContentImageByPage[page.sourcePage] || defaultSocialImage;
}

function socialImage(page) {
  const source = sourceSocialImage(page);
  const usesDefault = source.src === defaultSocialImage.src;
  return {
    ...source,
    sourceSrc: source.src,
    src: `assets/social/${usesDefault ? 'default' : page.id}.png`,
    width: socialCardWidth,
    height: socialCardHeight,
    type: 'image/png',
  };
}

function socialImageUrl(page) {
  return `${baseUrl}/${socialImagePath(page)}`;
}

function pageKeywords(page) {
  return keywordByPage[page.id] || keywordByPage[page.sourcePage] || [page.intent, 'Haustierhaltung', 'Tierwohl'].filter(Boolean);
}

function outputPathFor(page) {
  return page.slug ? path.join(projectRoot, page.slug, 'index.html') : path.join(projectRoot, 'index.html');
}

function normalizeAssetPath(src) {
  if (!src || /^(https?:|data:|\/)/.test(src)) return null;
  const normalized = src.replaceAll('\\', '/').replace(/^(\.\.\/)+/, '');
  const assetIndex = normalized.indexOf('assets/');
  return assetIndex === -1 ? null : normalized.slice(assetIndex);
}

function optimizedImagePath(relativePath) {
  if (!relativePath?.startsWith('assets/images/')) return relativePath;
  const filename = path.basename(relativePath);
  const optimizedSame = `assets/images/optimized/${filename}`;
  if (fsSync.existsSync(path.join(projectRoot, optimizedSame))) return optimizedSame;

  const parsed = path.parse(filename);
  const optimizedJpg = `assets/images/optimized/${parsed.name}.jpg`;
  if (fsSync.existsSync(path.join(projectRoot, optimizedJpg))) return optimizedJpg;

  return relativePath;
}

function withAssetPrefix(relativePath, originalSrc) {
  const prefixMatch = originalSrc.match(/^((?:\.\.\/)+)/);
  return `${prefixMatch ? prefixMatch[1] : ''}${relativePath}`;
}

function imageDimensions(relativePath) {
  if (!relativePath) return null;
  const normalized = relativePath.replaceAll('\\', '/');
  if (imageDimensionCache.has(normalized)) return imageDimensionCache.get(normalized);

  const filePath = path.join(projectRoot, normalized);
  if (!fsSync.existsSync(filePath)) return null;
  const buffer = fsSync.readFileSync(filePath);
  let result = null;

  if (buffer.length > 24 && buffer.toString('ascii', 1, 4) === 'PNG') {
    result = {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    };
  } else if (buffer.length > 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) break;
      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      if (marker >= 0xc0 && marker <= 0xc3) {
        result = {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
        };
        break;
      }
      offset += 2 + length;
    }
  }

  imageDimensionCache.set(normalized, result);
  return result;
}

function responsiveImageCandidates(relativePath) {
  if (relativePath !== 'assets/images/optimized/tierheim-hund.jpg') return [];

  return [
    'assets/images/optimized/tierheim-hund-360.jpg',
    'assets/images/optimized/tierheim-hund-480.jpg',
    'assets/images/optimized/tierheim-hund-600.jpg',
    'assets/images/optimized/tierheim-hund.jpg',
  ]
    .map((candidate) => {
      const dimensions = imageDimensions(candidate);
      if (!dimensions) return null;
      return { src: candidate, width: dimensions.width };
    })
    .filter(Boolean);
}

function addImageAttributes(html) {
  return html.replace(/<img\b([^>]*?)>/g, (match, attrs, offset) => {
    const srcMatch = attrs.match(/\bsrc="([^"]+)"/);
    if (!srcMatch) return match;

    const rawSrc = srcMatch[1];
    const relativeSrc = normalizeAssetPath(rawSrc);
    if (!relativeSrc) return match;

    const optimizedSrc = optimizedImagePath(relativeSrc);
    const dimensions = imageDimensions(optimizedSrc);
    let nextAttrs = attrs;

    if (optimizedSrc !== relativeSrc) {
      nextAttrs = nextAttrs.replace(`src="${rawSrc}"`, `src="${withAssetPrefix(optimizedSrc, rawSrc)}"`);
    }

    const candidates = responsiveImageCandidates(optimizedSrc);
    if (candidates.length && !/\bsrcset=/.test(nextAttrs)) {
      const srcset = candidates
        .map((candidate) => `${withAssetPrefix(candidate.src, rawSrc)} ${candidate.width}w`)
        .join(', ');
      nextAttrs += ` srcset="${srcset}"`;
      if (!/\bsizes=/.test(nextAttrs)) {
        const isHeroImage = /\bhero-lead-image\b/.test(html.slice(Math.max(0, offset - 220), offset + match.length));
        nextAttrs += isHeroImage
          ? ' sizes="(max-width: 768px) calc(100vw - 5rem), (max-width: 980px) calc(100vw - 7rem), 43vw"'
          : ' sizes="(max-width: 768px) calc(100vw - 2.5rem), 360px"';
      }
    }

    if (dimensions && !/\bwidth=/.test(nextAttrs)) {
      nextAttrs += ` width="${dimensions.width}"`;
    }
    if (dimensions && !/\bheight=/.test(nextAttrs)) {
      nextAttrs += ` height="${dimensions.height}"`;
    }
    if (!/\bdecoding=/.test(nextAttrs)) {
      nextAttrs += ' decoding="async"';
    }
    if (!/\bfetchpriority=/.test(nextAttrs) && /\bloading="eager"/.test(nextAttrs)) {
      nextAttrs += ' fetchpriority="high"';
    }

    return `<img${nextAttrs}>`;
  });
}

function prefixForSlug(slug) {
  return slug ? '../'.repeat(slug.split('/').length) : '';
}

function assetPrefixFor(page) {
  return prefixForSlug(page.slug);
}

function hrefFor(targetId, currentPage) {
  const target = pageById.get(targetId);
  if (!target || target.onHold) return '#';
  const prefix = prefixForSlug(currentPage.slug);
  if (!target.slug) return `${prefix}index.html`;
  return `${prefix}${target.slug}/index.html`;
}

function glossaryHrefFor(key, currentPage) {
  return `${hrefFor('glossar', currentPage)}#${key}`;
}

function buildGlossaryListHtml() {
  const items = glossaryTerms
    .slice()
    .sort((first, second) => first.title.localeCompare(second.title, 'de'))
    .map((term) => `          <div class="glossary-item" id="${escapeAttr(term.key)}" data-glossary-key="${escapeAttr(term.key)}"><dt>${escapeHtml(term.title)}</dt><dd>${escapeHtml(term.description)}</dd></div>`)
    .join('\n');
  return `        <dl id="glossary-list">\n${items}\n        </dl>`;
}

function replaceGlossaryList(html) {
  const marker = '<dl id="glossary-list">';
  const start = html.indexOf(marker);
  if (start === -1) return html;
  const end = html.indexOf('</dl>', start);
  if (end === -1) throw new Error('Glossary list is missing closing </dl>.');
  return `${html.slice(0, start)}${buildGlossaryListHtml()}${html.slice(end + '</dl>'.length)}`;
}

function validateGlossaryData() {
  const seen = new Set();
  const duplicates = [];
  glossaryTerms.forEach((term) => {
    if (seen.has(term.key)) duplicates.push(term.key);
    seen.add(term.key);
  });
  if (duplicates.length) {
    throw new Error(`Duplicate glossary keys: ${duplicates.join(', ')}`);
  }

  Object.entries(glossaryAnnotationsByPage).forEach(([pageId, annotations]) => {
    if (!pageById.has(pageId)) throw new Error(`Glossary annotations reference unknown page: ${pageId}`);
    annotations.forEach((annotation) => {
      const keys = extractGlossaryKeysFromHtml(annotation.to);
      keys.forEach((key) => {
        if (!glossaryTermByKey.has(key)) {
          throw new Error(`Glossary annotation on ${pageId} references unknown key: ${key}`);
        }
      });
    });
  });
}

function applyGlossaryAnnotations(html, currentPage) {
  const annotations = glossaryAnnotationsByPage[currentPage.topicPage ? currentPage.sourcePage : currentPage.id] || [];
  const strict = !currentPage.topicPage && !hubPageIds.has(currentPage.id);
  let next = html;
  const missing = [];

  annotations.forEach((annotation) => {
    if (hasGlossaryAnnotation(next, annotation.to)) return;
    const index = next.indexOf(annotation.from);
    if (index === -1) {
      missing.push(annotation.from);
      return;
    }
    next = `${next.slice(0, index)}${annotation.to}${next.slice(index + annotation.from.length)}`;
  });

  if (strict && missing.length) {
    throw new Error(`Missing glossary annotation anchors on ${currentPage.id}:\n- ${missing.join('\n- ')}`);
  }

  return next;
}

function extractGlossaryKeysFromHtml(html) {
  const keys = [];
  const marker = 'data-glossary-key="';
  let index = 0;
  while (index < html.length) {
    const start = html.indexOf(marker, index);
    if (start === -1) break;
    const valueStart = start + marker.length;
    const valueEnd = html.indexOf('"', valueStart);
    if (valueEnd === -1) break;
    keys.push(html.slice(valueStart, valueEnd));
    index = valueEnd + 1;
  }
  return keys;
}

function isHtmlWhitespace(char) {
  return char === ' ' || char === '\n' || char === '\r' || char === '\t' || char === '\f';
}

function walkHtmlAttributes(attrs, callback) {
  let index = 0;
  while (index < attrs.length) {
    const rawStart = index;
    while (index < attrs.length && isHtmlWhitespace(attrs[index])) index += 1;
    if (index >= attrs.length) {
      callback({ name: '', value: '', raw: attrs.slice(rawStart) });
      break;
    }

    const nameStart = index;
    while (
      index < attrs.length
      && !isHtmlWhitespace(attrs[index])
      && attrs[index] !== '='
      && attrs[index] !== '>'
    ) {
      index += 1;
    }
    const name = attrs.slice(nameStart, index);

    while (index < attrs.length && isHtmlWhitespace(attrs[index])) index += 1;

    let value = '';
    if (attrs[index] === '=') {
      index += 1;
      while (index < attrs.length && isHtmlWhitespace(attrs[index])) index += 1;
      const quote = attrs[index];
      if (quote === '"' || quote === "'") {
        index += 1;
        const valueStart = index;
        const valueEnd = attrs.indexOf(quote, valueStart);
        if (valueEnd === -1) {
          value = attrs.slice(valueStart);
          index = attrs.length;
        } else {
          value = attrs.slice(valueStart, valueEnd);
          index = valueEnd + 1;
        }
      } else {
        const valueStart = index;
        while (index < attrs.length && !isHtmlWhitespace(attrs[index])) index += 1;
        value = attrs.slice(valueStart, index);
      }
    }

    callback({ name, value, raw: attrs.slice(rawStart, index) });
  }
}

function readHtmlAttribute(attrs, name) {
  let found = '';
  walkHtmlAttributes(attrs, (attribute) => {
    if (!found && attribute.name === name) found = attribute.value;
  });
  return found;
}

function stripGlossaryDataAttributes(attrs) {
  const blocked = new Set([
    'data-glossary-key',
    'data-glossary-title',
    'data-glossary-text',
    'data-glossary-href',
  ]);
  let next = '';
  walkHtmlAttributes(attrs, (attribute) => {
    if (!attribute.name || blocked.has(attribute.name)) return;
    next += attribute.raw;
  });
  return next.trim();
}

function replaceGlossarySpanOpenings(html, replacer) {
  const marker = '<span class="glossary-term"';
  let next = '';
  let index = 0;
  while (index < html.length) {
    const start = html.indexOf(marker, index);
    if (start === -1) {
      next += html.slice(index);
      break;
    }

    const end = html.indexOf('>', start);
    if (end === -1) {
      next += html.slice(index);
      break;
    }

    next += html.slice(index, start);
    const opening = html.slice(start, end + 1);
    const attrs = opening.slice('<span'.length, -1);
    next += replacer(opening, attrs);
    index = end + 1;
  }
  return next;
}

function normalizeGlossaryMarkers(html) {
  return replaceGlossarySpanOpenings(html, (opening, attrs) => {
    const key = readHtmlAttribute(attrs, 'data-glossary-key');
    if (!key) return opening;
    return `<span class="glossary-term" data-glossary-key="${escapeAttr(key)}">`;
  });
}

function hasGlossaryAnnotation(html, annotationHtml) {
  return normalizeGlossaryMarkers(html).includes(annotationHtml);
}

function enrichGlossaryTerms(html, currentPage) {
  return replaceGlossarySpanOpenings(html, (opening, attrs) => {
    const key = readHtmlAttribute(attrs, 'data-glossary-key');
    if (!key) return opening;
    const term = glossaryTermByKey.get(key);
    if (!term) throw new Error(`Unknown glossary key in ${currentPage.id}: ${key}`);
    const preservedAttrs = stripGlossaryDataAttributes(attrs);
    const extra = [
      `data-glossary-key="${escapeAttr(term.key)}"`,
      `data-glossary-title="${escapeAttr(term.title)}"`,
      `data-glossary-text="${escapeAttr(term.summary)}"`,
      `data-glossary-href="${escapeAttr(glossaryHrefFor(term.key, currentPage))}"`,
    ].join(' ');
    return `<span${preservedAttrs ? ` ${preservedAttrs}` : ''} ${extra}>`;
  });
}

function hydrateGlossary(html, currentPage) {
  let next = applyGlossaryAnnotations(html, currentPage);
  next = replaceGlossaryList(next);
  next = enrichGlossaryTerms(next, currentPage);
  return next;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("'", '&#39;');
}

function extractBetween(source, start, end) {
  const startIndex = source.indexOf(start);
  if (startIndex === -1) throw new Error(`Missing marker: ${start}`);
  const contentStart = startIndex + start.length;
  const endIndex = source.indexOf(end, contentStart);
  if (endIndex === -1) throw new Error(`Missing marker: ${end}`);
  return source.slice(contentStart, endIndex);
}

function extractSection(source, id) {
  const marker = new RegExp(`<section id="${id}" class="page(?: active)?">`);
  const match = marker.exec(source);
  if (!match) throw new Error(`Missing section: ${id}`);
  const start = match.index;
  const nextCandidates = pageIds
    .filter((other) => other !== id)
    .map((other) => source.indexOf(`<section id="${other}" class="page`, start + 1))
    .filter((index) => index > start);
  const footerIndex = source.indexOf('<!-- ===== FOOTER ===== -->', start);
  nextCandidates.push(footerIndex);
  const end = Math.min(...nextCandidates);
  return source.slice(start, end).trim();
}

const hubPageIds = new Set(['hunde', 'katzen', 'voegel', 'kleintiere', 'exoten', 'pferde']);

function topicChildrenFor(pageId) {
  return topicPages.filter((topic) => topic.sourcePage === pageId);
}

function buildTopicSiblingNav(page) {
  const parent = pageById.get(page.sourcePage);
  const siblings = topicChildrenFor(page.sourcePage).filter((topic) => topic.id !== page.id);
  if (!parent || !siblings.length) return '';
  const siblingLinks = siblings.map((topic) => `
          <a class="topic-context-link" href="#${topic.id}" onclick="navigateTo('${topic.id}');return false">
            <strong>${escapeHtml(topic.title.replace(` - ${siteName}`, ''))}</strong>
            <span>${escapeHtml(topic.description)}</span>
          </a>`).join('');
  return `
        <nav class="topic-context-nav article-rhythm" aria-label="Weitere Themen in diesem Bereich">
          <div class="topic-context-head">
            <span class="eyebrow">${escapeHtml(parent.title.split(':')[0].replace(' halten', ''))}</span>
            <h2>Weitere Themen in diesem Bereich</h2>
          </div>
          <div class="topic-context-grid">
${siblingLinks}
          </div>
        </nav>`;
}

function buildAnimalHubSection(source, page) {
  const children = topicChildrenFor(page.id);
  const cards = children.map((child) => `
          <article class="card">
            <div class="card-body">
              <h3>${escapeHtml(child.title.replace(` - ${siteName}`, ''))}</h3>
              <p>${escapeHtml(child.description)}</p>
              <span class="card-link" onclick="navigateTo('${child.id}')">Thema öffnen</span>
            </div>
          </article>`).join('');

  const sourceSection = extractSection(source, page.id);
  const firstTopicHeading = sourceSection.indexOf('<h2');
  if (firstTopicHeading === -1) throw new Error(`Animal hub has no first topic heading: ${page.id}`);

  const opening = sourceSection.slice(0, firstTopicHeading).trimEnd();
  return `${opening}
        <div class="info-box">
          <h3>Wähle den Punkt, an dem deine Entscheidung gerade hängt</h3>
          <p>Jedes Thema führt dich tiefer in die Haltung, die Kosten, die typischen Irrtümer und die Frage, ob dieses Tier wirklich in deinen Alltag passt.</p>
        </div>
        <div class="grid-3 animal-topic-grid">
${cards}
        </div>
      </div>
    </div>
  </section>`;
}

function extractTopicSection(source, page) {
  const parent = pageById.get(page.sourcePage);
  if (!parent) throw new Error(`Missing topic parent for ${page.id}: ${page.sourcePage}`);

  const parentSection = extractSection(source, page.sourcePage);
  const headingPattern = new RegExp(`<h2([^>]*)id="${page.sourceAnchor}"([^>]*)>[\\s\\S]*?<\\/h2>`);
  const heading = headingPattern.exec(parentSection);
  if (!heading) throw new Error(`Missing topic anchor for ${page.id}: ${page.sourceAnchor}`);

  const start = heading.index;
  const nextHeading = parentSection.indexOf('<h2', start + heading[0].length);
  const fallbackEnd = parentSection.lastIndexOf('</div>\n    </div>\n  </section>');
  const end = nextHeading === -1 ? fallbackEnd : nextHeading;
  if (end === -1 || end <= start) throw new Error(`Could not determine topic end for ${page.id}`);

  const topicHtml = parentSection.slice(start, end).trim();
  const parentLabel = parent.title.split(':')[0].replace(' halten', '');
  return `<section id="${page.id}" class="page">
    <div class="hero">
      <div class="container">
        <h1>${escapeHtml(page.title.replace(` - ${siteName}`, ''))}</h1>
        <p>${escapeHtml(page.description)}</p>
      </div>
    </div>

    <div class="section">
      <div class="container">
        <p class="text-muted"><a href="#${parent.id}" onclick="navigateTo('${parent.id}');return false">Zurück zur Übersicht: ${escapeHtml(parentLabel)}</a></p>
        <div id="${page.sourceAnchor}" class="topic-page-content">
${topicHtml}
        </div>
${buildTopicSiblingNav(page)}
      </div>
    </div>
  </section>`;
}

function stripButtonOnlyAttributes(attrs) {
  return attrs
    .replace(/\s*onclick="[^"]*"/g, '')
    .replace(/\s*type="button"/g, '')
    .replace(/\s*aria-pressed="[^"]*"/g, '')
    .trimEnd();
}

function transformLinks(html, currentPage) {
  let next = html;

  next = next.replace(/<div class="site-logo" onclick="navigateTo\('startseite'\)" aria-label="([^"]+)">([\s\S]*?)<\/div>/, (_match, label, content) => {
    return `<a class="site-logo" href="${hrefFor('startseite', currentPage)}" aria-label="${label}">${content}</a>`;
  });

  next = next.replace(/<button([^>]*?)onclick="navigateTo\('([^']+)'\)"([^>]*)>([\s\S]*?)<\/button>/g, (match, before, targetId, after, content) => {
    if (!pageById.has(targetId)) return match;
    const attrs = stripButtonOnlyAttributes(`${before}${after}`);
    return `<a${attrs} href="${hrefFor(targetId, currentPage)}">${content}</a>`;
  });

  next = next.replace(/<button([^>]*?)onclick="document\.getElementById\('tierarten-start'\)\.scrollIntoView\(\{behavior:'smooth', block:'start'\}\)"([^>]*)>([\s\S]*?)<\/button>/g, (_match, before, after, content) => {
    const attrs = stripButtonOnlyAttributes(`${before}${after}`);
    const href = currentPage.slug ? '../#tierarten-start' : '#tierarten-start';
    return `<a${attrs} href="${href}">${content}</a>`;
  });

  next = next.replace(/<div([^>]*class="[^"]*\banimal-card\b[^"]*"[^>]*)onclick="navigateTo\('([^']+)'\)"([^>]*)>([\s\S]*?)<\/div>/g, (match, before, targetId, after, content) => {
    if (!pageById.has(targetId)) return match;
    const attrs = stripButtonOnlyAttributes(`${before}${after}`);
    return `<a${attrs} href="${hrefFor(targetId, currentPage)}">${content}</a>`;
  });

  next = next.replace(/href="#([^"]+)"\s+onclick="navigateTo\('([^']+)'\);return false"/g, (match, hashId, targetId) => {
    if (!pageById.has(targetId)) return match;
    return `href="${hrefFor(targetId, currentPage)}"`;
  });

  next = next.replace(/href="#([^"]+)"/g, (match, targetId) => {
    if (!pageById.has(targetId)) return match;
    return `href="${hrefFor(targetId, currentPage)}"`;
  });

  next = next.replace(/<span class="card-link" onclick="window\.open\('([^']+)', '_blank'\)">([\s\S]*?)<\/span>/g, (_match, url, label) => {
    return `<a class="card-link" href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  });

  next = next.replace(/<span class="card-link" onclick="navigateTo\('([^']+)'\)">([\s\S]*?)<\/span>/g, (match, targetId, label) => {
    if (!pageById.has(targetId)) return match;
    return `<a class="card-link" href="${hrefFor(targetId, currentPage)}">${label}</a>`;
  });

  next = next.replace(/href="budgie\.html"/g, `href="${hrefFor('budgie-brain', currentPage)}"`);
  next = next.replace(/<a\b([^>]*?)target="_blank"([^>]*?)>/g, (_match, before, after) => {
    const attrs = `${before}target="_blank"${after}`;
    if (/\brel=/.test(attrs)) {
      return `<a${attrs.replace(/\brel="([^"]*)"/, (_relMatch, relValue) => {
        const values = new Set(relValue.split(/\s+/).filter(Boolean));
        values.add('noopener');
        values.add('noreferrer');
        return `rel="${Array.from(values).join(' ')}"`;
      })}>`;
    }
    return `<a${before}target="_blank" rel="noopener noreferrer"${after}>`;
  });

  return next;
}

function prefixAssets(html, prefix) {
  return html
    .replace(/(src|href)="assets\//g, `$1="${prefix}assets/`)
    .replace(/url\(['"]?assets\//g, `url('${prefix}assets/`);
}

function rewriteScript(script) {
  let next = script;
  const routeMap = {
    ...Object.fromEntries(publicPages.map((page) => [page.id, pagePath(page)])),
  };

  next = `var staticPageRoutes = ${JSON.stringify(routeMap, null, 2)};\n` +
    `var staticSiteSearchIndex = ${JSON.stringify(publicPages.map((page) => ({
      id: page.id,
      title: page.title,
      description: page.description,
      terms: [page.intent, page.slug, page.id.replaceAll('-', ' ')].filter(Boolean).join(' '),
    })), null, 2)};\n` +
    `function staticRouteFor(page) {\n` +
    `  var target = staticPageRoutes[page] || '/';\n` +
    `  var prefix = document.body ? (document.body.dataset.routePrefix || '') : '';\n` +
    `  if (target === '/') return prefix ? prefix + 'index.html' : 'index.html';\n` +
    `  return prefix + target.replace(/^\\//, '');\n` +
    `}\n` +
    `function assetUrl(src) {\n` +
    `  if (!src || /^(https?:|data:|\\/)/.test(src)) return src;\n` +
    `  var prefix = document.body ? (document.body.dataset.assetPrefix || '') : '';\n` +
    `  return prefix + src;\n` +
    `}\n` +
    `function normalizeAssetUrls(root) {\n` +
    `  Array.from((root || document).querySelectorAll('img[src^="assets/"]')).forEach(function(img) {\n` +
    `    img.setAttribute('src', assetUrl(img.getAttribute('src')));\n` +
    `  });\n` +
    `}\n\n` + next;

  next = next.replace("img.src = config.src;", "img.src = assetUrl(config.src);");
  next = next.replace(
    /function navigateTo\(page\) \{[\s\S]*?history\.replaceState\(null, '', page === 'startseite' \? location\.pathname : '#' \+ page\);\s*\}/,
    `function navigateTo(page) {\n` +
    `      if (document.body && document.body.dataset.staticSite === 'true') {\n` +
    `        var target = document.getElementById(page);\n` +
    `        if (target && !target.classList.contains('page')) {\n` +
    `          scrollElementIntoView(target, { behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });\n` +
    `          closeMobileNav();\n` +
    `          closeDropdowns();\n` +
    `          history.replaceState(null, '', '#' + page);\n` +
    `          return;\n` +
    `        }\n` +
    `        window.location.href = staticRouteFor(page);\n` +
    `        return;\n` +
    `      }\n` +
    `      document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });\n` +
    `      document.querySelectorAll('[data-page]').forEach(function(l) { l.classList.remove('active'); l.removeAttribute('aria-current'); });\n` +
    `      var target = document.getElementById(page);\n` +
    `      if (target) {\n` +
    `        target.classList.add('active');\n` +
    `        document.querySelectorAll('[data-page="' + page + '"]').forEach(function(link) { link.classList.add('active'); link.setAttribute('aria-current', 'page'); });\n` +
    `      }\n` +
    `      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });\n` +
    `      closeMobileNav();\n` +
    `      closeDropdowns();\n` +
    `      closeSiteSearch();\n` +
    `      history.replaceState(null, '', page === 'startseite' ? location.pathname : '#' + page);\n` +
    `    }`
  );

  next = next.replace(
    /document\.addEventListener\('DOMContentLoaded', function\(\) \{[\s\S]*?navigateTo\(hash \|\| 'startseite'\);\s*\}\);/,
    `document.addEventListener('DOMContentLoaded', function() {\n` +
    `      hydrateArticleHeroImages();\n` +
    `      hydrateArticleEnhancements();\n` +
    `      hydrateArticleKickers();\n` +
    `      hydrateResponsiveTables();\n` +
    `      hydrateMythRows();\n` +
    `      filterBreedDiseases();\n` +
    `      hydrateTestProgress();\n` +
    `      normalizeAssetUrls(document);\n` +
    `      if (document.body && document.body.dataset.staticSite === 'true') {\n` +
    `        var pageId = document.body.dataset.pageId || 'startseite';\n` +
    `        var hash = location.hash.slice(1);\n` +
    `        if (hash && staticPageRoutes[hash] && !staticPageRoutes[hash].includes('#') && hash !== pageId) {\n` +
    `          window.location.replace(staticRouteFor(hash));\n` +
    `          return;\n` +
    `        }\n` +
    `        document.querySelectorAll('[data-page]').forEach(function(link) {\n` +
    `          var active = link.dataset.page === pageId;\n` +
    `          link.classList.toggle('active', active);\n` +
    `          if (active) link.setAttribute('aria-current', 'page');\n` +
    `          else link.removeAttribute('aria-current');\n` +
    `        });\n` +
    `        var staticPage = document.querySelector('.page');\n` +
    `        if (staticPage) buildArticleToc(staticPage);\n` +
    `        document.querySelectorAll('.dropdown').forEach(function(dropdown) {\n` +
    `          var hasActive = dropdown.querySelector('[aria-current=\"page\"]');\n` +
    `          var toggle = dropdown.querySelector('.dropdown-toggle');\n` +
    `          if (toggle && hasActive) toggle.setAttribute('aria-current', 'page');\n` +
    `        });\n` +
    `        initAccessibilityState();\n` +
    `        initContactForms();\n` +
    `        document.addEventListener('keydown', function(event) {\n` +
    `          if (event.key === 'Escape') {\n` +
    `            closeDropdowns();\n` +
    `            closeMobileNav();\n` +
    `          }\n` +
    `        });\n` +
    `        return;\n` +
    `      }\n` +
    `      initAccessibilityState();\n` +
    `      initContactForms();\n` +
    `      document.addEventListener('keydown', function(event) {\n` +
    `        if (event.key === 'Escape') {\n` +
    `          closeDropdowns();\n` +
    `          closeMobileNav();\n` +
    `        }\n` +
    `      });\n` +
    `      var hash = location.hash.slice(1);\n` +
    `      navigateTo(hash || 'startseite');\n` +
    `    });`
  );

  next = next.replace("var hash = location.hash || '#startseite';\n      var url = 'https://wahre-haustierliebe.de/' + hash;", "var url = window.location.href.split('#')[0];");
  next = next.replace(/target\.insertAdjacentHTML\('afterend', item\.html\);\s*\}\);/, "target.insertAdjacentHTML('afterend', item.html);\n        });\n\n        normalizeAssetUrls(page);");

  return next;
}

function buildJsonLd(page) {
  const canonical = canonicalUrl(page);
  const copy = socialCopy(page);
  const social = socialImage(page);
  const modified = pageLastmod(page);
  const image = {
    '@type': 'ImageObject',
    url: socialImageUrl(page),
    width: social.width,
    height: social.height,
    caption: copy.alt,
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Startseite',
        item: `${baseUrl}/`,
      },
    ],
  };
  if (page.id !== 'startseite') {
    breadcrumb.itemListElement.push({
      '@type': 'ListItem',
      position: 2,
      name: page.title.split(':')[0],
      item: canonical,
    });
  }

  const webPage = {
    '@context': 'https://schema.org',
    '@type': page.type === 'WebSite' ? 'WebSite' : 'WebPage',
    name: page.title,
    headline: page.title,
    description: page.description,
    url: canonical,
    image,
    thumbnailUrl: socialImageUrl(page),
    primaryImageOfPage: image,
    inLanguage: 'de-DE',
    dateModified: modified,
    isAccessibleForFree: true,
    keywords: pageKeywords(page).join(', '),
    about: pageKeywords(page).map((name) => ({ '@type': 'Thing', name })),
    audience: {
      '@type': 'Audience',
      audienceType: 'Haustierhalter, Tierinteressierte und Tierschutzinteressierte in Deutschland',
    },
    potentialAction: {
      '@type': 'ReadAction',
      target: canonical,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: `${baseUrl}/`,
    },
  };

  const blocks = [webPage, breadcrumb];
  const evidence = evidenceByPage[page.id];
  if (evidence && page.id !== 'startseite') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': page.standalone === 'budgie' ? 'LearningResource' : 'Article',
      headline: page.title,
      name: page.title,
      description: page.description,
      url: canonical,
      mainEntityOfPage: canonical,
      image,
      author: [
        {
          '@type': 'Person',
          name: 'Annemarie Andersen',
        },
        {
          '@type': 'Person',
          name: 'Jan-Erik Andersen',
        },
      ],
      dateModified: modified,
      inLanguage: 'de-DE',
      isAccessibleForFree: true,
      keywords: pageKeywords(page).join(', '),
      articleSection: page.intent,
      about: pageKeywords(page).map((name) => ({ '@type': 'Thing', name })),
      citation: evidence.sources.map(([, url]) => url),
    });
  }

  const faqItems = faqByPage[page.id];
  if (faqItems?.length) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      })),
    });
  }

  return blocks;
}

function buildIconLinks(prefix) {
  return [
    `  <link rel="icon" href="${prefix}favicon.ico" sizes="any">`,
    `  <link rel="icon" type="image/svg+xml" href="${prefix}assets/icons/favicon.svg">`,
    `  <link rel="icon" type="image/png" sizes="16x16" href="${prefix}assets/icons/favicon-16x16.png">`,
    `  <link rel="icon" type="image/png" sizes="32x32" href="${prefix}assets/icons/favicon-32x32.png">`,
    `  <link rel="apple-touch-icon" sizes="180x180" href="${prefix}assets/icons/apple-touch-icon.png">`,
    `  <link rel="manifest" href="${prefix}site.webmanifest">`,
  ].join('\n');
}

function listItems(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function sourceLinks(sources) {
  return `<ul>${sources.map(([label, url]) => `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a></li>`).join('')}</ul>`;
}

function buildFaqBlock(page) {
  const items = faqByPage[page.id];
  if (!items?.length) return '';

  return `\n        <div class="article-rhythm faq-block" data-faq-block="${page.id}">\n          <span class="eyebrow">Kurz beantwortet</span>\n          <h2>Häufige Fragen</h2>\n          <div class="faq-list">\n${items.map(([question, answer]) => `            <details class="faq-item">\n              <summary>${escapeHtml(question)}</summary>\n              <p>${escapeHtml(answer)}</p>\n            </details>`).join('\n')}\n          </div>\n        </div>\n`;
}

function buildEvidenceBlock(page) {
  const evidence = evidenceByPage[page.id];
  if (!evidence) return '';

  return `\n        <div class="article-rhythm evidence-block" data-evidence-block="${page.id}">\n          <span class="eyebrow">Quellen und Prüfstand</span>\n          <h2>Worauf diese Seite ihre Aussagen stützt</h2>\n          <div class="evidence-grid">\n            <article class="evidence-card">\n              <h3>Kernfakten</h3>\n              ${listItems(evidence.facts)}\n            </article>\n            <article class="evidence-card">\n              <h3>Primäre Quellen</h3>\n              ${sourceLinks(evidence.sources)}\n            </article>\n            <article class="evidence-card">\n              <h3>Wichtig zu wissen</h3>\n              ${listItems(evidence.guardrails)}\n            </article>\n          </div>\n        </div>\n`;
}

function injectBeforeClosingContent(body, block) {
  if (!block) return body;
  const shareIndex = body.indexOf('<p class="share-label');
  if (shareIndex !== -1) {
    return `${body.slice(0, shareIndex)}${block}${body.slice(shareIndex)}`;
  }

  const ctaIndex = body.lastIndexOf('<div class="mt-2 text-center">');
  if (ctaIndex !== -1) {
    return `${body.slice(0, ctaIndex)}${block}${body.slice(ctaIndex)}`;
  }

  const sectionClose = body.lastIndexOf('</section>');
  if (sectionClose !== -1) {
    return `${body.slice(0, sectionClose)}${block}${body.slice(sectionClose)}`;
  }

  return `${body}${block}`;
}

function injectGeoBlocks(body, page) {
  if (body.includes('data-evidence-block=') || body.includes('data-faq-block=')) return body;
  const mainEnd = body.indexOf('\n  </main>');
  if (mainEnd === -1) {
    return injectBeforeClosingContent(injectBeforeClosingContent(body, buildFaqBlock(page)), buildEvidenceBlock(page));
  }

  const mainBody = body.slice(0, mainEnd);
  const rest = body.slice(mainEnd);
  return `${injectBeforeClosingContent(injectBeforeClosingContent(mainBody, buildFaqBlock(page)), buildEvidenceBlock(page))}${rest}`;
}

function buildCriticalCss(prefix) {
  return `<style data-critical-css>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{--primary:#1F3A2F;--primary-dark:#14241D;--primary-light:#E8F5EF;--secondary:#C04A3A;--accent:#E89A4B;--accent-light:#FFF4CC;--bg:#FBF8F2;--white:#FFFEFA;--border:rgba(31,58,47,.14);--text:#1A2A22;--text-muted:#3D5046;--text-light:#6B7F75;--shadow:0 8px 28px rgba(31,58,47,.09);--shadow-lg:0 18px 50px rgba(31,58,47,.13);--radius:20px;--radius-lg:32px;--font-heading:"Segoe UI",system-ui,-apple-system,BlinkMacSystemFont,sans-serif;--font-body:"Segoe UI",system-ui,-apple-system,BlinkMacSystemFont,sans-serif;--max-width:1240px}
    body{font-family:var(--font-body);color:var(--text);background:var(--bg);font-size:17px;line-height:1.65;-webkit-font-smoothing:antialiased}
    a{color:var(--primary);text-decoration:none}
    img{max-width:100%;height:auto}
    h1,h2,h3,h4,.site-logo{font-family:var(--font-heading);letter-spacing:-.018em;overflow-wrap:break-word}
    .container{max-width:var(--max-width);margin:0 auto;padding-left:clamp(1.25rem,5vw,3.5rem);padding-right:clamp(1.25rem,5vw,3.5rem)}
    .site-header{position:sticky;top:0;z-index:1000;background:rgba(251,248,242,.94);border-bottom:1px solid rgba(31,58,47,.10);box-shadow:0 1px 4px rgba(0,0,0,.04)}
    .header-inner{height:74px;max-width:var(--max-width);margin:0 auto;padding:0 clamp(1.25rem,5vw,3.5rem);display:flex;align-items:center;justify-content:space-between}
    .site-logo{display:inline-flex;align-items:center;gap:.62rem;color:var(--primary);font-size:1.24rem;font-weight:800;line-height:1.05;white-space:nowrap}
    .site-logo-image{width:2.45rem;height:2.45rem;object-fit:contain;background:var(--primary-light);border-radius:.85rem;flex-shrink:0}
    .site-logo-text{display:inline-flex;align-items:baseline;white-space:nowrap}.brand-red{color:var(--secondary)}
    .nav-links{display:flex;align-items:center;gap:.25rem;list-style:none}.nav-link{border:0;background:transparent;border-radius:999px;color:var(--text-muted);font:700 .92rem var(--font-body);padding:.65rem .9rem;white-space:nowrap}
    .hamburger,.mobile-nav{display:none}
    #startseite .hero{min-height:calc(100vh - 74px);padding:clamp(3rem,7vh,5rem) 0 clamp(3.5rem,7vh,5.25rem);background:radial-gradient(circle at 94% 8%,rgba(255,217,107,.28),transparent 19rem),linear-gradient(135deg,#B8E6D5 0%,#E8F5EF 46%,#FBF8F2 100%);color:var(--text);overflow:hidden}
    #startseite .hero .container{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(340px,.95fr);align-items:center;gap:clamp(3rem,6vw,5.5rem)}
    #startseite .hero h1{color:var(--primary);font-size:clamp(3.6rem,6.4vw,5.55rem);line-height:.96;max-width:10.8ch;margin:0 0 1.75rem;font-weight:800;letter-spacing:-.035em;hyphens:none;overflow-wrap:normal}
    #startseite .hero p{color:var(--text-muted);max-width:36rem;font-size:clamp(1.12rem,1.55vw,1.35rem);line-height:1.62;margin:0 0 1.6rem}
    .hero-brand-logo{display:none}
    .hero-actions{display:flex;gap:.85rem;flex-wrap:wrap;align-items:center}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:3.15rem;padding:.85rem 1.45rem;border-radius:999px;border:0;font:700 .95rem var(--font-body)}.btn-primary,.btn-white{background:var(--primary);color:var(--white)}.btn-outline{background:rgba(251,248,242,.4);border:2px solid var(--primary);color:var(--primary)}
    .hero-visual-card{position:relative;min-height:530px;padding:1.25rem;border-radius:var(--radius-lg);background:linear-gradient(145deg,rgba(255,254,250,.64),rgba(184,230,213,.42)),repeating-linear-gradient(135deg,rgba(31,58,47,.06) 0 1px,transparent 1px 22px);box-shadow:0 28px 75px rgba(31,58,47,.13);display:grid;grid-template-rows:minmax(300px,1fr) auto;gap:.85rem}
    .hero-lead-image{position:relative;width:100%;height:100%;min-width:0;margin:0;overflow:hidden;border-radius:calc(var(--radius-lg) - 8px);background:var(--primary-light)}
    .hero-lead-image img{display:block;width:100%;height:100%;object-fit:cover;object-position:var(--image-position,center 50%)}
    .hero-tape{position:absolute;top:.75rem;left:2rem;z-index:3;border-radius:8px;background:#FFD96B;color:var(--primary-dark);padding:.45rem .85rem;font-weight:800;transform:rotate(-3deg)}
    @media (max-width:980px){#startseite .hero{min-height:0}#startseite .hero .container{display:flex;flex-direction:column;align-items:stretch}#startseite .hero h1,#startseite .hero p{max-width:100%;width:100%}.hero-visual-card{min-height:520px}}
    @media (max-width:768px){.header-inner{height:64px}.nav-links{display:none}.hamburger{display:block;background:transparent;border:0;font-size:1.5rem}.site-logo-image{width:2.65rem;height:2.42rem}#startseite .hero{padding:3.25rem 0}#startseite .hero h1{font-size:clamp(2.55rem,13vw,4rem);line-height:.98}.hero-visual-card{min-height:0;padding-top:3.8rem}.hero-lead-image{min-height:320px}}
  </style>`;
}

function buildStylesheetLinks(prefix) {
  if (staticCssForInline) {
    return `<style data-static-css>
${staticCssForInline}
  </style>`;
  }

  return `${buildCriticalCss(prefix)}\n  <link rel="preload" href="${prefix}assets/site.css" as="style" onload="this.onload=null;this.rel='stylesheet'">\n  <noscript><link rel="stylesheet" href="${prefix}assets/site.css"></noscript>`;
}

function restoreAsyncCssLinks(html) {
  return html.replace(
    /<link rel="stylesheet" href="([^"]*assets\/site\.css)" as="style" onload="this\.onload=null;this\.rel='stylesheet'">/g,
    '<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">',
  );
}

function buildHead(page, prefix) {
  const canonical = canonicalUrl(page);
  const copy = socialCopy(page);
  const social = socialImage(page);
  const image = socialImageUrl(page);
  const keywords = pageKeywords(page).join(', ');
  const modified = pageLastmod(page);
  const schema = buildJsonLd(page)
    .map((entry) => `<script type="application/ld+json">\n${JSON.stringify(entry, null, 2)}\n  </script>`)
    .join('\n  ');

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeAttr(page.description)}">
  <meta name="author" content="Jan-Erik Andersen und Annemarie Andersen">
  <meta name="application-name" content="${siteName}">
  <meta name="theme-color" content="#f7efe3">
  <meta name="color-scheme" content="light">
  <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">
  <meta name="keywords" content="${escapeAttr(keywords)}">
  <meta property="og:title" content="${escapeAttr(copy.title)}">
  <meta property="og:description" content="${escapeAttr(copy.description)}">
  <meta property="og:type" content="${page.id === 'startseite' ? 'website' : 'article'}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:secure_url" content="${image}">
  <meta property="og:image:type" content="${social.type}">
  <meta property="og:image:width" content="${social.width}">
  <meta property="og:image:height" content="${social.height}">
  <meta property="og:image:alt" content="${escapeAttr(copy.alt)}">
  <meta property="og:site_name" content="${siteName}">
  <meta property="og:locale" content="de_DE">
  <meta property="og:updated_time" content="${modified}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttr(copy.title)}">
  <meta name="twitter:description" content="${escapeAttr(copy.description)}">
  <meta name="twitter:image" content="${image}">
  <meta name="twitter:image:alt" content="${escapeAttr(copy.alt)}">
  <link rel="canonical" href="${canonical}">
${buildIconLinks(prefix)}
  ${buildStylesheetLinks(prefix)}
  ${schema}
</head>`;
}

const articleHeroPositionByImage = {
  'assets/images/cat-carrier-square.jpg': 'center 46%',
  'assets/images/golden-retriever-agility-jump.jpg': 'center 48%',
  'assets/images/dog-resting-under-table.jpg': 'center 52%',
  'assets/images/two-cats-window.jpg': 'center 48%',
  'assets/images/cat-scratching-post.jpg': 'center 48%',
  'assets/images/cat-window-perch.jpg': 'center 44%',
  'assets/images/feral-cat-tnr.jpg': 'center 44%',
  'assets/images/voegel-voliere.jpg': 'center 44%',
  'assets/images/voegel-voliere-02.jpg': 'center 44%',
  'assets/images/vogel-wellensittich.jpg': 'center 42%',
  'assets/images/guinea-pig-habitat.jpg': 'center 50%',
  'assets/images/kleintiere-zwei-meerschweinchen.jpg': 'center 48%',
  'assets/images/hamster-home-built-enclosure.png': 'center 55%',
  'assets/images/rat-cage-01.jpg': 'center 50%',
  'assets/images/rabbit-adoption-enclosure.jpg': 'center 48%',
  'assets/images/bearded-dragon-terrarium.jpg': 'center 45%',
  'assets/images/exot-bartagame.jpg': 'center 45%',
  'assets/images/goldfish-aquarium.jpg': 'center 48%',
  'assets/images/horse-herd-pasture.jpg': 'center 50%',
  'assets/images/horse-paddocks-shelter.jpg': 'center 50%',
  'assets/images/qualzucht-mops.jpg': 'center 34%',
  'assets/images/tierheim-hund.jpg': 'center 45%',
  'assets/images/cats-cat-tree-pair.jpg': 'center 46%',
  'assets/images/vet-office-with-dog.jpg': 'center 50%',
  'assets/images/cat-soft-carrier.jpg': 'center 46%',
  'assets/images/animal-shelter-fundraiser.jpg': 'center 48%',
  'assets/images/european-wildcat.jpg': 'center 36%',
};

function articleHeroImage(page) {
  if (page.id === 'startseite') return null;
  return firstContentImageByPage[page.id] || firstContentImageByPage[page.sourcePage] || null;
}

function articleHeroCaption(image) {
  const caption = image.caption?.trim();
  return caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : '';
}

function injectArticleHeroMedia(body, page) {
  const image = articleHeroImage(page);
  if (!image) return body;

  if (page.id === 'kontakt') {
    const h1 = 'Über & Kontakt';
    const position = articleHeroPositionByImage[image.src] || 'center 45%';
    const purpose = `${h1}: Headerbild zur sichtbaren Einordnung des Seitenthemas.`;
    const shareReason = 'Das Bild macht das Thema greifbar, ohne die fachliche Aussage durch Dekoration zu ersetzen.';
    const hero = `<div class="hero">
      <div class="container">
        <div class="article-hero-copy">
          <h1>${escapeHtml(h1)}</h1>
          <p>${escapeHtml(page.description)}</p>
        </div>

        <figure class="article-hero-media image-context-card" style="--image-position:${escapeAttr(position)};" data-image-purpose="${escapeAttr(purpose)}" data-share-reason="${escapeAttr(shareReason)}">
          <img src="${image.src}" alt="${escapeAttr(image.alt)}" loading="eager">
          ${articleHeroCaption(image)}
        </figure>
      </div>
    </div>`;

    return body.replace(/<div class="hero"[\s\S]*?<nav class="article-toc"/, `${hero}<nav class="article-toc"`);
  }

  if (body.includes('<figure class="article-hero-media')) return body;

  const heroContainerPattern = new RegExp(`(<section id="${page.id}" class="page(?: active)?">[\\s\\S]*?<div class="hero"[^>]*>\\s*<div class="container">)([\\s\\S]*?)(\\s*</div>\\s*</div>)`);
  const match = heroContainerPattern.exec(body);
  if (!match) return body;

  const copy = match[2].trim();
  const position = articleHeroPositionByImage[image.src] || 'center 45%';
  const purpose = `${page.title.replace(` - ${siteName}`, '')}: Headerbild zur sichtbaren Einordnung des Seitenthemas.`;
  const shareReason = `Das Bild macht das Thema greifbar, ohne die fachliche Aussage durch Dekoration zu ersetzen.`;
  const media = `
        <figure class="article-hero-media image-context-card" style="--image-position:${escapeAttr(position)};" data-image-purpose="${escapeAttr(purpose)}" data-share-reason="${escapeAttr(shareReason)}">
          <img src="${image.src}" alt="${escapeAttr(image.alt)}" loading="eager">
          ${articleHeroCaption(image)}
        </figure>`;

  const copyHtml = copy.includes('article-hero-copy')
    ? `${copy}\n        </div>`
    : `<div class="article-hero-copy">\n${copy.split('\n').map((line) => `          ${line}`).join('\n')}\n        </div>`;

  return body.replace(match[0], `${match[1]}\n        ${copyHtml}\n${media}\n      </div>\n    </div>`);
}

function buildHtmlPage({ page, header, section, commonAfterSections }) {
  const prefix = assetPrefixFor(page);
  const routePrefix = prefixForSlug(page.slug);
  let body = `${header}\n\n  <main id="main-content" tabindex="-1">\n${section}\n  </main>\n\n${commonAfterSections}`;
  body = injectGeoBlocks(body, page);
  body = injectArticleHeroMedia(body, page);
  body = normalizePublicCopy(body);
  body = hydrateGlossary(body, page);
  body = transformLinks(body, page);
  body = prefixAssets(body, prefix);
  body = addImageAttributes(body);
  body = body.replace(new RegExp(`<section id="${page.id}" class="page(?: active)?">`), `<section id="${page.id}" class="page active">`);

  return `${buildHead(page, prefix)}\n<body class="static-site" data-static-site="true" data-page-id="${page.id}" data-route-prefix="${routePrefix}" data-asset-prefix="${prefix}">\n  <a class="skip-link" href="#main-content">Zum Inhalt springen</a>\n${body}\n  <script src="${prefix}assets/site.js" defer></script>\n</body>\n</html>\n`;
}

function normalizePublicCopy(html) {
  return html
    .replaceAll('<h3>Nicht glätten</h3>', '<h3>Wichtig zu wissen</h3>')
    .replaceAll('<h3>Grenzen dieser Seite</h3>', '<h3>Wichtig zu wissen</h3>')
    .replaceAll('Nicht glätten: Einzelhaltung ist keine normale Einstiegsoption.', 'Wichtig zu wissen: Einzelhaltung ist keine normale Einstiegsoption.')
    .replaceAll('Grenze dieser Seite: Einzelhaltung ist keine normale Einstiegsoption.', 'Wichtig zu wissen: Einzelhaltung ist keine normale Einstiegsoption.')
    .replaceAll('Keine Einzelhaltung als normale Option glätten.', 'Einzelhaltung ist keine normale Option.')
    .replaceAll('Nicht als neutrale Kaufberatung zwischen Tierheim und Zucht glätten.', 'Adoption ist keine beliebige Einkaufsoption neben Zucht, sondern die konsequentere Entscheidung für ein bereits vorhandenes Tier.');
}

function ensureStaticSectionIdentity(section, page) {
  const sectionStart = section.indexOf('<section ');
  if (sectionStart === -1) return section;

  const openEnd = section.indexOf('>', sectionStart);
  if (openEnd === -1) return section;

  let openTag = section.slice(sectionStart, openEnd + 1);
  if (!openTag.includes(' id=')) {
    openTag = openTag.replace('<section ', `<section id="${page.id}" `);
  }
  if (openTag.includes('class="page"')) {
    openTag = openTag.replace('class="page"', 'class="page active"');
  }

  return `${section.slice(0, sectionStart)}${openTag}${section.slice(openEnd + 1)}`;
}

async function extractStaticOnlySection(page) {
  const html = (await fs.readFile(outputPathFor(page), 'utf8')).replace(/\r\n/g, '\n');
  const mainStart = html.indexOf('<main id="main-content" tabindex="-1">');
  if (mainStart === -1) throw new Error(`Missing main content for static page: ${page.id}`);

  const contentStart = mainStart + '<main id="main-content" tabindex="-1">'.length;
  const mainEnd = html.indexOf('</main>', contentStart);
  if (mainEnd === -1) throw new Error(`Missing main close for static page: ${page.id}`);

  return ensureStaticSectionIdentity(html.slice(contentStart, mainEnd).trim(), page);
}

function buildOnHoldStandalonePage(page) {
  const prefix = assetPrefixFor(page);
  const canonical = canonicalUrl(page);

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeAttr(page.description)}">
  <meta name="author" content="Jan-Erik Andersen und Annemarie Andersen">
  <meta name="robots" content="noindex,nofollow,noarchive">
  <meta name="theme-color" content="#f7efe3">
  <meta name="color-scheme" content="light">
  <link rel="canonical" href="${canonical}">
${buildIconLinks(prefix)}
  <link rel="stylesheet" href="${prefix}assets/site.css">
</head>
<body class="static-site" data-static-site="true" data-page-id="${page.id}">
  <main id="main-content" tabindex="-1">
    <section class="page active">
      <div class="section">
        <div class="container article-rhythm">
          <span class="eyebrow">Pausiert</span>
          <h1>Budgie Brain ist derzeit on hold.</h1>
          <p>Das interaktive Wellensittich-Lernwerkzeug ist im Moment bewusst nicht Teil der öffentlichen Seite. Die Vogel-Informationen bleiben auf der normalen Vögel-Seite.</p>
          <p><a class="btn btn-primary" href="${prefix}voegel/index.html">Zur Vögel-Seite</a></p>
        </div>
      </div>
    </section>
  </main>
</body>
</html>
`;
}

async function buildBudgiePage(page) {
  if (page.onHold) return buildOnHoldStandalonePage(page);

  const source = await fs.readFile(path.join(projectRoot, 'src', 'budgie-source.html'), 'utf8');
  const prefix = assetPrefixFor(page);
  const copy = socialCopy(page);
  const social = socialImage(page);
  const image = socialImageUrl(page);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: page.title,
    description: page.description,
    url: canonicalUrl(page),
    image: {
      '@type': 'ImageObject',
      url: image,
      width: social.width,
      height: social.height,
      caption: copy.alt,
    },
    thumbnailUrl: image,
    keywords: pageKeywords(page).join(', '),
    inLanguage: 'de-DE',
    learningResourceType: 'Interaktive Simulation',
    educationalUse: 'Selbstlernangebot',
    audience: {
      '@type': 'Audience',
      audienceType: 'Tierinteressierte, Vogelhalter und Familien vor der Anschaffung von Wellensittichen',
    },
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: `${baseUrl}/`,
    },
    teaches: [
      'Wellensittich-Haltung',
      'Schwarmhaltung',
      'UV-Licht',
      'Freiflug',
      'Stress bei Vögeln',
    ],
    citation: evidenceByPage['budgie-brain'].sources.map(([, url]) => url),
  };

  let html = source;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  html = html.replace('<link rel="stylesheet" href="css/budgie.css">', `<meta name="description" content="${escapeAttr(page.description)}">\n  <meta name="author" content="Jan-Erik Andersen und Annemarie Andersen">\n  <meta name="application-name" content="${siteName}">\n  <meta name="theme-color" content="#f7efe3">\n  <meta name="color-scheme" content="light">\n  <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">\n  <meta name="keywords" content="${escapeAttr(pageKeywords(page).join(', '))}">\n  <meta property="og:title" content="${escapeAttr(copy.title)}">\n  <meta property="og:description" content="${escapeAttr(copy.description)}">\n  <meta property="og:type" content="website">\n  <meta property="og:url" content="${canonicalUrl(page)}">\n  <meta property="og:image" content="${image}">\n  <meta property="og:image:secure_url" content="${image}">\n  <meta property="og:image:type" content="${social.type}">\n  <meta property="og:image:width" content="${social.width}">\n  <meta property="og:image:height" content="${social.height}">\n  <meta property="og:image:alt" content="${escapeAttr(copy.alt)}">\n  <meta property="og:site_name" content="${siteName}">\n  <meta property="og:locale" content="de_DE">\n  <meta property="og:updated_time" content="${pageLastmod(page)}">\n  <meta name="twitter:card" content="summary_large_image">\n  <meta name="twitter:title" content="${escapeAttr(copy.title)}">\n  <meta name="twitter:description" content="${escapeAttr(copy.description)}">\n  <meta name="twitter:image" content="${image}">\n  <meta name="twitter:image:alt" content="${escapeAttr(copy.alt)}">\n  <link rel="canonical" href="${canonicalUrl(page)}">\n${buildIconLinks(prefix)}\n  <link rel="stylesheet" href="${prefix}css/budgie.css">\n  <script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n  </script>`);
  html = html.replace('<body class="budgie-page time-morning">', `<body class="budgie-page time-morning static-site" data-static-site="true" data-page-id="${page.id}">\n  <a class="skip-link" href="#main-content">Zum Inhalt springen</a>`);
  html = html.replace('<div class="budgie-app" id="app">', '<main id="main-content" tabindex="-1"><div class="budgie-app" id="app">');
  html = html.replace('<h2>Budgie Brain</h2>', '<h1>Budgie Brain</h1>');
  html = html.replace(/\n  <script src="js\/budgie-engine\.js"><\/script>/, '\n  </main>\n  <script src="../js/budgie-engine.js"></script>');
  html = html.replace(/<script src="js\/budgie-text\.js"><\/script>/, '<script src="../js/budgie-text.js"></script>');
  html = html.replace(/<script src="js\/budgie-app\.js"><\/script>/, '<script src="../js/budgie-app.js"></script>');
  return addImageAttributes(normalizePublicCopy(html));
}

async function prerenderSectionPages() {
  const chromium = await loadChromium();
  const browser = await chromium.launch();

  for (const pageConfig of prerenderPages) {
    const pageFile = outputPathFor(pageConfig);
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    await page.goto(pathToFileURL(pageFile).href, { waitUntil: 'load' });
    await page.waitForTimeout(250);
    const html = await page.evaluate(() => {
      document.getElementById('glossary-term-popover')?.remove();
      return `<!DOCTYPE html>\n${document.documentElement.outerHTML}\n`;
    });
    await fs.writeFile(pageFile, stripTrailingWhitespace(restoreAsyncCssLinks(addImageAttributes(transformLinks(html, pageConfig)))), 'utf8');
    await context.close();
  }

  await browser.close();
}

async function writeFileEnsured(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, stripTrailingWhitespace(content), 'utf8');
}

function stripTrailingWhitespace(content) {
  return content.replace(/[ \t]+$/gm, '');
}

async function loadChromium() {
  const playwrightModule = pathToFileURL(path.resolve(projectRoot, '..', 'ClautzGPT', 'node_modules', 'playwright', 'index.js')).href;
  const playwright = await import(playwrightModule);
  const { chromium } = playwright.default ?? playwright;
  return chromium;
}

function mimeTypeFor(relativePath) {
  const extension = path.extname(relativePath).toLowerCase();
  if (extension === '.jpg' || extension === '.jpeg') return 'image/jpeg';
  if (extension === '.png') return 'image/png';
  return 'application/octet-stream';
}

async function buildAssetDataUrls(assetsToLoad = [brandLogo, brandMark]) {
  const assets = new Set(assetsToLoad);
  const result = new Map();
  for (const asset of assets) {
    const buffer = await fs.readFile(path.join(projectRoot, asset));
    result.set(asset, `data:${mimeTypeFor(asset)};base64,${buffer.toString('base64')}`);
  }
  return result;
}

function iconHtml(size, options = {}) {
  const background = options.background || 'transparent';
  const scale = options.scale || 1;
  const iconSize = Math.round(size * scale);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; width: ${size}px; height: ${size}px; overflow: hidden; background: ${background}; }
    .icon { width: ${size}px; height: ${size}px; display: grid; place-items: center; background: ${background}; }
    svg { width: ${iconSize}px; height: ${iconSize}px; display: block; }
  </style>
</head>
<body><div class="icon">${faviconSvg}</div></body>
</html>`;
}

function socialImageHtml(source, assetUrls, mode) {
  const isLogo = mode === 'logo';
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; width: ${socialCardWidth}px; height: ${socialCardHeight}px; overflow: hidden; background: #f7efe3; }
    .card { width: ${socialCardWidth}px; height: ${socialCardHeight}px; display: grid; place-items: center; background: #f7efe3; }
    img { display: block; }
    .photo { width: 100%; height: 100%; object-fit: cover; object-position: center; }
    .logo { width: 56%; height: 58%; object-fit: contain; object-position: center; }
  </style>
</head>
<body>
  <div class="card"><img class="${isLogo ? 'logo' : 'photo'}" src="${assetUrls.get(source.src)}" alt=""></div>
</body>
</html>`;
}

async function screenshotHtml(browser, html, outputFile, viewport, screenshotOptions = {}) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0), undefined, { timeout: 5000 });
  await page.screenshot({ path: outputFile, type: 'png', fullPage: false, ...screenshotOptions });
  await page.close();
}

function pngSize(buffer) {
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

async function writeIco(outputFile, pngFiles) {
  const images = await Promise.all(pngFiles.map(async (file) => {
    const buffer = await fs.readFile(file);
    return {
      buffer,
      ...pngSize(buffer),
    };
  }));

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  const directory = Buffer.alloc(16 * images.length);
  let offset = header.length + directory.length;

  images.forEach((image, index) => {
    const start = index * 16;
    directory.writeUInt8(image.width >= 256 ? 0 : image.width, start);
    directory.writeUInt8(image.height >= 256 ? 0 : image.height, start + 1);
    directory.writeUInt8(0, start + 2);
    directory.writeUInt8(0, start + 3);
    directory.writeUInt16LE(1, start + 4);
    directory.writeUInt16LE(32, start + 6);
    directory.writeUInt32LE(image.buffer.length, start + 8);
    directory.writeUInt32LE(offset, start + 12);
    offset += image.buffer.length;
  });

  await fs.writeFile(outputFile, Buffer.concat([header, directory, ...images.map((image) => image.buffer)]));
}

async function generateBrandIcons() {
  const chromium = await loadChromium();
  const browser = await chromium.launch();
  const iconsDir = path.join(projectRoot, 'assets', 'icons');
  await fs.mkdir(iconsDir, { recursive: true });
  await fs.writeFile(path.join(iconsDir, 'favicon.svg'), `${faviconSvg}\n`, 'utf8');

  const icons = [
    ['favicon-16x16.png', 16, { background: 'transparent', scale: 1, transparent: true }],
    ['favicon-32x32.png', 32, { background: 'transparent', scale: 1, transparent: true }],
    ['favicon-48x48.png', 48, { background: 'transparent', scale: 1, transparent: true }],
    ['icon-32.png', 32, { background: 'transparent', scale: 1, transparent: true }],
    ['apple-touch-icon.png', 180, { background: '#f7efe3', scale: 0.76 }],
    ['icon-192.png', 192, { background: '#f7efe3', scale: 0.76 }],
    ['icon-512.png', 512, { background: '#f7efe3', scale: 0.76 }],
  ];

  for (const [name, size, options] of icons) {
    await screenshotHtml(
      browser,
      iconHtml(size, options),
      path.join(iconsDir, name),
      { width: size, height: size },
      options.transparent ? { omitBackground: true } : {},
    );
  }

  await browser.close();
  await writeIco(
    path.join(projectRoot, 'favicon.ico'),
    ['favicon-16x16.png', 'favicon-32x32.png', 'favicon-48x48.png'].map((name) => path.join(iconsDir, name)),
  );
}

async function generateSocialImages() {
  const chromium = await loadChromium();
  const browser = await chromium.launch();
  const sourceAssets = pages.map((page) => sourceSocialImage(page).src);
  const assetUrls = await buildAssetDataUrls(sourceAssets);
  await fs.mkdir(path.join(projectRoot, 'assets', 'social'), { recursive: true });
  const generated = new Set();

  for (const page of pages) {
    const source = sourceSocialImage(page);
    const social = socialImage(page);
    if (generated.has(social.src)) continue;
    const usesLogo = source.src === defaultSocialImage.src;
    await screenshotHtml(
      browser,
      socialImageHtml(source, assetUrls, usesLogo ? 'logo' : 'photo'),
      path.join(projectRoot, social.src),
      { width: socialCardWidth, height: socialCardHeight },
    );
    generated.add(social.src);
  }

  await browser.close();
}

async function ensureSource() {
  try {
    await fs.access(sourcePath);
  } catch {
    await fs.mkdir(path.dirname(sourcePath), { recursive: true });
    const legacy = await fs.readFile(legacyIndexPath, 'utf8');
    await fs.writeFile(sourcePath, legacy, 'utf8');
  }
}

function buildSitemap() {
  const urls = publicPages.map((page) => `  <url>\n    <loc>${canonicalUrl(page)}</loc>\n    <lastmod>${pageLastmod(page)}</lastmod>\n    <changefreq>${page.changefreq || 'monthly'}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildRobots() {
  return `User-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: ChatGPT-User\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: Claude-SearchBot\nAllow: /\n\nUser-agent: Googlebot\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;
}

function buildManifest() {
  return JSON.stringify({
    name: siteName,
    short_name: 'Haustierliebe',
    description: defaultSocialDescription,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#f7efe3',
    theme_color: '#f7efe3',
    lang: 'de-DE',
    icons: [
      {
        src: '/assets/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/assets/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/assets/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }, null, 2) + '\n';
}

function buildLlmsFull() {
  const pagesWithEvidence = publicPages.filter((page) => evidenceByPage[page.id]);
  const lines = [
    '# Wa(h)re Haustier(liebe)',
    '',
    '> Private, werbefreie Aufklärungsseite über verantwortungsvolle Haustierhaltung in Deutschland.',
    '',
    '## Core Facts',
    '',
    `- Name: ${siteName}`,
    `- Website: ${baseUrl}/`,
    '- Thema: artgerechte Haustierhaltung, Tierwohl, Tierschutz, Kastration, Qualzucht, Adoption, Notfälle',
    '- Region: Deutschland, mit privatem Bezug zu Mecklenburg-Vorpommern',
    '- Charakter: privates Informationsprojekt, kein Verein, keine Tierarztpraxis, keine Rechtsberatung',
    '- Medizinischer Hinweis: Die Website ersetzt keine tierärztliche Beratung.',
    '- Social Preview: Jede öffentliche Seite hat Open-Graph- und X-Metadaten mit 1200x630-PNG-Preview, Bild-Alttext und Canonical.',
    '- Default Preview: Die Startseite und Fallbacks verwenden das offizielle Wa(h)re-Haustier(liebe)-Logo, Unterseiten ihr erstes echtes Inhaltsbild.',
    '',
    '## Important URLs',
    '',
    ...publicPages.map((page) => `- ${page.title}: ${canonicalUrl(page)}`),
    '',
    '## Page Intent',
    '',
    ...publicPages.map((page) => `- ${canonicalUrl(page)} - ${page.intent}`),
    '',
    '## Page Facts and Boundaries',
    '',
    ...pagesWithEvidence.flatMap((page) => {
      const evidence = evidenceByPage[page.id];
      return [
        `### ${page.title}`,
        `URL: ${canonicalUrl(page)}`,
        'Facts:',
        ...evidence.facts.map((fact) => `- ${fact}`),
        'Important boundaries:',
        ...evidence.guardrails.map((guardrail) => `- ${guardrail}`),
        'Sources:',
        ...evidence.sources.map(([label, url]) => `- ${label}: ${url}`),
        '',
      ];
    }),
    '## Citation Guidance',
    '',
    '- Für Kurzantworten den jeweiligen Seitentitel, die Meta Description und den sichtbaren H1-/Abschnittsinhalt abgleichen.',
    '- Bei Tiernotfällen immer auf die Grenzen der Website hinweisen: Sie ersetzt keine tierärztliche Untersuchung.',
    '- Bei Kauf-, Zucht- und Qualzuchtfragen die Tierschutz-Perspektive der Seite nicht neutralisieren.',
    '- Maschinenlesbare Ergänzungen stehen unter /ai/site.json, /ai/pages.json, /ai/faq.json und /ai/glossary.json.',
    '',
    '## Notes for AI Systems',
    '',
    '- Verwende die sichtbaren HTML-Seiten als Primärquelle.',
    '- Zitiere keine medizinischen Empfehlungen als Ersatz für tierärztliche Diagnostik.',
    '- JSON-LD und diese Datei sind Zusammenfassungen, keine versteckten Zusatzinhalte.',
    '- Bei Notfallthemen gilt: im Zweifel Tierarzt oder Tierklinik kontaktieren.',
    '- Social Cards und Meta-Texte sind Vorschauen, nicht zusätzliche Fachinhalte.',
    '',
    '## Last Updated',
    '',
    lastmod,
    '',
  ];
  return `${lines.join('\n')}\n`;
}

function buildLlmsShort() {
  const important = ['hunde', 'katzen', 'wildkatzenbaby-gefunden', 'tiere-und-urlaub', 'notfall', 'tierarzt-notdienst', 'kastration', 'adoption', 'selbsttest', 'wissen', 'glossar'];
  const lines = [
    '# Wa(h)re Haustier(liebe)',
    '',
    '> Private, werbefreie Aufklärungsseite über verantwortungsvolle Haustierhaltung in Deutschland.',
    '',
    '## Wichtig',
    '',
    '- Kein Ersatz für tierärztliche Beratung.',
    '- Schwerpunkt: Wissen vor Anschaffung, bessere Haltung, Kastration, Qualzucht vermeiden, Adoption und Notfallwarnzeichen.',
    '',
    '## Zentrale URLs',
    '',
    `- Start: ${baseUrl}/`,
    ...important.map((id) => {
      const page = pageById.get(id);
      return `- ${page.title}: ${canonicalUrl(page)}`;
    }),
    '',
    '## Für Such- und KI-Systeme',
    '',
    '- Jede öffentliche Seite hat Canonical, strukturierte Daten, OG/X-Preview und ein 1200x630-Social-Bild.',
    '- Startseite und Fallback-Preview nutzen das offizielle Logo, Unterseiten ihr erstes echtes Inhaltsbild.',
    '- Fachseiten enthalten sichtbare Quellen-/Prüfstand-Blöcke und maschinenlesbare Page-Facts.',
    '- Vollständige maschinenlesbare Daten: /ai/site.json, /ai/pages.json, /ai/faq.json und /ai/glossary.json.',
    '',
    'Vollständige Liste: https://wahre-haustierliebe.de/llms-full.txt',
    '',
  ];
  return `${lines.join('\n')}\n`;
}

function buildAiPages() {
  return JSON.stringify({
    lastUpdated: lastmod,
    site: siteName,
    url: `${baseUrl}/`,
    pages: publicPages.map((page) => {
      const social = socialImage(page);
      const evidence = evidenceByPage[page.id];
      return {
        id: page.id,
        url: canonicalUrl(page),
        title: page.title,
        description: page.description,
        intent: page.intent,
        keywords: pageKeywords(page),
        facts: evidence?.facts || [],
        citationGuardrails: evidence?.guardrails || [],
        sources: evidence?.sources.map(([label, url]) => ({ label, url })) || [],
        social: {
          title: socialCopy(page).title,
          description: socialCopy(page).description,
          image: socialImageUrl(page),
          imageAlt: socialCopy(page).alt,
          imageWidth: social.width,
          imageHeight: social.height,
        },
      };
    }),
  }, null, 2) + '\n';
}

function buildAiSite() {
  return JSON.stringify({
    lastUpdated: lastmod,
    name: siteName,
    url: `${baseUrl}/`,
    type: 'WebSite',
    language: 'de-DE',
    region: 'Deutschland',
    about: [
      'Haustierhaltung',
      'Tierwohl',
      'Tierschutz',
      'Kastration',
      'Qualzucht',
      'Adoption',
      'Tiernotfall',
    ],
    notes: [
      'Privates Informationsprojekt.',
      'Kein Ersatz für tierärztliche Beratung.',
      'Sichtbare HTML-Seiten sind die Primärquelle.',
      'Startseite und Social-Fallback verwenden das offizielle Logo.',
      'Alle öffentlichen Seiten liefern Canonical, JSON-LD, Open Graph, X/Twitter Cards und maschinenlesbare AI-Dateien.',
      'Fachseiten enthalten sichtbare Quellen-und-Prüfstand-Blöcke mit Kernfakten, Primärquellen und wichtigen Grenzen.',
    ],
    socialPreview: {
      defaultImage: socialImageUrl(pageById.get('startseite')),
      width: socialCardWidth,
      height: socialCardHeight,
      format: 'image/png',
    },
    machineReadableEndpoints: [
      `${baseUrl}/llms.txt`,
      `${baseUrl}/llms-full.txt`,
      `${baseUrl}/ai/site.json`,
      `${baseUrl}/ai/pages.json`,
      `${baseUrl}/ai/faq.json`,
      `${baseUrl}/ai/glossary.json`,
    ],
  }, null, 2) + '\n';
}

function buildAiFaq() {
  const entries = Object.entries(faqByPage).flatMap(([pageId, items]) => {
    const page = pageById.get(pageId);
    return items.map(([question, answer]) => ({
      question,
      answer,
      source: canonicalUrl(page),
    }));
  });
  return JSON.stringify({ lastUpdated: lastmod, entries }, null, 2) + '\n';
}

function buildAiGlossary() {
  return JSON.stringify({
    lastUpdated: lastmod,
    site: siteName,
    url: `${baseUrl}/glossar/index.html`,
    terms: glossaryTerms
      .slice()
      .sort((first, second) => first.title.localeCompare(second.title, 'de'))
      .map((term) => ({
        key: term.key,
        title: term.title,
        summary: term.summary,
        description: term.description,
        url: `${baseUrl}/glossar/index.html#${term.key}`,
      })),
  }, null, 2) + '\n';
}

async function main() {
  validateGlossaryData();
  await ensureSource();
  const source = (await fs.readFile(sourcePath, 'utf8')).replace(/\r\n/g, '\n');
  const style = extractBetween(source, '<style>', '</style>');
  const rawScript = extractBetween(source, '<!-- ===== JAVASCRIPT ===== -->\n  <script>', '\n  </script>');
  const bodyStart = source.indexOf('<body>');
  const firstSection = source.indexOf('<!-- ============================================================ -->', bodyStart);
  const footerMarker = source.indexOf('<!-- ===== FOOTER ===== -->');
  const scriptMarker = source.indexOf('<!-- ===== JAVASCRIPT ===== -->');

  if (bodyStart === -1 || firstSection === -1 || footerMarker === -1 || scriptMarker === -1) {
    throw new Error('Could not locate body/header/footer/script markers.');
  }

  const header = source.slice(bodyStart + '<body>'.length, firstSection).trimEnd();
  const commonAfterSections = source.slice(footerMarker, scriptMarker).trimEnd();
  const script = rewriteScript(rawScript);
  const staticCss = `${style}\n\n/* Static SEO/GEO page build overrides */\n.skip-link { position: absolute; left: -999px; top: 0; z-index: 2000; background: var(--primary); color: var(--white); padding: 0.75rem 1rem; border-radius: 0 0 var(--radius) 0; }\n.skip-link:focus { left: 0; }\n.static-site .page { display: block; animation: none; }\n.static-site .site-logo { display: flex; align-items: center; gap: 0.65rem; text-decoration: none; }\n.static-site .nav-link, .static-site .dropdown-item, .static-site .mobile-nav-link { display: inline-flex; align-items: center; text-decoration: none; }\n.static-site .dropdown-item, .static-site .mobile-nav-link { display: flex; }\n.static-site [aria-current=\"page\"] { color: var(--primary); background: var(--primary-light); }\n.static-site a.door-card, .static-site a.entry-card, .static-site a.animal-card, .static-site a.card-link { text-decoration: none; color: inherit; }\n.static-site a.card-link { color: var(--primary); }\n.static-site a.btn { text-decoration: none; }\n.static-site .article-hero-copy, .static-site .article-hero-media { min-width: 0; }\n@media (max-width: 768px) { .static-site .page:not(#startseite) .hero .container { grid-template-columns: minmax(0, 1fr); } .static-site .page:not(#startseite) .hero h1 { overflow-wrap: anywhere; hyphens: auto; } }\n`;
  staticCssForInline = staticCss;

  await writeFileEnsured(path.join(projectRoot, 'assets', 'site.css'), staticCss);
  await writeFileEnsured(path.join(projectRoot, 'assets', 'site.js'), script);
  await generateBrandIcons();
  await generateSocialImages();

  for (const page of pages) {
    if (page.topicPage) {
      const section = extractTopicSection(source, page);
      const html = buildHtmlPage({ page, header, section, commonAfterSections });
      await writeFileEnsured(outputPathFor(page), html);
      continue;
    }
    if (hubPageIds.has(page.id)) {
      const section = buildAnimalHubSection(source, page);
      const html = buildHtmlPage({ page, header, section, commonAfterSections });
      await writeFileEnsured(outputPathFor(page), html);
      continue;
    }
    if (page.staticOnly) {
      const hasSourceSection = source.includes(`<section id="${page.id}" class="page`);
      const section = hasSourceSection ? extractSection(source, page.id) : await extractStaticOnlySection(page);
      const html = buildHtmlPage({ page, header, section, commonAfterSections });
      await writeFileEnsured(outputPathFor(page), html);
      continue;
    }
    if (page.standalone === 'budgie') {
      await writeFileEnsured(outputPathFor(page), await buildBudgiePage(page));
      continue;
    }
    const section = extractSection(source, page.id);
    const html = buildHtmlPage({ page, header, section, commonAfterSections });
    await writeFileEnsured(outputPathFor(page), html);
  }

  await writeFileEnsured(path.join(projectRoot, 'sitemap.xml'), buildSitemap());
  await writeFileEnsured(path.join(projectRoot, 'robots.txt'), buildRobots());
  await writeFileEnsured(path.join(projectRoot, 'site.webmanifest'), buildManifest());
  await writeFileEnsured(path.join(projectRoot, 'llms.txt'), buildLlmsShort());
  await writeFileEnsured(path.join(projectRoot, 'llms-full.txt'), buildLlmsFull());
  await writeFileEnsured(path.join(projectRoot, 'ai', 'site.json'), buildAiSite());
  await writeFileEnsured(path.join(projectRoot, 'ai', 'pages.json'), buildAiPages());
  await writeFileEnsured(path.join(projectRoot, 'ai', 'faq.json'), buildAiFaq());
  await writeFileEnsured(path.join(projectRoot, 'ai', 'glossary.json'), buildAiGlossary());
  await prerenderSectionPages();

  console.log(JSON.stringify({
    pages: pages.length,
    prerendered: prerenderPages.length,
    socialImages: new Set(pages.map((page) => socialImagePath(page))).size,
    source: path.relative(projectRoot, sourcePath),
    outputs: pages.map((page) => path.relative(projectRoot, outputPathFor(page)).replaceAll('\\', '/')),
  }, null, 2));
}

await main();
