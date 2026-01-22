import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import SEO from "../components/SEO";
import Logo from "../components/Logo";
import Lightbox from "../components/Lightbox";
import artImages from "../assets/artImages.json";
import { fadeScale, staggerContainer } from "../utils/animations";

function Rio() {
    const rioImages = artImages.filter(img => img.category === "Rio");

    const [currentIndex, setCurrentIndex] = useState(null);

    const contentBlocks = [
        {
            title: "Granite at First Light",
            text: "The city wakes beneath massive stone shoulders. As the sun lifts, light skims across bare rock faces, revealing how Rio is built around its landscape rather than on top of it. These hills are not distant backdrops — they are present, unavoidable, shaping neighbourhoods, views, and daily movement.",
            imageId: "rio1" // Rio Landscape
        },
        {
            title: "City Pressed to the Mountain",
            text: "Dense neighbourhoods cling to the slopes, rising in tight layers between forest and sea. From above, the city appears compressed, every available surface inhabited. Rio’s geography leaves little room for separation. Wealth, poverty, nature, and concrete exist side by side, stacked vertically rather than spread apart.",
            imageId: "rio7" // Favela Colors
        },
        {
            title: "Watching from Above",
            text: "The figure of Christ stands open-armed over the city, both distant and deeply present. From this height, Rio stretches outward — beaches, buildings, forests, and roads unfolding in every direction. The statue does not dominate the view so much as frame it, a silent witness to the movement below.",
            imageId: "rio6" // Christ the Redeemer
        },
        {
            title: "Stone and Sky",
            text: "Up close, the monument feels heavier, more human in scale. Weathered stone meets open air, and the outstretched arms feel less like spectacle and more like gesture. Clouds pass, birds circle, voices drift upward. Even here, at one of the city’s most visited sites, Rio never fully pauses.",
            imageId: "rio10" // Rio Sunset (Sky theme)
        },
        {
            title: "Where the City Meets the Sea",
            text: "On the shoreline, the rhythm changes again. Waves roll in, feet sink into sand, conversations slow. The beach is not an escape from the city — it is part of its daily life. Here, Rio stretches out horizontally, offering space, breath, and light after the density of the hills.",
            imageId: "rio5" // Beach Life
        },
        {
            title: "A City Defined by Geography",
            text: "Rio’s dramatic landscape is the result of ancient granite formations shaped long before the city existed. Mountains rise abruptly from sea level, forcing urban life to adapt vertically. This geography influences everything — housing, transport, visibility, even social boundaries.",
            imageId: "rio3" // Sugarloaf View
        },
        {
            title: "Christ the Redeemer",
            text: "Completed in 1931, the statue atop Corcovado Mountain has become one of the most recognisable symbols of Brazil. More than a religious monument, it has come to represent protection, openness, and watchfulness — a constant presence above the city’s contradictions.",
            imageId: "rio2" // Rio Scenes (General view)
        },
        {
            title: "Between Forest and Ocean",
            text: "Rio is bordered by the Atlantic Ocean on one side and the Tijuca Forest — one of the world’s largest urban rainforests — on the other. This proximity means nature is never far away. Sudden rain, shifting light, and dense greenery are part of everyday urban experience.",
            imageId: "rio4" // Urban Jungle
        },
        {
            title: "The Beach as Common Ground",
            text: "Unlike many global cities, Rio’s beaches function as shared social spaces. Locals from across the city gather here — to swim, talk, play, rest, and observe. The shoreline becomes a place where social lines soften, even if briefly.",
            imageId: "rio9" // Tropical Vibes
        }
    ];

    // Helper to open lightbox with correct index from the full list
    const handleImageClick = (imageId) => {
        const index = rioImages.findIndex(img => img.id === imageId);
        if (index !== -1) {
            setCurrentIndex(index);
        }
    };

    return (
        <div className="relative min-h-screen pt-2">
            {/* SEO */}
            <SEO
                title="Rio de Janeiro | Nomad Scribbles"
                description="Rio de Janeiro: Where stone, sea, and belief shape the skyline. A city pressed to the mountains and defined by its dramatic geography."
                image="/images/Rio/small/Rio1F.webp"
                slug="/brazil/rio"
            />

            {/* Hidden H1 */}
            <h1 className="sr-only">Rio de Janeiro | Nomad Scribbles</h1>

            {/* Logo */}
            <div className="mt-4 ml-4 z-30">
                <Link to="/home">
                    <Logo className="h-6 w-auto sm:h-10" />
                </Link>
            </div>

            {/* Hero Image */}
            <div className="flex justify-center mb-2 px-2">
                <img
                    src={process.env.PUBLIC_URL + "/images/Rio/small/Rio1F.webp"}
                    alt="Rio landscape"
                    loading="lazy"
                    className="w-full max-w-[600px] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[800px] h-auto rounded-lg shadow-lg"
                />
            </div>

            {/* Rio Title */}
            <div className="flex justify-center mb-6 mt-4">
                <div className="text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold text-[#E5CF6B] font-cormorant">
                        Rio de Janeiro
                    </h2>
                    <p className="text-primaryText font-cormorant italic mt-2 text-lg sm:text-xl">
                        Where stone, sea, and belief shape the skyline.
                    </p>
                </div>
            </div>

            <main className="px-2 py-2 max-w-screen-lg mx-auto space-y-6 font-cormorant text-primaryText leading-relaxed">
                {contentBlocks.map((block, idx) => {
                    const img = rioImages.find(i => i.id === block.imageId);
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
                                className="rounded-lg cursor-pointer w-full sm:w-3/4 md:w-2/3 lg:w-2/5 h-auto shadow-md hover:opacity-95 transition-opacity"
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
                    images={rioImages}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                />
            )}
        </div>
    );
}

export default Rio;
