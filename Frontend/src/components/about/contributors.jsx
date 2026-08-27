import React from 'react';
import { FaLinkedinIn } from 'react-icons/fa';

const contributorsData = [
  { name: 'Manmeet Singh', linkedin: 'https://www.linkedin.com/in/manmeet-singh-19b425270/s' },
  { name: 'Khushboo Joshi', linkedin: 'https://www.linkedin.com/in/khushboo-joshi-466525329' },
  { name: 'Parth Mangla', linkedin: 'https://www.linkedin.com/in/parth-mangla-368357287/' }
];

export default function Contributors() {
  return (
    <div className="mt-16">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
          Core Contributors
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {contributorsData.map((contrib, i) => (
          <div
            key={i}
            className="relative flex items-center justify-center rounded-xl border border-white/10 bg-[#0a0d18]/70 px-12 py-4 sm:py-4.5 backdrop-blur-md transition-all duration-300 hover:border-[#00f0ff]/50 hover:bg-[#0a0d18] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,240,255,0.18)] group"
          >
            {/* Centered Name Only */}
            <p className="font-display font-bold text-sm sm:text-base text-white text-center group-hover:text-[#00f0ff] transition-colors tracking-wide truncate">
              {contrib.name || contrib}
            </p>

            {/* LinkedIn Button on Left Side */}
            <a
              href={contrib.linkedin && contrib.linkedin !== '#' ? contrib.linkedin : '#'}
              target={contrib.linkedin && contrib.linkedin !== '#' ? '_blank' : '_self'}
              rel="noreferrer"
              className="absolute left-3.5 sm:left-4 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:border-[#00f0ff] hover:bg-[#00f0ff]/20 hover:text-[#00f0ff] hover:scale-110"
              aria-label={`LinkedIn profile of ${contrib.name || contrib}`}
            >
              <FaLinkedinIn size={13} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
