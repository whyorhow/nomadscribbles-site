import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "./components/SEO";
import { fadeScale, hoverScale, staggerContainer } from "./animations";
import { skyObjects } from "./Sky";
import { sunsObjects } from "./Suns";
import { waterObjects } from "./Water";
import { soilObjects } from "./Soil";
import { grassObjects } from "./Grass";  
import HandwritingTagline from "./HandwritingTagline";
import { trackEvent } from "./utils/analytics";

const TestDanishSky = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const originalCards = [
    { title: "Nomads Shop", link: "https://nomadscribbles.co.uk/shop", img: "/images/Home/ThumbnailNS.webp", external: true },
    { title: "Nomads Gallery", link: "/nomads-gallery", img: "/images/Home/ThumbnailNG.webp" },
    { title: "Adventures", link: "/adventures", img: "/images/Home/ThumbnailA.webp" },
    { title: "Brazil", link: "/brazil", img: "/images/Home/Thumbnail.webp" },
  ];

  const [cards, setCards] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setViewportHeight(window.innerHeight);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setCards([...originalCards, ...originalCards, ...originalCards]);

    const alignTimeout = setTimeout(() => {
if (carouselRef.current && carouselRef.current.firstChild) {
  const cardWidth = carouselRef.current.firstChild.offsetWidth;
        carouselRef.current.scrollLeft = cardWidth * originalCards.length;
      }
    }, 50);

    return () => clearTimeout(alignTimeout);
  }, []);

const scroll = (direction = "right") => {
  const carousel = carouselRef.current;
  if (!carousel || !carousel.firstChild) return; // safer than children[0]
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


  const renderLayer = (layer, index) => {
    let parallaxY = 0;
    if (layer.baseTopPercent !== undefined) {
      const basePx = viewportHeight * (layer.baseTopPercent / 100);
      parallaxY = basePx - scrollY * (layer.speed ?? 0.05) * 20;
    } else if (layer.baseBottomPercent !== undefined) {
      const distanceFromBottom = viewportHeight * (layer.baseBottomPercent / 100);
      parallaxY = viewportHeight - distanceFromBottom - scrollY * (layer.speed ?? 0.02) * 20;
    }

    const layerStyle = {
      position: "absolute",
      width: layer.width || "100%",
      height: layer.height || "auto",
      zIndex: layer.zIndex ?? 0,
      top: `${parallaxY}px`,
    };

    if (layer.centerHorizontally) {
      layerStyle.left = "50%";
      layerStyle.transform = "translateX(-50%)";
      if (layer.xSpeed) {
        const parallaxX = scrollY * (layer.xSpeed * 10);
        layerStyle.transform = `translateX(calc(-50% + ${parallaxX}px))`;
      }
      if (layer.sway) {
        layerStyle.animation = `sway ${layer.swayDuration || 2}s ease-in-out infinite alternate`;
      }
    } else {
      const parallaxX =
        ((layer.baseLeftPercent || 0) / 100) * window.innerWidth +
        scrollY * ((layer.xSpeed || 0) * 20);
      layerStyle.left = `${parallaxX}px`;
    }

    return (
      <svg
        key={layer.id || index}
        viewBox={layer.viewBox || "0 0 800 400"}
        preserveAspectRatio="xMidYMid meet"
        style={layerStyle}
      >
        {layer.path && (
          <path
            d={layer.path}
            fill={layer.fill}
            stroke={layer.stroke}
            strokeWidth={layer.strokeWidth}
          />
        )}
      </svg>
    );
  };

  const sky = skyObjects.map(layer => ({ ...layer, zIndex: layer.zIndex ?? 1 }));
  const suns = sunsObjects.map(layer => ({ ...layer, zIndex: layer.zIndex ?? 10 }));
  const water = waterObjects.map(layer => ({ ...layer, zIndex: layer.zIndex ?? 15 }));
  const soil = soilObjects.map(layer => ({ ...layer, zIndex: layer.zIndex ?? 20 }));
  const grass = grassObjects.map(layer => ({ ...layer, zIndex: layer.zIndex ?? 25 }));

  return (
    <div className="relative w-screen h-[200vh] overflow-hidden bg-[#342508ff]">
      {sky.map(renderLayer)}
      {suns.map(renderLayer)}
      {water.map(renderLayer)}
      {soil.map(renderLayer)}
      {grass.map(renderLayer)}

      {/* Logo & Tagline */}
      <motion.div
        className="relative z-10 text-center pt-4 sm:pt-6 md:pt-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex flex-col items-center" variants={fadeScale}>
          <motion.div className="w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-xl mx-auto" variants={fadeScale}>
            <img
              src={process.env.PUBLIC_URL + "/images/Home/LogoLargeDrawn2.webp"}
              alt="Nomad Scribbles Hand-drawn Logo"
              className="w-full h-auto object-contain drop-shadow-lg"
            />
          </motion.div>
          <motion.div
            className="mt-4 sm:mt-5 text-lg sm:text-xl md:text-2xl font-handwriting drop-shadow-md text-[#eeda8d] max-w-2xl mx-auto text-center"
            variants={fadeScale}
          >
            <HandwritingTagline />
          </motion.div>
        </motion.div>
      </motion.div>
{/* Carousel */}
<motion.div className="relative mt-10 max-w-screen-lg mx-auto px-4 z-[9999]" variants={staggerContainer} initial="hidden" animate="visible">
  <button
    onClick={() => scroll("left")}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-40 p-2 rounded-full"
  >
    <img src={process.env.PUBLIC_URL + "/images/lftarrow.svg"} alt="Left Arrow" className="w-6 h-6"/>
  </button>
  <button
    onClick={() => scroll("right")}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-40 p-2 rounded-full"
  >
    <img src={process.env.PUBLIC_URL + "/images/rtarrow.svg"} alt="Right Arrow" className="w-6 h-6"/>
  </button>

  <div
    ref={carouselRef}
    className="flex overflow-x-auto overflow-y-hidden space-x-4 scrollbar-hide"
    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
  >
    {cards.map((card, idx) =>
      card.external ? (
        <a
          key={idx}
          href={card.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 w-[80vw] max-w-[16rem] aspect-[16/9]"
        >
          <motion.div
            className="relative shadow-lg group w-full h-full cursor-pointer"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: idx * 0.15 }}
          >
            <img
              src={process.env.PUBLIC_URL + card.img}
              alt={card.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </motion.div>
        </a>
      ) : (
        <Link
          key={idx}
          to={card.link}
          className="flex-shrink-0 w-[80vw] max-w-[16rem] aspect-[16/9]"
        >
          <motion.div
            className="relative shadow-lg group w-full h-full cursor-pointer"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: idx * 0.15 }}
          >
            <img
              src={process.env.PUBLIC_URL + card.img}
              alt={card.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </motion.div>
        </Link>
      )
    )}
  </div>
</motion.div>

<style>{`
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
`}</style>


    </div>
  );
};

export default TestDanishSky;
