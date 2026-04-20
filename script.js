/* =========================
SAFE HELPERS
========================= */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

/* =========================
INTRO (TYPE + REMOVE)
========================= */
const intro = $("#intro");
const introName = $("#intro-name");

if (intro && introName) {
const text = "Kumar Abhigyan";
let i = 0;

const type = () => {
if (i < text.length) {
introName.textContent += text[i];
i++;
setTimeout(type, 60);
}
};

type();

setTimeout(() => {
intro.style.opacity = "0";
setTimeout(() => intro.remove(), 600);
}, 3200);
}

/* =========================
MENU SYSTEM (NO BUGS)
========================= */
const menuBtn = $("#menuBtn");
const menu = $("#menu");

if (menuBtn && menu) {

menuBtn.addEventListener("click", (e) => {
e.stopPropagation();
menu.classList.toggle("active");
});

/* close on link click */
$$("#menu a").forEach(link => {
link.addEventListener("click", () => {
menu.classList.remove("active");
});
});

/* click outside closes menu */
document.addEventListener("click", (e) => {
if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
menu.classList.remove("active");
}
});
}

/* =========================
SCROLL REVEAL ANIMATION
========================= */
const reveals = $$(".reveal");

if (reveals.length) {
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add("active");
observer.unobserve(entry.target);
}
});
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));
}

/* =========================
DEMO MODAL SYSTEM
========================= */
const modal = $("#demoModal");
const frame = $("#demoFrame");
const closeDemo = $("#closeDemo");

const openModal = (link) => {
if (!modal || !frame) return;
frame.src = link;
modal.classList.add("active");
document.body.style.overflow = "hidden";
};

const closeModal = () => {
if (!modal || !frame) return;
modal.classList.remove("active");
frame.src = "";
document.body.style.overflow = "";
};

/* attach to buttons */
$$(".demoBtn").forEach(btn => {
btn.addEventListener("click", () => {
const link = btn.dataset.demo;
if (link) openModal(link);
});
});

if (closeDemo) closeDemo.addEventListener("click", closeModal);

if (modal) {
modal.addEventListener("click", (e) => {
if (e.target === modal) closeModal();
});
}

/* =========================
ABOUT TOGGLE
========================= */
const aboutBtn = $("#aboutBtn");
const aboutMore = $("#about-more");

if (aboutBtn && aboutMore) {
aboutBtn.addEventListener("click", () => {
aboutMore.classList.toggle("open");

aboutBtn.textContent =
  aboutMore.classList.contains("open")
    ? "Read Less"
    : "Read More";

});
}

/* =========================
READING MODE (ESSAYS)
========================= */
const readingMode = $("#readingMode");
const closeReading = $("#closeReading");

const openReading = (targetId) => {
const target = document.getElementById(targetId);
if (!target || !readingMode) return;

/* hide all essays */
$$(".essay-full").forEach(e => e.style.display = "none");

target.style.display = "block";

readingMode.classList.add("active");
document.body.style.overflow = "hidden";

window.scrollTo({ top: 0, behavior: "smooth" });
};

$$(".essayBtn").forEach(btn => {
btn.addEventListener("click", () => {
const target = btn.dataset.target;
if (target) openReading(target);
});
});

/* close reading */
if (closeReading && readingMode) {
closeReading.addEventListener("click", () => {
readingMode.classList.remove("active");
document.body.style.overflow = "";
});
}

/* =========================
GLOBAL READING TOGGLE
========================= */
const readingToggle = $("#readingToggle");

if (readingToggle && readingMode) {
readingToggle.addEventListener("click", () => {
readingMode.classList.toggle("active");

document.body.style.overflow =
  readingMode.classList.contains("active")
    ? "hidden"
    : "";

});
}

/* =========================
DARK MODE (SAFE)
========================= */
const darkToggle = $("#darkToggle");

if (darkToggle) {
darkToggle.addEventListener("click", () => {
document.body.classList.toggle("dark");
});
}

/* =========================
PAGE LOAD FIX
========================= */
window.addEventListener("load", () => {
window.scrollTo(0, 0);
});

/* =========================
FAILSAFE (NO CRASH)
========================= */
window.addEventListener("error", (e) => {
console.warn("Non-critical JS issue:", e.message);
});
