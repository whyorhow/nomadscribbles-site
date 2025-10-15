import React, { useState } from "react";
import Logo from "./Logo";
import Lightbox from "./Lightbox";
import SEO from "./components/SEO";
import artImages from "./artImages.json";

export default function Museums() {
  const [currentIndex, setCurrentIndex] = useState(null);

  const museumImages = artImages
    .filter((item) => item.category === "Museums")
    .map((item) => ({
      ...item,
      image: process.env.PUBLIC_URL + item.blogImage,
    }));

  const galleryAlts = [
    "MASP floating gallery above Avenida Paulista",
    "Degas ballerina sculpture in MASP",
    "Art Gallery Drawing",
    "Indigenous Brazilian exhibition in MASP lower levels",
    "Pinacoteca building and photography exhibition",
    "Pinacoteca architectural details and living gallery",
  ];

  const galleryTexts = [
    "The Museu de Arte de São Paulo (MASP) hovers above Avenida Paulista like a glass-and-concrete time capsule. Inside, masterpieces from across continents float on transparent easels, arranged chronologically in a modernist rhythm.",
    "There’s a path through the space, but the experience feels fluid — as if time itself has loosened its frame. Near the centre, Degas’ ballerina sculpture stands in quiet defiance, her poise commanding the stillness.",
    "Sketch of São Paulo’s art scene — a meeting point of structure and imagination, concrete and colour.",
    "Below, the tone shifts: an exhibition of Indigenous Brazilian art brings raw texture and ancestral depth. MASP holds both worlds — the imported and the rooted — with equal grace.",
    "Across the city, the Pinacoteca whispers through brick and sunlight. Shadows slide across its arched windows and wooden floors; the gallery invites slowness, reflection, and calm.",
    "Design Echo: Originally built in the early 1900s, the Pinacoteca was reimagined to celebrate its own bones — exposed brick, iron beams, and open space. The architecture itself has become an exhibit."
  ];

  return (
    <div
      className="min-h-screen relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/Home/Background2.jpg)`,
      }}
    >
      {/* SEO */}
      <SEO
        title="São Paulo Art Galleries | Nomad Scribbles"
        description="Discover São Paulo’s top art galleries and museums. From MASP to Pinacoteca, explore modern and historical masterpieces in the heart of Brazil."
        image="/images/ArtGallery/GalleryBackground.png"
        url="https://nomadscribbles.com/brazil/saopaulo/museums"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Hidden H1 for accessibility */}
      <h1 className="sr-only">São Paulo Art Galleries | Nomad Scribbles Travel Blog</h1>

      <div className="relative z-10 flex flex-col items-center pt-4 px-4">
        {/* Logo */}
        <div className="absolute top-4 left-4 z-20">
          <Logo className="h-6 w-auto sm:h-10" />
        </div>

        {/* Hero image */}
        <div className="w-full max-w-5xl mb-6 mt-14 px-2">
          <img
            src={process.env.PUBLIC_URL + "/images/Brazil/SaoPauloFeature.png"}
            alt="São Paulo skyline and MASP gallery"
            loading="lazy"
            className="w-full h-auto object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* Title image */}
        <div className="w-full flex justify-center mb-6 px-2">
          <img
            src={process.env.PUBLIC_URL + "/images/ArtGallery/GalleryTitle.png"}
            alt="Art Galleries"
            loading="lazy"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto"
          />
        </div>

        {/* Intro text */}
        <div className="max-w-3xl bg-white/70 backdrop-blur-md p-4 rounded-xl mb-8 text-gray-900 text-center">
          <p>
            São Paulo’s art galleries reveal the soul of a city in conversation with itself —
            modernism meets history, and every wall holds a story of innovation, rebellion, and light.
          </p>
        </div>

        {/* Gallery section */}
        <main className="px-4 py-4 max-w-screen-lg mx-auto space-y-10">
          {museumImages.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col lg:flex-row items-center justify-center gap-6 ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <img
                src={item.image}
                alt={galleryAlts[idx] || item.title}
                loading="lazy"
                onClick={() => setCurrentIndex(idx)}
                className="rounded-lg cursor-pointer w-full sm:w-3/4 md:w-2/3 lg:w-2/5 shadow-lg transition-transform duration-300 hover:scale-105"
              />
              <div className="bg-white/85 p-4 rounded-md flex-1 text-gray-900 text-left">
                <h2 className="font-bold text-lg mb-2">{item.title}</h2>
                <p>{galleryTexts[idx]}</p>
              </div>
            </div>
          ))}
        </main>

        {/* Lightbox */}
        {currentIndex !== null && (
          <Lightbox
            images={museumImages}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        )}
      </div>
    </div>
  );
}
