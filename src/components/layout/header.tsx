'use client';

import Link from 'next/link';
import { X, ChevronRight, Phone, Mail, MapPin, Check } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
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
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [booking, setBooking] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);
      const lastScrollY = lastScrollYRef.current;
      const scrollDiff = currentScrollY - lastScrollY;
      const hero = document.querySelector('.home-hero');

      setScrolled(hero ? hero.getBoundingClientRect().bottom <= 0 : currentScrollY > 20);

      if (currentScrollY <= 15) {
        setIsVisible(true);
      } else if (scrollDiff > 8 && currentScrollY > 80) {
        // Scrolling down past threshold -> hide header
        setIsVisible(false);
      } else if (scrollDiff < -8) {
        // Scrolling up -> reveal header
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const isHeaderVisible = isVisible || mobileMenuOpen || booking || contactOpen || langOpen;

  useEffect(() => {
    const isAnyModalOpen = mobileMenuOpen || booking || contactOpen || langOpen;
    document.body.style.overflow = isAnyModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, booking, contactOpen, langOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setBooking(false);
        setContactOpen(false);
        setLangOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`fixed z-40 top-0 left-0 w-full text-white bg-[rgba(45,25,18,0.36)] backdrop-blur-[12px] flex! flex-col! h-auto! p-0! border-b-0! transition-all duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] will-change-transform ${
          scrolled
            ? '!text-ink !bg-paper/98 !backdrop-blur-[14px] !shadow-[0_4px_20px_rgba(45,25,18,0.06)] !border-transparent'
            : ''
        } ${
          isHeaderVisible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 box-border flex flex-col max-[1080px]:max-w-[1160px] max-[1080px]:px-5 max-[960px]:max-w-full max-[960px]:px-4">
          {/* Desktop primary navigation (>= 961px) */}
          <nav
            className="hidden min-[961px]:grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-[10px] pb-[13px] w-full box-border max-[1080px]:gap-3"
            aria-label="Desktop primary navigation"
          >
            <div className="grid grid-cols-3 items-center">
              {navLinks.slice(0, 3).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`justify-self-center font-sans text-[10.5px] font-normal tracking-[0.14em] uppercase text-inherit no-underline whitespace-nowrap py-1 transition-opacity duration-200 ease-in-out hover:opacity-[0.65] max-[1080px]:text-[10px] max-[1080px]:tracking-[0.11em] ${scrolled ? 'hover:!opacity-100 hover:!text-ink' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href="/"
              aria-label="IDANAZHI home"
              className="flex h-9 w-[104px] shrink-0 items-center justify-center justify-self-center max-[1080px]:h-8 max-[1080px]:w-[92px]"
            >
              <span
                aria-hidden="true"
                className={`h-full w-full [mask-image:url('/images/weddings/logo/idanazhi_symbol_transparent.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:url('/images/weddings/logo/idanazhi_symbol_transparent.svg')] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain] transition-colors duration-300 ${scrolled ? 'bg-[#7C402E]' : 'bg-white'}`}
              />
            </Link>
            <div className="grid grid-cols-3 items-center">
              {navLinks.slice(3).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`justify-self-center font-sans text-[10.5px] font-normal tracking-[0.14em] uppercase text-inherit no-underline whitespace-nowrap py-1 transition-opacity duration-200 ease-in-out hover:opacity-[0.65] max-[1080px]:text-[10px] max-[1080px]:tracking-[0.11em] ${scrolled ? 'hover:!opacity-100 hover:!text-ink' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile & Tablet navigation (< 961px) */}
          <nav
            className="grid min-[961px]:hidden grid-cols-[1fr_auto_1fr] items-center py-2.5 w-full box-border"
            aria-label="Mobile primary navigation"
          >
            {/* Left: Hamburger 3-Line Menu Button */}
            <div className="flex items-center justify-start">
              <button
                type="button"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-drawer"
                onClick={() => setMobileMenuOpen(true)}
                className={`group inline-flex items-center gap-2 p-1.5 -ml-1.5 bg-transparent border-0 cursor-pointer transition-all duration-200 active:scale-95 ${
                  scrolled ? 'text-ink' : 'text-white'
                }`}
              >
                <span className="flex flex-col justify-center items-start w-5 h-4 gap-[4.5px]" aria-hidden="true">
                  <span
                    className={`block h-[1.75px] w-5 rounded-full transition-all duration-300 ease-out ${
                      scrolled ? 'bg-[#7C402E]' : 'bg-white'
                    }`}
                  />
                  <span
                    className={`block h-[1.75px] w-3.5 rounded-full transition-all duration-300 ease-out group-hover:w-5 ${
                      scrolled ? 'bg-[#7C402E]' : 'bg-white'
                    }`}
                  />
                  <span
                    className={`block h-[1.75px] w-4.5 rounded-full transition-all duration-300 ease-out group-hover:w-5 ${
                      scrolled ? 'bg-[#7C402E]' : 'bg-white'
                    }`}
                  />
                </span>
                <span className="sr-only">Menu</span>
              </button>
            </div>

            {/* Center: Brand Logo */}
            <Link
              href="/"
              aria-label="IDANAZHI home"
              className="flex h-8 w-[92px] shrink-0 items-center justify-center justify-self-center transition-transform duration-200 active:scale-95"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span
                aria-hidden="true"
                className={`h-full w-full [mask-image:url('/images/weddings/logo/idanazhi_symbol_transparent.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:url('/images/weddings/logo/idanazhi_symbol_transparent.svg')] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain] transition-colors duration-300 ${
                  scrolled ? 'bg-[#7C402E]' : 'bg-white'
                }`}
              />
            </Link>

            {/* Right: Contact Us Button */}
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className={`font-sans text-[10px] font-medium tracking-[0.14em] uppercase px-3 py-1.5 border transition-all duration-200 ease-in-out whitespace-nowrap active:scale-95 cursor-pointer ${
                  scrolled
                    ? 'border-[#7C402E] text-[#7C402E] hover:bg-[#7C402E] hover:text-white'
                    : 'border-white/85 text-white hover:bg-white hover:text-[#7C402E]'
                }`}
              >
                CONTACT US
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Luxury Slide-in Drawer from the Left */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          mobileMenuOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop blur overlay */}
        <div
          className={`fixed inset-0 bg-[rgba(30,16,12,0.6)] backdrop-blur-[6px] transition-opacity duration-300 ease-out ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Left slide-in drawer container */}
        <aside
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className={`fixed top-0 left-0 bottom-0 w-[min(380px,86vw)] bg-paper text-ink shadow-[12px_0_40px_rgba(30,16,12,0.3)] flex flex-col justify-between transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 border-r border-line overflow-hidden ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Drawer Top / Header */}
          <div className="h-[74px] px-6 border-b border-line flex items-center justify-between shrink-0 bg-paper">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 text-ink no-underline"
              aria-label="IDANAZHI Home"
            >
              <BrandLogo className="h-9 w-auto max-w-[140px]" />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
              className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink bg-transparent hover:bg-ink/5 transition-colors duration-200 cursor-pointer group"
            >
              <X size={18} strokeWidth={1.75} className="group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>

          {/* Drawer Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-6 py-6 overscroll-contain">
            <p className="m-0 mb-3.5 uppercase tracking-[0.2em] text-[10px] font-semibold text-muted">
              NAVIGATION
            </p>

            {/* Primary Navigation Links */}
            <nav className="flex flex-col divide-y divide-line/60">
              {navLinks.map((item, idx) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center justify-between py-3.5 text-ink no-underline transition-all duration-200 hover:text-forest"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-[10px] tracking-[0.14em] text-muted/70 w-5">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-serif text-[21px] font-normal tracking-[-0.01em] transition-transform duration-200 group-hover:translate-x-1">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-muted/60 transition-all duration-200 group-hover:translate-x-1 group-hover:text-ink"
                  />
                </Link>
              ))}
            </nav>

            {/* Explore Section */}
            <div className="mt-7 pt-6 border-t border-line">
              <p className="m-0 mb-3.5 uppercase tracking-[0.2em] text-[10px] font-semibold text-muted">
                EXPLORE IDANAZHI
              </p>
              <div className="flex flex-col gap-1">
                {menuLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 text-[14px] text-ink hover:text-forest transition-colors duration-150"
                  >
                    <span>{link.name}</span>
                    <ChevronRight size={14} className="text-muted/50" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Destinations Section */}
            <div className="mt-6 pt-6 border-t border-line">
              <p className="m-0 mb-3 uppercase tracking-[0.2em] text-[10px] font-semibold text-muted">
                DESTINATIONS
              </p>
              <div className="flex flex-wrap gap-2">
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
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-sans text-[10.5px] uppercase tracking-[0.1em] px-2.5 py-1.5 border border-line bg-linen/40 text-ink hover:bg-ink hover:text-white transition-colors duration-150"
                  >
                    {place}
                  </Link>
                ))}
              </div>
            </div>

            {/* Language Preference */}
            <div className="mt-6 pt-5 border-t border-line flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-muted">
                LANGUAGE
              </span>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLangOpen(true);
                }}
                className="font-sans text-[11px] uppercase tracking-[0.12em] px-2.5 py-1 border border-line text-ink hover:bg-ink/5 transition-colors cursor-pointer"
              >
                {currentLang} &middot; CHANGE
              </button>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-5 px-6 border-t border-line bg-linen/35 shrink-0 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setBooking(true);
              }}
              className="w-full bg-[#7C402E] text-white border border-[#7C402E] py-3 text-[10.5px] font-semibold tracking-[0.16em] uppercase transition-all duration-200 hover:bg-[#5A2D21] shadow-sm text-center cursor-pointer"
            >
              CHECK RATES & STAY
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setContactOpen(true);
              }}
              className="w-full bg-white text-ink border border-line py-2.5 text-[10px] font-semibold tracking-[0.16em] uppercase transition-all duration-200 hover:bg-ink/5 text-center cursor-pointer"
            >
              CONTACT CONCIERGE
            </button>

            <div className="flex items-center justify-between text-[11px] text-muted pt-2 border-t border-line/60">
              <a href="tel:+912942779000" className="flex items-center gap-1.5 hover:text-ink transition-colors">
                <Phone size={13} className="text-ink" />
                <span>+91 294 277 9000</span>
              </a>
              <a href="mailto:hello@idanazhi.com" className="flex items-center gap-1.5 hover:text-ink transition-colors">
                <Mail size={13} className="text-ink" />
                <span>hello@idanazhi.com</span>
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* Contact Modal */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-[70] bg-[rgba(45,25,18,0.55)] backdrop-blur-[8px] flex items-center justify-center p-6 animate-[modalFadeIn_0.2s_ease]"
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
              <BrandLogo className="h-[38px] w-auto" />
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
          className="fixed inset-0 z-[70] bg-[rgba(45,25,18,0.55)] backdrop-blur-[8px] flex items-center justify-center p-6 animate-[modalFadeIn_0.2s_ease]"
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
