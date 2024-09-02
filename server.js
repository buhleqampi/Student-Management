const url = "http://localhost:5000/students"; 

async function getStudents() {
  try {
    const response = await fetch(`${url}/get-all`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    });

    if (!response.ok) {
      throw new Error(`GET request failed with status: ${response.status}`);
    }

    console.log(response);

    const data = await response.json();
    displayData(data); 
    console.log(displayData);
  } catch (error) {
    console.error("Error during GET request:", error.message);
  }
}


async function addStudent(newStudent) {
  try {
    const response = await fetch(`${url}/add`, {
      method: "POST",
      body: JSON.stringify(newStudent),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    });

    if (!response.ok) {
      throw new Error(`POST request failed with status: ${response.status}`);
    }

    getStudents(); 
  } catch (error) {
    console.error("Error during POST request:", error.message);
  }
}


async function updateStudent(studentId, updatedStudent) {
  try {
    const response = await fetch(`${url}/update/${studentId}`, {
      method: "PUT",
      body: JSON.stringify(updatedStudent),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    });

    if (!response.ok) {
      throw new Error(`PUT request failed with status: ${response.status}`);
    }

    getStudents(); 
  } catch (error) {
    console.error("Error during PUT request:", error.message);
  }
}


async function deleteStudent(studentId) {
  try {
    const response = await fetch(`${url}/delete-one/${studentId}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    });

    if (!response.ok) {
      throw new Error(`DELETE request failed with status: ${response.status}`);
    }

    getStudents(); 
  } catch (error) {
    console.error("Error during DELETE request:", error.message);
  }
}

async function deleteAllStudents() {
    try {
      const response = await fetch(`${url}/delete-all`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
      });
  
      if (!response.ok) {
        throw new Error(`DELETE request failed with status: ${response.status}`);
      }
  
      getStudents(); 
    } catch (error) {
      console.error("Error deleting all students:", error.message);
    }
  }
  

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

  const newStudent = {
    studentId,
    fullName,
    yearOfStudy,
    marks,
    average
  };

  if (updateIndex === null) {
    addStudent(newStudent);
  } else {
    updateStudent(studentId, newStudent);
    document.getElementById('studentid').removeAttribute('data-update-index');
  }

  document.querySelector('.todo-container').reset();
});

// Search Function
document.querySelector('.search').addEventListener('input', async function() {
  const searchValue = this.value.toLowerCase();
  const response = await fetch(`${url}/get-all`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  });
  const data = await response.json();
  
  const output = document.getElementById('output');
  output.innerHTML = '';

  const filteredData = data.filter(student => 
    student.fullName.toLowerCase().includes(searchValue)
  );

  displayData(filteredData);
});

// Function to attach event listeners for delete and update icons
function attachEventListeners() {
  document.querySelectorAll('.delete-icon').forEach(icon => {
    icon.addEventListener('click', function() {
      const studentId = this.getAttribute('data-index');
      deleteStudent(studentId);
    });
  });

  document.querySelectorAll('.update-icon').forEach(icon => {
    icon.addEventListener('click', function() {
      const studentId = this.getAttribute('data-index');
      populateFormForUpdate(studentId);
    });
  });
}

// Populate Form for Update
function populateFormForUpdate(studentId) {
  fetch(`${url}/${studentId}`)
    .then(response => response.json())
    .then(student => {
      document.getElementById('studentid').value = student.studentId;
      document.getElementById('descriptionInput').value = student.fullName;
      document.getElementById('yearOfStudyInput').value = student.yearOfStudy;
      document.getElementById('marksInput').value = student.marks;
      document.getElementById('averageInput').value = student.average;

      document.getElementById('studentid').setAttribute('data-update-index', studentId);
    });
}

// Initial Data Load
document.addEventListener('DOMContentLoaded', fetchData);

// Function to display data in the table
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
        <i data-index="${item.studentId}" class="fa-solid fa-trash delete-icon"></i>
      </td>
      <td>
        <i data-index="${item.studentId}" class="fa-solid fa-pen-to-square update-icon"></i>
      </td>
    `;
    output.appendChild(row);
  });

  // Reattach delete and update event listeners
  attachEventListeners();
}

