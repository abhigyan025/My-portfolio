// INTRO
window.onload=()=>{
let name=document.getElementById("intro-name");
let intro=document.getElementById("intro");
let text="Kumar Abhigyan";
let i=0;

let t=setInterval(()=>{
name.textContent+=text[i];
i++;
if(i>=text.length){
clearInterval(t);
setTimeout(()=>intro.style.display="none",1000);
}
},80);
};

// MENU FIX
function toggleMenu(){
document.getElementById("menu").classList.toggle("show");
}

// DARK MODE
function toggleDarkMode(){
document.body.classList.toggle("dark");
}

// READING MODE
function toggleReadingMode(){
document.getElementById("readingMode").style.display="block";
}

function closeReading(){
document.getElementById("readingMode").style.display="none";
}

// ESSAYS CONTENT
const essays=[
"<h2>On Clarity</h2><p>Clarity is not immediate. It is built slowly through observation, pattern recognition, and removing unnecessary noise.</p><p>Over time, consistent thinking leads to deeper understanding.</p>",

"<h2>Patterns & Systems</h2><p>Systems behave in repeatable ways. Understanding patterns allows better prediction of outcomes.</p>",

"<h2>Perception vs Reality</h2><p>What appears stable is often shifting beneath the surface.</p>"
];

function openEssay(i){
document.getElementById("readingMode").style.display="block";
document.getElementById("essayContent").innerHTML=essays[i];
}

// DEMO
function openDemo(link){
document.getElementById("demoModal").style.display="block";
document.getElementById("demoFrame").src=link;
}

function closeDemo(){
document.getElementById("demoModal").style.display="none";
}
