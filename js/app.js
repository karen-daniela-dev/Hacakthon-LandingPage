const hamburguesas = [
    {
        id: 1,
        nombre: "La Colombiana",
        precio: 25000,
        img: "",
        descripcion: "La hamburguesa que sabe a Colombia Jugosa carne Angus a la parrilla, acompañada de dulce plátano maduro, un huevo frito, lechuga fresca, tomate y cebolla"

    },
    {
        id: 2,
        nombre: "La Mexicana",
        precio: 25000,
        img: "",
        descripcion: "Hamburguesa de res 110 g, pollo desmechado, carne de cerdo, jamón, tocineta, chorizo, guacamole, con queso mozzarella, vegetales frescos  "
    },
    {
        id: 3,
        nombre: "Crispy Burger",
        precio: 25000,
        img: "",
        descripcion: "Hamburguesa con 120 gr de carne 100% de res, queso cheddar, cebollas crocantes y salsas de la "
    },
    {
        id: 4,
        nombre: "Cheese Burger",
        precio: 22000,
        img: "",
        descripcion: "Hamburguesa con 120 gr. de carne 100% de res, queso cheddar, salsa de queso cheddar y pan brioche "
    }
]
const contenedorHamburguesas = document.getElementById("contenedor-hamburguesas");


let carrito = conocerDatosStorage();

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
    //creamos una variable el array y va aguardar el primer elemento que tenga el mismo id en el array con el metodo find.
    const hamburguesaAgregada = hamburguesas.find(hamburguesa => hamburguesa.id === id);
    //agrega el elemento selecciona en elarray de carrito
    carrito.push(hamburguesaAgregada)
    console.log("la hamburguesa agregada es: " + JSON.stringify(hamburguesaAgregada))
    //guardamos el elemento agregado en el array carrito en el storage con setItem
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log("el carrito es: " + carrito)
    renderizarCarritoHTML(JSON.stringify(carrito))
}


//funcion que obtiene el carrito guardado en local storage
function conocerDatosStorage() {
    //variable para traer los datos que haya en storage     
    let datosStorage = localStorage.getItem("carrito");

    //se valida de que existan datos, sí existen se realiza parseo de JSON a objeto y lo retorna
    if (datosStorage) {
        dato = JSON.parse(datosStorage)
        console.log(typeof (dato))
        return dato
        // si esta vacio retorna array vacio de carrito
    } else {
        return []
    }
}

function renderizarCarritoHTML() {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = "";

    carrito.forEach((hamburguesa) => {
    let li = document.createElement("li");
    li.innerHTML = `
        <div class="d-flex justify-content-between"> 
            <div>
                ${hamburguesa.nombre}  $${hamburguesa.precio}
                <button type="button" class="btn-eliminar">eliminar</button>
            </div>
        </div>
    `;
    
    listaCarrito.appendChild(li);
});
}