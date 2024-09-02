const fullName = document.getElementById('descriptionInput');
const yearOfStudy = document.getElementById('yearOfStudyInput');
const marks = document.getElementById('marksInput');
const average = document.getElementById('averageInput');
const toggleForm = document.querySelector('.toggle-form-btn');
const addButton = document.querySelector('.todo-container');
const search = document.querySelector('.search');
const output = document.getElementById('output');

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

    // console.log(response);

    const data = await response.json();
    displayData(data); 
    console.log(data);
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
    console.log(response);

    if (!response.ok) {
      throw new Error(`POST request failed with status: ${response.status}`);
    }

    getStudents(); 
  } catch (error) {
    console.error("Error during POST request:", error.message);
  }
}


async function updateStudent( _id, updatedStudent) {
  try {
    const response = await fetch(`${url}/update/${ _id}`, {
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


async function deleteStudent( _id) {
  try {
    const response = await fetch(`${url}/delete-one/${ _id}`, {
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
toggleForm.addEventListener('click', () => {
  const form = document.querySelector('.todo-container');
  form.classList.toggle('hidden');
});

// Add or Update Student
addButton.addEventListener('submit', function(e) {
  e.preventDefault();


  const newStudent = {
   
    fullName : fullName.value,
    yearOfStudy : yearOfStudy.value,
    marks : marks.value,
    average: average.value
  };

  // if (updateIndex === null) {
    addStudent(newStudent);
  // } 
  // else {
  //   updateStudent(_id, newStudent);
  //   document.getElementById('studentid').removeAttribute('data-update-index');
  // }

  addButton.reset();
});

// Search Function
search.addEventListener('input', async function() {
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
      const _id = this.getAttribute('data-index');
      deleteStudent(_id);
    });
  });

  document.querySelectorAll('.update-icon').forEach(icon => {
    icon.addEventListener('click', function() {
      const _id = this.getAttribute('data-index');
      populateFormForUpdate(_id);
    });
  });
}

// Populate Form for Update
function populateFormForUpdate(_id) {
  fetch(`${url}/update/${ _id}`)
    .then(response => response.json())
    .then(student => {
      // _id.value = student._id;
      fullName.value = student.fullName;
      yearOfStudy.value = student.yearOfStudy;
      marks.value = student.marks;
      average.value = student.average;

      document.getElementById('studentid').setAttribute('data-update-index', _id);
    });
}

// Initial Data Load
document.addEventListener('DOMContentLoaded', getStudents);

// Function to display data in the table
function displayData(data) {
  output.innerHTML = '';

  data.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item._id}</td>
      <td>${item.fullName}</td>
      <td>${item.yearOfStudy}</td>
      <td>${item.marks}</td>
      <td>${item.average}</td>
      <td>
        <i data-index="${item._id}" class="fa-solid fa-trash delete-icon"></i>
      </td>
      <td>
        <i data-index="${item._id}" class="fa-solid fa-pen-to-square update-icon"></i>
      </td>
    `;
    output.appendChild(row);
  });

  // Reattach delete and update event listeners
  attachEventListeners();
}

