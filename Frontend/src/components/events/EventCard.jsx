import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Terminal, Code2, Shield, Lightbulb, Palette, Users, Briefcase, Brain, Mic, MapPin,
  Calendar, Users2, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, X, Sparkles, Maximize2
} from "lucide-react";

const iconMap = {
  terminal: Terminal, code: Code2, shield: Shield, lightbulb: Lightbulb, palette: Palette,
  users: Users, briefcase: Briefcase, brain: Brain, mic: Mic,
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
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  
  const allImages = coverImage ? [coverImage, ...gallery.filter(g => g !== coverImage)] : gallery;
  const activeImage = activeImageIndex === null ? null : allImages[activeImageIndex];
  
  const hasPreviousImage = activeImageIndex !== null && activeImageIndex > 0;
  const hasNextImage = activeImageIndex !== null && activeImageIndex < allImages.length - 1;

  const showPreviousImage = () => setActiveImageIndex((index) => (index === null ? index : Math.max(index - 1, 0)));
  const showNextImage = () => setActiveImageIndex((index) => index === null ? index : Math.min(index + 1, allImages.length - 1));

  useEffect(() => {
    if (activeImageIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveImageIndex(null);
      if (e.key === "ArrowLeft" && hasPreviousImage) showPreviousImage();
      if (e.key === "ArrowRight" && hasNextImage) showNextImage();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImageIndex, hasPreviousImage, hasNextImage]);

  const accentStyles = {
    red: { ring: "border-[#ff3d00]/30 group-hover:border-[#ff3d00]", text: "text-[#ff3d00]", bg: "bg-[#ff3d00]/10" },
    emerald: { ring: "border-[#00f0ff]/30 group-hover:border-[#00f0ff]", text: "text-[#00f0ff]", bg: "bg-[#00f0ff]/10" },
    amber: { ring: "border-[#ff6b00]/30 group-hover:border-[#ff6b00]", text: "text-[#ff6b00]", bg: "bg-[#ff6b00]/10" },
    cyan: { ring: "border-[#00f0ff]/30 group-hover:border-[#00f0ff]", text: "text-[#00f0ff]", bg: "bg-[#00f0ff]/10" },
    yellow: { ring: "border-[#ff6b00]/30 group-hover:border-[#ff6b00]", text: "text-[#ff6b00]", bg: "bg-[#ff6b00]/10" },
    purple: { ring: "border-[#0066ff]/30 group-hover:border-[#0066ff]", text: "text-[#0066ff]", bg: "bg-[#0066ff]/10" },
  };

  const { ring, text, bg } = accentStyles[event.accent] || accentStyles.amber;

  const dateMeta = event.meta?.find((m) => m.label === "Date")?.value;
  const venueMeta = event.meta?.find((m) => m.label === "Venue")?.value;

  return (
    <div className="w-full">
      <div
        className={`group relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0d18]/80 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-lg ${
          isExpanded ? "border-[#ff6b00]/40 shadow-[0_0_30px_rgba(255,107,0,0.15)]" : ""
        }`}
      >
        {/* Compact Image Header (16:9 Aspect Ratio) */}
        <div className="relative aspect-video w-full overflow-hidden bg-[#07080d] cursor-pointer" onClick={() => setActiveImageIndex(0)}>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0d18] via-transparent to-black/30" />

          {/* Floating Category Badge over Image */}
          <div className={`absolute left-3 top-3 z-20 flex items-center justify-center rounded px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 ${text} ${bg} shadow-lg`}>
            {event.category || "Event"}
          </div>
          
          <div className={`absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded border border-white/10 bg-black/60 backdrop-blur-md transition-transform duration-300 group-hover:scale-110`}>
            <Icon size={16} className={text} />
          </div>

          {coverImage ? (
            <img src={coverImage} alt={event.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#07080d]">
              <Icon size={32} className={text} />
            </div>
          )}
        </div>

        {/* Compact Body Content */}
        <div className="p-4 sm:p-5">
          <h3 className="font-display text-lg font-bold text-white leading-tight mb-1 line-clamp-1 transition-colors duration-300 group-hover:text-white/80">
            {event.name}
          </h3>
          <p className={`font-mono text-xs mb-3 truncate opacity-80 ${text}`}>
            {event.tagline}
          </p>

          {/* Inline Meta (Date / Venue) */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-400">
            {dateMeta && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className={text} /> {dateMeta}
              </span>
            )}
            {venueMeta && (
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className={text} /> <span className="truncate max-w-[120px] sm:max-w-[180px]">{venueMeta}</span>
              </span>
            )}
          </div>

          {/* Sleek Expand Toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#ff6b00] hover:text-[#ff3d00] transition-colors duration-300"
          >
            <span>{isExpanded ? "Less Details" : "More Details"}</span>
            <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
          </button>

          {/* EXPANDABLE DETAILS */}
          <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-white/10" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="overflow-hidden space-y-4">
              <div className="text-[13px] leading-relaxed text-[#94a3b8] whitespace-pre-line">
                {event.details}
              </div>

              {/* Full Meta Specs (only shown when expanded) */}
              {event.meta && event.meta.filter(m => !['Date', 'Venue'].includes(m.label)).length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 py-2">
                  {event.meta.filter(m => !['Date', 'Venue'].includes(m.label)).map((m) => {
                    const MIcon = metaIcon(m.label);
                    return (
                      <div key={m.label} className="rounded-lg border border-white/5 bg-black/40 p-2.5 flex flex-col justify-between transition-colors hover:border-white/20">
                        <div className="flex items-center gap-1.5 mb-1 text-slate-400 text-[10px] font-mono uppercase tracking-wider">
                          <MIcon size={12} className={text} />
                          <span>{m.label}</span>
                        </div>
                        <span className="font-semibold text-white text-xs truncate" title={m.value}>{m.value}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-1">
                {event.registrationLink && event.status !== 'past' && (
                  <a href={event.registrationLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded bg-[#ff6b00] px-4 py-2 text-xs font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-[#ff3d00]">
                    Register <ArrowUpRight size={14} />
                  </a>
                )}
                {event.galleryLink && (
                  <a href={event.galleryLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded border border-[#00f0ff]/30 bg-[#00f0ff]/10 px-4 py-2 text-xs font-semibold text-[#00f0ff] transition-transform hover:-translate-y-0.5 hover:bg-[#00f0ff]/20">
                    Gallery <ArrowUpRight size={14} />
                  </a>
                )}
              </div>

              {/* Gallery Mini Grid */}
              {gallery.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-1.5">
                    <Sparkles size={12} className={text} /> Photos ({gallery.length})
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {gallery.slice(0, 4).map((img, idx) => {
                      const imageIndexInAll = coverImage ? idx + 1 : idx;
                      return (
                        <button key={idx} type="button" onClick={() => setActiveImageIndex(imageIndexInAll)} className="group/img relative overflow-hidden rounded bg-black/40 aspect-square border border-white/5 transition-colors hover:border-white/20">
                          <img src={img} alt="Gallery thumb" className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-110" />
                          {idx === 3 && gallery.length > 4 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-xs font-bold text-white backdrop-blur-sm">
                              +{gallery.length - 4}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX (Unchanged structure) */}
      {activeImage && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 px-4 py-6 backdrop-blur-xl transition-all" onClick={() => setActiveImageIndex(null)}>
          <div className="relative max-h-full w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setActiveImageIndex(null)} className="absolute -top-12 right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#ff6b00]">
              <X size={20} />
            </button>
            {hasPreviousImage && (
              <button type="button" onClick={showPreviousImage} className="absolute -left-4 sm:-left-12 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#00f0ff]">
                <ChevronLeft size={24} />
              </button>
            )}
            {hasNextImage && (
              <button type="button" onClick={showNextImage} className="absolute -right-4 sm:-right-12 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#00f0ff]">
                <ChevronRight size={24} />
              </button>
            )}
            <div className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
              <img src={activeImage} alt="Fullscreen event" className="mx-auto max-h-[80vh] w-auto max-w-full object-contain" />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
