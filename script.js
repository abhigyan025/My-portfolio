// INK STYLE INTRO
window.addEventListener("load", () => {
  const el = document.getElementById("intro-name");
  const intro = document.getElementById("intro");

  const text = "Kumar Abhigyan";
  let i = 0;

  el.textContent = "";

  const t = setInterval(() => {
    el.textContent += text[i];
    i++;

    if (i >= text.length) {
      clearInterval(t);

      setTimeout(() => {
        intro.style.opacity = "0";
        setTimeout(() => intro.style.display = "none", 600);
      }, 700);
    }
  }, 90);
});

// MENU
function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}

// close menu on link click
document.querySelectorAll(".menu a").forEach(a => {
  a.addEventListener("click", () => {
    document.getElementById("menu").classList.remove("show");
  });
});

// DARK MODE
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// ESSAYS
const essays = [
  "<h2>On Clarity</h2><p>Clarity is built through observation.</p>",
  "<h2>Patterns</h2><p>Patterns repeat across systems.</p>",
  "<h2>Perception</h2><p>Reality shifts slowly beneath stability.</p>"
];

function openEssay(i) {
  document.getElementById("essayContent").innerHTML = essays[i];
  document.getElementById("readingMode").style.display = "block";
}

function closeReading(e) {
  if (!e || e.target.id === "readingMode") {
    document.getElementById("readingMode").style.display = "none";
  }
}

// DEMO
function openDemo(link) {
  document.getElementById("demoModal").style.display = "block";
  document.getElementById("demoFrame").src = link;
}

function closeDemo(e) {
  if (!e || e.target.id === "demoModal") {
    document.getElementById("demoModal").style.display = "none";
    document.getElementById("demoFrame").src = "";
  }
}
