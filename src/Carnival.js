import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Lightbox from "./Lightbox";
import Logo from "./Logo";
import artImages from "./artImages.json";

function Carnival() {
  const carnivalImages = artImages.filter(img => img.category === "Carnival");

  const galleryTexts = [
    "In São Paulo, Carnival moves in two heartbeats — one loud and rehearsed, the other wild and wandering...",
    "At the Sambódromo do Anhembi, Carnival arrives like thunder...",
    "Behind the Feathers: Floats in the Sambódromo can stretch up to 30 metres...",
    "Every step is a rehearsal of joy and resistance...",
    "Then come the blocos — São Paulo’s other Carnival...",
    "The air thickens with rhythm and rain...",
    "Beats Beneath the Beads: São Paulo hosts over 500 blocos during Carnival season..."
  ];

  const [currentIndex, setCurrentIndex] = useState(null);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pt-4"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/Home/Background2.jpg)` }}
    >
      {/* SEO Meta */}
      <Helmet>
        <title>Carnival in São Paulo | Nomad Scribbles</title>
        <meta
          name="description"
          content="Experience São Paulo's Carnival — the rhythm, colors, and energy of Brazil's world-famous festival."
        />
        <meta property="og:title" content="Carnival in São Paulo" />
        <meta
          property="og:description"
          content="Join us in São Paulo for Carnival, from the Sambódromo to local blocos, experiencing music, dance, and spectacle."
        />
        <meta
          property="og:image"
          content={`${process.env.PUBLIC_URL}/images/CarnivalSP/CarnivalBackground.png`}
        />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://nomadscribbles.com/brazil/saopaulo/carnival" />
      </Helmet>

      {/* Logo */}
      <div className="absolute top-3 left-4 z-10">
        <Logo className="h-6 w-auto sm:h-10" />
      </div>

      {/* Hero Image */}
      <div className="flex justify-center mb-6 px-4">
        <img
          src={process.env.PUBLIC_URL + "/images/Brazil/SaoPauloFeature.png"}
          alt="São Paulo city skyline"
          className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl h-auto rounded-lg"
        />
      </div>

      {/* Carnival Title Image */}
      <div className="flex justify-center mb-6 px-4">
        <img
          src={process.env.PUBLIC_URL + "/images/CarnivalSP/CarnivalTitle.png"}
          alt="Carnival"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto"
        />
      </div>

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Carnival</h1>

      <main className="px-4 py-8 max-w-screen-lg mx-auto space-y-12">
        <p className="text-center text-[#111] mb-8 bg-white/70 p-2 rounded text-sm sm:text-base">
          Experience the rhythm, colors, and energy of Brazilian Carnival.
        </p>

        {carnivalImages.map((img, idx) => (
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
              className="rounded-lg cursor-pointer w-full sm:w-3/4 md:w-2/3 lg:w-2/5 h-auto"
            />
            <div className="bg-white/85 p-3 rounded-md flex-1 text-[#111] text-left text-sm sm:text-base">
              <h2 className="font-bold text-lg mb-2">{img.title}</h2>
              <p>{galleryTexts[idx]}</p>
            </div>
          </div>
        ))}
      </main>

      {/* Lightbox */}
      {currentIndex !== null && (
        <Lightbox
          images={carnivalImages}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </div>
  );
}

export default Carnival;
