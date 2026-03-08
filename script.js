const hamburger = document.getElementById("hamburger")
const nav = document.getElementById("nav")

hamburger.onclick = () => {
nav.classList.toggle("active")
}

function toggleAbout(){

let full = document.getElementById("about-full")

if(full.style.display === "block"){
full.style.display="none"
}
else{
full.style.display="block"
}

}

function toggleEssay(){

let full = document.getElementById("essay-full")

if(full.style.display === "block"){
full.style.display="none"
}
else{
full.style.display="block"
}

}

function reveal(){

let reveals = document.querySelectorAll(".reveal")

for(let i=0;i<reveals.length;i++){

let windowHeight = window.innerHeight
let elementTop = reveals[i].getBoundingClientRect().top

if(elementTop < windowHeight - 100){
reveals[i].classList.add("active")
}

}

}

window.addEventListener("scroll", reveal)
