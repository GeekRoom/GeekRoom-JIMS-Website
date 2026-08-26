import React, { useState } from 'react';
import { FaLinkedinIn, FaUser } from 'react-icons/fa';

export default function TeamMemberCard({ member }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-[16px] border border-white/12 bg-[rgba(13,17,28,0.65)] backdrop-blur-[20px] shadow-lg transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#ff6b00] hover:shadow-[0_16px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(255,107,0,0.35)] hover:[transform:translateY(-6px)_perspective(1000px)_rotateX(1.5deg)_rotateY(-1.5deg)]">
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
      <div className="p-3.5 sm:p-4 flex items-center justify-between gap-2.5 relative z-20 font-main">
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
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:border-[#ff6b00] hover:bg-[#ff6b00]/20 hover:text-[#ff6b00] hover:shadow-[0_0_15px_rgba(255,107,0,0.5)]"
          aria-label={`LinkedIn profile of ${member.name}`}
        >
          <FaLinkedinIn size={13} />
        </a>
      </div>
    </div>
  );
}
