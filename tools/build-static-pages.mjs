import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const sourcePath = path.join(projectRoot, 'src', 'site-source.html');
const legacyIndexPath = path.join(projectRoot, 'index.html');
const baseUrl = 'https://wahre-haustierliebe.de';
const siteName = 'Wa(h)re Haustier(liebe)';
const lastmod = '2026-06-04';

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
    description: 'Über Wa(h)re Haustier(liebe), Hilfe bei Haltungsfragen, persönliche Ansprache und Kontaktformular für Fragen, Anregungen oder Unterstützungsbedarf.',
    intent: 'Kontaktformular und Informationen zum privaten Projekt Wa(h)re Haustierliebe',
    priority: '0.45',
    staticOnly: true,
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
    title: 'Qualzucht erkennen: Wenn Rassemerkmale Tiere leiden lassen',
    description: 'Qualzucht bei Hunden, Katzen, Kaninchen, Vögeln und Exoten erkennen: Atemnot, Schmerzen, Gendefekte und warum Nachfrage Leid finanziert.',
    intent: 'Qualzucht verstehen und beim Tierkauf vermeiden',
    priority: '0.85',
  },
  {
    id: 'adoption',
    slug: 'adoption',
    title: 'Adoption statt Kauf: Warum Tierheimtiere die bessere Wahl sind',
    description: 'Adoption aus dem Tierschutz statt Kauf: Tierheimtiere, Schutzgebühr, Vermittlung, unseriöse Quellen und warum Zucht den Markt weiter füllt.',
    intent: 'Tier aus dem Tierheim adoptieren statt kaufen',
    priority: '0.9',
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
    title: 'Tiermythen, Homöopathie und Glossar: Was stimmt wirklich?',
    description: 'Häufige Tierhaltungsmythen, Homöopathie bei Tieren und wichtige Begriffe rund um artgerechte Haltung, Krankheiten und Tierschutz verständlich erklärt.',
    intent: 'Tierhaltungsmythen und Fachbegriffe prüfen',
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
    title: 'Budgie Brain: Wellensittich-Haltung interaktiv verstehen',
    description: 'Interaktive Simulation für Wellensittich-Haltung: Erlebe, wie Schwarm, UV-Licht, Freiflug, Stress und Alltag einen Vogel beeinflussen.',
    intent: 'Interaktives Lernwerkzeug zur Wellensittich-Haltung',
    priority: '0.65',
    standalone: 'budgie',
  },
];

const pageById = new Map(pages.map((page) => [page.id, page]));
const sectionPages = pages.filter((page) => !page.standalone && !page.staticOnly);
const pageIds = sectionPages.map((page) => page.id);

const faqByPage = {
  hunde: [
    ['Wie lange darf ein Hund allein zu Hause bleiben?', 'Erwachsene Hunde sollten nicht länger als 4–5 Stunden am Stück allein bleiben. Regelmäßige 8 Stunden oder mehr sind aus Tierschutzsicht nicht vertretbar.'],
    ['Was kostet ein Hund im Monat?', 'Für einen mittelgroßen Hund sind laufend etwa 100-200 Euro pro Monat realistisch. Über ein Hundeleben können 12.000-20.000 Euro zusammenkommen.'],
  ],
  katzen: [
    ['Warum sollte ich meine Katze kastrieren lassen?', 'Kastration schützt vor Stress, hormonbedingten Erkrankungen und unkontrollierter Vermehrung. Besonders bei Freigängern ist sie praktischer Tierschutz.'],
  ],
  voegel: [
    ['Kann man Wellensittiche allein halten?', 'Nein. Wellensittiche sind Schwarmvögel und brauchen mindestens einen Artgenossen, ausreichend Flugraum und Beschäftigung.'],
  ],
  kleintiere: [
    ['Wie viel Platz braucht ein Kaninchen?', 'Mindestens 2-3 Quadratmeter pro Kaninchen als dauerhaft zugängliche Grundfläche plus täglichen Auslauf. Handelsübliche Käfige sind fast immer zu klein.'],
  ],
  adoption: [
    ['Sollte ich ein Tier vom Züchter kaufen oder aus dem Tierheim adoptieren?', 'Solange viele Tiere in Tierheimen und auf Pflegestellen warten, ist Adoption die verantwortungsvollere Wahl. Sie gibt einem bestehenden Tier eine Chance und erzeugt keinen weiteren Nachschub.'],
  ],
  wissen: [
    ['Hilft Homöopathie bei Tieren?', 'Für Homöopathie gibt es keinen belastbaren Wirksamkeitsnachweis über den Placebo-Effekt hinaus. Die größte Gefahr ist verlorene Zeit, wenn echte Diagnostik oder Behandlung verzögert wird.'],
  ],
};

