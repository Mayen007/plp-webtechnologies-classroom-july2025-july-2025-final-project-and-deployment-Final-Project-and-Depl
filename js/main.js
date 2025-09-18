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

/**
 * Initialize Animation on Scroll
 */
function initializeScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        // Unobserve after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Initialize Parallax Effects
 */
function initializeParallax() {
  const parallaxElements = document.querySelectorAll('.parallax-background, .parallax-midground');

  if (parallaxElements.length === 0) return;

  function updateParallax() {
    const scrollTop = window.pageYOffset;

    parallaxElements.forEach(element => {
      const speed = element.classList.contains('parallax-background') ? 0.5 : 0.3;
      const yPos = -(scrollTop * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }

  // Throttle scroll events for better performance
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', () => {
    requestTick();
    ticking = false;
  });
}

/**
 * Initialize Enhanced Gallery Interactions
 */
function initializeEnhancedGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    // Add staggered animation delay
    const index = Array.from(galleryItems).indexOf(item);
    item.style.animationDelay = `${index * 0.1}s`;

    // Enhanced hover effects
    item.addEventListener('mouseenter', function () {
      this.classList.add('hover-lift');
    });

    item.addEventListener('mouseleave', function () {
      this.classList.remove('hover-lift');
    });

    // Add image overlay effect
    const image = item.querySelector('.gallery-image');
    if (image) {
      image.classList.add('image-overlay-effect');
    }
  });
}

/**
 * Initialize Loading Animations
 */
function initializeLoadingStates() {
  // Simulate loading for images
  const images = document.querySelectorAll('img');

  images.forEach(img => {
    if (!img.complete) {
      img.classList.add('shimmer');

      img.addEventListener('load', function () {
        this.classList.remove('shimmer');
        this.classList.add('fade-in');
      });
    }
  });
}

/**
 * Initialize Advanced Navigation Effects
 */
function initializeAdvancedNavigation() {
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');

  // Header scroll effect
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
  });

  // Enhanced navigation link effects
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-2px)';
    });

    link.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });
}

/**
 * Initialize Smooth Page Transitions
 */
function initializePageTransitions() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Initialize Performance Optimizations
 */
function initializePerformanceOptimizations() {
  // Lazy loading for images
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // Preload critical resources
  const criticalImages = [
    'images/hero-artwork.jpg',
    'images/gallery/featured-1.jpg'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

/**
 * Initialize Enhanced Form Interactions
 */
function initializeEnhancedForms() {
  const formInputs = document.querySelectorAll('.form-input, .form-textarea');

  formInputs.forEach(input => {
    // Floating label effect
    input.addEventListener('focus', function () {
      this.parentNode.classList.add('focused');
    });

    input.addEventListener('blur', function () {
      if (!this.value) {
        this.parentNode.classList.remove('focused');
      }
    });

    // Real-time validation feedback
    input.addEventListener('input', function () {
      if (this.value) {
        this.classList.add('has-content');
      } else {
        this.classList.remove('has-content');
      }
    });
  });
}

/**
 * Initialize all enhanced features
 */
function initializeEnhancedFeatures() {
  initializeScrollAnimations();
  initializeParallax();
  initializeEnhancedGallery();
  initializeLoadingStates();
  initializeAdvancedNavigation();
  initializePageTransitions();
  initializePerformanceOptimizations();
  initializeEnhancedForms();
}

// Add enhanced features to the main DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function () {
  console.log('Art Gallery Website Loaded');

  // Initialize all features
  initializeNavigation();
  initializeGallery();
  initializeForms();
  initializeScrollEffects();

  // Initialize enhanced features
  initializeEnhancedFeatures();

  // Initialize utilities and compatibility
  initializeUtilities();
  initializeBrowserCompatibility();
  initializePerformanceFeatures();

  console.log('Enhanced features initialized');
});

/* ===== UTILITY FUNCTIONS ===== */
/* (Previously in utils.js) */

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

/**
 * Throttle function to limit function calls
 */
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Device detection utilities
 */
const Device = {
  isMobile() {
    return window.innerWidth <= 767;
  },
  isTablet() {
    return window.innerWidth > 767 && window.innerWidth <= 1023;
  },
  isDesktop() {
    return window.innerWidth > 1023;
  },
  hasTouch() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
};

/**
 * Local storage helpers
 */
const Storage = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage not available:', e);
    }
  },
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.warn('Error reading from LocalStorage:', e);
      return null;
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('Error removing from LocalStorage:', e);
    }
  }
};

/**
 * Initialize utility functions
 */
function initializeUtilities() {
  // Export utilities globally
  window.Utils = {
    debounce,
    throttle,
    isInViewport,
    Device,
    Storage
  };
}

/* ===== BROWSER COMPATIBILITY ===== */
/* (Previously in browser-compat.js) */

