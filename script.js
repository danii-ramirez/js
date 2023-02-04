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

const carrito = [];

let filtros = document.getElementById("buscar");
filtros.onclick = function () {
  let buscador = document.getElementById("buscador");

  let productosFiltrados = productsList.filter(
    (p) =>
      p.nombre.toLowerCase().includes(buscador.value.toLowerCase()) ||
      p.categoria.toLowerCase().includes(buscador.value.toLowerCase()) ||
      p.marca.toLowerCase().includes(buscador.value.toLowerCase())
  );

  console.log(productosFiltrados);
};

let divProductos = document.getElementById("productos");

productsList.forEach((x) => {
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
  cardButton.textContent = "comprar";
  cardButton.id = x.id;
  cardBody.append(cardButton);

  divProductos.append(divProducto);
});
