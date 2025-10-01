import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import products from "./artImages.json";
import LeftArrow from "./assets/images/lftarrow.svg";
import RightArrow from "./assets/images/rtarrow.svg";

export default function NomadsShopBrazil() {
  const flagRef = useRef(null);
  const swiperRef = useRef(null);

const cities = [
  { name: "Rio de Janeiro", path: "/nomads-shop/brazil/rio" },
  { name: "São Paulo", path: "/nomads-shop/brazil/saopaulo" },
  { name: "Salvador", path: "/nomads-shop/brazil/salvador" },
  { name: "Foz do Iguaçu", path: "/nomads-shop/brazil/foz" },
  { name: "The Pantanal", path: "/nomads-shop/brazil/pantanal" },
  { name: "Bonito", path: "/nomads-shop/brazil/bonito" },
  { name: "Manaus", path: "/nomads-shop/brazil/manaus" },
];

  useEffect(() => {
    const handleScroll = () => {
      if (flagRef.current) {
        const offset = Math.min(window.scrollY * 0.2, 100);
        flagRef.current.style.transform = `translateY(${offset}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featuredItems = products.filter((p) => p.category === "City Life");

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

      {/* Flag + Carousel */}
      <div className="relative flex justify-center mb-8 sm:mb-10 md:mb-12">
        <img
          ref={flagRef}
          src="/images/Adventures/BrazilFlag.png"
          alt="Brazil flag"
          className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] h-auto rounded-lg shadow-lg"
        />

        <div className="absolute inset-0 flex justify-center items-center w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] mx-auto">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
          >
            {featuredItems.map((item) => (
              <SwiperSlide key={item.title}>
                <div className="flex flex-col items-center bg-transparent rounded-lg p-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto max-h-80 object-contain rounded-lg"
                  />
                  <h2 className="mt-2 text-xl font-semibold text-white">
                    {item.title}
                  </h2>
                  <a
                    href={item.gumroadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                  >
                    Purchase
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Left Arrow */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute top-1/2 left-[-2.5rem] transform -translate-y-1/2 z-10"
          >
            <img
              src={LeftArrow}
              alt="Previous"
              className="w-8 h-12 transition-transform duration-200 ease-in-out hover:scale-125 hover:brightness-150"
            />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute top-1/2 right-[-2.5rem] transform -translate-y-1/2 z-10"
          >
            <img
              src={RightArrow}
              alt="Next"
              className="w-8 h-12 transition-transform duration-200 ease-in-out hover:scale-125 hover:brightness-150"
            />
          </button>
        </div>
      </div>

      {/* Cities grid */}
      <div className="max-w-4xl mx-auto mb-8 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {cities.map((city) => (
            <Link
              key={city.name}
              to={city.path}
              className="flex justify-center items-center px-4 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg shadow-md border border-white/20 text-center transform transition duration-200 hover:bg-white/20 hover:scale-105 hover:shadow-lg"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
