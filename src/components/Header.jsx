import React from 'react';
import { Sparkles, Sun, Moon, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header({ isDark, onToggleTheme, totalItems = 30 }) {
  return (
    <header className="w-full bg-[#FAF8F5]/90 dark:bg-[#0A0A0C]/90 backdrop-blur-md sticky top-0 z-40 border-b border-stone-200/80 dark:border-stone-800/80 transition-colors duration-300">
      {/* Editorial top eyebrow strip */}
      <div className="hidden sm:flex justify-between items-center px-6 lg:px-12 py-1.5 text-[11px] tracking-[0.25em] uppercase text-stone-500 dark:text-stone-400 border-b border-stone-200/50 dark:border-stone-800/50 font-sans">
        <span className="flex items-center gap-1.5">
          <Compass className="w-3 h-3 text-luxury-gold" />
          Costume Gallery &bull; Bhopal (MP)
        </span>
        <span className="text-luxury-gold dark:text-luxury-gold font-medium">
          Theme Costumes & Fancy Dress &bull; {new Date().getFullYear()}
        </span>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 sm:h-24 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3 sm:gap-4 group cursor-default">
          <motion.div
            whileHover={{ rotate: 180, scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center bg-stone-100 dark:bg-stone-900/80 shadow-sm text-luxury-gold group-hover:border-luxury-gold transition-colors"
          >
            <Sparkles className="w-5 h-5 text-luxury-gold" strokeWidth={1.5} />
          </motion.div>

          <div className="flex items-baseline gap-2.5 sm:gap-3 mt-2 sm:mt-2.5">
            <span
              aria-label="KrishnLeela"
              style={{ fontFamily: "'oeinakla paI oI Fsa', 'AMS Prashant', 'Ams Tushar', sans-serif" }}
              className="font-ams text-4xl sm:text-4xl lg:text-[44px] font-normal tracking-wide text-stone-900 dark:text-stone-50 select-none leading-none inline-block"
            >
              Úk& VN[l[[ßl[[Û
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-light italic text-luxury-gold tracking-tight inline-block">
              Dresses
            </span>
          </div>
        </div>

        {/* Right side controls: collection counter + Dark/Light toggle */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden md:flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-sans">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse-subtle" />
            <span className="tracking-wider uppercase text-[11px]">
              {totalItems} Available Dresses
            </span>
          </div>

          <div className="h-5 w-[1px] bg-stone-200 dark:bg-stone-800 hidden md:block" />

          {/* Light / Dark Mode Toggle Switch */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="group relative flex items-center justify-between w-16 h-8 sm:w-20 sm:h-9 px-1 rounded-full bg-stone-200 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-luxury-gold/50"
          >
            <span className="sr-only">Toggle theme</span>
            <div className="absolute inset-0 flex items-center justify-between px-2 text-stone-400 pointer-events-none">
              <Sun className={`w-3.5 h-3.5 transition-opacity duration-300 ${isDark ? 'opacity-40' : 'opacity-0'}`} />
              <Moon className={`w-3.5 h-3.5 transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-40'}`} />
            </div>

            {/* Moving Switch Knob */}
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white dark:bg-luxury-gold text-stone-800 dark:text-stone-900 shadow-md flex items-center justify-center z-10 ${
                isDark ? 'ml-auto' : 'mr-auto'
              }`}
            >
              {isDark ? (
                <Moon className="w-3.5 h-3.5 text-stone-950" strokeWidth={2} />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500" strokeWidth={2} />
              )}
            </motion.div>
          </button>
        </div>
      </div>
    </header>
  );
}

