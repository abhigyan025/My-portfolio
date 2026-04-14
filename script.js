// INTRO
let t="Kumar Abhigyan",i=0;
setTimeout(()=>{
document.getElementById("intro-line").style.opacity=0;
let x=setInterval(()=>{
document.getElementById("intro-name").innerText=t.slice(0,i)+"|";
i++;
if(i>t.length){
clearInterval(x);
setTimeout(()=>{document.getElementById("intro").style.display="none";},700);
}
},60);
},1000);

// MENU
function toggleMenu(){
document.getElementById("menu").classList.toggle("show");
}

// ESSAY
function toggleEssay(){
let e=document.getElementById("essay-more");
e.style.display=e.style.display==="block"?"none":"block";
}

// ROTATE
let lines=["Clarity over noise","Think deeper","Observe patterns"],j=0;
setInterval(()=>{
document.getElementById("rotate").innerText=lines[j];
j=(j+1)%lines.length;
},3000);
