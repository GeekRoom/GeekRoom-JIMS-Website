import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import './Navbar.css';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          <span className="logo-accent">Geek</span>Room JIMS
        </NavLink>

        <button 
          className="menu-toggle" 
          onClick={toggleMenu} 
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        </button>

        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} 
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/events" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} 
            onClick={() => setIsOpen(false)}
          >
            Events
          </NavLink>
          <NavLink 
            to="/team" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} 
            onClick={() => setIsOpen(false)}
          >
            Team
          </NavLink>
          <NavLink 
            to="/gallery" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} 
            onClick={() => setIsOpen(false)}
          >
            Gallery
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} 
            onClick={() => setIsOpen(false)}
          >
            Contact
          </NavLink>
          
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
