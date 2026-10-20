import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Tag, MessageCircle } from 'lucide-react';
import { HighlightText } from './HighlightText';
import { getFallbackImage } from '../utils/fallbackImages';

export default function ImageCard({ item, searchQuery, onImageClick, index = 0 }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(item.imageUrl);

  const rawImg = currentSrc || item?.imageUrl || item?.image || '';
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

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setCurrentSrc(getFallbackImage(item.category, item.id));
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.06, 0.4),
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      onClick={() => onImageClick(item)}
      className="gallery-card group relative cursor-pointer overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800/80 shadow-sm hover:shadow-xl transition-shadow duration-500"
    >
      {/* Aspect Ratio Container (3:4 Editorial Portrait Ratio) */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-stone-200 dark:bg-stone-800">
        {/* Pulsing Skeleton Loader while image is fetching */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-stone-200 dark:bg-stone-800 animate-pulse flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-stone-300 dark:border-stone-700 border-t-luxury-gold animate-spin" />
          </div>
        )}

        {/* Fashion Image */}
        <img
          src={currentSrc}
          alt={item.description || `${item.category} piece`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={handleImageError}
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } group-hover:scale-108 group-hover:brightness-95`}
        />

        {/* Subtle Luxury Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 sm:opacity-60 group-hover:opacity-95 transition-opacity duration-500 pointer-events-none" />

        {/* Top Badges (Category & Look ID) */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider bg-stone-900/75 dark:bg-stone-950/80 text-luxury-gold-light backdrop-blur-md border border-white/10 shadow-sm">
            <Tag className="w-3 h-3 text-luxury-gold" />
            <HighlightText text={item.category} query={searchQuery} />
          </span>

          <span className="text-[10px] font-mono tracking-widest text-white/70 px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm">
            #{String(item.id).padStart(2, '0')}
          </span>
        </div>

        {/* Bottom Card Content: Description with dynamic highlight + View indicator */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex flex-col justify-end z-10 translate-y-1 sm:translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-white text-sm sm:text-base font-sans font-normal line-clamp-2 sm:line-clamp-3 leading-snug drop-shadow-sm group-hover:line-clamp-none transition-all">
            <HighlightText text={item.description} query={searchQuery} />
          </p>

          <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-white/15 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-luxury-gold font-sans font-medium">
              View Costume
            </span>
            <div className="flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Inquire about this costume on WhatsApp"
                aria-label={`Inquire about costume #${item.id} on WhatsApp`}
                className="px-2.5 py-1 rounded-full bg-luxury-gold text-stone-950 hover:bg-luxury-gold-light text-[11px] font-sans font-semibold tracking-wider uppercase flex items-center gap-1 transition-all shadow-sm"
              >
                <MessageCircle className="w-3 h-3 text-stone-950" />
                <span>Inquire</span>
              </a>
              <div className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

