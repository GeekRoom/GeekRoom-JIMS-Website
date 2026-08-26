import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';
import { MapPin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden bg-gradient-to-b from-[#0a0d18] to-[#04060a] pt-20 pb-8 border-t border-white/10">

      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff6b00]/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-[#00f0ff]/10 blur-[100px]" />

      <div className="mx-auto w-full max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 mb-16">

          {/* Brand Column (Left) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link to="/" className="inline-flex items-center gap-3 group mb-6">
              <div className="relative">
                <img src="/Photos/logo.png" alt="Geek Room Logo" className="w-12 h-12 object-contain relative z-10 group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-[#ff6b00]/20 blur-md rounded-full group-hover:bg-[#ff6b00]/40 transition-colors duration-300" />
              </div>
              <div className="font-display text-2xl font-black tracking-tight text-white group-hover:text-white/90 transition-colors">
                GEEK ROOM <span className="text-[#ff6b00]">JIMS</span>
              </div>
            </Link>

            <p className="text-[15px] leading-relaxed text-[#94a3b8] max-w-md mb-8">
              The developer & tech society of Jagan Institute of Management Studies, empowering coders to innovate, collaborate, and lead.
            </p>
          </div>

          {/* Explore Column (Middle) */}
          <div className="md:col-span-3">
            <h4 className="text-white font-display text-lg font-bold mb-6 tracking-wide uppercase text-sm border-b border-white/10 pb-3 inline-block">Explore</h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Events', path: '/events' },
                { name: 'About Us', path: '/about' },
                { name: 'Highlights', path: '/highlights' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#94a3b8] hover:text-[#ff6b00] transition-all duration-300 flex items-center group text-[15px]"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 text-[#ff6b00] opacity-0 group-hover:opacity-100">▹</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column (Right) */}
          <div className="md:col-span-4">
            <h4 className="text-white font-display text-lg font-bold mb-6 tracking-wide uppercase text-sm border-b border-white/10 pb-3 inline-block">Connect</h4>

            <div className="flex flex-col gap-4 mb-8">
              <Link to="/contact" className="text-[#94a3b8] hover:text-[#ff6b00] transition-all duration-300 flex items-center group text-[15px]">
                <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 text-[#ff6b00] opacity-0 group-hover:opacity-100">▹</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Contact Page</span>
              </Link>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=geekroomjims@jimsindia.org" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-[#94a3b8] hover:text-white transition-colors duration-300 group text-[15px]">
                <Mail size={16} className="text-[#ff6b00] group-hover:scale-110 transition-transform" />
                geekroomjims@jimsindia.org
              </a>
              <a href="https://www.google.com/maps/search/?api=1&query=Jagan+Institute+of+Management+Studies,+Rohini+Sector-5,+New+Delhi" target="_blank" rel="noreferrer" className="flex items-start gap-3 text-[#94a3b8] hover:text-white transition-colors duration-300 group text-[15px] max-w-[280px]">
                <MapPin size={18} className="text-[#00f0ff] group-hover:scale-110 transition-transform flex-shrink-0 mt-0.5" />
                <span>Jagan Institute of Management Studies, Rohini Sector-5, New Delhi</span>
              </a>
            </div>

            {/* Social Icons inside a glass pill */}
            <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <a href="https://www.instagram.com/geekroom_jims?igsi=Z3o2c2lycXE1NGQy" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-transparent hover:bg-[#e1306c]/20 hover:border-[#e1306c]/50 border border-transparent flex items-center justify-center text-white/70 hover:text-[#e1306c] transition-all duration-300" aria-label="Instagram">
                <FaInstagram size={16} />
              </a>
              <a href="https://youtube.com/@geekfeed-grj?si=ZAHaBE9uvgMGVkLM" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-transparent hover:bg-[#ff0000]/20 hover:border-[#ff0000]/50 border border-transparent flex items-center justify-center text-white/70 hover:text-[#ff0000] transition-all duration-300" aria-label="YouTube">
                <FaYoutube size={16} />
              </a>
              <a href="https://www.linkedin.com/company/geekroom-jims/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-transparent hover:bg-[#0077b5]/20 hover:border-[#0077b5]/50 border border-transparent flex items-center justify-center text-white/70 hover:text-[#0077b5] transition-all duration-300" aria-label="LinkedIn">
                <FaLinkedinIn size={15} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#64748b] text-sm">
            © {new Date().getFullYear()} Geek Room JIMS. All rights reserved.
          </p>
          <p className="text-[#64748b] text-sm flex items-center gap-1.5">
            Built with <span className="text-[#ff6b00] animate-pulse">❤</span> for the developer community.
          </p>
        </div>
      </div>
    </footer>
  );
}
