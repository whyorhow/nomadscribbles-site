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

function Salvador({ openLightbox }) {
    const salvadorCoords = destinations.find(d => d.id === "salvador");
    const salvadorImages = artImages.filter(img => img.category === "Salvador");

    const spreadBackgroundStyle = {
        backgroundImage: `url(${paperTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "url(#torn-paper-filter)",
        opacity: 0.95,
    };

    // Define the visual order of images for Lightbox navigation
    const imageOrder = [
        "salvador1", "salvador2", "salvador13", "salvador19",
        "salvador10", "salvador12",
        "salvador11", "salvador6", "salvador3",
        "salvador13", "salvador14", "salvador7",
        "salvador9", "salvador17", "salvador19",
        "salvador8", "salvador15", "salvador21",
        "salvador22"
    ];

    // Derived list of images sorted by their appearance
    const sortedImages = imageOrder.map(id => salvadorImages.find(img => img.id === id)).filter(Boolean);

    // Helper to open lightbox with correct index
    const handleImageClick = (imageId) => {
        const index = sortedImages.findIndex(img => img.id === imageId);
        if (index !== -1) {
            openLightbox(index, sortedImages);
        }
    };

    const getImage = (id) => salvadorImages.find(i => i.id === id);

    // --- Section Data Structure ---
    const sections = [
        {
            id: "intro",
            title: "Salvador Is a City That Meets You Head-On",
            subtitle: "Salvador doesn’t ease you in.",
            expandedBg: "bg-[#262626]/95", // Neutral Dark
            coverImage: "salvador2", // Pelourinho
            coverCaption: "Much of what defines Salvador today is designed to be encountered.",
            content: [
                { type: "text", text: "Salvador announces itself immediately — through colour, sound, movement, and ritual. This is one of Brazil’s most historically layered cities, and it doesn’t hide that history behind distance or subtlety." },
                { type: "text", text: "Much of what defines Salvador today is designed to be encountered. The streets invite observation. The food is offered openly. Music spills outward. Tradition is worn, carried, and performed in public space." },
                { type: "grid", ids: ["salvador1", "salvador2"] }, // Streets & Pelourinho
                { type: "text", text: "This isn’t a city that pretends not to be watched — it has learned how to meet attention directly." }
            ]
        },
        {
            id: "history",
            title: "History That Stays Visible",
            subtitle: "The Past Here Isn’t Separated from Daily Use",
            expandedBg: "bg-[#1c1917]/95", // Warm Stone Dark
            coverImage: "salvador10", // Upper Levels
            coverCaption: "History doesn’t unfold chronologically. It stacks.",
            content: [
                { type: "text", text: "Salvador’s historic centre isn’t preserved behind glass. Colonial buildings are still walked past, leaned against, adapted, and repainted. Churches sit beside homes, museums beside markets. The past here isn’t separated from daily use." },
                { type: "text", text: "The city’s elevation shapes how it’s experienced. Streets rise and fall sharply, revealing new views in fragments — ocean glimpses, rooftops, courtyards, towers." },
                { type: "image", id: "salvador12", caption: "An alleyway narrows the city to footsteps and echoes." }, // Between Walls
                { type: "text", text: "History doesn’t unfold chronologically. It stacks." }
            ]
        },
        {
            id: "ritual",
            title: "Ritual in Public Space",
            subtitle: "Observation Is Part of the Exchange",
            expandedBg: "bg-[#0f172a]/90", // Deep Blue
            coverImage: "salvador11", // Baiana
            coverCaption: "These aren’t private customs briefly revealed. They are public rituals.",
            content: [
                { type: "text", text: "Many of Salvador’s most recognisable traditions exist where visitors can see them — and that visibility is intentional. Baianas in traditional dress offer food shaped by religious and cultural practice. Coloured ribbons collect wishes without explanation. Music and dance move through streets without requiring a ticket." },
                { type: "text", text: "These aren’t private customs briefly revealed. They are public rituals that continue regardless of who is watching." },
                { type: "grid", ids: ["salvador6", "salvador3"] }, // Promises Tied & Street Rhythm
                { type: "text", text: "Observation is part of the exchange." }
            ]
        },
        {
            id: "performance",
            title: "Performance Without Illusion",
            subtitle: "The Spectacle Is Real, But It Doesn’t Pretend to Be Effortless",
            expandedBg: "bg-[#27272a]/95", // Zinc Dark
            coverImage: "salvador13", // The Contest
            coverCaption: "Performers move with intent — not to impress, but to hold rhythm.",
            content: [
                { type: "text", text: "Salvador’s relationship with performance is unusually direct. Dance, music, and Carnival are not presented as spontaneous miracles, but as practiced, physical disciplines shaped by repetition and strength." },
                { type: "text", text: "In theatres and open spaces, performers move with intent — not to impress, but to hold rhythm, timing, and presence." },
                { type: "grid", ids: ["salvador14", "salvador7"] }, // The Ensemble & Carnival Archive
                { type: "text", text: "The spectacle is real, but it doesn’t pretend to be effortless." }
            ]
        },
        {
            id: "rest",
            title: "The City at Rest",
            subtitle: "Part of How the City Balances Itself",
            expandedBg: "bg-[#84935c]/95", // Olive/Greenish (using page bg tone but darker overlay)
            coverImage: "salvador9", // Atlantic Edge
            coverCaption: "The coastline opens outward. The city loosens its grip.",
            content: [
                { type: "text", text: "Away from the density of the historic centre, the pace shifts. The coastline opens outward. The city loosens its grip. Boats drift just offshore, beaches fill gradually, shade structures appear and disappear with the sun." },
                { type: "grid", ids: ["salvador17", "salvador19"] }, // Open Water & Palm Shade
                { type: "text", text: "This isn’t escape from Salvador — it’s part of how the city balances itself." }
            ]
        },
        {
            id: "evening",
            title: "Evening Layers",
            subtitle: "The City Reveals Itself in Fragments Again",
            expandedBg: "bg-[#0c0a09]/95", // Black Stone
            coverImage: "salvador8", // Rooftop Pause
            coverCaption: "As daylight fades, Salvador doesn’t quieten — it rearranges.",
            content: [
                { type: "text", text: "As daylight fades, Salvador doesn’t quieten — it rearranges. Buildings hold colour after dark. Light becomes uneven. Rooftops offer distance from the street below. The city reveals itself in fragments again, slower this time." },
                { type: "grid", ids: ["salvador15", "salvador21"] } // Lighthouse & Night Facades
            ]
        },
        {
            id: "closing",
            title: "What Salvador Offers",
            subtitle: "A Place to Pay Attention",
            expandedBg: "bg-[#141c14]/95", // Deep Greenish
            coverImage: "salvador22", // Departure
            coverCaption: "Much of what defines the city is meant to be shared openly.",
            content: [
                { type: "text", text: "Salvador is well suited to travellers who want to engage directly with Brazil’s visible culture — music, food, ceremony, history — without needing to decode it first. Much of what defines the city is meant to be shared openly." },
                { type: "text", text: "It may feel intense, layered, and busy. That’s not a flaw — it’s the point." },
                { type: "text", text: "This isn’t a place to disappear into. It’s a place to pay attention." }
            ]
        }
    ];

    const pageBackgroundStyle = {
        backgroundColor: "#84935c", // Deep olive green to match others
        opacity: 1,
    };

    return (
        <div className="relative min-h-screen pt-2">
            {/* SEO */}
            <SEO
                title="Salvador | Nomad Scribbles"
                description="Salvador: A city where history does not recede into the background — it moves, sings, resists, and remembers."
                image="/images/Salvador/small/Salvador1.webp" // Using Hero image for SEO
                slug="/brazil/salvador"
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
            <h1 className="sr-only">Salvador | Nomad Scribbles</h1>

            {/* Content Wrapper to ensure z-index above background */}
            <div className="relative z-10">

                {/* Title Section */}
                <div className="flex justify-center mb-6 px-4 mt-8">
                    <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-[#D4AF37] tracking-tight text-center drop-shadow-sm">Salvador</h1>
                </div>

                {/* Feature Image */}
                <div className="w-full max-w-4xl mx-auto px-4 mb-12 flex flex-col items-center">
                    <img
                        src="/images/Salvador/small/Salvador1.webp"
                        alt="Colour gathers quickly in Salvador"
                        className="w-full h-auto object-cover rounded-lg shadow-lg mb-2"
                    />
                    <p className="text-sm italic opacity-90 text-center font-medium text-stone-200">Colour gathers quickly in Salvador. Streets, walls, clothing, music — nothing stays neutral for long.</p>
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
                                markers={[salvadorCoords].filter(Boolean)}
                                zoomToId="salvador"
                                title="Where is Salvador?"
                                geography={salvadorCoords?.geography}
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
function RevealImage({ smallSrc, fullSrc, alt, onClick, caption, expanded, onToggle, autoCollapse, title }) {
    // Determine if we are controlled or uncontrolled
    const isControlled = expanded !== undefined;

    // Internal state for "uncontrolled" usage OR for visual overrides (auto-collapse)
    // We initialize based on the prop if valid
    const [visuallyExpanded, setVisuallyExpanded] = useState(isControlled ? expanded : false);
    const [imgError, setImgError] = useState(false);
    const [fullLoaded, setFullLoaded] = useState(false);
    const containerRef = React.useRef(null);

    // Sync with controlled prop
    React.useEffect(() => {
        if (isControlled) {
            setVisuallyExpanded(expanded);
        }
    }, [expanded, isControlled]);

    // Auto-collapse logic
    const shouldAutoCollapse = autoCollapse !== undefined ? autoCollapse : true;

    React.useEffect(() => {
        if (!shouldAutoCollapse || !visuallyExpanded) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    setVisuallyExpanded(false);
                }
            },
            { threshold: 0 }
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [shouldAutoCollapse, visuallyExpanded]);

    const handleClick = (e) => {
        e.stopPropagation();

        if (isControlled && onToggle) {
            if (!visuallyExpanded) {
                setVisuallyExpanded(true);
                if (!expanded) onToggle();
            } else {
                if (onClick) onClick(e);
            }
        } else {
            if (!visuallyExpanded) {
                setVisuallyExpanded(true);
            } else {
                if (onClick) onClick(e);
            }
        }
    };

    // Determine which image drives the layout
    // If expanded and full image is loaded, it becomes the relative one (driver)
    const showFullAsDriver = visuallyExpanded && fullLoaded && !imgError;

    return (
        <div
            ref={containerRef}
            className={`relative max-w-5xl mx-auto transition-all duration-700 ease-in-out my-8 ${visuallyExpanded ? "w-full" : "w-full md:w-1/2"}`}
        >
            <div className="relative w-full group">
                {/* Small Framed Image */}
                <img
                    src={smallSrc}
                    alt={alt}
                    onClick={handleClick}
                    className={`rounded-sm shadow-sm transition-opacity duration-500 cursor-pointer ${showFullAsDriver ? "absolute inset-0 w-full h-full object-cover opacity-0" : "relative w-full h-auto object-contain z-10"} ${visuallyExpanded && !imgError && !showFullAsDriver ? "opacity-0" : "opacity-100"}`}
                />

                {/* High-Res Full Image */}
                {!imgError && (
                    <img
                        src={fullSrc}
                        alt={alt}
                        onClick={handleClick}
                        onLoad={() => setFullLoaded(true)}
                        onError={() => setImgError(true)}
                        className={`rounded-sm transition-opacity duration-700 cursor-pointer ${showFullAsDriver ? "relative w-full h-auto z-20 opacity-100" : "absolute inset-0 w-full h-full object-cover z-20 opacity-0"} ${visuallyExpanded && !showFullAsDriver ? "opacity-100" : ""}`}
                        loading="lazy"
                    />
                )}
            </div>

            {/* Label / Caption Container - Grid Stack to ensure height adapts to tallest element */}
            {(title || caption) && (
                <div className="grid grid-cols-1 grid-rows-1 mt-8 w-full">
                    {/* Gallery Label (Title) - Visible when NOT expanded */}
                    {title && (
                        <div
                            className={`col-start-1 row-start-1 flex justify-center transition-opacity duration-500 z-10 ${!visuallyExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                        >
                            <div className="max-w-[200px] p-3 bg-white/5 backdrop-blur-sm border-l border-[#eeda8d]/50 text-center shadow-sm">
                                <h4 className="text-stone-200 text-xs font-bold uppercase tracking-widest mb-1 font-cormorant">
                                    {title}
                                </h4>
                                <div className="mx-auto mt-2 w-4 h-[1px] bg-[#eeda8d]/50" />
                            </div>
                        </div>
                    )}

                    {/* Caption - Visible when expanded */}
                    {caption && (
                        <div className={`col-start-1 row-start-1 flex justify-center items-start transition-opacity duration-500 ${visuallyExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                            <p className="text-center text-sm italic font-medium text-stone-300">
                                {caption}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function StoryCard({ section, getImage, handleImageClick }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Default to stone-900/80 if not specified
    const activeBg = section.expandedBg || "bg-stone-900/80";

    return (
        <motion.div
            layout
            className={`w-full max-w-6xl bg-stone-900/50 backdrop-blur-md rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500 ${isExpanded ? `shadow-2xl ${activeBg}` : ""}`}
            onClick={() => setIsExpanded(!isExpanded)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {/* Header / Cover State */}
            <div className="relative p-6 md:p-10 flex flex-col items-center z-10">
                <div className="text-center mb-8">
                    <h2 className={`text-4xl md:text-6xl font-bold font-handwriting drop-shadow-md transition-colors duration-500 ${isExpanded ? "text-stone-100" : "text-[#D4AF37]"}`}>
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <h3 className={`text-lg md:text-xl font-light tracking-wide mt-2 transition-colors duration-500 ${isExpanded ? "text-stone-300" : "text-stone-300"}`}>
                            {section.subtitle}
                        </h3>
                    )}
                </div>

                {/* Reused Reveal Image for Cover - CONTROLLED now */}
                <RevealImage
                    smallSrc={getImage(section.coverImage)?.image}
                    fullSrc={getImage(section.coverImage)?.lightboxImage}
                    alt={section.title}
                    caption={section.coverCaption}
                    title={getImage(section.coverImage)?.title}
                    onClick={() => handleImageClick(section.coverImage)} // This triggers lightbox
                    expanded={isExpanded}
                    onToggle={() => setIsExpanded(!isExpanded)}
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
                                        title={img.title}
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
                                                    title={img.title}
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

export default Salvador;
