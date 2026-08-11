/* ===== CONFIG ===== */
const SANITY_PROJECT_ID = "zsm7toak";
const SANITY_DATASET = "production";
const SANITY_API = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${SANITY_DATASET}`;
const SETTINGS_ID = "siteSettings";

async function sanityFetch(query){
  try{
    const res = await fetch(`${SANITY_API}?query=${encodeURIComponent(query)}`);
    const json = await res.json();
    return json.result || [];
  }catch(e){
    console.warn("Sanity fetch failed",e);
    return [];
  }
}

/* ===== INTRO ===== */
window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("intro").classList.add("hide"), 2400);
});

/* ===== STAGGERED HERO NAME ===== */
const heroName = document.querySelector(".hero-name");

if(heroName){
  const words = heroName.textContent.trim().split(" ");

  heroName.innerHTML = words.map((word, wi) =>
    `<span class="word"><span style="animation-delay:${0.5 + wi * 0.18}s">${word}</span></span>`
  ).join(" ");
}

/* ===== MENU ===== */
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const menuOverlay = document.getElementById("menuOverlay");

function openMenu(){
  menu.classList.add("open");
  menuOverlay.classList.add("open");
  menuBtn.classList.add("active");
  menuBtn.setAttribute("aria-expanded", true);
}

function closeMenu(){
  menu.classList.remove("open");
  menuOverlay.classList.remove("open");
  menuBtn.classList.remove("active");
  menuBtn.setAttribute("aria-expanded", false);
}

menuBtn.addEventListener("click", () =>
  menu.classList.contains("open") ? closeMenu() : openMenu()
);

menuOverlay.addEventListener("click", closeMenu);
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

/* ===== DARK MODE ===== */
const darkToggle = document.getElementById("darkToggle");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  darkToggle.textContent =
    document.body.classList.contains("dark")
      ? "Light Mode"
      : "Dark Mode";

  closeMenu();
});

/* ===== ABOUT "READ MORE" (long-form paragraphs) ===== */
const aboutBtn = document.getElementById("aboutBtn");
const aboutMore = document.getElementById("about-more");

if(aboutBtn && aboutMore){
  aboutBtn.addEventListener("click", () => {
    const open = aboutMore.classList.toggle("open");

    aboutBtn.textContent = open
      ? "Read Less"
      : "Read More";
  });
}

/* ===== SCROLL REVEAL ===== */
const revealIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add("show");
    }
  });
}, {threshold:.1});

function observeReveals(root=document){
  root.querySelectorAll(".reveal").forEach(el => revealIO.observe(el));
}

observeReveals();

/* ===== ACTIVE NAV ON SCROLL ===== */
const navLinks = document.querySelectorAll(".nav-links a[data-section]");
const sections = document.querySelectorAll("section[id]");

const activeNavIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      navLinks.forEach(a => {
        a.classList.toggle(
          "active",
          a.dataset.section === e.target.id
        );
      });
    }
  });
}, {rootMargin:"-40% 0px -55% 0px"});

sections.forEach(s => activeNavIO.observe(s));

/* ===== PAGE PROGRESS BAR ===== */
const pageProgress = document.getElementById("pageProgress");

window.addEventListener("scroll", () => {
  const total = document.body.scrollHeight - window.innerHeight;

  pageProgress.style.width =
    (total > 0 ? window.scrollY / total * 100 : 0) + "%";
}, {passive:true});

/* ===== DEMO MODAL ===== */
const demoModal = document.getElementById("demoModal");
const demoFrame = document.getElementById("demoFrame");

document.addEventListener("click", e => {
  if(e.target.classList.contains("demoBtn")){
    demoFrame.src = e.target.dataset.demo;
    demoModal.classList.add("open");
  }
});

document.getElementById("closeDemo").addEventListener("click", () => {
  demoModal.classList.remove("open");
  demoFrame.src = "";
});

/* ===== READING MODE ===== */
const readingMode = document.getElementById("readingMode");
const readingToggle = document.getElementById("readingToggle");
const closeReading = document.getElementById("closeReading");
const progressBar = document.getElementById("progressBar");

function openEssay(targetId){
  document.querySelectorAll(".essay-full")
    .forEach(el => el.classList.remove("active"));

  const target = document.getElementById(targetId);

  if(target){
    target.classList.add("active");
  }

  readingMode.classList.add("open");
  readingMode.scrollTop = 0;
  progressBar.style.width = "0%";
  document.body.style.overflow = "hidden";
}

function closeReadingMode(){
  readingMode.classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("click", e => {
  if(e.target.classList.contains("essayBtn")){
    openEssay(e.target.dataset.target);
  }

  if(e.target.classList.contains("backToEssays")){
    closeReadingMode();
  }
});

readingToggle.addEventListener("click", () => {
  readingMode.classList.add("open");
  closeMenu();
});

closeReading.addEventListener("click", closeReadingMode);

readingMode.addEventListener("scroll", () => {
  const pct = readingMode.scrollHeight - readingMode.clientHeight;

  progressBar.style.width =
    (pct > 0 ? readingMode.scrollTop / pct * 100 : 0) + "%";
}, {passive:true});

/* ===== FONT SIZE CONTROLS ===== */
document.getElementById("fontSmall").addEventListener("click", () => {
  document.querySelectorAll(".essay-full").forEach(el => {
    el.classList.remove("font-large");
    el.classList.add("font-small");
  });
});

document.getElementById("fontLarge").addEventListener("click", () => {
  document.querySelectorAll(".essay-full").forEach(el => {
    el.classList.remove("font-small");
    el.classList.add("font-large");
  });
});

/* ===== FOCUS MODE ===== */
const focusBtn = document.getElementById("focusMode");

focusBtn.addEventListener("click", () => {
  readingMode.classList.toggle("focus-mode");

  focusBtn.textContent =
    readingMode.classList.contains("focus-mode")
      ? "Exit Focus"
      : "Focus";
});

/* ===== SUBSCRIBE FORM (placeholder) ===== */
const subscribeForm = document.getElementById("subscribeForm");

if(subscribeForm){
  subscribeForm.addEventListener("submit", e => {
    e.preventDefault();

    const status = document.getElementById("subscribeStatus");

    status.textContent =
      "✅ Email registered! I'll let you know when something new drops.";

    status.style.color = "var(--gold)";
    e.target.reset();
  });
}

/* ===== LOAD SITE SETTINGS ===== */
async function loadSettings(){
  const docs = await sanityFetch(`*[_id=="${SETTINGS_ID}"]`);
  const s = docs[0] || {};

  const easter = document.getElementById("easter");
  if(easter && s.footerQuote){
    easter.textContent = s.footerQuote;
  }

  const followers = document.getElementById("statFollowers");
  if(followers && s.followers){
    followers.textContent = s.followers;
  }

  const sales = document.getElementById("statSales");
  if(sales && s.salesLastMonth){
    sales.textContent = s.salesLastMonth;
  }

  const nowText = document.getElementById("nowText");

  if(nowText && (s.currentlyReading || s.currentlyWriting)){
    nowText.innerHTML =
      `Reading: <em>${s.currentlyReading || "—"}</em> &nbsp;·&nbsp; Writing: <em>${s.currentlyWriting || "—"}</em>`;
  }
}

/* ===== LOAD ESSAYS ===== */
async function loadEssays(){
  const essays = await sanityFetch(
    `*[_type=="essay" && hidden != true]|order(order asc)`
  );

  const grid = document.querySelector(".essay-grid");
  const readingContent = document.querySelector(".reading-content");

  if(!grid || !readingContent) return;

  grid.innerHTML = "";

  document.querySelectorAll(".essay-full").forEach(el => el.remove());

  if(!essays.length){
    grid.innerHTML =
      `<p style="color:var(--slate)">No essays yet.</p>`;
    return;
  }

  const featured = essays[0];
  const featuredWrap = document.querySelector(".featured-essay");

  if(featuredWrap){
    featuredWrap.innerHTML = `
      <span class="read-time">Featured</span>
      <h3>${featured.title || "Untitled"}</h3>
      <p>${featured.excerpt || ""}</p>
      <div style="margin-top:24px">
        <button class="btn primary essayBtn" type="button" data-target="essay-0">
          Read Featured Essay
        </button>
      </div>`;
  }

  essays.forEach((essay, i) => {
    const id = `essay-${i}`;
    const words = (essay.body || "").split(" ").length;
    const mins = Math.max(1, Math.round(words / 200));

    const card = document.createElement("article");

    card.className = "essay-card";

    card.innerHTML = `
      <span class="read-time">${mins} min read</span>
      <h3>${essay.title || "Untitled"}</h3>
      <p>${essay.excerpt || ""}</p>
      <button class="btn secondary essayBtn" type="button" data-target="${id}">
        Read
      </button>`;

    grid.appendChild(card);

    const full = document.createElement("div");

    full.id = id;
    full.className = "essay-full";

    full.innerHTML = `
      <span class="backToEssays">&larr; All Essays</span>
      <p class="essay-meta">
        <span class="read-time">${mins} min read</span>
      </p>
      <h2>${essay.title || "Untitled"}</h2>
      ${(essay.body || "")
        .split("\n")
        .filter(Boolean)
        .map(p => `<p>${p}</p>`)
        .join("")}
      <div class="share-row">
        <a
          class="btn secondary"
          target="_blank"
          rel="noreferrer"
          href="https://wa.me/?text=${encodeURIComponent(essay.title || '')}"
        >Share on WhatsApp</a>

        <a
          class="btn secondary"
          target="_blank"
          rel="noreferrer"
          href="https://twitter.com/intent/tweet?text=${encodeURIComponent(essay.title || '')}"
        >Share on X</a>
      </div>`;

    readingContent.appendChild(full);
  });
}

/* ===== LOAD UPDATES ===== */
async function loadUpdates(){
  const updates = await sanityFetch(
    `*[_type=="update" && hidden != true]|order(date desc)`
  );

  const feed = document.getElementById("updatesFeed");

  if(!feed) return;

  feed.innerHTML = !updates.length
    ? `<p style="color:var(--slate);padding:24px 0">No updates yet — check back soon.</p>`
    : updates.map(u => `
      <div class="update-item">
        <div class="update-date">
          ${u.date
            ? new Date(u.date).toLocaleDateString("en-US", {
                month:"short",
                day:"numeric"
              })
            : ""}
        </div>

        <div class="update-text">
          ${u.text || ""}
        </div>
      </div>
    `).join("");
}

/* ===== LOAD BOOKS ===== */
async function loadBooks(){
  const books = await sanityFetch(
    `*[_type=="book" && hidden != true]|order(order asc)`
  );

  const grid = document.querySelector(".books-grid");

  if(!grid) return;

  grid.innerHTML = "";

  if(!books.length){
    grid.innerHTML =
      `<p style="color:var(--slate)">No books yet.</p>`;
    return;
  }

  const featured =
    books.find(b => b.featured) || books[0];

  const featuredWrap =
    document.querySelector(".featured-grid");

  if(featuredWrap){
    featuredWrap.innerHTML = `
      <img
        src="${featured.coverUrl || "placeholder.jpg"}"
        alt="${featured.title} cover"
      >

      <div class="featured-content">
        <span class="read-time">Latest Release</span>
        <h2>${featured.title}</h2>
        <p>${featured.tagline || ""}</p>

        <div class="btns">
          ${
            featured.demoLink
              ? `<button
                  class="btn primary demoBtn"
                  type="button"
                  data-demo="${featured.demoLink}"
                >Read Demo</button>`
              : ""
          }

          ${
            featured.buyLink
              ? `<a
                  class="btn secondary"
                  href="${featured.buyLink}"
                  target="_blank"
                  rel="noreferrer"
                >Buy Ebook</a>`
              : ""
          }
        </div>
      </div>`;
  }

  books.forEach((b, i) => {
    const el = document.createElement("article");

    el.className = "book";

    el.innerHTML = `
      <span class="book-index">
        ${String(i + 1).padStart(2,"0")}
      </span>

      <div class="book-cover-wrap">
        <img
          src="${b.coverUrl || "placeholder.jpg"}"
          alt="${b.title} cover"
        >
      </div>

      <h3>${b.title}</h3>

      <p class="book-excerpt">
        ${b.tagline || ""}
      </p>

      ${
        b.comingSoon
          ? `<span class="read-time">Coming Soon</span>`
          : `
            <div class="btns">
              ${
                b.demoLink
                  ? `<button
                      class="btn primary demoBtn"
                      data-demo="${b.demoLink}"
                    >Read Demo</button>`
                  : ""
              }

              ${
                b.buyLink
                  ? `<a
                      class="btn secondary"
                      href="${b.buyLink}"
                      target="_blank"
                      rel="noreferrer"
                    >Buy</a>`
                  : ""
              }
            </div>
          `
      }`;

    grid.appendChild(el);
  });
}

/* =========================================================
   ABOUT TIMELINE — CONNECTED SNAKE
   ========================================================= */

async function loadAboutTimeline(){
  const tiles = await sanityFetch(
    `*[_type=="aboutTile" && hidden != true]|order(order asc)`
  );

  const wrap = document.getElementById("aboutTimeline");
  const panel = document.getElementById("timelineAnswer");

  if(!wrap) return;

  if(!tiles.length){
    wrap.innerHTML =
      `<p style="color:var(--slate)">More coming soon.</p>`;

    return;
  }

  /*
    Build rows of 3.

    Row 1:
    A B C

    Row 2:
    F E D

    Row 3:
    G H I

    This creates the actual snake order:
    A → B → C
              ↓
    F ← E ← D
    ↓
    G → H → I
  */

  const rows = [];

  for(let i = 0; i < tiles.length; i += 3){
    const row = tiles.slice(i, i + 3);

    if(rows.length % 2 === 1){
      row.reverse();
    }

    rows.push(row);
  }

  wrap.innerHTML = rows.map((row, rowIndex) => `
    <div class="timeline-row" data-row="${rowIndex}">
      ${row.map(t => {
        const originalIndex = tiles.indexOf(t);

        return `
          <div class="timeline-stop">
            <button
              type="button"
              class="timeline-tile"
              data-index="${originalIndex}"
              aria-expanded="false"
            >
              ${t.question || ""}
            </button>
          </div>
        `;
      }).join("")}
    </div>
  `).join("");

  if(panel){
    panel.classList.remove("open");
    panel.innerHTML = "";
  }

  wrap.querySelectorAll(".timeline-tile").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.index);
      const tile = tiles[idx];

      const stop = btn.closest(".timeline-stop");
      const alreadyActive = stop.classList.contains("active");

      /*
        Close every other tile first.
      */
      wrap
        .querySelectorAll(".timeline-stop")
        .forEach(s => s.classList.remove("active"));

      wrap
        .querySelectorAll(".timeline-tile")
        .forEach(b => b.setAttribute("aria-expanded","false"));

      /*
        Clicking the currently open tile closes
        the shared answer panel.
      */
      if(alreadyActive){
        if(panel){
          panel.classList.remove("open");
        }

        return;
      }

      /*
        Open selected tile.
      */
      stop.classList.add("active");
      btn.setAttribute("aria-expanded","true");

      if(panel){
        panel.innerHTML = `<p>${tile.full || ""}</p>`;
        panel.classList.add("open");
      }
    });
  });
}

/* ===== LOAD EVERYTHING ===== */
loadSettings();
loadEssays();
loadUpdates();
loadBooks();
loadAboutTimeline();
