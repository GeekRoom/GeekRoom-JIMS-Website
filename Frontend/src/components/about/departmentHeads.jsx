import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TeamMemberCard from './card';
import { api } from '../../utils/api';

export default function DepartmentHeads() {
  const scrollRef = useRef(null);
  const [headsData, setHeadsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeads = async () => {
      try {
        const res = await api.get('/team-heads/get_team_heads');
        const liveHeads = res.data || [];
        const filtered = liveHeads
          .filter(h => h.ispresident === 'no')
          .map(h => ({
            name: h.name,
            role: h.department || 'Head',
            img: h.image,
            linkedin: '#'
          }));
        setHeadsData(filtered);
      } catch (error) {
        console.error("Failed to fetch heads:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeads();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -310, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 310, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400 mb-20">Loading Department Heads...</div>;
  }

  if (headsData.length === 0) return null;

  return (
    <div className="mb-20 relative">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-2xl md:text-3xl text-white">
            Department Heads
          </h3>
          <p className="font-mono text-xs text-[#00f0ff] uppercase tracking-wider mt-1">
            {headsData.length} Heads • Scroll to explore
          </p>
        </div>

        {/* Previous & Next Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollLeft}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#0a0d18]/80 text-white backdrop-blur-md transition-all duration-300 hover:border-[#ff6b00] hover:bg-[#ff6b00]/15 hover:text-[#ff6b00] active:scale-95"
            aria-label="Scroll left department heads"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={scrollRight}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#0a0d18]/80 text-white backdrop-blur-md transition-all duration-300 hover:border-[#ff6b00] hover:bg-[#ff6b00]/15 hover:text-[#ff6b00] active:scale-95"
            aria-label="Scroll right department heads"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {headsData.map((member, i) => (
          <div key={i} className="w-[270px] sm:w-[290px] shrink-0 snap-start">
            <TeamMemberCard member={member} />
          </div>
        ))}
      </div>
    </div>
  );
}
