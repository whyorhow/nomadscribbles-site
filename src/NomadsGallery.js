import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import artImages from "./artImages.json";
import Logo from "./Logo";
import SEO from "./components/SEO";
import { fadeScale, hoverScale, staggerContainer } from "./animations";

export default function NomadsGallery({ openLightbox }) {
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    const shuffled = [...artImages].sort(() => 0.5 - Math.random());
    setShuffledImages(shuffled);
  }, []);

  const handleClick = (index) => {
    openLightbox(index, shuffledImages);
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

      <div className="absolute top-3 left-4 z-20">
        <Link to="/home">
          <Logo className="h-6 w-auto sm:h-10" />
        </Link>
      </div>

      <div className="flex justify-center mb-6 relative z-10">
        <img
          src={process.env.PUBLIC_URL + "/images/NomadsGallery/NGTitle.webp"}
          alt="Nomads Gallery"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto"
        />
      </div>

      <h1 className="text-center text-3xl sm:text-4xl font-bold mt-4 mb-8 text-primaryText relative z-10">
        Click a photo below to explore the gallery.
      </h1>

      <motion.main
        className="px-4 max-w-screen-xl mx-auto columns-2 sm:columns-3 md:columns-4 gap-4 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {shuffledImages.map((img, index) => {
          const isLarge = img.size || Math.random() > 0.7;

          return (
            <motion.div
              key={img.id}
              className="mb-4 break-inside-avoid relative cursor-pointer"
              style={{ height: isLarge ? "28rem" : "20rem" }}
              variants={fadeScale}
              onClick={() => handleClick(index)}
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
