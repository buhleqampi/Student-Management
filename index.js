function saveToLocalStorage(data) {
    localStorage.setItem('studentData', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('studentData')) || [];
    return data;
}

function displayData(data) {
    const output = document.getElementById('output');
    output.innerHTML = ''; 
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.studentId}</td>
            <td>${item.fullName}</td>
            <td>${item.yearOfStudy}</td>
            <td>${item.marks}</td>
            <td>${item.average}</td>
            <td>${item.actions}</td>
        `;
        output.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const data = loadFromLocalStorage();
    displayData(data);
});

document.querySelector('.todo-container').addEventListener('submit', function(e) {
    e.preventDefault();
    const studentId = document.getElementById('studentid').value;
    const fullName = document.getElementById('descriptionInput').value;
    const yearOfStudy = document.getElementById('yearOfStudyInput').value;
    const marks = document.getElementById('marksInput').value;
    const average = document.getElementById('averageInput').value;
    const updateButton = document.getElementById('').value;
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

document.getElementById('button2').addEventListener('click', function() {
    localStorage.removeItem('studentData'); 
    document.getElementById('output').innerHTML = ''; 
});







