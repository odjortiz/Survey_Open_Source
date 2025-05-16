/**
 * Sistema de Encuestas para Bienestar Universitario
 * 
 * Este script controla toda la funcionalidad de la encuesta dinámica:
 * - Gestión de secciones, subsecciones y preguntas
 * - Navegación entre preguntas y secciones
 * - Validación de respuestas
 * - Lógica condicional para mostrar/ocultar preguntas
 * - Guardado y exportación de datos
 * 
 * @author ODJ y Lovable
 * @date 2023-10-01
 * @version 1.0
 */

// Modelo de datos de la encuesta
let surveyData = {
    // Datos predefinidos de la encuesta
    sections: {
        // IES
        ies: {
            title: "IES",
            subsections: {
                presupuesto: {
                    title: "Presupuesto General",
                    questions: {
                        presupuestoAnual: {
                            text: "Institución y Presupuesto anual",
                            type: "table",
                            columns: [
                                {
                                    id: "institucion",
                                    title: "Institución",
                                    type: "select",
                                    options: [
                                        "Universidad Santo Tomás",
                                        "Universidad Militar Nueva Granada",
                                        "Uniagustiniana",
                                        "Universidad Central",
                                        "Universidad Antonio Nariño"
                                    ]
                                },
                                {
                                    id: "presupuesto",
                                    title: "Seleccione el rango Presupuestal anual destinado a Bienestar Universitario (millones de pesos)",
                                    type: "select",
                                    options: [
                                        "menor a 499",
                                        "entre 500 y 699",
                                        "entre 700 y 899",
                                        "entre 900 y 1100",
                                        "mayor a 1101"
                                    ]
                                }
                            ],
                            validation: function(value) {
                                return value && value.length > 0 ? true : "Debe agregar al menos una fila de información";
                            }
                        }
                    }
                },
                fuenteRecursos: {
                    title: "Fuente de los Recursos",
                    questions: {
                        fuenteRecursosAnual: {
                            text: "Fuente de los Recursos destinados anualmente",
                            type: "table",
                            columns: [
                                {
                                    id: "fuente",
                                    title: "¿Cuál es la fuente de los recursos destinados anualmente por la IES para Bienestar Universitario?",
                                    type: "select",
                                    options: [
                                        "Interno",
                                        "Externa"
                                    ]
                                },
                                {
                                    id: "tipoEntidad",
                                    title: "Si la fuente es externa, seleccione tipo de entidad que provee los recursos",
                                    type: "select",
                                    options: [
                                        "Caja de Compensación",
                                        "Empresa Privada",
                                        "Gubernamental",
                                        "Otro"
                                    ]
                                },
                                {
                                    id: "porcentajeFuente",
                                    title: "Seleccione el porcentaje según su fuente (millones de pesos)",
                                    type: "select",
                                    options: [
                                        "Entre el 1% y el 25%",
                                        "Entre el 26% y el 50%",
                                        "Entre el 51% y el 75%",
                                        "100%"
                                    ]
                                }
                            ],
                            validation: function(value) {
                                return value && value.length > 0 ? true : "Debe agregar al menos una fila de información";
                            }
                        }
                    }
                },
                asignacionRecursos: {
                    title: "Asignacion de los Recursos",
                    questions: {
                        porcentajeAsignado: {
                            text: "Porcentaje del presupuesto de Bienestar Universitario asignado a cada tema o área.",
                            type: "table",
                            columns: [
                                {
                                    id: "area",
                                    title: "Área",
                                    type: "select",
                                    options: [
                                        "Deporte",
                                        "Actividad Física",
                                        "Cultura",
                                        "Salud",
                                        "Deserción"
                                    ]
                                },
                                {
                                    id: "porcentaje",
                                    title: "Registre el porcentaje de presupuesto asignado a las actividades del área (millones de pesos)",
                                    type: "text",
                                    placeholder: "Ej: 12%",
                                    validation: function(value) {
                                        return /^\d{1,2}%$/.test(value) ? true : "Ingrese un porcentaje válido (Ej: 12%)";
                                    }
                                }
                            ],
                            validation: function(value) {
                                return value && value.length > 0 ? true : "Debe agregar al menos una fila de información";
                            }
                        }
                    }
                }
            }
        },
        // Recursos Humanos
        rrhh: {
            title: "Indicadores Recurso Humano Bienestar Universitario",
            subsections: {
                recursosHumanos: {
                    title: "Recursos Humanos de Bienestar Universitario",
                    questions: {
                        personalPorArea: {
                            text: "Personal por área de Bienestar Universitario",
                            type: "table",
                            columns: [
                                {
                                    id: "identificador",
                                    title: "Identificador Persona",
                                    type: "text",
                                    placeholder: "Número encriptado"
                                },
                                {
                                    id: "nivelJerarquico",
                                    title: "Nivel jerárquico",
                                    type: "select",
                                    options: [
                                        "Operativo",
                                        "Asistencial",
                                        "Profesional",
                                        "Coordinación",
                                        "Jefatura",
                                        "Dirección",
                                        "Vicerrectoría"
                                    ]
                                },
                                {
                                    id: "areaTematica",
                                    title: "Área Temática",
                                    type: "select",
                                    options: [
                                        "Deporte",
                                        "Actividad Física",
                                        "Cultura",
                                        "Salud",
                                        "Deserción"
                                    ]
                                },
                                {
                                    id: "nivelEducativo",
                                    title: "Nivel educativo",
                                    type: "select",
                                    options: [
                                        "Básica",
                                        "Media",
                                        "Técnico Profesional",
                                        "Tecnológico",
                                        "Profesional",
                                        "Especialización",
                                        "Maestría",
                                        "Doctorado"
                                    ]
                                },
                                {
                                    id: "tipoContrato",
                                    title: "Tipo de Contrato",
                                    type: "select",
                                    options: [
                                        "Contrato a Término Indefinido",
                                        "Contrato a Término Fijo",
                                        "Contrato civil por Prestación de Servicios",
                                        "Contrato Obra o Labor",
                                        "Contrato de aprendizaje"
                                    ]
                                },
                                {
                                    id: "estadoContrato",
                                    title: "Estado del contrato",
                                    type: "select",
                                    options: [
                                        "Activo",
                                        "Inactivo"
                                    ]
                                },
                                {
                                    id: "genero",
                                    title: "Género",
                                    type: "select",
                                    options: [
                                        "Femenino",
                                        "Masculino",
                                        "No Binario"
                                    ]
                                },
                                {
                                    id: "fechaNacimiento",
                                    title: "Fecha de nacimiento",
                                    type: "date",
                                    placeholder: "DD-MM-AAAA"
                                }
                            ],
                            validation: function(value) {
                                return value && value.length > 0 ? true : "Debe agregar al menos una fila de personal";
                            }
                        }
                    }
                }
            }
        },
        // Actividad Física
        actividadfisica: {
            title: "INDICADORES ACTIVIDAD FÍSICA",
            subsections: {
                instalaciones: {
                    title: "INSTALACIONES",
                    questions: {
                        tipoInstalaciones: {
                            text: "Tipo Instalciones Fisicas.",
                            type: "table",
                            columns: [
                                {
                                    id: "tipoInstalacion",
                                    title: "Tipo de Instalación",
                                    type: "select",
                                    options: [
                                        "Gimnasio",
                                        "Cancha cubierta",
                                        "Cancha múltiple descubierta",
                                        "Pista de atletismo",
                                        "Piscina",
                                        "Estadio de Futbol",
                                        "Centro para la Actividad Física y el Deporte",
                                        "Auditorios"
                                    ]
                                },
                                {
                                    id: "cantidadEspacios",
                                    title: "Cantidad de espacios",
                                    type: "number",
                                    min: 0
                                }
                            ],
                            validation: function(value) {
                                return value && value.length > 0 ? true : "Debe agregar al menos una instalación";
                            }
                        }
                    }
                }
            }
        },
        // Deportes
        deportes: {
            title: "DEPORTES",
            subsections: {
                participacion: {
                    title: "PARTICIPACIÓN Y COBERTURA",
                    questions: {
                        cantidadActividades: {
                            text: "¿Cuántas actividades y/o programas deportivos ofrece su universidad a lo largo del año?",
                            type: "number",
                            min: 0,
                            validation: function(value) {
                                return value >= 0 ? true : "Debe ingresar un número positivo";
                            }
                        },
                        asistenciaActividades: {
                            text: "¿Cuántas personas de la comunidad universitaria asistieron al menos una vez a las actividades y programas deportivos organizados por su universidad durante el año?",
                            type: "number",
                            min: 0,
                            validation: function(value) {
                                return value >= 0 ? true : "Debe ingresar un número positivo";
                            }
                        }
                    }
                }
            }
        },
        // Cultura
        cultura: {
            title: "CULTURA",
            subsections: {
                participacionCobertura: {
                    title: "PARTICIPACIÓN Y COBERTURA",
                    questions: {
                        actividadesCulturales: {
                            text: "Actividades y programas culturales organizados por su universidad durante el año y la participación de la comunidad universitaria asistieron al menos una vez",
                            type: "table",
                            columns: [
                                {
                                    id: "actividad",
                                    title: "ACTIVIDADES Y PROGRAMAS",
                                    type: "text"
                                },
                                {
                                    id: "estamento",
                                    title: "ESTAMENTO",
                                    type: "select",
                                    options: ["Estudiantes", "Profesores", "Administrativos"]
                                },
                                {
                                    id: "genero",
                                    title: "GÉNERO",
                                    type: "select",
                                    options: ["Femenino", "Masculino", "No binario"]
                                },
                                {
                                    id: "participantes",
                                    title: "N° PARTICIPANTES",
                                    type: "number",
                                    min: 0
                                }
                            ],
                            validation: function(value) {
                                return value && value.length > 0 ? true : "Debe agregar al menos una actividad cultural";
                            }
                        },
                        totalPersonas: {
                            text: "Total personas que conforman su Comunidad Universitaria",
                            type: "table",
                            columns: [
                                {
                                    id: "estamento",
                                    title: "ESTAMENTO",
                                    type: "select",
                                    options: ["Estudiantes", "Profesores", "Administrativos"]
                                },
                                {
                                    id: "genero",
                                    title: "GÉNERO",
                                    type: "select",
                                    options: ["Femenino", "Masculino", "No binario"]
                                },
                                {
                                    id: "participantes",
                                    title: "N° PARTICIPANTES",
                                    type: "number",
                                    min: 0
                                }
                            ],
                            validation: function(value) {
                                return value && value.length > 0 ? true : "Debe agregar la información de al menos un estamento";
                            }
                        }
                    }
                },
                asociacionesCulturales: {
                    title: "ASOCIACIONES CULTURALES",
                    questions: {
                        participaAsociacion: {
                            text: "¿Su universidad participa en algún Asociación Cultural?",
                            type: "select",
                            options: ["Si", "No"],
                            validation: function(value) {
                                return value ? true : "Debe seleccionar una opción";
                            }
                        },
                        cualesAsociaciones: {
                            text: "¿Cuáles son y cuántas personas de la Comunidad Universitaria participan en ellos?",
                            type: "table",
                            columns: [
                                {
                                    id: "asociacion",
                                    title: "ASOCIACIONES CULTURALES",
                                    type: "select",
                                    options: ["Ascun", "Otros"]
                                },
                                {
                                    id: "participantes",
                                    title: "N° PARTICIPANTES",
                                    type: "number",
                                    min: 0
                                },
                                {
                                    id: "estamento",
                                    title: "ESTAMENTO",
                                    type: "select",
                                    options: ["Estudiantes", "Profesores", "Administrativos"]
                                },
                                {
                                    id: "genero",
                                    title: "GÉNERO",
                                    type: "select",
                                    options: ["Femenino", "Masculino", "No binario"]
                                }
                            ],
                            dependency: {
                                question: "participaAsociacion",
                                value: "Si"
                            },
                            validation: function(value) {
                                return value && value.length > 0 ? true : "Debe agregar al menos una asociación";
                            }
                        },
                        gruposRepresentativos: {
                            text: "¿Cuántos grupos representativos de estudiantes, profesores y/o administrativos tiene su institución?",
                            type: "table",
                            columns: [
                                {
                                    id: "grupo",
                                    title: "GRUPO",
                                    type: "select",
                                    options: ["Música", "Danza", "Teatro", "Arte"]
                                },
                                {
                                    id: "miembrosGrupo",
                                    title: "MIEMBROS GRUPO",
                                    type: "select",
                                    options: ["Femenina", "Masculina", "Mixta"]
                                },
                                {
                                    id: "estamento",
                                    title: "ESTAMENTO",
                                    type: "select",
                                    options: ["Estudiantes", "Docentes", "Administrativos"]
                                }
                            ],
                            validation: function(value) {
                                return value && value.length > 0 ? true : "Debe agregar al menos un grupo representativo";
                            }
                        }
                    }
                },
                estimulosApoyos: {
                    title: "ESTÍMULOS Y APOYOS",
                    questions: {
                        estimulosGruposCulturales: {
                            text: "¿Su universidad ofrece algún tipo de estímulo académico o económico a los estudiantes que forman parte de sus grupos Culturales representativas?",
                            type: "table",
                            columns: [
                                {
                                    id: "tipoApoyo",
                                    title: "TIPO DE APOYO O ESTÍMULO",
                                    type: "select",
                                    options: ["Académico", "Económico"]
                                },
                                {
                                    id: "numeroApoyos",
                                    title: "NÚMERO DE APOYOS O ESTÍMULOS",
                                    type: "number",
                                    min: 0
                                },
                                {
                                    id: "montoEntregado",
                                    title: "MONTO O PORCENTAJE ENTREGADO",
                                    type: "text",
                                    placeholder: "% o $"
                                }
                            ],
                            validation: function(value) {
                                if (!value || value.length === 0) return "Debe agregar al menos un tipo de estímulo";
                                
                                // Validar formato de montoEntregado
                                for (let row of value) {
                                    if (!row.montoEntregado) return "Debe ingresar un monto o porcentaje";
                                    
                                    // Si comienza con %, verificar que sea máximo 2 dígitos
                                    if (row.montoEntregado.startsWith('%')) {
                                        const num = row.montoEntregado.substring(1);
                                        if (isNaN(num) || num.length > 2) {
                                            return "El porcentaje debe tener máximo 2 dígitos";
                                        }
                                    }
                                    // Si no comienza con % ni $, agregar $ si tiene más de 2 dígitos
                                    else if (!row.montoEntregado.startsWith('$')) {
                                        if (row.montoEntregado.length > 2) {
                                            row.montoEntregado = '$' + row.montoEntregado;
                                        } else {
                                            row.montoEntregado = '%' + row.montoEntregado;
                                        }
                                    }
                                }
                                return true;
                            }
                        }
                    }
                },
                otrasActividades: {
                    title: "OTRAS ACTIVIDADES DE PROMOCIÓN",
                    questions: {
                        actividadesPromocion: {
                            text: "¿Su universidad organiza otras actividades de promoción enfocadas en la cultura?",
                            type: "table",
                            columns: [
                                {
                                    id: "estrategia",
                                    title: "ESTRATEGIA",
                                    type: "select",
                                    options: [
                                        "Torneos interfacultades o intercarreras", 
                                        "Festivales", 
                                        "Encuentros Culturales teatro",
                                        "Danza",
                                        "Jornadas de Salud Integral", 
                                        "rutas Vida Saludable", 
                                        "clubes y semilleros de bienestar cine", 
                                        "fotografia", 
                                        "meditacion etc", 
                                        "Dias/semanas Tematicos", 
                                        "Dia del bienestar", 
                                        "Semana de la Salud"
                                    ]
                                },
                                {
                                    id: "cantidadActividades",
                                    title: "CANTIDAD DE ACTIVIDADES EN EL PERÍODO",
                                    type: "number",
                                    min: 0
                                },
                                {
                                    id: "promedioParticipantes",
                                    title: "NÚMERO PROMEDIO DE PARTICIPANTES EN LA ACTIVIDAD",
                                    type: "number",
                                    min: 0
                                },
                                {
                                    id: "estamento",
                                    title: "ESTAMENTO",
                                    type: "select",
                                    options: ["Estudiantes", "Docentes", "Administrativos"]
                                }
                            ],
                            validation: function(value) {
                                return value && value.length > 0 ? true : "Debe agregar al menos una actividad de promoción";
                            }
                        }
                    }
                },
                eventosAcademicos: {
                    title: "EVENTOS ACADÉMICOS",
                    questions: {
                        organizaEventos: {
                            text: "¿Su universidad organiza eventos académicos relacionados con el área de CULTURA?",
                            type: "select",
                            options: ["Si", "No"],
                            validation: function(value) {
                                return value ? true : "Debe seleccionar una opción";
                            }
                        },
                        cualesEventos: {
                            text: "¿Cuáles?",
                            type: "table",
                            dependency: {
                                question: "organizaEventos",
                                value: "Si"
                            },
                            columns: [
                                {
                                    id: "eventoAcademico",
                                    title: "EVENTOS ACADÉMICOS",
                                    type: "select",
                                    options: ["Congresos", "Talleres", "Cursos", "Foros"]
                                },
                                {
                                    id: "numeroParticipantes",
                                    title: "N° DE PARTICIPANTES",
                                    type: "number",
                                    min: 0
                                },
                                {
                                    id: "duracionPromedio",
                                    title: "DURACIÓN PROMEDIO DEL EVENTO (Días)",
                                    type: "number",
                                    min: 0
                                }
                            ],
                            validation: function(value) {
                                return value && value.length > 0 ? true : "Debe agregar al menos un evento académico";
                            }
                        }
                    }
                },
                responsabilidadSocial: {
                    title: "ACTIVIDADES DE RESPONSABILIDAD SOCIAL",
                    questions: {
                        actividadesResponsabilidad: {
                            text: "¿Su universidad lleva a cabo actividades de responsabilidad social relacionadas con el área de Cultura?",
                            type: "select",
                            options: ["Si", "No"],
                            validation: function(value) {
                                return value ? true : "Debe seleccionar una opción";
                            }
                        },
                        cualesActividades: {
                            text: "¿Cuáles?",
                            type: "table",
                            dependency: {
                                question: "actividadesResponsabilidad",
                                value: "Si"
                            },
                            columns: [
                                {
                                    id: "actividadResponsabilidad",
                                    title: "ACTIVIDADES DE RESPONSABILIDAD SOCIAL",
                                    type: "select",
                                    options: ["Talleres", "Conciertos", "Presentaciones", "Grandes Eventos"]
                                },
                                {
                                    id: "numeroParticipantes",
                                    title: "N° DE PARTICIPANTES",
                                    type: "number",
                                    min: 0
                                }
                            ],
                            validation: function(value) {
                                return value && value.length > 0 ? true : "Debe agregar al menos una actividad de responsabilidad social";
                            }
                        }
                    }
                }
            }
        },
        // Salud Mental
        saludmental: {
            title: "SALUD MENTAL",
            subsections: {
                centroAtencionPsicologica: {
                    title: "Centro de Atención Psicológica",
                    questions: {
                        servicioA: {
                            text: "Servicio a",
                            type: "table",
                            columns: [
                                {
                                    id: "identificadorPersona",
                                    title: "Identificador Persona que solicitan apoyo psicológico/psiquiátrico en BU de la IES en el período",
                                    type: "text",
                                    placeholder: "Número encriptado"
                                },
                                {
                                    id: "vinculo",
                                    title: "Vínculo (estudiante, profesor, administrativo, otro)",
                                    type: "select",
                                    options: [
                                        "Estudiante",
                                        "Profesor Planta",
                                        "Profesor Cátedra",
                                        "Administrativo"
                                    ]
                                },
                                {
                                    id: "fechaSolicitud",
                                    title: "Fecha solicitud de cita",
                                    type: "date"
                                },
                                {
                                    id: "fechaAsignacion",
                                    title: "Fecha asignación de cita",
                                    type: "date"
                                },
                                {
                                    id: "genero",
                                    title: "Género",
                                    type: "select",
                                    options: ["Femenino", "Masculino", "No Binario"]
                                },
                                {
                                    id: "fechaNacimiento",
                                    title: "Fecha de nacimiento",
                                    type: "date"
                                },
                                {
                                    id: "motivoConsulta",
                                    title: "Motivo Consulta",
                                    type: "select",
                                    options: [
                                        "Evaluación neuropsicológica", 
                                        "Evaluación de inteligencia y Habilitación",
                                        "rehabilitación neuropsicológica",
                                        "Ideación suicida",
                                        "Plan suicida",
                                        "Intento suicidio",
                                        "Suicidio"
                                    ]
                                }
                            ],
                            validation: function(value) {
                                if (!value || value.length === 0) return "Debe agregar al menos una persona atendida";
                                
                                // Validar fechas
                                for (let row of value) {
                                    if (new Date(row.fechaAsignacion) < new Date(row.fechaSolicitud)) {
                                        return "La fecha de asignación no puede ser anterior a la fecha de solicitud";
                                    }
                                    
                                    if (new Date(row.fechaNacimiento) > new Date()) {
                                        return "La fecha de nacimiento no puede ser posterior a la fecha actual";
                                    }
                                }
                                
                                return true;
                            }
                        }
                    }
                }
            }
        }
    },
    // Respuestas almacenadas
    responses: {},
    // Estado actual de la encuesta
    currentState: {
        currentSection: null,
        currentSubsection: null,
        currentQuestion: null,
        visitedQuestions: []
    }
};

