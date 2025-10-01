import React, { useState } from "react";
import { Link } from "react-router-dom";
import Lightbox from "./Lightbox";
import EnlargeIcon from "./assets/images/enlarge.svg";

export default function TrailTreasuresParks() {
  const items = [
    {
      id: "park1",
      title: "Ibirapuera Park Print",
      description: "Beautiful view of Ibirapuera Park in São Paulo.",
      image: "/images/SP-Parks/full/Park1.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/nmdpn",
    },
    {
      id: "park2",
      title: "Park2 Print",
      description: "Another view of São Paulo’s parks.",
      image: "/images/SP-Parks/full/Park2.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/zypszc",
    },
    {
      id: "park3",
      title: "Park3 Print",
      description: "Capturing the greenery of the city.",
      image: "/images/SP-Parks/full/Park3.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/wwpco",
    },
    {
      id: "park4",
      title: "Park4 Print",
      description: "Quiet corners of Ibirapuera Park.",
      image: "/images/SP-Parks/full/Park4.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/pdlkl",
    },
    {
      id: "park5",
      title: "Park5 Print",
      description: "Park paths and city skyline.",
      image: "/images/SP-Parks/full/Park5.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/dqsmj",
    },
    {
      id: "park6",
      title: "Park6 Print",
      description: "Sunlight through the trees.",
      image: "/images/SP-Parks/full/Park6.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/lstekx",
    },
    {
      id: "park7",
      title: "Burle Marx Poster",
      description: "Iconic design poster of Burle Marx.",
      image: "/images/SP-Parks/full/Park7.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/vgmnwm",
    },
  ];

  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Pre-build arrays to pass to Lightbox
  const imagesArray = items.map(i => i.image);
  const altsArray = items.map(i => i.title);
  const gumroadArray = items.map(i => i.gumroadLink);
  const storeArray = items.map(() => "/trail-treasures/brazil/saopaulo/parks");

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pt-4 px-4"
      style={{ backgroundImage: `url(/images/TrailTreasures/NSTTreasures.jpg)` }}
    >
      {/* Logo */}
      <div className="flex justify-center my-4">
        <Link to="/home">
          <img
            src="/images/LogoMain.png"
            alt="Nomad Scribbles Logo"
            className="w-[300px] max-w-[90%] h-auto"
          />
        </Link>
      </div>

      <h1 className="text-center text-[#111] text-3xl font-semibold mb-6">São Paulo Parks</h1>

      {/* Thumbnails */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-lg mx-auto">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="relative w-full h-48 rounded-lg overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-all duration-200"
            onClick={() => setLightboxIndex(index)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />

            {/* Corner SVG */}
            <div className="absolute top-2 right-2 w-5 h-5">
              <img src={EnlargeIcon} alt="Enlarge" className="w-full h-full" />
            </div>

            {/* Overlay */}
            <div className="absolute bottom-0 left-0 w-full bg-white/50 backdrop-blur-sm p-2 flex flex-col items-center gap-1 rounded-b-lg">
              <p className="text-[#111] font-semibold text-sm sm:text-base text-center">{item.title}</p>
              <p className="text-[#111] text-xs sm:text-sm text-center">{item.description}</p>
              <a
                href={item.gumroadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-200 text-[#111] py-1 px-2 rounded hover:bg-gray-300 transition text-xs sm:text-sm"
              >
                Purchase
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={imagesArray}
          alts={altsArray}
          currentIndex={lightboxIndex}
          setCurrentIndex={setLightboxIndex}
          gumroadLinks={gumroadArray}
          storeLinks={storeArray}
        />
      )}
    </div>
  );
}
