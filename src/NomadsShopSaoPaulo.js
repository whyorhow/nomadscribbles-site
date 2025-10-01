import React, { useState } from "react";
import Logo from "./Logo"; // adjust path if needed

export default function TrailTreasuresSaoPaulo({ openLightbox }) {
  const items = [
    // City Life
    {
      id: "caparinhaPhoto",
      title: "Caipirinha Photo",
      description: "A refreshing caipirinha moment in São Paulo.",
      image: "/images/SaoPauloLanding/full/caparinha.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/oiloo",
      category: "City Life",
    },
    {
      id: "caparinhaDrawn",
      title: "Caipirinha Drawing",
      description: "Artistic drawn version of a caipirinha.",
      image: "/images/SaoPauloLanding/full/CaparinhaDrawn.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/byrhy",
      category: "City Life",
    },
    {
      id: "pizza",
      title: "Pizza Print",
      description: "São Paulo’s famous pizza scene captured.",
      image: "/images/SaoPauloLanding/full/pizza.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/iechb",
      category: "City Life",
    },
    {
      id: "rain",
      title: "Rain Scene",
      description: "A rainy day in São Paulo streets.",
      image: "/images/SaoPauloLanding/full/rain.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/rpfnoe",
      category: "City Life",
    },

    // Parks
    {
      id: "park1",
      title: "Ibirapuera Park Print",
      description: "Beautiful view of Ibirapuera Park in São Paulo.",
      image: "/images/SP-Parks/full/Park1.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/nmdpn",
      category: "Parks",
    },
    {
      id: "park2",
      title: "Park2 Print",
      description: "Another view of São Paulo’s parks.",
      image: "/images/SP-Parks/full/Park2.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/zypszc",
      category: "Parks",
    },
    {
      id: "park3",
      title: "Park3 Print",
      description: "Capturing the greenery of the city.",
      image: "/images/SP-Parks/full/Park3.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/wwpco",
      category: "Parks",
    },
    {
      id: "park4",
      title: "Park4 Print",
      description: "Quiet corners of Ibirapuera Park.",
      image: "/images/SP-Parks/full/Park4.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/pdlkl",
      category: "Parks",
    },
    {
      id: "park5",
      title: "Park5 Print",
      description: "Park paths and city skyline.",
      image: "/images/SP-Parks/full/Park5.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/dqsmj",
      category: "Parks",
    },
    {
      id: "park6",
      title: "Park6 Print",
      description: "Sunlight through the trees.",
      image: "/images/SP-Parks/full/Park6.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/lstekx",
      category: "Parks",
    },
    {
      id: "park7",
      title: "Burle Marx Poster",
      description: "Iconic design poster of Burle Marx.",
      image: "/images/SP-Parks/full/Park7.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/vgmnwm",
      category: "Parks",
    },

    // Murals
    {
      id: "graffiti1",
      title: "Graffiti 1",
      description: "Vibrant street art in São Paulo.",
      image: "/images/Murals/full/Graffiti1.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/lyxdq",
      category: "Murals",
    },
    {
      id: "graffiti2",
      title: "Graffiti 2",
      description: "Urban mural capturing city life.",
      image: "/images/Murals/full/Graffiti2.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/vxqtux",
      category: "Murals",
    },
    {
      id: "graffiti3",
      title: "Graffiti 3",
      description: "Colourful street art scene.",
      image: "/images/Murals/full/Graffiti3.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/mztdgd",
      category: "Murals",
    },
    {
      id: "graffiti4",
      title: "Graffiti 4",
      description: "A wall full of creative expression.",
      image: "/images/Murals/full/Graffiti4.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/gipav",
      category: "Murals",
    },
    {
      id: "graffiti5",
      title: "Graffiti 5",
      description: "São Paulo mural culture captured.",
      image: "/images/Murals/full/Graffiti5.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/twbmh",
      category: "Murals",
    },
    {
      id: "graffiti6",
      title: "Graffiti 6",
      description: "Urban art in the city streets.",
      image: "/images/Murals/full/Graffiti6.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/mgmcf",
      category: "Murals",
    },
    {
      id: "graffiti7",
      title: "Graffiti 7",
      description: "Dynamic colours and shapes.",
      image: "/images/Murals/full/Graffiti7.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/sbhqbf",
      category: "Murals",
    },
    {
      id: "graffiti8",
      title: "Graffiti 8",
      description: "Street art showcasing São Paulo vibes.",
      image: "/images/Murals/full/Graffiti8.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/klcopp",
      category: "Murals",
    },

    // Santos
    {
      id: "santos1",
      title: "Santos 1",
      description: "Coastal charm of Santos, Brazil.",
      image: "/images/Santos/Santos1.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/imrcgs",
      category: "Santos",
    },
    {
      id: "santos2",
      title: "Santos 2",
      description: "Scenes from the port city of Santos.",
      image: "/images/Santos/Santos2.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/felnv",
      category: "Santos",
    },
    {
      id: "santos3",
      title: "Santos 3",
      description: "Ocean and urban blend in Santos.",
      image: "/images/Santos/Santos3.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/epmgt",
      category: "Santos",
    },
    {
      id: "santos4",
      title: "Santos 4",
      description: "Views from the coastline of Santos.",
      image: "/images/Santos/Santos4.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/xhgdwdd",
      category: "Santos",
    },
    {
      id: "santos5",
      title: "Santos 5",
      description: "Life by the beaches of Santos.",
      image: "/images/Santos/Santos5.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/rswumv",
      category: "Santos",
    },
    {
      id: "santos6",
      title: "Santos 5 Artwork",
      description: "Another moment from the city of Santos.",
      image: "/images/Santos/Santos5Drawn.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/ynvfwu",
      category: "Santos",
    },

    // Carnival
    {
      id: "carnival1",
      title: "Carnival 1",
      description: "São Paulo Carnival streets alive with color and music",
      image: "/images/CarnivalSP/Carnival1.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/junhjy",
      category: "Carnival",
    },
    {
      id: "carnival2",
      title: "Carnival 2",
      description: "Samba schools perform at Sambódromo do Anhembi",
      image: "/images/CarnivalSP/Carnival2.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/htrdk",
      category: "Carnival",
    },
    {
      id: "carnival3",
      title: "Carnival 3",
      description: "Floats behind the scenes at Sambódromo",
      image: "/images/CarnivalSP/Carnival3.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/oktonph",
      category: "Carnival",
    },
    {
      id: "carnival4",
      title: "Carnival 4",
      description: "Spectators watching Carnival, city rhythms unfolding",
      image: "/images/CarnivalSP/Carnival4.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/hfnkpg",
      category: "Carnival",
    },
    {
      id: "carnival5",
      title: "Carnival 5",
      description: "Blocos in alleyways and open parks during Carnival",
      image: "/images/CarnivalSP/Carnival5.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/cgujou",
      category: "Carnival",
    },
    {
      id: "carnival6",
      title: "Carnival 6",
      description: "Ibirapuera Park bloco dancers winding through trees",
      image: "/images/CarnivalSP/Carnival6.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/iuzniy",
      category: "Carnival",
    },
    {
      id: "carnival7",
      title: "Carnival 7",
      description: "Drag performers performing marchinhas at a bloco",
      image: "/images/CarnivalSP/Carnival7.jpg",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/mykatk",
      category: "Carnival",
    },
  ];

  const categories = ["All", "City Life", "Parks", "Murals", "Santos", "Carnival"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const visibleItems = filteredItems.slice(0, visibleCount);

  const imagesArray = filteredItems.map((i) => i.image);
  const altsArray = filteredItems.map((i) => i.title);
  const gumroadArray = filteredItems.map((i) => i.gumroadLink);

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(/images/NomadsShop/NomadsShopBgd.jpg)`,
        backgroundPosition: "top center",
      }}
    >
      <div className="absolute top-3 left-4 z-8">
        <Logo className="h-6 w-auto sm:h-10" />
      </div>

      <div className="flex justify-center mb-6">
        <img
          src="/images/NomadsShop/NomadsShopTitle.png"
          alt="NomadsShop Title"
          className="w-2/3 sm:w-[60%] lg:w-1/3 h-auto rounded-lg"
        />
      </div>

      <h1 className="text-center text-[#111] text-3xl font-semibold mb-6">
        São Paulo
      </h1>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full font-medium transition ${
              selectedCategory === cat
                ? "bg-black text-white"
                : "bg-white/70 text-black hover:bg-black/10"
            }`}
            onClick={() => {
              setSelectedCategory(cat);
              setVisibleCount(12);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-lg mx-auto">
        {visibleItems.map((item) => {
          const lightboxIndex = filteredItems.indexOf(item);
          return (
            <div
              key={item.id}
              className="relative w-full h-48 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
              onClick={() =>
                openLightbox(lightboxIndex, imagesArray, altsArray, gumroadArray)
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openLightbox(lightboxIndex, imagesArray, altsArray, gumroadArray);
                }
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 w-full bg-white/60 backdrop-blur-sm p-2 flex flex-col items-center gap-1 rounded-b-lg">
                <p className="text-[#111] font-semibold text-sm sm:text-base text-center">
                  {item.title}
                </p>
                <p className="text-[#111] text-xs sm:text-sm text-center">
                  {item.description}
                </p>
                {item.gumroadLink && (
                  <a
                    href={item.gumroadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-200 text-[#111] py-1 px-2 rounded hover:bg-gray-300 transition text-xs sm:text-sm"
                  >
                    Purchase
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {visibleCount < filteredItems.length && (
        <div className="flex justify-center my-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-black/80 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
