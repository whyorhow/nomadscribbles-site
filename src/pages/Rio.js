import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import artImages from "../assets/artImages.json";
import ContextMap from "../components/ContextMap";
import destinations from "../assets/destinations.json";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';

function Rio({ openLightbox }) {
    const rioCoords = destinations.find(d => d.id === "rio");
    const rioImages = artImages.filter(img => img.category === "Rio");

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

    const spreadBackgroundStyle = {
        backgroundImage: `url(${paperTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "url(#torn-paper-filter)",
        opacity: 0.95,
    };

    const imageOrder = [
        "rio1", "rio2", "rio3", "rio4", "rio5", "rio6", "rio7", "rio8", "rio9", "rio10", "rio11", "rio12", "rio13", "rio14"
    ];

    const sortedImages = imageOrder.map(id => rioImages.find(img => img.id === id)).filter(Boolean);

    const handleImageClick = (imageId) => {
        const index = sortedImages.findIndex(img => img.id === imageId);
        if (index !== -1) {
            openLightbox(index, sortedImages);
        }
    };

    const getImage = (id) => rioImages.find(i => i.id === id);

    const sections = [
        {
            id: "carnival",
            title: "Spectacle and scale",
            subtitle: "Carnival Works Because Everyone Is Involved",
            expandedBg: "bg-[#262626]/95",
            coverImage: "rio2",
            coverCaption: "Carnival is as much about collective participation as spectacle.",
            content: [
                { type: "text", text: "From above, the Sambadrome compresses into a dense field of sound, light, and choreography. Each section performs with precision, but the scale of the crowd makes it clear that Carnival only works because it is shared. What looks overwhelming from a distance becomes cohesive only through collective effort." },
                { type: "header", text: "The Effort Behind the Fantasy" },
                { type: "image", id: "rio3", caption: "What reads as excess is the result of months of work." },
                { type: "text", text: "Large-scale floats move slowly through the avenue, combining mythology, politics, humour, and craftsmanship. Entire neighbourhoods work for months to create these fleeting moments of perfection, assembled collectively long before they ever reach the avenue." },
                { type: "grid", ids: ["rio4", "rio5"] },
                { type: "text", text: "Close up, the detail becomes human again — hands raised, figures layered, performers and mechanics working side by side. Seen in daylight, the structures expose their construction, reminding us that Carnival exists within everyday Rio, not apart from it, and returns to it once the music fades." }
            ]
        },
        {
            id: "geography",
            title: "Pressed to the Mountain",
            subtitle: "Geography Forces the City Upward",
            expandedBg: "bg-[#1c1917]/95",
            coverImage: "rio8",
            coverCaption: "Geography here forces the city upward.",
            content: [
                { type: "text", text: "Dense neighbourhoods climb the slopes between forest and sea, filling every available space. Rio’s geography leaves little room for sprawl; instead, it layers daily life vertically, compressing homes, streets, and routines against the hills." },
                { type: "header", text: "Granite Foundations" },
                { type: "image", id: "rio7", caption: "The landscape isn’t a backdrop — it sets the limits." },
                { type: "text", text: "The city wakes beneath massive stone hills as early light skims across bare rock. In Rio, the landscape isn’t a backdrop — it sets the limits and the mood. Daily life adapts to this terrain rather than resisting it, shaped by shadow, elevation, and constraint." },
                { type: "image", id: "rio6", caption: "Quiet courtyards operate in the shadow of the mountain." }
            ]
        },
        {
            id: "corcovado",
            title: "Watching from Above",
            subtitle: "A Fixed Point in a Moving City",
            expandedBg: "bg-[#0c0a09]/95",
            coverImage: "rio9",
            coverCaption: "Distant yet constant.",
            content: [
                { type: "text", text: "Christ the Redeemer stands above the city, distant yet constant. From this height, Rio unfolds as a mix of water, forest, and dense urban movement, all held in uneasy balance." },
                { type: "text", text: "Up close, the monument feels heavier and quieter than expected. Weathered stone, passing clouds, and surrounding forest pull attention back to the setting rather than the monument itself. It becomes a human pause within a monumental landscape." },
                { type: "image", id: "rio10", caption: "Weathered stone and passing clouds." }
            ]
        },
        {
            id: "transition_shade",
            type: "transition_image",
            imageId: "rio13",
            caption: "Looking up from beneath a beach umbrella, the world reduces to fabric, tension, and blue. The sun is present but softened, filtered through canvas and salt air, turning heat into something almost gentle."
        },
        {
            id: "sea",
            title: "The City Meets the Sea",
            subtitle: "The Shoreline Isn’t an Escape; It’s Part of Everyday Life",
            expandedBg: "bg-[#0f172a]/95",
            coverImage: "rio14",
            coverCaption: "The shoreline isn’t an escape; it’s part of everyday life.",
            content: [
                { type: "text", text: "The beach marks a shift in pace. Conversations slow. Bodies stretch. The city exhales. In Rio, the shoreline isn’t an escape; it’s where daily life loosens without ever fully stopping, opening outward while still remaining unmistakably urban." },
                { type: "image", id: "rio12", caption: "Nothing here feels precious for long." }
            ]
        }
    ];

    const pageBackgroundStyle = {
        backgroundColor: "#84935c",
        opacity: 1,
    };

    return (
        <div className="transition-colors duration-500" style={pageBackgroundStyle}>
            <SEO
                title="Rio de Janeiro | Nomad Scribbles"
                description="Rio de Janeiro: A city of granite, carnival, and sea, defined by its dramatic geography."
                keywords={["Rio de Janeiro", "Brazil", "Carnival", "Travel Photography", "Christ the Redeemer"]}
            />

            <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0">
                <defs>
                    <filter id="torn-paper-filter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
                    </filter>
                </defs>
            </svg>

            <div className="relative w-full overflow-hidden">
                <div className="flex justify-center mb-6 px-4 mt-8 relative z-10">
                    <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-[#D4AF37] tracking-tight text-center drop-shadow-sm">Rio de Janeiro</h1>
                </div>

                {/* Hero Image - Optimized with Priority Loading */}
                <div ref={heroRef} className="w-full max-w-7xl mx-auto px-4 mb-24 relative z-10 group">
                    <motion.div
                        layout
                        className={`relative w-full overflow-hidden rounded-xl shadow-md cursor-pointer group-hover:shadow-xl transition-all duration-700 ease-in-out ${isHeroExpanded ? 'aspect-auto' : 'aspect-[16/10] md:aspect-[21/9]'}`}
                        onClick={() => setIsHeroExpanded(!isHeroExpanded)}
                    >
                        <img
                            src={isHeroExpanded ? process.env.PUBLIC_URL + "/images/Rio/full/RioW1.webp" : process.env.PUBLIC_URL + "/images/Rio/small/Rio1new.webp"}
                            alt="Selarón Steps at Night"
                            fetchPriority="high" // OPTIMIZATION
                            loading="eager"      // OPTIMIZATION
                            className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${!isHeroExpanded ? 'transform scale-100 group-hover:scale-105' : ''}`}
                        />
                    </motion.div>

                    <div className="relative md:absolute md:-bottom-12 md:left-12 lg:left-20 w-full md:max-w-xl bg-[#f5f5f4] p-8 md:p-10 shadow-xl rounded-lg border-t-4 border-[#e9d5ff] mt-[-3rem] md:mt-0 z-20">
                        <div className="flex items-center gap-3 mb-4 opacity-60">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6b21a8]">Feature</span>
                            <div className="h-[1px] w-12 bg-stone-400"></div>
                            <span className="text-xs font-serif italic text-stone-500">Lapa, Rio de Janeiro</span>
                        </div>

                        <div className="text-xl md:text-2xl font-serif text-stone-800 leading-relaxed">
                            <span className="text-5xl float-left mr-3 mt-[-10px] font-bold text-[#6b21a8] font-handwriting">T</span>
                            <p className="inline">
                                he tiled staircase in Lapa fills after dark, becoming a narrow pocket where movement, noise, and colour gather. That density reminds you that in Rio, public spaces are rarely empty — they are stages for daily life.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative w-full mb-16 overflow-hidden">
                    <div
                        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[110vw] pointer-events-none z-0"
                        style={spreadBackgroundStyle}
                    />

                    <div className="relative z-20 max-w-5xl mx-auto px-4 pt-0 pb-4 md:pt-2 md:pb-8 flex flex-col items-center mt-[-10px]">
                        <div className="w-full max-w-4xl overflow-visible mb-[-10px]">
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

                <main className="px-2 py-2 max-w-screen-xl mx-auto space-y-8 flex flex-col items-center pb-24">
                    {sections.map((section) => {
                        if (section.type === "transition_image") {
                            const img = getImage(section.imageId);
                            if (!img) return null;
                            return (
                                <div key={section.id} className="w-full max-w-6xl py-12">
                                    <RevealImage
                                        smallSrc={process.env.PUBLIC_URL + img.image}
                                        fullSrc={process.env.PUBLIC_URL + img.lightboxImage}
                                        alt={img.title}
                                        caption={section.caption}
                                        title={img.title}
                                        onClick={() => handleImageClick(section.imageId)}
                                        expanded={true}
                                        autoCollapse={false}
                                    />
                                </div>
                            );
                        }
                        return (
                            <StoryCard
                                key={section.id}
                                section={section}
                                getImage={getImage}
                                handleImageClick={handleImageClick}
                            />
                        );
                    })}

                    <div className="w-full flex flex-col items-center gap-4 mt-16 mb-8 relative z-10">
                        <Link to="/brazil" className="flex flex-row items-center justify-center text-stone-300 hover:text-white transition-colors drop-shadow-md bg-stone-950/50 backdrop-blur-md rounded-full px-6 py-2 border border-white/10 shadow-lg hover:bg-stone-900/60 w-fit">
                            <span className="text-xl mr-3 pb-1">←</span>
                            <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Return to Brazil</span>
                        </Link>
                        <Link to="/brazil/salvador" className="flex flex-row items-center justify-center text-[#eeda8d] hover:text-white transition-colors drop-shadow-sm bg-[#ceb752]/30 backdrop-blur-md rounded-full px-6 py-2 border border-[#ceb752]/60 shadow-md hover:bg-[#ceb752]/40 w-fit">
                            <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Next: Salvador</span>
                            <span className="text-xl ml-3 pb-1">→</span>
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
}

