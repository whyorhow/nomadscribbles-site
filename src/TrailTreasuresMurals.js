import React from "react";
import { Link } from "react-router-dom";

export default function TrailTreasuresMurals() {
  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(/images/TrailTreasures/NSTTreasures.jpg)`, backgroundPosition: "top center" }}
    >
       {/* Logo at top-left, scrolls with page */}
       <div className="absolute top-3 left-4 z-8">
   <Logo className="h-6 w-auto sm:h-10" />
       </div>

      {/* Hero Image */}
      <div className="flex justify-center mb-6">
        <img
          src="/images/TrailTreasures/TrailTreasuresHero.png"
          alt="Trail Treasures Hero"
          className="w-2/3 lg:w-1/3 h-auto rounded-lg"
        />
      </div>

      {/* Page Title */}
      <h1 className="text-center text-[#111] text-3xl font-semibold mb-6">Murals</h1>
    </div>
  );
}
