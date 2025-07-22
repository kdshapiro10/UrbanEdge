const menuToggle = document.querySelector('.menu-toggle');
const closeMenu = document.querySelector('.close-menu');
const mobileMenu = document.querySelector('.mobile-menu');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.add('active');

  // Animate in
  requestAnimationFrame(() => {
    mobileMenu.style.opacity = '1';
    mobileMenu.style.transform = 'translateY(0)';
  });
});

closeMenu.addEventListener('click', () => {
  // Animate out
  mobileMenu.style.opacity = '0';
  mobileMenu.style.transform = 'translateY(20px)';

  // Wait for transition to finish before hiding interactions
  setTimeout(() => {
    mobileMenu.classList.remove('active');
  }, 400); // Match your CSS transition duration
});


document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop(); // e.g. 'floorplans.html'

  const allLinks = document.querySelectorAll(".nav-links a, .mobile-nav-links a");

  allLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
});