import { useState, useEffect } from "react";

export default function Sun4({
  scrollY,
  top = 800,
  widthPercent = 50,    // width relative to screen
  maxWidth = 600,       // max width in px
  parallaxFactor = 0.6, // vertical parallax factor
  viewBox = "0 0 1000 350",
  children               // allow passing custom paths
}) {
  const [xOffset, setXOffset] = useState(90);
  const [smoothScroll, setSmoothScroll] = useState(0);

  useEffect(() => {
    const updateOffset = () => {
      const width = window.innerWidth;
      const minWidth = 320;
      const maxWidthScreen = 1920;
      const minPercent = 50;
      const maxPercent = 90;

      let basePercent =
        ((width - minWidth) / (maxWidthScreen - minWidth)) * (maxPercent - minPercent) + minPercent;

      if (basePercent < minPercent) basePercent = minPercent;
      if (basePercent > maxPercent) basePercent = maxPercent;

      setXOffset(basePercent);
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  useEffect(() => {
    const ease = () => {
      setSmoothScroll(prev => prev + (scrollY - prev) * 0.1);
      requestAnimationFrame(ease);
    };
    ease();
  }, [scrollY]);

  const horizontalParallax = smoothScroll * 0.1;
  const rotation = smoothScroll * 0.05;
  const scale = 1 + smoothScroll * 0.0005;

  return (
    <div className="absolute w-full overflow-visible" style={{ top: `${top}px`, zIndex: 22 }}>
      <svg
        viewBox={viewBox}
        className={`w-[${widthPercent}%]`}
        style={{
          width: `${widthPercent}%`,
          maxWidth: `${maxWidth}px`,
          transform: `translateX(${xOffset + horizontalParallax}%) translateY(${smoothScroll * -parallaxFactor}px) rotate(${rotation}deg) scale(${scale})`,
        }}
      >
        {children}
      </svg>
    </div>
  );
}
