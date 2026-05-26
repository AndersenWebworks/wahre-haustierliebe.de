# Worker Issue 010: Mobile Deep Audit – Ergebnisse

## Ziel

Prüfe die aktuelle Seite auf Mobile so streng, als würde Annemarie sie auf einem kleinen Handy durchlesen. Fokus: Lesbarkeit, Enge, Reihenfolge, Tap-Ziele, Tabellen, Akkordeons, Selbsttest, Kartenraster, Header und Share-Bereiche.

## URL

`https://andersenwebworks.tailcb6eb8.ts.net:3100/wahre-haustierliebe-current/index.html`

## Viewports

- 390 × 900 (iPhone 14/15 Standardgröße)
- 360 × 800 (Android-Standard, z. B. Samsung Galaxy S21)

## Testumgebung

- Playwright 1.59.1 / Chromium
- Datum: 2026-05-26
- Alle 15 Hash-Seiten einzeln geprüft, 30 Full-Page-Screenshots

---

## Gesamtbewertung

**Die Seite ist auf Mobile überraschend solide gebaut.** Kein einziger kritischer Layout-Bug gefunden. Alle Inhalte sind lesbar, kein horizontaler Overflow, keine abgeschnittenen Texte, keine gequetschten Cards. Die responsive Architektur (Grids → Single-Column, Tabellen → Karten-Layout, Hamburger-Nav) funktioniert sauber.

Die gefundenen Punkte sind ausschließlich **Designschwächen** und **Accessibility-Verbesserungen** – keine Showstopper.

---

## A. Funktionale Tests – Ergebnisse

### A1. Mobile-Navigation (Hamburger)
- **Status: OK**
- Hamburger-Button sichtbar bei ≤768px
- Mobile-Nav öffnet als Fullscreen-Overlay (fixed, top: 64px)
- 15 Nav-Links vorhanden, Sub-Items eingerückt (Tierarten)
- Schließt bei Link-Klick automatisch
- Screenshot: `screenshots/mobile-audit-010/nav_open_390.png`

### A2. Tabellen (Cost-Tables)
- **Status: OK**
- Betrifft: Hunde, Katzen, Kastration, Adoption
- Breakpoint `@media (max-width: 640px)`: Tabelle wechselt zu gestacktem Karten-Layout
- Bei 390px UND 360px: Karten-Layout aktiv, alle Werte vollständig sichtbar
- `data-label`-Attribute auf `<td>` erzeugen korrekte Zeilenbeschriftung (POSTEN, EINMALIG, JÄHRLICH)
- Screenshots: `table_hunde_390_fresh.png`, `table_360_hunde.png`, `table_360_kastration.png`

### A3. Selbsttest
- **Status: OK**
- 15 Fragen mit je 3 Optionen, alle sichtbar und bedienbar
- Option-Buttons: 308×73px (teils 99px bei Textumbruch) – gut dimensioniert
- "Auswertung anzeigen"-Button erscheint nach Beantwortung aller Fragen
- Ergebnis-Anzeige: Punktzahl, Prozent, Empfehlungstext mit internen Links
- Kompletter Durchlauf erfolgreich auf 360×800
- Screenshots: `selbsttest_initial_390.png`, `selbsttest_result_360.png`

### A4. Akkordeons
- **Status: OK**
- Wissen-Seite: 12 Akkordeons, alle öffnen/schließen korrekt
- Mensch-Seite: 5 Akkordeons
- Kein Textüberlauf in geöffneten Akkordeon-Bodys
- Accordion-Header: 319×74–116px (weit über 44px Minimum)
- Screenshots: `wissen_accordions_open_390.png`, `wissen_acc_detail_390.png`, `mensch_accordions_open_390.png`

### A5. Horizontaler Overflow
- **Status: OK – kein Overflow auf keiner Seite**
- Alle 15 Seiten bei 390px mit strikter Sichtbarkeitsprüfung getestet
- Body hat `overflow-x: hidden` als Sicherheitsnetz
- Grids (door-cards, animal-cards, entry-cards) korrekt auf `grid-template-columns: 1fr` bei ≤980px

