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

function Pantanal({ openLightbox }) {
    const pantanalCoords = destinations.find(d => d.id === "pantanal");
    const pantanalImages = artImages.filter(img => img.category === "Pantanal");

    const spreadBackgroundStyle = {
        backgroundImage: `url(${paperTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "url(#torn-paper-filter)",
        opacity: 0.95,
    };

    // Define the visual order of images for Lightbox navigation
    const imageOrder = [
        "pantanal1", "pantanal2", "pantanal3", "pantanal4", "pantanal5", "pantanal6", "pantanal7"
    ];

    // Derived list of images sorted by their appearance
    const sortedImages = imageOrder.map(id => pantanalImages.find(img => img.id === id)).filter(Boolean);

    // Helper to open lightbox with correct index
    const handleImageClick = (imageId) => {
        const index = sortedImages.findIndex(img => img.id === imageId);
        if (index !== -1) {
            openLightbox(index, sortedImages);
        }
    };

    const getImage = (id) => pantanalImages.find(i => i.id === id);

    // --- Section Data Structure ---
    const sections = [
        {
            id: "intro",
            title: "The Pantanal Is Shaped by Water — Not by Us",
            coverImage: "pantanal6",
            coverCaption: "As the sun drops, water reflects light and cloud in equal measure.",
            content: [
                { type: "text", text: "The Pantanal is one of the largest tropical wetlands on Earth, stretching across Brazil, Bolivia, and Paraguay. Unlike places defined by roads, borders, or permanent landmarks, this landscape is governed almost entirely by water." },
                { type: "text", text: "Seasonal flooding reshapes everything. Grasslands turn into shallow lakes, rivers spill into forests, and familiar paths vanish for months at a time. Life here is built around movement and return. The land doesn’t settle — it breathes." }
            ]
        },
        {
            id: "flooding",
            title: "Water That Moves the World",
            coverImage: "pantanal1",
            coverCaption: "A caiman pauses where water meets land.",
            content: [
                { type: "text", text: "What you experience in the Pantanal depends entirely on when you arrive. During the dry season, animals gather around shrinking water sources. When the rains return, the land opens outward and life disperses. There is no single, fixed version of this place." },
                { type: "header", text: "Pantanal and Amazon: Different Kinds of Wild" },
                { type: "text", text: "The Pantanal is often mentioned alongside the Amazon, but the experience of each is very different." },
                { type: "text", text: "The Amazon is dense and vertical. Much of its life is hidden within layers of forest, and encounters are often brief or indirect. Travel there tends to focus on immersion — being surrounded by vastness, humidity, and sound." },
                { type: "text", text: "The Pantanal is open and horizontal. Seasonal flooding spreads water across plains, creating long sightlines and clear edges between land and water. Wildlife is easier to observe not because it is tamer, but because the landscape offers fewer places to disappear." },
                { type: "text", text: "Neither is better. They simply ask for different kinds of attention." }
            ]
        },
        {
            id: "brazil-context",
            title: "If You’ve Never Been to Brazil",
            coverImage: "pantanal5",
            coverCaption: "Traces like this often say more about presence than any direct encounter.",
            content: [
                { type: "text", text: "Brazil is vast, varied, and often misrepresented as a single experience. Regions differ as much as countries do in Europe — in climate, culture, pace, and daily life." },
                { type: "text", text: "Travel here tends to be slower and more deliberate. Days are shaped by light, heat, and movement rather than tight schedules. The adjustment for many visitors isn’t about comfort or safety — it’s about learning to observe rather than to rush." }
            ]
        },
        {
            id: "caimans",
            title: "Caimans: Ancient Survivors",
            coverImage: "pantanal4", // Still Water/Caiman
            coverCaption: "Much of the Pantanal’s activity unfolds slowly.",
            content: [
                { type: "text", text: "Caimans are among the Pantanal’s most recognisable residents, descendants of lineages that have survived millions of years of environmental change. Perfectly adapted to wetland life, they are both predators and quiet engineers of the ecosystem." },
                { type: "text", text: "Their movement through shallow water creates channels used by fish, birds, and smaller animals. Often still and watchful, they reflect the rhythm of the Pantanal itself. Survival here depends less on speed than on balance." }
            ]
        },
        {
            id: "canopy",
            title: "Voices of the Canopy",
            coverImage: "pantanal2", // Macaw
            coverCaption: "Sightings here feel incidental rather than orchestrated.",
            content: [
                { type: "text", text: "Macaws and toucans bring colour and sound to the Pantanal’s upper layers, but their role goes far beyond spectacle. Feeding on fruit across wide distances, they disperse seeds that help regenerate forests after floods or fires." },
                { type: "image", id: "pantanal3", caption: "Elevation offers perspective as much as safety." }, // Toucan
                { type: "text", text: "In a landscape where water and foliage blur visibility, sound becomes a way of mapping space. Calls carry presence, warning, and territory — reminders that not everything here is meant to be seen." }
            ]
        },
        {
            id: "seasons",
            title: "A Wetland of Extremes",
            coverImage: "pantanal6",
            coverCaption: "Evening arrives gently here, without urgency or spectacle.",
            content: [
                { type: "text", text: "The Pantanal shifts dramatically between seasons. During the dry months, animals gather around limited water sources, creating dense pockets of life where predator and prey exist side by side." },
                { type: "text", text: "When the rains return, competition eases. Water spreads outward, animals disperse, and the landscape resets. These cycles have repeated for centuries, shaping behaviour, movement, and even the timing of birth and growth." }
            ]
        },
        {
            id: "balance",
            title: "A Delicate Balance",
            coverImage: "pantanal7",
            coverCaption: "The Pantanal briefly holds still.",
            content: [
                { type: "text", text: "Despite its vastness, the Pantanal is fragile. Fires, deforestation, and changes to upstream rivers threaten the flooding cycles that sustain everything here. Because water connects the entire region, disruption in one area can ripple across hundreds of kilometres." },
                { type: "text", text: "Conservation in the Pantanal isn’t about freezing it in time. It’s about allowing its natural rhythms — rise, retreat, return — to continue uninterrupted." }
            ]
        }
    ];

    const pageBackgroundStyle = {
        backgroundColor: "#84935c", // Deep olive green to match Florianopolis
        opacity: 1,
    };

    return (
        <div className="min-h-screen transition-colors duration-500" style={pageBackgroundStyle}>
            <SEO
                title="Pantanal | Nomad Scribbles"
                description="The Pantanal is one of the largest tropical wetlands on Earth, governed almost entirely by water and seasonal rhythms."
                keywords={["Pantanal", "Brazil Wetlands", "Wildlife", "Travel Brazil", "Nature Photography"]}
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

                {/* Title Section */}
                <div className="flex justify-center mb-6 px-4 mt-8 relative z-10">
                    <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-[#D4AF37] tracking-tight text-center drop-shadow-sm">The Pantanal</h1>
                </div>

                {/* Feature Image */}
                <div className="w-full max-w-4xl mx-auto px-4 mb-12 flex flex-col items-center relative z-10">
                    <img
                        src="/images/Pantanal/small/Pantanal7.webp"
                        alt="Palms After Rain"
                        className="w-full h-auto object-cover rounded-lg shadow-lg mb-2"
                    />
                    <p className="text-sm italic opacity-90 text-center font-medium text-stone-200">Palm trees stand against a clearing sky, framed by open grass and distant cloud.</p>
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
                                markers={[pantanalCoords].filter(Boolean)}
                                zoomToId="pantanal"
                                title="Where is the Pantanal?"
                                geography={pantanalCoords?.geography}
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
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            layout
            className={`w-full max-w-6xl bg-stone-900/50 backdrop-blur-md rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 ${isExpanded ? "shadow-2xl bg-stone-900/80" : ""}`}
            onClick={() => setIsExpanded(!isExpanded)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {/* Header / Cover State */}
            <div className="relative p-6 md:p-10 flex flex-col items-center z-10">
                <h2 className={`text-4xl md:text-6xl font-bold font-handwriting mb-8 text-center drop-shadow-md transition-colors duration-500 ${isExpanded ? "text-stone-100" : "text-[#D4AF37]"}`}>
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
                    animate={{ opacity: isExpanded ? 0 : 1, height: isExpanded ? 0 : "auto" }}
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
                    opacity: isExpanded ? 1 : 0,
                    height: isExpanded ? "auto" : 0
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

export default Pantanal;
