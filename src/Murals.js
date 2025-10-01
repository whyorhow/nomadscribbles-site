import React, { useState } from "react";
import Logo from "./Logo";
import Lightbox from "./Lightbox";
import artImages from "./artImages.json"; // JSON used for Lightbox links/descriptions

export default function Murals() {
  const muralImages = artImages.filter(img => img.category === "Murals");

  const galleryTexts = [
    "In São Paulo, the streets don’t just move — they speak. Murals stretch across walls like open letters, recording joy, protest, memory, and change in every brushstroke.",
    "This is a city where concrete doesn't stay blank for long. Colour climbs apartment towers, spills across railway arches, wraps staircases, tunnels, and shutters. Art is not confined to galleries here — it’s woven into the rhythm of daily life.",
    "Turn a corner, and you might find a bird mid-flight across a storefront, or a woman’s face thirty feet high, staring into the future.",
    "Beco do Batman, São Paulo’s most famous alley, is often the gateway. Tourists come for its tight, graffiti-packed lanes and leave with phones full of layered backdrops. But the real art spreads elsewhere — into neighbourhoods like Cambuci, where entire blocks breathe with surreal colour, or over the bridges near Minhocão, where political commentary meets abstract chaos.",
    "Nothing stays the same. Murals are layered, overwritten, buffed out, and reborn. Each wall becomes a palimpsest, holding ghost outlines beneath the newest lines. It’s a living archive, one that resists permanence — as if the city is always editing its own diary.",
    "The steps in Vila Madalena, painted top to bottom, turn movement into artwork. From the bottom, they’re fragments. From above, they align — portraits, slogans, entire compositions revealing themselves only to those willing to climb. It's a reminder: the full picture often requires a shift in perspective.",
    "Urban Voices: The 2007 Clean City Law banned outdoor ads, opening space for murals to bloom. Artists like Os Gêmeos, Nunca, and Nina Pandolfo rose from these streets to global fame. Some staircases in Vila Madalena are painted top to bottom — the full image only visible from above.",
    "The Open-Air Gallery of São Paulo."
  ];

  const [currentIndex, setCurrentIndex] = useState(null);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pt-4"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/Murals/muralbackground.jpg)` }}
    >
      <div className="absolute top-3 left-4 z-10">
        <Logo className="h-6 w-auto sm:h-10" />
      </div>

      <div className="flex justify-center mb-6">
        <img
          src={process.env.PUBLIC_URL + "/images/SaoPauloHeroImage.jpeg"}
          alt="São Paulo city skyline"
          className="w-[800px] max-w-[95%] h-auto rounded-lg"
        />
      </div>

      <h1 className="text-center text-3xl font-semibold mb-6 text-gray-900">Murals</h1>

      <main className="px-4 py-8 max-w-screen-lg mx-auto space-y-12">
        <h2 className="text-center text-2xl font-medium mb-2 text-gray-900">São Paulo’s Vibrant Street Art</h2>
        <p className="text-center mb-8 bg-white/70 p-2 rounded text-gray-900">
          Explore the city where walls speak and every street corner offers a gallery in the open air.
        </p>

        {muralImages.map((img, idx) => (
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
            <div className="bg-white/85 p-3 rounded-md flex-1 text-gray-900 text-left">
              <h2 className="font-bold text-lg mb-2">{img.title}</h2>
              <p>{galleryTexts[idx]}</p>
            </div>
          </div>
        ))}
      </main>

      {currentIndex !== null && (
        <Lightbox
          images={muralImages}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </div>
  );
}
