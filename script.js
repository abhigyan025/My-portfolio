document.addEventListener("DOMContentLoaded", () => {

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const body = document.body;

  const intro = $("#intro");
  const introName = $("#intro-name");
  const menuBtn = $("#menuBtn");
  const menu = $("#menu");
  const aboutBtn = $("#aboutBtn");
  const aboutMore = $("#about-more");
  const demoModal = $("#demoModal");
  const demoFrame = $("#demoFrame");
  const closeDemo = $("#closeDemo");
  const readingMode = $("#readingMode");
  const readingContent = $(".reading-content");
  const closeReading = $("#closeReading");
  const darkToggle = $("#darkToggle");
  const readingToggle = $("#readingToggle");

  let menuOpen = false;
  let modalOpen = false;
  let readingOpen = false;

  /* =========================
     SCROLL LOCK (FIXED)
  ========================= */
  const syncScrollLock = () => {
    if (menuOpen || modalOpen || readingOpen) {
      body.style.overflow = "hidden";
      body.style.paddingRight = "0px"; // fix layout shift
    } else {
      body.style.overflow = "";
      body.style.paddingRight = "";
    }
  };

  /* =========================
     MENU
  ========================= */
  const closeMenu = () => {
    if (!menu) return;
    menu.classList.remove("active");
    menuOpen = false;
    menuBtn?.setAttribute("aria-expanded", "false");
    syncScrollLock();
  };

  const openMenu = () => {
    if (!menu) return;
    menu.classList.add("active");
    menuOpen = true;
    menuBtn?.setAttribute("aria-expanded", "true");
    syncScrollLock();
  };

  /* =========================
     MODAL (FIX BLANK BUG)
  ========================= */
  const closeModal = () => {
    if (!demoModal) return;
    demoModal.classList.remove("active");

    setTimeout(() => {
      if (demoFrame) demoFrame.src = "";
    }, 200);

    modalOpen = false;
    syncScrollLock();
  };

  const openModal = (url) => {
    if (!url || !demoModal) return;

    demoModal.classList.add("active");
    modalOpen = true;
    syncScrollLock();
    closeMenu();

    if (demoFrame) {
      demoFrame.src = "";
      setTimeout(() => {
        demoFrame.src = url;
      }, 150);
    }
  };

  /* =========================
     READING MODE (FIXED)
  ========================= */
  const closeReadingMode = () => {
    if (!readingMode) return;
    readingMode.classList.remove("active");
    readingOpen = false;
    syncScrollLock();
  };

  const openEssay = (id) => {
    const target = document.getElementById(id);
    if (!target || !readingMode) return;

    $$(".essay-full").forEach(e => e.style.display = "none");
    target.style.display = "block";

    readingMode.classList.add("active");
    readingOpen = true;
    syncScrollLock();
    closeMenu();

    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  const openReadingHome = () => {
    if (!readingMode) return;

    $$(".essay-full").forEach(e => e.style.display = "none");

    readingMode.classList.add("active");
    readingOpen = true;
    syncScrollLock();
    closeMenu();

    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  /* =========================
     INTRO (SMOOTHER)
  ========================= */
  const typeIntro = () => {
    if (!intro || !introName) return;

    const text = "Kumar Abhigyan";
    let i = 0;

    const tick = () => {
      if (i < text.length) {
        introName.textContent += text[i++];
        setTimeout(tick, 70);
      } else {
        setTimeout(() => {
          intro.style.opacity = "0";
          intro.style.transform = "translateY(-10px)";
          setTimeout(() => intro.remove(), 600);
        }, 800);
      }
    };

    tick();
  };

  /* =========================
     SCROLL REVEAL (SMOOTHER)
  ========================= */
  const initReveals = () => {
    const els = $$(".reveal");

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("active");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(el => obs.observe(el));
  };

  /* =========================
     ABOUT
  ========================= */
  const initAbout = () => {
    if (!aboutBtn || !aboutMore) return;

    aboutBtn.addEventListener("click", () => {
      const open = aboutMore.classList.toggle("open");
      aboutBtn.textContent = open ? "Read Less" : "Read More";
      aboutMore.style.maxHeight = open ? aboutMore.scrollHeight + "px" : null;
    });
  };

  /* =========================
     BUTTON MICRO INTERACTIONS
  ========================= */
  const initButtons = () => {
    $$(".btn").forEach(btn => {
      btn.addEventListener("click", () => {
        btn.style.transform = "scale(0.96)";
        setTimeout(() => btn.style.transform = "", 120);
      });
    });
  };

  /* =========================
     DEMO BUTTONS
  ========================= */
  const initDemoButtons = () => {
    $$(".demoBtn").forEach(btn => {
      btn.addEventListener("click", () => openModal(btn.dataset.demo));
    });
  };

  /* =========================
     ESSAY BUTTONS
  ========================= */
  const initEssayButtons = () => {
    $$(".essayBtn").forEach(btn => {
      btn.addEventListener("click", () => openEssay(btn.dataset.target));
    });
  };

  /* =========================
     MENU EVENTS
  ========================= */
  const initMenu = () => {
    if (!menuBtn || !menu) return;

    menuBtn.addEventListener("click", e => {
      e.stopPropagation();
      menuOpen ? closeMenu() : openMenu();
    });

    document.addEventListener("click", e => {
      if (menuOpen && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
        closeMenu();
      }
    });

    $$("#menu a").forEach(a => a.addEventListener("click", closeMenu));
  };

  /* =========================
     MODAL EVENTS
  ========================= */
  const initModal = () => {
    closeDemo?.addEventListener("click", closeModal);

    demoModal?.addEventListener("click", e => {
      if (e.target === demoModal) closeModal();
    });
  };

  /* =========================
     READING MODE EVENTS
  ========================= */
  const initReadingMode = () => {
    readingToggle?.addEventListener("click", () => {
      readingOpen ? closeReadingMode() : openReadingHome();
    });

    closeReading?.addEventListener("click", closeReadingMode);

    readingMode?.addEventListener("click", e => {
      if (e.target === readingMode) closeReadingMode();
    });
  };

  /* =========================
     DARK MODE
  ========================= */
  const initDarkMode = () => {
    try {
      if (localStorage.getItem("darkMode") === "true") {
        body.classList.add("dark");
      }
    } catch {}

    darkToggle?.addEventListener("click", () => {
      body.classList.toggle("dark");
      try {
        localStorage.setItem("darkMode", body.classList.contains("dark"));
      } catch {}
    });
  };

  /* =========================
     EASTER EGG (SMARTER)
  ========================= */
  const initEasterEgg = () => {
    let secret = "";
    const code = "captain";

    window.addEventListener("keydown", e => {
      if (e.key.length !== 1) return;

      secret += e.key.toLowerCase();
      secret = secret.slice(-code.length);

      const el = $("#easter");
      if (secret === code && el) {
        el.style.opacity = "1";
        el.style.transform = "scale(1.1)";
        setTimeout(() => {
          el.style.opacity = "0.12";
          el.style.transform = "scale(1)";
        }, 2000);
      }
    });
  };

  /* =========================
     GLOBAL ESCAPE
  ========================= */
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeMenu();
      closeModal();
      closeReadingMode();
    }
  });

  /* =========================
     INIT
  ========================= */
  typeIntro();
  initReveals();
  initAbout();
  initButtons();
  initDemoButtons();
  initEssayButtons();
  initMenu();
  initModal();
  initReadingMode();
  initDarkMode();
  initEasterEgg();
  syncScrollLock();

});
