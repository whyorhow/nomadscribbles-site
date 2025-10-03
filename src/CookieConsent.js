// CookieConsent.js
import React, { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem("cookiesAccepted");
      const rejected = localStorage.getItem("cookiesRejected");
      if (!accepted && !rejected) {
        setVisible(true); // show banner if no decision made
      }
    } catch (err) {
      setVisible(true); // fallback if storage not available
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("cookiesAccepted", "true");
      localStorage.removeItem("cookiesRejected");
    } catch (err) {}
    fadeOut();
  };

  const handleReject = () => {
    try {
      localStorage.setItem("cookiesRejected", "true");
      localStorage.removeItem("cookiesAccepted");
    } catch (err) {}
    fadeOut();
  };

  const fadeOut = () => {
    setFade(true);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/95 p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-4 z-[2000] transition-opacity duration-300 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <p className="text-gray-900 text-center md:text-left flex-1">
        We use cookies to improve your experience. You can choose to accept or reject non-essential cookies.
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleAccept}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition"
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
