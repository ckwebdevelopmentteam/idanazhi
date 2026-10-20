'use client';

import { X, Minus, Plus } from 'lucide-react';
import { FormEvent, useState } from 'react';

export function BookingPanel({ close }: { close: () => void }) {
  const [destination, setDestination] = useState('');
  const [guests, setGuests] = useState(2);
  const [message, setMessage] = useState('');

  function submit(e: FormEvent) {
    e.preventDefault();
    setMessage(
      destination
        ? 'Availability lookup is a local demonstration; no booking has been made.'
        : 'Please select a destination to continue.'
    );
  }

  return (
    <div
      className="fixed z-50 inset-0 bg-ink/50 flex items-start justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Check rates"
    >
      <div className="w-[min(560px,100%)] h-full bg-paper p-[56px_54px] relative max-[720px]:p-[56px_25px] overflow-y-auto">
        <button
          className="absolute top-4 right-4 border-0 bg-none text-ink cursor-pointer"
          onClick={close}
          aria-label="Close booking"
        >
          <X />
        </button>

        <p className="m-0 mb-[18px] uppercase tracking-[0.18em] text-[10px] font-semibold">YOUR SEARCH</p>
        <h2 className="font-serif text-[44px] leading-none m-0 mb-[45px]">Begin your IDANAZHI stay</h2>

        <form onSubmit={submit}>
          <label className="flex flex-col gap-2 uppercase tracking-[0.14em] text-[10px] mb-[19px]">
            Sanctuary or Suite
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-transparent border-0 border-b border-ink h-[42px] text-ink rounded-none cursor-pointer"
            >
              <option value="">IDANAZHI Farm Stay · Guruvayoor, Kerala</option>
              <option>The Nalukettu Master Suite</option>
              <option>The Nadumuttam Courtyard Chamber</option>
              <option>The Illam Royal Retreat</option>
              <option>The Thinnai Breezeway Suite</option>
              <option>The Machakam Garden Villa</option>
              <option>The Tharavadu Heritage Chamber</option>
            </select>
          </label>

          <div className="grid grid-cols-2 gap-[18px] max-[720px]:grid-cols-1">
            <label className="flex flex-col gap-2 uppercase tracking-[0.14em] text-[10px] mb-[19px]">
              Check-in
              <input type="date" required className="bg-transparent border-0 border-b border-ink h-[42px] text-ink rounded-none" />
            </label>
            <label className="flex flex-col gap-2 uppercase tracking-[0.14em] text-[10px] mb-[19px]">
              Check-out
              <input type="date" required className="bg-transparent border-0 border-b border-ink h-[42px] text-ink rounded-none" />
            </label>
          </div>

          <div className="flex justify-between items-center border-b border-ink py-[13px] pb-4 mb-7">
            <span>
              Rooms & Guests
              <strong className="block font-serif text-[21px] tracking-normal normal-case">{guests} Adults</strong>
            </span>
            <div className="flex gap-4 items-center">
              <button
                type="button"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                aria-label="Remove guest"
                className="w-[30px] h-[30px] border border-ink bg-none"
              >
                <Minus size={16} />
              </button>
              <span>{guests}</span>
              <button
                type="button"
                onClick={() => setGuests(guests + 1)}
                aria-label="Add guest"
                className="w-[30px] h-[30px] border border-ink bg-none"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <button
            className="bg-ink text-white border border-ink w-full px-[18px] py-3 text-[10px] tracking-[0.14em] transition-all duration-[180ms] ease-in-out"
            type="submit"
          >
            CHECK RATES
          </button>
          {message && (
            <p className="text-xs text-muted mt-3.5" role="status">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
