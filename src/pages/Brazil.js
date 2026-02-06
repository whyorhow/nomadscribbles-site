import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { motion, useReducedMotion } from "framer-motion";
import { fadeScale, staggerContainer } from "../utils/animations";

function Brazil() {
  const shouldReduceMotion = useReducedMotion();
  const cities = [
    { name: "Rio de Janeiro", path: "/brazil/rio", alt: "Link to Rio de Janeiro adventures" },
    { name: "Salvador", path: "/brazil/salvador", alt: "Link to Salvador adventures" },
    { name: "Foz do Iguaçu", path: "/brazil/foz", alt: "Link to Foz do Iguaçu adventures" },
    { name: "Pantanal", path: "/brazil/pantanal", alt: "Link to Pantanal adventures" },
    { name: "Bonito", path: "/brazil/bonito", alt: "Link to Bonito adventures" },
    { name: "Manaus", path: "/brazil/manaus", alt: "Link to Manaus adventures" },
  ];

  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <motion.div
      className="relative min-h-screen pb-20"
      variants={shouldReduceMotion ? {} : staggerContainer}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <SEO
        title="Travel Adventures in Brazil | Nomad Scribbles"
        description="Explore Brazil’s most iconic cities and landscapes — from Rio de Janeiro and São Paulo to the Pantanal and Bonito, join our journeys across the country."
        image="/images/Brazil/BrazilBack.png"
        slug="/brazil"
      />

      <h1 className="sr-only">Nomad Scribbles | Travel Adventures in Brazil</h1>


      {/* Hero Image with Overlay */}
      <motion.button
        type="button"
        className="relative w-full max-w-3xl mx-auto mt-24 mb-20 cursor-pointer block border-none bg-transparent p-0"
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
        onFocus={() => setShowOverlay(true)}
        onBlur={() => setShowOverlay(false)}
        onClick={() => setShowOverlay(!showOverlay)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setShowOverlay(!showOverlay);
          }
        }}
        variants={shouldReduceMotion ? {} : fadeScale}
        aria-label="Toggle Brazil landscape overlay"
      >
        <img
          src={process.env.PUBLIC_URL + "/images/Brazil/BrazilHero.webp"}
          alt="Brazilian landscape with city and nature"
          className="w-full h-auto object-contain shadow-lg rounded-lg p-4"
        />
        <img
          src={process.env.PUBLIC_URL + "/images/Brazil/BrazilPhoto.webp"}
          alt="Overlay Brazil photo"
          className={`absolute inset-0 w-full h-full object-contain shadow-lg transition-opacity duration-500 ${showOverlay ? "opacity-100" : "opacity-0"
            }`}
        />
      </motion.button>

      {/* Feature Image: São Paulo */}
      <motion.div
        className="w-full max-w-2xl mb-20 mx-auto"
        variants={shouldReduceMotion ? {} : fadeScale}
      >
        <Link to="/brazil/saopaulo">
          <img
            src={process.env.PUBLIC_URL + "/images/SaoPauloLanding/SaoPauloFeature.webp"}
            alt="São Paulo city"
            className="w-full h-auto object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </motion.div>

      {/* Other Cities */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg w-full mx-auto mb-12"
        variants={shouldReduceMotion ? {} : staggerContainer}
      >
        {cities.map((city) => (
          <motion.div
            key={city.name}
            variants={shouldReduceMotion ? {} : fadeScale}
          >
            {["/brazil/saopaulo", "/brazil/pantanal", "/brazil/rio", "/brazil/salvador"].includes(city.path) ? (
              <Link
                to={city.path}
                className="block w-full bg-white/80 text-gray-900 backdrop-blur-md rounded-xl py-3 text-center hover:bg-white hover:shadow-lg transition duration-300"
                aria-label={`Explore ${city.name}`}
              >
                {city.name}
              </Link>
            ) : (
              <div className="bg-white/50 text-gray-600 backdrop-blur-md rounded-xl py-3 text-center cursor-not-allowed" aria-disabled="true">
                {city.name}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Brazil;
