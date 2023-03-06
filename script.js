fetch("./productos.json")
  .then((resp) => resp.json())
  .then((products) => inicio(products))
  .catch((error) => console.log(error));

function inicio(productsList) {
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

    Toastify({
      text: "Agregaste un procuto al carrito",
      duration: 2000,
    }).showToast();
  }

  let carrito = [];

  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
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
    if (carrito.length > 0) {
      localStorage.removeItem("carrito");
      carrito = [];
      renderizarCarrito();

      Swal.fire({
        title: "Gracias por su compra",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
}
