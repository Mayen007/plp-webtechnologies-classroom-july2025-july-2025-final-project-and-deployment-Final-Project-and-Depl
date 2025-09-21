# Lumina Gallery - AI Coding Assistant Instructions

## Project Overview

This is a static art gallery website built as a PLP Web Technologies final project. The site showcases contemporary art through a 5-page multipage structure designed for educational deployment.

## Architecture & Structure

### File Organization Pattern

```
/                    # Root: index.html and main assets
├── css/style.css    # Single consolidated stylesheet
├── js/main.js       # Main JavaScript (simplified version)
├── pages/           # All subpages use relative navigation
├── assets/images/   # Organized by content type (gallery/, exhibitions/, etc.)
```

**Critical Path Convention**: Pages in `/pages/` use `../` prefix for all assets and root navigation. Root files use direct paths.

### CSS Architecture

- **Design System**: Uses CSS custom properties (--color-_, --font-_, --spacing-\*) defined in `:root`
- **Color Palette**: Gallery-themed (warm whites, charcoal text, gold accents)
- **Typography**: Dual font system (`Playfair Display` for headings, `Source Sans Pro` for body)
- **Layout**: Mobile-first responsive with fixed header (80px body padding-top compensation)

### JavaScript Patterns

- **Functional Structure**: Initialize functions called on DOMContentLoaded
- **Mobile Navigation**: Toggle-based system with `active` class management
- **Event Handling**: Comprehensive event delegation (click outside, escape key, scroll effects)
- **Performance Note**: Intentionally simplified (no throttling/debouncing per project requirements)

## Navigation System

**Dual Navigation Pattern**:

- Desktop: `.nav-menu` horizontal list
- Mobile: `.mobile-menu` overlay with hamburger toggle
- **Active State**: Class-based highlighting for current page
- **Brand Navigation**: `Lumina Gallery` logo always links to root

## Development Workflows

### No Build System

This is a static site with no package.json, build tools, or preprocessors. All code is vanilla HTML/CSS/JS.

### File References

- Root page links: `pages/gallery.html`, `css/style.css`, `assets/images/`
- Subpage links: `../index.html`, `../css/style.css`, `../assets/images/`
- Image paths follow semantic organization: `gallery/`, `exhibitions/`, `icons/`

### Responsive Strategy

- CSS Grid/Flexbox layouts with mobile-first media queries
- Single CSS file approach (no component splitting)
- Image optimization assumed (no responsive image markup)

## Project-Specific Conventions

### CSS Class Naming

- BEM-influenced: `.mobile-menu-toggle`, `.nav-wrapper`, `.brand-link`
- Semantic: `.hero-section`, `.gallery-grid`, `.contact-form`
- State classes: `.active`, `.scrolled`

### HTML Structure

- Semantic HTML5 with proper landmark elements
- Consistent header/nav structure across all pages
- ARIA attributes for accessibility (mobile menu states)

### Image Handling

- Descriptive filenames: `gallery-founder.jpg`, `current-exhibition.jpg`
- Category-based directories matching site sections
- No image optimization pipeline (static references)

## Critical Integration Points

- **Google Fonts**: Loaded via CDN in each page head
- **Cross-page navigation**: Manually maintained relative links
- **Asset references**: No dynamic path resolution
- **Mobile menu**: JavaScript-dependent UX component

## Documentation References

- `PLANNING_DOCUMENT.md`: Site architecture and content strategy
- `PROJECT_PHASES.md`: Implementation timeline and current status
- `README.md`: Assignment requirements and deliverables

When modifying files, maintain the relative path conventions and ensure mobile navigation functionality works across all pages.
