import React from "react";
import products from "./artImages.json"; // your existing JSON file

export default function FeaturedProduct({ country }) {
  // Get first product matching the country/category
  const featureItem = products.find(p => p.category === country);

  if (!featureItem) return null;

  return (
    <div className="max-w-lg mx-auto my-8 p-4 bg-white rounded-lg shadow-lg text-center">
      <div className="overflow-hidden rounded-lg flex justify-center">
        <img
          src={featureItem.image}
          alt={featureItem.title}
          className="w-auto max-w-full max-h-[450px] h-auto object-contain transition-transform duration-200 hover:scale-105"
        />
      </div>
      <h2 className="mt-4 text-2xl font-semibold">{featureItem.title}</h2>
      <p className="text-gray-700 mt-2">{featureItem.description}</p>
      <a
        href={featureItem.gumroadLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Purchase
      </a>
    </div>
  );
}
