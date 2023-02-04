class Producto {
  constructor(id, nombre, marca, categoria, precio) {
    this.id = id;
    this.nombre = nombre;
    this.marca = marca;
    this.categoria = categoria;
    this.precio = precio;
  }
}

const productsList = [
  new Producto(1, "Asus RTX 3060", "Asus", "Placa de video", 100000),
  new Producto(2, "MSI RTX 3060", "MSI", "Placa de video", 100000),
  new Producto(3, "Asus RTX 3070", "Asus", "Placa de video", 150000),
  new Producto(4, "MSI RTX 3070", "MSI", "Placa de video", 150000),
  new Producto(5, "Asus RTX 3080", "Asus", "Placa de video", 180000),
  new Producto(6, "MSI RTX 3080", "MSI", "Placa de video", 180000),
  new Producto(7, "Ryzen 3", "AMD", "Procesador", 50000),
  new Producto(8, "Ryzen 5", "AMD", "Procesador", 65000),
  new Producto(9, "Ryzen 7", "AMD", "Procesador", 85000),
  new Producto(10, "Intel Core i3", "Intel", "Procesador", 55000),
  new Producto(11, "Intel Core i5", "Intel", "Procesador", 75000),
  new Producto(12, "Intel Core i7", "Intel", "Procesador", 95000),
  new Producto(13, "Memoria RAM Corsair 8GB", "Corsair", "Memoria RAM", 10000),
  new Producto(14, "Memoria RAM Corsair 16GB", "Corsair", "Memoria RAM", 20000),
  new Producto(
    15,
    "Memoria RAM GIGABITY 8GB",
    "GIGABITY",
    "Memoria RAM",
    10000
  ),
  new Producto(
    16,
    "Memoria RAM GIGABITY 16GB",
    "GIGABITY",
    "Memoria RAM",
    20000
  ),
];

let carrito = [];

if (localStorage.getItem("carrito")) {
  let carritoEnJSON = localStorage.getItem("carrito");
  carrito = JSON.parse(carritoEnJSON);
  renderizarCarrito();
}

let filtros = document.getElementById("buscar");
filtros.onclick = function () {
  let buscador = document.getElementById("buscador");

  let productosFiltrados = productsList.filter(
    (p) =>
      p.nombre.toLowerCase().includes(buscador.value.toLowerCase()) ||
      p.categoria.toLowerCase().includes(buscador.value.toLowerCase()) ||
      p.marca.toLowerCase().includes(buscador.value.toLowerCase())
  );

  document.getElementById("productos").innerHTML = "";

  productosFiltrados.forEach((x) => renderizarProductos(x));
};

let divProductos = document.getElementById("productos");
productsList.forEach((x) => renderizarProductos(x));

function renderizarProductos(x) {
  let divProductos = document.getElementById("productos");
  let divProducto = document.createElement("div");
  divProducto.className = "col-4 my-2";

  let divCard = document.createElement("div");
  divCard.className = "card";
  divProducto.append(divCard);

  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  divCard.append(cardBody);

  let cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.innerText = x.nombre;
  cardBody.append(cardTitle);

  let cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.innerHTML = `$${x.precio}`;
  cardBody.append(cardText);

  let cardButton = document.createElement("button");
  cardButton.type = "button";
  cardButton.className = "btn btn-primary";
  cardButton.textContent = "Comprar";
  cardButton.id = x.id;
  cardButton.onclick = agregarCarrito;
  cardBody.append(cardButton);

  divProductos.append(divProducto);
}

function agregarCarrito(e) {
  let id = e.target.id;
  let producto = productsList.find((p) => p.id == id);
  let productoEnCarrito = carrito.find((p) => p.id == id);

  if (productoEnCarrito) {
    let i = carrito.findIndex((x) => x.id == id);
    carrito[i].unidades++;
    carrito[i].subtotal = carrito[i].precio * carrito[i].unidades;
  } else {
    producto.unidades = 1;
    producto.subtotal = producto.precio;
    carrito.push(producto);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  renderizarCarrito();
}

function renderizarCarrito() {
  let divCarrito = document.getElementById("carrito");
  divCarrito.innerHTML = "";

  carrito.forEach((x) => {
    let divProductoEnCarrito = document.createElement("div");
    divProductoEnCarrito.className = "col-12 my-2";

    let divCard = document.createElement("div");
    divCard.className = "card";
    divProductoEnCarrito.append(divCard);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    divCard.append(cardBody);

    let cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.innerText = x.nombre;
    cardBody.append(cardTitle);

    let cardUnidades = document.createElement("p");
    cardUnidades.className = "card-text";
    cardUnidades.innerHTML = `Unidades: ${x.unidades}`;
    cardBody.append(cardUnidades);

    let cardPrecio = document.createElement("p");
    cardPrecio.className = "card-text";
    cardPrecio.innerHTML = `SUBTOTAL: $${x.subtotal}`;
    cardBody.append(cardPrecio);

    divCarrito.append(divProductoEnCarrito);
  });
}

let finalizarCompra = document.getElementById("finalizar");
finalizarCompra.onclick = function () {
  localStorage.removeItem("carrito");
  carrito = [];
  renderizarCarrito();
};
