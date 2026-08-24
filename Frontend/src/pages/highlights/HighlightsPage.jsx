import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { coverflowPhotos } from "../../data/highlightsData";
import "../../styles/highlights.css";

export default function HighlightsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % coverflowPhotos.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + coverflowPhotos.length) % coverflowPhotos.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const getCardStyle = (index) => {
    const total = coverflowPhotos.length;
    let diff = index - activeIndex;

    // Handle wrap-around shortest distance
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);

    // Center Active Card
    if (diff === 0) {
      return {
        transform: "translate3d(0, 0, 0) scale(1)",
        zIndex: 50,
        opacity: 1,
        filter: "brightness(1)",
      };
    }

    // Side cards positioning
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth < 1024;
    const spacing = isMobile ? 75 : isTablet ? 140 : 200;
    const zSpacing = 160;

    const translateX = diff * spacing + (diff > 0 ? (isMobile ? 25 : 55) : (isMobile ? -25 : -55));
    const translateZ = -absDiff * zSpacing;
    const scale = Math.pow(0.86, absDiff);
    const rotateY = diff > 0 ? -26 : 26;
    const opacity = Math.max(0, 1 - absDiff * 0.28);
    const brightness = Math.max(0.2, 1 - absDiff * 0.25);

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex: 50 - absDiff * 10,
      opacity: opacity,
      filter: `brightness(${brightness})`,
      display: absDiff > 4 ? "none" : "block",
    };
  };

  return (
    <div className="coverflow-page-wrapper">
      <div className="coverflow-bg-glow-1" />
      <div className="coverflow-bg-glow-2" />

      {/* Navigation Arrows */}
      <button
        type="button"
        className="coverflow-nav-btn prev"
        onClick={prevSlide}
        aria-label="Previous photo"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        type="button"
        className="coverflow-nav-btn next"
        onClick={nextSlide}
        aria-label="Next photo"
      >
        <ChevronRight size={28} />
      </button>

      {/* 3D Stage Container */}
      <div
        className="coverflow-stage"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {coverflowPhotos.map((photo, index) => {
          const isActive = index === activeIndex;
          const style = getCardStyle(index);

          return (
            <div
              key={photo.id}
              className={`coverflow-card ${isActive ? "active" : ""}`}
              style={style}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="coverflow-card-img"
              />
              <div className="coverflow-card-overlay">
                <h3 className="coverflow-card-title">{photo.title}</h3>
                <p className="coverflow-card-subtitle">{photo.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Indicators */}
      <div className="coverflow-pagination">
        {coverflowPhotos.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`coverflow-dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
