'use client';

import Link from 'next/link';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BookingPanel } from '@/components/sections/booking-panel';

const links = [{ name: 'Hotels & Resorts', href: '/hotels-resorts/' }, { name: 'Experiences', href: '/singapore/experiences/' }, { name: 'Offers', href: '/hotels-resorts/' }, { name: 'Raffles 1887', href: '/singapore/' }];
const destinations = ['Singapore', 'Dubai', 'Bali', 'Paris', 'London', 'Udaipur', 'Boston', 'Doha'];

export function Header() {
  const [menu, setMenu] = useState(false); const [booking, setBooking] = useState(false); const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const listener = () => setScrolled(window.scrollY > 30); window.addEventListener('scroll', listener); return () => window.removeEventListener('scroll', listener); }, []);
  useEffect(() => { document.body.style.overflow = menu || booking ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [menu, booking]);
  return <>
    <header className={`site-header ${scrolled ? 'header-solid' : ''}`}>
      <button aria-label="Open menu" className="menu-button" onClick={() => setMenu(true)}><Menu size={20}/><span>MENU</span></button>
      <Link href="/" className="wordmark" aria-label="Raffles home">RAFFLES<span>HOTELS & RESORTS</span></Link>
      <nav aria-label="Primary"><Link href="/hotels-resorts/">Hotels & Resorts</Link><Link href="/singapore/experiences/">Experiences</Link><Link href="/singapore/">Raffles 1887</Link></nav>
      <div className="header-actions"><button className="utility">EN</button><button className="utility">CONTACT</button><button className="rates-button" onClick={() => setBooking(true)}>CHECK RATES</button></div>
    </header>
    {menu && <div className="menu-overlay" role="dialog" aria-modal="true" aria-label="Main navigation"><div className="menu-head"><button aria-label="Close menu" onClick={() => setMenu(false)}><X/></button><span className="wordmark dark">RAFFLES<span>HOTELS & RESORTS</span></span></div><div className="menu-content"><p className="eyebrow">DESTINATIONS</p><div className="destination-list">{destinations.map((place) => <Link key={place} href={place === 'Singapore' ? '/singapore/' : place === 'Dubai' ? '/dubai/' : '/hotels-resorts/'} onClick={() => setMenu(false)}>{place}<ChevronRight size={18}/></Link>)}</div><div className="menu-links">{links.map((link) => <Link key={link.name} href={link.href} onClick={() => setMenu(false)}>{link.name}</Link>)}<a href="mailto:contact@raffles.com">Contact</a></div></div></div>}
    {booking && <BookingPanel close={() => setBooking(false)} />}
  </>;
}
