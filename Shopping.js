// Function to filter products
function filterProduct(value) {
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    // Remove active class
    button.classList.remove("active");
  });
  // Add active class to clicked button
  event.target.classList.add("active");

  let elements = document.querySelectorAll(".card");
  elements.forEach((element) => {
    if (value === "all") {
      element.style.display = "block";
    } else {
      if (element.classList.contains(value)) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }
  });
}

// Function to search products
document.getElementById("search").addEventListener("click", () => {
  let searchInput = document.getElementById("search-input").value.toUpperCase();
  let products = document.querySelectorAll(".product-name");
  let cards = document.querySelectorAll(".card");

  products.forEach((product, index) => {
    if (product.innerText.toUpperCase().includes(searchInput)) {
      cards[index].style.display = "block";
    } else {
      cards[index].style.display = "none";
    }
  });
});

// Function to manage cart
document.querySelectorAll(".purchase-btn").forEach((button) => {
  button.addEventListener("click", function () {
    let card = this.closest(".card");
    let productName = card.querySelector(".product-name").innerText;
    let productPrice = parseFloat(card.querySelector("h5").innerText.replace("$", ""));
    let quantity = parseInt(card.querySelector("input[type='number']").value); // Ensure it's a number
    let size = card.querySelector("select").value; // Get the selected size

    if (quantity < 1) {
      alert("Quantity cannot be less than 1!");
      return;
    }

    let cartItems = document.getElementById("cart-items");
    let existingCartItem = Array.from(cartItems.children).find((item) =>
      item.querySelector(".cart-product-name").innerText === productName &&
      item.querySelector(".cart-product-size").innerText === `Size: ${size}`
    );

    if (existingCartItem) {
      // If item exists in the cart, update the quantity and price
      let currentQuantity = parseInt(existingCartItem.querySelector(".cart-product-quantity").innerText.replace('Qty: ', ''));
      let newQuantity = currentQuantity + quantity;
      existingCartItem.querySelector(".cart-product-quantity").innerText = `Qty: ${newQuantity}`;

      let newPrice = productPrice * newQuantity;
      existingCartItem.querySelector(".cart-product-price").innerText = `$${newPrice.toFixed(2)}`;
    } else {
      // If item does not exist, create a new cart item
      let cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <span class="cart-product-name">${productName}</span>
        <span class="cart-product-size">Size: ${size}</span>
        <span class="cart-product-price">$${(productPrice * quantity).toFixed(2)}</span>
        <span class="cart-product-quantity">Qty: ${quantity}</span>
        <button class="remove-btn">Remove</button>`;

      cartItems.appendChild(cartItem);

      // Show the purchase button if the cart is not empty
      document.getElementById("purchase-btn").style.display = "block";

      // Add event listener to remove button
      cartItem.querySelector(".remove-btn").addEventListener("click", function () {
        cartItem.remove();
        if (cartItems.children.length === 0) {
          document.getElementById("purchase-btn").style.display = "none";
        }
      });
    }
  });
});










// Manage manage html