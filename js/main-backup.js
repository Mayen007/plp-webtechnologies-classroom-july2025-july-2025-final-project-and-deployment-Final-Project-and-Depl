/**
 * Lumina Gallery Website - Main JavaScript
 * Created: September 18, 2025
 * 
 * Main application logic and initialization
 */

/**
 * Initialize Navigation Components
 */
function initializeNavigation() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const header = document.querySelector('.header');

  // Enhanced Mobile Menu Toggle
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

  // Enhanced Navigation Highlighting
  initializeActiveNavigation();

  // Smooth scrolling for navigation links
  initializeSmoothScrolling();

  // Header scroll behavior
  initializeHeaderScrollBehavior();
}

/**
 * Open Mobile Menu with Animation
 */
function openMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

  if (mobileMenu && mobileMenuToggle) {
    mobileMenu.classList.add('active');
    mobileMenuToggle.classList.add('active');
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mobile-menu-open');

    // Focus management for accessibility
    const firstLink = mobileMenu.querySelector('.nav-link');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
  }
}

/**
 * Close Mobile Menu with Animation
 */
function closeMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

  if (mobileMenu && mobileMenuToggle) {
    mobileMenu.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-menu-open');
  }
}

/**
 * Initialize Enhanced Active Navigation
 */
function initializeActiveNavigation() {
  highlightActiveNavItem();

  // Add hover effects and interaction feedback
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function () {
      this.classList.add('nav-hover');
    });

    link.addEventListener('mouseleave', function () {
      this.classList.remove('nav-hover');
    });

    // Add click ripple effect
    link.addEventListener('click', function (e) {
      createRippleEffect(this, e);
    });
  });
}

/**
 * Initialize Smooth Scrolling for Navigation
 */
function initializeSmoothScrolling() {
  // Smooth scrolling for internal page navigation
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Update URL without triggering scroll
        history.pushState(null, null, '#' + targetId);
      }
    });
  });
}

/**
 * Initialize Header Scroll Behavior
 */
function initializeHeaderScrollBehavior() {
  const header = document.querySelector('.header');
  let lastScrollTop = 0;
  let ticking = false;

  function updateHeaderOnScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove scrolled class for styling
    if (scrollTop > 100) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    // Optional: Hide/show header on scroll (commented out for now)
    // if (scrollTop > lastScrollTop && scrollTop > 200) {
    //   header.classList.add('header-hidden');
    // } else {
    //   header.classList.remove('header-hidden');
    // }

    lastScrollTop = scrollTop;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateHeaderOnScroll);
      ticking = true;
    }
  });
}

/**
 * Create Ripple Effect for Navigation Links
 */
function createRippleEffect(element, event) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('nav-ripple');

  element.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

/**
 * Initialize Gallery Components
 */
/**
 * Enhanced Gallery Initialization with Interactive Features
 */
function initializeGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Initialize enhanced gallery interactions
  initializeGalleryInteractions(galleryItems);

  // Initialize enhanced gallery filters
  initializeGalleryFiltersEnhanced();

  // Initialize gallery animations
  initializeGalleryAnimations();

  // Initialize gallery keyboard navigation
  initializeGalleryKeyboardNavigation();

  // Initialize gallery lazy loading
  initializeGalleryLazyLoading();
}

/**
 * Initialize Enhanced Gallery Interactions
 */
