// src/components/GradientImage.js
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GradientImage = ({ src, alt, children, className = '' }) => {
  const [overlayClass, setOverlayClass] = useState('bg-main-gradient-overlay');

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Small canvas to check average brightness
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 10;
      canvas.height = 10;
      ctx.drawImage(img, 0, 0, 10, 10);

      const data = ctx.getImageData(0, 0, 10, 10).data;
      let totalBrightness = 0;
      const pixelCount = data.length / 4;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        totalBrightness += (r + g + b) / 3;
      }

      const brightness = totalBrightness / pixelCount;
      setOverlayClass(
        brightness < 100
          ? 'bg-main-gradient-overlay-light'
          : 'bg-main-gradient-overlay'
      );
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* background image */}
      <motion.div
        key={src}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
        aria-label={alt}
      />

      {/* gradient overlay with smooth fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={overlayClass}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 ${overlayClass}`}
        />
      </AnimatePresence>

      {/* content (text, buttons, etc.) */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GradientImage;