// Elementos DOM
const surveyContainer = document.getElementById('survey-container');
const mainMenu = document.getElementById('main-menu');
const surveyNavigation = document.getElementById('survey-navigation');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const finishBtn = document.getElementById('finish-btn');
const saveExitBtn = document.getElementById('save-exit-btn');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

// Templates
const sectionTemplate = document.getElementById('section-template');
const subsectionTemplate = document.getElementById('subsection-template');
const questionTemplate = document.getElementById('question-template');
const tableTemplate = document.getElementById('table-template');

// Modales
const addSectionModal = document.getElementById('add-section-modal');
const addSubsectionModal = document.getElementById('add-subsection-modal');
const addQuestionModal = document.getElementById('add-question-modal');
const closeButtons = document.querySelectorAll('.close');

/**
 * Inicializa la aplicación
 */
function init() {
    // Configura los event listeners
    prevBtn.addEventListener('click', navigateToPreviousQuestion);
    nextBtn.addEventListener('click', navigateToNextQuestion);
    finishBtn.addEventListener('click', finishSurvey);
    saveExitBtn.addEventListener('click', saveAndExit);
    
    // Configuración de modales
    document.getElementById('add-section-form').addEventListener('submit', handleAddSection);
    document.getElementById('add-subsection-form').addEventListener('submit', handleAddSubsection);
    document.getElementById('add-question-form').addEventListener('submit', handleAddQuestion);
    
    document.getElementById('question-type').addEventListener('change', toggleOptionsField);
    document.getElementById('has-dependency').addEventListener('change', toggleDependencySettings);
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            addSectionModal.style.display = 'none';
            addSubsectionModal.style.display = 'none';
            addQuestionModal.style.display = 'none';
        });
    });

    // Cerrar modales al hacer clic fuera de ellos
    window.addEventListener('click', (event) => {
        if (event.target === addSectionModal) addSectionModal.style.display = 'none';
        if (event.target === addSubsectionModal) addSubsectionModal.style.display = 'none';
        if (event.target === addQuestionModal) addQuestionModal.style.display = 'none';
    });

    // Cargar datos guardados si existen
    loadSavedData();
}

