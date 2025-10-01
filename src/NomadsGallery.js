import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import artImages from "./artImages.json";
import Logo from "./Logo";
import { ReactComponent as NomadsTitle } from "./assets/images/NGTitle.svg";

export default function NomadsGallery({ openLightbox }) {
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    const shuffled = [...artImages].sort(() => 0.5 - Math.random());
    setShuffledImages(shuffled);
  }, []);

  const handleClick = (index) => {
    openLightbox(index, shuffledImages); // pass the full item objects
  };

  // Motion variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen pt-4 pb-8 bg-[#95af98] relative">

      {/* Logo at top-left, scrolls with page */}
      <div className="absolute top-3 left-4 z-8">
  <Logo className="h-6 w-auto sm:h-10" />
      </div>

<div className="flex justify-center mb-6">
  <NomadsTitle className="w-32 sm:w-96 h-auto" />
</div>

      {/* Masonry Grid with stagger */}
      <motion.main
        className="px-4 max-w-screen-xl mx-auto columns-2 sm:columns-3 md:columns-4 gap-4"
        variants={containerVariants}
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
              variants={itemVariants}
              onClick={() => handleClick(index)}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleClick(index);
              }}
              whileHover={{ scale: 1.5, zIndex: 50 }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            >
              <img
                src={img.image}
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
