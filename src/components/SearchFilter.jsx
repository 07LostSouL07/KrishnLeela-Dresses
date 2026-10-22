import React from 'react';
import { Search, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchFilter({
  searchQuery,
  onSearchChange,
  onClearSearch,
  selectedCategory,
  onSelectCategory,
  categories = [],
  filteredCount = 0,
  totalCount = 0,
}) {
  return (
    <section className="w-full pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Editorial Heading & Subtitle */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-luxury-gold/40 bg-luxury-gold/5 text-luxury-gold text-xs tracking-[0.2em] uppercase font-sans mb-8 sm:mb-12">
            <Sparkles className="w-3.5 h-3.5" />
            Seasonal Gallery Catalogue
          </div>
          <h2
            aria-label="राधे राधे"
            style={{ fontFamily: "'oeinakla paI oI Fsa', 'AMS Prashant', 'Ams Tushar', sans-serif" }}
            className="font-ams pt-3 lg:pt-7 text-5xl sm:text-5xl lg:text-8xl font-normal text-stone-900 dark:text-stone-100 tracking-wide select-none overflow-visible"
          >
            ÚÓôY[e ÓôY[eÛ
          </h2>
          <p className="mt-4 text-stone-600 dark:text-stone-400 font-sans text-sm sm:text-base font-light leading-relaxed">
            From school annual functions to Devotional celebrations and stage competitions. Explore premium costumes designed to bring every character to life.
          </p>
        </div>

        {/* Search Bar Input Container */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative flex items-center">
            <div className="absolute left-5 sm:left-6 inset-y-0 flex items-center pointer-events-none text-stone-400 dark:text-stone-500">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-luxury-gold" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by keywords, colors, size or category..."
              aria-label="Search clothing items"
              className="w-full pl-14 sm:pl-16 pr-12 sm:pr-14 py-3.5 sm:py-4 rounded-full bg-white dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 text-sm sm:text-base font-sans focus:outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 shadow-sm transition-all duration-300"
            />

            {searchQuery && (
              <button
                onClick={onClearSearch}
                aria-label="Clear search input"
                className="absolute right-4 sm:right-5 p-1.5 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Result Summary and Active Filter tag */}
          <div className="flex items-center justify-between mt-2.5 px-3 text-xs text-stone-500 dark:text-stone-400 font-sans">
            <span className="flex items-center gap-1.5">
              <span>Showing <strong className="text-stone-900 dark:text-stone-100 font-medium">{filteredCount}</strong> of {totalCount} looks</span>
              {searchQuery.trim() && (
                <span className="italic text-luxury-gold">
                  for &ldquo;{searchQuery.trim()}&rdquo;
                </span>
              )}
            </span>

            {(selectedCategory !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  onSelectCategory('All');
                  onClearSearch();
                }}
                className="text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 underline underline-offset-4 transition-colors"
              >
                Reset all
              </button>
            )}
          </div>
        </div>

        {/* Category Pill Buttons */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <motion.button
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                whileTap={{ scale: 0.96 }}
                className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-sans tracking-wide whitespace-nowrap transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 text-white dark:bg-luxury-gold dark:text-stone-950 font-medium shadow-md'
                    : 'bg-white/80 dark:bg-stone-900/60 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800/80 hover:border-luxury-gold/50 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-stone-800 text-stone-300 dark:bg-stone-900/30 dark:text-stone-950 font-semibold'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                  }`}
                >
                  {cat.count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

