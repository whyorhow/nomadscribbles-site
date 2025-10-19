import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import SEO from "./components/SEO";

function Brazil() {
  const cities = [
    { name: "Rio de Janeiro", path: "/brazil/rio" },
    { name: "Salvador", path: "/brazil/salvador" },
    { name: "Foz do Iguaçu", path: "/brazil/foz" },
    { name: "The Pantanal", path: "/brazil/pantanal" },
    { name: "Bonito", path: "/brazil/bonito" },
    { name: "Manaus", path: "/brazil/manaus" },
  ];

  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className="relative min-h-screen">
      <SEO
        title="Travel Adventures in Brazil | Nomad Scribbles"
        description="Explore Brazil’s most iconic cities and landscapes — from Rio de Janeiro and São Paulo to the Pantanal and Bonito, join our journeys across the country."
        image="/images/Brazil/BrazilBack.png"
        slug="/brazil"
      />

      {/* Hidden H1 for accessibility */}
      <h1 className="sr-only">Nomad Scribbles | Travel Adventures in Brazil</h1>

{/* Logo */}
<div className="mt-4 ml-4 z-30">
  <Link to="/home">
    <Logo className="h-6 w-auto sm:h-10" />
  </Link>
</div>


      {/* Hero Image with Overlay */}
      <div
        className="relative w-full max-w-3xl mx-auto mt-14 mb-6 cursor-pointer"
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
        onClick={() => setShowOverlay(!showOverlay)}
      >
        <img
          src={process.env.PUBLIC_URL + "/images/Brazil/BrazilHero.webp"}
          alt="Brazilian landscape with city and nature"
          className="w-full h-auto object-contain shadow-lg"
        />
        <img
          src={process.env.PUBLIC_URL + "/images/Brazil/BrazilPhoto.webp"}
          alt="Overlay Brazil photo"
          className={`absolute inset-0 w-full h-full object-contain shadow-lg transition-opacity duration-500 ${
            showOverlay ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Feature Image: São Paulo */}
      <div className="w-full max-w-2xl mb-6 mx-auto">
        <Link to="/brazil/saopaulo">
          <img
            src={process.env.PUBLIC_URL + "/images/SaoPauloLanding/SaoPauloFeature.webp"}
            alt="São Paulo city"
            className="w-full h-auto object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Other Cities */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg w-full mx-auto mb-12">
        {cities.map((city) => {
          if (city.path === "/brazil/saopaulo") {
            return (
              <Link
                key={city.name}
                to={city.path}
                className="bg-white/80 text-gray-900 backdrop-blur-md rounded-xl py-3 text-center hover:bg-white hover:shadow-lg transition duration-300"
              >
                {city.name}
              </Link>
            );
          } else {
            return (
              <div
                key={city.name}
                className="bg-white/50 text-gray-600 backdrop-blur-md rounded-xl py-3 text-center cursor-not-allowed"
              >
                {city.name}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Brazil;
