// --- Control de preguntas dentro de la sección Cultura ---
let preguntaActualCultura = 0;
const preguntasCultura = document.querySelectorAll('.pregunta-cultura');
const totalPreguntasCultura = preguntasCultura.length;

function mostrarPreguntaCultura(n) {
  preguntasCultura.forEach((div, idx) => {
    div.classList.toggle('pregunta-activa', idx === n);
  });
  // Actualiza barra de progreso de preguntas
  document.getElementById('progresoPreguntasCultura').innerHTML =
    `Pregunta ${n + 1} de ${totalPreguntasCultura}`;
  preguntaActualCultura = n;
}

function siguientePreguntaCultura() {
  const pregunta = preguntasCultura[preguntaActualCultura];
  // Validación simple: que el campo requerido esté lleno
  const required = pregunta.querySelector('[required]');
  if (required && !required.value) {
    required.focus();
    required.reportValidity();
    return;
  }
  if (preguntaActualCultura < totalPreguntasCultura - 1) {
    mostrarPreguntaCultura(preguntaActualCultura + 1);
  }
}

function anteriorPreguntaCultura() {
  if (preguntaActualCultura > 0) {
    mostrarPreguntaCultura(preguntaActualCultura - 1);
  }
}

function finalizarSeccionCultura() {
  document.getElementById('seccion-cultura').classList.add('oculto');
  document.getElementById('mensajeFinal').classList.remove('oculto');
  document.getElementById('mensajeFinal').textContent = '¡Gracias! Sección Cultura completada.';
}

// --- Barra de progreso de secciones (ajusta según el total de secciones) ---
function updateProgressSecciones(seccionActual, totalSecciones) {
  document.getElementById('progresoSecciones').innerHTML =
    `Sección ${seccionActual} de ${totalSecciones}`;
}

// --- Tablas dinámicas ---
function agregarFilaActividadesCultura() {
  const tbody = document.getElementById('tablaActividadesCultura');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" required></td>
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Estudiantes</option>
        <option>Profesores</option>
        <option>Administrativos</option>
      </select>
    </td>
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Femenino</option>
        <option>Masculino</option>
        <option>No binario</option>
      </select>
    </td>
    <td><input type="number" min="0" required></td>
    <td><button type="button" onclick="eliminarFila(this)">🗑️</button></td>
  `;
  tbody.appendChild(tr);
}
agregarFilaActividadesCultura();

function agregarFilaAsociacionCultural() {
  const tbody = document.getElementById('tablaAsociacionesCulturales');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Ascun</option>
        <option>Otros</option>
      </select>
    </td>
    <td><input type="number" min="0" required></td>
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Estudiantes</option>
        <option>Profesores</option>
        <option>Administrativos</option>
      </select>
    </td>
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Femenino</option>
        <option>Masculino</option>
        <option>No binario</option>
      </select>
    </td>
    <td><button type="button" onclick="eliminarFila(this)">🗑️</button></td>
  `;
  tbody.appendChild(tr);
}

function agregarFilaGrupoRepresentativo() {
  const tbody = document.getElementById('tablaGruposRepresentativos');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Música</option>
        <option>Danza</option>
        <option>Teatro</option>
        <option>Arte</option>
      </select>
    </td>
    <td><input type="number" min="0" required></td>
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Estudiantes</option>
        <option>Docentes</option>
        <option>Administrativos</option>
      </select>
    </td>
    <td><button type="button" onclick="eliminarFila(this)">🗑️</button></td>
  `;
  tbody.appendChild(tr);
}

function agregarFilaEstimuloApoyo() {
  const tbody = document.getElementById('tablaEstimulosApoyos');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Académico</option>
        <option>Económico</option>
      </select>
    </td>
    <td><input type="number" min="0" required></td>
    <td><input type="text" required placeholder="Ej: 300000 o 10%"></td>
    <td><button type="button" onclick="eliminarFila(this)">🗑️</button></td>
  `;
  tbody.appendChild(tr);
}

function agregarFilaEventoAcademico() {
  const tbody = document.getElementById('tablaEventosAcademicos');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" required></td>
    <td><input type="number" min="0" required></td>
    <td><input type="number" min="0" step="0.1" required></td>
    <td><button type="button" onclick="eliminarFila(this)">🗑️</button></td>
  `;
  tbody.appendChild(tr);
}

function agregarFilaResponsabilidadSocial() {
  const tbody = document.getElementById('tablaResponsabilidadSocial');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" required></td>
    <td><input type="number" min="0" required></td>
    <td><button type="button" onclick="eliminarFila(this)">🗑️</button></td>
  `;
  tbody.appendChild(tr);
}

function eliminarFila(btn) {
  btn.closest('tr').remove();
}

// --- Mostrar/ocultar tablas condicionales ---
function toggleAsociacionCultural(sel) {
  document.getElementById('detalleAsociacionCultural').style.display = (sel.value === 'Sí') ? '' : 'none';
  if (sel.value === 'Sí' && document.getElementById('tablaAsociacionesCulturales').children.length === 0) {
    agregarFilaAsociacionCultural();
  }
}
function toggleEventosAcademicos(sel) {
  document.getElementById('detalleEventosAcademicos').style.display = (sel.value === 'Sí') ? '' : 'none';
  if (sel.value === 'Sí' && document.getElementById('tablaEventosAcademicos').children.length === 0) {
    agregarFilaEventoAcademico();
  }
}
function toggleResponsabilidadSocial(sel) {
  document.getElementById('detalleResponsabilidadSocial').style.display = (sel.value === 'Sí') ? '' : 'none';
  if (sel.value === 'Sí' && document.getElementById('tablaResponsabilidadSocial').children.length === 0) {
    agregarFilaResponsabilidadSocial();
  }
}

// --- Inicialización ---
mostrarPreguntaCultura(0);
updateProgressSecciones(1, 1); // Si tienes más secciones, actualiza el total
