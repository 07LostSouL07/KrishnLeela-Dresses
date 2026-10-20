import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Tag,
  Share2,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Check,
  MessageCircle,
} from "lucide-react";
import { HighlightText } from "./HighlightText";
import { getFallbackImage } from "../utils/fallbackImages";

export default function Lightbox({
  item,
  onClose,
  onNext,
  onPrev,
  hasNext = true,
  hasPrev = true,
  searchQuery = "",
  currentIndex = 0,
  totalItems = 1,
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageSrc, setImageSrc] = useState(item?.imageUrl || "");
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Sync image source whenever item changes
  useEffect(() => {
    if (item) {
      setImageSrc(item.imageUrl);
      setIsImageLoading(true);
      setIsZoomed(false);
    }
  }, [item]);

  // Keyboard navigation: Escape to close, Arrows to paginate
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && hasNext) onNext();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!item) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFallback = () => {
    setImageSrc(getFallbackImage(item.category, item.id));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF8F5]/95 dark:bg-[#0A0A0C]/95 backdrop-blur-2xl text-stone-900 dark:text-stone-100 select-none overflow-hidden transition-colors duration-300"
      >
        {/* Top Control Bar */}
        <header className="absolute top-0 inset-x-0 h-20 px-6 sm:px-12 flex items-center justify-between z-30 bg-gradient-to-b from-[#FAF8F5]/90 via-[#FAF8F5]/60 to-transparent dark:from-black/90 dark:via-black/60 dark:to-transparent">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg tracking-wide text-luxury-gold font-light">
              KrishnLeela
            </span>
            <span className="text-stone-400 dark:text-stone-600">&bull;</span>
            <span className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400">
              Silhouette {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(totalItems).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Zoom Toggle */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              aria-label={isZoomed ? "Zoom out" : "Zoom in"}
              className="p-2 sm:p-2.5 rounded-full bg-stone-200/80 hover:bg-stone-300/80 dark:bg-white/10 dark:hover:bg-white/20 text-stone-700 dark:text-stone-200 border border-stone-300/60 dark:border-white/10 transition-colors"
            >
              {isZoomed ? (
                <ZoomOut className="w-4 h-4" />
              ) : (
                <ZoomIn className="w-4 h-4" />
              )}
            </button>

            {/* Share / Copy Link */}
            <button
              onClick={handleShare}
              aria-label="Share dress look"
              className="p-2 sm:p-2.5 rounded-full bg-stone-200/80 hover:bg-stone-300/80 dark:bg-white/10 dark:hover:bg-white/20 text-stone-700 dark:text-stone-200 border border-stone-300/60 dark:border-white/10 transition-colors flex items-center gap-1.5"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close full-screen lightbox"
              className="p-2 sm:p-2.5 rounded-full bg-stone-200/80 hover:bg-stone-300/80 dark:bg-white/10 dark:hover:bg-white/20 text-stone-700 hover:text-stone-950 dark:text-stone-200 dark:hover:text-white border border-stone-300/60 dark:border-white/10 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Prev & Next Floating Arrow Buttons */}
        {hasPrev && (
          <button
            onClick={onPrev}
            aria-label="Previous look"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/85 hover:bg-white dark:bg-black/70 dark:hover:bg-black/95 text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white border border-stone-200 dark:border-white/10 shadow-lg backdrop-blur-md transition-all z-20 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {hasNext && (
          <button
            onClick={onNext}
            aria-label="Next look"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/85 hover:bg-white dark:bg-black/70 dark:hover:bg-black/95 text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white border border-stone-200 dark:border-white/10 shadow-lg backdrop-blur-md transition-all z-20 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Central Display Area: Image & Metadata Panel */}
        <div className="relative w-full h-full pt-20 pb-28 px-4 sm:px-16 flex flex-col lg:flex-row items-center justify-center gap-8 max-w-7xl mx-auto">
          {/* Main Visual Frame */}
          <div
            className="relative flex-1 w-full h-full max-h-[70vh] lg:max-h-[82vh] flex items-center justify-center overflow-hidden cursor-zoom-in"
            onClick={() => setIsZoomed(!isZoomed)}
          >
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-stone-300 dark:border-stone-800 border-t-luxury-gold animate-spin" />
              </div>
            )}

            <motion.img
              key={item.id}
              src={imageSrc}
              alt={item.description}
              referrerPolicy="no-referrer"
              onLoad={() => setIsImageLoading(false)}
              onError={handleFallback}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{
                scale: isZoomed ? 1.4 : 1,
                opacity: isImageLoading ? 0 : 1,
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-300"
            />
          </div>

          {/* Minimalist Editorial Detail Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full lg:w-96 bg-white/95 dark:bg-stone-900/90 border border-stone-200/90 dark:border-stone-800 backdrop-blur-xl p-6 sm:p-7 rounded-2xl flex flex-col justify-between shrink-0 shadow-xl dark:shadow-2xl transition-colors duration-300"
          >
            <div>
              {/* Category Pill & Atelier ID */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans uppercase tracking-widest bg-luxury-gold/15 text-luxury-gold-dark dark:text-luxury-gold border border-luxury-gold/30 font-medium">
                  <Tag className="w-3.5 h-3.5" />
                  <HighlightText text={item.category} query={searchQuery} />
                </span>
                <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                  REF-{String(item.id).padStart(4, "0")}
                </span>
              </div>

              {/* Title / Category */}
              <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 font-normal tracking-tight">
                {item.category} Ensemble
              </h3>

              {/* Full Description with dynamic highlight */}
              <p className="mt-4 text-sm sm:text-base text-stone-600 dark:text-stone-300 font-sans font-light leading-relaxed">
                <HighlightText text={item.description} query={searchQuery} />
              </p>

              {/* Atelier Metadata Specifications */}
              <div className="mt-6 pt-5 border-t border-stone-200 dark:border-stone-800 space-y-2 text-xs font-sans text-stone-500 dark:text-stone-400">
                <div className="flex justify-between py-1 border-b border-stone-200/80 dark:border-stone-800/60">
                  <span>Making & Quality</span>
                  <span className="text-stone-800 dark:text-stone-200 font-medium">In-House Handcrafted</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/80 dark:border-stone-800/60">
                  <span>Availability</span>
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
                    In Stock &bull; Custom Fit
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Care Instructions</span>
                  <span className="text-stone-800 dark:text-stone-200 font-medium">Dry Clean Only</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4">
              {(() => {
                const rawImg = imageSrc || item?.imageUrl || item?.image || '';
                const fullImageUrl = rawImg.startsWith('http://') || rawImg.startsWith('https://')
                  ? rawImg
                  : (typeof window !== 'undefined' ? `${window.location.origin}${rawImg.startsWith('/') ? '' : '/'}${rawImg}` : rawImg);

                const whatsappMessage = `Hello KrishnLeela Dresses, I'm interested in inquiring about this costume:

• Costume ID: #${item.id}
• Category: ${item.category}
• Details: ${item.description}

Could you please share availability, rental/purchase pricing, and custom sizing options?

${fullImageUrl}`;

                const whatsappUrl = `https://wa.me/919827815992?text=${encodeURIComponent(whatsappMessage)}`;

                return (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-luxury-gold text-stone-950 hover:bg-luxury-gold-light font-sans font-semibold text-xs tracking-wider uppercase text-center flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99]"
                  >
                    <MessageCircle className="w-4 h-4 text-stone-950" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                );
              })()}
            </div>
          </motion.div>
        </div>

        {/* Bottom Keyboard Hint Bar */}
        <div className="absolute bottom-4 inset-x-0 hidden sm:flex justify-center items-center gap-6 text-[11px] text-stone-500 dark:text-stone-400 font-sans tracking-wider uppercase">
          <span>&larr; &rarr; Navigate</span>
          <span>&bull;</span>
          <span>Click to Zoom</span>
          <span>&bull;</span>
          <span>ESC to Close</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
