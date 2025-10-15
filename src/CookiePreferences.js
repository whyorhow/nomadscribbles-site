// CookiePreferences.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

export default function CookiePreferences() {
  const navigate = useNavigate();
  const [cookiesAccepted, setCookiesAccepted] = useState(null); // null = no choice yet
  const [nonEssential, setNonEssential] = useState(false);

  // Load saved choices
  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    const rejected = localStorage.getItem("cookiesRejected");
    const nonEssentialStored = localStorage.getItem("cookiesNonEssential") === "true";

    if (accepted === "true") setCookiesAccepted(true);
    else if (rejected === "true") setCookiesAccepted(false);

    setNonEssential(nonEssentialStored);
  }, []);

  const handleChoice = (choice) => {
    if (choice === "acceptAll") {
      setCookiesAccepted(true);
      setNonEssential(true);
      localStorage.setItem("cookiesAccepted", "true");
      localStorage.setItem("cookiesNonEssential", "true");
      localStorage.removeItem("cookiesRejected");
    } else if (choice === "rejectAll") {
      setCookiesAccepted(false);
      setNonEssential(false);
      localStorage.setItem("cookiesRejected", "true");
      localStorage.removeItem("cookiesAccepted");
      localStorage.removeItem("cookiesNonEssential");
    } else if (choice === "nonEssentialOnly") {
      setCookiesAccepted(true);
      setNonEssential(false);
      localStorage.setItem("cookiesAccepted", "true");
      localStorage.setItem("cookiesNonEssential", "false");
      localStorage.removeItem("cookiesRejected");
    }
  };

  const handleSaveAndReturn = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-white"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/Home/Background2.jpg)`,
      }}
    >
      {/* Logo */}
      <div className="absolute top-3 left-4 z-10">
        <Logo className="h-6 w-auto sm:h-10" />
      </div>

      <main className="px-4 py-8 max-w-4xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold mb-6">Privacy & Cookie Policy</h1>

        <section>
          <p>
            At Nomad Scribbles, we respect your privacy and are committed to protecting your personal data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Cookies</h2>
          <p>
            We use cookies to enhance your experience on our website. These include essential cookies for site
            functionality and optional cookies for analytics or marketing. By accepting cookies, you allow us to
            collect anonymised data to understand how our site is used and improve your experience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">External Links & Recommendations</h2>
          <p>
            Our site may include links to external recommended sites. These may use their own cookies or tracking
            technologies. We do not control these sites, so please review their privacy policies independently.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Your Choices</h2>
          <p>
            Choose your cookie preference below. Essential cookies will always operate.
          </p>

          <div className="mt-2 flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={cookiesAccepted && nonEssential}
                onChange={() => handleChoice("acceptAll")}
              />
              Accept all cookies
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={cookiesAccepted && !nonEssential}
                onChange={() => handleChoice("nonEssentialOnly")}
              />
              Accept essential only
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={cookiesAccepted === false}
                onChange={() => handleChoice("rejectAll")}
              />
              Reject all non-essential cookies
            </label>
          </div>

          <button
            onClick={handleSaveAndReturn}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition-all duration-200"
          >
            Save choices and return
          </button>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Affiliate & Sponsored Content</h2>
          <p>
            Some links may support Nomad Scribbles through affiliate programs. Clicking these links means you are
            visiting a recommended site, and we may receive a small commission at no extra cost to you.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <p>
            For any questions regarding this policy, please visit our{" "}
            <Link to="/contact-us" className="underline text-blue-400 hover:text-blue-300">
              Contact page
            </Link>.
          </p>
        </section>
      </main>
    </div>
  );
}
