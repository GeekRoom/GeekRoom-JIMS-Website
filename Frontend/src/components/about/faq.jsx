import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { id: 1, q: 'What is Geek Room?', a: 'Geek Room JIMS is a peer-driven developer community built to break college walls. We focus on hands-on building, learning in public, and networking with industry professionals.' },
  { id: 2, q: 'How can I join?', a: 'Keep an eye on our social media and website for upcoming recruitment drives and open events. We welcome anyone passionate about tech, regardless of current skill level.' },
  { id: 3, q: 'Do I need prior coding experience?', a: 'Not at all. Whether you\'re writing your first line of code or deploying complex systems, there\'s a place for you to learn and grow within the community.' }
];

export default function Faq() {
  const [activeFaq, setActiveFaq] = useState(1);

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-12 border-t border-white/10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4">
          <h2 className="font-display text-3xl sm:text-4xl text-white font-extrabold tracking-tight">
            Frequently Asked <span className="text-gradient-orange">Questions</span>
          </h2>
          <p className="text-sm text-[#94a3b8] mt-3 leading-relaxed">
            Have questions about joining or participating in Geek Room activities? Find quick answers here.
          </p>
        </div>

        <div className="lg:col-span-8 space-y-3.5">
          {faqs.map((faq) => {
            const isActive = activeFaq === faq.id;
            return (
              <div
                key={faq.id}
                className={`faq-accordion-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveFaq(isActive ? null : faq.id)}
              >
                <div className="flex justify-between items-center gap-4">
                  <h3 className="font-display text-lg font-bold text-white">
                    {faq.q}
                  </h3>
                  <ChevronDown
                    size={18}
                    className={`text-[#ff6b00] shrink-0 transition-transform duration-300 ${
                      isActive ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <div className="faq-accordion-content">
                  <div>
                    <p className="text-sm text-[#94a3b8] mt-3 pt-3 border-t border-white/10 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
