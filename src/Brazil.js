import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Logo from "./Logo";

function Brazil() {
  const cities = [
    { name: "Rio de Janeiro", path: "/brazil/rio" },
    { name: "Salvador", path: "/brazil/salvador" },
    { name: "Foz do Iguaçu", path: "/brazil/foz" },
    { name: "The Pantanal", path: "/brazil/pantanal" },
    { name: "Bonito", path: "/brazil/bonito" },
    { name: "Manaus", path: "/brazil/manaus" },
  ];

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/Home/Background2.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* SEO Helmet */}
      <Helmet>
        <title>Travel Adventures in Brazil | Nomad Scribbles</title>
        <meta
          name="description"
          content="Explore Brazil’s most iconic cities and landscapes — from Rio de Janeiro and São Paulo to the Pantanal and Bonito, join our journeys across the country."
        />
        <meta property="og:title" content="Travel Adventures in Brazil" />
        <meta
          property="og:description"
          content="Explore Brazil’s most iconic cities and landscapes — from Rio de Janeiro and São Paulo to the Pantanal and Bonito, join our journeys across the country."
        />
        <meta
          property="og:image"
          content={`${process.env.PUBLIC_URL}/images/Brazil/BrazilBack.png`}
        />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://nomadscribbles.com/brazil" />
      </Helmet>

      {/* Hidden H1 for accessibility */}
      <h1 className="sr-only">Nomad Scribbles | Travel Adventures in Brazil</h1>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Page Content */}
      <div className="relative z-10 flex flex-col items-center pt-4 px-4">

        {/* Logo */}
        <div className="absolute top-4 left-4 z-20">
          <Link to="/home">
            <Logo className="h-6 w-auto sm:h-10" />
          </Link>
        </div>

{/* Hero Image */}
<div className="w-full max-w-3xl mb-6 mt-14"> {/* reduced from max-w-5xl to max-w-3xl */}
  <img
    src={process.env.PUBLIC_URL + "/images/Brazil/BrazilHero.jpg"}
    alt="Brazilian landscape with city and nature"
    className="w-full h-auto object-contain rounded-xl shadow-lg"
  />
</div>


        {/* Feature Image: São Paulo */}
        <div className="w-full max-w-2xl mb-6">
          <Link to="/brazil/saopaulo">
            <img
              src={process.env.PUBLIC_URL + "/images/Brazil/SaoPauloFeature.png"}
              alt="São Paulo city"
              className="w-full h-auto object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Other Cities */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg w-full mb-12">
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
    </div>
  );
}

export default Brazil;
