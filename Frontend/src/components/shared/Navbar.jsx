import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="header-nav-wrapper">
        <nav className="navbar-glass-minimal">
          {/* Left Links */}
          <ul className="nav-links-left">
            <li>
              <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/events" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Events
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                About Us
              </NavLink>
            </li>
          </ul>

          {/* Center Logo */}
          <NavLink to="/" className="nav-logo-center">
            <img src="/logo.png" alt="Geek Room Logo" className="logo-badge-icon" />
            <div className="logo-badge-text">
              GEEK<span>ROOM</span> <small style={{ fontSize: '0.65rem', color: 'var(--orange-primary)' }}>JIMS</small>
            </div>
          </NavLink>

          {/* Right Links */}
          <div className="nav-links-right">
            <ul style={{ display: 'flex', alignItems: 'center', gap: '20px', listStyle: 'none' }}>
              <li>
                <NavLink to="/highlights" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Highlights
                </NavLink>
              </li>
            </ul>
            <NavLink to="/contact" className="btn-contact-nav">
              <i className="fa-solid fa-paper-plane"></i> Contact Us
            </NavLink>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileOpen ? 'active' : ''}`}>
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/events" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
          Events
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
          About Us
        </NavLink>
        <NavLink to="/highlights" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
          Highlights
        </NavLink>
        <NavLink
          to="/contact"
          className="btn-contact-nav"
          style={{ justifyContent: 'center', marginTop: '8px' }}
          onClick={() => setMobileOpen(false)}
        >
          <i className="fa-solid fa-paper-plane"></i> Contact Us
        </NavLink>
      </div>
    </>
  );
}
