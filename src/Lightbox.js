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
  const isObject = typeof current === "object";

  const imageSrc = isObject ? current.lightboxImage || current.image : current;
  const title = isObject ? current.title : "";
  const description = isObject ? current.shortDescription || "" : "";
  const gumroadLink = isObject ? current.gumroadLink : null;
  const shopLink = isObject ? current.shopLink : null;

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

  const cardHeight = 160;
  const verticalPadding = 32;
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800;
  const maxImageHeight = isFullscreen ? viewportHeight : viewportHeight - cardHeight - verticalPadding;

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className={`fixed inset-0 backdrop-blur-sm bg-[#2f3e2f]/90 flex items-start justify-center z-50 ${
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
          <div className="relative inline-block group mb-4">
            <motion.img
              src={imageSrc}
              alt={title}
              loading="lazy"
              className={`
                rounded-sm cursor-pointer object-contain block
                ${isFullscreen
                  ? "max-w-[100vw] max-h-[100vh]"
                  : "max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] max-h-[80vh] sm:max-h-[75vh] md:max-h-[70vh] lg:max-h-[65vh]"
                }
              `}
              onClick={toggleFullscreen}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } }}
              exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.4 } }}
            />

            {/* Left arrow */}
            <button
              className="absolute top-1/2 flex items-center justify-center z-50"
              style={{ left: isFullscreen ? "-3rem" : "-5rem", transform: "translateY(-50%)" }}
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
            >
              <img src={LeftArrow} alt="Previous" className="w-8 h-12 transition-transform duration-200 ease-in-out hover:scale-125 hover:brightness-150" />
            </button>

            {/* Right arrow */}
            <button
              className="absolute top-1/2 flex items-center justify-center z-50"
              style={{ right: isFullscreen ? "-3rem" : "-5rem", transform: "translateY(-50%)" }}
              onClick={(e) => { e.stopPropagation(); showNext(); }}
            >
              <img src={RightArrow} alt="Next" className="w-8 h-12 transition-transform duration-200 ease-in-out hover:scale-125 hover:brightness-150" />
            </button>

            {/* Close button */}
            <button
              className="absolute w-10 h-10 flex items-center justify-center z-50"
              style={{ top: "-0.5rem", right: "-3rem" }}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(null); }}
            >
              <img src={CloseIcon} alt="Close" className="w-6 h-6 transition-transform duration-200 ease-in-out hover:scale-125 hover:brightness-150" />
            </button>

            {/* Fullscreen / Enlarge button, hidden in fullscreen */}
            {!isFullscreen && (
              <button
                className="absolute w-10 h-10 flex items-center justify-center z-50"
                style={{ top: "-0.5rem", left: "-3rem" }}
                onClick={toggleFullscreen}
              >
                <img
                  src={FullscreenIcon}
                  alt="Fullscreen"
                  className="w-6 h-6 transition-transform duration-200 ease-in-out hover:scale-125 hover:brightness-150"
                />
              </button>
            )}
          </div>

          {!isFullscreen && (
            <div className="w-full max-w-[95vw] bg-[#e1e5e1] mt-1 p-1 pb-2 shadow flex flex-col items-start">
              {title && <h2 className="font-bold text-lg mb-1 text-[#4a3f35]">{title}</h2>}
              {description && <p className="text-sm mb-2 text-[#333333]">{description}</p>}
              <div className="flex space-x-1">
                {gumroadLink && (
                  <a
                    href={gumroadLink}
                    style={{ backgroundColor: "#5F7536" }}
                    className="px-4 py-2 text-white font-medium rounded-sm shadow hover:opacity-90 transition-opacity"
                  >
                    Purchase
                  </a>
                )}
                {shopLink && (
                  <a
                    href={shopLink}
                    style={{ backgroundColor: "#634E39" }}
                    className="px-4 py-2 text-white font-medium rounded-sm shadow hover:opacity-90 transition-opacity"
                  >
                    Shop
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
