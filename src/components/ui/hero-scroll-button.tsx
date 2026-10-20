'use client';

import { ArrowDown } from 'lucide-react';

export function HeroScrollButton() {
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
      className="absolute z-1 left-[4vw] bottom-[42px] flex items-center gap-2 text-[10px] tracking-[0.16em] [writing-mode:vertical-rl] max-[720px]:left-[20px] max-[720px]:bottom-[24px] text-white bg-transparent border-none cursor-pointer transition-opacity duration-200 hover:opacity-75 focus-visible:outline-none"
      aria-label="Scroll down to explore Idanazhi"
    >
      SCROLL <ArrowDown size={15} />
    </button>
  );
}
