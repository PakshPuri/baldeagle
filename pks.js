let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');
let img4 = document.getElementById('img4');
let img5 = document.getElementById('img5');
let img6 = document.getElementById('img6');
let img7 = document.getElementById('img7');
let img8 = document.getElementById('img8');
let text = document.getElementById('text');
window.addEventListener('scroll', () => {
    let value = window.scrollY;
    
    text.style.transform = `translateY(${value * 0.8}px)`;
    
    // Adding the rotation variable to the end of the transform string
    img1.style.transform = `translate(${value * -0.5}px, ${value * -0.5}px) rotate(var(--rot))`;
    img2.style.transform = `translate(${value * 0.5}px, ${value * -0.5}px) rotate(var(--rot))`;
    img3.style.transform = `translate(${value * -0.5}px, ${value * 0.3}px) rotate(var(--rot))`;
    img4.style.transform = `translate(${value * 0.5}px, ${value * 0.3}px) rotate(var(--rot))`;
    img5.style.transform = `translate(${value * -0.5}px, ${value * 0.5}px) rotate(var(--rot))`;
    img6.style.transform = `translateY(${value * 0.9}px) rotate(var(--rot))`;
    img7.style.transform = `translate(${value * 0.8}px, ${value * 0.5}px) rotate(var(--rot))`;
    img8.style.transform = `translateY(${value * -0.3}px) rotate(var(--rot))`;
});
// Grab all navigation links and content sections
const navLinks = document.querySelectorAll('.navigation a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let currentSectionId = '';

    // Loop through sections to find which one is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Triggers change when the section fills 30% of the viewport
        if (window.scrollY >= (sectionTop - sectionHeight * 0.3)) {
            currentSectionId = section.getAttribute('id');
        }
    });

    // Remove active class from all links, add it to the matching link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
});
