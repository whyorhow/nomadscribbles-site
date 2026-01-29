import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import Lightbox from "../components/Lightbox";
import artImages from "../assets/artImages.json";
import { fadeScale, staggerContainer } from "../utils/animations";
import ContextMap from "../components/ContextMap";
import destinations from "../assets/destinations.json";

function Santos() {
  const santosCoords = destinations.find(d => d.id === "santos");
  const santosImages = artImages.filter(img => img.category === "Santos");

  const galleryTexts = [
    "Nestled on the Atlantic coast, Santos offers a slower, salt-tinged rhythm compared to the bustling metropolis nearby. Its skyline rises with modern buildings, yet the ocean breeze softens the urban edges. Storm clouds often gather over the city, casting dramatic contrasts between concrete and sky. Walk along the waterfront and feel a serene dialogue between land and sea, history and daily life.",
    "Santos is synonymous with football royalty — Pelé, the legendary king of the sport, calls this city home. His museum stands proud, honoring his career and Brazil’s passion for football. Vibrant murals across town celebrate his legacy, while quiet street corners whisper stories of the man who turned a game into an art form.",
    "Footsteps of Legends: Pelé scored his 1,000th goal here at Vila Belmiro stadium, transforming Santos into more than a football city — a living shrine to the beautiful game. The echo of cheering crowds from decades past still feels present, as if every goal scored has been etched into the air.",
    "Beyond the city center, hills cradle elegant houses framed by lush greenery. Winding roads reveal quiet viewpoints where the city hums below like a soft, distant melody. Urban energy blends with natural beauty, inviting visitors to explore a city alive with history, rhythm, and soul.",
    "Time and nature entwine in Santos. This old building, its brickwork slowly claimed by creeping trees, hints at the city’s layered history. Commerce, culture, and stories of the everyday unfold here, while echoes of Pelé’s legacy ripple quietly through the streets. Each vine and crack speaks to a city alive with memory and resilience.",
    "Transformed onto paper, the building becomes both memory and imagination. Lines and shading capture the slow encroachment of nature, turning bricks and branches into a delicate dance. The artwork reveals the poetry hidden in Santos’ architecture, celebrating the quiet tension between the urban and the organic."
  ];

  const [currentIndex, setCurrentIndex] = useState(null);

  return (
    <div className="relative min-h-screen pt-2">
      {/* SEO */}
      <SEO
        title="Santos — Port City of Legends | Nomad Scribbles"
        description="Discover Santos, Brazil’s legendary port city — home to Pelé, sunlit beaches, and the rhythm of history on the Atlantic coast."
        image="/images/Santos/SantosBack.webp"
        slug="/santos"
      />

      {/* Hidden H1 */}
      <h1 className="sr-only">Santos — Port City of Legends | Nomad Scribbles</h1>


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

      {/* Title Image */}
      <div className="flex justify-center mb-6 px-4">
        <img
          src={process.env.PUBLIC_URL + "/images/Santos/SantosTitle.webp"}
          alt="Santos page title"
          loading="lazy"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto"
        />
      </div>

      <main className="px-2 py-2 max-w-screen-lg mx-auto space-y-6 font-cormorant text-darkText leading-relaxed">
        <p className="text-center text-sm sm:text-base">
          Visit the port city of Santos, where history, beaches, and football legends meet in sunlit harmony.
        </p>

        <ContextMap
          markers={[santosCoords].filter(Boolean)}
          zoomToId="santos"
          title="Where is Santos?"
        />

        {santosImages.map((img, idx) => (
          <div
            key={img.id}
            className={`flex flex-col lg:flex-row items-center justify-center gap-6 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
          >
            <img
              src={img.image}
              alt={img.title}
              loading="lazy"
              onClick={() => setCurrentIndex(idx)}
              className="rounded-lg cursor-pointer w-10/12 sm:w-3/4 md:w-2/3 lg:w-2/5 h-auto shadow-md hover:opacity-95 transition-opacity p-4 max-w-[350px]"
            />
            <div className="p-4 rounded-md flex-1 text-left text-sm sm:text-base lg:text-lg leading-relaxed">
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
