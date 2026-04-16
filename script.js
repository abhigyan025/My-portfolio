// =========================
// INTRO (SMOOTH + FADE)
// =========================
window.addEventListener("load", () => {

const intro = document.getElementById("intro");
const name = document.getElementById("intro-name");

let text = "Kumar Abhigyan";
let i = 0;

setTimeout(() => {

const typing = setInterval(() => {
  name.innerText = text.slice(0, i);
  i++;

  if (i > text.length) {
    clearInterval(typing);

    setTimeout(() => {
      intro.style.opacity = "0";
      setTimeout(() => {
        intro.style.display = "none";
      }, 600);
    }, 500);
  }
}, 70);

}, 600);
});

// =========================
// MENU (SMOOTH OPEN)
// =========================
function toggleMenu(){
const menu = document.getElementById("menu");
menu.classList.toggle("show");

document.body.style.overflow =
menu.classList.contains("show") ? "hidden" : "auto";
}

// =========================
// SMOOTH SCROLL
// =========================
document.querySelectorAll("a[href^='#']").forEach(link => {
link.addEventListener("click", e => {
e.preventDefault();
document.querySelector(link.getAttribute("href"))
.scrollIntoView({ behavior: "smooth" });
});
});

// =========================
// REVEAL (STAGGERED)
// =========================
const elements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
entries.forEach((entry, index) => {
if(entry.isIntersecting){
setTimeout(() => {
entry.target.classList.add("active");
}, index * 120);
}
});
}, { threshold: 0.15 });

elements.forEach(el => observer.observe(el));

// =========================
// PARALLAX HERO (SUBTLE)
// =========================
window.addEventListener("scroll", () => {
const hero = document.querySelector(".hero");
if(!hero) return;

let y = window.scrollY;
hero.style.transform = "translateY(${y * 0.15}px)";
hero.style.opacity = 1 - y / 500;
});
