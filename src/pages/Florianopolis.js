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

    return (
        <div className="relative min-h-screen pt-2">
            {/* SEO */}
            {/* SEO */}
            <SEO
                title="Florianópolis | Nomad Scribbles"
                description="Florianópolis: An island city where lush hills meet over 40 distinct beaches. Discover the diverse geography of Brazil's southern coast."
                image="/images/Floripa/assets_small/Floripa1z.webp"
                slug="/brazil/florianopolis"
            />

            {/* Hidden H1 */}
            <h1 className="sr-only">Florianópolis | Nomad Scribbles</h1>


            {/* Title Section */}
            <div className="flex justify-center mb-6 px-4 mt-8">
                <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-darkText tracking-tight text-center">Florianópolis</h1>
            </div>

            {/* Feature Image */}
            <div className="w-full max-w-4xl mx-auto px-4 mb-12 flex flex-col items-center">
                <img
                    src="/images/Floripa/assets_small/Floripa14.webp"
                    alt="Footprints leading to the water in Florianópolis"
                    className="w-full h-auto object-cover rounded-lg shadow-md mb-2"
                />
                <p className="text-sm italic opacity-80 text-center">Footsteps trail along the beach before dissolving into the tide.</p>
            </div>

            {/* Banner Spread with Map */}
            <div className="relative w-full mb-16 overflow-hidden">
                <div
                    className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[110vw] pointer-events-none z-0"
                    style={spreadBackgroundStyle}
                />

                <div className="relative z-20 max-w-5xl mx-auto px-4 py-8 flex flex-col items-center mt-[-10px]">
                    <div className="w-full max-w-4xl overflow-visible mb-[-10px]">
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

// --- Section Data Structure ---
            const sections = [
            {
                id: "intro",
            title: "Florianópolis Is a Brazilian Holiday Island — and That Matters",
            coverImage: "floripa18", // Where the City Meets the Sea
            coverCaption: "The coastline stretches wide, busy at one end and thinning into distance at the other.",
            content: [
            {type: "text", text: "Florianópolis isn’t a place built primarily for international visitors. It’s a holiday island for Brazilians, and that shapes everything about it — the pace of the beaches, the way people use the space, and the overall feel of the island." },
            {type: "text", text: "Families return here year after year, cities empty toward the coast in summer, and daily life stretches outward into sand, forest, and water." },
            {type: "text", text: "For European travellers, that distinction matters. Floripa isn’t loud or demanding. It feels safe, relaxed, and easy to move through, with an emphasis on being outdoors rather than being entertained." },
            {type: "text", text: "You don’t come here to collect highlights. You come here to settle into something that already works." },
            {type: "text", text: "Florianópolis reveals itself slowly. Footsteps fade into the tide, coastlines widen and then narrow again, and the island shifts gently between city, beach, and forest." },
            {type: "text", text: "Even the built details — staircases, lifeguard towers, paths — feel like suggestions rather than instructions. Nothing insists on your attention for long." },
            {type: "text", text: "There’s a sense that people are sharing space rather than consuming it. Beaches are used all day, towns feel lived-in, and reminders about care and responsibility are quietly part of the landscape. Wildlife appears without ceremony. Observation here feels mutual." },
            {type: "image", id: "floripa2", caption: "At the centre of the city, the fig tree anchors daily life to something far older." }
            ]
        },
            {
                id: "campeche",
            title: "Campeche: Space, Not Spectacle",
            coverImage: "floripa5", // Campeche Unrushed
            coverCaption: "Campeche opens wide, where green edges soften into sand and the sea settles into an easy rhythm.",
            content: [
            {type: "text", text: "Campeche feels open in every sense. The beach runs wide, backed by green hills rather than dense development, and the horizon stays uninterrupted." },
            {type: "image", id: "floripa3" }, // Steps
            {type: "text", text: "People arrive with coolers, towels, and time, and tend to stay put." },
            {type: "text", text: "For Brazilians, Campeche is about familiarity and freedom — long days, repeated visits, and a rhythm that doesn’t change much year to year. For visitors, it’s often where the island’s pace clicks into place." },
            {type: "text", text: "Nothing competes for attention, and that absence of pressure becomes the appeal. Even Campeche Island just offshore feels vivid without being overworked, visited calmly rather than framed as an event." },
            {type: "quote", text: "Pé na areia, água de coco, beira do mar.\nFeet in the sand, coconut water, by the sea.", source: "— from “Pé na Areia”, Diogo Nogueira" }
            ]
        },
            {
                id: "santo-antonio",
            title: "Santo Antônio de Lisboa: Daily Life by the Water",
            coverImage: "floripa12", // Along Shore
            coverCaption: "The shoreline curves softly, where hills, boats, and shallow water settle into an easy balance.",
            content: [
            {type: "text", text: "Santo Antônio de Lisboa sits on the quieter, bay-facing side of the island. The water is calmer here, the light softer, and evenings tend to linger." },
            {type: "text", text: "This geography shapes how the place is used — less about the open ocean, more about staying close." },
            {type: "image", id: "floripa4" }, // Watching Water
            {type: "text", text: "It’s one of the island’s older settled areas, shaped by routine rather than reinvention. Boats rest near shore, restaurants fill slowly, workshops and homes sit side by side." },
            {type: "grid", ids: ["floripa17", "floripa10"] }, // Princess Flower, Shrimp
            {type: "text", text: "Notes left behind, handmade objects, and unhurried meals aren’t styled for visitors — they’re simply part of how the town works. For travellers, Santo Antônio offers a glimpse of Florianópolis as somewhere people live, not perform." },
            {type: "image", id: "floripa8", caption: "Handwritten notes accumulate over time, turning the restaurant into a record of passing lives." }, // Bar do Arante
            {type: "image", id: "floripa11", caption: "Small workshops remain part of daily life, not attractions." }, // Workshop
            {type: "grid", ids: ["floripa7", "floripa6", "floripa15"] }, // Hillside, Egret, Shared Care
            {type: "image", id: "floripa16", caption: "Seen from above, the beach feels held rather than exposed." }, // Above Cove
            {type: "image", id: "floripa19" } // Thorns
            ]
        },
            {
                id: "praia-do-forte",
            title: "Praia do Forte: Letting the Landscape Lead",
            coverImage: "floripa22", // Rocks
            coverCaption: "Dark stones sit low in the surf, shaped smooth by repetition rather than force.",
            content: [
            {type: "text", text: "Praia do Forte feels less polished. Rocks interrupt the sand, waves arrive unevenly, and the coastline resists being smoothed out." },
            {type: "text", text: "It’s not dramatic, but it’s active — shaped continuously by wind, water, and light." },
            {type: "grid", ids: ["floripa13", "floripa21"] }, // Dusk, Casting
            {type: "text", text: "Here, Florianópolis’ relationship with nature becomes clearest. Plants lean into salt air, stones accept the tide repeatedly, and people adjust their pace without thinking about it. The landscape sets the terms, and life follows." },
            {type: "image", id: "floripa20" } // Last Light
            ]
        },
            {
                id: "conclusion",
            title: "Is This the Right Fit?",
            coverImage: "floripa25", // Arriving at Campeche
            coverCaption: "Access is simple, and the pace remains unhurried.",
            content: [
            {type: "header", text: "This island is a good fit if…" },
            {type: "list", items: [
            "You enjoy beaches that feel lived-in rather than staged, and days that don’t need much planning. You’re happy letting nature set the pace — walking, swimming, sitting, and doing it all again the next day.",
            "You’re curious about how Brazilians travel within their own country, and you value places that feel safe, relaxed, and easy to move through. Space, greenery, and everyday rhythm matter more to you than constant activity."
                ]},
            {type: "image", id: "floripa24" }, // Coati
            {type: "header", text: "It may not be the right fit if…" },
            {type: "list", items: [
            "You’re looking for a dense city experience or a tightly structured itinerary. You prefer destinations built around landmarks, nightlife, or a sense of urgency.",
            "You want spectacle at every turn, or beaches designed to entertain rather than to be used. Florianópolis tends to reward patience and repetition more than novelty."
                ]},
            {type: "text", text: "Florianópolis isn’t a place to be decoded all at once. It’s better understood gradually, through small differences between beaches, towns, and days." },
            {type: "grid", ids: ["floripa9", "floripa1"] }, // Small Witness, Curassow
            {type: "text", text: "The Bare-faced Curassow paused long enough to watch back." },
            {type: "text", text: "If the feel of the island resonates — the space, the calm, the way nature and daily life overlap — then it’s worth exploring further in your own way, whether that’s maps, conversations, or the inevitable “things to do” lists elsewhere. This page is simply the starting point." },
            {type: "image", id: "floripa23" } // Golden Hour
            ]
        }
            ];

            return (
            <div className="relative min-h-screen pt-2">
                {/* SEO */}
                <SEO
                    title="Florianópolis | Nomad Scribbles"
                    description="Florianópolis: An island city where lush hills meet over 40 distinct beaches. Discover the diverse geography of Brazil's southern coast."
                    image="/images/Floripa/assets_small/Floripa1z.webp"
                    slug="/brazil/florianopolis"
                />

                {/* Hidden H1 */}
                <h1 className="sr-only">Florianópolis | Nomad Scribbles</h1>

                {/* Title Section */}
                <div className="flex justify-center mb-6 px-4 mt-8">
                    <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-darkText tracking-tight text-center">Florianópolis</h1>
                </div>

                {/* Feature Image */}
                <div className="w-full max-w-4xl mx-auto px-4 mb-12 flex flex-col items-center">
                    <img
                        src="/images/Floripa/assets_small/Floripa14.webp"
                        alt="Footprints leading to the water in Florianópolis"
                        className="w-full h-auto object-cover rounded-lg shadow-md mb-2"
                    />
                    <p className="text-sm italic opacity-80 text-center">Footsteps trail along the beach before dissolving into the tide.</p>
                </div>

                {/* Banner Spread with Map */}
                <div className="relative w-full mb-16 overflow-hidden">
                    <div
                        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[110vw] pointer-events-none z-0"
                        style={spreadBackgroundStyle}
                    />

                    <div className="relative z-20 max-w-5xl mx-auto px-4 py-8 flex flex-col items-center mt-[-10px]">
                        <div className="w-full max-w-4xl overflow-visible mb-[-10px]">
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
                <main className="px-2 py-2 max-w-screen-xl mx-auto space-y-8 flex flex-col items-center">
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
            );
}

            function StoryCard({section, getImage, handleImageClick}) {
    const [isHovered, setIsHovered] = useState(false);

            return (
            <motion.div
                layout
                className={`w-full max-w-4xl bg-white/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm border border-stone-200 cursor-pointer transition-shadow duration-300 ${isHovered ? "shadow-xl bg-white/80" : ""}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsHovered(!isHovered)} // Tap to toggle on mobile
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                {/* Header / Cover State */}
                <div className="relative p-6 md:p-8 flex flex-col items-center">
                    <h2 className="text-3xl md:text-5xl font-bold font-handwriting mb-6 text-center text-darkText">
                        {section.title}
                    </h2>

                    <div className="w-full max-w-3xl">
                        <img
                            src={getImage(section.coverImage)?.image}
                            alt={section.title}
                            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md mb-4"
                        />
                        {section.coverCaption && (
                            <p className="text-center text-sm italic opacity-80 mb-4">{section.coverCaption}</p>
                        )}
                    </div>

                    {/* Indication to expand (only visible when not hovered?? actually lets keep it simple) */}
                    <motion.div
                        initial={{ opacity: 1, height: "auto" }}
                        animate={{ opacity: isHovered ? 0 : 1, height: isHovered ? 0 : "auto" }}
                        className="flex flex-col items-center h-8"
                    >
                        <p className="text-xs uppercase tracking-widest opacity-50 mt-2">Explore Section</p>
                        <div className="w-px h-4 bg-darkText/20 mt-1"></div>
                    </motion.div>
                </div>

                {/* Expanded Content */}
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        height: isHovered ? "auto" : 0
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <div className="px-6 pb-12 md:px-12 md:pb-16 flex flex-col items-center space-y-8">
                        {section.content.map((item, idx) => {
                            if (item.type === "text") {
                                return <p key={idx} className="text-lg leading-relaxed max-w-2xl text-center md:text-left">{item.text}</p>;
                            }
                            if (item.type === "image") {
                                const img = getImage(item.id);
                                if (!img) return null;
                                return (
                                    <div key={idx} className="flex flex-col items-center max-w-3xl w-full">
                                        <img
                                            src={img.image}
                                            alt={img.title || ""}
                                            onClick={(e) => { e.stopPropagation(); handleImageClick(item.id); }}
                                            className="w-full h-auto rounded-lg shadow-md cursor-pointer hover:opacity-95 transition-opacity"
                                        />
                                        {item.caption && <p className="mt-2 text-sm italic opacity-80 text-center">{item.caption}</p>}
                                    </div>
                                );
                            }
                            if (item.type === "grid") {
                                return (
                                    <div key={idx} className={`grid grid-cols-1 md:grid-cols-${item.ids.length > 2 ? '3' : '2'} gap-4 md:gap-8 w-full max-w-5xl`}>
                                        {item.ids.map(id => {
                                            const img = getImage(id);
                                            if (!img) return null;
                                            return (
                                                <div key={id} className="flex flex-col items-center">
                                                    <img
                                                        src={img.image}
                                                        alt={id}
                                                        onClick={(e) => { e.stopPropagation(); handleImageClick(id); }}
                                                        className="w-full h-auto rounded-lg shadow-md cursor-pointer hover:opacity-95 transition-opacity"
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            }
                            if (item.type === "quote") {
                                return (
                                    <blockquote key={idx} className="border-l-4 border-gold pl-6 italic my-6 text-xl opacity-90 max-w-2xl md:text-left">
                                        {item.text.split('\n').map((line, i) => <span key={i} className="block">{line}</span>)}
                                        {item.source && <span className="text-base not-italic block mt-2 font-bold">{item.source}</span>}
                                    </blockquote>
                                );
                            }
                            if (item.type === "header") {
                                return <h3 key={idx} className="text-2xl md:text-3xl font-bold font-handwriting mt-4 text-center">{item.text}</h3>;
                            }
                            if (item.type === "list") {
                                return (
                                    <ul key={idx} className="list-disc pl-5 space-y-4 text-lg max-w-2xl text-left">
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
