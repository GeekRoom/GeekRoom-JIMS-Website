// Geek Room JIMS Partners Component
import React from 'react';

export default function Partners() {
  const row1 = [
    { icon: 'fa-brands fa-github', name: 'GitHub' },
    { icon: 'fa-solid fa-code', name: 'ReinAiScience' },
    { icon: 'fa-solid fa-layer-group', name: 'Cloud Craft' },
    { icon: 'fa-solid fa-paper-plane', name: 'Quill Ai' },
    { icon: 'fa-solid fa-cubes', name: 'Nord VPN' },
    { icon: 'fa-solid fa-terminal', name: 'Tru Scholar' },
    { icon: 'fa-brands fa-discord', name: 'UnStop' }
  ];

  return (
    <section id="partners" className="section-padding" style={{ paddingBottom: '60px' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            OUR <span className="text-gradient-blue">COLLABORATORS</span>
          </h2>
          <p className="section-description">
            Building connections with leading names across the tech ecosystem.
          </p>
        </div>
      </div>

      <div className="glass-marquee-panel">
        <div className="marquee-track">
          {[...row1, ...row1, ...row1, ...row1].map((item, idx) => (
            <div
              key={idx}
              className={`liquid-glass-pill ${idx % 2 === 0 ? 'pill-orange' : 'pill-blue'}`}
            >
              <span className="pill-dot" />
              <span className="pill-text">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
