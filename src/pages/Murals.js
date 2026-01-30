import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import Lightbox from "../components/Lightbox";
import artImages from "../assets/artImages.json";
import { fadeScale, staggerContainer } from "../utils/animations";

export default function Murals({ openLightbox }) {
  const muralImages = artImages.filter((img) => img.category === "Murals");

  const galleryTexts = [
    "In São Paulo, the streets don’t just move — they speak. Murals stretch across walls like open letters, recording joy, protest, memory, and change in every brushstroke. Every alley, stairwell, and shutter carries layers of stories, where artists’ voices converse with the city’s rhythm, inviting passersby to pause, reflect, and immerse themselves in colour and meaning. Each mural is a fragment of the city’s soul, a living dialogue between urban architecture and creative expression.",
    "This is a city where concrete doesn't stay blank for long. Colour climbs apartment towers, spills across railway arches, wraps staircases, tunnels, and shutters. Art is not confined to galleries here — it’s woven into the rhythm of daily life. Residents and visitors alike discover unexpected moments of beauty and rebellion, where spray cans and brushes transform walls into dynamic narratives that shift with time and circumstance, echoing the city’s pulse.",
    "High above the busy streets of São Paulo, a vast mural of The Little Prince looks quietly over the city. Painted across the side of a tall apartment block, it brings a touch of childhood wonder to the concrete skyline. The scene feels both dreamlike and familiar — the tiny traveller standing on his planet, gazing out at the stars. Locals pass beneath it daily, yet many still pause to look up. It’s a reminder of imagination in an urban world, where even in traffic and noise, stories still find space to live.",
    "Beco do Batman, São Paulo’s most famous alley, is often the gateway. Tourists come for its tight, graffiti-packed lanes and leave with phones full of layered backdrops. But the real art spreads elsewhere — into neighbourhoods like Cambuci, where entire blocks breathe with surreal colour, or over the bridges near Minhocão, where political commentary meets abstract chaos. The streets themselves become museums, with walls narrating stories of identity, resistance, and imagination.",
    "The steps in Vila Madalena, painted top to bottom, turn movement into artwork. From the bottom, they’re fragments. From above, they align — portraits, slogans, entire compositions revealing themselves only to those willing to climb. Each set of stairs is a microcosm of São Paulo’s playful, inventive spirit, and a reminder that art can shape interaction and movement as much as it shapes space.",
    "On a street wall in São Paulo, Ayrton Senna’s face bursts into view — vivid, determined, and larger than life. The mural captures not just a sports hero but a national spirit: fearless, passionate, and endlessly striving. Painted in bright streaks of yellow and green, it mirrors the colours of both Brazil and speed. For locals, Senna is more than a Formula 1 champion; he’s a symbol of pride and perseverance. Even decades after his final race, his image still inspires — a reminder that greatness, like art, never truly fades from the city that raised him.",
    "Urban Voices: The 2007 Clean City Law banned outdoor ads, opening space for murals to bloom. Artists like Os Gêmeos, Nunca, and Nina Pandolfo rose from these streets to global fame. Their murals are not just art — they are statements, dialogues, and invitations. The city becomes a canvas, where heritage, creativity, and social awareness converge, offering lessons in resilience, colour theory, and narrative for anyone willing to observe closely.",
    "The Open-Air Gallery of São Paulo continues to evolve with each passing year. From tiny corners to sprawling walls, murals reflect current events, neighbourhood culture, and artists’ personal journeys. Walking these streets is a journey through the city’s collective imagination, where public space transforms into a living, breathing exhibition — a testament to São Paulo’s energy, adaptability, and love for visual storytelling."
  ];


  return (
    <div className="relative min-h-screen pt-2">
      {/* SEO */}
      <SEO
        title="São Paulo Murals | Nomad Scribbles"
        description="Explore São Paulo's vibrant mural scene — a city-wide open-air gallery filled with color, stories, and culture."
        image="/images/Murals/MuralsBackground.webp"
        slug="/brazil/saopaulo/murals"
      />

      {/* Hidden H1 */}
      <h1 className="sr-only">São Paulo Murals | Nomad Scribbles</h1>


      {/* Hero Image */}
      {/* Hero Image */}
      <div className="flex justify-center mb-6 px-4">
        <img
          src={process.env.PUBLIC_URL + "/images/SaoPauloLanding/SaoPauloFeature.webp"}
          alt="São Paulo city skyline"
          loading="lazy"
          className="w-full max-w-[600px] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[400px] h-auto rounded-lg"
        />
      </div>

      {/* Murals Title */}
      <div className="flex justify-center mb-6 px-4 mt-8">
        <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-darkText tracking-tight text-center">Street Murals</h1>
      </div>

      <main className="px-2 py-2 max-w-screen-lg mx-auto space-y-6 font-cormorant text-darkText leading-relaxed">
        <p className="text-center text-sm sm:text-base">
          São Paulo’s streets speak in colour. Each mural tells a story — of resistance, joy, identity, and change. Walk through these walls and see the city as an open-air gallery.
        </p>

        {muralImages.map((img, idx) => (
          <div
            key={img.id}
            className={`flex flex-col lg:flex-row items-center justify-center gap-6 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
          >
            <img
              src={img.image}
              alt={`${img.title} mural in São Paulo`}
              loading="lazy"
              onClick={() => openLightbox(idx, muralImages.map(i => i.image), muralImages.map(i => i.title))}
              className="rounded-lg cursor-pointer w-10/12 sm:w-3/4 md:w-2/3 lg:w-2/5 h-auto shadow-md hover:opacity-95 transition-opacity p-4 max-w-[350px]"
            />
            <div className="p-4 rounded-md flex-1 text-left text-sm sm:text-base lg:text-lg leading-relaxed">
              <h2 className="font-bold text-lg mb-2">{img.title}</h2>
              <p>{galleryTexts[idx]}</p>
            </div>
          </div>
        ))}
      </main>

    </div>
  );
}