function initializeGalleryInteractions(galleryItems) {
  galleryItems.forEach((item, index) => {
    // Add hover effects
    item.addEventListener('mouseenter', function () {
      this.classList.add('gallery-hover');

      // Show enhanced overlay with animations
      const overlay = this.querySelector('.gallery-overlay');
      if (overlay) {
        overlay.classList.add('visible');
      }
    });

    item.addEventListener('mouseleave', function () {
      this.classList.remove('gallery-hover');

      const overlay = this.querySelector('.gallery-overlay');
      if (overlay) {
        overlay.classList.remove('visible');
      }
    });

    // Enhanced click handling with lightbox
    item.addEventListener('click', function (e) {
      e.preventDefault();

      const imageUrl = this.querySelector('.gallery-image').src;
      const title = this.querySelector('.gallery-title')?.textContent || '';
      const artist = this.querySelector('.gallery-artist')?.textContent || '';
      const meta = this.querySelector('.gallery-meta')?.textContent || '';
      const price = this.querySelector('.gallery-price')?.textContent || '';

      openEnhancedLightbox({
        imageUrl,
        title,
        artist,
        meta,
        price,
        index,
        galleryItems
      });
    });

    // Add keyboard accessibility
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View artwork: ${item.querySelector('.gallery-title')?.textContent || 'Untitled'}`);

    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });

    // Add touch interaction for mobile
    let touchStartTime = 0;

    item.addEventListener('touchstart', function (e) {
      touchStartTime = Date.now();
      this.classList.add('gallery-touch');
    });

    item.addEventListener('touchend', function (e) {
      const touchDuration = Date.now() - touchStartTime;
      this.classList.remove('gallery-touch');

      // Only trigger if it's a quick tap
      if (touchDuration < 300) {
        this.click();
      }
    });
  });
}

/**
 * Enhanced Gallery Filters with Smooth Animations
 */
function initializeGalleryFiltersEnhanced() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryGrid = document.querySelector('.gallery-grid');

  if (!filterButtons.length || !galleryItems.length) return;

  // Add counter to filter buttons
  updateFilterCounts(filterButtons, galleryItems);

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');

      // Update active state with animation
      updateActiveFilter(filterButtons, this);

      // Filter items with smooth animation
      filterGalleryItems(galleryItems, filter, galleryGrid);

      // Update URL without page reload
      updateFilterURL(filter);
    });
  });

  // Initialize from URL parameter
  initializeFromURL(filterButtons, galleryItems, galleryGrid);
}

/**
 * Update Filter Counts
 */
function updateFilterCounts(filterButtons, galleryItems) {
  filterButtons.forEach(button => {
    const filter = button.getAttribute('data-filter');
    let count = 0;

    if (filter === 'all') {
      count = galleryItems.length;
    } else {
      count = Array.from(galleryItems).filter(item =>
        item.getAttribute('data-category') === filter
      ).length;
    }

    // Add count to button text
    const originalText = button.textContent;
    if (!originalText.includes('(')) {
      button.innerHTML = `${originalText} <span class="filter-count">(${count})</span>`;
    }
  });
}

/**
 * Update Active Filter with Animation
 */
function updateActiveFilter(filterButtons, activeButton) {
  filterButtons.forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });

  activeButton.classList.add('active');
  activeButton.setAttribute('aria-selected', 'true');

  // Add ripple effect
  createFilterRipple(activeButton);
}

/**
 * Filter Gallery Items with Animation
 */
function filterGalleryItems(galleryItems, filter, galleryGrid) {
  // Add loading state
  galleryGrid.classList.add('filtering');

  // First, fade out items that will be hidden
  const itemsToHide = [];
  const itemsToShow = [];

  galleryItems.forEach(item => {
    const itemCategory = item.getAttribute('data-category');
    const shouldShow = filter === 'all' || itemCategory === filter;

    if (shouldShow) {
      itemsToShow.push(item);
    } else {
      itemsToHide.push(item);
    }
  });

  // Animate out hidden items
  itemsToHide.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = '0';
      item.style.transform = 'scale(0.8)';

      setTimeout(() => {
        item.style.display = 'none';
      }, 200);
    }, index * 30);
  });

  // Wait for hide animation, then show new items
  setTimeout(() => {
    itemsToShow.forEach((item, index) => {
      item.style.display = 'block';
      item.style.opacity = '0';
      item.style.transform = 'scale(0.8)';

      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      }, index * 50 + 100);
    });

    // Remove loading state
    setTimeout(() => {
      galleryGrid.classList.remove('filtering');
    }, (itemsToShow.length * 50) + 300);
  }, Math.max(itemsToHide.length * 30, 200));
}

/**
 * Create Filter Ripple Effect
 */
function createFilterRipple(button) {
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);

  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = '50%';
  ripple.style.top = '50%';
  ripple.style.transform = 'translate(-50%, -50%) scale(0)';
  ripple.classList.add('filter-ripple');

  button.appendChild(ripple);

  // Trigger animation
  setTimeout(() => {
    ripple.style.transform = 'translate(-50%, -50%) scale(1)';
    ripple.style.opacity = '0';
  }, 10);

  // Remove after animation
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

/**
 * Update URL with Filter Parameter
 */
function updateFilterURL(filter) {
  const url = new URL(window.location);

  if (filter === 'all') {
    url.searchParams.delete('filter');
  } else {
    url.searchParams.set('filter', filter);
  }

  window.history.replaceState({}, '', url);
}

/**
 * Initialize from URL Parameter
 */
function initializeFromURL(filterButtons, galleryItems, galleryGrid) {
  const urlParams = new URLSearchParams(window.location.search);
  const urlFilter = urlParams.get('filter');

  if (urlFilter) {
    const targetButton = Array.from(filterButtons).find(btn =>
      btn.getAttribute('data-filter') === urlFilter
    );

    if (targetButton) {
      // Remove default active state
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Activate URL filter
      targetButton.classList.add('active');
      filterGalleryItems(galleryItems, urlFilter, galleryGrid);
    }
  }
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
          // Move to next row (assuming 3 columns)
          targetIndex = Math.min(index + 3, galleryItems.length - 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          // Move to previous row
          targetIndex = Math.max(index - 3, 0);
          break;
      }

      if (targetIndex !== -1) {
        galleryItems[targetIndex].focus();
      }
    });
  });
}

/**
 * Enhanced Lightbox for Gallery Images
 */
function openEnhancedLightbox(artworkData) {
  const { imageUrl, title, artist, meta, price, index, galleryItems } = artworkData;

  // Create or get lightbox
  let lightbox = document.getElementById('enhanced-lightbox');
  if (!lightbox) {
    lightbox = createEnhancedLightbox();
    document.body.appendChild(lightbox);
  }

  // Update lightbox content
  updateLightboxContent(lightbox, artworkData);

  // Show lightbox with animation
  showLightbox(lightbox);

  // Initialize lightbox navigation
  initializeLightboxNavigation(lightbox, index, galleryItems);
}

/**
 * Create Enhanced Lightbox Element
 */
function createEnhancedLightbox() {
  const lightbox = document.createElement('div');
  lightbox.id = 'enhanced-lightbox';
  lightbox.className = 'enhanced-lightbox';

  lightbox.innerHTML = `
    <div class="lightbox-overlay">
      <div class="lightbox-container">
        <button class="lightbox-close" aria-label="Close lightbox">
          <span>&times;</span>
        </button>
        
        <button class="lightbox-nav lightbox-prev" aria-label="Previous image">
          <span>‹</span>
        </button>
        
        <button class="lightbox-nav lightbox-next" aria-label="Next image">
          <span>›</span>
        </button>
        
        <div class="lightbox-content">
          <div class="lightbox-image-container">
            <img class="lightbox-image" src="" alt="" />
            <div class="lightbox-loading">
              <div class="loading-spinner"></div>
            </div>
          </div>
          
          <div class="lightbox-info">
            <div class="lightbox-details">
              <h2 class="lightbox-title"></h2>
              <p class="lightbox-artist"></p>
              <p class="lightbox-meta"></p>
              <p class="lightbox-price"></p>
            </div>
            
            <div class="lightbox-actions">
              <button class="btn btn-primary lightbox-inquiry">
                Inquire About This Piece
              </button>
              <button class="btn btn-secondary lightbox-share">
                Share
              </button>
            </div>
          </div>
        </div>
        
        <div class="lightbox-counter">
          <span class="current-index">1</span> / <span class="total-count">1</span>
        </div>
      </div>
    </div>
  `;

  // Add event listeners
  setupLightboxEvents(lightbox);

  return lightbox;
}

/**
 * Setup Lightbox Event Listeners
 */
function setupLightboxEvents(lightbox) {
  const closeButton = lightbox.querySelector('.lightbox-close');
  const overlay = lightbox.querySelector('.lightbox-overlay');
  const prevButton = lightbox.querySelector('.lightbox-prev');
  const nextButton = lightbox.querySelector('.lightbox-next');
  const inquiryButton = lightbox.querySelector('.lightbox-inquiry');
  const shareButton = lightbox.querySelector('.lightbox-share');

  // Close events
  closeButton.addEventListener('click', () => closeLightbox(lightbox));

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      closeLightbox(lightbox);
    }
  });

  // Navigation events (will be set up dynamically)
  prevButton.addEventListener('click', () => navigateLightbox('prev'));
  nextButton.addEventListener('click', () => navigateLightbox('next'));

  // Action events
  inquiryButton.addEventListener('click', handleArtworkInquiry);
  shareButton.addEventListener('click', handleArtworkShare);

  // Keyboard events
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox(lightbox);
        break;
      case 'ArrowLeft':
        navigateLightbox('prev');
        break;
      case 'ArrowRight':
        navigateLightbox('next');
        break;
    }
  });

  // Touch/swipe events for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
  });

  function handleSwipeGesture() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        navigateLightbox('prev');
      } else {
        navigateLightbox('next');
      }
    }
  }
}

/**
 * Update Lightbox Content
 */
function updateLightboxContent(lightbox, artworkData) {
  const { imageUrl, title, artist, meta, price } = artworkData;

  const image = lightbox.querySelector('.lightbox-image');
  const titleElement = lightbox.querySelector('.lightbox-title');
  const artistElement = lightbox.querySelector('.lightbox-artist');
  const metaElement = lightbox.querySelector('.lightbox-meta');
  const priceElement = lightbox.querySelector('.lightbox-price');
  const loading = lightbox.querySelector('.lightbox-loading');

  // Show loading state
  loading.style.display = 'flex';
  image.style.opacity = '0';

  // Load image
  const newImage = new Image();
  newImage.onload = function () {
    image.src = this.src;
    image.alt = `${title} by ${artist}`;
    image.style.opacity = '1';
    loading.style.display = 'none';
  };
  newImage.src = imageUrl;

  // Update text content
  titleElement.textContent = title || 'Untitled';
  artistElement.textContent = artist ? `by ${artist}` : '';
  metaElement.textContent = meta || '';
  priceElement.textContent = price || '';

  // Update page title
  document.title = `${title} by ${artist} - Lumina Gallery`;
}

/**
 * Show Lightbox with Animation
 */
function showLightbox(lightbox) {
  lightbox.classList.add('active');
  document.body.classList.add('lightbox-open');

  // Focus management for accessibility
  setTimeout(() => {
    const closeButton = lightbox.querySelector('.lightbox-close');
    closeButton.focus();
  }, 100);
}

/**
 * Close Lightbox with Animation
 */
function closeLightbox(lightbox) {
  lightbox.classList.remove('active');
  document.body.classList.remove('lightbox-open');

  // Restore page title
  document.title = 'Lumina Gallery - Contemporary Art & Creative Expression';

  // Clear navigation data
  lightbox.currentIndex = null;
  lightbox.galleryItems = null;
}

/**
 * Initialize Lightbox Navigation
 */
function initializeLightboxNavigation(lightbox, currentIndex, galleryItems) {
  lightbox.currentIndex = currentIndex;
  lightbox.galleryItems = galleryItems;

  const currentElement = lightbox.querySelector('.current-index');
  const totalElement = lightbox.querySelector('.total-count');
  const prevButton = lightbox.querySelector('.lightbox-prev');
  const nextButton = lightbox.querySelector('.lightbox-next');

  // Update counter
  currentElement.textContent = currentIndex + 1;
  totalElement.textContent = galleryItems.length;

  // Show/hide navigation buttons
  prevButton.style.display = currentIndex > 0 ? 'flex' : 'none';
  nextButton.style.display = currentIndex < galleryItems.length - 1 ? 'flex' : 'none';
}

/**
 * Navigate Lightbox
 */
function navigateLightbox(direction) {
  const lightbox = document.getElementById('enhanced-lightbox');
  if (!lightbox || !lightbox.galleryItems) return;

  const currentIndex = lightbox.currentIndex;
  const galleryItems = lightbox.galleryItems;
  let newIndex = currentIndex;

  if (direction === 'next' && currentIndex < galleryItems.length - 1) {
    newIndex = currentIndex + 1;
  } else if (direction === 'prev' && currentIndex > 0) {
    newIndex = currentIndex - 1;
  } else {
    return; // No navigation possible
  }

  // Get new artwork data
  const newItem = galleryItems[newIndex];
  const newArtworkData = {
    imageUrl: newItem.querySelector('.gallery-image').src,
    title: newItem.querySelector('.gallery-title')?.textContent || '',
    artist: newItem.querySelector('.gallery-artist')?.textContent || '',
    meta: newItem.querySelector('.gallery-meta')?.textContent || '',
    price: newItem.querySelector('.gallery-price')?.textContent || '',
    index: newIndex,
    galleryItems: galleryItems
  };

  // Update lightbox
  updateLightboxContent(lightbox, newArtworkData);
  initializeLightboxNavigation(lightbox, newIndex, galleryItems);
}

/**
 * Handle Artwork Inquiry
 */
function handleArtworkInquiry() {
  const lightbox = document.getElementById('enhanced-lightbox');
  const title = lightbox.querySelector('.lightbox-title').textContent;
  const artist = lightbox.querySelector('.lightbox-artist').textContent;

  // Close lightbox
  closeLightbox(lightbox);

  // Navigate to contact page with pre-filled inquiry
  const contactUrl = new URL('/pages/contact.html', window.location.href);
  contactUrl.searchParams.set('inquiry', 'artwork-purchase');
  contactUrl.searchParams.set('artwork', `${title} ${artist}`.trim());

  window.location.href = contactUrl.toString();
}

/**
 * Handle Artwork Share
 */
function handleArtworkShare() {
  const lightbox = document.getElementById('enhanced-lightbox');
  const title = lightbox.querySelector('.lightbox-title').textContent;
  const artist = lightbox.querySelector('.lightbox-artist').textContent;

  const shareData = {
    title: `${title} by ${artist} - Lumina Gallery`,
    text: `Check out this beautiful artwork: ${title} by ${artist}`,
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData);
  } else {
    // Fallback: copy to clipboard
    const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
    navigator.clipboard.writeText(shareText).then(() => {
      // Show temporary notification
      showTemporaryNotification('Link copied to clipboard!');
    });
  }
}

/**
 * Show Temporary Notification
 */
function showTemporaryNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'temporary-notification';
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('visible');
  }, 10);

  setTimeout(() => {
    notification.classList.remove('visible');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 2000);
}

/* ===== FAQ ACCORDION FUNCTIONALITY ===== */

/**
 * Initialize FAQ Accordion
 */
function initializeFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  if (!faqItems.length) return;

  faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (!question || !answer) return;

    // Set initial ARIA attributes
    const questionId = `faq-question-${index}`;
    const answerId = `faq-answer-${index}`;

    question.setAttribute('id', questionId);
    question.setAttribute('aria-controls', answerId);
    answer.setAttribute('id', answerId);
    answer.setAttribute('aria-labelledby', questionId);
    answer.setAttribute('role', 'region');

    // Set initial state
    answer.style.maxHeight = '0';
    answer.style.overflow = 'hidden';
    answer.style.transition = 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease';

    // Add click handler
    question.addEventListener('click', function () {
      toggleFAQItem(item, question, answer, icon);
    });

    // Add keyboard support
    question.addEventListener('keydown', function (e) {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          toggleFAQItem(item, question, answer, icon);
          break;
        case 'ArrowDown':
          e.preventDefault();
          focusNextFAQ(faqItems, index);
          break;
        case 'ArrowUp':
          e.preventDefault();
          focusPrevFAQ(faqItems, index);
          break;
        case 'Home':
          e.preventDefault();
          faqItems[0].querySelector('.faq-question').focus();
          break;
        case 'End':
          e.preventDefault();
          faqItems[faqItems.length - 1].querySelector('.faq-question').focus();
          break;
      }
    });

    // Add hover effects
    question.addEventListener('mouseenter', function () {
      this.classList.add('faq-hover');
    });

    question.addEventListener('mouseleave', function () {
      this.classList.remove('faq-hover');
    });
  });

  // Initialize from URL hash if present
  initializeFAQFromURL(faqItems);
}

/**
 * Toggle FAQ Item
 */
function toggleFAQItem(item, question, answer, icon) {
  const isExpanded = question.getAttribute('aria-expanded') === 'true';
  const faqItems = document.querySelectorAll('.faq-item');

  // Close all other items if this is being opened (accordion behavior)
  if (!isExpanded) {
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        closeFAQItem(otherItem);
      }
    });
  }

  if (isExpanded) {
    closeFAQItem(item);
  } else {
    openFAQItem(item);
  }

  // Update URL with current FAQ
  updateFAQURL(item, !isExpanded);
}

/**
 * Open FAQ Item
 */
function openFAQItem(item) {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  const icon = item.querySelector('.faq-icon');

  // Update ARIA state
  question.setAttribute('aria-expanded', 'true');

  // Add active class
  item.classList.add('faq-active');
  question.classList.add('faq-question-active');

  // Animate icon
  if (icon) {
    icon.textContent = '−';
    icon.style.transform = 'rotate(180deg)';
  }

  // Measure and animate answer
  const contentHeight = answer.scrollHeight;
  answer.style.maxHeight = contentHeight + 'px';
  answer.style.paddingTop = '1rem';
  answer.style.paddingBottom = '1rem';

  // Add ripple effect
  createFAQRipple(question);

  // Scroll into view if needed
  setTimeout(() => {
    const rect = item.getBoundingClientRect();
    const headerHeight = document.querySelector('.header').offsetHeight;

    if (rect.bottom > window.innerHeight) {
      const scrollTop = window.pageYOffset + rect.top - headerHeight - 20;
      window.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
  }, 150);
}

/**
 * Close FAQ Item
 */
function closeFAQItem(item) {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  const icon = item.querySelector('.faq-icon');

  // Update ARIA state
  question.setAttribute('aria-expanded', 'false');

  // Remove active classes
  item.classList.remove('faq-active');
  question.classList.remove('faq-question-active');

  // Animate icon
  if (icon) {
    icon.textContent = '+';
    icon.style.transform = 'rotate(0deg)';
  }

  // Animate answer closed
  answer.style.maxHeight = '0';
  answer.style.paddingTop = '0';
  answer.style.paddingBottom = '0';
}

/**
 * Focus Navigation for FAQ
 */
function focusNextFAQ(faqItems, currentIndex) {
  const nextIndex = (currentIndex + 1) % faqItems.length;
  faqItems[nextIndex].querySelector('.faq-question').focus();
}

function focusPrevFAQ(faqItems, currentIndex) {
  const prevIndex = (currentIndex - 1 + faqItems.length) % faqItems.length;
  faqItems[prevIndex].querySelector('.faq-question').focus();
}

/**
 * Create FAQ Ripple Effect
 */
function createFAQRipple(button) {
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);

  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = '50%';
  ripple.style.top = '50%';
  ripple.style.transform = 'translate(-50%, -50%) scale(0)';
  ripple.classList.add('faq-ripple');

  button.appendChild(ripple);

  // Trigger animation
  setTimeout(() => {
    ripple.style.transform = 'translate(-50%, -50%) scale(1)';
    ripple.style.opacity = '0';
  }, 10);

  // Remove after animation
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

/**
 * Update URL with FAQ state
 */
function updateFAQURL(item, isOpen) {
  const question = item.querySelector('.faq-question');
  const questionText = question.textContent.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  const url = new URL(window.location);

  if (isOpen) {
    url.hash = `faq-${questionText}`;
  } else {
    url.hash = '';
  }

  window.history.replaceState({}, '', url);
}

/**
 * Initialize FAQ from URL
 */
function initializeFAQFromURL(faqItems) {
  const hash = window.location.hash;

  if (hash.startsWith('#faq-')) {
    const questionText = hash.substring(5);

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const itemText = question.textContent.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();

      if (itemText === questionText) {
        setTimeout(() => {
          openFAQItem(item);
          question.focus();
        }, 500);
      }
    });
  }
}

/**
 * Enhanced FAQ Search (Optional Feature)
 */
function initializeFAQSearch() {
  const faqSection = document.querySelector('.faq-section');
  if (!faqSection) return;

  // Create search input
  const searchContainer = document.createElement('div');
  searchContainer.className = 'faq-search-container';
  searchContainer.innerHTML = `
    <div class="faq-search-wrapper">
      <input 
        type="text" 
        class="faq-search-input" 
        placeholder="Search frequently asked questions..."
        aria-label="Search FAQ"
      >
      <button class="faq-search-clear" aria-label="Clear search">×</button>
    </div>
    <div class="faq-search-results">
      <span class="faq-results-count"></span>
    </div>
  `;

  // Insert before FAQ list
  const faqList = faqSection.querySelector('.faq-list');
  faqList.parentNode.insertBefore(searchContainer, faqList);

  // Add search functionality
  const searchInput = searchContainer.querySelector('.faq-search-input');
  const clearButton = searchContainer.querySelector('.faq-search-clear');
  const resultsCount = searchContainer.querySelector('.faq-results-count');
  const faqItems = faqSection.querySelectorAll('.faq-item');

  let searchTimeout;

  searchInput.addEventListener('input', function () {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      performFAQSearch(this.value, faqItems, resultsCount);
    }, 200);
  });

  clearButton.addEventListener('click', function () {
    searchInput.value = '';
    performFAQSearch('', faqItems, resultsCount);
    searchInput.focus();
  });
}

/**
 * Perform FAQ Search
 */
function performFAQSearch(query, faqItems, resultsCount) {
  const searchTerm = query.toLowerCase().trim();
  let visibleCount = 0;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question').textContent.toLowerCase();
    const answer = item.querySelector('.faq-answer').textContent.toLowerCase();

    const isMatch = question.includes(searchTerm) || answer.includes(searchTerm);

    if (isMatch || searchTerm === '') {
      item.style.display = 'block';
      visibleCount++;

      // Highlight search terms
      if (searchTerm) {
        highlightSearchTerms(item, searchTerm);
      } else {
        removeHighlights(item);
      }
    } else {
      item.style.display = 'none';
      closeFAQItem(item);
    }
  });

  // Update results count
  if (searchTerm) {
    resultsCount.textContent = `${visibleCount} result${visibleCount !== 1 ? 's' : ''} found`;
  } else {
    resultsCount.textContent = '';
  }
}

/**
 * Highlight Search Terms
 */
function highlightSearchTerms(item, searchTerm) {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  [question, answer].forEach(element => {
    const originalText = element.dataset.originalText || element.innerHTML;
    element.dataset.originalText = originalText;

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    element.innerHTML = originalText.replace(regex, '<mark class="faq-highlight">$1</mark>');
  });
}

/**
 * Remove Highlights
 */
function removeHighlights(item) {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  [question, answer].forEach(element => {
    if (element.dataset.originalText) {
      element.innerHTML = element.dataset.originalText;
      delete element.dataset.originalText;
    }
  });
}

/**
 * Initialize Form Components
 */
/**
 * Enhanced Form Initialization with Comprehensive Validation
 */
function initializeForms() {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    // Initialize form validation
    initializeFormValidation(contactForm);

    // Handle form submission
    contactForm.addEventListener('submit', handleContactFormSubmit);

    // Initialize real-time validation
    initializeRealTimeValidation(contactForm);

    // Initialize form enhancement features
    initializeFormEnhancements(contactForm);
  }
}

/**
 * Initialize Form Validation System
 */
function initializeFormValidation(form) {
  const formFields = form.querySelectorAll('.form-input, .form-textarea, .form-select');

  formFields.forEach(field => {
    // Add validation attributes
    setupFieldValidation(field);

    // Add event listeners for validation
    field.addEventListener('blur', function () {
      validateFieldEnhanced(this);
    });

    field.addEventListener('input', function () {
      // Clear errors on input if field was previously invalid
      if (this.classList.contains('field-invalid')) {
        clearFieldValidation(this);
      }
    });
  });
}

/**
 * Setup Field Validation Attributes and Structure
 */
function setupFieldValidation(field) {
  const fieldGroup = field.closest('.form-group');
  if (!fieldGroup) return;

  // Create validation container if it doesn't exist
  let validationContainer = fieldGroup.querySelector('.field-validation');
  if (!validationContainer) {
    validationContainer = document.createElement('div');
    validationContainer.className = 'field-validation';
    fieldGroup.appendChild(validationContainer);
  }

  // Add success indicator container
  let successIndicator = fieldGroup.querySelector('.field-success');
  if (!successIndicator) {
    successIndicator = document.createElement('div');
    successIndicator.className = 'field-success';
    successIndicator.innerHTML = '<span class="success-icon">✓</span>';
    fieldGroup.appendChild(successIndicator);
  }

  // Add character counter for text fields with maxlength
  if ((field.type === 'text' || field.type === 'textarea') && field.maxLength > 0) {
    let charCounter = fieldGroup.querySelector('.character-counter');
    if (!charCounter) {
      charCounter = document.createElement('div');
      charCounter.className = 'character-counter';
      fieldGroup.appendChild(charCounter);
      updateCharacterCounter(field, charCounter);

      // Update counter on input
      field.addEventListener('input', () => updateCharacterCounter(field, charCounter));
    }
  }

  // Set up ARIA attributes
  const fieldId = field.id || `field-${Math.random().toString(36).substr(2, 9)}`;
  field.id = fieldId;

  // Link field to validation messages
  field.setAttribute('aria-describedby', `${fieldId}-validation ${fieldId}-help`);
}

/**
 * Update Character Counter for Text Fields
 */
function updateCharacterCounter(field, counter) {
  const current = field.value.length;
  const max = field.maxLength;
  const remaining = max - current;

  counter.textContent = `${current}/${max}`;

  // Add warning class when approaching limit
  if (remaining <= 10) {
    counter.classList.add('warning');
  } else {
    counter.classList.remove('warning');
  }
}

/**
 * Initialize Real-Time Validation
 */
function initializeRealTimeValidation(form) {
  const formFields = form.querySelectorAll('.form-input, .form-textarea, .form-select');

  formFields.forEach(field => {
    let validationTimeout;

    field.addEventListener('input', function () {
      clearTimeout(validationTimeout);

      // Debounce validation for better performance
      validationTimeout = setTimeout(() => {
        if (this.value.trim().length > 0) {
          validateFieldEnhanced(this, false); // Silent validation
        }
      }, 300);
    });

    // Immediate validation on certain triggers
    if (field.type === 'email') {
      field.addEventListener('paste', function () {
        setTimeout(() => validateFieldEnhanced(this), 100);
      });
    }
  });
}

/**
 * Initialize Form Enhancement Features
 */
function initializeFormEnhancements(form) {
  // Add form progress indicator
  createFormProgressIndicator(form);

  // Initialize character counter for textarea
  initializeCharacterCounter(form);

  // Initialize form autosave (optional)
  initializeFormAutosave(form);

  // Add form accessibility enhancements
  enhanceFormAccessibility(form);
}

/**
 * Enhanced Field Validation
 */
function validateFieldEnhanced(field, showErrors = true) {
  const value = field.value.trim();
  const fieldName = field.name;
  let isValid = true;
  let errorMessage = '';
  let fieldType = field.type || 'text';

  // Clear previous validation state
  if (showErrors) {
    clearFieldValidation(field);
  }

  // Required field validation
  if (field.hasAttribute('required') && !value) {
    errorMessage = getRequiredFieldMessage(fieldName);
    isValid = false;
  }
  // Field-specific validation
  else if (value) {
    switch (fieldType) {
      case 'email':
        const emailValidation = validateEmailField(value);
        if (!emailValidation.isValid) {
          errorMessage = emailValidation.message;
          isValid = false;
        }
        break;

      case 'tel':
        const phoneValidation = validatePhoneField(value);
        if (!phoneValidation.isValid) {
          errorMessage = phoneValidation.message;
          isValid = false;
        }
        break;

      case 'text':
        if (fieldName === 'name') {
          const nameValidation = validateNameField(value);
          if (!nameValidation.isValid) {
            errorMessage = nameValidation.message;
            isValid = false;
          }
        }
        break;
    }

    // Textarea validation
    if (field.tagName.toLowerCase() === 'textarea') {
      const textareaValidation = validateTextareaField(field, value);
      if (!textareaValidation.isValid) {
        errorMessage = textareaValidation.message;
        isValid = false;
      }
    }

    // Select validation
    if (field.tagName.toLowerCase() === 'select') {
      const selectValidation = validateSelectField(value);
      if (!selectValidation.isValid) {
        errorMessage = selectValidation.message;
        isValid = false;
      }
    }
  }

  // Update field state
  if (showErrors) {
    if (isValid) {
      setFieldValid(field);
    } else {
      setFieldInvalid(field, errorMessage);
    }
  }

  // Update form progress
  updateFormProgress();

  return isValid;
}

/**
 * Specific Validation Functions
 */
function validateEmailField(email) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address (e.g., name@example.com)'
    };
  }

  return { isValid: true };
}

function validatePhoneField(phone) {
  // Remove all non-numeric characters for validation
  const cleanPhone = phone.replace(/[^\d]/g, '');

  if (cleanPhone.length < 10 || cleanPhone.length > 15) {
    return {
      isValid: false,
      message: 'Please enter a valid phone number (10-15 digits)'
    };
  }

  return { isValid: true };
}

function validateNameField(name) {
  if (name.length < 2) {
    return {
      isValid: false,
      message: 'Name must be at least 2 characters long'
    };
  }

  if (name.length > 50) {
    return {
      isValid: false,
      message: 'Name must be less than 50 characters'
    };
  }

  // Check for valid name characters
  const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
  if (!nameRegex.test(name)) {
    return {
      isValid: false,
      message: 'Name can only contain letters, spaces, hyphens, and apostrophes'
    };
  }

  return { isValid: true };
}

function validateTextareaField(field, value) {
  const minLength = field.getAttribute('minlength') || 10;
  const maxLength = field.getAttribute('maxlength') || 1000;

  if (value.length < minLength) {
    return {
      isValid: false,
      message: `Message must be at least ${minLength} characters long`
    };
  }

  if (value.length > maxLength) {
    return {
      isValid: false,
      message: `Message must be less than ${maxLength} characters`
    };
  }

  return { isValid: true };
}

function validateSelectField(value) {
  if (!value || value === '') {
    return {
      isValid: false,
      message: 'Please select an option'
    };
  }

  return { isValid: true };
}

/**
 * Validation State Management
 */
function setFieldValid(field) {
  field.classList.remove('field-invalid');
  field.classList.add('field-valid');

  // Update ARIA attributes
  field.setAttribute('aria-invalid', 'false');

  // Clear error message
  const errorElement = field.parentNode.querySelector('.form-error');
  if (errorElement) {
    errorElement.remove();
  }

  // Show success indicator
  showFieldSuccess(field);
}

function setFieldInvalid(field, errorMessage) {
  field.classList.remove('field-valid');
  field.classList.add('field-invalid');

  // Update ARIA attributes
  field.setAttribute('aria-invalid', 'true');

  // Clear any existing error
  const existingError = field.parentNode.querySelector('.form-error');
  if (existingError) {
    existingError.remove();
  }

  // Show error message
  showFieldError(field, errorMessage);
}

function clearFieldValidation(field) {
  field.classList.remove('field-valid', 'field-invalid');
  field.removeAttribute('aria-invalid');

  const errorElement = field.parentNode.querySelector('.form-error');
  if (errorElement) {
    errorElement.remove();
  }

  const successElement = field.parentNode.querySelector('.field-success');
  if (successElement) {
    successElement.remove();
  }
}

/**
 * Enhanced Error and Success Display
 */
function showFieldError(field, message) {
  const errorElement = document.createElement('div');
  errorElement.className = 'form-error';
  errorElement.setAttribute('role', 'alert');
  errorElement.innerHTML = `<span class="error-icon">⚠</span> ${message}`;

  field.parentNode.appendChild(errorElement);

  // Smooth animation
  setTimeout(() => {
    errorElement.classList.add('visible');
  }, 10);
}

function showFieldSuccess(field) {
  // Only show success for required fields
  if (!field.hasAttribute('required')) return;

  const successElement = document.createElement('div');
  successElement.className = 'field-success';
  successElement.innerHTML = `<span class="success-icon">✓</span>`;

  field.parentNode.appendChild(successElement);

  setTimeout(() => {
    successElement.classList.add('visible');
  }, 10);
}

/**
 * Form Progress Indicator
 */
function createFormProgressIndicator(form) {
  const progressContainer = document.createElement('div');
  progressContainer.className = 'form-progress-container';
  progressContainer.innerHTML = `
    <div class="form-progress-bar">
      <div class="form-progress-fill" style="width: 0%"></div>
    </div>
    <div class="form-progress-text">Complete the form to send your message</div>
  `;

  form.insertBefore(progressContainer, form.firstChild);
}

function updateFormProgress() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const requiredFields = form.querySelectorAll('[required]');
  const validFields = form.querySelectorAll('.field-valid[required]');

  const progress = (validFields.length / requiredFields.length) * 100;
  const progressFill = form.querySelector('.form-progress-fill');
  const progressText = form.querySelector('.form-progress-text');

  if (progressFill) {
    progressFill.style.width = `${progress}%`;
  }

  if (progressText) {
    if (progress === 100) {
      progressText.textContent = 'Ready to send your message! ✓';
      progressText.classList.add('complete');
    } else {
      progressText.textContent = `Complete the form to send your message (${Math.round(progress)}%)`;
      progressText.classList.remove('complete');
    }
  }
}

/**
 * Character Counter for Textarea
 */
function initializeCharacterCounter(form) {
  const textareas = form.querySelectorAll('textarea[maxlength]');

  textareas.forEach(textarea => {
    const maxLength = textarea.getAttribute('maxlength');
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.textContent = `0/${maxLength}`;

    textarea.parentNode.appendChild(counter);

    textarea.addEventListener('input', function () {
      const currentLength = this.value.length;
      counter.textContent = `${currentLength}/${maxLength}`;

      if (currentLength > maxLength * 0.9) {
        counter.classList.add('warning');
      } else {
        counter.classList.remove('warning');
      }
    });
  });
}

/**
 * Form Autosave (Optional)
 */
function initializeFormAutosave(form) {
  const fields = form.querySelectorAll('.form-input, .form-textarea');

  fields.forEach(field => {
    // Load saved data
    const savedValue = localStorage.getItem(`form_${field.name}`);
    if (savedValue && !field.value) {
      field.value = savedValue;
    }

    // Save data on input
    field.addEventListener('input', function () {
      localStorage.setItem(`form_${this.name}`, this.value);
    });
  });

  // Clear saved data on successful submission
  form.addEventListener('submit', function () {
    fields.forEach(field => {
      localStorage.removeItem(`form_${field.name}`);
    });
  });
}

/**
 * Enhanced Form Accessibility
 */
function enhanceFormAccessibility(form) {
  const fields = form.querySelectorAll('.form-input, .form-textarea, .form-select');

  fields.forEach(field => {
    // Ensure proper ARIA attributes
    const label = form.querySelector(`label[for="${field.id}"]`);
    if (label && !field.getAttribute('aria-labelledby')) {
      field.setAttribute('aria-labelledby', label.id || `label-${field.id}`);
    }

    // Add describedby for error messages
    const errorId = `${field.id}-error`;
    if (!field.getAttribute('aria-describedby')) {
      field.setAttribute('aria-describedby', errorId);
    }
  });
}

/**
 * Helper Functions
 */
function getRequiredFieldMessage(fieldName) {
  const fieldMessages = {
    'name': 'Please enter your full name',
    'email': 'Please enter your email address',
    'subject': 'Please select a subject for your inquiry',
    'message': 'Please enter your message'
  };

  return fieldMessages[fieldName] || `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
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
 * Enhanced Active Navigation Item Highlighting
 */
function highlightActiveNavItem() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    const linkPage = linkHref.split('/').pop();

    // Remove active class from all links first
    link.classList.remove('active');

    // Add active class to current page link
    if (linkPage === currentPage ||
      (currentPage === '' && linkPage === 'index.html') ||
      (currentPage === 'index.html' && linkPage === 'index.html')) {
      link.classList.add('active');

      // Add ARIA current attribute for accessibility
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  // Handle section-based highlighting for single-page sections
  if (window.location.hash) {
    const sectionId = window.location.hash.substring(1);
    const sectionLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (sectionLink) {
      // Remove active from page links
      navLinks.forEach(link => link.classList.remove('active'));
      sectionLink.classList.add('active');
      sectionLink.setAttribute('aria-current', 'location');
    }
  }
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
/**
 * Enhanced Contact Form Submission Handler
 */
function handleContactFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');

  // Comprehensive form validation
  if (!validateFormComprehensive(form)) {
    // Scroll to first error
    scrollToFirstError(form);
    return;
  }

  // Show loading state with enhanced UX
  setFormSubmissionState(form, 'loading');

  // Prepare form data
  const formData = prepareFormData(form);

  // Simulate form submission with realistic timing
  simulateFormSubmission(form, formData)
    .then(() => {
      // Success state
      setFormSubmissionState(form, 'success');
      showFormSuccessMessage(form);

      // Reset form after delay
      setTimeout(() => {
        resetFormState(form);
      }, 3000);
    })
    .catch((error) => {
      // Error state
      setFormSubmissionState(form, 'error');
      showFormErrorMessage(form, error.message);
    });
}

/**
 * Comprehensive Form Validation
 */
function validateFormComprehensive(form) {
  const allFields = form.querySelectorAll('.form-input, .form-textarea, .form-select');
  let isFormValid = true;
  const errors = [];

  // Validate each field
  allFields.forEach(field => {
    const isFieldValid = validateFieldEnhanced(field, true);
    if (!isFieldValid) {
      isFormValid = false;
      errors.push({
        field: field.name,
        message: field.parentNode.querySelector('.form-error')?.textContent || 'Invalid input'
      });
    }
  });

  // Additional form-level validations
  const emailField = form.querySelector('[name="email"]');
  const subjectField = form.querySelector('[name="subject"]');

  // Business logic validation
  if (emailField && subjectField) {
    if (subjectField.value === 'artist-inquiry' && !emailField.value.includes('@')) {
      errors.push({
        field: 'email',
        message: 'A valid email is required for artist inquiries'
      });
      isFormValid = false;
    }
  }

  // Update form progress
  updateFormProgress();

  return isFormValid;
}

/**
 * Form Submission State Management
 */
function setFormSubmissionState(form, state) {
  const submitButton = form.querySelector('button[type="submit"]');
  const progressContainer = form.querySelector('.form-progress-container');

  // Remove all state classes
  form.classList.remove('form-loading', 'form-success', 'form-error');

  switch (state) {
    case 'loading':
      form.classList.add('form-loading');
      submitButton.disabled = true;
      submitButton.innerHTML = `
        <span class="loading-spinner"></span>
        <span>Sending Message...</span>
      `;

      if (progressContainer) {
        progressContainer.innerHTML = `
          <div class="form-status loading">
            <span class="status-icon">📨</span>
            <span>Sending your message...</span>
          </div>
        `;
      }
      break;

    case 'success':
      form.classList.add('form-success');
      submitButton.innerHTML = `
        <span class="success-icon">✓</span>
        <span>Message Sent!</span>
      `;

      if (progressContainer) {
        progressContainer.innerHTML = `
          <div class="form-status success">
            <span class="status-icon">✅</span>
            <span>Your message has been sent successfully!</span>
          </div>
        `;
      }
      break;

    case 'error':
      form.classList.add('form-error');
      submitButton.disabled = false;
      submitButton.innerHTML = `
        <span class="error-icon">⚠</span>
        <span>Try Again</span>
      `;
      break;

    default:
      submitButton.disabled = false;
      submitButton.innerHTML = 'Send Message';

      if (progressContainer) {
        progressContainer.innerHTML = `
          <div class="form-progress-bar">
            <div class="form-progress-fill" style="width: 0%"></div>
          </div>
          <div class="form-progress-text">Complete the form to send your message</div>
        `;
      }
  }
}

/**
 * Prepare Form Data for Submission
 */
function prepareFormData(form) {
  const formData = new FormData(form);
  const data = {};

  // Convert FormData to regular object
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }

  // Add metadata
  data.timestamp = new Date().toISOString();
  data.userAgent = navigator.userAgent;
  data.referrer = document.referrer;

  return data;
}

/**
 * Simulate Form Submission
 */
function simulateFormSubmission(form, formData) {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    const submissionTime = Math.random() * 1000 + 1500; // 1.5-2.5 seconds

    setTimeout(() => {
      // Simulate success/failure based on some criteria
      const isSuccess = Math.random() > 0.1; // 90% success rate

      if (isSuccess) {
        console.log('Form submitted successfully:', formData);
        resolve(formData);
      } else {
        reject(new Error('Network error. Please try again.'));
      }
    }, submissionTime);
  });
}

