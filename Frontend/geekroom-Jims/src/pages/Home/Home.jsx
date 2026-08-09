import { Link } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title animate-fade-in">
          Unlock Your Coding Potential with <span className="logo-accent">GeekRoom JIMS</span>
        </h1>
        <p className="hero-subtitle animate-fade-in-delayed">
          Welcome to the ultimate hub for developers, designers, and tech enthusiasts. 
          Learn, build, and grow alongside industry mentors and peer coding buddies.
        </p>
        <div className="hero-ctas">
          <Link to="/events" className="cta-button primary">
            Explore Events
          </Link>
          <Link to="/contact" className="cta-button secondary">
            Join Community
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-card">
          <span className="stat-number">500+</span>
          <span className="stat-label">Active Members</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">15+</span>
          <span className="stat-label">Hands-on Workshops</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">5+</span>
          <span className="stat-label">Hackathons Organized</span>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="values-section">
        <h2>What We Do</h2>
        <div className="values-grid">
          <div className="value-card">
            <span className="value-icon">💻</span>
            <h3>Practical Learning</h3>
            <p>Hands-on development sessions on core technologies, software engineering patterns, and modern frameworks.</p>
          </div>
          <div className="value-card">
            <span className="value-icon">🤝</span>
            <h3>Mentorship</h3>
            <p>Direct support from senior students and working professionals to guide you in open source, projects, and placements.</p>
          </div>
          <div className="value-card">
            <span className="value-icon">🏆</span>
            <h3>Hackathons</h3>
            <p>Interactive local design sprints and campus-wide coding challenges to test and display your skills.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
