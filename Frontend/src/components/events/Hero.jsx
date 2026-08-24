import React, { useState, useEffect } from "react";
import { Terminal, Sparkles, Zap } from "lucide-react";

export default function HeroSection() {
  const fullText = "Your next experience starts here.";
  const [typedText, setTypedText] = useState("");
  const [isDoneTyping, setIsDoneTyping] = useState(false);

  // Typewriter effect on load
  useEffect(() => {
    let index = 0;
    setTypedText("");
    setIsDoneTyping(false);
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsDoneTyping(true);
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-4 pt-4 sm:pt-6">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">

          {/* LEFT SIDE */}
          <div className="space-y-4 lg:col-span-7">
            <div className="section-badge inline-flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff6b00]" />
              GEEK ROOM JIMS
            </div>

            <h1 className="hero-title-premium block font-display text-4xl font-extrabold sm:text-6xl">
              <span className="hero-title-word">Events</span>
              <span className="hero-title-dot text-[#ff6b00]">.</span>
            </h1>

            {/* ABOUT OUR EVENTS BOX */}
            <div className="glass-card relative overflow-hidden p-6 sm:p-7">
              <div className="pointer-events-none absolute -right-8 -top-12 h-44 w-44 rounded-full bg-[#ff6b00]/10 blur-[48px]" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-[#ff6b00]/70 via-[#00f0ff]/40 to-transparent" />

              <h2 className="mb-2 font-mono text-[12px] tracking-widest text-[#00f0ff]">
                ABOUT OUR EVENTS
              </h2>

              <p className="max-w-[62ch] text-[15px] leading-7 text-[#94a3b8]">
                Geek Room JIMS organizes a diverse range of technical events
                throughout the year, including hackathons, coding contests,
                workshops, seminars, and networking sessions. Whether you're
                a beginner or an experienced developer, there's always an
                opportunity to learn, compete, and innovate.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - COMPACT TYPEWRITER BOX */}
          <div className="flex flex-col justify-end lg:col-span-5">
            <div className="group relative w-full overflow-hidden rounded-2xl border border-[#ff6b00]/40 bg-[#0a0d18]/90 p-4 sm:p-5 font-mono shadow-[0_0_30px_rgba(255,107,0,0.15)] backdrop-blur-xl transition-all duration-500 hover:border-[#00f0ff] hover:shadow-[0_0_40px_rgba(0,240,255,0.25)]">
              
              {/* Dynamic Animated Gradient Borders */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,0,0.15),transparent_60%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 animate-pulse rounded-full bg-[#00f0ff]/20 blur-[50px]" />
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 animate-pulse rounded-full bg-[#ff3d00]/20 blur-[50px]" />
              
              {/* Top Animated Laser Line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff6b00] to-transparent animate-pulse" />

              {/* Header Bar */}
              <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-1.5 text-[#ff6b00]">
                  <Terminal size={14} className="animate-bounce" />
                  <span className="text-[10px] font-bold tracking-wider text-white">LIVE TERMINAL</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00f0ff]" />
                  </span>
                  <span className="rounded border border-[#00f0ff]/40 bg-[#00f0ff]/10 px-2 py-0.5 font-mono text-[9px] font-bold text-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                    ACTIVE
                  </span>
                </div>
              </div>

              {/* Window Dot Indicators */}
              <div className="relative z-10 my-1.5 flex items-center gap-1.5 opacity-80">
                <span className="h-2 w-2 rounded-full bg-[#ff3d00] shadow-[0_0_6px_#ff3d00]" />
                <span className="h-2 w-2 rounded-full bg-[#ff6b00] shadow-[0_0_6px_#ff6b00]" />
                <span className="h-2 w-2 rounded-full bg-[#00f0ff] shadow-[0_0_6px_#00f0ff]" />
              </div>

              {/* Main Animated Typewriter Heading */}
              <div className="relative z-10 my-1.5 min-h-[38px] flex items-center">
                <p className="font-display text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                  {typedText}
                  <span className={`inline-block w-2 h-4 ml-1 bg-[#00f0ff] align-middle ${isDoneTyping ? 'animate-pulse' : 'animate-ping'}`} />
                </p>
              </div>

              {/* Sub-Interactive Prompt */}
              <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#ff6b00] flex items-center gap-1">
                  <Zap size={11} className="text-[#ff6b00] animate-pulse" />
                  Stay tuned for what's next →
                </p>
                <div className="flex items-center gap-1 text-[9px] text-slate-400">
                  <Sparkles size={10} className="text-[#ff6b00]" />
                  <span>2026</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative py-6">
          <div className="absolute inset-0 flex items-center">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#ff6b00]/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
