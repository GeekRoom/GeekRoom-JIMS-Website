import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="header-nav-wrapper">
        <nav className="navbar-glass-minimal">
          {/* Brand Logo - Left */}
          <NavLink to="/" className="nav-logo-brand">
            <img src="/Photos/logo.png" alt="Geek Room Logo" className="logo-badge-icon" />
            <div className="logo-badge-text">
              GEEK ROOM <span>JIMS</span>
            </div>
          </NavLink>

          {/* Desktop Navigation - Right */}
          <div className="nav-links-desktop">
            <ul className="nav-links-list">
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
