// src/Home.js
import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion";
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

const MotionLink = motion.create(Link);

// ---- Parallax Layer Renderer (responsive) ----
// Moved outside Home to prevent re-creation on every render
const ParallaxBackground = React.memo(({ scrollY, viewportHeight, viewportWidth, shouldReduceMotion }) => {
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

    // Use useTransform instead of calculating in render loop
    // Note: scrollY is now a MotionValue
    const parallaxY = useTransform(scrollY, (y) => {
      let val = 0;
      if (baseTopPercent !== undefined) {
        const basePx = viewportHeight * (baseTopPercent / 100);
        val = basePx - y * speed * 20;
      } else if (baseBottomPercent !== undefined) {
        const distanceFromBottom = viewportHeight * (baseBottomPercent / 100);
        val = viewportHeight - distanceFromBottom - y * speed * 20;
      }
      return val;
    });

    const parallaxX = useTransform(scrollY, (y) => {
      if (layer.centerHorizontally) {
        if (xSpeed) {
          const xVal = y * (xSpeed * 10);
          return `translateX(calc(-50% + ${xVal}px))`;
        }
        return "translateX(-50%)";
      } else {
        return (baseLeftPercent / 100) * viewportWidth + y * (xSpeed * 20);
      }
    });

    const layerStyle = {
      position: "absolute",
      width,
      height: layer.height || "auto",
      zIndex: layer.zIndex ?? 0,
      top: parallaxY, // Bind MotionValue
      // For left:
      // If centered, left is 50% and transform handles X.
      // If not centered, left is parallaxX (as number/string).
      left: layer.centerHorizontally ? "50%" : parallaxX,
      transform: layer.centerHorizontally ? parallaxX : undefined, // parallaxX is transform string here

      pointerEvents: "none",
      maxWidth: "none",
      willChange: "transform, top, left",
      opacity: layer.opacity ?? 1,
    };

    if (layer.sway && !shouldReduceMotion) {
      layerStyle.animation = `sway ${layer.swayDuration || 2}s ease-in-out infinite alternate`;
    }

    return (
      <motion.svg
        key={layer.id || index}
        viewBox={layer.viewBox || "0 0 800 400"}
        preserveAspectRatio={layer.preserveAspectRatio || "xMidYMid meet"}
        style={layerStyle}
      >
        {layer.path && (
          <path d={layer.path} fill={layer.fill} stroke={layer.stroke} strokeWidth={layer.strokeWidth} />
        )}
      </motion.svg>
    );
  };

  const sky = skyObjects.map((layer) => ({ ...layer, zIndex: layer.zIndex ?? 1 }));
  const suns = sunsObjects.map((layer) => ({ ...layer, zIndex: layer.zIndex ?? 10 }));
  const water = waterObjects.map((layer) => ({ ...layer, zIndex: layer.zIndex ?? 15 }));
  const soil = soilObjects.map((layer) => ({ ...layer, zIndex: layer.zIndex ?? 20 }));
  const grass = grassObjects.map((layer) => ({ ...layer, zIndex: layer.zIndex ?? 25 }));

  return (
    <>
      {sky.map(renderLayer)}
      {suns.map(renderLayer)}
      {water.map(renderLayer)}
      {soil.map(renderLayer)}
      {grass.map(renderLayer)}
    </>
  );
});

