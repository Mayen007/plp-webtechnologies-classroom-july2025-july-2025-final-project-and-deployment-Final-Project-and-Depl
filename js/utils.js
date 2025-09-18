/**
 * Art Gallery Website - Utility Functions
 * Helper functions and utilities
 */

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
 * Smooth scroll to element
 */
function scrollToElement(element, offset = 0) {
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

/**
 * Get CSS custom property value
 */
function getCSSVariable(variable) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
}

/**
 * Set CSS custom property value
 */
function setCSSVariable(variable, value) {
  document.documentElement.style.setProperty(variable, value);
}

/**
 * Format date for display
 */
function formatDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const finalOptions = { ...defaultOptions, ...options };
  return new Date(date).toLocaleDateString('en-US', finalOptions);
}

/**
 * Lazy load images
 */
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

/**
 * Animate on scroll
 */
function animateOnScroll() {
  const animatedElements = document.querySelectorAll('[data-animate]');

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationType = element.dataset.animate;
        element.classList.add('animate-' + animationType);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => animationObserver.observe(el));
}

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
 * URL helpers
 */
const URLHelpers = {
  getParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  },

  setParam(param, value) {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    window.history.pushState({}, '', url);
  },

  removeParam(param) {
    const url = new URL(window.location);
    url.searchParams.delete(param);
    window.history.pushState({}, '', url);
  }
};

/**
 * Performance helpers
 */
const Performance = {
  // Measure page load time
  measurePageLoad() {
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`Page load time: ${loadTime}ms`);
    });
  },

  // Measure function execution time
  measure(fn, label = 'Function') {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${label} took ${end - start} milliseconds`);
    return result;
  }
};

/**
 * Device detection
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
 * Animation helpers
 */
const Animation = {
  fadeIn(element, duration = 300) {
    element.style.opacity = 0;
    element.style.display = 'block';

    const start = performance.now();

    function fade(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);

      element.style.opacity = progress;

      if (progress < 1) {
        requestAnimationFrame(fade);
      }
    }

    requestAnimationFrame(fade);
  },

  fadeOut(element, duration = 300) {
    const start = performance.now();
    const startOpacity = parseFloat(getComputedStyle(element).opacity);

    function fade(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);

      element.style.opacity = startOpacity * (1 - progress);

      if (progress < 1) {
        requestAnimationFrame(fade);
      } else {
        element.style.display = 'none';
      }
    }

    requestAnimationFrame(fade);
  },

  slideDown(element, duration = 300) {
    element.style.height = '0px';
    element.style.overflow = 'hidden';
    element.style.display = 'block';

    const targetHeight = element.scrollHeight;
    const start = performance.now();

    function slide(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);

      element.style.height = (targetHeight * progress) + 'px';

      if (progress < 1) {
        requestAnimationFrame(slide);
      } else {
        element.style.height = '';
        element.style.overflow = '';
      }
    }

    requestAnimationFrame(slide);
  }
};

/**
 * Initialize utility functions
 */
document.addEventListener('DOMContentLoaded', function () {
  // Initialize lazy loading
  if ('IntersectionObserver' in window) {
    lazyLoadImages();
    animateOnScroll();
  }

  // Measure page performance
  Performance.measurePageLoad();
});

// Export utilities for use in other files
window.Utils = {
  debounce,
  throttle,
  isInViewport,
  scrollToElement,
  getCSSVariable,
  setCSSVariable,
  formatDate,
  Storage,
  URLHelpers,
  Performance,
  Device,
  Animation
};