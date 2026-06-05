const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mainNav.classList.toggle("open");

    const isOpen = mainNav.classList.contains("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

const footerContainer = document.querySelector("#footer");

if (footerContainer) {
  fetch("../footer.html")
    .then(response => response.text())
    .then(data => {
      footerContainer.innerHTML = data;
    })
    .catch(error => {
      console.error("Nie udało się wczytać stopki:", error);
    });
}