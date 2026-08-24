import React from 'react';
import "../../styles/achievements.css";
import Hero from "../../components/achievements/hero";
import Achievement from "../../components/achievements/achievement";
import Timeline from "../../components/achievements/timeline";
import Card from "../../components/achievements/card";
import Fame from "../../components/achievements/fame";
import Gallery from "../../components/achievements/gallery";

export default function AchievementsPage() {
  return (
    <div className="achievements-page-wrapper min-h-screen relative text-[#f8fafc] bg-transparent pt-20">
      <main className="relative z-10">
        <Hero />
        <Achievement />
        <Timeline />
        <Card />
        <Fame />
        <Gallery />
      </main>
    </div>
  );
}
