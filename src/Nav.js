// src/Nav.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "./assets/images/Search.svg";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openAdventures, setOpenAdventures] = useState(false);
  const [openBrazil, setOpenBrazil] = useState(false);
  const [openSaoPaulo, setOpenSaoPaulo] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((s) => !s);
  const toggleSearch = () => setSearchOpen((s) => !s);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest?.(".burger-menu-container") && menuOpen) {
        setMenuOpen(false);
        setOpenAdventures(false);
        setOpenBrazil(false);
        setOpenSaoPaulo(false);
      }
      if (!e.target.closest?.(".search-container") && searchOpen) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    let timeout;
    const resetTimeout = () => {
      clearTimeout(timeout);
      if (menuOpen || searchOpen) {
        timeout = setTimeout(() => {
          setMenuOpen(false);
          setSearchOpen(false);
          setOpenAdventures(false);
          setOpenBrazil(false);
          setOpenSaoPaulo(false);
        }, 5000);
      }
    };
    document.addEventListener("mousemove", resetTimeout);
    document.addEventListener("keydown", resetTimeout);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("mousemove", resetTimeout);
      document.removeEventListener("keydown", resetTimeout);
      clearTimeout(timeout);
    };
  }, [menuOpen, searchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const stop = (e) => e.stopPropagation();

  const submenuClass = (isOpen) =>
    `ml-4 flex flex-col gap-1 overflow-hidden transition-all duration-300 ${
      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
    }`;

  const svgCenterX = 47.3 / 2;

  // vertical offsets for initial positions
  const topYPos = 8;
  const middleYPos = 32;
  const bottomYPos = 10;

  const topRotateDeg = 25;
  const middleRotateDeg = 0;
  const bottomRotateDeg = -22;
  const middleShiftX = 2;

  const Arrow = ({ isOpen }) => (
    <svg
      viewBox="0 0 28 28"
      className="w-4 h-4 ml-2 inline-block transform transition-transform duration-300 origin-center"
      aria-hidden="true"
    >
      <g
        id="middle"
        className={`transform transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`}
        style={{ transformOrigin: "14px 14px" }}
      >
        <path
          className="st0"
          fill="#5E5C35"
          d="M26,14.2c0.2,0.5,0,0.9,0,1c0,0.6-0.5,0.6-0.7,0.7c0,0-0.7,0.4-2.1,1c-0.5,0.2-0.8,0.5-1.6,1.1
          c-1.2,0.9-1.3,1.1-2.1,1.4c-0.5,0.2-1.2,0.7-2.2,1.1c-2.2,1.6-3.8,2.3-5,2.5c-0.3,0.1-0.9,0.1-1.6,0.5c-1.1,0.4-1.3,0.6-2.9,1.2
          c-2.3,1-2.2,0.7-2.6,1.1c-0.1,0-0.6,0.6-1.5,0.7c-0.3,0-0.6,0-1-0.2c-0.3-0.3-0.6-0.4-0.8-0.6c-0.1-0.1-0.6-0.6-0.7-1.1
          c-0.2-0.6-0.1-0.9-0.1-1.1c0.1-0.2,0.1-0.3,0.4-0.6c0.4-0.3,0.7-0.5,1.1-0.7c0.6-0.3,1.1-0.4,1.1-0.4c0.8-0.2,1.6-0.5,2.4-0.8
          c1.5-0.6,2.1-0.8,2.4-0.9c0.9-0.4,1.5-0.7,1.9-1.1c1.3-0.5,2.3-0.8,3.1-1.3c0.9-0.4,1.5-0.9,2.1-1.2c0.9-0.6,1.4-1,2.3-1.5
          c0.8-0.6,1.3-0.9,1.6-1.1c-0.3-0.2-0.8-0.5-1.6-1.1c-0.9-0.5-1.4-1-2.3-1.5c-0.6-0.3-1.3-0.7-2.1-1.2c-0.7-0.5-1.8-0.9-3.1-1.3
          C10.2,8.8,9.5,8.4,8.6,8C8.4,7.9,7.7,7.7,6.2,7.1C5.4,6.9,4.6,6.6,3.8,6.4c0,0-0.5-0.1-1.1-0.4C2.3,5.8,1.9,5.6,1.5,5.3
          C1.3,5,1.2,4.9,1.2,4.7C1.1,4.5,1,4.2,1.2,3.6c0.2-0.5,0.7-0.9,0.7-1.1c0.2-0.2,0.4-0.4,0.8-0.6c0.4-0.2,0.8-0.2,1-0.2
          c0.9,0.1,1.4,0.7,1.5,0.7c0.4,0.5,0.3,0.2,2.6,1.1c1.6,0.6,1.7,0.8,2.9,1.2c0.7,0.4,1.4,0.4,1.6,0.5c1.1,0.3,2.8,0.9,5,2.5
          c1,0.3,1.7,0.8,2.2,1.1c0.8,0.4,0.9,0.6,2.1,1.4c0.9,0.6,1.2,0.8,1.6,1.1c1.4,0.7,2.1,1,2.1,1c0.2,0.1,0.6,0.2,0.7,0.7
          C26,13.3,26.2,13.7,26,14.2z"
        />
      </g>
    </svg>
  );

  return (
    <>
<div className="search-container fixed top-2 md:top-2 right-12 z-50 flex items-center">
  <SearchIcon
    className={`cursor-pointer transition-transform duration-300 p-1 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11
      ${searchOpen ? "scale-125" : "scale-100"}`} // slightly bigger when active
    onClick={toggleSearch}
    aria-label="Open search"
  />
  <form onSubmit={handleSearchSubmit} className="relative flex items-center">
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className={`absolute right-0 px-3 py-1 rounded border border-gray-700 outline-none
        bg-[#e8eac7]/40 text-[#38350b]
        transition-all duration-300 ease-in-out
        ${searchOpen ? "w-40 sm:w-48 md:w-56 opacity-100 pointer-events-auto" : "w-0 opacity-0 pointer-events-none"}`}
      style={{ transformOrigin: "right center" }}
      aria-label="Search"
    />
  </form>
</div>

      <div
        className="burger-menu-container fixed top-6 md:top-8 right-1 z-50 cursor-pointer"
        role="button"
        aria-expanded={menuOpen}
        aria-controls="site-menu"
        onClick={toggleMenu}
      >
        <div 
className="w-14 h-7 sm:w-16 sm:h-11 md:w-18 md:h-17 flex items-center justify-center
             -translate-y-1 sm:-translate-y-1.5 md:-translate-y-4"
>
  <svg viewBox="0 0 47.3 47.3" className="w-10 h-10" style={{ overflow: "visible" }}>            {/* Top bar */}
            <g
              id="top"
              style={{
                transformBox: "fill-box",
                transformOrigin: `${svgCenterX}px ${topYPos}px`,
                transform: menuOpen
                  ? `translateY(-1px) rotate(${topRotateDeg}deg) scaleX(1.3)`
                  : `translateY(0px) rotate(0deg) scaleX(1)`,
                transition: "transform 300ms ease-in-out",
              }}
            >
              <path
                fill="#5E5C35"
                d="M8.1,1c0,0,1,0,3.1,0c0.7,0,1.3-0.1,2.6-0.3c1.9-0.3,2.2-0.3,3.4-0.4c0.7-0.1,1.8-0.1,3.2,0
                  c3.6-0.6,6-0.4,7.5-0.1c0.4,0,1.1,0.3,2.1,0.3c1.5,0.1,1.9,0,4.1,0.1c3.3,0.1,3,0.4,3.7,0.1c0.1,0,1.1-0.3,2.1,0
                  c0.3,0.1,0.7,0.3,1,0.7c0.2,0.3,0.3,0.7,0.4,1c0,0.1,0.2,0.8,0,1.4c-0.2,0.7-0.5,1-0.7,1.1s-0.4,0.3-0.9,0.4
                  c-0.7,0.1-1.2,0.1-1.8,0.1c-0.9,0-1.6-0.1-1.6-0.1c-1.1-0.1-2.2-0.3-3.2-0.4c-1.7-0.3-2.6-0.3-3-0.3c-1.3,0-2.3,0-2.9,0.1
                  c-1.8-0.1-3.3-0.3-4.4-0.3c-1.3,0-2.3,0.1-3.3,0.1c-1.3,0.1-2.4,0.1-3.8,0.3c-2.6,0.3-2.9,0.3-3.9,0.3c-0.7,0-1-0.1-1.8,0
                  c-0.8,0.1-1.2,0.3-2.2,0.3c-0.9,0-1.3-0.1-1.6-0.4c-0.1-0.1-0.3-0.4-0.4-1c0-0.3,0-0.6,0.1-1.1c0-0.4,0.1-0.6,0.1-0.7
                  c0.2-0.7,0.7-1,0.8-1.1C7.3,0.8,7.8,0.8,8.1,1z"
              />
            </g>

            {/* Middle bar */}
            <g
              id="middle"
              style={{
                transformBox: "fill-box",
                transformOrigin: `${svgCenterX}px ${middleYPos}px`,
                transform: menuOpen
                  ? `translateX(${middleShiftX + 3}px)`
                  : `translateX(0px)`,
                transition: "transform 300ms ease-in-out",
              }}
            >
              <path
                fill="#5E5C35"
                d="M39.3,11c0,0-1.1,0-3.1,0c-0.7,0-1.3-0.1-2.6-0.3c-2-0.3-2.2-0.4-3.4-0.4c-0.7,0-1.9-0.1-3.2,0
                   c-3.6-0.6-6-0.4-7.4-0.1c-0.4,0-1.1,0.3-2.2,0.3c-1.6,0.1-1.9,0-4.1,0.1c-3.2,0.1-2.9,0.4-3.7,0.1c-0.1,0-1.1-0.3-2.2,0
                   c-0.3,0.1-0.7,0.3-1,0.7c-0.2,0.4-0.3,0.7-0.4,1c0,0.1-0.2,0.8,0,1.4c0.2,0.7,0.6,1,0.8,1.1c0.2,0.1,0.4,0.3,0.9,0.4
                   c0.7,0.1,1.2,0.1,1.8,0.1c0.9,0,1.6-0.1,1.6-0.1c1.1-0.1,2.2-0.3,3.2-0.4c2.1-0.1,2.9-0.3,3.3-0.3c1.3,0,2.2,0,2.9,0.1
                   c1.8-0.1,3.2-0.3,4.4-0.1c1.3,0,2.3,0.1,3.2,0.1c1.4,0.1,2.3,0.3,3.7,0.4c2.5,0.3,2.8,0.4,3.8,0.3c0.8,0,1.1-0.1,1.8,0
                   c0.9,0.1,1.2,0.3,2.2,0.3c0.9,0,1.3-0.1,1.6-0.4c0.1-0.1,0.3-0.4,0.4-1c0-0.3,0-0.6-0.1-1.1c0-0.4-0.1-0.6-0.1-0.7
                   c-0.2-0.7-0.7-1-0.8-1.1C40.1,10.9,39.6,11,39.3,11z"
              />
            </g>

            {/* Bottom bar */}
            <g
              id="bottom"
              style={{
                transformBox: "fill-box",
                transformOrigin: `${svgCenterX}px ${bottomYPos}px`,
                transform: menuOpen
                  ? `translateY(-1px) translateX(3px) rotate(${bottomRotateDeg}deg) scaleX(1.3)`
                  : `translateY(-1px) translateX(0px) rotate(0deg) scaleX(1)`,
                transition: "transform 300ms ease-in-out",
              }}
            >
              <path
                fill="#5E5C35"
                d="M33.9,25.5c-0.8,0-1.8-0.1-3.8-0.1c-1.3,0-2.4,0-3.2,0c-3.6,0.6-6,0.4-7.5,0.1
                   c-0.4,0-1.1-0.3-2.1-0.3c-1.5-0.1-1.9,0-4.1-0.1c-3.3-0.1-3-0.4-3.7-0.1c-0.1,0-1.1,0.3-2.1,0c-0.3-0.1-0.7-0.3-1-0.7
                   c-0.2-0.3-0.3-0.7-0.4-1c0-0.1-0.2-0.8,0-1.4c0.2-0.7,0.5-1,0.7-1.1s0.4-0.3,0.9-0.4c0.7-0.1,1.2-0.1,1.8-0.1
                   c0.9,0,1.6,0.1,1.6,0.1c1.1,0.1,2.2,0.3,3.2,0.4c1.7,0.3,2.6,0.3,3,0.3c1.3,0,2.3,0,2.9-0.1c1.8,0.1,3.3,0.3,4.4,0.3
                   c1.3,0,1.4-0.1,3.3-0.1c3.2-0.1,3.4,0.1,5.8,0c2.3-0.1,3.4-0.2,3.9-0.3c0.5-0.1,1.4-0.3,2.6-0.1c0.4,0.1,0.7,0.2,0.9,0.3
                   c0.2,0.4,0.3,0.9,0.4,1.6c0,0.6,0,1.1-0.1,1.5c-0.2,0.2-0.4,0.5-0.8,0.7c-0.8,0.5-1.5,0.6-1.9,0.6
                   C36.9,25.7,35.3,25.5,33.9,25.5z"
              />
            </g>
          </svg>
        </div>
      </div>

      <div
        id="site-menu"
        className={`fixed top-0 right-0 h-full w-64 z-40 flex flex-col pt-12 p-4 gap-2 text-lg overflow-y-auto
          transform transition-transform duration-300
          bg-[#e8eac7]/40
          ${menuOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"}`}
        onClick={stop}
      >
        <Link className="text-[#38350b] text-lg hover:text-[#0c0b01]" to="/home">Home</Link>

        <div className="flex flex-col">
          <div className="flex justify-between items-center w-full">
            <Link className="text-[#38350b] text-lg hover:text-[#0c0b01]" to="/adventures">Adventures Blog</Link>
<button onClick={() => setOpenAdventures((s) => !s)} className="focus:outline-none" aria-label="Toggle travel submenu">
  <Arrow isOpen={openAdventures} />
</button>
          </div>

          <div className={submenuClass(openAdventures)}>
            <div className="flex justify-between items-center w-full">
              <Link className="text-[#38350b] text-base hover:text-[#0c0b01]" to="/brazil">Brazil</Link>
              <button onClick={() => setOpenBrazil((s) => !s)} className="focus:outline-none" aria-label="Toggle brazil submenu">
                <Arrow isOpen={openBrazil} />
              </button>
            </div>

            <div className={submenuClass(openBrazil)}>
              <div className="flex justify-between items-center w-full">
                <Link className="text-[#38350b] text-base hover:text-[#0c0b01]" to="/brazil/saopaulo">São Paulo</Link>
                <button onClick={() => setOpenSaoPaulo((s) => !s)} className="focus:outline-none" aria-label="Toggle saopaulo submenu">
                  <Arrow isOpen={openSaoPaulo} />
                </button>
              </div>

              <div className={submenuClass(openSaoPaulo)}>
                <Link to="/brazil/saopaulo/parks" className="text-[#38350b] text-base hover:text-[#0c0b01]">Parks</Link>
                <Link to="/brazil/saopaulo/museums" className="text-[#38350b] text-base hover:text-[#0c0b01]">Museums</Link>
                <Link to="/brazil/saopaulo/carnival" className="text-[#38350b] text-base hover:text-[#0c0b01]">Carnival</Link>
                <Link to="/brazil/saopaulo/murals" className="text-[#38350b] text-base hover:text-[#0c0b01]">Murals</Link>
                <Link to="/brazil/saopaulo/santos" className="text-[#38350b] text-base hover:text-[#0c0b01]">Santos</Link>
              </div>
            </div>
          </div>
        </div>

        <Link className="text-[#38350b] text-lg hover:text-[#0c0b01]" to="/nomads-shop">Nomads Shop</Link>
        <Link className="text-[#38350b] text-lg hover:text-[#0c0b01]" to="/nomads-gallery">Nomads Gallery</Link>
        <Link className="text-[#38350b] text-lg hover:text-[#0c0b01]" to="/news">News</Link>
        <Link className="text-[#38350b] text-lg hover:text-[#0c0b01]" to="/contact-us">Contact Us</Link>
      </div>
    </>
  );
}

export default Nav;
