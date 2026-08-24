import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';

function Achievement() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await api.get('/achievements/getAll_achievements');
        setAchievements(res.data || []);
      } catch (error) {
        console.error("Failed to fetch achievements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  return (
    <section id="achievements" className="achievement">
      <div className="achievement__backdrop" aria-hidden="true">
        <span className="achievement__particle" style={{ "--x": "8%", "--y": "16%", "--size": "10px", "--duration": "14s" }} />
        <span className="achievement__particle" style={{ "--x": "22%", "--y": "72%", "--size": "14px", "--duration": "18s" }} />
        <span className="achievement__particle" style={{ "--x": "43%", "--y": "24%", "--size": "8px", "--duration": "11s" }} />
        <span className="achievement__particle" style={{ "--x": "68%", "--y": "42%", "--size": "12px", "--duration": "16s" }} />
        <span className="achievement__particle" style={{ "--x": "84%", "--y": "12%", "--size": "9px", "--duration": "13s" }} />
        <span className="achievement__particle" style={{ "--x": "72%", "--y": "78%", "--size": "11px", "--duration": "20s" }} />
        <span className="achievement__particle" style={{ "--x": "48%", "--y": "86%", "--size": "7px", "--duration": "15s" }} />
        <span className="achievement__particle" style={{ "--x": "16%", "--y": "48%", "--size": "13px", "--duration": "17s" }} />
      </div>

      <div className="achievement__wrapper page-content">
        <div className="achievement__hero">
          <p className="achievement__eyebrow">ACHIEVEMENTS</p>
          <h2>
            OUR HALL OF <span className="gradient-text-orange">VICTORIES</span>
          </h2>
          <p>
            Geek Room JIMS members regularly dominate national hackathons and open-source
            challenges with sharp execution and collaborative innovation.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-slate-400 mt-10">Loading achievements...</div>
        ) : (
          <div className="achievement__cards-grid">
            {achievements.map((ach, idx) => (
              <article 
                key={ach._id} 
                className={`achievement-card ${idx % 2 === 0 ? 'accent-left' : 'accent-right'} ${idx % 2 === 0 ? 'orange' : 'cyan'}`}
              >
                <span className="achievement-card__pill">{ach.tagname || 'Achievement'}</span>
                <h3>{ach.title}</h3>
                <p>{ach.description}</p>
                {ach.winnerName && <p className="mt-4 text-sm font-semibold text-slate-300">Winner: {ach.winnerName}</p>}
                {ach.month && <p className="text-xs text-slate-500 mt-1">{new Date(ach.month).toLocaleDateString()}</p>}
              </article>
            ))}
            {achievements.length === 0 && (
              <div className="col-span-full text-center text-slate-400">No achievements added yet.</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Achievement;
