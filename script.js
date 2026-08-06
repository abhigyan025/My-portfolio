/* ===== CONFIG ===== */
const SANITY_PROJECT_ID = "zsm7toak";
const SANITY_DATASET = "production";
const SANITY_API = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${SANITY_DATASET}`;

async function sanityFetch(query){
  try{
    const res = await fetch(`${SANITY_API}?query=${encodeURIComponent(query)}`);
    const json = await res.json();
    return json.result || [];
  }catch(e){ console.warn("Sanity fetch failed",e); return []; }
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
menuBtn.addEventListener("click", () => menu.classList.contains("open") ? closeMenu() : openMenu());
menuOverlay.addEventListener("click", closeMenu);
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

/* ===== DARK MODE ===== */
const darkToggle = document.getElementById("darkToggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  darkToggle.textContent = document.body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
  closeMenu();
});

/* ===== ABOUT EXPAND (long-form bottom section) ===== */
const aboutBtn = document.getElementById("aboutBtn");
const aboutMore = document.getElementById("about-more");
if(aboutBtn){
  aboutBtn.addEventListener("click", () => {
    const open = aboutMore.classList.toggle("open");
    aboutBtn.textContent = open ? "Read Less" : "Read More";
  });
}

/* ===== ABOUT CARDS TOGGLE (global read more for the 6 cards) ===== */
const cardsToggle = document.getElementById("cardsToggle");
const aboutCards = document.querySelector(".about-cards");
if(cardsToggle && aboutCards){
  cardsToggle.addEventListener("click", () => {
    const open = aboutCards.classList.toggle("show-more");
    cardsToggle.textContent = open ? "Read Less" : "Read More";
    cardsToggle.setAttribute("aria-expanded", open);
  });
}

/* ===== SCROLL REVEAL ===== */
const revealIO = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("show"); });
}, {threshold:.1});
document.querySelectorAll(".reveal").forEach(el => revealIO.observe(el));

/* ===== ACTIVE NAV ON SCROLL ===== */
const navLinks = document.querySelectorAll(".nav-links a[data-section]");
const sections = document.querySelectorAll("section[id]");
const activeNavIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      navLinks.forEach(a => {
        a.classList.toggle("active", a.dataset.section === e.target.id);
      });
    }
  });
}, {rootMargin:"-40% 0px -55% 0px"});
sections.forEach(s => activeNavIO.observe(s));

/* ===== PAGE PROGRESS BAR ===== */
const pageProgress = document.getElementById("pageProgress");
window.addEventListener("scroll", () => {
  const total = document.body.scrollHeight - window.innerHeight;
  pageProgress.style.width = (total > 0 ? window.scrollY / total * 100 : 0) + "%";
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
  document.querySelectorAll(".essay-full").forEach(el => el.classList.remove("active"));
  const target = document.getElementById(targetId);
  if(target) target.classList.add("active");
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
  if(e.target.classList.contains("essayBtn")) openEssay(e.target.dataset.target);
  if(e.target.classList.contains("backToEssays")) closeReadingMode();
});
readingToggle.addEventListener("click", () => { readingMode.classList.add("open"); closeMenu(); });
closeReading.addEventListener("click", closeReadingMode);

/* ===== READING PROGRESS BAR ===== */
readingMode.addEventListener("scroll", () => {
  const pct = readingMode.scrollHeight - readingMode.clientHeight;
  progressBar.style.width = (pct > 0 ? readingMode.scrollTop / pct * 100 : 0) + "%";
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
  focusBtn.textContent = readingMode.classList.contains("focus-mode") ? "Exit Focus" : "Focus";
});

/* ===== SUBSCRIBE FORM (placeholder) ===== */
const subscribeForm = document.getElementById("subscribeForm");
if(subscribeForm){
  subscribeForm.addEventListener("submit", e => {
    e.preventDefault();
    const status = document.getElementById("subscribeStatus");
    status.textContent = "✅ Email registered! I'll let you know when something new drops.";
    status.style.color = "var(--gold)";
    e.target.reset();
  });
}

/* ===== SANITY: LOAD ESSAYS ===== */
async function loadEssays(){
  const essays = await sanityFetch(`*[_type=="essay"]|order(_createdAt desc)`);
  if(!essays.length) return;
  const grid = document.querySelector(".essay-grid");
  const readingContent = document.querySelector(".reading-content");
  grid.innerHTML = "";
  essays.forEach((essay, i) => {
    const id = `dyn-essay-${i}`;
    const words = (essay.body||"").split(" ").length;
    const mins = Math.max(1, Math.round(words/200));
    const card = document.createElement("article");
    card.className = "essay-card";
    card.innerHTML = `
      <span class="read-time">${mins} min read</span>
      <h3>${essay.title||"Untitled"}</h3>
      <p>${essay.excerpt||""}</p>
      <button class="btn secondary essayBtn" type="button" data-target="${id}">Read</button>`;
    grid.appendChild(card);
    const full = document.createElement("div");
    full.id = id; full.className = "essay-full";
    full.innerHTML = `
      <span class="backToEssays">&larr; All Essays</span>
      <p class="essay-meta"><span class="read-time">${mins} min read</span></p>
      <h2>${essay.title||"Untitled"}</h2>
      ${(essay.body||"").split("\n").filter(Boolean).map(p=>`<p>${p}</p>`).join("")}
      <div class="share-row">
        <a class="btn secondary" target="_blank" rel="noreferrer" href="https://wa.me/?text=${encodeURIComponent(essay.title||'')}">Share on WhatsApp</a>
        <a class="btn secondary" target="_blank" rel="noreferrer" href="https://twitter.com/intent/tweet?text=${encodeURIComponent(essay.title||'')}">Share on X</a>
      </div>`;
    readingContent.appendChild(full);
  });
}

/* ===== SANITY: LOAD UPDATES ===== */
async function loadUpdates(){
  const updates = await sanityFetch(`*[_type=="update"]|order(date desc)`);
  const feed = document.getElementById("updatesFeed");
  if(!feed) return;
  feed.innerHTML = !updates.length
    ? `<p style="color:var(--slate);padding:24px 0">No updates yet — check back soon.</p>`
    : updates.map(u=>`
      <div class="update-item">
        <div class="update-date">${u.date?new Date(u.date).toLocaleDateString('en-US',{month:'short',day:'numeric'}):''}</div>
        <div class="update-text">${u.text||''}</div>
      </div>`).join("");
}

/* ===== SANITY: LOAD BOOKS ===== */
async function loadNewBooks(){
  const books = await sanityFetch(`*[_type=="book"]|order(_createdAt desc)`);
  if(!books.length) return;
  const grid = document.querySelector(".books-grid");
  let idx = grid.querySelectorAll(".book").length + 1;
  books.forEach(b => {
    const el = document.createElement("article");
    el.className = "book";
    el.innerHTML = `
      <span class="book-index">${String(idx).padStart(2,"0")}</span>
      <div class="book-cover-wrap">
        <img src="${b.coverUrl||'placeholder.jpg'}" alt="${b.title} cover">
      </div>
      <h3>${b.title}</h3>
      <p class="book-excerpt">${b.tagline||''}</p>
      ${b.comingSoon
        ? `<span class="read-time">Coming Soon</span>`
        : `<div class="btns">
            ${b.demoLink?`<button class="btn primary demoBtn" data-demo="${b.demoLink}">Read Demo</button>`:''}
            ${b.buyLink?`<a class="btn secondary" href="${b.buyLink}" target="_blank" rel="noreferrer">Buy</a>`:''}
           </div>`}`;
    grid.appendChild(el);
    idx++;
  });
}

loadEssays();
loadUpdates();
loadNewBooks();
