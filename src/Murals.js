import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Logo from "./Logo";
import Lightbox from "./Lightbox";
import artImages from "./artImages.json";

export default function Murals() {
  const muralImages = artImages.filter((img) => img.category === "Murals");

  const galleryTexts = [
    "In São Paulo, the streets don’t just move — they speak. Murals stretch across walls like open letters, recording joy, protest, memory, and change in every brushstroke.",
    "This is a city where concrete doesn't stay blank for long. Colour climbs apartment towers, spills across railway arches, wraps staircases, tunnels, and shutters. Art is not confined to galleries here — it’s woven into the rhythm of daily life.",
    "Turn a corner, and you might find a bird mid-flight across a storefront, or a woman’s face thirty feet high, staring into the future.",
    "Beco do Batman, São Paulo’s most famous alley, is often the gateway. Tourists come for its tight, graffiti-packed lanes and leave with phones full of layered backdrops. But the real art spreads elsewhere — into neighbourhoods like Cambuci, where entire blocks breathe with surreal colour, or over the bridges near Minhocão, where political commentary meets abstract chaos.",
    "Nothing stays the same. Murals are layered, overwritten, buffed out, and reborn. Each wall becomes a palimpsest, holding ghost outlines beneath the newest lines. It’s a living archive, one that resists permanence — as if the city is always editing its own diary.",
    "The steps in Vila Madalena, painted top to bottom, turn movement into artwork. From the bottom, they’re fragments. From above, they align — portraits, slogans, entire compositions revealing themselves only to those willing to climb.",
    "Urban Voices: The 2007 Clean City Law banned outdoor ads, opening space for murals to bloom. Artists like Os Gêmeos, Nunca, and Nina Pandolfo rose from these streets to global fame.",
    "The Open-Air Gallery of São Paulo."
  ];

  const [currentIndex, setCurrentIndex] = useState(null);

  return (
    <div
      className="min-h-screen relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/Home/Background2.jpg)`,
      }}
    >
      {/* Helmet SEO */}
      <Helmet>
        <title>São Paulo Murals | Nomad Scribbles</title>
        <meta
          name="description"
          content="Explore São Paulo's vibrant mural scene — a city-wide open-air gallery filled with color, stories, and culture."
        />
        <meta property="og:title" content="São Paulo Murals" />
        <meta
          property="og:description"
          content="Walk the streets of São Paulo and discover murals that tell stories of art, protest, identity, and history."
        />
        <meta
          property="og:image"
          content={`${process.env.PUBLIC_URL}/images/Murals/MuralsBackground.png`}
        />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://nomadscribbles.com/brazil/saopaulo/murals" />
      </Helmet>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">São Paulo Murals | Nomad Scribbles Travel Blog</h1>

      <div className="relative z-10 flex flex-col items-center pt-4 px-4">
        {/* Logo */}
        <div className="absolute top-4 left-4 z-20">
          <Logo className="h-6 w-auto sm:h-10" />
        </div>

{/* Responsive Hero Image scaled ~30% smaller */}
<div className="w-full max-w-5xl mb-1 mt-14 px-2">
  <img
    src={process.env.PUBLIC_URL + "/images/Brazil/SaoPauloFeature.png"}
    alt="São Paulo city — skyline and urban landscape"
    loading="lazy"
    className="w-[70%] sm:w-[65%] md:w-[60%] lg:w-[60%] h-auto object-contain rounded-xl shadow-lg mx-auto"
  />
</div>


{/* Title image (MuralsTitle) scaled ~30% smaller */}
<div className="w-full flex justify-center mb-(-8) px-2">
  <img
    src={process.env.PUBLIC_URL + "/images/Murals/MuralsTitle.png"}
    alt="Murals"
    loading="lazy"
    className="w-[70%] sm:w-[65%] md:w-[60%] lg:w-[60%] h-auto"
  />
</div>


        {/* Intro text box */}
        <div className="max-w-3xl bg-white/70 backdrop-blur-md p-4 rounded-xl mb-8 text-gray-900 text-center">
          <p>
            São Paulo’s streets speak in colour. Each mural tells a story — of resistance, joy,
            identity, and change. Walk through these walls and see the city as an open-air gallery.
          </p>
        </div>

        {/* Gallery */}
        <main className="px-4 py-4 max-w-screen-lg mx-auto space-y-10">
          {muralImages.map((img, idx) => (
            <div
              key={img.id}
              className={`flex flex-col lg:flex-row items-center justify-center gap-6 ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <img
                src={img.blogimage}
                alt={`${img.title} mural in São Paulo`}
                loading="lazy"
                onClick={() => setCurrentIndex(idx)}
                className="rounded-lg cursor-pointer w-full sm:w-3/4 md:w-2/3 lg:w-2/5 shadow-lg transition-transform duration-300 hover:scale-105"
              />
              <div className="bg-white/85 p-4 rounded-md flex-1 text-gray-900 text-left">
                <h2 className="font-bold text-lg mb-2">{img.title}</h2>
                <p>{galleryTexts[idx] || ""}</p>
              </div>
            </div>
          ))}
        </main>

        {/* Lightbox */}
        {currentIndex !== null && (
          <Lightbox
            images={muralImages}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        )}
      </div>
    </div>
  );
}
