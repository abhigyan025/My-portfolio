// INTRO TYPE EFFECT
window.addEventListener("load", () => {

const intro = document.getElementById("intro");
const name = document.getElementById("intro-name");

let text = "Kumar Abhigyan";
let i = 0;

setTimeout(() => {

const typing = setInterval(() => {
name.innerText = text.slice(0, i);
i++;

if(i > text.length){
clearInterval(typing);

setTimeout(()=>{
intro.style.opacity = "0";
setTimeout(()=>{intro.style.display="none";},600);
},500);

}

},70);

},600);

});

// MENU
function toggleMenu(){
const menu=document.getElementById("menu");
menu.classList.toggle("show");
}

// ABOUT TOGGLE
function toggleAbout(){
const el=document.getElementById("about-more");

if(el.style.maxHeight){
el.style.maxHeight=null;
}else{
el.style.maxHeight=el.scrollHeight+"px";
}
}

// ESSAY TOGGLE
function toggleEssay(){
const el=document.getElementById("essay-more");

if(el.style.maxHeight){
el.style.maxHeight=null;
}else{
el.style.maxHeight=el.scrollHeight+"px";
}
}

// SCROLL REVEAL
const elements=document.querySelectorAll(".reveal");

const observer=new IntersectionObserver((entries)=>{
let delay=0;

entries.forEach(entry=>{
if(entry.isIntersecting){
setTimeout(()=>{
entry.target.classList.add("active");
},delay);
delay+=120;
}
});

},{threshold:0.15});

elements.forEach(el=>observer.observe(el));

// PARALLAX HERO
window.addEventListener("scroll",()=>{
const hero=document.querySelector(".hero");
if(!hero) return;

let y=window.scrollY;
hero.style.transform="translateY(${y*0.15}px)";
hero.style.opacity=1-y/500;
});
