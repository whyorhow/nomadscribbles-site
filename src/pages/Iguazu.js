import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import artImages from "../assets/artImages.json";
import { fadeScale, staggerContainer } from "../utils/animations";
import ContextMap from "../components/ContextMap";
import destinations from "../assets/destinations.json";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';

function Iguazu({ openLightbox }) {
    const fozCoords = destinations.find(d => d.id === "foz");
    const iguazuImages = artImages.filter(img => img.category === "Iguazu");

    const getImage = (id) => iguazuImages.find(i => i.id === id);

    // Lightbox navigation order
    const imageOrder = [
        "iguazu16", "iguazu1", "iguazu2", "iguazu4", "iguazu3",
        "iguazu6", "iguazu8", "iguazu5",
        "iguazu9", "iguazu7", "iguazu10",
        "iguazu12", "iguazu13", "iguazu17", "iguazu18",
        "iguazu11", "iguazu14", "iguazu15"
    ];
    const sortedImages = imageOrder.map(id => iguazuImages.find(img => img.id === id)).filter(Boolean);

    const handleImageClick = (imageId) => {
        const index = sortedImages.findIndex(img => img.id === imageId);
        if (index !== -1) {
            openLightbox(index, sortedImages);
        }
    };

    // Hero Interaction State
    const [isHeroExpanded, setIsHeroExpanded] = useState(false);
    const heroRef = useRef(null);

    // Auto-collapse hero when scrolled out of view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting && isHeroExpanded) {
                    setIsHeroExpanded(false);
                }
            },
            { threshold: 0.1 }
        );

        if (heroRef.current) observer.observe(heroRef.current);
        return () => observer.disconnect();
    }, [isHeroExpanded]);

    const handleHeroClick = () => {
        if (!isHeroExpanded) {
            setIsHeroExpanded(true);
        } else {
            handleImageClick("iguazu16");
        }
    };

    const spreadBackgroundStyle = {
        backgroundImage: `url(${paperTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "url(#torn-paper-filter)",
        opacity: 0.95,
    };

    const pageBackgroundStyle = {
        backgroundColor: "#064e3b", // Deep emerald green
        minHeight: "100vh"
    };

    const sections = [
        {
            id: "buildup",
            title: "The Build-Up",
            subtitle: "Views from above, through the trees",
            expandedBg: "bg-stone-900/60",
            preview: [
                { type: "grid", ids: ["iguazu1", "iguazu2"], scales: [1, 0.5] },
                { type: "text", text: "Long before you see the water, you hear it.\n\nAt first it’s distant, almost atmospheric — a low, continuous presence that sits beneath the forest sounds. The path moves through dense greenery, opening and closing again, offering brief glimpses of river far below. From above, Iguazu feels wide rather than tall, the water spreading out in multiple directions, broken by islands of rock and vegetation.\n\nThe noise grows gradually, building with each step. It doesn’t rise and fall — it accumulates." }
            ],
            content: [
                { type: "image", id: "iguazu4", caption: "Water and forest on a scale that’s difficult to absorb all at once.", scale: 0.5 },
                { type: "image", id: "iguazu3", caption: "Iguazu reveals itself gradually, never all at once.", scale: 0.5 }
            ]
        },
        {
            id: "impact",
            title: "The Impact",
            subtitle: "Noise, proximity, overload",
            expandedBg: "bg-black/40",
            preview: [
                { type: "image", id: "iguazu6", caption: "Up close, Iguazu is overwhelming.", fullWidth: true },
                { type: "text", text: "Up close, Iguazu is overwhelming.\n\nThe sound becomes physical — a deep, relentless roar that presses into your chest and flattens conversation into gestures and half-smiles. Water crashes past at eye level, folding over itself again and again, throwing spray into the air so thick it feels like rain. The ground vibrates underfoot. Everything else recedes." }
            ],
            content: [
                { type: "image", id: "iguazu8", caption: "This isn’t a single waterfall. It’s a system repeating itself across a vast arc of rock.", fullWidth: true },
                { type: "image", id: "iguazu5", caption: "Spray hangs in the air, catching the light." }
            ]
        },
        {
            id: "distance",
            title: "Distance and Life",
            subtitle: "Perspectives from the triple frontier",
            expandedBg: "bg-stone-900/60",
            preview: [
                { type: "image", id: "iguazu9", caption: "Crossing to the Argentinian side, the tone changes.", fullWidth: true },
                { type: "text", text: "Crossing to the Argentinian side, the tone changes.\n\nThe falls are still vast, still loud, but they feel more distant, framed by forest and open sky. From here, Iguazu reveals its full width and the way it spills across borders without regard for them. Brazil and Argentina sit neatly marked on signs and platforms, while the river continues uninterrupted below." }
            ],
            content: [
                { type: "grid", ids: ["iguazu7", "iguazu10"] },
                { type: "grid", ids: ["iguazu12", "iguazu13"] },
                { type: "grid", ids: ["iguazu17", "iguazu18"] },
                { type: "text", text: "Away from the main viewpoints, attention shifts. Wildlife appears at the edges — birds in the canopy, coatis along the railings, butterflies pausing wherever the noise briefly softens. Upstream, the river looks almost calm, spreading wide and unhurried, giving no hint of what lies just metres ahead." }
            ]
        },
        {
            id: "closing",
            title: "Closing / Release",
            subtitle: "The lingering memory of scale",
            expandedBg: "bg-black/50",
            preview: [
                { type: "image", id: "iguazu11", caption: "Iguazu doesn’t end with a final image.", fullWidth: true },
                { type: "text", text: "Iguazu doesn’t end with a final image.\n\nIt lingers instead as sound, pressure, and memory — the sense of having stood briefly inside something too large to fully absorb. Whether you arrive knowing only its reputation, or return already familiar with its force, the experience resists simplification." }
            ],
            content: [
                { type: "grid", ids: ["iguazu14", "iguazu15"] },
                { type: "quote", text: "This is a place people come to witness. What stays with you is how completely it surrounds you while you’re there." }
            ]
        }
    ];

    return (
        <div style={pageBackgroundStyle} className="text-stone-200 font-serif">
            <SEO
                title="Foz do Iguaçu | Nomad Scribbles"
                description="Iguazu is a landscape of falling water and dense subtropical forest, where the river ignores borders and life thrives in the spray."
                keywords={["Iguazu Falls", "Foz do Iguaçu", "Brazil Nature", "Wildlife Photography", "Paraná"]}
            />

            <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0">
                <defs>
                    <filter id="torn-paper-filter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
                    </filter>
                </defs>
            </svg>

            {/* Title Section */}
            <div className="flex justify-center mb-6 px-4 mt-8 relative z-10">
                <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-[#D4AF37] tracking-tight text-center drop-shadow-sm">Iguazu Falls</h1>
            </div>

            {/* HERO SECTION */}
            <div ref={heroRef} className="w-full max-w-7xl mx-auto px-4 mb-24 relative z-10 group">
                <div
                    className={`relative w-full overflow-hidden rounded-xl shadow-md cursor-pointer group-hover:shadow-xl transition-all duration-1000 ease-in-out ${isHeroExpanded ? 'aspect-auto h-auto' : 'aspect-[16/10] md:aspect-[21/9] h-[60vh] md:h-auto'}`}
                    onClick={handleHeroClick}
                >
                    <img
                        src={process.env.PUBLIC_URL + (isHeroExpanded ? "/images/Iguazu/full/Iguazu16.webp" : "/images/Iguazu/small/Iguazu16new.webp")}
                        alt="Iguazu Falls Hero"
                        className={`w-full h-full object-cover transition-transform duration-1000 ease-in-out`}
                    />
                </div>

                <div className="relative md:absolute md:-bottom-10 md:left-12 lg:left-20 w-full md:max-w-xl bg-stone-900/40 backdrop-blur-md p-8 md:p-10 shadow-xl rounded-lg border-l-4 border-[#D4AF37]/30 mt-[-2rem] md:mt-0 z-20">
                    <div className="flex items-center gap-3 mb-4 opacity-60">
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4AF37]">Feature</span>
                        <div className="h-[1px] w-12 bg-[#D4AF37]/40"></div>
                        <span className="text-xs font-serif italic text-stone-300/80">Iguazu Falls</span>
                    </div>

                    <div className="text-xl md:text-2xl font-serif text-stone-200/90 leading-relaxed italic">
                        Water and forest on a scale that’s difficult to absorb all at once.
                    </div>
                </div>
            </div>

            {/* Banner Spread with Map */}
            <div className="relative w-full mb-16 overflow-hidden">
                <div
                    className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[110vw] pointer-events-none z-0"
                    style={spreadBackgroundStyle}
                />
                <div className="relative z-20 max-w-5xl mx-auto px-4 pt-8 pb-8 flex flex-col items-center">
                    <div className="w-full max-w-4xl overflow-visible">
                        <ContextMap
                            markers={[fozCoords].filter(Boolean)}
                            zoomToId="foz"
                            title="Where is Foz do Iguaçu?"
                            geography={fozCoords?.geography}
                            transparent={true}
                        />
                    </div>
                </div>
            </div>

            <main className="max-w-screen-xl mx-auto px-4 pb-24 space-y-24 flex flex-col items-center">
                {sections.map((section) => (
                    <StoryCard
                        key={section.id}
                        section={section}
                        getImage={getImage}
                        handleImageClick={handleImageClick}
                    />
                ))}

                <div className="w-full flex flex-col items-center gap-4 mt-16 mb-8 relative z-10">
                    <Link to="/brazil" className="flex flex-row items-center justify-center text-stone-300 hover:text-white transition-colors drop-shadow-md bg-stone-950/50 backdrop-blur-md rounded-full px-6 py-2 border border-white/10 shadow-lg hover:bg-stone-900/60 w-fit">
                        <span className="text-xl mr-3 pb-1">←</span>
                        <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Return to Brazil</span>
                    </Link>
                    <Link to="/brazil/rio" className="flex flex-row items-center justify-center text-[#eeda8d] hover:text-white transition-colors drop-shadow-sm bg-[#ceb752]/30 backdrop-blur-md rounded-full px-6 py-2 border border-[#ceb752]/60 shadow-md hover:bg-[#ceb752]/40 w-fit">
                        <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Next: Rio de Janeiro</span>
                        <span className="text-xl ml-3 pb-1">→</span>
                    </Link>
                </div>
            </main>
        </div>
    );
}

// Interactive Section Component
function StoryCard({ section, getImage, handleImageClick }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const activeBg = section.expandedBg || "bg-stone-900/60";

    const renderContent = (items, isPreview = false) => {
        return items.map((item, idx) => {
            if (item.type === "text") {
                return (
                    <p key={idx} className={`text-xl leading-relaxed max-w-4xl mx-auto text-stone-300 font-medium whitespace-pre-line ${isPreview ? "text-center mb-8" : "mb-0"}`}>
                        {item.text}
                    </p>
                );
            }
            if (item.type === "image") {
                return (
                    <InteractiveImage
                        key={idx}
                        id={item.id}
                        getImage={getImage}
                        onClick={() => handleImageClick(item.id)}
                        caption={item.caption}
                        fullWidth={item.fullWidth}
                        scale={item.scale || 1}
                    />
                );
            }
            if (item.type === "grid") {
                return (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full items-center">
                        {item.ids.map((id, gridIdx) => (
                            <InteractiveImage
                                key={id}
                                id={id}
                                getImage={getImage}
                                onClick={() => handleImageClick(id)}
                                scale={item.scales ? item.scales[gridIdx] : 1}
                            />
                        ))}
                    </div>
                );
            }
            if (item.type === "quote") {
                return (
                    <div key={idx} className="text-center pt-8">
                        <p className="text-2xl md:text-3xl font-handwriting text-[#D4AF37] max-w-2xl mx-auto leading-relaxed">
                            {item.text}
                        </p>
                    </div>
                );
            }
            return null;
        });
    };

    return (
        <motion.div
            layout
            className={`w-full max-w-6xl bg-stone-900/40 backdrop-blur-md rounded-xl overflow-hidden shadow-lg transition-all duration-500 ${isExpanded ? `shadow-2xl ${activeBg}` : ""}`}
        >
            <div className={`p-6 md:p-10 flex flex-col items-center z-10 transition-colors duration-500`}
                onClick={() => !isExpanded && setIsExpanded(true)}
                style={{ cursor: isExpanded ? "default" : "pointer" }}
            >
                <div className="text-center mb-8">
                    <h2 className={`text-4xl md:text-6xl font-bold font-handwriting drop-shadow-md transition-colors duration-500 ${isExpanded ? "text-stone-100" : "text-[#D4AF37]"}`}>
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <h3 className="text-lg md:text-xl font-light tracking-wide mt-2 text-stone-400">
                            {section.subtitle}
                        </h3>
                    )}
                </div>

                {/* Preview Content - Always visible */}
                <div className="w-full flex flex-col items-center">
                    {renderContent(section.preview, true)}
                </div>

                {/* Explore Trigger - Museum Gallery Label Style (Rio pattern) */}
                {!isExpanded && (
                    <div className="flex flex-col items-center mt-12 w-full">
                        {/* Section Label Box */}
                        <div className="mb-8 p-3 bg-white/5 backdrop-blur-sm border-l border-[#D4AF37]/50 text-center shadow-sm transform transition-all duration-700 hover:scale-105">
                            <h4 className="text-stone-200 text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-1 font-serif">
                                {section.title}
                            </h4>
                            <div className="mx-auto mt-2 w-6 h-[1px] bg-[#D4AF37]/50" />
                        </div>

                        {/* Explore Indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="flex flex-col items-center gap-3"
                        >
                            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-stone-500 font-bold">Explore Section</p>
                            <div className="w-[1px] h-8 bg-gradient-to-b from-stone-500/50 to-transparent"></div>
                        </motion.div>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-12 md:px-16 md:pb-20 space-y-12 flex flex-col items-center">
                            {renderContent(section.content)}

                            {/* Collapse Button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                                className="mt-8 text-xs uppercase tracking-widest opacity-40 hover:opacity-80 transition-opacity font-bold border-t border-stone-500 pt-4 w-32"
                            >
                                Close Section
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Reusable animated image component that expands to /full src
// Forces object-contain for z-images and expanded state
function InteractiveImage({ id, getImage, onClick, caption, fullWidth = false, scale = 1 }) {
    const img = getImage(id);
    if (!img) return null;

    const [isImageExpanded, setIsImageExpanded] = useState(false);
    const containerRef = useRef(null);
    const isZImage = id.endsWith('z') || img.image.includes('z.webp');

    // Auto-collapse image when scrolled out of view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting && isImageExpanded) {
                    setIsImageExpanded(false);
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [isImageExpanded]);

    const handleClick = (e) => {
        e.stopPropagation();
        if (!isImageExpanded) {
            setIsImageExpanded(true);
        } else {
            onClick();
        }
    };

    // Calculate width based on scale and state
    const getWidth = () => {
        if (isImageExpanded || fullWidth) return "100%";
        const baseWidth = isZImage ? 44 : 90;
        return `${baseWidth * scale}%`;
    };

    return (
        <div
            ref={containerRef}
            className={`relative mx-auto transition-all duration-1000 ease-in-out cursor-pointer group my-4 ${fullWidth ? "max-w-none" : "max-w-5xl"}`}
            style={{ width: getWidth() }}
            onClick={handleClick}
        >
            <div className={`relative overflow-hidden transition-all duration-1000 ease-in-out ${isImageExpanded || isZImage ? "aspect-auto" : "aspect-[16/10] md:aspect-[3/2]"}`}>
                {/* Base Small Image - Fades out as High-Res fades in */}
                <img
                    src={process.env.PUBLIC_URL + img.image}
                    alt={img.title}
                    className={`w-full h-auto block transition-all duration-1000 ease-in-out ${isImageExpanded || isZImage ? "object-contain" : "object-cover h-full"} ${isImageExpanded ? "opacity-0" : "opacity-100"}`}
                />

                {/* Overlay High-Res Image - Fades in on expansion */}
                <img
                    src={process.env.PUBLIC_URL + img.lightboxImage}
                    alt={`${img.title} high-res`}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${isImageExpanded ? "opacity-100" : "opacity-0 pointer-events-none"} ${isImageExpanded || isZImage ? "object-contain" : "object-cover"}`}
                />

                {/* Subtle Overlay for small state */}
                <div className={`absolute inset-0 bg-black/5 transition-opacity duration-1000 ${isImageExpanded ? "opacity-0" : "opacity-100 group-hover:opacity-0"}`} />
            </div>

            {/* Label / Caption Container - Below Image like Rio page */}
            {(img.title || caption) && (
                <div className="grid grid-cols-1 grid-rows-1 mt-8 w-full">
                    {/* Museum Gallery Label - Visible when NOT expanded */}
                    <div className={`col-start-1 row-start-1 flex justify-center transition-all duration-1000 ${!isImageExpanded ? "opacity-100 transform translate-y-0" : "opacity-0 pointer-events-none -translate-y-4"}`}>
                        <div className="max-w-[200px] p-3 bg-white/5 backdrop-blur-sm border-l border-[#D4AF37]/50 text-center shadow-sm">
                            <h4 className="text-stone-200 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-1 font-serif">
                                {img.title}
                            </h4>
                            <div className="mx-auto mt-2 w-4 h-[1px] bg-[#D4AF37]/50" />
                        </div>
                    </div>

                    {/* Detailed Caption - Visible when expanded */}
                    {caption && (
                        <div className={`col-start-1 row-start-1 flex justify-center items-start transition-all duration-1000 ${isImageExpanded ? "opacity-100 transform translate-y-0" : "opacity-0 pointer-events-none translate-y-4"}`}>
                            <p className="text-center text-sm md:text-base italic font-medium text-stone-300 max-w-2xl px-4">
                                {caption}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Iguazu;
