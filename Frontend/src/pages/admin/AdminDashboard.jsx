import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';
import { 
  Calendar, Users, 
  ArrowRight, Plus, Activity, 
  ExternalLink 
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ events: 0, teamHeads: 0 });
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const results = await Promise.allSettled([
          api.get('/events/get_events'),
          api.get('/team-heads/get_team_heads')
        ]);
        
        const eventsRes = results[0].status === 'fulfilled' ? results[0].value : { count: 0, data: [] };
        const teamHeadsRes = results[1].status === 'fulfilled' ? results[1].value : { count: 0, data: [] };
        
        setStats({
          events: eventsRes.count || 0,
          teamHeads: teamHeadsRes.count || 0
        });

        // Parse events and get top 4 most recently created or soonest upcoming
        const eventsArray = eventsRes.data || [];
        // Sort by date descending (most recent first)
        const sorted = eventsArray.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
        setRecentEvents(sorted.slice(0, 4));

      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d111c]/60 p-6 sm:p-8 backdrop-blur-xl shadow-lg">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-[#ff6b00]/10 blur-[80px]" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-[#00f0ff]/10 blur-[80px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mb-1">
              Welcome back, Admin! 👋
            </h2>
            <p className="text-sm font-mono text-slate-400">
              {currentDate}
            </p>
          </div>
          <Link 
            to="/admin/events"
            className="inline-flex items-center gap-2 bg-[#ff6b00] hover:bg-[#ff3d00] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_30px_rgba(255,107,0,0.5)] transition-all hover:-translate-y-0.5"
          >
            <Plus size={16} /> Create New Event
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Events Stat */}
        <div className="group relative overflow-hidden bg-[rgba(13,17,28,0.65)] backdrop-blur-xl border border-white/10 p-6 rounded-2xl transition-all duration-300 hover:border-[#00f0ff]/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]">
          <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-20 text-[#00f0ff]">
            <Calendar size={80} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20">
                <Calendar size={20} />
              </div>
              <h3 className="font-mono text-xs font-semibold tracking-wider text-slate-400 uppercase">Total Events</h3>
            </div>
            <p className="text-4xl font-bold text-white font-display mt-2">
              {loading ? <span className="animate-pulse">...</span> : stats.events}
            </p>
          </div>
        </div>

        {/* Team Heads Stat */}
        <div className="group relative overflow-hidden bg-[rgba(13,17,28,0.65)] backdrop-blur-xl border border-white/10 p-6 rounded-2xl transition-all duration-300 hover:border-[#ff6b00]/50 hover:shadow-[0_0_30px_rgba(255,107,0,0.15)]">
          <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-20 text-[#ff6b00]">
            <Users size={80} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#ff6b00]/10 text-[#ff6b00] border border-[#ff6b00]/20">
                <Users size={20} />
              </div>
              <h3 className="font-mono text-xs font-semibold tracking-wider text-slate-400 uppercase">Team Heads</h3>
            </div>
            <p className="text-4xl font-bold text-white font-display mt-2">
              {loading ? <span className="animate-pulse">...</span> : stats.teamHeads}
            </p>
          </div>
        </div>

      </div>

      {/* Main Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Events Panel (Takes up 2 columns on lg) */}
        <div className="lg:col-span-2 bg-[rgba(13,17,28,0.65)] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-[#00f0ff]" />
              <h3 className="font-bold text-white">Recent Activity</h3>
            </div>
            <Link to="/admin/events" className="text-xs font-semibold text-[#00f0ff] hover:text-[#00c0cc] flex items-center gap-1 transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="p-0">
            {loading ? (
              <div className="p-8 text-center text-slate-400 text-sm animate-pulse">Loading recent events...</div>
            ) : recentEvents.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-white/5 border-b border-white/10 text-xs font-mono uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="px-5 py-3 font-medium">Event</th>
                      <th className="px-5 py-3 font-medium">Date</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {recentEvents.map(event => (
                      <tr key={event._id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            {event.image ? (
                              <img src={event.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-white/10" />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                <Calendar size={16} className="text-slate-500" />
                              </div>
                            )}
                            <div>
                              <p className="font-bold text-slate-200 line-clamp-1">{event.title}</p>
                              <p className="text-xs text-slate-500 font-mono mt-0.5 capitalize">{event.category || 'General'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            event.status === 'upcoming' 
                              ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                              : 'bg-white/5 text-slate-400 border border-white/10'
                          }`}>
                            {event.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 text-sm">No events found.</div>
            )}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-[rgba(13,17,28,0.65)] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg h-fit">
          <div className="p-5 border-b border-white/10">
            <h3 className="font-bold text-white flex items-center gap-2">
              <ExternalLink size={18} className="text-[#ff6b00]" /> Quick Actions
            </h3>
          </div>
          <div className="p-3 space-y-2">
            <Link 
              to="/admin/events"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                <Calendar size={18} />
              </div>
              <div className="flex-1 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                Manage Events
              </div>
              <ArrowRight size={16} className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link 
              to="/admin/team-heads"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                <Users size={18} />
              </div>
              <div className="flex-1 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                Manage Team Heads
              </div>
              <ArrowRight size={16} className="text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
