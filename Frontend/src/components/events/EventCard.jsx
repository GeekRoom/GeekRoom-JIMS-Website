import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import {
  Terminal, Code2, Shield, Lightbulb, Palette, Users, Briefcase, Brain, Mic, MapPin,
  Calendar, Monitor, ArrowUpRight, ChevronLeft, ChevronRight, X, Sparkles
} from "lucide-react";

const iconMap = {
  terminal: Terminal, code: Code2, shield: Shield, lightbulb: Lightbulb, palette: Palette,
  users: Users, briefcase: Briefcase, brain: Brain, mic: Mic,
};

export default function EventCard({ event }) {
  const navigate = useNavigate();
  const Icon = iconMap[event.icon] ?? Terminal;
  const coverImage = event.coverImage || event.image;
  const gallery = event.gallery || [];
  const isPastEvent = Boolean(
    event.isPast ||
    event.status?.toString().toLowerCase() === "past" ||
    (event.date && new Date(event.date) < new Date())
  );

  const dateMeta = event.meta?.find((m) => m.label === "Date")?.value;
  const venueMeta = event.meta?.find((m) => m.label === "Venue")?.value;

  const handleCardClick = () => {
    const eventSlug = event.id || event.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/events/${eventSlug}`, { state: { event } });
  };

  return (
    <div className="w-full flex justify-center">
      {/* CARD FACE */}
      <div
        tabIndex={0}
        onClick={handleCardClick}
        className="group relative z-0 flex w-[92%] sm:w-[94%] hover:w-full group-hover:w-full flex-col overflow-hidden rounded-[16px] border border-white/12 bg-[rgba(13,17,28,0.65)] font-main shadow-lg backdrop-blur-[20px] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#ff6b00] hover:shadow-[0_16px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(255,107,0,0.35)] hover:[transform:translateY(-6px)_perspective(1000px)_rotateX(1.5deg)_rotateY(-1.5deg)] cursor-pointer focus:outline-none"
      >
        {/* TOP COVER IMAGE BANNER */}
        <div className="relative h-[165px] w-full overflow-hidden bg-[#07080d] shrink-0">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0d18] via-transparent to-black/30" />

          {/* Icon Badge */}
          <div className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-black/70 backdrop-blur-md text-[#00f0ff] transition-all duration-300 group-hover:scale-110 group-hover:border-[#ff6b00]">
            <Icon size={16} />
          </div>

          {coverImage ? (
            <img
              src={coverImage}
              alt={event.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#07080d]">
              <Icon size={32} className="text-[#00f0ff]" />
            </div>
          )}
        </div>

        {/* CARD CONTENT */}
        <div className="relative z-10 flex flex-1 flex-col p-4 sm:p-5 justify-between space-y-3">
          <div>
            <h3 className="mb-1 line-clamp-1 font-display text-base font-bold text-white transition-colors duration-300 group-hover:text-[#00f0ff]">
              {event.name}
            </h3>
            {event.tagline && (
              <p className="line-clamp-1 font-display text-xs font-semibold leading-snug text-[#ff6b00]">
                {event.tagline}
              </p>
            )}
          </div>

          <div className="pt-2 border-t border-white/10 font-main space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 font-main text-xs font-medium leading-relaxed text-slate-200">
              {dateMeta && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#00f0ff]" /> {dateMeta}
                </span>
              )}
              {venueMeta && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#ff6b00]" />
                  <span className="max-w-[120px] truncate" title={venueMeta}>
                    {venueMeta}
                  </span>
                </span>
              )}
            </div>

            {/* View Details Button */}
            <div className="flex items-center justify-between pt-1">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00f0ff] transition-all group-hover:text-[#ff6b00] group-hover:translate-x-1">
                View Details <ArrowUpRight size={13} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
