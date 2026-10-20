import React, { useState, useEffect, useMemo, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { useDebounce } from 'use-debounce';

import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import GalleryGrid from './components/GalleryGrid';
import Pagination from './components/Pagination';
import Lightbox from './components/Lightbox';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

// Direct fallback import if network fetch has any restriction
import localData from '../data.json';

const ITEMS_PER_PAGE = 8;

export default function App() {
  // Theme state: dark mode persisted in localStorage and system preference
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('krishnleela-theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Gallery items and loading states
  const [galleryData, setGalleryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Lightbox state
  const [selectedItem, setSelectedItem] = useState(null);

  // Lenis ref
  const lenisRef = useRef(null);
  const galleryTopRef = useRef(null);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  // Sync theme with <html> class and localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('krishnleela-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('krishnleela-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Fetch all gallery data from local data.json
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch from local data.json in root / public
        const response = await fetch('./data.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch data.json: ${response.statusText}`);
        }
        const data = await response.json();
        setGalleryData(data);
      } catch (err) {
        console.warn('Using bundled data fallback for data.json:', err);
        setGalleryData(localData);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    fetchData();
  }, []);

  // Compute category pills and counts
  const categoriesWithCounts = useMemo(() => {
    const counts = {};
    galleryData.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });

    const list = [
      { name: 'All', count: galleryData.length },
      ...Object.keys(counts).map((categoryName) => ({
        name: categoryName,
        count: counts[categoryName],
      })),
    ];

    return list;
  }, [galleryData]);

  // Filter items by category AND debounced search query (matching category OR description)
  const filteredItems = useMemo(() => {
    return galleryData.filter((item) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      if (!matchesCategory) return false;

      // Search keyword filter across category & description
      if (!debouncedSearchQuery.trim()) return true;

      const query = debouncedSearchQuery.toLowerCase().trim();
      const catMatch = item.category.toLowerCase().includes(query);
      const descMatch = item.description.toLowerCase().includes(query);

      return catMatch || descMatch;
    });
  }, [galleryData, selectedCategory, debouncedSearchQuery]);

  // Reset page to 1 whenever category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, debouncedSearchQuery]);

  // Calculate paginated slice (8 items per page)
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  // Scroll to gallery top on page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (galleryTopRef.current) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(galleryTopRef.current, { offset: -100, duration: 1.0 });
      } else {
        galleryTopRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Lightbox navigation helpers
  const currentLightboxIndex = useMemo(() => {
    if (!selectedItem) return -1;
    return filteredItems.findIndex((it) => it.id === selectedItem.id);
  }, [selectedItem, filteredItems]);

  const handleNextLightbox = () => {
    if (currentLightboxIndex < filteredItems.length - 1) {
      setSelectedItem(filteredItems[currentLightboxIndex + 1]);
    }
  };

  const handlePrevLightbox = () => {
    if (currentLightboxIndex > 0) {
      setSelectedItem(filteredItems[currentLightboxIndex - 1]);
    }
  };

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 dark:bg-[#0A0A0C] dark:text-stone-100 transition-colors duration-500">
      {/* Luxury Reactive Custom Cursor */}
      <CustomCursor />

      {/* Header with store name & light/dark toggle */}
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        totalItems={galleryData.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-12">
        {/* Search & Category Filter Section */}
        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={() => setSearchQuery('')}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categories={categoriesWithCounts}
          filteredCount={filteredItems.length}
          totalCount={galleryData.length}
        />

        {/* Scroll anchor target for pagination */}
        <div ref={galleryTopRef} className="h-1 -mt-1 pointer-events-none" />

        {/* Responsive Gallery Grid with 8 items limit per page */}
        <GalleryGrid
          items={paginatedItems}
          searchQuery={debouncedSearchQuery}
          onImageClick={(item) => setSelectedItem(item)}
          onResetFilters={resetAllFilters}
          isLoading={isLoading}
        />

        {/* Minimal numbered pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={filteredItems.length}
        />
      </main>

      {/* Full-screen Minimalist Lightbox Modal */}
      {selectedItem && (
        <Lightbox
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onNext={handleNextLightbox}
          onPrev={handlePrevLightbox}
          hasNext={currentLightboxIndex < filteredItems.length - 1}
          hasPrev={currentLightboxIndex > 0}
          searchQuery={debouncedSearchQuery}
          currentIndex={currentLightboxIndex}
          totalItems={filteredItems.length}
        />
      )}

      {/* Minimalist luxury Footer */}
      <Footer />
    </div>
  );
}

