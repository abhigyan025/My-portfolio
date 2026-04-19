/* =========================
INTRO TYPING EFFECT
========================= */
const introName = document.getElementById("intro-name");
const intro = document.getElementById("intro");

const nameText = "Kumar Abhigyan";
let i = 0;

function typeIntro(){
if(i < nameText.length){
introName.textContent += nameText.charAt(i);
i++;
setTimeout(typeIntro, 80);
}
}
typeIntro();

/* Remove intro after animation */
setTimeout(()=>{
if(intro){
intro.style.opacity = "0";
setTimeout(()=> intro.style.display = "none", 600);
}
}, 3500);

/* =========================
MENU TOGGLE
========================= */
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", ()=>{
menu.classList.toggle("active");
});

/* Close menu on link click */
document.querySelectorAll("#menu a").forEach(link=>{
link.addEventListener("click", ()=>{
menu.classList.remove("active");
});
});

/* =========================
SCROLL REVEAL ANIMATION
========================= */
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("active");
}
});
},{threshold:0.15});

reveals.forEach(el=> observer.observe(el));

/* =========================
DEMO MODAL
========================= */
const demoBtns = document.querySelectorAll(".demoBtn");
const modal = document.getElementById("demoModal");
const frame = document.getElementById("demoFrame");
const closeDemo = document.getElementById("closeDemo");

demoBtns.forEach(btn=>{
btn.addEventListener("click", ()=>{
const link = btn.getAttribute("data-demo");
frame.src = link;
modal.classList.add("active");
});
});

closeDemo.addEventListener("click", ()=>{
modal.classList.remove("active");
frame.src = "";
});

/* Close modal on outside click */
modal.addEventListener("click", (e)=>{
if(e.target === modal){
modal.classList.remove("active");
frame.src = "";
}
});

/* =========================
ABOUT READ MORE
========================= */
const aboutBtn = document.getElementById("aboutBtn");
const aboutMore = document.getElementById("about-more");

if(aboutBtn){
aboutBtn.addEventListener("click", ()=>{
aboutMore.classList.toggle("open");
aboutBtn.textContent = aboutMore.classList.contains("open")
? "Read Less"
: "Read More";
});
}

/* =========================
READING MODE (ESSAYS)
========================= */
const essayBtns = document.querySelectorAll(".essayBtn");
const readingMode = document.getElementById("readingMode");
const closeReading = document.getElementById("closeReading");

essayBtns.forEach(btn=>{
btn.addEventListener("click", ()=>{
const targetId = btn.getAttribute("data-target");

document.querySelectorAll(".essay-full").forEach(e=>{
  e.style.display = "none";
});

const selected = document.getElementById(targetId);
if(selected){
  selected.style.display = "block";
  readingMode.classList.add("active");
  window.scrollTo(0,0);
}

});
});

/* Close reading mode */
closeReading.addEventListener("click", ()=>{
readingMode.classList.remove("active");
});

/* =========================
DARK MODE
========================= */
const darkToggle = document.getElementById("darkToggle");

darkToggle.addEventListener("click", ()=>{
document.body.classList.toggle("dark");
});

/* =========================
GLOBAL READING MODE TOGGLE
========================= */
const readingToggle = document.getElementById("readingToggle");

readingToggle.addEventListener("click", ()=>{
readingMode.classList.toggle("active");
});

/* =========================
PREVENT SCROLL GLITCHS
========================= */
window.addEventListener("load", ()=>{
window.scrollTo(0,0);
});