/**
 * Comienza una encuesta para una sección específica
 * @param {string} sectionId - El ID de la sección a iniciar
 */
function startSurvey(sectionId) {
    // Ocultar menú principal y mostrar la encuesta
    mainMenu.classList.remove('active');
    surveyContainer.classList.add('active');
    surveyNavigation.classList.remove('hidden');
    
    const section = surveyData.sections[sectionId];
    surveyData.currentState.currentSection = sectionId;
    
    // Limpiar contenedor de encuestas
    surveyContainer.innerHTML = '';
    
    // Renderizar la sección
    renderSection(sectionId, section);
    
    // Ir a la primera pregunta
    navigateToFirstQuestion();
    
    // Actualizar la barra de progreso
    updateProgressBar();
}

/**
 * Renderiza una sección completa
 * @param {string} sectionId - ID de la sección
 * @param {object} sectionData - Datos de la sección
 */
function renderSection(sectionId, sectionData) {
    const sectionClone = document.importNode(sectionTemplate.content, true);
    const sectionElement = sectionClone.querySelector('.section');
    
    sectionElement.setAttribute('data-section-id', sectionId);
    sectionElement.querySelector('.section-title').textContent = sectionData.title;
    
    const subsectionsContainer = sectionElement.querySelector('.subsections');
    
    // Renderizar cada subsección
    for (const [subsectionId, subsectionData] of Object.entries(sectionData.subsections)) {
        const subsectionElement = renderSubsection(sectionId, subsectionId, subsectionData);
        subsectionsContainer.appendChild(subsectionElement);
    }
    
    surveyContainer.appendChild(sectionClone);
}

