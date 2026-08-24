import React, { useState, useEffect } from 'react';
import TeamMemberCard from './card';
import { api } from '../../utils/api';

export default function Presidents() {
  const [presidents, setPresidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPresidents = async () => {
      try {
        const res = await api.get('/team-heads/get_team_heads');
        const liveHeads = res.data || [];
        const filtered = liveHeads
          .filter(h => h.ispresident === 'yes')
          .map(h => ({
            name: h.name,
            role: 'President / Core',
            img: h.image,
            linkedin: '#'
          }));
        setPresidents(filtered);
      } catch (error) {
        console.error("Failed to fetch presidents:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPresidents();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-400 mb-16">Loading Core Team...</div>;
  }

  if (presidents.length === 0) return null;

  return (
    <div className="mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {presidents.map((member, i) => (
          <TeamMemberCard key={i} member={member} />
        ))}
      </div>
    </div>
  );
}
