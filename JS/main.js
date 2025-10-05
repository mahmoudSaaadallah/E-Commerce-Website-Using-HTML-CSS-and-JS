let category_nav_list = document.querySelector(
  ".buttom_header .category_nav .category_nav_list"
);
function open_Category_list() {
  category_nav_list.classList.toggle("active");
}
let nav_links = document.querySelector(".nav_links");
function open_menu() {
  nav_links.classList.toggle("active");
}
var cart = document.querySelector(".cart");
var fav = document.querySelector(".fav");
function open_close_cart() {
  cart.classList.toggle("active");
}
function open_close_fav() {
  fav.classList.toggle("active");
}
fetch("../products.json")
  .then((response) => response.json())
  .then((data) => {
    const addToCartButton = document.querySelectorAll(".btn_add_to_cart");
    addToCartButton.forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = button.getAttribute("data-id");
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

    // Favorite buttons (delegated) - works for dynamically-rendered buttons
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn_fav");
      if (!btn) return;
      const productId = btn.getAttribute("data-id");
      const selectedProduct = data.find((product) => product.id == productId);
      const favList = JSON.parse(localStorage.getItem("fav")) || [];
      const exists = favList.some((p) => p.id == productId);
      if (!exists && selectedProduct) {
        addToFav(selectedProduct);
      } else {
        removeFromFav(productId);
      }
      updateFav();
    });
  });
// Fav

function addToFav(product) {
  let fav = JSON.parse(localStorage.getItem("fav")) || [];
  // store minimal product info for favorites (no quantity)
  fav.push({
    id: product.id,
    name: product.name,
    price: product.price,
    img: product.img,
  });
  localStorage.setItem("fav", JSON.stringify(fav));
  updateFav();
}

//End Fav

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ ...product, quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart_items");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cart);

  const checkoutItems = document.getElementById("Checkoutitems");

  if (checkoutItems) {
    checkoutItems.innerHTML = "";
  }

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

    if (checkoutItems) {
      checkoutItems.innerHTML += `
      <div class="item_cart">
                <div class="image_name">
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
                </div>

                <button class="delete_item"  data_index="${index}">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
      `;
    }
  });

  const priceCardTotal = document.querySelector(".price_cart_total");
  const countItemcard = document.querySelector(".count_item_cart");
  const countItemHeader = document.querySelector(".count_cart");

  priceCardTotal.innerHTML = `$${totalPrice}`;
  countItemcard.innerHTML = `${totalCount}`;
  countItemHeader.innerHTML = `${totalCount}`;
  if (checkoutItems) {
    const subtotal_checkout = document.querySelector(".subtotal_checkout");
    const total_checkout = document.querySelector(".total_checkout");
    subtotal_checkout.innerHTML = `$${totalPrice}`;
    total_checkout.innerHTML = `$${totalPrice + 20}`;
  }

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
// Add a product object to cart, merging duplicates by incrementing quantity
function addFavItemToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const idx = cart.findIndex((p) => p.id == product.id);
  if (idx > -1) {
    cart[idx].quantity = (cart[idx].quantity || 0) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  // mark buttons across the page as "in cart"
  const allAddButtons = document.querySelectorAll(
    `.btn_add_to_cart[data-id="${product.id}"], .add_fav_to_cart[data-id="${product.id}"]`
  );
  allAddButtons.forEach((button) => {
    button.classList.add("active");
    button.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>Item in cart`;
  });
}

function removeFromFav(productId) {
  let fav = JSON.parse(localStorage.getItem("fav")) || [];
  const idx = fav.findIndex((p) => p.id == productId);
  if (idx > -1) {
    fav.splice(idx, 1);
    localStorage.setItem("fav", JSON.stringify(fav));
  }
  updateFav();
}

function updateFav() {
  const favItems = document.getElementById("fav_items");
  const favHeaderCount = document.querySelector(".count_favorite");
  let fav = JSON.parse(localStorage.getItem("fav")) || [];
  if (favItems) {
    favItems.innerHTML = "";
    // read current cart to determine button states
    const cartNow = JSON.parse(localStorage.getItem("cart")) || [];
    fav.forEach((item, index) => {
      const isInCart = cartNow.some((c) => c.id == item.id);
      favItems.innerHTML += `
      <div class="item_fav">
        <img src="${item.img}" alt="" />
        <div class="content">
          <h4>${item.name}</h4>
          <p class="price_cart">$${item.price}</p>
        </div>
        <div class="fav_actions">
          <button class="add_fav_to_cart btn" data-id="${item.id}" ${
        isInCart ? 'disabled aria-disabled="true"' : ""
      }>
            <i class="fa-solid fa-cart-shopping"></i>${
              isInCart ? "In cart" : "Add to cart"
            }
          </button>
          <button class="delete_item_fav" data_index="${index}">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
      `;
    });

    // attach delete listeners
    const deleteFavButtons = favItems.querySelectorAll(".delete_item_fav");
    deleteFavButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = e.target.closest("button").getAttribute("data_index");
        let fav = JSON.parse(localStorage.getItem("fav")) || [];
        const removed = fav.splice(idx, 1)[0];
        localStorage.setItem("fav", JSON.stringify(fav));
        updateFav();
        updateFavButtonState(removed.id);
      });
    });

    // attach "Add to cart" listeners for fav items
    const addFavToCartButtons = favItems.querySelectorAll(".add_fav_to_cart");
    addFavToCartButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productId = btn.getAttribute("data-id");
        // prevent action if button is disabled (double check)
        if (btn.disabled) return;
        const favList = JSON.parse(localStorage.getItem("fav")) || [];
        const favProduct = favList.find((p) => p.id == productId);
        if (!favProduct) return;
        const prodForCart = {
          id: favProduct.id,
          name: favProduct.name,
          price: Number(favProduct.price),
          img: favProduct.img,
        };
        // If already in cart, do nothing; otherwise add and disable button
        let cartNow = JSON.parse(localStorage.getItem("cart")) || [];
        const already = cartNow.some((c) => c.id == prodForCart.id);
        if (already) {
          // disable the button and ensure it shows "In cart"
          btn.disabled = true;
          btn.setAttribute("aria-disabled", "true");
          btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>In cart`;
          return;
        }
        addFavItemToCart(prodForCart);
        updateCart();
        // disable this button to prevent adding again
        btn.disabled = true;
        btn.setAttribute("aria-disabled", "true");
        btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>In cart`;
        // also update catalog buttons
        updateButtonState(productId);
      });
    });
  }
  if (favHeaderCount) favHeaderCount.innerText = fav.length;

  // Sync favorite button states across the page
  const allFavButtons = document.querySelectorAll(".btn_fav");
  allFavButtons.forEach((btn) => {
    const id = btn.getAttribute("data-id");
    const exists = fav.some((p) => p.id == id);
    if (exists) btn.classList.add("active");
    else btn.classList.remove("active");
  });
}

function updateFavButtonState(productId) {
  const allFavButtons = document.querySelectorAll(
    `.btn_fav[data-id="${productId}"]`
  );
  const fav = JSON.parse(localStorage.getItem("fav")) || [];
  const exists = fav.some((p) => p.id == productId);
  allFavButtons.forEach((button) => {
    if (exists) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}
updateCart();
updateFav();

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
  // sync favorite buttons (re-enable add from fav if item removed)
  updateFav();
}
function updateButtonState(productId) {
  const allMatchingButtons = document.querySelectorAll(
    `.btn_add_to_cart[data-id="${productId}"], .add_fav_to_cart[data-id="${productId}"]`
  );
  allMatchingButtons.forEach((button) => {
    button.classList.remove("active");
    button.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>Add to cart`;
  });
}
const emailCheck = document.getElementById("email_check");
const nameCheck = document.getElementById("name_check");
const addressCheck = document.getElementById("address_check");
const phoneCheck = document.getElementById("phone_check");
function checked() {
  const regexemail = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  const regexname = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
  const regexaddress = /^[A-Za-z0-9-]+$/;
  const regexPhone =
    /^\+?\d{1,4}?[-.\s]?(\(?\d{1,5}\)?)[-.\s]?\d{1,5}[-.\s]?\d{1,9}$/;
  if (
    regexemail.test(emailCheck.value) &&
    regexname.test(nameCheck.value) &&
    regexaddress.test(addressCheck.value) &&
    regexPhone.test(phoneCheck.value)
  ) {
    localStorage.removeItem("cart");
    updateCart();
  }
}
const bodyHtml = document.querySelector(".slider_products");
const searchInput = document.getElementById("search");
function search(productname) {
  const filter = searchInput.value;
  bodyHtml.innerHTML = "";
}

