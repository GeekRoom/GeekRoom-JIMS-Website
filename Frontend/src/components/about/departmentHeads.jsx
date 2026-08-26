import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TeamMemberCard from './card';
import { api } from '../../utils/api';

export default function DepartmentHeads() {
  const [headsData, setHeadsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [itemsVisible, setItemsVisible] = useState(3);
  const [touchStartX, setTouchStartX] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

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
            linkedin: h.linkedin || '#'
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

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 640) {
        setItemsVisible(1);
      } else if (window.innerWidth < 1024) {
        setItemsVisible(2);
      } else {
        setItemsVisible(3);
      }
    };
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  const maxIndex = Math.max(0, headsData.length - itemsVisible);
  const displayList = headsData;

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  // Auto-swipe every 5 seconds
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex(prev => {
        if (prev >= maxIndex) return 0;
        return Math.min(prev + itemsVisible, maxIndex);
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, maxIndex, itemsVisible]);

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex(prev => Math.max(0, prev - itemsVisible));
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex(prev => Math.min(maxIndex, prev + itemsVisible));
  };

  const handleTouchStart = (e) => {
    setIsPaused(true);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setIsPaused(false);
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  if (loading) {
    return <div className="text-center text-gray-400 mb-20">Loading Department Heads...</div>;
  }

  if (headsData.length === 0) return null;

  const getCardStyle = () => {
    if (itemsVisible === 1) {
      return { width: '100%', flexShrink: 0 };
    }
    if (itemsVisible === 2) {
      return { width: 'calc((100% - 1.25rem) / 2)', flexShrink: 0 };
    }
    return { width: 'calc((100% - 2.5rem) / 3)', flexShrink: 0 };
  };

  const transformStyle = {
    transform: `translateX(calc(-${currentIndex} * (100% + 1.25rem) / ${itemsVisible}))`,
    transition: isTransitioning ? 'transform 800ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
  };

  return (
    <div className="mb-20 relative max-w-4xl mx-auto">
      <div className="mb-6">
        <h3 className="font-display font-bold text-2xl md:text-3xl text-white">
          Department Heads
        </h3>
        <p className="font-mono text-xs text-[#00f0ff] uppercase tracking-wider mt-1">
          {headsData.length} Heads
        </p>
      </div>

      {/* Carousel Container with Side Navigation Buttons */}
      <div className="relative">
        {/* Previous Button (Left Side) */}
        {maxIndex > 0 && currentIndex > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute -left-4 sm:-left-6 md:-left-8 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/15 bg-[#0a0d18]/85 text-white shadow-[0_4px_25px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 hover:border-[#ff6b00] hover:bg-[#ff6b00]/20 hover:text-[#ff6b00] hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Previous department heads"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Next Button (Right Side) */}
        {maxIndex > 0 && currentIndex < maxIndex && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute -right-4 sm:-right-6 md:-right-8 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/15 bg-[#0a0d18]/85 text-white shadow-[0_4px_25px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 hover:border-[#ff6b00] hover:bg-[#ff6b00]/20 hover:text-[#ff6b00] hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Next department heads"
          >
            <ChevronRight size={22} />
          </button>
        )}

        {/* Infinite Carousel Container */}
        <div
          className="w-full overflow-hidden pt-4 pb-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex gap-5 will-change-transform py-3 ${maxIndex === 0 ? 'justify-center' : ''}`}
            style={transformStyle}
          >
            {displayList.map((member, i) => (
              <div key={i} style={getCardStyle()}>
                <TeamMemberCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
