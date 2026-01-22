import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from 'react-helmet-async';

// --- Pages ---
import Home from "./pages/Home";
import Adventures from "./pages/Adventures";
import NomadsShop from "./pages/NomadsShop";
import NomadsShopBrazil from "./pages/NomadsShopBrazil";
import Brazil from "./pages/Brazil";
import SaoPaulo from "./pages/SaoPaulo";
import Parks from "./pages/Parks";
import Museums from "./pages/Museums";
import Carnival from "./pages/Carnival";
import Murals from "./pages/Murals";
import Santos from "./pages/Santos";
import Pantanal from "./pages/Pantanal";
import Rio from "./pages/Rio";
import NomadsGallery from "./pages/NomadsGallery";
import ContactUs from "./pages/ContactUs";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";
import CookiePreferences from "./pages/CookiePreferences";

// --- Components ---
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Lightbox from "./components/Lightbox";
import CookieConsent from "./components/CookieConsent";

// --- Utilities ---
import { trackEvent, trackPageView } from "./utils/analytics";

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

// Page view tracker
function PageViewTracker({ cookiesAccepted }) {
  const location = useLocation();
  useEffect(() => {
    if (cookiesAccepted) {
      trackPageView(location.pathname + location.search);
    }
  }, [location, cookiesAccepted]);
  return null;
}

function App() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxAlts, setLightboxAlts] = useState([]);
  const [lightboxPurchaseLinks, setLightboxPurchaseLinks] = useState([]);
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
      localStorage.setItem("cookiesAccepted", "partial");
      localStorage.removeItem("cookiesRejected");
    }
  };

  const openLightbox = (index, images, alts = [], purchaseLinks = []) => {
    setLightboxImages(images);
    setLightboxAlts(alts);
    setLightboxPurchaseLinks(purchaseLinks);
    setLightboxIndex(index);

    if (cookiesAccepted) {
      trackEvent('open_lightbox', 'Engagement', images[index] || 'Unknown image');
    }
  };

  return (
    <HelmetProvider>
      <Router>
        {/* GA script */}
        {cookiesAccepted && (
          <Helmet>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-87DFFWTXFM"></script>
            <script>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-87DFFWTXFM');
              `}
            </script>
          </Helmet>
        )}

        {/* --- Global wrapper with gradient using Tailwind arbitrary values --- */}
        <div className="min-h-screen flex flex-col bg-[linear-gradient(to_bottom,#575E38,#292D18)] text-[#E5CF6B]">
          <PageTitleManager />
          <PageViewTracker cookiesAccepted={cookiesAccepted} />
          <Nav />

          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home openLightbox={openLightbox} />} />
              <Route path="/home" element={<Home openLightbox={openLightbox} />} />
              <Route path="/adventures" element={<Adventures openLightbox={openLightbox} />} />
              <Route path="/nomadsshop" element={<NomadsShop />} />
              <Route path="/nomads-shop" element={<NomadsShop />} />
              <Route path="/nomads-shop/brazil" element={<NomadsShopBrazil />} />
              <Route path="/brazil" element={<Brazil openLightbox={openLightbox} />} />
              <Route path="/brazil/rio" element={<Rio />} />
              <Route path="/brazil/pantanal" element={<Pantanal />} />
              <Route path="/brazil/saopaulo" element={<SaoPaulo openLightbox={openLightbox} />} />
              <Route path="/brazil/saopaulo/parks" element={<Parks openLightbox={openLightbox} />} />
              <Route path="/brazil/saopaulo/museums" element={<Museums openLightbox={openLightbox} />} />
              <Route path="/brazil/saopaulo/carnival" element={<Carnival openLightbox={openLightbox} />} />
              <Route path="/brazil/saopaulo/murals" element={<Murals openLightbox={openLightbox} />} />
              <Route path="/brazil/saopaulo/santos" element={<Santos openLightbox={openLightbox} />} />
              <Route path="/nomads-gallery" element={<NomadsGallery openLightbox={openLightbox} />} />
              <Route path="/contact-us" element={<ContactUs openLightbox={openLightbox} />} />
              <Route path="/search" element={<SearchResults openLightbox={openLightbox} />} />
              <Route path="*" element={<NotFound />} />
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

        {/* Cookie Consent Popup */}
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
          storeLink="https://nomadscribbles.co.uk/shop"
          currentIndex={lightboxIndex}
          setCurrentIndex={setLightboxIndex}
          showPrev={() =>
            setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)
          }
          showNext={() =>
            setLightboxIndex((prev) => (prev + 1) % lightboxImages.length)
          }
        />
      </Router>
    </HelmetProvider>
  );
}

export default App;