/**
 * Show Success Message
 */
function showFormSuccessMessage(form) {
  const messageContainer = document.createElement('div');
  messageContainer.className = 'form-success-message';
  messageContainer.innerHTML = `
    <div class="success-content">
      <h3>Thank You!</h3>
      <p>Your message has been sent successfully. We'll get back to you within 24 hours.</p>
      <div class="success-actions">
        <button type="button" class="btn btn-secondary" onclick="this.parentElement.parentElement.parentElement.remove()">
          Close
        </button>
      </div>
    </div>
  `;

  form.appendChild(messageContainer);

  // Animate in
  setTimeout(() => {
    messageContainer.classList.add('visible');
  }, 100);
}

/**
 * Show Error Message
 */
function showFormErrorMessage(form, errorMessage) {
  const messageContainer = document.createElement('div');
  messageContainer.className = 'form-error-message';
  messageContainer.innerHTML = `
    <div class="error-content">
      <h3>Submission Failed</h3>
      <p>${errorMessage}</p>
      <div class="error-actions">
        <button type="button" class="btn btn-primary" onclick="this.parentElement.parentElement.parentElement.remove()">
          Try Again
        </button>
      </div>
    </div>
  `;

  form.appendChild(messageContainer);

  // Animate in
  setTimeout(() => {
    messageContainer.classList.add('visible');
  }, 100);
}

