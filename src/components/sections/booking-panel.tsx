'use client';

import { X, Minus, Plus } from 'lucide-react';
import { FormEvent, useState } from 'react';

export function BookingPanel({ close }: { close: () => void }) { const [destination, setDestination] = useState(''); const [guests, setGuests] = useState(2); const [message, setMessage] = useState('');
  function submit(e: FormEvent) { e.preventDefault(); setMessage(destination ? 'Availability lookup is a local demonstration; no booking has been made.' : 'Please select a destination to continue.'); }
  return <div className="booking-overlay" role="dialog" aria-modal="true" aria-label="Check rates"><div className="booking-panel"><button className="close" onClick={close} aria-label="Close booking"><X/></button><p className="eyebrow">YOUR SEARCH</p><h2>Begin your IDANAZHI stay</h2><form onSubmit={submit}><label>Destination<select value={destination} onChange={(e) => setDestination(e.target.value)}><option value="">Select destination</option><option>IDANAZHI Singapore</option><option>IDANAZHI Dubai</option><option>IDANAZHI Bali</option><option>IDANAZHI Boston</option></select></label><div className="booking-dates"><label>Check-in<input type="date" required /></label><label>Check-out<input type="date" required /></label></div><div className="guests"><span>Rooms & Guests<strong>{guests} Adults</strong></span><div><button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} aria-label="Remove guest"><Minus size={16}/></button><span>{guests}</span><button type="button" onClick={() => setGuests(guests + 1)} aria-label="Add guest"><Plus size={16}/></button></div></div><button className="button dark-btn" type="submit">CHECK RATES</button>{message && <p className="booking-note" role="status">{message}</p>}</form></div></div>;
}
