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
  new Producto(10, "i3", "Intel", "Procesador", 55000),
  new Producto(11, "i5", "Intel", "Procesador", 75000),
  new Producto(12, "i7", "Intel", "Procesador", 95000),
  new Producto(13, "8GB", "Corsair", "Memoria RAM", 10000),
  new Producto(14, "16GB", "Corsair", "Memoria RAM", 20000),
  new Producto(15, "8GB", "GIGABITY", "Memoria RAM", 10000),
  new Producto(16, "16GB", "GIGABITY", "Memoria RAM", 20000),
];

const carrito = [];

function mostrarMenu() {
  let menu =
    "Selecione una opción:\n 1 - Mostrar todos los productos\n 2 - Buscar por categoria\n 3 - Buscar por marca\n 4 - Buscar por producto\n 5 - Ver carrito";
  let opcion;

  opcion = prompt(menu);

  if (opcion === undefined || isNaN(opcion) || opcion < 1 || opcion > 5) {
    alert("Opción incorrecta, debe ingresar una opción valida");
    mostrarMenu();
  } else {
    if (opcion == 1) {
      mostarProductos();
    } else if (opcion == 2) {
      mostrarProductosPorCategoria();
    } else if (opcion == 5) {
      mostarCarrito();
    }
  }
}

mostrarMenu();

function mostarProductos() {
  let opcion;
  let menu = "Selecione una opión:\n";

  for (const p of productsList) {
    menu += ` ${p.id} - ${p.nombre} - ${p.precio}\n`;
  }

  menu += ` ${0} - atras`;

  opcion = Number.parseInt(prompt(menu));

  if (opcion === undefined || isNaN(opcion) || opcion < 0) {
    alert("Opción incorrecta, debe ingresar una opción valida");
    mostarProductos();
  } else {
    if (opcion == 0) {
      mostrarMenu();
    } else {
      let producto = productsList.find((x) => x.id == opcion);
      if (producto === undefined) {
        alert("Opción incorrecta");
        mostarProductos();
      } else {
        carrito.push(
          new Producto(
            producto.id,
            producto.nombre,
            producto.marca,
            producto.categoria,
            producto.precio
          )
        );

        mostrarMenu();
      }
    }
  }
}

function mostarCarrito() {
  if (carrito.length == 0) {
    alert("No hay productos en el carrio");
    mostrarMenu();
  } else {
    let mensaje = "";
    for (const p of carrito) {
      mensaje += `nombre: ${p.nombre} - precio: ${p.precio}`;
    }

    alert(mensaje);
  }
}

function mostrarProductosPorCategoria(categoria) {
  let list = productsList.filter((x) => x.categoria == categoria);
}

function mostrarProductosPorMarcas(marca) {
  let list = productsList.filter((x) => x.marca == marca);
}

function buscarProducto(nombre) {
  let list = productsList.filter((x) => x.nombre == nombre);
}
