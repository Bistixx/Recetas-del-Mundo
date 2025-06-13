// /js/app.js
async function obtenerRecetas() {
    const res = await fetch('/data/recetas.json');
    const initialRecetas = await res.json();
    // Intenta obtener recetas de localStorage
    const storedRecetas = JSON.parse(localStorage.getItem('recetas')) || [];
    // Combina las recetas iniciales con cualquier receta almacenada, evitando duplicados
    const combinedRecetas = [...initialRecetas];
    storedRecetas.forEach(storedRecipe => {
        if (!combinedRecetas.some(r => r.nombre === storedRecipe.nombre)) {
            combinedRecetas.push(storedRecipe);
        }
    });
    return combinedRecetas;
}

function crearTarjeta(receta) {
    const card = document.createElement('div');
    card.className = 'tarjeta';
    card.innerHTML = `
        <img src="${receta.imagen}" alt="${receta.nombre}">
        <h3>${receta.nombre}</h3>
        <p>${receta.pais} | ${receta.tipo} | ${receta.momento}</p>
        <a href="receta.html?nombre=${encodeURIComponent(receta.nombre)}">Ver Receta</a>
    `;
    return card;
}

export { obtenerRecetas, crearTarjeta };