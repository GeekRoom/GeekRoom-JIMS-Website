import React from 'react';
import '../../styles/about.css';
import Hero from '../../components/about/hero';
import Purpose from '../../components/about/purpose';
import Presidents from '../../components/about/presidents';
import DepartmentHeads from '../../components/about/departmentHeads';
import Contributors from '../../components/about/contributors';
import Faq from '../../components/about/faq';

export const AboutPage = () => {
  return (
    <div className="about-page text-[#f8fafc] bg-transparent relative pb-20">
      <main className="flex-grow z-10 relative pt-16 sm:pt-20 pb-16">
        <Hero />
        <Purpose />
        
        {/* Team / Leadership Section */}
        <section className="px-6 pt-16 pb-12 bg-transparent relative z-10" id="team-section">
          <div className="max-w-7xl mx-auto relative z-10 border-t border-white/10 pt-16">
            <div className="mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#ff6b00]">
                LEADERSHIP & CORE TEAM
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
                The Minds Behind <span className="text-gradient-orange">Geek Room</span>
              </h2>
            </div>
            <Presidents />
            <DepartmentHeads />
            <Contributors />
          </div>
        </section>

        <Faq />
      </main>
    </div>
  );
};

export default AboutPage;
