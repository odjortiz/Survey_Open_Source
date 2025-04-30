const totalPreguntas = 4;
let preguntaActual = 1;

document.getElementById('totalPreguntas').textContent = totalPreguntas;

function mostrarPregunta(n) {
  for (let i = 1; i <= totalPreguntas; i++) {
    const elem = document.getElementById('pregunta' + i);
    if (elem) {
      elem.classList.remove('activa');
    }
  }
  const pregunta = document.getElementById('pregunta' + n);
  if (pregunta) {
    pregunta.classList.add('activa');
  }
  document.getElementById('numPregunta').textContent = n;
  preguntaActual = n;
}

// Navegar a la siguiente pregunta con validación
function siguientePregunta(n) {
  const form = document.getElementById('encuestaForm');
  const inputs = document.querySelectorAll(`#pregunta${n} input, #pregunta${n} select`);
  
  for (const input of inputs) {
    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }
  }
  if (n < totalPreguntas) {
    mostrarPregunta(n + 1);
  }
}

// Navegar a la pregunta anterior
function anteriorPregunta(n) {
  if (n > 1) {
    mostrarPregunta(n - 1);
  }
}

// Habilitar/deshabilitar campo tipoEntidad según fuenteRecursos
const fuenteRecursos = document.getElementById('fuenteRecursos');
const tipoEntidad = document.getElementById('tipoEntidad');

fuenteRecursos.addEventListener('change', () => {
  if (fuenteRecursos.value === 'externo') {
    tipoEntidad.disabled = false;
    tipoEntidad.setAttribute('aria-disabled', 'false');
    tipoEntidad.required = true;
  } else {
    tipoEntidad.disabled = true;
    tipoEntidad.setAttribute('aria-disabled', 'true');
    tipoEntidad.required = false;
    tipoEntidad.value = '';
  }
});

// Manejo del envío del formulario
document.getElementById('encuestaForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Validar última sección
  const inputs = document.querySelectorAll(`#pregunta${totalPreguntas} input, #pregunta${totalPreguntas} select`);
  for (const input of inputs) {
    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }
  }

  // Aquí puedes enviar los datos a un backend o mostrar resumen
  alert('Gracias por completar la encuesta. Sus respuestas han sido registradas.');

  this.reset();
  mostrarPregunta(1);
});