import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics for quiet luxury fluidity
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const interactive = target.closest('button, a, input, select, textarea, [role="button"], .clickable-item');
      const imageTarget = target.closest('.gallery-card, .lightbox-image');

      setIsHovered(!!interactive && !imageTarget);
      setIsImageHovered(!!imageTarget);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer subtle ring / expansion */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-luxury-gold dark:border-luxury-gold/80 flex items-center justify-center transition-colors duration-300"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isImageHovered ? 68 : isHovered ? 48 : 28,
          height: isImageHovered ? 68 : isHovered ? 48 : 28,
          backgroundColor: isImageHovered
            ? 'rgba(197, 168, 128, 0.15)'
            : isHovered
            ? 'rgba(197, 168, 128, 0.08)'
            : 'rgba(197, 168, 128, 0)',
          scale: isImageHovered ? 1.05 : isHovered ? 1.15 : 1,
          backdropFilter: isImageHovered ? 'blur(2px)' : 'none',
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 300 }}
      >
        {isImageHovered && (
          <span className="text-[9px] font-sans tracking-[0.2em] uppercase text-stone-900 dark:text-stone-100 font-semibold select-none">
            View
          </span>
        )}
      </motion.div>

      {/* Center solid precision dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-luxury-gold"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isImageHovered ? 0 : isHovered ? 1.4 : 1,
          opacity: isImageHovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}