/**
 * Renderiza una subsección
 * @param {string} sectionId - ID de la sección padre
 * @param {string} subsectionId - ID de la subsección
 * @param {object} subsectionData - Datos de la subsección
 * @returns {Element} El elemento DOM de la subsección
 */
function renderSubsection(sectionId, subsectionId, subsectionData) {
    const subsectionClone = document.importNode(subsectionTemplate.content, true);
    const subsectionElement = subsectionClone.querySelector('.subsection');
    
    subsectionElement.setAttribute('data-subsection-id', subsectionId);
    subsectionElement.querySelector('.subsection-title').textContent = subsectionData.title;
    
    const questionsContainer = subsectionElement.querySelector('.questions');
    
    // Renderizar cada pregunta
    for (const [questionId, questionData] of Object.entries(subsectionData.questions)) {
        const questionElement = renderQuestion(sectionId, subsectionId, questionId, questionData);
        questionsContainer.appendChild(questionElement);
    }
    
    // Configurar botón para agregar pregunta
    const addQuestionBtn = subsectionElement.querySelector('.add-question-btn');
    addQuestionBtn.addEventListener('click', () => {
        showAddQuestionModal(sectionId, subsectionId);
    });
    
    return subsectionElement;
}

/**
 * Renderiza una pregunta
 * @param {string} sectionId - ID de la sección padre
 * @param {string} subsectionId - ID de la subsección padre
 * @param {string} questionId - ID de la pregunta
 * @param {object} questionData - Datos de la pregunta
 * @returns {Element} El elemento DOM de la pregunta
 */
function renderQuestion(sectionId, subsectionId, questionId, questionData) {
    const questionClone = document.importNode(questionTemplate.content, true);
    const questionContainer = questionClone.querySelector('.question-container');
    
    questionContainer.setAttribute('data-question-id', questionId);
    questionContainer.setAttribute('data-section-id', sectionId);
    questionContainer.setAttribute('data-subsection-id', subsectionId);
    
    // Añadir clase para ocultar inicialmente todas las preguntas
    questionContainer.classList.add('hidden');
    
    questionContainer.querySelector('.question-text').textContent = questionData.text;
    
    // Verificar si la pregunta tiene dependencia
    if (questionData.dependency) {
        questionContainer.setAttribute('data-depends-on', questionData.dependency.question);
        questionContainer.setAttribute('data-dependency-value', questionData.dependency.value);
    }
    
    const questionContent = questionContainer.querySelector('.question-content');
    
    // Renderizar el tipo específico de pregunta
    switch (questionData.type) {
        case 'text':
            renderTextQuestion(questionContent, questionId, questionData);
            break;
        case 'number':
            renderNumberQuestion(questionContent, questionId, questionData);
            break;
        case 'select':
            renderSelectQuestion(questionContent, questionId, questionData);
            break;
        case 'radio':
            renderRadioQuestion(questionContent, questionId, questionData);
            break;
        case 'checkbox':
            renderCheckboxQuestion(questionContent, questionId, questionData);
            break;
        case 'date':
            renderDateQuestion(questionContent, questionId, questionData);
            break;
        case 'table':
            renderTableQuestion(questionContent, questionId, questionData);
            break;
    }
    
    return questionContainer;
}

/**
 * Renderiza una pregunta de tipo texto
 */
function renderTextQuestion(container, questionId, questionData) {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = `question_${questionId}`;
    input.name = `question_${questionId}`;
    
    if (questionData.placeholder) {
        input.placeholder = questionData.placeholder;
    }
    
    // Cargar respuesta guardada si existe
    const savedValue = getSavedResponse(questionId);
    if (savedValue) {
        input.value = savedValue;
    }
    
    // Validación en tiempo real
    input.addEventListener('input', () => {
        validateQuestion(questionId, input.value);
    });
    
    container.appendChild(input);
}

/**
 * Renderiza una pregunta de tipo número
 */
function renderNumberQuestion(container, questionId, questionData) {
    const input = document.createElement('input');
    input.type = 'number';
    input.id = `question_${questionId}`;
    input.name = `question_${questionId}`;
    
    if (questionData.min !== undefined) {
        input.min = questionData.min;
    }
    
    if (questionData.max !== undefined) {
        input.max = questionData.max;
    }
    
    if (questionData.placeholder) {
        input.placeholder = questionData.placeholder;
    }
    
    // Cargar respuesta guardada si existe
    const savedValue = getSavedResponse(questionId);
    if (savedValue !== null && savedValue !== undefined) {
        input.value = savedValue;
    }
    
    // Validación en tiempo real
    input.addEventListener('input', () => {
        validateQuestion(questionId, input.value);
    });
    
    container.appendChild(input);
}

/**
 * Renderiza una pregunta de tipo select (desplegable)
 */
function renderSelectQuestion(container, questionId, questionData) {
    const select = document.createElement('select');
    select.id = `question_${questionId}`;
    select.name = `question_${questionId}`;
    
    // Opción por defecto vacía
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccione una opción';
    select.appendChild(defaultOption);
    
    // Añadir las opciones
    questionData.options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });
    
    // Cargar respuesta guardada si existe
    const savedValue = getSavedResponse(questionId);
    if (savedValue) {
        select.value = savedValue;
    }
    
    // Validación en tiempo real y activación de preguntas dependientes
    select.addEventListener('change', () => {
        validateQuestion(questionId, select.value);
        handleDependentQuestions(questionId, select.value);
    });
    
    container.appendChild(select);
}

/**
 * Renderiza una pregunta de tipo radio (opción única)
 */
