import React from 'react';

export default function Partners() {
  const row1 = [
    { icon: 'fa-brands fa-github', name: 'GitHub Campus' },
    { icon: 'fa-solid fa-code', name: 'Devfolio' },
    { icon: 'fa-solid fa-layer-group', name: 'Vercel' },
    { icon: 'fa-solid fa-paper-plane', name: 'Postman' },
    { icon: 'fa-solid fa-cubes', name: 'Polygon' },
    { icon: 'fa-solid fa-terminal', name: 'GeeksforGeeks' },
    { icon: 'fa-brands fa-discord', name: 'Discord Community' }
  ];

  const row2 = [
    { icon: 'fa-solid fa-rocket', name: 'Coding Ninjas' },
    { icon: 'fa-solid fa-flag', name: 'Major League Hacking' },
    { icon: 'fa-solid fa-brain', name: 'Open AI Labs' },
    { icon: 'fa-solid fa-shield-halved', name: 'Hack2Skill' },
    { icon: 'fa-solid fa-bolt', name: 'Red Bull Energy' },
    { icon: 'fa-solid fa-graduation-cap', name: 'JIMS Alumni Network' }
  ];

  return (
    <section id="partners" className="section-padding" style={{ paddingBottom: '60px' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-handshake" /> COLLABORATIONS
          </div>
          <h2 className="section-title">
            POWERED BY <span className="text-gradient-blue">INDUSTRY LEADERS</span>
          </h2>
          <p className="section-description">
            We collaborate with world-class tech companies, platforms, and developer communities.
          </p>
        </div>
      </div>

      <div className="marquee-container">
        <div className="marquee-track">
          {[...row1, ...row1].map((item, idx) => (
            <div key={idx} className="marquee-item">
              <i className={item.icon} /> {item.name}
            </div>
          ))}
        </div>

        <div className="marquee-track marquee-track-reverse">
          {[...row2, ...row2].map((item, idx) => (
            <div key={idx} className="marquee-item">
              <i className={item.icon} /> {item.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
