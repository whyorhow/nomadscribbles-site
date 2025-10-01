import React, { useState } from "react";
import Lightbox from "./Lightbox";
import Logo from "./Logo";
import artImages from "./artImages.json"; // Make sure this path is correct

function Parks() {
  // Filter only Parks images from JSON
  const parksImages = artImages.filter(img => img.category === "Parks");

  // Main page text (separate from JSON)
  const galleryTexts = [
    "Stillness lives here, but it’s never empty. Ibirapuera stretches wide through the city.",
    "At one quiet edge, a single caterpillar climbs across a monumental stone.",
    "Root Detail: Ibirapuera means “rotting tree” in Tupi — a poetic name for a swampy area turned sanctuary.",
    "In the canopy above, a monkey pauses. The movement of trees echoes slower than traffic.",
    "Down below, tree stumps cradle patches of moss and fungus — intricate and quiet.",
    "They catch the light like sculptures, quietly reclaiming the forest floor.",
    "Echoes in Concrete: Burle Marx used sweeping native curves and vegetation to mimic the movement of sound."
  ];

  const [currentIndex, setCurrentIndex] = useState(null);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pt-4"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/SP-Parks/park-Edit.jpg)` }}
    >
      {/* Logo */}
      <div className="absolute top-3 left-4 z-10">
        <Logo className="h-6 w-auto sm:h-10" />
      </div>

      {/* Hero Image */}
      <div className="flex justify-center mb-6">
        <img
          src={process.env.PUBLIC_URL + "/images/SaoPauloHeroImage.jpeg"}
          alt="São Paulo city skyline"
          className="w-2/3 lg:w-1/3 h-auto rounded-lg"
        />
      </div>

      <h1 className="text-center text-[#111] text-3xl font-semibold mb-6">Parks</h1>

      <main className="px-4 py-8 max-w-screen-lg mx-auto space-y-12">
        <p className="text-center text-[#111] mb-8 bg-white/70 p-2 rounded">
          Discover São Paulo’s parks, where nature, art, and history coexist.
        </p>

        {parksImages.map((img, idx) => (
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
            <div className="bg-white/85 p-3 rounded-md flex-1 text-[#111] text-left">
              <h2 className="font-bold text-lg mb-2">{img.title}</h2>
              <p>{galleryTexts[idx]}</p>
            </div>
          </div>
        ))}
      </main>

      {/* Lightbox */}
      {currentIndex !== null && (
        <Lightbox
          images={parksImages}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </div>
  );
}

export default Parks;
