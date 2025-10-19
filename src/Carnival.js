import React, { useState } from "react";
import Lightbox from "./Lightbox";
import Logo from "./Logo";
import SEO from "./components/SEO";
import artImages from "./artImages.json";

function Carnival() {
  const carnivalImages = artImages.filter(img => img.category === "Carnival");

  const galleryTexts = [
    "In São Paulo, Carnival moves in two heartbeats — one loud and rehearsed, the other wild and wandering. The streets vibrate with drums and melodies, as samba schools prepare months in advance, crafting floats, costumes, and choreography with incredible precision. Every corner you turn, the city hums with anticipation, a living theatre of celebration and tradition.",
    "At the Sambódromo do Anhembi, Carnival arrives like thunder. Thousands of spectators gather under the lights, their energy mixing with the roar of percussion and the cheers for each passing samba school. The floats, adorned with glittering sculptures and larger-than-life figures, glide gracefully along the avenue, telling stories of history, folklore, and cultural pride.",
    "Behind the Feathers: Floats in the Sambódromo can stretch up to 30 metres, each carrying dozens of dancers in elaborate costumes. Every detail is meticulously planned — from the sparkling feathers to the hand-painted backdrops. Watching the performers move in perfect synchrony is witnessing months of preparation condensed into moments of sheer magic.",
    "Every step is a rehearsal of joy and resistance. Carnival in São Paulo is more than music and dance; it is a celebration of resilience and identity. From the precise samba steps to the carefully composed harmonies, every movement conveys pride, defiance, and a shared love of community. It’s a space where tradition meets creativity, and where each participant becomes part of a larger narrative.",
    "Then come the blocos — São Paulo’s other Carnival. Unlike the organized parades of the Sambódromo, these street parties are spontaneous, informal, and full of energy. Locals and visitors join together, dancing through neighbourhoods with live bands and impromptu performances. The air is electric with laughter, music, and the collective heartbeat of the city.",
    "The air thickens with rhythm and rain. Sudden showers often cascade over the dancers and spectators, but they never dampen the spirit. Umbrellas and raincoats appear alongside glittering masks, and puddles become part of the spectacle. Each splash mirrors the resilience and joy that Carnival inspires, adding an unpredictable, natural rhythm to the celebration.",
    "Beats Beneath the Beads: São Paulo hosts over 500 blocos during Carnival season, each with its own identity and style. Some celebrate local folklore, others parody politics or history, and many simply exist to spread music and joy. Walking through these streets is a journey through culture, humanity, and creativity, where every beat tells a story and every participant adds their own voice to the festival."
  ];

  const [currentIndex, setCurrentIndex] = useState(null);

  return (
    <div className="relative min-h-screen pt-2">
      {/* SEO */}
      <SEO
        title="Carnival in São Paulo | Nomad Scribbles"
        description="Experience São Paulo's Carnival — the rhythm, colors, and energy of Brazil's world-famous festival."
        image="/images/CarnivalSP/CarnivalBackground.png"
        slug="/brazil/saopaulo/carnival"
      />

      {/* Hidden H1 */}
      <h1 className="sr-only">Carnival in São Paulo | Nomad Scribbles</h1>

      {/* Logo */}
      <div className="mt-4 ml-4 z-30">
        <Logo className="h-6 w-auto sm:h-10" />
      </div>

      {/* Hero Image */}
      <div className="flex justify-center mb-2 px-2">
        <img
          src={process.env.PUBLIC_URL + "/images/SaoPauloLanding/SaoPauloFeature.webp"}
          alt="São Paulo city skyline"
          loading="lazy"
className="w-full max-w-[600px] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[400px] h-auto rounded-lg"
        />
      </div>

      {/* Carnival Title */}
      <div className="flex justify-center mb-2 px-2">
        <img
          src={process.env.PUBLIC_URL + "/images/CarnivalSP/CarnivalTitle.webp"}
          alt="Carnival in São Paulo"
          loading="lazy"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto"
        />
      </div>

      <main className="px-2 py-2 max-w-screen-lg mx-auto space-y-6 font-cormorant text-primaryText leading-relaxed">
        <p className="text-center text-sm sm:text-base">
          Experience the rhythm, colors, and energy of Brazilian Carnival, from the Sambódromo to local street blocos.
        </p>

        {carnivalImages.map((img, idx) => (
          <div
            key={img.id}
            className={`flex flex-col lg:flex-row items-center justify-center gap-6 ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <img
              src={img.blogimage}
              alt={img.title}
              loading="lazy"
              onClick={() => setCurrentIndex(idx)}
              className="rounded-lg cursor-pointer w-full sm:w-3/4 md:w-2/3 lg:w-2/5 h-auto"
            />
            <div className="p-4 rounded-md flex-1 text-left text-sm sm:text-base">
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
