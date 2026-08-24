import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedinIn, FaInstagram, FaDiscord } from 'react-icons/fa';
import ContactModal from '../home/ContactModal';

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <>
      <footer className="footer-section z-10 relative">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo-brand">
                <img src="/logo.png" alt="Geek Room Logo" className="logo-badge-icon" />
                <div className="logo-badge-text">
                  GEEK<span>ROOM</span> <small style={{ fontSize: '0.65rem', color: 'var(--orange-primary)' }}>JIMS</small>
                </div>
              </Link>
              <p>
                The flagship developer & tech society of Jagan Institute of Management Studies. Empowering coders to innovate and lead.
              </p>
              <div className="social-links">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://discord.gg" target="_blank" rel="noreferrer" className="social-icon" aria-label="Discord">
                  <FaDiscord />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="footer-col-title">Quick Links</h4>
              <ul className="footer-links-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/highlights">Highlights</Link></li>
              </ul>
            </div>

            {/* Community Links */}
            <div>
              <h4 className="footer-col-title">Connect</h4>
              <ul className="footer-links-list">
                <li><Link to="/contact">Contact Page</Link></li>
                <li>
                  <a
                    href="#contact-modal"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsContactOpen(true);
                    }}
                  >
                    Quick Inquiry
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div>
              <h4 className="footer-col-title">Stay Updated</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '12px' }}>
                Get event alerts & news delivered.
              </p>
              {subscribed ? (
                <div style={{ color: 'var(--blue-cyan)', fontSize: '0.85rem', fontWeight: 600 }}>
                  ✓ Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Your email"
                    required
                    style={{ padding: '10px 14px' }}
                  />
                  <button
                    type="submit"
                    className="btn-primary-neon"
                    style={{ padding: '10px 18px', borderRadius: 'var(--radius-sm)' }}
                    aria-label="Subscribe"
                  >
                    <i className="fa-solid fa-arrow-right" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} Geek Room JIMS. Built with{' '}
              <i className="fa-solid fa-heart" style={{ color: 'var(--orange-primary)' }} /> for the developer community.
            </p>
          </div>
        </div>
      </footer>

      {/* Global Contact Popup Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
