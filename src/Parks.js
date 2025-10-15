import React, { useState } from "react";
import SEO from "./components/SEO";
import Lightbox from "./Lightbox";
import Logo from "./Logo";
import artImages from "./artImages.json";

function Parks() {
  // Filter only Parks images from JSON
  const parksImages = artImages.filter(img => img.category === "Parks");

  // Text for each image (match order/number of images)
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
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed pt-4"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/Home/Background2.jpg)`,
      }}
    >
      {/* SEO */}
      <SEO
        title="Parks of São Paulo — Green Sanctuaries | Nomad Scribbles"
        description="Discover São Paulo’s parks — from Ibirapuera’s stillness to the echoes of Burle Marx’s design — where art, nature, and calm coexist."
        image="/images/SP-Parks/ParksBackground.png"
        url="https://nomadscribbles.com/parks"
      />

      {/* Logo */}
      <div className="absolute top-3 left-4 z-10">
        <Logo className="h-6 sm:h-10 w-auto" />
      </div>

      {/* Hero & Title Images */}
      <div className="flex flex-col items-center mt-10 mb-6">
        <img
          src={process.env.PUBLIC_URL + "/images/Brazil/SaoPauloFeature.png"}
          alt="São Paulo city feature image"
          className="w-full max-w-screen-md h-auto rounded-lg shadow-lg"
        />
        <img
          src={process.env.PUBLIC_URL + "/images/SP-Parks/ParksTitle.png"}
          alt="Parks page title"
          className="mt-4 w-2/3 sm:w-1/2 md:w-1/3 h-auto"
        />
      </div>

      {/* Main Content */}
      <main className="px-4 py-8 max-w-screen-lg mx-auto space-y-12">
        <p className="text-center text-[#111] mb-8 bg-white/70 p-3 rounded text-sm sm:text-base lg:text-lg leading-relaxed">
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
              className="rounded-lg cursor-pointer w-full lg:w-2/5 shadow-md"
            />
            <div className="bg-white/85 p-3 rounded-md flex-1 text-[#111] text-left text-sm sm:text-base lg:text-lg leading-relaxed">
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
