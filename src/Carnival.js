import React, { useState } from "react";
import Lightbox from "./Lightbox";
import Logo from "./Logo";
import artImages from "./artImages.json"; // Make sure this is the correct path

function Carnival() {
  // Filter only Carnival images from JSON
  const carnivalImages = artImages.filter(img => img.category === "Carnival");

  // Main page text (separate from JSON)
  const galleryTexts = [
    "In São Paulo, Carnival moves in two heartbeats — one loud and rehearsed, the other wild and wandering. The city hums with transformation. Sequins rise, streets melt, and the music — always the music — finds a way through everything.",
    "At the Sambódromo do Anhembi, Carnival arrives like thunder. Samba schools burst through the gates with armour made of feathers, mirrors, and stories. Floats sail past like dreams stitched from memory and myth. Dancers shimmer in unison, hands carving songs into the air.",
    "Behind the Feathers: Floats in the Sambódromo can stretch up to 30 metres. Each samba school performs a story with thousands of dancers, judged on costume, harmony, song, and energy.",
    "Every step is a rehearsal of joy and resistance. From the stands, the scale stuns — whole histories unfurling in rhythm, each beat landing like a page turning. It’s spectacle, yes, but something more: a city remembering how to fly.",
    "Then come the blocos — São Paulo’s other Carnival. Looser, louder, closer to the soil. In alleyways and open parks, drums bloom at dawn and carry through dusk. No tickets. No fences. Just movement and music, chasing the sun.",
    "The air thickens with rhythm and rain. Glitter clings to every surface. One bloco spills around Ibirapuera Park, dancers winding through trees, strangers pulled into sudden choruses. There’s no script — only sound. Only sway.",
    "Beats Beneath the Beads: São Paulo hosts over 500 blocos during Carnival season — many rooted in local humour, samba schools, or beloved bars. One bloco is entirely dedicated to drag performers belting out old-school marchinhas in full costume."
  ];

  const [currentIndex, setCurrentIndex] = useState(null);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pt-4"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/CarnivalSP/CarnivalBackground.jpg)` }}
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

      <h1 className="text-center text-[#111] text-3xl font-semibold mb-6">Carnival</h1>

      <main className="px-4 py-8 max-w-screen-lg mx-auto space-y-12">
        <p className="text-center text-[#111] mb-8 bg-white/70 p-2 rounded">
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
          images={carnivalImages}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </div>
  );
}

export default Carnival;