/**
 * Reset Form State
 */
function resetFormState(form) {
  // Clear all validation states
  const fields = form.querySelectorAll('.form-input, .form-textarea, .form-select');
  fields.forEach(field => {
    clearFieldValidation(field);
  });

  // Reset form
  form.reset();

  // Reset submission state
  setFormSubmissionState(form, 'default');

  // Remove success/error messages
  const messages = form.querySelectorAll('.form-success-message, .form-error-message');
  messages.forEach(message => message.remove());

  // Focus first field
  const firstField = form.querySelector('.form-input');
  if (firstField) {
    firstField.focus();
  }
}

/**
 * Scroll to First Error
 */
function scrollToFirstError(form) {
  const firstError = form.querySelector('.field-invalid');
  if (firstError) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const elementPosition = firstError.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Focus the field
    firstError.focus();
  }
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
 * Initialize FAQ Functionality
 */
function initializeFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const answer = this.nextElementSibling;

      // Close all other FAQ items
      faqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== this) {
          otherQuestion.setAttribute('aria-expanded', 'false');
          const otherAnswer = otherQuestion.nextElementSibling;
          otherAnswer.style.maxHeight = '0';
        }
      });

      // Toggle current FAQ item
      if (isExpanded) {
        this.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0';
      } else {
        this.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/**
 * Initialize Gallery Filter Functionality
 */
function initializeGalleryFilterEnhanced() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');

      // Update active filter button
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');

      // Filter gallery items with animation
      galleryItems.forEach((item, index) => {
        const itemCategory = item.getAttribute('data-category');

        setTimeout(() => {
          if (filter === 'all' || itemCategory === filter) {
            item.style.display = 'block';
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';

            setTimeout(() => {
              item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 50);
          } else {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '0';
            item.style.transform = 'translateY(-20px)';

            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        }, index * 50);
      });
    });
  });
}

