import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import SEO from "../components/SEO";
import Logo from "../components/Logo";
import Lightbox from "../components/Lightbox";
import artImages from "../assets/artImages.json";
import { fadeScale, staggerContainer } from "../utils/animations";

function Pantanal() {
    const pantanalImages = artImages.filter(img => img.category === "Pantanal");

    const galleryTexts = [
        "The Pantanal is the world's largest tropical wetland area, a sprawling wilderness that comes alive with the rhythm of the rains. Here, the boundary between land and water blurs, creating a sanctuary for an incredible diversity of life.",
        "Known as the realm of the jaguar, the Pantanal offers one of the best chances to spot these elusive big cats in the wild. As they patrol the riverbanks, the jungle holds its breath, a testament to the raw power of nature.",
        "The skies above the wetlands are a canvas of motion and color. Flocks of vibrant macaws, toucans, and herons fill the air, their calls echoing across the marshes. It is a birdwatcher's paradise, where every gaze upward reveals a new wonder.",
        "Beneath the water's surface, life is just as abundant. Caimans bask on sun-drenched banks, while giant otters frolic in the currents. The intricate waterways are the veins of this ecosystem, sustaining a complex web of life.",
        "A marsh deer navigates the tall grass, silent and graceful. In the Pantanal, adaptation is key. Species here have evolved to thrive in a landscape that changes dramatically with the seasons, from flooded plains to dry grasslands.",
        "The Hyacinth Macaw, with its stunning cobalt blue feathers, is a symbol of the region's beauty and fragility. Conservation efforts here are crucial to ensure these magnificent creatures continue to grace the Pantanal's skies.",
        "As the sun sets, the water acts as a mirror, doubling the fiery colors of the sky. The transition from day to night brings a new chorus of sounds, as the nocturnal inhabitants of the wetlands begin their nightly activities."
    ];

    const [currentIndex, setCurrentIndex] = useState(null);

    return (
        <div className="relative min-h-screen pt-2">
            {/* SEO */}
            <SEO
                title="The Pantanal | Nomad Scribbles"
                description="Explore the Pantanal, the world's largest tropical wetland and a wildlife sanctuary in Brazil."
                image="/images/Pantanal/small/Pantanal1.webp"
                slug="/brazil/pantanal"
            />

            {/* Hidden H1 */}
            <h1 className="sr-only">The Pantanal | Nomad Scribbles</h1>

            {/* Logo */}
            <div className="mt-4 ml-4 z-30">
                <Link to="/home">
                    <Logo className="h-6 w-auto sm:h-10" />
                </Link>
            </div>

            {/* Hero Image */}
            <div className="flex justify-center mb-2 px-2">
                <img
                    src={process.env.PUBLIC_URL + "/images/Pantanal/small/Pantanal1.webp"}
                    alt="Pantanal landscape"
                    loading="lazy"
                    className="w-full max-w-[600px] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[800px] h-auto rounded-lg shadow-lg"
                />
            </div>

            {/* Pantanal Title */}
            <div className="flex justify-center mb-6 mt-4">
                <h2 className="text-4xl sm:text-5xl font-bold text-center text-[#E5CF6B] font-cormorant">
                    The Pantanal
                </h2>
            </div>

            <main className="px-2 py-2 max-w-screen-lg mx-auto space-y-6 font-cormorant text-primaryText leading-relaxed">
                <p className="text-center text-sm sm:text-base mb-8 max-w-2xl mx-auto">
                    Immerse yourself in the wild heart of Brazil, where nature reigns supreme and every moment is a brush with the extraordinary.
                </p>

                {pantanalImages.map((img, idx) => (
                    <div
                        key={img.id}
                        className={`flex flex-col lg:flex-row items-center justify-center gap-6 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                            }`}
                    >
                        <img
                            src={img.blogimage}
                            alt={img.title}
                            loading="lazy"
                            onClick={() => setCurrentIndex(idx)}
                            className="rounded-lg cursor-pointer w-full sm:w-3/4 md:w-2/3 lg:w-2/5 h-auto shadow-md hover:opacity-95 transition-opacity"
                        />
                        <div className="p-4 rounded-md flex-1 text-left text-sm sm:text-base">
                            <h2 className="font-bold text-lg mb-2">{img.title}</h2>
                            <p>{galleryTexts[idx] || img.description}</p>
                        </div>
                    </div>
                ))}
            </main>

            {/* Lightbox */}
            {currentIndex !== null && (
                <Lightbox
                    images={pantanalImages}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                />
            )}
        </div>
    );
}

export default Pantanal;
