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

document.addEventListener("DOMContentLoaded", function () {
  const img = document.querySelector(".parallax-img");

  if (!img) return;

  window.addEventListener("scroll", function () {
    const offset = window.scrollY * 0.1; // adjust for intensity
    img.style.transform = `translateY(${offset}px)`;
  });
});

(function () {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  // Elements to reveal
  const selectors = [
    'section', 'article',
    'h1','h2','h3','h4','h5','h6',
    'p','img','figure','figcaption',
    '.card','.btn','button','a'
  ].join(',');

  const skipWithin = ['header','nav','footer','[data-no-reveal]'].join(',');

  const candidates = Array.from(document.querySelectorAll(selectors))
    .filter(el => !el.closest(skipWithin) && !el.hasAttribute('data-no-reveal'));

  candidates.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    candidates.forEach(el => io.observe(el));
  } else {
    candidates.forEach(el => el.classList.add('in-view'));
  }
})();


