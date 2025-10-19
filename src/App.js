import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NomadsShop from "./NomadsShop";
import NomadsShopBrazil from "./NomadsShopBrazil";
import NomadsShopSaoPaulo from "./NomadsShopSaoPaulo";
import NomadsGallery from "./NomadsGallery";
import Adventures from "./Adventures";
import Brazil from "./Brazil";
import SaoPaulo from "./SaoPaulo";
import Parks from "./Parks";
import Museums from "./Museums";
import Carnival from "./Carnival";
import Murals from "./Murals";
import Santos from "./Santos";
import ContactUs from "./ContactUs";
import SearchResults from "./SearchResults";
import CookieConsent from "./CookieConsent";
import CookiePreferences from "./CookiePreferences";
import Lightbox from "./Lightbox";

// Page title manager
function PageTitleManager() {
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/":
      case "/home":
        document.title = "Nomad Scribbles | Travel & Stories";
        break;
      case "/brazil/saopaulo":
        document.title = "Nomad Scribbles | São Paulo Carnival";
        break;
      case "/brazil/saopaulo/parks":
        document.title = "Nomad Scribbles | São Paulo Parks";
        break;
      case "/brazil/saopaulo/museums":
        document.title = "Nomad Scribbles | São Paulo Museums";
        break;
      case "/brazil/saopaulo/carnival":
        document.title = "Nomad Scribbles | São Paulo Carnival";
        break;
      case "/brazil/saopaulo/murals":
        document.title = "Nomad Scribbles | São Paulo Murals";
        break;
      case "/brazil/saopaulo/santos":
        document.title = "Nomad Scribbles | Santos";
        break;
      case "/nomads-shop":
        document.title = "Nomad Scribbles | Shop";
        break;
      case "/nomads-shop/brazil":
        document.title = "Nomad Scribbles | Shop Brazil";
        break;
      case "/nomads-shop/brazil/saopaulo":
        document.title = "Nomad Scribbles | Shop São Paulo";
        break;
      case "/nomads-gallery":
        document.title = "Nomad Scribbles | Gallery";
        break;
      case "/adventures":
        document.title = "Nomad Scribbles | Adventures";
        break;
      case "/contact-us":
        document.title = "Nomad Scribbles | Contact Us";
        break;
      case "/search":
        document.title = "Nomad Scribbles | Search Results";
        break;
      case "/cookie-preferences":
        document.title = "Nomad Scribbles | Cookie Preferences";
        break;
      default:
        document.title = "Nomad Scribbles";
    }
  }, [location]);
  return null;
}

function App() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxAlts, setLightboxAlts] = useState([]);
  const [lightboxPurchaseLinks, setLightboxPurchaseLinks] = useState([]);

  // State for cookie consent
  const [cookiesAccepted, setCookiesAccepted] = useState(null);

  // Load stored consent
  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted") === "true";
    const rejected = localStorage.getItem("cookiesRejected") === "true";
    if (accepted) setCookiesAccepted(true);
    else if (rejected) setCookiesAccepted(false);
  }, []);

  const handleConsentChange = (choice) => {
    setCookiesAccepted(choice);
    if (choice === true) {
      localStorage.setItem("cookiesAccepted", "true");
      localStorage.removeItem("cookiesRejected");
    } else if (choice === false) {
      localStorage.setItem("cookiesRejected", "true");
      localStorage.removeItem("cookiesAccepted");
    } else {
      // specific non-essential only
      localStorage.setItem("cookiesAccepted", "partial");
      localStorage.removeItem("cookiesRejected");
    }
  };

  const openLightbox = (index, images, alts = [], purchaseLinks = []) => {
    setLightboxImages(images);
    setLightboxAlts(alts);
    setLightboxPurchaseLinks(purchaseLinks);
    setLightboxIndex(index);
  };

  return (

  <Router>
    {/* Global background wrapper */}
<div className="min-h-screen flex flex-col bg-[#54644f] text-[#eeda8d]">
        <PageTitleManager />      
      <Nav />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home openLightbox={openLightbox} />} />
            <Route path="/home" element={<Home openLightbox={openLightbox} />} />
            <Route path="/adventures" element={<Adventures openLightbox={openLightbox} />} />
            <Route path="/nomads-shop" element={<NomadsShop openLightbox={openLightbox} />} />
            <Route path="/nomads-shop/brazil" element={<NomadsShopBrazil openLightbox={openLightbox} />} />
            <Route path="/nomads-shop/brazil/saopaulo" element={<NomadsShopSaoPaulo openLightbox={openLightbox} />} />
            <Route path="/brazil" element={<Brazil openLightbox={openLightbox} />} />
            <Route path="/brazil/saopaulo" element={<SaoPaulo openLightbox={openLightbox} />} />
            <Route path="/brazil/saopaulo/parks" element={<Parks openLightbox={openLightbox} />} />
            <Route path="/brazil/saopaulo/museums" element={<Museums openLightbox={openLightbox} />} />
            <Route path="/brazil/saopaulo/carnival" element={<Carnival openLightbox={openLightbox} />} />
            <Route path="/brazil/saopaulo/murals" element={<Murals openLightbox={openLightbox} />} />
            <Route path="/brazil/saopaulo/santos" element={<Santos openLightbox={openLightbox} />} />
            <Route path="/nomads-gallery" element={<NomadsGallery openLightbox={openLightbox} />} />
            <Route path="/contact-us" element={<ContactUs openLightbox={openLightbox} />} />
            <Route path="/search" element={<SearchResults openLightbox={openLightbox} />} />

            {/* Cookie Preferences Page */}
            <Route
              path="/cookie-preferences"
              element={
                <CookiePreferences
                  cookiesAccepted={cookiesAccepted}
                  onConsentChange={handleConsentChange}
                />
              }
            />
          </Routes>
        </div>
      </div>

      {/* Cookie Consent Popup - hide on preferences page */}
      {cookiesAccepted === null && window.location.pathname !== "/cookie-preferences" && (
        <CookieConsent
          onAccept={() => handleConsentChange(true)}
          onReject={() => handleConsentChange(false)}
        />
      )}

      <Footer cookiesAccepted={cookiesAccepted} />
      <Lightbox
        images={lightboxImages}
        alts={lightboxAlts}
        purchaseLinks={lightboxPurchaseLinks}
        storeLink="/nomads-shop/brazil/saopaulo"
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
        showPrev={() =>
          setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)
        }
        showNext={() => setLightboxIndex((prev) => (prev + 1) % lightboxImages.length)}
      />
    </Router>
  );
}

export default App;
