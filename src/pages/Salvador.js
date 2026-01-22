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

    return (
        <div className="relative min-h-screen pt-2">
            {/* SEO */}
            <SEO
                title="Salvador | Nomad Scribbles"
                description="Discover Salvador, the soulful capital of Bahia, known for its Portuguese colonial architecture, Afro-Brazilian culture, and tropical coastline."
                image="/images/Salvador/small/Salvador1.webp"
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
                    src={process.env.PUBLIC_URL + "/images/Salvador/small/Salvador1.webp"}
                    alt="Salvador landscape"
                    loading="lazy"
                    className="w-full max-w-[600px] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[800px] h-auto rounded-lg shadow-lg"
                />
            </div>

            {/* Salvador Title */}
            <div className="flex justify-center mb-6 mt-4">
                <h2 className="text-4xl sm:text-5xl font-bold text-center text-[#E5CF6B] font-cormorant">
                    Salvador
                </h2>
            </div>

            <main className="px-2 py-2 max-w-screen-lg mx-auto space-y-6 font-cormorant text-primaryText leading-relaxed">
                <p className="text-center text-sm sm:text-base mb-8 max-w-2xl mx-auto">
                    Explore the vibrant heart of Afro-Brazilian culture, where history, music, and colour fill every street.
                </p>

                {salvadorImages.map((img, idx) => (
                    <div
                        key={img.id}
                        className={`flex flex-col lg:flex-row items-center justify-center gap-6 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                            }`}
                    >
                        <img
                            src={img.blogimage}
                            alt={img.title}
                            loading="lazy"
                            onClick={() => setCurrentIndex(idx)}
                            className="rounded-lg cursor-pointer w-full sm:w-3/4 md:w-2/3 lg:w-2/5 h-auto shadow-md hover:opacity-95 transition-opacity"
                        />
                        <div className="p-4 rounded-md flex-1 text-left text-sm sm:text-base">
                            <h2 className="font-bold text-lg mb-2">{img.title}</h2>
                            <p>{img.description}</p>
                        </div>
                    </div>
                ))}
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
