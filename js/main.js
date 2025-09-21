/**
 * Lumina Gallery Website - Simplified Main JavaScript
 * Performance-related code removed
 */

/**
 * Initialize Navigation Components
 */
function initializeNavigation() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  // Mobile Menu Toggle
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const isActive = mobileMenu.classList.contains('active');

      if (isActive) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Close mobile menu when clicking on links
  const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function () {
      closeMobileMenu();
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (e) {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });

  // Close mobile menu on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // Navbar scroll effect (without performance optimization)
  window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (header) {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none';
      }
    });

    backToTopButton.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

function openMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

  if (mobileMenu && mobileMenuToggle) {
    mobileMenu.classList.add('active');
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

  if (mobileMenu && mobileMenuToggle) {
    mobileMenu.classList.remove('active');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

/**
 * Initialize Gallery Components (without lazy loading or animations)
 */
function initializeGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const filterButtons = document.querySelectorAll('.filter-button');
  const galleryGrid = document.querySelector('.gallery-grid');

  // Initialize gallery filtering
  initializeGalleryFiltering();

  // Initialize gallery lightbox
  initializeGalleryLightbox();

  // Initialize keyboard navigation
  initializeGalleryKeyboardNavigation();
}

/**
 * Initialize Gallery Filtering
 */
function initializeGalleryFiltering() {
  const filterButtons = document.querySelectorAll('.filter-button');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryGrid = document.querySelector('.gallery-grid');

  if (filterButtons.length === 0 || galleryItems.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Get filter category
      const filter = this.getAttribute('data-filter');

      // Filter gallery items
      filterGalleryItems(galleryItems, filter, galleryGrid);
    });
  });

  // Check for URL filter parameter
  const urlParams = new URLSearchParams(window.location.search);
  const urlFilter = urlParams.get('filter');

  if (urlFilter) {
    const targetButton = document.querySelector(`[data-filter="${urlFilter}"]`);
    if (targetButton) {
      // Remove active from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Activate URL filter
      targetButton.classList.add('active');
      filterGalleryItems(galleryItems, urlFilter, galleryGrid);
    }
  }
}

/**
 * Filter Gallery Items
 */
function filterGalleryItems(galleryItems, filter, galleryGrid) {
  galleryItems.forEach(item => {
    const category = item.getAttribute('data-category');

    if (filter === 'all' || category === filter) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

/**
 * Initialize Gallery Keyboard Navigation
 */
function initializeGalleryKeyboardNavigation() {
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach((item, index) => {
    item.addEventListener('keydown', function (e) {
      let targetIndex = -1;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          targetIndex = (index + 1) % galleryItems.length;
          break;
        case 'ArrowLeft':
          e.preventDefault();
          targetIndex = (index - 1 + galleryItems.length) % galleryItems.length;
          break;
        case 'ArrowDown':
          e.preventDefault();
          targetIndex = Math.min(index + 3, galleryItems.length - 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          targetIndex = Math.max(index - 3, 0);
          break;
        case 'Home':
          e.preventDefault();
          targetIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          targetIndex = galleryItems.length - 1;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          item.click();
          return;
      }

      if (targetIndex !== -1 && galleryItems[targetIndex]) {
        galleryItems[targetIndex].focus();
      }
    });
  });
}

/**
 * Initialize Gallery Lightbox (simplified)
 */
function initializeGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      const img = item.querySelector('.gallery-image');
      const title = item.querySelector('.gallery-title');
      const meta = item.querySelector('.gallery-meta');
      const price = item.querySelector('.gallery-price');

      if (img) {
        const artworkData = {
          imageUrl: img.src,
          title: title ? title.textContent : 'Untitled',
          artist: meta ? meta.textContent : 'Unknown Artist',
          meta: meta ? meta.textContent : '',
          price: price ? price.textContent : '',
          index: index,
          galleryItems: galleryItems
        };

        openLightbox(artworkData);
      }
    });
  });
}

/**
 * Simple Lightbox Implementation
 */
function openLightbox(artworkData) {
  const { imageUrl, title, artist, price } = artworkData;

  // Create or get lightbox
  let lightbox = document.getElementById('simple-lightbox');
  if (!lightbox) {
    lightbox = createLightbox();
    document.body.appendChild(lightbox);
  }

  // Update content
  const lightboxImg = lightbox.querySelector('.lightbox-image');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxArtist = lightbox.querySelector('.lightbox-artist');
  const lightboxPrice = lightbox.querySelector('.lightbox-price');

  if (lightboxImg) lightboxImg.src = imageUrl;
  if (lightboxTitle) lightboxTitle.textContent = title;
  if (lightboxArtist) lightboxArtist.textContent = artist;
  if (lightboxPrice) lightboxPrice.textContent = price;

  // Show lightbox
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  // Focus management
  const closeButton = lightbox.querySelector('.lightbox-close');
  if (closeButton) closeButton.focus();
}

function createLightbox() {
  const lightbox = document.createElement('div');
  lightbox.id = 'simple-lightbox';
  lightbox.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `;

  lightbox.innerHTML = `
    <div style="position: relative; max-width: 90%; max-height: 90%; background: white; border-radius: 8px; overflow: hidden;">
      <button class="lightbox-close" style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; z-index: 10001;">×</button>
      <img class="lightbox-image" style="max-width: 100%; height: auto; display: block;">
      <div style="padding: 20px;">
        <h3 class="lightbox-title" style="margin: 0 0 10px 0;"></h3>
        <p class="lightbox-artist" style="margin: 0 0 10px 0; color: #666;"></p>
        <p class="lightbox-price" style="margin: 0; font-weight: bold;"></p>
      </div>
    </div>
  `;

  // Close functionality
  const closeButton = lightbox.querySelector('.lightbox-close');
  closeButton.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      closeLightbox();
    }
  });

  return lightbox;
}

function closeLightbox() {
  const lightbox = document.getElementById('simple-lightbox');
  if (lightbox) {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }
}

/**
 * Initialize Form Components
 */
function initializeForms() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simple form validation
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        field.classList.remove('error');

        if (!field.value.trim()) {
          field.classList.add('error');
          isValid = false;
        }
      });

      if (isValid) {
        // Simple success message
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    });
  });

  // Remove error class on input
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', function () {
      this.classList.remove('error');
    });
  });
}

/**
 * Initialize FAQ Accordion
 */
function initializeFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', function () {
        const isOpen = item.classList.contains('active');

        // Close all other FAQ items
        faqItems.forEach(faqItem => {
          faqItem.classList.remove('active');
          const faqAnswer = faqItem.querySelector('.faq-answer');
          if (faqAnswer) {
            faqAnswer.style.maxHeight = null;
          }
        });

        // Toggle current item
        if (!isOpen) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });
}

/**
 * Initialize Scroll Effects (simplified)
 */
function initializeScrollEffects() {
  // Simple smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// Main initialization
document.addEventListener('DOMContentLoaded', function () {
  console.log('Lumina Gallery Website Loaded (Performance optimizations removed)');

  // Initialize core features
  initializeNavigation();
  initializeGallery();
  initializeForms();
  initializeScrollEffects();

  // Initialize FAQ accordion (for contact page)
  initializeFAQAccordion();

  console.log('Basic features initialized');
});