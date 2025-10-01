// FeaturedCarousel.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import products from "./artImages.json";

export default function FeaturedCarousel({ category }) {
  // Filter products for this category
  const featuredItems = products.filter(p => p.category === category);

  if (!featuredItems.length) return null;

  return (
    <div className="w-full max-w-xl mx-auto">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {featuredItems.map(item => (
          <SwiperSlide key={item.title}>
            <div className="flex flex-col items-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-auto max-h-[400px] object-contain rounded-lg shadow-lg"
              />
              <h2 className="mt-3 text-lg font-semibold text-white drop-shadow">
                {item.title}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
