// Simple slideshow: arrows / space / clicker to move, F = full screen,
// N = speaker notes, click a diagram to zoom.

const stage = document.getElementById("stage");
const slides = document.querySelectorAll(".slide");
const counter = document.getElementById("counter");
const progressBar = document.getElementById("progress-bar");
const notes = document.getElementById("notes");
const lightbox = document.getElementById("lightbox");

// Start on the slide in the URL (e.g. index.html#5) so a refresh keeps your place
let current = Math.min(Math.max(parseInt(location.hash.slice(1)) || 1, 1), slides.length) - 1;

function show(index) {
  current = Math.min(Math.max(index, 0), slides.length - 1);
  slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
  counter.textContent = current + 1 + " / " + slides.length;
  progressBar.style.width = ((current + 1) / slides.length) * 100 + "%";
  notes.textContent = slides[current].dataset.notes || "No notes for this slide.";
  history.replaceState(null, "", "#" + (current + 1));
}

function next() {
  show(current + 1);
}

function prev() {
  show(current - 1);
}

// Scale the 1600x900 stage to fit the window
function fit() {
  const scale = Math.min(window.innerWidth / 1600, window.innerHeight / 900);
  stage.style.transform = "translate(-50%, -50%) scale(" + scale + ")";
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
}

function toggleNotes() {
  notes.hidden = !notes.hidden;
}

function openZoom(img) {
  lightbox.querySelector("img").src = img.src;
  lightbox.querySelector("img").alt = img.alt;
  lightbox.hidden = false;
}

function closeZoom() {
  lightbox.hidden = true;
}

// ---------- Keyboard (also works with presentation clickers) ----------
document.addEventListener("keydown", (e) => {
  if (!lightbox.hidden) {
    if (e.key === "Escape" || e.key === " " || e.key === "Enter") closeZoom();
    return;
  }
  switch (e.key) {
    case "ArrowRight":
    case "ArrowDown":
    case "PageDown":
    case " ":
    case "Enter":
      e.preventDefault();
      next();
      break;
    case "ArrowLeft":
    case "ArrowUp":
    case "PageUp":
    case "Backspace":
      e.preventDefault();
      prev();
      break;
    case "Home":
      show(0);
      break;
    case "End":
      show(slides.length - 1);
      break;
    case "f":
    case "F":
      toggleFullscreen();
      break;
    case "n":
    case "N":
      toggleNotes();
      break;
  }
});

// ---------- Mouse / touch ----------
// Click a diagram to zoom; click anywhere else on a slide to go forward
stage.addEventListener("click", (e) => {
  if (e.target.closest("a, button")) return;
  if (e.target.matches(".diagram img")) {
    openZoom(e.target);
    return;
  }
  next();
});

// Swipe left/right on touch screens
let touchX = null;
stage.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
stage.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
  touchX = null;
});

document.getElementById("next").addEventListener("click", next);
document.getElementById("prev").addEventListener("click", prev);
document.getElementById("notes-btn").addEventListener("click", toggleNotes);
document.getElementById("full-btn").addEventListener("click", toggleFullscreen);
lightbox.addEventListener("click", closeZoom);
window.addEventListener("resize", fit);
window.addEventListener("hashchange", () => show((parseInt(location.hash.slice(1)) || 1) - 1));

fit();
show(current);
