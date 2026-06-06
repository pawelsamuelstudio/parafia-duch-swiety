document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadFooter();
  scrollToHashAfterLoad();
});

function getBasePath() {
  const path = window.location.pathname;

  const subfolders = [
    "/ogloszenia/",
    "/intencje/",
    "/kancelaria/",
    "/aktualnosci/",
    "/historia-parafii/"
  ];

  const isSubpage = subfolders.some((folder) => path.includes(folder));

  return isSubpage ? "../" : "";
}

function loadHeader() {
  const headerContainer = document.getElementById("header");

  if (!headerContainer) {
    return;
  }

  const basePath = getBasePath();

  fetch(basePath + "header.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Nie udało się wczytać pliku header.html");
      }

      return response.text();
    })
    .then((html) => {
      headerContainer.innerHTML = html;
      loadMenu();
      fixInternalLinks();
    })
    .catch((error) => {
      console.error("Błąd ładowania nagłówka:", error);
    });
}

function loadMenu() {
  const menuContainer = document.getElementById("menu");

  if (!menuContainer) {
    return;
  }

  const basePath = getBasePath();

  fetch(basePath + "menu.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Nie udało się wczytać pliku menu.html");
      }

      return response.text();
    })
    .then((html) => {
      menuContainer.innerHTML = html;
      fixInternalLinks();
      setupMobileMenu();
    })
    .catch((error) => {
      console.error("Błąd ładowania menu:", error);
    });
}

function loadFooter() {
  const footerContainer = document.getElementById("footer");

  if (!footerContainer) {
    return;
  }

  const basePath = getBasePath();

  fetch(basePath + "footer.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Nie udało się wczytać pliku footer.html");
      }

      return response.text();
    })
    .then((html) => {
      footerContainer.innerHTML = html;
      fixInternalLinks();
    })
    .catch((error) => {
      console.error("Błąd ładowania stopki:", error);
    });
}

function fixInternalLinks() {
  const basePath = getBasePath();
  const links = document.querySelectorAll("a[data-link]");

  links.forEach((link) => {
    const target = link.getAttribute("data-link");

    if (target) {
      link.setAttribute("href", basePath + target);
    }
  });
}

function setupMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (!menuToggle || !mainNav) {
    return;
  }

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mainNav.classList.toggle("open");

    const isOpen = mainNav.classList.contains("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  const menuLinks = mainNav.querySelectorAll("a");

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function scrollToHashAfterLoad() {
  if (!window.location.hash) {
    return;
  }

  setTimeout(() => {
    const target = document.querySelector(window.location.hash);

    if (!target) {
      return;
    }

    const header = document.getElementById("header");
    const headerHeight = header ? header.offsetHeight : 90;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight -
      20;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  }, 500);
}