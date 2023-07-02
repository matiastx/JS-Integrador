// Capturando elementos
const productsContainer = document.querySelector(".p-cards-container");
const brandContainer = document.querySelector(".c-cards-container");
const brandList = document.querySelectorAll(".brand");
const cartBtn = document.querySelector(".carro");
const cartMenu = document.querySelector(".cart-menu");
const cartProductList = document.querySelector(".cartProductList");
const bgMenuBtn = document.querySelector(".menu-h");
const bgMenu = document.querySelector(".navbar-list");
const overlay = document.querySelector(".overlay");
const cartMessage = document.querySelector(".cartMessage");
const cartProducts = document.querySelector(".cart-menu");
const cartBubble = document.querySelector(".cartBubble");
const cartTotal = document.querySelector(".totalPriceCart");
const cleanCart = document.querySelector(".cleanCart");
const buyCart = document.querySelector(".buyCart");

// ---------------CARRITO---------------
// Variables
let cart = JSON.parse(localStorage.getItem("ritualCart")) || [];
let sales = JSON.parse(localStorage.getItem("ritualSales")) || [];

// Guardar Carrito en localStorage
const saveCart = () => {
  localStorage.setItem("ritualCart", JSON.stringify(cart));
};
const saveSale = () => {
  localStorage.setItem("ritualSales", JSON.stringify(sales));
};
// ---------------CARRITO---------------

// -------------PAGE ACTIONS-------------
const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");
  if (bgMenu.classList.contains("open-menu")) {
    bgMenu.classList.remove("open-menu");
    return;
  }
  overlay.classList.toggle("showOverlay");
};

const toggleMenu = () => {
  bgMenu.classList.toggle("open-menu");
  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    return;
  }
  overlay.classList.toggle("showOverlay");
};

const closeOnScroll = () => {
  if (
    !bgMenu.classList.contains("open-menu") &&
    !cartMenu.classList.contains("open-cart")
  ) {
    return;
  }
  bgMenu.classList.remove("open-menu");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("showOverlay");
};

const closeOnClickOverlay = () => {
  bgMenu.classList.remove("open-menu");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("showOverlay");
};

const closeOnClick = (e) => {
  if (!e.target.classList.contains("nv-element")) {
    return;
  }
  bgMenu.classList.remove("open-menu");
  overlay.classList.remove("showOverlay");
};

// -------------PAGE ACTIONS-------------

// --------------PRODUCTOS--------------
// Renderizar Productos
const renderProducts = (products) => {
  productsContainer.innerHTML = products
    .map((product) => {
      const {
        id,
        name,
        brand,
        brandImg,
        description1,
        description2,
        cardImg,
        price,
        style,
        styleInfo,
      } = product;
      const clase = `p-cards flex ${style}`;
      let logo = "";
      if (style === "ao" || style === "sa") {
        logo = "-ao";
      }

      return `
      <div class="${clase}">
          <img
            class="p-cards-logo${logo}"
            src=${brandImg}
            alt="${brand}" />
          <img
            class="p-cards-img"
            src=${cardImg}
            alt="${name}" />
          <div class="p-card-info flex">
            <div class="p-card-desc${styleInfo} flex">
              <h3>${name}</h3>
              <span class="descSpan${styleInfo}"></span>
              <p>${description1}</p>
              <p>${description2}</p>
            </div>
            <div class="p-cards-price${styleInfo} flex">
              <img
                class="logo btnAddtoCart"
                data-id=${id}
                data-name="${name}"
                data-price=${price}
                data-img="${cardImg}"
                src="./assets/img/cart-icon.svg"
                alt="CartAdd" />
              <span>$ ${price}</span>
            </div>
          </div>
        </div>
    `;
    })
    .join("");
};

// Filtro de Categorias
const isInactiveBrand = (element) => {
  return (
    element.classList.contains("brand") && !element.classList.contains("active")
  );
};

const changeActiveState = (selectedBrand) => {
  const brands = [...brandList];
  brands.forEach((brandSelector) => {
    if (brandSelector.dataset.brand !== selectedBrand) {
      brandSelector.classList.remove("active");
      return;
    }
    brandSelector.classList.add("active");
  });
};

const changeAppStateFilter = (selectedBrand) => {
  const brand = selectedBrand.dataset.brand;
  appState.activefilter = brand;
  changeActiveState(appState.activefilter);
};

const renderProductbyBrand = () => {
  const filteredBrands = MerchProducts.filter((product) => {
    return product.brand === appState.activefilter;
  });

  renderProducts(filteredBrands);
};

const filterCars = ({ target }) => {
  // Revisa si es una marca activa
  if (!isInactiveBrand) {
    return;
  }
  // Se agrega o quita la clase active de las Marcas
  changeAppStateFilter(target);
  // Se filtran los productos por el filtro Activo
  productsContainer.innerHTML = "";
  // console.log(appState.activefilter);
  if (appState.activefilter) {
    renderProductbyBrand();
    return;
  }
};

// --------------PRODUCTOS--------------

// ---------------CARRITO---------------
const showCartMessage = (message) => {
  cartMessage.classList.add("activeMessage");
  cartMessage.textContent = message;
  setTimeout(() => {
    cartMessage.classList.remove("activeMessage");
  }, 1000);
};

