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
        className="hero-booking-cta"
        onClick={() => setBookingOpen(true)}
      >
        <span>BOOK NOW</span>
        <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
      </button>
      {bookingOpen && <BookingPanel close={() => setBookingOpen(false)} />}
    </>
  );
}
