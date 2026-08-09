import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <h3 className="footer-logo">
            <span className="logo-accent">Geek</span>Room JIMS
          </h3>
          <p className="footer-desc">
            The official coding community of JIMS. Nurturing tech talent, organizing hackathons, 
            and fostering collaboration.
          </p>
        </div>

        <div className="footer-links-group">
          <div className="footer-links-col">
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/events">Events</Link>
            <Link to="/team">Our Team</Link>
            <Link to="/gallery">Gallery</Link>
          </div>

          <div className="footer-links-col">
            <h4>Community</h4>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer">Discord</a>
          </div>

          <div className="footer-links-col">
            <h4>Contact</h4>
            <Link to="/contact">Reach Us</Link>
            <span className="footer-text">info@geekroomjims.in</span>
            <span className="footer-text">JIMS Campus, Delhi</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GeekRoom JIMS. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
