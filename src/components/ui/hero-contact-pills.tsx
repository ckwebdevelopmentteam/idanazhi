'use client';

import React from 'react';

const WHATSAPP_URL =
  'https://wa.me/912942779000?text=Hello%20Idanazhi%2C%20I%20would%20like%20to%20enquire%20about%20a%20wedding%20or%20stay.';
const PHONE_NUMBER = '+912942779000';

export function HeroContactPills() {
  return (
    <div
      aria-label="Direct Contact Actions"
      className="absolute z-10 right-[4vw] bottom-[42px] flex flex-col gap-2.5 sm:gap-3 max-[720px]:right-[20px] max-[720px]:bottom-[24px] select-none pointer-events-auto"
    >
      {/* Call Us Pill Button */}
      <a
        href={`tel:${PHONE_NUMBER}`}
        aria-label="Call Idanazhi Concierge: +91 294 277 9000"
        title="Call Us: +91 294 277 9000"
        className="group w-[148px] sm:w-[166px] h-[44px] sm:h-[48px] pl-[18px] sm:pl-[22px] rounded-full bg-[#F4E3CB] hover:bg-[#F9EDE0] border-[1.5px] border-[#DFCBA8] text-[#442D15] shadow-[0_8px_24px_rgba(0,0,0,0.22)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.32)] transition-all duration-300 ease-out hover:scale-[1.03] active:scale-[0.98] cursor-pointer flex items-center gap-3 sm:gap-3.5"
      >
        <span className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full text-[#442D15] transition-transform duration-300 ease-out group-hover:rotate-12"
            aria-hidden="true"
          >
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24 11.72 11.72 0 003.68.59 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.24 1.05l-2.23 2.06z" />
          </svg>
        </span>
        <span className="text-[14px] sm:text-[15px] font-sans font-medium text-[#442D15] tracking-[0.01em] leading-none">
          Call Us
        </span>
      </a>

      {/* WhatsApp Pill Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Idanazhi Concierge on WhatsApp"
        title="Chat with us on WhatsApp"
        className="group w-[148px] sm:w-[166px] h-[44px] sm:h-[48px] pl-[18px] sm:pl-[22px] rounded-full bg-[#20321A] hover:bg-[#283E21] border-[1.5px] border-[#DFCBA8] text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.38)] transition-all duration-300 ease-out hover:scale-[1.03] active:scale-[0.98] cursor-pointer flex items-center gap-3 sm:gap-3.5"
      >
        <span className="w-[19px] h-[19px] sm:w-[21px] sm:h-[21px] flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full text-white transition-transform duration-300 ease-out group-hover:scale-110"
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
        <span className="text-[14px] sm:text-[15px] font-sans font-medium text-white tracking-[0.01em] leading-none">
          WhatsApp
        </span>
      </a>
    </div>
  );
}
