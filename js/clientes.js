// clientes.js — CRUD en memoria + localStorage. 
// Revisa la consola (F12) si algo no funciona.

(function () {
  console.log("clientes.js cargado");

  // Helpers
  const qs = sel => document.querySelector(sel);
  const escapeHtml = str =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  // Elementos
  const form = qs("#clienteForm");
  const tbody = qs("#clientesTBody");
  const submitBtn = qs("#submitBtn");
  const cancelBtn = qs("#cancelBtn");

  // Cargar desde localStorage o datos dummies
  const STORAGE_KEY = "crm_clientes_v1";
  let clientes = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || [
    { id: Date.now()-3, nombre: "Juan", apellido: "Pérez", documento: "12345", email: "juan@mail.com", telefono: "3001234567", direccion: "Cll 1" },
    { id: Date.now()-2, nombre: "María", apellido: "Gómez", documento: "67890", email: "maria@mail.com", telefono: "3119876543", direccion: "Crr 2" },
    { id: Date.now()-1, nombre: "Carlos", apellido: "Ramírez", documento: "11223", email: "carlos@mail.com", telefono: "3224567890", direccion: "Av 3" }
  ];

  let editingId = null;

  // Render
  function renderClientes() {
    tbody.innerHTML = "";
    if (!Array.isArray(clientes)) clientes = [];
    clientes.forEach((c, index) => {
      const tr = document.createElement("tr");
      tr.dataset.id = c.id;
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${escapeHtml(c.nombre)}</td>
        <td>${escapeHtml(c.apellido)}</td>
        <td>${escapeHtml(c.documento || "")}</td>
        <td>${escapeHtml(c.email)}</td>
        <td>${escapeHtml(c.telefono || "")}</td>
        <td>${escapeHtml(c.direccion || "")}</td>
        <td>
          <button class="edit" data-id="${c.id}">Editar</button>
          <button class="delete" data-id="${c.id}">Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
    console.log("Tabla renderizada, clientes:", clientes.length);
    syncStorage();
  }

  // Guardar en localStorage
  function syncStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
  }

  // Reset form
  function resetForm() {
    form.reset();
    editingId = null;
    submitBtn.textContent = "Guardar";
    cancelBtn.style.display = "none";
  }

  // Submit (Crear / Actualizar)
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    try {
      const nombre = qs("#nombre").value.trim();
      const apellido = qs("#apellido").value.trim();
      const documento = qs("#documento").value.trim();
      const email = qs("#email").value.trim();
      const telefono = qs("#telefono").value.trim();
      const direccion = qs("#direccion").value.trim();

      if (!nombre || !apellido || !email) {
        alert("Nombre, apellido y email son obligatorios.");
        return;
      }

      if (editingId) {
        // actualizar
        const idx = clientes.findIndex(c => c.id === editingId);
        if (idx === -1) throw new Error("Cliente a editar no encontrado");
        clientes[idx] = {
          ...clientes[idx],
          nombre, apellido, documento, email, telefono, direccion
        };
        console.log("Cliente actualizado", clientes[idx]);
      } else {
        // nuevo
        const nuevo = {
          id: Date.now(),
          nombre, apellido, documento, email, telefono, direccion
        };
        clientes.push(nuevo);
        console.log("Cliente creado", nuevo);
      }

      resetForm();
      renderClientes();
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error. Mira la consola (F12).");
    }
  });

  // Delegación de eventos para Edit / Delete
  tbody.addEventListener("click", function (e) {
    const target = e.target;
    const id = target.dataset?.id ? Number(target.dataset.id) : null;
    if (target.classList.contains("edit")) {
      const cliente = clientes.find(c => c.id === id);
      if (!cliente) { alert("Cliente no encontrado"); return; }
      // llenar formulario
      qs("#nombre").value = cliente.nombre;
      qs("#apellido").value = cliente.apellido;
      qs("#documento").value = cliente.documento || "";
      qs("#email").value = cliente.email;
      qs("#telefono").value = cliente.telefono || "";
      qs("#direccion").value = cliente.direccion || "";
      editingId = cliente.id;
      submitBtn.textContent = "Actualizar";
      cancelBtn.style.display = "inline-block";
      window.scrollTo({ top: 0, behavior: "smooth" });
      console.log("Editar cliente", cliente);
    }
    if (target.classList.contains("delete")) {
      if (!confirm("¿Eliminar este cliente?")) return;
      clientes = clientes.filter(c => c.id !== id);
      renderClientes();
    }
  });

  // Cancelar edición
  cancelBtn.addEventListener("click", () => {
    resetForm();
  });

  // Exponer para depuración
  window._crm = {
    clientes,
    renderClientes,
    resetForm
  };

  // Primer render
  renderClientes();
})();
