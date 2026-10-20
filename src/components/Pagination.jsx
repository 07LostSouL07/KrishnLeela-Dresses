import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  itemsPerPage = 8,
  totalItems = 0,
}) {
  if (totalPages <= 1) return null;

  // Generate numbered pages array
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <nav
      role="navigation"
      aria-label="Gallery pagination"
      className="w-full pt-12 pb-16 flex flex-col items-center justify-center gap-4"
    >
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Previous Page Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          className="p-2.5 sm:p-3 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-luxury-gold hover:text-luxury-gold dark:hover:border-luxury-gold dark:hover:text-luxury-gold disabled:opacity-30 disabled:pointer-events-none transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Numbered Page Buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {pages.map((pageNum) => {
            const isActive = pageNum === currentPage;
            return (
              <motion.button
                key={pageNum}
                whileTap={{ scale: 0.94 }}
                onClick={() => onPageChange(pageNum)}
                aria-label={`Page ${pageNum}`}
                aria-current={isActive ? 'page' : undefined}
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full text-xs sm:text-sm font-sans font-medium transition-all duration-300 flex items-center justify-center ${
                  isActive
                    ? 'bg-stone-900 text-white dark:bg-luxury-gold dark:text-stone-950 font-semibold shadow-md'
                    : 'bg-white dark:bg-stone-900/60 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-luxury-gold/60 hover:text-stone-950 dark:hover:text-white'
                }`}
              >
                {String(pageNum).padStart(2, '0')}
              </motion.button>
            );
          })}
        </div>

        {/* Next Page Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          className="p-2.5 sm:p-3 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-luxury-gold hover:text-luxury-gold dark:hover:border-luxury-gold dark:hover:text-luxury-gold disabled:opacity-30 disabled:pointer-events-none transition-all duration-200"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Pagination Status Text */}
      <p className="text-xs font-sans tracking-wider text-stone-500 dark:text-stone-400 uppercase">
        Displaying {startItem}&ndash;{endItem} of {totalItems} Dresses &bull; Page {currentPage} of {totalPages}
      </p>
    </nav>
  );
}