function renderRadioQuestion(container, questionId, questionData) {
    const radioGroup = document.createElement('div');
    radioGroup.className = 'radio-group';
    
    questionData.options.forEach((option, index) => {
        const optionContainer = document.createElement('div');
        optionContainer.className = 'radio-option';
        
        const input = document.createElement('input');
        input.type = 'radio';
        input.id = `question_${questionId}_option_${index}`;
        input.name = `question_${questionId}`;
        input.value = option;
        
        const label = document.createElement('label');
        label.htmlFor = `question_${questionId}_option_${index}`;
        label.textContent = option;
        
        optionContainer.appendChild(input);
        optionContainer.appendChild(label);
        radioGroup.appendChild(optionContainer);
        
        // Validación en tiempo real y activación de preguntas dependientes
        input.addEventListener('change', () => {
            validateQuestion(questionId, input.value);
            handleDependentQuestions(questionId, input.value);
        });
    });
    
    // Cargar respuesta guardada si existe
    const savedValue = getSavedResponse(questionId);
    if (savedValue) {
        const radioToSelect = radioGroup.querySelector(`input[value="${savedValue}"]`);
        if (radioToSelect) {
            radioToSelect.checked = true;
        }
    }
    
    container.appendChild(radioGroup);
}

/**
 * Renderiza una pregunta de tipo checkbox (opción múltiple)
 */
function renderCheckboxQuestion(container, questionId, questionData) {
    const checkboxGroup = document.createElement('div');
    checkboxGroup.className = 'checkbox-group';
    
    questionData.options.forEach((option, index) => {
        const optionContainer = document.createElement('div');
        optionContainer.className = 'checkbox-option';
        
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = `question_${questionId}_option_${index}`;
        input.name = `question_${questionId}`;
        input.value = option;
        
        const label = document.createElement('label');
        label.htmlFor = `question_${questionId}_option_${index}`;
        label.textContent = option;
        
        optionContainer.appendChild(input);
        optionContainer.appendChild(label);
        checkboxGroup.appendChild(optionContainer);
        
        // Validación en tiempo real
        input.addEventListener('change', () => {
            const selectedOptions = Array.from(
                checkboxGroup.querySelectorAll('input:checked')
            ).map(checkbox => checkbox.value);
            
            validateQuestion(questionId, selectedOptions);
        });
    });
    
    // Cargar respuestas guardadas si existen
    const savedValues = getSavedResponse(questionId);
    if (savedValues && Array.isArray(savedValues)) {
        savedValues.forEach(value => {
            const checkboxToSelect = checkboxGroup.querySelector(`input[value="${value}"]`);
            if (checkboxToSelect) {
                checkboxToSelect.checked = true;
            }
        });
    }
    
    container.appendChild(checkboxGroup);
}

/**
 * Renderiza una pregunta de tipo fecha
 */
function renderDateQuestion(container, questionId, questionData) {
    const input = document.createElement('input');
    input.type = 'date';
    input.id = `question_${questionId}`;
    input.name = `question_${questionId}`;
    
    if (questionData.min) {
        input.min = questionData.min;
    }
    
    if (questionData.max) {
        input.max = questionData.max;
    }
    
    // Cargar respuesta guardada si existe
    const savedValue = getSavedResponse(questionId);
    if (savedValue) {
        input.value = savedValue;
    }
    
    // Validación en tiempo real
    input.addEventListener('change', () => {
        validateQuestion(questionId, input.value);
    });
    
    container.appendChild(input);
}

/**
 * Renderiza una pregunta de tipo tabla
 */
function renderTableQuestion(container, questionId, questionData) {
    const tableClone = document.importNode(tableTemplate.content, true);
    const table = tableClone.querySelector('table');
    table.id = `question_${questionId}_table`;
    
    const headerRow = table.querySelector('thead tr');
    const dataRow = table.querySelector('tbody .data-row');
    
    // Crear encabezados de la tabla
    questionData.columns.forEach((column, index) => {
        const th = document.createElement('th');
        th.textContent = column.title;
        th.setAttribute('data-column-id', column.id);
        headerRow.appendChild(th);
    });
    
    // Crear celdas de datos para la primera fila
    questionData.columns.forEach(column => {
        const td = document.createElement('td');
        const input = createInputForColumn(column);
        td.appendChild(input);
        dataRow.appendChild(td);
    });
    
    // Botón para agregar filas
    const addRowBtn = tableClone.querySelector('.add-row-btn');
    addRowBtn.addEventListener('click', () => {
        const newRow = document.createElement('tr');
        
        questionData.columns.forEach(column => {
            const td = document.createElement('td');
            const input = createInputForColumn(column);
            td.appendChild(input);
            newRow.appendChild(td);
        });
        
        table.querySelector('tbody').appendChild(newRow);
    });
    
    container.appendChild(tableClone);
    
    // Cargar respuestas guardadas
    const savedTableData = getSavedResponse(questionId);
    if (savedTableData && Array.isArray(savedTableData) && savedTableData.length > 0) {
        // Eliminar la fila vacía inicial
        table.querySelector('tbody').innerHTML = '';
        
        // Añadir las filas con datos guardados
        savedTableData.forEach(rowData => {
            const newRow = document.createElement('tr');
            
            questionData.columns.forEach(column => {
                const td = document.createElement('td');
                const input = createInputForColumn(column);
                
                // Establecer el valor guardado
                if (rowData[column.id] !== undefined) {
                    if (column.type === 'select') {
                        input.value = rowData[column.id];
                    } else if (column.type === 'checkbox') {
                        input.checked = rowData[column.id];
                    } else {
                        input.value = rowData[column.id];
                    }
                }
                
                td.appendChild(input);
                newRow.appendChild(td);
            });
            
            table.querySelector('tbody').appendChild(newRow);
        });
    }
    
    // Validación en tiempo real
    table.addEventListener('input', () => {
        validateTableQuestion(questionId, table);
    });
    
    table.addEventListener('change', () => {
        validateTableQuestion(questionId, table);
    });
}

/**
 * Crea un elemento de entrada para una columna de tabla
 */
function createInputForColumn(column) {
    let input;
    
    switch (column.type) {
        case 'text':
            input = document.createElement('input');
            input.type = 'text';
            input.setAttribute('data-column-id', column.id);
            if (column.placeholder) input.placeholder = column.placeholder;
            break;
            
        case 'number':
            input = document.createElement('input');
            input.type = 'number';
            input.setAttribute('data-column-id', column.id);
            if (column.min !== undefined) input.min = column.min;
            if (column.max !== undefined) input.max = column.max;
            if (column.placeholder) input.placeholder = column.placeholder;
            break;
            
        case 'date':
            input = document.createElement('input');
            input.type = 'date';
            input.setAttribute('data-column-id', column.id);
            if (column.min) input.min = column.min;
            if (column.max) input.max = column.max;
            break;
            
        case 'select':
            input = document.createElement('select');
            input.setAttribute('data-column-id', column.id);
            
            // Opción por defecto
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Seleccione';
            input.appendChild(defaultOption);
            
            // Opciones
            column.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                input.appendChild(optionElement);
            });
            break;
            
        case 'checkbox':
            input = document.createElement('input');
            input.type = 'checkbox';
            input.setAttribute('data-column-id', column.id);
            break;
            
        default:
            input = document.createElement('input');
            input.type = 'text';
            input.setAttribute('data-column-id', column.id);
            if (column.placeholder) input.placeholder = column.placeholder;
    }
    
    return input;
}

/**
 * Valida una pregunta de tipo tabla
 */
