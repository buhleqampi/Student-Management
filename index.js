

// Toggle form visibility
document.querySelector('.toggle-form-btn').addEventListener('click', () => {
    const form = document.querySelector('.todo-container');
    form.classList.toggle('hidden');
});

// Add or Update Student
document.querySelector('.todo-container').addEventListener('submit', function(e) {
    e.preventDefault();
    const studentId = document.getElementById('studentid').value;
    const fullName = document.getElementById('descriptionInput').value;
    const yearOfStudy = document.getElementById('yearOfStudyInput').value;
    const marks = document.getElementById('marksInput').value;
    const average = document.getElementById('averageInput').value;
    const updateIndex = document.getElementById('studentid').getAttribute('data-update-index');
    
    const data = loadFromLocalStorage();

    const newStudent = {
        studentId,
        fullName,
        yearOfStudy,
        marks,
        average
    };

    if (updateIndex === null) {
        data.push(newStudent);
    } else {
        data[updateIndex] = newStudent;
        document.getElementById('studentid').removeAttribute('data-update-index');
    }

    saveToLocalStorage(data);
    displayData();
    document.querySelector('.todo-container').reset();
});

// Clear all data
document.getElementById('button2').addEventListener('click', function() {
    localStorage.removeItem('studentData'); 
    document.getElementById('output').innerHTML = ''; 
});

// Search Function
document.querySelector('.search').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const data = loadFromLocalStorage();
    const output = document.getElementById('output');
    output.innerHTML = '';

    const filteredData = data.filter(student => 
        student.fullName.toLowerCase().includes(searchValue)
    );

    filteredData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.studentId}</td>
            <td>${item.fullName}</td>
            <td>${item.yearOfStudy}</td>
            <td>${item.marks}</td>
            <td>${item.average}</td>
            <td>
                <i data-index="${index}" class="fa-solid fa-trash delete-icon"></i>
            </td>
            <td>
                <i data-index="${index}" class="fa-solid fa-pen-to-square update-icon"></i>
            </td>
        `;
        output.appendChild(row);
    });

    // Reattach delete and update event listeners
    document.querySelectorAll('.delete-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteTask(index);
        });
    });

    document.querySelectorAll('.update-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            populateFormForUpdate(index);
        });
    });
});

// Sort Data
function sortData(criteria) {
    let data = loadFromLocalStorage();

    for (let i = 0; i < data.length - 1; i++) {
        for (let j = 0; j < data.length - i - 1; j++) {
            if (data[j][criteria] > data[j + 1][criteria]) {
                let temp = data[j];
                data[j] = data[j + 1];
                data[j + 1] = temp;
            }
        }
    }

    saveToLocalStorage(data);
    displayData();
}

// Event listener for sorting
document.getElementById('sortButton').addEventListener('click', function() {
    const criteria = document.getElementById('sortCriteria').value;
    sortData(criteria);
});

// Delete Task
function deleteTask(index) {
    const data = loadFromLocalStorage();
    data.splice(index, 1);
    saveToLocalStorage(data);
    displayData();
}

// Populate Form for Update
function populateFormForUpdate(index) {
    const data = loadFromLocalStorage();
    const student = data[index];

    document.getElementById('studentid').value = student.studentId;
    document.getElementById('descriptionInput').value = student.fullName;
    document.getElementById('yearOfStudyInput').value = student.yearOfStudy;
    document.getElementById('marksInput').value = student.marks;
    document.getElementById('averageInput').value = student.average;

    document.getElementById('studentid').setAttribute('data-update-index', index);
}

// Save to Local Storage
function saveToLocalStorage(data) {
    localStorage.setItem('studentData', JSON.stringify(data));
}

// Load from Local Storage
function loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem('studentData')) || [];
}

// Initial Data Load
document.addEventListener('DOMContentLoaded', displayData);

function displayData() {
    const data = loadFromLocalStorage();
    const output = document.getElementById('output');
    output.innerHTML = '';

    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.studentId}</td>
            <td>${item.fullName}</td>
            <td>${item.yearOfStudy}</td>
            <td>${item.marks}</td>
            <td>${item.average}</td>
            <td>
                <i data-index="${index}" class="fa-solid fa-trash delete-icon"></i>
            </td>
            <td>
                <i data-index="${index}" class="fa-solid fa-pen-to-square update-icon"></i>
            </td>
        `;
        output.appendChild(row);
    });

    // Reattach delete and update event listeners
    document.querySelectorAll('.delete-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteTask(index);
        });
    });

    document.querySelectorAll('.update-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            populateFormForUpdate(index);
        });
    });
}
