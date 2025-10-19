import React, { useState } from "react";
import SEO from "./components/SEO";
import Lightbox from "./Lightbox";
import Logo from "./Logo";
import artImages from "./artImages.json";

function Santos() {
  const santosImages = artImages.filter(img => img.category === "Santos");

  const galleryTexts = [
    "Nestled on the Atlantic coast, Santos offers a slower, salt-tinged rhythm compared to the bustling metropolis nearby. Its skyline rises with modern buildings, yet the ocean breeze softens the urban edges. Storm clouds often gather over the city, casting dramatic contrasts between concrete and sky. Walk along the waterfront and feel a serene dialogue between land and sea, history and daily life.",
    "Santos is synonymous with football royalty — Pelé, the legendary king of the sport, calls this city home. His museum stands proud, honoring his career and Brazil’s passion for football. Vibrant murals across town celebrate his legacy, while quiet street corners whisper stories of the man who turned a game into an art form.",
    "Footsteps of Legends: Pelé scored his 1,000th goal here at Vila Belmiro stadium, transforming Santos into more than a football city — a living shrine to the beautiful game. The echo of cheering crowds from decades past still feels present, as if every goal scored has been etched into the air.",
    "Beyond the city center, hills cradle elegant houses framed by lush greenery. Winding roads reveal quiet viewpoints where the city hums below like a soft, distant melody. Urban energy blends with natural beauty, inviting visitors to explore a city alive with history, rhythm, and soul.",
    "City Resonance: Santos boasts the largest port in Latin America, vital to Brazil’s economy for centuries. Pelé’s influence extends beyond football; his childhood home draws fans from around the world. Walking the streets, you sense a city shaped by commerce, culture, and sport, each element harmonizing with the others.",
    "Stretching beaches meet urban edges, where locals and visitors mingle. The shoreline serves as both playground and backdrop, a place where children build castles, surfers ride waves, and sunbathers rest beneath towering palms. The ebb and flow of tides mirrors the rhythm of city life, a gentle counterpoint to Santos’ bustling streets."
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

      {/* Title Image */}
      <div className="flex justify-center mb-2 px-2">
        <img
          src={process.env.PUBLIC_URL + "/images/Santos/SantosTitle.webp"}
          alt="Santos page title"
          loading="lazy"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto"
        />
      </div>

      <main className="px-2 py-2 max-w-screen-lg mx-auto space-y-6 font-cormorant text-primaryText leading-relaxed">
        <p className="text-center text-sm sm:text-base">
          Visit the port city of Santos, where history, beaches, and football legends meet in sunlit harmony.
        </p>

        {santosImages.map((img, idx) => (
          <div
            key={img.id}
            className={`flex flex-col lg:flex-row items-center justify-center gap-6 ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <img
              src={img.blogimage.replace(/\.(jpg|jpeg|png)$/, ".webp")}
              alt={img.title}
              loading="lazy"
              onClick={() => setCurrentIndex(idx)}
              className="rounded-lg cursor-pointer w-full sm:w-3/4 md:w-2/3 lg:w-2/5 h-auto"
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
