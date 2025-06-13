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
