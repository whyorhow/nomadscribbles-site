import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import SEO from "../components/SEO";
import Logo from "../components/Logo";
import Lightbox from "../components/Lightbox";
import artImages from "../assets/artImages.json";
import { fadeScale, staggerContainer } from "../utils/animations";

function Parks() {
  const parksImages = artImages.filter(img => img.category === "Parks");

  const galleryTexts = [
    "Stillness lives here, but it’s never empty. Ibirapuera stretches wide through the city, offering quiet paths, reflective ponds, and unexpected moments of calm amid urban life. Families gather for picnics under ancient trees, joggers trace the winding paths while birds chirp above, and street performers provide gentle rhythms in hidden corners. Each section of the park reveals its own microcosm, blending natural serenity with human creativity, and making it a sanctuary within São Paulo’s urban sprawl.",
    "At one quiet edge, a single caterpillar climbs across a monumental stone, reminding visitors of the subtle, patient rhythms of nature. Sunlight filters through the leaves above, casting delicate shadows on the pathways, while distant laughter drifts from children playing near the fountains. Observing the minute details — a bee hovering, a fallen leaf, a rustling branch — invites reflection and slows the pace of the city’s relentless motion. Nature’s tiny spectacles invite mindfulness, a reminder of life’s intricate beauty.",
    "Root Detail: Ibirapuera means “rotting tree” in Tupi — a poetic name for a swampy area turned sanctuary. What was once a wetland is now a thoughtfully designed park, where indigenous flora flourishes alongside carefully curated art installations. Water flows quietly through streams and ponds, reflecting the sky above, while benches provide spaces for reading, resting, or simply taking in the subtle scents and sounds of the landscape. This harmonious blend of culture and nature makes every visit a layered experience of history and ecology.",
    "In the canopy above, a monkey pauses. The movement of trees echoes slower than traffic, a gentle reminder to breathe and observe. Leaves shimmer in the wind, and distant calls of birds punctuate the quiet hum of the city below. Photographers, painters, and casual walkers alike find inspiration here; the delicate choreography of wildlife, the interplay of light and shadow, and the ebb and flow of human activity create a living tableau that is constantly changing yet always serene.",
    "Down below, tree stumps cradle patches of moss and fungus — intricate and quiet, revealing patterns only noticed when you slow down. Tiny ecosystems thrive in the damp, shaded corners of the park, attracting insects, amphibians, and birds. Visitors who bend to look closely discover textures and colours that are often invisible in the rush of daily life. Each stump becomes a miniature world, a lesson in resilience and the quiet persistence of nature amidst urbanisation.",
    "They catch the light like sculptures, quietly reclaiming the forest floor, a subtle performance of shadow, texture, and growth. Sunlight dances across leaves, reflecting on mossy surfaces, and small puddles mirror the sky above. Every step taken in these sections encourages mindfulness; the interplay of natural forms invites contemplation, creating an immersive experience where visitors feel part of the park’s ongoing story, not merely observers.",
    "Echoes in Concrete: Burle Marx used sweeping native curves and vegetation to mimic the movement of sound, turning the park into a living artwork where nature meets design. Pathways curve gracefully, water features echo with gentle trickles, and sculptures integrate seamlessly into the landscape. Each area feels like a narrative, connecting movement, light, and color in ways that celebrate both the artistry of the park’s creator and the natural beauty of the environment. It’s a space where imagination meets reality, and every visitor can trace their own story through the carefully orchestrated design."
  ];

  const [currentIndex, setCurrentIndex] = useState(null);

  return (
    <div className="relative min-h-screen pt-2">
      {/* SEO */}
      <SEO
        title="Parks of São Paulo — Green Sanctuaries | Nomad Scribbles"
        description="Discover São Paulo’s parks — from Ibirapuera’s stillness to the echoes of Burle Marx’s design — where art, nature, and calm coexist."
        image="/images/SP-Parks/ParksBackground.webp"
        slug="/parks"
      />

      {/* Hidden H1 */}
      <h1 className="sr-only">Parks of São Paulo | Nomad Scribbles</h1>

      {/* Logo */}
      <div className="mt-4 ml-4 z-50">
        <Logo className="h-6 w-auto sm:h-10" />
      </div>

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

      {/* Parks Title Image */}
      <div className="flex justify-center mb-6 px-4">
        <img
          src={process.env.PUBLIC_URL + "/images/SP-Parks/ParksTitle.webp"}
          alt="Parks of São Paulo"
          loading="lazy"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto"
        />
      </div>

      <main className="px-2 py-2 max-w-screen-lg mx-auto space-y-6 font-cormorant text-primaryText leading-relaxed">
        <p className="text-center text-sm sm:text-base">
          Discover São Paulo’s parks, where nature, art, and history coexist in peaceful harmony.
        </p>

        {parksImages.map((img, idx) => (
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
            <div className="p-4 rounded-md flex-1 text-left text-sm sm:text-base lg:text-lg">
              <h2 className="font-bold text-lg mb-2">{img.title}</h2>
              <p>{galleryTexts[idx]}</p>
            </div>
          </div>
        ))}
      </main>

      {/* Lightbox */}
      {currentIndex !== null && (
        <Lightbox
          images={parksImages}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </div>
  );
}

export default Parks;
