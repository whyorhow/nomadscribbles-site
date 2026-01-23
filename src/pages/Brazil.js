import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { fadeScale, staggerContainer } from "../utils/animations";

function Brazil() {
  const cities = [
    { name: "Rio de Janeiro", path: "/brazil/rio" },
    { name: "Salvador", path: "/brazil/salvador" },
    { name: "Foz do Iguaçu", path: "/brazil/foz" },
    { name: "Pantanal", path: "/brazil/pantanal" },
    { name: "Bonito", path: "/brazil/bonito" },
    { name: "Manaus", path: "/brazil/manaus" },
  ];

  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <motion.div
      className="relative min-h-screen"
      variants={staggerContainer}
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

      <div className="mt-4 ml-4 z-50">
        <Logo className="h-6 w-auto sm:h-10" />
      </div>

      {/* Hero Image with Overlay */}
      <motion.div
        className="relative w-full max-w-3xl mx-auto mt-14 mb-6 cursor-pointer"
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
        onClick={() => setShowOverlay(!showOverlay)}
        variants={fadeScale}
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
      </motion.div>

      {/* Feature Image: São Paulo */}
      <motion.div
        className="w-full max-w-2xl mb-6 mx-auto"
        variants={fadeScale}
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
        variants={staggerContainer}
      >
        {cities.map((city) => (
          <motion.div
            key={city.name}
            variants={fadeScale}
          >
            {["/brazil/saopaulo", "/brazil/pantanal", "/brazil/rio", "/brazil/salvador"].includes(city.path) ? (
              <Link
                to={city.path}
                className="block w-full bg-white/80 text-gray-900 backdrop-blur-md rounded-xl py-3 text-center hover:bg-white hover:shadow-lg transition duration-300"
              >
                {city.name}
              </Link>
            ) : (
              <div className="bg-white/50 text-gray-600 backdrop-blur-md rounded-xl py-3 text-center cursor-not-allowed">
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