/**
 * Initialize Enhanced Form Validation
 */
function initializeEnhancedFormValidation() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    const inputs = form.querySelectorAll('.form-input, .form-textarea');

    inputs.forEach(input => {
      // Real-time validation
      input.addEventListener('input', function () {
        validateFieldRealTime(this);
      });

      // Blur validation
      input.addEventListener('blur', function () {
        validateField(this);
      });

      // Focus enhancements
      input.addEventListener('focus', function () {
        this.parentNode.classList.add('focused');
        removeFieldError(this);
      });

      input.addEventListener('blur', function () {
        if (!this.value.trim()) {
          this.parentNode.classList.remove('focused');
        }
      });
    });
  });
}

/**
 * Real-time field validation
 */
function validateFieldRealTime(field) {
  const value = field.value.trim();
  const fieldName = field.name;

  // Remove existing errors during typing
  removeFieldError(field);

  // Email validation
  if (fieldName === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      field.classList.add('error');
    } else {
      field.classList.remove('error');
    }
  }

  // Phone validation
  if (fieldName === 'phone' && value) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(value.replace(/[\s\(\)\-]/g, ''))) {
      field.classList.add('error');
    } else {
      field.classList.remove('error');
    }
  }

  // Character count for textarea
  if (field.tagName === 'TEXTAREA') {
    updateCharacterCount(field);
  }
}

