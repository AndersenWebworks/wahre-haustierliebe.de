/* ===== TIERKOMMUNIKATION — APP =====
   Navigation, FAQ und Kontaktformular-Handling.
   Keine externen Abhaengigkeiten, kein Tracking.
*/

(function () {
  "use strict";

  // --- Header Scrollschatten ---
  var header = document.getElementById("header");
  if (header) {
    var updateHeader = function () {
      if (window.scrollY > 8) { header.classList.add("scrolled"); }
      else { header.classList.remove("scrolled"); }
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  // --- Mobile Navigation Toggle ---
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      navToggle.setAttribute("aria-label", isOpen ? "Navigation schließen" : "Navigation öffnen");
    });
  }

  // --- Dropdown-Toggle (Mobile per Klick, Desktop per Hover via CSS) ---
  var dropdowns = document.querySelectorAll(".has-dropdown > .dropdown-trigger");
  dropdowns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var parent = btn.parentElement;
      if (!parent) { return; }
      // Nur auf Touch-Geraeten oder kleiner Viewport wirklich togglen
      if (window.matchMedia("(max-width: 900px)").matches || !window.matchMedia("(hover: hover)").matches) {
        var open = parent.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      }
    });
  });

  // --- Smooth Scroll fuer Anker-Links ---
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) { return; }
    var href = a.getAttribute("href");
    if (!href || href === "#") { return; }
    var target = document.querySelector(href);
    if (!target) { return; }
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (navLinks && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      if (navToggle) { navToggle.setAttribute("aria-expanded", "false"); }
    }
  });

  // --- Kontaktformular: Mailto-Fallback (kein Server-Backend) ---
  var form = document.getElementById("kontakt-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = document.getElementById("kontakt-msg");
      var data = {
        tier: form.elements["tier"].value,
        anliegen: form.elements["anliegen"].value,
        name: form.elements["name"].value,
        email: form.elements["email"].value,
        ort: form.elements["ort"].value || "",
        start: form.elements["start"].value || "",
        nachricht: form.elements["nachricht"].value,
        datenschutz: form.elements["datenschutz"].checked
      };
      if (!data.tier || !data.anliegen || !data.name || !data.email || !data.nachricht || !data.datenschutz) {
        if (msg) {
          msg.className = "form-msg error";
          msg.textContent = "Bitte alle Pflichtfelder ausfüllen und die Datenschutzhinweise bestätigen.";
        }
        return;
      }
      var subject = "Anfrage Tierkommunikation - " + data.anliegen;
      var body = [
        "Anliegen: " + data.anliegen,
        "Tier: " + data.tier,
        data.ort ? "Ort/Region: " + data.ort : null,
        data.start ? "Gewünschter Start: " + data.start : null,
        "",
        "Name: " + data.name,
        "E-Mail: " + data.email,
        "",
        "Nachricht:",
        data.nachricht
      ].filter(Boolean).join("\n");
      var mailto = "mailto:mail@annemarie-andersen.de"
                 + "?subject=" + encodeURIComponent(subject)
                 + "&body=" + encodeURIComponent(body);
      window.location.href = mailto;
      if (msg) {
        msg.className = "form-msg success";
        msg.textContent = "Ihr Mailprogramm öffnet sich mit einer vorbereiteten Nachricht. Falls nichts passiert, schreiben Sie bitte direkt an mail@annemarie-andersen.de.";
      }
      form.reset();
    });
  }

  // --- Aktuelles Jahr im Footer ---
  var yearNode = document.getElementById("footer-year");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
})();
