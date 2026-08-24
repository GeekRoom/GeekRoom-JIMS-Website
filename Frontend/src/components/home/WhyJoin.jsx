import React from 'react';

export default function WhyJoin() {
  const features = [
    {
      icon: 'fa-laptop-code',
      title: 'Hands-on Workshops',
      desc: 'Master Fullstack Web, AI/LLMs, Mobile Apps, Cybersecurity, and Cloud Dev through practical bootcamps.'
    },
    {
      icon: 'fa-trophy',
      title: 'Hackathons & Contests',
      desc: 'Compete in 36-hour hackathons, speed coding contests, and design jams with lucrative cash prizes.'
    },
    {
      icon: 'fa-user-tie',
      title: 'Industry Mentorship',
      desc: 'Get 1-on-1 guidance, code reviews, and career roadmap sessions from senior engineers at top firms.'
    },
    {
      icon: 'fa-network-wired',
      title: 'Career & Referrals',
      desc: 'Access exclusive internship pipelines, hackathon team matching, and resume review channels.'
    }
  ];

  return (
    <section id="why-join" className="section-padding">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-bolt" /> WHY JOIN GEEK ROOM?
          </div>
          <h2 className="section-title">
            BUILT FOR <span className="text-gradient-orange">BUILDERS</span> & TECH LEADERS
          </h2>
          <p className="section-description">
            Accelerate your skills, build real-world projects, and connect with peer developers.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="glass-card feature-card">
              <div className="feature-icon-box">
                <i className={`fa-solid ${f.icon}`} />
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-text">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