const productQuantityUp = (id) => {
  const isProductOnCart = cart.find((item) => item.id === id);
  add1UnitToCart(isProductOnCart);
};

const deleteCartProduct = (productToDelete) => {
  cart = cart.filter((product) => {
    return product.id !== productToDelete.id;
  });
  updateCart();
};

const productQuantityDown = (id) => {
  const isProductOnCart = cart.find((item) => item.id === id);
  if (isProductOnCart.quatity === 1) {
    if (window.confirm("Esta seguro que desea eliminar el articulo")) {
      deleteCartProduct(isProductOnCart);
    }
    return;
  }
  delete1UnitToCart(isProductOnCart);
};

const CartProductsQuantity = (e) => {
  if (e.target.classList.contains("down")) {
    productQuantityDown(e.target.dataset.id);
  } else if (e.target.classList.contains("up")) {
    productQuantityUp(e.target.dataset.id);
  }
  updateCart();
};

const ifExistOnCart = (productId) => {
  return cart.find((item) => {
    return item.id === productId;
  });
};

const createProductData = (product) => {
  const { id, name, price, img } = product;
  return { id, name, price, img };
};

const createProductOnCart = (product) => {
  cart = [...cart, { ...product, quatity: 1 }];
};

const add1UnitToCart = (product) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === product.id
      ? { ...cartProduct, quatity: Number(cartProduct.quatity) + 1 }
      : cartProduct;
  });
};

const delete1UnitToCart = (product) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === product.id
      ? { ...cartProduct, quatity: Number(cartProduct.quatity) - 1 }
      : cartProduct;
  });
};

const createCartProductTemplate = (product) => {
  const { id, name, price, img, quatity } = product;
  return `
          <div class="cart-product flex">
            <img
              src="${img}"
              alt="${name}" />
            <div class="cart-p-desc flex">
              <h4>${name}</h4>
              <p>Precio</p>
              <span>$${price}</span>
            </div>
            <div class="cart-p-cant flex">
              <p class="quantityHandler down" data-id=${id}>-</p>
              <span class="itemQuantity">${quatity}</span>
              <p class="quantityHandler up" data-id=${id}>+</p>
            </div>
          </div>
  `;
};

const renderCart = () => {
  if (!cart.length) {
    cartProductList.innerHTML = `
    <p class="emptyCardMsg">Aún no hay artuculos en el carrito</p>`;
    return;
  }
  cartProductList.innerHTML = cart.map(createCartProductTemplate).join("");
};

const calculateCartTotal = () => {
  return cart.reduce((acc, val) => {
    return acc + Number(val.price) * Number(val.quatity);
  }, 0);
};

const showCartTotal = () => {
  cartTotal.innerHTML = `$ ${calculateCartTotal()}`;
};

const renderCartBubble = () => {
  cartBubble.textContent = cart.reduce((acc, val) => {
    return acc + val.quatity;
  }, 0);
};

const updateCart = () => {
  saveCart();
  calculateCartTotal();
  renderCartBubble();
  renderCart();
  showCartTotal();
  cartBtnsState();
};

const addtoCart = (e) => {
  if (!e.target.classList.contains("btnAddtoCart")) {
    return;
  }
  const product = createProductData(e.target.dataset);
  // si el produto ya esta en el carrito
  if (ifExistOnCart(product.id)) {
    add1UnitToCart(product);
    showCartMessage("Agregada 1 unidad mas del producto al carrito");
  } else {
    // si el producto aun no esta en el carrito
    createProductOnCart(product);
    showCartMessage("Producto agregado al carrito");
  }
  updateCart();
};

const cleanCartProducts = () => {
  if (cleanCart.classList.contains("disable")) {
    return;
  }
  if (window.confirm("Desea vaciar su carrito?")) {
    cart = [];
    updateCart();
  }
};

const buyCartProducts = () => {
  if (buyCart.classList.contains("disable")) {
    return;
  }
  if (window.confirm("Desea realizar esta compra?")) {
    sales = [...sales, { saleid: Date.now(), ...cart }];
    saveSale();
    cart = [];
    updateCart();
    alert("Compra realizada correctamente");
  }
};

const cartBtnsState = () => {
  if (!cart.length) {
    buyCart.classList.add("disable");
    cleanCart.classList.add("disable");
  } else {
    buyCart.classList.remove("disable");
    cleanCart.classList.remove("disable");
  }
};

// ---------------CARRITO---------------

const init = () => {
  brandContainer.addEventListener("click", filterCars);
  cartBtn.addEventListener("click", toggleCart);
  bgMenuBtn.addEventListener("click", toggleMenu);
  window.addEventListener("scroll", closeOnScroll);
  overlay.addEventListener("click", closeOnClickOverlay);
  bgMenu.addEventListener("click", closeOnClick);
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showCartTotal);
  productsContainer.addEventListener("click", addtoCart);
  cartProductList.addEventListener("click", CartProductsQuantity);
  renderCartBubble();
  cartBtnsState();
  cleanCart.addEventListener("click", cleanCartProducts);
  buyCart.addEventListener("click", buyCartProducts);
};

init();

console.log(Date.now());
