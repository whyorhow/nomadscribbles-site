import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import SEO from "./components/SEO";

export default function NomadsShop() {
  const countries = [
    { name: "Austria", img: "/images/Adventures/AustriaFlag.webp" },
    { name: "Belgium", img: "/images/Adventures/BelgiumFlag.webp" },
    { name: "Brazil", img: "/images/Adventures/BrazilFlag.webp", link: "/nomads-shop/brazil" },
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
    <div className="min-h-screen relative">
      {/* SEO */}
      <SEO
        title="Adventures Around the World | Nomad Scribbles"
        description="Join us on journeys across the globe — explore flags, stories, and adventures with Nomad Scribbles."
        image="/images/Adventures/AdventuresBD.webp"
        slug="adventures"
        canonical="https://yourdomain.com/adventures"
      />
      {/* Logo */}
      <div className="mt-4 ml-4 z-30">
        <Logo className="h-6 w-auto sm:h-10" />
      </div>

      {/* Hero / Title Image */}
      <div className="flex justify-center mb-6 mt-2 px-2">
        <img
          src="/images/NomadsShop/NomadsShopTitle.webp"
          alt="NomadsShop Hero"
          className="max-w-full w-[54%] sm:w-[42%] md:w-[36%] lg:w-[30%] h-auto rounded-lg"
        />
      </div>
      {/* Instruction heading */}
<h1 className="text-center text-3xl sm:text-4xl font-bold mt-4 mb-8 text-primaryText">
  Click a country below to explore our collections.
</h1>

      {/* Country Flags Grid */}
      <div className="max-w-screen-lg mx-auto px-4 py-8">
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
