'use client';

import { ArrowRight } from 'lucide-react';
import { useLenis } from 'lenis/react';

interface HeroBookingCtaProps {
  className?: string;
}

export function HeroBookingCta({ className = '' }: HeroBookingCtaProps) {
  const lenis = useLenis();

  const handleBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('contact');
    if (lenis && target) {
      lenis.scrollTo(target, { duration: 1.5, offset: -20 });
      window.history.pushState(null, '', '#contact');
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#contact');
    } else {
      window.location.href = '/#contact';
    }
  };

  return (
    <a
      href="#contact"
      onClick={handleBookClick}
      className={`group w-[min(300px,100%)] min-h-[48px] px-[20px] flex items-center justify-between border-2 border-white/90 bg-[rgba(45,25,18,0.28)] backdrop-blur-[6px] text-white font-sans text-[11px] font-semibold tracking-[0.2em] transition-all duration-300 ease-out hover:bg-white hover:text-ink hover:border-white cursor-pointer select-none no-underline shadow-[0_8px_24px_rgba(0,0,0,0.3)] max-[640px]:w-[min(260px,100%)] max-[640px]:min-h-[44px] ${className}`}
      aria-label="Book Now - Navigate to contact and reservations"
    >
      <span>BOOK NOW</span>
      <ArrowRight
        size={17}
        strokeWidth={1.8}
        className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
        aria-hidden="true"
      />
    </a>
  );
}
