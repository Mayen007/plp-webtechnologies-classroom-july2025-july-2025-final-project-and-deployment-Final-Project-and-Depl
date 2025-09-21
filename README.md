# Lumina Gallery

A contemporary art gallery website built as a final project for the PLP Web Technologies course. This static site showcases modern artworks, exhibitions, and artist information in a responsive, accessible, and visually engaging format.

## Table of Contents

- [Live Demo](#live-demo)
- [Project Overview](#project-overview)
- [Features](#features)
- [File Structure](#file-structure)
- [Design System](#design-system)
- [Navigation](#navigation)
- [How to Use](#how-to-use)
- [Deployment](#deployment)
- [Credits](#credits)

---

## Live Demo

[https://luminaart.netlify.app/](https://luminaart.netlify.app/)

---

## Project Overview

**Lumina Gallery** is a 5-page static website designed to demonstrate best practices in HTML, CSS, and JavaScript for educational deployment. The site highlights contemporary art, current and upcoming exhibitions, and provides contact information for visitors.

## Features

- Multipage static site (Home, Gallery, Exhibitions, About, Contact)
- Responsive, mobile-first layout
- Dual navigation (desktop and mobile overlay)
- CSS custom properties for theming
- Semantic HTML5 and accessibility best practices
- Simple, maintainable vanilla JavaScript for interactivity
- Organized asset management (images, CSS, JS)

## File Structure

```
/                    # Root: index.html and main assets
├── css/style.css    # Single consolidated stylesheet
├── js/main.js       # Main JavaScript (mobile nav, events)
├── pages/           # All subpages (gallery, exhibitions, about, contact)
├── assets/images/   # Images organized by content type
│   ├── gallery/     # Gallery artworks
│   ├── exhibitions/ # Exhibition images
│   └── icons/       # Icons and favicon
```

- **Critical Path:** Subpages use `../` for all asset and navigation links. Root uses direct paths.
- **Image Naming:** Descriptive, organized by section (e.g., `gallery-founder.jpg`, `artwork-1.jpg`).

## Design System

- **Colors:** Warm whites, charcoal text, gold accents (see `:root` in `css/style.css`)
- **Typography:**
  - Headings: `Playfair Display`
  - Body: `Source Sans Pro`
- **Layout:**
  - Mobile-first, responsive with CSS Grid/Flexbox
  - Fixed header (80px body padding-top)
- **Class Naming:** BEM-influenced and semantic (e.g., `.nav-menu`, `.gallery-grid`, `.active`)

## Navigation

- **Desktop:** Horizontal `.nav-menu`
- **Mobile:** Overlay `.mobile-menu` with hamburger toggle
- **Active State:** Class-based highlighting for current page
- **Brand:** `Lumina Gallery` logo always links to root

## How to Use

1. **Open `index.html`** in your browser to view the homepage.
2. **Navigate** using the menu to explore gallery, exhibitions, about, and contact pages.
3. **Mobile Navigation:** Tap the hamburger icon to open/close the mobile menu.
4. **Edit Content:**
   - Update images in `assets/images/`
   - Edit text and structure in HTML files
   - Adjust styles in `css/style.css`
   - Update interactivity in `js/main.js`

## Deployment

- This is a static site. Deploy by uploading all files to any static web host (e.g., GitHub Pages, Netlify, Vercel).
- No build tools or package managers required.
- Ensure all relative paths are preserved when deploying subpages.

## Credits

- Project by [Mayen007] for PLP Web Technologies Final Project
- Fonts: [Google Fonts](https://fonts.google.com/)
- Images: Provided for educational use only

---

For questions or feedback, please contact the project maintainer.
