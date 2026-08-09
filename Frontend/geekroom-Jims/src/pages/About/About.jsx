import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './About.css';

const teamMembers = [
  {
    name: 'Arshpreet Singh',
    role: 'President',
    roleClass: 'text-blue-cyan',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWqfF1Du4pFKIiDyQ8WERPvkN1w-5DbhjwS0PN5rMTIdqYL9Vi5YWmeL1Bn2q0a845bA3LsNu-UX35zMEZgS9PBSuyUtA5gZdyG7rth1nDILtNkoZxb2QVplGnBx6DjqEQ5E096rdfLif12Tz_MGUozxueS8XHiEAfKHDeE5dO_yiXPQ8sWvvqXSy0tgPF7UYSopE-1vmz2kPom5xl5ZuhKdc5AqhWHjizBxvGGB6ujyJ7jP38wPI',
    colSpan: 'md:col-span-4 md:col-start-3 md:mt-0',
    delay: 'stagger-1'
  },
  {
    name: 'Medha Sukheja',
    role: 'President',
    roleClass: 'text-orange-neon',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKTi2Ob5qJH4ip1aTNX9FOXAXQPzbXac3Gd-oV9PP0vImj2kJuXYLURjMP_VFbAElaH4xeXau-GQCDAomkJf7YRR1GWere5QHYzDH5Jmc8vXNwAEWUWTDK8GTKVqmK15ehyZzvLH6AiWkoj2cGi5smEI7yyCPJ8avXm3YEN5UOBN7Qh5UakopgVXrf9Hxpbup6tS1WHwtgevc3cj1zJ0kGStKhO6gv0ZagIjEppSja-CjnJMGuARM',
    colSpan: 'md:col-span-4 md:col-start-8 md:mt-8',
    delay: 'stagger-2'
  },
  {
    name: 'Parag Chaudhary',
    role: 'Static Design Head',
    roleClass: 'text-text-muted',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFZMNbE9hOAI7-12VMA6InxP8-Oi_HmhJ2_UzuhZb5ynhMZBgUgbTIxjqgvYqRqS49jhGf8O9lmiG4XDVBPWTD7nFtVpEJr0dwerjLb1Om4b7qiJ9n37DiP2dlOrufBrLMDcCvZUtrDF9YApYgdydBGVagesWZxfvuHxl4SmqrBlQbbCJdP_g-HEWEEsKdmCNfzdY6GL2Z1R-DoN00tN9JNp9hD7eCMgDUbI9PObBoaUzimJO1JNY',
    colSpan: 'md:col-span-3 md:col-start-1 md:mt-8',
    delay: 'stagger-3'
  },
  {
    name: 'Rudraksh Mishra',
    role: 'Dynamic Design Head',
    roleClass: 'text-text-muted',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMWYjhie4q7JBO4DqUdyGS-kUJIeDkg-T-GvSMGYINXaVpBBfRSMK1v1OPEX7ftBfaiuSx5PmHt0a64qUGghWhEUMtZMqB90i7ciwbL45HHJSuYaPhxk_bcjAg0bU3gXofrU7UQKVX_xu9p6UwPM4dsr8oAJEbB9xU6TSaWZKNPh5b3nDcp3oP4ROwDgP3EP3dpOkdenigxmFyArtokgnpT6qAzCGigGjrhZ4CViw3A02P16WbS0Q',
    colSpan: 'md:col-span-3 md:col-start-5 md:mt-2',
    delay: 'stagger-4'
  },
  {
    name: 'Dev Arora',
    role: 'Web Development Head',
    roleClass: 'text-text-muted',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWqfF1Du4pFKIiDyQ8WERPvkN1w-5DbhjwS0PN5rMTIdqYL9Vi5YWmeL1Bn2q0a845bA3LsNu-UX35zMEZgS9PBSuyUtA5gZdyG7rth1nDILtNkoZxb2QVplGnBx6DjqEQ5E096rdfLif12Tz_MGUozxueS8XHiEAfKHDeE5dO_yiXPQ8sWvvqXSy0tgPF7UYSopE-1vmz2kPom5xl5ZuhKdc5AqhWHjizBxvGGB6ujyJ7jP38wPI',
    colSpan: 'md:col-span-3 md:col-start-9 md:mt-8',
    delay: 'stagger-5'
  },
  {
    name: 'Anshita Rana',
    role: 'Outreach Head',
    roleClass: 'text-text-muted',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKTi2Ob5qJH4ip1aTNX9FOXAXQPzbXac3Gd-oV9PP0vImj2kJuXYLURjMP_VFbAElaH4xeXau-GQCDAomkJf7YRR1GWere5QHYzDH5Jmc8vXNwAEWUWTDK8GTKVqmK15ehyZzvLH6AiWkoj2cGi5smEI7yyCPJ8avXm3YEN5UOBN7Qh5UakopgVXrf9Hxpbup6tS1WHwtgevc3cj1zJ0kGStKhO6gv0ZagIjEppSja-CjnJMGuARM',
    colSpan: 'md:col-span-3 md:col-start-2 md:mt-2',
    delay: 'stagger-6'
  },
  {
    name: 'Aryan',
    role: 'Outreach Head',
    roleClass: 'text-text-muted',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFZMNbE9hOAI7-12VMA6InxP8-Oi_HmhJ2_UzuhZb5ynhMZBgUgbTIxjqgvYqRqS49jhGf8O9lmiG4XDVBPWTD7nFtVpEJr0dwerjLb1Om4b7qiJ9n37DiP2dlOrufBrLMDcCvZUtrDF9YApYgdydBGVagesWZxfvuHxl4SmqrBlQbbCJdP_g-HEWEEsKdmCNfzdY6GL2Z1R-DoN00tN9JNp9hD7eCMgDUbI9PObBoaUzimJO1JNY',
    colSpan: 'md:col-span-4 md:col-start-6 md:mt-0',
    delay: 'stagger-7'
  },
  {
    name: 'Hardik Dhawan',
    role: 'DSA Head',
    roleClass: 'text-text-muted',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMWYjhie4q7JBO4DqUdyGS-kUJIeDkg-T-GvSMGYINXaVpBBfRSMK1v1OPEX7ftBfaiuSx5PmHt0a64qUGghWhEUMtZMqB90i7ciwbL45HHJSuYaPhxk_bcjAg0bU3gXofrU7UQKVX_xu9p6UwPM4dsr8oAJEbB9xU6TSaWZKNPh5b3nDcp3oP4ROwDgP3EP3dpOkdenigxmFyArtokgnpT6qAzCGigGjrhZ4CViw3A02P16WbS0Q',
    colSpan: 'md:col-span-3 md:col-start-10 md:mt-4',
    delay: 'stagger-8'
  },
  {
    name: 'Mohammed Salman',
    role: 'AI/ML Head',
    roleClass: 'text-text-muted',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWqfF1Du4pFKIiDyQ8WERPvkN1w-5DbhjwS0PN5rMTIdqYL9Vi5YWmeL1Bn2q0a845bA3LsNu-UX35zMEZgS9PBSuyUtA5gZdyG7rth1nDILtNkoZxb2QVplGnBx6DjqEQ5E096rdfLif12Tz_MGUozxueS8XHiEAfKHDeE5dO_yiXPQ8sWvvqXSy0tgPF7UYSopE-1vmz2kPom5xl5ZuhKdc5AqhWHjizBxvGGB6ujyJ7jP38wPI',
    colSpan: 'md:col-span-3 md:col-start-1 md:mt-4',
    delay: 'stagger-9'
  },
  {
    name: 'Vanshita Jain',
    role: 'Cyber Security Head',
    roleClass: 'text-text-muted',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKTi2Ob5qJH4ip1aTNX9FOXAXQPzbXac3Gd-oV9PP0vImj2kJuXYLURjMP_VFbAElaH4xeXau-GQCDAomkJf7YRR1GWere5QHYzDH5Jmc8vXNwAEWUWTDK8GTKVqmK15ehyZzvLH6AiWkoj2cGi5smEI7yyCPJ8avXm3YEN5UOBN7Qh5UakopgVXrf9Hxpbup6tS1WHwtgevc3cj1zJ0kGStKhO6gv0ZagIjEppSja-CjnJMGuARM',
    colSpan: 'md:col-span-4 md:col-start-5 md:mt-0',
    delay: 'stagger-10'
  },
  {
    name: 'Naman Dhir',
    role: 'Head of Operations',
    roleClass: 'text-text-muted',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFZMNbE9hOAI7-12VMA6InxP8-Oi_HmhJ2_UzuhZb5ynhMZBgUgbTIxjqgvYqRqS49jhGf8O9lmiG4XDVBPWTD7nFtVpEJr0dwerjLb1Om4b7qiJ9n37DiP2dlOrufBrLMDcCvZUtrDF9YApYgdydBGVagesWZxfvuHxl4SmqrBlQbbCJdP_g-HEWEEsKdmCNfzdY6GL2Z1R-DoN00tN9JNp9hD7eCMgDUbI9PObBoaUzimJO1JNY',
    colSpan: 'md:col-span-3 md:col-start-9 md:mt-4',
    delay: 'stagger-11'
  }
];

