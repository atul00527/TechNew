// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navList = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
  navList.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', navList.classList.contains('open'));
});

menuToggle.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    navList.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', navList.classList.contains('open'));
  }
});

// Smooth scrolling and active nav link highlight
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  const scrollPosition = window.scrollY + window.innerHeight / 3;
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (
      section.offsetTop <= scrollPosition &&
      section.offsetTop + section.offsetHeight > scrollPosition
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', setActiveLink);

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href').slice(1);
    scrollToSection(id);
    if (navList.classList.contains('open')) {
      navList.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', false);
    }
  });
});

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Pricing toggle monthly/annual
const toggleCheckbox = document.getElementById('toggle-checkbox');
const monthlyLabel = document.getElementById('monthlyLabel');
const annualLabel = document.getElementById('annualLabel');
const planPrices = document.querySelectorAll('.plan-price');

function updatePrices() {
  if (toggleCheckbox.checked) {
    // Annual pricing
    monthlyLabel.classList.remove('active');
    annualLabel.classList.add('active');
    planPrices.forEach(priceEl => {
      priceEl.textContent = '$' + priceEl.getAttribute('data-annual');
    });
  } else {
    // Monthly pricing
    monthlyLabel.classList.add('active');
    annualLabel.classList.remove('active');
    planPrices.forEach(priceEl => {
      priceEl.textContent = '$' + priceEl.getAttribute('data-monthly');
    });
  }
}

toggleCheckbox.addEventListener('change', updatePrices);

// Initialize prices on load
updatePrices();

// Contact form validation and submission
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formSuccessMessage = document.getElementById('formSuccessMessage');

function isValidEmail(email) {
  // Simple email regex
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

function validateInput() {
  let valid = true;

  // Name validation
  if (nameInput.value.trim().length < 2) {
    nameError.textContent = 'Please enter your name (at least 2 characters).';
    valid = false;
  } else {
    nameError.textContent = '';
  }

  // Email validation
  if (!isValidEmail(emailInput.value)) {
    emailError.textContent = 'Please enter a valid email address.';
    valid = false;
  } else {
    emailError.textContent = '';
  }

  // Message validation
  if (messageInput.value.trim().length < 10) {
    messageError.textContent = 'Message should be at least 10 characters.';
    valid = false;
  } else {
    messageError.textContent = '';
  }

  return valid;
}

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  if (validateInput()) {
    // Normally, here you would send the message to the server
    formSuccessMessage.style.display = 'block';
    contactForm.reset();
    // Clear errors
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
  } else {
    formSuccessMessage.style.display = 'none';
  }
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowBottom = window.innerHeight + window.scrollY;
  revealElements.forEach(el => {
    if (el.offsetTop + 150 < windowBottom) {
      el.classList.add('active');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
