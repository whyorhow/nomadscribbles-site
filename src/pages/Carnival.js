import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import Lightbox from "../components/Lightbox";
import artImages from "../assets/artImages.json";


function Carnival({ openLightbox }) {
  const carnivalImages = artImages.filter(img => img.category === "Carnival");

  // Define the visual order of images for Lightbox navigation
  const imageOrder = [
    "carnival10", "carnival1", "carnival3", "carnival6", "carnival13", "carnival9", "carnival14", "carnival11", "carnival12"
  ];

  const getImage = (id) => carnivalImages.find(i => i.id === id);

  // Derived list of images sorted by their appearance
  const sortedImages = imageOrder.map(id => getImage(id)).filter(Boolean);

  // Helper to open lightbox with correct index
  const handleImageClick = (imageId) => {
    const index = sortedImages.findIndex(img => img.id === imageId);
    if (index !== -1) {
      openLightbox(index, sortedImages);
    } else {
      const img = getImage(imageId);
      if (img) openLightbox(0, [img]);
    }
  };

  const sections = [
    {
      id: "preparation",
      title: "Carnival Is Built, Not Arrived At",
      subtitle: "Collective Labour Before the Spectacle",
      expandedBg: "bg-[#edd7f7]",
      coverImage: "carnival1",
      coverCaption: "This isn’t background activity — it’s collective labour.",
      layout: "right",
      content: [
        { type: "text", text: "In São Paulo, Carnival begins long before the streets fill. Samba schools rehearse late into the night, costumes are sewn after workdays end, and floats are constructed piece by piece over months. This isn’t background activity — it’s collective labour. Carnival belongs to the people who make it, and its meaning is rooted in shared effort long before it becomes spectacle." }
      ]
    },
    {
      id: "representation",
      title: "Representing a Neighbourhood",
      subtitle: "History and Identity on the Avenue",
      expandedBg: "bg-[#edd7f7]",
      coverImage: "carnival3",
      coverCaption: "Each performance represents a neighbourhood.",
      layout: "left",
      content: [
        { type: "text", text: "When samba schools enter the Sambódromo, they carry more than choreography. Each performance represents a neighbourhood — its history, identity, and internal pride. The scale may feel overwhelming from the stands, but for those involved it remains personal. Families, friends, and rivals watch closely, recognising the work behind every movement." }
      ]
    },
    {
      id: "discipline",
      title: "Precision Holds It Together",
      subtitle: "Visual Excess Held in Place",
      expandedBg: "bg-[#edd7f7]",
      coverImage: "carnival6",
      coverCaption: "What looks effortless is the result of sustained coordination.",
      layout: "right",
      content: [
        { type: "text", text: "Carnival’s visual excess is held in place by discipline. Dancers move in strict formation, floats advance at measured pace, and musicians maintain relentless rhythm. Individual expression only works because everyone else holds their position. What looks effortless is the result of sustained coordination and trust." }
      ]
    },
    {
      id: "physical",
      title: "Hands, Weight, Repetition",
      subtitle: "The Work Beneath the Colour",
      expandedBg: "bg-[#edd7f7]",
      coverImage: "carnival13",
      coverCaption: "Rhythm is felt in the body.",
      layout: "left",
      content: [
        { type: "text", text: "Up close, Carnival becomes physical rather than symbolic. Drum skins wear thin, hands ache, and repetition replaces performance. This is the work beneath the colour — where rhythm is felt in the body and sound becomes something carried, not just heard." }
      ]
    },
    {
      id: "loosens",
      title: "The City Loosens",
      subtitle: "Beyond the Sambódromo Structure",
      expandedBg: "bg-[#edd7f7]",
      coverImage: "carnival9",
      coverCaption: "Participation replaces performance.",
      layout: "right",
      content: [
        { type: "text", text: "Outside the Sambódromo, Carnival releases its structure. Blocos form in streets and alleyways, gathering whoever happens to be there. These moments aren’t rehearsed, but they’re deeply familiar. Neighbourhoods recognise their own rhythms, and participation replaces performance. Rain falls, sound continues, and the city moves without needing direction." }
      ]
    },
    {
      id: "spills",
      title: "Sound Spills Out",
      subtitle: "Where the Edge Breaks",
      expandedBg: "bg-[#edd7f7]",
      coverImage: "carnival14",
      coverCaption: "Music escapes its routes and schedules.",
      layout: "left",
      content: [
        { type: "text", text: "Music escapes its routes and schedules, spilling into side streets and unexpected corners. Brass cuts through percussion, crowds gather and dissolve, and Carnival briefly reorganises how the city moves. These moments feel unscripted, but they’re part of a shared understanding — Carnival goes where people carry it." }
      ]
    },
    // Inline transition handled separately in render
    {
      id: "transition_beat",
      type: "transition_image",
      imageId: "carnival12",
      caption: "Between beats, the rhythm doesn’t stop — it simply changes hands."
    },
    {
      id: "remains",
      title: "What Remains",
      subtitle: "The Shared Aftermath",
      expandedBg: "bg-[#edd7f7]",
      coverImage: "carnival11",
      coverCaption: "A city returning to itself slightly altered.",
      layout: "right",
      content: [
        { type: "text", text: "As Carnival settles into parks and open spaces, it slows. Music drifts, crowds thin, and celebration blends back into daily life. For many Paulistanos, this is the true centre of Carnival — not the height of spectacle, but the shared aftermath. A city briefly aligned around rhythm and movement, returning to itself slightly altered." }
      ]
    }
  ];

  const pageBackgroundStyle = {
    backgroundColor: "#f5f5f4",
    opacity: 1,
  };

  return (
    <div className="transition-colors duration-500" style={pageBackgroundStyle}>
      <SEO
        title="Carnival in São Paulo | Nomad Scribbles"
        description="Experience São Paulo's Carnival — the rhythm, colors, and energy of Brazil's world-famous festival."
        image="/images/CarnivalSP/CarnivalBackground.png"
        slug="/brazil/saopaulo/carnival"
      />

      <div className="relative w-full overflow-hidden">
        {/* Title Section */}
        <div className="flex justify-center mb-6 px-4 mt-8 relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-[#D4AF37] tracking-tight text-center drop-shadow-sm">Carnival</h1>
        </div>

        {/* Hero Image - Carnival10 (The Sambadrome Opens - Feature Image) */}
        <div className="w-full max-w-5xl mx-auto px-4 mb-16 flex flex-col items-center relative z-10">
          <img
            src={getImage("carnival10")?.lightboxImage || ""}
            alt="Carnival at the Sambódromo"
            className="w-full h-auto object-cover rounded-lg shadow-lg mb-2 cursor-pointer hover:opacity-95 transition-opacity"
            onClick={() => handleImageClick("carnival10")}
          />
          <p className="text-sm italic opacity-90 text-center font-medium text-stone-500 mt-2">
            Carnival gathers scale at the Sambódromo, where months of preparation are released in a single, collective movement.
          </p>
        </div>


        {/* Main Content with Interactive Sections */}
        <main className="px-2 py-2 max-w-screen-xl mx-auto space-y-12 flex flex-col items-center pb-24">
          {sections.map((section) => {
            if (section.type === "transition_image") {
              const img = getImage(section.imageId);
              if (!img) return null;
              return (
                <div key={section.id} className="w-full max-w-6xl py-12">
                  <RevealImage
                    smallSrc={img.image}
                    fullSrc={img.lightboxImage}
                    alt={img.title}
                    caption={section.caption}
                    title={img.title}
                    onClick={() => handleImageClick(section.imageId)}
                    expanded={true} // Always expanded for transition
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

          <div className="w-full flex justify-center mt-16 mb-8 relative z-10">
            <Link to="/brazil/saopaulo" className="flex flex-row items-center justify-center text-[#ceb752] hover:text-[#e8eac7] transition-colors drop-shadow-md bg-stone-900/40 backdrop-blur-md rounded-full px-6 py-2 border border-white/10 shadow-lg hover:bg-stone-900/60">
              <span className="text-xl mr-3 pb-1">←</span>
              <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Return to São Paulo</span>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

// Interactive StoryCard Component (Zig-Zag Style)
function StoryCard({ section, getImage, handleImageClick }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const activeBg = section.expandedBg || "bg-[#edd7f7]";
  const isReverse = section.layout === "right";
  const coverImg = getImage(section.coverImage);

  if (!coverImg) return null;

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
            smallSrc={coverImg.image}
            fullSrc={coverImg.lightboxImage}
            alt={section.title}
            caption={section.coverCaption} // Use coverCaption inside RevealImage if needed, or mapped below
            expanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
            onClick={() => handleImageClick(section.coverImage)}
          />
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left min-h-[150px]">
          <AnimatePresence mode="wait">
            {isExpanded ? (
              // Expanded: Full Content
              <motion.div
                key="expanded-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-left w-full"
              >
                <h2 className="text-3xl md:text-5xl font-bold font-handwriting drop-shadow-sm text-[#2e1065] mb-2 leading-tight">
                  {section.title}
                </h2>
                {section.subtitle && (
                  <h3 className="text-md md:text-lg font-light tracking-wide mb-4 text-stone-700">
                    {section.subtitle}
                  </h3>
                )}
                <div className="w-12 h-[2px] bg-[#2e1065]/20 mb-6"></div>

                {/* Dynamic Content Mapping */}
                <div className="space-y-6">
                  {section.content.map((item, idx) => {
                    if (item.type === "text") {
                      return <p key={idx} className="text-lg leading-relaxed text-stone-800 font-medium">{item.text}</p>;
                    }
                    if (item.type === "image") {
                      const subImg = getImage(item.id);
                      if (!subImg) return null;
                      return (
                        <div key={idx} className="w-full mt-4">
                          <RevealImage
                            smallSrc={subImg.image}
                            fullSrc={subImg.lightboxImage}
                            alt={subImg.title || ""}
                            caption={item.caption}
                            onClick={(e) => { e.stopPropagation(); handleImageClick(item.id); }}
                            expanded={true} // Sub-images in content always shown 'ready'
                            autoCollapse={false}
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>

              </motion.div>
            ) : (
              // Collapsed: Gallery Label Only
              <motion.div
                key="collapsed-label"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4 }}
                className={`flex flex-col ${isReverse ? "items-start md:items-end md:text-right" : "items-start md:text-left"} w-full`}
              >
                {/* Museum Label Style */}
                <div className="max-w-[280px] p-4 bg-white/60 backdrop-blur-md border-l-2 border-[#E8C7F5] shadow-sm group">
                  <h4 className="text-[#2e1065] text-sm font-bold uppercase tracking-widest mb-1 font-cormorant leading-tight">
                    {section.title}
                  </h4>
                  <p className="text-stone-500 text-[11px] italic font-serif leading-tight">
                    {section.subtitle || "São Paulo Carnival"}
                  </p>

                  {/* Interactive Arrow Cue */}
                  <div className="mt-4 flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                    <span className="text-[10px] uppercase tracking-widest text-[#2e1065] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">View</span>
                    <div className="w-6 h-6 rounded-full border border-[#2e1065]/30 flex items-center justify-center group-hover:bg-[#2e1065] group-hover:border-[#2e1065] transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2e1065] group-hover:text-white transition-colors duration-300">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}


// Shared RevealImage Component
function RevealImage({ smallSrc, fullSrc, alt, onClick, caption, expanded, onToggle, autoCollapse, title }) {
  const isControlled = expanded !== undefined;
  const initialExpanded = isControlled ? expanded : false;
  const [visuallyExpanded, setVisuallyExpanded] = useState(initialExpanded);
  const [imgError, setImgError] = useState(false);
  const [fullLoaded, setFullLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isControlled) setVisuallyExpanded(expanded);
  }, [expanded, isControlled]);

  const shouldAutoCollapse = autoCollapse !== undefined ? autoCollapse : true;

  useEffect(() => {
    if (!shouldAutoCollapse || !visuallyExpanded) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setVisuallyExpanded(false);
          if (isControlled && onToggle && expanded) {
            onToggle();
          }
        }
      },
      { threshold: 0 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldAutoCollapse, visuallyExpanded, isControlled, onToggle, expanded]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (visuallyExpanded) {
      if (onClick) onClick(e);
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
      className={`relative max-w-5xl mx-auto transition-all duration-700 ease-in-out my-4 ${visuallyExpanded ? "w-full" : "w-[80%] md:w-[80%]"}`}
      onClick={handleClick}
    >
      <div className="relative w-full rounded-lg overflow-hidden shadow-md group hover:shadow-lg transition-shadow cursor-pointer">
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

      {/* Optional Caption inside Image (mainly for sub-images/transitions) */}
      {(title || caption) && visuallyExpanded && (
        <div className="mt-4 text-center px-4">
          {title && <p className="text-xs font-bold uppercase tracking-widest text-[#2e1065]">{title}</p>}
          {caption && <p className="text-sm italic text-stone-600 mt-1">{caption}</p>}
        </div>
      )}
    </div>
  );
}

export default Carnival;
