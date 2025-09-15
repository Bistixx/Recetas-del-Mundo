// RECETAS
document.addEventListener("DOMContentLoaded", async () => {
  const lista = document.getElementById("lista-recetas");

  const response = await fetch("data/recetas.json");
  const recetas = await response.json();

  recetas.forEach((receta) => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${receta.imagen}" class="card-img-top" alt="Imagen de ${receta.nombre}">
        <div class="card-body">
          <h5 class="card-title">${receta.nombre}</h5>
          <p class="card-text">${receta.pais} - ${receta.tipo}</p>
          <a href="receta.html?id=${receta.id}" class="btn btn-primary">Ver receta</a>
        </div>
      </div>
    `;
    lista.appendChild(card);
  });
});
document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    const filtro = e.target.textContent;
    console.log(`Filtrar por: ${filtro}`);
    // Aquí puedes implementar la lógica de filtrado según tu JSON
  });
});

//BARRA DE BUSQUEDA INDEX
document.addEventListener("DOMContentLoaded", function () {
  const buscador = document.getElementById("buscador");
  const btnBuscar = document.getElementById("btn-buscar");
  const filtroPais = document.querySelector(".filtro-pais");
  const filtroTipo = document.querySelector(".filtro-tipo");
  const recetasContainer = document.querySelector(".row.row-cols-1"); // Contenedor de recetas

  // Función para filtrar y ordenar recetas
  function filtrarYOrdenarRecetas() {
    const textoBusqueda = buscador.value.toLowerCase();
    const paisSeleccionado = filtroPais.value.toLowerCase();
    const tipoSeleccionado = filtroTipo.value.toLowerCase();

    // Obtener todas las cards de recetas
    const cards = Array.from(document.querySelectorAll(".col"));

    // Filtrar y ordenar
    const recetasFiltradas = cards
      .filter((card) => {
        const titulo = card
          .querySelector(".card-title")
          .textContent.toLowerCase();
        const descripcion = card
          .querySelector(".card-text")
          .textContent.toLowerCase();

        const coincideBusqueda =
          titulo.includes(textoBusqueda) || descripcion.includes(textoBusqueda);
        const coincidePais =
          paisSeleccionado === "🌍 todos los países" ||
          descripcion.includes(paisSeleccionado);
        const coincideTipo =
          tipoSeleccionado === "🍽️ todos los tipos" ||
          descripcion.includes(tipoSeleccionado);

        return coincideBusqueda && coincidePais && coincideTipo;
      })
      .sort((a, b) => {
        // Ordenar alfabéticamente por título
        const tituloA = a
          .querySelector(".card-title")
          .textContent.toLowerCase();
        const tituloB = b
          .querySelector(".card-title")
          .textContent.toLowerCase();
        return tituloA.localeCompare(tituloB);
      });

    // Ocultar todas las cards primero
    cards.forEach((card) => (card.style.display = "none"));

    // Mostrar solo las filtradas en orden
    recetasFiltradas.forEach((card, index) => {
      card.style.display = "block";
      card.style.order = index; // Asegurar orden correcto
    });
  }

  // Event listeners
  [buscador, btnBuscar, filtroPais, filtroTipo].forEach((element) => {
    element.addEventListener("input", filtrarYOrdenarRecetas);
    element.addEventListener("change", filtrarYOrdenarRecetas);
  });
});

//TRANSICION
document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todos los enlaces internos a recetas
  const enlacesRecetas = document.querySelectorAll('a[href^="./RECETAS/"]');

  enlacesRecetas.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();
      const urlDestino = enlace.href;

      // Verificamos compatibilidad
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          window.location.href = urlDestino;
        });
      } else {
        // Fallback sin animación
        window.location.href = urlDestino;
      }
    });
  });
});


//FORMULARIO CONTACTO
// 1. Precarga de valores
function precargarFormulario() {
  document.getElementById("nombre").value = "Invitado";
  document.getElementById("email").value = "usuario@ejemplo.com";
  document.getElementById("receta").value = "Ejemplo: Brownie vegano sin gluten";
}

// 2. Ejecutar precarga cuando arranca la app
precargarFormulario();

// 3. Validación y feedback con SweetAlert2
document.getElementById("form-receta").addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const receta = document.getElementById("receta").value;

  if (!nombre || !email || !receta) {
    Swal.fire({
      icon: "error",
      title: "Faltan datos",
      text: "Por favor, completa todos los campos"
    });
    return;
  }

  Swal.fire({
    icon: "success",
    title: "¡Gracias!",
    text: `Tu receta fue enviada correctamente, ${nombre}`
  });

  e.target.reset();
  precargarFormulario();
});

// ---- FUNCIONES ----

// Guarda en localStorage
function guardarSugerencia(sugerencia) {
  const prev = JSON.parse(localStorage.getItem("sugerencias")) || [];
  prev.push(sugerencia);
  localStorage.setItem("sugerencias", JSON.stringify(prev));
}

// Renderiza la lista de sugerencias guardadas
function renderSugerencias() {
  const lista = document.getElementById("lista-sugerencias");
  const sugerencias = JSON.parse(localStorage.getItem("sugerencias")) || [];

  lista.innerHTML = "";

  if (sugerencias.length === 0) {
    lista.innerHTML = "<li>No hay sugerencias todavía.</li>";
    return;
  }

  sugerencias.forEach(s => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${s.nombre}</strong> (${s.email}) sugirió: ${s.receta}`;
    lista.appendChild(li);
  });
}

// ---- EVENTOS ----
document.getElementById("form-receta").addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const receta = document.getElementById("receta").value;

  if (!nombre || !email || !receta) {
    Swal.fire({
      icon: "error",
      title: "Faltan datos",
      text: "Por favor, completa todos los campos"
    });
    return;
  }

  const nueva = { nombre, email, receta };
  guardarSugerencia(nueva);

  Swal.fire({
    icon: "success",
    title: "¡Gracias!",
    text: `Tu receta fue enviada correctamente, ${nombre}`
  });

  e.target.reset();
  precargarFormulario();
  renderSugerencias(); // 🔑 actualizar lista al enviar
});

// ---- INICIO ----
precargarFormulario();
renderSugerencias(); // 🔑 mostrar sugerencias guardadas al entrar

