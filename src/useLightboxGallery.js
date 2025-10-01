import { useState, useEffect, useCallback, useRef } from "react";

export default function useLightboxGallery(imagesLength) {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isFading, setIsFading] = useState(false);
  const enlargedRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartTime = useRef(null);

  const showNext = useCallback(() => {
    if (currentIndex === null) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % imagesLength);
      setIsFading(false);
    }, 150);
  }, [imagesLength, currentIndex]);

  const showPrev = useCallback(() => {
    if (currentIndex === null) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + imagesLength) % imagesLength);
      setIsFading(false);
    }, 150);
  }, [imagesLength, currentIndex]);

  useEffect(() => {
    const handleKey = (e) => {
      if (currentIndex === null) return;
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") setCurrentIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, showNext, showPrev]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = e.timeStamp;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const duration = e.timeStamp - touchStartTime.current;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 30 || (Math.abs(diff) > 10 && duration < 200)) {
      diff > 0 ? showNext() : showPrev();
    }

    touchStartX.current = null;
    touchStartTime.current = null;
  };

  return {
    currentIndex,
    setCurrentIndex,
    isFading,
    enlargedRef,
    showNext,
    showPrev,
    handleTouchStart,
    handleTouchEnd,
  };
}
