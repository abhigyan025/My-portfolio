const lines = [
"Observing power, systems, and society",
"Understanding what changes — and what only appears to",
"Writing what most people overlook",
"Clarity over noise. Always.",
"A perspective shaped by questions, not assumptions"
];

let i = 0;
setInterval(()=>{
document.getElementById("hero-rotate").innerText = lines[i];
i = (i+1)%lines.length;
},3000);

// MENU
function toggleMenu(){
document.getElementById("menu").classList.toggle("show");
document.getElementById("overlay").classList.toggle("show");
}

// ABOUT
function toggleAbout(){
document.getElementById("about-full").classList.toggle("show");
}

// ESSAY
function openEssay(){
document.getElementById("essay-modal").style.display="flex";
}

function closeEssay(){
document.getElementById("essay-modal").style.display="none";
}

// GSAP ANIMATIONS
gsap.from(".hero h1",{opacity:0,y:30,duration:1});
gsap.from(".book",{opacity:0,y:40,stagger:0.2,scrollTrigger:".book"});
