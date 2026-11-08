// datenloeschen.js – Knopf „Gespeicherte Daten löschen“ samt Rückfrage.
// Alles passiert im Gerät, es gibt keine Netzwerkanfrage.
import { clearAllQuizData } from "./whl.js";

const MELDUNG = "Erledigt. Alles ist gelöscht, du startest ganz frisch.";

function zeigeMeldung(text) {
  const bar = document.getElementById("snackbar");
  if (!bar) return;
  bar.textContent = text;
  bar.classList.add("is-visible");
  setTimeout(() => bar.classList.remove("is-visible"), 5000);
}

function baueDialog() {
  const dlg = document.createElement("dialog");
  dlg.className = "confirm-dialog";
  dlg.setAttribute("aria-labelledby", "confirm-title");
  dlg.setAttribute("aria-describedby", "confirm-text");
  dlg.innerHTML =
    '<h2 id="confirm-title">Wirklich löschen?</h2>' +
    '<p id="confirm-text">Highscores, gesehene Fragen und Tagesfrage werden auf diesem Gerät gelöscht. Fortfahren?</p>' +
    '<div class="confirm-actions">' +
    '<button type="button" class="ghost-btn" data-act="abbrechen">Abbrechen</button>' +
    '<button type="button" class="primary-btn" data-act="loeschen">Löschen</button>' +
    '</div>';
  document.body.appendChild(dlg);
  return dlg;
}

function frageUndLoesche(ausloeser) {
  const dlg = baueDialog();
  const schliessen = () => {
    dlg.close();
    dlg.remove();
    if (ausloeser) ausloeser.focus();
  };
  dlg.addEventListener("cancel", e => { e.preventDefault(); schliessen(); });
  dlg.addEventListener("click", async e => {
    if (e.target === dlg) { schliessen(); return; }
    const act = e.target.closest("[data-act]");
    if (!act) return;
    if (act.dataset.act === "abbrechen") { schliessen(); return; }
    act.disabled = true;
    await clearAllQuizData();
    // Neu laden; der Hinweis wird danach angezeigt. Das Quiz-Ergebnis gibt es nicht mehr,
    // deshalb geht es immer zur Startseite.
    location.replace(new URL("index.html?geloescht=1", location.href).href);
  });
  dlg.showModal();
  dlg.querySelector('[data-act="abbrechen"]').focus();
}

document.querySelectorAll("[data-clear-data]").forEach(btn => {
  btn.addEventListener("click", () => frageUndLoesche(btn));
});

if (new URLSearchParams(location.search).has("geloescht")) {
  zeigeMeldung(MELDUNG);
  history.replaceState(null, "", location.pathname);
}
