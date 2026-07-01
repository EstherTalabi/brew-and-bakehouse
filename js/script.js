const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {

    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const selectedCategory = button.getAttribute("data-filter");

    menuCards.forEach(function (card) {
      const cardCategory = card.getAttribute("data-category");

      if (selectedCategory === "all" || cardCategory === selectedCategory) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });

  });
});


let cart = JSON.parse(localStorage.getItem("cart")) || [];

const addButtons = document.querySelectorAll(".add-btn");
const cartCountElements = document.querySelectorAll("#cartCount");

updateCartCount();

addButtons.forEach(function (button) {
  button.addEventListener("click", function () {

    const itemName = button.getAttribute("data-name");
    const itemPrice = Number(button.getAttribute("data-price"));

    cart.push({ name: itemName, price: itemPrice });

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

  });
});

function updateCartCount() {
  cartCountElements.forEach(function (el) {
    el.textContent = cart.length;
  });
}


const cartBox = document.getElementById("cartBox");

if (cartBox) {

  if (cart.length === 0) {
    cartBox.innerHTML = "<p class='text-center text-muted py-5'>Your cart is empty.</p>";
  } else {

    // Build cart items list
    let cartHTML = "";
    let total = 0;

    cart.forEach(function (item) {
      cartHTML += "<div class='cart-line'><span>" + item.name + "</span><span>₦" + item.price.toLocaleString() + "</span></div>";
      total += item.price;
    });

    cartBox.innerHTML = cartHTML;

    // Show total
    document.getElementById("cartActions").style.display = "block";
    document.getElementById("cartTotal").textContent = "Total: ₦" + total.toLocaleString();

    // Show checkout form
    document.getElementById("checkoutForm").style.display = "block";

    // Hide "browse menu" button since cart has items
    document.getElementById("browseBtn").style.display = "none";

  }

  // PLACE ORDER button
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", function () {

      const name = document.getElementById("customerName").value;
      const phone = document.getElementById("customerPhone").value;
      const email = document.getElementById("customerEmail").value;
      const time = document.getElementById("pickupTime").value;

      // Check that required fields are filled
      if (name === "" || phone === "" || email === "" || time === "") {
        alert("Please fill in all required fields before placing your order.");
        return;
      }

      // Show success message
      document.getElementById("orderSuccess").style.display = "block";

      // Clear the cart from storage
      localStorage.removeItem("cart");
      cart = [];
      updateCartCount();

      // Hide the place order button after ordering
      placeOrderBtn.style.display = "none";

    });
  }

  // CLEAR CART button
  const clearCartBtn = document.getElementById("clearCartBtn");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", function () {
      localStorage.removeItem("cart");
      cart = [];
      updateCartCount();
      location.reload();
    });
  }

}