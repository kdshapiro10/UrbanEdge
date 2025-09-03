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

// ----------------------
// Email Me Form (Formspree + fetch)
// ----------------------
(function () {
  const form = document.getElementById('ue-info-form');
  if (!form) return;

  const selectAll   = document.getElementById('selectAll');
  const topicChecks = [...form.querySelectorAll('input[name="topics"]')];
  const wrappers    = [...form.querySelectorAll('[data-required]')];
  const toast       = document.getElementById('toast');

  // Select All toggle
  if (selectAll) {
    selectAll.addEventListener('change', () => {
      topicChecks.forEach(cb => {
        cb.checked = selectAll.checked;
      });
    });

    topicChecks.forEach(cb => {
      cb.addEventListener('change', () => {
        selectAll.checked = topicChecks.every(c => c.checked);
      });
    });
  }

  // Validation helpers
  const emailOk = v => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim());
  const phoneOk = v => v.replace(/\D/g, '').length >= 7;

  function validateField(wrapper) {
    const input = wrapper.querySelector('input');
    const type  = wrapper.dataset.type || 'text';
    const val   = (input.value || '').trim();

    let valid = val.length > 0;

    if (valid && type === 'email') {
      valid = emailOk(val);
    }
    if (valid && type === 'phone') {
      valid = phoneOk(val);
    }

    wrapper.classList.toggle('is-error', !valid);
    return valid;
  }

  // Show errors until fixed
  wrappers.forEach(w => {
    const i = w.querySelector('input');

    i.addEventListener('blur', () => {
      validateField(w);
    });

    i.addEventListener('input', () => {
      validateField(w);
    });
  });

  // Submit via fetch (no page reload)
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const firstInvalid = wrappers.find(w => !validateField(w));
    if (firstInvalid) {
      firstInvalid.querySelector('input').focus();
      showToast('Please fix the highlighted fields.', false);
      return;
    }

    const fd = new FormData(form);
    const topics = topicChecks.filter(c => c.checked).map(c => c.value);
    fd.set('Requested', topics.length ? topics.join(', ') : 'None selected');

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        form.reset();
        if (selectAll) selectAll.checked = false;
        showToast('Thanks! Your message was sent.', true);

        setTimeout(() => {
          if (toast) toast.className = 'toast';
        }, 4000);
      } else {
        showToast('Error sending. Please try again.', false);
      }
    } catch (err) {
      showToast('Network error. Please try again.', false);
    }
  });

  function showToast(msg, ok) {
    if (!toast) return;

    toast.textContent = msg;
    toast.className   = 'toast ' + (ok ? 'ok' : 'err');
  }
})();

// On first paint, allow "fade-in-on-load" elements to animate
  window.addEventListener('load', () => {
    document.body.classList.add('is-loaded');
  });

  // Scroll reveals using IntersectionObserver
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target); // reveal once; remove this line if you want repeat
      }
    });
  }, {
    root: null,                 // viewport
    threshold: 0.1,             // 10% visible
    rootMargin: "0px 0px -10% 0px" // start a bit before fully visible
  });

  // Observe all reveal targets
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));


