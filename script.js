document.addEventListener("DOMContentLoaded", () => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const body = document.body;

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  let menuOpen = false;
  let readingOpen = false;
  let modalOpen = false;

  const syncScrollLock = () => {
    body.style.overflow = (menuOpen || readingOpen || modalOpen) ? "hidden" : "";
  };

  /* =========================
     INTRO
  ========================= */
  const intro = $("#intro");
  const introName = $("#intro-name");
  const introText = "Kumar Abhigyan";

  if (intro && introName) {
    let i = 0;

    const typeIntro = () => {
      if (i < introText.length) {
        introName.textContent += introText[i];
        i += 1;
        window.setTimeout(typeIntro, 70);
      }
    };

    typeIntro();

    window.setTimeout(() => {
      intro.style.opacity = "0";
      intro.style.transform = "translateY(-4px)";
      window.setTimeout(() => {
        intro.remove();
      }, 700);
    }, 3200);
  }

  window.scrollTo(0, 0);

  /* =========================
     MENU
  ========================= */
  const menuBtn = $("#menuBtn");
  const menu = $("#menu");

  const closeMenu = () => {
    if (!menu) return;
    menu.classList.remove("active");
    menuOpen = false;
    syncScrollLock();
  };

  const openMenu = () => {
    if (!menu) return;
    menu.classList.add("active");
    menuOpen = true;
    syncScrollLock();
  };

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (menu.classList.contains("active")) closeMenu();
      else openMenu();
    });

    $$("#menu a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /* =========================
     SCROLL REVEAL
  ========================= */
  const reveals = $$(".reveal");

  if (reveals.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  /* =========================
     ABOUT (LONG CONTENT)
  ========================= */
  const aboutBtn = $("#aboutBtn");
  const aboutMore = $("#about-more");
  const aboutPreview = $(".about-preview");

  const longAboutHTML = `
    <p>Kumar Abhigyan, born in October 2011 and based in Jharkhand, represents a generation that has grown up surrounded by constant information, yet chooses to approach it with discipline rather than reaction. At a time when speed often passes for intelligence, his work leans toward clarity, structure, and long-term understanding.</p>
    <p>He identifies as a writer, but his work is broader than writing alone. He is an observer of systems, a debater, and someone who is interested in how ideas hold together when tested. His focus is not on surface-level commentary. It is on the deeper patterns that shape what people believe, how they respond, and why outcomes repeat across different contexts.</p>
    <p>That systems approach shows up throughout his work. Instead of looking at events as isolated moments, he studies how they connect to history, institutions, incentives, behaviour, and power. This is what gives his writing its tone: measured, analytical, and intent on making the complicated easier to see without making it shallow.</p>
    <p>His interests are varied, but they are not random. Motorsports reflects precision, timing, control, and the importance of marginal gains. Cooking reflects patience, process, and transformation. Human behaviour connects directly to his writing, because understanding people is often the key to understanding politics, society, and conflict. Exploration, whether intellectual or physical, remains a constant part of how he learns.</p>
    <p>He also keeps an active presence on Instagram, where he shares updates and explanations in a way that keeps people informed without overwhelming them. That platform acts as an extension of his thinking: concise when needed, but still grounded in substance. He is not trying to sound loud. He is trying to sound clear.</p>
    <p>In debate, he is drawn less to the performance of disagreement and more to the process of sharpening thought. He values questions that improve understanding. He cares about whether an argument actually explains something, whether a claim stands up under pressure, and whether an idea can survive context. That approach shapes his writing just as much as it shapes his discussions.</p>
    <p>The central principle across his work is simple: clarity over noise. He is interested in the kind of understanding that takes time to build and is harder to break. His books and essays are part of that effort — a body of work focused on pattern recognition, long-term thinking, and the search for a cleaner way to see the world.</p>
    <p>That makes his profile more than a list of interests. It is a direction. A writer who is still growing, still observing, still refining — but already clear about the kind of thinking he values.</p>
  `;

  if (aboutMore) {
    aboutMore.innerHTML = longAboutHTML;
  }

  if (aboutBtn && aboutMore) {
    aboutBtn.addEventListener("click", () => {
      const open = aboutMore.classList.toggle("open");
      aboutBtn.textContent = open ? "Read Less" : "Read More";

      if (open) {
        aboutMore.style.maxHeight = aboutMore.scrollHeight + "px";
      } else {
        aboutMore.style.maxHeight = null;
      }
    });

    window.addEventListener("resize", () => {
      if (aboutMore.classList.contains("open")) {
        aboutMore.style.maxHeight = aboutMore.scrollHeight + "px";
      }
    });
  }

  if (aboutPreview) {
    aboutPreview.textContent =
      "Kumar Abhigyan, born in October 2011 and based in Jharkhand, is an emerging writer, debater, and systems thinker focused on clarity, long-term understanding, and the deeper patterns beneath events.";
  }

  /* =========================
     DEMO MODAL
  ========================= */
  const modal = $("#demoModal");
  const frame = $("#demoFrame");
  const closeDemo = $("#closeDemo");

  const openModal = (link) => {
    if (!modal || !frame || !link) return;
    frame.src = link;
    modal.classList.add("active");
    modalOpen = true;
    syncScrollLock();
  };

  const closeModal = () => {
    if (!modal || !frame) return;
    modal.classList.remove("active");
    frame.src = "";
    modalOpen = false;
    syncScrollLock();
  };

  $$(".demoBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(btn.dataset.demo || "");
    });
  });

  if (closeDemo) {
    closeDemo.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  /* =========================
     ESSAYS (LONG CONTENT)
  ========================= */
  const readingMode = $("#readingMode");
  const closeReading = $("#closeReading");
  const essayCards = $$(".essayBtn");
  const essayFulls = $$(".essay-full");
  const readingContent = readingMode ? $(".reading-content", readingMode) : null;

  const essayData = {
    essay1: `
      <h2>US–Iran War — WW3?</h2>

      <p>The tension between the United States and Iran is often discussed as if it is a recent crisis waiting to explode. In reality, it is the product of decades of history, layered distrust, strategic competition, and repeated misunderstandings. It is not a single relationship problem. It is a structure that has been building for a long time.</p>

      <p>Before 1979, the two countries were not natural enemies. Iran, under the Shah, maintained close ties with the United States and was part of the broader Western strategic orbit. But the relationship carried a hidden tension. Iranian memory of the 1953 coup, in which foreign interference helped reshape political power inside the country, did not vanish just because diplomatic ties continued. It sat underneath the surface, waiting for the right moment to shape the future.</p>

      <p>The 1979 Revolution changed everything. Iran became an Islamic Republic, and its sense of national identity shifted sharply. The United States, which had once been seen as a partner, was now viewed by many in Iran as a symbol of external influence and political intrusion. The hostage crisis that followed hardened the divide and made reconciliation far more difficult. From that point onward, distrust became the default setting.</p>

      <p>Over the decades that followed, the rivalry grew through indirect confrontation rather than direct war. Sanctions, proxy conflicts, naval incidents, cyber operations, regional competition, and diplomatic breakdowns all added layers to the same story. The relationship became one of managed hostility: neither side fully trusting the other, neither side able to simply reset the past.</p>

      <p>The nuclear issue intensified the situation further. For the United States, the fear was that Iran’s nuclear program could become a weapon of leverage or defense that would shift the regional balance. For Iran, the program was tied to sovereignty, deterrence, and the ability to resist pressure. Both sides interpreted the same situation through completely different strategic lenses.</p>

      <p>That is why the idea of a direct full-scale war keeps appearing in public discussion. The headline version of the story suggests sudden escalation. The deeper version suggests something else: long-term tension, carefully managed, repeatedly interrupted by diplomacy, and always vulnerable to miscalculation. In that sense, the real danger is not that the conflict is simple. It is that it is so layered that one mistake can move it into a far more dangerous phase.</p>

      <p>So is it World War III? Not in the literal sense people casually mean online. But it is certainly one of the most important fault lines in modern geopolitics. The U.S.–Iran conflict is less about one event than about history accumulating pressure. It is a reminder that international conflict usually grows from memory, mistrust, and repeated decisions — not just from one headline or one explosion.</p>
    `,
    essay2: `
      <h2>World War II — The Event That Shaped the Modern World</h2>

      <p>World War II is often described as the largest conflict in human history, but that description only captures part of its significance. What makes the war so important is not just its scale, but the way it reorganized the world after it ended. Modern geopolitics, modern institutions, and much of modern power balance are all rooted in the aftereffects of that war.</p>

      <p>Before World War II, the global order was dominated by European empires. Britain, France, Germany, and other powers controlled large parts of the world through colonies, trade routes, and military strength. The war shattered that balance. Europe was devastated physically, economically, and politically. Cities were destroyed, populations were displaced, and the old assumption that European states could indefinitely control the world was no longer believable.</p>

      <p>In that vacuum, the United States and the Soviet Union emerged as the two central superpowers. This was one of the biggest structural changes in modern history. The world moved from a European imperial system to a bipolar system defined by two competing models of power. One side centered around capitalism and liberal democracy, the other around state socialism and authoritarian centralization. The Cold War grew directly from this shift.</p>

      <p>World War II also reshaped institutions. The United Nations was created to prevent another global catastrophe. New economic arrangements and alliances followed. NATO emerged later as a military answer to the security fears of the postwar period. Global governance did not become peaceful or equal, but it became more formalized, more interconnected, and more dependent on large-scale cooperation.</p>

      <p>The war also accelerated technological and industrial change. Radar, aviation, logistics, medicine, computing, and nuclear science all advanced dramatically during and after the conflict. Nuclear weapons, in particular, changed the logic of war forever. After Hiroshima and Nagasaki, direct total war between major powers became far more dangerous and far less likely. Conflict did not disappear. It became indirect, strategic, and heavily influenced by deterrence.</p>

      <p>Perhaps the most important long-term outcome was decolonization. European powers came out of the war weakened, and independence movements across Asia and Africa gained momentum. India’s independence in 1947 is one of the most important examples. The postwar world was no longer a small club of empires. It became a larger and more complicated system of sovereign states.</p>

      <p>That is why World War II still matters so much. It was not simply a historical event to be remembered. It was the moment that created the framework of the modern world: superpowers, alliances, institutions, deterrence, decolonization, and the idea that global order is both structured and unstable. Almost everything in contemporary geopolitics can be traced back to the changes the war set in motion.</p>
    `,
    essay3: `
      <h2>India — Rising Power or Structural Challenge?</h2>

      <p>India is often described as a rising power, and that description is not wrong. Its population is large, its economy is growing, its digital systems are expanding, and its geopolitical relevance is increasing. But the real question is not whether India is rising. The real question is what kind of rise this is, and whether it can be sustained over time.</p>

      <p>A rise in global influence requires more than growth numbers. It requires institutional strength, execution, education, infrastructure, and long-term consistency. India has clear strengths. It has a large and young population, a growing digital ecosystem, a strong service sector, and a strategic position between major geopolitical regions. These are meaningful advantages in the current world order.</p>

      <p>But structural challenges remain. Development is uneven across regions. Infrastructure continues to improve but still faces major gaps. Education and skills are not yet aligned everywhere with the demands of a rapidly changing economy. Governance is often tested by scale: when a country is this large and diverse, policy execution becomes as important as policy design.</p>

      <p>That is why the idea of “rise” has to be handled carefully. It can sound like a headline, but it is really a process. A country does not become globally significant just because its economy grows. It becomes truly influential when it can convert growth into consistency, resilience, and credibility over decades.</p>

      <p>India’s geopolitical role is also important. It does not fit neatly into old alliance systems. It maintains relationships with multiple major powers while trying to preserve autonomy. That flexibility is useful, but it also requires balance. In a world of sharper competition between major states, maintaining strategic independence becomes harder, not easier.</p>

      <p>The deeper question is whether India can match its ambition with structure. Can it improve education at scale? Can it strengthen manufacturing and infrastructure? Can it reduce internal inequality while still expanding globally? These are not small questions, because they determine whether a rise is temporary or durable.</p>

      <p>So is India rising? Yes, in many ways. But the more meaningful answer is more complicated. It is rising while still carrying structural challenges that shape the pace and shape of that rise. That makes India not just an example of growth, but an example of how growth and constraint can exist at the same time.</p>

      <p>That tension is what makes India so important to study. It is not a finished story. It is a live one, and its outcome will depend on how effectively its internal systems can support its external ambitions.</p>
    `
  };

  const showEssay = (id) => {
    if (!readingMode || !readingContent) return;

    essayFulls.forEach((el) => {
      el.style.display = "none";
    });

    const target = document.getElementById(id);
    if (target) {
      target.innerHTML = essayData[id] || "";
      target.style.display = "block";
    }

    readingMode.classList.add("active");
    readingOpen = true;
    syncScrollLock();

    closeMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (essayCards.length) {
    essayCards.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.target;
        if (target) showEssay(target);
      });
    });
  }

  const readingHomeId = "readingHome";
  const ensureReadingHome = () => {
    if (!readingContent) return null;

    let home = document.getElementById(readingHomeId);
    if (!home) {
      home = document.createElement("div");
      home.id = readingHomeId;
      home.innerHTML = `
        <h2>Reading Mode</h2>
        <p>Select an essay to open it here.</p>
        <div class="btns" style="margin-top:18px">
          <button class="btn secondary" data-open-essay="essay1">US–Iran</button>
          <button class="btn secondary" data-open-essay="essay2">World War II</button>
          <button class="btn secondary" data-open-essay="essay3">India</button>
        </div>
      `;
      readingContent.insertBefore(home, closeReading ? closeReading.nextSibling : readingContent.firstChild);

      $$("[data-open-essay]", home).forEach((btn) => {
        btn.addEventListener("click", () => {
          const target = btn.getAttribute("data-open-essay");
          if (target) showEssay(target);
        });
      });
    }
    return home;
  };

  const openReadingHome = () => {
    if (!readingMode) return;

    essayFulls.forEach((el) => (el.style.display = "none"));
    const home = ensureReadingHome();
    if (home) home.style.display = "block";

    readingMode.classList.add("active");
    readingOpen = true;
    syncScrollLock();

    closeMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (readingToggle) {
    readingToggle.addEventListener("click", () => {
      if (readingOpen) {
        readingMode.classList.remove("active");
        readingOpen = false;
        syncScrollLock();
      } else {
        openReadingHome();
      }
    });
  }

  if (closeReading && readingMode) {
    closeReading.addEventListener("click", () => {
      readingMode.classList.remove("active");
      readingOpen = false;
      syncScrollLock();
    });
  }

  if (readingMode) {
    readingMode.addEventListener("click", (e) => {
      if (e.target === readingMode) {
        readingMode.classList.remove("active");
        readingOpen = false;
        syncScrollLock();
      }
    });
  }

  /* =========================
     DARK MODE
  ========================= */
  const darkToggle = $("#darkToggle");

  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      body.classList.toggle("dark");
    });
  }

  /* =========================
     ESC KEY CLOSE
  ========================= */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
      closeModal();

      if (readingMode && readingMode.classList.contains("active")) {
        readingMode.classList.remove("active");
        readingOpen = false;
        syncScrollLock();
      }
    }
  });

  /* =========================
     OPTIONAL: KEEP ABOUT HEIGHT TIGHT ON RESIZE
  ========================= */
  window.addEventListener("resize", () => {
    if (aboutMore && aboutMore.classList.contains("open")) {
      aboutMore.style.maxHeight = aboutMore.scrollHeight + "px";
    }
  });

  /* =========================
     FAILSAFE
  ========================= */
  window.addEventListener("error", (e) => {
    console.warn("Non-critical JS issue:", e.message);
  });

  syncScrollLock();
});
