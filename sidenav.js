document.addEventListener("DOMContentLoaded", function () {
    const sidenav = document.getElementById("sidenav");
    const toggleBtn = document.getElementById("toggle-btn");
    const grid = document.querySelector(".grid");

    toggleBtn.addEventListener("click", function () {
        
        sidenav.classList.toggle("open");
        grid.classList.toggle("collapsed");

        
        if (sidenav.classList.contains("open")) {
            toggleBtn.textContent = "X"; 
        } else {
            toggleBtn.textContent = "☰"; 
        }
    });
});

