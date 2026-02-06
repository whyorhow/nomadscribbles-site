import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";

// Gallery Data
const heroSection = {
  id: "gallery1",
  title: "Art Galleries",
  text: "In São Paulo, galleries are places people return to rather than pass through. They sit inside the city’s noise and movement, offering rooms where attention slows and perspective shifts. For many residents, these spaces aren’t about spectacle — they’re about pause, reflection, and the quiet habit of looking closely.",
  imageSmall: "/images/ArtGallery/small/ArtGallery1new.webp",
  imageFull: "/images/ArtGallery/full/ArtGallery1.jpg",
};

const cardSections = [
  {
    id: "gallery1_card",
    title: "MASP, Held Above the Avenue",
    subtitle: "Suspended Over Paulista",
    text: "MASP doesn’t retreat from the city — it hovers above it. Suspended over Avenida Paulista, the building remains open beneath, allowing traffic, protest, and daily movement to pass through. Inside, artworks rest on glass easels, visible from all sides. Visitors don’t follow walls so much as drift, building their own paths through time, style, and geography. It’s a space designed for looking without hurry.",
    imageSmall: "/images/ArtGallery/small/ArtGallery1z.webp",
    imageFull: "/images/ArtGallery/full/ArtGallery1.jpg",
    expandedBg: "bg-[#e5e7eb]",
    layout: "left",
    location: "Paulista Avenue",
  },
  {
    id: "gallery2",
    title: "Learning How to Linger",
    subtitle: "Time Loosens Here",
    text: "Near the centre, Degas’ ballerina stands in quiet suspension. People circle, pause, return. Time loosens here. Light shifts across the floor, shadows lengthen, and the room changes without announcement. Regular visitors know this feeling — that certain works reveal themselves slowly, rewarding repeated visits rather than quick recognition.",
    imageSmall: "/images/ArtGallery/small/ArtGallery2z.webp",
    imageFull: "/images/ArtGallery/full/ArtGallery2.jpg",
    expandedBg: "bg-[#E6EFF5]",
    layout: "right",
    location: "Centro",
  },
  {
    id: "gallery3",
    title: "Tracing the City Through Art",
    subtitle: "Extensions of the Streets",
    text: "Sketches and studies echo the city outside — structure meeting imagination, concrete softened by colour. São Paulo’s galleries often feel like extensions of the streets themselves. Visitors move between observation and interpretation, letting form, repetition, and negative space guide attention rather than instruction.",
    imageSmall: "/images/ArtGallery/small/ArtGallery4Drawnz.webp",
    imageFull: "/images/ArtGallery/full/ArtGallery4Drawn.jpg",
    expandedBg: "bg-[#E6EFF5]",
    layout: "left",
    location: "Citywide",
  },
  {
    id: "gallery4",
    title: "Holding Multiple Histories",
    subtitle: "Living Knowledge",
    text: "Below MASP’s main floors, the tone shifts. Indigenous Brazilian art brings depth rooted far beyond the city itself. These works aren’t framed as relics — they’re presented as living knowledge. For many Paulistanos, this balance matters: imported narratives held alongside those that began here, long before concrete arrived.",
    imageSmall: "/images/ArtGallery/small/ArtGallery3z.webp",
    imageFull: "/images/ArtGallery/full/ArtGallery3.jpg",
    expandedBg: "bg-[#E6EFF5]",
    layout: "right",
    location: "Paulista Avenue",
  },
  {
    id: "gallery5",
    title: "The Pinacoteca’s Quiet Pace",
    subtitle: "Shaped by Shadow",
    text: "Across the city, the Pinacoteca moves more slowly. Brick walls absorb sound. Light enters carefully through high windows. Visitors lower their voices without noticing. The building encourages patience — each room unfolding gently into the next, shaped by shadow, texture, and distance rather than spectacle.",
    imageSmall: "/images/ArtGallery/small/ArtGallery4z.webp",
    imageFull: "/images/ArtGallery/full/ArtGallery4.jpg",
    expandedBg: "bg-[#E6EFF5]",
    layout: "left",
    location: "Luz",
  },
  {
    id: "gallery6",
    title: "A Building That Watches Back",
    subtitle: "Supported by Structure",
    text: "The Pinacoteca’s architecture is part of the experience. Exposed brick, iron beams, and open walkways remain visible, refusing to disappear behind exhibitions. For regular visitors, the building itself becomes familiar — a constant presence that frames changing work. Art here isn’t isolated from structure; it’s supported by it.",
    imageSmall: "/images/ArtGallery/small/ArtGallery5z.webp",
    imageFull: "/images/ArtGallery/full/ArtGallery5.jpg",
    expandedBg: "bg-[#E6EFF5]",
    layout: "right",
    location: "Luz",
  },
];

