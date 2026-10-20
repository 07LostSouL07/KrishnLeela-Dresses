# KrishnLeela Dresses — Haute Couture & Ready-to-Wear Gallery

An Awwwards-inspired, modern, frontend-only clothing gallery website for **KrishnLeela Dresses**, engineered with a "quiet luxury" aesthetic, smooth micro-interactions, and high performance.

---

## Tech Stack

- **React 18** (Vite bundler)
- **Tailwind CSS** (configured with `'class'` strategy for Dark Mode)
- **Framer Motion** (page transitions, staggered grid fade-ins, spring physics micro-interactions)
- **@studio-freight/lenis** (inertial smooth scrolling)
- **Lucide React** (minimalist vector icons, zero emojis)
- **use-debounce** (500ms search input optimization)

---

## Core Features & Architecture

1. **Header (`Header.jsx`)**
   - Atelier branding with placeholder logo icon (`Sparkles` icon within a geometric luxury emblem).
   - Smooth animated Light/Dark mode toggle switch with system preference detection and localStorage persistence.
   - Live silhouette counter badge.

2. **Search & Filter (`SearchFilter.jsx`)**
   - Debounced (500ms) search across both **Category** and **Description** keywords.
   - Dynamic text highlighting (`HighlightText.jsx`) that wraps matched terms with accessible, subtle amber highlight markers.
   - Interactive category pill-buttons with live item counts for instant filtering.
   - Quick "Reset all" filter button.

3. **Gallery Grid & Pagination (`GalleryGrid.jsx`, `ImageCard.jsx`, `Pagination.jsx`)**
   - Responsive CSS grid with editorial 3:4 portrait aspect ratios.
   - Staggered entry animations powered by Framer Motion.
   - Skeleton loader with subtle pulsing shimmer while images fetch to eliminate Cumulative Layout Shift (CLS).
   - Native lazy loading (`loading="lazy"`) and automatic fallback image handler if external CDNs throttle.
   - Strict 8 images per page limit with minimal numbered pagination.
   - Smooth scroll-to-top on page transitions using Lenis.

4. **Minimalist Lightbox (`Lightbox.jsx`)**
   - Full-screen high-contrast modal with 24px backdrop blur.
   - Keyboard navigation support (`Escape` to close, `ArrowLeft` / `ArrowRight` to navigate).
   - Image zoom toggle, direct URL sharing feedback, and couture atelier specifications drawer.

5. **Footer (`Footer.jsx`)**
   - Minimalist quiet luxury layout with dummy concierge phone number, boutique opening hours, flagship Google Maps link with `MapPin` icon, and copyright metadata.

6. **Custom Cursor (`CustomCursor.jsx`)**
   - Spring-physics cursor that expands and reacts with an editorial "VIEW" badge over image cards and clickable buttons.
   - Automatically disabled on touch screens to ensure optimal native mobile ergonomics.

7. **Data Source**
   - Fetched from `data.json` at the root/public directory.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build
```

