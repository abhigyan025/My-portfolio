// INTRO
window.onload=()=>{
let text="Kumar Abhigyan";
let i=0;

setTimeout(()=>{
let t=setInterval(()=>{
document.getElementById("intro-name").innerText=text.slice(0,i)+"|";
i++;
if(i>text.length){
clearInterval(t);
document.getElementById("intro").style.display="none";
}
},60);
},800);
}

// MENU
function toggleMenu(){
document.getElementById("menu").classList.toggle("show");
}

// ABOUT
function toggleAbout(){
let el=document.getElementById("about-more");
el.style.display=el.style.display==="block"?"none":"block";
}

// ESSAY
function toggleEssay(){
let el=document.getElementById("essay-more");
el.style.display=el.style.display==="block"?"none":"block";
}

// REVEAL
let obs=new IntersectionObserver(e=>{
e.forEach(x=>{
if(x.isIntersecting){
x.target.classList.add("active");
}
});
});
document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));
