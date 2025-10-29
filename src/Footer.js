import React from "react";
import { Instagram, Facebook } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { trackEvent } from "./utils/analytics";

export default function Footer() {
  const location = useLocation();
  const onPreferencesPage = location.pathname === "/cookie-preferences";
  const year = new Date().getFullYear();

  const handleExternalClick = (action, category, label, url) => {
    trackEvent(action, category, label);
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
    }, 100);
  };

  const handleInternalClick = (action, category, label, url) => {
    trackEvent(action, category, label);
    setTimeout(() => {
      window.location.href = url;
    }, 100);
  };

  return (
    <footer className="w-full bg-[#5e5c35] text-[#c1c0bc] p-2 md:p-3 border-t border-[#817e65] text-xs md:text-sm">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-3 text-center md:text-left">
        
        {/* Left section */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 md:gap-4">
          
          {/* Social icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleExternalClick("click_instagram", "Footer", "Instagram", "https://www.instagram.com/nomadscribbles?igsh=NXNzcGlsNXR5amt1&utm_source=qr")}
              className="hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => handleExternalClick("click_facebook", "Footer", "Facebook", "https://www.facebook.com/yourFacebookPage")}
              className="hover:text-white transition-colors"
            >
              <Facebook className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => handleExternalClick("click_x", "Footer", "X/Twitter", "https://x.com/NomadScribblesX")}
              className="hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 170 154.06"
                fill="currentColor"
                className="w-4 h-4 md:w-5 md:h-5"
              >
                <path d="m133.88,0h26.07l-56.95,65.26,67,88.8h-52.46l-41.09-53.87-47.02,53.87H3.36l60.91-69.81L0,0h53.79l37.13,49.23L133.88,0Zm-9.14,138.42h14.45L45.93,14.82h-15.49l94.3,123.6Z"/>
              </svg>
            </button>

            {/* Small-screen favicon link */}
            <button
              onClick={() => handleInternalClick("click_contact_footer", "Footer", "Favicon Small", "/contact-us")}
              className="md:hidden hover:opacity-90 transition-transform duration-300 ease-in-out hover:scale-110"
              aria-label="Contact us"
            >
              <img
                src="/images/favicon-192x192.png"
                alt="Nomad Scribbles logo"
                className="w-4 h-4"
              />
            </button>
          </div>

          {/* Full tagline for medium+ screens */}
          <button
            onClick={() => handleInternalClick("click_contact_footer", "Footer", "Full Tagline", "/contact-us")}
            className="hidden md:flex items-center gap-2 italic transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
          >
            <img
              src="/images/favicon-192x192.png"
              alt="Nomad Scribbles logo"
              className="w-4 h-4 transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <span className="text-sm md:text-base">Wander and Wonder with us.</span>
          </button>
        </div>

        {/* Right section */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-end gap-1 md:gap-3">
          
          {/* Mobile condensed text */}
          <div className="flex md:hidden items-center gap-1">
            <span>NS &copy; {year}</span>
            {!onPreferencesPage && (
              <>
                <span>|</span>
                <button
                  onClick={() => handleInternalClick("click_cookie_footer", "Footer", "Cookie Preferences", "/cookie-preferences")}
                  className="underline text-gray-400 hover:text-white"
                >
                  Cookies
                </button>
              </>
            )}
          </div>

          {/* Desktop text */}
          <div className="hidden md:flex items-center gap-3">
            <div>&copy; {year} Nomad Scribbles</div>
            {!onPreferencesPage && (
              <button
                onClick={() => handleInternalClick("click_cookie_footer", "Footer", "Change site preferences", "/cookie-preferences")}
                className="underline text-gray-400 hover:text-white text-xs md:text-sm"
              >
                Change site preferences
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
