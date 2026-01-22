import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import artImages from "../assets/artImages.json"; // FIX: now in assets
import Logo from "../components/Logo";            // FIX: now in components
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
    <div className="min-h-screen pt-4 pb-8 relative">
      <SEO
        title="Nomads Gallery | Nomad Scribbles"
        description="Explore our curated gallery of photos and artwork from our travels around the world."
        image="/images/NomadsGallery/NGTitle.webp"
        slug="/nomads-gallery"
        canonical="https://nomadscribbles.com/nomads-gallery"
      />

      <div className="absolute top-2 left-4 z-20">
        <Link to="/home">
          <Logo className="h-6 w-auto sm:h-9 drop-shadow-lg filter brightness-110" />
        </Link>
      </div>

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
        className="px-2 sm:px-4 max-w-screen-xl mx-auto columns-3 sm:columns-3 md:columns-4 gap-2 sm:gap-4 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {shuffledImages.map((img, index) => {
          const isLarge = img.size || Math.random() > 0.7;

          return (
            <motion.div
              key={img.id}
              className={`mb-2 sm:mb-4 break-inside-avoid relative cursor-pointer ${isLarge ? "h-48 sm:h-[28rem]" : "h-32 sm:h-[20rem]"
                }`}
              variants={fadeScale}
              onClick={() => handleClick(index)}
              onMouseEnter={() => trackEvent("hover_gallery_image", "Nomads Gallery", img.title)}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleClick(index);
              }}
              whileHover="hover"
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
              animate={fadeScale.visible}
              initial={fadeScale.hidden}
              exit={fadeScale.exit}
            >
              <img
                src={img.image.replace(/\.(jpg|jpeg|png)$/, ".webp")}
                alt={img.title}
                className="w-full h-full object-contain block drop-shadow-[0_30px_30px_rgba(0,0,0,0.35)]"
                loading="lazy"
              />
            </motion.div>
          );
        })}
      </motion.main>
    </div>
  );
}
