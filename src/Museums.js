import React, { useState } from "react";
import Logo from "./Logo";
import artImages from "./artImages.json";
import Lightbox from "./Lightbox";

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
    "The Museu de Arte de São Paulo (MASP) hovers above Avenida Paulista like a glass-and-concrete time capsule. Inside the top floor, masterpieces from Europe, Africa, Asia, and the Americas are arranged chronologically, unframed, floating on transparent easels.",
    "There’s a clear path through the space, but the experience still feels open — like drifting through time. Near the centre, Degas’ famous ballerina sculpture stands in delicate defiance, her poise drawing the gaze amid the stillness.",
    "Sketch of São Paulo’s art scene, blending structural lines with imagination.",
    "Below, the tone shifts: an exhibition of Indigenous Brazilian work spreads across the lower levels. The textures are different, rooted. MASP holds both with quiet reverence.",
    "Across the city, the Pinacoteca whispers in brick and sunlight. Afternoon shadows cut across arched windows and wood floors. The gallery moves slower, one quiet room at a time.",
    "Design Echo: The Pinacoteca was originally built in the early 1900s and redesigned to let the architecture speak: brick walls, iron beams, and raw textures are part of the exhibition.",
  ];

  const openLightbox = (index) => setCurrentIndex(index);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pt-4"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/ArtGallery/ArtGalleryBackground.jpg)`,
      }}
    >
      <div className="absolute top-3 left-4 z-8">
        <Logo className="h-6 w-auto sm:h-10" />
      </div>

      <div className="flex justify-center mb-6">
        <img
          src={process.env.PUBLIC_URL + "/images/SaoPauloHeroImage.jpeg"}
          alt="São Paulo city skyline"
          className="w-[800px] max-w-[95%] h-auto rounded-lg"
        />
      </div>

      <h1 className="text-center text-[#111] text-3xl font-semibold mb-6">
        Museums
      </h1>

      <main className="px-4 py-6 max-w-screen-lg mx-auto space-y-8">
        <h2 className="text-center text-[#111] text-2xl font-medium mb-2">
          São Paulo’s Museums & Collections
        </h2>
        <p className="text-center text-[#111] mb-4 bg-white/70 p-2 rounded">
          Explore local and international artworks in São Paulo’s galleries.
        </p>

        {museumImages.map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-col lg:flex-row items-center justify-center gap-4 ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <img
              src={item.image}
              alt={galleryAlts[idx] || item.title}
              onClick={() => openLightbox(idx)}
              className="rounded-lg cursor-pointer w-full lg:w-3/5 h-auto"
            />
            <div className="bg-white/85 p-2 rounded-md flex-1 text-[#111] text-left">
              <h2 className="font-bold text-lg mb-1">{item.title}</h2>
              <p>{galleryTexts[idx]}</p>
            </div>
          </div>
        ))}
      </main>

      {currentIndex !== null && (
        <Lightbox
          images={museumImages}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </div>
  );
}