const presidents = teamMembers.filter(m => m.role === 'President');
const heads = teamMembers.filter(m => m.role !== 'President');

const contributors = [
  { name: 'JD Doe', role: 'Design' },
  { name: 'Sam Smith', role: 'Backend' },
  { name: 'Emily R.', role: 'Events' },
  { name: 'Alex B.', role: 'Frontend' },
  { name: 'Jordan K.', role: 'Content' },
  { name: 'Taylor M.', role: 'Social' }
];

const purposes = [
  { id: 1, title: 'Learn Together', desc: 'Collaborative learning sessions where beginners and experienced builders grow together.' },
  { id: 2, title: 'Building Projects', desc: 'Turn ideas into working products through hands-on building and experimentation.' },
  { id: 3, title: 'Networking', desc: 'Meet developers, builders, founders, and professionals who expand your technical network.' },
  { id: 4, title: 'Peer-to-Peer Mentorship', desc: 'Learn directly from people a few steps ahead through practical guidance and shared experience.' },
  { id: 5, title: 'Open Source', desc: 'Contribute to real projects, learn in public, and build a track record beyond the classroom.' },
  { id: 6, title: 'Industry Exposure', desc: 'Connect with professionals and understand how technology is built and shipped in the real world.' }
];

const faqs = [
  { id: 1, q: 'What is Geek Room?', a: 'Geek Room is a peer-driven developer community built to break college walls. We focus on hands-on building, learning in public, and networking with industry professionals.' },
  { id: 2, q: 'How can I join?', a: 'Keep an eye on our social media and website for upcoming recruitment drives and open events. We welcome anyone passionate about tech, regardless of current skill level.' },
  { id: 3, q: 'Do I need prior coding experience?', a: 'Not at all. Whether you\'re writing your first line of code or deploying complex systems, there\'s a place for you to learn and grow within the community.' }
];

