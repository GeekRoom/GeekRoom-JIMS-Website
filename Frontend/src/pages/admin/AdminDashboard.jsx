import { useState, useEffect } from 'react';
import { api } from '../../utils/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ events: 0, teamHeads: 0, achievements: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [eventsRes, teamHeadsRes, achievementsRes] = await Promise.all([
          api.get('/events/get_events'),
          api.get('/team-heads/get_team_heads'),
          api.get('/achievements/getAll_achievements')
        ]);
        
        setStats({
          events: eventsRes.count || 0,
          teamHeads: teamHeadsRes.count || 0,
          achievements: achievementsRes.count || 0
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg transition-transform hover:-translate-y-1">
        <h3 className="text-xl font-bold text-gray-400">Total Events</h3>
        <p className="text-4xl mt-3 font-semibold text-blue-400">
          {loading ? '...' : stats.events}
        </p>
      </div>
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg transition-transform hover:-translate-y-1">
        <h3 className="text-xl font-bold text-gray-400">Team Heads</h3>
        <p className="text-4xl mt-3 font-semibold text-purple-400">
          {loading ? '...' : stats.teamHeads}
        </p>
      </div>
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg transition-transform hover:-translate-y-1">
        <h3 className="text-xl font-bold text-gray-400">Achievements</h3>
        <p className="text-4xl mt-3 font-semibold text-green-400">
          {loading ? '...' : stats.achievements}
        </p>
      </div>
    </div>
  );
}
