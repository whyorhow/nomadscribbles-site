import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "./components/SEO";

function Home() {
  const originalCards = [
    { title: "Nomads Shop", link: "/nomads-shop", img: "/images/Home/ThumbnailNS.webp" },
    { title: "Nomads Gallery", link: "/nomads-gallery", img: "/images/Home/ThumbnailNG.webp" },
    { title: "Adventures", link: "/adventures", img: "/images/Home/ThumbnailA.webp" },
    { title: "Brazil", link: "/brazil", img: "/images/Home/Thumbnail.webp" },
  ];

  const [cards, setCards] = useState([]);
  const carouselRef = useRef(null);
  const [permanentDrawn, setPermanentDrawn] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setCards([...originalCards, ...originalCards, ...originalCards]);

    const alignTimeout = setTimeout(() => {
      if (carouselRef.current && carouselRef.current.firstChild) {
        const cardWidth = carouselRef.current.firstChild.offsetWidth;
        carouselRef.current.scrollLeft = cardWidth * originalCards.length;
      }
    }, 50);

    const logoTimer = setTimeout(() => setPermanentDrawn(true), 3000);

    return () => {
      clearTimeout(alignTimeout);
      clearTimeout(logoTimer);
    };
  }, []);

  const scroll = (direction = "right") => {
    const carousel = carouselRef.current;
    if (!carousel || !carousel.firstChild) return;
    const cardWidth = carousel.firstChild.offsetWidth;
    const total = originalCards.length;

    carousel.scrollBy({
      left: direction === "right" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });

    setTimeout(() => {
      const scrollIndex = Math.round(carousel.scrollLeft / cardWidth);
      if (scrollIndex < total) {
        carousel.scrollLeft += total * cardWidth;
      } else if (scrollIndex >= total * 2) {
        carousel.scrollLeft -= total * cardWidth;
      }
    }, 350);
  };

  const showOriginal = !permanentDrawn || isHovered;
  const showDrawn = permanentDrawn && !isHovered;

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
<SEO
  title="Nomad Scribbles | Travel Stories Across Brazil & Beyond"
  description="Join Nomad Scribbles on a journey through Brazil and beyond — discover cities, culture, travel tips, and inspiring adventures."
  image="/images/Home/Background.webp"
  slug=""  // homepage, so slug can be empty
/>

      {/* Hidden main title for SEO */}
      <h1 className="sr-only">Nomad Scribbles | Travel Stories Across Brazil & Beyond</h1>

      {/* Background */}
      <img
        src={process.env.PUBLIC_URL + "/images/Home/Background.jpg"}
        alt="Beautiful travel background of Brazil"
  className="fixed inset-0 w-full h-full object-cover brightness-75 -z-10"      />

{/* Logo + Tagline */}
<div className="relative w-full text-center pt-2 sm:pt-3 md:pt-4">
  <div className="flex flex-col items-center">
    <div className="w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-xl mx-auto">
      <img
        src={process.env.PUBLIC_URL + "/images/Home/LogoLargeDrawn2.webp"}
        alt="Nomad Scribbles Hand-drawn Logo"
        className="w-full h-auto object-contain drop-shadow-lg"
      />
    </div>

    <img
      src={process.env.PUBLIC_URL + "/images/Home/HomeTag.webp"}
      alt="Nomad Scribbles Tagline: Travel Stories Across Brazil & Beyond"
      className="w-2/3 sm:w-1/2 md:w-2/5 lg:w-1/3 max-w-full h-auto drop-shadow-md mt-4 sm:mt-5"
    />
  </div>
</div>


{/* Santos Feature */}
<div className="w-full mt-4 px-2 sm:px-4 relative">
  <Link
    to="/brazil/saopaulo/santos"
    className="relative block w-full max-w-[60%] sm:max-w-[50%] md:max-w-[40%] mx-auto aspect-[16/9] cursor-pointer overflow-hidden group border-4 border-[#F5FCD9] transition-all duration-300 hover:border-opacity-0"
  >
    <img
      src={process.env.PUBLIC_URL + "/images/Home/Features/Santos.webp"}
      alt="Santos city travel feature"
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-0 transition-opacity duration-300"></div>

    <div
      className="absolute top-0 right-0 bg-[#F5FCD9] text-[#1C1F13] px-4 sm:px-6 py-1 text-xs sm:text-sm md:text-base font-semibold z-10 transition-opacity duration-300 opacity-100 group-hover:opacity-0"
      style={{ transform: "rotate(45deg) translate(22%, -10%)", transformOrigin: "center" }}
    >
      Spotlight
    </div>

    <img
      src={process.env.PUBLIC_URL + "/images/Home/SantosScript1.webp"}
      alt="Santos Script Detail"
      className="absolute top-2 sm:top-4 left-2 sm:left-4 w-24 sm:w-36 md:w-44 z-20 transition-opacity duration-300 group-hover:opacity-0"
    />
    <img
      src={process.env.PUBLIC_URL + "/images/Home/SantosScript2.webp"}
      alt="Santos Script Hover Detail"
      className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-24 sm:w-36 md:w-44 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
    />
  </Link>
</div>

      {/* Bottom Carousel */}
      <div className="w-full max-w-screen-lg mx-auto py-8 relative px-2 sm:px-4">
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 p-2 rounded-full z-10"
        >
          <img src={process.env.PUBLIC_URL + "/images/lftarrow.svg"} alt="Left Arrow" className="w-6 h-6" />
        </button>
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 p-2 rounded-full z-10"
        >
          <img src={process.env.PUBLIC_URL + "/images/rtarrow.svg"} alt="Right Arrow" className="w-6 h-6" />
        </button>

        <div ref={carouselRef} className="flex overflow-x-auto overflow-y-hidden space-x-4">
          {cards.map((card, idx) => (
            <Link
              key={idx}
              to={card.link}
              className="relative flex-shrink-0 shadow-lg group transform transition duration-700 ease-out opacity-0 translate-y-6 animate-fadeUp"
              style={{ width: "80vw", maxWidth: "16rem", aspectRatio: "16/9" }}
            >
              <img
                src={process.env.PUBLIC_URL + card.img}
                alt={card.title + " - travel highlights"}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Inline animation styles */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(24px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeUp { animation: fadeUp 0.7s forwards; }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 1s forwards; }

        @keyframes fadeInSlow {
          0% { opacity: 0; transform: scale(1.02); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeInSlow { animation: fadeInSlow 2s ease-out forwards; }
      `}</style>
    </div>
  );
}

export default Home;
