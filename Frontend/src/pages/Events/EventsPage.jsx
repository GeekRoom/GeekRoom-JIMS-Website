import React from 'react';
import '../../styles/events.css';
import Hero from "../../components/events/Hero";
import EventsSection from "../../components/events/EventsSection";

export default function EventsPage() {
  return (
    <div className="min-h-screen relative text-[#f8fafc] bg-transparent pt-32 sm:pt-40">
      <main className="relative z-10">
        <Hero />
        <EventsSection />
      </main>
    </div>
  );
}
