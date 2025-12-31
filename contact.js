// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// Close mobile menu when clicking on a link
const navLinkItems = document.querySelectorAll('.nav-links a');
navLinkItems.forEach((link) => {
  link.addEventListener('click', () => {
    if (mobileMenuBtn) {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
});

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(15, 23, 42, 0.8)';
    navbar.style.boxShadow = 'none';
  }

  lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe cards
document.querySelectorAll('.info-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = `all 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const backBtn = document.getElementById('backBtn');

// WhatsApp number in international format (no + or spaces)
const WHATSAPP_NUMBER = '2349066446401';

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Build message lines
    const lines = [];
    if (data.name) lines.push(`Name: ${data.name}`);
    if (data.email) lines.push(`Email: ${data.email}`);
    if (data.phone) lines.push(`Phone: ${data.phone}`);
    if (data.subject) lines.push(`Subject: ${data.subject}`);
    if (data.message) lines.push(`Message: ${data.message}`);

    let text = `New contact from website:%0A` + lines.join('%0A');

    // Open WhatsApp (wa.me) with encoded text
    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(waUrl, '_blank');

    // Inform the user to press send in WhatsApp and show the success block
    if (formSuccess) {
      const title = formSuccess.querySelector('h3');
      const desc = formSuccess.querySelector('p');
      if (title) title.textContent = 'WhatsApp window opened';
      if (desc) desc.textContent = "A WhatsApp window opened in a new tab — please press Send to deliver your message.";

      contactForm.style.display = 'none';
      formSuccess.classList.add('active');
      contactForm.reset();
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

// Back button to show form again
backBtn.addEventListener('click', () => {
  formSuccess.classList.remove('active');
  contactForm.style.display = 'flex';

  // Scroll to form
  contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Form input animations
const formInputs = document.querySelectorAll(
  '.form-group input, .form-group textarea'
);

formInputs.forEach((input) => {
  input.addEventListener('focus', () => {
    input.parentElement.style.transform = 'scale(1.01)';
  });

  input.addEventListener('blur', () => {
    input.parentElement.style.transform = 'scale(1)';
  });
});
