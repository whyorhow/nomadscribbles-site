import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import SEO from "../components/SEO";
import Logo from "../components/Logo";
import Lightbox from "../components/Lightbox";
import artImages from "../assets/artImages.json";
import { fadeScale, staggerContainer } from "../utils/animations";

function Salvador() {
    const salvadorImages = artImages.filter(img => img.category === "Salvador");

    const [currentIndex, setCurrentIndex] = useState(null);

    const contentBlocks = [
        {
            title: "Colour on the Hills",
            text: "Pastel façades rise and fall along the steep streets of Pelourinho, their blues, greens, yellows, and softened whites catching the light unevenly. Time has worn these buildings gently rather than erased them. Cracks remain visible. Paint fades and is reapplied. What was once imposed architecture has been reoccupied, reshaped by daily life. Walking here feels layered — footsteps echo over centuries of trade, faith, celebration, and control. The city does not try to smooth its contradictions.",
            imageId: "salvador13" // C (Colourful Facades)
        },
        {
            title: "Faces in the Walls",
            text: "Painted figures emerge from textured surfaces, gazing outward with calm intensity. These murals are not decoration; they are presence. Salvador’s street art often centres Afro-Brazilian identity, ancestry, and memory, reclaiming walls that once carried silence. The faces feel watchful rather than confrontational, as if reminding the street that history still lives here — not frozen, but alert.",
            imageId: "salvador19" // Salvador Vibrance
        },
        {
            title: "Rhythm in the Street",
            text: "Drums arrive before you see them. A rhythm repeats, builds, draws people inward. In Salvador, music is rarely contained by stages or schedules. It spills into streets, corners, doorways. Passersby slow instinctively. Bodies respond before thought catches up. Sound becomes a form of navigation, a way of understanding where you are and what kind of moment you’ve entered.",
            imageId: "salvador16" // Salvador Rhythm
        },
        {
            title: "Faith Tied by Hand",
            text: "Colourful ribbons knot themselves to railings, gates, wrists, and wishes. Each carries a quiet intention — protection, health, gratitude, longing. Faith in Salvador is deeply personal and deeply public. Catholic symbols sit alongside Afro-Brazilian spiritual traditions, not competing but overlapping. Belief here is not confined to ceremony. It’s carried, tied, worn, and renewed through repetition.",
            imageId: "salvador3" // Bahian Culture
        },
        {
            title: "Masks and Memory",
            text: "Playful and unsettling at once, masked figures hint at older rituals, celebrations, and storytelling traditions. Salvador’s expressions of joy often carry echoes of survival. Humour, exaggeration, and performance become tools — ways of holding history without being consumed by it. Even celebration feels intentional, layered with meaning beneath the surface.",
            imageId: "salvador17" // Salvador Spirit (Likely masked or cultural figure)
        },
        {
            title: "Movement as History",
            text: "Capoeira unfolds in sharp arcs and controlled balance. Bodies circle, attack, retreat, smile. What looks like dance is also dialogue — a conversation shaped by centuries of resistance. Developed by enslaved Africans, capoeira disguised combat as performance, allowing skill and strength to survive under watchful eyes. Today, its movements still carry discipline, strategy, and grace — a physical language passed forward through practice rather than instruction.",
            imageId: "salvador7" // Street Performance (Likely Capoeira)
        },
        {
            title: "Voices on the Stage",
            text: "Fabric, beads, and colour glow beneath warm light. Songs rise, stories unfold through posture and gesture. Performance in Salvador rarely belongs to a single voice. It is shared, echoed, responded to. The boundary between performer and witness feels thin, sometimes irrelevant. You are never entirely outside what is happening.",
            imageId: "salvador10" // Salvador Art
        },
        {
            title: "The City Meets the Water",
            text: "From above, Salvador presses tightly toward the Atlantic before suddenly releasing itself into open space. Buildings cluster, streets compress, then dissolve into horizon. The sea has always shaped this city — as arrival point, as boundary, as witness. It holds both beauty and grief, memory and movement.",
            imageId: "salvador12" // Salvador View (Panoramic view)
        },
        {
            title: "Evening Light",
            text: "As the sun lowers, the water turns gold, then deepens into blue. Light softens the edges of the city. Boats drift without urgency. Salvador slows, but it does not quiet completely. Conversation lingers. The air thickens with warmth and salt.",
            imageId: "salvador5" // Salvador Coast (Evening vibe)
        },
        {
            title: "Edges of the Shore",
            text: "Umbrellas dot the sand, waves break against dark rock, laughter and conversation travel easily. The beach is not an escape from Salvador — it is part of its rhythm. Here, social space stretches horizontally. Time loosens. People gather not to perform, but to be.",
            imageId: "salvador22" // Salvador Farewell (Beach/Shore scene)
        },
        {
            title: "Small Departures",
            text: "Wooden steps lead down into clear water. Boats wait just beyond the shallows. These moments — transitions between land and sea, movement and stillness — define Salvador as much as its colour and sound. The city understands the importance of pause.",
            imageId: "salvador21" // Salvador Colors (Boats/Water detail)
        },
        {
            title: "Wishes After Dark",
            text: "At night, ribbons gather again, layered with touch and time. Some are faded, others newly tied. They move softly in the breeze, carrying countless private hopes. Faith here is not loud. It is persistent.",
            imageId: "salvador18" // Salvador Moment (Detail shot, perhaps ribbons)
        },
        {
            title: "Streets at Night",
            text: "Old cars rest beneath glowing façades, parked casually against centuries of architecture. Light spills from windows. Voices drift. Salvador does not empty itself after dark — it changes texture. Stories continue, just out of frame.",
            imageId: "salvador8" // Salvador Night
        },
        {
            title: "Where the Day Ends",
            text: "Palm shadows stretch long. Hand-painted signs point toward simple promises — beach, food, family, friends. The message is unforced. Life here is not meant to be rushed. It is meant to be shared, repeated, and remembered.",
            imageId: "salvador20" // Salvador Heritage (Signage or calm scene)
        },
        {
            title: "Pelourinho",
            text: "Once the administrative centre of colonial Salvador, Pelourinho was also a site of public punishment during Brazil’s slave period. Today, its restoration carries tension alongside beauty. Preserving these streets means holding space for both celebration and remembrance — neither cancelling the other.",
            imageId: "salvador2" // Pelourinho
        },
        {
            title: "A City of Firsts",
            text: "As Brazil’s first capital and a major Atlantic port, Salvador was deeply shaped by the slave trade. Its cultural richness — music, cuisine, language — carries this history within it, visible and audible in daily life.",
            imageId: "salvador14" // Salvador Life
        }
    ];

    // Helper to open lightbox with correct index from the full list
    const handleImageClick = (imageId) => {
        const index = salvadorImages.findIndex(img => img.id === imageId);
        if (index !== -1) {
            setCurrentIndex(index);
        }
    };

    return (
        <div className="relative min-h-screen pt-2">
            {/* SEO */}
            <SEO
                title="Salvador | Nomad Scribbles"
                description="Salvador: A city where history does not recede into the background — it moves, sings, resists, and remembers."
                image="/images/Salvador/small/Salvador1F.webp"
                slug="/brazil/salvador"
            />

            {/* Hidden H1 */}
            <h1 className="sr-only">Salvador | Nomad Scribbles</h1>

            {/* Logo */}
            <div className="mt-4 ml-4 z-30">
                <Link to="/home">
                    <Logo className="h-6 w-auto sm:h-10" />
                </Link>
            </div>

            {/* Hero Image */}
            <div className="flex justify-center mb-2 px-2">
                <img
                    src={process.env.PUBLIC_URL + "/images/Salvador/small/Salvador1F.webp"}
                    alt="Salvador landscape"
                    loading="lazy"
                    className="w-full max-w-[600px] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[800px] h-auto rounded-lg shadow-lg"
                />
            </div>

            {/* Salvador Title */}
            <div className="flex justify-center mb-6 mt-4">
                <div className="text-center px-4">
                    <h2 className="text-4xl sm:text-5xl font-bold text-[#E5CF6B] font-cormorant">
                        Salvador
                    </h2>
                    <p className="text-primaryText font-cormorant italic mt-2 text-lg sm:text-xl max-w-3xl mx-auto">
                        A city where history does not recede into the background — it moves, sings, resists, and remembers.
                    </p>
                </div>
            </div>

            <main className="px-2 py-2 max-w-screen-lg mx-auto space-y-8 font-cormorant text-primaryText leading-relaxed">
                {contentBlocks.map((block, idx) => {
                    const img = salvadorImages.find(i => i.id === block.imageId);
                    // Fallback if image isn't found
                    if (!img) return null;

                    return (
                        <div
                            key={block.title}
                            className={`flex flex-col lg:flex-row items-center justify-center gap-6 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                                }`}
                        >
                            <img
                                src={img.blogimage}
                                alt={img.title}
                                loading="lazy"
                                onClick={() => handleImageClick(block.imageId)}
                                className="rounded-lg cursor-pointer w-full sm:w-3/4 md:w-2/3 lg:w-2/5 h-auto shadow-md hover:opacity-95 transition-opacity"
                            />
                            <div className="p-4 rounded-md flex-1 text-left text-sm sm:text-base">
                                <h2 className="font-bold text-lg mb-2">{block.title}</h2>
                                <p>{block.text}</p>
                            </div>
                        </div>
                    );
                })}
            </main>

            {/* Lightbox */}
            {currentIndex !== null && (
                <Lightbox
                    images={salvadorImages}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                />
            )}
        </div>
    );
}

export default Salvador;
