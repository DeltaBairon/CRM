document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ventaForm");
  const table = document.getElementById("ventasTable").querySelector("tbody");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const cliente = document.getElementById("clienteVenta").value;
    const producto = document.getElementById("productoVenta").value;
    const cantidad = document.getElementById("cantidadVenta").value;
    const precioUnitario = 120; // Dummy fijo para preview
    const total = cantidad * precioUnitario;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${cliente}</td>
      <td>${producto}</td>
      <td>${cantidad}</td>
      <td>${total}</td>
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
