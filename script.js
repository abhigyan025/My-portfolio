/* =========================
SAFE SELECTOR HELPER
========================= */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

/* =========================
INTRO (TYPE + CLEAN EXIT)
========================= */
const intro = $("#intro");
const introName = $("#intro-name");

const nameText = "Kumar Abhigyan";
let idx = 0;

function typeIntro(){
if(!introName) return;
if(idx < nameText.length){
introName.textContent += nameText[idx];
idx++;
setTimeout(typeIntro, 70);
}
}
typeIntro();

/* Remove intro smoothly */
setTimeout(()=>{
if(intro){
intro.style.opacity = "0";
setTimeout(()=> intro.remove(), 700);
}
}, 3200);

/* =========================
MENU (NO STUCK BUG)
========================= */
const menuBtn = $("#menuBtn");
const menu = $("#menu");

if(menuBtn && menu){
menuBtn.addEventListener("click", (e)=>{
e.stopPropagation();
menu.classList.toggle("active");
});

/* Close on link click */
$$("#menu a").forEach(link=>{
link.addEventListener("click", ()=>{
menu.classList.remove("active");
});
});

/* Close when clicking outside */
document.addEventListener("click", (e)=>{
if(!menu.contains(e.target) && !menuBtn.contains(e.target)){
menu.classList.remove("active");
}
});
}

/* =========================
SCROLL REVEAL (SMOOTH)
========================= */
const reveals = $$(".reveal");

if(reveals.length){
const observer = new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("active");
observer.unobserve(entry.target); // animate once only
}
});
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));
}

/* =========================
DEMO MODAL (ROBUST)
========================= */
const modal = $("#demoModal");
const frame = $("#demoFrame");
const closeDemo = $("#closeDemo");

$$(".demoBtn").forEach(btn=>{
btn.addEventListener("click", ()=>{
const link = btn.dataset.demo;
if(!link) return;

frame.src = link;
modal.classList.add("active");
document.body.style.overflow = "hidden";

});
});

function closeModal(){
if(modal){
modal.classList.remove("active");
if(frame) frame.src = "";
document.body.style.overflow = "";
}
}

if(closeDemo) closeDemo.addEventListener("click", closeModal);

if(modal){
modal.addEventListener("click", (e)=>{
if(e.target === modal) closeModal();
});
}

/* =========================
ABOUT (READ MORE CLEAN)
========================= */
const aboutBtn = $("#aboutBtn");
const aboutMore = $("#about-more");

if(aboutBtn && aboutMore){
aboutBtn.addEventListener("click", ()=>{
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

$$(".essayBtn").forEach(btn=>{
btn.addEventListener("click", ()=>{
const target = btn.dataset.target;

/* hide all essays */
$$(".essay-full").forEach(e=>{
  e.style.display = "none";
});

const selected = document.getElementById(target);
if(selected){
  selected.style.display = "block";
  readingMode.classList.add("active");
  document.body.style.overflow = "hidden";
  window.scrollTo({ top:0, behavior:"smooth" });
}

});
});

/* close reading mode */
if(closeReading){
closeReading.addEventListener("click", ()=>{
readingMode.classList.remove("active");
document.body.style.overflow = "";
});
}

/* =========================
GLOBAL READING TOGGLE
========================= */
const readingToggle = $("#readingToggle");

if(readingToggle && readingMode){
readingToggle.addEventListener("click", ()=>{
readingMode.classList.toggle("active");

document.body.style.overflow =
  readingMode.classList.contains("active")
  ? "hidden"
  : "";

});
}

/* =========================
DARK MODE (CLEAN TOGGLE)
========================= */
const darkToggle = $("#darkToggle");

if(darkToggle){
darkToggle.addEventListener("click", ()=>{
document.body.classList.toggle("dark");
});
}

/* =========================
EASTER EGG (SUBTLE ONLY)
========================= /
/ No interaction needed — CSS handles subtle visibility */

/* =========================
LOAD FIX (NO JUMP BUG)
========================= */
window.addEventListener("load", ()=>{
window.scrollTo(0,0);
});

/* =========================
FAILSAFE (NO JS BREAK)
========================= */
window.addEventListener("error", (e)=>{
console.warn("Non-critical JS error:", e.message);
});
