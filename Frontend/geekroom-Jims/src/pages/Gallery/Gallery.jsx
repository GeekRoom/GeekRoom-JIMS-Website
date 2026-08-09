import { useState } from 'react';
import { galleryData } from '../../services/mockData';
import './Gallery.css';

export const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredGallery = galleryData.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>Community Gallery</h1>
        <p>Memories and moments from our workshops, bootcamps, hackathons, and networking meetups.</p>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button 
          className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-tab ${activeFilter === 'hackathon' ? 'active' : ''}`}
          onClick={() => setActiveFilter('hackathon')}
        >
          Hackathons
        </button>
        <button 
          className={`filter-tab ${activeFilter === 'workshop' ? 'active' : ''}`}
          onClick={() => setActiveFilter('workshop')}
        >
          Workshops
        </button>
        <button 
          className={`filter-tab ${activeFilter === 'meetup' ? 'active' : ''}`}
          onClick={() => setActiveFilter('meetup')}
        >
          Meetups
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {filteredGallery.map(item => (
          <div key={item.id} className="gallery-item">
            <img src={item.image} alt={item.title} className="gallery-image" />
            <div className="gallery-overlay">
              <span className="gallery-category">{item.category.toUpperCase()}</span>
              <h3 className="gallery-title">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
