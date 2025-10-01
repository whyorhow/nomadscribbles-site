import React from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="social-icons">
        <Instagram className="w-5 h-5" />
        <Facebook className="w-5 h-5" />
        <Twitter className="w-5 h-5" />
      </div>
      <div className="copyright">
        &copy; {new Date().getFullYear()} Nomad Scribbles. All rights reserved.
      </div>
    </footer>
  );
}
