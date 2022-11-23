//array with pruducts
const productList = [];
productList.push({
  name: "Nike Jordan",
  price: "$420.000",
  model: "NikeJordan",
  description:
    "Desde sus letras con el estilo de los grafitis hasta sus llamativas líneas musculares, las Air Jordan reflejan el espíritu de los 90 como ningún otro diseño.",
  scale: 0.4,
});
productList.push({
  name: "New Balance 966",
  price: "$390.000",
  model: "NewBalance",
  description:
    " Uno de los modelos con más éxito de la firma norteamericana en zapatillas casual, unas sneakers de perfil clásico y estilo retro que imitan a las zapatillas de running. Muy coloridas y con un diseño elegante, las 996 son un clásico en materia de running que ahora dan el salto a la calle para convertirse en unas sneakers a la última moda.",
  scale: 0.4,
});
productList.push({
  name: "Nike Retro",
  price: "$350.000",
  model: "NikeRetro",
  description:
    "The Chuck 70 Counter Climate reflects the duality of the creative explorer. Dark outdoor colors and small doses of vibrant pop colors make this shoe versatile for outdoor and city life.",
  scale: 0.4,
});

//Selectors
const userMenuDesktop = document.querySelector(".desktop-menu");
const userEmail = document.querySelector(".navbar-email");
const burguerMenuIcon = document.querySelector(".menu");
const mobileMenu = document.querySelector(".mobile-menu");
const cartMenuIcon = document.querySelector(".navbar-shopping-cart");
const closeIconProductDetail = document.querySelector(".product-detail-close");
const cartMenu = document.querySelector("#cartContainer");
const cardContainer = document.querySelector(".cards-container");
const productDetailContainer = document.querySelector("#productDetail");

let productSelect = null;

//events to opens menus (userMenu, burguermenu in mobile, cartmenu)
userEmail.addEventListener("click", function () {
  toggleMenu(userMenuDesktop);
});
cartMenuIcon.addEventListener("click", function () {
  toggleMenu(cartMenu);
});

closeIconProductDetail.addEventListener("click", closeProductDetailAside);

//function to open menus
function toggleMenu(elemento) {
  if (elemento == userMenuDesktop) {
    mobileMenu.classList.add("inactive");
    cartMenu.classList.add("inactive");
    productDetailContainer.classList.add("inactive");
    userMenuDesktop.classList.toggle("inactive");
  } else if (elemento == mobileMenu) {
    userMenuDesktop.classList.add("inactive");
    cartMenu.classList.add("inactive");
    productDetailContainer.classList.add("inactive");
    mobileMenu.classList.toggle("inactive");
  } else if (elemento == cartMenu) {
    userMenuDesktop.classList.add("inactive");
    mobileMenu.classList.add("inactive");
    productDetailContainer.classList.add("inactive");
    cartMenu.classList.toggle("inactive");
  }
}

function closeProductDetailAside() {
  productDetailContainer.classList.add("inactive");
}

//Function to render products with iteration of array
function renderProducts(arr) {
  for (product of arr) {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const divCanvas = document.createElement("div");
    divCanvas.classList.add("canvas-container");

    const productCanvas = document.createElement("canvas");
    productCanvas.id = "webgl" + arr.indexOf(product);

    divCanvas.append(productCanvas);

    const productDescription = document.createElement("p");
    productDescription.innerText = product.description;

    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");

    const productInfoDiv = document.createElement("div");

    const productPrice = document.createElement("a");
    productPrice.innerText = product.price;
    productPrice.setAttribute(
      "href",
      "./producto" + arr.indexOf(product) + ".html"
    );
    const productName = document.createElement("a");
    productName.innerText = product.name;
    productName.setAttribute(
      "href",
      "./producto" + arr.indexOf(product) + ".html"
    );

    productInfoDiv.append(productPrice, productName);

    const productInfoFigure = document.createElement("figure");

    productInfo.append(productInfoDiv, productInfoFigure);
    productCard.append(divCanvas, productInfo);

    //add ID to each product to show their detail product
    productCard.setAttribute("id", "product");

    cardContainer.appendChild(productCard);
  }
}

renderProducts(productList);
