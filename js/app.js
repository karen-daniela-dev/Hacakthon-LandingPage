const hamburguesas = [
  {
    id: 1,
    nombre: "La Colombiana",
    precio: 25000,
    img: "../assets/mega-stack.png",
    descripcion:
      "Carne Angus, plátano maduro, huevo frito y vegetales.",
  },
  {
    id: 2,
    nombre: "La Mexicana",
    precio: 25000,
    img: "assets/double-beast.png",
    descripcion:
      "Res, pollo, cerdo, jamón, tocineta y guacamole.",
  },
  {
    id: 3,
    nombre: "Crispy Burger",
    precio: 25000,
    img: "assets/golden-crunch-hero.png",
    descripcion: "Carne, cheddar y cebolla crocante.",
  },
  {
    id: 4,
    nombre: "Cheese Burger",
    precio: 22000,
    img: "assets/full-stack.png",
    descripcion: "Carne, cheddar, salsa especial.",
  },
];

const contenedor = document.getElementById("contenedor-hamburguesas");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* ================= RENDER PRODUCTOS ================= */
function renderizarProductos() {
  contenedor.innerHTML = "";

  hamburguesas.forEach((p) => {
    contenedor.innerHTML += `
      <div class="col-md-3">
        <div class="card text-center p-3 tienda__categoria-card">
          <img src="${p.img}" class="img-fluid">
          <div class="card-body">
            <h5>${p.nombre}</h5>
            <p class="small">${p.descripcion}</p>
            <p class="fw-bold">$${p.precio}</p>
            <button class="btn btn-primary" onclick="agregar(${p.id})">
              Agregar
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

/* ================= AGREGAR ================= */
function agregar(id) {
  const producto = hamburguesas.find(p => p.id === id);
  const existe = carrito.find(p => p.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardar();
  renderCarrito();
  actualizarBadge();
  animarIcono();
  toast(producto.nombre);
}

/* ================= RENDER CARRITO ================= */
function renderCarrito() {
  const cont = document.getElementById("carrito-items");
  cont.innerHTML = "";

  carrito.forEach(p => {
    cont.innerHTML += `
      <div class="carrito-item">
        <div>
          <strong>${p.nombre}</strong><br>
          $${p.precio}
        </div>

        <div class="cantidad-control">
          <button class="btn-cantidad" onclick="cambiar(${p.id}, -1)">-</button>
          <span>${p.cantidad}</span>
          <button class="btn-cantidad" onclick="cambiar(${p.id}, 1)">+</button>
        </div>

        <div>
          $${p.precio * p.cantidad}<br>
          <button class="btn-eliminar" onclick="eliminar(${p.id})">x</button>
        </div>
      </div>
    `;
  });

  actualizarTotal();
}

/* ================= FUNCIONES ================= */
function cambiar(id, cambio) {
  const prod = carrito.find(p => p.id === id);
  prod.cantidad += cambio;

  if (prod.cantidad <= 0) {
    eliminar(id);
    return;
  }

  guardar();
  renderCarrito();
  actualizarBadge();
}

function eliminar(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardar();
  renderCarrito();
  actualizarBadge();
}

function vaciarCarrito() {
  carrito = [];
  guardar();
  renderCarrito();
  actualizarBadge();
}

function actualizarTotal() {
  const total = document.getElementById("total-carrito");

  const suma = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  total.textContent = "$" + suma;
}

function actualizarBadge() {
  const badge = document.querySelector(".tienda__cart-badge");
  if (!badge) return;

  const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  badge.textContent = total;
  badge.style.display = total === 0 ? "none" : "flex";
}

function guardar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* ================= EFECTOS ================= */
function animarIcono() {
  const icono = document.querySelector(".tienda__icon");
  icono.classList.add("shake");

  setTimeout(() => icono.classList.remove("shake"), 300);
}

function toast(nombre) {
  const t = document.createElement("div");
  t.innerText = `🍔 ${nombre} agregado`;
  t.style.position = "fixed";
  t.style.bottom = "20px";
  t.style.right = "20px";
  t.style.background = "#E4572E";
  t.style.color = "#fff";
  t.style.padding = "10px 20px";
  t.style.borderRadius = "10px";
  t.style.zIndex = "9999";

  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2000);
}

/* ================= INIT ================= */
renderizarProductos();
renderCarrito();
actualizarBadge();