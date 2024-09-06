document.addEventListener("DOMContentLoaded", function () {
    const sidenav = document.getElementById("sidenav");
    const toggleBtn = document.getElementById("toggle-btn");
    const grid = document.querySelector(".grid");

    toggleBtn.addEventListener("click", function () {
        // Toggle the 'open' class on the sidenav and change the button content
        sidenav.classList.toggle("open");
        grid.classList.toggle("collapsed");

        // Change button text between ☰ and X based on sidebar state
        if (sidenav.classList.contains("open")) {
            toggleBtn.textContent = "X"; // Set to X when open
        } else {
            toggleBtn.textContent = "☰"; 
        }
    });
});