export default function Museums({ openLightbox }) {
  const [isHeroExpanded, setIsHeroExpanded] = useState(false);
  const heroRef = useRef(null);

  // Auto-collapse when scrolled out of view
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

  return (
    <div className="bg-[#f5f5f4] min-h-screen pb-16 transition-colors duration-500">
      <SEO
        title="Art Galleries | Nomad Scribbles"
        description="São Paulo’s galleries are places of pause and reflection. Explore MASP, Pinacoteca, and the quiet habit of looking closely."
        image={heroSection.imageFull}
        slug="/brazil/saopaulo/museums"
      />

      <div className="relative w-full overflow-hidden">
        {/* Title Section */}
        <div className="flex justify-center mb-6 px-4 mt-8 relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-[#D4AF37] tracking-tight text-center drop-shadow-sm">Art Galleries</h1>
        </div>

        {/* Magazine Style Hero Section */}
        <div ref={heroRef} className="w-full max-w-7xl mx-auto px-4 mb-24 relative z-10 group">

          {/* Main Hero Image - Large & Cinematic */}
          <div
            className={`relative w-full overflow-hidden rounded-xl shadow-md cursor-pointer group-hover:shadow-xl transition-all duration-700 ease-in-out ${isHeroExpanded ? 'aspect-auto' : 'aspect-[16/10] md:aspect-[16/9]'}`}
            onClick={() => setIsHeroExpanded(!isHeroExpanded)}
          >
            <img
              src={isHeroExpanded ? process.env.PUBLIC_URL + heroSection.imageFull : process.env.PUBLIC_URL + heroSection.imageSmall}
              alt="Gallery Hero"
              className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${!isHeroExpanded ? 'transform scale-100 group-hover:scale-105' : ''}`}
            />
          </div>

          {/* Overlapping Text Card - "Newspaper" Style */}
          <div className="relative md:absolute md:-bottom-12 md:left-12 lg:left-20 w-full md:max-w-xl bg-[#f5f5f4] p-8 md:p-10 shadow-xl rounded-lg border-t-4 border-[#e9d5ff] mt-[-3rem] md:mt-0 z-20">
            {/* Decorative 'Issue' or 'Date' line */}
            <div className="flex items-center gap-3 mb-4 opacity-60">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6b21a8]">Feature</span>
              <div className="h-[1px] w-12 bg-stone-400"></div>
              <span className="text-xs font-serif italic text-stone-500">São Paulo</span>
            </div>

            <div className="text-xl md:text-2xl font-serif text-stone-800 leading-relaxed">
              <span className="text-5xl float-left mr-3 mt-[-10px] font-bold text-[#6b21a8] font-handwriting">I</span>
              <p className="inline">
                n São Paulo, galleries are places people return to rather than pass through. They sit inside the city’s noise and movement, offering rooms where attention slows and perspective shifts. For many residents, these spaces aren’t about spectacle — they’re about pause, reflection, and the quiet habit of looking closely.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Expanding Cards Sequence */}
        <main className="px-2 py-2 max-w-screen-xl mx-auto space-y-12 flex flex-col items-center pb-24">
          {cardSections.map((section) => (
            <StoryCard
              key={section.id}
              section={section}
              onImageClick={() => { }}
            />
          ))}

          {/* Closing Note */}
          <div className="max-w-2xl mx-auto text-center mt-16 px-6">
            <p className="text-lg md:text-xl font-serif text-stone-700 italic leading-relaxed opacity-90">
              “For people who live in São Paulo, galleries aren’t destinations saved for special occasions. They’re places returned to — for quiet, for perspective, for the simple act of looking carefully in a city that rarely slows on its own.”
            </p>
          </div>

        </main>

        {/* Navigation */}
        <div className="w-full flex flex-col items-center gap-4 mb-12 relative z-10">
          <Link
            to="/brazil/saopaulo"
            className="flex flex-row items-center justify-center text-stone-300 hover:text-white transition-colors drop-shadow-md bg-stone-950/50 backdrop-blur-md rounded-full px-6 py-2 border border-white/10 shadow-lg hover:bg-stone-900/60 w-fit"
          >
            <span className="text-xl mr-3 pb-1">←</span>
            <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">
              Return to São Paulo
            </span>
          </Link>
          <Link
            to="/brazil/saopaulo/carnival"
            className="flex flex-row items-center justify-center text-[#ceb752] hover:text-[#e8eac7] transition-colors drop-shadow-sm bg-[#ceb752]/20 backdrop-blur-md rounded-full px-6 py-2 border border-[#ceb752]/50 shadow-md hover:bg-[#ceb752]/30 w-fit"
          >
            <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">
              Next: Carnival
            </span>
            <span className="text-xl ml-3 pb-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}


// StoryCard Component 
function StoryCard({ section, onImageClick }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const activeBg = section.expandedBg || "bg-[#e5e7eb]";
  const isReverse = section.layout === "right";

  return (
    <motion.div
      layout
      className={`w-full max-w-6xl bg-[#f5f5f4] border border-stone-200 rounded-xl overflow-hidden shadow-sm cursor-pointer transition-all duration-500 ${isExpanded ? `shadow-2xl ${activeBg} border-transparent` : "hover:shadow-md"}`}
      onClick={() => setIsExpanded(!isExpanded)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={`p-6 md:p-10 flex flex-col ${isReverse ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-16 items-start md:items-center`}>

        {/* Image Side */}
        <div className="w-full md:w-1/2 flex justify-center sticky top-0">
          <RevealImage
            smallSrc={`${process.env.PUBLIC_URL}${section.imageSmall}`}
            fullSrc={`${process.env.PUBLIC_URL}${section.imageFull}`}
            alt={section.title}
            expanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
            onClick={() => { }}
            autoCollapse={true}
          />
        </div>

        {/* Text Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          {/* Museum Label */}
          <div className={`flex items-center gap-3 mb-6 opacity-60 transition-opacity duration-500 ${isExpanded ? "opacity-100" : ""}`}>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500">Exhibit</span>
            <div className="h-[1px] w-8 bg-stone-400"></div>
            <span className="text-[10px] font-serif italic text-stone-500">{section.location}</span>
          </div>

          <h2 className={`font-serif text-[#2e1065] mb-4 transition-all duration-500 ${isExpanded ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"}`}>
            {section.title}
          </h2>

          <h3 className={`text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-4 transition-all duration-500 ${isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 h-0 overflow-hidden"}`}>
            {section.subtitle}
          </h3>

          <div className="relative overflow-hidden">
            <p className={`text-stone-600 font-serif leading-relaxed text-lg transition-all duration-700 ${isExpanded ? "opacity-100 translate-y-0" : "opacity-60 line-clamp-3"}`}>
              {section.text}
            </p>
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#f5f5f4] to-transparent"></div>
            )}
          </div>

          {/* Interactive Arrow Cue */}
          <div className={`mt-6 flex items-center gap-2 group-hover:gap-4 transition-all duration-500 ${isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <span className="text-[10px] uppercase tracking-widest text-[#2e1065] font-bold">Read Story</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2e1065]">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

// RevealImage Component
// 70% width when collapsed, 100% when expanded
function RevealImage({ smallSrc, fullSrc, alt, expanded, onToggle, onClick, autoCollapse }) {
  const [imgError, setImgError] = useState(false);
  const [fullLoaded, setFullLoaded] = useState(false);
  const containerRef = React.useRef(null);

  const isControlled = expanded !== undefined;
  const initialExpanded = isControlled ? expanded : false;
  const [visuallyExpanded, setVisuallyExpanded] = useState(initialExpanded);

  useEffect(() => {
    if (isControlled) setVisuallyExpanded(expanded);
  }, [expanded, isControlled]);

  // Auto-collapse logic
  const shouldAutoCollapse = autoCollapse !== undefined ? autoCollapse : true;
  useEffect(() => {
    if (!shouldAutoCollapse || !visuallyExpanded) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        setVisuallyExpanded(false);
        if (isControlled && onToggle && expanded) {
          onToggle();
        }
      }
    }, { threshold: 0 });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldAutoCollapse, visuallyExpanded, isControlled, onToggle, expanded]);


  const handleClick = (e) => {
    e.stopPropagation();

    if (visuallyExpanded) {
      if (onClick) onClick();
    } else {
      if (isControlled && onToggle) {
        onToggle();
      } else {
        setVisuallyExpanded(true);
      }
    }
  };

  const showFullAsDriver = visuallyExpanded && fullLoaded && !imgError;

  return (
    <div
      ref={containerRef}
      className={`relative transition-all duration-700 ease-in-out cursor-pointer group ${visuallyExpanded ? "w-full" : "w-[80%] md:w-[80%]"}`}
      onClick={handleClick}
    >
      <div className="relative w-full rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
        <img
          src={smallSrc}
          alt={alt}
          className={`transition-all duration-500 
                ${showFullAsDriver ? "absolute inset-0 w-full h-full object-cover opacity-0" : "relative w-full h-auto object-contain z-10"}
                ${!visuallyExpanded ? "scale-95 group-hover:scale-100 transition-transform duration-500" : "scale-100"}
            `}
        />

        {!imgError && (
          <img
            src={fullSrc}
            alt={alt}
            onLoad={() => setFullLoaded(true)}
            onError={() => setImgError(true)}
            className={`transition-all duration-700 ease-out 
                  ${showFullAsDriver ? "relative w-full h-auto z-20 opacity-100 scale-100" : "absolute inset-0 w-full h-full object-cover z-20 opacity-0 scale-95"}
              `}
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}