document.getElementById("category").addEventListener("change", function () {
  const targetId = this.value;
  if (targetId.startsWith("#")) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }
});
document.getElementById("searchlink").addEventListener("change", function () {
  const targetId = "deals";
  if (targetId.startsWith("#")) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }
});
/// Search
const deals = document.getElementById("deals");
function searchProduct() {
  const filtered = [];
  fetch("../products.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((product) => {
        if (
          product.name.toLowerCase().includes(searchInput.value.toLowerCase())
        ) {
          filtered.push(product);
        }
      });
      swiper_items_sale.innerHTML = "";
      filtered.forEach((product) => {
        if (product) {
          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          const fav = JSON.parse(localStorage.getItem("fav")) || [];
          const isINCart = cart.some((item) => item.id === product.id);
          const isINFav = fav.some((item) => item.id === product.id);

          swiper_items_sale.innerHTML += `
        <div class="swiper-slide product">
              <span class="sale_precent">${parseInt(
                ((product.old_price - product.price) / product.old_price) * 100
              )}%</span>
              <div class="img_product">
                <a href="#"><img src="${product.img}" alt="" /></a>
              </div>
              <div class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <p class="name_product">
                <a href="#"
                  >${product.name}</a
                >
              </p>
              <div class="price">
                <p><span>$${product.price}</span></p>
                <p class="old_price">$${product.old_price}</p>
              </div>
              <div class="icons">
                <span class="btn_add_to_cart ${
                  isINCart ? "active" : ""
                }" data-id="${product.id}">
                  <i class="fa-solid fa-cart-shopping"></i>${
                    isINCart ? "Item in cart" : "Add to cart"
                  }
                </span>
                <span class="icon_product btn_fav ${
                  isINFav ? "active" : ""
                }" data-id="${product.id}">
                  <i class="fa-regular fa-heart" aria-hidden="true"></i>
                </span>
              </div>
            </div>
        `;
        }
      });
    });
}

const searchbutton = document.getElementById("searchbutton");
searchbutton.addEventListener("click", (e) => {
  e.preventDefault();
  searchProduct();
});
