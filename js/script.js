// Array en memoria para almacenar clientes
let clientes = [];

// Referencias a elementos del DOM
const form = document.querySelector("form");
const tablaBody = document.querySelector("tbody");

let editIndex = null; // Para saber si estamos editando un cliente

// Evento submit del formulario
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = form.querySelector("input[placeholder='Nombre del cliente']").value;
  const apellido = form.querySelector("input[placeholder='Apellido del cliente']").value;
  const documento = form.querySelector("input[placeholder='Documento']").value;
  const email = form.querySelector("input[placeholder='correo@ejemplo.com']").value;
  const telefono = form.querySelector("input[placeholder='Teléfono']").value;
  const direccion = form.querySelector("input[placeholder='Dirección']").value;

  if (editIndex === null) {
    // Crear nuevo cliente
    const nuevoCliente = { id: clientes.length + 1, nombre, apellido, documento, email, telefono, direccion };
    clientes.push(nuevoCliente);
  } else {
    // Editar cliente existente
    clientes[editIndex] = { 
      ...clientes[editIndex],
      nombre, apellido, documento, email, telefono, direccion 
    };
    editIndex = null;
  }

  form.reset();
  renderClientes();
});

// Renderizar la tabla
function renderClientes() {
  tablaBody.innerHTML = "";
  clientes.forEach((cliente, index) => {
    const row = `
      <tr>
        <td>${cliente.id}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.apellido}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefono}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarCliente(${index})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarCliente(${index})">Eliminar</button>
        </td>
      </tr>
    `;
    tablaBody.innerHTML += row;
  });
}

// Editar cliente
function editarCliente(index) {
  const cliente = clientes[index];
  form.querySelector("input[placeholder='Nombre del cliente']").value = cliente.nombre;
  form.querySelector("input[placeholder='Apellido del cliente']").value = cliente.apellido;
  form.querySelector("input[placeholder='Documento']").value = cliente.documento;
  form.querySelector("input[placeholder='correo@ejemplo.com']").value = cliente.email;
  form.querySelector("input[placeholder='Teléfono']").value = cliente.telefono;
  form.querySelector("input[placeholder='Dirección']").value = cliente.direccion;
  editIndex = index;
}

// Eliminar cliente
function eliminarCliente(index) {
  if (confirm("¿Seguro que deseas eliminar este cliente?")) {
    clientes.splice(index, 1);
    renderClientes();
  }
}

// Inicializar
renderClientes();
