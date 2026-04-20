// =========================
// SAFE SELECTORS
// =========================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// =========================
// INTRO (TYPEWRITER)
// =========================
window.addEventListener("load", () => {
  const intro = $("#intro");
  const nameEl = $("#intro-name");
  const text = "Kumar Abhigyan";

  if (!intro || !nameEl) return;

  let i = 0;

  function type() {
    if (i < text.length) {
      nameEl.textContent += text.charAt(i);
      i++;
      setTimeout(type, 80);
    } else {
      setTimeout(() => {
        intro.style.opacity = "0";
        intro.style.transform = "translateY(-10px)";
        setTimeout(() => {
          intro.style.display = "none";
        }, 600);
      }, 700);
    }
  }

  type();
});

// =========================
// MENU TOGGLE (FIXED)
// =========================
const menuBtn = $("#menuBtn");
const menu = $("#menu");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // Close menu on link click
  $$("#menu a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });

  // Close menu on outside click
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
      menu.classList.remove("active");
    }
  });
}

// =========================
// SCROLL REVEAL (SMOOTH)
// =========================
const reveals = $$(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.12 }
);

reveals.forEach((el) => observer.observe(el));

// =========================
// ABOUT TOGGLE (EXPAND)
// =========================
const aboutBtn = $("#aboutBtn");
const aboutMore = $("#about-more");

if (aboutBtn && aboutMore) {
  aboutBtn.addEventListener("click", () => {
    aboutMore.classList.toggle("open");

    aboutBtn.textContent = aboutMore.classList.contains("open")
      ? "Read Less"
      : "Read More";
  });
}

// =========================
// DEMO MODAL (FIXED)
// =========================
const demoModal = $("#demoModal");
const demoFrame = $("#demoFrame");
const closeDemo = $("#closeDemo");

$$(".btn[data-demo]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const url = btn.getAttribute("data-demo");
    if (!url) return;

    demoFrame.src = url;
    demoModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

if (closeDemo && demoModal) {
  closeDemo.addEventListener("click", () => {
    demoModal.classList.remove("active");
    demoFrame.src = "";
    document.body.style.overflow = "";
  });
}

if (demoModal) {
  demoModal.addEventListener("click", (e) => {
    if (e.target === demoModal) {
      demoModal.classList.remove("active");
      demoFrame.src = "";
      document.body.style.overflow = "";
    }
  });
}

// =========================
// READING MODE (ESSAYS)
// =========================
const readingMode = $("#readingMode");
const essayContent = $("#essayContent");
const closeReading = $("#closeReading");

$$(".essayBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-id");
    const essay = $(`#essay-${id}`);

    if (!essay) return;

    essayContent.innerHTML = essay.innerHTML;
    readingMode.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

if (closeReading && readingMode) {
  closeReading.addEventListener("click", () => {
    readingMode.classList.remove("active");
    document.body.style.overflow = "";
  });
}

if (readingMode) {
  readingMode.addEventListener("click", (e) => {
    if (e.target === readingMode) {
      readingMode.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// =========================
// DARK MODE TOGGLE
// =========================
const darkToggle = $("#darkToggle");

if (darkToggle) {
  // Load saved
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }

  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    localStorage.setItem(
      "darkMode",
      document.body.classList.contains("dark")
    );
  });
}

// =========================
// READING MODE TOGGLE BUTTON
// =========================
const readingToggle = $("#readingToggle");

if (readingToggle && readingMode) {
  readingToggle.addEventListener("click", () => {
    readingMode.classList.add("active");
    essayContent.innerHTML =
      "<h2>Select an essay from the Essays section.</h2>";
    document.body.style.overflow = "hidden";
  });
}

// =========================
// PARALLAX (SUBTLE)
// =========================
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  document.querySelectorAll(".book img").forEach((img) => {
    img.style.transform = `translateY(${scrollY * 0.02}px)`;
  });
});

// =========================
// FIX: BUTTON RIPPLE EFFECT
// =========================
$$(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const circle = document.createElement("span");
    const rect = this.getBoundingClientRect();

    circle.style.position = "absolute";
    circle.style.borderRadius = "50%";
    circle.style.pointerEvents = "none";
    circle.style.background = "rgba(255,255,255,0.4)";
    circle.style.width = circle.style.height = "120px";
    circle.style.left = e.clientX - rect.left - 60 + "px";
    circle.style.top = e.clientY - rect.top - 60 + "px";
    circle.style.opacity = "0.6";
    circle.style.transform = "scale(0)";
    circle.style.transition = "transform 0.4s ease, opacity 0.4s ease";

    this.appendChild(circle);

    requestAnimationFrame(() => {
      circle.style.transform = "scale(1.8)";
      circle.style.opacity = "0";
    });

    setTimeout(() => circle.remove(), 400);
  });
});

// =========================
// EASTER EGG (HIDDEN PROPERLY)
// =========================
let secret = "";
const code = "captain";

window.addEventListener("keydown", (e) => {
  secret += e.key.toLowerCase();

  if (secret.length > code.length) {
    secret = secret.slice(-code.length);
  }

  if (secret === code) {
    const easter = $("#easter");
    if (easter) {
      easter.style.opacity = "1";
      easter.style.transform = "scale(1.05)";
      setTimeout(() => {
        easter.style.opacity = "0.12";
        easter.style.transform = "scale(1)";
      }, 2000);
    }
    secret = "";
  }
});

// =========================
// IMAGE LOAD SAFETY (NO BLANK SPACE)
// =========================
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => {
    img.style.display = "none";
  });
});
