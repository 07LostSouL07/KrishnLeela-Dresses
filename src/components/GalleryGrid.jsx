import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageCard from './ImageCard';
import { SearchX, RotateCcw } from 'lucide-react';

export default function GalleryGrid({
  items = [],
  searchQuery = '',
  onImageClick,
  onResetFilters,
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="w-full aspect-[3/4] rounded-xl bg-stone-200 dark:bg-stone-800 animate-pulse flex flex-col justify-end p-5"
            >
              <div className="h-4 bg-stone-300 dark:bg-stone-700 rounded w-3/4 mb-2" />
              <div className="h-3 bg-stone-300 dark:bg-stone-700 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <div className="w-16 h-16 rounded-full bg-stone-200/80 dark:bg-stone-800 flex items-center justify-center mx-auto mb-5 text-stone-500 dark:text-stone-400">
          <SearchX className="w-8 h-8 text-luxury-gold" strokeWidth={1.5} />
        </div>
        <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 font-normal">
          No Silhouettes Found
        </h3>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 font-sans">
          We could not find any ensemble matching {searchQuery ? `"${searchQuery}"` : "your current filter selection"}.
        </p>
        <button
          onClick={onResetFilters}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white dark:bg-luxury-gold dark:text-stone-950 text-xs uppercase tracking-wider font-sans font-medium hover:opacity-90 transition-opacity"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <ImageCard
              key={item.id}
              item={item}
              index={index}
              searchQuery={searchQuery}
              onImageClick={onImageClick}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

