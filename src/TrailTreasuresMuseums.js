import React from "react";
import { Link } from "react-router-dom";

export default function TrailTreasuresMuseums() {
  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(/images/TrailTreasures/NSTTreasures.jpg)`, backgroundPosition: "top center" }}
    >
      <div className="w-full text-center pt-4 pb-4">
        <Link to="/home">
          <img
            src="/images/LogoMain.png"
            alt="Nomad Scribbles Logo"
            className="w-[90%] max-w-[300px] h-auto mx-auto"
          />
        </Link>
      </div>

      <div className="flex justify-center mb-6">
        <img
          src="/images/TrailTreasures/TrailTreasuresHero.png"
          alt="Trail Treasures Hero"
          className="w-2/3 lg:w-1/3 h-auto rounded-lg"
        />
      </div>

      <h1 className="text-center text-[#111] text-3xl font-semibold mb-6">Museums</h1>
    </div>
  );
}
