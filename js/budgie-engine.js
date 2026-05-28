/**
 * Budgie Brain — State Simulation Engine
 *
 * Simuliert das Gehirn eines Wellensittichs mit realistischen
 * physiologischen und psychologischen Zuständen, die miteinander
 * interagieren und emergentes Verhalten erzeugen.
 *
 * Wissenschaftliche Basis:
 * - Aviäre Kognition (Güntürkün, Jarvis)
 * - Wellensittich-Ethologie (Wyndham, Brockway)
 * - Vocal Learning (Pepperberg, Chakraborty)
 * - Stress-Physiologie (Korte, Cockrem — Kortikosteron bei Vögeln)
 */

const BudgieEngine = (function() {
  'use strict';

  // =========================================================================
  // KONSTANTEN
  // =========================================================================

  const CLAMP = (v, min = 0, max = 100) => Math.max(min, Math.min(max, v));
  const RAND = (min, max) => Math.random() * (max - min) + min;
  const PICK = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const CHANCE = (pct) => Math.random() * 100 < pct;

  // Wellensittich-Komfortzone: 18–25 °C (australische Steppe)
  const TEMP_OPTIMAL_MIN = 18;
  const TEMP_OPTIMAL_MAX = 25;
  const TEMP_DANGER_LOW = 8;
  const TEMP_DANGER_HIGH = 35;

  // Lichtbedarf: 10–12h Dunkelheit pro Tag für gesunden Hormonhaushalt
  const IDEAL_DARK_HOURS = 11;

  // Zeitkonstanten
  const HOURS_PER_DAY = 24;

  // Käfig-Größen-Multiplikatoren (Einfluss auf Langeweile/Stress)
  const CAGE_FACTORS = {
    cage_small:  { boredomMult: 1.8, stressMult: 1.3, label: 'Kleiner Käfig' },
    cage_medium: { boredomMult: 1.2, stressMult: 1.0, label: 'Mittlerer Käfig' },
    cage_large:  { boredomMult: 0.8, stressMult: 0.8, label: 'Großer Käfig' },
    aviary:      { boredomMult: 0.4, stressMult: 0.5, label: 'Voliere' },
  };

  // Futter-Typen und ihre Wirkung
  const FOOD_TYPES = {
    seeds:    { hunger: 30, health: 0.5, feather: 0,   label: 'Körnermischung', desc: 'Standard, aber allein nicht ausreichend' },
    fresh:    { hunger: 15, health: 2,   feather: 1,   label: 'Frischkost',     desc: 'Gemüse, Kräuter, Obst — essentiell für Vitamine' },
    millet:   { hunger: 25, health: 0,   feather: 0,   label: 'Kolbenhirse',    desc: 'Beliebt, aber Dickmacher — als Leckerli OK' },
    mineral:  { hunger: 5,  health: 1,   feather: 1.5, label: 'Mineralstein',   desc: 'Kalzium, Jod — wichtig für Gefieder und Knochen' },
    egg_food: { hunger: 20, health: 1.5, feather: 2,   label: 'Eifutter',       desc: 'Proteinreich, gut während der Mauser' },
  };

  // Todesursachen
  const DEATH_CAUSES = {
    starvation:    'Verhungert — zu lange ohne ausreichend Nahrung.',
    dehydration:   'Verdurstet — Wasser muss IMMER frisch verfügbar sein.',
    hypothermia:   'Unterkühlung — Wellensittiche vertragen keine anhaltende Kälte.',
    heatstroke:    'Hitzschlag — kein Schatten, keine Belüftung.',
    toxic_fumes:   'Vergiftet durch Teflon-Dämpfe — Küche ist für Wellensittiche tödlich.',
    illness:       'An Krankheit gestorben — die Symptome waren zu lange unbehandelt.',
    stress_death:  'Stresskardiomyopathie — chronischer Stress hat das Herz geschädigt.',
    loneliness:    'Vereinsamung — Einzelhaltung über Monate kann tödlich sein.',
    injury:        'Verletzung nach Panikflug — in der Angst gegen die Wand geflogen.',
  };


  // =========================================================================
  // BUDGIE BRAIN CLASS
  // =========================================================================

  class BudgieBrain {

    /**
     * Erstellt ein neues Wellensittich-Gehirn.
     * @param {Object} config - Konfiguration (optional, für Laden aus Speicher)
     */
    constructor(config = {}) {
      // Identität
      this.name = config.name || 'Wellensittich';
      this.color = config.color || 'grün-gelb';
      this.sex = config.sex || 'männlich'; // männlich, weiblich, unbekannt
      this.personality = config.personality || this._generatePersonality();

      // Zeitstempel
      this.createdAt = config.createdAt || Date.now();
      this.lastUpdate = config.lastUpdate || Date.now();

      // Simulierte Zeit
      this.simulatedHours = config.simulatedHours || 0;
      this.day = config.day || 1;
      this.hour = config.hour || 8; // Startzeit: 8 Uhr morgens

      // === ZUSTÄNDE ===
      // Alle 0–100, Beschreibung siehe STATE_META

      this.states = {
        // Physiologisch
        hunger:             config.states?.hunger ?? 45,
        thirst:             config.states?.thirst ?? 55,
        energy:             config.states?.energy ?? 60,
        temperatureComfort: config.states?.temperatureComfort ?? 70,
        health:             config.states?.health ?? 85,
        featherCondition:   config.states?.featherCondition ?? 80,
        sleepDebt:          config.states?.sleepDebt ?? 15,
        immuneReserve:      config.states?.immuneReserve ?? 80,

        // Psychologisch
        stress:             config.states?.stress ?? 55,  // Neu = gestresst
        socialNeed:         config.states?.socialNeed ?? 70,  // Allein = einsam
        safety:             config.states?.safety ?? 35,  // Neue Umgebung = unsicher
        curiosity:          config.states?.curiosity ?? 25,
        boredom:            config.states?.boredom ?? 20,
        bondingHuman:       config.states?.bondingHuman ?? 5,
        bondingPartner:     config.states?.bondingPartner ?? 0,

        // Zyklen
        moltProgress:       config.states?.moltProgress ?? 0,
        moltActive:         config.states?.moltActive ?? false,
      };

      // === UMGEBUNG ===
      this.environment = {
        hasCompanion:       config.environment?.hasCompanion ?? false,
        companionName:      config.environment?.companionName ?? null,
        hasUVLight:         config.environment?.hasUVLight ?? false,
        cageType:           config.environment?.cageType ?? 'cage_medium',
        roomTemperature:    config.environment?.roomTemperature ?? 22,
        lightHours:         config.environment?.lightHours ?? 14,
        hasFreshFood:       config.environment?.hasFreshFood ?? false,
        hasForaging:        config.environment?.hasForaging ?? false,
        toyCount:           config.environment?.toyCount ?? 1,
        roomType:           config.environment?.roomType ?? 'living_room',
        nearWindow:         config.environment?.nearWindow ?? true,
        hasDrafts:          config.environment?.hasDrafts ?? false,
        hasMusic:           config.environment?.hasMusic ?? false,
        coveredAtNight:     config.environment?.coveredAtNight ?? true,
        lastCageClean:      config.environment?.lastCageClean ?? 0,  // Stunden seit Reinigung
        ...config.environment,
      };

      // === ERNÄHRUNGS-TRACKING ===
      this.nutrition = config.nutrition || {
        lastFed: 0,
        lastWater: 0,
        feedVariety: [],        // Letzte 5 Futter-Typen
        freshFoodStreak: 0,     // Tage am Stück mit Frischkost
      };

      // === VOCAL LEARNING ===
      // Wellensittiche: einer der wenigen Vocal Learners im Tierreich.
      // Repertoire wächst graduell: Kontaktruf → Pfiffe → Umgebungsgeräusche → Wörter
      this.vocalRepertoire = config.vocalRepertoire || [];

      // === MEILENSTEINE ===
      // Einmalige Erlebnisse, die den Lebensweg markieren
      this._milestones = config._milestones || {};

      // === EVENT-LOG ===
      this.log = config.log || [];
      this.maxLogEntries = 100;

      // === STATISTIKEN ===
      this.stats = config.stats || {
        totalInteractions: 0,
        daysSurvived: 0,
        fedCount: 0,
        talkedCount: 0,
        vetVisits: 0,
        companionAddedDay: null,
        worstStress: 55,
        bestHealth: 85,
        causeOfDeath: null,
      };

      // === STATUS ===
      this.alive = config.alive ?? true;
    }


    // =======================================================================
    // PERSÖNLICHKEIT
    // =======================================================================

    /**
     * Generiert zufällige Persönlichkeitszüge.
     * Beeinflusst, wie stark bestimmte Zustände reagieren.
     */
    _generatePersonality() {
      const traits = [
        'mutig', 'schüchtern', 'neugierig', 'vorsichtig',
        'gesellig', 'eigenbrötlerisch', 'verspielt', 'gelassen',
        'laut', 'leise', 'anhänglich', 'unabhängig',
      ];
      // 2–3 Züge zufällig auswählen
      const count = Math.random() < 0.5 ? 2 : 3;
      const shuffled = [...traits].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, count);

      return {
        traits: selected,
        // Multiplikatoren
        stressSensitivity: selected.includes('schüchtern') || selected.includes('vorsichtig') ? 1.3 :
                           selected.includes('mutig') || selected.includes('gelassen') ? 0.7 : 1.0,
        socialDrive:       selected.includes('gesellig') || selected.includes('anhänglich') ? 1.3 :
                           selected.includes('eigenbrötlerisch') || selected.includes('unabhängig') ? 0.7 : 1.0,
        curiosityBase:     selected.includes('neugierig') || selected.includes('verspielt') ? 1.4 :
                           selected.includes('vorsichtig') || selected.includes('schüchtern') ? 0.6 : 1.0,
        vocalLevel:        selected.includes('laut') ? 1.5 : selected.includes('leise') ? 0.6 : 1.0,
        bondingSpeed:      selected.includes('anhänglich') ? 1.4 : selected.includes('unabhängig') ? 0.6 : 1.0,
      };
    }


    // =======================================================================
    // ZEITSIMULATION
    // =======================================================================

    /**
     * Lässt die angegebene Anzahl Stunden verstreichen.
     * Zentraler Simulations-Loop: Stunde für Stunde durchrechnen.
     */
    advanceTime(hours = 1) {
      if (!this.alive) return this._deadResponse();

      const events = [];

      for (let h = 0; h < hours; h++) {
        this.simulatedHours++;
        this.hour = (this.hour + 1) % HOURS_PER_DAY;

        if (this.hour === 0) {
          this.day++;
          this.stats.daysSurvived = this.day - 1;
          this._onNewDay();
        }

        // Simulationsschritte pro Stunde
        this._applyBaseDrift();
        this._applyStateInteractions();
        this._applyEnvironmentEffects();
        this._applyTimeOfDayEffects();
        this._applyMoltCycle();

        // Schwelleneffekte & Events
        const hourEvents = this._checkThresholds();
        events.push(...hourEvents);

        // Zufallsereignisse
        const randomEvents = this._checkRandomEvents();
        events.push(...randomEvents);

        // Vocal Learning
        const vocalEvents = this._checkVocalLearning();
        events.push(...vocalEvents);

        // Zustände begrenzen
        this._clampAllStates();

        // Todescheck
        if (this._checkDeath()) {
          events.push(this._createEvent('death', `${this.name} ist gestorben.`, 'critical'));
          break;
        }
      }

      // Nutrition-Timer aktualisieren
      this.nutrition.lastFed += hours;
      this.nutrition.lastWater += hours;
      this.environment.lastCageClean += hours;
      this.lastUpdate = Date.now();

      // Events loggen
      events.forEach(e => this._addLog(e));

      return {
        alive: this.alive,
        events,
        hour: this.hour,
        day: this.day,
        mood: this.getDominantMood(),
        states: { ...this.states },
      };
    }


    /**
     * Basis-Drift: natürliche Veränderungen pro Stunde, unabhängig von Interaktionen.
     */
    _applyBaseDrift() {
      const s = this.states;
      const isNight = this._isNight();

      // Hunger: sinkt um ~1.5/h, langsamer nachts
      s.hunger -= isNight ? 0.5 : 1.5;

      // Durst: sinkt etwas schneller als Hunger (muss täglich getränkt werden)
      s.thirst -= isNight ? 0.6 : 2.0;

      // Energie: sinkt tagsüber, regeneriert nachts (wenn Schlaf funktioniert)
      if (isNight && s.sleepDebt < 80) {
        s.energy += 3.0;    // Regeneration im Schlaf
        s.sleepDebt -= 4.0; // Schlafschulden abbauen
      } else if (!isNight) {
        s.energy -= 1.2;
        s.sleepDebt += 0.8;
      }

      // Langeweile: steigt langsam, schneller in kleinen Käfigen
      const cageFactor = CAGE_FACTORS[this.environment.cageType]?.boredomMult || 1.0;
      s.boredom += 1.2 * cageFactor;

      // Spielzeug reduziert Langeweile-Anstieg
      if (this.environment.toyCount > 0) {
        s.boredom -= 0.3 * Math.min(this.environment.toyCount, 3);
      }
      if (this.environment.hasForaging) {
        s.boredom -= 0.5; // Futtersuche = Beschäftigung
      }

      // Sozialbedürfnis: steigt wenn allein, fällt mit Partner
      if (this.environment.hasCompanion) {
        s.socialNeed -= 2.5;
        s.bondingPartner += 0.1;
      } else {
        s.socialNeed += 1.5 * this.personality.socialDrive;
      }

      // Sicherheitsgefühl: verbessert sich langsam wenn nichts Bedrohliches passiert
      if (s.safety < 80) {
        s.safety += 0.3;
      }

      // Bindung zum Menschen: verblasst sehr langsam ohne Interaktion
      if (s.bondingHuman > 5) {
        s.bondingHuman -= 0.02;
      }

      // Käfig-Sauberkeit
      if (this.environment.lastCageClean > 48) {
        s.health -= 0.1;  // Verschmutzte Umgebung = Gesundheitsrisiko
        s.stress += 0.1;
      }
    }


    /**
     * Zustandsinteraktionen — das Kernstück der Simulation.
     * Hier entstehen Teufelskreise und positive Spiralen.
     */
    _applyStateInteractions() {
      const s = this.states;
      const pers = this.personality;

      // --- STRESS-TREIBER ---

      // Einsamkeit → Stress (skaliert mit Intensität)
      if (s.socialNeed > 65) {
        s.stress += 0.25 * pers.stressSensitivity * ((s.socialNeed - 65) / 35);
      }

      // Hunger → Stress
      if (s.hunger < 30) {
        s.stress += 0.4 * ((30 - s.hunger) / 30);
      }

      // Durst → Stress (stärker als Hunger)
      if (s.thirst < 25) {
        s.stress += 0.6 * ((25 - s.thirst) / 25);
      }

      // Langeweile → Stress (mild)
      if (s.boredom > 60) {
        s.stress += 0.2 * ((s.boredom - 60) / 40);
      }

      // Schlafmangel → Stress
      if (s.sleepDebt > 50) {
        s.stress += 0.3 * ((s.sleepDebt - 50) / 50);
      }

      // Krankheit → Stress
      if (s.health < 50) {
        s.stress += 0.2 * ((50 - s.health) / 50);
      }

      // --- STRESS-SENKER ---

      // Sicherheit → Stressabbau
      if (s.safety > 60) {
        s.stress -= 0.2 * ((s.safety - 60) / 40);
      }

      // Bindung → Stressabbau (mild)
      if (s.bondingHuman > 40) {
        s.stress -= 0.1;
      }

      // Partner → Stressabbau (stark, schon ab Tag 1 wirksam)
      if (this.environment.hasCompanion) {
        const partnerEffect = s.bondingPartner > 20 ? 0.6 : 0.3;
        s.stress -= partnerEffect;
        s.socialNeed -= 0.3;  // Extra-Reduktion über die BaseDrift hinaus
      }

      // Natürlicher Stress-Abbau (Homeostase)
      if (s.stress > 20) {
        s.stress -= 0.15;
      }

      // --- GESUNDHEITS-KASKADE (Der Teufelskreis) ---

      // Chronischer Stress → Immunsystem-Schwächung
      if (s.stress > 50) {
        s.immuneReserve -= 0.15 * ((s.stress - 50) / 50);
      }

      // Schwaches Immunsystem → Gesundheitsverlust
      if (s.immuneReserve < 40) {
        s.health -= 0.15 * ((40 - s.immuneReserve) / 40);
      }

      // Immunreserve regeneriert bei niedrigem Stress + guter Ernährung
      if (s.stress < 40 && s.hunger > 50 && s.health > 60) {
        s.immuneReserve += 0.2;
      }

      // Schlechte Gesundheit → weniger Energie (Todesspirale)
      if (s.health < 50) {
        s.energy -= 0.3 * ((50 - s.health) / 50);
      }

      // Wenig Energie → isst weniger (verschlimmert Hunger)
      if (s.energy < 25) {
        s.hunger -= 0.2; // Frisst weniger, auch wenn Futter da ist
      }

      // --- CHRONISCHE EINSAMKEIT ---
      // Einzelhaltung über längere Zeit: direkter Gesundheitsschaden
      if (s.socialNeed > 85 && !this.environment.hasCompanion && this.day > 14) {
        s.health -= 0.1;  // Langsam, aber kumulativ — monatelange Einsamkeit tötet
        s.immuneReserve -= 0.05;
      }

      // --- GEFIEDER ---

      // Stress-Rupfen
      if (s.stress > 60) {
        s.featherCondition -= 0.15 * ((s.stress - 60) / 40);
      }

      // Langeweile-Rupfen
      if (s.boredom > 70) {
        s.featherCondition -= 0.1 * ((s.boredom - 70) / 30);
      }

      // Gefieder regeneriert bei guter Gesundheit + niedrigem Stress
      if (s.health > 70 && s.stress < 40 && s.featherCondition < 90) {
        s.featherCondition += 0.1;
      }

      // --- NEUGIER ---
      // Inversely proportional to stress — gestresste Vögel erkunden nicht
      const baseCuriosity = Math.max(0, 75 - s.stress) * pers.curiosityBase;
      s.curiosity = s.curiosity * 0.8 + baseCuriosity * 0.2; // Sanfter Übergang

      // Langeweile kann bei moderatem Stress Neugier antreiben
      if (s.boredom > 50 && s.stress < 50) {
        s.curiosity += 0.3;
      }
    }


    /**
     * Umgebungseffekte — wie die physische Umgebung den Vogel beeinflusst.
     */
    _applyEnvironmentEffects() {
      const s = this.states;
      const env = this.environment;

      // --- TEMPERATUR ---
      const temp = env.roomTemperature;
      if (temp >= TEMP_OPTIMAL_MIN && temp <= TEMP_OPTIMAL_MAX) {
        s.temperatureComfort = CLAMP(s.temperatureComfort + 2, 0, 95);
      } else if (temp < TEMP_OPTIMAL_MIN) {
        const cold = (TEMP_OPTIMAL_MIN - temp) * 3;
        s.temperatureComfort = CLAMP(s.temperatureComfort - cold * 0.5, 0, 100);
        s.energy -= 0.3; // Energieverbrauch für Thermoregulation
        if (temp < TEMP_DANGER_LOW) {
          s.health -= 0.5;
        }
      } else if (temp > TEMP_OPTIMAL_MAX) {
        const heat = (temp - TEMP_OPTIMAL_MAX) * 3;
        s.temperatureComfort = CLAMP(s.temperatureComfort - heat * 0.5, 0, 100);
        if (temp > TEMP_DANGER_HIGH) {
          s.health -= 0.8;
        }
      }

      // Zugluft
      if (env.hasDrafts) {
        s.temperatureComfort -= 3;
        s.stress += 0.2;
        if (s.immuneReserve < 60) {
          s.health -= 0.15; // Erkältungsgefahr bei schwachem Immunsystem
        }
      }

      // --- UV-LICHT ---
      if (!env.hasUVLight) {
        // Ohne UV sieht der Vogel seine Artgenossen "falsch" (Federmuster unsichtbar)
        // → Partner-Identifikation gestört, allgemein "flach" Wahrnehmung
        s.featherCondition -= 0.03;  // Sehr langsam, aber kumulativ
        if (this.environment.hasCompanion) {
          s.bondingPartner -= 0.02;  // Paarbindung leidet
        }
        s.stress += 0.05;  // Subtiler Dauerstressor
      }

      // --- KÄFIG ---
      const cageFactor = CAGE_FACTORS[env.cageType] || CAGE_FACTORS.cage_medium;
      s.stress += (cageFactor.stressMult - 1.0) * 0.3;  // Kleiner Käfig = Dauerstress

      // --- KÜCHE (TÖDLICH!) ---
      if (env.roomType === 'kitchen') {
        // Teflon-Dämpfe: 5% Chance pro Stunde bei Kochen
        // In der Simulation: 0.5% chance pro Stunde generell
        if (CHANCE(0.5)) {
          s.health -= 30;  // Akute Vergiftung
          this._addLog(this._createEvent('danger',
            'Teflon-Dämpfe! Beschichtete Pfannen setzen bei Erhitzung Polytetrafluorethylen frei — für Wellensittiche tödlich.',
            'critical'));
        }
        s.stress += 0.5;  // Küche ist generell laut und unruhig
      }

      // --- MUSIK ---
      if (env.hasMusic) {
        if (s.stress < 60) {
          s.boredom -= 0.3;
          s.stress -= 0.1;
        } else {
          s.stress += 0.2;  // Zu gestresst für Stimulation
        }
      }

      // --- FRISCHKOST ---
      if (env.hasFreshFood) {
        s.health += 0.1;
        if (this.nutrition.freshFoodStreak > 3) {
          s.featherCondition += 0.05;
          s.immuneReserve += 0.05;
        }
      }
    }


    /**
     * Tageszeit-Effekte — Wellensittiche haben einen ausgeprägten Tagesrhythmus.
     */
    _applyTimeOfDayEffects() {
      const s = this.states;
      const h = this.hour;

      if (this._isNight()) {
        // Nacht: Schlafphase
        if (!this.environment.coveredAtNight) {
          s.sleepDebt += 0.5;  // Lichteinfall stört den Schlaf
          s.stress += 0.1;
        }
        // Nachts leiser, weniger aktiv (natürlich)
        s.boredom -= 0.5;  // Im Schlaf keine Langeweile
      }

      // Dämmerung (5–7 Uhr): Aufwachphase, Kontaktrufe
      if (h >= 5 && h <= 7) {
        s.socialNeed += 0.5;  // Schwarm-Check am Morgen
        s.energy += 0.5;      // Morgenenergie
      }

      // Vormittag (8–11): Aktivste Phase
      if (h >= 8 && h <= 11) {
        s.boredom += 0.3;     // Braucht mehr Beschäftigung
        s.energy -= 0.3;      // Hohe Aktivität verbraucht Energie
      }

      // Mittag (12–14): Ruhephase
      if (h >= 12 && h <= 14) {
        s.boredom -= 0.3;     // Natürliche Mittagsruhe
        s.energy += 0.3;
      }

      // Nachmittag (15–18): Zweite Aktivphase
      if (h >= 15 && h <= 18) {
        s.boredom += 0.2;
        s.socialNeed += 0.2;  // Sozialer Nachmittag
      }

      // Abend (19–21): Putzphase, Settling
      if (h >= 19 && h <= 21) {
        if (s.stress < 50) {
          s.featherCondition += 0.1;  // Abendputzen
          s.stress -= 0.2;            // Beruhigung vor der Nacht
        }
      }
    }


    /**
     * Mauser-Zyklus — wird durch Lichtdauer getriggert.
     * 1–2x jährlich, dauert 6–8 Wochen (simuliert: ~15–20 Tage).
     */
    _applyMoltCycle() {
      const s = this.states;

      // Trigger: Lichtdauer sinkt unter 12h (Herbst-Simulation)
      if (!s.moltActive && this.environment.lightHours < 12 && CHANCE(0.5)) {
        s.moltActive = true;
        s.moltProgress = 0;
        this._addLog(this._createEvent('cycle', `${this.name} beginnt zu mausern.`, 'info'));
      }

      if (s.moltActive) {
        s.moltProgress += 0.4;  // ~250 Stunden = ~10 Tage für volle Mauser

        // Mauser-Effekte
        s.energy -= 0.5;           // Energieverbrauch für Federproduktion
        s.stress += 0.2;           // Jucken, Unbehagen
        s.featherCondition -= 0.2; // Alte Federn fallen aus

        // Proteinbedarf steigt
        if (s.hunger < 50) {
          s.health -= 0.1;  // Mauser ohne gute Ernährung = Gesundheitsrisiko
        }

        // Mauser abgeschlossen
        if (s.moltProgress >= 100) {
          s.moltActive = false;
          s.moltProgress = 0;
          s.featherCondition = CLAMP(s.featherCondition + 20, 0, 95);  // Neues Gefieder!
          this._addLog(this._createEvent('cycle', `${this.name}s Mauser ist abgeschlossen. Neues Gefieder!`, 'positive'));
        }
      }
    }


    /**
     * Schwellenwert-Events — wenn Zustände kritische Werte erreichen.
     */
    _checkThresholds() {
      const s = this.states;
      const events = [];

      // Federrupfen bei hohem Stress
      if (s.stress > 65 && CHANCE(3)) {
        s.featherCondition -= RAND(1, 3);
        events.push(this._createEvent('symptom',
          `${this.name} rupft sich Federn aus — ein Zeichen extremen Stresses.`, 'warning'));
      }

      // Stereotypien bei extremer Langeweile
      if (s.boredom > 80 && CHANCE(5)) {
        events.push(this._createEvent('symptom',
          `${this.name} zeigt Stereotypien — repetitives Kopfnicken oder Gitterklettern.`, 'warning'));
      }

      // Lautes Rufen bei hohem Sozialbedürfnis
      if (s.socialNeed > 80 && CHANCE(8)) {
        events.push(this._createEvent('behavior',
          `${this.name} ruft laut und anhaltend — Kontaktrufe, die ins Leere gehen.`, 'info'));
      }

      // Panikflug bei sehr niedrigem Sicherheitsgefühl
      if (s.safety < 15 && CHANCE(2)) {
        s.health -= RAND(2, 8);  // Verletzungsrisiko
        events.push(this._createEvent('danger',
          `${this.name} fliegt in Panik gegen die Wand! Verletzungsgefahr.`, 'critical'));
      }

      // Erster sichtbarer Krankheitssymptom
      if (s.health < 45 && s.health > 40 && CHANCE(10)) {
        events.push(this._createEvent('symptom',
          `${this.name} sitzt aufgeplustert auf der Stange. Das ist KEIN Wohlfühlen — das ist ein Warnsignal.`, 'warning'));
      }

      // Kritischer Gesundheitszustand
      if (s.health < 25) {
        events.push(this._createEvent('danger',
          `${this.name} ist schwer krank. Ohne Tierarzt wird es nicht besser.`, 'critical'));
      }

      // Verhaltensverbesserung bei guter Pflege
      if (s.stress < 25 && s.safety > 65 && s.hunger > 60 && CHANCE(5)) {
        events.push(this._createEvent('positive',
          `${this.name} singt leise vor sich hin — ein Zeichen von Wohlbefinden.`, 'positive'));
      }

      // Update Statistiken
      s.stress = CLAMP(s.stress, 0, 100);
      if (s.stress > this.stats.worstStress) this.stats.worstStress = s.stress;
      if (s.health > this.stats.bestHealth) this.stats.bestHealth = s.health;

      return events;
    }


    /**
     * Zufallsereignisse — machen die Simulation lebendig und unvorhersehbar.
     * Enthält einmalige Meilensteine und wiederkehrende Momente.
     */
    _checkRandomEvents() {
      const s = this.states;
      const events = [];
      const ms = (key) => this._milestone(key);
      const setMs = (key) => this._setMilestone(key);

      // === ERSTE-TAGE-MEILENSTEINE ===

      // Tag 1: Erste Futter-Annäherung
      if (this.day === 1 && this.simulatedHours > 3 && !ms('first_food') && s.hunger < 40) {
        setMs('first_food');
        events.push(this._createEvent('milestone',
          `${this.name} fliegt zum ersten Mal zum Futternapf. Vorsichtig, ein Auge auf den Raum gerichtet — aber der Hunger gewinnt.`,
          'positive'));
      }

      // Tag 1–2: Erster Kontaktruf (wenn Vocal Learning den nicht schon erzeugt hat)
      if (this.day <= 2 && !ms('first_call') && this.vocalRepertoire.length === 0 && CHANCE(3)) {
        setMs('first_call');
        s.socialNeed += 2;
        events.push(this._createEvent('milestone',
          `${this.name} gibt den ersten Kontaktruf ab — kurz, fragend, in die Leere. ${this.environment.hasCompanion ? this.environment.companionName + ' antwortet.' : 'Kein Schwarm antwortet.'}`,
          'info'));
      }

      // Tag 2–4: Erste Exploration
      if (this.day >= 2 && this.day <= 4 && !ms('first_explore') && s.safety > 35 && s.stress < 50 && CHANCE(2)) {
        setMs('first_explore');
        s.curiosity += 10;
        s.safety += 3;
        events.push(this._createEvent('milestone',
          `${this.name} verlässt zum ersten Mal die Sicherheitsstange und klettert vorsichtig zur nächsten. Kleine Schritte in einer neuen Welt.`,
          'positive'));
      }

      // Tag 3–7: Erstes Bad
      if (this.day >= 3 && this.day <= 7 && !ms('first_bath') && s.stress < 35 && s.safety > 50 && CHANCE(1.5)) {
        setMs('first_bath');
        s.stress -= 3;
        s.featherCondition += 1;
        events.push(this._createEvent('milestone',
          `${this.name} entdeckt das Wasser nicht nur zum Trinken — vorsichtiges Eintauchen, dann Spritzer! Das erste Bad. Ein Zeichen wachsenden Vertrauens.`,
          'positive'));
      }

      // Tag 5–14: Erster Gesang
      if (this.day >= 5 && this.day <= 14 && !ms('first_song') && s.stress < 25 && s.safety > 60 && CHANCE(1)) {
        setMs('first_song');
        events.push(this._createEvent('milestone',
          `${this.name} singt. Nicht ein Kontaktruf, nicht ein Warnlaut — eine Melodie. Leise, tastend, aber unverkennbar. In der Vogelwelt singen nur die Zufriedenen.`,
          'positive'));
      }

      // === PARTNER-MEILENSTEINE ===

      if (this.environment.hasCompanion) {
        if (!ms('pair_perch') && s.bondingPartner > 10 && CHANCE(5)) {
          setMs('pair_perch');
          events.push(this._createEvent('milestone',
            `${this.name} und ${this.environment.companionName} sitzen zum ersten Mal auf derselben Stange. Nicht nah, aber nebeneinander. Der Anfang.`,
            'positive'));
        }

        if (!ms('pair_preen') && s.bondingPartner > 35 && CHANCE(3)) {
          setMs('pair_preen');
          s.stress -= 5;
          s.socialNeed -= 10;
          events.push(this._createEvent('milestone',
            `${this.environment.companionName} krault ${this.name} am Kopf — genau dort, wo man sich selbst nicht erreicht. ${this.name} schließt die Augen. Paarbindung.`,
            'positive'));
        }
      }

      // === WIEDERKEHRENDE ZUFALLSEREIGNISSE ===

      // Schatten / Raubtier-Silhouette
      if (this.environment.nearWindow && !this._isNight() && CHANCE(0.8)) {
        s.safety -= RAND(5, 15);
        s.stress += RAND(3, 8);
        events.push(this._createEvent('scare',
          'Ein Schatten fliegt vorbei — Raubvogel-Reflex! Alles erstarrt.', 'warning'));
      }

      // Lautes Geräusch (variiert)
      if (CHANCE(0.5)) {
        s.safety -= RAND(3, 8);
        s.stress += RAND(2, 5) * this.personality.stressSensitivity;
        events.push(this._createEvent('scare',
          PICK([
            'Ein lautes Geräusch — Türklingel? Topf gefallen? Alles ist Alarmstufe Rot.',
            'Irgendwo knallt eine Tür. Sekundenbruchteile von Fluchtreflex bis Erstarrung.',
            'Das Brummen der Waschmaschine ändert den Rhythmus. Für Menschenohren nichts. Für Wellensittich-Ohren: Anomalie.',
          ]),
          'info'));
      }

      // Entspannter Moment
      if (s.stress < 35 && s.safety > 55 && CHANCE(3)) {
        events.push(this._createEvent('positive', PICK([
          `${this.name} badet ausgiebig — Wasserspritzer fliegen in alle Richtungen.`,
          `${this.name} streckt einen Flügel und ein Bein gleichzeitig — totale Entspannung.`,
          `${this.name} schleift den Schnabel an der Stange — Abendpflege.`,
          `${this.name} hängt kopfüber an einem Spielzeug — pure Spielfreude.`,
          `${this.name} wippt rhythmisch mit dem Kopf und die Pupillen pinnen — pure Aufmerksamkeit, null Angst.`,
          `${this.name} knabbert zufrieden an einer Körnerhülse und dreht sie im Schnabel. Kleine Freuden.`,
        ]), 'positive'));
      }

      // Wetter-Wahrnehmung
      if (!this._isNight() && CHANCE(0.3)) {
        s.stress += RAND(1, 3);
        events.push(this._createEvent('behavior',
          `${this.name} wird plötzlich unruhig — Luftdruckänderung. Wellensittiche spüren Wetterumschwünge, bevor sie passieren.`,
          'info'));
      }

      // Morgendlicher Schwarm-Check
      if (this.hour >= 6 && this.hour <= 7 && CHANCE(5)) {
        events.push(this._createEvent('behavior',
          `Schwarm-Check: ${this.name} gibt eine Serie kurzer Kontaktrufe ab. ${this.environment.hasCompanion ? this.environment.companionName + ' antwortet sofort.' : 'Stille.'}`,
          this.environment.hasCompanion ? 'positive' : 'info'));
      }

      // Abendpflege
      if (this.hour >= 19 && this.hour <= 20 && s.stress < 50 && CHANCE(4)) {
        events.push(this._createEvent('behavior',
          `Abendpflege: ${this.name} putzt sich ausgiebig — jede Feder durch den Schnabel, Bürzeldrüsen-Öl verteilt. Die letzte Handlung des Tages.`,
          'positive'));
      }

      return events;
    }


    // =======================================================================
    // MILESTONE-TRACKING
    // =======================================================================

    _milestone(key) {
      return !!this._milestones[key];
    }

    _setMilestone(key) {
      this._milestones[key] = this.simulatedHours;
    }


    /**
     * Vocal Learning — Wellensittiche lernen Laute aus ihrer Umgebung.
     * Graduell: Kontaktruf → Pfiffe → Umgebungsgeräusche → Silben → Wörter.
     * Mit Partner: Kontaktruf-Synchronisation statt menschliche Worte.
     */
    _checkVocalLearning() {
      const s = this.states;
      const events = [];
      const known = new Set(this.vocalRepertoire.map(v => v.id));
      const pers = this.personality;

      // Nur tagsüber und bei Bewusstsein lernen
      if (this._isNight() || s.energy < 20 || s.health < 30) return events;

      // === SOLO-LERNEN (Mensch-Bindung) ===

      // Eigener Kontaktruf — entwickelt sich nach ein paar Stunden
      if (!known.has('contact_own') && this.simulatedHours > 5) {
        this.vocalRepertoire.push({
          id: 'contact_own', type: 'contact', label: 'Eigener Kontaktruf',
          learnedDay: this.day,
          detail: 'Kurz, charakteristisch, unverwechselbar — die akustische Signatur.',
        });
        events.push(this._createEvent('vocal',
          `${this.name} hat seinen eigenen Kontaktruf entwickelt — ein kurzer, unverwechselbarer Ton.`, 'positive'));
      }

      // Subsong (leises Brabbeln) — Voraussetzung für alles Weitere
      if (!known.has('subsong') && s.stress < 45 && s.safety > 40 && this.day >= 2 && CHANCE(4)) {
        this.vocalRepertoire.push({
          id: 'subsong', type: 'subsong', label: 'Subsong (Brabbeln)',
          learnedDay: this.day,
          detail: 'Leises, undeutliches Vor-sich-hin-Murmeln — Vögel üben so neue Laute.',
        });
        events.push(this._createEvent('vocal',
          `${this.name} brabbelt leise vor sich hin. Subsong — so üben Wellensittiche neue Laute, wie ein Kind, das Wörter ausprobiert.`, 'positive'));
      }

      // Einfacher Pfiff — erfordert Bindung
      if (!known.has('whistle') && known.has('subsong') && s.bondingHuman > 18 && s.stress < 45 && CHANCE(2 * pers.vocalLevel)) {
        this.vocalRepertoire.push({
          id: 'whistle', type: 'whistle', label: 'Einfacher Pfiff',
          learnedDay: this.day,
          detail: 'Ein klarer, einzelner Ton — abgeschaut vom Menschen.',
        });
        events.push(this._createEvent('vocal',
          `${this.name} pfeift! Ein einfacher, klarer Ton — aber er kommt von dir. Vocal Learning in Aktion.`, 'positive'));
      }

      // Umgebungsgeräusch-Imitation
      if (!known.has('mimic_env') && known.has('whistle') && s.bondingHuman > 30 && s.stress < 40 && s.curiosity > 25 && CHANCE(1.5 * pers.vocalLevel)) {
        const sounds = ['Türklingel', 'Telefon-Klingeln', 'Mikrowellen-Piepen', 'Wasserkocher-Klicken'];
        const sound = PICK(sounds);
        this.vocalRepertoire.push({
          id: 'mimic_env', type: 'mimic', label: sound + '-Imitation',
          learnedDay: this.day,
          detail: `Imitiert das ${sound} — verblüffend nah am Original.`,
        });
        events.push(this._createEvent('vocal',
          `War das die ${sound}? Nein — das war ${this.name}! Wellensittiche imitieren Umgebungsgeräusche mit erstaunlicher Präzision.`, 'positive'));
      }

      // Melodie-Fragment
      if (!known.has('melody') && known.has('whistle') && s.bondingHuman > 35 && s.stress < 35 && this.environment.hasMusic && CHANCE(1.5 * pers.vocalLevel)) {
        this.vocalRepertoire.push({
          id: 'melody', type: 'melody', label: 'Melodie-Fragment',
          learnedDay: this.day,
          detail: 'Wiedererkennbare Tonfolge aus der gehörten Musik — nicht perfekt, aber eindeutig.',
        });
        events.push(this._createEvent('vocal',
          `${this.name} singt eine Melodie! Nicht perfekt, aber eindeutig wiedererkennbar — abgeschaut aus der Musik im Raum.`, 'positive'));
      }

      // Erste Silbe — hohe Bindung nötig
      if (!known.has('syllable') && known.has('subsong') && s.bondingHuman > 45 && s.stress < 35 && s.curiosity > 20 && CHANCE(1 * pers.vocalLevel)) {
        this.vocalRepertoire.push({
          id: 'syllable', type: 'word', label: 'Erste Silbe',
          learnedDay: this.day,
          detail: 'Eine undeutliche, aber erkennbare Silbe — der Anfang vom Sprechen.',
        });
        events.push(this._createEvent('vocal',
          `Hat ${this.name} gerade ...gesprochen? Eine undeutliche Silbe, aber erkennbar menschlich. Der Anfang von etwas Großem.`, 'positive'));
      }

      // Erstes Wort — seltener Meilenstein
      if (!known.has('first_word') && known.has('syllable') && s.bondingHuman > 60 && s.stress < 30 && CHANCE(0.5 * pers.vocalLevel)) {
        const words = [this.name, 'Hallo', 'Piep', 'Komm', 'Fein'];
        const word = PICK(words);
        this.vocalRepertoire.push({
          id: 'first_word', type: 'word', label: `"${word}"`,
          learnedDay: this.day,
          detail: `Klar genug, dass man es versteht. ${this.name} kann sprechen.`,
        });
        events.push(this._createEvent('milestone',
          `${this.name} sagt "${word}"! Klar, deutlich, unverkennbar. Nur wenige Vogelarten können menschliche Sprache reproduzieren — Wellensittiche gehören dazu.`, 'positive'));
      }

      // === PARTNER-LERNEN (Schwarm-Vokalisationen) ===

      if (this.environment.hasCompanion) {
        // Kontaktruf-Angleichung
        if (!known.has('call_sync') && s.bondingPartner > 15 && CHANCE(3)) {
          this.vocalRepertoire.push({
            id: 'call_sync', type: 'sync', label: 'Kontaktruf-Angleichung',
            learnedDay: this.day,
            detail: `Die Rufe von ${this.name} und ${this.environment.companionName} nähern sich aneinander an — Schwarmbildung.`,
          });
          events.push(this._createEvent('vocal',
            `Die Kontaktrufe von ${this.name} und ${this.environment.companionName} klingen ähnlicher als gestern. Schwarmvögel synchronisieren ihre Rufe — das ist Zugehörigkeit in Lautform.`, 'positive'));
        }

        // Duett
        if (!known.has('duet') && known.has('call_sync') && s.bondingPartner > 35 && s.stress < 40 && CHANCE(1.5)) {
          this.vocalRepertoire.push({
            id: 'duet', type: 'duet', label: 'Duett-Gesang',
            learnedDay: this.day,
            detail: 'Abwechselndes, aufeinander abgestimmtes Singen — ein akustisches Band.',
          });
          events.push(this._createEvent('milestone',
            `${this.name} und ${this.environment.companionName} singen abwechselnd — ein Duett! Die Tonfolgen greifen ineinander wie Zahnräder. So klingt Paarbindung.`, 'positive'));
        }
      }

      return events;
    }


    // =======================================================================
    // USER-INTERAKTIONEN
    // =======================================================================

    /**
     * Füttern.
     * @param {string} type - Futter-Typ (seeds, fresh, millet, mineral, egg_food)
     * @returns {Object} Ergebnis mit Events
     */
    feed(type = 'seeds') {
      if (!this.alive) return this._deadResponse();

      const food = FOOD_TYPES[type] || FOOD_TYPES.seeds;
      const s = this.states;

      // Stress-Fress-Hemmung: gestresste Vögel fressen weniger
      const stressFactor = s.stress > 60 ? 0.5 : s.stress > 40 ? 0.75 : 1.0;
      const hungerGain = food.hunger * stressFactor;

      s.hunger = CLAMP(s.hunger + hungerGain, 0, 100);
      s.health += food.health * 0.5;
      s.featherCondition += food.feather * 0.3;
      s.stress -= 1;  // Füttern = positive Assoziation
      s.bondingHuman += 0.3 * this.personality.bondingSpeed;

      // Ernährungs-Tracking
      this.nutrition.lastFed = 0;
      this.nutrition.feedVariety.push(type);
      if (this.nutrition.feedVariety.length > 5) {
        this.nutrition.feedVariety.shift();
      }
      if (type === 'fresh') {
        this.nutrition.freshFoodStreak++;
        this.environment.hasFreshFood = true;
      }

      // Variety Bonus
      const uniqueTypes = new Set(this.nutrition.feedVariety).size;
      if (uniqueTypes >= 3) {
        s.health += 0.5;  // Abwechslungsreiche Ernährung = gesünder
      }

      this.stats.fedCount++;
      this.stats.totalInteractions++;

      const event = this._createEvent('action',
        `Du gibst ${this.name} ${food.label}. ${food.desc}`,
        s.stress > 50 ? 'info' : 'positive');
      this._addLog(event);

      // Zeit verstreichen lassen (Fütterung dauert ~30 Min)
      const result = this.advanceTime(1);
      result.events.unshift(event);
      return result;
    }


    /**
     * Frisches Wasser geben.
     */
    giveWater() {
      if (!this.alive) return this._deadResponse();

      const s = this.states;
      s.thirst = CLAMP(s.thirst + 50, 0, 100);
      this.nutrition.lastWater = 0;
      this.stats.totalInteractions++;

      const event = this._createEvent('action', `Frisches Wasser für ${this.name}.`, 'positive');
      this._addLog(event);

      const result = this.advanceTime(1);
      result.events.unshift(event);
      return result;
    }


    /**
     * Mit dem Vogel reden / Zeit verbringen.
     */
    talk() {
      if (!this.alive) return this._deadResponse();

      const s = this.states;

      // Wirkung hängt vom aktuellen Zustand ab
      if (s.safety > 20 && s.stress < 80) {
        // Positiv — Vogel reagiert (mit variabler Intensität)
        const receptivity = s.stress < 50 ? 1.0 : 0.5;  // Gestresst = weniger aufnahmefähig
        s.bondingHuman += 1.2 * this.personality.bondingSpeed * receptivity;
        s.stress -= RAND(1, 3) * receptivity;
        s.safety += RAND(0.5, 2) * receptivity;
        s.socialNeed -= 2 * receptivity;
        s.boredom -= 1;

        // Bei hoher Bindung: Vocal Learning Chance
        if (s.bondingHuman > 40 && CHANCE(5)) {
          s.curiosity += 5;
        }
      } else {
        // Negativ — Vogel ist zu gestresst, fühlt sich bedroht
        s.stress += RAND(0.5, 2);
        s.safety -= 1;
      }

      this.stats.talkedCount++;
      this.stats.totalInteractions++;

      const reaction = s.safety > 30 && s.stress < 70
        ? `${this.name} dreht den Kopf zu dir und lauscht.`
        : `${this.name} weicht zurück. Jetzt ist nicht der richtige Moment.`;

      const event = this._createEvent('action', `Du redest mit ${this.name}. ${reaction}`,
        s.stress < 70 ? 'positive' : 'info');
      this._addLog(event);

      const result = this.advanceTime(1);
      result.events.unshift(event);
      return result;
    }


    /**
     * Zweiten Wellensittich hinzufügen.
     */
    addCompanion(name = 'Neuer Vogel') {
      if (!this.alive) return this._deadResponse();

      const s = this.states;
      this.environment.hasCompanion = true;
      this.environment.companionName = name;

      // Kurzfristig: Stress steigt (neuer Vogel = Veränderung, aber moderat)
      s.stress += RAND(3, 8);
      s.safety -= RAND(3, 6);

      // Mittelfristig: Sozialbedürfnis und Stress werden dramatisch sinken
      // (passiert in _applyStateInteractions über die nächsten Stunden/Tage)

      this.stats.companionAddedDay = this.day;
      this.stats.totalInteractions++;

      const event = this._createEvent('milestone',
        `Ein zweiter Wellensittich! ${name} zieht ein. ${this.name} ist aufgeregt — unsicher, aber nicht mehr allein.`,
        'positive');
      this._addLog(event);

      // Einige Stunden vergehen lassen
      const result = this.advanceTime(3);
      result.events.unshift(event);
      return result;
    }


    /**
     * Partner entfernen.
     */
    removeCompanion() {
      if (!this.alive) return this._deadResponse();

      const s = this.states;
      const partnerName = this.environment.companionName || 'der Partner';

      this.environment.hasCompanion = false;
      this.environment.companionName = null;

      // Trennung = massiver Stress
      s.stress += RAND(15, 30);
      s.socialNeed += 30;
      s.bondingPartner = Math.max(0, s.bondingPartner - 20);

      this.stats.totalInteractions++;

      const event = this._createEvent('loss',
        `${partnerName} ist weg. ${this.name} ruft — stundenlang, ohne Antwort.`,
        'critical');
      this._addLog(event);

      const result = this.advanceTime(2);
      result.events.unshift(event);
      return result;
    }


    /**
     * Umgebung ändern.
     * @param {string} key - Umgebungs-Parameter
     * @param {*} value - Neuer Wert
     */
    setEnvironment(key, value) {
      if (!this.alive) return this._deadResponse();

      const s = this.states;
      const oldValue = this.environment[key];
      this.environment[key] = value;

      let description = '';
      let severity = 'info';

      switch (key) {
        case 'hasUVLight':
          description = value
            ? 'UV-Lampe installiert. Die Welt sieht für den Vogel jetzt richtig aus — Farben, die Menschen nicht sehen können.'
            : 'UV-Lampe entfernt. Der Vogel sieht seine Welt jetzt "flach".';
          severity = value ? 'positive' : 'warning';
          s.stress += value ? -3 : 2;
          break;

        case 'cageType':
          const cageLabels = { cage_small: 'kleinen Käfig', cage_medium: 'mittleren Käfig', cage_large: 'großen Käfig', aviary: 'Voliere' };
          description = `Umzug in ${cageLabels[value] || value}. ${value === 'aviary' ? 'Endlich Platz zum Fliegen!' : ''}`;
          s.stress += RAND(3, 8);  // Umzug = kurzzeitiger Stress
          severity = (value === 'aviary' || value === 'cage_large') ? 'positive' : 'info';
          break;

        case 'roomType':
          if (value === 'kitchen') {
            description = 'Warnung: KÜCHE! Beschichtete Pfannen, Teflon-Dämpfe, heiße Oberflächen — Lebensgefahr für Wellensittiche!';
            severity = 'critical';
          } else {
            description = `Standort geändert: ${value === 'living_room' ? 'Wohnzimmer' : value === 'bedroom' ? 'Schlafzimmer' : 'Büro'}.`;
            severity = 'info';
          }
          s.stress += RAND(3, 8);  // Jeder Ortswechsel = Stress
          s.safety -= RAND(5, 10);
          break;

        case 'roomTemperature':
          description = `Raumtemperatur: ${value}°C. ${value < TEMP_OPTIMAL_MIN ? 'Zu kalt!' : value > TEMP_OPTIMAL_MAX ? 'Zu warm!' : 'Im Komfortbereich.'}`;
          severity = (value < TEMP_OPTIMAL_MIN || value > TEMP_OPTIMAL_MAX) ? 'warning' : 'positive';
          break;

        case 'hasDrafts':
          description = value ? 'Zugluft! Wellensittiche sind anfällig für Atemwegserkrankungen bei Zugluft.' : 'Zugluft behoben.';
          severity = value ? 'warning' : 'positive';
          break;

        case 'coveredAtNight':
          description = value ? 'Käfig wird nachts abgedeckt — ungestörter Schlaf.' : 'Käfig nicht abgedeckt — Lichteinfall stört den Schlafrhythmus.';
          severity = value ? 'positive' : 'warning';
          break;

        case 'hasForaging':
          description = value ? 'Futtersuche eingerichtet! Beschäftigung, die dem natürlichen Verhalten entspricht.' : 'Futtersuche entfernt.';
          severity = value ? 'positive' : 'info';
          break;

        case 'lightHours':
          description = `Lichtdauer: ${value} Stunden. ${value > 14 ? 'Zu viel Licht kann den Hormonhaushalt stören.' : value < 10 ? 'Zu wenig Licht.' : 'Im gesunden Bereich.'}`;
          severity = (value > 14 || value < 10) ? 'warning' : 'positive';
          break;

        default:
          description = `${key} geändert: ${oldValue} → ${value}`;
      }

      this.stats.totalInteractions++;

      const event = this._createEvent('environment', description, severity);
      this._addLog(event);

      const result = this.advanceTime(1);
      result.events.unshift(event);
      return result;
    }


    /**
     * Spielzeug hinzufügen.
     */
    addToy() {
      if (!this.alive) return this._deadResponse();

      const s = this.states;
      this.environment.toyCount = Math.min(5, this.environment.toyCount + 1);

      // Neues Objekt: erst mal beäugen (Angst), dann Neugier
      s.safety -= RAND(2, 5);
      s.curiosity += RAND(3, 8);
      s.boredom -= 5;

      this.stats.totalInteractions++;

      const event = this._createEvent('action',
        `Neues Spielzeug! ${this.name} beäugt es misstrauisch aus der Ferne. Das ist normal — Wellensittiche brauchen Zeit, um Neues zu akzeptieren.`,
        'positive');
      this._addLog(event);

      const result = this.advanceTime(2);
      result.events.unshift(event);
      return result;
    }


    /**
     * Freiflug ermöglichen.
     */
    allowFreeFlight() {
      if (!this.alive) return this._deadResponse();

      const s = this.states;

      if (s.safety < 25 || s.stress > 70) {
        // Zu gestresst — wird die Tür nicht nutzen oder in Panik fliegen
        const event = this._createEvent('action',
          `Käfigtür offen, aber ${this.name} traut sich nicht raus. Zu viel Stress — Freiflug braucht ein Grundmaß an Sicherheitsgefühl.`,
          'info');
        this._addLog(event);
        s.stress += 2;  // Offene Tür kann als Bedrohung wahrgenommen werden
        const result = this.advanceTime(1);
        result.events.unshift(event);
        return result;
      }

      // Freiflug!
      s.energy -= 5;  // Fliegen verbraucht Energie
      s.boredom -= RAND(8, 15);
      s.stress -= RAND(3, 7);
      s.curiosity += 5;
      s.safety += 2;  // Vertrauen in die Umgebung

      this.stats.totalInteractions++;

      const event = this._createEvent('action',
        `Freiflug! ${this.name} dreht Runden durchs Zimmer. Fliegen ist fundamental — kein Käfig ersetzt das.`,
        'positive');
      this._addLog(event);

      const result = this.advanceTime(2);
      result.events.unshift(event);
      return result;
    }


    /**
     * Tierarzt besuchen.
     */
    visitVet() {
      if (!this.alive) return this._deadResponse();

      const s = this.states;

      // Tierarzt = massiver Stress (fangen, transportieren, fremde Umgebung)
      s.stress += RAND(10, 20);
      s.safety -= RAND(10, 20);

      // Aber: Behandlung wirkt
      const wasHealthy = s.health > 60;
      if (s.health < 60) {
        s.health += RAND(10, 25);  // Behandlung
        s.immuneReserve += RAND(5, 10);
      }

      this.stats.vetVisits++;
      this.stats.totalInteractions++;

      const description = wasHealthy
        ? `Tierarzt-Check für ${this.name}. Alles OK — aber der Transportstress war heftig.`
        : `${this.name} beim Tierarzt. Behandlung eingeleitet. Der Stress ist enorm, aber die Behandlung war nötig.`;

      const event = this._createEvent('action', description, wasHealthy ? 'info' : 'positive');
      this._addLog(event);

      // 4 Stunden vergehen (Transport + Warten + Behandlung + Zurück)
      const result = this.advanceTime(4);
      result.events.unshift(event);
      return result;
    }


    /**
     * Käfig reinigen.
     */
    cleanCage() {
      if (!this.alive) return this._deadResponse();

      const s = this.states;

      // Reinigung = Stress (Mensch greift in den Käfig ein)
      s.stress += RAND(3, 8);
      s.safety -= RAND(2, 5);

      // Aber: saubere Umgebung = gesünder
      this.environment.lastCageClean = 0;

      this.stats.totalInteractions++;

      const event = this._createEvent('action',
        `Käfig gereinigt. ${this.name} ist nervös wegen der Störung, aber die Hygiene ist wichtig.`,
        'positive');
      this._addLog(event);

      const result = this.advanceTime(1);
      result.events.unshift(event);
      return result;
    }


    /**
     * Zeit überspringen (nichts tun).
     * @param {number} hours - Stunden zum Überspringen
     */
    skip(hours = 1) {
      if (!this.alive) return this._deadResponse();

      this.stats.totalInteractions++;
      return this.advanceTime(hours);
    }


    // =======================================================================
    // ANALYSE & OUTPUT
    // =======================================================================

    /**
     * Bestimmt die dominante Stimmung anhand der Zustände.
     * @returns {string} content|neutral|restless|stressed|crisis|sleeping|sick|dying
     */
    getDominantMood() {
      const s = this.states;

      if (!this.alive) return 'dead';
      if (this._isNight() && s.sleepDebt < 70) return 'sleeping';
      if (s.health < 20) return 'dying';
      if (s.health < 45) return 'sick';
      if (s.stress > 80) return 'crisis';
      if (s.stress > 55) return 'stressed';
      if (s.stress > 35 || s.socialNeed > 70 || s.hunger < 25) return 'restless';
      if (s.stress < 20 && s.safety > 55 && s.hunger > 40) return 'content';
      return 'neutral';
    }


    /**
     * Gibt aktive Modifikatoren zurück — sekundäre Zustände, die das Verhalten beeinflussen.
     * @returns {string[]} Array von Modifikator-Namen
     */
    getActiveModifiers() {
      const s = this.states;
      const mods = [];

      if (s.hunger < 30) mods.push('hungry');
      if (s.thirst < 25) mods.push('thirsty');
      if (s.energy < 25) mods.push('exhausted');
      if (s.socialNeed > 70) mods.push('lonely');
      if (s.sleepDebt > 60) mods.push('tired');
      if (s.curiosity > 60) mods.push('curious');
      if (s.safety < 25) mods.push('scared');
      if (s.boredom > 65) mods.push('bored');
      if (s.featherCondition < 40) mods.push('plucked');
      if (s.bondingHuman > 50) mods.push('bonded');
      if (s.moltActive) mods.push('molting');
      if (this.environment.hasCompanion && s.bondingPartner > 30) mods.push('paired');

      return mods;
    }


    /**
     * Gibt eine lesbare Zusammenfassung aller Zustände zurück.
     * Absichtlich NICHT die rohen Zahlen — wie beim echten Vogel sieht man nur Anzeichen.
     */
    getVisibleSigns() {
      const s = this.states;
      const signs = [];

      // Gefieder
      if (s.featherCondition > 75) signs.push({ area: 'Gefieder', sign: 'Gepflegt und glänzend', quality: 'good' });
      else if (s.featherCondition > 50) signs.push({ area: 'Gefieder', sign: 'Leicht stumpf, einzelne Federn fehlen', quality: 'fair' });
      else if (s.featherCondition > 25) signs.push({ area: 'Gefieder', sign: 'Deutlich gerupft, kahle Stellen sichtbar', quality: 'poor' });
      else signs.push({ area: 'Gefieder', sign: 'Schwer gerupft, große kahle Bereiche', quality: 'critical' });

      // Körperhaltung
      if (s.stress > 70) signs.push({ area: 'Haltung', sign: 'Aufgeplustert, eingezogen', quality: 'poor' });
      else if (s.stress > 45) signs.push({ area: 'Haltung', sign: 'Leicht angespannt, aufmerksam', quality: 'fair' });
      else signs.push({ area: 'Haltung', sign: 'Aufrecht, entspannt', quality: 'good' });

      // Augen
      if (s.energy < 25 || s.health < 40) signs.push({ area: 'Augen', sign: 'Halb geschlossen, matt', quality: 'poor' });
      else if (s.curiosity > 50) signs.push({ area: 'Augen', sign: 'Weit offen, aufmerksam, Pupillen pinnen', quality: 'good' });
      else signs.push({ area: 'Augen', sign: 'Normal, wachsam', quality: 'good' });

      // Lautäußerungen
      const vocal = this.personality.vocalLevel;
      if (s.stress > 70) signs.push({ area: 'Laute', sign: 'Stille oder monotone Rufe', quality: 'poor' });
      else if (s.socialNeed > 75) signs.push({ area: 'Laute', sign: 'Laute, anhaltende Kontaktrufe', quality: 'fair' });
      else if (s.stress < 25 && s.safety > 50) signs.push({ area: 'Laute', sign: 'Melodisches Singen, Gezwitscher', quality: 'good' });
      else signs.push({ area: 'Laute', sign: 'Gelegentliche kurze Rufe', quality: 'fair' });

      // Appetit
      if (s.hunger < 15) signs.push({ area: 'Appetit', sign: 'Frisst kaum noch', quality: 'critical' });
      else if (s.hunger < 30) signs.push({ area: 'Appetit', sign: 'Reduzierter Appetit', quality: 'poor' });
      else if (s.hunger < 50) signs.push({ area: 'Appetit', sign: 'Frisst wenig', quality: 'fair' });
      else signs.push({ area: 'Appetit', sign: 'Frisst normal', quality: 'good' });

      // Aktivität
      if (s.energy < 20) signs.push({ area: 'Aktivität', sign: 'Kaum Bewegung, sitzt nur', quality: 'critical' });
      else if (s.energy < 40) signs.push({ area: 'Aktivität', sign: 'Wenig aktiv, träge', quality: 'poor' });
      else if (s.curiosity > 50 && s.stress < 30) signs.push({ area: 'Aktivität', sign: 'Aktiv, erkundet, klettert', quality: 'good' });
      else signs.push({ area: 'Aktivität', sign: 'Normale Aktivität', quality: 'fair' });

      // Vocal Learning als sichtbares Zeichen
      if (this.vocalRepertoire.length > 0) {
        const latest = this.vocalRepertoire[this.vocalRepertoire.length - 1];
        const typeLabels = { contact: 'Kontaktruf', subsong: 'Brabbelt', whistle: 'Pfeift', mimic: 'Imitiert',
          melody: 'Singt Melodien', word: 'Spricht', sync: 'Synchronisiert', duet: 'Singt Duett' };
        signs.push({ area: 'Stimme', sign: typeLabels[latest.type] || latest.label, quality: 'good' });
      } else {
        signs.push({ area: 'Stimme', sign: 'Noch still', quality: 'fair' });
      }

      return signs;
    }


    /**
     * Gibt das gelernte Vokal-Repertoire zurück.
     * @returns {Array} Gelerntes Repertoire
     */
    getVocalRepertoire() {
      return this.vocalRepertoire;
    }


    /**
     * Zeitinfo als lesbaren String.
     */
    getTimeString() {
      const h = this.hour.toString().padStart(2, '0');
      const period = this._getTimePeriodLabel();
      return `Tag ${this.day}, ${h}:00 Uhr (${period})`;
    }

    _getTimePeriodLabel() {
      const h = this.hour;
      if (h >= 5 && h < 8) return 'Morgendämmerung';
      if (h >= 8 && h < 12) return 'Vormittag';
      if (h >= 12 && h < 14) return 'Mittag';
      if (h >= 14 && h < 18) return 'Nachmittag';
      if (h >= 18 && h < 21) return 'Abend';
      return 'Nacht';
    }


    // =======================================================================
    // INTERNE HILFSMETHODEN
    // =======================================================================

    _isNight() {
      return this.hour >= 21 || this.hour < 5;
    }

    _onNewDay() {
      // Tagesreset: Frischkost verdirbt über Nacht
      if (this.environment.hasFreshFood) {
        // Gestern gab es Frischkost — Streak bleibt, aber morgen muss neu gegeben werden
        this.environment.hasFreshFood = false;
      } else {
        // Kein Frischkost gestern — Streak gebrochen
        this.nutrition.freshFoodStreak = 0;
      }
    }

    _clampAllStates() {
      for (const key of Object.keys(this.states)) {
        if (typeof this.states[key] === 'number') {
          this.states[key] = CLAMP(this.states[key], 0, 100);
        }
      }
    }

    _checkDeath() {
      const s = this.states;

      // Hunger/Durst bei 0 → schneller Gesundheitsverlust (kein sofortiger Tod)
      if (s.hunger <= 0) {
        s.health -= 1.5;  // ~66 Stunden bis Tod bei vollem Health
        s.energy -= 2;
      }
      if (s.thirst <= 0) {
        s.health -= 2.5;  // ~40 Stunden bis Tod bei vollem Health
        s.energy -= 3;
      }

      // Extreme Temperatur → Gesundheitsverlust
      if (s.temperatureComfort <= 5) {
        s.health -= 2.0;
      }

      // Tod nur bei Gesundheit = 0
      let cause = null;

      if (s.health <= 0) {
        // Ursache bestimmen nach dem dominanten Problem
        if (this.environment.roomType === 'kitchen') cause = 'toxic_fumes';
        else if (s.thirst <= 0) cause = 'dehydration';
        else if (s.hunger <= 0) cause = 'starvation';
        else if (s.temperatureComfort <= 5) {
          cause = this.environment.roomTemperature < TEMP_OPTIMAL_MIN ? 'hypothermia' : 'heatstroke';
        }
        else if (s.socialNeed > 85 && !this.environment.hasCompanion) cause = 'loneliness';
        else if (s.stress > 80) cause = 'stress_death';
        else if (s.safety < 15) cause = 'injury';
        else cause = 'illness';
      }

      if (cause) {
        this.alive = false;
        this.stats.causeOfDeath = cause;
        return true;
      }
      return false;
    }

    _deadResponse() {
      return {
        alive: false,
        events: [this._createEvent('death',
          `${this.name} lebt nicht mehr. ${DEATH_CAUSES[this.stats.causeOfDeath] || ''}`, 'critical')],
        hour: this.hour,
        day: this.day,
        mood: 'dead',
        states: { ...this.states },
      };
    }

    _createEvent(type, text, severity = 'info') {
      return {
        type,
        text,
        severity, // info, positive, warning, critical
        day: this.day,
        hour: this.hour,
        timestamp: this.simulatedHours,
      };
    }

    _addLog(event) {
      this.log.push(event);
      if (this.log.length > this.maxLogEntries) {
        this.log.shift();
      }
    }


    // =======================================================================
    // PERSISTENZ
    // =======================================================================

    /**
     * Speichert in localStorage.
     */
    save() {
      const data = this.toJSON();
      localStorage.setItem('budgieBrain', JSON.stringify(data));
    }

    /**
     * Serialisiert das gesamte Gehirn.
     */
    toJSON() {
      return {
        name: this.name,
        color: this.color,
        sex: this.sex,
        personality: this.personality,
        createdAt: this.createdAt,
        lastUpdate: this.lastUpdate,
        simulatedHours: this.simulatedHours,
        day: this.day,
        hour: this.hour,
        states: { ...this.states },
        environment: { ...this.environment },
        nutrition: { ...this.nutrition },
        vocalRepertoire: [...this.vocalRepertoire],
        _milestones: { ...this._milestones },
        log: this.log.slice(-50),  // Letzte 50 Events
        stats: { ...this.stats },
        alive: this.alive,
      };
    }

    /**
     * Lädt aus localStorage.
     * @returns {BudgieBrain|null}
     */
    static load() {
      try {
        const raw = localStorage.getItem('budgieBrain');
        if (!raw) return null;
        const data = JSON.parse(raw);
        return new BudgieBrain(data);
      } catch (e) {
        console.error('Fehler beim Laden:', e);
        return null;
      }
    }

    /**
     * Erstellt ein neues Wellensittich-Gehirn mit Standard-Startwerten.
     * Der Vogel ist gerade angekommen — gestresst, unsicher, allein.
     */
    static createNew(name, color = 'grün-gelb', sex = 'männlich') {
      return new BudgieBrain({
        name,
        color,
        sex,
        states: {
          hunger: 45,            // Hat vor Transport gefressen
          thirst: 55,            // Etwas durstig
          energy: 55,            // Transport war anstrengend
          temperatureComfort: 70,
          health: 85,            // Gesund
          featherCondition: 80,  // Normales Gefieder
          sleepDebt: 20,         // Leicht müde vom Transport
          immuneReserve: 75,     // Noch gutes Immunsystem

          stress: 60,            // Neue Umgebung = Stress
          socialNeed: 70,        // War mit anderen Vögeln, jetzt allein
          safety: 30,            // Alles fremd
          curiosity: 20,         // Zu gestresst für Neugier
          boredom: 10,           // Alles ist noch neu
          bondingHuman: 3,       // Fremder Mensch
          bondingPartner: 0,     // Kein Partner

          moltProgress: 0,
          moltActive: false,
        },
      });
    }


    // =======================================================================
    // STATE-SYSTEM-PROMPT (für LLM-Integration)
    // =======================================================================

    /**
     * Generiert einen State-Dump für die Nutzung als LLM-Kontext.
     * Kann in Claude oder anderen LLMs als System-Prompt genutzt werden.
     */
    generateSystemPromptContext() {
      const s = this.states;
      const env = this.environment;
      const mood = this.getDominantMood();
      const mods = this.getActiveModifiers();
      const signs = this.getVisibleSigns();

      return `# Aktueller Zustand von ${this.name}

## Identität
- Name: ${this.name}
- Farbe: ${this.color}
- Geschlecht: ${this.sex}
- Persönlichkeit: ${this.personality.traits.join(', ')}
- Alter im Spiel: Tag ${this.day}

## Zeit
- ${this.getTimeString()}

## Dominante Stimmung: ${mood}
## Aktive Modifikatoren: ${mods.length > 0 ? mods.join(', ') : 'keine'}

## Innere Zustände (0–100)
### Körper
- Hunger: ${Math.round(s.hunger)} (${s.hunger > 60 ? 'satt' : s.hunger > 30 ? 'etwas hungrig' : 'hungrig'})
- Durst: ${Math.round(s.thirst)} (${s.thirst > 50 ? 'OK' : 'durstig'})
- Energie: ${Math.round(s.energy)} (${s.energy > 60 ? 'fit' : s.energy > 30 ? 'müde' : 'erschöpft'})
- Gesundheit: ${Math.round(s.health)}
- Gefieder: ${Math.round(s.featherCondition)}
- Immunreserve: ${Math.round(s.immuneReserve)}
- Schlafschulden: ${Math.round(s.sleepDebt)}

### Geist
- Stress: ${Math.round(s.stress)}
- Sozialbedürfnis: ${Math.round(s.socialNeed)} ${env.hasCompanion ? '(Partner vorhanden)' : '(ALLEIN)'}
- Sicherheitsgefühl: ${Math.round(s.safety)}
- Neugier: ${Math.round(s.curiosity)}
- Langeweile: ${Math.round(s.boredom)}
- Bindung Mensch: ${Math.round(s.bondingHuman)}

## Umgebung
- Käfig: ${CAGE_FACTORS[env.cageType]?.label || env.cageType}
- Raum: ${env.roomType}
- Temperatur: ${env.roomTemperature}°C
- UV-Licht: ${env.hasUVLight ? 'ja' : 'nein'}
- Zugluft: ${env.hasDrafts ? 'ja' : 'nein'}
- Partner: ${env.hasCompanion ? env.companionName : 'keiner'}
- Spielzeug: ${env.toyCount}
- Frischkost heute: ${env.hasFreshFood ? 'ja' : 'nein'}
- Futtersuche: ${env.hasForaging ? 'ja' : 'nein'}

## Sichtbare Zeichen
${signs.map(s => `- ${s.area}: ${s.sign}`).join('\n')}`;
    }
  }


  // =========================================================================
  // PUBLIC API
  // =========================================================================

  return {
    BudgieBrain,
    FOOD_TYPES,
    CAGE_FACTORS,
    DEATH_CAUSES,
  };

})();
