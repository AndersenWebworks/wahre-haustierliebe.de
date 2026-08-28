# Actor-Package-Rendering-Proof

**Stand: 2026-08-27 - working implementation decision**

Der neue Proof prueft eine kleinere Antwort auf Ivos Evolutionsproblem: Ein
Ivo besitzt einen persistenten Identity Record, aber jede inkompatible
Koerperfamilie erhaelt ein eigenes vollstaendiges Actor Package. Ein Package
enthaelt Silhouette, Bildfolgen, Bodenkomposition und Position. Es gibt keine
Laufzeitmontage aus Armen, Beinen oder Schwaenzen.

## Was der Proof zeigt

- Ivo "Moos" und seine Erinnerung bleiben beim Wechsel sichtbar.
- Land und Wasser sind zwei eigenstaendige komplette Koerperdarstellungen.
- Die gemeinsame Absicht **Anbieten** fuehrt je Familie durch eine eigene
  authored Bildfolge.
- Der Familienwechsel ist ein kurzer shell-vermittelter Uebergang und kein
  anatomisch falsches Morphing.
- Eine Canvas-Welt mit festen 1200 x 700 Weltkoordinaten haelt Actor, Boden,
  Objektspur und Identitaetsmarke vollstaendig im Bild.

Die Implementierung ist absichtlich engine-neutral: Canvas zeichnet komplette
Bildframes und uebernimmt nur Timing, Alpha und Staging. Der Proof ist kein
Urteil ueber die spaetere Hauptengine und keine Behauptung, dass die vorhandenen
Testgrafiken Produktionsart sind.

## Architektur

```text
Identity Record
  Name, Erinnerungen, Temperament, semantische Absicht
             |
             +--> Land Actor Package  -> eigene Beobachten/Anbieten-Clips
             `--> Wasser Actor Package -> eigene Beobachten/Anbieten-Clips
```

Der Rig ist nicht mehr Ivos Identitaet und nicht mehr der globale Traeger der
Evolution. Ein internes Rig kann spaeter innerhalb einer Koerperfamilie helfen;
der Evolutionswechsel tauscht aber den vollstaendigen Actor aus.

## Warum der Universal-Rig verworfen ist

Der vorherige Proof verschobene Rasterteile mit statischen Pivots. Das loeste
weder Cropping noch sichtbare Gelenke, Gewicht, Kontakte oder unterschiedliche
Topologien. Ein universelles Rig wuerde diese Probleme nur verstecken. Der
Actor-Package-Ansatz erlaubt stattdessen, dass Vierbeiner, Schwimmer, Flieger
oder Schwarm ihre eigene Bewegungssprache behalten.

## Einordnung der recherchierten Muster

- **Spore/Retargeting:** Hecker et al. beschreiben semantische, zur Laufzeit
  spezialisierte Bewegung mit IK fuer stark unterschiedliche Morphologien.
  Das ist technisch reich, aber eine eigene grosse Infrastruktur.
- **Cutout/Mesh-Rigging:** Godot, Unity und DragonBones sind stark innerhalb
  einer stabilen Koerperfamilie. Sie erzeugen keine neue Anatomie zwischen
  Fisch, Vogel und Vierbeiner.
- **Diskrete Evolution:** Pokemon und Tamagotchi verwenden vollstaendig
  gestaltete Formen und verzweigte Entwicklungsdaten. Das ist fuer grosse
  Silhouettenspruenge ehrlich, kostet aber neue Animationspakete.
- **Prozedurale Spiele:** No Man's Sky zeigt die Arbeitsteilung: Variation kann
  prozedural entstehen, waehrend Stil und Formgrenzen authored bleiben.

Die Produktionshypothese fuer Ivo ist daher ein Hybrid: wenige definierte
Koerperfamilien, vollstaendige Actor Packages pro Entwicklungsform, gemeinsame
Verhaltens-/Identitaetsebene und nur familieninterne Wiederverwendung.

## Produktionsoekonomie

Die Einsparung kommt nicht aus einem universellen Bewegungsmodell, sondern aus
Wiederverwendung auf der richtigen Ebene: Identitaet und Absichten werden einmal
simuliert; eine Familie kann Bildfolgen, Holds und Reaktionen wiederverwenden;
ein neuer Koerperplan bekommt nur bei echtem Bedarf ein neues Package; seltene
Entwicklungs- und Comedy-Spitzen bleiben authored Ersatzbilder.

## Team-Einordnung

Bjoern verantwortet den Proof als technische Darstellungshypothese. Melindas
Tier-/Lernperspektive bleibt fuer Koerperfamilien und Haltungsfolgen zustaendig;
Grazia prueft Lesbarkeit, Witz und Wiedererkennbarkeit; Resetti bleibt unabhaengige
Gegenpruefung. Diese Seite dokumentiert eine Arbeitsentscheidung, keinen finalen
Renderer-Lock.

## Offene Fragen

- Wie viele Koerperfamilien sind fuer den ersten spielbaren Ivo vertretbar?
- Welche authored Clip-Laenge reicht fuer Beobachten, Anbieten, Fortbewegung und Ruhe?
- Wie variieren Alter, Markierungen und Formmerkmale ohne Silhouettenverlust?
- Reicht Canvas spaeter oder braucht die Habitat-Szene zusaetzlich Phaser fuer
  Kamera, Audio und Interaktion?
