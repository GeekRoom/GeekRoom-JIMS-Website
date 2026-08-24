import React from 'react';

function Card() {
  return (
    <section className="card">
      <h1>Achievement Card</h1>
      <h2>Our Winners</h2>
      <div className="winners-container">
        <div className="winners">
          <h1>Smart India Hackathon</h1>
        </div>
        <div className="winners">
          <h1>Prastuti Ideathon</h1>
        </div>
        <div className="winners">
          <h1>Hack Vortex 2.0</h1>
        </div>
        <div className="winners">
          <h1>Silent Query</h1>
        </div>
      </div>
    </section>
  );
}

export default Card;
