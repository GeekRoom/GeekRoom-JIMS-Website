import React from 'react';

function Timeline() {
  const timelineData = [
    {
      year: "2020",
      title: "Started Project",
      description: "Began the first version of the project."
    },
    {
      year: "2021",
      title: "Added New Features",
      description: "Expanded functionality and improved performance."
    },
    {
      year: "2022",
      title: "Launched Successfully",
      description: "Released the completed version to users."
    }
  ];
  return (
    <section id="timeline">
      <h2>Our Journey</h2>
      <p>Discover the milestones that define our community.</p>
      {timelineData.map((item, index) => (
        <div key={index}>
          <h3>{item.year}</h3>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
        </div>
      ))}
    </section>
  );
}

export default Timeline;
