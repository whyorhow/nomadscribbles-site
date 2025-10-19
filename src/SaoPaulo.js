import React, { useState } from "react";
import SEO from "./components/SEO";
import Logo from "./Logo";
import Lightbox from "./Lightbox";
import artImages from "./artImages.json";
import { motion } from "framer-motion";

function SaoPaulo() {
  const top5 = [
    {
      title: "1. Explore São Paulo’s Parks",
      text: "São Paulo’s green heart beats inside its parks. From the lakes and modernist sculptures of Ibirapuera Park to the botanical calm of Parque Estadual da Cantareira, these open spaces offer quiet moments away from city noise — ideal for picnics, sketching, or simply breathing.",
      image: `${process.env.PUBLIC_URL}/images/SP-Parks/Park8.webp`,
      link: "/brazil/saopaulo/parks",
      alt: "Ibirapuera Park lake in São Paulo with skyline reflections",
    },
    {
      title: "2. Discover World-Class Art Galleries",
      text: "Art in São Paulo never sits still. At MASP, masterpieces seem to float on glass, while the Pinacoteca brings Brazilian modernism into soft light and brick halls. Each space tells part of the city’s creative story — bold, experimental, and proudly urban.",
      image: `${process.env.PUBLIC_URL}/images/ArtGallery/ArtGallery6.webp`,
      link: "/brazil/saopaulo/museums",
      alt: "MASP glass structure on Paulista Avenue in São Paulo",
    },
    {
      title: "3. Experience Carnival Up Close",
      text: "In São Paulo, Carnival is both rhythm and rebellion. Samba drums echo through the Sambadrome and neighbourhood blocos spill through the streets in colour and sound. Join the dancers, sip a caipirinha, and feel how the city turns joy into motion.",
      image: `${process.env.PUBLIC_URL}/images/CarnivalSP/Carnival8.webp`,
      link: "/brazil/saopaulo/carnival",
      alt: "Samba parade in São Paulo Carnival with dancers in bright costumes",
    },
    {
      title: "4. Wander Among Street Murals",
      text: "The city walls of São Paulo speak louder than words. Walk through Vila Madalena’s Beco do Batman and you’ll find political voices, portraits, and wild imagination sprayed in colour. Every mural adds another layer to the city’s living canvas.",
      image: `${process.env.PUBLIC_URL}/images/Murals/Graffiti6.webp`,
      link: "/brazil/saopaulo/murals",
      alt: "Colourful graffiti art in Beco do Batman, Vila Madalena, São Paulo",
    },
    {
      title: "5. Take a Day Trip to Santos",
      text: "Just an hour south of São Paulo, Santos changes the pace. Colonial streets lead to long beaches and the scent of roasted coffee drifts from the old Coffee Museum. It’s where Paulistanos go to swap skyscrapers for sea breeze.",
      image: `${process.env.PUBLIC_URL}/images/Santos/Santos6.webp`,
      link: "/brazil/saopaulo/santos",
      alt: "Beachfront and historic Coffee Museum in Santos, Brazil",
    },
  ];

  const top5BgColors = [
    "bg-[#F5E8C7]/50",
    "bg-[#C7E8F5]/50",
    "bg-[#E8C7F5]/50",
    "bg-[#F5C7C7]/50",
    "bg-[#C7F5D8]/50",
  ];

  const inlineImages = artImages.filter((img) =>
    ["pizza", "street", "rain", "caparinhaPhoto", "caparinhaDrawn"].includes(img.id)
  );

  const [currentIndex, setCurrentIndex] = useState(null);
  const [revealed, setRevealed] = useState({}); // tracks which images are revealed on mobile

  const handleToggle = (id) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <SEO
        title="Top 5 Things to Do in São Paulo | Nomad Scribbles"
        description="Discover the best of São Paulo — from lush parks and world-class art galleries to Carnival, street murals, and the seaside charm of Santos."
        keywords="São Paulo travel guide, best things to do in São Paulo, São Paulo attractions, Nomad Scribbles, São Paulo parks, MASP, street art, Carnival, Santos, Brazil travel"
        image="https://nomadscribbles.com/images/SaoPauloLanding/SaoPauloFeature.webp"
        url="https://nomadscribbles.com/brazil/saopaulo"
      />

      <div className="absolute top-3 left-4 z-10">
        <Logo className="h-6 w-auto sm:h-10" />
      </div>

      <div className="flex justify-center mt-2 mb-2">
        <img
          src={`${process.env.PUBLIC_URL}/images/SaoPauloLanding/SaoPauloFeature.webp`}
          alt="São Paulo skyline with feature title"
          className="w-full max-w-[600px] h-auto rounded-lg shadow-lg object-contain"
        />
      </div>

      <section className="max-w-screen-lg mx-auto px-6 py-8 bg-white/10 rounded-lg space-y-8 mb-12 text-[#e2e1dc] leading-relaxed">
        <div className="flex justify-center mb-4">
          <img
            src={`${process.env.PUBLIC_URL}/images/SaoPauloLanding/heading2.webp`}
            alt="City Life and Flavours of São Paulo"
            className="w-full max-w-[400px] h-auto object-contain drop-shadow-md"
            loading="lazy"
          />
        </div>

        <p>
          São Paulo moves with a rhythm that’s hard to pin down — part jazz, part traffic, part heartbeat. Rain on concrete smells faintly of roasted coffee, and music leaks from apartment windows. The energy hums beneath everything.
        </p>

        <div className="flex flex-col gap-2">
          {/* Pizza Block */}
          <div className="flex flex-col sm:flex-row items-start gap-2">
            <div className="relative w-1/2 sm:w-1/5">
              <img
                src={`${process.env.PUBLIC_URL}/images/SaoPauloLanding/pizza.webp`}
                alt="São Paulo-style pizza"
                loading="lazy"
                className="rounded-lg shadow-md flex-shrink-0 cursor-pointer transition-opacity duration-[2000ms]"
                onMouseEnter={() => handleToggle("pizza")}
                onMouseLeave={() => handleToggle("pizza")}
                onClick={() =>
                  setCurrentIndex(inlineImages.findIndex((img) => img.id === "pizza"))
                }
                style={{ opacity: revealed["pizza"] ? 1 : 0.5 }}
              />
            </div>
            <p className="flex-1">
              Pizza here is a quiet religion. Born from Italian ovens, thin and soft, eaten late — sometimes after midnight. Every neighbourhood claims the best slice. The crust cracks softly under your teeth, the cheese stretches like warm sunlight, and each topping tells a story of local tastes and seasonal produce. Sharing a pizza feels like sharing a little piece of São Paulo itself.
            </p>
          </div>

          {/* Street + Rain Block */}
          <div className="flex flex-col sm:flex-row-reverse items-start gap-2">
            {["street", "rain"].map((id) => {
              const img = inlineImages.find((img) => img.id === id);
              return (
                <div key={id} className="relative w-1/2 sm:w-1/5">
                  <img
                    src={img.blogimage}
                    alt={img.alt}
                    loading="lazy"
                    className="rounded-lg shadow-md flex-shrink-0 cursor-pointer transition-opacity duration-[2000ms]"
                    onMouseEnter={() => handleToggle(id)}
                    onMouseLeave={() => handleToggle(id)}
                    onClick={() =>
                      setCurrentIndex(inlineImages.findIndex((img) => img.id === id))
                    }
                    style={{ opacity: revealed[id] ? 1 : 0.5 }}
                  />
                </div>
              );
            })}
            <p className="flex-1">
              After the rain, reflections bloom across pavements, shopfronts glow in gold and blue. Even in stillness, São Paulo feels alive — a city that never entirely sleeps. Music floats from open windows, footsteps echo on cobbled streets, and the smell of roasted coffee drifts through alleys. Every corner seems to pulse with a hidden rhythm, inviting wanderers to notice small stories in the mundane.
            </p>
          </div>

          {/* Caipirinha Block */}
          <div className="flex flex-col sm:flex-row items-start gap-2">
            {["caparinhaPhoto", "caparinhaDrawn"].map((id) => {
              const img = inlineImages.find((img) => img.id === id);
              return (
                <div key={id} className="relative w-1/2 sm:w-1/5">
                  <img
                    src={img.blogimage}
                    alt={img.alt}
                    loading="lazy"
                    className="rounded-lg shadow-md flex-shrink-0 cursor-pointer transition-opacity duration-[2000ms]"
                    onMouseEnter={() => handleToggle(id)}
                    onMouseLeave={() => handleToggle(id)}
                    onClick={() =>
                      setCurrentIndex(inlineImages.findIndex((img) => img.id === id))
                    }
                    style={{ opacity: revealed[id] ? 1 : 0.5 }}
                  />
                </div>
              );
            })}
            <p className="flex-1">
              A Caipirinha marks the pause in a city of ten million. Lime, sugar, cachaça — simple balance. Locals sip between laughter and long stories. The ice clinks in glasses as conversations meander from football to art to the day’s adventures. The tangy sweetness lingers on your tongue, a small reminder to slow down, even in a city that never stops moving.
            </p>
          </div>
        </div>

        <p className="text-center mt-4">
          These glimpses capture just the first layer of São Paulo — now let’s dive into the city’s top five experiences.
        </p>
      </section>

      <main className="px-4 py-8 max-w-screen-lg mx-auto space-y-6">
        <div className="flex justify-center mb-6">
          <img
            src={`${process.env.PUBLIC_URL}/images/SaoPauloLanding/heading3.webp`}
            alt="Top 5 Things to Do in São Paulo"
            className="w-full max-w-[420px] h-auto object-contain drop-shadow-md"
            loading="lazy"
          />
        </div>

        {top5.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`flex flex-col lg:flex-row items-center gap-6 ${top5BgColors[idx]} rounded-lg p-4 shadow-md ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <a
              href={item.link}
              rel="noopener noreferrer"
              className="w-full sm:w-3/4 lg:w-2/5 flex-shrink-0"
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="rounded-lg w-full shadow-md hover:opacity-90 transition-opacity"
              />
            </a>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="mb-3">{item.text}</p>
              <a
                href={item.link}
                rel="noopener noreferrer"
                className="inline-block text-[#edd98d] font-semibold hover:underline"
              >
                Read more →
              </a>
            </div>
          </motion.div>
        ))}
      </main>

      {currentIndex !== null && (
        <Lightbox
          images={inlineImages}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </div>
  );
}

export default SaoPaulo;
