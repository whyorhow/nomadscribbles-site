import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

function News() {
  return (
    <div
      className="app-container news min-h-screen pt-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/images/PlacesetterBackground.jpg"})` }}
    >
      {/* Logo at top-left, scrolls with page */}
      <div className="absolute top-3 left-4 z-8">
  <Logo className="h-6 w-auto sm:h-10" />
      </div>

      {/* Hero Image */}
      <div className="flex justify-center mb-6">
        <img
          src={process.env.PUBLIC_URL + "/images/SaoPauloHeroImage.jpeg"}
          alt="São Paulo city skyline under bright sky"
          className="w-[800px] max-w-[95%] h-auto rounded-lg"
        />
      </div>

      {/* Page Title */}
      <h1 className="text-center text-[#111] text-3xl font-semibold mb-6">News</h1>

      {/* Main Content */}
      <main className="px-4 py-8 max-w-screen-md mx-auto leading-relaxed space-y-6 text-center text-[#111]">
        <p>
          Stay updated with our latest events and stories.
        </p>
      </main>
    </div>
  );
}

export default News;
