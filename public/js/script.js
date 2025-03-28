document.addEventListener("DOMContentLoaded", () => {
    console.log("Page loaded!");
  
    // Toggle navigation menu
    const menuToggle = document.querySelector("#menu-toggle");
    const nav = document.querySelector("#nav");
    if (menuToggle && nav) {
      menuToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
      });
    }
  
    // Form validation example
    const form = document.querySelector("#form");
    if (form) {
      form.addEventListener("submit", (event) => {
        const email = document.querySelector("#email").value;
        if (!email.includes("@")) {
          event.preventDefault();
          alert("Please enter a valid email address.");
        }
      });
    }
  });
  