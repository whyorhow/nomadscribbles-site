// src/Home.js
import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// UPDATED IMPORTS
import SEO from "../components/SEO"; // Moved up one level
import { fadeScale, hoverScale, staggerContainer } from "../utils/animations"; // Moved up and into utils
import HandwritingTagline from "../components/HandwritingTagline";
import { trackEvent } from "../utils/analytics";

// Swiper for simpler, smoother carousel
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Parallax background layers
import { skyObjects } from "../components/Sky";
import { sunsObjects } from "../components/Suns";
import { waterObjects } from "../components/Water";
import { soilObjects } from "../components/Soil";
import { grassObjects } from "../components/Grass";

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


  const [cards, setCards] = useState(originalCards); // No need to duplicate for Swiper
  // const carouselRef = useRef(null); // Removed manual carousel ref

  const [showMiniSP, setShowMiniSP] = useState(false);
  const [showMiniSantos, setShowMiniSantos] = useState(false);

  const firstFeatureRef = useRef(null); // For autoscroll

  // ✅ responsive now
  const isMobile = viewportWidth <= 768;

  // Manual delay for Logo
  const [logoVisible, setLogoVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLogoVisible(true), 1000);
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

  // Ensure page starts at top on refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Autoscroll Feature
  useEffect(() => {
    let animationFrameId;
    let timeoutId;
    let isStopped = false;

    const stopScroll = () => {
      isStopped = true;
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };

    // Listen for user interaction to stop autoscroll
    window.addEventListener("wheel", stopScroll);
    window.addEventListener("touchmove", stopScroll);
    window.addEventListener("keydown", stopScroll);

    const animateScroll = () => {
      if (isStopped) return;

      const target = firstFeatureRef.current;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if the element is effectively fully on screen (centered or fully visible)
      // If the bottom is within the viewport and top is somewhat visible
      // We aim to have it roughly centered or fully in view.
      // Let's stop when the element's center is near the viewport center, or it's fully contained.
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;

      // Stop when the first feature's top edge reaches the middle of the viewport (above mid-screen)
      if (rect.top <= viewportHeight / 2) {
        return;
      }

      // If we are close to bottom of page
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) return;

      // Responsive Speed: Faster on mobile and a bit quicker overall
      const speed = window.innerWidth <= 768 ? 3 : 2;
      window.scrollBy(0, speed);


      animationFrameId = requestAnimationFrame(animateScroll);
    };

    // Delay start slightly to allow load
    timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animateScroll);
    }, 1500); // Start after 1.5s

    return () => {
      stopScroll();
      window.removeEventListener("wheel", stopScroll);
      window.removeEventListener("touchmove", stopScroll);
      window.removeEventListener("keydown", stopScroll);
    };
  }, []);

  const handleSPClick = () => {
    setShowMiniSP((prev) => {
      if (!prev && isMobile) return true;
      navigate("/brazil/saopaulo");
      return prev;
    });
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

      {/* Sticky Hero Section (Tagline + Logo) - Follows scroll, stops before features */}
      <div className="absolute top-0 left-0 w-full h-[200vh] z-30 pointer-events-none flex flex-col items-center justify-start">
        <div className="sticky top-[15vh] w-full flex flex-col items-center">

          {/* Tagline */}
          <motion.div
            className="text-center mb-2 w-full flex justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="text-lg sm:text-xl md:text-2xl font-handwriting drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)] text-[hsl(49,70%,66%)] w-[90%] max-w-[1050px] mx-auto text-center opacity-90">
              <HandwritingTagline duration={2.5} strokeColor="hsl(49, 70%, 66%)" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Logo */}
          <motion.div
            className="text-center w-full flex justify-center mt-[130px]"
            initial="hidden"
            animate={logoVisible ? "visible" : "hidden"}
            variants={staggerContainer}
            style={{ opacity: logoVisible ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
          >
            <motion.div className="w-full sm:w-4/5 md:w-3/4 lg:w-3/4 max-w-4xl mx-auto" variants={fadeScale}>
              <img
                src={process.env.PUBLIC_URL + "/images/Home/LogoNew.png"}
                alt="Nomad Scribbles Hand-drawn Logo"
                className="w-full h-auto object-contain drop-shadow-lg"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Sao Paulo Feature */}
      <motion.div
        ref={firstFeatureRef} // Targeted for autoscroll
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        variants={staggerContainer}
        className="w-full mt-[120vh] px-2 sm:px-4 relative z-40"
      >
        <motion.div
          className="relative block w-full max-w-[80%] sm:max-w-[70%] md:max-w-[60%] mx-auto aspect-[16/9] cursor-pointer overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20 group transition-all duration-[2000ms]"
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
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] group-hover:bg-black/10 group-hover:backdrop-blur-none transition-all duration-[2000ms]"></div>

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
        className="w-full mt-48 px-2 sm:px-4 relative z-40"
      >
        <motion.div
          className="relative block w-full max-w-[80%] sm:max-w-[70%] md:max-w-[60%] mx-auto aspect-[16/9] cursor-pointer overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20 group transition-all duration-[2000ms]"
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
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] group-hover:bg-black/10 group-hover:backdrop-blur-none transition-all duration-[2000ms]"></div>

          <motion.img
            src={process.env.PUBLIC_URL + "/images/Home/SantosScript1.png"}
            alt="Santos Script Detail"
            className={`absolute top-2 sm:top-4 left-2 sm:left-4 w-48 sm:w-72 md:w-96 z-20 transition-opacity duration-[2000ms] ${!showMiniSantos ? "opacity-100" : "opacity-0"
              }`}
            variants={fadeScale}
          />
          <motion.img
            src={process.env.PUBLIC_URL + "/images/Home/SantosScript2.png"}
            alt="Santos Script Hover Detail"
            className={`absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-48 sm:w-72 md:w-96 z-20 transition-opacity duration-[2000ms] ${showMiniSantos ? "opacity-100" : "opacity-0"
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

      {/* Bottom Carousel - Swiper Implementation */}
      <div className="w-full max-w-screen-xl mx-auto py-12 mt-48 relative px-2 sm:px-4 z-40">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={true}
          navigation
          autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2.2,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 3.2,
              centeredSlides: false,
            },
          }}
          className="w-full h-full !pb-8"
        >
          {cards.map((card, idx) => (
            <SwiperSlide key={idx} className="!h-auto flex items-stretch">
              {card.external ? (
                <a
                  href={card.link}
                  className="block w-full"
                >
                  <div className="relative shadow-xl hover:shadow-2xl transition-all duration-300 w-full h-full rounded-2xl overflow-hidden aspect-[16/9] group">
                    <img
                      src={process.env.PUBLIC_URL + card.img}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white font-semibold text-lg drop-shadow-md">{card.title}</p>
                    </div>
                  </div>
                </a>
              ) : (
                <Link to={card.link} className="block w-full">
                  <div className="relative shadow-xl hover:shadow-2xl transition-all duration-300 w-full h-full rounded-2xl overflow-hidden aspect-[16/9] group">
                    <img
                      src={process.env.PUBLIC_URL + card.img}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white font-semibold text-lg drop-shadow-md">{card.title}</p>
                    </div>
                  </div>
                </Link>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        /* Custom swiper navigation buttons if needed, or rely on default */
        .swiper-button-next, .swiper-button-prev {
          color: rgba(255,255,255, 0.8);
          background-color: rgba(0,0,0, 0.3);
          padding: 24px;
          border-radius: 50%;
          width: 20px;
          height: 20px;
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default Home;
