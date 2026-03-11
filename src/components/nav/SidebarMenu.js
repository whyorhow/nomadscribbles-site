import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Arrow = ({ isOpen }) => (
    <svg
        viewBox="0 0 28 28"
        className="w-4 h-4 ml-2 inline-block transform origin-center"
        aria-hidden="true"
    >
        <motion.g
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ transformOrigin: "14px 14px" }}
        >
            <path
                fill="#ceb752"
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
        </motion.g>
    </svg>
);

const menuData = [
    { title: "Home", path: "/home" },
    {
        title: "Adventures Blog",
        path: "/adventures",
        children: [
            {
                title: "Brazil",
                path: "/brazil",
                children: [
                    {
                        title: "São Paulo",
                        path: "/brazil/saopaulo",
                        children: [
                            { title: "Parks", path: "/brazil/saopaulo/parks" },
                            { title: "Art Galleries", path: "/brazil/saopaulo/museums" },
                            { title: "Carnival", path: "/brazil/saopaulo/carnival" },
                            { title: "Street Murals", path: "/brazil/saopaulo/murals" },
                            { title: "Santos", path: "/brazil/saopaulo/santos" },
                        ]
                    },
                    { title: "Florianópolis", path: "/brazil/florianopolis" },
                    { title: "The Pantanal", path: "/brazil/pantanal" },
                    { title: "Bonito", path: "/brazil/bonito" },
                    { title: "Manaus", path: "/brazil/manaus" },
                    { title: "Ilha Grande", path: "/brazil/ilha-grande" },
                    { title: "Rio de Janeiro", path: "/brazil/rio" },
                    { title: "Salvador", path: "/brazil/salvador" },
                    { title: "Foz do Iguaçu", path: "/brazil/foz" },
                ]
            },
            {
                title: "United States",
                path: "/united-states",
                children: [
                    {
                        title: "Tennessee",
                        path: "/united-states/tennessee",
                        children: [
                            { title: "Mountains", path: "/united-states/tennessee/mountains" },
                            { title: "Memphis", path: "/united-states/tennessee/memphis" },
                            { title: "Nashville", path: "/united-states/tennessee/nashville" },
                        ]
                    }
                ]
            }
        ]
    },
    { title: "Nomads Shop", path: "/nomadsshop" },
    { title: "Nomads Gallery", path: "/nomads-gallery" },
    { title: "Contact Us", path: "/contact-us" },
];

const MenuItem = ({ item, depth = 0, setMenuOpen }) => {
    const [isOpen, setIsOpen] = useState(false);

    const hasChildren = item.children && item.children.length > 0;

    const toggleSubmenu = (e) => {
        if (hasChildren) {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(!isOpen);
            if (window.gtag) {
                window.gtag("event", `${item.title.toLowerCase().replace(/\s+/g, '_')}_toggle`, {
                    event_category: "Navigation",
                    event_label: !isOpen ? "open" : "close",
                });
            }
        }
    };

    return (
        <div className="flex flex-col">
            <div
                className="flex justify-between items-center w-full cursor-pointer group"
            >
                <Link
                    className={`text-stone-300 hover:text-white transition-colors ${depth === 0 ? "text-lg" : "text-base"}`}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                >
                    {item.title}
                </Link>
                {hasChildren && (
                    <button
                        onClick={toggleSubmenu}
                        className="focus:outline-none p-2"
                        aria-label={`Toggle ${item.title} submenu`}
                        aria-expanded={isOpen}
                    >
                        <Arrow isOpen={isOpen} />
                    </button>
                )}
            </div>

            <AnimatePresence initial={false}>
                {hasChildren && isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`ml-4 flex flex-col gap-2 overflow-hidden ${depth === 0 ? "mt-2 mb-4" : "mt-1 mb-2"}`}
                    >
                        {item.children.map((child, index) => (
                            <MenuItem
                                key={index}
                                item={child}
                                depth={depth + 1}
                                setMenuOpen={setMenuOpen}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const SidebarMenu = ({ menuOpen, setMenuOpen, handleMenuEnter, handleMenuLeave }) => {
    return (
        <motion.div
            id="site-menu"
            initial={false}
            animate={{ x: menuOpen ? 0 : "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed top-0 right-0 h-full w-64 z-[9998] flex flex-col pt-16 p-6 gap-4 text-lg overflow-y-auto
                bg-stone-950/95 backdrop-blur-sm border-l border-white/5 shadow-2xl
                ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
            onMouseEnter={handleMenuEnter}
            onMouseLeave={handleMenuLeave}
        >
            {menuData.map((item, index) => (
                <MenuItem
                    key={index}
                    item={item}
                    setMenuOpen={setMenuOpen}
                />
            ))}
        </motion.div>
    );
};

export default SidebarMenu;
