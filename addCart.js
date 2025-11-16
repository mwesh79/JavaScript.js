const cartIcon = document.getElementById("cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.getElementById("cart-close");


//adding eventListener to the cartIcon and eventListener
cartIcon.addEventListener('click', () => {
    cart.classList.add("active")
});
cartClose.addEventListener('click', () => {
    cart.classList.remove("active")
});


//adding functionality to the cart button
const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
    });
});




const cartContent = document.querySelector(".cart-content");
const addToCart = productBox => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    //when a product is repeated a windows alert pops
const cartItems = cartContent.querySelectorAll(".cart-product-title");
for (let item of cartItems) {
    if (item.textContent === productTitle) {
        alert("This product is already in the cart.");
        return;
    }
}

    
    //creating the element to be added to the cart and the key concept method is object distructuring
    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
                <img src="${productImgSrc}" alt="cart-img">
                    <div class="cart-details">
                        <h2 class="cart-product-title">${productTitle}</h2>
                        <span class="cart-price">${productPrice}</span>
                        <div class="cart-quantity">
                            <button id="decrement">-</button>
                            <span class="number">1</span>
                            <button id="increment">+</button>
                        </div>
                    </div>
                    <i class="ri-delete-bin-6-line cart-remove"></i>
                    `;
    cartContent.appendChild(cartBox);

    //delete function for remove or deleting items from the cart
    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();

        updateCartCount(-1)

        updateTotalPrice();
    });

    //adding functionality to the quantity 
    cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = numberElement.textContent;

        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
            if (quantity === 1) {
                decrementButton.style.color = "#999";
            }
         }else if (event.target.id === "increment") {
                quantity++;
                decrementButton.style.color = "#333";
            
        }
        numberElement.textContent = quantity;

        updateTotalPrice();
    });

    updateCartCount(1);

    updateTotalPrice();

};

const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        const price = priceElement.textContent.replace("$", "");
        const quantity = quantityElement.textContent;
        total += price * quantity;
    });
    totalPriceElement.textContent = `$${total}`;
};

//updating the cartItemCount
let cartItemCount = 0;
const updateCartCount = (change) => {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    }
};

const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0) {
        alert("your cart is empty.");
        return;
    }
    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;
    updateCartCount(0);

    updateTotalPrice();

    alert("Purchase successful.");

});



