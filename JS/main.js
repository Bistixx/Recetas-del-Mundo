// RECETAS
document.addEventListener("DOMContentLoaded", async () => {
  const lista = document.getElementById("lista-recetas");

  const response = await fetch("data/recetas.json");
  const recetas = await response.json();

  recetas.forEach(receta => {
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
document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', (e) => {
    const filtro = e.target.textContent;
    console.log(`Filtrar por: ${filtro}`);
    // Aquí puedes implementar la lógica de filtrado según tu JSON
  });
});



//BARRA DE BUSQUEDA INDEX
document.addEventListener("DOMContentLoaded", function() {
  // 1. Elementos del DOM
  const buscador = document.getElementById("buscador");
  const btnBuscar = document.getElementById("btn-buscar");
  const filtroPais = document.querySelector(".filtro-pais");
  const filtroTipo = document.querySelector(".filtro-tipo");
  const cards = document.querySelectorAll(".card");

  // 2. Función de filtrado unificada
  function aplicarFiltros() {
    const textoBusqueda = buscador.value.toLowerCase();
    const pais = filtroPais.value.toLowerCase();
    const tipo = filtroTipo.value.toLowerCase();

    cards.forEach(card => {
      const titulo = card.querySelector(".card-title").textContent.toLowerCase();
      const descripcion = card.querySelector(".card-text").textContent.toLowerCase();
      
      // Lógica combinada
      const muestraCard = 
        (titulo.includes(textoBusqueda) || descripcion.includes(textoBusqueda)) &&
        (pais.includes("todos") || descripcion.includes(pais)) &&
        (tipo.includes("todos") || descripcion.includes(tipo));

      card.style.display = muestraCard ? "block" : "none";
    });
  }

  // 3. Eventos
  buscador.addEventListener("input", aplicarFiltros); // Al escribir
  btnBuscar.addEventListener("click", aplicarFiltros); // Al clickear "Buscar"
  filtroPais.addEventListener("change", aplicarFiltros); // Al cambiar país
  filtroTipo.addEventListener("change", aplicarFiltros); // Al cambiar tipo

  // 4. Debugging inicial
  console.log("Elementos cargados:", {
    buscador, btnBuscar, filtroPais, filtroTipo, 
    totalCards: cards.length
  });
});