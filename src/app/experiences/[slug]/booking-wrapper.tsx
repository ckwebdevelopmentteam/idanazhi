'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { BookingPanel } from '@/components/sections/booking-panel';

interface Props {
  experienceTitle?: string;
}

export function BookingPanelClientWrapper({ experienceTitle }: Props) {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setBookingOpen(true)}
        className="w-full py-3.5 bg-[#4E2418] hover:bg-[#84382B] text-white font-sans text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.99]"
      >
        <span>RESERVE THIS EXPERIENCE</span>
        <ArrowRight size={14} />
      </button>

      {bookingOpen && (
        <BookingPanel
          defaultOccasion={
            experienceTitle?.toLowerCase().includes('stay')
              ? 'heritage-stay'
              : 'cultural-tour'
          }
          close={() => setBookingOpen(false)}
        />
      )}
    </>
  );
}
