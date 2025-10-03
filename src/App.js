import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NomadsShop from "./NomadsShop";
import NomadsShopBrazil from "./NomadsShopBrazil";
import NomadsShopSaoPaulo from "./NomadsShopSaoPaulo";
import NomadsGallery from "./NomadsGallery";
import News from "./News";
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
import CookieConsent from "./CookieConsent"; // now active again

import Lightbox from "./Lightbox";

function App() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxAlts, setLightboxAlts] = useState([]);
  const [lightboxPurchaseLinks, setLightboxPurchaseLinks] = useState([]);

  // global function pages can call to open the lightbox
  const openLightbox = (index, images, alts = [], purchaseLinks = []) => {
    setLightboxImages(images);
    setLightboxAlts(alts);
    setLightboxPurchaseLinks(purchaseLinks);
    setLightboxIndex(index);
  };

  return (
    <Router>
      <Nav />

      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home openLightbox={openLightbox} />} />
            <Route path="/home" element={<Home openLightbox={openLightbox} />} />
            <Route
              path="/adventures"
              element={<Adventures openLightbox={openLightbox} />}
            />
            <Route
              path="/nomads-shop"
              element={<NomadsShop openLightbox={openLightbox} />}
            />
            <Route
              path="/nomads-shop/brazil"
              element={<NomadsShopBrazil openLightbox={openLightbox} />}
            />
            <Route
              path="/nomads-shop/brazil/saopaulo"
              element={<NomadsShopSaoPaulo openLightbox={openLightbox} />}
            />

            <Route path="/brazil" element={<Brazil openLightbox={openLightbox} />} />
            <Route
              path="/brazil/saopaulo"
              element={<SaoPaulo openLightbox={openLightbox} />}
            />
            <Route
              path="/brazil/saopaulo/parks"
              element={<Parks openLightbox={openLightbox} />}
            />
            <Route
              path="/brazil/saopaulo/museums"
              element={<Museums openLightbox={openLightbox} />}
            />
            <Route
              path="/brazil/saopaulo/carnival"
              element={<Carnival openLightbox={openLightbox} />}
            />
            <Route
              path="/brazil/saopaulo/murals"
              element={<Murals openLightbox={openLightbox} />}
            />
            <Route
              path="/brazil/saopaulo/santos"
              element={<Santos openLightbox={openLightbox} />}
            />

            <Route
              path="/nomads-gallery"
              element={<NomadsGallery openLightbox={openLightbox} />}
            />
            <Route path="/news" element={<News openLightbox={openLightbox} />} />
            <Route
              path="/contact-us"
              element={<ContactUs openLightbox={openLightbox} />}
            />
            <Route
              path="/search"
              element={<SearchResults openLightbox={openLightbox} />}
            />
          </Routes>
        </div>
      </div>

      <CookieConsent />  {/* cookie popup active again */}
      <Footer />

      <Lightbox
        images={lightboxImages}
        alts={lightboxAlts}
        purchaseLinks={lightboxPurchaseLinks}
        storeLink="/nomads-shop/brazil/saopaulo"
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
        showPrev={() =>
          setLightboxIndex(
            (prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length
          )
        }
        showNext={() =>
          setLightboxIndex((prev) => (prev + 1) % lightboxImages.length)
        }
      />
    </Router>
  );
}

export default App;
