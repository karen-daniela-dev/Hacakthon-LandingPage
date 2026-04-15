const hamburguesas = [
    {
        id: 1,
        nombre: "La Colombiana",
        precio: 25000,
        img: "../assets/",
        descripcion: "La hamburguesa que sabe a Colombia Jugosa carne Angus a la parrilla, acompañada de dulce plátano maduro, un huevo frito, lechuga fresca, tomate y cebolla"

    },
    {
        id: 2,
        nombre: "La Mexicana",
        precio: 25000,
        img: "../assets/",
        descripcion: "Hamburguesa de res 110 g, pollo desmechado, carne de cerdo, jamón, tocineta, chorizo, guacamole, con queso mozzarella, vegetales frescos  "
    },
    {
        id: 3,
        nombre: "Crispy Burger",
        precio: 25000,
        img: "../assets/",
        descripcion: "Hamburguesa con 120 gr de carne 100% de res, queso cheddar, cebollas crocantes y salsas de la "
    },
    {
        id: 4,
        nombre: "Cheese Burger",
        precio: 22000,
        img: "../assets/",
        descripcion: "Hamburguesa con 120 gr. de carne 100% de res, queso cheddar, salsa de queso cheddar y pan brioche "
    }
]
const contenedorHamburguesas = document.getElementById("contenedor-hamburguesas");


let carrito = conocerDatosStorage();
let cantidad = 0
renderizarTarjeta(hamburguesas)
renderizarCarritoHTML();
//funcion para mostrar el array de hamburguesas
function renderizarTarjeta(productos) {
    //limpiamos el contenedor
    contenedorHamburguesas.innerHTML = "";
    //se define un foreach para recorrer cada producto e renderizarlo con el dom
    productos.forEach((hamburguesa) => {
        //creamos cada elemento
        let columnaDiv = document.createElement("div");
        //añadimos a la clase las columnas por card
        columnaDiv.classList.add("col-md-3")
        //insertamos al elemento creado la estructura
        columnaDiv.innerHTML = `
            <div class="card text-center p-3 tienda__categoria-card">
                <div class="card-body">
                <img src="${hamburguesa.img}" alt="imagen de una hamburguesa" width="500" height="300">
                    <h5 class="card-title">${hamburguesa.nombre}</h5>
                    <p class="card-text small">${hamburguesa.descripcion}</p>
                    <p class="fw-bold text-dark">$${hamburguesa.precio}</p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito(${hamburguesa.id})">
                        Agregar
                    </button>
                </div>
            </div>`;
        //insertamos por el DOM el elemento creado
        contenedorHamburguesas.appendChild(columnaDiv);

    })

}
//agregamos funcion para el boton de agregar de cada card
function agregarAlCarrito(id) {
    // Intentamos buscar si esa hamburguesa ya está en el carrito
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        const hamburguesaOriginal = hamburguesas.find(h => h.id === id);

        carrito.push({
            id: hamburguesaOriginal.id,
            nombre: hamburguesaOriginal.nombre,
            precio: hamburguesaOriginal.precio,
            cantidad: 1
        });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarritoHTML();
    actualizarTotal();
}


//funcion que obtiene el carrito guardado en local storage
function conocerDatosStorage() {
    //variable para traer los datos que haya en storage     
    let datosStorage = localStorage.getItem("carrito");

    //se valida de que existan datos, sí existen se realiza parseo de JSON a objeto y lo retorna
    if (datosStorage) {
        let dato = JSON.parse(datosStorage)
        console.log(typeof (dato))
        return dato
        // si esta vacio retorna array vacio de carrito
    } else {
        return []
    }
}
//funcion para renderizar la lista del carrito con el local storage
function renderizarCarritoHTML() {
    const listaCarrito = document.getElementById("lista-carrito");
    
    listaCarrito.innerHTML = "";
    //recorre el carrito y va creando una lista con los productos almacenados en el local storage
    carrito.forEach((hamburguesa) => {
        let li = document.createElement("li");

        li.innerHTML = `
    <div class="d-flex justify-content-between"> 
                <div>
                     ${hamburguesa.nombre} <span class="fw-bold">x${hamburguesa.cantidad}</span>
                </div>
                <div>
                    <span class="fw-bold">$${(hamburguesa.precio * hamburguesa.cantidad)}</span>
                    <button type="button" class="btn btn-danger btn-sm">Eliminar</button>
                </div>
            </div><br>
    `;

        listaCarrito.appendChild(li);
    });
    //llamamos a actualizar total para que no se pierda el total al recargar la pagina
    actualizarTotal()
}
//Funcion para actualza el total del carrito
function actualizarTotal() {
    //traemos el elemento y lo asignamos a total
    const totalCarrito = document.getElementById("total-carrito");
    //inicializamos una variable para que acumule los precios del producto
    let acumulado = 0;
    //recorremos el carrito con un foreach y realizamos el calculo con la cantidad por hamburguesa,
    carrito.forEach((hamburguesa) => {
        acumulado = acumulado + (hamburguesa.precio * hamburguesa.cantidad);
    });

    totalCarrito.textContent = acumulado;
}
