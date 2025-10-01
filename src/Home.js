import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const originalCards = [

    {
      title: "Nomads Shop",
      link: "/nomads-shop",
      img: "/images/Home/ThumbnailNS.jpg"
    },
    {
      title: "Nomads Gallery",
      link: "/nomads-gallery",
      img: "/images/Home/ThumbnailNG.jpg"
    },
    {
      title: "Adventures",
      link: "/adventures",
      img: "/images/Home/ThumbnailA.jpg"
    },
        {
      title: "Brazil",
      link: "/brazil",
      img: "/images/Brazil/BrazilHero.jpg"
    }

  ];

  const [cards, setCards] = useState([]);
  const carouselRef = useRef(null);

  const [permanentDrawn, setPermanentDrawn] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setCards([...originalCards, ...originalCards, ...originalCards]);

    setTimeout(() => {
      if (carouselRef.current && carouselRef.current.firstChild) {
        const cardWidth = carouselRef.current.firstChild.offsetWidth;
        carouselRef.current.scrollLeft = cardWidth * originalCards.length;
      }
    }, 50);

    const logoTimer = setTimeout(() => {
      setPermanentDrawn(true);
    }, 3000);

    return () => clearTimeout(logoTimer);
  }, []);

  const scroll = (direction = "right") => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cardWidth = carousel.firstChild.offsetWidth;
    const total = originalCards.length;

    carousel.scrollBy({
      left: direction === "right" ? cardWidth : -cardWidth,
      behavior: "smooth"
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
    <div className="relative min-h-screen w-full">
      {/* Background */}
      <img
        src={process.env.PUBLIC_URL + "/images/Home/Background.jpg"}
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover opacity-20 -z-10"
      />
      <div className="absolute inset-0 bg-black bg-opacity-10 -z-5"></div>

      {/* Logo + Tagline */}
      <div className="relative w-full text-center pt-4 sm:pt-6 md:pt-8">
        <div className="flex flex-col items-center animate-fadeIn">
          <div
            className="relative inline-block w-[220px] sm:w-[320px] md:w-[500px] lg:w-[600px] max-w-full h-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={process.env.PUBLIC_URL + "/images/Home/LogoLarge.png"}
              alt="Nomad Scribbles Logo"
              className={`block w-full h-auto drop-shadow-lg transition-opacity duration-3000 ease-in-out ${
                showOriginal ? "opacity-100" : "opacity-0"
              }`}
              style={{ width: "85%", height: "auto", margin: "0 auto" }}
            />
            <img
              src={process.env.PUBLIC_URL + "/images/Home/LogoLargeDrawn.png"}
              alt="Nomad Scribbles Drawn Logo"
              className={`absolute top-1/2 left-1/2 drop-shadow-lg transition-opacity duration-3000 ease-in-out transform -translate-x-1/2 -translate-y-1/2 ${
                showDrawn ? "opacity-100" : "opacity-0"
              }`}
              style={{ width: "125%", height: "auto" }}
            />
          </div>

          <img
            src={process.env.PUBLIC_URL + "/images/Home/HomeTag.png"}
            alt="Nomad Scribbles Tagline"
            className="w-[280px] sm:w-[360px] md:w-[480px] lg:w-[560px] max-w-full h-auto drop-shadow-md mt-12"
          />
        </div>
      </div>

      {/* Santos Feature */}
      <div className="w-screen mt-4 relative px-0">
        <Link
          to="/brazil/saopaulo/santos"
          className="relative block w-full h-56 sm:h-64 md:h-72 lg:h-80 cursor-pointer overflow-hidden group border-4 border-[#F5FCD9] transition-all duration-300 hover:border-opacity-0"
        >
          <img
            src={process.env.PUBLIC_URL + "/images/Home/Features/Santos.png"}
            alt="Santos"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 will-change-transform"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-0 transition-opacity duration-300"></div>

          <div
            className="absolute top-0 right-0 bg-[#F5FCD9] text-[#1C1F13] px-8 py-1 text-sm sm:text-base font-semibold z-10 transition-opacity duration-300 opacity-100 group-hover:opacity-0"
            style={{
              width: "160px",
              textAlign: "center",
              transform: "rotate(45deg) translate(22%, -10%)",
              transformOrigin: "center"
            }}
          >
            Spotlight
          </div>

          <img
            src={process.env.PUBLIC_URL + "/images/Home/SantosScript1.png"}
            alt="Santos Script 1"
            className="absolute top-4 left-4 w-36 sm:w-44 md:w-52 z-20 transition-opacity duration-300 group-hover:opacity-0"
          />
          <img
            src={process.env.PUBLIC_URL + "/images/Home/SantosScript2.png"}
            alt="Santos Script 2"
            className="absolute bottom-4 right-4 w-36 sm:w-44 md:w-52 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          />
        </Link>
      </div>

      {/* Bottom Carousel */}
      <div className="w-full max-w-screen-lg mx-auto py-8 relative">
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 p-2 rounded-full z-10"
        >
          <img
            src={process.env.PUBLIC_URL + "/images/lftarrow.svg"}
            alt="Left Arrow"
            className="w-6 h-6"
          />
        </button>
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 p-2 rounded-full z-10"
        >
          <img
            src={process.env.PUBLIC_URL + "/images/rtarrow.svg"}
            alt="Right Arrow"
            className="w-6 h-6"
          />
        </button>

        <div ref={carouselRef} className="flex overflow-x-auto overflow-y-hidden space-x-4 px-2">
          {cards.map((card, idx) => (
            <Link
              key={idx}
              to={card.link}
              className="relative flex-shrink-0 shadow-lg group transform transition duration-700 ease-out opacity-0 translate-y-6 animate-fadeUp"
              style={{
                aspectRatio: "16 / 9",
                width: "16rem"
              }}
            >
              <img
                src={process.env.PUBLIC_URL + card.img}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </div>

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
      `}</style>
    </div>
  );
}

export default Home;