/**
 * Update character count for textareas
 */
function updateCharacterCount(textarea) {
  const maxLength = textarea.getAttribute('maxlength');
  const currentLength = textarea.value.length;

  let counter = textarea.parentNode.querySelector('.char-counter');
  if (!counter && maxLength) {
    counter = document.createElement('div');
    counter.className = 'char-counter';
    textarea.parentNode.appendChild(counter);
  }

  if (counter && maxLength) {
    counter.textContent = `${currentLength}/${maxLength}`;

    if (currentLength > maxLength * 0.9) {
      counter.style.color = 'var(--color-error)';
    } else {
      counter.style.color = 'var(--color-text-secondary)';
    }
  }
}

/**
 * Initialize Smooth Scroll for Timeline
 */
function initializeTimelineNavigation() {
  const timelineYears = document.querySelectorAll('.timeline-year');

  timelineYears.forEach(year => {
    year.addEventListener('click', function () {
      const timelineItem = this.parentNode;
      timelineItem.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      // Add temporary highlight
      timelineItem.style.transform = 'scale(1.02)';
      setTimeout(() => {
        timelineItem.style.transform = 'scale(1)';
      }, 500);
    });
  });
}

/**
 * Initialize Load More Functionality
 */
function initializeLoadMore() {
  const loadMoreBtn = document.getElementById('load-more');
  const galleryGrid = document.getElementById('gallery-grid');

  if (loadMoreBtn && galleryGrid) {
    loadMoreBtn.addEventListener('click', function () {
      // Simulate loading more items
      this.innerHTML = '<span class="loading"></span> Loading...';
      this.disabled = true;

      setTimeout(() => {
        // Add new gallery items (simulation)
        const newItems = createAdditionalGalleryItems();
        newItems.forEach(item => {
          galleryGrid.appendChild(item);
        });

        this.innerHTML = 'Load More Artwork';
        this.disabled = false;

        // Check if we should hide the button
        const totalItems = galleryGrid.querySelectorAll('.gallery-item').length;
        if (totalItems >= 20) {
          this.style.display = 'none';
        }
      }, 1500);
    });
  }
}

/**
 * Create additional gallery items (simulation)
 */
function createAdditionalGalleryItems() {
  const items = [];
  const itemCount = 4;

  for (let i = 0; i < itemCount; i++) {
    const article = document.createElement('article');
    article.className = 'gallery-item';
    article.setAttribute('data-category', 'paintings');

    article.innerHTML = `
      <div class="gallery-image-wrapper">
        <img
          src="images/gallery/placeholder-${i + 9}.jpg"
          alt="New Artwork ${i + 1}"
          class="gallery-image"
          loading="lazy"
        />
        <div class="gallery-overlay">
          <h3 class="gallery-title">New Artwork ${i + 1}</h3>
          <p class="gallery-artist">Artist Name</p>
          <p class="gallery-meta">Medium, Year</p>
          <p class="gallery-price">$${(Math.random() * 2000 + 500).toFixed(0)}</p>
        </div>
      </div>
    `;

    // Add entrance animation
    article.style.opacity = '0';
    article.style.transform = 'translateY(30px)';

    setTimeout(() => {
      article.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      article.style.opacity = '1';
      article.style.transform = 'translateY(0)';
    }, i * 100);

    items.push(article);
  }

  return items;
}

/**
 * Initialize Award Hover Effects
 */
function initializeAwardEffects() {
  const awardItems = document.querySelectorAll('.award-item');

  awardItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
      const icon = this.querySelector('.award-icon');
      if (icon) {
        icon.style.transform = 'scale(1.2) rotate(10deg)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });

    item.addEventListener('mouseleave', function () {
      const icon = this.querySelector('.award-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });
}

/**
 * Initialize Exhibition Hover Effects
 */
function initializeExhibitionEffects() {
  const exhibitionItems = document.querySelectorAll('.exhibition-item');

  exhibitionItems.forEach(item => {
    const image = item.querySelector('.exhibition-photo');
    if (image) {
      item.addEventListener('mouseenter', function () {
        image.style.transform = 'scale(1.1)';
      });

      item.addEventListener('mouseleave', function () {
        image.style.transform = 'scale(1)';
      });
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

  // Initialize new enhanced features
  initializeFAQ();
  initializeGalleryFilterEnhanced();
  initializeEnhancedFormValidation();
  initializeTimelineNavigation();
  initializeLoadMore();
  initializeAwardEffects();
  initializeExhibitionEffects();
}

// Add enhanced features to the main DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function () {
  console.log('Lumina Gallery Website Loaded');

  // Initialize all features
  initializeNavigation();
  initializeGallery();
  initializeForms();
  initializeScrollEffects();

  // Initialize FAQ accordion (for contact page)
  initializeFAQAccordion();

  // Initialize enhanced features
  initializeEnhancedFeatures();

  // Initialize scroll-based animations
  initializeScrollAnimations();

  // Initialize performance features
  initializePerformanceOptimizations();

  // Initialize utilities and compatibility
  initializeUtilities();
  initializeBrowserCompatibility();
  initializePerformanceFeatures();

  console.log('Enhanced features initialized');
});

/* ===== SCROLL-BASED ANIMATIONS ===== */

/**
 * Initialize Scroll-Based Animations
 * Implements intersection observer for revealing content and parallax effects
 */
function initializeScrollAnimations() {
  // Initialize scroll reveal animations
  initializeScrollReveal();

  // Initialize parallax effects
  initializeParallaxEffects();

  // Initialize scroll progress indicator
  initializeScrollProgress();

  // Initialize scroll-triggered counters
  initializeCounters();

  // Initialize scroll-triggered text effects
  initializeTextAnimations();

  console.log('Scroll-based animations initialized');
}

/**
 * Initialize Scroll Reveal Animations
 * Uses Intersection Observer to animate elements as they enter viewport
 */
function initializeScrollReveal() {
  // Create intersection observer for scroll reveal
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationType = element.dataset.reveal || 'fadeInUp';
        const delay = parseInt(element.dataset.delay) || 0;

        setTimeout(() => {
          element.classList.add('revealed', `reveal-${animationType}`);
          element.style.opacity = '1';
          element.style.transform = 'none';
        }, delay);

        // Unobserve once revealed (unless repeatable)
        if (!element.dataset.repeat) {
          revealObserver.unobserve(element);
        }
      } else if (entry.target.dataset.repeat) {
        // Reset if repeatable and out of view
        entry.target.classList.remove('revealed', `reveal-${entry.target.dataset.reveal || 'fadeInUp'}`);
        entry.target.style.opacity = '0';
        setInitialTransform(entry.target, entry.target.dataset.reveal || 'fadeInUp');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Find all elements with scroll reveal
  const revealElements = document.querySelectorAll([
    '.reveal',
    '.artwork-card',
    '.service-card',
    '.testimonial-card',
    '.exhibition-card',
    '.team-member',
    '.feature-box',
    '.stats-item',
    '.section-header',
    '.content-block'
  ].join(', '));

  revealElements.forEach((element, index) => {
    // Set initial state
    element.style.opacity = '0';
    const animationType = element.dataset.reveal || 'fadeInUp';
    setInitialTransform(element, animationType);

    // Add staggered delay for grouped elements
    if (!element.dataset.delay) {
      element.dataset.delay = (index % 4) * 100;
    }

    // Observe the element
    revealObserver.observe(element);
  });
}

/**
 * Set initial transform based on animation type
 */
function setInitialTransform(element, animationType) {
  switch (animationType) {
    case 'fadeInUp':
      element.style.transform = 'translateY(30px)';
      break;
    case 'fadeInDown':
      element.style.transform = 'translateY(-30px)';
      break;
    case 'fadeInLeft':
      element.style.transform = 'translateX(-30px)';
      break;
    case 'fadeInRight':
      element.style.transform = 'translateX(30px)';
      break;
    case 'scaleIn':
      element.style.transform = 'scale(0.8)';
      break;
    case 'rotateIn':
      element.style.transform = 'rotate(-10deg) scale(0.8)';
      break;
    default:
      element.style.transform = 'translateY(30px)';
  }
}

/**
 * Initialize Parallax Effects
 * Creates subtle parallax scrolling for hero sections and backgrounds
 */
function initializeParallaxEffects() {
  const parallaxElements = document.querySelectorAll('.parallax, .hero-background, .section-bg');

  if (parallaxElements.length === 0) return;

  // Use rAF for smooth parallax
  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.speed) || 0.5;
      const yPos = -(scrolled * speed);

      // Apply transform with GPU acceleration
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });

    ticking = false;
  }

  function requestParallaxUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  // Throttled scroll listener
  window.addEventListener('scroll', requestParallaxUpdate, { passive: true });

  // Initial call
  updateParallax();
}

/**
 * Initialize Scroll Progress Indicator
 * Shows reading progress for long content pages
 */
function initializeScrollProgress() {
  // Create progress bar if not exists
  let progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
  }

  const progressBarFill = progressBar.querySelector('.scroll-progress-bar');

  function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    progressBarFill.style.width = `${Math.min(scrollPercent, 100)}%`;

    // Show/hide based on scroll position
    if (scrollTop > 100) {
      progressBar.classList.add('visible');
    } else {
      progressBar.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', debounce(updateScrollProgress, 10), { passive: true });
  updateScrollProgress();
}

/**
 * Initialize Animated Counters
 * Animates numbers when they come into view
 */
function initializeCounters() {
  const counters = document.querySelectorAll('.counter, .stat-number, [data-count]');

  if (counters.length === 0) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        animateCounter(entry.target);
        entry.target.classList.add('counted');
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.7 });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

