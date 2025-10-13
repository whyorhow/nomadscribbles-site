import React from "react";
import { Helmet } from "react-helmet-async";
import Logo from "./Logo";

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

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex flex-col"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/SaoPauloLanding/SPBackground.webp)`,
      }}
    >
      {/* SEO Tags */}
      <Helmet>
        <title>Top 5 Things to Do in São Paulo | Nomad Scribbles</title>
        <meta
          name="description"
          content="Discover the best of São Paulo with Nomad Scribbles — from its lush parks and world-class art galleries to Carnival, street murals, and the seaside charm of Santos."
        />
        <meta
          name="keywords"
          content="São Paulo travel guide, best things to do in São Paulo, São Paulo attractions, Nomad Scribbles, São Paulo parks, MASP, street art, Carnival, Santos, Brazil travel"
        />
        <link
          rel="canonical"
          href="https://nomadscribbles.com/brazil/saopaulo"
        />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Top 5 Things to Do in São Paulo | Nomad Scribbles" />
        <meta property="og:description" content="Discover the best of São Paulo — from lush parks and world-class art galleries to Carnival, street murals, and the seaside charm of Santos." />
        <meta property="og:image" content="https://nomadscribbles.com/images/SaoPauloLanding/SaoPauloFeature.webp" />
        <meta property="og:url" content="https://nomadscribbles.com/brazil/saopaulo" />
        <meta property="og:site_name" content="Nomad Scribbles" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Top 5 Things to Do in São Paulo | Nomad Scribbles" />
        <meta name="twitter:description" content="Discover the best of São Paulo — from its green parks and creative murals to Carnival and coastal escapes." />
        <meta name="twitter:image" content="https://nomadscribbles.com/images/SaoPauloLanding/SaoPauloFeature.webp" />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": "Top 5 Things to Do in São Paulo",
              "image": "https://nomadscribbles.com/images/SaoPauloLanding/SaoPauloFeature.webp",
              "author": {"@type": "Person","name": "Nomad Scribbles"},
              "publisher": {"@type": "Organization","name": "Nomad Scribbles","logo": {"@type": "ImageObject","url": "https://nomadscribbles.com/images/LogoRectangle.png"}},
              "description": "Discover the best of São Paulo with Nomad Scribbles — from its lush parks and world-class art galleries to Carnival, street murals, and the seaside charm of Santos."
            }
          `}
        </script>
      </Helmet>

      {/* Logo */}
      <div className="absolute top-3 left-4 z-10">
        <Logo className="h-6 w-auto sm:h-10" />
      </div>

      {/* Hero Image */}
      <div className="flex justify-center mt-2 mb-2">
        <img
          src={`${process.env.PUBLIC_URL}/images/SaoPauloLanding/SaoPauloFeature.webp`}
          alt="São Paulo skyline with feature title"
className="w-full max-w-[900px] h-auto max-h-[200px] sm:max-h-[230px] rounded-lg shadow-lg object-contain"
        />
      </div>

      {/* Intro Section */}
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
          São Paulo moves with a rhythm that’s hard to pin down — part jazz, part 
          traffic, part heartbeat. Rain on concrete smells faintly of roasted coffee, 
          and music leaks from apartment windows. The energy hums beneath everything.
        </p>

        <div className="flex flex-col gap-6">
          {/* Pizza Block */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <img src={`${process.env.PUBLIC_URL}/images/SaoPauloLanding/pizza.webp`} alt="São Paulo-style pizza" loading="lazy" className="w-1/2 sm:w-1/5 rounded-lg shadow-md flex-shrink-0" />
            <p className="flex-1">
              Pizza here is a quiet religion. Born from Italian ovens, thin and soft, eaten late — sometimes after midnight. Every neighbourhood claims the best slice. The crust cracks softly under your teeth, the cheese stretches like warm sunlight, and each topping tells a story of local tastes and seasonal produce. Sharing a pizza feels like sharing a little piece of São Paulo itself.
            </p>
          </div>

          {/* Street + Rain Block */}
          <div className="flex flex-col sm:flex-row-reverse items-start gap-4">
            <img src={`${process.env.PUBLIC_URL}/images/SaoPauloLanding/street.webp`} alt="São Paulo street at dusk" loading="lazy" className="w-1/2 sm:w-1/5 rounded-lg shadow-md flex-shrink-0" />
            <img src={`${process.env.PUBLIC_URL}/images/SaoPauloLanding/rain.webp`} alt="Rain on São Paulo streets" loading="lazy" className="w-1/2 sm:w-1/5 rounded-lg shadow-md flex-shrink-0" />
            <p className="flex-1">
              After the rain, reflections bloom across pavements, shopfronts glow in gold and blue. Even in stillness, São Paulo feels alive — a city that never entirely sleeps. Music floats from open windows, footsteps echo on cobbled streets, and the smell of roasted coffee drifts through alleys. Every corner seems to pulse with a hidden rhythm, inviting wanderers to notice small stories in the mundane.
            </p>
          </div>

          {/* Caipirinha Block */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <img src={`${process.env.PUBLIC_URL}/images/SaoPauloLanding/caparinha.webp`} alt="Caipirinha cocktail with lime" loading="lazy" className="w-1/2 sm:w-1/5 rounded-lg shadow-md flex-shrink-0" />
            <img src={`${process.env.PUBLIC_URL}/images/SaoPauloLanding/CaparinhaDrawn.webp`} alt="Illustrated Caipirinha sketch" loading="lazy" className="w-1/2 sm:w-1/5 rounded-lg shadow-md flex-shrink-0" />
            <p className="flex-1">
              A Caipirinha marks the pause in a city of ten million. Lime, sugar, cachaça — simple balance. Locals sip between laughter and long stories. The ice clinks in glasses as conversations meander from football to art to the day’s adventures. The tangy sweetness lingers on your tongue, a small reminder to slow down, even in a city that never stops moving.
            </p>
          </div>
        </div>

        <p className="text-center mt-4">
          These glimpses capture just the first layer of São Paulo — now let’s dive into the city’s top five experiences.
        </p>
      </section>

      {/* Top 5 List */}
      <main className="px-4 py-8 max-w-screen-lg mx-auto space-y-16">
        <div className="flex justify-center mb-6">
          <img
            src={`${process.env.PUBLIC_URL}/images/SaoPauloLanding/heading3.webp`}
            alt="Top 5 Things to Do in São Paulo"
            className="w-full max-w-[420px] h-auto object-contain drop-shadow-md"
            loading="lazy"
          />
        </div>

        {top5.map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-col lg:flex-row items-center gap-6 bg-white/85 rounded-lg p-4 shadow-md ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <img
              src={item.image}
              alt={item.alt}
              loading="lazy"
              className="rounded-lg w-full sm:w-3/4 lg:w-2/5 shadow-md hover:opacity-90 transition-opacity"
            />
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="mb-3">{item.text}</p>
              <a
                href={item.link}
                rel="noopener noreferrer"
                className="inline-block text-[#3b3b3b] font-semibold hover:underline"
              >
                Read more →
              </a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default SaoPaulo;
