import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Terminal,
  Code2,
  Shield,
  Lightbulb,
  Palette,
  Users,
  Briefcase,
  Brain,
  Mic,
  MapPin,
  Calendar,
  Users2,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Maximize2,
} from "lucide-react";

const iconMap = {
  terminal: Terminal,
  code: Code2,
  shield: Shield,
  lightbulb: Lightbulb,
  palette: Palette,
  users: Users,
  briefcase: Briefcase,
  brain: Brain,
  mic: Mic,
};

const metaIcon = (label) => {
  if (label === "Date") return Calendar;
  if (label === "Venue") return MapPin;
  return Users2;
};

export default function EventCard({ event }) {
  const Icon = iconMap[event.icon] ?? Terminal;
  const coverImage = event.coverImage || event.image;
  const gallery = event.gallery || [];
  
  // Card Expansion State
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Lightbox Image Viewer State
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  
  // All images combined (cover + gallery) for lightbox slider
  const allImages = coverImage ? [coverImage, ...gallery.filter(g => g !== coverImage)] : gallery;
  const activeImage = activeImageIndex === null ? null : allImages[activeImageIndex];
  
  const hasPreviousImage = activeImageIndex !== null && activeImageIndex > 0;
  const hasNextImage = activeImageIndex !== null && activeImageIndex < allImages.length - 1;

  const showPreviousImage = () => {
    setActiveImageIndex((index) => (index === null ? index : Math.max(index - 1, 0)));
  };
  
  const showNextImage = () => {
    setActiveImageIndex((index) =>
      index === null ? index : Math.min(index + 1, allImages.length - 1)
    );
  };

  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveImageIndex(null);
      }
      if (e.key === "ArrowLeft" && hasPreviousImage) {
        showPreviousImage();
      }
      if (e.key === "ArrowRight" && hasNextImage) {
        showNextImage();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImageIndex, hasPreviousImage, hasNextImage]);

  const accentStyles = {
    red: {
      ring: "border-[#ff3d00]/30 group-hover:border-[#ff3d00]",
      glow: "bg-[#ff3d00]/10",
      text: "text-[#ff3d00]",
      badge: "border-[#ff3d00]/40 bg-[#ff3d00]/10 text-[#ff3d00]",
      btn: "bg-[#ff3d00]/15 text-[#ff3d00] hover:bg-[#ff3d00]/30 border-[#ff3d00]/40",
      shadow: "group-hover:shadow-[0_15px_40px_rgba(255,61,0,0.25)]",
    },
    emerald: {
      ring: "border-[#00f0ff]/30 group-hover:border-[#00f0ff]",
      glow: "bg-[#00f0ff]/10",
      text: "text-[#00f0ff]",
      badge: "border-[#00f0ff]/40 bg-[#00f0ff]/10 text-[#00f0ff]",
      btn: "bg-[#00f0ff]/15 text-[#00f0ff] hover:bg-[#00f0ff]/30 border-[#00f0ff]/40",
      shadow: "group-hover:shadow-[0_15px_40px_rgba(0,240,255,0.25)]",
    },
    amber: {
      ring: "border-[#ff6b00]/30 group-hover:border-[#ff6b00]",
      glow: "bg-[#ff6b00]/10",
      text: "text-[#ff6b00]",
      badge: "border-[#ff6b00]/40 bg-[#ff6b00]/10 text-[#ff6b00]",
      btn: "bg-[#ff6b00]/15 text-[#ff6b00] hover:bg-[#ff6b00]/30 border-[#ff6b00]/40",
      shadow: "group-hover:shadow-[0_15px_40px_rgba(255,107,0,0.25)]",
    },
    cyan: {
      ring: "border-[#00f0ff]/30 group-hover:border-[#00f0ff]",
      glow: "bg-[#00f0ff]/10",
      text: "text-[#00f0ff]",
      badge: "border-[#00f0ff]/40 bg-[#00f0ff]/10 text-[#00f0ff]",
      btn: "bg-[#00f0ff]/15 text-[#00f0ff] hover:bg-[#00f0ff]/30 border-[#00f0ff]/40",
      shadow: "group-hover:shadow-[0_15px_40px_rgba(0,240,255,0.25)]",
    },
    yellow: {
      ring: "border-[#ff6b00]/30 group-hover:border-[#ff6b00]",
      glow: "bg-[#ff6b00]/10",
      text: "text-[#ff6b00]",
      badge: "border-[#ff6b00]/40 bg-[#ff6b00]/10 text-[#ff6b00]",
      btn: "bg-[#ff6b00]/15 text-[#ff6b00] hover:bg-[#ff6b00]/30 border-[#ff6b00]/40",
      shadow: "group-hover:shadow-[0_15px_40px_rgba(255,107,0,0.25)]",
    },
    purple: {
      ring: "border-[#0066ff]/30 group-hover:border-[#0066ff]",
      glow: "bg-[#0066ff]/10",
      text: "text-[#0066ff]",
      badge: "border-[#0066ff]/40 bg-[#0066ff]/10 text-[#0066ff]",
      btn: "bg-[#0066ff]/15 text-[#0066ff] hover:bg-[#0066ff]/30 border-[#0066ff]/40",
      shadow: "group-hover:shadow-[0_15px_40px_rgba(0,102,255,0.25)]",
    },
  };

  const { ring, glow, text, badge, btn, shadow } = accentStyles[event.accent] || accentStyles.amber;

  const dateMeta = event.meta?.find((m) => m.label === "Date")?.value;
  const venueMeta = event.meta?.find((m) => m.label === "Venue")?.value;

  return (
    <div className="w-full">
      <div
        className={`group relative overflow-hidden rounded-2xl border ${ring} bg-[#0a0d18]/80 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.015] ${shadow} ${
          isExpanded ? "shadow-[0_0_40px_rgba(255,107,0,0.25)] border-[#ff6b00]/60" : ""
        }`}
      >
        {/* Hover Shimmer Line Sweep */}
        <div className="pointer-events-none absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 group-hover:left-full group-hover:opacity-100" />

        {/* Ambient Glow */}
        <div className={`pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full blur-[55px] opacity-40 transition-all duration-500 group-hover:scale-150 group-hover:opacity-70 ${glow}`} />

        {/* CLICKABLE COVER HEADER (Golden Ratio Aspect Ratio ~1.618:1) */}
        <div className="relative aspect-[1.618/0.7] w-full overflow-hidden bg-[#07080d] cursor-pointer" onClick={() => setActiveImageIndex(0)}>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0d18] via-transparent to-black/40" />

          {/* Category Icon Badge */}
          <div className={`absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-xl border ${ring} bg-black/70 backdrop-blur-md transition-all duration-500 group-hover:rotate-12 group-hover:scale-110`}>
            <Icon size={18} className={text} />
          </div>

          {/* Zoom / Lightbox Hint */}
          <div className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-lg border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-mono text-white opacity-0 transition-all duration-300 group-hover:opacity-100 backdrop-blur-md group-hover:scale-105">
            <Maximize2 size={12} className={text} />
            <span>Click to View Image</span>
          </div>

          {coverImage ? (
            <img
              src={coverImage}
              alt={event.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#07080d]">
              <Icon size={40} className={text} />
            </div>
          )}
        </div>

        {/* CARD BODY PROPORTIONS (Golden Ratio Padding) */}
        <div className="p-5 sm:p-6">
          {/* Header Info */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className={`inline-block rounded-full border px-3 py-0.5 text-[11px] font-mono font-bold uppercase transition-all duration-300 group-hover:scale-105 ${badge}`}>
                {event.category || "Event"}
              </span>
              <h3 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl transition-colors duration-300 group-hover:text-[#ff6b00]">
                {event.name}
              </h3>
              <p className={`font-mono text-[12px] mt-1 transition-colors duration-300 ${text}`}>
                {event.tagline}
              </p>
            </div>
          </div>

          {/* Quick Summary Pill Bar */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-[12px] font-mono text-slate-400">
            {dateMeta && (
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/[0.06]">
                <Calendar size={13} className={text} />
                {dateMeta}
              </span>
            )}
            {venueMeta && (
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/[0.06]">
                <MapPin size={13} className={text} />
                {venueMeta}
              </span>
            )}
          </div>

          {/* EXPANDABLE CONTENT */}
          <div
            className={`grid transition-all duration-500 ease-in-out ${
              isExpanded ? "grid-rows-[1fr] opacity-100 mt-5 pt-5 border-t border-white/10" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden space-y-5">
              {/* Event Description */}
              <div className="text-[14px] leading-relaxed text-[#94a3b8] whitespace-pre-line">
                {event.details}
              </div>

              {/* Full Meta Specs */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {event.meta.map((m) => {
                  const MIcon = metaIcon(m.label);
                  return (
                    <div
                      key={m.label}
                      className="rounded-xl border border-white/10 bg-black/40 p-3 flex flex-col justify-between transition-all duration-300 hover:border-white/30 hover:bg-black/60"
                    >
                      <div className="flex items-center gap-1.5 mb-1 text-slate-400 text-[11px] font-mono">
                        <MIcon size={13} className={text} />
                        <span>{m.label}</span>
                      </div>
                      <span className="font-semibold text-white text-[13px]">{m.value}</span>
                    </div>
                  );
                })}
              </div>

              {/* Interactive Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                {event.registrationLink && (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#ff6b00] bg-[#ff6b00] px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(255,107,0,0.4)] transition-all duration-300 hover:scale-105 hover:bg-[#ff3d00]"
                  >
                    Register Now <ArrowUpRight size={16} />
                  </a>
                )}
                {event.galleryLink && (
                  <a
                    href={event.galleryLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#00f0ff]/40 bg-[#00f0ff]/10 px-5 py-2.5 text-sm font-semibold text-[#00f0ff] transition-all duration-300 hover:bg-[#00f0ff]/20 hover:scale-105"
                  >
                    Event Gallery <ArrowUpRight size={16} />
                  </a>
                )}
              </div>

              {/* Interactive Clickable Gallery Images */}
              {gallery.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                      <Sparkles size={13} className={text} /> Photo Gallery ({gallery.length})
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">Click photo to view</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {gallery.map((img, idx) => {
                      const imageIndexInAll = coverImage ? idx + 1 : idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImageIndex(imageIndexInAll)}
                          className="group/img relative overflow-hidden rounded-xl border border-white/10 bg-black/40 aspect-square transition-all duration-300 hover:scale-105 hover:border-white/30"
                          aria-label={`Open photo ${idx + 1}`}
                        >
                          <img
                            src={img}
                            alt={`${event.name} photo ${idx + 1}`}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Maximize2 size={16} className="text-white" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* TOGGLE EXPAND / CONTRACT BUTTON */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 group-hover:shadow-md hover:scale-[1.02] ${btn}`}
          >
            <span>{isExpanded ? "Collapse Details" : "Expand Event Details"}</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX PORTAL */}
      {activeImage &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 px-4 py-6 backdrop-blur-2xl animate-fade-in"
            onClick={() => setActiveImageIndex(null)}
            role="presentation"
          >
            <div
              className="relative max-h-full w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveImageIndex(null)}
                className="absolute -top-12 right-0 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white backdrop-blur-md transition-all duration-300 hover:border-[#ff6b00] hover:text-[#ff6b00] hover:scale-110"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Slider Arrows */}
              {hasPreviousImage && (
                <button
                  type="button"
                  onClick={showPreviousImage}
                  className="absolute -left-12 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white backdrop-blur-md transition-all duration-300 hover:border-[#00f0ff] hover:text-[#00f0ff] hover:scale-110 sm:-left-16"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={28} />
                </button>
              )}

              {hasNextImage && (
                <button
                  type="button"
                  onClick={showNextImage}
                  className="absolute -right-12 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white backdrop-blur-md transition-all duration-300 hover:border-[#00f0ff] hover:text-[#00f0ff] hover:scale-110 sm:-right-16"
                  aria-label="Next photo"
                >
                  <ChevronRight size={28} />
                </button>
              )}

              {/* Image Display */}
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/60 shadow-[0_0_80px_rgba(0,0,0,0.9)]">
                <img
                  src={activeImage}
                  alt={`${event.name} enlarged photo`}
                  className="mx-auto max-h-[82vh] w-auto max-w-full object-contain"
                />
                <div className="p-3 text-center font-mono text-xs text-slate-300 border-t border-white/10 bg-black/70">
                  {event.name} — Photo {activeImageIndex + 1} of {allImages.length}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