const TeamMemberCard = ({ member }) => (
  <div className="president-card glass-card playing-card w-full h-full">
    <div className="playing-card-img-wrap aspect-[4/5] md:aspect-square">
      <img data-alt={member.name} alt={member.name} src={member.img} />
    </div>
    <div className="playing-card-info p-8 flex justify-between items-end">
      <div>
        <h3 className="playing-card-name font-headline-lg font-bold text-text-main text-[36px] md:text-[56px] leading-tight mb-2">{member.name}</h3>
        <p className={`font-label-md font-bold tracking-widest uppercase text-base md:text-xl ${member.roleClass}`}>{member.role}</p>
      </div>
      <a className="social-btn social-btn-lg text-text-dim hover:text-white" href={member.linkedin || "#"} aria-label={`Social link for ${member.name}`}>
        <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
      </a>
    </div>
  </div>
);

export const About = () => {
  const canvasRef = useRef(null);
  const [activePurpose, setActivePurpose] = useState(null);
  const [activeFaq, setActiveFaq] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Background Canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let mouse = { x: width / 2, y: height / 2, radius: 200 };
    let animationId;
    let time = 0;

    const getCardsPerView = () => {
      if (width >= 1024) return 3;
      if (width >= 768) return 2;
      return 1;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      window.dispatchEvent(new CustomEvent('updateCardsPerView'));
    };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      const cols = Math.ceil(width / 32);
      const rows = Math.ceil(height / 32);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * 32 + 16;
          const y = j * 32 + 16;
          const dist = Math.hypot(mouse.x - x, mouse.y - y);

          let radius = 2 + Math.sin(time + (i * 0.2) + (j * 0.2)) * 1.5;

          if (dist < mouse.radius) {
            radius += (1 - dist / mouse.radius) * 5.5;
          }

          ctx.beginPath();
          ctx.arc(x, y, Math.min(radius, 8), 0, Math.PI * 2);
          ctx.fillStyle = (i + j) % 3 === 0 
            ? `rgba(255, 107, 0, ${0.15 + radius / 18})` 
            : `rgba(0, 240, 255, ${0.14 + radius / 18})`;
          ctx.fill();
        }
      }
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    
    const updateCPV = () => {
      const w = window.innerWidth;
      setCardsPerView(w >= 1024 ? 3 : w >= 768 ? 2 : 1);
    };
    updateCPV();
    window.addEventListener('resize', updateCPV);
    window.addEventListener('updateCardsPerView', updateCPV);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateCPV);
      window.removeEventListener('updateCardsPerView', updateCPV);
    };
  }, []);

  const handlePrev = () => setActiveIndex(prev => Math.max(0, prev - 1));
  const handleNext = () => setActiveIndex(prev => Math.min(heads.length - cardsPerView, prev + 1));

  return (
    <div className="about-page dark text-text-main relative">
      <canvas ref={canvasRef} id="halftone-canvas"></canvas>
      <div className="bg-halftone-grid"></div>
      <div className="ambient-lights"></div>

      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 w-full bg-bg-dark/60 backdrop-blur-[20px] border-b border-white/5 flex justify-between items-center px-grid-margin py-4 z-50">
        <div className="font-headline-md text-headline-md font-bold text-orange-neon tracking-tighter">
          GEEK ROOM JIMS
        </div>
        <div className="hidden md:flex gap-stack-md font-body-md text-body-md">
          <Link to="/" className="text-text-dim hover:text-orange-neon transition-colors duration-200">
            Home
          </Link>
          <NavLink to="/about" className={({ isActive }) => 
            isActive ? "text-orange-neon border-b-2 border-orange-neon pb-1 hover:text-orange-neon transition-colors duration-200" 
                     : "text-text-dim border-b-2 border-transparent pb-1 hover:text-orange-neon transition-colors duration-200"
          }>
            About
          </NavLink>
          <Link to="/events" className="text-text-dim hover:text-orange-neon transition-colors duration-200">
            Events
          </Link>
        </div>
        <Link to="/contact" className="border border-white/20 text-white px-6 py-2 rounded-DEFAULT font-label-md hover:border-orange-neon hover:text-orange-neon transition-all duration-200 active:scale-95">
          Contact Us
        </Link>
      </nav>

      <main className="flex-grow z-10 relative mt-24">
        {/* 01 HERO */}
        <section className="min-h-[80vh] flex flex-col justify-center px-grid-margin max-w-screen-2xl mx-auto py-stack-xl relative bg-transparent">
          <div className="w-full max-w-5xl">
            <span className="section-badge mb-6 fade-in-up stagger-1">WHAT IS GEEK ROOM</span>
            <h1 className="font-headline-xl text-[48px] md:text-[64px] leading-[1.1] font-extrabold text-text-main mb-8 fade-in-up stagger-2 tracking-tight">Driven by Logic,<br/>Inspired by Creativity.</h1>
            <p className="font-body-lg text-[20px] md:text-[24px] text-text-muted leading-relaxed max-w-3xl fade-in-up stagger-3 font-medium">
              Geek Room is a peer-driven developer community built to break college walls. From absolute beginners writing their first line of code to working professionals building production software, we come together to learn, build, and level up as one network.
            </p>
          </div>
        </section>

        {/* 03 PURPOSE / INTENT */}
        <section className="px-grid-margin max-w-screen-2xl mx-auto py-stack-xl pt-24 border-t border-white/5 fade-in-up stagger-4 bg-transparent relative">
          <div className="mb-16">
            <h2 className="font-headline-xl text-[48px] text-text-main font-bold">Purpose &amp; Intent</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="purpose-grid">
            {purposes.map((p) => (
              <div 
                key={p.id}
                className={`purpose-card rounded-lg p-8 cursor-pointer ${activePurpose === p.id ? 'active' : ''}`}
                onClick={() => setActivePurpose(p.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-headline-md text-[32px] text-text-main font-bold">{p.title}</h3>
                  <span className="font-label-md text-label-md text-text-dim">0{p.id}</span>
                </div>
                <div className="purpose-content">
                  <div>
                    <p className="font-body-md text-body-md text-text-muted mt-4 font-medium">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 04 TEAM */}
        <section className="px-grid-margin pt-24 pb-16 bg-transparent relative z-10" id="team-section">
          <div className="max-w-screen-xl mx-auto relative z-10 border-t border-white/5 pt-16">
            <h2 className="font-headline-xl text-[42px] md:text-[68px] font-extrabold text-text-main mb-16 text-left fade-in-up tracking-tight">Team Behind The Room</h2>
            
            {/* PARTITION 1 — PRESIDENT */}
            <div className="mb-24 fade-in-up stagger-1">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {presidents.map((member, i) => (
                  <TeamMemberCard key={i} member={member} />
                ))}
              </div>
            </div>

            {/* PARTITION 2 — DEPARTMENT HEADS */}
            <div className="mb-24 fade-in-up stagger-2 relative">
              <div className="flex justify-between items-end mb-8">
                  <h3 className="font-headline-lg font-bold text-[32px] md:text-[42px] text-text-muted">Department Heads</h3>
                  <div className="flex gap-4">
                    <button 
                      onClick={handlePrev} 
                      disabled={activeIndex === 0}
                      className={`social-btn social-btn-md text-text-main group ${activeIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-white'}`} 
                      aria-label="Previous card"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button 
                      onClick={handleNext} 
                      disabled={activeIndex >= heads.length - cardsPerView}
                      className={`social-btn social-btn-md text-text-main group ${activeIndex >= heads.length - cardsPerView ? 'opacity-30 cursor-not-allowed' : 'hover:text-white'}`} 
                      aria-label="Next card"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  </div>
              </div>
              
              <div className="slider-wrapper overflow-hidden relative w-full pt-2 pb-6">
                <div 
                  className="flex transition-transform duration-500 ease-in-out" 
                  style={{ transform: `translateX(-${activeIndex * (100 / cardsPerView)}%)` }}
                >
                  {heads.map((member, i) => (
                    <div key={i} className="px-3" style={{ flex: `0 0 ${100 / cardsPerView}%` }}>
                      <TeamMemberCard member={member} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PARTITION 3 — CORE CONTRIBUTORS */}
            <div className="fade-in-up stagger-3 max-w-5xl mx-auto">
              <div className="text-center mb-10">
                  <h3 className="font-headline-lg font-bold text-[32px] md:text-[42px] text-text-muted">Core Contributors</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contributors.map((contrib, i) => (
                  <a key={i} className="contributor-capsule glass-card hover:border-blue-cyan transition-colors" href="#">
                    <div className="text-blue-cyan flex-shrink-0">
                      <svg fill="currentColor" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
                    </div>
                    <div>
                      <p className="font-body-sm font-bold text-text-main contributor-name leading-tight">{contrib.name}</p>
                      <p className="font-label-sm font-medium text-[10px] text-text-muted uppercase mt-0.5">{contrib.role}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 06 FAQ */}
        <section className="w-full min-h-[60vh] flex flex-col justify-center px-grid-margin max-w-screen-2xl mx-auto py-stack-xl mt-16 border-t border-white/5 fade-in-up stagger-2 bg-transparent relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="font-headline-xl text-[48px] text-text-main sticky top-32 font-bold">Frequently Asked Questions</h2>
            </div>
            <div className="lg:col-span-2 space-y-4" id="faq-container">
              {faqs.map(faq => (
                <div 
                  key={faq.id} 
                  className={`faq-item rounded-lg p-6 cursor-pointer ${activeFaq === faq.id ? 'active' : ''}`}
                  onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-headline-md text-text-main text-[22px] font-semibold">{faq.q}</h3>
                    <div className="icon-plus-minus text-text-dim"></div>
                  </div>
                  <div className="faq-content">
                    <div>
                      <p className="font-body-md text-text-dim mt-4 font-medium">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-stack-lg border-t border-white/5 z-10 relative mt-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-grid-margin flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-headline-md text-text-main font-bold tracking-tighter">
            GEEK ROOM JIMS
          </div>
          <div className="flex flex-wrap justify-center gap-8 font-label-md text-label-md">
            <Link className="text-text-dim hover:text-white transition-colors duration-200" to="/about">About</Link>
            <Link className="text-text-dim hover:text-white transition-colors duration-200" to="/events">Initiatives</Link>
            <Link className="text-text-dim hover:text-white transition-colors duration-200" to="/team">Team</Link>
            <Link className="text-text-dim hover:text-white transition-colors duration-200" to="/contact">Contact</Link>
          </div>
          <div className="text-text-dim font-body-sm text-body-sm font-medium">
            © {new Date().getFullYear()} Geek Room JIMS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
