import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import artImages from "../assets/artImages.json"; // FIX: now in assets
import SEO from "../components/SEO";              // FIX: now in components
import { fadeScale, hoverScale, staggerContainer } from "../utils/animations"; // FIX: now in utils
import { trackEvent } from "../utils/analytics";  // FIX: now in utils

export default function NomadsGallery({ openLightbox }) {
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    const shuffled = [...artImages].sort(() => 0.5 - Math.random());
    setShuffledImages(shuffled);
  }, []);

  const handleShuffle = () => {
    const shuffled = [...artImages].sort(() => 0.5 - Math.random());
    setShuffledImages(shuffled);
    trackEvent("click_shuffle", "Nomads Gallery", "Shuffle Button");
  };

  const handleClick = (index) => {
    openLightbox(index, shuffledImages);
    trackEvent("click_gallery_image", "Nomads Gallery", shuffledImages[index].title);
  };

  return (
    <div className="pt-4 pb-8 relative">
      <SEO
        title="Nomads Gallery | Nomad Scribbles"
        description="Explore our curated gallery of photos and artwork from our travels around the world."
        image="/images/NomadsGallery/NGTitle.webp"
        slug="/nomads-gallery"
        canonical="https://nomadscribbles.com/nomads-gallery"
      />


      <div className="flex flex-col items-center mb-10 relative z-10 mt-14 sm:mt-8">
        <img
          src={process.env.PUBLIC_URL + "/images/NomadsGallery/NGTitle.webp"}
          alt="Nomads Gallery"
          className="w-4/5 max-w-[12rem] sm:max-w-xs md:max-w-md lg:max-w-lg h-auto"
        />

        <div className="text-center text-sm sm:text-lg font-bold mt-4 text-[#eeda8d] drop-shadow-md opacity-80 flex flex-wrap justify-center gap-2 items-baseline">
          <span>click a piece below or</span>
          <button
            onClick={handleShuffle}
            className="bg-transparent border-none p-0 font-bold text-white hover:text-[#ffeebb] transition-colors cursor-pointer"
          >
            shuffle
          </button>
        </div>
      </div>

      <motion.main
        className="px-4 sm:px-8 max-w-screen-2xl mx-auto columns-1 sm:columns-2 md:columns-3 gap-12 sm:gap-16 md:gap-24 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {shuffledImages.map((img, index) => {
          return (
            <motion.div
              key={img.id}
              className="mb-16 sm:mb-24 break-inside-avoid relative flex flex-col group"
              variants={fadeScale}
              onClick={() => handleClick(index)}
              onMouseEnter={() => trackEvent("hover_gallery_image", "Nomads Gallery", img.title)}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleClick(index);
              }}
              whileHover="hover"
            >
              {/* Frame Container */}
              <div className="relative group-hover:scale-[1.02] transition-transform duration-500 cursor-pointer">
                <img
                  src={img.image.replace(/\.(jpg|jpeg|png)$/, ".webp")}
                  alt={img.title}
                  className="w-full h-auto block drop-shadow-2xl rounded-sm"
                  loading="lazy"
                />
              </div>

              {/* Museum Label */}
              <motion.div
                className="mt-6 ml-auto max-w-[180px] p-3 bg-white/40 backdrop-blur-md self-end transform transition-all duration-500 group-hover:translate-x-1 border-l border-[#eeda8d]/30"
                initial={{ opacity: 0.6, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h4 className="text-gray-900 text-xs font-bold uppercase tracking-widest mb-1 font-cormorant">
                  {img.title}
                </h4>
                {img.category && (
                  <p className="text-gray-600 text-[10px] italic font-serif leading-tight">
                    {img.category}
                  </p>
                )}
                <div className="mt-2 w-4 h-[1px] bg-[#eeda8d]/50" />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.main>

      <div className="flex justify-center my-10">
        <Link to="/" className="text-white hover:text-[#eeda8d] underline decoration-1 underline-offset-4 text-sm">
          ← Return Home
        </Link>
      </div>
    </div>
  );
}
