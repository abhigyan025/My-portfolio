/* ===== CONFIG ===== */
const SANITY_PROJECT_ID = "zsm7toak";
const SANITY_DATASET = "production";
const SANITY_API = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${SANITY_DATASET}`;

async function sanityFetch(query){
  try{
    const res = await fetch(`${SANITY_API}?query=${encodeURIComponent(query)}`);
    const json = await res.json();
    return json.result || [];
  }catch(e){
    console.warn("Sanity fetch failed", e);
    return [];
  }
}

/* ===== INTRO ===== */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("intro").classList.add("hide");
  }, 2200);
});

/* ===== MENU ===== */
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  menu.classList.remove("open");
}));

/* ===== DARK / LIGHT TOGGLE (persisted in-memory only, no localStorage per policy) ===== */
const darkToggle = document.getElementById("darkToggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

/* ===== ABOUT EXPAND ===== */
const aboutBtn = document.getElementById("aboutBtn");
const aboutMore = document.getElementById("about-more");
aboutBtn.addEventListener("click", () => {
  const open = aboutMore.classList.toggle("open");
  aboutBtn.textContent = open ? "Read Less" : "Read More";
});

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) e.target.classList.add("show");
  });
}, {threshold:.15});
revealEls.forEach(el => io.observe(el));

/* ===== DEMO MODAL ===== */
const demoModal = document.getElementById("demoModal");
const demoFrame = document.getElementById("demoFrame");
document.addEventListener("click", (e) => {
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

function openEssay(targetId){
  document.querySelectorAll(".essay-full").forEach(el => el.classList.remove("active"));
  const target = document.getElementById(targetId);
  if(target) target.classList.add("active");
  readingMode.classList.add("open");
}

document.addEventListener("click", (e) => {
  if(e.target.classList.contains("essayBtn")){
    openEssay(e.target.dataset.target);
  }
});

readingToggle.addEventListener("click", () => {
  readingMode.classList.add("open");
});
closeReading.addEventListener("click", () => {
  readingMode.classList.remove("open");
});

/* ===== LOAD DYNAMIC CONTENT FROM SANITY ===== */
async function loadEssays(){
  const essays = await sanityFetch(`*[_type=="essay"]|order(_createdAt desc)`);
  if(!essays.length) return; // fall back to hardcoded essays already in HTML

  const grid = document.querySelector(".essay-grid");
  const readingContent = document.querySelector(".reading-content");
  grid.innerHTML = "";

  essays.forEach((essay, i) => {
    const id = `dyn-essay-${i}`;
    const card = document.createElement("article");
    card.className = "essay-card";
    const words = (essay.body || "").split(" ").length;
    const mins = Math.max(1, Math.round(words / 200));
    card.innerHTML = `
      <span class="read-time">${mins} min read</span>
      <h3>${essay.title || "Untitled"}</h3>
      <p>${essay.excerpt || ""}</p>
      <button class="btn secondary essayBtn" type="button" data-target="${id}">Read</button>
    `;
    grid.appendChild(card);

    const full = document.createElement("div");
    full.id = id;
    full.className = "essay-full";
    const paras = (essay.body || "").split("\n").filter(Boolean)
      .map(p => `<p>${p}</p>`).join("");
    full.innerHTML = `
      <span class="backToEssays" role="button">&larr; Back to essays</span>
      <h2>${essay.title || "Untitled"}</h2>
      ${paras}
      <div class="share-row">
        <a class="btn secondary" target="_blank" rel="noreferrer" href="https://wa.me/?text=${encodeURIComponent(essay.title || '')}">Share on WhatsApp</a>
        <a class="btn secondary" target="_blank" rel="noreferrer" href="https://twitter.com/intent/tweet?text=${encodeURIComponent(essay.title || '')}">Share on X</a>
      </div>
    `;
    readingContent.appendChild(full);
  });

  document.querySelectorAll(".backToEssays").forEach(b => {
    b.addEventListener("click", () => readingMode.classList.remove("open"));
  });
}

async function loadUpdates(){
  const updates = await sanityFetch(`*[_type=="update"]|order(date desc)`);
  const feed = document.getElementById("updatesFeed");
  if(!feed) return;
  if(!updates.length){
    feed.innerHTML = `<p style="color:var(--slate)">No updates yet — check back soon.</p>`;
    return;
  }
  feed.innerHTML = updates.map(u => `
    <div class="update-item">
      <div class="update-date">${u.date ? new Date(u.date).toLocaleDateString('en-US',{month:'short',day:'numeric'}) : ''}</div>
      <div class="update-text">${u.text || ''}</div>
    </div>
  `).join("");
}

async function loadNewBooks(){
  const books = await sanityFetch(`*[_type=="book"]|order(_createdAt desc)`);
  if(!books.length) return;
  const grid = document.querySelector(".books-grid");
  books.forEach(b => {
    const el = document.createElement("article");
    el.className = "book";
    el.innerHTML = `
      <img src="${b.coverUrl || 'placeholder.jpg'}" alt="${b.title} cover">
      <h3>${b.title}</h3>
      <p style="color:var(--slate);font-size:.9rem">${b.tagline || ''}</p>
      ${b.comingSoon ? `<span class="read-time">Coming Soon</span>` : `<div class="btns">
        ${b.demoLink ? `<button class="btn primary demoBtn" data-demo="${b.demoLink}">Read Demo</button>` : ''}
        ${b.buyLink ? `<a class="btn secondary" href="${b.buyLink}" target="_blank" rel="noreferrer">Buy</a>` : ''}
      </div>`}
    `;
    grid.appendChild(el);
  });
}

loadEssays();
loadUpdates();
loadNewBooks();
