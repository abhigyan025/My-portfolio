// =========================
// INTRO (CINEMATIC TYPE)
// =========================
window.addEventListener("load", () => {

const text = "Kumar Abhigyan";
let i = 0;

const line = document.getElementById("intro-line");
const name = document.getElementById("intro-name");
const intro = document.getElementById("intro");

setTimeout(() => {
if(line) line.style.opacity = "0";

const typing = setInterval(() => {
  if(name){
    name.innerText = text.slice(0, i) + "|";
  }
  i++;

  if(i > text.length){
    clearInterval(typing);

    setTimeout(() => {
      if(intro){
        intro.style.opacity = "0";
        setTimeout(() => {
          intro.style.display = "none";
        }, 500);
      }
    }, 600);
  }
}, 55);

}, 900);

});

// =========================
// MENU SYSTEM (PREMIUM)
// =========================
function toggleMenu(){
const menu = document.getElementById("menu");

if(!menu) return;

menu.classList.toggle("show");

// lock scroll when menu open
if(menu.classList.contains("show")){
document.body.style.overflow = "hidden";
} else {
document.body.style.overflow = "auto";
}
}

// close menu when clicking a link
document.querySelectorAll(".menu a").forEach(link => {
link.addEventListener("click", () => {
const menu = document.getElementById("menu");
if(menu){
menu.classList.remove("show");
document.body.style.overflow = "auto";
}
});
});

// =========================
// ABOUT TOGGLE
// =========================
function toggleAbout(){
const el = document.getElementById("about-more");
if(!el) return;

if(el.style.display === "block"){
el.style.display = "none";
} else {
el.style.display = "block";
}
}

// =========================
// ESSAY TOGGLE
// =========================
function toggleEssay(){
const el = document.getElementById("essay-more");
if(!el) return;

if(el.style.display === "block"){
el.style.display = "none";
} else {
el.style.display = "block";
}
}

// =========================
// SCROLL REVEAL (STAGGERED)
// =========================
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
entries.forEach((entry, index) => {

if(entry.isIntersecting){

  // stagger delay
  setTimeout(() => {
    entry.target.classList.add("active");
  }, index * 120);

}

});
}, {
threshold: 0.15
});

revealElements.forEach(el => observer.observe(el));

// =========================
// SUBTLE SCROLL FADE (HERO)
// =========================
window.addEventListener("scroll", () => {
const hero = document.querySelector(".hero");
if(!hero) return;

const scrollY = window.scrollY;

hero.style.opacity = 1 - scrollY / 600;
hero.style.transform = "translateY(${scrollY * 0.2}px)";
});

// =========================
// BUTTON MICRO INTERACTION
// =========================
document.querySelectorAll(".btns a").forEach(btn => {

btn.addEventListener("mouseenter", () => {
btn.style.transform = "translateY(-3px) scale(1.02)";
});

btn.addEventListener("mouseleave", () => {
btn.style.transform = "translateY(0) scale(1)";
});

});

// =========================
// SAFETY CHECK LOG
// =========================
console.log("Elite system loaded successfully.");
