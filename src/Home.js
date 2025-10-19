import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "./components/SEO";
import { fadeScale, hoverScale, staggerContainer } from "./animations";

function Home() {
  const navigate = useNavigate();

  const originalCards = [
    { title: "Nomads Shop", link: "/nomads-shop", img: "/images/Home/ThumbnailNS.webp" },
    { title: "Nomads Gallery", link: "/nomads-gallery", img: "/images/Home/ThumbnailNG.webp" },
    { title: "Adventures", link: "/adventures", img: "/images/Home/ThumbnailA.webp" },
    { title: "Brazil", link: "/brazil", img: "/images/Home/Thumbnail.webp" },
  ];

  const [cards, setCards] = useState([]);
  const carouselRef = useRef(null);
  const [showMiniSP, setShowMiniSP] = useState(false);
  const [showMiniSantos, setShowMiniSantos] = useState(false);

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
    if (!showMiniSP) setShowMiniSP(true);
    else navigate("/brazil/saopaulo");
  };

  const handleSantosClick = () => {
    if (!showMiniSantos) setShowMiniSantos(true);
    else navigate("/brazil/saopaulo/santos");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <SEO
        title="Nomad Scribbles | Travel Stories Across Brazil & Beyond"
        description="Join Nomad Scribbles on a journey through Brazil and beyond — discover cities, culture, travel tips, and inspiring adventures."
        image="/images/Home/Background.webp"
        slug=""
      />

      <h1 className="sr-only">Nomad Scribbles | Travel Stories Across Brazil & Beyond</h1>

      {/* Background */}
      <img
        src={process.env.PUBLIC_URL + "/images/Home/Background.jpg"}
        alt="Beautiful travel background of Brazil"
        className="fixed inset-0 w-full h-full object-cover -z-10"
      />

      {/* Logo + Tagline */}
      <motion.div
        className="relative w-full text-center pt-2 sm:pt-3 md:pt-4"
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
          <motion.img
            src={process.env.PUBLIC_URL + "/images/Home/HomeTag.webp"}
            alt="Nomad Scribbles Tagline: Travel Stories Across Brazil & Beyond"
            className="w-2/3 sm:w-1/2 md:w-2/5 lg:w-1/3 max-w-full h-auto drop-shadow-md mt-4 sm:mt-5"
            variants={fadeScale}
          />
        </motion.div>
      </motion.div>

      {/* São Paulo Feature */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="w-full mt-4 px-2 sm:px-4 relative"
      >
        <motion.div
          className="relative block w-full max-w-[80%] sm:max-w-[70%] md:max-w-[60%] mx-auto aspect-[16/9] cursor-pointer overflow-hidden group transition-all duration-[2000ms]"
          onMouseEnter={() => setShowMiniSP(true)}
          onMouseLeave={() => setShowMiniSP(false)}
          onClick={handleSPClick}
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
            className={`absolute top-2 sm:top-4 left-2 sm:left-4 w-48 sm:w-72 md:w-88 z-20 transition-opacity duration-[2000ms] ${!showMiniSP ? 'opacity-100' : 'opacity-0'}`}
            variants={fadeScale}
          />
          <motion.img
            src={process.env.PUBLIC_URL + "/images/Home/SaoPauloScript2.webp"}
            alt="São Paulo Script Hover Detail"
            className={`absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-48 sm:w-72 md:w-88 z-20 transition-opacity duration-[2000ms] ${showMiniSP ? 'opacity-100' : 'opacity-0'}`}
            variants={fadeScale}
          />

          <motion.div
            className={`absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-row items-end justify-center space-x-3 z-20 transition-all duration-[2000ms] ease-in-out ${showMiniSP ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            variants={fadeScale}
          >
            <img
              src={process.env.PUBLIC_URL + "/images/SaoPauloLanding/pizza.webp"}
              alt="São Paulo Pizza"
              className="w-36 sm:w-48 md:w-60 lg:w-60 h-auto rounded-sm shadow-lg transition-opacity duration-[2000ms]"
            />
            <img
              src={process.env.PUBLIC_URL + "/images/SaoPauloLanding/street.webp"}
              alt="São Paulo Street"
              className="w-36 sm:w-48 md:w-60 lg:w-60 h-auto rounded-sm shadow-lg transition-opacity duration-[2000ms]"
            />
            <img
              src={process.env.PUBLIC_URL + "/images/SaoPauloLanding/caparinha.webp"}
              alt="Caipirinha"
              className="w-36 sm:w-48 md:w-60 lg:w-60 h-auto rounded-sm shadow-lg transition-opacity duration-[2000ms]"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Santos Feature */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="w-full mt-4 px-2 sm:px-4 relative"
      >
        <motion.div
          className="relative block w-full max-w-[80%] sm:max-w-[70%] md:max-w-[60%] mx-auto aspect-[16/9] cursor-pointer overflow-hidden group transition-all duration-[2000ms]"
          onMouseEnter={() => setShowMiniSantos(true)}
          onMouseLeave={() => setShowMiniSantos(false)}
          onClick={handleSantosClick}
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
            className={`absolute top-2 sm:top-4 left-2 sm:left-4 w-24 sm:w-36 md:w-44 z-20 transition-opacity duration-[2000ms] ${!showMiniSantos ? 'opacity-100' : 'opacity-0'}`}
            variants={fadeScale}
          />
          <motion.img
            src={process.env.PUBLIC_URL + "/images/Home/SantosScript2.webp"}
            alt="Santos Script Hover Detail"
            className={`absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-24 sm:w-36 md:w-44 z-20 transition-opacity duration-[2000ms] ${showMiniSantos ? 'opacity-100' : 'opacity-0'}`}
            variants={fadeScale}
          />

          {showMiniSantos && (
            <>
              <motion.img src={process.env.PUBLIC_URL + "/images/Home/Features/SantosMini1.webp"} alt=""
                className="absolute top-2 left-2 w-36 sm:w-48 md:w-64 lg:w-72 z-20 transition-opacity duration-[2000ms]"
                variants={fadeScale}
              />
              <motion.img src={process.env.PUBLIC_URL + "/images/Home/Features/SantosMini2.webp"} alt=""
                className="absolute top-1/3 right-4 w-36 sm:w-48 md:w-64 lg:w-72 z-20 transition-opacity duration-[2000ms]"
                variants={fadeScale}
              />
              <motion.img src={process.env.PUBLIC_URL + "/images/Home/Features/SantosMini3.webp"} alt=""
                className="absolute bottom-4 left-1/3 w-36 sm:w-48 md:w-64 lg:w-72 z-20 transition-opacity duration-[2000ms]"
                variants={fadeScale}
              />
            </>
          )}
        </motion.div>
      </motion.div>

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

  <div
    ref={carouselRef}
    className="flex overflow-x-auto overflow-y-hidden space-x-4 scrollbar-hide"
  >
    {cards.map((card, idx) => (
      <Link key={idx} to={card.link} className="flex-shrink-0 w-[80vw] max-w-[16rem] aspect-[16/9]">
        <motion.div
          className="relative shadow-lg group w-full h-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
    ))}
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
