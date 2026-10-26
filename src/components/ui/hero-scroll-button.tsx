'use client';

import { ArrowDown } from 'lucide-react';

export function HeroScrollButton({ className = '' }: { className?: string }) {
  const handleScroll = () => {
    const nextSection = document.querySelector('.home-hero + *');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      onClick={handleScroll}
      className={`absolute z-10 right-6 sm:right-10 md:right-14 lg:right-16 bottom-10 sm:bottom-14 flex items-center gap-2 text-[10px] tracking-[0.2em] [writing-mode:vertical-rl] text-white/90 bg-transparent border-none cursor-pointer transition-opacity duration-200 hover:opacity-100 hover:text-white drop-shadow-md focus-visible:outline-none ${className}`}
      aria-label="Scroll down to explore Idanazhi"
    >
      SCROLL <ArrowDown size={15} />
    </button>
  );
}
