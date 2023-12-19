let cartItems = [];

function addToCart(productName, price) {
    const item = {
        name: productName,
        price: price,
        quantity: 1
    };
    cartItems.push(item);
    updateCart();
}

function incrementQuantity(productName) {
    const item = findCartItem(productName);
    if (item) {
        item.quantity++;
        updateCart();
    }
}

function decrementQuantity(productName) {
    const item = findCartItem(productName);
    if (item && item.quantity > 0) {
        item.quantity--;
        updateCart();
    }
}

function toggleLikeButton(button) {
    button.classList.toggle('liked');
}

function findCartItem(productName) {
    return cartItems.find(item => item.name === productName);
}

function updateCart() {
    const cartItemsElement = document.getElementById("cart-items");
    cartItemsElement.innerHTML = "";

    let total = 0;

    for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];

        const li = document.createElement("li");
        li.innerHTML = `${item.name} - Quantity: ${item.quantity} - $${item.price * item.quantity}`;
        cartItemsElement.appendChild(li);

        total += item.price * item.quantity;
    }

    const totalElement = document.getElementById("total");
    totalElement.innerHTML = `Total: $${total}`;
}

function checkout() {
    // Perform checkout logic here
    // You can send the cartItems array to the server for further processing
    alert("Checkout complete!");
    cartItems = [];
    updateCart();
}

// Add event listeners to buttons
window.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.product button');
    addToCartButtons.forEach(button => {
        const productName = button.parentNode.querySelector('h3').textContent;
        const productPrice = parseFloat(button.parentNode.querySelector('p').textContent.split('$')[1]);
        button.addEventListener('click', () => {
            addToCart(productName, productPrice);
        });
    });

    const incrementButtons = document.querySelectorAll('.product-action button:first-child');
    incrementButtons.forEach(button => {
        const productName = button.parentNode.parentNode.querySelector('h3').textContent;
        button.addEventListener('click', () => {
            incrementQuantity(productName);
        });
    });

    const decrementButtons = document.querySelectorAll('.product-action button:last-child');
    decrementButtons.forEach(button => {
        const productName = button.parentNode.parentNode.querySelector('h3').textContent;
        button.addEventListener('click', () => {
            decrementQuantity(productName);
        });
    });

    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleLikeButton(button);
        });
    });
});


