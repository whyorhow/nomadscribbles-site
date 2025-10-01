import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function NomadsShop() {
  const countries = [
    { name: "Austria", img: "/images/Adventures/AustriaFlag.png" },
    { name: "Belgium", img: "/images/Adventures/BelgiumFlag.png" },
    { name: "Brazil", img: "/images/Adventures/BrazilFlag.png", link: "/nomads-shop/brazil" },
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
      className="min-h-screen bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(/images/NomadsShop/NomadsShopBgd.jpg)`,
        backgroundPosition: "top center",
      }}
    >
      {/* Logo at top-left */}
      <div className="absolute top-3 left-4 z-8">
        <Logo className="h-6 w-auto sm:h-10" />
      </div>

      {/* Hero / Title Image */}
      <div className="flex justify-center mb-6">
        <img
          src="/images/NomadsShop/NomadsShopTitle.png"
          alt="NomadsShop Hero"
          className="max-w-full w-[54%] sm:w-[42%] md:w-[36%] lg:w-[30%] h-auto rounded-lg"
        />
      </div>

      <h1 className="text-center text-[#111] text-3xl font-semibold mb-6">
        Explore Our Collections
      </h1>

      {/* Country Flags Grid */}
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {countries.map((country, index) => {
            const isLink = !!country.link;
            const Wrapper = isLink ? Link : "div";

            return (
              <Wrapper
                key={index}
                to={country.link || "#"}
                className="relative group cursor-pointer"
              >
                <div className="aspect-[4/3] w-full rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={country.img}
                    alt={`${country.name} flag`}
                    className={`w-full h-full object-cover transition-transform duration-200 ${isLink ? "group-hover:scale-105" : ""}`}
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                    <span>{country.name}</span>
                    {!isLink && <span className="text-sm mt-1 opacity-80">Coming Soon</span>}
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
}
