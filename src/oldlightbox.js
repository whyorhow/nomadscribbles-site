import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeftArrow from "./assets/images/lftarrow.svg";
import RightArrow from "./assets/images/rtarrow.svg";
import CloseIcon from "./assets/images/cross.svg";
import FullscreenIcon from "./assets/images/enlarge.svg";

export default function Lightbox({ images = [], currentIndex, setCurrentIndex }) {
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  if (currentIndex === null || !images[currentIndex]) return null;

  const current = images[currentIndex];

  const toggleFullscreen = async (e) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Fullscreen request failed:", err);
      }
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const showNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const showPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  // Padding and card height constants
  const cardHeight = 160; // approximate height of museum card
  const verticalPadding = 32; // top + bottom padding
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800;

  // Maximum height available for image when not fullscreen
  const maxImageHeight = isFullscreen ? viewportHeight : viewportHeight - cardHeight - verticalPadding;

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className={`fixed inset-0 backdrop-blur-sm bg-[#d5f7d9]/80 flex items-start justify-center z-50 ${
          isFullscreen ? "" : "p-4"
        }`}
        onClick={() => setCurrentIndex(null)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        <div
          className={`relative flex flex-col items-center max-w-full ${
            isFullscreen ? "" : "mt-8 mb-8"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative inline-block group mb-4">
            <motion.img
              src={current.lightboxImage || current.image}
              alt={current.title}
              loading="lazy"
              className="rounded-sm cursor-pointer object-contain block"
              style={{ maxHeight: maxImageHeight }}
              onClick={toggleFullscreen}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }}
              exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.4 } }}
            />

            {/* Left Arrow */}
            <button
              className="absolute top-1/2 flex items-center justify-center z-50"
              style={{ left: isFullscreen ? "-3rem" : "-5rem", transform: "translateY(-50%)" }}
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
            >
              <img src={LeftArrow} alt="Previous" className="w-8 h-12 transition-transform duration-200 ease-in-out hover:scale-125 hover:brightness-150" />
            </button>

            {/* Right Arrow */}
            <button
              className="absolute top-1/2 flex items-center justify-center z-50"
              style={{ right: isFullscreen ? "-3rem" : "-5rem", transform: "translateY(-50%)" }}
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
            >
              <img src={RightArrow} alt="Next" className="w-8 h-12 transition-transform duration-200 ease-in-out hover:scale-125 hover:brightness-150" />
            </button>

            {/* Close Button */}
            <button
              className="absolute w-10 h-10 flex items-center justify-center z-50"
              style={{ 
                top: "-0.5rem",   // slightly lower
                right: "-3rem"  // slightly more to the right
              }}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(null);
              }}
            >
              <img src={CloseIcon} alt="Close" className="w-6 h-6 transition-transform duration-200 ease-in-out hover:scale-125 hover:brightness-150" />
            </button>

              {/* Fullscreen Button */}
              <button
                className="absolute w-10 h-10 flex items-center justify-center z-50"
                style={{ 
                  top: "-0.5rem",    // slightly lower
                  left: "-3rem"    // slightly more to the left
                }}
                onClick={toggleFullscreen}
              >
                <img src={FullscreenIcon} alt="Fullscreen" className="w-6 h-6 transition-transform duration-200 ease-in-out hover:scale-125 hover:brightness-150" />
</button>
          </div>

          {/* Museum-style Card */}
          {!isFullscreen && (
            <div className="w-full max-w-[95vw] bg-[#e1e5e1] mt-1 p-1 pb-2 shadow flex flex-col items-start">
              <h2 className="font-bold text-lg mb-1 text-[#4a3f35]">{current.title}</h2>
              <p className="text-sm mb-2 text-[#333333]">{current.description}</p>
              <div className="flex space-x-1">
                {current.gumroadLink && (
                  <a
                    href={current.gumroadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: "#5F7536" }}
                    className="px-4 py-2 text-white font-medium rounded-sm shadow hover:opacity-90 transition-opacity"
>
                    Purchase
                  </a>
                )}
                <a
  href="http://localhost:3000/NomadsShopSaoPaulo"
  target="_blank"
  rel="noopener noreferrer"
  style={{ backgroundColor: "#634E39" }}
  className="px-4 py-2 text-white font-medium rounded-sm shadow hover:opacity-90 transition-opacity"
></a>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
