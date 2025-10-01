import React, { useState } from "react";
import Lightbox from "./Lightbox";
import Logo from "./Logo";
import artImages from "./artImages.json";

function Santos() {
  // Filter only Santos images from JSON
  const santosImages = artImages.filter(img => img.category === "Santos");

  // Main page text (separate from JSON)
  const galleryTexts = [
    "Nestled on the Atlantic coast, Santos offers a different rhythm from the bustling metropolis nearby. Its skyline rises with modern buildings, yet the sea breeze brings a slower, salt-tinged pace. Storm clouds often gather over the city, painting dramatic contrasts between concrete and sky.",
    "Santos is synonymous with football royalty — Pelé, the legendary king of the sport, calls this city home. His museum stands proud, a tribute to his career and Brazil’s passion for the beautiful game. Walls around town echo his legacy, from vibrant murals to quiet street corners honoring the man who made football an art form.",
    "Footsteps of legends: Pelé scored his 1,000th goal here at the Vila Belmiro stadium, turning Santos into more than just a football city — it’s a shrine for the beautiful game.",
    "Beyond the city’s core, the hills cradle elegant houses framed by lush greenery. Winding roads lead to quiet viewpoints, where the city hums below like a distant radio. This blend of urban energy and natural beauty invites visitors to explore a city alive with history, heart, and a rhythm all its own.",
    "City Resonance: Did you know? Santos holds the largest port in Latin America, vital to Brazil’s economy for centuries. Meanwhile, Pelé’s influence extends beyond football — his childhood home is a cherished landmark, drawing fans worldwide to celebrate a true national icon.",
    "Stretching beaches meet the urban edge, where locals and travellers mingle. The shoreline of Santos is both playground and backdrop, a reminder of the city’s balance between sea and skyline."
  ];

  const [currentIndex, setCurrentIndex] = useState(null);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pt-4"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/Santos/SantosBackground.jpg)`,
      }}
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

      <h1 className="text-center text-[#111] text-3xl font-semibold mb-6">
        Santos
      </h1>

      <main className="px-4 py-8 max-w-screen-lg mx-auto space-y-12">
        <p className="text-center text-[#111] mb-8 bg-white/70 p-2 rounded">
          Visit the port city of Santos, known for its beaches and rich history.
        </p>

        {santosImages.map((img, idx) => (
          <div
            key={img.id}
            className={`flex flex-col lg:flex-row items-center justify-center gap-4 ${
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
          images={santosImages}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </div>
  );
}

export default Santos;
