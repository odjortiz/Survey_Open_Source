let currentSection = 0;
const sections = document.querySelectorAll('.survey-section');
const totalSections = sections.length;

function updateProgress() {
    const progress = (currentSection + 1) / totalSections * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

function validateSection() {
    const current = sections[currentSection];
    const required = current.querySelectorAll('[required]');
    return Array.from(required).every(input => input.reportValidity());
}

function navigate(direction) {
    if (direction === 1 && !validateSection()) return;
    
    sections[currentSection].classList.remove('active');
    currentSection = Math.max(0, Math.min(currentSection + direction, totalSections - 1));
    sections[currentSection].classList.add('active');
    
    document.getElementById('prevBtn').disabled = currentSection === 0;
    document.getElementById('nextBtn').disabled = currentSection === totalSections - 1;
    updateProgress();
}

function addBudgetRow() {
    const table = document.getElementById('budget-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    newRow.innerHTML = `
        <td><input type="date" required pattern="\\d{4}"></td>
        <td>
            <select required>
                <option value="">Seleccione...</option>
                <option>Menor a 499</option>
                <option>Entre 500 y 699</option>
                <option>Entre 700 y 899</option>
                <option>Entre 900 y 1100</option>
                <option>Mayor a 1101</option>
            </select>
        </td>
        <td><button class="delete-btn" onclick="deleteRow(this)">🗑️</button></td>
    `;
}

function deleteRow(btn) {
    const row = btn.closest('tr');
    row.parentNode.removeChild(row);
}

// Event delegation para botones de eliminar
document.addEventListener('click', function(e) {
    if(e.target.classList.contains('delete-btn')) {
        deleteRow(e.target);
    }
});
