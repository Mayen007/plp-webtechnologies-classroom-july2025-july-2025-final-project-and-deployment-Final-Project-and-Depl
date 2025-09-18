/**
 * Art Gallery Website - Main JavaScript
 * Created: September 18, 2025
 * 
 * Main application logic and initialization
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function () {
  console.log('Art Gallery Website Loaded');

  // Initialize components
  initializeNavigation();
  initializeGallery();
  initializeForms();
  initializeScrollEffects();
});

/**
 * Initialize Navigation Components
 */
function initializeNavigation() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking on links
  const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
    });
  });

  // Highlight active navigation item
  highlightActiveNavItem();
}

/**
 * Initialize Gallery Components
 */
function initializeGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', function () {
      const imageUrl = this.querySelector('.gallery-image').src;
      const title = this.querySelector('.gallery-title')?.textContent || '';
      const meta = this.querySelector('.gallery-meta')?.textContent || '';

      openLightbox(imageUrl, title, meta);
    });
  });

  // Initialize gallery filters if they exist
  initializeGalleryFilters();
}

/**
 * Initialize Form Components
 */
function initializeForms() {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', handleContactFormSubmit);
  }

  // Add real-time validation
  const formInputs = document.querySelectorAll('.form-input, .form-textarea');
  formInputs.forEach(input => {
    input.addEventListener('blur', function () {
      validateField(this);
    });
  });
}

/**
 * Initialize Scroll Effects
 */
function initializeScrollEffects() {
  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });

    backToTopButton.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * Highlight Active Navigation Item
 */
function highlightActiveNavItem() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage ||
      (currentPage === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/**
 * Gallery Filter Functionality
 */
function initializeGalleryFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');

      // Update active filter button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filter gallery items
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (filter === 'all' || itemCategory === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.5s ease-in-out';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Open Lightbox for Gallery Images
 */
function openLightbox(imageUrl, title, meta) {
  // Create lightbox if it doesn't exist
  let lightbox = document.getElementById('lightbox');

  if (!lightbox) {
    lightbox = createLightbox();
    document.body.appendChild(lightbox);
  }

  // Update lightbox content
  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxMeta = lightbox.querySelector('.lightbox-meta');

  lightboxImage.src = imageUrl;
  lightboxTitle.textContent = title;
  lightboxMeta.textContent = meta;

  // Show lightbox
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Create Lightbox Element
 */
function createLightbox() {
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.className = 'lightbox';

  lightbox.innerHTML = `
        <div class="lightbox-overlay">
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img class="lightbox-image" src="" alt="">
                <div class="lightbox-info">
                    <h3 class="lightbox-title"></h3>
                    <p class="lightbox-meta"></p>
                </div>
            </div>
        </div>
    `;

  // Add close functionality
  const closeButton = lightbox.querySelector('.lightbox-close');
  const overlay = lightbox.querySelector('.lightbox-overlay');

  closeButton.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      closeLightbox();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  return lightbox;
}

/**
 * Close Lightbox
 */
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/**
 * Handle Contact Form Submission
 */
function handleContactFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');

  // Validate form
  if (!validateForm(form)) {
    return;
  }

  // Show loading state
  submitButton.disabled = true;
  submitButton.innerHTML = '<span class="loading"></span> Sending...';

  // Simulate form submission (replace with actual submission logic)
  setTimeout(() => {
    showFormSuccess('Thank you for your message! I\'ll get back to you soon.');
    form.reset();
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send Message';
  }, 2000);
}

/**
 * Validate Form
 */
function validateForm(form) {
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

/**
 * Validate Individual Field
 */
function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  let isValid = true;
  let errorMessage = '';

  // Remove existing error
  removeFieldError(field);

  // Required field validation
  if (field.hasAttribute('required') && !value) {
    errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    isValid = false;
  }

  // Email validation
  if (fieldName === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errorMessage = 'Please enter a valid email address';
      isValid = false;
    }
  }

  // Show error if validation failed
  if (!isValid) {
    showFieldError(field, errorMessage);
  }

  return isValid;
}

/**
 * Show Field Error
 */
function showFieldError(field, message) {
  field.classList.add('error');

  const errorElement = document.createElement('div');
  errorElement.className = 'form-error';
  errorElement.textContent = message;

  field.parentNode.appendChild(errorElement);
}

/**
 * Remove Field Error
 */
function removeFieldError(field) {
  field.classList.remove('error');
  const existingError = field.parentNode.querySelector('.form-error');
  if (existingError) {
    existingError.remove();
  }
}

/**
 * Show Form Success Message
 */
function showFormSuccess(message) {
  const successElement = document.createElement('div');
  successElement.className = 'form-success';
  successElement.textContent = message;

  const form = document.getElementById('contact-form');
  form.appendChild(successElement);

  // Remove success message after 5 seconds
  setTimeout(() => {
    successElement.remove();
  }, 5000);
}