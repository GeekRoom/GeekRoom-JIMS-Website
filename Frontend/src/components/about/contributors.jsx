import React from 'react';
import { FaLinkedinIn } from 'react-icons/fa';

const contributorsData = [
  { name: 'JD Doe', role: 'Design' },
  { name: 'Sam Smith', role: 'Backend' },
  { name: 'Emily R.', role: 'Events' },
  { name: 'Alex B.', role: 'Frontend' },
  { name: 'Jordan K.', role: 'Content' },
  { name: 'Taylor M.', role: 'Social' }
];

export default function Contributors() {
  return (
    <div className="mt-16">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
          Core Contributors
        </h3>
        <span className="font-mono text-xs text-[#ff6b00] uppercase tracking-wider">
          Community Builders
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {contributorsData.map((contrib, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0a0d18]/70 p-3.5 backdrop-blur-md transition-all duration-300 hover:border-[#00f0ff]/50 hover:bg-[#0a0d18]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#00f0ff]/30 bg-[#00f0ff]/10 text-[#00f0ff]">
                <FaLinkedinIn size={14} />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-white">{contrib.name}</p>
                <p className="font-mono text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider">{contrib.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