### A6. Cards und Raster
- **Status: OK**
- Door-Cards: 358×218–239px (Full-Width, Single-Column)
- Animal-Cards: 358×342px (Full-Width, Bilder + Text)
- Kein Quetschen, keine Layout-Brüche

### A7. Scroll-to-Top-Button
- **Status: OK**
- 44×44px (exakt WCAG-konform)
- Position: fixed, bottom-right, z-index 900
- Überlappt keine interaktiven Elemente

---

## B. Designschwächen (kein technischer Bruch, aber verbesserungswürdig)

### B1. Share-Buttons unter 44px Tap-Target [Niedrig]
- **Seiten:** Alle Seiten mit Share-Bereich (Startseite, Katzen, Kastration, Adoption, Notfall, Wissen, Noch-nicht-bereit)
- **Effekt:** WhatsApp/Facebook/E-Mail/Link-kopieren-Buttons sind 37px hoch, WCAG empfiehlt min. 44px
- **Ursache:** `.share-btn` hat `padding: 0.5rem 1rem` (8px vertikal), aber kein `min-height`
- **Akzeptanzkriterium:** `min-height: 2.75rem` (44px) auf `.share-btn`
- **Screenshot:** `screenshots/mobile-audit-010/390x900_katzen.png` (Footer-Bereich)

### B2. CTA-Textgröße 13.6px in Share-Bereichen [Niedrig]
- **Seiten:** Mensch, Katzen, Kastration, Adoption, Notfall, Wissen, Noch-nicht-bereit
- **Effekt:** Der Einleitungstext über den Share-Buttons ("Kennst du jemanden…", "Hilf mit…") hat 13.6px – unter dem 16px-Minimum für komfortable Mobile-Lesbarkeit
- **Ursache:** Wahrscheinlich `.share-label` oder `.text-muted` mit kleiner Font-Size
- **Akzeptanzkriterium:** Mindestens `font-size: 0.875rem` (14px) für Begleittext, besser `1rem`

### B3. Inline-Links als Tap-Targets nur 21px hoch [Info]
- **Seiten:** Alle Seiten mit Fließtext-Links
- **Effekt:** Links wie "Kastration", "Notfall-Seite", "Deutschen Tierschutzbundes" sind nur 21px hoch (halbe WCAG-Empfehlung). Breite ist okay (40–275px).
- **Einschätzung:** Standard-Web-Pattern, kein individueller Fix nötig. Könnte global durch `line-height`-Erhöhung im Fließtext oder `padding-block: 0.2rem` auf Inline-Links verbessert werden.
- **Akzeptanzkriterium:** Kein harter Fehler; globale Verbesserung optional

### B4. Footer-Attributions-Links sehr klein [Info]
- **Seite:** Footer (alle Seiten)
- **Effekt:** Wikimedia-Bildnachweise (hinter "Bildnachweise anzeigen") haben Links bei 16px Höhe. Kaum fingertauglich.
- **Einschätzung:** Versteckter Bereich, kein Alltagsproblem. Akzeptabel, da rein juristisch/attributiv.

### B5. Selbsttest zeigt alle 15 Fragen gleichzeitig [Design-Entscheidung]
- **Seite:** Selbsttest
- **Effekt:** Auf Mobile ~17.000px Seitenlänge. Kein progressives Aufdecken (Step-by-Step-Wizard). Funktional korrekt, aber das Scrollen durch 15 Fragen fühlt sich auf einem kleinen Handy "endlos" an.
- **Einschätzung:** Bewusste Design-Entscheidung. Ein Stepper-UI wäre aufwendig und ist kein Bug. Könnte als eigenes Enhancement-Issue geführt werden.

---

## C. CSS-/Layout-Akzeptanzkriterien

