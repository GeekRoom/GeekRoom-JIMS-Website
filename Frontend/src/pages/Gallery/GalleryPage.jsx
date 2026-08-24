import React, { useState } from 'react';
import { galleryData } from '../../data/mockData';
import '../../styles/gallery.css';

export const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredGallery = galleryData.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="gallery-container dark text-text-main relative pt-24 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-grid-margin py-stack-xl mb-12">
        <div className="text-center mb-12">
          <span className="section-badge mb-4 inline-block">COMMUNITY MOMENTS</span>
          <h1 className="font-headline-xl text-[42px] md:text-[64px] font-extrabold text-text-main tracking-tight mb-4">
            Community Gallery
          </h1>
          <p className="font-body-lg text-text-muted max-w-2xl mx-auto text-lg md:text-xl">
            Memories and moments from our workshops, bootcamps, hackathons, and networking meetups.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs flex flex-wrap justify-center gap-3 mb-12">
          {['all', 'hackathon', 'workshop', 'meetup'].map((cat) => (
            <button
              key={cat}
              className={`filter-tab px-6 py-2 rounded-full font-mono text-sm font-bold uppercase transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-orange-neon text-white shadow-[0_0_15px_rgba(255,107,0,0.4)]'
                  : 'bg-white/5 border border-white/10 text-text-muted hover:border-white/30 hover:text-white'
              }`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat === 'all' ? 'All Moments' : `${cat}s`}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGallery.map(item => (
            <div key={item.id} className="gallery-item group relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] bg-slate-900 shadow-lg">
              <img 
                src={item.image} 
                alt={item.title} 
                className="gallery-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="gallery-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="gallery-category font-mono text-xs text-blue-cyan font-bold tracking-widest uppercase mb-1">
                  {item.category}
                </span>
                <h3 className="gallery-title text-xl font-bold text-white leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
