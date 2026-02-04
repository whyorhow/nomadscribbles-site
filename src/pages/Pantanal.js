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
    // --- Section Data Structure ---
    const sections = [
        {
            id: "intro",
            title: "The Pantanal",
            subtitle: "Shaped by Water — Not by Us",
            expandedBg: "bg-[#262626]/95", // Neutral Dark
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
            subtitle: "Seasonal Flooding Reshapes Everything",
            expandedBg: "bg-[#0c4a6e]/95", // Deep Water Blue
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
            subtitle: "Travel Here Is Slower and More Deliberate",
            expandedBg: "bg-[#1c1917]/95", // Warm Dark
            coverImage: "pantanal5",
            coverCaption: "Traces like this often say more about presence than any direct encounter.",
            content: [
                { type: "text", text: "Brazil is vast, varied, and often misrepresented as a single experience. Regions differ as much as countries do in Europe — in climate, culture, pace, and daily life." },
                { type: "text", text: "Travel here tends to be slower and more deliberate. Days are shaped by light, heat, and movement rather than tight schedules. The adjustment for many visitors isn’t about comfort or safety — it’s about learning to observe rather than to rush." }
            ]
        },
        {
            id: "caimans",
            title: "Ancient Survivors",
            subtitle: "Caimans: Quiet Engineers of the Ecosystem",
            expandedBg: "bg-[#1a2e05]/95", // Deep Swamp Green
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
            subtitle: "Macaws and Toucans Are More Than Spectacle",
            expandedBg: "bg-[#3f6212]/95", // Vibrant Green Dark
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
            subtitle: "Shifting Dramatically Between Dust and Flood",
            expandedBg: "bg-[#451a03]/95", // Dry/Muddy Brown Dark
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
            subtitle: "Preserving the Natural Rhythms",
            expandedBg: "bg-[#0f172a]/95", // Neutral Slate
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
        <div className="transition-colors duration-500" style={pageBackgroundStyle}>
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

                    <div className="relative z-20 max-w-5xl mx-auto px-4 pt-0 pb-4 md:pt-2 md:pb-8 flex flex-col items-center mt-[-10px]">
                        <div className="w-full max-w-4xl overflow-visible mb-[-10px]">
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

                    <div className="w-full flex justify-center mt-16 mb-8 relative z-10">
                        <Link to="/brazil" className="flex flex-row items-center justify-center text-[#ceb752] hover:text-[#e8eac7] transition-colors drop-shadow-md bg-stone-900/40 backdrop-blur-md rounded-full px-6 py-2 border border-white/10 shadow-lg hover:bg-stone-900/60">
                            <span className="text-xl mr-3 pb-1">←</span>
                            <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Return to Brazil</span>
                        </Link>
                    </div>
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

    // Sync with controlled prop, but only if the prop changes to TRUE or we are sync
    // We want to allow the prop to stay TRUE (text open) while we visually collapse
    React.useEffect(() => {
        if (isControlled) {
            setVisuallyExpanded(expanded);
        }
    }, [expanded, isControlled]);

    // Auto-collapse logic
    // Default: true for everything (as requested by user)
    const shouldAutoCollapse = autoCollapse !== undefined ? autoCollapse : true;

    React.useEffect(() => {
        if (!shouldAutoCollapse || !visuallyExpanded) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    // Element has left the screen -> Collapse visually
                    setVisuallyExpanded(false);
                    // NOTE: We do NOT call onToggle() here. 
                    // This keeps the text section open (as requested essentially)
                    // but shrinks the image.
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
                // If it looks small, expand it visually
                // If the parent thinks it's already expanded (text open), we just update visual
                setVisuallyExpanded(true);

                // If parent thinks it's NOT expanded, we must tell it to expand
                if (!expanded) {
                    onToggle();
                }
            } else {
                // It is fully expanded visually. 
                // Now we trigger the Lightbox (onClick)
                // We do NOT toggle closed on click anymore (unless it's the only interaction?)
                // Actually, typically clicking an expanded image opens lightbox. 
                // Clicking HEADING toggles section.
                if (onClick) onClick(e);
            }
        } else {
            // Uncontrolled
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
            <div className="relative w-full">
                {/* Small Framed Image (Visible by default, or if full image fails) */}
                <img
                    src={smallSrc}
                    alt={alt}
                    onClick={handleClick}
                    className={`rounded-sm shadow-sm transition-opacity duration-500 cursor-pointer ${showFullAsDriver ? "absolute inset-0 w-full h-full object-cover opacity-0" : "relative w-full h-auto object-contain z-10"} ${visuallyExpanded && !imgError && !showFullAsDriver ? "opacity-0" : "opacity-100"}`}
                />

                {/* High-Res Full Image (Fades in on hover/expand) */}
                {!imgError && (
                    <img
                        src={fullSrc}
                        alt={alt}
                        onClick={handleClick}
                        onLoad={() => setFullLoaded(true)}
                        onError={() => setImgError(true)}
                        className={`rounded-sm transition-all duration-700 cursor-pointer ${showFullAsDriver ? "relative w-full h-auto z-20 opacity-100 scale-100" : "absolute inset-0 w-full h-full object-cover z-20 opacity-0 scale-95"} ${visuallyExpanded && !showFullAsDriver ? "opacity-100 scale-100" : ""}`}
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

                {/* Reused Reveal Animation for Cover */}
                <RevealImage
                    smallSrc={getImage(section.coverImage)?.image}
                    fullSrc={getImage(section.coverImage)?.lightboxImage}
                    alt={section.title}
                    caption={section.coverCaption}
                    title={getImage(section.coverImage)?.title}
                    onClick={() => handleImageClick(section.coverImage)}
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

export default Pantanal;