function validateTableQuestion(questionId, table) {
    const rows = table.querySelectorAll('tbody tr');
    const tableData = [];
    
    // Recolectar datos de todas las filas
    rows.forEach(row => {
        const rowData = {};
        
        row.querySelectorAll('[data-column-id]').forEach(input => {
            const columnId = input.getAttribute('data-column-id');
            
            if (input.type === 'checkbox') {
                rowData[columnId] = input.checked;
            } else {
                rowData[columnId] = input.value;
            }
        });
        
        tableData.push(rowData);
    });
    
    // Guardar los datos de la tabla
    saveResponse(questionId, tableData);
    
    // Encontrar la función de validación
    let validationFunction = null;
    const questionContainer = table.closest('.question-container');
    const sectionId = questionContainer.getAttribute('data-section-id');
    const subsectionId = questionContainer.getAttribute('data-subsection-id');
    
    const questionData = surveyData.sections[sectionId].subsections[subsectionId].questions[questionId];
    
    if (questionData && questionData.validation) {
        validationFunction = questionData.validation;
    }
    
    // Validar los datos si hay función de validación
    if (validationFunction) {
        const validationResult = validationFunction(tableData);
        
        const errorMessageElement = questionContainer.querySelector('.error-message');
        
        if (validationResult === true) {
            errorMessageElement.textContent = '';
            questionContainer.classList.remove('invalid');
            questionContainer.classList.add('valid');
        } else {
            errorMessageElement.textContent = validationResult;
            questionContainer.classList.remove('valid');
            questionContainer.classList.add('invalid');
        }
    }
}

/**
 * Navega a la primera pregunta de la sección actual
 */
function navigateToFirstQuestion() {
    const sectionId = surveyData.currentState.currentSection;
    const section = surveyData.sections[sectionId];
    
    // Obtener la primera subsección
    const firstSubsectionId = Object.keys(section.subsections)[0];
    surveyData.currentState.currentSubsection = firstSubsectionId;
    
    // Obtener la primera pregunta de la subsección
    const firstQuestionId = Object.keys(section.subsections[firstSubsectionId].questions)[0];
    surveyData.currentState.currentQuestion = firstQuestionId;
    
    // Añadir a preguntas visitadas
    if (!surveyData.currentState.visitedQuestions.includes(firstQuestionId)) {
        surveyData.currentState.visitedQuestions.push(firstQuestionId);
    }
    
    // Ocultar todas las preguntas y mostrar solo la actual
    const questionContainers = document.querySelectorAll('.question-container');
    questionContainers.forEach(container => {
        container.classList.add('hidden');
    });
    
    const currentQuestionContainer = document.querySelector(`.question-container[data-question-id="${firstQuestionId}"]`);
    currentQuestionContainer.classList.remove('hidden');
    
    // Actualizar barra de progreso
    updateProgressBar();
    
    // Actualizar botones de navegación
    updateNavigationButtons();
}

/**
 * Navega a la siguiente pregunta
 */
function navigateToNextQuestion() {
    const currentQuestionId = surveyData.currentState.currentQuestion;
    const currentSubsectionId = surveyData.currentState.currentSubsection;
    const currentSectionId = surveyData.currentState.currentSection;
    
    // Validar la pregunta actual antes de continuar
    if (!validateCurrentQuestion()) {
        return;
    }
    
    const subsection = surveyData.sections[currentSectionId].subsections[currentSubsectionId];
    const questionIds = Object.keys(subsection.questions);
    
    // Encontrar el índice de la pregunta actual
    const currentQuestionIndex = questionIds.indexOf(currentQuestionId);
    
    // Si hay una siguiente pregunta en la misma subsección
    if (currentQuestionIndex < questionIds.length - 1) {
        const nextQuestionId = questionIds[currentQuestionIndex + 1];
        const nextQuestion = subsection.questions[nextQuestionId];
        
        // Verificar si la siguiente pregunta tiene dependencia
        if (nextQuestion.dependency) {
            const dependencyQuestionId = nextQuestion.dependency.question;
            const dependencyValue = nextQuestion.dependency.value;
            const dependencyResponse = getSavedResponse(dependencyQuestionId);
            
            // Si la dependencia no se cumple, buscar la siguiente pregunta válida
            if (dependencyResponse !== dependencyValue) {
                // Guardar el estado actual para poder volver
                const currentQuestion = surveyData.currentState.currentQuestion;
                
                // Establecer temporalmente la siguiente pregunta
                surveyData.currentState.currentQuestion = nextQuestionId;
                
                // Intentar navegar a la siguiente pregunta después de esta
                navigateToNextQuestion();
                return;
            }
        }
        
        // Navegar a la siguiente pregunta
        showQuestion(nextQuestionId);
    }
    // Si no hay más preguntas en esta subsección, ir a la siguiente subsección
    else {
        const section = surveyData.sections[currentSectionId];
        const subsectionIds = Object.keys(section.subsections);
        const currentSubsectionIndex = subsectionIds.indexOf(currentSubsectionId);
        
        // Si hay una siguiente subsección
        if (currentSubsectionIndex < subsectionIds.length - 1) {
            const nextSubsectionId = subsectionIds[currentSubsectionIndex + 1];
            surveyData.currentState.currentSubsection = nextSubsectionId;
            
            // Ir a la primera pregunta de la siguiente subsección
            const nextSubsection = section.subsections[nextSubsectionId];
            const firstQuestionId = Object.keys(nextSubsection.questions)[0];
            showQuestion(firstQuestionId);
        }
        // Si no hay más subsecciones, hemos terminado la sección
        else {
            // Mostrar botón de finalizar en vez de siguiente
            finishBtn.classList.remove('hidden');
            nextBtn.classList.add('hidden');
        }
    }
    
    // Actualizar barra de progreso
    updateProgressBar();
    
    // Actualizar botones de navegación
    updateNavigationButtons();
}

/**
 * Navega a la pregunta anterior
 */
function navigateToPreviousQuestion() {
    const currentQuestionId = surveyData.currentState.currentQuestion;
    const currentSubsectionId = surveyData.currentState.currentSubsection;
    const currentSectionId = surveyData.currentState.currentSection;
    
    const subsection = surveyData.sections[currentSectionId].subsections[currentSubsectionId];
    const questionIds = Object.keys(subsection.questions);
    
    // Encontrar el índice de la pregunta actual
    const currentQuestionIndex = questionIds.indexOf(currentQuestionId);
    
    // Si hay una pregunta anterior en la misma subsección
    if (currentQuestionIndex > 0) {
        const prevQuestionId = questionIds[currentQuestionIndex - 1];
        showQuestion(prevQuestionId);
    }
    // Si no hay pregunta anterior en esta subsección, ir a la subsección anterior
    else {
        const section = surveyData.sections[currentSectionId];
        const subsectionIds = Object.keys(section.subsections);
        const currentSubsectionIndex = subsectionIds.indexOf(currentSubsectionId);
        
        // Si hay una subsección anterior
        if (currentSubsectionIndex > 0) {
            const prevSubsectionId = subsectionIds[currentSubsectionIndex - 1];
            surveyData.currentState.currentSubsection = prevSubsectionId;
            
            // Ir a la última pregunta de la subsección anterior
            const prevSubsection = section.subsections[prevSubsectionId];
            const prevQuestionIds = Object.keys(prevSubsection.questions);
            const lastQuestionId = prevQuestionIds[prevQuestionIds.length - 1];
            showQuestion(lastQuestionId);
        }
        // Si no hay subsección anterior, estamos en la primera pregunta de la primera subsección
        else {
            // No hacer nada, ya estamos en la primera pregunta
        }
    }
    
    // Ocultar botón de finalizar si estamos navegando hacia atrás
    finishBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
    
    // Actualizar barra de progreso
    updateProgressBar();
    
    // Actualizar botones de navegación
    updateNavigationButtons();
}

/**
 * Muestra una pregunta específica
 */
function showQuestion(questionId) {
    // Actualizar estado actual
    surveyData.currentState.currentQuestion = questionId;
    
    // Añadir a preguntas visitadas si no está ya
    if (!surveyData.currentState.visitedQuestions.includes(questionId)) {
        surveyData.currentState.visitedQuestions.push(questionId);
    }
    
    // Ocultar todas las preguntas
    const questionContainers = document.querySelectorAll('.question-container');
    questionContainers.forEach(container => {
        container.classList.add('hidden');
    });
    
    // Mostrar la pregunta específica
    const questionContainer = document.querySelector(`.question-container[data-question-id="${questionId}"]`);
    questionContainer.classList.remove('hidden');
}

