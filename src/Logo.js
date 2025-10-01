import React from "react";
import { Link } from "react-router-dom";

export default function Logo({ className }) {
  return (
    <Link to="/home">
      <img
        src="/images/NewLogo.svg" // using public folder path
        alt="Site Logo"
        className={className}      // pass size/position via props or Tailwind
      />
    </Link>
  );
}