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
    var swiper = new Swiper(".slide_product", {
      slidesPerView: 5,
      spaceBetween: 20,
      autoplay: {
        delay: 2500,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      loop: true,
      breakpoints: {
        1200: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
        1000: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        700: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        0: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
      },
    });

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