/**
 * Feature Detection
 */
const FeatureDetection = {
  cssGrid: () => CSS.supports('display', 'grid'),
  flexbox: () => CSS.supports('display', 'flex'),
  cssVariables: () => window.CSS && CSS.supports('color', 'var(--primary)'),
  intersectionObserver: () => 'IntersectionObserver' in window,
  smoothScroll: () => 'scrollBehavior' in document.documentElement.style
};

/**
 * Browser Detection
 */
const BrowserDetection = {
  isIE: () => navigator.userAgent.indexOf('MSIE') !== -1 || navigator.userAgent.indexOf('Trident/') !== -1,
  isEdge: () => navigator.userAgent.indexOf('Edge/') !== -1,
  isSafari: () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
  isFirefox: () => navigator.userAgent.indexOf('Firefox') !== -1,
  isChrome: () => navigator.userAgent.indexOf('Chrome') !== -1 && navigator.userAgent.indexOf('Edge/') === -1,
  isMobile: () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
};

/**
 * Apply browser compatibility fixes
 */
function initializeBrowserCompatibility() {
  // Add browser classes to body
  const body = document.body;

  if (BrowserDetection.isIE()) body.classList.add('browser-ie');
  if (BrowserDetection.isEdge()) body.classList.add('browser-edge');
  if (BrowserDetection.isSafari()) body.classList.add('browser-safari');
  if (BrowserDetection.isFirefox()) body.classList.add('browser-firefox');
  if (BrowserDetection.isChrome()) body.classList.add('browser-chrome');
  if (BrowserDetection.isMobile()) body.classList.add('device-mobile');

  // CSS Grid fallback
  if (!FeatureDetection.cssGrid()) {
    body.classList.add('no-css-grid');
    console.log('CSS Grid not supported, adding fallback class');
  }

  // Intersection Observer fallback
  if (!FeatureDetection.intersectionObserver()) {
    setTimeout(() => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach(element => element.classList.add('animated'));
    }, 100);
  }

  // Show legacy browser warning
  if (BrowserDetection.isIE()) {
    showLegacyBrowserWarning();
  }

  console.log('Browser compatibility initialized for:', {
    browser: {
      isIE: BrowserDetection.isIE(),
      isEdge: BrowserDetection.isEdge(),
      isSafari: BrowserDetection.isSafari(),
      isFirefox: BrowserDetection.isFirefox(),
      isChrome: BrowserDetection.isChrome()
    },
    features: {
      cssGrid: FeatureDetection.cssGrid(),
      cssVariables: FeatureDetection.cssVariables(),
      intersectionObserver: FeatureDetection.intersectionObserver()
    }
  });
}

/**
 * Show legacy browser warning
 */
function showLegacyBrowserWarning() {
  const warningHTML = `
    <div id="browser-warning" style="position: fixed; top: 0; left: 0; right: 0; background: #f8d7da; color: #721c24; padding: 15px; text-align: center; z-index: 9999; border-bottom: 1px solid #f5c6cb;">
      <strong>Browser Update Recommended:</strong> 
      For the best experience, please consider updating to a modern browser like 
      <a href="https://www.google.com/chrome/" target="_blank">Chrome</a>, 
      <a href="https://www.mozilla.org/firefox/" target="_blank">Firefox</a>, or 
      <a href="https://www.microsoft.com/edge" target="_blank">Edge</a>.
      <button onclick="document.getElementById('browser-warning').style.display='none'" 
              style="margin-left: 15px; padding: 5px 10px; background: #721c24; color: white; border: none; cursor: pointer;">
        Dismiss
      </button>
    </div>
  `;

  document.body.insertAdjacentHTML('afterbegin', warningHTML);
  document.body.style.paddingTop = '60px';
}

/* ===== PERFORMANCE FEATURES ===== */
/* (Previously in performance.js) */

/**
 * Performance monitoring
 */
const PerformanceMonitor = {
  start: performance.now(),

  logMetric(name, value) {
    console.log(`Performance: ${name} - ${value.toFixed(2)}ms`);
  },

  measurePageLoad() {
    window.addEventListener('load', () => {
      const loadTime = performance.now() - this.start;
      this.logMetric('Page Load Time', loadTime);
    });
  }
};

/**
 * Enhanced lazy loading for images
 */
function initializeImageLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '50px 0px' });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      img.classList.add('loaded');
    });
  }
}

/**
 * Initialize performance features
 */
function initializePerformanceFeatures() {
  PerformanceMonitor.measurePageLoad();
  initializeImageLazyLoading();

  // Preload critical resources
  const criticalImages = ['images/gallery/hero-artwork.jpg'];
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });

  console.log('Performance features initialized');
}

// Export for external use
window.GalleryApp = {
  FeatureDetection,
  BrowserDetection,
  PerformanceMonitor,
  Device,
  Storage
};