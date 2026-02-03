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

function Rio({ openLightbox }) {
    const rioCoords = destinations.find(d => d.id === "rio");
    const rioImages = artImages.filter(img => img.category === "Rio");

    const spreadBackgroundStyle = {
        backgroundImage: `url(${paperTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "url(#torn-paper-filter)",
        opacity: 0.95,
    };

    // Define the visual order of images for Lightbox navigation
    const imageOrder = [
        "rio1", "rio2", "rio3", "rio4", "rio5", "rio6", "rio7", "rio8", "rio9", "rio10", "rio11"
    ];

    // Derived list of images sorted by their appearance
    const sortedImages = imageOrder.map(id => rioImages.find(img => img.id === id)).filter(Boolean);

    // Helper to open lightbox with correct index
    const handleImageClick = (imageId) => {
        const index = sortedImages.findIndex(img => img.id === imageId);
        if (index !== -1) {
            openLightbox(index, sortedImages);
        }
    };

    const getImage = (id) => rioImages.find(i => i.id === id);

    // --- Section Data Structure ---
    const sections = [
        {
            id: "carnival",
            title: "Spectacle and scale", // Adapted from Rio2 desc
            coverImage: "rio2", // Carnival Stands
            coverCaption: "Carnival is as much about collective participation as spectacle.",
            content: [
                { type: "text", text: "Viewed from above, the Sambadrome becomes a dense field of sound, light, and choreography. Each section performs with precision, but the scale of the crowd reminds you that Carnival is a massive, shared event." },
                { type: "header", text: "The Effort Behind the Fantasy" },
                { type: "image", id: "rio3", caption: "What reads as excess is the result of months of work." }, // Float
                { type: "text", text: "Large-scale floats move slowly through the avenue, combining mythology, politics, humour, and craftsmanship. Entire neighbourhoods work for months to create these fleeting moments of perfection." },
                { type: "grid", ids: ["rio4", "rio5"] }, // Hands & Daylight
                { type: "text", text: "Close up, the detail becomes human again — hands raised, figures layered, performers and mechanics working together. Seen in daylight, the structures expose their construction, reminding us that Carnival exists within everyday Rio, not apart from it." }
            ]
        },
        {
            id: "geography",
            title: "A City Pressed to the Mountain",
            coverImage: "rio8", // City Slope
            coverCaption: "Geography here forces the city upward.",
            content: [
                { type: "text", text: "Dense neighbourhoods climb the slopes between forest and sea, filling every available space. Rio’s geography leaves little room for sprawl; instead, it layers daily life vertically." },
                { type: "header", text: "Granite Foundations" },
                { type: "image", id: "rio7", caption: "The landscape isn’t a backdrop — it sets the limits." }, // Granite
                { type: "text", text: "The city wakes beneath massive stone hills as early light skims across bare rock. In Rio, the landscape isn’t a backdrop — it sets the limits and the mood. Daily life adapts to this terrain rather than resisting it." },
                { type: "image", id: "rio6", caption: "Quiet courtyards operate in the shadow of the mountain." } // Parque Lage
            ]
        },
        {
            id: "corcovado",
            title: "Watching from Above",
            coverImage: "rio9", // Christ
            coverCaption: "Distant yet constant.",
            content: [
                { type: "text", text: "Christ the Redeemer stands above the city, distant yet constant. From this height, Rio unfolds as a mix of water, forest, and dense urban movement." },
                { type: "text", text: "Up close, the monument feels heavier and quieter than expected. Weathered stone, passing clouds, and surrounding forest pull attention back to the setting rather than the symbol. It is a human scale within a monumental landscape." },
                { type: "image", id: "rio10", caption: "Weathered stone and passing clouds." } // Human Scale
            ]
        },
        {
            id: "sea",
            title: "Where the City Meets the Sea",
            coverImage: "rio11", // Beach
            coverCaption: "The shoreline isn’t an escape; it’s part of everyday life.",
            content: [
                { type: "text", text: "The beach marks a shift in pace — conversations slow, bodies stretch, and the city exhales. In Rio, the shoreline isn’t an escape; it’s part of everyday life. It is where the density of the city opens up to the horizon." }
            ]
        }
    ];

    const pageBackgroundStyle = {
        backgroundColor: "#84935c", // Deep olive green to match others
        opacity: 1,
    };

    return (
        <div className="min-h-screen transition-colors duration-500" style={pageBackgroundStyle}>
            <SEO
                title="Rio de Janeiro | Nomad Scribbles"
                description="Rio de Janeiro: A city of granite, carnival, and sea, defined by its dramatic geography."
                keywords={["Rio de Janeiro", "Brazil", "Carnival", "Travel Photography", "Christ the Redeemer"]}
            />

            {/* SVG Filter for Torn Paper Effect */}
            <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0">
                <defs>
                    <filter id="torn-paper-filter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
                    </filter>
                </defs>
            </svg>

            {/* Global Background Wrapper */}
            <div className="relative w-full overflow-hidden">

                {/* Back to Brazil Link */}
                <div className="flex justify-center mt-8 mb-2 z-10 relative">
                    <Link to="/brazil" className="text-stone-400 text-sm font-bold tracking-widest uppercase hover:text-[#D4AF37] transition-colors">
                        ← Return to Brazil
                    </Link>
                </div>

                {/* Title Section */}
                <div className="flex justify-center mb-6 px-4 mt-2 relative z-10">
                    <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-[#D4AF37] tracking-tight text-center drop-shadow-sm">Rio de Janeiro</h1>
                </div>

                {/* Hero Image - Rio1 (Selaron) */}
                <div className="w-full max-w-4xl mx-auto px-4 mb-12 flex flex-col items-center relative z-10">
                    <img
                        src="/images/Rio/small/Rio1.webp"
                        alt="Selarón Steps at Night"
                        className="w-full h-auto object-cover rounded-lg shadow-lg mb-2"
                    />
                    <p className="text-sm italic opacity-90 text-center font-medium text-stone-200">The tiled staircase in Lapa fills after dark, drawing locals into a narrow pocket of colour.</p>
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
                                markers={[rioCoords].filter(Boolean)}
                                zoomToId="rio"
                                title="Where is Rio?"
                                geography={rioCoords?.geography}
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
                {/* Small Image (Visible by default) */}
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

export default Rio;
