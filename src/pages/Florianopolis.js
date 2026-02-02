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

function Florianopolis({ openLightbox }) {
    const florianopolisCoords = destinations.find(d => d.id === "florianopolis");
    const floripaImages = artImages.filter(img => img.category === "Florianopolis");

    const spreadBackgroundStyle = {
        backgroundImage: `url(${paperTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "url(#torn-paper-filter)",
        opacity: 0.95,
    };

    const contentBlocks = [
        {
            title: "Footprints, Then Water",
            text: "Footsteps trail along the beach before dissolving into the tide. Whatever passed through here didn’t stay long, and that feels intentional.",
            imageId: "floripa14"
        },
        {
            title: "Where the City Meets the Sea",
            text: "The coastline stretches wide, busy at one end and thinning into distance at the other. Florianópolis often feels like this — expansive, but never overwhelming.",
            imageId: "floripa18"
        },
        {
            title: "Campeche, Unrushed",
            text: "Campeche opens wide, where green edges soften into sand and the sea settles into an easy rhythm. It offers space rather than spectacle, and that feels like the point.",
            imageId: "floripa5"
        },
        {
            title: "Steps Toward the Atlantic",
            text: "A narrow wooden staircase leads through sand and scrub, revealing the shoreline slowly rather than all at once. With each step, the ocean grows louder and the horizon wider.",
            imageId: "floripa3"
        },
        {
            title: "Along the Shore, Santo Antônio de Lisboa",
            text: "The shoreline curves softly, where hills, boats, and shallow water settle into an easy balance. Nothing feels staged here — it’s simply how the place works.",
            imageId: "floripa12"
        },
        {
            title: "Watching the Water, Waiting for Nothing",
            text: "The lifeguard tower stands bright against pale sand and open sky, ready but unhurried. Around it, the beach moves at its own pace, reminding you that stillness here is part of the design.",
            imageId: "floripa4"
        },
        {
            title: "Princess Flower",
            text: "The vivid purple of the princess flower cuts cleanly through the surrounding green. It’s a small, precise interruption in an otherwise layered landscape.",
            imageId: "floripa17"
        },
        {
            title: "Figueira Centenária",
            text: "At the centre of the city, the Figueira Centenária spreads wide, its vast branches supported as much by respect as by structure. Beneath it, daily life passes quickly, while the tree continues anchoring the present to something far older.",
            imageId: "floripa2"
        },
        {
            title: "Yellow Shrimp Plant",
            text: "The yellow shrimp plant rose cleanly from the shade, its layered petals catching the light without trying too hard. In a landscape dense with green, it felt quietly intentional.",
            imageId: "floripa10"
        },
        {
            title: "Hillside Living, Armação",
            text: "Houses gather along the hillside near the restaurant, pressed gently against the forest edge. The town feels shaped by its surroundings, built to fit rather than to dominate.",
            imageId: "floripa7"
        },
        {
            title: "Bar do Arante",
            text: "At Bar do Arante, handwritten notes cover the walls and ceiling, each one left behind like a small offering. What began as habit has become atmosphere, turning the restaurant into a living archive of passing lives.",
            imageId: "floripa8"
        },
        {
            title: "Snowy Egret, Armação",
            text: "A snowy egret moved along the shoreline at Armação, precise and unhurried at the water’s edge. The sea rolled in and out beside it, unconcerned with being watched.",
            imageId: "floripa6"
        },
        {
            title: "Shared Care",
            text: "A hand-painted sign stands between sand and sea, gently reminding visitors to avoid standing water and to take their rubbish with them. It feels less like a warning and more like an unspoken agreement with the place.",
            imageId: "floripa15"
        },
        {
            title: "Above the Cove",
            text: "From the trail above, the water opens into a quiet pocket of turquoise framed by rock and scrub. Seen from here, the beach feels held rather than exposed.",
            imageId: "floripa16"
        },
        {
            title: "Thorns and Salt Air",
            text: "Cactus leans toward the water, shaped by sun and wind rather than care. Even the plants here seem adapted to looking outward.",
            imageId: "floripa19"
        },
        {
            title: "Rocks at Praia do Forte",
            text: "Dark stones sit low in the surf at Praia do Forte, shaped smooth by repetition rather than force. Waves arrive, retreat, and leave everything exactly where it is.",
            imageId: "floripa22"
        },
        {
            title: "The Workshop Window",
            text: "A small shop window frames one of the village’s handmade figures, half playful, half uncanny. These quiet workshops feel stitched into daily life, creating objects that linger long after you’ve passed by.",
            imageId: "floripa11"
        },
        {
            title: "Praia de Santo Antônio de Lisboa at Dusk",
            text: "Small boats rest lightly on the water as the sky turns gold over Santo Antônio de Lisboa. Evening arrives without drama, then slips away just as quietly.",
            imageId: "floripa13"
        },
        {
            title: "Casting at Dusk, Santo Antônio de Lisboa",
            text: "As the light fades, a lone figure casts a net into calm water while boats settle behind him. The movement feels practiced, almost timeless, carried out as the sky quietly changes.",
            imageId: "floripa21"
        },
        {
            title: "Last Light on the Bay",
            text: "As the sun drops, boats settle into silhouettes and the water turns to gold. The day ends without urgency, as if everyone already knows it will return.",
            imageId: "floripa20"
        },
        {
            title: "Arriving at Campeche Island",
            text: "A small boat rests in clear water as the beach fills gently behind it. Campeche Island feels vivid and alive, yet never hurried, as if it knows people will come and go.",
            imageId: "floripa25"
        },
        {
            title: "Coati on Campeche Island",
            text: "A coati crosses the sand with casual confidence, unconcerned by boats or visitors nearby. On Campeche Island, wildlife feels less like an interruption and more like part of the rhythm.",
            imageId: "floripa24"
        },
        {
            title: "Small Witness",
            text: "Perched between branches and beams, the marmoset paused as if weighing up our presence. Even brief encounters in Florianópolis feel shared, as though observation goes both ways.",
            imageId: "floripa9"
        },
        {
            title: "The Bare-Faced Curassow",
            text: "The Bare-faced Curassow stood quietly among the undergrowth, dark and deliberate, its yellow beak cutting through the green. It didn’t perform or retreat — it simply watched back, unbothered by curiosity.",
            imageId: "floripa1"
        },
        {
            title: "Golden Hour, Praia do Forte",
            text: "The sun drops toward the horizon, turning wet sand into a mirror of warm light. People slow their steps instinctively, as if the moment asks for less noise.",
            imageId: "floripa23"
        },
        // Remaining images appended at the end


    ];

    // Derived list of images sorted by their appearance in contentBlocks
    const sortedImages = contentBlocks.map(block => floripaImages.find(img => img.id === block.imageId)).filter(Boolean);

    // Helper to open lightbox with correct index from the SORTED list
    const handleImageClick = (imageId) => {
        const index = sortedImages.findIndex(img => img.id === imageId);
        if (index !== -1) {
            openLightbox(index, sortedImages.map(img => img.lightboxImage), sortedImages.map(img => img.title));
        }
    };

    return (
        <div className="relative min-h-screen pt-2">
            {/* SEO */}
            <SEO
                title="Florianópolis | Nomad Scribbles"
                description="Florianópolis: An island city where lush hills meet over 40 distinct beaches. Discover the diverse geography of Brazil's southern coast."
                image="/images/Floripa/small/Floripa1z.webp"
                slug="/brazil/florianopolis"
            />

            {/* Hidden H1 */}
            <h1 className="sr-only">Florianópolis | Nomad Scribbles</h1>


            {/* Title Section */}
            <div className="flex justify-center mb-6 px-4 mt-8">
                <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-darkText tracking-tight text-center">Florianópolis</h1>
            </div>

            {/* Feature Image */}
            <div className="w-full max-w-4xl mx-auto px-4 mb-12">
                <img
                    src="/images/Floripa/small/Floripa14.webp"
                    alt="Footprints leading to the water in Florianópolis"
                    className="w-full h-auto object-cover rounded-lg shadow-md"
                />
            </div>

            {/* Banner Spread with Map */}
            <div className="relative w-full mb-16 overflow-hidden">
                <div
                    className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[110vw] pointer-events-none z-0"
                    style={spreadBackgroundStyle}
                />

                <div className="relative z-20 max-w-5xl mx-auto px-4 py-8 flex flex-col items-center mt-[-10px]">
                    <div className="w-full max-w-4xl overflow-visible mb-[-10px]">
                        <ContextMap
                            markers={[florianopolisCoords].filter(Boolean)}
                            zoomToId="florianopolis"
                            title="Where is Florianópolis?"
                            geography={florianopolisCoords?.geography}
                            transparent={true}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content with Narrative Interleaved */}
            <main className="px-2 py-2 max-w-screen-xl mx-auto space-y-24 text-darkText leading-relaxed font-sans flex flex-col items-center">

                {/* --- Section 1: Intro --- */}
                <div className="w-full flex flex-col items-center space-y-12">
                    <div className="max-w-2xl text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-bold font-handwriting mb-8 text-center">Florianópolis Is a Brazilian Holiday Island — and That Matters</h2>
                        <p className="mb-6 text-lg">
                            Florianópolis isn’t a place built primarily for international visitors. It’s a holiday island for Brazilians, and that shapes everything about it — the pace of the beaches, the way people use the space, and the overall feel of the island.
                        </p>
                    </div>

                    {/* Image 18: Where the City Meets the Sea */}
                    {contentBlocks[1] && floripaImages.find(i => i.id === contentBlocks[1].imageId) && (
                        <div className="flex flex-col items-center max-w-4xl text-center">
                            <img
                                src={floripaImages.find(i => i.id === contentBlocks[1].imageId).image}
                                alt={contentBlocks[1].title}
                                onClick={() => handleImageClick(contentBlocks[1].imageId)}
                                className="rounded-lg shadow-md hover:opacity-95 transition-opacity cursor-pointer mb-4"
                            />
                            <p className="max-w-2xl text-sm italic opacity-80">{contentBlocks[1].text}</p>
                        </div>
                    )}

                    <div className="max-w-2xl text-center md:text-left">
                        <p className="mb-6 text-lg">
                            Families return here year after year, cities empty toward the coast in summer, and daily life stretches outward into sand, forest, and water.
                        </p>
                        <p className="mb-6 text-lg">
                            For European travellers, that distinction matters. Floripa isn’t loud or demanding. It feels safe, relaxed, and easy to move through, with an emphasis on being outdoors rather than being entertained.
                        </p>
                    </div>

                    <div className="max-w-2xl text-center md:text-left">
                        <p className="mb-6 text-lg">
                            You don’t come here to collect highlights. You come here to settle into something that already works.
                        </p>
                        <p className="mb-6 text-lg">
                            Florianópolis reveals itself slowly. Footsteps fade into the tide, coastlines widen and then narrow again, and the island shifts gently between city, beach, and forest.
                        </p>
                        <p className="mb-6 text-lg">
                            Even the built details — staircases, lifeguard towers, paths — feel like suggestions rather than instructions. Nothing insists on your attention for long.
                        </p>
                        <p className="mb-6 text-lg">
                            There’s a sense that people are sharing space rather than consuming it. Beaches are used all day, towns feel lived-in, and reminders about care and responsibility are quietly part of the landscape. Wildlife appears without ceremony. Observation here feels mutual.
                        </p>
                    </div>
                </div>

                {/* --- Section 2: Campeche --- */}
                <div className="w-full flex flex-col items-center space-y-12">
                    <div className="max-w-2xl text-center md:text-left">
                        <h3 className="text-3xl md:text-4xl font-bold font-handwriting mb-8 text-center">Campeche: Space, Not Spectacle</h3>
                        <p className="mb-6 text-lg">
                            Campeche feels open in every sense. The beach runs wide, backed by green hills rather than dense development, and the horizon stays uninterrupted.
                        </p>
                    </div>

                    {/* Image 5: Campeche, Unrushed + Image 3: Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
                        {[2, 3].map(idx => {
                            const block = contentBlocks[idx];
                            const img = block ? floripaImages.find(i => i.id === block.imageId) : null;
                            return img ? (
                                <div key={block.title} className="flex flex-col items-center">
                                    <img src={img.image} alt={block.title} onClick={() => handleImageClick(block.imageId)} className="rounded-lg shadow-md cursor-pointer mb-4" />
                                    <p className="text-sm italic opacity-80 text-center">{block.text}</p>
                                </div>
                            ) : null;
                        })}
                    </div>

                    <div className="max-w-2xl text-center md:text-left">
                        <p className="mb-6 text-lg">
                            People arrive with coolers, towels, and time, and tend to stay put.
                        </p>
                        <p className="mb-6 text-lg">
                            For Brazilians, Campeche is about familiarity and freedom — long days, repeated visits, and a rhythm that doesn’t change much year to year. For visitors, it’s often where the island’s pace clicks into place.
                        </p>
                        <p className="mb-6 text-lg">
                            Nothing competes for attention, and that absence of pressure becomes the appeal. Even Campeche Island just offshore feels vivid without being overworked, visited calmly rather than framed as an event.
                        </p>
                        <blockquote className="border-l-4 border-gold pl-6 italic my-10 text-xl opacity-90 text-left">
                            "Pé na areia, água de coco, beira do mar.<br />
                            Feet in the sand, coconut water, by the sea."<br />
                            <span className="text-base not-italic block mt-2 font-bold">— from “Pé na Areia”, Diogo Nogueira</span>
                        </blockquote>
                    </div>
                </div>

                {/* --- Section 3: Santo Antonio (Large group broken up) --- */}
                <div className="w-full flex flex-col items-center space-y-12">
                    <div className="max-w-2xl text-center md:text-left">
                        <h3 className="text-3xl md:text-4xl font-bold font-handwriting mb-8 text-center">Santo Antônio de Lisboa: Daily Life by the Water</h3>
                        <p className="mb-6 text-lg">
                            Santo Antônio de Lisboa sits on the quieter, bay-facing side of the island. The water is calmer here, the light softer, and evenings tend to linger.
                        </p>
                        <p className="mb-6 text-lg">
                            This geography shapes how the place is used — less about the open ocean, more about staying close.
                        </p>
                    </div>

                    {/* Images 12 & 4: Along the Shore, Lifeguard */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
                        {[4, 5].map(idx => {
                            const block = contentBlocks[idx];
                            const img = block ? floripaImages.find(i => i.id === block.imageId) : null;
                            return img ? (
                                <div key={block.title} className="flex flex-col items-center">
                                    <img src={img.image} alt={block.title} onClick={() => handleImageClick(block.imageId)} className="rounded-lg shadow-md cursor-pointer mb-4" />
                                    <p className="text-sm italic opacity-80 text-center">{block.text}</p>
                                </div>
                            ) : null;
                        })}
                    </div>

                    <div className="max-w-2xl text-center md:text-left">
                        <p className="mb-6 text-lg">
                            It’s one of the island’s older settled areas, shaped by routine rather than reinvention. Boats rest near shore, restaurants fill slowly, workshops and homes sit side by side.
                        </p>
                    </div>

                    {/* Images 17, 2, 10: Princess Flower, Figueira, Shrimp Plant */}
                    {/* Using a grid of 3 here might be too small, lets do 2 and 1 or interleaved */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
                        {[6, 7].map(idx => { // 17 (Princess), 2 (Figueira)
                            const block = contentBlocks[idx];
                            const img = block ? floripaImages.find(i => i.id === block.imageId) : null;
                            return img ? (
                                <div key={block.title} className="flex flex-col items-center">
                                    <img src={img.image} alt={block.title} onClick={() => handleImageClick(block.imageId)} className="rounded-lg shadow-md cursor-pointer mb-4" />
                                    <p className="text-sm italic opacity-80 text-center">{block.text}</p>
                                </div>
                            ) : null;
                        })}
                    </div>
                    {/* Image 10 (Shrimp) centered */}
                    {contentBlocks[8] && floripaImages.find(i => i.id === contentBlocks[8].imageId) && (
                        <div className="flex flex-col items-center max-w-2xl text-center">
                            <img
                                src={floripaImages.find(i => i.id === contentBlocks[8].imageId).image}
                                alt={contentBlocks[8].title}
                                onClick={() => handleImageClick(contentBlocks[8].imageId)}
                                className="rounded-lg shadow-md hover:opacity-95 transition-opacity cursor-pointer mb-4 max-h-[600px] w-auto"
                            />
                            <p className="text-sm italic opacity-80">{contentBlocks[8].text}</p>
                        </div>
                    )}


                    <div className="max-w-2xl text-center md:text-left">
                        <p className="mb-6 text-lg">
                            Notes left behind, handmade objects, and unhurried meals aren’t styled for visitors — they’re simply part of how the town works. For travellers, Santo Antônio offers a glimpse of Florianópolis as somewhere people live, not perform.
                        </p>
                    </div>

                    {/* Images 7, 8: Hillside, Bar do Arante */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
                        {[9, 10].map(idx => {
                            const block = contentBlocks[idx];
                            const img = block ? floripaImages.find(i => i.id === block.imageId) : null;
                            return img ? (
                                <div key={block.title} className="flex flex-col items-center">
                                    <img src={img.image} alt={block.title} onClick={() => handleImageClick(block.imageId)} className="rounded-lg shadow-md cursor-pointer mb-4" />
                                    <p className="text-sm italic opacity-80 text-center">{block.text}</p>
                                </div>
                            ) : null;
                        })}
                    </div>

                    {/* Images 6 (Snowy Egret) and the Final 4 group (15, 16, 19, 22) */}
                    {/* This group of 5 needs to be broken up. */}
                    {/* Egret + Shared Care */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
                        {[11, 12].map(idx => {
                            const block = contentBlocks[idx];
                            const img = block ? floripaImages.find(i => i.id === block.imageId) : null;
                            return img ? (
                                <div key={block.title} className="flex flex-col items-center">
                                    <img src={img.image} alt={block.title} onClick={() => handleImageClick(block.imageId)} className="rounded-lg shadow-md cursor-pointer mb-4" />
                                    <p className="text-sm italic opacity-80 text-center">{block.text}</p>
                                </div>
                            ) : null;
                        })}
                    </div>
                    {/* Above Cove + Thorns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
                        {[13, 14].map(idx => {
                            const block = contentBlocks[idx];
                            const img = block ? floripaImages.find(i => i.id === block.imageId) : null;
                            return img ? (
                                <div key={block.title} className="flex flex-col items-center">
                                    <img src={img.image} alt={block.title} onClick={() => handleImageClick(block.imageId)} className="rounded-lg shadow-md cursor-pointer mb-4" />
                                    <p className="text-sm italic opacity-80 text-center">{block.text}</p>
                                </div>
                            ) : null;
                        })}
                    </div>
                    {/* Rocks + Workshop Window */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
                        {[15, 16].map(idx => {
                            const block = contentBlocks[idx];
                            const img = block ? floripaImages.find(i => i.id === block.imageId) : null;
                            return img ? (
                                <div key={block.title} className="flex flex-col items-center">
                                    <img src={img.image} alt={block.title} onClick={() => handleImageClick(block.imageId)} className="rounded-lg shadow-md cursor-pointer mb-4" />
                                    <p className="text-sm italic opacity-80 text-center">{block.text}</p>
                                </div>
                            ) : null;
                        })}
                    </div>

                </div>

                {/* --- Section 4: Praia do Forte --- */}
                <div className="w-full flex flex-col items-center space-y-12">
                    <div className="max-w-2xl text-center md:text-left">
                        <h3 className="text-3xl md:text-4xl font-bold font-handwriting mb-8 text-center">Praia do Forte: Letting the Landscape Lead</h3>
                        <p className="mb-6 text-lg">
                            Praia do Forte feels less polished. Rocks interrupt the sand, waves arrive unevenly, and the coastline resists being smoothed out.
                        </p>
                        <p className="mb-6 text-lg">
                            It’s not dramatic, but it’s active — shaped continuously by wind, water, and light.
                        </p>
                    </div>

                    {/* Image 13 (Dusk) & 21 (Casting) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
                        {[17, 18].map(idx => {
                            const block = contentBlocks[idx];
                            const img = block ? floripaImages.find(i => i.id === block.imageId) : null;
                            return img ? (
                                <div key={block.title} className="flex flex-col items-center">
                                    <img src={img.image} alt={block.title} onClick={() => handleImageClick(block.imageId)} className="rounded-lg shadow-md cursor-pointer mb-4" />
                                    <p className="text-sm italic opacity-80 text-center">{block.text}</p>
                                </div>
                            ) : null;
                        })}
                    </div>

                    <div className="max-w-2xl text-center md:text-left">
                        <p className="mb-6 text-lg">
                            Here, Florianópolis’ relationship with nature becomes clearest. Plants lean into salt air, stones accept the tide repeatedly, and people adjust their pace without thinking about it. The landscape sets the terms, and life follows.
                        </p>
                    </div>

                    {/* Image 20 (Last Light) centered */}
                    {contentBlocks[19] && floripaImages.find(i => i.id === contentBlocks[19].imageId) && (
                        <div className="flex flex-col items-center max-w-2xl text-center">
                            <img
                                src={floripaImages.find(i => i.id === contentBlocks[19].imageId).image}
                                alt={contentBlocks[19].title}
                                onClick={() => handleImageClick(contentBlocks[19].imageId)}
                                className="rounded-lg shadow-md hover:opacity-95 transition-opacity cursor-pointer mb-4"
                            />
                            <p className="text-sm italic opacity-80">{contentBlocks[19].text}</p>
                        </div>
                    )}
                </div>

                {/* --- Section 5: Conclusion --- */}
                <div className="w-full flex flex-col items-center space-y-12">
                    <div className="max-w-2xl text-center md:text-left">
                        <h3 className="text-3xl md:text-4xl font-bold font-handwriting mb-8 text-center">This island is a good fit if…</h3>
                        <ul className="list-disc pl-5 space-y-4 mb-10 text-lg">
                            <li>You enjoy beaches that feel lived-in rather than staged, and days that don’t need much planning. You’re happy letting nature set the pace — walking, swimming, sitting, and doing it all again the next day.</li>
                            <li>You’re curious about how Brazilians travel within their own country, and you value places that feel safe, relaxed, and easy to move through. Space, greenery, and everyday rhythm matter more to you than constant activity.</li>
                        </ul>
                    </div>

                    {/* Image 25 (Arriving) + 24 (Coati) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
                        {[20, 21].map(idx => {
                            const block = contentBlocks[idx];
                            const img = block ? floripaImages.find(i => i.id === block.imageId) : null;
                            return img ? (
                                <div key={block.title} className="flex flex-col items-center">
                                    <img src={img.image} alt={block.title} onClick={() => handleImageClick(block.imageId)} className="rounded-lg shadow-md cursor-pointer mb-4" />
                                    <p className="text-sm italic opacity-80 text-center">{block.text}</p>
                                </div>
                            ) : null;
                        })}
                    </div>

                    <div className="max-w-2xl text-center md:text-left">
                        <h3 className="text-3xl md:text-4xl font-bold font-handwriting mb-8 text-center">It may not be the right fit if…</h3>
                        <ul className="list-disc pl-5 space-y-4 mb-10 text-lg">
                            <li>You’re looking for a dense city experience or a tightly structured itinerary. You prefer destinations built around landmarks, nightlife, or a sense of urgency.</li>
                            <li>You want spectacle at every turn, or beaches designed to entertain rather than to be used. Florianópolis tends to reward patience and repetition more than novelty.</li>
                        </ul>

                        <p className="mb-6 text-lg">
                            Florianópolis isn’t a place to be decoded all at once. It’s better understood gradually, through small differences between beaches, towns, and days.
                        </p>
                    </div>

                    {/* Image 9 (Small Witness) + 1 (Curassow) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
                        {[22, 23].map(idx => {
                            const block = contentBlocks[idx];
                            const img = block ? floripaImages.find(i => i.id === block.imageId) : null;
                            return img ? (
                                <div key={block.title} className="flex flex-col items-center">
                                    <img src={img.image} alt={block.title} onClick={() => handleImageClick(block.imageId)} className="rounded-lg shadow-md cursor-pointer mb-4 text-center" />
                                    <p className="text-sm italic opacity-80 text-center">{block.text}</p>
                                </div>
                            ) : null;
                        })}
                    </div>

                    <div className="max-w-2xl text-center md:text-left">
                        <p className="mb-6 text-lg">
                            If the feel of the island resonates — the space, the calm, the way nature and daily life overlap — then it’s worth exploring further in your own way, whether that’s maps, conversations, or the inevitable “things to do” lists elsewhere. This page is simply the starting point.
                        </p>
                    </div>

                    {/* Final Image 23 (Golden Hour) centered logic if needed, but it's the last one in the list (index 24) */}
                    {contentBlocks[24] && floripaImages.find(i => i.id === contentBlocks[24].imageId) && (
                        <div className="flex flex-col items-center max-w-2xl text-center">
                            <img
                                src={floripaImages.find(i => i.id === contentBlocks[24].imageId).image}
                                alt={contentBlocks[24].title}
                                onClick={() => handleImageClick(contentBlocks[24].imageId)}
                                className="rounded-lg shadow-md hover:opacity-95 transition-opacity cursor-pointer mb-4"
                            />
                            <p className="text-sm italic opacity-80">{contentBlocks[24].text}</p>
                        </div>
                    )}

                </div>
            </main>

        </div>
    );
}

export default Florianopolis;
