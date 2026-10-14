'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ChevronRight, Phone, Mail, MapPin, Check } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { BrandLogo } from '@/components/layout/brand-logo';
import { IdanazhiSymbol } from '@/components/layout/idanazhi-symbol';
import { OrnamentalArrow } from '@/components/layout/ornamental-arrow';
import { BookingPanel } from '@/components/sections/booking-panel';

const navLinks = [
  { label: 'STORY', title: 'Story', href: '/singapore/#story' },
  { label: 'GALLERY', title: 'Gallery', href: '/singapore/#story' },
  {
    label: 'EXPERIENCES',
    title: 'Experiences',
    href: '/singapore/experiences/',
    hasSubmenu: true,
    submenu: [
      { name: 'Destination Weddings', href: '/hotels-resorts/#celebration' },
      { name: 'Heritage Mandapam', href: '/hotels-resorts/#celebration' },
      { name: 'Lakeside Ceremonies', href: '/singapore/#story' },
      { name: 'Fine Dining & Feasts', href: '/singapore/experiences/' },
      { name: 'Wellness & Escapes', href: '/singapore/#stay' },
    ],
  },
  { label: 'OFFERS', title: 'Offers', href: '/hotels-resorts/' },
  { label: 'ROOMS', title: 'Rooms', href: '/singapore/#stay' },
  { label: 'CELEBRATIONS', title: 'Celebrations', href: '/singapore/experiences/' },
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
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [booking, setBooking] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentHash(window.location.hash);
      const handleHashChange = () => setCurrentHash(window.location.hash);
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, []);

  // Sync active option with the current URL route and hash
  useEffect(() => {
    if (pathname.includes('/experiences')) {
      setSelectedOption('EXPERIENCES');
    } else if (pathname.includes('/hotels-resorts')) {
      setSelectedOption('OFFERS');
    } else if (currentHash === '#stay') {
      setSelectedOption('ROOMS');
    } else if (currentHash === '#story') {
      setSelectedOption('STORY');
    } else if (pathname.includes('/singapore')) {
      setSelectedOption('ROOMS');
    } else if (pathname === '/') {
      setSelectedOption('STORY');
    }
  }, [pathname, currentHash]);

  const activeOption =
    selectedOption ||
    (pathname.includes('/experiences')
      ? 'EXPERIENCES'
      : pathname.includes('/hotels-resorts')
      ? 'OFFERS'
      : currentHash === '#stay'
      ? 'ROOMS'
      : 'STORY');
  const currentIndicatorOption = hoveredOption ?? activeOption;

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
              <img
                src="/images/weddings/logo/idanazhi_symbol_transparent.svg"
                alt=""
                className={`h-full w-full object-contain ${scrolled ? '' : 'brightness-0 invert'}`}
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
              <img
                src="/images/weddings/logo/idanazhi_symbol_transparent.svg"
                alt="IDANAZHI"
                className={`h-full w-full object-contain transition-all duration-300 ${scrolled ? '' : 'brightness-0 invert'}`}
              />
            </Link>

            {/* Right spacer to keep center logo perfectly balanced */}
            <div className="flex items-center justify-end" aria-hidden="true" />
          </nav>
        </div>
      </header>

      {/* Mobile Luxury Full-Screen Menu with Smooth Slide Animation */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-400 ${
          mobileMenuOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop overlay */}
        <div
          className={`fixed inset-0 bg-[rgba(30,16,12,0.45)] backdrop-blur-[4px] transition-opacity duration-400 ease-out ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Sliding Full-Screen Menu Panel */}
        <aside
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className={`fixed inset-0 w-full h-[100dvh] bg-paper text-ink flex flex-col justify-between overflow-y-auto overscroll-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Top Bar: Emblem (Left) | IDANAZHI (Center) | Close X (Right) */}
          <div className="h-[68px] sm:h-[76px] px-6 max-[480px]:px-5 grid grid-cols-[auto_1fr_auto] items-center shrink-0 border-b border-line/20 bg-paper sticky top-0 z-20">
            {/* Left: IDANAZHI Emblem Symbol */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center text-ink transition-opacity hover:opacity-75"
              aria-label="IDANAZHI Home"
            >
              <IdanazhiSymbol className="h-6 sm:h-7 w-auto text-ink" />
            </Link>

            {/* Center: Brand Name in clean tracked uppercase typography */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="font-urbanist text-[15px] sm:text-[16px] font-medium tracking-[0.28em] uppercase text-[#4E2418] no-underline text-center"
            >
              IDANAZHI
            </Link>

            {/* Right: Minimalist Thin Close X Button */}
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 -mr-1.5 text-[#4E2418] bg-transparent border-0 cursor-pointer transition-opacity duration-200 hover:opacity-60 active:scale-95"
            >
              <X size={24} strokeWidth={1.25} />
            </button>
          </div>

          {/* Navigation Items List - Exact arrangement and typography as screenshot */}
          <div className="flex-1 px-8 max-[480px]:px-7 pt-7 sm:pt-9 pb-10 flex flex-col justify-start">
            <nav className="flex flex-col gap-1 sm:gap-1.5" aria-label="Mobile Navigation Links">
              {navLinks.map((item) => {
                const isActive = currentIndicatorOption === item.label;

                if (item.hasSubmenu) {
                  return (
                    <div key={item.label} className="flex flex-col group/item">
                      <div className="w-full flex items-center justify-between text-left py-2.5 sm:py-3">
                        <Link
                          href={item.href}
                          onClick={() => {
                            setSelectedOption(item.label);
                            setSubmenuOpen(!submenuOpen);
                          }}
                          onMouseEnter={() => setHoveredOption(item.label)}
                          onMouseLeave={() => setHoveredOption(null)}
                          className={`font-urbanist text-[22px] sm:text-[24px] leading-[1.35] tracking-[0.035em] transition-all duration-300 ${
                            isActive
                              ? 'text-[#3E1A10] font-normal translate-x-1'
                              : 'text-[#5C2E20]/80 font-light hover:text-[#3E1A10] hover:translate-x-0.5'
                          }`}
                        >
                          {item.title}
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOption(item.label);
                            setSubmenuOpen(!submenuOpen);
                          }}
                          onMouseEnter={() => setHoveredOption(item.label)}
                          onMouseLeave={() => setHoveredOption(null)}
                          aria-label={`Toggle ${item.title} submenu`}
                          className="p-1 -mr-1 text-[#4E2418] bg-transparent border-0 cursor-pointer flex items-center justify-end min-w-[76px] h-6 overflow-visible"
                        >
                          <div
                            className={`transition-all duration-300 ease-out transform ${
                              isActive
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 translate-x-3 pointer-events-none'
                            }`}
                          >
                            <OrnamentalArrow
                              expanded={submenuOpen}
                              className="w-[72px] sm:w-[80px] h-4 text-[#4E2418] shrink-0 transition-transform duration-300"
                            />
                          </div>
                        </button>
                      </div>

                      {/* Expandable Submenu */}
                      {submenuOpen && (
                        <div className="pl-4 pt-1.5 pb-3 flex flex-col gap-2.5 border-l border-line/30 my-1 animate-fadeIn">
                          {item.submenu?.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={() => {
                                setSelectedOption(item.label);
                                setMobileMenuOpen(false);
                              }}
                              className="font-urbanist text-[16px] font-light text-muted hover:text-[#4E2418] transition-all duration-200 tracking-[0.04em] hover:translate-x-1 py-1"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div
                    key={item.label}
                    className="w-full flex items-center justify-between text-left py-2.5 sm:py-3 group/item cursor-pointer"
                    onClick={() => setSelectedOption(item.label)}
                  >
                    <Link
                      href={item.href}
                      onClick={() => {
                        setSelectedOption(item.label);
                        setMobileMenuOpen(false);
                      }}
                      onMouseEnter={() => setHoveredOption(item.label)}
                      onMouseLeave={() => setHoveredOption(null)}
                      className={`font-urbanist text-[22px] sm:text-[24px] leading-[1.35] tracking-[0.035em] transition-all duration-300 ${
                        isActive
                          ? 'text-[#3E1A10] font-normal translate-x-1'
                          : 'text-[#5C2E20]/80 font-light hover:text-[#3E1A10] hover:translate-x-0.5'
                      }`}
                    >
                      {item.title}
                    </Link>

                    {/* Dynamic Ornamental Arrow for active / selected item */}
                    <div
                      className="flex items-center justify-end min-w-[76px] h-6 overflow-visible cursor-pointer"
                      onClick={() => setSelectedOption(item.label)}
                      onMouseEnter={() => setHoveredOption(item.label)}
                      onMouseLeave={() => setHoveredOption(null)}
                    >
                      <div
                        className={`transition-all duration-300 ease-out transform ${
                          isActive
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 translate-x-3 pointer-events-none'
                        }`}
                      >
                        <OrnamentalArrow
                          className="w-[72px] sm:w-[80px] h-4 text-[#4E2418] shrink-0"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>

            {/* Subtle Luxury Footer Utilities */}
            <div className="mt-10 pt-7 border-t border-line/30 flex items-center gap-3 font-urbanist">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBooking(true);
                }}
                className="bg-[#4E2418] text-white px-5 py-2.5 text-[10.5px] font-medium tracking-[0.18em] uppercase hover:bg-forest transition-colors cursor-pointer"
              >
                RESERVE YOUR STAY
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setContactOpen(true);
                }}
                className="border border-line text-[#4E2418] px-4 py-2.5 text-[10.5px] font-medium tracking-[0.18em] uppercase hover:bg-ink/5 transition-colors cursor-pointer"
              >
                CONTACT
              </button>
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
