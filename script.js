let total = 0

function ingresarPedido() {
    let pizza = parseInt(prompt("Ingrese una opción del 1 a 5"))

    if (isNaN(pizza) || pizza < 1 || pizza > 5) {
        console.log("Debe ingresar una opcion del 1 a 5")
        alert("Debe ingresar una opcion del 1 a 5")
        ingresarPedido()
    } else {
        let i = 0
        let cantidad

        while (cantidad === undefined || isNaN(cantidad) || cantidad < 1) {
            if (i == 0) {
                cantidad = parseInt(prompt("Ingrese la cantidad"))
            } else {
                cantidad = parseInt(prompt("La cantidad ingresada es incorrecta. Ingrese la cantidad correcta"))
            }

            i++
        }

        switch (pizza) {
            case 1:
                total += 100 * cantidad
                break;

            case 2:
                total += 150 * cantidad
                break;

            case 3:
                total += 120 * cantidad
                break;

            case 4:
                total += 180 * cantidad
                break;

            default:
                total += 130 * cantidad
                break;
        }

        i = 0
        let confirmacion
        while (confirmacion === undefined || (confirmacion.toLowerCase() != "si" && confirmacion.toLowerCase() != "no")) {
            if (i == 0) {
                confirmacion = prompt("Desea seguir ingresando mas pedido? si o no")
            } else {
                confirmacion + prompt("La opcion ingresada es incorrecta. Desea seguir ingresando mas pedido? si o no")
            }
        }

        if (confirmacion.toLowerCase() == "si") {
            ingresarPedido()
        }
        else {
            console.log("El total del pedido es: " + total)
            alert("El total del pedido es: " + total)
        }
    }
}

ingresarPedido()
