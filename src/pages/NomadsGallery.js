import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import artImages from "../assets/artImages.json";
import SEO from "../components/SEO";
import Logo from "../components/Logo";
import { fadeScale, staggerContainer } from "../utils/animations";
import { trackEvent } from "../utils/analytics";

export default function NomadsGallery({ openLightbox }) {
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    // Initial shuffle on mount
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
    <div className="pt-4 pb-8 relative min-h-screen">
      <SEO
        title="Nomads Gallery | Nomad Scribbles"
        description="Explore our curated gallery of photos and artwork from our travels around the world."
        image="/images/NomadsGallery/NGTitle.webp"
        slug="/nomads-gallery"
        canonical="https://nomadscribbles.com/nomads-gallery"
      />


      {/* Page Title - High Priority Load */}
      <div className="flex flex-col items-center mb-10 relative z-10 mt-14 sm:mt-8">
        <img
          src={process.env.PUBLIC_URL + "/images/NomadsGallery/NGTitle.webp"}
          alt="Nomads Gallery"
          fetchPriority="high"
          loading="eager"
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

      {/* Organic Flex Layout */}
      <motion.main
        className="px-6 sm:px-12 md:px-20 lg:px-32 max-w-[2000px] mx-auto flex flex-wrap relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {shuffledImages.map((img, index) => {
          // Calculate pseudo-random offsets and rotation
          const charSum = img.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const rotation = (charSum % 7) - 3; // -3deg to 3deg

          // Determine layout type based on index for a curated yet random feel
          // 0: Centered Large, 1: Left Half, 2: Right Half, 3: Centered Regular, 4: Staggered Wide
          const layoutType = index % 5;
          let widthClass = "w-full";
          let alignClass = "justify-center";
          let innerWidth = "w-full max-w-4xl";
          let offsetMultiplier = 1;

          switch (layoutType) {
            case 0: // Centered Large (Single width)
              widthClass = "w-full mb-48 lg:mb-72";
              alignClass = "justify-center";
              innerWidth = "w-full max-w-5xl";
              offsetMultiplier = 0.5;
              break;
            case 1: // Left Half
              widthClass = "w-full md:w-1/2 mb-32 lg:mb-48 pr-4 md:pr-12";
              alignClass = "justify-start";
              innerWidth = "w-full";
              break;
            case 2: // Right Half
              widthClass = "w-full md:w-1/2 mb-32 lg:mb-48 pl-4 md:pl-12";
              alignClass = "justify-end";
              innerWidth = "w-full";
              break;
            case 3: // Centered Regular (Single width)
              widthClass = "w-full mb-48 lg:mb-72";
              alignClass = "justify-center";
              innerWidth = "w-full max-w-3xl";
              offsetMultiplier = 0.7;
              break;
            case 4: // Staggered Wide
              widthClass = "w-full mb-32 lg:mb-48 px-4 md:px-20";
              alignClass = index % 2 === 0 ? "justify-start" : "justify-end";
              innerWidth = "w-full md:w-2/3";
              break;
            default:
              widthClass = "w-full md:w-1/2 mb-32";
          }

          const offsetX = ((charSum % 101) - 50) * offsetMultiplier;
          const offsetY = (((charSum * 7) % 81) - 40) * offsetMultiplier;

          return (
            <motion.div
              key={`${img.id}-${index}`}
              className={`${widthClass} flex ${alignClass} group`}
              variants={fadeScale}
              onClick={() => handleClick(index)}
              onMouseEnter={() => trackEvent("hover_gallery_image", "Nomads Gallery", img.title)}
            >
              <div
                className={`${innerWidth} relative flex flex-col`}
                style={{
                  transform: `translate(${offsetX}px, ${offsetY}px)`,
                }}
              >
                {/* Frame Container */}
                <motion.div
                  className="relative cursor-pointer shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden"
                  whileHover={{
                    scale: 1.02,
                    zIndex: 20,
                    transition: { duration: 0.6, ease: "easeOut" }
                  }}
                >
                  <img
                    src={process.env.PUBLIC_URL + img.image.replace(/\.(jpg|jpeg|png)$/, ".webp")}
                    alt={img.title}
                    className="w-full h-auto block brightness-[0.98] group-hover:brightness-100 transition-all duration-700"
                    loading="lazy"
                  />
                </motion.div>

                {/* Label */}
                <motion.div
                  className="mt-8 ml-auto max-w-[240px] p-5 bg-white/10 backdrop-blur-xl self-end transform transition-all duration-700 group-hover:translate-x-4 border-l-4 border-[#eeda8d]/40 shadow-2xl"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h4 className="text-gray-950 text-sm font-bold uppercase tracking-[0.3em] mb-3 font-cormorant leading-tight">
                    {img.title}
                  </h4>
                  {img.category && (
                    <p className="text-gray-800 text-xs italic font-serif leading-tight opacity-90">
                      {img.category}
                    </p>
                  )}
                  <div className="mt-4 w-10 h-[1.5px] bg-[#eeda8d]/70" />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.main>

      <div className="flex flex-col items-center gap-6 my-16 relative z-10">
        <button
          onClick={() => window.history.back()}
          className="flex flex-row items-center justify-center text-stone-300 hover:text-white transition-colors drop-shadow-md bg-stone-950/50 backdrop-blur-md rounded-full px-8 py-3 border border-white/10 shadow-lg hover:bg-stone-900/60 w-fit min-w-[240px] cursor-pointer"
        >
          <span className="text-xl mr-3 pb-1">←</span>
          <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Return to Previous Page</span>
        </button>
      </div>
    </div>
  );
}
