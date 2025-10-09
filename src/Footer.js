import React from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const onPreferencesPage = location.pathname === "/cookie-preferences";

  return (
    <footer className="flex justify-between items-center w-full bg-[#5e5c35] text-[#c1c0bc] p-4 md:p-6 box-border">
      <div className="flex gap-4">
        <Instagram className="w-5 h-5" />
        <Facebook className="w-5 h-5" />
        <Twitter className="w-5 h-5" />
      </div>

      <div className="text-right text-sm flex flex-col md:flex-row items-end gap-2">
        <div>&copy; {new Date().getFullYear()} Nomad Scribbles. All rights reserved.</div>

        {!onPreferencesPage && (
          <Link
            to="/cookie-preferences"
            className="underline text-gray-400 hover:text-white text-sm"
          >
            Change my cookie preferences
          </Link>
        )}
      </div>
    </footer>
  );
}
