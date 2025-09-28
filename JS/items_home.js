fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const swiper_items_sale = document.getElementById("swiper_items_sale");
    const swiper_electronics = document.getElementById("swiper_electronics");
    const swiper_appliances = document.getElementById("swiper_appliances");
    const swiper_mobile = document.getElementById("swiper_mobile");

    data.forEach((product) => {
      if (product.old_price) {
        const isINCart = cart.some((item) => item.id === product.id);
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
                <span class="icon_product">
                  <i class="fa-regular fa-heart"></i>
                </span>
              </div>
            </div>
        `;
      }
    });

    // Initialize Swiper AFTER products are added
    // var swiper = new Swiper(".slide_product", {
    //   slidesPerView: 5,
    //   spaceBetween: 20,
    //   // autoplay: {
    //   //   delay: 2500,
    //   // },
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   },
    //   loop: true,
    //   breakpoints: {
    //     1200: {
    //       slidesPerView: 5,
    //       spaceBetween: 20,
    //     },
    //     1000: {
    //       slidesPerView: 4,
    //       spaceBetween: 20,
    //     },
    //     700: {
    //       slidesPerView: 3,
    //       spaceBetween: 15,
    //     },
    //     0: {
    //       slidesPerView: 2,
    //       spaceBetween: 10,
    //     },
    //   },
    // });

    //   Fetch data for Electronics section
    data.forEach((product) => {
      let dis = parseInt(
        ((product.old_price - product.price) / product.old_price) * 100
      );
      old_price = product.old_price;
      if (old_price === undefined) {
        const isINCart = cart.some((item) => item.id === product.id);

        if (product.catetory === "electronics") {
          swiper_electronics.innerHTML += `
        <div class="swiper-slide product">
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
              </div>
              <div class="icons">
                <span class="btn_add_to_cart ${
                  isINCart ? "active" : ""
                }" data-id="${product.id}">
                  <i class="fa-solid fa-cart-shopping"></i>${
                    isINCart ? "Item in cart" : "Add to cart"
                  }
                </span>
                <span class="icon_product">
                  <i class="fa-regular fa-heart"></i>
                </span>
              </div>
            </div>
        
          `;
        }
      } else if (product.catetory === "electronics") {
        const isINCart = cart.some((item) => item.id === product.id);

        swiper_electronics.innerHTML += `
        <div class="swiper-slide product">
              <span class="sale_precent">${isNaN(dis) ? 0 : dis}%</span>
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
                }"  data-id="${product.id}">
                  <i class="fa-solid fa-cart-shopping"></i>${
                    isINCart ? "Item in cart" : "Add to cart"
                  }
                </span>
                <span class="icon_product">
                  <i class="fa-regular fa-heart"></i>
                </span>
              </div>
            </div>
        
          `;
      }
    });
    data.forEach((product) => {
      let dis = parseInt(
        ((product.old_price - product.price) / product.old_price) * 100
      );
      old_price = product.old_price;
      if (old_price === undefined) {
        const isINCart = cart.some((item) => item.id === product.id);

        if (product.catetory === "appliances") {
          swiper_appliances.innerHTML += `
        <div class="swiper-slide product">
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
              </div>
              <div class="icons">
                <span class="btn_add_to_cart ${
                  isINCart ? "active" : ""
                }" data-id="${product.id}">
                  <i class="fa-solid fa-cart-shopping"></i>${
                    isINCart ? "Item in cart" : "Add to cart"
                  }
                </span>
                <span class="icon_product">
                  <i class="fa-regular fa-heart"></i>
                </span>
              </div>
            </div>
        
          `;
        }
      } else if (product.catetory === "appliances") {
        const isINCart = cart.some((item) => item.id === product.id);

        swiper_appliances.innerHTML += `
        <div class="swiper-slide product">
              <span class="sale_precent">${isNaN(dis) ? 0 : dis}%</span>
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
                <span class="icon_product">
                  <i class="fa-regular fa-heart"></i>
                </span>
              </div>
            </div>
        
          `;
      }
    });
    data.forEach((product) => {
      let dis = parseInt(
        ((product.old_price - product.price) / product.old_price) * 100
      );
      old_price = product.old_price;
      if (old_price === undefined) {
        const isINCart = cart.some((item) => item.id === product.id);

        if (product.catetory === "mobiles") {
          swiper_mobile.innerHTML += `
        <div class="swiper-slide product">
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
              </div>
              <div class="icons">
                <span class="btn_add_to_cart ${
                  isINCart ? "active" : ""
                }" data-id="${product.id}">
                  <i class="fa-solid fa-cart-shopping"></i>${
                    isINCart ? "Item in cart" : "Add to cart"
                  }
                </span>
                <span class="icon_product">
                  <i class="fa-regular fa-heart"></i>
                </span>
              </div>
            </div>
        
          `;
        }
      } else if (product.catetory === "mobiles") {
        const isINCart = cart.some((item) => item.id === product.id);

        swiper_mobile.innerHTML += `
        <div class="swiper-slide product">
              <span class="sale_precent">${isNaN(dis) ? 0 : dis}%</span>
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
                }"   data-id="${product.id}">
                  <i class="fa-solid fa-cart-shopping"></i>${
                    isINCart ? "Item in cart" : "Add to cart"
                  }
                </span>
                <span class="icon_product">
                  <i class="fa-regular fa-heart"></i>
                </span>
              </div>
            </div>
        
          `;
      }
    });
  });

/*
  fetch("https://fakestoreapi.com/products/")
  .then((response) => response.json())
  .then((data) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const swiper_items_sale = document.getElementById("swiper_items_sale");
    const swiper_electronics = document.getElementById("swiper_electronics");
    const swiper_appliances = document.getElementById("swiper_appliances");
    const swiper_mobile = document.getElementById("swiper_mobile");

    // Simulate old_price for some products (for sale section)
    const productsWithOldPrice = data.map((product) => {
      // 50% chance to have an old_price
      if (Math.random() > 0.5) {
        const old_price = (
          product.price *
          (1 + Math.random() * 0.3 + 0.1)
        ).toFixed(2);
        return { ...product, old_price: Number(old_price) };
      }
      return product;
    });

    // Sale section
    productsWithOldPrice.forEach((product) => {
      if (product.old_price) {
        const isINCart = cart.some((item) => item.id === product.id);
        const discount = parseInt(
          ((product.old_price - product.price) / product.old_price) * 100
        );
        swiper_items_sale.innerHTML += `
        <div class="swiper-slide product">
          <span class="sale_precent">${discount}%</span>
          <div class="img_product">
            <a href="#"><img src="${product.image}" alt="" /></a>
          </div>
          <div class="stars">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <p class="name_product">
            <a href="#">${product.title}</a>
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
            <span class="icon_product">
              <i class="fa-regular fa-heart"></i>
            </span>
          </div>
        </div>
        `;
      }
    });

    // Helper to render product card
    function renderProduct(
      product,
      isINCart,
      showOldPrice = false,
      discount = 0
    ) {
      return `
        <div class="swiper-slide product">
          ${
            showOldPrice ? `<span class="sale_precent">${discount}%</span>` : ""
          }
          <div class="img_product">
            <a href="#"><img src="${product.image}" alt="" /></a>
          </div>
          <div class="stars">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <p class="name_product">
            <a href="#">${product.title}</a>
          </p>
          <div class="price">
            <p><span>$${product.price}</span></p>
            ${
              showOldPrice
                ? `<p class="old_price">$${product.old_price}</p>`
                : ""
            }
          </div>
          <div class="icons">
            <span class="btn_add_to_cart ${
              isINCart ? "active" : ""
            }" data-id="${product.id}">
              <i class="fa-solid fa-cart-shopping"></i>${
                isINCart ? "Item in cart" : "Add to cart"
              }
            </span>
            <span class="icon_product">
              <i class="fa-regular fa-heart"></i>
            </span>
          </div>
        </div>
      `;
    }

    // Electronics section
    productsWithOldPrice.forEach((product) => {
      if (product.category === "electronics") {
        const isINCart = cart.some((item) => item.id === product.id);
        if (product.old_price) {
          const discount = parseInt(
            ((product.old_price - product.price) / product.old_price) * 100
          );
          swiper_electronics.innerHTML += renderProduct(
            product,
            isINCart,
            true,
            discount
          );
        } else {
          swiper_electronics.innerHTML += renderProduct(product, isINCart);
        }
      }
    });

    // Appliances section (no direct mapping, so let's use "home" or "jewelery" as example)
    productsWithOldPrice.forEach((product) => {
      if (product.category === "jewelery") {
        const isINCart = cart.some((item) => item.id === product.id);
        if (product.old_price) {
          const discount = parseInt(
            ((product.old_price - product.price) / product.old_price) * 100
          );
          swiper_appliances.innerHTML += renderProduct(
            product,
            isINCart,
            true,
            discount
          );
        } else {
          swiper_appliances.innerHTML += renderProduct(product, isINCart);
        }
      }
    });

    // Mobiles section (no direct mapping, so let's use "electronics" with title containing 'phone')
    productsWithOldPrice.forEach((product) => {
      if (
        product.category === "electronics" &&
        /phone|mobile|cell/i.test(product.title)
      ) {
        const isINCart = cart.some((item) => item.id === product.id);
        if (product.old_price) {
          const discount = parseInt(
            ((product.old_price - product.price) / product.old_price) * 100
          );
          swiper_mobile.innerHTML += renderProduct(
            product,
            isINCart,
            true,
            discount
          );
        } else {
          swiper_mobile.innerHTML += renderProduct(product, isINCart);
        }
      }
    });
  });
 */
