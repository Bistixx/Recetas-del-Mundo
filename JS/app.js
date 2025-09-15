// ====== CARGAR RECETAS DESDE JSON ======
let recetas = [];
let recetasFiltradas = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/recetas.json")
    .then(res => res.json())
    .then(data => {
      recetas = data;
      recetasFiltradas = recetas;
      inicializarFiltros();
      mostrarRecetas(recetas);
    })
    .catch(() => {
      Swal.fire("Error", "No se pudieron cargar las recetas", "error");
    });

  // Eventos de filtros y búsqueda
  document.getElementById("filtroPais").addEventListener("change", aplicarFiltros);
  document.getElementById("filtroTipo").addEventListener("change", aplicarFiltros);
  document.getElementById("filtroMomento").addEventListener("change", aplicarFiltros);
  document.getElementById("buscador").addEventListener("input", aplicarFiltros);
});

// ====== INICIALIZAR FILTROS ======
function inicializarFiltros() {
  const paises = [...new Set(recetas.map(r => r.pais))];
  const tipos = [...new Set(recetas.map(r => r.tipo))];
  const momentos = [...new Set(recetas.map(r => r.momento))];

  cargarOpciones("filtroPais", paises);
  cargarOpciones("filtroTipo", tipos);
  cargarOpciones("filtroMomento", momentos);
}

function cargarOpciones(idSelect, opciones) {
  const select = document.getElementById(idSelect);
  opciones.forEach(op => {
    const option = document.createElement("option");
    option.value = op;
    option.textContent = op;
    select.appendChild(option);
  });
}

// ====== MOSTRAR RECETAS ======
function mostrarRecetas(lista) {
  const contenedor = document.getElementById("recetasContainer");
  const detalle = document.getElementById("detalleReceta");

  contenedor.innerHTML = "";
  detalle.classList.add("d-none");

  if (lista.length === 0) {
    contenedor.innerHTML = `<p class="text-center text-muted">No se encontraron recetas.</p>`;
    return;
  }

  lista.forEach(receta => {
    const card = document.createElement("div");
    card.className = "col-md-4";
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${receta.imagen}" class="card-img-top img-receta" alt="${receta.nombre}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${receta.nombre}</h5>
          <p class="card-text"><strong>Duración:</strong> ${receta.duracion}</p>
          <p class="card-text"><strong>Porciones:</strong> ${receta.porciones}</p>
          <button class="btn btn-dark mt-auto" onclick="verDetalle('${receta.nombre}')">Ver receta</button>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });
}

// ====== APLICAR FILTROS Y BÚSQUEDA ======
function aplicarFiltros() {
  const pais = document.getElementById("filtroPais").value;
  const tipo = document.getElementById("filtroTipo").value;
  const momento = document.getElementById("filtroMomento").value;
  const busqueda = document.getElementById("buscador").value.toLowerCase();

  recetasFiltradas = recetas.filter(r =>
    (pais === "" || r.pais === pais) &&
    (tipo === "" || r.tipo === tipo) &&
    (momento === "" || r.momento === momento) &&
    (r.nombre.toLowerCase().includes(busqueda))
  );

  mostrarRecetas(recetasFiltradas);
}

// ====== VER DETALLE DE RECETA ======
function verDetalle(nombre) {
  const receta = recetas.find(r => r.nombre === nombre);
  if (!receta) {
    Swal.fire("Error", "Receta no encontrada", "error");
    return;
  }

  const detalle = document.getElementById("detalleReceta");
  const contenedor = document.getElementById("recetasContainer");

  contenedor.innerHTML = "";
  detalle.classList.remove("d-none");

  detalle.innerHTML = `
    <div class="card shadow-sm">
      <img src="${receta.imagen}" class="card-img-top img-detalle" alt="${receta.nombre}">
      <div class="card-body">
        <h3 class="card-title">${receta.nombre}</h3>
        <p><strong>Duración:</strong> ${receta.duracion}</p>
        <p><strong>Porciones:</strong> ${receta.porciones}</p>
        <p><strong>País:</strong> ${receta.pais}</p>
        <p><strong>Tipo:</strong> ${receta.tipo}</p>
        <p><strong>Momento:</strong> ${receta.momento}</p>
        
        <h5>Ingredientes</h5>
        <ul>
          ${receta.ingredientes.map((ing, i) => `<li>${receta.cantidad[i]} - ${ing}</li>`).join("")}
        </ul>

        <h5>Preparación</h5>
        <ol>
          ${receta.paso_a_paso.map(p => `<li>${p}</li>`).join("")}
        </ol>

        <button class="btn btn-secondary mt-3" onclick="volver()">← Volver</button>
      </div>
    </div>
  `;
}

// ====== VOLVER A LISTADO ======
function volver() {
  mostrarRecetas(recetasFiltradas);
}
