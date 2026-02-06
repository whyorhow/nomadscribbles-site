import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

function Adventures() {
  const countries = [
    { name: "Austria", img: "/images/Adventures/AustriaFlag.webp" },
    { name: "Belgium", img: "/images/Adventures/BelgiumFlag.webp" },
    { name: "Brazil", img: "/images/Adventures/BrazilFlag.webp", link: "/brazil" },
    { name: "Czech Republic", img: "/images/Adventures/CzechFlag.webp" },
    { name: "England", img: "/images/Adventures/EnglandFlag.webp" },
    { name: "France", img: "/images/Adventures/FranceFlag.webp" },
    { name: "Germany", img: "/images/Adventures/GermanyFlag.webp" },
    { name: "Greece", img: "/images/Adventures/GreeceFlag.webp" },
    { name: "Hungary", img: "/images/Adventures/HungaryFlag.webp" },
    { name: "India", img: "/images/Adventures/IndiaFlag.webp" },
    { name: "Italy", img: "/images/Adventures/ItalyFlag.webp" },
    { name: "Scotland", img: "/images/Adventures/ScotlandFlag.webp" },
    { name: "Switzerland", img: "/images/Adventures/SwissFlag.webp" },
    { name: "Thailand", img: "/images/Adventures/ThaiFlag.webp" },
    { name: "United States", img: "/images/Adventures/USAFlag.webp" },
    { name: "Wales", img: "/images/Adventures/WalesFlag.webp" }
  ];

  return (
    <div className="min-h-screen pt-4">
      {/* SEO Component */}
      <SEO
        title="Adventures Around the World | Nomad Scribbles"
        description="Join us on our journeys across the globe — from Europe to Asia and the Americas, explore flags, stories, and adventures with Nomad Scribbles."
        image="/images/Adventures/AdventuresBD.png"
        slug="adventures"
      />


      {/* Hidden H1 for accessibility */}
      <h1 className="sr-only">Nomad Scribbles | Adventures Around the World</h1>

      {/* Page Title */}
      <div className="flex justify-center mb-4">
        <img
          src={process.env.PUBLIC_URL + "/images/Adventures/Adventures.png"}
          alt="Adventures"
          className="w-[250px] sm:w-[300px] md:w-[400px] h-auto rounded-lg shadow-lg p-4"
        />
      </div>

      {/* Main Content */}
      <section aria-label="Countries" className="px-2 py-0 max-w-screen-lg mx-auto text-center text-[#eeda8d] space-y-0">
        <p className="text-lg sm:text-xl md:text-2xl font-cormorant italic leading-relaxed tracking-wide">
          Explore the places we’ve journeyed through, each flag opening a window into new stories and adventures.
        </p>

        {/*
  <p className="text-base sm:text-lg md:text-xl leading-relaxed tracking-wide">
    From bustling cities to quiet villages, follow along as we share moments of culture, nature, and everyday discovery.
  </p>

  <p className="text-base sm:text-lg md:text-xl leading-relaxed tracking-wide">
    Every adventure is a story, and every story is a memory — welcome to Nomad Scribbles.
  </p>
        {/* Country Flags */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-4">
          {countries.map((country, index) => {
            if (country.link) {
              return (
                <Link
                  key={index}
                  to={country.link}
                  className="relative group cursor-pointer block"
                >
                  <img
                    src={process.env.PUBLIC_URL + country.img}
                    alt={`Flag of ${country.name}`}
                    className="w-full h-32 object-cover rounded-lg shadow-lg transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-[#FFF6EE] text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                    {country.name}
                  </div>
                </Link>
              );
            } else {
              return (
                <div
                  key={index}
                  className="relative group"
                  aria-label={`${country.name} (Coming Soon)`}
                >
                  <img
                    src={process.env.PUBLIC_URL + country.img}
                    alt={`Flag of ${country.name} (Coming Soon)`}
                    className="w-full h-32 object-cover rounded-lg shadow-lg grayscale opacity-70"
                  />
                  {/* Always visible label for non-clickable items to avoid confusion */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-[#FFF6EE] text-lg font-semibold rounded-lg">
                    {country.name}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </section>
    </div>
  );
}

export default Adventures;
