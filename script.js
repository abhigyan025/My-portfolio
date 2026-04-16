window.onload = () => {
  let name = document.getElementById("intro-name");
  let intro = document.getElementById("intro");

  let text = "Kumar Abhigyan";
  let i = 0;

  name.textContent = "";

  let t = setInterval(() => {
    name.textContent += text[i];
    i++;

    if (i >= text.length) {
      clearInterval(t);
      setTimeout(() => intro.style.display = "none", 800);
    }
  }, 80);
};

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
  `<h2>On Clarity</h2><p>Clarity is built slowly through observation.</p>`,
  `<h2>Patterns & Systems</h2><p>Patterns repeat across contexts.</p>`,
  `<h2>Perception vs Reality</h2><p>What seems stable is always shifting.</p>`
];

function openEssay(i) {
  document.getElementById("essayContent").innerHTML = essays[i];
  document.getElementById("readingMode").style.display = "block";
}

// READING MODE CLOSE
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
