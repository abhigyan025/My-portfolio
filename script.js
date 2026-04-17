// INTRO
window.onload=()=>{
let n=document.getElementById("intro-name");
let i=0,t="Kumar Abhigyan";
let inter=setInterval(()=>{
n.textContent+=t[i];i++;
if(i>=t.length){clearInterval(inter);
setTimeout(()=>intro.style.display="none",800);}
},70);
};

// MENU
function toggleMenu(){
document.getElementById("menu").classList.toggle("show");
}

// DARK MODE
function toggleDarkMode(){
document.body.classList.toggle("dark");
}

// ABOUT
function toggleAbout(){
let el=document.getElementById("about-more");
el.style.maxHeight=el.style.maxHeight?null:el.scrollHeight+"px";
}

// READING MODE
const essays=[
"<h2>Clarity</h2><p>Clarity is built over time through observation.</p><p>It requires removing noise and focusing on patterns.</p>",
"<h2>Patterns</h2><p>Systems repeat structures across contexts.</p>",
"<h2>Perception</h2><p>Reality differs from what is visible.</p>"
];

function openEssay(i){
document.getElementById("readingMode").style.display="block";
document.getElementById("essayContent").innerHTML=essays[i];
}

function closeReading(){
document.getElementById("readingMode").style.display="none";
}

// DEMO
function openDemo(link){
document.getElementById("demoModal").style.display="block";
document.getElementById("demoFrame").src=link;
}
function closeDemo(){
document.getElementById("demoModal").style.display="none";
}

// REVEAL
let obs=new IntersectionObserver(e=>{
e.forEach(x=>{
if(x.isIntersecting)x.target.classList.add("active");
});
});
document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));

// EASTER EGG
function easterEgg(){
alert("Clarity takes time.");
}