/**
 * Actualiza los botones de navegación según la posición actual
 */
function updateNavigationButtons() {
    const currentQuestionId = surveyData.currentState.currentQuestion;
    const currentSubsectionId = surveyData.currentState.currentSubsection;
    const currentSectionId = surveyData.currentState.currentSection;
    
    const subsection = surveyData.sections[currentSectionId].subsections[currentSubsectionId];
    const questionIds = Object.keys(subsection.questions);
    
    const currentQuestionIndex = questionIds.indexOf(currentQuestionId);
    
    // Desactivar botón anterior si estamos en la primera pregunta de la primera subsección
    if (currentQuestionIndex === 0) {
        const section = surveyData.sections[currentSectionId];
        const subsectionIds = Object.keys(section.subsections);
        const currentSubsectionIndex = subsectionIds.indexOf(currentSubsectionId);
        
        if (currentSubsectionIndex === 0) {
            prevBtn.disabled = true;
        } else {
            prevBtn.disabled = false;
        }
    } else {
        prevBtn.disabled = false;
    }
    
    // Verificar si es la última pregunta de la última subsección
    if (currentQuestionIndex === questionIds.length - 1) {
        const section = surveyData.sections[currentSectionId];
        const subsectionIds = Object.keys(section.subsections);
        const currentSubsectionIndex = subsectionIds.indexOf(currentSubsectionId);
        
        if (currentSubsectionIndex === subsectionIds.length - 1) {
            nextBtn.classList.add('hidden');
            finishBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            finishBtn.classList.add('hidden');
        }
    } else {
        nextBtn.classList.remove('hidden');
        finishBtn.classList.add('hidden');
    }
}

/**
 * Actualiza la barra de progreso
 */
function updateProgressBar() {
    const currentSectionId = surveyData.currentState.currentSection;
    const section = surveyData.sections[currentSectionId];
    
    // Contar el número total de preguntas
    let totalQuestions = 0;
    for (const subsectionId in section.subsections) {
        totalQuestions += Object.keys(section.subsections[subsectionId].questions).length;
    }
    
    // Calcular el progreso
    const progress = (surveyData.currentState.visitedQuestions.length / totalQuestions) * 100;
    const roundedProgress = Math.round(progress);
    
    // Actualizar la barra de progreso
    progressFill.style.width = `${roundedProgress}%`;
    progressText.textContent = `${roundedProgress}%`;
}

/**
 * Valida la pregunta actual
 * @returns {boolean} True si la validación es exitosa, false en caso contrario
 */
function validateCurrentQuestion() {
    const currentQuestionId = surveyData.currentState.currentQuestion;
    const currentSubsectionId = surveyData.currentState.currentSubsection;
    const currentSectionId = surveyData.currentState.currentSection;
    
    const questionData = surveyData.sections[currentSectionId].subsections[currentSubsectionId].questions[currentQuestionId];
    
    if (!questionData.validation) {
        return true;
    }
    
    const questionValue = getSavedResponse(currentQuestionId);
    
    const validationResult = questionData.validation(questionValue);
    
    const questionContainer = document.querySelector(`.question-container[data-question-id="${currentQuestionId}"]`);
    const errorMessageElement = questionContainer.querySelector('.error-message');
    
    if (validationResult === true) {
        errorMessageElement.textContent = '';
        questionContainer.classList.remove('invalid');
        questionContainer.classList.add('valid');
        return true;
    } else {
        errorMessageElement.textContent = validationResult;
        questionContainer.classList.remove('valid');
        questionContainer.classList.add('invalid');
        return false;
    }
}

/**
 * Guarda una respuesta en el modelo de datos
 */
function saveResponse(questionId, value) {
    surveyData.responses[questionId] = value;
    
    // Guardar en localStorage
    localStorage.setItem('surveyResponses', JSON.stringify(surveyData.responses));
}

/**
 * Obtiene una respuesta guardada
 */
function getSavedResponse(questionId) {
    return surveyData.responses[questionId];
}

/**
 * Maneja las preguntas dependientes
 */
function handleDependentQuestions(questionId, value) {
    // Buscar preguntas que dependen de esta
    const dependentQuestions = document.querySelectorAll(`.question-container[data-depends-on="${questionId}"]`);
    
    dependentQuestions.forEach(questionContainer => {
        const dependencyValue = questionContainer.getAttribute('data-dependency-value');
        
        // Si el valor coincide con la dependencia, habilitar la pregunta
        if (value === dependencyValue) {
            questionContainer.classList.remove('disabled');
        } else {
            questionContainer.classList.add('disabled');
            
            // Limpiar la respuesta si la dependencia no se cumple
            const dependentQuestionId = questionContainer.getAttribute('data-question-id');
            delete surveyData.responses[dependentQuestionId];
            
            // Actualizar visualización
            const inputElements = questionContainer.querySelectorAll('input, select, textarea');
            inputElements.forEach(input => {
                if (input.type === 'checkbox' || input.type === 'radio') {
                    input.checked = false;
                } else {
                    input.value = '';
                }
            });
        }
    });
}

/**
 * Carga los datos guardados del localStorage
 */
function loadSavedData() {
    const savedResponses = localStorage.getItem('surveyResponses');
    if (savedResponses) {
        surveyData.responses = JSON.parse(savedResponses);
    }
}

/**
 * Finaliza la encuesta y muestra resultados
 */
function finishSurvey() {
    // Validar última pregunta antes de finalizar
    if (!validateCurrentQuestion()) {
        return;
    }
    
    // Exportar a Google Sheets automáticamente
    exportToGoogleSheets();
    
    // Volver al menú principal
    surveyContainer.classList.remove('active');
    mainMenu.classList.add('active');
    surveyNavigation.classList.add('hidden');
    
    // Mostrar mensaje de éxito
    alert('¡Encuesta completada con éxito! Los datos han sido guardados.');
}

/**
 * Guarda el progreso actual y vuelve al menú principal
 */
function saveAndExit() {
    // Guardar el estado actual
    localStorage.setItem('surveyState', JSON.stringify(surveyData.currentState));
    
    // Volver al menú principal
    surveyContainer.classList.remove('active');
    mainMenu.classList.add('active');
    surveyNavigation.classList.add('hidden');
    
    // Mostrar mensaje
    alert('Progreso guardado correctamente.');
}

/**
 * Exporta los datos a Google Sheets (simulado)
 */
function exportToGoogleSheets() {
    console.log('Exportando datos a Google Sheets...');
    console.log(surveyData.responses);
    
    // Aquí se implementaría la integración real con Google Sheets
    // utilizando la API de Google Sheets y Google Apps Script
    
    alert('Los datos han sido exportados a Google Sheets (simulación).');
}

/**
 * Prepara los datos para Power BI (simulado)
 */
function prepareForPowerBI() {
    console.log('Preparando datos para Power BI...');
    console.log(surveyData.responses);
    
    // Aquí se implementaría la integración real con Power BI
    // normalmente exportando a un formato compatible como CSV o JSON
    
    // Generar y descargar CSV (simulación)
    const exportData = [];
    
    // Encabezados
    const headers = ['questionId', 'question', 'response'];
    exportData.push(headers);
    
    // Datos
    for (const [questionId, response] of Object.entries(surveyData.responses)) {
        // Encontrar el texto de la pregunta
        let questionText = 'Pregunta sin identificar';
        
        // Buscar la pregunta en todas las secciones y subsecciones
        for (const sectionId in surveyData.sections) {
            const section = surveyData.sections[sectionId];
            for (const subsectionId in section.subsections) {
                const subsection = section.subsections[subsectionId];
                if (subsection.questions[questionId]) {
                    questionText = subsection.questions[questionId].text;
                    break;
                }
            }
        }
        
        // Convertir la respuesta a texto
        let responseText;
        if (Array.isArray(response)) {
            responseText = JSON.stringify(response);
        } else {
            responseText = String(response);
        }
        
        exportData.push([questionId, questionText, responseText]);
    }
    
    // Convertir a CSV
    const csvContent = exportData.map(row => row.join(',')).join('\n');
    
    // Descargar CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'encuesta_bienestar_powerbi.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Datos preparados para Power BI. Se ha descargado un archivo CSV para importar.');
}

