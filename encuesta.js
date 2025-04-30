const totalSecciones = 5;
let seccionActual = 1;

document.getElementById('totalSecciones').textContent = totalSecciones;

// Mostrar la sección actual
function mostrarSeccion(n) {
  for (let i = 1; i <= totalSecciones; i++) {
    document.getElementById('seccion' + i).classList.remove('activa');
  }
  document.getElementById('seccion' + n).classList.add('activa');
  document.getElementById('numSeccion').textContent = n;
  seccionActual = n;
}

// Siguiente sección con validación
function siguienteSeccion(n) {
  const inputs = document.querySelectorAll(`#seccion${n} input, #seccion${n} select`);
  for (const input of inputs) {
    if (!input.disabled && !input.checkValidity()) {
      input.reportValidity();
      return;
    }
  }
  if (n < totalSecciones) mostrarSeccion(n + 1);
}

// Anterior sección
function anteriorSeccion(n) {
  if (n > 1) mostrarSeccion(n - 1);
}

// Lógica para habilitar/deshabilitar tipoEntidad
document.getElementById('fuenteRecursos').addEventListener('change', function() {
  const tipoEntidad = document.getElementById('tipoEntidad');
  if (this.value === 'Externo') {
    tipoEntidad.disabled = false;
    tipoEntidad.required = true;
  } else {
    tipoEntidad.disabled = true;
    tipoEntidad.required = false;
    tipoEntidad.value = '';
  }
});

// Envío del formulario
document.getElementById('encuestaForm').addEventListener('submit', function(e) {
  e.preventDefault();
  // Validar última sección
  const inputs = document.querySelectorAll(`#seccion${totalSecciones} input, #seccion${totalSecciones} select`);
  for (const input of inputs) {
    if (!input.disabled && !input.checkValidity()) {
      input.reportValidity();
      return;
    }
  }
  // Mostrar mensaje final
  document.getElementById('encuestaForm').classList.add('oculto');
  document.getElementById('barraProgreso').classList.add('oculto');
  document.getElementById('mensajeFinal').classList.remove('oculto');
  document.getElementById('mensajeFinal').textContent = '¡Gracias! Sus respuestas han sido registradas.';
});

// Inicializar
mostrarSeccion(1);