/**
 * Animate a counter element
 */
function animateCounter(element) {
  const target = parseInt(element.dataset.count) || parseInt(element.textContent.replace(/[^\d]/g, '')) || 100;
  const duration = parseInt(element.dataset.duration) || 2000;
  const suffix = element.dataset.suffix || '';
  const prefix = element.dataset.prefix || '';

  let start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * easedProgress);

    element.textContent = prefix + current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/**
 * Initialize Text Animations
 * Creates typewriter and text reveal effects
 */
function initializeTextAnimations() {
  // Initialize typewriter effects
  const typewriterElements = document.querySelectorAll('.typewriter, [data-typewriter]');
  typewriterElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    element.classList.add('typewriter-ready');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('typewriter-complete')) {
          typewriterEffect(entry.target, text);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(element);
  });

  // Initialize text reveal effects
  const textRevealElements = document.querySelectorAll('.text-reveal, [data-text-reveal]');
  textRevealElements.forEach(element => {
    const words = element.textContent.split(' ');
    element.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const wordSpans = entry.target.querySelectorAll('.word');
          wordSpans.forEach((span, index) => {
            setTimeout(() => {
              span.classList.add('revealed');
            }, index * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(element);
  });
}

/**
 * Typewriter effect for text elements
 */
function typewriterEffect(element, text) {
  const speed = parseInt(element.dataset.speed) || 50;
  let index = 0;

  element.classList.add('typing');

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    } else {
      element.classList.remove('typing');
      element.classList.add('typewriter-complete');
    }
  }

  type();
}

/**
 * Advanced Scroll Effects
 * Additional scroll-based interactions
 */
function initializeAdvancedScrollEffects() {
  // Scroll-triggered navigation background
  const nav = document.querySelector('.main-nav');
  if (nav) {
    window.addEventListener('scroll', debounce(() => {
      if (window.pageYOffset > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, 10), { passive: true });
  }

  // Scroll-triggered floating elements
  const floatingElements = document.querySelectorAll('.floating-element');
  floatingElements.forEach(element => {
    window.addEventListener('scroll', debounce(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      element.style.transform = `translateY(${rate}px)`;
    }, 16), { passive: true });
  });

  // Scroll-triggered section highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const sectionId = entry.target.id;
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (entry.isIntersecting && navLink) {
          // Remove active from all nav links
          navLinks.forEach(link => link.classList.remove('active-section'));
          // Add active to current section's nav link
          navLink.classList.add('active-section');
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));
  }
}

/* ===== PERFORMANCE OPTIMIZATIONS ===== */

/**
 * Initialize Performance Features
 * Implements lazy loading, loading states, and performance optimizations
 */
function initializePerformanceOptimizations() {
  // Initialize lazy loading for images
  initializeLazyLoading();

  // Initialize performance monitoring
  initializePerformanceMonitoring();

  // Initialize loading states
  initializeLoadingStates();

  // Initialize image optimization
  initializeImageOptimization();

  // Initialize caching strategies
  initializeCaching();

  // Initialize connection quality detection
  initializeConnectionDetection();

  console.log('Performance optimizations initialized');
}

/**
 * Initialize Lazy Loading for Images
 * Uses Intersection Observer for efficient image loading
 */
function initializeLazyLoading() {
  // Check for native lazy loading support
  if ('loading' in HTMLImageElement.prototype) {
    // Use native lazy loading for modern browsers
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      img.loading = 'lazy';
    });
  } else {
    // Fallback: Use Intersection Observer
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          loadImage(img);
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    // Observe all images with data-src
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      lazyImageObserver.observe(img);
    });
  }

  // Initialize progressive image loading
  initializeProgressiveLoading();
}

/**
 * Load image with loading states and error handling
 */
function loadImage(img) {
  const src = img.dataset.src;
  if (!src) return;

  // Show loading state
  img.classList.add('image-loading');

  // Create a new image to preload
  const imageLoader = new Image();

  imageLoader.onload = function () {
    // Image loaded successfully
    img.src = src;
    img.classList.remove('image-loading');
    img.classList.add('image-loaded');
    img.removeAttribute('data-src');

    // Trigger custom event
    img.dispatchEvent(new CustomEvent('imageLoaded', {
      detail: { src: src }
    }));
  };

  imageLoader.onerror = function () {
    // Image failed to load
    img.classList.remove('image-loading');
    img.classList.add('image-error');

    // Set fallback image or placeholder
    const fallback = img.dataset.fallback || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f0f0f0"/><text x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999">Image Error</text></svg>';
    img.src = fallback;

    // Trigger custom event
    img.dispatchEvent(new CustomEvent('imageError', {
      detail: { src: src }
    }));
  };

  // Start loading
  imageLoader.src = src;
}

/**
 * Initialize Progressive Image Loading
 * Loads low-quality placeholders first, then high-quality images
 */
function initializeProgressiveLoading() {
  const progressiveImages = document.querySelectorAll('img[data-src-small]');

  progressiveImages.forEach(img => {
    const smallSrc = img.dataset.srcSmall;
    const fullSrc = img.dataset.src;

    if (smallSrc) {
      // Load small version first
      img.src = smallSrc;
      img.classList.add('progressive-loading');

      // Then load full version
      const fullImage = new Image();
      fullImage.onload = function () {
        img.src = fullSrc;
        img.classList.remove('progressive-loading');
        img.classList.add('progressive-loaded');
      };
      fullImage.src = fullSrc;
    }
  });
}

/**
 * Initialize Performance Monitoring
 * Tracks page load times and user interactions
 */
function initializePerformanceMonitoring() {
  // Track page load performance
  window.addEventListener('load', () => {
    if ('performance' in window) {
      const navigationTiming = performance.getEntriesByType('navigation')[0];

      const metrics = {
        domContentLoaded: navigationTiming.domContentLoadedEventEnd - navigationTiming.navigationStart,
        loadComplete: navigationTiming.loadEventEnd - navigationTiming.navigationStart,
        firstPaint: getFirstPaint(),
        largestContentfulPaint: getLargestContentfulPaint()
      };

      // Log performance metrics (in production, send to analytics)
      console.log('Performance Metrics:', metrics);

      // Show performance indicator for slow connections
      if (metrics.loadComplete > 3000) {
        showPerformanceNotification();
      }
    }
  });

  // Track Core Web Vitals
  trackCoreWebVitals();
}

/**
 * Get First Paint timing
 */
function getFirstPaint() {
  const paintEntries = performance.getEntriesByType('paint');
  const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
  return firstPaint ? firstPaint.startTime : 0;
}

/**
 * Get Largest Contentful Paint timing
 */
function getLargestContentfulPaint() {
  return new Promise((resolve) => {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      resolve(lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  });
}

/**
 * Track Core Web Vitals
 */
function trackCoreWebVitals() {
  // Track Cumulative Layout Shift
  let clsValue = 0;
  let clsEntries = [];

  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        clsEntries.push(entry);
      }
    }
  }).observe({ entryTypes: ['layout-shift'] });

  // Track First Input Delay
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      const delay = entry.processingStart - entry.startTime;
      console.log('First Input Delay:', delay);
    }
  }).observe({ entryTypes: ['first-input'] });
}

/**
 * Initialize Loading States
 * Shows loading indicators for various operations
 */
function initializeLoadingStates() {
  // Create global loading overlay
  createLoadingOverlay();

  // Initialize loading states for form submissions
  initializeFormLoadingStates();

  // Initialize loading states for content sections
  initializeContentLoadingStates();

  // Initialize skeleton loading for dynamic content
  initializeSkeletonLoading();
}

/**
 * Create global loading overlay
 */
function createLoadingOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  overlay.innerHTML = `
    <div class="loading-content">
      <div class="loading-spinner"></div>
      <div class="loading-text">Loading...</div>
      <div class="loading-progress">
        <div class="loading-progress-bar"></div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

/**
 * Show loading overlay
 */
function showLoading(message = 'Loading...') {
  const overlay = document.querySelector('.loading-overlay');
  const text = overlay.querySelector('.loading-text');

  if (text) text.textContent = message;
  overlay.classList.add('visible');
  document.body.classList.add('loading-active');
}

/**
 * Hide loading overlay
 */
function hideLoading() {
  const overlay = document.querySelector('.loading-overlay');
  overlay.classList.remove('visible');
  document.body.classList.remove('loading-active');
}

/**
 * Update loading progress
 */
function updateLoadingProgress(percentage) {
  const progressBar = document.querySelector('.loading-progress-bar');
  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
  }
}

/**
 * Initialize Form Loading States
 */
function initializeFormLoadingStates() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Show loading spinner in button
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="btn-spinner"></span> Processing...';

        // Simulate form processing (replace with actual form submission)
        setTimeout(() => {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }, 2000);
      }
    });
  });
}

/**
 * Initialize Content Loading States
 */
function initializeContentLoadingStates() {
  // Initialize loading states for gallery content
  const galleryContainers = document.querySelectorAll('.gallery-grid');

  galleryContainers.forEach(container => {
    // Show skeleton loading for gallery items
    showSkeletonLoading(container, 'gallery-item');

    // Simulate content loading
    setTimeout(() => {
      hideSkeletonLoading(container);
    }, 1000);
  });
}

/**
 * Initialize Skeleton Loading
 */
function initializeSkeletonLoading() {
  // Add skeleton loading for dynamic content areas
  const contentAreas = document.querySelectorAll('[data-dynamic-content]');

  contentAreas.forEach(area => {
    const type = area.dataset.dynamicContent;
    showSkeletonLoading(area, type);
  });
}

/**
 * Show skeleton loading
 */
function showSkeletonLoading(container, type = 'default') {
  const skeletons = createSkeletonElements(type);
  container.classList.add('skeleton-loading');

  // Store original content
  container.dataset.originalContent = container.innerHTML;

  // Show skeleton content
  container.innerHTML = skeletons;
}

/**
 * Hide skeleton loading
 */
function hideSkeletonLoading(container) {
  container.classList.remove('skeleton-loading');

  // Restore original content if stored
  if (container.dataset.originalContent) {
    container.innerHTML = container.dataset.originalContent;
    delete container.dataset.originalContent;
  }
}

/**
 * Create skeleton elements based on type
 */
function createSkeletonElements(type) {
  const skeletons = {
    'gallery-item': `
      <div class="skeleton-gallery-item">
        <div class="skeleton-image"></div>
        <div class="skeleton-content">
          <div class="skeleton-title"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-text short"></div>
        </div>
      </div>
    `.repeat(6),

    'text-content': `
      <div class="skeleton-text-block">
        <div class="skeleton-title"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text short"></div>
      </div>
    `,

    'card': `
      <div class="skeleton-card">
        <div class="skeleton-image"></div>
        <div class="skeleton-content">
          <div class="skeleton-title"></div>
          <div class="skeleton-text"></div>
        </div>
      </div>
    `.repeat(3)
  };

  return skeletons[type] || skeletons['text-content'];
}

/**
 * Initialize Image Optimization
 */
function initializeImageOptimization() {
  // Optimize images based on device pixel ratio
  const images = document.querySelectorAll('img[data-src-1x][data-src-2x]');

  images.forEach(img => {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const src = devicePixelRatio > 1 ? img.dataset.src2x : img.dataset.src1x;

    if (img.dataset.src) {
      img.dataset.src = src;
    } else {
      img.src = src;
    }
  });

  // Initialize WebP support detection
  initializeWebPSupport();

  // Initialize responsive images
  initializeResponsiveImages();
}

/**
 * Initialize WebP Support Detection
 */
function initializeWebPSupport() {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;

  const webpSupport = canvas.toDataURL('image/webp').indexOf('webp') !== -1;

  if (webpSupport) {
    document.documentElement.classList.add('webp-supported');

    // Replace images with WebP versions if available
    const images = document.querySelectorAll('img[data-webp]');
    images.forEach(img => {
      if (img.dataset.src) {
        img.dataset.src = img.dataset.webp;
      } else {
        img.src = img.dataset.webp;
      }
    });
  }
}

/**
 * Initialize Responsive Images
 */
function initializeResponsiveImages() {
  // Update image sources based on viewport size
  function updateResponsiveImages() {
    const viewportWidth = window.innerWidth;
    const images = document.querySelectorAll('img[data-sizes]');

    images.forEach(img => {
      const sizes = JSON.parse(img.dataset.sizes || '{}');
      let selectedSrc = img.dataset.src; // fallback

      // Find the best size match
      Object.keys(sizes).forEach(breakpoint => {
        if (viewportWidth >= parseInt(breakpoint)) {
          selectedSrc = sizes[breakpoint];
        }
      });

      if (img.dataset.src) {
        img.dataset.src = selectedSrc;
      } else if (img.src !== selectedSrc) {
        img.src = selectedSrc;
      }
    });
  }

  // Update on load and resize
  updateResponsiveImages();
  window.addEventListener('resize', debounce(updateResponsiveImages, 250));
}

/**
 * Initialize Caching Strategies
 */
function initializeCaching() {
  // Implement service worker for caching (if supported)
  if ('serviceWorker' in navigator) {
    // Service worker would be registered here in a production environment
    console.log('Service Worker support detected');
  }

  // Implement memory caching for frequently accessed data
  initializeMemoryCache();

  // Implement localStorage caching for settings and preferences
  initializeLocalStorageCache();
}

/**
 * Initialize Memory Cache
 */
function initializeMemoryCache() {
  // Simple in-memory cache for API responses and computed values
  window.LuminaCache = {
    data: new Map(),

    set(key, value, ttl = 300000) { // 5 minutes default TTL
      const expiry = Date.now() + ttl;
      this.data.set(key, { value, expiry });
    },

    get(key) {
      const item = this.data.get(key);
      if (!item) return null;

      if (Date.now() > item.expiry) {
        this.data.delete(key);
        return null;
      }

      return item.value;
    },

    clear() {
      this.data.clear();
    }
  };
}

/**
 * Initialize localStorage Cache
 */
function initializeLocalStorageCache() {
  try {
    // Cache user preferences
    const preferences = {
      theme: localStorage.getItem('lumina-theme') || 'light',
      language: localStorage.getItem('lumina-language') || 'en',
      reducedMotion: localStorage.getItem('lumina-reduced-motion') === 'true'
    };

    // Apply cached preferences
    if (preferences.reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    }

    // Save performance metrics for analysis
    const performanceData = JSON.parse(localStorage.getItem('lumina-performance') || '[]');
    // Limit stored performance data to last 10 sessions
    if (performanceData.length > 10) {
      performanceData.splice(0, performanceData.length - 10);
      localStorage.setItem('lumina-performance', JSON.stringify(performanceData));
    }

  } catch (error) {
    console.warn('localStorage not available:', error);
  }
}

/**
 * Initialize Connection Quality Detection
 */
function initializeConnectionDetection() {
  // Use Network Information API if available
  if ('connection' in navigator) {
    const connection = navigator.connection;

    function updateConnectionStatus() {
      const effectiveType = connection.effectiveType;
      const saveData = connection.saveData;

      // Apply optimizations based on connection quality
      if (effectiveType === 'slow-2g' || effectiveType === '2g' || saveData) {
        // Reduce animations and image quality for slow connections
        document.documentElement.classList.add('slow-connection');

        // Disable autoplay videos
        const videos = document.querySelectorAll('video[autoplay]');
        videos.forEach(video => {
          video.removeAttribute('autoplay');
          video.preload = 'none';
        });

        // Use lower quality images
        const images = document.querySelectorAll('img[data-src-low]');
        images.forEach(img => {
          if (img.dataset.src) {
            img.dataset.src = img.dataset.srcLow;
          }
        });

      } else {
        document.documentElement.classList.remove('slow-connection');
      }
    }

    // Initial check
    updateConnectionStatus();

    // Listen for connection changes
    connection.addEventListener('change', updateConnectionStatus);
  }

  // Fallback: estimate connection speed
  estimateConnectionSpeed();
}

/**
 * Estimate connection speed using timing
 */
function estimateConnectionSpeed() {
  const startTime = performance.now();
  const image = new Image();

  image.onload = function () {
    const endTime = performance.now();
    const duration = endTime - startTime;
    const fileSize = 50000; // Approximate size in bytes
    const speed = fileSize / (duration / 1000); // bytes per second

    // Apply connection-based optimizations
    if (speed < 100000) { // Less than 100KB/s
      document.documentElement.classList.add('slow-connection');
    }
  };

  // Load a small test image
  image.src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
}

/**
 * Show performance notification for slow connections
 */
function showPerformanceNotification() {
  const notification = document.createElement('div');
  notification.className = 'performance-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">⚡</span>
      <span class="notification-text">Optimizing for your connection speed...</span>
      <button class="notification-close">&times;</button>
    </div>
  `;

  document.body.appendChild(notification);

  // Auto-hide after 5 seconds
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 300);
  }, 5000);

  // Manual close
  notification.querySelector('.notification-close').addEventListener('click', () => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 300);
  });
}

/**
 * Performance utility functions
 */
const PerformanceUtils = {
  // Preload critical resources
  preloadResources(resources) {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.type;
      document.head.appendChild(link);
    });
  },

  // Defer non-critical resources
  deferResources(resources) {
    window.addEventListener('load', () => {
      resources.forEach(resource => {
        const element = resource.type === 'script'
          ? document.createElement('script')
          : document.createElement('link');

        if (resource.type === 'script') {
          element.src = resource.href;
          element.async = true;
        } else {
          element.href = resource.href;
          element.rel = 'stylesheet';
        }

        document.head.appendChild(element);
      });
    });
  },

  // Optimize font loading
  optimizeFonts() {
    // Use font-display: swap for better performance
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Playfair Display';
        font-display: swap;
      }
      @font-face {
        font-family: 'Source Sans Pro';
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  },

  // Measure and log performance metrics
  measurePerformance(label, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${label}: ${(end - start).toFixed(2)}ms`);
    return result;
  }
};

// Initialize performance utilities
PerformanceUtils.optimizeFonts();

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