function saveToLocalStorage(data) {
    localStorage.setItem('studentData', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('studentData')) || [];
    return data;
}

// Display Data
function displayData(data) {
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
                <i data-index="${index}" class="fa-solid fa-pen-to-square update-icon"></i>
            </td>
        `;
        output.appendChild(row);
    });

    // Add event listeners to the icons
    document.querySelectorAll('.delete-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteTask(index);
        });
    });

    document.querySelectorAll('.update-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            updateTask(index);
        });
    });
}

// Delete Task
function deleteTask(index) {
    const data = loadFromLocalStorage();
    data.splice(index, 1);
    saveToLocalStorage(data);
    displayData(data);
}

// Update Task
function updateTask(index) {
    const data = loadFromLocalStorage();
    const student = data[index];
    document.getElementById('studentid').value = student.studentId;
    document.getElementById('descriptionInput').value = student.fullName;
    document.getElementById('yearOfStudyInput').value = student.yearOfStudy;
    document.getElementById('marksInput').value = student.marks;
    document.getElementById('averageInput').value = student.average;

    // Remove the old entry
    deleteTask(index);
}

// Initial Data Load
document.addEventListener('DOMContentLoaded', function() {
    const data = loadFromLocalStorage();
    displayData(data);
});

// Add New Task
document.querySelector('.todo-container').addEventListener('submit', function(e) {
    e.preventDefault();
    const studentId = document.getElementById('studentid').value;
    const fullName = document.getElementById('descriptionInput').value;
    const yearOfStudy = document.getElementById('yearOfStudyInput').value;
    const marks = document.getElementById('marksInput').value;
    const average = document.getElementById('averageInput').value;
    
    const data = loadFromLocalStorage();
    data.push({
        studentId,
        fullName,
        yearOfStudy,
        marks,
        average
    });
    saveToLocalStorage(data);
    displayData(data);
    document.querySelector('.todo-container').reset();
});

// Clear All Data
// document.getElementById('button2').addEventListener('click', function() {
//     localStorage.removeItem('studentData'); 
//     document.getElementById('output').innerHTML = ''; 
// });

const myChart = new Chart("myChart", {
    type: "bar",
    data: {},
    options: {}
  });