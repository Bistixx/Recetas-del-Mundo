document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const response = await fetch("data/recetas.json");
  const recetas = await response.json();
  const receta = recetas.find(r => r.id == id);

  const container = document.getElementById("detalle-receta");

  if (!receta) {
    container.innerHTML = "<p>Receta no encontrada.</p>";
    return;
  }

  container.innerHTML = `
    <h1>${receta.nombre}</h1>
    <img src="${receta.imagen}" alt="Imagen de ${receta.nombre}" class="img-fluid my-3">
    <p><strong>País:</strong> ${receta.pais}</p>
    <p><strong>Tipo:</strong> ${receta.tipo}</p>
    <p><strong>Momento:</strong> ${receta.momento}</p>
    <p><strong>Duración:</strong> ${receta.duracion}</p>
    <p><strong>Porciones:</strong> ${receta.porciones}</p>
    <h3>Ingredientes</h3>
    <ul>${receta.ingredientes.map(i => `<li>${i}</li>`).join("")}</ul>
    <h3>Pasos</h3>
    <ol>${receta.pasos.map(p => `<li>${p}</li>`).join("")}</ol>
  `;
});
