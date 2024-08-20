// const myRequest = await Request ("https://script.google.com/macros/s/AKfycbxp0eaxZhX9L2ygoj7gV9UAm_5mzKjaQr8sPmWjJMm0LF3nFM6A4q8eGIkwTDAFwVbv/exect", {
//     method: "POST",
//     body: JSON.stringify({ name: "Buhle" }),
//     headers: {
//         "Content-Type": "application/json",},
//   });

//   const response = await fetch(myRequest);

// Save to Local Storage
function saveToLocalStorage(data) {
    localStorage.setItem('studentData', JSON.stringify(data));
}

// Load from Local Storage
function loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem('studentData')) || [];
}

// Toggle Form Visibility
document.querySelector('.toggle-form-btn').addEventListener('click', () => {
    const form = document.querySelector('.todo-container');
    form.classList.toggle('hidden');
});

// Display Data
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
            populateFormForUpdate(index);
        });
    });
}

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

    // Populate form with current data
    document.getElementById('studentid').value = student.studentId;
    document.getElementById('descriptionInput').value = student.fullName;
    document.getElementById('yearOfStudyInput').value = student.yearOfStudy;
    document.getElementById('marksInput').value = student.marks;
    document.getElementById('averageInput').value = student.average;

    // Save index of the item being updated
    document.getElementById('studentid').setAttribute('data-update-index', index);
}

// Add or Update Task
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
        // Add new student
        data.push(newStudent);
    } else {
        // Update existing student
        data[updateIndex] = newStudent;
        document.getElementById('studentid').removeAttribute('data-update-index');
    }

    saveToLocalStorage(data);
    displayData();
    document.querySelector('.todo-container').reset();
});

// Clear All Data
document.getElementById('button2').addEventListener('click', function() {
    localStorage.removeItem('studentData'); 
    document.getElementById('output').innerHTML = ''; 
});

// Initial Data Load
document.addEventListener('DOMContentLoaded', displayData);


// const myChart = new Chart("myChart", {
//     type: "bar",
//     data: {},
//     options: {}
//   });

  

// function bubbleSort(arr, n)
// {
//     var i, j, temp;
//     var swapped;
//     for (i = 0; i < n - 1; i++) 
//     {
//         swapped = false;
//         for (j = 0; j < n - i - 1; j++) 
//         {
//             if (arr[j] > arr[j + 1]) 
//             {
//                 temp = arr[j];
//                 arr[j] = arr[j + 1];
//                 arr[j + 1] = temp;
//                 swapped = true;
//             }
//         }

//         if (swapped == false)
//         break;
//     }
// }

// function printArray(arr, size)
// {
//   var i;
//   for (i = 0; i < size; i++)
//       console.log(arr[i] + " ");
// }

// // Driver program
// var arr = [ 64, 34, 25, 12, 22, 11, 90 ];
// var n = arr.length;
// bubbleSort(arr, n);
// console.log("Sorted array: ");
// printArray(arr, n);