// Optimized Reusable Image Component
function RevealImage({ smallSrc, fullSrc, alt, onClick, caption, expanded, onToggle, autoCollapse, title }) {
    const isControlled = expanded !== undefined;
    const [visuallyExpanded, setVisuallyExpanded] = useState(isControlled ? expanded : false);
    const [imgError, setImgError] = useState(false);
    const [fullLoaded, setFullLoaded] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        if (isControlled) {
            setVisuallyExpanded(expanded);
        }
    }, [expanded, isControlled]);

    const shouldAutoCollapse = autoCollapse !== undefined ? autoCollapse : true;

    useEffect(() => {
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

    const showFullAsDriver = visuallyExpanded && fullLoaded && !imgError;

    return (
        <motion.div
            layout // Smooth transition for width change
            ref={containerRef}
            className={`relative max-w-5xl mx-auto cursor-pointer my-8 ${visuallyExpanded ? "w-full" : "w-full md:w-1/2"}`}
        >
            <div className="relative w-full">
                {/* Small Image - Always visible initially */}
                <img
                    src={smallSrc}
                    alt={alt}
                    onClick={handleClick}
                    loading="lazy" // OPTIMIZATION
                    className={`rounded-sm shadow-sm transition-all duration-500 ${showFullAsDriver ? "absolute inset-0 w-full h-full object-cover opacity-0" : "relative w-full h-auto object-contain z-10"}`}
                />

                {/* High-Res Image - Only rendered if expanded to save bandwidth */}
                {!imgError && visuallyExpanded && (
                    <img
                        src={fullSrc}
                        alt={alt}
                        onClick={handleClick}
                        onLoad={() => setFullLoaded(true)}
                        onError={() => setImgError(true)}
                        className={`rounded-sm transition-all duration-700 ease-out ${showFullAsDriver ? "relative w-full h-auto z-20 opacity-100 scale-100" : "absolute inset-0 w-full h-full object-cover z-20 opacity-0 scale-95"}`}
                        loading="lazy" // OPTIMIZATION
                    />
                )}
            </div>

            {(title || caption) && (
                <div className="grid grid-cols-1 grid-rows-1 mt-8 w-full">
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

                    {caption && (
                        <div className={`col-start-1 row-start-1 flex justify-center items-start transition-opacity duration-500 ${visuallyExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                            <p className="text-center text-sm italic font-medium text-stone-300">
                                {caption}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
}

function StoryCard({ section, getImage, handleImageClick }) {
    const [isExpanded, setIsExpanded] = useState(false);
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

                <RevealImage
                    smallSrc={`${process.env.PUBLIC_URL}${getImage(section.coverImage)?.image}`}
                    fullSrc={`${process.env.PUBLIC_URL}${getImage(section.coverImage)?.lightboxImage}`}
                    alt={section.title}
                    caption={section.coverCaption}
                    title={getImage(section.coverImage)?.title}
                    onClick={() => handleImageClick(section.coverImage)}
                    expanded={isExpanded}
                    onToggle={() => setIsExpanded(!isExpanded)}
                />

                <motion.div
                    initial={{ opacity: 1, height: "auto" }}
                    animate={{ opacity: isExpanded ? 0 : 1, height: isExpanded ? 0 : "auto" }}
                    className="flex flex-col items-center h-8"
                >
                    <p className="text-xs uppercase tracking-widest opacity-50 mt-2 font-semibold text-stone-400">Explore Section</p>
                    <div className="w-px h-4 bg-stone-400/30 mt-1"></div>
                </motion.div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
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
                                                smallSrc={`${process.env.PUBLIC_URL}${img.image}`}
                                                fullSrc={`${process.env.PUBLIC_URL}${img.lightboxImage}`}
                                                alt={img.title || ""}
                                                caption={item.caption}
                                                title={img.title}
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
                                                            smallSrc={`${process.env.PUBLIC_URL}${img.image}`}
                                                            fullSrc={`${process.env.PUBLIC_URL}${img.lightboxImage}`}
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
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default Rio;
