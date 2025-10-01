import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

function Brazil() {
  return (
    <div className="min-h-screen bg-brazil-tiles bg-repeat bg-tiles pt-4 relative">

      {/* Logo at top-left, scrolls with page */}
      <div className="absolute top-4 left-4 z-10">
        <Link to="/home">
          <Logo className="h-4 w-auto sm:h-8" />
        </Link>
      </div>

      {/* Hero Image under Logo */}
      <div className="flex justify-center my-10">
        <img
          src="/images/Brazil/BrazilHero.jpg"
          alt="Brazilian landscape with city and nature"
          className="w-[800px] max-w-[95%] h-auto rounded-lg"
        />
      </div>

      {/* Page Title */}
      <h1 className="text-center text-3xl font-semibold text-gray-900 mb-6">
        Brazil
      </h1>

      {/* Main Content */}
      <main className="px-4 py-8 max-w-screen-md mx-auto space-y-6">
        <p className="text-center text-gray-900">
          Explore this amazing country!
        </p>
      </main>
    </div>
  );
}

export default Brazil;
