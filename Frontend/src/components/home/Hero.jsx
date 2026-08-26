import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [stats, setStats] = useState({ members: 0, events: 0, partners: 0, prize: 0 });

  useEffect(() => {
    let current = { members: 0, events: 0, partners: 0, prize: 0 };
    const targets = { members: 50, events: 5, partners: 10, prize: 2 };

    const timer = setInterval(() => {
      let done = true;
      if (current.members < targets.members) {
        current.members = Math.min(targets.members, current.members + 2);
        done = false;
      }
      if (current.events < targets.events) {
        current.events = Math.min(targets.events, current.events + 1);
        done = false;
      }
      if (current.partners < targets.partners) {
        current.partners = Math.min(targets.partners, current.partners + 1);
        done = false;
      }
      if (current.prize < targets.prize) {
        current.prize = Math.min(targets.prize, current.prize + 1);
        done = false;
      }
      setStats({ ...current });
      if (done) clearInterval(timer);
    }, 40);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="pill-community-badge">
            <span className="badge-dot" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
              🚀 JIMS Official Tech Society • 50+ Active Members
            </span>
          </div>

          <h1 className="hero-title">
            <span className="text-gradient-orange">BUILD</span>.{' '}
            <span className="text-gradient-blue">LEARN</span>.{' '}
            <span className="text-gradient-orange">CREATE</span>.
          </h1>

          <p className="hero-subtitle">
            Geek Room JIMS is the premier developer community empowering students through hackathons, cutting-edge AI & Web3 workshops, and tech mentorship.
          </p>

          <div className="hero-cta-group">
            <Link to="/events" className="btn-primary-neon">
              Explore Events <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>

          {/* Stats Counter Grid */}
          <div className="hero-stats-grid">
            <div className="glass-card stat-card">
              <div className="stat-number">
                {stats.members}<span style={{ color: 'var(--orange-primary)' }}>+</span>
              </div>
              <div className="stat-label">Active Members</div>
            </div>

            <div className="glass-card stat-card">
              <div className="stat-number">
                {stats.events}<span style={{ color: 'var(--blue-cyan)' }}>+</span>
              </div>
              <div className="stat-label">Events Held</div>
            </div>

            <div className="glass-card stat-card">
              <div className="stat-number">
                {stats.partners}<span style={{ color: 'var(--orange-primary)' }}>+</span>
              </div>
              <div className="stat-label">Industry Partners</div>
            </div>

            <div className="glass-card stat-card">
              <div className="stat-number">
                ₹{stats.prize}<span style={{ color: 'var(--blue-cyan)' }}>L+</span>
              </div>
              <div className="stat-label">Prize Pool Won</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
