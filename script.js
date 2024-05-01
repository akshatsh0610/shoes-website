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

let content;
const shoppingBag=document.getElementById('shopping-bag');
const Cart=document.querySelector('.cart')
shoppingBag.addEventListener('click',(event)=>{
    event.preventDefault();
    Cart.classList.add('active')
})

const cart={}; 


function addToCart(item) {
    const itemName = item.name;
    if (cart[itemName]) {
      cart[itemName].quantity++;
    } else {
      cart[itemName] = { ...item, quantity: 1 };
    }
    updateCartUI();
}
  
function updateCartUI() {
    const cartItemsElement = document.querySelector('.cart-items')
    cartItemsElement.innerHTML = ''; 
    for (const i in cart) {
        const item = cart[i];
        const listItem = document.createElement('div');
        listItem.classList.add('cart-item');

        const deleteBtn=document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent="X";
        deleteBtn.addEventListener('click', () => removeItemFromCart(i)); 
        listItem.appendChild(deleteBtn);

        const img = document.createElement('img');
        img.classList.add('item-img');
        img.src = item.imageSrc;
        img.alt = item.name;
        listItem.appendChild(img);

        const nameElement = document.createElement('div');
        nameElement.classList.add('item-name');
        nameElement.textContent = i;
        listItem.appendChild(nameElement);

        const priceElement = document.createElement('div');
        priceElement.classList.add('item-price');
        priceElement.textContent = `Price: ${item.price}`;
        listItem.appendChild(priceElement);

        const quantityElement = document.createElement('div');
        quantityElement.classList.add('item-quantity');
        const quantity_no=document.createElement('h3');
        quantity_no.textContent = `Quantity: ${item.quantity}`;
        quantityElement.appendChild(quantity_no);

        const incrementBtn = document.createElement('button');
        incrementBtn.classList.add('increment-btn');
        incrementBtn.textContent = "+";
        incrementBtn.addEventListener('click', () => increaseQuantity(i));
        quantityElement.appendChild(incrementBtn);
        listItem.appendChild(quantityElement);

        const decrementBtn = document.createElement('button');
        decrementBtn.classList.add('decrement-btn');
        decrementBtn.textContent = "-";
        decrementBtn.addEventListener('click', () => decreaseQuantity(i));
        quantityElement.appendChild(decrementBtn);

        cartItemsElement.appendChild(listItem);
    }
}


const addToCartBtns=document.querySelectorAll('.btn');

addToCartBtns.forEach(button=>{
    button.addEventListener('click',(event)=>{
        event.preventDefault();
        const item = button.closest('.best-seller-card');
        const itemData = {
            name: item.querySelector('h3').textContent.trim(),
            imageSrc: item.querySelector('img').src,
            price: item.querySelector('.price').textContent.trim()
        };
        addToCart(itemData);
    })
})

function removeItemFromCart(itemName) {
    delete cart[itemName]; // Remove item from cart
    updateCartUI(); // Update cart UI
}

function increaseQuantity(itemName) {
    cart[itemName].quantity++; // Increment quantity
    updateCartUI(); // Update cart UI
}

function decreaseQuantity(itemName) {
    if (cart[itemName].quantity > 0) {
        cart[itemName].quantity--; 
    }
    if(cart[itemName].quantity==0){
        removeItemFromCart(itemName);
    }
    updateCartUI(); // Update cart UI
}