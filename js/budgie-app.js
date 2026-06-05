/**
 * Budgie Brain — App Logic (Educational Game Version)
 *
 * Connects Engine + Text to the new game UI.
 * Features: CSS budgie reactions, knowledge cards, thought bubbles,
 * day progress, mood icons, action feedback popups.
 */

const BudgieApp = (function() {
  'use strict';

  // =========================================================================
  // STATE
  // =========================================================================

  let brain = null;
  let logOpen = false;
  let knowledgePanelOpen = false;
  let introFormBound = false;
  let feedbackTimer = null;
  let thoughtTimer = null;
  let currentExplanation = '';
  let currentMonologue = '';
  let knowledge = []; // Unlocked knowledge cards


  // =========================================================================
  // COLOR MAPPINGS
  // =========================================================================

  const BUDGIE_COLORS = {
    'grün-gelb':  { body: '#6ABF4B', bodyDark: '#4A9F2B', head: '#E8E052', wing: '#3D8C28', chest: '#8DD870' },
    'blau-weiß':  { body: '#5BA8D9', bodyDark: '#3B88B9', head: '#E8E8F0', wing: '#3A7DB8', chest: '#88C8E8' },
    'gelb':       { body: '#F0D840', bodyDark: '#D0B820', head: '#F8F080', wing: '#D8C030', chest: '#F5E868' },
    'hellblau':   { body: '#88CDE8', bodyDark: '#68ADCC', head: '#D8E8F0', wing: '#5898C0', chest: '#A8DDF0' },
    'grau':       { body: '#989898', bodyDark: '#787878', head: '#B8B8C0', wing: '#707078', chest: '#A8A8B0' },
    'violett':    { body: '#9878B8', bodyDark: '#7858A0', head: '#C8B8D8', wing: '#685898', chest: '#B098D0' },
  };

  const CERE_COLORS = {
    'männlich': '#5B9BD5',
    'weiblich': '#B8866B',
    'unbekannt': '#C0A8D0',
  };

  const MOOD_LABELS = {
    content: { label: 'OK', tone: 'mood-content' },
    neutral: { label: 'Ruhig', tone: 'mood-muted' },
    restless: { label: 'Unruhig', tone: 'mood-warning' },
    stressed: { label: 'Stress', tone: 'mood-warning' },
    crisis: { label: 'Not', tone: 'mood-critical' },
    sleeping: { label: 'Schlaf', tone: 'mood-muted' },
    sick: { label: 'Krank', tone: 'mood-warning' },
    dying: { label: 'Kritisch', tone: 'mood-critical' },
    dead: { label: 'Tot', tone: 'mood-critical' },
  };


  // =========================================================================
  // KNOWLEDGE SYSTEM
  // =========================================================================

  function loadKnowledge() {
    try {
      const stored = localStorage.getItem('budgieKnowledge');
      knowledge = stored ? JSON.parse(stored) : [];
    } catch (e) {
      knowledge = [];
    }
  }

  function saveKnowledge() {
    localStorage.setItem('budgieKnowledge', JSON.stringify(knowledge));
  }

  function addKnowledge(text, type) {
    if (!text || text.length < 20) return;

    // Deduplicate by checking first 80 chars
    const key = text.substring(0, 80);
    if (knowledge.some(k => k.key === key)) return;

    knowledge.push({
      key,
      text,
      type: type || 'science', // 'science' or 'milestone'
      day: brain ? brain.day : 1,
      timestamp: Date.now(),
    });
    saveKnowledge();
    updateKnowledgeCounter();
  }

  function updateKnowledgeCounter() {
    const el = document.getElementById('knowledge-count');
    if (el) el.textContent = knowledge.length;
  }

  function renderKnowledgePanel() {
    const grid = document.getElementById('knowledge-grid');
    if (!grid) return;

    if (knowledge.length === 0) {
      grid.innerHTML = '<div style="text-align:center; color: var(--text-muted); font-size: 0.82rem; padding: 1rem;">Noch keine Erkenntnisse. Interagiere mit deinem Vogel!</div>';
      return;
    }

    // Show newest first
    grid.innerHTML = [...knowledge].reverse().map(k => {
      const isMilestone = k.type === 'milestone';
      return `<div class="knowledge-card ${isMilestone ? 'kc-milestone' : ''}">
        <div class="kc-title">${isMilestone ? 'Meilenstein' : 'Erkenntnis'} - Tag ${k.day}</div>
        <div>${k.text}</div>
      </div>`;
    }).join('');
  }


  // =========================================================================
  // INITIALIZATION
  // =========================================================================

  function init() {
    loadKnowledge();

    const saved = BudgieEngine.BudgieBrain.load();
    if (saved) {
      brain = saved;
      showSimulation();
      showWelcomeBack();
    } else {
      showIntro();
    }

    // Companion modal: Enter confirms
    document.getElementById('companion-name-input').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        confirmCompanion();
      }
    });

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          overlay.classList.add('hidden');
          updateUI();
        }
      });
    });

    // Intro color preview
    const colorSelect = document.getElementById('budgie-color');
    const sexSelect = document.getElementById('budgie-sex');
    if (colorSelect) colorSelect.addEventListener('change', updateIntroPreview);
    if (sexSelect) sexSelect.addEventListener('change', updateIntroPreview);
    updateIntroPreview();
  }


  // =========================================================================
  // BUDGIE VISUAL UPDATES
  // =========================================================================

  function applyBudgieColors(color, sex, selector) {
    const el = selector ? document.querySelector(selector) : document.documentElement;
    const colors = BUDGIE_COLORS[color] || BUDGIE_COLORS['grün-gelb'];
    el.style.setProperty('--budgie-body', colors.body);
    el.style.setProperty('--budgie-body-dark', colors.bodyDark);
    el.style.setProperty('--budgie-head', colors.head);
    el.style.setProperty('--budgie-wing', colors.wing);
    el.style.setProperty('--budgie-chest', colors.chest);

    // Cere color based on sex
    const cere = sex ? CERE_COLORS[sex] || CERE_COLORS['unbekannt'] : null;
    if (cere) {
      const ceres = (selector ? document.querySelector(selector) : document).querySelectorAll('.budgie-cere');
      ceres.forEach(c => c.style.background = cere);
    }
  }

  function updateBudgieMood() {
    const budgieEl = document.getElementById('sim-budgie');
    if (!budgieEl || !brain) return;

    const mood = brain.getDominantMood();
    const moodClasses = ['content', 'neutral', 'restless', 'stressed', 'crisis', 'sleeping', 'sick', 'dying', 'dead', 'curious'];

    // Remove all mood classes
    moodClasses.forEach(c => budgieEl.classList.remove(c));

    // Map mood to CSS class
    if (mood === 'content') {
      budgieEl.classList.add('content');
    } else if (mood === 'stressed' || mood === 'restless') {
      budgieEl.classList.add('stressed');
    } else if (mood === 'sleeping') {
      budgieEl.classList.add('sleeping');
    } else if (mood === 'sick' || mood === 'dying') {
      budgieEl.classList.add('sick');
    } else if (mood === 'crisis') {
      budgieEl.classList.add('crisis');
    } else if (mood === 'dead') {
      budgieEl.classList.add('dead');
    } else {
      // neutral: check curiosity
      if (brain.states.curiosity > 50) {
        budgieEl.classList.add('curious');
      } else {
        budgieEl.classList.add('neutral');
      }
    }

    // Mood status
    const moodIcon = document.getElementById('mood-icon');
    if (moodIcon) {
      const moodMeta = MOOD_LABELS[mood] || MOOD_LABELS.neutral;
      moodIcon.textContent = moodMeta.label;
      moodIcon.className = 'sim-mood-icon ' + moodMeta.tone;
    }
  }

  function triggerBudgieReaction(type) {
    const budgieEl = document.getElementById('sim-budgie');
    if (!budgieEl) return;

    const reactionClass = 'react-' + type;
    budgieEl.classList.add(reactionClass);
    setTimeout(() => budgieEl.classList.remove(reactionClass), 600);
  }


  // =========================================================================
  // ACTION FEEDBACK POPUP
  // =========================================================================

  function showFeedback(text, severity) {
    const el = document.getElementById('action-popup');
    const textEl = document.getElementById('action-popup-text');
    if (!el || !textEl) return;

    if (feedbackTimer) clearTimeout(feedbackTimer);

    el.className = 'action-popup severity-' + (severity || 'info');
    textEl.textContent = text;

    feedbackTimer = setTimeout(() => {
      el.style.opacity = '0';
      setTimeout(() => {
        el.classList.add('hidden');
        el.style.opacity = '';
      }, 500);
    }, 4000);
  }

  function extractFeedback(result) {
    if (!result || !result.events || result.events.length === 0) return null;
    const actionEvent = result.events.find(e => e.type === 'action' || e.type === 'milestone' || e.type === 'loss');
    if (actionEvent) return { text: actionEvent.text, severity: actionEvent.severity };
    const dangerEvent = result.events.find(e => e.severity === 'critical' || e.severity === 'warning');
    if (dangerEvent) return { text: dangerEvent.text, severity: dangerEvent.severity };
    return null;
  }


  // =========================================================================
  // THOUGHT BUBBLE (Monologue on bird click)
  // =========================================================================

  function showThoughtBubble() {
    if (!brain || !brain.alive) return;

    const bubble = document.getElementById('thought-bubble');
    const textEl = document.getElementById('thought-text');
    if (!bubble || !textEl) return;

    if (!bubble.classList.contains('hidden')) {
      bubble.classList.add('hidden');
      return;
    }

    // Get current monologue, truncate for bubble
    let text = currentMonologue;
    if (text.length > 160) {
      text = text.substring(0, 157) + '...';
    }

    textEl.textContent = text;
    bubble.classList.remove('hidden');

    if (thoughtTimer) clearTimeout(thoughtTimer);
    thoughtTimer = setTimeout(() => {
      bubble.classList.add('hidden');
    }, 8000);
  }


  // =========================================================================
  // EXPLANATION PANEL (Science overlay)
  // =========================================================================

  function showExplanation() {
    const overlay = document.getElementById('explanation-overlay');
    const body = document.getElementById('explanation-body');
    if (!overlay || !body) return;

    body.textContent = currentExplanation || 'Beobachte deinen Wellensittich, um mehr zu erfahren.';
    overlay.classList.remove('hidden');

    // Track as knowledge
    if (currentExplanation) {
      addKnowledge(currentExplanation, 'science');
    }
  }

  function hideExplanation() {
    const overlay = document.getElementById('explanation-overlay');
    if (overlay) overlay.classList.add('hidden');
  }


  // =========================================================================
  // OBSERVE SUMMARY
  // =========================================================================

  function generateObserveSummary(b, moodBefore, moodAfter) {
    const s = b.states;
    const name = b.name;
    const parts = [];

    if (moodAfter !== moodBefore) {
      const labels = { content: 'zufriedener', neutral: 'ruhiger', restless: 'unruhiger', stressed: 'gestresster', crisis: 'verzweifelter', sleeping: 'eingeschlafen', sick: 'kränker' };
      parts.push(name + ' wirkt ' + (labels[moodAfter] || 'anders') + ' als vor einer Stunde.');
    }

    if (s.hunger < 30) parts.push('Der Futternapf wird ignoriert.');
    else if (s.hunger > 70) parts.push('Der Futternapf wurde besucht.');
    if (s.socialNeed > 75 && !b.environment.hasCompanion) parts.push('Kontaktrufe in die Stille.');
    if (s.boredom > 60) parts.push('Wenig Bewegung.');
    if (s.stress < 25 && s.safety > 55) parts.push('Entspannte Haltung, glattes Gefieder.');

    if (parts.length === 0) {
      parts.push('Eine ruhige Stunde. ' + name + ' sitzt auf der Stange.');
    }

    return parts.join(' ');
  }


  // =========================================================================
  // WELCOME BACK
  // =========================================================================

  function showWelcomeBack() {
    if (!brain || !brain.alive) return;

    const mood = brain.getDominantMood();
    const moodLabels = {
      content: 'zufrieden', neutral: 'ruhig', restless: 'unruhig',
      stressed: 'gestresst', crisis: 'in der Krise', sleeping: 'schlafend',
      sick: 'krank', dying: 'schwer krank',
    };
    const label = moodLabels[mood] || mood;

    showFeedback(
      'Tag ' + brain.day + ' mit ' + brain.name + '. Stimmung: ' + label + '.',
      mood === 'content' ? 'positive' : (mood === 'stressed' || mood === 'crisis') ? 'warning' : 'info'
    );
  }


  // =========================================================================
  // INTRO SCREEN
  // =========================================================================

  function showIntro() {
    document.getElementById('intro-screen').style.display = 'flex';
    document.getElementById('simulation-screen').style.display = 'none';
    document.getElementById('death-screen').style.display = 'none';

    document.getElementById('budgie-name').value = '';
    document.getElementById('budgie-color').selectedIndex = 0;
    document.getElementById('budgie-sex').selectedIndex = 0;

    updateIntroPreview();

    if (!introFormBound) {
      introFormBound = true;
      document.getElementById('intro-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('budgie-name').value.trim() || 'Pistazie';
        const color = document.getElementById('budgie-color').value;
        const sex = document.getElementById('budgie-sex').value;

        brain = BudgieEngine.BudgieBrain.createNew(name, color, sex);
        brain.save();

        // Reset knowledge for new game
        knowledge = [];
        saveKnowledge();

        showSimulation();
      });
    }
  }

  function updateIntroPreview() {
    const color = document.getElementById('budgie-color').value;
    const sex = document.getElementById('budgie-sex').value;
    const budgieEl = document.getElementById('intro-budgie');
    if (budgieEl) {
      const colors = BUDGIE_COLORS[color] || BUDGIE_COLORS['grün-gelb'];
      budgieEl.style.setProperty('--budgie-body', colors.body);
      budgieEl.style.setProperty('--budgie-body-dark', colors.bodyDark);
      budgieEl.style.setProperty('--budgie-head', colors.head);
      budgieEl.style.setProperty('--budgie-wing', colors.wing);
      budgieEl.style.setProperty('--budgie-chest', colors.chest);

      const cere = CERE_COLORS[sex] || CERE_COLORS['unbekannt'];
      const cereEl = budgieEl.querySelector('.budgie-cere');
      if (cereEl) cereEl.style.background = cere;
    }
  }


  // =========================================================================
  // SIMULATION SCREEN
  // =========================================================================

  function showSimulation() {
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('simulation-screen').style.display = 'block';
    document.getElementById('death-screen').style.display = 'none';

    // Apply budgie colors
    if (brain) {
      applyBudgieColors(brain.color, brain.sex);
    }

    updateUI();
  }


  /**
   * Main UI update — called after every action.
   */
  function updateUI() {
    if (!brain) return;

    // Death check
    if (!brain.alive) {
      showDeath();
      return;
    }

    // Header
    document.getElementById('header-name').textContent = brain.name;

    // Personality badges
    const badgesEl = document.getElementById('personality-badges');
    badgesEl.innerHTML = brain.personality.traits
      .map(t => '<span class="trait-pill">' + t + '</span>')
      .join('');

    // Time
    document.getElementById('sim-day').textContent = 'Tag ' + brain.day;
    document.getElementById('sim-clock').textContent =
      String(brain.hour).padStart(2, '0') + ':00';

    // Time theme
    updateTimeTheme();
    updateDayProgress();
    updateBudgieMood();
    updateNightStars();

    // Generate observation
    const obs = BudgieText.generateObservation(brain);

    // Store for on-demand access
    currentExplanation = obs.explanation;
    currentMonologue = obs.monologue;

    // Track explanation as knowledge
    if (obs.explanation) {
      addKnowledge(obs.explanation, 'science');
    }

    // Behavior line: first sentence only for compact display
    const behaviorLine = document.getElementById('behavior-line');
    if (behaviorLine) {
      const shortBehavior = truncateSentence(obs.behavior, 180);
      if (behaviorLine.textContent !== shortBehavior) {
        behaviorLine.style.opacity = '0';
        setTimeout(() => {
          behaviorLine.textContent = shortBehavior;
          behaviorLine.style.opacity = '1';
        }, 150);
      }
    }

    // State chips
    updateStateChips();

    // Vocal repertoire
    updateVocalRepertoire();

    // Event log
    updateEventLog();

    // Companion button text
    const companionBtn = document.getElementById('btn-companion');
    if (companionBtn) {
      const label = companionBtn.querySelector('.action-label');
      if (brain.environment.hasCompanion) {
        label.textContent = 'Partner weg';
      } else {
        label.textContent = 'Partner';
      }
    }

    // Companion badge
    const companionBadge = document.getElementById('companion-badge');
    const companionNameDisplay = document.getElementById('companion-name-display');
    if (brain.environment.hasCompanion) {
      companionBadge.classList.remove('hidden');
      companionNameDisplay.textContent = brain.environment.companionName;
    } else {
      companionBadge.classList.add('hidden');
    }

    // Knowledge counter
    updateKnowledgeCounter();

    // Save
    brain.save();
  }


  function truncateSentence(text, maxLen) {
    if (text.length <= maxLen) return text;
    // Find first sentence break
    const firstDot = text.indexOf('. ');
    if (firstDot > 0 && firstDot < maxLen) {
      return text.substring(0, firstDot + 1);
    }
    return text.substring(0, maxLen - 3) + '...';
  }


  function updateTimeTheme() {
    const body = document.body;
    const h = brain.hour;

    body.classList.remove('time-dawn', 'time-morning', 'time-midday',
      'time-afternoon', 'time-evening', 'time-night');

    if (h >= 5 && h < 8)       body.classList.add('time-dawn');
    else if (h >= 8 && h < 12)  body.classList.add('time-morning');
    else if (h >= 12 && h < 14) body.classList.add('time-midday');
    else if (h >= 14 && h < 18) body.classList.add('time-afternoon');
    else if (h >= 18 && h < 21) body.classList.add('time-evening');
    else                         body.classList.add('time-night');
  }


  function updateDayProgress() {
    const fill = document.getElementById('day-progress-fill');
    if (!fill) return;
    const pct = (brain.hour / 24) * 100;
    fill.style.width = pct + '%';
  }


  function updateNightStars() {
    const stars = document.getElementById('stars');
    if (!stars) return;
    const h = brain.hour;
    if (h >= 21 || h < 5) {
      stars.classList.remove('hidden');
    } else {
      stars.classList.add('hidden');
    }
  }


  function updateStateChips() {
    const container = document.getElementById('state-chips');
    if (!container) return;
    const signs = brain.getVisibleSigns();

    container.innerHTML = signs.map(s =>
      '<span class="state-chip ' + s.quality + '">' + s.area + ': ' + s.sign + '</span>'
    ).join('');
  }


  function updateEventLog() {
    const countEl = document.getElementById('event-count');
    const listEl = document.getElementById('event-list');
    if (!countEl || !listEl) return;

    const recentEvents = brain.log.slice(-20).reverse();
    countEl.textContent = '(' + recentEvents.length + ')';

    listEl.innerHTML = recentEvents.map(function(e) {
      const timeStr = 'Tag ' + e.day + ', ' + String(e.hour).padStart(2, '0') + ':00';
      return '<div class="event-item severity-' + e.severity + '">' +
        '<span class="event-time">' + timeStr + '</span>' +
        '<span>' + e.text + '</span>' +
        '</div>';
    }).join('');

    // Track milestones as knowledge
    recentEvents.forEach(function(e) {
      if (e.type === 'milestone') {
        addKnowledge(e.text, 'milestone');
      }
    });
  }


  function updateVocalRepertoire() {
    const container = document.getElementById('vocal-repertoire');
    const itemsEl = document.getElementById('vocal-items');
    if (!container || !itemsEl) return;

    const repertoire = brain.getVocalRepertoire();
    if (repertoire.length === 0) {
      container.classList.add('hidden');
      return;
    }

    container.classList.remove('hidden');

    const typeIcons = {
      contact: '\u266A', subsong: '\u266B', whistle: '\u266C', mimic: '\u223C',
      melody: '\u266A\u266B', word: '\u2606', sync: '\u21C4', duet: '\u266A\u266A',
    };

    itemsEl.innerHTML = repertoire.map(function(v) {
      var icon = typeIcons[v.type] || '\u266A';
      return '<div class="vocal-item" title="' + (v.detail || '') + '">' +
        '<span>' + icon + '</span>' +
        '<span>' + v.label + '</span>' +
        '<span class="vocal-day">Tag ' + v.learnedDay + '</span>' +
        '</div>';
    }).join('');
  }


  // =========================================================================
  // ACTIONS
  // =========================================================================

  function doAction(action) {
    if (!brain || !brain.alive) return;

    let result;
    let reaction = 'happy'; // default budgie reaction animation

    switch (action) {
      case 'water':
        result = brain.giveWater();
        reaction = 'happy';
        break;
      case 'clean':
        result = brain.cleanCage();
        reaction = 'shake';
        break;
      case 'vet':
        result = brain.visitVet();
        reaction = 'shake';
        break;
      case 'talk':
        result = brain.talk();
        reaction = 'happy';
        break;
      case 'companion':
        if (brain.environment.hasCompanion) {
          result = brain.removeCompanion();
        } else {
          showCompanionModal();
          return;
        }
        break;
      case 'freeflight':
        result = brain.allowFreeFlight();
        reaction = 'happy';
        break;
      case 'toy':
        result = brain.addToy();
        reaction = 'happy';
        break;
      case 'observe': {
        const moodBefore = brain.getDominantMood();
        result = brain.skip(1);
        const moodAfter = brain.getDominantMood();
        if (result.events.length === 0) {
          const quietObs = generateObserveSummary(brain, moodBefore, moodAfter);
          showFeedback(quietObs, 'info');
        }
        reaction = null; // no reaction for observing
        break;
      }
      case 'skip4':
        result = brain.skip(4);
        reaction = null;
        break;
      case 'skipday': {
        const h = brain.hour;
        const hoursUntilMorning = h < 8 ? (8 - h) : (24 - h + 8);
        result = brain.skip(hoursUntilMorning);
        reaction = null;
        break;
      }
      default:
        return;
    }

    // Trigger budgie reaction animation
    if (reaction) triggerBudgieReaction(reaction);

    // Show feedback
    const fb = extractFeedback(result);
    if (fb) showFeedback(fb.text, fb.severity);

    // Hide thought bubble on action
    const bubble = document.getElementById('thought-bubble');
    if (bubble) bubble.classList.add('hidden');

    updateUI();
  }


  // =========================================================================
  // FOOD MODAL
  // =========================================================================

  function showFoodModal() {
    const modal = document.getElementById('food-modal');
    const container = document.getElementById('food-options');

    const foodTypes = BudgieEngine.FOOD_TYPES;
    const qualityHints = {
      seeds:    { hint: 'Basis', cls: 'fair' },
      fresh:    { hint: 'Essentiell', cls: 'good' },
      millet:   { hint: 'Leckerli', cls: 'fair' },
      mineral:  { hint: 'Supplement', cls: 'good' },
      egg_food: { hint: 'Spezial', cls: 'good' },
    };

    container.innerHTML = Object.entries(foodTypes).map(function(entry) {
      var key = entry[0], food = entry[1];
      var q = qualityHints[key] || { hint: '', cls: '' };
      return '<div class="food-option" onclick="BudgieApp.feedBudgie(\'' + key + '\')">' +
        '<div>' +
          '<div class="food-name">' + food.label +
            (q.hint ? ' <span class="food-quality ' + q.cls + '">' + q.hint + '</span>' : '') +
          '</div>' +
          '<div class="food-desc">' + food.desc + '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    modal.classList.remove('hidden');
  }

  function closeFoodModal() {
    document.getElementById('food-modal').classList.add('hidden');
  }

  function feedBudgie(type) {
    closeFoodModal();
    if (!brain || !brain.alive) return;
    const result = brain.feed(type);
    triggerBudgieReaction('eat');
    const fb = extractFeedback(result);
    if (fb) showFeedback(fb.text, fb.severity);
    updateUI();
  }


  // =========================================================================
  // COMPANION MODAL
  // =========================================================================

  function showCompanionModal() {
    const modal = document.getElementById('companion-modal');
    const input = document.getElementById('companion-name-input');
    input.value = '';
    modal.classList.remove('hidden');
    setTimeout(function() { input.focus(); }, 100);
  }

  function closeCompanionModal() {
    document.getElementById('companion-modal').classList.add('hidden');
  }

  function confirmCompanion() {
    const input = document.getElementById('companion-name-input');
    const name = input.value.trim() || 'Kazooie';
    closeCompanionModal();
    if (!brain || !brain.alive) return;
    const result = brain.addCompanion(name);
    triggerBudgieReaction('happy');
    const fb = extractFeedback(result);
    if (fb) showFeedback(fb.text, fb.severity);
    updateUI();
  }


  // =========================================================================
  // ENVIRONMENT MODAL
  // =========================================================================

  function showEnvironmentModal() {
    const modal = document.getElementById('env-modal');
    const content = document.getElementById('env-modal-content');
    const env = brain.environment;

    content.innerHTML =
      '<h3>Umgebung</h3>' +

      '<div class="env-group">' +
        '<label>Käfigtyp</label>' +
        '<select onchange="BudgieApp.changeEnv(\'cageType\', this.value)">' +
          '<option value="cage_small"' + (env.cageType === 'cage_small' ? ' selected' : '') + '>Kleiner Käfig</option>' +
          '<option value="cage_medium"' + (env.cageType === 'cage_medium' ? ' selected' : '') + '>Mittlerer Käfig</option>' +
          '<option value="cage_large"' + (env.cageType === 'cage_large' ? ' selected' : '') + '>Großer Käfig</option>' +
          '<option value="aviary"' + (env.cageType === 'aviary' ? ' selected' : '') + '>Voliere</option>' +
        '</select>' +
      '</div>' +

      '<div class="env-group">' +
        '<label>Standort</label>' +
        '<select onchange="BudgieApp.changeEnv(\'roomType\', this.value)">' +
          '<option value="living_room"' + (env.roomType === 'living_room' ? ' selected' : '') + '>Wohnzimmer</option>' +
          '<option value="bedroom"' + (env.roomType === 'bedroom' ? ' selected' : '') + '>Schlafzimmer</option>' +
          '<option value="office"' + (env.roomType === 'office' ? ' selected' : '') + '>Büro</option>' +
          '<option value="kitchen"' + (env.roomType === 'kitchen' ? ' selected' : '') + '>Küche (!)</option>' +
        '</select>' +
      '</div>' +

      '<div class="env-group">' +
        '<label>Temperatur: <span id="temp-display">' + env.roomTemperature + ' Grad</span></label>' +
        '<input type="range" min="5" max="40" value="' + env.roomTemperature + '"' +
          ' oninput="document.getElementById(\'temp-display\').textContent = this.value + \' Grad\'"' +
          ' onchange="BudgieApp.changeEnv(\'roomTemperature\', parseInt(this.value))">' +
      '</div>' +

      '<div class="env-group">' +
        '<label>Lichtstunden: <span id="light-display">' + env.lightHours + 'h</span></label>' +
        '<input type="range" min="6" max="18" value="' + env.lightHours + '"' +
          ' oninput="document.getElementById(\'light-display\').textContent = this.value + \'h\'"' +
          ' onchange="BudgieApp.changeEnv(\'lightHours\', parseInt(this.value))">' +
      '</div>' +

      '<div class="toggle" onclick="BudgieApp.toggleEnv(\'hasUVLight\')">' +
        '<span class="toggle-label">UV-Lampe</span>' +
        '<span class="toggle-switch ' + (env.hasUVLight ? 'active' : '') + '"></span>' +
      '</div>' +

      '<div class="toggle" onclick="BudgieApp.toggleEnv(\'hasDrafts\')">' +
        '<span class="toggle-label">Zugluft</span>' +
        '<span class="toggle-switch ' + (env.hasDrafts ? 'active' : '') + '"></span>' +
      '</div>' +

      '<div class="toggle" onclick="BudgieApp.toggleEnv(\'coveredAtNight\')">' +
        '<span class="toggle-label">Nachts abgedeckt</span>' +
        '<span class="toggle-switch ' + (env.coveredAtNight ? 'active' : '') + '"></span>' +
      '</div>' +

      '<div class="toggle" onclick="BudgieApp.toggleEnv(\'hasForaging\')">' +
        '<span class="toggle-label">Futtersuche</span>' +
        '<span class="toggle-switch ' + (env.hasForaging ? 'active' : '') + '"></span>' +
      '</div>' +

      '<div class="toggle" onclick="BudgieApp.toggleEnv(\'hasMusic\')">' +
        '<span class="toggle-label">Musik</span>' +
        '<span class="toggle-switch ' + (env.hasMusic ? 'active' : '') + '"></span>' +
      '</div>' +

      '<div class="toggle" onclick="BudgieApp.toggleEnv(\'nearWindow\')">' +
        '<span class="toggle-label">Am Fenster</span>' +
        '<span class="toggle-switch ' + (env.nearWindow ? 'active' : '') + '"></span>' +
      '</div>' +

      '<button class="btn-confirm" onclick="BudgieApp.closeEnvironmentModal()" style="margin-top: var(--s4);">Fertig</button>';

    modal.classList.remove('hidden');
  }

  function closeEnvironmentModal() {
    document.getElementById('env-modal').classList.add('hidden');
    updateUI();
  }

  function changeEnv(key, value) {
    if (!brain || !brain.alive) return;
    const result = brain.setEnvironment(key, value);
    const fb = extractFeedback(result);
    if (fb) showFeedback(fb.text, fb.severity);
    updateUI();
    showEnvironmentModal(); // Refresh modal
  }

  function toggleEnv(key) {
    if (!brain || !brain.alive) return;
    const newValue = !brain.environment[key];
    const result = brain.setEnvironment(key, newValue);
    const fb = extractFeedback(result);
    if (fb) showFeedback(fb.text, fb.severity);
    updateUI();
    showEnvironmentModal();
  }


  // =========================================================================
  // KNOWLEDGE PANEL TOGGLE
  // =========================================================================

  function toggleKnowledgePanel() {
    const panel = document.getElementById('knowledge-panel');
    const bar = document.getElementById('knowledge-bar');
    if (!panel || !bar) return;

    knowledgePanelOpen = !knowledgePanelOpen;
    panel.classList.toggle('hidden', !knowledgePanelOpen);
    bar.classList.toggle('open', knowledgePanelOpen);

    if (knowledgePanelOpen) {
      renderKnowledgePanel();
    }
  }


  // =========================================================================
  // DEATH SCREEN
  // =========================================================================

  function showDeath() {
    document.getElementById('simulation-screen').style.display = 'none';
    document.getElementById('death-screen').style.display = 'flex';

    const deathInfo = BudgieText.generateDeathText(brain);

    document.getElementById('death-epitaph').textContent = deathInfo.epitaph;
    document.getElementById('death-lesson').textContent = deathInfo.lesson;

    // Add death lesson as knowledge
    addKnowledge(deathInfo.lesson, 'science');

    const statsEl = document.getElementById('death-stats');
    const s = deathInfo.stats;
    statsEl.innerHTML =
      '<div class="death-stat"><span class="death-stat-value">' + s.daysSurvived + '</span><span class="death-stat-label">Tage</span></div>' +
      '<div class="death-stat"><span class="death-stat-value">' + s.totalInteractions + '</span><span class="death-stat-label">Aktionen</span></div>' +
      '<div class="death-stat"><span class="death-stat-value">' + s.fedCount + '</span><span class="death-stat-label">Gefüttert</span></div>' +
      '<div class="death-stat"><span class="death-stat-value">' + s.vetVisits + '</span><span class="death-stat-label">Tierarzt</span></div>' +
      '<div class="death-stat"><span class="death-stat-value">' + s.worstStress + '%</span><span class="death-stat-label">Max. Stress</span></div>';

    document.body.classList.remove('time-dawn', 'time-morning', 'time-midday',
      'time-afternoon', 'time-evening');
    document.body.classList.add('time-night');
  }


  function restart() {
    localStorage.removeItem('budgieBrain');
    brain = null;
    document.getElementById('death-screen').style.display = 'none';
    showIntro();
  }


  // =========================================================================
  // EVENT LOG TOGGLE
  // =========================================================================

  function toggleLog() {
    const logEl = document.getElementById('event-log');
    logOpen = !logOpen;
    logEl.classList.toggle('open', logOpen);
  }


  // =========================================================================
  // INIT
  // =========================================================================

  document.addEventListener('DOMContentLoaded', init);


  // =========================================================================
  // PUBLIC API
  // =========================================================================

  return {
    doAction,
    showFoodModal,
    closeFoodModal,
    feedBudgie,
    showCompanionModal,
    closeCompanionModal,
    confirmCompanion,
    showEnvironmentModal,
    closeEnvironmentModal,
    changeEnv,
    toggleEnv,
    toggleLog,
    restart,
    showThoughtBubble,
    showExplanation,
    hideExplanation,
    toggleKnowledgePanel,

    // Debug
    getBrain: function() { return brain; },
  };

})();
