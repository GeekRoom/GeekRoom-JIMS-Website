import React from 'react';

const purposes = [
  { id: 1, title: 'Learn Together', desc: 'Collaborative learning sessions where beginners and experienced builders grow together.' },
  { id: 2, title: 'Building Projects', desc: 'Turn ideas into working products through hands-on building and experimentation.' },
  { id: 3, title: 'Networking', desc: 'Meet developers, builders, founders, and professionals who expand your technical network.' },
  { id: 4, title: 'Peer Mentorship', desc: 'Learn directly from peers through practical guidance and shared experience.' },
  { id: 5, title: 'Open Source', desc: 'Contribute to real projects, learn in public, and build a track record beyond the classroom.' },
  { id: 6, title: 'Industry Exposure', desc: 'Connect with professionals and understand how technology is built and shipped in the real world.' }
];

export default function Purpose() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-12 border-t border-white/10 relative">
      <div className="mb-8">
        <h2 className="font-display text-3xl sm:text-4xl text-white font-bold tracking-tight">
          Purpose &amp; <span className="text-gradient-orange">Intent</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {purposes.map((p) => (
          <div
            key={p.id}
            className="purpose-card-interactive group"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-xl font-bold text-white group-hover:text-[#ff6b00] transition-colors">
                {p.title}
              </h3>
              <span className="font-mono text-xs font-bold text-[#00f0ff] px-2 py-0.5 rounded border border-[#00f0ff]/30 bg-[#00f0ff]/10">
                0{p.id}
              </span>
            </div>
            <p className="text-sm text-[#94a3b8] leading-relaxed font-normal">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
