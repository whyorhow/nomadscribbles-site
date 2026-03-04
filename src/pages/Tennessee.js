import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import Lightbox from "../components/Lightbox";
import artImages from "../assets/artImages.json";
import { fadeScale, staggerContainer } from "../utils/animations";
import ContextMap from "../components/ContextMap";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';
import destinations from "../assets/destinations.json";

function Tennessee() {
    const tennesseeCoords = destinations.find(d => d.id === "tennessee");

    // Key Experiences Data (Top 3)
    const top3 = [
        {
            title: "1. The Great Smoky Mountains",
            text: "The Smokies are defined by their ancient ridges and the blue-grey mist that clings to their valleys. From the dense canopy of old-growth forests to the rocky outcrops of the high peaks, these mountains offer a sense of scale and stillness that is both humbling and rejuvenating.",
            image: `${process.env.PUBLIC_URL}/images/United States/Tennessee/Mountains/Small/Panoramic Mountainsz.webp`,
            link: "/united-states/tennessee/smokies",
            alt: "Panoramic view of the Great Smoky Mountains in Tennessee",
        },
        {
            title: "2. The Rhythm of Music City",
            text: "Coming soon: A journey through the sounds of Nashville, where every street corner holds a melody and every stage tells a story. From the historic Ryman Auditorium to the neon lights of Broadway, we'll explore the heart of American music.",
            image: `${process.env.PUBLIC_URL}/images/SaoPauloLanding/small/Street2.webp`, // Placeholder image
            link: "/united-states/tennessee/music",
            alt: "Music City placeholder",
        },
        {
            title: "3. Southern Flavours & Traditions",
            text: "Coming soon: A taste of Tennessee, from slow-cooked barbecue to the refined notes of Lynchburg whiskey. We'll dive into the culinary traditions that have shaped the state's identity and the stories told across the dinner table.",
            image: `${process.env.PUBLIC_URL}/images/SaoPauloLanding/pizza.webp`, // Placeholder image
            link: "/united-states/tennessee/food",
            alt: "Southern food placeholder",
        },
    ];

    const top3BgColors = [
        "bg-[#F5E8C7]/50",
        "bg-[#C7E8F5]/50",
        "bg-[#E8C7F5]/50",
    ];

    const spreadBackgroundStyle = {
        backgroundImage: `url(${paperTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "url(#torn-paper-filter) drop-shadow(0 0 3px rgba(0,0,0,0.15))",
        opacity: 1,
    };

    return (
        <div className="relative flex flex-col font-sans text-[#e2e1dc]">
            <SEO
                title="Tennessee: Mountains, Music & Magic | Nomad Scribbles"
                description="From the misty peaks of the Smokies to the rhythmic pulse of Nashville, explore the diverse landscapes and rich culture of Tennessee."
                keywords="Tennessee travel guide, Great Smoky Mountains, Nashville, Gatlinburg, music city, Tennessee mountains"
                image="https://nomadscribbles.com/images/United States/Tennessee/Mountains/Panoramic Mountains.jpg"
                url="https://nomadscribbles.com/united-states/tennessee"
            />

            {/* 1. Feature Image */}
            <section className="relative w-full mb-8">
                <div className="w-full">
                    <img
                        src={`${process.env.PUBLIC_URL}/images/United States/Tennessee/Mountains/Panoramic Mountains.jpg`}
                        alt="The misty ridges of the Great Smoky Mountains"
                        className="w-full h-auto object-cover max-h-[80vh]"
                    />
                </div>
                <div className="max-w-screen-lg mx-auto px-6 mt-4">
                    <p className="text-sm italic text-gray-400 text-center animate-fade-in-up delay-200">
                        The ancient ridges of the Smokies stretch toward the horizon, draped in a blue-grey mist.
                    </p>
                </div>
            </section>

            {/* 2. Introduction */}
            <section className="max-w-screen-md mx-auto px-6 mb-16 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-6 text-[#edd98d]">
                    Mountains, Music and Magic
                </h1>
                <p className="text-lg leading-relaxed md:text-xl text-[#e2e1dc]/90">
                    Tennessee is a state of layers — layers of mist in the mountains, layers of history in its music, and layers of flavour in its food. It’s a place where the landscape shapes the stories, and the stories, in turn, breathe life into the landscape. From the quiet trails of the East to the rhythmic pulse of the West, Tennessee reveals itself in fragments of sound and light.
                </p>
            </section>

            {/* 3. Narrative Image Blocks */}
            <section className="max-w-screen-lg mx-auto px-6 space-y-16 mb-20">

                {/* Block A - Mountains */}
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    <div className="w-full md:w-1/2">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/United States/Tennessee/Mountains/Small/Rolling Hills.webp`}
                            alt="Rolling hills of Tennessee"
                            className="w-full h-auto rounded-sm shadow-md"
                            loading="lazy"
                        />
                        <p className="text-xs text-gray-400 mt-2 italic">The hills roll gently before rising into the high peaks.</p>
                    </div>
                    <div className="w-full md:w-1/2 text-lg leading-relaxed">
                        <h3 className="text-xl font-bold text-[#edd98d] mb-4">A Land of Ancient Ridges</h3>
                        <p>The Great Smoky Mountains are among the oldest on Earth. Their name comes from the smoke-like mist that rises from the dense vegetation, creating a landscape that feels both timeless and ever-changing. Walking these trails is an exercise in scale, where the towering trees and sweeping vistas remind you of the slow, steady pulse of the natural world.</p>
                    </div>
                </div>

                {/* Block B - Nature Details */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
                    <div className="w-full md:w-1/2">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/United States/Tennessee/Mountains/Small/Moss-Covered Rocks.webp`}
                            alt="Moss-covered rocks in the Smoky Mountains"
                            className="w-full h-auto rounded-sm shadow-md"
                            loading="lazy"
                        />
                        <p className="text-xs text-gray-400 mt-2 italic">Life finds a foothold in every crevice.</p>
                    </div>
                    <div className="w-full md:w-1/2 text-lg leading-relaxed">
                        <h3 className="text-xl font-bold text-[#edd98d] mb-4">Fragments of the Forest</h3>
                        <p>Beyond the mountain views, Tennessee’s character is found in the small details — the vibrant green of moss on a river stone, the delicate petals of a fleabane flower, or the sudden, alert presence of a deer in the brush. These fragments of life are the quiet heartbeat of the state, rewarding those who slow down enough to notice them.</p>
                    </div>
                </div>

                {/* Block C - Rustic Charm */}
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    <div className="w-full md:w-1/2 space-y-4">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/United States/Tennessee/Mountains/Small/Rustic Cabin.webp`}
                            alt="A rustic cabin in the woods"
                            className="w-[70%] mx-auto block h-auto rounded-sm shadow-md"
                            loading="lazy"
                        />
                        <img
                            src={`${process.env.PUBLIC_URL}/images/United States/Tennessee/Mountains/Small/Country Church.webp`}
                            alt="A small country church"
                            className="w-[70%] mx-auto block h-auto rounded-sm shadow-md opacity-90"
                            loading="lazy"
                        />
                        <p className="text-xs text-gray-400 italic">Echoes of a simpler time.</p>
                    </div>
                    <div className="w-full md:w-1/2 text-lg leading-relaxed">
                        <h3 className="text-xl font-bold text-[#edd98d] mb-4">The Human Landscape</h3>
                        <p>Woven into the natural beauty are the marks of human history — rustic cabins that have weathered a century of seasons, and small country churches that still stand as anchors of community. These structures aren’t just buildings; they’re repositories of memory, echoes of a life lived in close conversation with the land.</p>
                    </div>
                </div>
            </section>

            {/* 4. Bridge Text */}
            <section className="bg-[#1c1c1c] py-12 mb-16">
                <div className="max-w-screen-md mx-auto px-6 text-center">
                    <p className="text-xl md:text-2xl font-light italic text-gray-300">
                        “Tennessee is a song that hasn't finished being sung. It is a place where the mountains hold the past and the music holds the future, meeting in the quiet moments of the present.”
                    </p>
                </div>
            </section>

            {/* Banner Spread with Map */}
            <div className="relative w-full mb-16 overflow-hidden hidden md:block">
                <div
                    className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[110vw] pointer-events-none z-10"
                    style={{
                        ...spreadBackgroundStyle,
                        filter: "url(#torn-paper-filter) drop-shadow(0 0 12px rgba(0,0,0,0.4))",
                        opacity: 1
                    }}
                />
                <div className="relative z-20 max-w-5xl mx-auto px-4 py-8 flex flex-col items-center mt-[-10px]">
                    <div className="w-full max-w-4xl overflow-visible mb-[-10px]">
                        <ContextMap
                            markers={tennesseeCoords ? [tennesseeCoords] : []}
                            zoomToId="tennessee"
                            title="Where is Tennessee?"
                            geography={tennesseeCoords?.geography}
                            transparent={true}
                        />
                    </div>
                </div>
            </div>

            {/* 5. Key Experiences */}
            <main className="max-w-screen-lg mx-auto px-6 pb-20 space-y-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-[#edd98d]">Key Experiences</h2>
                    <p className="text-gray-400 mt-2">Exploring the layers of the state</p>
                </div>

                {top3.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className={`flex flex-col md:flex-row items-center gap-6 ${top3BgColors[idx]} rounded-lg p-6 shadow-md ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                    >
                        {/* Image */}
                        <div className="w-full md:w-2/5 flex-shrink-0">
                            <Link to={item.link}>
                                <img
                                    src={item.image}
                                    alt={item.alt}
                                    loading="lazy"
                                    className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
                                />
                            </Link>
                        </div>

                        {/* Text & Link */}
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="font-bold text-2xl mb-3 text-black">{item.title}</h3>
                            <p className="mb-4 text-black/80 leading-relaxed">{item.text}</p>
                            <Link
                                to={item.link}
                                className="inline-block text-black font-bold uppercase tracking-wide border-b-2 border-black/20 hover:border-black transition-colors"
                            >
                                Explore {item.title.split(".")[1] || "More"} →
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </main>

            {/* Navigation Links */}
            <div className="w-full flex flex-col items-center gap-6 mt-12 mb-20 relative z-10">
                <Link
                    to="/"
                    className="flex flex-row items-center justify-center text-stone-300 hover:text-white transition-colors drop-shadow-md bg-stone-950/50 backdrop-blur-md rounded-full px-8 py-3 border border-white/10 shadow-lg hover:bg-stone-900/60 w-fit min-w-[240px]"
                >
                    <span className="text-xl mr-3 pb-1">←</span>
                    <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Home</span>
                </Link>
            </div>
        </div>
    );
}

export default Tennessee;
