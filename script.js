document.addEventListener("DOMContentLoaded", () => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const body = document.body;

  let menuOpen = false;
  let modalOpen = false;
  let readingOpen = false;

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

  const setScrollLock = () => {
    body.style.overflow = (menuOpen || modalOpen || readingOpen) ? "hidden" : "";
  };

  const safeShow = (el, display = "block") => {
    if (el) el.style.display = display;
  };

  const safeHide = (el) => {
    if (el) el.style.display = "none";
  };

  /* =========================
     INTRO
  ========================= */
  if (intro && introName) {
    const introText = "Kumar Abhigyan";
    let i = 0;

    const typeIntro = () => {
      if (i < introText.length) {
        introName.textContent += introText.charAt(i);
        i += 1;
        window.setTimeout(typeIntro, 80);
      } else {
        window.setTimeout(() => {
          intro.style.opacity = "0";
          intro.style.transform = "translateY(-8px)";
          window.setTimeout(() => {
            intro.remove();
          }, 700);
        }, 900);
      }
    };

    typeIntro();
  }

  window.scrollTo(0, 0);

  /* =========================
     MENU
  ========================= */
  const openMenu = () => {
    if (!menu) return;
    menu.classList.add("active");
    menuOpen = true;
    setScrollLock();
  };

  const closeMenu = () => {
    if (!menu) return;
    menu.classList.remove("active");
    menuOpen = false;
    setScrollLock();
  };

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      menuOpen ? closeMenu() : openMenu();
    });

    menuBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        menuOpen ? closeMenu() : openMenu();
      }
    });

    $$("#menu a").forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    document.addEventListener("click", (e) => {
      if (menuOpen && menu && menuBtn && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /* =========================
     SCROLL REVEAL
  ========================= */
  const revealEls = $$(".reveal");

  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealEls.forEach((el) => observer.observe(el));
  }

  /* =========================
     ABOUT
  ========================= */
  if (aboutBtn && aboutMore) {
    aboutBtn.addEventListener("click", () => {
      const isOpen = aboutMore.classList.toggle("open");

      aboutBtn.textContent = isOpen ? "Read Less" : "Read More";

      if (isOpen) {
        aboutMore.style.maxHeight = `${aboutMore.scrollHeight}px`;
      } else {
        aboutMore.style.maxHeight = null;
      }
    });

    window.addEventListener("resize", () => {
      if (aboutMore.classList.contains("open")) {
        aboutMore.style.maxHeight = `${aboutMore.scrollHeight}px`;
      }
    });
  }

  /* =========================
     DEMO MODAL
  ========================= */
  const openModal = (url) => {
    if (!demoModal || !demoFrame || !url) return;
    demoFrame.src = url;
    demoModal.classList.add("active");
    modalOpen = true;
    setScrollLock();
    closeMenu();
  };

  const closeModal = () => {
    if (!demoModal || !demoFrame) return;
    demoModal.classList.remove("active");
    demoFrame.src = "";
    modalOpen = false;
    setScrollLock();
  };

  $$(".demoBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(btn.dataset.demo || "");
    });
  });

  if (closeDemo) {
    closeDemo.addEventListener("click", closeModal);
  }

  if (demoModal) {
    demoModal.addEventListener("click", (e) => {
      if (e.target === demoModal) closeModal();
    });
  }

  /* =========================
     READING MODE
  ========================= */
  const essayFulls = $$(".essay-full");

  const ensureReadingHome = () => {
    if (!readingContent) return null;

    let home = $("#readingHome");
    if (!home) {
      home = document.createElement("div");
      home.id = "readingHome";
      home.innerHTML = `
        <h2>Reading Mode</h2>
        <p>Select an essay to open it here.</p>
        <div class="btns">
          <button class="btn secondary" type="button" data-open-essay="essay1">US–Iran War — WW3?</button>
          <button class="btn secondary" type="button" data-open-essay="essay2">World War II</button>
          <button class="btn secondary" type="button" data-open-essay="essay3">India</button>
        </div>
      `;

      const insertAfter = closeReading || readingContent.firstChild;
      if (closeReading && closeReading.parentNode === readingContent) {
        readingContent.insertBefore(home, closeReading.nextSibling);
      } else {
        readingContent.insertBefore(home, readingContent.firstChild);
      }

      $$("[data-open-essay]", home).forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-open-essay");
          if (id) openEssay(id);
        });
      });
    }

    return home;
  };

  const openReadingHome = () => {
    if (!readingMode) return;

    essayFulls.forEach((el) => safeHide(el));
    const home = ensureReadingHome();
    if (home) safeShow(home);

    readingMode.classList.add("active");
    readingOpen = true;
    setScrollLock();
    closeMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openEssay = (id) => {
    if (!readingMode) return;

    const target = document.getElementById(id);
    if (!target) return;

    const home = $("#readingHome");
    if (home) safeHide(home);

    essayFulls.forEach((el) => safeHide(el));
    safeShow(target);

    readingMode.classList.add("active");
    readingOpen = true;
    setScrollLock();
    closeMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  $$(".essayBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.target;
      if (id) openEssay(id);
    });
  });

  if (readingToggle) {
    readingToggle.addEventListener("click", () => {
      if (!readingMode) return;

      if (readingOpen) {
        readingMode.classList.remove("active");
        readingOpen = false;
        setScrollLock();
        return;
      }

      openReadingHome();
    });
  }

  if (closeReading) {
    closeReading.addEventListener("click", () => {
      if (!readingMode) return;
      readingMode.classList.remove("active");
      readingOpen = false;
      setScrollLock();
    });

    closeReading.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!readingMode) return;
        readingMode.classList.remove("active");
        readingOpen = false;
        setScrollLock();
      }
    });
  }

  if (readingMode) {
    readingMode.addEventListener("click", (e) => {
      if (e.target === readingMode) {
        readingMode.classList.remove("active");
        readingOpen = false;
        setScrollLock();
      }
    });
  }

  /* =========================
     DARK MODE
  ========================= */
  if (darkToggle) {
    try {
      if (localStorage.getItem("darkMode") === "true") {
        body.classList.add("dark");
      }
    } catch (_) {}

    darkToggle.addEventListener("click", () => {
      body.classList.toggle("dark");
      try {
        localStorage.setItem("darkMode", body.classList.contains("dark") ? "true" : "false");
      } catch (_) {}
    });
  }

  /* =========================
     ESC TO CLOSE
  ========================= */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();

      if (modalOpen) closeModal();

      if (readingOpen && readingMode) {
        readingMode.classList.remove("active");
        readingOpen = false;
        setScrollLock();
      }
    }
  });

  /* =========================
     SAFE IMAGE FAILURE HANDLING
  ========================= */
  $$("img").forEach((img) => {
    img.addEventListener("error", () => {
      img.style.display = "none";
    });
  });

  /* =========================
     EASTER EGG
  ========================= */
  let secret = "";
  const code = "captain";

  window.addEventListener("keydown", (e) => {
    if (e.key.length !== 1) return;

    secret += e.key.toLowerCase();

    if (secret.length > code.length) {
      secret = secret.slice(-code.length);
    }

    const easter = $("#easter");
    if (secret === code && easter) {
      easter.style.opacity = "1";
      easter.style.transform = "scale(1.05)";
      window.setTimeout(() => {
        easter.style.opacity = "0.12";
        easter.style.transform = "scale(1)";
      }, 2000);
      secret = "";
    }
  });

  setScrollLock();
});
