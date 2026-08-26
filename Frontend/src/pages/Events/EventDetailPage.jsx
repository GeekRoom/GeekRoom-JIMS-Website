import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import {
  ArrowLeft, Calendar, MapPin, Users, Monitor, Sparkles, ExternalLink,
  ChevronLeft, ChevronRight, X, Terminal, Code2, Shield, Lightbulb,
  Palette, Briefcase, Brain, Mic, Clock, Tag
} from "lucide-react";
import { api } from "../../utils/api";

const iconMap = {
  terminal: Terminal, code: Code2, shield: Shield, lightbulb: Lightbulb, palette: Palette,
  users: Users, briefcase: Briefcase, brain: Brain, mic: Mic,
};

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [event, setEvent] = useState(location.state?.event || null);
  const [loading, setLoading] = useState(!location.state?.event);
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  useEffect(() => {
    if (event) return;

    const fetchSingleEvent = async () => {
      try {
        setLoading(true);
        const res = await api.get('/events/get_events');
        const eventList = Array.isArray(res) ? res : Array.isArray(res.data) ? res.data : [];
        
        const found = eventList.find(e => 
          e._id === id || 
          e.id === id || 
          (e.title && e.title.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase()) ||
          (e.name && e.name.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase())
        );

        if (found) {
          const mapped = {
            id: found._id,
            name: found.title || "Untitled Event",
            tagline: found.tagline || "",
            category: found.category || "General",
            status: (found.status || "").toString().toLowerCase() === "upcoming" ? "upcoming" : "past",
            isPast: (found.status || "").toString().toLowerCase() === "past",
            details: found.description,
            coverImage: found.image,
            gallery: found.image_gallery || [],
            registrationLink: found.link,
            date: found.date,
            accent: found.accent,
            teamMembers: found.team_members,
            meta: [
              { label: "Date", value: new Date(found.date).toLocaleDateString() },
              { label: "Venue", value: found.venue || "TBA" },
              { 
                label: "Format", 
                value: (found.format || found.mode || "offline").charAt(0).toUpperCase() + (found.format || found.mode || "offline").slice(1)
              },
              ...((found.status || "").toString().toLowerCase() === "upcoming" && found.registration_deadline
                ? [{ label: "Reg Deadline", value: new Date(found.registration_deadline).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) }]
                : [])
            ]
          };
          setEvent(mapped);
        }
      } catch (err) {
        console.error("Error fetching event detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleEvent();
  }, [id, event]);

  if (loading) {
    return (
      <div className="min-h-screen relative text-[#f8fafc] bg-transparent pt-28 sm:pt-32 px-4 sm:px-6 flex items-center justify-center">
        <div className="text-center font-main">
          <div className="inline-block h-9 w-9 animate-spin rounded-full border-4 border-[#ff6b00] border-t-transparent mb-4 shadow-[0_0_20px_rgba(255,107,0,0.5)]" />
          <p className="text-xs font-bold tracking-wider text-slate-300 font-mono uppercase">Loading Event Details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen relative text-[#f8fafc] bg-transparent pt-28 sm:pt-32 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center font-main rounded-2xl border border-white/10 bg-[#0d111c]/80 p-10 backdrop-blur-2xl">
          <h2 className="text-xl font-bold font-display text-white mb-2">Event Not Found</h2>
          <p className="text-slate-400 mb-6 text-xs">The event you are looking for does not exist or has been removed.</p>
          <button
            type="button"
            onClick={() => navigate('/events')}
            className="inline-flex items-center gap-2 rounded-xl bg-[#ff6b00] px-4 py-2 text-xs font-bold text-white shadow-lg transition-all hover:bg-[#ff3d00]"
          >
            <ArrowLeft size={14} /> Back to Events
          </button>
        </div>
      </div>
    );
  }

  const Icon = iconMap[event.icon] ?? Terminal;
  const coverImage = event.coverImage || event.image;
  const gallery = event.gallery || [];
  const isPastEvent = Boolean(
    event.isPast ||
    event.status?.toString().toLowerCase() === "past" ||
    (event.date && new Date(event.date) < new Date())
  );

  const allImages = coverImage ? [coverImage, ...gallery.filter(g => g !== coverImage)] : gallery;
  const activeImage = activeImageIndex === null ? null : allImages[activeImageIndex];
  const hasPreviousImage = activeImageIndex !== null && activeImageIndex > 0;
  const hasNextImage = activeImageIndex !== null && activeImageIndex < allImages.length - 1;

  const showPreviousImage = () => setActiveImageIndex((index) => (index === null ? index : Math.max(index - 1, 0)));
  const showNextImage = () => setActiveImageIndex((index) => index === null ? index : Math.min(index + 1, allImages.length - 1));

  const dateMeta = event.meta?.find((m) => m.label === "Date")?.value;
  const venueMeta = event.meta?.find((m) => m.label === "Venue")?.value;
  const modeMeta = event.meta?.find((m) => ["Mode", "mode", "Format", "format"].includes(m.label))?.value;
  const participantsMeta =
    event.participants ||
    event.participantsCount ||
    event.participantCount ||
    event.teamMembers ||
    event.teamSize ||
    event.meta?.find((m) =>
      ["Participants", "participants", "Team Members", "team members", "Team Size", "team size"].includes(m.label)
    )?.value;

  const expandedMeta = [
    { label: "Date", value: dateMeta, Icon: Calendar },
    { label: "Venue", value: venueMeta, Icon: MapPin },
    { label: "Team Members", value: participantsMeta, Icon: Users },
    { label: "Format", value: modeMeta, Icon: Monitor },
  ].filter((item) => item.value);

  return (
    <div className="min-h-screen relative text-[#f8fafc] bg-transparent pt-28 sm:pt-32 pb-16">
      
      {/* Background Ambient Glows */}
      <div className="pointer-events-none fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#ff6b00]/10 blur-[100px] z-0" />
      <div className="pointer-events-none fixed top-2/3 right-1/4 h-80 w-80 rounded-full bg-[#00f0ff]/10 blur-[100px] z-0" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6">
        
        {/* Top Action Bar */}
        <div className="flex items-center justify-between mb-5">
          <button
            type="button"
            onClick={() => navigate('/events')}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[rgba(13,17,28,0.85)] px-3.5 py-2 font-main text-xs font-bold text-white shadow-lg backdrop-blur-2xl transition-all duration-300 hover:border-[#ff6b00] hover:bg-[#ff6b00]/10 hover:text-[#ff6b00] hover:-translate-x-1"
          >
            <ArrowLeft size={15} /> Back to Events
          </button>
        </div>

        {/* Main Event Details Aesthetic Glass Card */}
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-[rgba(13,17,28,0.75)] font-main shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(255,107,0,0.2)] backdrop-blur-2xl">
          
          {/* Top Banner Image with Gradient Mask */}
          <div className="relative h-[200px] sm:h-[250px] w-full overflow-hidden bg-[#07080d]">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0d111c] via-[#0d111c]/50 to-transparent" />
            
            {coverImage ? (
              <img
                src={coverImage}
                alt={event.name}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#07080d]">
                <Icon size={48} className="text-[#00f0ff]" />
              </div>
            )}

            {/* Floating Title & Category Overlay */}
            <div className="absolute bottom-4 left-5 right-5 z-20">
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-[#00f0ff]/40 bg-[#00f0ff]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#00f0ff] backdrop-blur-md mb-2 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                <Icon size={13} />
                <span className="uppercase font-mono tracking-wider">{event.category || "Event"}</span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-1 leading-tight drop-shadow-md">
                {event.name}
              </h1>

              {event.tagline && (
                <p className="font-display text-xs sm:text-sm font-semibold text-[#ff6b00]">
                  {event.tagline}
                </p>
              )}
            </div>
          </div>

          {/* Details Body Container */}
          <div className="p-5 sm:p-7 space-y-6">
            
            {/* Meta Info Grid */}
            {expandedMeta.length > 0 && (
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#00f0ff] mb-3 font-mono flex items-center gap-1.5">
                  <Sparkles size={12} className="text-[#00f0ff]" /> EVENT OVERVIEW
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {expandedMeta.map(({ label, value, Icon: MetaIcon }) => (
                    <div
                      key={label}
                      className="group/meta rounded-xl border border-white/10 bg-[#07101d]/90 p-3.5 transition-all duration-300 hover:border-[#ff6b00]/50 hover:bg-[#07101d] hover:shadow-[0_0_15px_rgba(255,107,0,0.15)]"
                    >
                      <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold text-slate-400 font-mono uppercase">
                        <MetaIcon size={13} className="text-[#ff6b00] transition-transform group-hover/meta:scale-110" />
                        {label}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-slate-100 line-clamp-1" title={value}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Laser Divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            {/* Description Section */}
            {event.details && (
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#00f0ff] mb-2.5 font-mono">
                  EVENT DESCRIPTION
                </h3>
                <div className="rounded-xl border border-white/10 bg-[#090e18]/80 p-4 sm:p-5">
                  <p className="whitespace-pre-line text-xs sm:text-sm leading-relaxed text-slate-200 font-main">
                    {event.details}
                  </p>
                </div>
              </div>
            )}

            {/* Event Gallery Section */}
            {gallery.length > 0 && (
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#00f0ff] mb-3 font-mono flex items-center gap-1.5">
                  <Sparkles size={12} className="text-[#00f0ff]" /> EVENT GALLERY ({gallery.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {gallery.map((img, idx) => {
                    const imageIndexInAll = coverImage ? idx + 1 : idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(imageIndexInAll)}
                        className="group/img relative overflow-hidden rounded-xl bg-black/60 aspect-video sm:aspect-square border border-white/15 transition-all duration-300 hover:border-[#ff6b00] hover:shadow-[0_0_20px_rgba(255,107,0,0.35)] focus:outline-none"
                      >
                        <img
                          src={img}
                          alt="Gallery photo"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-center pb-2 text-[10px] font-bold text-white">
                          Click to expand
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bottom Action Footer */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                {event.registrationLink && !isPastEvent && (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#ff6b00] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-[0_0_20px_rgba(255,107,0,0.4)] transition-all duration-300 hover:bg-[#ff3d00] hover:shadow-[0_0_30px_rgba(255,107,0,0.7)] hover:-translate-y-0.5"
                  >
                    Register Now <ExternalLink size={14} />
                  </a>
                )}
                {event.galleryLink && (
                  <a
                    href={event.galleryLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#00f0ff]/50 bg-[#00f0ff]/10 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#00f0ff] transition-all duration-300 hover:bg-[#00f0ff]/20 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:-translate-y-0.5"
                  >
                    View Official Gallery <ExternalLink size={14} />
                  </a>
                )}
              </div>

              <div className="font-mono text-[10px] text-slate-400">
                GEEK ROOM // JIMS ROHINI
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX PORTAL */}
      {activeImage && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 px-4 py-6 backdrop-blur-xl transition-all"
          onClick={() => setActiveImageIndex(null)}
        >
          <div
            className="relative max-h-full w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveImageIndex(null)}
              className="absolute -top-12 right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#ff6b00]"
            >
              <X size={20} />
            </button>
            {hasPreviousImage && (
              <button
                type="button"
                onClick={showPreviousImage}
                className="absolute -left-4 sm:-left-12 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#00f0ff]"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {hasNextImage && (
              <button
                type="button"
                onClick={showNextImage}
                className="absolute -right-4 sm:-right-12 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#00f0ff]"
              >
                <ChevronRight size={24} />
              </button>
            )}
            <div className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
              <img
                src={activeImage}
                alt="Fullscreen event photo"
                className="mx-auto max-h-[80vh] w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
