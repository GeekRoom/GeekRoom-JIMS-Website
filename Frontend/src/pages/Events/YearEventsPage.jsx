import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Search } from "lucide-react";
import EventCard from "../../components/events/EventCard";
import { api } from "../../utils/api";

const getEventYear = (event) => {
  if (event.date) {
    return new Date(event.date).getFullYear().toString();
  }
  const dateMeta = event.meta?.find((item) => item.label === "Date");
  const match = dateMeta?.value?.match(/\b(20\d{2})\b/);
  return match?.[1] || "Archive";
};

export default function YearEventsPage() {
  const { year } = useParams();
  const navigate = useNavigate();

  const [yearEvents, setYearEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchYearEvents = async () => {
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

        const filteredByYear = mappedEvents.filter(ev => getEventYear(ev) === year);
        setYearEvents(filteredByYear);
      } catch (error) {
        console.error("Failed to fetch year events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchYearEvents();
  }, [year]);

  const displayedEvents = yearEvents.filter((ev) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    return (
      ev.name?.toLowerCase().includes(term) ||
      ev.tagline?.toLowerCase().includes(term) ||
      ev.category?.toLowerCase().includes(term)
    );
  });

  const upcomingEvents = displayedEvents.filter((ev) => !ev.isPast && ev.status === "upcoming");
  const pastEvents = displayedEvents.filter((ev) => ev.isPast || ev.status === "past");

  return (
    <div className="min-h-screen relative text-[#f8fafc] bg-transparent pt-32 sm:pt-40 pb-20">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate('/events')}
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[rgba(13,17,28,0.8)] px-4 py-2.5 font-main text-xs sm:text-sm font-bold text-white shadow-lg backdrop-blur-2xl transition-all duration-300 hover:border-[#ff6b00] hover:text-[#ff6b00] hover:-translate-x-1 mb-6"
        >
          <ArrowLeft size={16} /> Back to Events
        </button>

        {/* Page Title & Search Bar Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-lg border border-[#ff6b00]/40 bg-[#ff6b00]/10 px-3 py-1 font-mono text-xs font-bold text-[#ff6b00]">
                {year} ARCHIVE
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Explore <span className="text-[#ff6b00]">{year}</span> Events
            </h1>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${year} events...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-[#0d111c]/90 py-2.5 pl-10 pr-4 font-main text-xs text-white placeholder-slate-400 backdrop-blur-md outline-none transition focus:border-[#ff6b00]"
            />
          </div>
        </div>

        {/* Events Section */}
        {loading ? (
          <div className="py-20 text-center font-main">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#ff6b00] border-t-transparent mb-4" />
            <p className="text-sm font-semibold text-slate-300">Loading {year} Events...</p>
          </div>
        ) : displayedEvents.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#0d111c]/80 p-12 text-center backdrop-blur-xl">
            <Calendar size={40} className="mx-auto text-slate-500 mb-3" />
            <h3 className="font-display text-lg font-bold text-white mb-1">No Events Found</h3>
            <p className="text-xs text-slate-400">No events matched your criteria for the year {year}.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Upcoming Events Section for this Year */}
            {upcomingEvents.length > 0 && (
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]" />
                  </span>
                  <h2 className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#00f0ff] uppercase">
                    UPCOMING EVENTS
                  </h2>
                </div>
                <div className="grid w-full grid-cols-1 items-start gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={event.id || index} className="w-full flex justify-center">
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Past Events Section for this Year */}
            {pastEvents.length > 0 && (
              <div>
                {upcomingEvents.length > 0 && (
                  <div className="mb-4 flex items-center gap-2 border-t border-white/10 pt-8">
                    <h2 className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#ff6b00] uppercase">
                      PAST EVENTS
                    </h2>
                  </div>
                )}
                <div className="grid w-full grid-cols-1 items-start gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                  {pastEvents.map((event, index) => (
                    <div key={event.id || index} className="w-full flex justify-center">
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
