document.addEventListener("DOMContentLoaded", () => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

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
  const readingHome = $("#readingHome");

  const darkToggle = $("#darkToggle");
  const readingToggle = $("#readingToggle");

  const easter = $("#easter");

  const essayButtons = $$(".essayBtn");
  const demoButtons = $$(".demoBtn");
  const menuLinks = $$("#menu a");

  let menuOpen = false;
  let modalOpen = false;
  let readingOpen = false;

  const syncScrollLock = () => {
    body.classList.toggle("lock-scroll", menuOpen || modalOpen || readingOpen);
  };

  const setIntroState = (visible) => {
    if (!intro) return;
    intro.setAttribute("aria-hidden", visible ? "false" : "true");
  };

  const showEl = (el, display = "block") => {
    if (el) el.style.display = display;
  };

  const hideEl = (el) => {
    if (el) el.style.display = "none";
  };

  const hideAllEssays = () => {
    $$(".essay-full").forEach((el) => hideEl(el));
  };

  const ensureReadingHomeContent = () => {
    if (!readingHome) return;

    if (!readingHome.dataset.ready) {
      readingHome.innerHTML = `
        <h2>Reading Mode</h2>
        <p>Select an essay to open it here.</p>
        <div class="btns" style="margin-top:18px">
          <button class="btn secondary" type="button" data-open-essay="essay1">US–Iran War — WW3?</button>
          <button class="btn secondary" type="button" data-open-essay="essay2">World War II</button>
          <button class="btn secondary" type="button" data-open-essay="essay3">India</button>
        </div>
      `;
      readingHome.dataset.ready = "true";
    }
  };

  const openMenu = () => {
    if (!menu || !menuBtn) return;
    menu.classList.add("active");
    menuOpen = true;
    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.setAttribute("aria-label", "Close menu");
    syncScrollLock();
  };

  const closeMenu = () => {
    if (!menu || !menuBtn) return;
    menu.classList.remove("active");
    menuOpen = false;
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
    syncScrollLock();
  };

  const openModal = (url) => {
    if (!demoModal || !demoFrame || !url) return;
    closeMenu();

    demoFrame.src = url;
    demoModal.classList.add("active");
    demoModal.setAttribute("aria-hidden", "false");

    modalOpen = true;
    syncScrollLock();
  };

  const closeModal = () => {
    if (!demoModal || !demoFrame) return;

    demoModal.classList.remove("active");
    demoModal.setAttribute("aria-hidden", "true");

    demoFrame.src = "about:blank";
    demoFrame.removeAttribute("src");

    modalOpen = false;
    syncScrollLock();
  };

  const openReadingHome = () => {
    if (!readingMode || !readingHome) return;

    ensureReadingHomeContent();
    hideAllEssays();

    readingHome.hidden = false;
    showEl(readingHome, "block");

    readingMode.classList.add("active");
    readingMode.setAttribute("aria-hidden", "false");

    readingOpen = true;
    syncScrollLock();

    closeMenu();
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const openEssay = (id) => {
    if (!readingMode) return;

    const target = id ? document.getElementById(id) : null;
    if (!target) return;

    ensureReadingHomeContent();

    if (readingHome) {
      readingHome.hidden = true;
      hideEl(readingHome);
    }

    hideAllEssays();
    showEl(target, "block");

    readingMode.classList.add("active");
    readingMode.setAttribute("aria-hidden", "false");

    readingOpen = true;
    syncScrollLock();

    closeMenu();
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const closeReadingMode = () => {
    if (!readingMode) return;

    hideAllEssays();

    if (readingHome) {
      readingHome.hidden = true;
      hideEl(readingHome);
    }

    readingMode.classList.remove("active");
    readingMode.setAttribute("aria-hidden", "true");

    readingOpen = false;
    syncScrollLock();
  };

  const resetReadingToHomeState = () => {
    if (!readingHome) return;
    hideAllEssays();
    readingHome.hidden = false;
    showEl(readingHome, "block");
  };

  const typeIntro = () => {
    if (!intro || !introName) return;

    setIntroState(true);
    intro.style.opacity = "";
    intro.style.transform = "";

    const text = "Kumar Abhigyan";
    let i = 0;

    introName.textContent = "";

    const tick = () => {
      if (i < text.length) {
        introName.textContent += text.charAt(i);
        i += 1;
        window.setTimeout(tick, 80);
        return;
      }

      window.setTimeout(() => {
        intro.style.opacity = "0";
        intro.style.transform = "translateY(-8px)";

        window.setTimeout(() => {
          intro.remove();
        }, 700);
      }, 900);
    };

    tick();
  };

  const initReveals = () => {
    const revealEls = $$(".reveal");
    if (!revealEls.length) return;

    if (!("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("active"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealEls.forEach((el) => observer.observe(el));
  };

  const initAbout = () => {
    if (!aboutBtn || !aboutMore) return;

    aboutBtn.addEventListener("click", () => {
      const isOpen = aboutMore.classList.toggle("open");
      aboutBtn.textContent = isOpen ? "Read Less" : "Read More";
      aboutMore.style.maxHeight = isOpen ? `${aboutMore.scrollHeight}px` : "";
    });

    window.addEventListener("resize", () => {
      if (aboutMore.classList.contains("open")) {
        aboutMore.style.maxHeight = `${aboutMore.scrollHeight}px`;
      }
    });
  };

  const initDemoButtons = () => {
    demoButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        openModal(btn.dataset.demo || "");
      });
    });
  };

  const initEssayButtons = () => {
    essayButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.target;
        if (id) openEssay(id);
      });
    });
  };

  const initMenu = () => {
    if (!menuBtn || !menu) return;

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      menuOpen ? closeMenu() : openMenu();
    });

    menuLinks.forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    document.addEventListener("click", (e) => {
      if (menuOpen && menu && menuBtn && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
        closeMenu();
      }
    });
  };

  const initModal = () => {
    if (closeDemo) {
      closeDemo.addEventListener("click", closeModal);
      closeDemo.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          closeModal();
        }
      });
    }

    if (demoModal) {
      demoModal.addEventListener("click", (e) => {
        if (e.target === demoModal) closeModal();
      });
    }
  };

  const initReadingMode = () => {
    ensureReadingHomeContent();
    resetReadingToHomeState();

    if (readingToggle) {
      readingToggle.addEventListener("click", () => {
        if (!readingMode) return;

        if (readingOpen) {
          closeReadingMode();
        } else {
          openReadingHome();
        }
      });
    }

    if (readingContent) {
      readingContent.addEventListener("click", (e) => {
        const button = e.target.closest("[data-open-essay]");
        if (!button) return;

        const id = button.getAttribute("data-open-essay");
        if (id) openEssay(id);
      });
    }

    if (closeReading) {
      closeReading.addEventListener("click", closeReadingMode);
      closeReading.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          closeReadingMode();
        }
      });
    }

    if (readingMode) {
      readingMode.addEventListener("click", (e) => {
        if (e.target === readingMode) closeReadingMode();
      });
    }
  };

  const initDarkMode = () => {
    if (!darkToggle) return;

    try {
      if (localStorage.getItem("darkMode") === "true") {
        body.classList.add("dark");
      }
    } catch (_) {}

    darkToggle.addEventListener("click", () => {
      body.classList.toggle("dark");
      closeMenu();

      try {
        localStorage.setItem("darkMode", body.classList.contains("dark") ? "true" : "false");
      } catch (_) {}
    });
  };

  const initImageSafety = () => {
    $$("img").forEach((img) => {
      if (img.dataset.fallbackBound === "true") return;

      img.dataset.fallbackBound = "true";
      img.addEventListener("error", () => {
        img.style.display = "none";
      });
    });
  };

  const initEasterEgg = () => {
    let secret = "";
    const code = "captain";

    window.addEventListener("keydown", (e) => {
      if (e.key.length !== 1) return;

      secret += e.key.toLowerCase();
      if (secret.length > code.length) {
        secret = secret.slice(-code.length);
      }

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
  };

  const initGlobalEscape = () => {
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;

      closeMenu();
      closeModal();
      closeReadingMode();
    });
  };

  const initInitialState = () => {
    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open menu");
    }

    if (demoModal) {
      demoModal.setAttribute("aria-hidden", "true");
    }

    if (readingMode) {
      readingMode.setAttribute("aria-hidden", "true");
    }

    if (readingHome) {
      readingHome.hidden = true;
      hideEl(readingHome);
    }

    hideAllEssays();
    syncScrollLock();
  };

  typeIntro();
  initReveals();
  initAbout();
  initDemoButtons();
  initEssayButtons();
  initMenu();
  initModal();
  initReadingMode();
  initDarkMode();
  initImageSafety();
  initEasterEgg();
  initGlobalEscape();
  initInitialState();
});
