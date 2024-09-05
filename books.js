// const myRequest = await Request ("https://www.googleapis.com/books/v1/{collectionName}/resourceID?parameters", {
//     method: "GET",
//     body: JSON.stringify({ name: "Buhle" }),
//     headers: {
//       "Content-Type": "application/json",
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*'
//         },},
//   );

//   const response = await fetch(myRequest);


const output = document.querySelector('#output');  


// const data = await response.json();

const bookUrl = "https://freetestapi.com/api/v1/books";


async function fetchBooks() {
  fetch(bookUrl)
    .then(response => response.json())
    .then((data) => {
    
      const limitedData = data.slice(0, 5);
      

      displayData(limitedData);
    })
    .catch(error => console.error('Error:', error));
}


function attachEventListeners() {
  document.querySelectorAll('.delete-icon').forEach(icon => {
    icon.addEventListener('click', function() {
      const _id = this.getAttribute('data-index');
      deleteBook(_id);
    });
  });

  document.querySelectorAll('.update-icon').forEach(icon => {
    icon.addEventListener('click', function() {
      const _id = this.getAttribute('data-index');
      populateFormForUpdate(_id);
    });
  });
}

function displayData(data) {
  output.innerHTML = '';

  if (data.length === 0) {
    output.innerHTML = '<tr><td colspan="5">No books found</td></tr>';
    return;
  }

  data.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.cover_image}</td>
      <td>${item.title}</td>
      <td>${item.genre}</td>
      <td>${item.description}</td>
      <td>
        <i data-index="${item._id}" class="fa-solid fa-trash delete-icon"></i>
      </td>
      <td>
        <i data-index="${item._id}" class="fa-solid fa-pen-to-square update-icon"></i>
      </td>
    `;
    output.appendChild(row);
  });

  attachEventListeners();
}

async function deleteBook(id) {
  try {
    const response = await fetch(`${bookUrl}/${id}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

    if (response.ok) {
      alert('Book deleted successfully');
      fetchBooks(); // Refresh the list
    }
  } catch (error) {
    console.error('Error deleting book:', error);
  }
}

function populateFormForUpdate(id) {
  // Logic to populate the update form with the book's details
}

// Fetch books when the page loads
fetchBooks();


