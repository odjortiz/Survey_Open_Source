class SurveyManager {
  constructor() {
      this.config = {
          sections: [
              {
                  id: 'recursos-humanos',
                  title: 'Recursos Humanos',
                  subsections: [
                      {
                          title: 'Personal por Área',
                          questions: [
                              {
                                  type: 'table',
                                  columns: ['ID Encriptado', 'Nivel Jerárquico', 'Área Temática', 'Nivel Educativo'],
                                  validations: {
                                      required: true
                                  }
                              }
                          ]
                      }
                  ]
              },
              {
                  id: 'salud-mental',
                  title: 'Salud Mental',
                  subsections: [
                      {
                          title: 'Atención Psicológica',
                          questions: [
                              {
                                  type: 'input',
                                  label: 'Número de sesiones promedio',
                                  inputType: 'number',
                                  validations: {
                                      required: true,
                                      min: 1
                                  }
                              }
                          ]
                      }
                  ]
              }
          ]
      };

      this.state = {
          currentSection: 0,
          currentSubsection: 0,
          currentQuestion: 0,
          responses: {},
          totalSections: this.config.sections.reduce((acc, section) => acc + section.subsections.length, 0)
      };

      this.init();
  }

  init() {
      this.renderSurveyStructure();
      this.setupEventListeners();
      this.updateProgress();
      this.showCurrentQuestion();
  }

  renderSurveyStructure() {
      const form = document.getElementById('surveyForm');
      
      this.config.sections.forEach((section, sectionIndex) => {
          const sectionElement = document.createElement('section');
          sectionElement.className = 'section';
          sectionElement.id = section.id;
          sectionElement.innerHTML = `
              <h2>${section.title}</h2>
              ${section.subsections.map(subsection => `
                  <div class="subsection">
                      <h3>${subsection.title}</h3>
                      ${subsection.questions.map((question, questionIndex) => `
                          <div class="question" data-section="${sectionIndex}" data-subsection="${subsection.id}" data-question="${questionIndex}">
                              ${this.renderQuestion(question)}
                          </div>
                      `).join('')}
                  </div>
              `).join('')}
          `;
          form.appendChild(sectionElement);
      });

      document.getElementById('totalSections').textContent = this.state.totalSections;
      document.querySelectorAll('.section')[0].classList.add('active');
  }

  renderQuestion(question) {
      switch(question.type) {
          case 'table':
              return this.renderTableQuestion(question);
          case 'input':
              return this.renderInputQuestion(question);
          // Agregar más tipos de preguntas aquí
          default:
              return '<div>Formato de pregunta no soportado</div>';
      }
  }

  renderTableQuestion(question) {
      return `
          <table class="question-table">
              <thead>
                  <tr>
                      ${question.columns.map(col => `<th>${col}</th>`).join('')}
                      <th>Acciones</th>
                  </tr>
              </thead>
              <tbody></tbody>
              <tfoot>
                  <tr>
                      <td colspan="${question.columns.length + 1}">
                          <button type="button" class="btn-primary" onclick="surveyManager.addTableRow(this)">
                              ➕ Agregar Fila
                          </button>
                      </td>
                  </tr>
              </tfoot>
          </table>
      `;
  }

  renderInputQuestion(question) {
      return `
          <div class="input-group">
              <label>${question.label}</label>
              <input type="${question.inputType}" 
                     ${question.validations.required ? 'required' : ''}
                     ${question.validations.min ? `min="${question.validations.min}"` : ''}>
              <div class="error-message"></div>
          </div>
      `;
  }

  setupEventListeners() {
      document.addEventListener('click', (e) => {
          if(e.target.matches('[data-navigation]')) {
              this.handleNavigation(e.target.dataset.navigation);
          }
      });

      document.getElementById('surveyForm').addEventListener('submit', (e) => {
          e.preventDefault();
          this.submitFullSurvey();
      });
  }

  handleNavigation(direction) {
      if(direction === 'next') {
          if(this.validateCurrentQuestion()) {
              this.moveToNextQuestion();
          }
      } else {
          this.moveToPreviousQuestion();
      }
  }

  validateCurrentQuestion() {
      const currentQuestion = document.querySelector('.question.active');
      const inputs = currentQuestion.querySelectorAll('input, select, textarea');
      
      let isValid = true;
      inputs.forEach(input => {
          if(!input.checkValidity()) {
              input.reportValidity();
              isValid = false;
          }
      });
      
      return isValid;
  }

  moveToNextQuestion() {
      // Lógica para avanzar preguntas y secciones
  }

  submitSection() {
      // Lógica para enviar sección individual
  }

  submitFullSurvey() {
      // Lógica para enviar encuesta completa
  }

  updateProgress() {
      const totalQuestions = document.querySelectorAll('.question').length;
      const progress = (this.state.currentQuestion + 1) / totalQuestions * 100;
      document.getElementById('globalProgress').style.width = `${progress}%`;
      document.getElementById('currentQuestion').textContent = this.state.currentQuestion + 1;
      document.getElementById('currentSection').textContent = this.state.currentSection + 1;
  }

  showSystemMessage(message, type = 'info') {
      const messageEl = document.getElementById('systemMessage');
      messageEl.textContent = message;
      messageEl.className = `system-message ${type}`;
      messageEl.style.display = 'block';
      
      setTimeout(() => {
          messageEl.style.display = 'none';
      }, 3000);
  }

  addTableRow(button) {
      const table = button.closest('table');
      const tbody = table.querySelector('tbody');
      const newRow = document.createElement('tr');
      
      newRow.innerHTML = `
          ${table.querySelectorAll('th').length - 1}.map(() => `
              <td><input type="text" required></td>
          `).join('')}
          <td><button type="button" class="btn-secondary" onclick="this.closest('tr').remove()">🗑️</button></td>
      `;
      
      tbody.appendChild(newRow);
  }
}

// Inicializar encuesta
const surveyManager = new SurveyManager();