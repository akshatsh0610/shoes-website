const help_btn = document.querySelector('.help');
const header_drop_down = document.querySelector('.header-drop-down');
let timeout; 

function showDropdown() {
    clearTimeout(timeout); 
    header_drop_down.classList.add('active');
}

function hideDropdown() {
    timeout = setTimeout(() => {
        header_drop_down.classList.remove('active');
    }, 200); 
}

help_btn.addEventListener('mouseover', showDropdown);
help_btn.addEventListener('mouseleave', hideDropdown);

header_drop_down.addEventListener('mouseover', showDropdown);
header_drop_down.addEventListener('mouseleave', hideDropdown);

let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}
const wrapper = document.querySelector('.best-sellers .wrapper');
const cards = document.querySelectorAll('.best-seller-card');
const prevBtn = document.querySelector('.best-sellers .prev-btn');
const nextBtn = document.querySelector('.best-sellers .next-btn');

const cardWidth = cards[0].offsetWidth; 
const visibleCards = 4;
let currentIndex = 0;

function showCards() {
    cards.forEach((card, index) => {
        if (index >= currentIndex && index < currentIndex + visibleCards) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function handlePrev() {
    if (currentIndex > 0) {
        currentIndex -= 1;
        showCards();
    }
}

function handleNext() {
    if (currentIndex < cards.length - visibleCards) {
        currentIndex += 1;
        showCards();
    }
}

prevBtn.addEventListener('click', handlePrev);
nextBtn.addEventListener('click', handleNext);

showCards(); 




