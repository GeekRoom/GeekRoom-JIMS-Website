import { useState } from 'react';
import { eventsData } from '../../services/mockData';
import './Events.css';

export const Events = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredEvents = eventsData.filter(event => {
    if (activeFilter === 'all') return true;
    return event.type === activeFilter;
  });

  return (
    <div className="events-container">
      <div className="events-header">
        <h1>Community Events</h1>
        <p>Explore our hackathons, design challenges, code sprints, and seminars.</p>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button 
          className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All Events
        </button>
        <button 
          className={`filter-tab ${activeFilter === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveFilter('upcoming')}
        >
          Upcoming
        </button>
        <button 
          className={`filter-tab ${activeFilter === 'past' ? 'active' : ''}`}
          onClick={() => setActiveFilter('past')}
        >
          Past
        </button>
      </div>

      {/* Events Grid */}
      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-image-container">
                <img src={event.image} alt={event.title} className="event-image" />
                <span className={`event-badge ${event.type}`}>
                  {event.type.toUpperCase()}
                </span>
              </div>
              <div className="event-details">
                <span className="event-date">📅 {event.date} | ⏰ {event.time}</span>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-desc">{event.description}</p>
                <span className="event-venue">📍 {event.venue}</span>
                {event.registrationLink && event.type === 'upcoming' && (
                  <a 
                    href={event.registrationLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="event-register-btn"
                  >
                    Register Now
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-events">
            <p>No events found for this category. Stay tuned for upcoming updates!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
