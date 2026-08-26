import { useEffect, useState } from "react";
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
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [activeYear, setActiveYear] = useState("");
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events/get_events');
        // Map backend event structure to EventCard structure
        const mappedEvents = (res.data || []).map(backendEvent => ({
          id: backendEvent._id,
          name: backendEvent.title,
          tagline: backendEvent.tagline || "",
          category: backendEvent.category || "General",
          status: backendEvent.status || "past",
          details: backendEvent.description,
          coverImage: backendEvent.image,
          gallery: backendEvent.image_gallery || [],
          registrationLink: backendEvent.link,
          date: backendEvent.date,
          meta: [
            { label: "Date", value: new Date(backendEvent.date).toLocaleDateString() },
            { label: "Venue", value: backendEvent.venue || "TBA" },
            { label: "Format", value: backendEvent.format || "offline" },
            ...(backendEvent.status === "upcoming" && backendEvent.registration_deadline
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

  const hasSearch = search.trim().length > 0;

  // Filter by search + category
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.tagline.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "all"
        ? true
        : event.category?.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const sectionEvents = hasSearch ? events.filter((event) => {
    const matchesCategory =
      category === "all"
        ? true
        : event.category?.toLowerCase() === category.toLowerCase();

    return matchesCategory;
  }) : filteredEvents;

  const upcomingEvents = sectionEvents.filter(
    (event) => event.status === "upcoming"
  );

  const pastEvents = sectionEvents.filter(
    (event) => event.status === "past"
  );

  const pastEventsByYear = pastEvents.reduce((groups, event) => {
    const year = getEventYear(event);
    return {
      ...groups,
      [year]: [...(groups[year] || []), event],
    };
  }, {});

  const pastYears = Object.keys(pastEventsByYear).sort((a, b) =>
    b.localeCompare(a)
  );

  useEffect(() => {
    if (pastYears.length === 0) return;

    setActiveYear((currentYear) =>
      pastYears.includes(currentYear) ? currentYear : pastYears[0]
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveYear(visibleEntry.target.dataset.year);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.18, 0.35, 0.55],
      }
    );

    pastYears.forEach((year) => {
      const section = document.getElementById(`year-${year}`);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [pastYears.join("|")]);

  const EventGrid = ({ eventList, variant = "default" }) => {
    const leftEvents = eventList.filter((_, i) => i % 2 === 0);
    const rightEvents = eventList.filter((_, i) => i % 2 === 1);

    const renderEvent = (event) => (
      <div
        key={event.id}
        className={`card-tilt-wrap w-full max-w-[600px] mx-auto ${
          variant === "upcoming" ? "is-upcoming" : "is-past"
        }`}
      >
        <EventCard event={event} />
      </div>
    );

    return (
      <div className={`grid grid-cols-1 gap-10 md:grid-cols-2 items-start ${variant === "upcoming" ? "max-w-6xl mx-auto" : ""}`}>
        <div className={`flex flex-col gap-6 ${variant === "past" ? "items-end" : "items-center"}`}>{leftEvents.map(renderEvent)}</div>
        <div className={`flex flex-col gap-6 ${variant === "past" ? "items-start" : "items-center"}`}>{rightEvents.map(renderEvent)}</div>
      </div>
    );
  };

  return (
    <section id="events" className="relative px-5 pb-16 pt-4 overflow-hidden">
      <div className="relative mx-auto w-full max-w-7xl">

        {/* Heading + Search */}
        <div className="mb-10 flex flex-wrap items-end justify-center gap-6 text-center lg:justify-between lg:text-left">
          <div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              <span className="text-gradient-orange">Explore Our Events</span>
            </h2>
          </div>

          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-80
              px-6
              py-4
              rounded-xl
              bg-[#0d111c]/65
              border
              border-white/10
              backdrop-blur-xl
              text-white
              placeholder:text-slate-500
              outline-none
              transition-all
              duration-300
              focus:border-[#ff6b00]
              focus:shadow-[0_0_20px_rgba(255,107,0,0.2)]
            "
          />
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3 mb-12">
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
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border font-mono ${
                category === item.key
                  ? "bg-[#ff6b00] text-white border-[#ff6b00] shadow-[0_0_20px_rgba(255,107,0,0.35)]"
                  : "bg-white/[0.04] border-white/10 text-slate-400 hover:border-[#ff6b00]/40 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {hasSearch ? (
          <div className="mb-10">
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="section-kicker">
                SEARCH RESULTS
              </p>
              <span className="font-mono text-xs text-slate-500">
                {filteredEvents.length} found
              </span>
            </div>

            {filteredEvents.length > 0 ? (
              <EventGrid eventList={filteredEvents} variant="past" />
            ) : (
              <div className="rounded-2xl border border-white/10 bg-[#0d111c]/65 px-6 py-10 text-center text-slate-400 backdrop-blur-xl">
                No events match your search.
              </div>
            )}
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
                {/* Upcoming Section */}
                {upcomingEvents.length > 0 && (
                  <div className="upcoming-backdrop-wash my-10 p-6 sm:p-10 relative">
                    <p className="section-kicker mb-6">
                      UPCOMING EVENTS
                    </p>
                    <EventGrid eventList={upcomingEvents} variant="upcoming" />
                  </div>
                )}

                {/* Divider (only if both upcoming and past exist) */}
                {upcomingEvents.length > 0 && pastEvents.length > 0 && (
                  <div className="h-px bg-gradient-to-r from-transparent via-[#ff6b00]/30 to-transparent my-16" />
                )}

                {/* Past Events Section */}
                {pastEvents.length > 0 && (
                  <>
                    <div className="my-10 flex items-center justify-between gap-4">
                      <p className="section-kicker">
                        PAST EVENTS
                      </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[140px_1fr] items-start">
                      <aside className="year-rail sticky top-20 z-30 self-start lg:top-24">
                        <div className="year-rail-shell flex gap-2 overflow-x-auto rounded-2xl border border-white/15 bg-[#0d111c]/90 p-2 shadow-2xl backdrop-blur-2xl lg:max-h-[75vh] lg:flex-col lg:overflow-y-auto">
                          {pastYears.map((year, index) => (
                            <a
                              key={year}
                              href={`#year-${year}`}
                              className={`year-jump group shrink-0 rounded-xl border px-4 py-3 text-left transition duration-300 lg:px-3 ${
                                activeYear === year ? "is-active" : ""
                              }`}
                              style={{ "--year-index": index }}
                              aria-current={activeYear === year ? "true" : undefined}
                            >
                              <span className="block font-mono text-[10px] uppercase text-slate-500 transition group-hover:text-[#00f0ff]">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span className="mt-1 block font-display text-xl font-bold text-white">
                                {year}
                              </span>
                              <span className="mt-1 block font-mono text-[10px] text-slate-500">
                                {pastEventsByYear[year].length} events
                              </span>
                            </a>
                          ))}
                        </div>
                      </aside>

                      <div className="space-y-12">
                        {pastYears.map((year) => (
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
                            <EventGrid eventList={pastEventsByYear[year]} variant="past" />
                          </section>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}

      </div>
    </section>
  );
}
