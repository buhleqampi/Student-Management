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
    drawPieChart();
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

  function drawPieChart() {
    const ctx = document.getElementById('yearDistributionPie').getContext('2d');
    const yearCounts = {};
  
    studentsData.forEach(student => {
      yearCounts[student.yearOfStudy] = (yearCounts[student.yearOfStudy] || 0) + 1;
    });
  
    const yearLabels = Object.keys(yearCounts);
    const yearData = Object.values(yearCounts);
  
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: yearLabels,
        datasets: [{
          data: yearData,
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    });
  }
  
  

  document.addEventListener('DOMContentLoaded', getStudentsData);
// getStudentsData();
