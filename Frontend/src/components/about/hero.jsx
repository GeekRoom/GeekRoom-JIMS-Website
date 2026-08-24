import React from 'react';

export default function Hero() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-6 pb-12">
      <div className="w-full max-w-4xl">
        <div className="section-badge mb-5 inline-flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff6b00]" />
          WHAT IS GEEK ROOM
        </div>

        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.15]">
          Driven by <span className="text-gradient-orange">Logic</span>,<br />
          Inspired by <span className="text-gradient-blue">Creativity</span>.
        </h1>

        <p className="text-base sm:text-xl text-[#94a3b8] leading-relaxed max-w-3xl font-medium">
          Geek Room JIMS is a peer-driven developer community built to empower students. From absolute beginners writing their first line of code to experienced coders building production applications, we come together to learn, build, and innovate.
        </p>
      </div>
    </section>
  );
}
