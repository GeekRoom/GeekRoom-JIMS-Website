import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";
import { api } from "../../utils/api";

const getEventYear = (event) => {
  if (event.date) {
    return new Date(event.date).getFullYear().toString();
  }
  const dateMeta = event.meta?.find((item) => item.label === "Date");
  const match = dateMeta?.value?.match(/\b(20\d{2})\b/);
  return match?.[1] || "Archive";
};

export default function EventsSection() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedYears, setExpandedYears] = useState({});
  const [activeYear, setActiveYear] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await api.get('/events/get_events');
        const eventList = Array.isArray(res) ? res : Array.isArray(res.data) ? res.data : [];

        const mappedEvents = eventList.map(backendEvent => ({
          id: backendEvent._id,
          name: backendEvent.title || "Untitled Event",
          tagline: backendEvent.tagline || "",
          category: backendEvent.category || "General",
          status: (backendEvent.status || "").toString().toLowerCase() === "upcoming" ? "upcoming" : "past",
          isPast: (backendEvent.status || "").toString().toLowerCase() === "past",
          details: backendEvent.description,
          coverImage: backendEvent.image,
          gallery: backendEvent.image_gallery || [],
          registrationLink: backendEvent.link,
          date: backendEvent.date,
          accent: backendEvent.accent,
          teamMembers: backendEvent.team_members,
          meta: [
            { label: "Date", value: new Date(backendEvent.date).toLocaleDateString() },
            { label: "Venue", value: backendEvent.venue || "TBA" },
            { 
              label: "Format", 
              value: (backendEvent.format || backendEvent.mode || "offline").charAt(0).toUpperCase() + (backendEvent.format || backendEvent.mode || "offline").slice(1)
            },
            ...((backendEvent.status || "").toString().toLowerCase() === "upcoming" && backendEvent.registration_deadline
              ? [{ label: "Reg Deadline", value: new Date(backendEvent.registration_deadline).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) }]
              : [])
          ]
        }));

        setEvents(mappedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchCat =
        category === "all" ||
        event.category.toLowerCase() === category.toLowerCase();
      const matchSearch =
        !search.trim() ||
        event.name.toLowerCase().includes(search.toLowerCase()) ||
        event.tagline.toLowerCase().includes(search.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [events, category, search]);

  const upcomingEvents = useMemo(() => {
    return filteredEvents.filter((ev) => !ev.isPast && ev.status === "upcoming");
  }, [filteredEvents]);

  const pastEvents = useMemo(() => {
    return filteredEvents.filter((ev) => ev.isPast || ev.status === "past");
  }, [filteredEvents]);

  const pastEventsByYear = useMemo(() => {
    const grouped = {};

    pastEvents.forEach((ev) => {
      const year = getEventYear(ev);
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(ev);
    });

    Object.keys(grouped).forEach((year) => {
      grouped[year].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    });

    return grouped;
  }, [pastEvents]);

  const pastYears = useMemo(() => {
    return Object.keys(pastEventsByYear).sort((a, b) => Number(b) - Number(a));
  }, [pastEventsByYear]);

  useEffect(() => {
    if (pastYears.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 260;

      for (let i = pastYears.length - 1; i >= 0; i--) {
        const year = pastYears[i];
        const element = document.getElementById(`year-${year}`);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveYear(year);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pastYears.join("|")]);

  const EventGrid = ({ eventList, variant = "default", constrainPast = false }) => {
    const shouldScroll = constrainPast && eventList.length > 4;

    return (
      <div
        className={`grid w-full grid-cols-1 items-start gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ${
          shouldScroll
            ? "max-h-[355px] overflow-y-auto custom-scrollbar pr-2 py-1"
            : ""
        }`}
      >
        {eventList.map((event, index) => {
          const eventKey = `${variant}-${event.id || event.name}-${index}`;

          return (
            <div
              key={eventKey}
              className={`card-tilt-wrap relative w-full ${
                variant === "upcoming" ? "is-upcoming" : "is-past"
              }`}
            >
              <EventCard event={event} />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section id="events" className="relative px-4 pb-16 pt-4 sm:px-6">
      <div className="relative mx-auto w-full max-w-7xl">

        {/* Heading + Search */}
        <div className="mb-10 flex flex-col items-center justify-center gap-6 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              <span className="text-gradient-orange">Explore Our Events</span>
            </h2>
          </div>

          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-[rgba(13,17,28,0.75)] px-5 py-3 font-main text-sm text-white placeholder-slate-400 backdrop-blur-2xl outline-none transition-all duration-300 focus:border-[#00f0ff] focus:bg-[#07101d] focus:shadow-[0_0_20px_rgba(0,240,255,0.25)]"
            />
          </div>
        </div>

        {/* Category Buttons */}
        <div className="mb-12 flex flex-wrap justify-center gap-2.5 lg:justify-start">
          {[
            { key: "all", label: "All" },
            { key: "Hackathons", label: "Hackathons" },
            { key: "Workshops", label: "Workshops" },
            { key: "Seminars", label: "Seminars" },
            { key: "Competitions", label: "Competitions" },
            { key: "Ideathon", label: "Ideathon" },
            { key: "Orientation", label: "Orientation" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setCategory(item.key)}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-main font-semibold transition-all duration-300 border ${
                category === item.key
                  ? "border-[#ff6b00] bg-[#ff6b00] text-white shadow-[0_0_20px_rgba(255,107,0,0.4)]"
                  : "border-white/15 bg-[rgba(13,17,28,0.75)] text-slate-300 hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Events Content */}
        {loading ? (
          <div className="py-20 text-center font-main">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#ff6b00] border-t-transparent mb-4" />
            <p className="text-sm font-semibold text-slate-300">Loading Events...</p>
          </div>
        ) : (
          <>
            {upcomingEvents.length === 0 && pastEvents.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#0d111c]/65 px-6 py-16 text-center backdrop-blur-xl my-10">
                <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                  <span className="text-2xl opacity-80">👀</span>
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">
                  No {category !== 'all' ? category : 'Events'} Found
                </h3>
                <p className="text-slate-400">
                  We don't have any {category !== 'all' ? category.toLowerCase() : 'events'} to show here right now. Check back later!
                </p>
              </div>
            ) : (
              <>
                {/* Upcoming Section (Full Width) */}
                {upcomingEvents.length > 0 && (
                  <div className="my-10">
                    <p className="section-kicker mb-6">
                      UPCOMING EVENTS
                    </p>
                    <EventGrid eventList={upcomingEvents} variant="upcoming" />
                  </div>
                )}

                {/* Past Events Section (2-Column Sticky Rail Layout) */}
                {pastEvents.length > 0 && (
                  <div className="my-10">
                    <div className="mb-8 flex items-center justify-between gap-4">
                      <p className="section-kicker">
                        PAST EVENTS
                      </p>
                    </div>

                    <div className="grid items-start gap-6 lg:grid-cols-[116px_1fr]">
                      {/* Year Rail Sidebar (Sticky like Navbar during Past Events scroll) */}
                      <aside className="year-rail sticky top-28 sm:top-32 z-30 self-start">
                        <div
                          className={`year-rail-shell flex gap-2.5 overflow-x-auto custom-scrollbar rounded-2xl border border-white/20 bg-[rgba(10,14,26,0.9)] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_25px_rgba(255,107,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-3xl lg:flex-col lg:overflow-y-auto ${
                            pastYears.length > 4 ? "max-h-[356px] lg:max-h-[448px]" : "max-h-[75vh]"
                          }`}
                        >
                          {/* Rail Header Tag */}
                          <div className="hidden lg:flex items-center justify-between px-2.5 py-2 mb-2 border-b border-white/15">
                            <span className="font-mono text-[10px] font-extrabold tracking-widest text-[#00f0ff] uppercase">
                              YEARS
                            </span>
                          </div>

                          {pastYears.map((year, index) => {
                            const isActive = activeYear === year;
                            return (
                              <a
                                key={year}
                                href={`#year-${year}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  document.getElementById(`year-${year}`)?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className={`year-jump group shrink-0 rounded-xl border px-3.5 py-3 text-left transition-all duration-300 relative overflow-hidden ${
                                  isActive
                                    ? "border-[#ff6b00] bg-gradient-to-br from-[#ff6b00]/30 via-[#ff6b00]/15 to-[#07101d] text-white shadow-[0_0_30px_rgba(255,107,0,0.4)] lg:translate-x-1.5"
                                    : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-[#00f0ff]/50 hover:bg-[#00f0ff]/10 hover:text-white hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:translate-x-1"
                                }`}
                                style={{ "--year-index": index }}
                                aria-current={isActive ? "true" : undefined}
                              >
                                {/* Left Active Bar Accent */}
                                {isActive && (
                                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ff6b00] to-[#00f0ff] shadow-[0_0_10px_#ff6b00]" />
                                )}

                                <div className="flex items-center justify-between mb-1 pl-1">
                                  <span className={`font-mono text-[10px] uppercase font-bold transition ${
                                    isActive ? "text-[#00f0ff] drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]" : "text-slate-500 group-hover:text-[#00f0ff]"
                                  }`}>
                                    {String(index + 1).padStart(2, "0")}
                                  </span>
                                  
                                  {isActive && (
                                    <span className="flex h-2 w-2 relative">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b00] opacity-75" />
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6b00] shadow-[0_0_8px_#ff6b00]" />
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-baseline justify-between gap-2 pl-1">
                                  <span className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-[#ff6b00] transition-colors">
                                    {year}
                                  </span>
                                  
                                  <span className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                                    isActive
                                      ? "border-[#ff6b00]/40 bg-[#ff6b00]/20 text-[#ff6b00] shadow-[0_0_8px_rgba(255,107,0,0.3)]"
                                      : "border-white/10 bg-white/5 text-slate-400 group-hover:border-[#00f0ff]/40 group-hover:text-[#00f0ff]"
                                  }`}>
                                    {pastEventsByYear[year].length} {pastEventsByYear[year].length === 1 ? 'event' : 'events'}
                                  </span>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </aside>

                      {/* Past Events List by Year */}
                      <div className="space-y-12 min-w-0">
                        {pastYears.map((year) => {
                          const eventsForYear = pastEventsByYear[year];
                          const isExpanded = Boolean(expandedYears[year]);
                          const visibleEvents = isExpanded ? eventsForYear : eventsForYear.slice(0, 3);
                          const hasMore = eventsForYear.length > 3;

                          return (
                            <section
                              key={year}
                              id={`year-${year}`}
                              data-year={year}
                              className="scroll-mt-28"
                            >
                              <div className="mb-5 flex items-center gap-3">
                                <span className="text-3xl font-bold text-white font-display">{year}</span>
                                <span className="h-px flex-1 bg-gradient-to-r from-[#ff6b00]/40 to-transparent" />
                              </div>

                              <EventGrid eventList={visibleEvents} variant="past" />

                              {hasMore && (
                                <div className="mt-6 flex justify-center">
                                  <button
                                    type="button"
                                    onClick={() => navigate(`/events/year/${year}`)}
                                    className="inline-flex items-center gap-2 rounded-xl border border-[#ff6b00]/50 bg-[#ff6b00]/10 px-5 py-2.5 font-main text-xs sm:text-sm font-bold text-[#ff6b00] backdrop-blur-md transition-all duration-300 hover:bg-[#ff6b00] hover:text-white hover:shadow-[0_0_20px_rgba(255,107,0,0.45)]"
                                  >
                                    Explore All {year} Events →
                                  </button>
                                </div>
                              )}
                            </section>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
