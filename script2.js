let lastScroll = 0;
const navbar = document.getElementById("navbar");

/* NAVBAR HIDE ON SCROLL */

window.addEventListener("scroll", () => {

const currentScroll = window.pageYOffset;

if (currentScroll <= 0) {
navbar.style.transform = "translateY(0)";
return;
}

if (currentScroll > lastScroll) {

/* scrolling down */

navbar.style.transform = "translateY(-100%)";

} else {

/* scrolling up */

navbar.style.transform = "translateY(0)";

}

lastScroll = currentScroll;

});

/* SMOOTH SCROLL */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function (e) {

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({

behavior: "smooth"

});

});

});

/* FADE IN SECTIONS */

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.style.opacity = "1";
entry.target.style.transform = "translateY(0)";

}

});

});

sections.forEach(section => {

section.style.opacity = "0";
section.style.transform = "translateY(40px)";
section.style.transition = "all 0.8s ease";

observer.observe(section);

});
