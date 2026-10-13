'use client';

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { BookingPanel } from '@/components/sections/booking-panel';

export function HeroBookingCta() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="w-[min(312px,100%)] min-h-[48px] mt-[18px] mx-auto px-[18px] flex items-center justify-between border-2 border-white/90 bg-[rgba(10,20,18,0.18)] text-white font-sans text-[11px] font-normal tracking-[0.2em] transition-all duration-200 ease-in-out hover:bg-white hover:text-ink max-[640px]:w-[min(280px,100%)] max-[640px]:min-h-[48px] max-[640px]:mt-4"
        onClick={() => setBookingOpen(true)}
      >
        <span>BOOK NOW</span>
        <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
      </button>
      {bookingOpen && <BookingPanel close={() => setBookingOpen(false)} />}
    </>
  );
}
