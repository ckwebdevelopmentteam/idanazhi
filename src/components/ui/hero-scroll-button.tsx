'use client';

import { ArrowDown } from 'lucide-react';

interface HeroScrollButtonProps {
  className?: string;
}

export function HeroScrollButton({ className = '' }: HeroScrollButtonProps) {
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
      className={`absolute z-1 left-1/2 -translate-x-1/2 bottom-8 hidden sm:flex flex-col items-center gap-1.5 text-[9.5px] uppercase tracking-[0.22em] text-white/80 hover:text-white bg-transparent border-none cursor-pointer transition-all duration-300 focus-visible:outline-none group ${className}`}
      aria-label="Scroll down to explore Idanazhi"
    >
      <span className="font-sans font-medium">SCROLL</span>
      <ArrowDown
        size={14}
        className="transition-transform duration-300 group-hover:translate-y-1 text-white"
      />
    </button>
  );
}