const brandLogo = 'assets/images/wahre-haustierliebe-logo.png';
const brandMark = 'assets/images/wahre-haustierliebe-mark.png';
const defaultSocialDescription = 'Ehrliche Aufklärung über Haustierhaltung, Tierwohl, Adoption, Qualzucht und Notfälle - privat, werbefrei und verständlich.';
const socialCardWidth = 1200;
const socialCardHeight = 630;

const defaultSocialImage = {
  src: brandLogo,
  width: 1536,
  height: 1024,
  type: 'image/png',
  alt: 'Offizielles Logo von Wa(h)re Haustier(liebe).',
};

const firstContentImageByPage = {
  mensch: {
    src: 'assets/images/tierheim-hund.jpg',
    width: 960,
    height: 1280,
    type: 'image/jpeg',
    alt: 'Hund im Tierheim als Bild für ehrliche Entscheidung vor dem Kauf.',
  },
  hunde: {
    src: 'assets/images/golden-retriever-agility-jump.jpg',
    width: 2000,
    height: 1339,
    type: 'image/jpeg',
    alt: 'Hund beim Agility-Sprung als Bild für Training, Alltag und Beschäftigung.',
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
  wissen: {
    src: 'assets/images/goldfish-aquarium.jpg',
    width: 1920,
    height: 1309,
    type: 'image/jpeg',
    alt: 'Goldfische im Aquarium als Bild für hartnäckige Haustiermythen.',
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
  'noch-nicht-bereit': {
    src: 'assets/images/cat-soft-carrier.jpg',
    width: 1254,
    height: 1638,
    type: 'image/jpeg',
    alt: 'Katze in einer weichen Transportbox als Bild für Warten und Übergang.',
  },
};

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
    title: 'Qualzucht erkennen, bevor Nachfrage Leid finanziert',
    description: 'Atemnot, Schmerzen, Gendefekte und extreme Körperformen bei Hunden, Katzen, Kaninchen, Vögeln und Exoten.',
  },
  adoption: {
    eyebrow: 'Tierschutz statt Nachfrage',
    title: 'Adoption statt Kauf',
    description: 'Warum Tierheim, Pflegestelle, Schutzgebühr und seriöse Vermittlung oft die verantwortungsvollere Wahl sind.',
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
    description: 'Mythen, Homöopathie, Fachbegriffe und Tierschutzwissen verständlich, kritisch und ohne Werbeinteresse.',
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
  'noch-nicht-bereit': {
    eyebrow: 'Warten kann Tierliebe sein',
    title: 'Noch nicht bereit für ein Tier',
    description: 'Warum kein Tier zu nehmen manchmal die verantwortungsvollste Entscheidung ist und wie Tierschutz trotzdem geht.',
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
  hunde: ['Hund halten', 'Hund anschaffen', 'Hundekosten', 'Alleinbleiben', 'Erziehung'],
  katzen: ['Katze halten', 'Wohnungskatze', 'Freigang', 'Kastration', 'Katzenstress'],
  voegel: ['Vögel halten', 'Wellensittiche', 'Schwarmhaltung', 'Freiflug', 'UV-Licht'],
  kleintiere: ['Kleintiere halten', 'Kaninchen', 'Meerschweinchen', 'Hamster', 'Ratten'],
  exoten: ['Exoten halten', 'Terrarium', 'UV-B', 'Reptilien', 'Meldepflicht'],
  pferde: ['Pferde halten', 'Herde', 'Stallform', 'Hufschmied', 'Pferdekosten'],
  kastration: ['Kastration', 'Kastrationspflicht', 'Tierschutz', 'Katzen', 'Kaninchen'],
  qualzucht: ['Qualzucht', 'Rassemerkmale', 'Atemnot', 'Gendefekte', 'Tierleid'],
  adoption: ['Adoption', 'Tierheim', 'Tierschutz', 'Schutzgebühr', 'Pflegestelle'],
  selbsttest: ['Haustier Selbsttest', 'bereit für ein Tier', 'Zeit', 'Geld', 'Betreuung'],
  notfall: ['Tiernotfall', 'Vergiftung', 'Atemnot', 'Tierarzt', 'Warnsignale'],
  'tierarzt-notdienst': ['Tierarzt Notdienst', 'Notdienst Bundesland', 'Tierärztekammer', 'Notrufnummer'],
  kontakt: ['Kontakt', 'Haltungsfragen', 'Haustierberatung', 'Tierschutz', 'Privates Projekt'],
  wissen: ['Tiermythen', 'Homöopathie bei Tieren', 'Glossar', 'Tierschutzwissen'],
  'hitzefalle-auto': ['Hund im Auto', 'Hitze', 'Hitzschlag', 'Sommer', 'Notfall'],
  'ernaehrung-taurin': ['Tierernährung', 'Taurin', 'Katzenfutter', 'Hundefutter', 'vegane Tierernährung'],
  realhaltung: ['Realhaltung', 'artgerechte Haltung', 'Haustierkosten', 'Haltungsfehler'],
  'zucht-und-vermehrung': ['Zucht', 'Vermehrung', 'Züchter', 'Tierheim', 'Adoption'],
  wildtierhaltung: ['Wildtierhaltung', 'Exoten', 'Gefahrtier', 'Wildschutz', 'Deutschland'],
  'noch-nicht-bereit': ['noch nicht bereit', 'Tierschutz unterstützen', 'Haustier warten'],
  'budgie-brain': ['Budgie Brain', 'Wellensittich Simulation', 'Schwarm', 'Freiflug', 'Stress'],
};

function pagePath(page) {
  return page.slug ? `/${page.slug}/index.html` : '/';
}

function canonicalUrl(page) {
  return `${baseUrl}${pagePath(page)}`;
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
  return page.id === 'startseite' ? defaultSocialImage : firstContentImageByPage[page.id] || defaultSocialImage;
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
  return keywordByPage[page.id] || [page.intent, 'Haustierhaltung', 'Tierwohl'].filter(Boolean);
}

function outputPathFor(page) {
  return page.slug ? path.join(projectRoot, page.slug, 'index.html') : path.join(projectRoot, 'index.html');
}

function prefixForSlug(slug) {
  return slug ? '../'.repeat(slug.split('/').length) : '';
}

function assetPrefixFor(page) {
  return prefixForSlug(page.slug);
}

function hrefFor(targetId, currentPage) {
  const target = pageById.get(targetId);
  if (!target) return '#';
  const prefix = prefixForSlug(currentPage.slug);
  if (!target.slug) return `${prefix}index.html`;
  return `${prefix}${target.slug}/index.html`;
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
  const routeMap = Object.fromEntries(pages.map((page) => [page.id, pagePath(page)]));

  next = `var staticPageRoutes = ${JSON.stringify(routeMap, null, 2)};\n` +
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
    `        window.location.href = staticRouteFor(page);\n` +
    `        return;\n` +
    `      }\n` +
    `      document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });\n` +
    `      document.querySelectorAll('.nav-link[data-page]').forEach(function(l) { l.classList.remove('active'); });\n` +
    `      var target = document.getElementById(page);\n` +
    `      if (target) {\n` +
    `        target.classList.add('active');\n` +
    `        var link = document.querySelector('.nav-link[data-page="' + page + '"]');\n` +
    `        if (link) link.classList.add('active');\n` +
    `      }\n` +
    `      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });\n` +
    `      closeMobileNav();\n` +
    `      closeDropdowns();\n` +
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
    `      hydrateTestProgress();\n` +
    `      normalizeAssetUrls(document);\n` +
    `      if (document.body && document.body.dataset.staticSite === 'true') {\n` +
    `        var pageId = document.body.dataset.pageId || 'startseite';\n` +
    `        var hash = location.hash.slice(1);\n` +
    `        if (hash && staticPageRoutes[hash] && hash !== pageId) {\n` +
    `          window.location.replace(staticRouteFor(hash));\n` +
    `          return;\n` +
    `        }\n` +
    `        document.querySelectorAll('[data-page]').forEach(function(link) {\n` +
    `          var active = link.dataset.page === pageId;\n` +
    `          link.classList.toggle('active', active);\n` +
    `          if (active) link.setAttribute('aria-current', 'page');\n` +
    `          else link.removeAttribute('aria-current');\n` +
    `        });\n` +
    `        document.querySelectorAll('.dropdown').forEach(function(dropdown) {\n` +
    `          var hasActive = dropdown.querySelector('[aria-current=\"page\"]');\n` +
    `          var toggle = dropdown.querySelector('.dropdown-toggle');\n` +
    `          if (toggle && hasActive) toggle.setAttribute('aria-current', 'page');\n` +
    `        });\n` +
    `        initAccessibilityState();\n` +
    `        document.addEventListener('keydown', function(event) {\n` +
    `          if (event.key === 'Escape') {\n` +
    `            closeDropdowns();\n` +
    `            closeMobileNav();\n` +
    `          }\n` +
    `        });\n` +
    `        return;\n` +
    `      }\n` +
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
    dateModified: lastmod,
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
  return blocks;
}

function buildHead(page, prefix) {
  const canonical = canonicalUrl(page);
  const copy = socialCopy(page);
  const social = socialImage(page);
  const image = socialImageUrl(page);
  const keywords = pageKeywords(page).join(', ');
  const schema = buildJsonLd(page)
    .map((entry) => `<script type="application/ld+json">\n${JSON.stringify(entry, null, 2)}\n  </script>`)
    .join('\n  ');

  return `<!DOCTYPE html>\n<html lang="de">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>${escapeHtml(page.title)}</title>\n  <meta name="description" content="${escapeAttr(page.description)}">\n  <meta name="author" content="Jan-Erik Andersen und Annemarie Andersen">\n  <meta name="application-name" content="${siteName}">\n  <meta name="theme-color" content="#f7efe3">\n  <meta name="color-scheme" content="light">\n  <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">\n  <meta name="keywords" content="${escapeAttr(keywords)}">\n  <meta property="og:title" content="${escapeAttr(copy.title)}">\n  <meta property="og:description" content="${escapeAttr(copy.description)}">\n  <meta property="og:type" content="${page.id === 'startseite' ? 'website' : 'article'}">\n  <meta property="og:url" content="${canonical}">\n  <meta property="og:image" content="${image}">\n  <meta property="og:image:secure_url" content="${image}">\n  <meta property="og:image:type" content="${social.type}">\n  <meta property="og:image:width" content="${social.width}">\n  <meta property="og:image:height" content="${social.height}">\n  <meta property="og:image:alt" content="${escapeAttr(copy.alt)}">\n  <meta property="og:site_name" content="${siteName}">\n  <meta property="og:locale" content="de_DE">\n  <meta property="og:updated_time" content="${lastmod}">\n  <meta name="twitter:card" content="summary_large_image">\n  <meta name="twitter:title" content="${escapeAttr(copy.title)}">\n  <meta name="twitter:description" content="${escapeAttr(copy.description)}">\n  <meta name="twitter:image" content="${image}">\n  <meta name="twitter:image:alt" content="${escapeAttr(copy.alt)}">\n  <link rel="canonical" href="${canonical}">\n  <link rel="icon" type="image/png" sizes="32x32" href="${prefix}assets/icons/icon-32.png">\n  <link rel="icon" type="image/png" sizes="192x192" href="${prefix}assets/icons/icon-192.png">\n  <link rel="apple-touch-icon" sizes="180x180" href="${prefix}assets/icons/apple-touch-icon.png">\n  <link rel="manifest" href="${prefix}site.webmanifest">\n  <link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;600;700;800&family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">\n  <link rel="stylesheet" href="${prefix}assets/site.css">\n  ${schema}\n</head>`;
}

function buildHtmlPage({ page, header, section, commonAfterSections }) {
  const prefix = assetPrefixFor(page);
  const routePrefix = prefixForSlug(page.slug);
  let body = `${header}\n\n  <main id="main-content" tabindex="-1">\n${section}\n  </main>\n\n${commonAfterSections}`;
  body = transformLinks(body, page);
  body = prefixAssets(body, prefix);
  body = body.replace(new RegExp(`<section id="${page.id}" class="page(?: active)?">`), `<section id="${page.id}" class="page active">`);

  return `${buildHead(page, prefix)}\n<body class="static-site" data-static-site="true" data-page-id="${page.id}" data-route-prefix="${routePrefix}" data-asset-prefix="${prefix}">\n  <a class="skip-link" href="#main-content">Zum Inhalt springen</a>\n${body}\n  <script src="${prefix}assets/site.js"></script>\n</body>\n</html>\n`;
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

async function buildBudgiePage(page) {
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
  };

  let html = source;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  html = html.replace('<link rel="stylesheet" href="css/budgie.css">', `<meta name="description" content="${escapeAttr(page.description)}">\n  <meta name="author" content="Jan-Erik Andersen und Annemarie Andersen">\n  <meta name="application-name" content="${siteName}">\n  <meta name="theme-color" content="#f7efe3">\n  <meta name="color-scheme" content="light">\n  <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">\n  <meta name="keywords" content="${escapeAttr(pageKeywords(page).join(', '))}">\n  <meta property="og:title" content="${escapeAttr(copy.title)}">\n  <meta property="og:description" content="${escapeAttr(copy.description)}">\n  <meta property="og:type" content="website">\n  <meta property="og:url" content="${canonicalUrl(page)}">\n  <meta property="og:image" content="${image}">\n  <meta property="og:image:secure_url" content="${image}">\n  <meta property="og:image:type" content="${social.type}">\n  <meta property="og:image:width" content="${social.width}">\n  <meta property="og:image:height" content="${social.height}">\n  <meta property="og:image:alt" content="${escapeAttr(copy.alt)}">\n  <meta property="og:site_name" content="${siteName}">\n  <meta property="og:locale" content="de_DE">\n  <meta property="og:updated_time" content="${lastmod}">\n  <meta name="twitter:card" content="summary_large_image">\n  <meta name="twitter:title" content="${escapeAttr(copy.title)}">\n  <meta name="twitter:description" content="${escapeAttr(copy.description)}">\n  <meta name="twitter:image" content="${image}">\n  <meta name="twitter:image:alt" content="${escapeAttr(copy.alt)}">\n  <link rel="canonical" href="${canonicalUrl(page)}">\n  <link rel="icon" type="image/png" sizes="32x32" href="${prefix}assets/icons/icon-32.png">\n  <link rel="icon" type="image/png" sizes="192x192" href="${prefix}assets/icons/icon-192.png">\n  <link rel="apple-touch-icon" sizes="180x180" href="${prefix}assets/icons/apple-touch-icon.png">\n  <link rel="manifest" href="${prefix}site.webmanifest">\n  <link rel="stylesheet" href="${prefix}css/budgie.css">\n  <script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n  </script>`);
  html = html.replace('<body class="budgie-page time-morning">', `<body class="budgie-page time-morning static-site" data-static-site="true" data-page-id="${page.id}">\n  <a class="skip-link" href="#main-content">Zum Inhalt springen</a>`);
  html = html.replace('<div class="budgie-app" id="app">', '<main id="main-content" tabindex="-1"><div class="budgie-app" id="app">');
  html = html.replace('<h2>Budgie Brain</h2>', '<h1>Budgie Brain</h1>');
  html = html.replace(/\n  <script src="js\/budgie-engine\.js"><\/script>/, '\n  </main>\n  <script src="../js/budgie-engine.js"></script>');
  html = html.replace(/<script src="js\/budgie-text\.js"><\/script>/, '<script src="../js/budgie-text.js"></script>');
  html = html.replace(/<script src="js\/budgie-app\.js"><\/script>/, '<script src="../js/budgie-app.js"></script>');
  return html;
}

async function prerenderSectionPages() {
  const chromium = await loadChromium();
  const browser = await chromium.launch();

  for (const pageConfig of sectionPages) {
    const pageFile = outputPathFor(pageConfig);
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    await page.goto(pathToFileURL(pageFile).href, { waitUntil: 'load' });
    await page.waitForTimeout(250);
    const html = await page.evaluate(() => `<!DOCTYPE html>\n${document.documentElement.outerHTML}\n`);
    await fs.writeFile(pageFile, transformLinks(html, pageConfig), 'utf8');
    await context.close();
  }

  await browser.close();
}

async function writeFileEnsured(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, 'utf8');
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

function iconHtml(size, assetUrls) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; width: ${size}px; height: ${size}px; overflow: hidden; background: #f7efe3; }
    .icon { width: ${size}px; height: ${size}px; display: grid; place-items: center; background: #f7efe3; }
    img { width: ${Math.round(size * 0.74)}px; height: ${Math.round(size * 0.74)}px; object-fit: contain; }
  </style>
</head>
<body><div class="icon"><img src="${assetUrls.get(brandMark)}" alt=""></div></body>
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

async function screenshotHtml(browser, html, outputFile, viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0), undefined, { timeout: 5000 });
  await page.screenshot({ path: outputFile, type: 'png', fullPage: false });
  await page.close();
}

async function generateBrandIcons() {
  const chromium = await loadChromium();
  const browser = await chromium.launch();
  const assetUrls = await buildAssetDataUrls();
  await fs.mkdir(path.join(projectRoot, 'assets', 'icons'), { recursive: true });

  for (const [name, size] of [['icon-32.png', 32], ['icon-192.png', 192], ['apple-touch-icon.png', 180]]) {
    await screenshotHtml(
      browser,
      iconHtml(size, assetUrls),
      path.join(projectRoot, 'assets', 'icons', name),
      { width: size, height: size },
    );
  }

  await browser.close();
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
  const urls = pages.map((page) => `  <url>\n    <loc>${canonicalUrl(page)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${page.changefreq || 'monthly'}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`).join('\n');
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
    ...pages.map((page) => `- ${page.title}: ${canonicalUrl(page)}`),
    '',
    '## Page Intent',
    '',
    ...pages.map((page) => `- ${canonicalUrl(page)} - ${page.intent}`),
    '',
    '## Citation Guidance',
    '',
    '- Für Kurzantworten den jeweiligen Seitentitel, die Meta Description und den sichtbaren H1-/Abschnittsinhalt abgleichen.',
    '- Bei Tiernotfällen immer auf die Grenzen der Website hinweisen: Sie ersetzt keine tierärztliche Untersuchung.',
    '- Bei Kauf-, Zucht- und Qualzuchtfragen die Tierschutz-Perspektive der Seite nicht zu einer neutralen Marktübersicht glätten.',
    '- Maschinenlesbare Ergänzungen stehen unter /ai/site.json, /ai/pages.json und /ai/faq.json.',
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
  const important = ['hunde', 'katzen', 'notfall', 'tierarzt-notdienst', 'kastration', 'adoption', 'selbsttest', 'wissen'];
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
    '- Vollständige maschinenlesbare Daten: /ai/site.json, /ai/pages.json und /ai/faq.json.',
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
    pages: pages.map((page) => {
      const social = socialImage(page);
      return {
        id: page.id,
        url: canonicalUrl(page),
        title: page.title,
        description: page.description,
        intent: page.intent,
        keywords: pageKeywords(page),
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

async function main() {
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
  const staticCss = `${style}\n\n/* Static SEO/GEO page build overrides */\n.skip-link { position: absolute; left: -999px; top: 0; z-index: 2000; background: var(--primary); color: var(--white); padding: 0.75rem 1rem; border-radius: 0 0 var(--radius) 0; }\n.skip-link:focus { left: 0; }\n.static-site .page { display: block; animation: none; }\n.static-site .site-logo { display: flex; align-items: center; gap: 0.65rem; text-decoration: none; }\n.static-site .nav-link, .static-site .dropdown-item, .static-site .mobile-nav-link { display: inline-flex; align-items: center; text-decoration: none; }\n.static-site .dropdown-item, .static-site .mobile-nav-link { display: flex; }\n.static-site [aria-current=\"page\"] { color: var(--primary); background: var(--primary-light); }\n.static-site a.door-card, .static-site a.entry-card, .static-site a.animal-card, .static-site a.card-link { text-decoration: none; color: inherit; }\n.static-site a.card-link { color: var(--primary); }\n.static-site a.btn { text-decoration: none; }\n`;

  await writeFileEnsured(path.join(projectRoot, 'assets', 'site.css'), staticCss);
  await writeFileEnsured(path.join(projectRoot, 'assets', 'site.js'), script);
  await generateBrandIcons();
  await generateSocialImages();

  for (const page of pages) {
    if (page.staticOnly) {
      const section = await extractStaticOnlySection(page);
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
  await prerenderSectionPages();

  console.log(JSON.stringify({
    pages: pages.length,
    prerendered: sectionPages.length,
    socialImages: new Set(pages.map((page) => socialImagePath(page))).size,
    source: path.relative(projectRoot, sourcePath),
    outputs: pages.map((page) => path.relative(projectRoot, outputPathFor(page)).replaceAll('\\', '/')),
  }, null, 2));
}

await main();
