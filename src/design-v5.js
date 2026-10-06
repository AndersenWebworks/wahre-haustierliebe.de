/* DESIGN V5 – Lexikon: kleine Bausteine, die ohne JavaScript als normaler Text lesbar bleiben. */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  /* Inhaltsverzeichnis: aktuellen Abschnitt markieren */
  function initTocSpy() {
    var toc = document.querySelector('.article-toc-list');
    if (!toc || !('IntersectionObserver' in window)) return;
    var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
    var map = {};
    links.forEach(function (a) { map[decodeURIComponent(a.getAttribute('href').slice(1))] = a; });
    var targets = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    if (!targets.length) return;
    var current = null;
    function mark(id) {
      if (current === id) return;
      current = id;
      links.forEach(function (a) { a.classList.remove('is-current'); a.removeAttribute('aria-current'); });
      if (map[id]) { map[id].classList.add('is-current'); map[id].setAttribute('aria-current', 'location'); }
    }
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      for (var i = 0; i < targets.length; i++) {
        if (visible[targets[i].id]) { mark(targets[i].id); return; }
      }
    }, { rootMargin: '-90px 0px -60% 0px', threshold: 0 });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* Tierart-Weiche */
  function initTierweiche() {
    document.querySelectorAll('.tierweiche').forEach(function (box, n) {
      var panels = Array.prototype.slice.call(box.querySelectorAll('.tierweiche-panel'));
      if (panels.length < 2) return;
      var old = box.querySelector('.tierweiche-tabs');
      if (old) old.parentNode.removeChild(old);
      var tabs = document.createElement('div');
      tabs.className = 'tierweiche-tabs';
      tabs.setAttribute('role', 'tablist');
      tabs.setAttribute('aria-label', 'Tierart wählen');
      var buttons = panels.map(function (panel, i) {
        var b = document.createElement('button');
        var id = 'tw' + n + '-' + i;
        b.type = 'button';
        b.id = id + '-tab';
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-controls', id);
        b.textContent = panel.getAttribute('data-label') || ('Tier ' + (i + 1));
        panel.id = id;
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', id + '-tab');
        tabs.appendChild(b);
        return b;
      });
      function select(i, focus) {
        panels.forEach(function (p, k) {
          var on = k === i;
          p.classList.toggle('is-active', on);
          buttons[k].setAttribute('aria-selected', on ? 'true' : 'false');
          buttons[k].tabIndex = on ? 0 : -1;
        });
        if (focus) buttons[i].focus();
      }
      buttons.forEach(function (b, i) {
        b.addEventListener('click', function () { select(i, false); });
        b.addEventListener('keydown', function (e) {
          var k = e.key;
          if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); select((i + 1) % buttons.length, true); }
          else if (k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); select((i - 1 + buttons.length) % buttons.length, true); }
          else if (k === 'Home') { e.preventDefault(); select(0, true); }
          else if (k === 'End') { e.preventDefault(); select(buttons.length - 1, true); }
        });
      });
      var anchor = box.querySelector('.tierweiche-hint');
      if (anchor && anchor.nextSibling) box.insertBefore(tabs, anchor.nextSibling);
      else box.insertBefore(tabs, panels[0]);
      box.classList.add('is-enhanced');
      select(0, false);
    });
  }

  /* Urlaubsplan: abhaken, Fortschritt zeigen, Stand nur lokal im Browser merken */
  function initPlans() {
    document.querySelectorAll('.urlaubsplan[data-plan]').forEach(function (plan) {
      var key = 'whl-plan-' + plan.getAttribute('data-plan');
      var boxes = Array.prototype.slice.call(plan.querySelectorAll('input[type="checkbox"]'));
      var label = plan.querySelector('.urlaubsplan-count');
      var bar = plan.querySelector('.urlaubsplan-bar > span');
      var barWrap = plan.querySelector('.urlaubsplan-bar');
      var saved = [];
      try { saved = JSON.parse(window.localStorage.getItem(key) || '[]'); } catch (e) { saved = []; }
      boxes.forEach(function (b) { b.checked = saved.indexOf(b.value) !== -1; });

      function update(persist) {
        var done = boxes.filter(function (b) { return b.checked; });
        if (label) label.textContent = done.length + ' von ' + boxes.length + ' erledigt';
        if (bar) bar.style.width = (boxes.length ? Math.round(done.length / boxes.length * 100) : 0) + '%';
        if (barWrap) {
          barWrap.setAttribute('role', 'progressbar');
          barWrap.setAttribute('aria-valuemin', '0');
          barWrap.setAttribute('aria-valuemax', String(boxes.length));
          barWrap.setAttribute('aria-valuenow', String(done.length));
        }
        plan.classList.toggle('is-complete', boxes.length > 0 && done.length === boxes.length);
        if (persist) {
          try { window.localStorage.setItem(key, JSON.stringify(done.map(function (b) { return b.value; }))); } catch (e) { /* Speicher gesperrt: Plan funktioniert trotzdem */ }
        }
      }
      boxes.forEach(function (b) { b.addEventListener('change', function () { update(true); }); });

      var reset = plan.querySelector('[data-plan-reset]');
      if (reset) reset.addEventListener('click', function () {
        boxes.forEach(function (b) { b.checked = false; });
        update(true);
      });
      var print = plan.querySelector('[data-plan-print]');
      if (print) print.addEventListener('click', function () { window.print(); });
      update(false);
    });
  }

  /* Eingabefelder, die nur lokal im Browser gemerkt werden */
  function initSavedFields() {
    document.querySelectorAll('input[data-save]').forEach(function (input) {
      var key = input.getAttribute('data-save');
      try { input.value = window.localStorage.getItem(key) || ''; } catch (e) { /* Speicher gesperrt */ }
      input.addEventListener('input', function () {
        try { window.localStorage.setItem(key, input.value); } catch (e) { /* Speicher gesperrt */ }
      });
    });
  }

  ready(function () {
    initSavedFields();
    initTocSpy();
    initTierweiche();
    initPlans();
  });
})();
