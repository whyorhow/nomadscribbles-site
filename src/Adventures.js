import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

function Adventures() {
  // Full list of flags
  const countries = [
    { name: "Austria", img: "/images/Adventures/AustriaFlag.png" },
    { name: "Belgium", img: "/images/Adventures/BelgiumFlag.png" },
    { name: "Brazil", img: "/images/Adventures/BrazilFlag.png", link: "/brazil" },
    { name: "Czech Republic", img: "/images/Adventures/CzechFlag.png" },
    { name: "England", img: "/images/Adventures/EnglandFlag.png" },
    { name: "France", img: "/images/Adventures/FranceFlag.png" },
    { name: "Germany", img: "/images/Adventures/GermanyFlag.png" },
    { name: "Greece", img: "/images/Adventures/GreeceFlag.png" },
    { name: "Hungary", img: "/images/Adventures/HungaryFlag.png" },
    { name: "India", img: "/images/Adventures/IndiaFlag.png" },
    { name: "Italy", img: "/images/Adventures/ItalyFlag.png" },
    { name: "Netherlands", img: "/images/Adventures/NetherlandsFlag.png" },
    { name: "Scotland", img: "/images/Adventures/ScotlandFlag.png" },
    { name: "Switzerland", img: "/images/Adventures/SwissFlag.png" },
    { name: "Thailand", img: "/images/Adventures/ThaiFlag.png" },
    { name: "United States", img: "/images/Adventures/USAFlag.png" },
    { name: "Wales", img: "/images/Adventures/WalesFlag.png" }
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pt-4"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/PlacesetterBackground.jpg)`
      }}
    >
      {/* Logo at top-left, scrolls with page */}
      <div className="absolute top-3 left-4 z-8">
  <Logo className="h-6 w-auto sm:h-10" />
      </div>

      {/* Page Title */}
      <div className="flex justify-center mb-4">
        <img
          src={process.env.PUBLIC_URL + "/images/Adventures/Adventures.png"}
          alt="Adventures"
          className="w-[250px] sm:w-[300px] md:w-[400px] h-auto"
        />
      </div>

      {/* Main Content */}
      <main className="px-4 py-6 max-w-screen-lg mx-auto text-center text-[#FFF6EE] space-y-6">
        <p>
          Explore the places we’ve journeyed through, each flag opening a window into new stories and adventures.
        </p>

        {/* Country Flags */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-8">
          {countries.map((country, index) => {
            const FlagWrapper = country.link ? Link : "div";
            return (
              <FlagWrapper
                key={index}
                to={country.link || "#"}
                className="relative group cursor-pointer"
              >
                <img
                  src={process.env.PUBLIC_URL + country.img}
                  alt={`${country.name} flag`}
                  className="w-full h-32 object-cover rounded-lg shadow-lg transition-transform duration-200 group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-[#FFF6EE] text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  {country.name}
                </div>
              </FlagWrapper>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Adventures;
