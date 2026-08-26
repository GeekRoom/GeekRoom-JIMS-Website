import React, { useState } from 'react';
import { FaLinkedinIn, FaUser } from 'react-icons/fa';

export default function TeamMemberCard({ member }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#0a0d18]/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#ff6b00]/60 hover:shadow-[0_15px_35px_rgba(255,107,0,0.25)]">
      {/* Image container */}
      <div className="relative aspect-[4/4.2] w-full overflow-hidden bg-[#07080d]">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0d18] via-transparent to-transparent opacity-80" />
        
        {member.img && !imgError ? (
          <img
            src={member.img}
            alt={member.name}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#0d1122] text-[#00f0ff]/40">
            <FaUser size={48} />
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-3.5 sm:p-4 flex items-center justify-between gap-2.5 relative z-20">
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-bold text-sm sm:text-base text-white truncate transition-colors duration-300 group-hover:text-[#ff6b00]">
            {member.name}
          </h3>
          <p className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#00f0ff] mt-0.5 truncate">
            {member.role}
          </p>
        </div>

        <a
          href={member.linkedin && member.linkedin !== '#' ? member.linkedin : '#'}
          target={member.linkedin && member.linkedin !== '#' ? '_blank' : '_self'}
          rel="noreferrer"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:border-[#00f0ff] hover:bg-[#00f0ff]/20 hover:text-[#00f0ff] hover:scale-105"
          aria-label={`LinkedIn profile of ${member.name}`}
        >
          <FaLinkedinIn size={13} />
        </a>
      </div>
    </div>
  );
}
