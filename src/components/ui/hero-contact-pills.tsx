'use client';

import React, { useState, useEffect } from 'react';

const WHATSAPP_URL =
  'https://wa.me/912942779000?text=Hello%20Idanazhi%2C%20I%20would%20like%20to%20enquire%20about%20a%20wedding%20or%20stay.';
const PHONE_NUMBER = '+912942779000';

export function HeroContactPills() {
  // Start open so it is immediately visible on entrance, then smoothly closes after a delay
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
      aria-label="Concierge Direct Contact"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed z-[60] right-5 bottom-8 sm:right-9 sm:bottom-10 flex flex-col items-end gap-3 pointer-events-auto select-none"
    >
      {/* Call Us Button */}
      <a
        href={`tel:${PHONE_NUMBER}`}
        aria-label="Call Idanazhi Concierge: +91 294 277 9000"
        title="Call Us: +91 294 277 9000"
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
        {/* Phone Icon */}
        <span className="w-12 h-12 flex items-center justify-center shrink-0">
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
        title="Chat with us on WhatsApp"
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
        {/* WhatsApp Icon */}
        <span className="w-12 h-12 flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-[21px] h-[21px] text-white transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          >
            <path
              d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.82 16.07c-.24.68-1.2 1.25-1.68 1.3-.46.05-1.04.08-3.08-.75-2.6-1.07-4.28-3.7-4.41-3.88-.13-.17-1.06-1.41-1.06-2.69 0-1.28.67-1.91.91-2.17.24-.26.53-.33.71-.33.18 0 .36 0 .52.01.17.01.4.06.61.56.24.58.82 2 .89 2.15.07.15.12.33.02.53-.1.2-.15.33-.3.51-.15.18-.32.4-.46.54-.15.15-.31.32-.13.63.18.31.8 1.31 1.71 2.12 1.17 1.04 2.15 1.36 2.46 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.83.86 2.15 1.02.32.16.53.24.61.37.08.13.08.76-.16 1.44z"
              fill="currentColor"
            />
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
