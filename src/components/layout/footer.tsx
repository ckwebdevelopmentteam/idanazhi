'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <footer className="bg-ink text-white py-[75px] px-[5.4vw] pb-[25px] max-[720px]:px-6">
      {/* Footer Top */}
      <div className="grid grid-cols-2 gap-[7vw] pb-[58px] border-b border-white/30 max-[720px]:grid-cols-1 max-[720px]:gap-9">
        <div>
          <span className="text-left font-sans font-semibold tracking-[0.1em] text-sm">
            IDANAZHI<span className="block text-[10px] font-normal tracking-[0.14em] mt-1 opacity-70">DESTINATION WEDDINGS</span>
          </span>
          <p className="max-w-[270px] text-[13px] mt-3">Inspiration to your inbox from the world of IDANAZHI.</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); if (valid) setSent(true); }} noValidate>
          <label htmlFor="footer-email" className="text-[10px] uppercase tracking-[0.17em] block mb-[13px]">Email address</label>
          <div className="flex border-b border-white/70">
            <input
              id="footer-email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setSent(false); }}
              placeholder="Your email address"
              aria-invalid={email.length > 0 && !valid}
              className="text-white bg-transparent border-0 outline-none py-[13px] flex-1 placeholder:text-[#c6d0ca]"
            />
            <button type="submit" className="border-0 bg-none text-white text-[10px] tracking-[0.15em]">SIGN UP</button>
          </div>
          {sent ? (
            <p className="text-xs text-muted mt-3.5">Thank you. This demonstration does not send your details.</p>
          ) : email && !valid ? (
            <p className="text-xs text-muted mt-3.5">Please enter a valid email address.</p>
          ) : null}
        </form>
      </div>

      {/* Footer Grid */}
      <div className="grid grid-cols-3 py-[55px] gap-6 max-[720px]:grid-cols-1">
        <div className="flex flex-col items-start gap-2 text-[13px]">
          <p className="m-0 mb-[10px] uppercase tracking-[0.18em] text-[10px] font-semibold">DISCOVER</p>
          <Link href="/hotels-resorts/">Hotels & Resorts</Link>
          <Link href="/singapore/experiences/">Experiences</Link>
          <Link href="/singapore/">IDANAZHI Singapore</Link>
          <Link href="/dubai/">IDANAZHI Dubai</Link>
        </div>
        <div className="flex flex-col items-start gap-2 text-[13px]">
          <p className="m-0 mb-[10px] uppercase tracking-[0.18em] text-[10px] font-semibold">YOUR STAY</p>
          <a href="mailto:hello@idanazhi.com">Contact Us</a>
          <Link href="/hotels-resorts/">Manage reservation</Link>
          <Link href="/hotels-resorts/">Gift cards</Link>
          <Link href="/hotels-resorts/">Loyalty</Link>
        </div>
        <div className="flex flex-col items-start gap-2 text-[13px]">
          <p className="m-0 mb-[10px] uppercase tracking-[0.18em] text-[10px] font-semibold">FOLLOW IDANAZHI</p>
          <a href="https://www.instagram.com/idanazhi/" target="_blank">Instagram</a>
          <a href="https://www.facebook.com/idanazhi/" target="_blank">Facebook</a>
          <a href="https://www.youtube.com/@idanazhi" target="_blank">YouTube</a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/30 pt-[23px] flex justify-between text-[10px] tracking-[0.06em] text-[#d5ddd8] max-[720px]:block max-[720px]:leading-8">
        <span className="max-[720px]:block">© 2026 IDANAZHI</span>
        <span className="max-[720px]:block">Privacy · Terms · Accessibility</span>
      </div>
    </footer>
  );
}
