/* =========================================================
   Alex Morgan Portfolio — main.js
   Handles: dark/light theme toggle, active nav link,
   and contact form validation (on contact.html only)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------
     1. THEME TOGGLE (dark / light mode)
     ----------------------------------------------------- */
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

  function setTheme(mode) {
    if (mode === 'light') {
      document.body.classList.add('light-mode');
      if (themeIcon) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      }
    } else {
      document.body.classList.remove('light-mode');
      if (themeIcon) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  }

  // Load saved preference (defaults to dark)
  const savedTheme = localStorage.getItem('am-theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const isLight = document.body.classList.contains('light-mode');
      const newTheme = isLight ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('am-theme', newTheme);
    });
  }

  /* -----------------------------------------------------
     2. ACTIVE NAV LINK (based on current page filename)
     ----------------------------------------------------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* -----------------------------------------------------
     3. CONTACT FORM VALIDATION (contact.html only)
     ----------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const subjectInput = document.getElementById('subjectInput');
    const messageInput = document.getElementById('messageInput');
    const formStatus = document.getElementById('formStatus');

    function showError(input, message) {
      input.classList.add('is-invalid');
      const feedback = input.parentElement.querySelector('.invalid-feedback');
      if (feedback) feedback.textContent = message;
    }

    function clearError(input) {
      input.classList.remove('is-invalid');
    }

    function validateField(input) {
      const value = input.value.trim();

      if (input === nameInput) {
        if (value.length < 2) {
          showError(input, 'Please enter your full name (at least 2 characters).');
          return false;
        }
      }

      if (input === emailInput) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          showError(input, 'Please enter a valid email address.');
          return false;
        }
      }

      if (input === subjectInput) {
        if (value.length < 3) {
          showError(input, 'Subject should be at least 3 characters.');
          return false;
        }
      }

      if (input === messageInput) {
        if (value.length < 10) {
          showError(input, 'Message should be at least 10 characters.');
          return false;
        }
      }

      clearError(input);
      return true;
    }

    [nameInput, emailInput, subjectInput, messageInput].forEach(function (input) {
      if (!input) return;
      input.addEventListener('blur', function () {
        validateField(input);
      });
      input.addEventListener('input', function () {
        if (input.classList.contains('is-invalid')) {
          validateField(input);
        }
      });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const fields = [nameInput, emailInput, subjectInput, messageInput];
      let allValid = true;

      fields.forEach(function (input) {
        if (!input) return;
        const valid = validateField(input);
        if (!valid) allValid = false;
      });

      if (allValid) {
        formStatus.textContent = 'Message sent successfully! I\'ll get back to you within 2 business days.';
        formStatus.className = 'alert alert-success mt-3';
        formStatus.classList.remove('d-none');
        contactForm.reset();
      } else {
        formStatus.textContent = 'Please fix the errors above before submitting.';
        formStatus.className = 'alert alert-danger mt-3';
        formStatus.classList.remove('d-none');
      }
    });
  }

});