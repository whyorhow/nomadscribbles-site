import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import SEO from "../components/SEO";
import Logo from "../components/Logo";
import Lightbox from "../components/Lightbox";
import artImages from "../assets/artImages.json";
import { fadeScale, staggerContainer } from "../utils/animations";

function Pantanal() {
    // Get all Pantanal images from the JSON
    const allPantanalImages = artImages.filter(img => img.category === "Pantanal");

    // Define the content blocks provided by the user
    // We will attempt to map specific images to these blocks.
    const contentBlocks = [
        {
            title: "Water That Moves the World",
            text: "The Pantanal is one of the largest tropical wetlands on Earth, stretching across Brazil, Bolivia, and Paraguay. Unlike landscapes shaped by roads or permanent boundaries, this region is governed almost entirely by water. Seasonal flooding transforms grasslands into shallow lakes, rivers overflow into forests, and familiar paths disappear for months at a time. Life here is built around movement and return. Animals migrate with the water’s rise and retreat, adapting not to fixed terrain, but to constant change. The land never settles — it breathes.",
            imageId: "pantanal1" // Wetlands Dawn
        },
        {
            title: "Ancient Survivors",
            text: "Caimans are among the Pantanal’s oldest residents, descendants of lineages that have survived millions of years of environmental upheaval. Perfectly adapted to wetland life, they are both hunters and quiet engineers of the ecosystem. Their movement through shallow waters creates channels used by fish, birds, and smaller animals. Often still and watchful, they embody the patience of the Pantanal itself — a reminder that survival here depends less on speed and more on balance.",
            imageId: "pantanal4" // River Giants (Caimans)
        },
        {
            title: "Voices of the Canopy",
            text: "Macaws and toucans bring colour and sound to the Pantanal’s upper layers, but their role goes far beyond spectacle. Feeding on fruits across wide distances, they act as natural gardeners, dispersing seeds that help regenerate forests after floods or fires. Their calls echo across water and trees, carrying information — warnings, territory, presence. In a landscape where visibility often blurs into reflection and foliage, sound becomes a way of mapping space.",
            imageId: "pantanal3" // Crowning Glory (Birds)
        },
        {
            title: "A Wetland of Extremes",
            text: "The Pantanal shifts dramatically between seasons. During the dry months, animals gather around shrinking water sources, creating dense pockets of life where predator and prey exist in close proximity. When the rains return, the land opens again. Water spreads outward, competition eases, and animals disperse across newly formed wetlands. These cycles have repeated for centuries, shaping behaviours, migration patterns, and even the timing of birth and growth.",
            imageId: "pantanal5" // Marsh Deer (Animals disperse)
        },
        {
            title: "A Fragile Balance",
            text: "Despite its vastness, the Pantanal is deeply sensitive. Fires, deforestation, and changes to upstream rivers threaten the delicate flooding cycles that sustain the region. Because everything here depends on water flowing freely, disruption in one area can ripple across hundreds of kilometres. Conservation in the Pantanal isn’t about freezing the landscape in time — it’s about allowing its natural rhythms to continue uninterrupted.",
            imageId: "pantanal7" // Sunset Reflection (Mood fitting for conservation/fragility)
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(null);

    // Helper to open lightbox with correct index from the full list
    const handleImageClick = (imageId) => {
        const index = allPantanalImages.findIndex(img => img.id === imageId);
        if (index !== -1) {
            setCurrentIndex(index);
        }
    };

    return (
        <div className="relative min-h-screen pt-2">
            {/* SEO */}
            <SEO
                title="The Pantanal | Nomad Scribbles"
                description="Explore the Pantanal, the world's largest tropical wetland and a wildlife sanctuary in Brazil."
                image="/images/Pantanal/small/Pantanal1F.webp"
                slug="/brazil/pantanal"
            />

            {/* Hidden H1 */}
            <h1 className="sr-only">The Pantanal | Nomad Scribbles</h1>

            <div className="mt-4 ml-4 z-50">
                <Logo className="h-6 w-auto sm:h-10" />
            </div>

            {/* Hero Image removed temporarily */}

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

                {contentBlocks.map((block, idx) => {
                    const img = allPantanalImages.find(i => i.id === block.imageId);
                    // Fallback if image isn't found (shouldn't happen if IDs are correct)
                    if (!img) return null;

                    return (
                        <div
                            key={block.title}
                            className={`flex flex-col lg:flex-row items-center justify-center gap-6 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                                }`}
                        >
                            <img
                                src={img.blogimage}
                                alt={img.title}
                                loading="lazy"
                                onClick={() => handleImageClick(block.imageId)}
                                className="rounded-lg cursor-pointer w-11/12 sm:w-3/4 md:w-2/3 lg:w-2/5 h-auto shadow-md hover:opacity-95 transition-opacity p-4 max-w-[350px]"
                            />
                            <div className="p-4 rounded-md flex-1 text-left text-sm sm:text-base">
                                <h2 className="font-bold text-lg mb-2">{block.title}</h2>
                                <p>{block.text}</p>
                            </div>
                        </div>
                    );
                })}
            </main>

            {/* Lightbox */}
            {currentIndex !== null && (
                <Lightbox
                    images={allPantanalImages}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                />
            )}
        </div>
    );
}

export default Pantanal;
