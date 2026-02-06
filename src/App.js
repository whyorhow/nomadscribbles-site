import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from 'react-helmet-async';

// --- Pages (Lazy Loaded) ---
const Home = lazy(() => import("./pages/Home"));
const Adventures = lazy(() => import("./pages/Adventures"));
const NomadsShop = lazy(() => import("./pages/NomadsShop"));
const NomadsShopBrazil = lazy(() => import("./pages/NomadsShopBrazil"));
const NomadsShopSaoPaulo = lazy(() => import("./pages/NomadsShopSaoPaulo"));
const NomadsShopCategory = lazy(() => import("./pages/NomadsShopCategory"));
const Brazil = lazy(() => import("./pages/Brazil"));
const SaoPaulo = lazy(() => import("./pages/SaoPaulo"));
const Parks = lazy(() => import("./pages/Parks"));
const Museums = lazy(() => import("./pages/Museums"));
const Carnival = lazy(() => import("./pages/Carnival"));
const Murals = lazy(() => import("./pages/Murals"));
const Santos = lazy(() => import("./pages/Santos"));
const Pantanal = lazy(() => import("./pages/Pantanal"));
const Rio = lazy(() => import("./pages/Rio"));
const Salvador = lazy(() => import("./pages/Salvador"));
const NomadsGallery = lazy(() => import("./pages/NomadsGallery"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CookiePreferences = lazy(() => import("./pages/CookiePreferences"));

// --- Components ---
import Nav from "./components/Nav";
import VisualHeader from "./components/VisualHeader";
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

// Scroll to top on route change
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function MainContent({
  openLightbox,
  cookiesAccepted,
  handleConsentChange,
  lightboxImages,
  lightboxAlts,
  lightboxPurchaseLinks,
  lightboxIndex,
  setLightboxIndex
}) {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isHome
      ? "bg-main-gradient text-darkText"
      : "bg-stony-paper text-darkText"
      }`}>
      <PageTitleManager />
      <PageViewTracker cookiesAccepted={cookiesAccepted} />
      <Nav />
      {!isHome && <VisualHeader />}

      <main role="main" className={`flex-grow ${!isHome ? "pt-12" : ""}`}>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home openLightbox={openLightbox} />} />
            <Route path="/home" element={<Home openLightbox={openLightbox} />} />
            <Route path="/adventures" element={<Adventures openLightbox={openLightbox} />} />
            <Route path="/nomadsshop" element={<NomadsShop />} />
            <Route path="/nomads-shop" element={<NomadsShop />} />
            <Route path="/nomads-shop/brazil" element={<NomadsShopBrazil />} />
            <Route path="/nomads-shop/brazil/saopaulo" element={<NomadsShopSaoPaulo openLightbox={openLightbox} />} />
            <Route path="/nomads-shop/brazil/:city" element={<NomadsShopCategory openLightbox={openLightbox} />} />
            <Route path="/brazil" element={<Brazil openLightbox={openLightbox} />} />
            <Route path="/brazil/rio" element={<Rio />} />
            <Route path="/brazil/salvador" element={<Salvador />} />
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
        </Suspense>
      </main>

      {/* Cookie Consent Popup */}
      {cookiesAccepted === null && location.pathname !== "/cookie-preferences" && (
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
    </div>
  );
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

        <MainContent
          openLightbox={openLightbox}
          cookiesAccepted={cookiesAccepted}
          handleConsentChange={handleConsentChange}
          lightboxImages={lightboxImages}
          lightboxAlts={lightboxAlts}
          lightboxPurchaseLinks={lightboxPurchaseLinks}
          lightboxIndex={lightboxIndex}
          setLightboxIndex={setLightboxIndex}
        />
      </Router>
    </HelmetProvider>
  );
}

export default App;