| # | Kriterium | Aktuell | Soll |
|---|-----------|---------|------|
| C1 | Kein horizontaler Scroll auf allen Seiten bei 360–430px | ✅ Erfüllt | Beibehalten |
| C2 | Tabellen im Karten-Layout ≤640px | ✅ Erfüllt | Beibehalten |
| C3 | Share-Buttons min. 44px Höhe | ❌ 37px | `min-height: 2.75rem` auf `.share-btn` |
| C4 | Alle CTA-Buttons min. 44px Höhe | ✅ `.btn` hat `min-height: 2.75rem` | Beibehalten |
| C5 | Accordion-Header min. 44px | ✅ 74–116px | Beibehalten |
| C6 | Selbsttest-Optionen min. 44px | ✅ 73–99px | Beibehalten |
| C7 | Kein Textüberlauf/-abschnitt | ✅ Erfüllt | Beibehalten |
| C8 | Single-Column-Layout ≤980px | ✅ Erfüllt | Beibehalten |
| C9 | Mobile-Nav schließt bei Link-Klick | ✅ Erfüllt | Beibehalten |
| C10 | Body-Text min. 14px | ⚠️ CTA-Text 13.6px | `font-size: 0.875rem` min. in Share-Bereichen |

---

## D. Follow-up-Issues

### Issue 011: Share-Button Tap-Target erhöhen (Low Priority)
- `.share-btn { min-height: 2.75rem; }` hinzufügen
- Ggf. Padding auf `0.65rem 1rem` erhöhen
- Betrifft: Alle Seiten mit Share-Bereichen
- Aufwand: 1 CSS-Zeile

### Issue 012: Selbsttest-Stepper-UI (Enhancement, Optional)
- 15 Fragen in Steps aufteilen (3–5 Fragen pro Step)
- Fortschrittsbalken anzeigen
- Aufwand: Mittel (JS + CSS + HTML-Restructuring)
- Nur sinnvoll, wenn UX-Feedback zeigt, dass Nutzer abspringen

---

## E. Screenshot-Index

Alle unter `screenshots/mobile-audit-010/`:

| Datei | Inhalt |
|-------|--------|
| `390x900_*.png` (15 Dateien) | Full-Page-Screenshots aller Seiten, 390×900 |
| `360x800_*.png` (15 Dateien) | Full-Page-Screenshots aller Seiten, 360×800 |
| `nav_open_390.png` | Mobile-Navigation geöffnet |
| `nav_closed_after_click_390.png` | Nav nach Link-Klick geschlossen |
| `table_hunde_390_fresh.png` | Hunde-Kostentabelle (Karten-Layout, 390px) |
| `table_360_hunde.png` | Hunde-Kostentabelle (Karten-Layout, 360px) |
| `table_360_kastration.png` | Kastrations-Kostentabelle (360px) |
| `wissen_accordions_open_390.png` | Alle 12 Wissen-Akkordeons geöffnet |
| `wissen_acc_detail_390.png` | Akkordeon-Detail (erste 3 offen) |
| `mensch_accordions_open_390.png` | Alle 5 Mensch-Akkordeons geöffnet |
| `selbsttest_initial_390.png` | Selbsttest Startansicht |
| `selbsttest_q1_answered_390.png` | Erste Frage beantwortet |
| `selbsttest_all_answered_360.png` | Alle 15 Fragen beantwortet (360px) |
| `selbsttest_result_360.png` | Auswertung angezeigt |
| `hero_startseite_390.png` | Hero-Sektion Startseite |
| `hero_hunde_390.png` | Hero-Sektion Hunde |
| `hero_katzen_390.png` | Hero-Sektion Katzen |
| `hero_notfall_390.png` | Hero-Sektion Notfall |
| `hero_selbsttest_390.png` | Hero-Sektion Selbsttest |
| `footer_390.png` | Footer-Ansicht |
| `hunde_full_390_fresh.png` | Hunde-Seite komplett (390px, verifiziert) |

---

## F. Fazit

Die mobile Darstellung ist **produktionsreif**. Keine Tabellenwüste, keine Kartenquetschung, keine horizontalen Scrollbars, keine abgeschnittenen Texte. Die responsive Architektur mit den Breakpoints bei 980px, 768px, 640px und 520px greift sauber ineinander.

Die einzigen konkreten Handlungsempfehlungen sind:
1. **Share-Buttons auf min-height 44px** bringen (1 CSS-Zeile, niedrige Priorität)
2. **CTA-Textgröße** in Share-Bereichen leicht anheben (optional)

Der Selbsttest-Stepper wäre ein schönes Enhancement, aber kein notwendiger Fix.