function Home() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  // Parallax tracking
  // Removed scrollY state to avoid re-renders
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // Framer Motion useScroll for high-performance logo animation and parallax
  const { scrollY } = useScroll(); // scrollY is a MotionValue
  const logoOpacity = useTransform(scrollY, [100, 300], [0, 1]);

  const [logoReady, setLogoReady] = useState(false);

  const originalCards = [
    { title: "Nomads Shop", link: "/nomadsshop", img: "/images/Home/ThumbnailNS.webp", alt: "Nomads Shop thumbnail showing travel merchandise" },
    { title: "Nomads Gallery", link: "/nomads-gallery", img: "/images/Home/ThumbnailNG.webp", alt: "Nomads Gallery thumbnail displaying artistic travel photos" },
    { title: "Adventures", link: "/adventures", img: "/images/Home/ThumbnailA.webp", alt: "Adventures thumbnail featuring a scenic landscape" },
    { title: "Brazil", link: "/brazil", img: "/images/Home/Thumbnail.webp", alt: "Brazil thumbnail showing a vibrant Brazilian street scene" },
  ];


  const [cards, setCards] = useState(originalCards); // No need to duplicate for Swiper
  // const carouselRef = useRef(null); // Removed manual carousel ref

  const [showMiniSP, setShowMiniSP] = useState(false);
  const [showMiniSantos, setShowMiniSantos] = useState(false);

  const firstFeatureRef = useRef(null); // For autoscroll

  // ✅ responsive now
  const isMobile = viewportWidth <= 768;

  // Manual delay for Logo
  useEffect(() => {
    const timer = setTimeout(() => setLogoReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Resize listeners only
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
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
      if (shouldReduceMotion) return;
      if (isStopped) return;

      const target = firstFeatureRef.current;
      if (!target) {
        animationFrameId = requestAnimationFrame(animateScroll);
        return;
      }

      const rect = target.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Stop when the first feature's top edge reaches the middle of the viewport
      if (rect.top <= viewportHeight / 2) {
        return;
      }

      // If we are close to bottom of page
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) return;

      // Consistent scrolling speed
      const speed = window.innerWidth <= 768 ? 2.5 : 1.5;
      window.scrollBy({
        top: speed,
        left: 0,
        behavior: 'auto' // Use auto for precise frame-by-frame control
      });

      animationFrameId = requestAnimationFrame(animateScroll);
    };

    // Delay start slightly to allow load
    timeoutId = setTimeout(() => {
      if (!shouldReduceMotion) {
        animationFrameId = requestAnimationFrame(animateScroll);
      }
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

  return (
    <div className="relative w-screen min-h-[250vh] overflow-hidden bg-[#342508ff]">
      {/* Parallax background - separated to keep Home component static during scroll */}
      <ParallaxBackground
        scrollY={scrollY}
        viewportHeight={viewportHeight}
        viewportWidth={viewportWidth}
        shouldReduceMotion={shouldReduceMotion}
      />

      {/* Existing SEO + content */}
      <SEO
        title="Nomad Scribbles | Travel Stories Across the World"
        description="Join Nomad Scribbles on a journey through cities, culture, travel tips, and inspiring adventures."
        image="/images/Home/Background.webp"
        slug=""
      />

      <h1 className="sr-only">Nomad Scribbles | Travel Stories Across the World</h1>

      {/* Sticky Hero Section - Individual Sticky Layers */}
      <section aria-label="Hero" className="absolute top-0 left-0 w-full h-[200vh] z-30 pointer-events-none flex flex-col items-center">

        {/* Tagline Sticky Layer */}
        <div className="sticky top-[10vh] w-full flex flex-col items-center">
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
        </div>

        {/* Logo Sticky Layer - Positioned lower (75vh), hidden at scroll 0 */}
        <div className="sticky top-[75vh] w-full flex flex-col items-center">
          <motion.div
            className="text-center w-full flex justify-center"
            style={{
              opacity: logoOpacity,
              display: logoReady ? "flex" : "none" // Only show after initial delay
            }}
          >
            <motion.div
              className="w-full sm:w-4/5 md:w-3/4 lg:w-3/4 max-w-4xl mx-auto"
              variants={fadeScale}
              initial="hidden"
              animate={logoReady ? "visible" : "hidden"}
            >
              <img
                src={process.env.PUBLIC_URL + "/images/Home/LogoNew.png"}
                alt="Nomad Scribbles Hand-drawn Logo"
                className="w-full h-auto object-contain drop-shadow-lg"
              />
            </motion.div>
          </motion.div>
        </div>

      </section>

      <section aria-label="São Paulo Feature">
      <motion.div
        ref={firstFeatureRef} // Targeted for autoscroll
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        variants={staggerContainer}
        className="w-full mt-[120vh] px-2 sm:px-4 relative z-40"
      >
        <MotionLink
          to="/brazil/saopaulo"
          className="relative block w-full max-w-full sm:max-w-[70%] md:max-w-[60%] mx-auto aspect-[16/9] cursor-pointer overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20 group transition-all duration-[2000ms]"
          onMouseEnter={() => {
            if (!isMobile) setShowMiniSP(true);
            trackEvent("hover_feature", "Home Page", "São Paulo Feature");
          }}
          onMouseLeave={() => !isMobile && setShowMiniSP(false)}
          onClick={(e) => {
             if (isMobile && !showMiniSP) {
               e.preventDefault();
               setShowMiniSP(true);
               return;
             }
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
        </MotionLink>
      </motion.div>
      </section>

      {/* Santos Feature */}
      <section aria-label="Santos Feature">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        variants={staggerContainer}
        className="w-full mt-48 px-2 sm:px-4 relative z-40"
      >
        <MotionLink
          to="/brazil/saopaulo/santos"
          className="relative block w-full max-w-full sm:max-w-[70%] md:max-w-[60%] mx-auto aspect-[16/9] cursor-pointer overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20 group transition-all duration-[2000ms]"
          onMouseEnter={() => {
            setShowMiniSantos(true);
            trackEvent("hover_feature", "Home Page", "Santos Feature");
          }}
          onMouseLeave={() => setShowMiniSantos(false)}
          onClick={(e) => {
             if (isMobile && !showMiniSantos) {
               e.preventDefault();
               setShowMiniSantos(true);
               return;
             }
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
        </MotionLink>
      </motion.div>
      </section>

      {/* Bottom Carousel - Swiper Implementation */}
      <section aria-label="Featured Stories" className="w-full max-w-screen-xl mx-auto py-12 mt-48 relative px-2 sm:px-4 z-40">
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
                      alt={card.alt || card.title}
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
                      alt={card.alt || card.title}
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
      </section>

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
