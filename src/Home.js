// src/Home.js
import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "./components/SEO";
import { fadeScale, hoverScale, staggerContainer } from "./animations";
import HandwritingTagline from "./HandwritingTagline";
import { trackEvent } from "./utils/analytics";

// Parallax background layers
import { skyObjects } from "./Sky";
import { sunsObjects } from "./Suns";
import { waterObjects } from "./Water";
import { soilObjects } from "./Soil";
import { grassObjects } from "./Grass";

function Home() {
  const navigate = useNavigate();

  // Parallax tracking
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const originalCards = [
    { title: "Nomads Shop", link: "/nomadsshop", img: "/images/Home/ThumbnailNS.webp" },
    { title: "Nomads Gallery", link: "/nomads-gallery", img: "/images/Home/ThumbnailNG.webp" },
    { title: "Adventures", link: "/adventures", img: "/images/Home/ThumbnailA.webp" },
    { title: "Brazil", link: "/brazil", img: "/images/Home/Thumbnail.webp" },
  ];

  const [cards, setCards] = useState([]);
  const carouselRef = useRef(null);

  const [showMiniSP, setShowMiniSP] = useState(false);
  const [showMiniSantos, setShowMiniSantos] = useState(false);

  // ✅ responsive now
  const isMobile = viewportWidth <= 768;

  // Manual delay for Logo
  const [logoVisible, setLogoVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLogoVisible(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll + resize listeners (for parallax)
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };

    // ✅ passive scroll
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Carousel init
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

  const handleSPClick = () => {
    if (isMobile) setShowMiniSP((prev) => !prev);
    else navigate("/brazil/saopaulo");
  };

  const handleSantosClick = () => {
    setShowMiniSantos((prev) => {
      if (!prev) return true;
      navigate("/brazil/saopaulo/santos");
      return prev;
    });
  };

  // ---- Parallax Layer Renderer (responsive) ----
  const renderLayer = (layer, index) => {
    const isMobileBp = viewportWidth <= 640;
    const isTabletBp = viewportWidth > 640 && viewportWidth <= 1024;

    const pick = (mobileVal, tabletVal, desktopVal, fallbackVal) => {
      if (isMobileBp && mobileVal !== undefined) return mobileVal;
      if (isTabletBp && tabletVal !== undefined) return tabletVal;
      if (desktopVal !== undefined) return desktopVal;
      return fallbackVal;
    };

    const width = pick(layer.widthMobile, layer.widthTablet, layer.widthDesktop, layer.width || "100%");
    const speed = pick(layer.speedMobile, layer.speedTablet, layer.speedDesktop, layer.speed ?? 0.05);
    const xSpeed = pick(layer.xSpeedMobile, layer.xSpeedTablet, layer.xSpeedDesktop, layer.xSpeed ?? 0);

    const baseTopPercent = pick(
      layer.baseTopPercentMobile,
      layer.baseTopPercentTablet,
      layer.baseTopPercentDesktop,
      layer.baseTopPercent
    );

    const baseBottomPercent = pick(
      layer.baseBottomPercentMobile,
      layer.baseBottomPercentTablet,
      layer.baseBottomPercentDesktop,
      layer.baseBottomPercent
    );

    const baseLeftPercent = pick(
      layer.baseLeftPercentMobile,
      layer.baseLeftPercentTablet,
      layer.baseLeftPercentDesktop,
      layer.baseLeftPercent || 0
    );

    let parallaxY = 0;
    if (baseTopPercent !== undefined) {
      const basePx = viewportHeight * (baseTopPercent / 100);
      parallaxY = basePx - scrollY * speed * 20;
    } else if (baseBottomPercent !== undefined) {
      const distanceFromBottom = viewportHeight * (baseBottomPercent / 100);
      parallaxY = viewportHeight - distanceFromBottom - scrollY * speed * 20;
    }

    const layerStyle = {
      position: "absolute",
      width,
      height: layer.height || "auto",
      zIndex: layer.zIndex ?? 0,
      top: `${parallaxY}px`,
      left: `${baseLeftPercent}%`, // Use the calculated baseLeftPercent

      pointerEvents: "none",
      maxWidth: "none",
      willChange: "transform, top, left",
      opacity: layer.opacity ?? 1,
    };

    if (layer.centerHorizontally) {
      layerStyle.left = "50%";
      layerStyle.transform = "translateX(-50%)";

      if (xSpeed) {
        const parallaxX = scrollY * (xSpeed * 10);
        layerStyle.transform = `translateX(calc(-50% + ${parallaxX}px))`;
      }

      if (layer.sway) {
        layerStyle.animation = `sway ${layer.swayDuration || 2}s ease-in-out infinite alternate`;
      }
    } else {
      const parallaxX = (baseLeftPercent / 100) * viewportWidth + scrollY * (xSpeed * 20);
      layerStyle.left = `${parallaxX}px`;
    }

    return (
      <svg
        key={layer.id || index}
        viewBox={layer.viewBox || "0 0 800 400"}
        preserveAspectRatio={layer.preserveAspectRatio || "xMidYMid meet"}
        style={layerStyle}
      >
        {layer.path && (
          <path d={layer.path} fill={layer.fill} stroke={layer.stroke} strokeWidth={layer.strokeWidth} />
        )}
      </svg>
    );
  };

  const sky = skyObjects.map((layer) => ({ ...layer, zIndex: layer.zIndex ?? 1 }));
  const suns = sunsObjects.map((layer) => ({ ...layer, zIndex: layer.zIndex ?? 10 }));
  const water = waterObjects.map((layer) => ({ ...layer, zIndex: layer.zIndex ?? 15 }));
  const soil = soilObjects.map((layer) => ({ ...layer, zIndex: layer.zIndex ?? 20 }));
  const grass = grassObjects.map((layer) => ({ ...layer, zIndex: layer.zIndex ?? 25 }));

  return (
    <div className="relative w-screen min-h-[250vh] overflow-hidden bg-[#342508ff]">
      {/* Parallax background */}
      {sky.map(renderLayer)}
      {suns.map(renderLayer)}
      {water.map(renderLayer)}
      {soil.map(renderLayer)}
      {grass.map(renderLayer)}

      {/* Existing SEO + content */}
      <SEO
        title="Nomad Scribbles | Travel Stories Across the World"
        description="Join Nomad Scribbles on a journey through cities, culture, travel tips, and inspiring adventures."
        image="/images/Home/Background.webp"
        slug=""
      />

      <h1 className="sr-only">Nomad Scribbles | Travel Stories Across the World</h1>

      {/* Tagline Section (Top) */}
      <motion.div
        className="relative z-20 text-center pt-20 sm:pt-24"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="text-lg sm:text-xl md:text-2xl font-handwriting drop-shadow-md text-[#eeda8d] w-3/4 sm:w-full max-w-2xl mx-auto text-center opacity-90">
          <HandwritingTagline duration={4} />
        </div>
      </motion.div>

      {/* Logo (Delayed & Lower, Size Doubled, Raised) */}
      <motion.div
        className="relative z-10 text-center pt-[6vh]"
        initial="hidden"
        animate={logoVisible ? "visible" : "hidden"}
        variants={staggerContainer}
        style={{ opacity: logoVisible ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
      >
        <motion.div className="flex flex-col items-center" variants={fadeScale}>
          <motion.div className="w-full sm:w-4/5 md:w-3/4 lg:w-3/4 max-w-4xl mx-auto" variants={fadeScale}>
            <img
              src={process.env.PUBLIC_URL + "/images/Home/LogoNew.png"}
              alt="Nomad Scribbles Hand-drawn Logo"
              className="w-full h-auto object-contain drop-shadow-lg"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Sao Paulo Feature */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        variants={staggerContainer}
        className="w-full mt-[85vh] px-2 sm:px-4 relative z-[9999]"
      >
        <motion.div
          className="relative block w-full max-w-[80%] sm:max-w-[70%] md:max-w-[60%] mx-auto aspect-[16/9] cursor-pointer overflow-hidden group transition-all duration-[2000ms]"
          onMouseEnter={() => {
            if (!isMobile) setShowMiniSP(true);
            trackEvent("hover_feature", "Home Page", "São Paulo Feature");
          }}
          onMouseLeave={() => !isMobile && setShowMiniSP(false)}
          onClick={() => {
            handleSPClick();
            trackEvent("click_feature", "Home Page", "São Paulo Feature");
          }}
          variants={fadeScale}
        >
          <motion.img
            src={process.env.PUBLIC_URL + "/images/Home/Features/SaoPaulo.webp"}
            alt="São Paulo city travel feature"
            className="w-full h-full object-cover transition-transform duration-2000 group-hover:scale-105"
            variants={hoverScale}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-0 transition-opacity duration-[2000ms]"></div>

          <motion.img
            src={process.env.PUBLIC_URL + "/images/Home/SaoPauloScript1.webp"}
            alt="São Paulo Script Detail"
            className={`absolute top-2 sm:top-4 left-2 sm:left-4 w-48 sm:w-72 md:w-88 z-20 transition-opacity duration-[2000ms] ${!showMiniSP ? "opacity-100" : "opacity-0"
              }`}
            variants={fadeScale}
          />

          {showMiniSP && (
            <motion.div
              className={`absolute bottom-16 inset-x-0 flex justify-center items-end space-x-2 sm:space-x-3 z-20 transition-all duration-[2000ms] ease-in-out ${showMiniSP ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              variants={fadeScale}
            >
              <img
                src={process.env.PUBLIC_URL + "/images/SaoPauloLanding/pizza.webp"}
                alt="São Paulo Pizza"
                className="w-24 sm:w-30 md:w-44 lg:w-44 h-auto rounded-sm shadow-lg transition-opacity duration-[4000ms]"
              />
              <img
                src={process.env.PUBLIC_URL + "/images/SaoPauloLanding/street.webp"}
                alt="São Paulo Street"
                className="w-24 sm:w-30 md:w-44 lg:w-44 h-auto rounded-sm shadow-lg transition-opacity duration-[4000ms]"
              />
              <img
                src={process.env.PUBLIC_URL + "/images/SaoPauloLanding/caparinha.webp"}
                alt="Caipirinha"
                className="w-24 sm:w-30 md:w-44 lg:w-44 h-auto rounded-sm shadow-lg transition-opacity duration-[4000ms]"
              />
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Santos Feature */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        variants={staggerContainer}
        className="w-full mt-32 px-2 sm:px-4 relative z-[9999]"
      >
        <motion.div
          className="relative block w-full max-w-[80%] sm:max-w-[70%] md:max-w-[60%] mx-auto aspect-[16/9] cursor-pointer overflow-hidden group transition-all duration-[2000ms]"
          onMouseEnter={() => {
            setShowMiniSantos(true);
            trackEvent("hover_feature", "Home Page", "Santos Feature");
          }}
          onMouseLeave={() => setShowMiniSantos(false)}
          onClick={() => {
            handleSantosClick();
            trackEvent("click_feature", "Home Page", "Santos Feature");
          }}
          variants={fadeScale}
        >
          <motion.img
            src={process.env.PUBLIC_URL + "/images/Home/Features/Santos.webp"}
            alt="Santos city travel feature"
            className="w-full h-full object-cover transition-transform duration-2000 group-hover:scale-105"
            variants={hoverScale}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-0 transition-opacity duration-[2000ms]"></div>

          <motion.img
            src={process.env.PUBLIC_URL + "/images/Home/SantosScript1.webp"}
            alt="Santos Script Detail"
            className={`absolute top-2 sm:top-4 left-2 sm:left-4 w-24 sm:w-36 md:w-44 z-20 transition-opacity duration-[2000ms] ${!showMiniSantos ? "opacity-100" : "opacity-0"
              }`}
            variants={fadeScale}
          />
          <motion.img
            src={process.env.PUBLIC_URL + "/images/Home/SantosScript2.webp"}
            alt="Santos Script Hover Detail"
            className={`absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-24 sm:w-36 md:w-44 z-20 transition-opacity duration-[2000ms] ${showMiniSantos ? "opacity-100" : "opacity-0"
              }`}
            variants={fadeScale}
          />

          {showMiniSantos && (
            <>
              <motion.img
                src={process.env.PUBLIC_URL + "/images/Home/Features/SantosMini1.webp"}
                alt=""
                className="absolute top-2 left-2 w-36 sm:w-48 md:w-64 lg:w-72 z-20 transition-opacity duration-[2000ms]"
                variants={fadeScale}
              />
              <motion.img
                src={process.env.PUBLIC_URL + "/images/Home/Features/SantosMini2.webp"}
                alt=""
                className="absolute top-1/3 right-4 w-36 sm:w-48 md:w-64 lg:w-72 z-20 transition-opacity duration-[2000ms]"
                variants={fadeScale}
              />
              <motion.img
                src={process.env.PUBLIC_URL + "/images/Home/Features/SantosMini3.webp"}
                alt=""
                className="absolute bottom-4 left-1/3 w-36 sm:w-48 md:w-64 lg:w-72 z-20 transition-opacity duration-[2000ms]"
                variants={fadeScale}
              />
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Bottom Carousel */}
      <div className="w-full max-w-screen-lg mx-auto py-8 relative px-2 sm:px-4 z-[9999]">
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

        <div ref={carouselRef} className="flex overflow-x-auto overflow-y-hidden space-x-4 scrollbar-hide">
          {cards.map((card, idx) =>
            card.external ? (
              <a
                key={idx}
                href={card.link}
                target="_self"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[80vw] max-w-[16rem] aspect-[16/9]"
              >
                <motion.div
                  className="relative shadow-lg group w-full h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeInOut", delay: idx * 0.15 }}
                >
                  <img
                    src={process.env.PUBLIC_URL + card.img}
                    alt={card.title + " - travel highlights"}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </motion.div>
              </a>
            ) : (
              <Link key={idx} to={card.link} className="flex-shrink-0 w-[80vw] max-w-[16rem] aspect-[16/9]">
                <motion.div
                  className="relative shadow-lg group w-full h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeInOut", delay: idx * 0.15 }}
                >
                  <img
                    src={process.env.PUBLIC_URL + card.img}
                    alt={card.title + " - travel highlights"}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </motion.div>
              </Link>
            )
          )}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default Home;
