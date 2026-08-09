import { teamData } from '../../services/mockData';
import './Team.css';

export const Team = () => {
  return (
    <div className="team-container">
      <div className="team-header">
        <h1>Meet the Team</h1>
        <p>The organizers, developers, and designers working behind the scenes to coordinate GeekRoom JIMS.</p>
      </div>

      <div className="team-grid">
        {teamData.map(member => (
          <div key={member.id} className="team-card">
            <div className="team-image-container">
              <img src={member.image} alt={member.name} className="team-image" />
            </div>
            <div className="team-info">
              <h3 className="team-name">{member.name}</h3>
              <span className="team-role">{member.role}</span>
              <div className="team-socials">
                <a 
                  href={member.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-btn github"
                  aria-label={`${member.name}'s GitHub Profile`}
                >
                  GitHub
                </a>
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-btn linkedin"
                  aria-label={`${member.name}'s LinkedIn Profile`}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
