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

    // Define the visual order of images for Lightbox navigation
    const imageOrder = [
        "floripa14", // Feature
        "floripa18", // City Meets Sea
        "floripa2",  // Figueira
        "floripa5",  // Campeche Unrushed
        "floripa3",  // Steps
        "floripa12", // Along Shore
        "floripa4",  // Watching Water
        "floripa17", // Princess Flower
        "floripa10", // Shrimp
        "floripa8",  // Bar do Arante
        "floripa11", // Workshop
        "floripa7",  // Hillside
        "floripa6",  // Egret
        "floripa15", // Shared Care
        "floripa16", // Above Cove
        "floripa19", // Thorns
        "floripa22", // Rocks
        "floripa13", // Santo Antonio Dusk
        "floripa21", // Casting
        "floripa20", // Last Light
        "floripa25", // Arriving
        "floripa24", // Coati
        "floripa9",  // Small Witness
        "floripa1",  // Curassow
        "floripa23"  // Golden Hour
    ];

    // Derived list of images sorted by their appearance
    const sortedImages = imageOrder.map(id => floripaImages.find(img => img.id === id)).filter(Boolean);

    // Helper to open lightbox with correct index
    // Helper to open lightbox with correct index
    const handleImageClick = (imageId) => {
        const index = sortedImages.findIndex(img => img.id === imageId);
        if (index !== -1) {
            openLightbox(index, sortedImages);
        }
    };

    const getImage = (id) => floripaImages.find(i => i.id === id);

    return (
        <div className="relative min-h-screen pt-2">
            {/* SEO */}
            {/* SEO */}
            <SEO
                title="Florianópolis | Nomad Scribbles"
                description="Florianópolis: An island city where lush hills meet over 40 distinct beaches. Discover the diverse geography of Brazil's southern coast."
                image="/images/Floripa/assets_small/Floripa1z.webp"
                slug="/brazil/florianopolis"
            />

            {/* Hidden H1 */}
            <h1 className="sr-only">Florianópolis | Nomad Scribbles</h1>


            {/* Title Section */}
            <div className="flex justify-center mb-6 px-4 mt-8">
                <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-darkText tracking-tight text-center">Florianópolis</h1>
            </div>

            {/* Feature Image */}
            <div className="w-full max-w-4xl mx-auto px-4 mb-12 flex flex-col items-center">
                <img
                    src="/images/Floripa/assets_small/Floripa14.webp"
                    alt="Footprints leading to the water in Florianópolis"
                    className="w-full h-auto object-cover rounded-lg shadow-md mb-2"
                />
                <p className="text-sm italic opacity-80 text-center">Footsteps trail along the beach before dissolving into the tide.</p>
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

                    {/* Image: Where the City Meets the Sea (floripa18) */}
                    <div className="flex flex-col items-center max-w-4xl text-center">
                        <img
                            src={getImage("floripa18")?.image}
                            alt="Where the City Meets the Sea"
                            onClick={() => handleImageClick("floripa18")}
                            className="rounded-lg shadow-md hover:opacity-95 transition-opacity cursor-pointer mb-2"
                        />
                        <p className="max-w-2xl text-sm italic opacity-80">The coastline stretches wide, busy at one end and thinning into distance at the other.</p>
                    </div>

                    <div className="max-w-2xl text-center md:text-left">
                        <p className="mb-6 text-lg">
                            Families return here year after year, cities empty toward the coast in summer, and daily life stretches outward into sand, forest, and water.
                        </p>
                        <p className="mb-6 text-lg">
                            For European travellers, that distinction matters. Floripa isn’t loud or demanding. It feels safe, relaxed, and easy to move through, with an emphasis on being outdoors rather than being entertained.
                        </p>
                        <p className="mb-6 text-lg">
                            You don’t come here to collect highlights.
                            <br />You come here to settle into something that already works.
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

                    {/* Image: Figueira Centenária (floripa2) */}
                    <div className="flex flex-col items-center max-w-4xl text-center">
                        <img
                            src={getImage("floripa2")?.image}
                            alt="Figueira Centenária"
                            onClick={() => handleImageClick("floripa2")}
                            className="rounded-lg shadow-md hover:opacity-95 transition-opacity cursor-pointer mb-2"
                        />
                        <p className="max-w-2xl text-sm italic opacity-80">At the centre of the city, the fig tree anchors daily life to something far older.</p>
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

                    {/* Image: Campeche, Unrushed (floripa5) */}
                    <div className="flex flex-col items-center max-w-4xl text-center">
                        <img
                            src={getImage("floripa5")?.image}
                            alt="Campeche, Unrushed"
                            onClick={() => handleImageClick("floripa5")}
                            className="rounded-lg shadow-md hover:opacity-95 transition-opacity cursor-pointer mb-2"
                        />
                        <p className="max-w-2xl text-sm italic opacity-80">Campeche opens wide, where green edges soften into sand and the sea settles into an easy rhythm.</p>
                    </div>

                    {/* Image: Steps Toward the Atlantic (floripa3) - NO CAPTION */}
                    <div className="flex flex-col items-center max-w-4xl text-center">
                        <img
                            src={getImage("floripa3")?.image}
                            alt="Steps Toward the Atlantic"
                            onClick={() => handleImageClick("floripa3")}
                            className="rounded-lg shadow-md hover:opacity-95 transition-opacity cursor-pointer"
                        />
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

                {/* --- Section 3: Santo Antonio --- */}
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

                    {/* Image: Along the Shore (floripa12) */}
                    <div className="flex flex-col items-center max-w-4xl text-center">
                        <img
                            src={getImage("floripa12")?.image}
                            alt="Along the Shore"
                            onClick={() => handleImageClick("floripa12")}
                            className="rounded-lg shadow-md hover:opacity-95 transition-opacity cursor-pointer mb-2"
                        />
                        <p className="max-w-2xl text-sm italic opacity-80">The shoreline curves softly, where hills, boats, and shallow water settle into an easy balance.</p>
                    </div>

                    {/* Image: Watching the Water (floripa4) - NO CAPTION */}
                    <div className="flex flex-col items-center max-w-4xl text-center">
                        <img
                            src={getImage("floripa4")?.image}
                            alt="Watching the Water"
                            onClick={() => handleImageClick("floripa4")}
                            className="rounded-lg shadow-md hover:opacity-95 transition-opacity cursor-pointer"
                        />
                    </div>

                    <div className="max-w-2xl text-center md:text-left">
                        <p className="mb-6 text-lg">
                            It’s one of the island’s older settled areas, shaped by routine rather than reinvention. Boats rest near shore, restaurants fill slowly, workshops and homes sit side by side.
                        </p>
                    </div>

                    {/* Image Cluster: Princess Flower (floripa17) + Yellow Shrimp Plant (floripa10) - NO CAPTIONS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
                        {["floripa17", "floripa10"].map(id => {
                            const img = getImage(id);
                            return img ? (
                                <div key={id} className="flex flex-col items-center">
                                    <img src={img.image} alt={id} onClick={() => handleImageClick(id)} className="rounded-lg shadow-md cursor-pointer hover:opacity-95 transition-opacity" />
                                </div>
                            ) : null;
                        })}
                    </div>

                    <div className="max-w-2xl text-center md:text-left">
                        <p className="mb-6 text-lg">
                            Notes left behind, handmade objects, and unhurried meals aren’t styled for visitors — they’re simply part of how the town works. For travellers, Santo Antônio offers a glimpse of Florianópolis as somewhere people live, not perform.
                        </p>
                    </div>

                    {/* Image: Bar do Arante (floripa8) */}
                    <div className="flex flex-col items-center max-w-4xl text-center">
                        <img
                            src={getImage("floripa8")?.image}
                            alt="Bar do Arante"
                            onClick={() => handleImageClick("floripa8")}
                            className="rounded-lg shadow-md hover:opacity-95 transition-opacity cursor-pointer mb-2"
                        />
                        <p className="max-w-2xl text-sm italic opacity-80">Handwritten notes accumulate over time, turning the restaurant into a record of passing lives.</p>
                    </div>

                    {/* Image: The Workshop Window (floripa11) */}
                    <div className="flex flex-col items-center max-w-4xl text-center">
                        <img
                            src={getImage("floripa11")?.image}
                            alt="The Workshop Window"
                            onClick={() => handleImageClick("floripa11")}
                            className="rounded-lg shadow-md hover:opacity-95 transition-opacity cursor-pointer mb-2"
                        />
                        <p className="max-w-2xl text-sm italic opacity-80">Small workshops remain part of daily life, not attractions.</p>
                    </div>

                    {/* Image Cluster: Hillside (floripa7), Egret (floripa6), Shared Care (floripa15) - NO CAPTIONS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
                        {["floripa7", "floripa6", "floripa15"].map(id => {
                            const img = getImage(id);
                            return img ? (
                                <div key={id} className="flex flex-col items-center">
                                    <img src={img.image} alt={id} onClick={() => handleImageClick(id)} className="rounded-lg shadow-md cursor-pointer hover:opacity-95 transition-opacity" />
                                </div>
                            ) : null;
                        })}
                    </div>

                    {/* Image: Above the Cove (floripa16) */}
                    <div className="flex flex-col items-center max-w-4xl text-center">
                        <img
                            src={getImage("floripa16")?.image}
                            alt="Above the Cove"
                            onClick={() => handleImageClick("floripa16")}
                            className="rounded-lg shadow-md hover:opacity-95 transition-opacity cursor-pointer mb-2"
                        />
                        <p className="max-w-2xl text-sm italic opacity-80">Seen from above, the beach feels held rather than exposed.</p>
                    </div>

                    {/* Image: Thorns (floripa19) - NO CAPTION */}
                    <div className="flex flex-col items-center max-w-4xl text-center">
                        <img
                            src={getImage("floripa19")?.image}
                            alt="Thorns and Salt Air"
                            onClick={() => handleImageClick("floripa19")}
                            className="rounded-lg shadow-md hover:opacity-95 transition-opacity cursor-pointer"
                        />
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

                    {/* Image: Rocks at Praia do Forte (floripa22) */}
                    <div className="flex flex-col items-center max-w-4xl text-center">
                        <img
                            src={getImage("floripa22")?.image}
                            alt="Rocks at Praia do Forte"
                            onClick={() => handleImageClick("floripa22")}
                            className="rounded-lg shadow-md hover:opacity-95 transition-opacity cursor-pointer mb-2"
                        />
                        <p className="max-w-2xl text-sm italic opacity-80">Dark stones sit low in the surf, shaped smooth by repetition rather than force.</p>
                    </div>

                    {/* Image Pair: Santo Antonio Dusk (floripa13) + Casting (floripa21) - NO CAPTIONS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
                        {["floripa13", "floripa21"].map(id => {
                            const img = getImage(id);
                            return img ? (
                                <div key={id} className="flex flex-col items-center">
                                    <img src={img.image} alt={id} onClick={() => handleImageClick(id)} className="rounded-lg shadow-md cursor-pointer hover:opacity-95 transition-opacity" />
                                </div>
                            ) : null;
                        })}
                    </div>

                    <div className="max-w-2xl text-center md:text-left">
                        <p className="mb-6 text-lg">
                            Here, Florianópolis’ relationship with nature becomes clearest. Plants lean into salt air, stones accept the tide repeatedly, and people adjust their pace without thinking about it. The landscape sets the terms, and life follows.
                        </p>
                    </div>

                    {/* Image: Last Light on the Bay (floripa20) - NO CAPTION */}
                    <div className="flex flex-col items-center max-w-4xl text-center">
                        <img
                            src={getImage("floripa20")?.image}
                            alt="Last Light on the Bay"
                            onClick={() => handleImageClick("floripa20")}
                            className="rounded-lg shadow-md hover:opacity-95 transition-opacity cursor-pointer"
                        />
                    </div>
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

                    {/* Image: Arriving at Campeche (floripa25) */}
                    <div className="flex flex-col items-center max-w-4xl text-center">
                        <img
                            src={getImage("floripa25")?.image}
                            alt="Arriving at Campeche Island"
                            onClick={() => handleImageClick("floripa25")}
                            className="rounded-lg shadow-md hover:opacity-95 transition-opacity cursor-pointer mb-2"
                        />
                        <p className="max-w-2xl text-sm italic opacity-80">Access is simple, and the pace remains unhurried.</p>
                    </div>

                    {/* Image: Coati (floripa24) - NO CAPTION */}
                    <div className="flex flex-col items-center max-w-4xl text-center">
                        <img
                            src={getImage("floripa24")?.image}
                            alt="Coati on Campeche Island"
                            onClick={() => handleImageClick("floripa24")}
                            className="rounded-lg shadow-md hover:opacity-95 transition-opacity cursor-pointer"
                        />
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

                    {/* Image Cluster: Small Witness (floripa9), Curassow (floripa1) */}
                    <div className="flex flex-col items-center max-w-4xl text-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full mb-4">
                            {["floripa9", "floripa1"].map(id => {
                                const img = getImage(id);
                                return img ? (
                                    <div key={id} className="flex flex-col items-center">
                                        <img src={img.image} alt={id} onClick={() => handleImageClick(id)} className="rounded-lg shadow-md cursor-pointer hover:opacity-95 transition-opacity" />
                                    </div>
                                ) : null;
                            })}
                        </div>
                        <p className="max-w-2xl text-sm italic opacity-80">The Bare-faced Curassow paused long enough to watch back.</p>
                    </div>

                    <div className="max-w-2xl text-center md:text-left">
                        <p className="mb-6 text-lg">
                            If the feel of the island resonates — the space, the calm, the way nature and daily life overlap — then it’s worth exploring further in your own way, whether that’s maps, conversations, or the inevitable “things to do” lists elsewhere. This page is simply the starting point.
                        </p>
                    </div>

                    {/* Final Image: Golden Hour (floripa23) - NO CAPTION */}
                    <div className="flex flex-col items-center max-w-4xl text-center">
                        <img
                            src={getImage("floripa23")?.image}
                            alt="Golden Hour"
                            onClick={() => handleImageClick("floripa23")}
                            className="rounded-lg shadow-md hover:opacity-95 transition-opacity cursor-pointer"
                        />
                    </div>

                </div>
            </main>

        </div>
    );
}

export default Florianopolis;
