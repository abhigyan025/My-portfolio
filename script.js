// INTRO
window.addEventListener("load",()=>{
const intro=document.getElementById("intro");
const name=document.getElementById("intro-name");
if(!intro||!name)return;

let t="Kumar Abhigyan",i=0;
let inter=setInterval(()=>{
name.textContent+=t[i];i++;
if(i>=t.length){
clearInterval(inter);
setTimeout(()=>{
intro.style.opacity="0";
setTimeout(()=>intro.style.display="none",500);
},600);
}
},70);
});

// MENU
const menu=document.getElementById("menu");
document.getElementById("menuBtn").onclick=()=>{
menu.classList.toggle("show");
};
document.querySelectorAll("#menu a").forEach(a=>{
a.onclick=()=>menu.classList.remove("show");
});

// DARK MODE
document.getElementById("darkToggle").onclick=()=>{
document.body.classList.toggle("dark");
};

// ABOUT
document.getElementById("aboutBtn").onclick=()=>{
let el=document.getElementById("about-more");
el.style.maxHeight=el.style.maxHeight?null:el.scrollHeight+"px";
};

// ESSAYS
const essays=[
"<h2>Clarity</h2><p>Clarity is built over time through observation and patience.</p><p>It requires resisting noise and focusing on patterns.</p>",
"<h2>Patterns</h2><p>Systems repeat structures across contexts.</p>",
"<h2>Perception</h2><p>Reality often differs from what is visible.</p>"
];

document.querySelectorAll(".essayBtn").forEach(btn=>{
btn.onclick=()=>{
let rm=document.getElementById("readingMode");
rm.style.display="block";
setTimeout(()=>rm.classList.add("active"),10);
document.getElementById("essayContent").innerHTML=essays[btn.dataset.id];
};
});

document.getElementById("closeReading").onclick=()=>{
let rm=document.getElementById("readingMode");
rm.classList.remove("active");
setTimeout(()=>rm.style.display="none",300);
};

// DEMO
document.querySelectorAll("[data-demo]").forEach(btn=>{
btn.onclick=()=>{
document.getElementById("demoModal").style.display="block";
document.getElementById("demoFrame").src=btn.dataset.demo;
};
});
document.getElementById("closeDemo").onclick=()=>{
document.getElementById("demoModal").style.display="none";
};

// REVEAL
let obs=new IntersectionObserver(entries=>{
entries.forEach(e=>{
if(e.isIntersecting)e.target.classList.add("active");
});
});
document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));

// ESC CLOSE
document.addEventListener("keydown",e=>{
if(e.key==="Escape"){
document.getElementById("readingMode").style.display="none";
document.getElementById("demoModal").style.display="none";
}
});

// EASTER EGG
let clicks=0;
document.getElementById("easter").onclick=()=>{
clicks++;
if(clicks===3){
alert("You noticed.");
clicks=0;
}
};
