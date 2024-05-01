let content;
const shoppingBag=document.getElementById('shopping-bag');
const Cart=document.querySelector('.cart')
shoppingBag.addEventListener('click',(event)=>{
    event.preventDefault();
    if (Object.keys(cart).length === 0) {
        buyNow.style.display = "none";
        content = document.createElement('p');
        content.classList.add('cart-p');
        content.textContent = "Cart is empty";
        Cart.appendChild(content);
    }
    Cart.classList.add('active')
})

const buyNow=document.querySelector('.cart-btn');
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
    if (Object.keys(cart).length !== 0 && cart.constructor === Object) {
        buyNow.style.display = "block";
        if(content)
        Cart.removeChild(content);
    }
    else if (Object.keys(cart).length === 0 && cart.constructor === Object) {
        buyNow.style.display = "none";
        Cart.appendChild(content);
    }
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
        const item = button.closest('.card');
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