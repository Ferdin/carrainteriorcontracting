const toggleBtn = document.querySelector(".menu-toggle");
const closeBtn = document.querySelector(".menu-close");
const menu = document.querySelector(".offcanvas-menu");
const overlay = document.querySelector(".menu-overlay");

toggleBtn.addEventListener("click", () => {
  menu.classList.add("active");
  overlay.classList.add("active");
});

closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

function closeMenu() {
  menu.classList.remove("active");
  overlay.classList.remove("active");
}
