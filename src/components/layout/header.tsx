'use client';

import Link from 'next/link';
import { X, ChevronRight, Phone, Mail, MapPin, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BrandLogo } from '@/components/layout/brand-logo';
import { BookingPanel } from '@/components/sections/booking-panel';

const navLinks = [
  { label: 'STORY', href: '/singapore/#story' },
  { label: 'GALLERY', href: '/singapore/#story' },
  { label: 'EXPERIENCES', href: '/singapore/#experiences' },
  { label: 'OFFERS', href: '/hotels-resorts/' },
  { label: 'ROOMS', href: '/singapore/#stay' },
  { label: 'CELEBRATIONS', href: '/singapore/experiences/' },
];

const menuDestinations = [
  'Singapore',
  'Dubai',
  'Bali',
  'Paris',
  'London',
  'Boston',
  'Doha',
  'Bahrain',
  'Sentosa',
];

const menuLinks = [
  { name: 'Hotels & Resorts', href: '/hotels-resorts/' },
  { name: 'Experiences', href: '/singapore/experiences/' },
  { name: 'Offers & Packages', href: '/hotels-resorts/' },
  { name: 'IDANAZHI Heritage', href: '/singapore/' },
];

const languages = [
  { code: 'EN', name: 'English (US)' },
  { code: 'FR', name: 'Français' },
  { code: 'DE', name: 'Deutsch' },
  { code: 'ES', name: 'Español' },
  { code: 'AR', name: 'العربية' },
  { code: 'ZH', name: '简体中文' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [booking, setBooking] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector('.home-hero');
      setScrolled(hero ? hero.getBoundingClientRect().bottom <= 0 : window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const isAnyModalOpen = menu || booking || contactOpen || langOpen;
    document.body.style.overflow = isAnyModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menu, booking, contactOpen, langOpen]);

  return (
    <>
      <header
        className={`fixed z-40 top-0 left-0 w-full text-white bg-transparent flex! flex-col! h-auto! p-0! border-b-0! transition-all duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
          scrolled
            ? '!text-ink !bg-paper/98 !backdrop-blur-[14px] !shadow-[0_4px_20px_rgba(12,31,30,0.06)] !border-transparent'
            : ''
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 box-border flex flex-col max-[1080px]:max-w-[1160px] max-[1080px]:px-5 max-[960px]:max-w-full max-[960px]:px-5 max-[640px]:px-4">
          {/* Top Row */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center py-3 pb-2 w-full box-border max-[960px]:py-[10px] max-[960px]:pb-[7px] max-[640px]:py-[9px] max-[640px]:pb-[6px]">
            <div className="flex items-center justify-start">
              <button
                type="button"
                aria-label="Open navigation menu"
                className="inline-flex flex-col justify-center gap-[6.5px] bg-transparent border-none p-[8px_2px] cursor-pointer text-inherit transition-opacity duration-200 ease-in-out hover:opacity-75 group"
                onClick={() => setMenu(true)}
              >
                <span className="block w-6 h-[1.5px] bg-current transition-transform duration-[250ms] ease-in-out group-hover:-translate-y-[1px]" />
                <span className="block w-6 h-[1.5px] bg-current transition-transform duration-[250ms] ease-in-out group-hover:translate-y-[1px]" />
              </button>
            </div>

            <div className="flex items-center justify-center">
              <Link href="/" className="flex flex-col items-center justify-center no-underline text-inherit cursor-pointer py-[1px] group" aria-label="IDANAZHI Home">
                <BrandLogo className="h-12 w-auto max-w-[182px] block fill-current text-inherit transition-all duration-[250ms] ease-in-out group-hover:scale-[1.02] max-[960px]:h-[35px] max-[640px]:h-8" />
              </Link>
            </div>

            <div className="flex items-center justify-end">
              <div className="flex items-center justify-end gap-6 font-sans text-inherit max-[1080px]:gap-[18px] max-[640px]:gap-3.5">
                <button
                  type="button"
                  className="bg-transparent border-none text-inherit font-sans text-xs font-normal tracking-[0.04em] cursor-pointer py-[5px] transition-opacity duration-200 ease-in-out inline-flex items-center hover:opacity-[0.72]"
                  aria-label="Select language"
                  onClick={() => setLangOpen(true)}
                >
                  {currentLang}
                </button>
                <button
                  type="button"
                  className="bg-transparent border-none text-inherit font-sans text-xs font-normal tracking-[0.04em] cursor-pointer py-[5px] transition-opacity duration-200 ease-in-out inline-flex items-center hover:opacity-[0.72] max-[640px]:hidden"
                  onClick={() => setContactOpen(true)}
                >
                  Contact
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className={`w-full m-0 h-px transition-colors duration-300 ease-in-out ${scrolled ? 'bg-ink/16' : 'bg-white/28'}`} />

          {/* Bottom Row - Nav */}
          <nav
            className="flex items-center justify-between gap-4 py-[10px] pb-[13px] w-full box-border max-[1080px]:gap-3 max-[960px]:justify-start max-[960px]:overflow-x-auto max-[960px]:py-2 max-[960px]:pb-[10px] max-[960px]:gap-[18px] max-[960px]:scrollbar-none max-[640px]:py-[6px] max-[640px]:pb-2 max-[640px]:gap-4"
            aria-label="Primary navigation"
          >
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`font-sans text-[10.5px] font-normal tracking-[0.14em] uppercase text-inherit no-underline whitespace-nowrap py-1 transition-opacity duration-200 ease-in-out hover:opacity-[0.65] max-[1080px]:text-[10px] max-[1080px]:tracking-[0.11em] ${scrolled ? 'hover:!opacity-100 hover:!text-[#a36f3e]' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Full-Screen Menu Overlay */}
      {menu && (
        <div className="fixed z-50 inset-0 bg-paper text-ink overflow-auto" role="dialog" aria-modal="true" aria-label="Main navigation">
          <div className="h-[88px] flex items-center justify-between border-b border-line px-[5vw]">
            <button
              type="button"
              aria-label="Close menu"
              className="bg-transparent border-none text-ink cursor-pointer p-2 inline-flex items-center justify-center transition-opacity duration-200 ease-in-out hover:opacity-70"
              onClick={() => setMenu(false)}
            >
              <X size={22} />
            </button>
            <Link href="/" className="flex flex-col items-center justify-center no-underline text-ink cursor-pointer py-[1px]" onClick={() => setMenu(false)}>
              <BrandLogo className="h-12 w-auto max-w-[182px] block fill-current text-inherit" />
            </Link>
            <button
              type="button"
              className="border border-current bg-white text-ink px-[18px] py-3 text-[10px] tracking-[0.14em] transition-all duration-[180ms] ease-in-out hover:bg-ink hover:text-white"
              onClick={() => {
                setMenu(false);
                setBooking(true);
              }}
            >
              CHECK RATES
            </button>
          </div>

          <div className="p-[7vw] grid grid-cols-2 gap-[8vw] max-w-[1250px] max-[720px]:grid-cols-1 max-[720px]:p-[45px_24px] max-[720px]:gap-5">
            <div>
              <p className="m-0 mb-[18px] uppercase tracking-[0.18em] text-[10px] font-semibold">DESTINATIONS</p>
              <div className="border-t border-line">
                {menuDestinations.map((place) => (
                  <Link
                    key={place}
                    href={
                      place === 'Singapore'
                        ? '/singapore/'
                        : place === 'Dubai'
                        ? '/dubai/'
                        : '/hotels-resorts/'
                    }
                    className="flex justify-between border-b border-line py-3.5 font-serif text-[30px]"
                    onClick={() => setMenu(false)}
                  >
                    <span>{place}</span>
                    <ChevronRight size={18} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <p className="m-0 mb-[18px] uppercase tracking-[0.18em] text-[10px] font-semibold">EXPLORE IDANAZHI</p>
              <div className="pt-7 flex flex-col gap-[18px] font-serif text-[clamp(25px,3vw,43px)] leading-[1.05] max-[720px]:pt-2.5">
                {menuLinks.map((link) => (
                  <Link key={link.name} href={link.href} onClick={() => setMenu(false)}>
                    {link.name}
                  </Link>
                ))}
                <button
                  type="button"
                  className="bg-transparent border-none text-inherit font-inherit text-left p-0 cursor-pointer transition-opacity duration-200 ease-in-out hover:opacity-70"
                  onClick={() => {
                    setMenu(false);
                    setContactOpen(true);
                  }}
                >
                  Contact Concierge
                </button>
              </div>

              <div className="mt-9">
                <button
                  type="button"
                  className="bg-ink text-white border border-ink w-full border-solid px-[18px] py-3 text-[10px] tracking-[0.14em] transition-all duration-[180ms] ease-in-out"
                  onClick={() => {
                    setMenu(false);
                    setBooking(true);
                  }}
                >
                  RESERVE YOUR STAY
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-[70] bg-[rgba(12,31,30,0.55)] backdrop-blur-[8px] flex items-center justify-center p-6 animate-[modalFadeIn_0.2s_ease]"
          role="dialog"
          aria-modal="true"
          aria-label="Contact IDANAZHI"
        >
          <div className="bg-paper text-ink border border-line max-w-[520px] w-full p-[48px_42px] relative shadow-[0_16px_48px_rgba(0,0,0,0.2)] animate-[modalScaleUp_0.25s_cubic-bezier(0.16,1,0.3,1)] box-border max-[640px]:p-[36px_20px]">
            <button
              type="button"
              className="absolute top-5 right-5 bg-transparent border-none text-ink cursor-pointer p-2 inline-flex items-center justify-center transition-opacity duration-200 ease-in-out hover:opacity-60"
              aria-label="Close contact dialog"
              onClick={() => setContactOpen(false)}
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center justify-center mb-6">
              <BrandLogo className="h-[38px] text-ink" />
            </div>

            <p className="m-0 mb-[18px] uppercase tracking-[0.18em] text-[10px] font-semibold text-center">WE ARE HERE FOR YOU</p>
            <h2 className="font-serif text-[32px] font-normal text-center m-0 mb-4 leading-[1.1] tracking-[-0.02em]">At Your Service</h2>
            <p className="text-sm text-muted text-center mx-auto mb-7 max-w-[400px] leading-[1.5]">
              Allow our dedicated concierge team to curate every detail of your private celebration destination.
            </p>

            <div className="flex flex-col gap-4 mb-7 border-t border-b border-line py-[22px]">
              <div className="flex items-start gap-3.5">
                <MapPin size={17} className="text-ink mt-[3px] shrink-0" />
                <div>
                  <strong className="block text-[11px] uppercase tracking-[0.12em] mb-[3px] text-ink">Address</strong>
                  <p className="m-0 text-[13.5px] text-muted leading-[1.4]">IDANAZHI, Rajasthan, India</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <Phone size={17} className="text-ink mt-[3px] shrink-0" />
                <div>
                  <strong className="block text-[11px] uppercase tracking-[0.12em] mb-[3px] text-ink">Telephone</strong>
                  <a href="tel:+912942779000" className="m-0 text-[13.5px] text-muted leading-[1.4] transition-colors duration-200 ease-in-out hover:text-ink">+91 294 277 9000</a>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <Mail size={17} className="text-ink mt-[3px] shrink-0" />
                <div>
                  <strong className="block text-[11px] uppercase tracking-[0.12em] mb-[3px] text-ink">Email Concierge</strong>
                  <a href="mailto:hello@idanazhi.com" className="m-0 text-[13.5px] text-muted leading-[1.4] transition-colors duration-200 ease-in-out hover:text-ink">hello@idanazhi.com</a>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <a href="mailto:hello@idanazhi.com" className="bg-ink text-white border border-ink w-full text-center block px-[18px] py-3 text-[10px] tracking-[0.14em] transition-all duration-[180ms] ease-in-out">
                SEND AN INQUIRY
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Language Modal */}
      {langOpen && (
        <div
          className="fixed inset-0 z-[70] bg-[rgba(12,31,30,0.55)] backdrop-blur-[8px] flex items-center justify-center p-6 animate-[modalFadeIn_0.2s_ease]"
          role="dialog"
          aria-modal="true"
          aria-label="Select Language"
        >
          <div className="bg-paper text-ink border border-line max-w-[440px] w-full p-[48px_42px] relative shadow-[0_16px_48px_rgba(0,0,0,0.2)] animate-[modalScaleUp_0.25s_cubic-bezier(0.16,1,0.3,1)] box-border max-[640px]:p-[36px_20px]">
            <button
              type="button"
              className="absolute top-5 right-5 bg-transparent border-none text-ink cursor-pointer p-2 inline-flex items-center justify-center transition-opacity duration-200 ease-in-out hover:opacity-60"
              aria-label="Close language selector"
              onClick={() => setLangOpen(false)}
            >
              <X size={20} />
            </button>

            <p className="m-0 mb-[18px] uppercase tracking-[0.18em] text-[10px] font-semibold text-center">GLOBAL PREFERENCES</p>
            <h2 className="font-serif text-[32px] font-normal text-center m-0 mb-4 leading-[1.1] tracking-[-0.02em]">Select Language</h2>

            <div className="flex flex-col gap-2 mt-5">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  className={`flex items-center justify-between px-4 py-3 bg-transparent border border-line text-ink text-[13.5px] cursor-pointer transition-all duration-200 ease-in-out hover:bg-ink/5 ${
                    currentLang === l.code ? '!bg-ink !text-white !border-ink' : ''
                  }`}
                  onClick={() => {
                    setCurrentLang(l.code);
                    setLangOpen(false);
                  }}
                >
                  <span>{l.name} ({l.code})</span>
                  {currentLang === l.code && <Check size={16} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {booking && <BookingPanel close={() => setBooking(false)} />}
    </>
  );
}
