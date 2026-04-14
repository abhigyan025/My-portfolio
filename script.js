// ================= INTRO SEQUENCE =================

const introLine = document.getElementById("intro-line");
const introName = document.getElementById("intro-name");
const intro = document.getElementById("intro");

const nameText = "Kumar Abhigyan";
let index = 0;

// Step 1: Fade out "Clarity takes time."
setTimeout(() => {
introLine.style.opacity = "0";

// Step 2: Start typing name
setTimeout(() => {
    const typing = setInterval(() => {
        introName.innerText = nameText.slice(0, index) + "|";
        index++;

        if (index > nameText.length) {
            clearInterval(typing);

            // Remove cursor after short pause
            setTimeout(() => {
                introName.innerText = nameText;

                // Step 3: Fade out intro
                setTimeout(() => {
                    intro.style.opacity = "0";
                    setTimeout(() => {
                        intro.style.display = "none";
                    }, 500);
                }, 600);

            }, 500);
        }

    }, 55); // typing speed

}, 300);

}, 1000);

// ================= HERO TEXT ROTATION =================

const lines = [
"Observing systems and power",
"Clarity over noise",
"Understanding what shifts beneath the surface",
"Thinking beyond reactions"
];

let lineIndex = 0;
const rotateEl = document.getElementById("rotate");

function rotateText() {
rotateEl.style.opacity = "0";

setTimeout(() => {
    rotateEl.innerText = lines[lineIndex];
    rotateEl.style.opacity = "1";

    lineIndex = (lineIndex + 1) % lines.length;
}, 300);

}

// initial
rotateEl.innerText = lines[0];

// loop
setInterval(rotateText, 3200);

// ================= MENU TOGGLE =================

const menu = document.getElementById("menu");

function toggleMenu() {
menu.classList.toggle("show");
}

// close menu when clicking link
document.querySelectorAll("#menu a").forEach(link => {
link.addEventListener("click", () => {
menu.classList.remove("show");
});
});

// ================= ABOUT TOGGLE =================

function toggleAbout() {
const about = document.getElementById("about-more");

if (about.style.display === "block") {
    about.style.display = "none";
} else {
    about.style.display = "block";
}

}

// ================= ESSAY TOGGLE =================

function toggleEssay() {
const essay = document.getElementById("essay-more");

if (essay.style.display === "block") {
    essay.style.display = "none";
} else {
    essay.style.display = "block";
}

}