/**
 * Muestra el modal para añadir una sección
 */
function showAddSectionModal() {
    addSectionModal.style.display = 'block';
}

/**
 * Muestra el modal para añadir una subsección
 */
function showAddSubsectionModal(sectionId) {
    addSubsectionModal.style.display = 'block';
    addSubsectionModal.setAttribute('data-section-id', sectionId);
}

/**
 * Muestra el modal para añadir una pregunta
 */
function showAddQuestionModal(sectionId, subsectionId) {
    addQuestionModal.style.display = 'block';
    addQuestionModal.setAttribute('data-section-id', sectionId);
    addQuestionModal.setAttribute('data-subsection-id', subsectionId);
    
    // Cargar las preguntas existentes para dependencias
    const dependencyQuestionSelect = document.getElementById('dependency-question');
    dependencyQuestionSelect.innerHTML = '';
    
    const section = surveyData.sections[sectionId];
    for (const subsecId in section.subsections) {
        const subsection = section.subsections[subsecId];
        
        for (const questionId in subsection.questions) {
            const option = document.createElement('option');
            option.value = questionId;
            option.textContent = subsection.questions[questionId].text;
            dependencyQuestionSelect.appendChild(option);
        }
    }
}

/**
 * Cambia la visualización del campo de opciones según el tipo de pregunta
 */
function toggleOptionsField() {
    const questionType = document.getElementById('question-type').value;
    const optionsContainer = document.getElementById('options-container');
    
    if (questionType === 'select' || questionType === 'radio' || questionType === 'checkbox') {
        optionsContainer.classList.remove('hidden');
    } else {
        optionsContainer.classList.add('hidden');
    }
}

/**
 * Cambia la visualización de la configuración de dependencias
 */
function toggleDependencySettings() {
    const hasDependency = document.getElementById('has-dependency').checked;
    const dependencySettings = document.getElementById('dependency-settings');
    
    if (hasDependency) {
        dependencySettings.classList.remove('hidden');
    } else {
        dependencySettings.classList.add('hidden');
    }
}

/**
 * Maneja el envío del formulario para añadir una sección
 */
function handleAddSection(event) {
    event.preventDefault();
    
    const sectionName = document.getElementById('section-name').value;
    const sectionDescription = document.getElementById('section-description').value;
    
    // Generar ID único para la sección
    const sectionId = sectionName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    // Verificar que no exista ya
    if (surveyData.sections[sectionId]) {
        alert('Ya existe una sección con un nombre similar.');
        return;
    }
    
    // Agregar la nueva sección
    surveyData.sections[sectionId] = {
        title: sectionName,
        description: sectionDescription,
        subsections: {}
    };
    
    // Actualizar la interfaz
    const sectionsGrid = document.querySelector('.sections-grid');
    const addSectionCard = document.querySelector('.add-section');
    
    const newSectionCard = document.createElement('div');
    newSectionCard.className = 'section-card';
    newSectionCard.setAttribute('data-section', sectionId);
    
    newSectionCard.innerHTML = `
        <h3>${sectionName}</h3>
        <p>${sectionDescription}</p>
        <button class="complete-btn" onclick="startSurvey('${sectionId}')">Completar</button>
        <button class="manage-btn" onclick="manageSection('${sectionId}')">Administrar</button>
    `;
    
    sectionsGrid.insertBefore(newSectionCard, addSectionCard);
    
    // Cerrar modal
    addSectionModal.style.display = 'none';
    document.getElementById('add-section-form').reset();
    
    alert('Sección añadida correctamente.');
}

/**
 * Maneja el envío del formulario para añadir una subsección
 */
function handleAddSubsection(event) {
    event.preventDefault();
    
    const sectionId = addSubsectionModal.getAttribute('data-section-id');
    const subsectionName = document.getElementById('subsection-name').value;
    
    // Generar ID único para la subsección
    const subsectionId = subsectionName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    // Verificar que no exista ya
    if (surveyData.sections[sectionId].subsections[subsectionId]) {
        alert('Ya existe una subsección con un nombre similar.');
        return;
    }
    
    // Agregar la nueva subsección
    surveyData.sections[sectionId].subsections[subsectionId] = {
        title: subsectionName,
        questions: {}
    };
    
    // Actualizar la interfaz si estamos en la sección de encuesta
    if (surveyContainer.classList.contains('active')) {
        const sectionElement = document.querySelector(`.section[data-section-id="${sectionId}"]`);
        if (sectionElement) {
            const subsectionsContainer = sectionElement.querySelector('.subsections');
            
            const subsectionElement = renderSubsection(sectionId, subsectionId, { title: subsectionName, questions: {} });
            subsectionsContainer.appendChild(subsectionElement);
        }
    }
    
    // Cerrar modal
    addSubsectionModal.style.display = 'none';
    document.getElementById('add-subsection-form').reset();
    
    alert('Subsección añadida correctamente.');
}

/**
 * Maneja el envío del formulario para añadir una pregunta
 */
function handleAddQuestion(event) {
    event.preventDefault();
    
    const sectionId = addQuestionModal.getAttribute('data-section-id');
    const subsectionId = addQuestionModal.getAttribute('data-subsection-id');
    const questionText = document.getElementById('question-text').value;
    const questionType = document.getElementById('question-type').value;
    
    // Generar ID único para la pregunta
    const questionId = `question_${sectionId}_${subsectionId}_${Date.now()}`;
    
    // Crear objeto de pregunta
    const questionData = {
        text: questionText,
        type: questionType
    };
    
    // Añadir opciones si es necesario
    if (questionType === 'select' || questionType === 'radio' || questionType === 'checkbox') {
        const optionsText = document.getElementById('question-options').value;
        questionData.options = optionsText.split('\n').filter(option => option.trim() !== '');
    }
    
    // Añadir dependencia si existe
    if (document.getElementById('has-dependency').checked) {
        questionData.dependency = {
            question: document.getElementById('dependency-question').value,
            value: document.getElementById('dependency-value').value
        };
    }
    
    // Agregar la nueva pregunta
    surveyData.sections[sectionId].subsections[subsectionId].questions[questionId] = questionData;
    
    // Actualizar la interfaz si estamos en la sección de encuesta
    if (surveyContainer.classList.contains('active')) {
        const subsectionElement = document.querySelector(`.subsection[data-subsection-id="${subsectionId}"]`);
        if (subsectionElement) {
            const questionsContainer = subsectionElement.querySelector('.questions');
            
            const questionElement = renderQuestion(sectionId, subsectionId, questionId, questionData);
            questionsContainer.appendChild(questionElement);
        }
    }
    
    // Cerrar modal
    addQuestionModal.style.display = 'none';
    document.getElementById('add-question-form').reset();
    document.getElementById('options-container').classList.add('hidden');
    document.getElementById('dependency-settings').classList.add('hidden');
    
    alert('Pregunta añadida correctamente.');
}

/**
 * Maneja la administración de una sección
 */
function manageSection(sectionId) {
    // Iniciar la sección en modo administrador
    startSurvey(sectionId);
    
    // Aquí se podrían añadir controles adicionales para administrar la sección
    // Por ejemplo, botones para añadir subsecciones, eliminar, etc.
    
    // Para simplificar, mostramos todas las preguntas a la vez
    const questionContainers = document.querySelectorAll('.question-container');
    questionContainers.forEach(container => {
        container.classList.remove('hidden');
    });
    
    // Ocultar navegación estándar
    surveyNavigation.classList.add('hidden');
}

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', init);
