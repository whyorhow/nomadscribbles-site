import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import SEO from "../components/SEO";
import Logo from "../components/Logo";
import Lightbox from "../components/Lightbox";
import artImages from "../assets/artImages.json";
import { fadeScale, staggerContainer } from "../utils/animations";

export default function Museums() {
  const [currentIndex, setCurrentIndex] = useState(null);

  const museumImages = artImages
    .filter((item) => item.category === "Museums")
    .map((item) => ({
      ...item,
      image: item.blogImage.replace(/\.(jpg|jpeg|png)$/, ".webp"),
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
    "The Museu de Arte de São Paulo (MASP) hovers above Avenida Paulista like a glass-and-concrete time capsule. Inside, masterpieces from across continents float on transparent easels, arranged chronologically in a modernist rhythm. Each gallery invites reflection and close observation, where history, technique, and emotion intertwine. The architecture itself is part of the art — open spaces, natural light, and clean lines guide your eye from piece to piece, creating a fluid, immersive experience for every visitor. Walking through MASP, one notices the subtle interplay of perspective, the contrast between old and modern pieces, and the way the exhibitions seem to float in space, a continuous dialogue between art, city, and observer.",
    "There’s a path through the space, but the experience feels fluid — as if time itself has loosened its frame. Near the centre, Degas’ ballerina sculpture stands in quiet defiance, her poise commanding the stillness. Light and shadow play across the floor, revealing textures and depth at every step. Every movement in the space encourages contemplation, and subtle details invite repeated visits. Observers often find themselves returning to the same corner, noticing something new each time, as the museum blends motion, stillness, and reflection into a single continuous rhythm.",
    "Sketch of São Paulo’s art scene — a meeting point of structure and imagination, concrete and colour. Every corner reveals an interaction of form, movement, and composition, echoing both the past and the present. The galleries become a dialogue between old and new, and each exhibit tells multiple stories simultaneously. Visitors can spend hours tracing patterns, textures, and artistic intentions, letting the space guide their thoughts and curiosity along winding paths of inspiration.",
    "Below, the tone shifts: an exhibition of Indigenous Brazilian art brings raw texture and ancestral depth. MASP holds both worlds — the imported and the rooted — with equal grace. Colours, patterns, and objects tell stories that transcend generations, highlighting traditions and contemporary reinterpretations alike. Observing each piece, one senses a connection to history, memory, and identity, where the past resonates alongside modern artistic expressions.",
    "Across the city, the Pinacoteca whispers through brick and sunlight. Shadows slide across its arched windows and wooden floors; the gallery invites slowness, reflection, and calm. Every room offers a new perspective — the angle of sunlight, the textures of the walls, and the layout of exhibits converge to create a deeply immersive experience. Patrons linger in quiet corners, discovering small details in sculptures, paintings, and installations, each telling stories both personal and universal.",
    "Design Echo: Originally built in the early 1900s, the Pinacoteca was reimagined to celebrate its own bones — exposed brick, iron beams, and open space. The architecture itself has become an exhibit. Walking through, visitors witness a fusion of history and modern curation, where each corridor, arch, and gallery frame contributes to the narrative. Every detail — the flow of visitors, the interaction with light, the positioning of artworks — reinforces the building’s living dialogue with art and the city itself."
  ];

  return (
    <div className="relative min-h-screen pt-2 font-cormorant text-primaryText leading-relaxed">
      {/* SEO */}
      <SEO
        title="São Paulo Art Galleries | Nomad Scribbles"
        description="Discover São Paulo’s top art galleries and museums. From MASP to Pinacoteca, explore modern and historical masterpieces in the heart of Brazil."
        image="/images/ArtGallery/GalleryBackground.webp"
        url="https://nomadscribbles.com/brazil/saopaulo/museums"
      />

      {/* Hidden H1 */}
      <h1 className="sr-only">São Paulo Art Galleries | Nomad Scribbles Travel Blog</h1>

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
          src={process.env.PUBLIC_URL + "/images/ArtGallery/GalleryTitle.webp"}
          alt="Art Galleries"
          loading="lazy"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto"
        />
      </div>

      {/* Intro text */}
      <p className="text-center text-sm sm:text-base lg:text-lg mb-8">
        São Paulo’s art galleries reveal the soul of a city in conversation with itself — modernism meets history, and every wall holds a story of innovation, rebellion, and light. Visitors are invited to immerse themselves fully, letting the rhythm of exhibitions guide their experience, observing details, textures, and the subtle narratives embedded in each work.
      </p>

      {/* Gallery section */}
      <main className="px-2 py-2 max-w-screen-lg mx-auto space-y-6">
        {museumImages.map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-col lg:flex-row items-center justify-center gap-6 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
          >
            <img
              src={item.image}
              alt={galleryAlts[idx] || item.title}
              loading="lazy"
              onClick={() => setCurrentIndex(idx)}
              className="rounded-lg cursor-pointer w-full sm:w-3/4 md:w-2/3 lg:w-2/5 shadow-lg"
            />
            <div className="p-4 rounded-md flex-1 text-left text-sm sm:text-base lg:text-lg">
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
  );
}
