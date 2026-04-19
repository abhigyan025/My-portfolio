// ================= INTRO =================
window.addEventListener("load", () => {
const intro = document.getElementById("intro");
const name = document.getElementById("intro-name");

if (!intro || !name) return;

let text = "Kumar Abhigyan";
let i = 0;

const typing = setInterval(() => {
    if (i < text.length) {
        name.textContent += text[i];
        i++;
    } else {
        clearInterval(typing);

        setTimeout(() => {
            intro.style.opacity = "0";

            setTimeout(() => {
                intro.style.display = "none";
            }, 600);

        }, 700);
    }
}, 70);

});

// ================= MENU =================
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");

if (menuBtn && menu) {
menuBtn.addEventListener("click", () => {
menu.classList.toggle("show");
});
}

// CLOSE MENU ON LINK CLICK
document.querySelectorAll("#menu a").forEach(link => {
link.addEventListener("click", () => {
menu.classList.remove("show");
});
});

// ================= DARK MODE =================
const darkToggle = document.getElementById("darkToggle");

if (darkToggle) {
darkToggle.addEventListener("click", () => {
document.body.classList.toggle("dark");
});
}

// ================= ABOUT TOGGLE =================
const aboutBtn = document.getElementById("aboutBtn");

if (aboutBtn) {
aboutBtn.addEventListener("click", () => {
const aboutMore = document.getElementById("about-more");

    if (!aboutMore) return;

    if (aboutMore.style.maxHeight) {
        aboutMore.style.maxHeight = null;
    } else {
        aboutMore.style.maxHeight = aboutMore.scrollHeight + "px";
    }
});

}

// ================= ESSAYS =================
const essays = [
`

<h2>Clarity</h2>
<p>Clarity is not immediate. It is built through sustained observation, reflection, and the gradual removal of noise.</p>
<p>It requires patience — the ability to sit with uncertainty long enough for patterns to emerge.</p>
<p>Over time, what once felt complex begins to reveal structure, and what was hidden becomes visible.</p>
`,`

<h2>Patterns & Systems</h2>
<p>Patterns exist across systems, regardless of domain.</p>
<p>When structures remain similar, outcomes tend to repeat — even if the surface appears different.</p>
<p>Understanding these patterns allows deeper insight into behavior, beyond isolated events.</p>
`,`

<h2>Perception vs Reality</h2>
<p>Perception is often shaped by immediacy, while reality unfolds over time.</p>
<p>What appears stable may already be shifting beneath the surface.</p>
<p>Recognizing this difference is essential to understanding change.</p>
`
];const readingMode = document.getElementById("readingMode");
const essayContent = document.getElementById("essayContent");

// OPEN ESSAY
document.querySelectorAll(".essayBtn").forEach(btn => {
btn.addEventListener("click", () => {
const id = btn.dataset.id;

    if (!readingMode || !essayContent) return;

    readingMode.style.display = "block";
    essayContent.innerHTML = essays[id] || "";

    document.body.style.overflow = "hidden";
});

});

// CLOSE READING MODE
const closeReading = document.getElementById("closeReading");

if (closeReading) {
closeReading.addEventListener("click", () => {
readingMode.style.display = "none";
document.body.style.overflow = "auto";
});
}

// ================= READING MODE TOGGLE (MENU) =================
const readingToggle = document.getElementById("readingToggle");

if (readingToggle) {
readingToggle.addEventListener("click", () => {
if (!readingMode) return;

    readingMode.style.display = "block";
    essayContent.innerHTML = "<h2>Reading Mode</h2><p>Select an essay to begin reading.</p>";

    document.body.style.overflow = "hidden";
    menu.classList.remove("show");
});

}

// ================= DEMO MODAL =================
const demoModal = document.getElementById("demoModal");
const demoFrame = document.getElementById("demoFrame");

// OPEN DEMO
document.querySelectorAll("[data-demo]").forEach(btn => {
btn.addEventListener("click", () => {
const link = btn.getAttribute("data-demo");

    if (!demoModal || !demoFrame) return;

    demoFrame.src = link;
    demoModal.style.display = "block";

    document.body.style.overflow = "hidden";
});

});

// CLOSE DEMO
const closeDemo = document.getElementById("closeDemo");

if (closeDemo) {
closeDemo.addEventListener("click", () => {
demoModal.style.display = "none";
demoFrame.src = "";

    document.body.style.overflow = "auto";
});

}

// ================= ESC KEY CLOSE =================
document.addEventListener("keydown", (e) => {
if (e.key === "Escape") {

    if (readingMode) readingMode.style.display = "none";
    if (demoModal) demoModal.style.display = "none";

    if (demoFrame) demoFrame.src = "";
    document.body.style.overflow = "auto";
}

});

// ================= CLICK OUTSIDE MODAL =================
if (demoModal) {
demoModal.addEventListener("click", (e) => {
if (e.target === demoModal) {
demoModal.style.display = "none";
demoFrame.src = "";
document.body.style.overflow = "auto";
}
});
}

// ================= SCROLL REVEAL =================
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add("active");
}
});
}, {
threshold: 0.15
});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ================= SAFETY =================
// Prevent crashes if anything is missing
window.addEventListener("error", (e) => {
console.warn("Handled error:", e.message);
});
