let studentsData = [];

const url = "http://localhost:3000/students"; 

async function getStudentsData() {
  try {
    const response = await fetch(`${url}/get-all`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    });

    const data = await response.json();
    studentsData = data;
    console.log("I am Sis Pedro")
    drawLineGraph();
    // drawPieChart();
  } catch (error) {
    console.error("Error fetching students data:", error.message);
  }
}


function drawLineGraph() {
    console.log("Hello")
    const ctx = document.getElementById('marksLineGraph').getContext('2d');
    const studentNames = studentsData.map(student => student.fullName);
    const studentMarks = studentsData.map(student => student.marks);
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: studentNames,
        datasets: [{
          label: 'Marks',
          data: studentMarks,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          fill: false,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Marks'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Students'
            }
          }
        }
      }
    });
  }
  

  document.addEventListener('DOMContentLoaded', getStudentsData);
// getStudentsData();
