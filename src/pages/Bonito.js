import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import artImages from "../assets/artImages.json";
import ContextMap from "../components/ContextMap";
import destinations from "../assets/destinations.json";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';

function Bonito({ openLightbox }) {
    const bonitoCoords = destinations.find(d => d.id === "bonito");
    const bonitoImages = artImages.filter(img => img.category === "Bonito");

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

    // Define the visual order of images for Lightbox navigation
    const imageOrder = [
        "bonito1", "bonito5", "bonito12", "bonito2", "bonito3",
        "bonito4", "bonito6", "bonito8", "bonito7", "bonito9",
        "bonito10", "bonito11", "bonito14", "bonito13"
    ];

    const sortedImages = imageOrder.map(id => bonitoImages.find(img => img.id === id)).filter(Boolean);

    const handleImageClick = (imageId) => {
        const index = sortedImages.findIndex(img => img.id === imageId);
        if (index !== -1) {
            openLightbox(index, sortedImages);
        }
    };

    const getImage = (id) => bonitoImages.find(i => i.id === id);

    const sections = [
        {
            id: "arrival",
            title: "Arrival & Orientation",
            subtitle: "Controlled Perspective",
            expandedBg: "bg-[#262626]/95",
            coverImage: "bonito1",
            coverCaption: "Bonito doesn’t announce itself loudly. There are no sweeping viewpoints or dramatic entrances...",
            content: [
                { type: "text", text: "Bonito doesn’t announce itself loudly. There are no sweeping viewpoints or dramatic entrances, just small signs, dirt roads, and the quiet sense that you’re being allowed into something carefully managed rather than put on display." },
                { type: "text", text: "Places like Rio da Prata set the tone immediately. Entry is controlled, with guides, time slots, and visitor limits that are easy to notice but never heavy-handed. You sense quickly that these systems exist to keep the water as clear as it is, rather than to manage crowds." },
                { type: "image", id: "bonito5", caption: "Beyond the rivers, life continues at an agricultural pace. Horses rest in the shade, fields stretch beside forest edges, and tourism fits around daily routines rather than reshaping them." },
                { type: "text", text: "Bonito doesn’t feel separated from its surroundings. It feels folded into them." },
                { type: "image", id: "bonito12", caption: "Much of the land around Bonito remains privately owned, with conservation managed through cooperation rather than exclusion. Farms, forests, and tourism often share the same ground." }
            ]
        },
        {
            id: "water",
            title: "Water & Clarity",
            subtitle: "Literal Transparency",
            expandedBg: "bg-[#0f172a]/90",
            coverImage: "bonito2",
            coverCaption: "The first glimpse of the water is almost disarming. From the bank, it looks reflective and calm...",
            content: [
                { type: "text", text: "The first glimpse of the water is almost disarming. From the bank, it looks reflective and calm, its surface mirroring trees and sky so cleanly it feels shallow. Then you look down." },
                { type: "image", id: "bonito3", caption: "Fish drift through open water, branches hang suspended in sharp focus, and the riverbed appears as clearly as if the water weren’t there at all." },
                { type: "text", text: "In places, visibility stretches for tens of metres, turning swimming into something closer to hovering." },
                { type: "image", id: "bonito4", caption: "This clarity comes from the limestone landscape around Bonito. Water filters naturally through rock long before it reaches the surface, arriving already stripped of sediment." },
                { type: "text", text: "The effect is immediate and slightly disorienting — you slow down without being told to." },
                { type: "image", id: "bonito6", caption: "Most people drift rather than swim, letting the river carry them. Movement feels softened here, guided as much by instinct as by rules." }
            ]
        },
        {
            id: "forest",
            title: "Forest & Movement",
            subtitle: "Into the Canvas",
            expandedBg: "bg-[#141c14]/95",
            coverImage: "bonito8",
            coverCaption: "Away from the open stretches of river, Bonito unfolds gradually.",
            content: [
                { type: "text", text: "Away from the open stretches of river, Bonito unfolds gradually. Trails follow bends in the water, disappear under tree cover, and reappear at shaded pools where sound and light soften together." },
                { type: "grid", ids: ["bonito7", "bonito9"] },
                { type: "text", text: "Small falls spill gently into pale green basins, barely disturbing the surface. These aren’t moments designed to impress. They work quietly, accumulating rather than announcing themselves." },
                { type: "image", id: "bonito10", caption: "Crossing suspension bridges and forest walkways feels less like observation and more like passage. The canopy closes in, insects replace open water as the dominant sound, and the pace settles into something unhurried." }
            ]
        },
        {
            id: "closing",
            title: "Stillness & Balance",
            subtitle: "Everything in its Place",
            expandedBg: "bg-[#292524]/95",
            coverImage: "bonito11",
            coverCaption: "As the page draws to a close, perspective widens again.",
            content: [
                { type: "text", text: "As the page draws to a close, perspective widens again. Water drops in layers through dense vegetation, light filtered by leaves before it ever reaches the pool below." },
                { type: "image", id: "bonito14", caption: "Looking upward, bamboo and forest rise vertically, enclosing rather than opening the space. The landscape feels contained, held in balance rather than stretched for effect." },
                { type: "image", id: "bonito13" },
                { type: "text", text: "Bonito doesn’t rely on scale or spectacle. What stays with you is how carefully everything seems held in place — water, forest, movement — so nothing needs to compete for attention." },
                { type: "quote", text: "It’s a place that rewards slowness, simply by allowing clarity to remain." }
            ]
        }
    ];

    const pageBackgroundStyle = {
        backgroundColor: "#5c7c93",
        opacity: 1,
    };

    return (
        <div className="relative pt-2">
            <SEO
                title="Bonito | Nomad Scribbles"
                description="Bonito: A hub for ecotourism, famous for its crystal-clear rivers, limestone caves, and the lush Cerrado plateau."
                image="/images/Bonito/Small/Bonito1z.webp"
                slug="/brazil/bonito"
            />

            <svg className="absolute w-0 h-0 invisible" aria-hidden="true" focusable="false">
                <defs>
                    <filter id="torn-paper-filter" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" seed="5" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>

            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={pageBackgroundStyle}
            />

            <h1 className="sr-only">Bonito | Nomad Scribbles</h1>

            <div className="relative z-10">
                <div className="flex justify-center mb-6 px-4 mt-8">
                    <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-[#D4AF37] tracking-tight text-center drop-shadow-sm">Bonito</h1>
                </div>

                {/* Hero Image - Optimized */}
                <div ref={heroRef} className="w-full max-w-7xl mx-auto px-4 mb-24 relative z-10 group">
                    <motion.div
                        layout
                        className={`relative w-full overflow-hidden rounded-xl shadow-md cursor-pointer group-hover:shadow-xl transition-all duration-700 ease-in-out ${isHeroExpanded ? 'aspect-auto' : 'aspect-[16/10] md:aspect-[21/9]'}`}
                        onClick={() => setIsHeroExpanded(!isHeroExpanded)}
                    >
                        <img
                            src={isHeroExpanded ? process.env.PUBLIC_URL + "/images/Bonito/Full/Bonito3.webp" : process.env.PUBLIC_URL + "/images/Bonito/Small/Bonito3new.webp"}
                            alt="Bonito Water Clarity Hero"
                            fetchPriority="high"
                            loading="eager"
                            className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${!isHeroExpanded ? 'transform scale-100 group-hover:scale-105' : ''}`}
                        />

                        {/* Hero Overlay Text */}
                        {!isHeroExpanded && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <h2 className="text-4xl md:text-6xl font-bold font-handwriting text-white drop-shadow-lg mb-2">Bonito</h2>
                                <p className="text-xl md:text-2xl font-serif text-white/90 drop-shadow-md">Water so clear it feels unreal.</p>
                            </div>
                        )}
                    </motion.div>

                    <div className="relative md:absolute md:-bottom-12 md:left-12 lg:left-20 w-full md:max-w-xl bg-[#f5f5f4] p-8 md:p-10 shadow-xl rounded-lg border-t-4 border-[#7dd3fc] mt-[-3rem] md:mt-0 z-20">
                        <div className="flex items-center gap-3 mb-4 opacity-60">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0369a1]">Feature</span>
                            <div className="h-[1px] w-12 bg-stone-400"></div>
                            <span className="text-xs font-serif italic text-stone-500">Mato Grosso do Sul</span>
                        </div>

                        <div className="text-xl md:text-2xl font-serif text-stone-800 leading-relaxed">
                            <span className="text-5xl float-left mr-3 mt-[-10px] font-bold text-[#0369a1] font-handwriting">B</span>
                            <p className="inline">
                                onito doesn’t announce itself loudly. There are no sweeping viewpoints or dramatic entrances, just small signs, dirt roads, and the quiet sense that you’re being allowed into something carefully managed.
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
                                markers={[bonitoCoords].filter(Boolean)}
                                zoomToId="bonito"
                                title="Where is Bonito?"
                                geography={bonitoCoords?.geography}
                                transparent={true}
                            />
                        </div>
                    </div>
                </div>

                <main className="px-2 py-2 max-w-screen-xl mx-auto space-y-8 flex flex-col items-center pb-24">
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
                        <Link to="/brazil/pantanal" className="flex flex-row items-center justify-center text-[#eeda8d] hover:text-white transition-colors drop-shadow-sm bg-[#ceb752]/30 backdrop-blur-md rounded-full px-6 py-2 border border-[#ceb752]/60 shadow-md hover:bg-[#ceb752]/40 w-fit">
                            <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Next: The Pantanal</span>
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
            layout
            ref={containerRef}
            className={`relative max-w-5xl mx-auto transition-all duration-700 ease-in-out my-8 ${visuallyExpanded ? "w-full" : "w-full md:w-1/2"}`}
        >
            <div className="relative w-full">
                <img
                    src={smallSrc}
                    alt={alt}
                    onClick={handleClick}
                    loading="lazy"
                    className={`rounded-sm shadow-sm transition-opacity duration-500 cursor-pointer ${showFullAsDriver ? "absolute inset-0 w-full h-full object-cover opacity-0" : "relative w-full h-auto object-contain z-10"} ${visuallyExpanded && !imgError && !showFullAsDriver ? "opacity-0" : "opacity-100"}`}
                />

                {!imgError && visuallyExpanded && (
                    <img
                        src={fullSrc}
                        alt={alt}
                        onClick={handleClick}
                        onLoad={() => setFullLoaded(true)}
                        onError={() => setImgError(true)}
                        loading="lazy"
                        className={`rounded-sm transition-all duration-700 cursor-pointer ${showFullAsDriver ? "relative w-full h-auto z-20 opacity-100 scale-100" : "absolute inset-0 w-full h-full object-cover z-20 opacity-0 scale-95"} ${visuallyExpanded && !showFullAsDriver ? "opacity-100 scale-100" : ""}`}
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
                                <blockquote key={idx} className="border-l-4 border-gold pl-6 italic my-6 text-xl opacity-90 max-w-2xl text-center text-stone-300">
                                    {item.text}
                                </blockquote>
                            );
                        }
                        return null;
                    })}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default Bonito;
