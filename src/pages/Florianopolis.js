import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import Lightbox from "../components/Lightbox";
import artImages from "../assets/artImages.json";
import { fadeScale, staggerContainer } from "../utils/animations";
import ContextMap from "../components/ContextMap";
import destinations from "../assets/destinations.json";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';

function Florianopolis({ openLightbox }) {
    const florianopolisCoords = destinations.find(d => d.id === "florianopolis");
    const floripaImages = artImages.filter(img => img.category === "Florianopolis");

    const spreadBackgroundStyle = {
        backgroundImage: `url(${paperTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "url(#torn-paper-filter)",
        opacity: 0.95,
    };

    // Define the visual order of images for Lightbox navigation
    const imageOrder = [
        "floripa14", // Feature
        "floripa18", // City Meets Sea
        "floripa2",  // Figueira
        "floripa5",  // Campeche Unrushed
        "floripa3",  // Steps
        "floripa12", // Along Shore
        "floripa4",  // Watching Water
        "floripa17", // Princess Flower
        "floripa10", // Shrimp
        "floripa8",  // Bar do Arante
        "floripa11", // Workshop
        "floripa7",  // Hillside
        "floripa6",  // Egret
        "floripa15", // Shared Care
        "floripa16", // Above Cove
        "floripa19", // Thorns
        "floripa22", // Rocks
        "floripa13", // Santo Antonio Dusk
        "floripa21", // Casting
        "floripa20", // Last Light
        "floripa25", // Arriving
        "floripa24", // Coati
        "floripa9",  // Small Witness
        "floripa1",  // Curassow
        "floripa23"  // Golden Hour
    ];

    // Derived list of images sorted by their appearance
    const sortedImages = imageOrder.map(id => floripaImages.find(img => img.id === id)).filter(Boolean);

    // Helper to open lightbox with correct index
    // Helper to open lightbox with correct index
    const handleImageClick = (imageId) => {
        const index = sortedImages.findIndex(img => img.id === imageId);
        if (index !== -1) {
            openLightbox(index, sortedImages);
        }
    };

    const getImage = (id) => floripaImages.find(i => i.id === id);

    // --- Section Data Structure ---
    const sections = [
        {
            id: "intro",
            title: "Florianópolis Is a Brazilian Holiday Island — and That Matters",
            coverImage: "floripa18", // Where the City Meets the Sea
            coverCaption: "The coastline stretches wide, busy at one end and thinning into distance at the other.",
            content: [
                { type: "text", text: "Florianópolis reveals itself slowly. Footsteps fade into the tide, coastlines widen and narrow again, and the island shifts gently between city, beach, and forest." },
                { type: "text", text: "The built details feel like suggestions rather than instructions — staircases, lifeguard towers, paths that guide without insisting. Nothing holds your attention for long. There’s a sense of shared space rather than consumption. Beaches are used all day, towns feel lived-in, and care for the environment is quietly embedded in daily routines. Wildlife appears without ceremony. Observation feels mutual." },
                { type: "text", text: "This is partly because Florianópolis isn’t shaped primarily for international visitors. It’s a holiday island for Brazilians, and that context sets the tone. Families return year after year, cities empty toward the coast in summer, and daily life stretches outward into sand, water, and green space." },
                { type: "text", text: "For European travellers, that difference matters. Floripa isn’t loud or demanding. It feels safe, relaxed, and easy to move through, with an emphasis on being outdoors rather than being entertained." },
                { type: "text", text: "You don’t come here to collect highlights. You come to settle into something that already works." },
                { type: "image", id: "floripa2", caption: "At the centre of the city, the fig tree anchors daily life to something far older." }
            ]
        },
        {
            id: "campeche",
            title: "Campeche: Space, Not Spectacle",
            coverImage: "floripa5", // Campeche Unrushed
            coverCaption: "Campeche opens wide, where green edges soften into sand and the sea settles into an easy rhythm.",
            content: [
                { type: "text", text: "If the island’s pace is defined by space and repetition, Campeche is where that becomes most visible." },
                { type: "image", id: "floripa3" }, // Steps
                { type: "text", text: "The beach runs broad and uninterrupted, backed by hills rather than dense development. The horizon stays open. People arrive with coolers, towels, and time, and tend to stay put." },
                { type: "text", text: "For Brazilians, Campeche is about familiarity — long days, repeated visits, and a rhythm that doesn’t need reinvention. For visitors, it’s often where the island’s logic clicks into place." },
                { type: "text", text: "Nothing competes for attention, and that absence becomes the appeal. Even Campeche Island offshore feels vivid without being overworked, visited calmly rather than framed as an event." },
                { type: "quote", text: "Pé na areia, água de coco, beira do mar.\nFeet in the sand, coconut water, by the sea.", source: "— Diogo Nogueira" }
            ]
        },
        {
            id: "santo-antonio",
            title: "Santo Antônio de Lisboa: Daily Life by the Water",
            coverImage: "floripa12", // Along Shore
            coverCaption: "The shoreline curves softly, where hills, boats, and shallow water settle into an easy balance.",
            content: [
                { type: "text", text: "On the quieter, bay-facing side of the island, the rhythm turns inward." },
                { type: "image", id: "floripa4" }, // Watching Water
                { type: "text", text: "Santo Antônio de Lisboa sits where the water stays calm and the light softens toward evening. The geography shapes how the town is used — less about the open ocean, more about staying close." },
                { type: "text", text: "It’s one of the island’s older settled areas, formed by routine rather than reinvention. Boats rest near shore, restaurants fill gradually, workshops and homes sit side by side." },
                { type: "grid", ids: ["floripa17", "floripa10"] }, // Princess Flower, Shrimp
                { type: "text", text: "Handwritten notes, handmade objects, and unhurried meals aren’t arranged for visitors. They’re simply part of how the place functions. For travellers, Santo Antônio offers Florianópolis as somewhere people live, not perform." },
                { type: "image", id: "floripa8", caption: "Handwritten notes accumulate over time, turning the restaurant into a record of passing lives." }, // Bar do Arante
                { type: "image", id: "floripa11", caption: "Small workshops remain part of daily life, not attractions." }, // Workshop
                { type: "grid", ids: ["floripa7", "floripa6", "floripa15"] }, // Hillside, Egret, Shared Care
                { type: "image", id: "floripa16", caption: "Seen from above, the beach feels held rather than exposed." }, // Above Cove
                { type: "image", id: "floripa19" } // Thorns
            ]
        },
        {
            id: "praia-do-forte",
            title: "Praia do Forte: Letting the Landscape Lead",
            coverImage: "floripa22", // Rocks
            coverCaption: "Dark stones sit low in the surf, shaped smooth by repetition rather than force.",
            content: [
                { type: "text", text: "Where Campeche opens wide, Praia do Forte interrupts." },
                { type: "text", text: "Rocks break the sand, waves arrive unevenly, and the coastline resists being smoothed out. It’s not dramatic, but it’s active — shaped continuously by wind, water, and tide." },
                { type: "grid", ids: ["floripa13", "floripa21"] }, // Dusk, Casting
                { type: "text", text: "Here, the island’s relationship with nature becomes clearest. Plants lean into salt air, stones accept the water again and again, and people adjust their pace without thinking about it. The landscape sets the terms. Life follows." },
                { type: "image", id: "floripa20" } // Last Light
            ]
        },
        {
            id: "conclusion",
            title: "Who Is This Trip For?",
            coverImage: "floripa25", // Arriving at Campeche
            coverCaption: "Access is simple, and the pace remains unhurried.",
            content: [
                { type: "text", text: "This island suits travellers who enjoy beaches that feel lived-in rather than staged, and days that don’t require much planning. If you’re happy walking, swimming, sitting, and repeating the same small pleasures, Florianópolis fits easily. An interest in how Brazilians travel within their own country — and a preference for space, greenery, and everyday rhythm over constant activity — helps." },
                { type: "image", id: "floripa24" }, // Coati
                { type: "text", text: "It may frustrate those looking for a dense city experience or a tightly structured itinerary. If you prefer destinations built around landmarks, nightlife, or urgency, or want spectacle at every turn, this island may feel too understated. Florianópolis tends to reward patience and repetition more than novelty." },
                { type: "text", text: "It isn’t a place to be decoded all at once. It’s better understood gradually, through small differences between beaches, towns, and days." },
                { type: "grid", ids: ["floripa9", "floripa1"] }, // Small Witness, Curassow
                { type: "text", text: "The bare-faced curassow paused long enough to watch back — a reminder that here, observation often goes both ways." },
                { type: "text", text: "If the island’s pace resonates — the space, the calm, the way nature and daily life overlap — it’s worth exploring further in your own way. Maps, conversations, and “things to do” lists can come later. This page is simply the starting point." },
                { type: "image", id: "floripa23" } // Golden Hour
            ]
        }
    ];

    const pageBackgroundStyle = {
        backgroundColor: "#84935c", // Deep olive green as requested
        opacity: 1,
    };

    return (
        <div className="relative min-h-screen pt-2">
            {/* SEO */}
            <SEO
                title="Florianópolis | Nomad Scribbles"
                description="Florianópolis: An island city where lush hills meet over 40 distinct beaches. Discover the diverse geography of Brazil's southern coast."
                image="/images/Floripa/assets_small/Floripa1z.webp"
                slug="/brazil/florianopolis"
            />

            {/* Hidden SVG Filter for Paper Distortion - Defined locally to prevent rendering issues */}
            <svg className="absolute w-0 h-0 invisible" aria-hidden="true" focusable="false">
                <defs>
                    <filter id="torn-paper-filter" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" seed="5" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>

            {/* Global Background */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={pageBackgroundStyle}
            />

            {/* Hidden H1 */}
            <h1 className="sr-only">Florianópolis | Nomad Scribbles</h1>

            {/* Content Wrapper to ensure z-index above background */}
            <div className="relative z-10">

                {/* Title Section */}
                <div className="flex justify-center mb-6 px-4 mt-8">
                    <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-[#D4AF37] tracking-tight text-center drop-shadow-sm">Florianópolis</h1>
                </div>

                {/* Feature Image */}
                <div className="w-full max-w-4xl mx-auto px-4 mb-12 flex flex-col items-center">
                    <img
                        src="/images/Floripa/assets_small/Floripa14.webp"
                        alt="Footprints leading to the water in Florianópolis"
                        className="w-full h-auto object-cover rounded-lg shadow-lg mb-2"
                    />
                    <p className="text-sm italic opacity-90 text-center font-medium text-stone-200">Footsteps trail along the beach before dissolving into the tide.</p>
                </div>

                {/* Banner Spread with Map */}
                <div className="relative w-full mb-16 overflow-hidden">
                    <div
                        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[110vw] pointer-events-none z-0"
                        style={spreadBackgroundStyle}
                    />

                    <div className="relative z-20 max-w-5xl mx-auto px-4 py-4 md:py-8 flex flex-col items-center mt-[-10px]">
                        <div className="w-[66%] md:w-full max-w-4xl overflow-visible mb-[-10px]">
                            <ContextMap
                                markers={[florianopolisCoords].filter(Boolean)}
                                zoomToId="florianopolis"
                                title="Where is Florianópolis?"
                                geography={florianopolisCoords?.geography}
                                transparent={true}
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content with Interactive Sections */}
                <main className="px-2 py-2 max-w-screen-xl mx-auto space-y-8 flex flex-col items-center pb-24">
                    {sections.map((section) => (
                        <StoryCard
                            key={section.id}
                            section={section}
                            getImage={getImage}
                            handleImageClick={handleImageClick}
                        />
                    ))}
                </main>
            </div>
        </div>
    );
}

// Reusable animated image component
// Reusable animated image component
function RevealImage({ smallSrc, fullSrc, alt, onClick, caption }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = (e) => {
        if (!isExpanded) {
            e.stopPropagation();
            setIsExpanded(true);
        } else {
            if (onClick) onClick(e);
        }
    };

    return (
        <div
            className={`relative max-w-5xl mx-auto transition-all duration-700 ease-in-out my-8 ${isExpanded ? "w-full" : "w-full md:w-1/2"}`}
        >
            <div className="relative w-full">
                {/* Small Framed Image (Visible by default) */}
                <img
                    src={smallSrc}
                    alt={alt}
                    onClick={handleClick}
                    className={`w-full h-auto object-contain rounded-sm shadow-sm transition-opacity duration-500 cursor-pointer ${isExpanded ? "opacity-0" : "opacity-100"}`}
                />

                {/* High-Res Full Image (Fades in on hover) */}
                <img
                    src={fullSrc}
                    alt={alt}
                    onClick={handleClick}
                    className={`absolute inset-0 w-full h-full object-cover rounded-sm transition-opacity duration-700 cursor-pointer ${isExpanded ? "opacity-100" : "opacity-0"}`}
                    loading="lazy"
                />
            </div>

            {caption && (
                <p className={`text-center text-sm italic mt-4 font-medium text-stone-300 transition-opacity duration-500 ${isExpanded ? "opacity-100" : "opacity-0"}`}>
                    {caption}
                </p>
            )}
        </div>
    );
}

function StoryCard({ section, getImage, handleImageClick }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            layout
            className={`w-full max-w-6xl bg-stone-900/50 backdrop-blur-md rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 ${isHovered ? "shadow-2xl bg-stone-900/80" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered(!isHovered)} // Tap to toggle on mobile
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {/* Header / Cover State */}
            <div className="relative p-6 md:p-10 flex flex-col items-center z-10">
                <h2 className={`text-4xl md:text-6xl font-bold font-handwriting mb-8 text-center drop-shadow-md transition-colors duration-500 ${isHovered ? "text-stone-100" : "text-[#D4AF37]"}`}>
                    {section.title}
                </h2>

                {/* Reused Reveal Animation for Cover */}
                <RevealImage
                    smallSrc={getImage(section.coverImage)?.image}
                    fullSrc={getImage(section.coverImage)?.lightboxImage}
                    alt={section.title}
                    caption={section.coverCaption}
                    onClick={() => handleImageClick(section.coverImage)}
                />

                {/* Indication to expand */}
                <motion.div
                    initial={{ opacity: 1, height: "auto" }}
                    animate={{ opacity: isHovered ? 0 : 1, height: isHovered ? 0 : "auto" }}
                    className="flex flex-col items-center h-8"
                >
                    <p className="text-xs uppercase tracking-widest opacity-50 mt-2 font-semibold text-stone-400">Explore Section</p>
                    <div className="w-px h-4 bg-stone-400/30 mt-1"></div>
                </motion.div>
            </div>

            {/* Expanded Content */}
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                    height: isHovered ? "auto" : 0
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden bg-transparent"
            >
                <div className="px-6 pb-12 md:px-16 md:pb-20 flex flex-col items-center space-y-10">
                    {section.content.map((item, idx) => {
                        if (item.type === "text") {
                            return <p key={idx} className="text-xl leading-relaxed max-w-4xl text-center md:text-left text-stone-300 font-medium">{item.text}</p>;
                        }
                        if (item.type === "image") {
                            const img = getImage(item.id);
                            if (!img) return null;
                            return (
                                <div key={idx} className="w-full">
                                    <RevealImage
                                        smallSrc={img.image}
                                        fullSrc={img.lightboxImage}
                                        alt={img.title || ""}
                                        caption={item.caption}
                                        onClick={(e) => { e.stopPropagation(); handleImageClick(item.id); }}
                                    />
                                </div>
                            );
                        }
                        if (item.type === "grid") {
                            return (
                                <div key={idx} className={`grid grid-cols-1 md:grid-cols-${item.ids.length > 2 ? '3' : '2'} gap-6 md:gap-10 w-full max-w-6xl`}>
                                    {item.ids.map(id => {
                                        const img = getImage(id);
                                        if (!img) return null;
                                        return (
                                            <div key={id} className="flex flex-col items-center w-full">
                                                <RevealImage
                                                    smallSrc={img.image}
                                                    fullSrc={img.lightboxImage}
                                                    alt={id}
                                                    onClick={(e) => { e.stopPropagation(); handleImageClick(id); }}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        }
                        if (item.type === "quote") {
                            return (
                                <blockquote key={idx} className="border-l-4 border-gold pl-6 italic my-6 text-xl opacity-90 max-w-2xl md:text-left text-stone-300">
                                    {item.text.split('\n').map((line, i) => <span key={i} className="block">{line}</span>)}
                                    {item.source && <span className="text-base not-italic block mt-2 font-bold text-stone-400">{item.source}</span>}
                                </blockquote>
                            );
                        }
                        if (item.type === "header") {
                            return <h3 key={idx} className="text-2xl md:text-3xl font-bold font-handwriting mt-4 text-center text-stone-100">{item.text}</h3>;
                        }
                        if (item.type === "list") {
                            return (
                                <ul key={idx} className="list-disc pl-5 space-y-4 text-lg max-w-2xl text-left text-stone-300">
                                    {item.items.map((li, i) => <li key={i}>{li}</li>)}
                                </ul>
                            );
                        }
                        return null;
                    })}
                </div>
            </motion.div>
        </motion.div>
    );
}



export default Florianopolis;
