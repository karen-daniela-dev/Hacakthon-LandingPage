/* ================= DATA ================= */
const hamburguesas = [
  {
    id: 1,
    nombre: "La Colombiana",
    precio: 25000,
    img: "assets/mega-stack.png",
    descripcion: "Carne Angus, plátano maduro, huevo frito y vegetales.",
  },
  {
    id: 2,
    nombre: "La Mexicana",
    precio: 25000,
    img: "assets/double-beast.png",
    descripcion: "Res, pollo, cerdo, jamón, tocineta y guacamole.",
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

/* ================= ESTADO ================= */
const contenedor = document.getElementById("contenedor-hamburguesas");
const contCarrito = document.getElementById("carrito-items");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* ================= RENDER PRODUCTOS ================= */
function renderizarProductos() {
  let html = "";

  hamburguesas.forEach((p) => {
    html += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card text-center p-3 tienda__categoria-card">
          <img src="${p.img}" class="img-fluid">
          <div class="card-body">
            <h5>${p.nombre}</h5>
            <p class="small">${p.descripcion}</p>
            <p class="fw-bold">${formatearCOP(p.precio)}</p>
            <button class="btn btn-primary btn-agregar" data-id="${p.id}">
              Agregar
            </button>
          </div>
        </div>
      </div>
    `;
  });

  contenedor.innerHTML = html;
}

function formatearCOP(valor) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(valor);
}

/* ================= EVENTOS (DELEGACIÓN) ================= */
contenedor.addEventListener("click", (e) => {
  if (e.target.matches(".btn-agregar")) {
    const id = Number(e.target.dataset.id);
    agregar(id);
  }
});

contCarrito.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);

  if (e.target.matches(".btn-sumar")) cambiar(id, 1);
  if (e.target.matches(".btn-restar")) cambiar(id, -1);
  if (e.target.matches(".btn-eliminar")) eliminar(id);
});

/* ================= CARRITO ================= */
function agregar(id) {
  const producto = hamburguesas.find((p) => p.id === id);
  if (!producto) return;

  const existe = carrito.find((p) => p.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarTodo();
  animarIcono();
  toast(producto.nombre);
}

function cambiar(id, cambio) {
  const prod = carrito.find((p) => p.id === id);
  if (!prod) return;

  prod.cantidad += cambio;

  if (prod.cantidad <= 0) {
    eliminar(id);
    return;
  }

  actualizarTodo();
}

function eliminar(id) {
  carrito = carrito.filter((p) => p.id !== id);
  actualizarTodo();
}

function vaciarCarrito() {
  carrito = [];
  actualizarTodo();
}

/* ================= RENDER CARRITO ================= */
function renderCarrito() {
  let html = "";

  carrito.forEach((p) => {
    html += `
      <div class="carrito-item">

        <img src="${p.img}" class="carrito-img">

        <div class="carrito-info">
          <strong>${p.nombre}</strong>
          <span>${formatearCOP(p.precio)}</span>
        </div>

        <div class="cantidad-control">
          <button class="btn-cantidad btn-restar" data-id="${p.id}">-</button>
          <span>${p.cantidad}</span>
          <button class="btn-cantidad btn-sumar" data-id="${p.id}">+</button>
        </div>

        <div class="carrito-acciones">
          <span class="subtotal">${formatearCOP(p.precio * p.cantidad)}</span>
          <button class="btn-eliminar" data-id="${p.id}">✕</button>
        </div>

      </div>
    `;
  });

  contCarrito.innerHTML = html;
}

/* ================= UTIL ================= */
function actualizarTotal() {
  const total = document.getElementById("total-carrito");

  const suma = carrito.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  );

  total.textContent = formatearCOP(suma);
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

/* ================= CENTRALIZADOR ================= */
function actualizarTodo() {
  guardar();
  renderCarrito();
  actualizarTotal();
  actualizarBadge();
}

/* ================= EFECTOS ================= */
function animarIcono() {
  const icono = document.querySelector(".tienda__icon");
  if (!icono) return;

  icono.classList.add("shake");
  setTimeout(() => icono.classList.remove("shake"), 300);
}

function toast(nombre) {
  const t = document.createElement("div");
  t.innerText = `🍔 ${nombre} agregado`;

  Object.assign(t.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#1bab1d",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "10px",
    zIndex: "9999",
    fontWeight: "bold",
  });

  document.body.appendChild(t);

  setTimeout(() => t.remove(), 2000);
}

/* ================= INIT ================= */
renderizarProductos();
actualizarTodo();

/* ================= GLOBAL (para HTML) ================= */
window.vaciarCarrito = vaciarCarrito;

document.getElementById("btn-vaciar")
  .addEventListener("click", vaciarCarrito);