let category_nav_list = document.querySelector(
  ".buttom_header .category_nav .category_nav_list"
);
function open_Category_list() {
  category_nav_list.classList.toggle("active");
}

var cart = document.querySelector(".cart");
function open_close_cart() {
  cart.classList.toggle("active");
}
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    const addToCartButton = document.querySelectorAll(".btn_add_to_cart");
    addToCartButton.forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.target.getAttribute("data-id");
        const selectedProduct = data.find((product) => product.id == productId);
        addToCart(selectedProduct);
        const allMatchingButtons = document.querySelectorAll(
          `.btn_add_to_cart[data-id="${productId}"]`
        );
        allMatchingButtons.forEach((button) => {
          button.classList.add("active");
          button.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>Item in cart`;
        });
      });
    });
  });
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ ...product, quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart_items");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  var totalPrice = 0;
  var totalCount = 0;
  cartItems.innerHTML = ``;
  cart.forEach((item, index) => {
    totalPrice += item.price * item.quantity;
    totalCount += item.quantity;
    cartItems.innerHTML += `
    <div class="item_cart">
          <img src="${item.img}" alt="" />
          <div class="content">
            <h4>${item.name}</h4>
            <p class="price_cart">$${item.quantity * item.price}</p>
            <div class="quantity_control">
              <button class="decrease_quantity" data_index="${index}">-</button>
              <span class="quantity">${item.quantity}</span>
              <button class="increase_quantity" data_index="${index}">+</button>
            </div>
          </div>
          <button class="delete_item" data_index="${index}">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
    
    `;
  });

  const priceCardTotal = document.querySelector(".price_cart_total");
  const countItemcard = document.querySelector(".count_item_cart");
  const countItemHeader = document.querySelector(".count_cart");

  priceCardTotal.innerHTML = `$${totalPrice}`;
  countItemcard.innerHTML = `${totalCount}`;
  countItemHeader.innerHTML = `${totalCount}`;

  const increaseButtons = document.querySelectorAll(".increase_quantity");
  const decreaseButtons = document.querySelectorAll(".decrease_quantity");
  increaseButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemIndex = button.getAttribute("data_index");
      increaseQuantity(itemIndex);
    });
  });
  decreaseButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemIndex = button.getAttribute("data_index");
      decreaseQuantity(itemIndex);
    });
  });

  const deleteButtons = document.querySelectorAll(".delete_item");
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", (event) => {
      const itemIndex = event.target
        .closest("button")
        .getAttribute("data_index");
      removeFromCart(itemIndex);
    });
  });
}
updateCart();

function increaseQuantity(itemIndex) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[itemIndex].quantity++;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}
function decreaseQuantity(itemIndex) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[itemIndex].quantity > 1) {
    cart[itemIndex].quantity--;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}
function removeFromCart(itemIndex) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const removedProduct = cart.splice(itemIndex, 1)[0];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  updateButtonState(removedProduct.id);
}
function updateButtonState(productId) {
  const allMatchingButtons = document.querySelectorAll(
    `.btn_add_to_cart[data-id="${productId}"]`
  );
  allMatchingButtons.forEach((button) => {
    button.classList.remove("active");
    button.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>Add to cart`;
  });
}
