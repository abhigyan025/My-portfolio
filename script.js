// INTRO FIX
window.onload=()=>{
let intro=document.getElementById("intro");
let name=document.getElementById("intro-name");
let text="Kumar Abhigyan",i=0;

let t=setInterval(()=>{
name.textContent+=text[i];
i++;
if(i>=text.length){
clearInterval(t);
setTimeout(()=>intro.style.display="none",1000);
}
},80);
};

// MENU
document.getElementById("menuBtn").onclick=()=>{
document.getElementById("menu").classList.toggle("show");
};

// ABOUT
function toggleAbout(){
let el=document.getElementById("about-more");
el.style.display=el.style.display==="block"?"none":"block";
}

// DEMO
function openDemo(link){
document.getElementById("demoModal").style.display="block";
document.getElementById("demoFrame").src=link;
}

function closeDemo(){
document.getElementById("demoModal").style.display="none";
}

// ESSAY
function openEssay(){
alert("Essay coming soon");
}
