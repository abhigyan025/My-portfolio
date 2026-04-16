// SAFE LOAD
window.onload = () => {

let text = "Kumar Abhigyan";
let i = 0;

setTimeout(() => {
document.getElementById("intro-line").style.opacity = 0;

let typing = setInterval(() => {
document.getElementById("intro-name").innerText = text.slice(0, i) + "|";
i++;

if (i > text.length) {
clearInterval(typing);

setTimeout(() => {
document.getElementById("intro").style.display = "none";
}, 800);
}
}, 60);

}, 1000);

};

// ABOUT TOGGLE
function toggleAbout(){
let el=document.getElementById("about-more");
el.style.display=el.style.display==="block"?"none":"block";
}

// MENU
function toggleMenu(){
let m=document.getElementById("menu");
m.classList.toggle("show");
}

// SCROLL REVEAL
const observer=new IntersectionObserver(entries=>{
entries.forEach(e=>{
if(e.isIntersecting){
e.target.classList.add("active");
}
});
});

document.querySelectorAll(".reveal").forEach(el=>{
observer.observe(el);
});
