document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productoForm");
  const table = document.getElementById("productosTable").querySelector("tbody");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombreProducto").value;
    const precio = document.getElementById("precioProducto").value;
    const stock = document.getElementById("stockProducto").value;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${nombre}</td>
      <td>${precio}</td>
      <td>${stock}</td>
      <td>
        <button class="edit">Editar</button>
        <button class="delete">Eliminar</button>
      </td>
    `;
    table.appendChild(row);

    form.reset();
  });

  table.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      e.target.closest("tr").remove();
    }
    if (e.target.classList.contains("edit")) {
      alert("Función de edición aún no implementada 😅");
    }
  });
});
