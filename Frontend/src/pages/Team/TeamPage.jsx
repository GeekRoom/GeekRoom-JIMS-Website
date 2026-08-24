import React from 'react';
import { teamData } from '../../data/mockData';
import '../../styles/team.css';

export const TeamPage = () => {
  return (
    <div className="team-container dark text-text-main relative pt-24 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-grid-margin py-stack-xl mb-12">
        <div className="text-center mb-16">
          <span className="section-badge mb-4 inline-block">LEADERSHIP & CREW</span>
          <h1 className="font-headline-xl text-[42px] md:text-[64px] font-extrabold text-text-main tracking-tight mb-4">
            Meet the Team
          </h1>
          <p className="font-body-lg text-text-muted max-w-2xl mx-auto text-lg md:text-xl">
            The organizers, developers, and designers working behind the scenes to coordinate Geek Room JIMS.
          </p>
        </div>

        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamData.map((member) => (
            <div key={member.id} className="team-card glass-card p-6 rounded-2xl border border-white/10 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-orange-neon/50">
              <div className="team-image-container relative w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-orange-neon/60 shadow-[0_0_20px_rgba(255,107,0,0.25)]">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="team-info flex flex-col items-center">
                <h3 className="team-name text-2xl font-bold text-white mb-1">{member.name}</h3>
                <span className="team-role text-xs font-mono font-semibold px-3 py-1 rounded-full bg-orange-neon/10 text-orange-neon border border-orange-neon/30 uppercase tracking-wider mb-4">
                  {member.role}
                </span>
                <div className="team-socials flex gap-4 mt-2">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn github px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-text-muted hover:bg-orange-neon hover:text-white hover:border-orange-neon transition-all"
                      aria-label={`${member.name}'s GitHub Profile`}
                    >
                      GitHub
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn linkedin px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-text-muted hover:bg-blue-cyan hover:text-black hover:border-blue-cyan transition-all"
                      aria-label={`${member.name}'s LinkedIn Profile`}
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
