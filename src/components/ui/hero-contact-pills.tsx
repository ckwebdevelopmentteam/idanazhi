'use client';

import React, { useState, useEffect } from 'react';

const WHATSAPP_URL =
  'https://wa.me/912942779000?text=Hello%20Idanazhi%2C%20I%20would%20like%20to%20enquire%20about%20a%20wedding%20or%20stay.';
const PHONE_NUMBER = '+912942779000';

export function HeroContactPills() {
  // Start open so it is immediately visible on entrance, then smoothly closes sideways after a delay
  const [isOpenInitially, setIsOpenInitially] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Automatically close sideways after delay (3.8 seconds)
    const timer = setTimeout(() => {
      setIsOpenInitially(false);
    }, 3800);

    return () => clearTimeout(timer);
  }, []);

  const isOpen = isOpenInitially || isHovered;

  return (
    <aside
      aria-label="Direct Contact Actions"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed z-[60] right-5 bottom-8 sm:right-9 sm:bottom-10 flex flex-col items-end gap-3 pointer-events-auto select-none"
    >
      {/* Call Us Button */}
      <a
        href={`tel:${PHONE_NUMBER}`}
        aria-label="Call Idanazhi Concierge: +91 294 277 9000"
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className="group relative flex items-center h-12 rounded-full bg-[#F4E3CB] hover:bg-[#F9EDE0] border-2 border-[#DFCBA8] text-[#442D15] shadow-lg hover:shadow-xl overflow-hidden cursor-pointer active:scale-95"
        style={{
          width: isOpen ? '164px' : '48px',
          minWidth: isOpen ? '164px' : '48px',
          transitionProperty: 'width, min-width, background-color, transform, box-shadow',
          transitionDuration: '500ms',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Phone Icon - perfectly centered in the 44px inner circle */}
        <span className="w-[44px] h-[44px] flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-[#442D15] transition-transform duration-300 group-hover:rotate-12"
            aria-hidden="true"
          >
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24 11.72 11.72 0 003.68.59 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.24 1.05l-2.23 2.06z" />
          </svg>
        </span>

        {/* Call Us Label */}
        <span
          className={`font-sans font-medium text-[14.5px] text-[#442D15] tracking-[0.01em] whitespace-nowrap pr-5 transition-all duration-300 ${
            isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3 pointer-events-none'
          }`}
        >
          Call Us
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Idanazhi Concierge on WhatsApp"
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className="group relative flex items-center h-12 rounded-full bg-[#20321A] hover:bg-[#283E21] border-2 border-[#DFCBA8] text-white shadow-lg hover:shadow-xl overflow-hidden cursor-pointer active:scale-95"
        style={{
          width: isOpen ? '164px' : '48px',
          minWidth: isOpen ? '164px' : '48px',
          transitionProperty: 'width, min-width, background-color, transform, box-shadow',
          transitionDuration: '500ms',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* WhatsApp Icon - crisp, official vector perfectly centered in the 44px inner circle */}
        <span className="w-[44px] h-[44px] flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-[21px] h-[21px] text-white transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </span>

        {/* WhatsApp Label */}
        <span
          className={`font-sans font-medium text-[14.5px] text-white tracking-[0.01em] whitespace-nowrap pr-5 transition-all duration-300 ${
            isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3 pointer-events-none'
          }`}
        >
          WhatsApp
        </span>
      </a>
    </aside>
  );
}
