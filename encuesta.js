// Opciones de listas
const nivelesJerarquicos = [
  "Operativo", "Asistencial", "Profesional", "Coordinación", "Jefatura", "Dirección", "Vicerrectoría"
];
const areasTematicas = [
  "Deporte", "Actividad Física", "Cultura", "Salud", "Deserción"
];
const nivelesEducativos = [
  "Básica", "Media", "Técnico Profesional", "Tecnológico", "Profesional", "Especialización", "Maestría", "Doctorado"
];
const tiposContrato = [
  "Contrato a Término Indefinido", "Contrato a Término Fijo", "Contrato civil por Prestación de Servicios",
  "Contrato Obra o Labor", "Contrato de aprendizaje"
];
const estadosContrato = [
  "Activo", "Inactivo"
];
const generos = [
  "Femenino", "Masculino", "No Binario"
];

// Agrega una fila vacía al cargar la página
window.onload = () => agregarFila();

function agregarFila() {
  const tbody = document.getElementById('matrizBody');
  const fila = document.createElement('tr');

  fila.innerHTML = `
    <td><input type="text" name="anio[]" pattern="\\d{4}" placeholder="AAAA" required></td>
    <td><input type="text" name="id[]" required></td>
    <td>${crearSelect("nivel[]", nivelesJerarquicos)}</td>
    <td>${crearSelect("area[]", areasTematicas)}</td>
    <td>${crearSelect("educacion[]", nivelesEducativos)}</td>
    <td>${crearSelect("contrato[]", tiposContrato)}</td>
    <td>${crearSelect("estado[]", estadosContrato)}</td>
    <td>${crearSelect("genero[]", generos)}</td>
    <td><input type="text" name="fecha[]" pattern="\\d{2}-\\d{2}-\\d{4}" placeholder="DD-MM-AAAA" required></td>
    <td><button type="button" onclick="eliminarFila(this)">🗑️</button></td>
  `;
  tbody.appendChild(fila);
}

function crearSelect(name, opciones) {
  let html = `<select name="${name}" required>`;
  html += `<option value="" disabled selected>Seleccione</option>`;
  opciones.forEach(op => {
    html += `<option value="${op}">${op}</option>`;
  });
  html += `</select>`;
  return html;
}

function eliminarFila(btn) {
  const fila = btn.closest('tr');
  fila.remove();
}

document.getElementById('encuestaForm').onsubmit = function(e) {
  // Validación extra (opcional)
  const anios = document.querySelectorAll('input[name="anio[]"]');
  const fechas = document.querySelectorAll('input[name="fecha[]"]');
  let valido = true;

  anios.forEach(input => {
    if (!/^\d{4}$/.test(input.value)) {
      input.style.border = '2px solid red';
      valido = false;
    } else {
      input.style.border = '';
    }
  });

  fechas.forEach(input => {
    if (!/^\d{2}-\d{2}-\d{4}$/.test(input.value)) {
      input.style.border = '2px solid red';
      valido = false;
    } else {
      input.style.border = '';
    }
  });

  if (!valido) {
    alert("Por favor, revise los campos resaltados.");
    e.preventDefault();
  }
  // Aquí puedes agregar el envío a un backend, Google Sheets, etc.
};
