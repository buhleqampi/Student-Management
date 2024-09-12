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
// const data = await response.json();
const search = document.querySelector('.search');
const output = document.querySelector('#output');  

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

search.addEventListener('input', async function() { 
  const searchValue = this.value.toLowerCase();

  fetch(bookUrl)
  .then(response => response.json())
  .then((data) => {

    const filteredData = data.filter(book => 
      book.title.toLowerCase().includes(searchValue) ||
      book.genre.toLowerCase().includes(searchValue)
    );
    
    displayData(filteredData); 
    console.log(filteredData);
  }) 
  .catch(error => console.error('Error:', error));
  })


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
      <td><img src="${item.cover_image}" alt="${item.title}" style="width:100px; height:auto;"></td>
      <td>${item.title}</td>
      <td>${item.genre}</td>
      <td>${item.description}</td>
     
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
      fetchBooks(); 
    }
  } catch (error) {
    console.error('Error deleting book:', error);
  }
}

function populateFormForUpdate(id) {
  
}


fetchBooks();


