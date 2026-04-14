// INTRO
const text="Kumar Abhigyan";
let i=0;

setTimeout(()=>{
document.getElementById("intro-line").style.opacity=0;

let typing=setInterval(()=>{
document.getElementById("intro-name").innerText=text.slice(0,i)+"|";
i++;
if(i>text.length){
clearInterval(typing);
setTimeout(()=>{
document.getElementById("intro").style.display="none";
},800);
}
},60);

},1000);

// MENU
function toggleMenu(){
document.getElementById("menu").classList.toggle("show");
}

// ESSAY
function toggleEssay(){
let el=document.getElementById("essay-more");
el.style.display=el.style.display==="block"?"none":"block";
}

// ROTATE
const lines=["Clarity over noise","Thinking deeper","Observing systems"];
let j=0;
setInterval(()=>{
document.getElementById("rotate").innerText=lines[j];
j=(j+1)%lines.length;
},3000);

// REVEAL
const reveals=document.querySelectorAll("section,.book,.about-block");

const observer=new IntersectionObserver(entries=>{
entries.forEach(e=>{
if(e.isIntersecting){
e.target.classList.add("active");
}
});
});

reveals.forEach(el=>{
el.classList.add("reveal");
observer.observe(el);
});
