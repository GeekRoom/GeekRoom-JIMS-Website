import React from 'react';
import { FaLinkedinIn } from 'react-icons/fa';

export default function TeamMemberCard({ member }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/15 bg-[#0a0d18]/80 backdrop-blur-xl transition-all duration-400 hover:-translate-y-2 hover:border-[#ff6b00]/60 hover:shadow-[0_15px_35px_rgba(255,107,0,0.25)]">
      {/* Image container */}
      <div className="relative aspect-[1/1] w-full overflow-hidden bg-[#07080d]">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0d18] via-transparent to-transparent opacity-80" />
        <img
          src={member.img}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
        />
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex items-center justify-between gap-3 relative z-20">
        <div>
          <h3 className="font-display font-bold text-base sm:text-lg text-white transition-colors duration-300 group-hover:text-[#ff6b00]">
            {member.name}
          </h3>
          <p className="font-mono text-[11px] font-semibold tracking-wider uppercase text-[#00f0ff] mt-0.5">
            {member.role}
          </p>
        </div>

        <a
          href={member.linkedin || "#"}
          target="_blank"
          rel="noreferrer"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:border-[#00f0ff] hover:bg-[#00f0ff]/20 hover:text-[#00f0ff] hover:scale-110"
          aria-label={`LinkedIn profile of ${member.name}`}
        >
          <FaLinkedinIn size={14} />
        </a>
      </div>
    </div>
  );
}
