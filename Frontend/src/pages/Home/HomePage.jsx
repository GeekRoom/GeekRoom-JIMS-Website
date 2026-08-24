import React, { useState } from 'react';
import '../../styles/home.css';
import Hero from '../../components/home/Hero';
import WhyJoin from '../../components/home/WhyJoin';
import Partners from '../../components/home/Partners';
import ContactModal from '../../components/home/ContactModal';

export default function HomePage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="home-page-wrapper relative text-[#f8fafc] bg-transparent">
      <main className="relative z-10">
        <Hero />
        <WhyJoin />
        <Partners />
      </main>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
