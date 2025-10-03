// CookieConsent.js
import React, { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Only run on the client
    try {
      const accepted = localStorage.getItem("cookiesAccepted");
       console.log("cookiesAccepted =", accepted); // debug
      if (!accepted) {
        setVisible(true); // show if not accepted yet
      }
    } catch (err) {
      // If localStorage not available (some incognito modes), still show
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("cookiesAccepted", "true");
    } catch (err) {
      // ignore if storage unavailable
    }
    setFade(true); // start fade-out
    setTimeout(() => setVisible(false), 300); // remove after animation
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/95 p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-4 z-[2000] transition-opacity duration-300 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <p className="text-gray-900 text-center md:text-left">
        We use cookies to improve your experience. By continuing, you agree to our use of cookies.
      </p>
      <button
        onClick={handleAccept}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        Accept
      </button>
    </div>
  );
}
