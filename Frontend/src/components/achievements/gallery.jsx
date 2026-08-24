import React from 'react';

function Gallery() {
  return (
    <section className="gallery">
      <h1>Gallery Section</h1>
      <div className="gallery-container">
        <div className="gallery-item">
          <img src="image1.jpg" alt="Image 1" />
        </div>
        <div className="gallery-item">
          <img src="image2.jpg" alt="Image 2" />
        </div>
        <div className="gallery-item">
          <img src="image3.jpg" alt="Image 3" />
        </div>
      </div>
    </section>
  );
}

export default Gallery;
