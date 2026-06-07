# Wa(h)re Haustier(liebe) - Tier-Tamagotchi

Projektbezug: `wahrehaustierliebe.de`

Status: Arbeitsunterprojekt, nicht live, nicht deploybereit. Dieses Dokument sammelt die Richtung, damit das Spiel später innerhalb von `wahre-haustierliebe.de` weitergebaut werden kann und kein eigenes Projekt daneben entsteht.

## Ziel

Das Tier-Tamagotchi soll ein kinderfreundliches, humorvolles Lernwerkzeug für echte Haustierpflege werden. Kinder wählen ein Tier, treffen kleine Pflegeentscheidungen und sehen sofort, wie das Tier reagiert.

Der Lerneffekt kommt nicht über lange Infotexte, sondern über Spielreaktionen:

- richtige Pflege macht das Tier sichtbar zufrieden, stolz oder albern
- falsche Pflege erzeugt lustige, klare Warnreaktionen
- harte Tierhaltungsregeln werden kindgerecht gezeigt, aber nicht verharmlost
- Fehler dürfen ausprobiert werden, ohne dass der Flow bestraft oder blockiert

## Erste validierte Richtung

Der Welli-Prototyp hat die Grundrichtung bestätigt:

- Foto-Cutout statt gezeichneter Tierfigur
- kompletter Tierkörper als freigestellter Sticker
- weißer Rand um die echte Tierkontur
- warme, einfache Spielbühne statt dunkler Simulationsoptik
- große Auswahlbuttons, wenig Text, klare Reaktion
- lustiger Gesichtsausdruck passend zur Auswahl
- sofortiger Wechsel zwischen Antwortmöglichkeiten, damit Kinder spielerisch herausfinden können, welche Wahl das Tier froh macht

Das alte `budgie-brain` bleibt technische Altbasis und Pausenmaterial. Es ist nicht die Vorlage für dieses Spiel. Die neue Richtung ist heller, spielerischer und deutlich mehr Educational Game als Simulation.

## Visueller Vertrag

Der Stil ist Mixed-Media-Cutout:

- Das Tier ist ein echtes Fotoobjekt und darf sichtbar in die Spielwelt geklebt wirken.
- Das Cutout muss wirklich um die Tierkontur laufen, nicht um ein rechteckiges oder rundliches Bildfragment.
- Der weiße Sticker-Rand gehört zur Formsprache.
- Die Spielwelt bleibt reduziert, freundlich, gut lesbar und eher wie eine kleine Bühne.
- Animationen dürfen bewusst billig-komisch wirken: hüpfen, kippen, wackeln, beleidigt gucken, stolz aufploppen.
- Interne Konzeptbegriffe wie MVP, Grundschule, Produktschnitt oder Arbeitsauftrag dürfen nicht als sichtbare Frontend-Texte erscheinen.

## Face-Rig-Regel

Comicaugen und Gesichtsausdrücke funktionieren nur mit echten Bildankern.

Jedes Tierbild braucht Asset-Daten:

- sichtbare Augenanzahl
- Augenposition
- Brauenposition
- Wangenposition
- optionale Effektpositionen
- Blickrichtung oder Profilhinweis

Beim Welli-Seitenprofil ist nur ein Auge sichtbar. Das System darf daraus nicht automatisch zwei Augen machen.

Fallback-Regel: Wenn ein Tierbild keine zuverlässigen Face-Anker hat, wird kein Gesicht gerendert. Dann trägt das System die Reaktion über Körperanimation, Sprechblase, Sound, Symbol-Effekte oder kleine Comiczeichen.

Generische automatische Tieraugen-Erkennung ist für den MVP nicht geplant. Zu teuer, zu fehleranfällig und bei unterschiedlichen Tierarten zu unsicher.

## Interaktionsregel

Antworten müssen vor dem Weitergehen wechselbar bleiben.

Der gewünschte Ablauf:

1. Kind klickt eine Antwort.
2. Tier reagiert sofort sichtbar.
3. Lernhinweis erscheint.
4. Kind kann eine andere Antwort anklicken.
5. Gesichtsausdruck, Reaktion, Bewertung und Zustand passen sich sofort an.
6. Erst mit Weiter wird der nächste Pflegeschritt betreten.

Der Klick selbst ist also ein spielerisches Ausprobieren, kein sofortiges Lock-in.

## Geplantes System

Später soll am Anfang eine Tierwahl stehen, zum Beispiel:

- Wellensittich
- Meerschweinchen
- Kaninchen
- Hamster
- Hund
- Katze

Jede Tierart braucht eigene Pflegefragen, eigene Risikologik und eigene Bildassets. Das gemeinsame System bleibt:

- Tierauswahl
- Foto-Sticker-Asset
- Face-Rig oder Fallback-Reaktionssystem
- kurze Pflegeentscheidungen
- sichtbare Tierreaktion
- kindgerechter Lernmoment
- Fortschritt ohne Live-Schaltung, bis die fachliche und visuelle Qualität stimmt

## Fachliche Leitplanken

Das Spiel darf lustig sein, aber die Pflegeaussagen müssen stimmen.

- Tiermedizinische, ernährungsbezogene und rechtliche Aussagen vor Live-Schaltung prüfen.
- Keine gefährlichen Tipps als Gag normalisieren.
- Keine Todes- oder Notfallreaktionen als Schockeffekt für Kinder ausspielen.
- Kritische Fehler lieber als klaren Warnzustand inszenieren: "Stopp, das ist gefährlich."
- Tierwohl bleibt vor Spielwitz.

## Nächste Arbeitsschnitte

1. Welli-Prototyp als UX-Referenz stabilisieren.
2. Asset-Pipeline definieren: Bildquelle, Lizenz, Freistellung, Sticker-Rand, Face-Anker.
3. Gemeinsames Datenmodell für Tierart, Fragen, Optionen, Reaktionen und Lernhinweise entwerfen.
4. Einen zweiten Tier-Prototyp bauen, wahrscheinlich Meerschweinchen oder Kaninchen.
5. Entscheiden, ob das später eine eigene Unterseite, ein Werkzeugbereich oder ein eingebettetes Modul auf passenden Tierseiten wird.
6. Erst nach fachlicher Prüfung und sauberer Mobile-Sichtkontrolle in die Live-Navigation aufnehmen.
