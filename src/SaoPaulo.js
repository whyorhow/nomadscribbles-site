import React, { useState } from "react";
import Logo from "./Logo";
import Lightbox from "./Lightbox";
import artImages from "./artImages.json";

function SaoPaulo() {
  // Filter only São Paulo Landing images from JSON
  const spImages = artImages.filter(img => img.category === "City Life");

  // Separate main page captions (like galleryTexts in Carnival)
  const galleryTexts = [
    "São Paulo’s pizza culture rivals Naples",
    "Quiet evening streets after the rain",
    "The classic Caipirinha: lime, sugar, cachaça",
    "The classic Caipirinha: lime, sugar, cachaça (illustrated)"
  ];

  const [currentIndex, setCurrentIndex] = useState(null);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pt-4"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/SaoPauloLanding/beach.jpg)` }}
    >
      {/* Logo */}
      <div className="absolute top-3 left-4 z-10">
        <Logo className="h-6 w-auto sm:h-10" />
      </div>

      {/* Hero Image */}
      <div className="flex justify-center mb-6">
        <img
          src={process.env.PUBLIC_URL + "/images/SaoPauloHeroImage.jpeg"}
          alt="View of São Paulo hills with lush greenery"
          className="w-full max-w-[95%] sm:max-w-[800px] h-auto rounded-lg shadow-lg"
        />
      </div>

      <h1 className="text-center text-[#111] text-3xl font-semibold mb-6">São Paulo</h1>

      <main className="px-4 py-8 max-w-screen-lg mx-auto space-y-12">
        {spImages.map((img, idx) => (
          <div
            key={img.id}
            className={`flex flex-col lg:flex-row items-center justify-center gap-6 ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <img
              src={img.blogimage}
              alt={img.title}
              onClick={() => setCurrentIndex(idx)}
              className="rounded-lg cursor-pointer w-full lg:w-2/5"
            />
            <div className="bg-white/85 p-4 rounded-md flex-1 text-[#111]">
              <h2 className="font-bold text-lg mb-2">{img.title}</h2>
              <p>{galleryTexts[idx]}</p>
            </div>
          </div>
        ))}

        {/* Links to child pages */}
        <div className="mt-12 mb-16 max-w-[900px] mx-auto">
          <ul className="space-y-6 text-xl text-[#c1c0bc]">
            <li>
              <a href="/brazil/saopaulo/parks" className="hover:underline">
                Explore the city’s lush <strong>Parks</strong>
              </a>
            </li>
            <li>
              <a href="/brazil/saopaulo/museums" className="hover:underline">
                Step inside São Paulo’s <strong>Museums</strong>
              </a>
            </li>
            <li>
              <a href="/brazil/saopaulo/carnival" className="hover:underline">
                Feel the rhythm of <strong>Carnival</strong>
              </a>
            </li>
            <li>
              <a href="/brazil/saopaulo/murals" className="hover:underline">
                Discover amazing <strong>Murals</strong>
              </a>
            </li>
            <li>
              <a href="/brazil/saopaulo/santos" className="hover:underline">
                Venture to <strong>Santos</strong>
              </a>
            </li>
          </ul>
        </div>
      </main>

      {/* Lightbox */}
      {currentIndex !== null && (
        <Lightbox
          images={spImages}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </div>
  );
}

export default SaoPaulo;
