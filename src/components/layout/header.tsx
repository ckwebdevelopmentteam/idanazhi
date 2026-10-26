'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Phone, Mail, MapPin, Check, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { BrandLogo } from '@/components/layout/brand-logo';
import { IdanazhiSymbol } from '@/components/layout/idanazhi-symbol';
import { OrnamentalArrow } from '@/components/layout/ornamental-arrow';
import { BookingPanel } from '@/components/sections/booking-panel';
import { experiencesData, type ExperienceItem } from '@/data/experiences';
import { ExperienceModal } from '@/components/ui/experience-modal';

interface NavItem {
  label: string;
  title: string;
  href: string;
  hasSubmenu?: boolean;
}

const navLinks: NavItem[] = [
  { label: 'STAY', title: 'Stay', href: '/stay' },
  {
    label: 'EXPERIENCE',
    title: 'Experience',
    href: '#experiences',
    hasSubmenu: true,
  },
  { label: 'EVENTS', title: 'Events', href: '/celebrations' },
  { label: 'STORY', title: 'Story', href: '/story' },
  { label: 'GALLERY', title: 'Gallery', href: '/gallery' },
  { label: 'BLOGS', title: 'Blogs', href: '/blogs' },
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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [experienceDropdownOpen, setExperienceDropdownOpen] = useState(false);
  const [mobileExperienceExpanded, setMobileExperienceExpanded] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [booking, setBooking] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const lastScrollYRef = useRef(0);

  // Sync active option with current route
  useEffect(() => {
    if (pathname.startsWith('/stay')) {
      setSelectedOption('STAY');
    } else if (pathname.startsWith('/celebrations')) {
      setSelectedOption('EVENTS');
    } else if (pathname.startsWith('/story')) {
      setSelectedOption('STORY');
    } else if (pathname.startsWith('/gallery')) {
      setSelectedOption('GALLERY');
    } else if (pathname.startsWith('/blogs')) {
      setSelectedOption('BLOGS');
    } else {
      setSelectedOption(null);
    }
  }, [pathname]);

  const activeOption =
    selectedOption ||
    (pathname.startsWith('/stay')
      ? 'STAY'
      : pathname.startsWith('/celebrations')
        ? 'EVENTS'
        : pathname.startsWith('/story')
          ? 'STORY'
          : pathname.startsWith('/gallery')
            ? 'GALLERY'
            : pathname.startsWith('/blogs')
              ? 'BLOGS'
              : null);
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

  const isHeaderVisible = isVisible || mobileMenuOpen || booking || contactOpen || langOpen || !!selectedExperience;

  useEffect(() => {
    const isAnyModalOpen = mobileMenuOpen || booking || contactOpen || langOpen || !!selectedExperience;
    document.body.style.overflow = isAnyModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, booking, contactOpen, langOpen, selectedExperience]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setBooking(false);
        setContactOpen(false);
        setLangOpen(false);
        setSelectedExperience(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`fixed z-40 top-0 left-0 w-full text-white bg-gradient-to-b from-black/35 via-black/10 to-transparent backdrop-blur-[1px] flex! flex-col! h-auto! p-0! border-b-0! transition-all duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] will-change-transform ${scrolled
            ? '!text-ink !bg-paper/98 !backdrop-blur-[14px] !shadow-[0_4px_20px_rgba(45,25,18,0.06)] !border-transparent'
            : ''
          } ${isHeaderVisible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 pointer-events-none'
          }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-6 md:px-8 box-border flex flex-col">
          {/* Desktop primary navigation (>= 961px) - Corner Logo, Centered Tabs, Corner Book Now */}
          <nav
            className="hidden min-[961px]:flex items-center justify-between py-[12px] pb-[13px] w-full box-border"
            aria-label="Desktop primary navigation"
          >
            {/* Left Corner: OG IDANAZHI FARM STAY Brand Logo */}
            <Link
              href="/"
              aria-label="IDANAZHI Farm Stay home"
              className="flex items-center shrink-0 transition-opacity hover:opacity-85 no-underline"
            >
              <img
                src="/images/weddings/logo/idanazhi_farm_stay_logo.svg"
                alt="IDANAZHI Farm Stay"
                className={`h-9 sm:h-11 w-auto object-contain transition-all duration-300 ${scrolled ? '' : 'brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]'
                  }`}
              />
            </Link>

            {/* Center: Main Navigation Tabs (Stay, Experience with Subcategories, Events, Story, Gallery, Blogs) */}
            <div className="flex items-center gap-5 lg:gap-7 xl:gap-8">
              {navLinks.map((item) => {
                if (item.hasSubmenu) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setExperienceDropdownOpen(true)}
                      onMouseLeave={() => setExperienceDropdownOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setExperienceDropdownOpen(!experienceDropdownOpen)}
                        className={`font-sans text-[11px] font-normal tracking-[0.16em] uppercase text-inherit whitespace-nowrap py-1 transition-opacity duration-200 ease-in-out hover:opacity-[0.75] flex items-center gap-1 cursor-pointer bg-transparent border-0 ${scrolled ? 'hover:!opacity-100 hover:!text-ink' : ''
                          } ${currentIndicatorOption === item.label ? 'font-semibold tracking-[0.18em]' : ''
                          }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-200 ${experienceDropdownOpen ? 'rotate-180' : ''
                            }`}
                        />
                      </button>

                      {/* Dropdown Menu for Experience Sub-categories */}
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300 z-50 ${experienceDropdownOpen
                            ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                            : 'opacity-0 -translate-y-2 pointer-events-none invisible'
                          }`}
                      >
                        <div className="w-[540px] bg-[#FAF7F2] text-[#1C1917] p-5 shadow-[0_20px_50px_rgba(45,25,18,0.22)] border border-[#7C402E]/20 backdrop-blur-xl">
                          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#7C402E]/15">
                            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#7C402E]">
                              IDANAZHI CURATED EXPERIENCES
                            </span>
                            <span className="text-[10px] font-sans uppercase tracking-[0.14em] text-[#6E2E1D]/80">
                              4 HERITAGE ENCOUNTERS
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            {experiencesData.map((exp) => (
                              <div
                                key={exp.id}
                                onClick={() => {
                                  setSelectedExperience(exp);
                                  setExperienceDropdownOpen(false);
                                }}
                                className="group/card flex items-start gap-3 p-2.5 border border-transparent hover:border-[#7C402E]/20 hover:bg-white/80 transition-all cursor-pointer text-left"
                              >
                                <div className="w-14 h-14 shrink-0 overflow-hidden bg-black/10">
                                  <img
                                    src={exp.image}
                                    alt={exp.shortTitle}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="block font-urbanist text-[12.5px] font-medium leading-[1.25] text-[#3E1A10] group-hover/card:text-[#7C402E] transition-colors line-clamp-1">
                                    {exp.shortTitle}
                                  </span>
                                  <span className="block font-sans text-[10.5px] text-[#6B5E54] line-clamp-2 mt-1 leading-[1.35]">
                                    {exp.tagline}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`font-sans text-[11px] font-normal tracking-[0.16em] uppercase text-inherit no-underline whitespace-nowrap py-1 transition-opacity duration-200 ease-in-out hover:opacity-[0.75] ${scrolled ? 'hover:!opacity-100 hover:!text-ink' : ''
                      } ${currentIndicatorOption === item.label ? 'font-semibold tracking-[0.18em]' : ''}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Right Corner: Dark Forest Green "START PLANNING STAY ->" Button + Circular Menu */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => setBooking(true)}
                className="group font-sans text-[10.5px] font-semibold tracking-[0.16em] uppercase px-5 py-2.5 rounded-full bg-[#1a382e] hover:bg-[#122820] text-white flex items-center gap-2 transition-all duration-200 cursor-pointer active:scale-95 shadow-md border border-white/10"
              >
                <span>START PLANNING STAY</span>
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                aria-label="Open navigation menu drawer"
                onClick={() => setMobileMenuOpen(true)}
                className={`w-10 h-10 rounded-full border transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center shrink-0 ${scrolled
                    ? 'border-line/40 bg-paper hover:bg-black/5 text-ink'
                    : 'border-white/25 bg-black/20 hover:bg-black/35 text-white backdrop-blur-sm'
                  }`}
              >
                <span className="flex flex-col justify-center items-center w-4 h-3.5 gap-[3.5px]" aria-hidden="true">
                  <span className={`block h-[1.5px] w-4 rounded-full ${scrolled ? 'bg-ink' : 'bg-white'}`} />
                  <span className={`block h-[1.5px] w-4 rounded-full ${scrolled ? 'bg-ink' : 'bg-white'}`} />
                  <span className={`block h-[1.5px] w-4 rounded-full ${scrolled ? 'bg-ink' : 'bg-white'}`} />
                </span>
              </button>
            </div>
          </nav>

          {/* Mobile & Tablet navigation (< 961px) */}
          <nav
            className="flex min-[961px]:hidden items-center justify-between py-2.5 w-full box-border"
            aria-label="Mobile primary navigation"
          >
            {/* Left: OG Logo */}
            <Link
              href="/"
              aria-label="IDANAZHI Farm Stay home"
              className="flex items-center transition-transform duration-200 active:scale-95"
              onClick={() => setMobileMenuOpen(false)}
            >
              <img
                src="/images/weddings/logo/idanazhi_farm_stay_logo.svg"
                alt="IDANAZHI Farm Stay"
                className={`h-7 sm:h-8 w-auto object-contain transition-all duration-300 ${scrolled ? '' : 'brightness-0 invert drop-shadow-sm'
                  }`}
              />
            </Link>

            {/* Right: Quick Book Button + Circular Hamburger Menu */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setBooking(true)}
                className="font-sans text-[9px] sm:text-[10px] tracking-[0.14em] uppercase font-semibold px-3 py-1.5 rounded-full bg-[#1a382e] text-white flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-sm"
              >
                <span>BOOK</span>
                <ArrowRight size={11} />
              </button>

              <button
                type="button"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                onClick={() => setMobileMenuOpen(true)}
                className={`w-9 h-9 rounded-full border transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center shrink-0 ${scrolled
                    ? 'border-line/40 bg-paper text-ink'
                    : 'border-white/25 bg-black/25 text-white backdrop-blur-sm'
                  }`}
              >
                <span className="flex flex-col justify-center items-center w-3.5 h-3 gap-[3px]" aria-hidden="true">
                  <span className={`block h-[1.5px] w-3.5 rounded-full ${scrolled ? 'bg-ink' : 'bg-white'}`} />
                  <span className={`block h-[1.5px] w-3.5 rounded-full ${scrolled ? 'bg-ink' : 'bg-white'}`} />
                  <span className={`block h-[1.5px] w-3.5 rounded-full ${scrolled ? 'bg-ink' : 'bg-white'}`} />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Luxury Full-Screen Menu with Smooth Slide Animation */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-400 ${mobileMenuOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
          }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop overlay */}
        <div
          className={`fixed inset-0 bg-[rgba(30,16,12,0.45)] backdrop-blur-[4px] transition-opacity duration-400 ease-out ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Sliding Full-Screen Menu Panel */}
        <aside
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className={`fixed inset-0 w-full h-[100dvh] bg-paper text-ink flex flex-col justify-between overflow-y-auto overscroll-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
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

          {/* Navigation Items List */}
          <div className="flex-1 px-8 max-[480px]:px-7 pt-7 sm:pt-9 pb-10 flex flex-col justify-start">
            <nav className="flex flex-col gap-1 sm:gap-1.5" aria-label="Mobile Navigation Links">
              {navLinks.map((item) => {
                const isActive = currentIndicatorOption === item.label;

                if (item.hasSubmenu) {
                  return (
                    <div key={item.label} className="w-full flex flex-col border-b border-line/10 py-1.5">
                      <div
                        className="w-full flex items-center justify-between py-2 sm:py-2.5 cursor-pointer"
                        onClick={() => setMobileExperienceExpanded(!mobileExperienceExpanded)}
                      >
                        <span
                          className={`font-urbanist text-[22px] sm:text-[24px] leading-[1.35] tracking-[0.035em] transition-all duration-300 ${isActive
                              ? 'text-[#3E1A10] font-normal translate-x-1'
                              : 'text-[#5C2E20]/80 font-light hover:text-[#3E1A10]'
                            }`}
                        >
                          {item.title}
                        </span>
                        <div className="flex items-center gap-2 text-[#4E2418]">
                          <span className="text-[10px] uppercase tracking-[0.14em] text-[#7C402E]/70 font-sans">
                            4 Tours
                          </span>
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 ${mobileExperienceExpanded ? 'rotate-180 text-[#7C402E]' : 'text-[#4E2418]/60'
                              }`}
                          />
                        </div>
                      </div>

                      {/* Expandable Sub-categories */}
                      {mobileExperienceExpanded && (
                        <div className="flex flex-col gap-2 pt-2 pb-3 pl-3 border-l-2 border-[#7C402E]/30 my-1 animate-in fade-in slide-in-from-top-1">
                          {experiencesData.map((exp, idx) => (
                            <button
                              key={exp.id}
                              type="button"
                              onClick={() => {
                                setSelectedExperience(exp);
                                setMobileMenuOpen(false);
                              }}
                              className="w-full text-left py-2 px-2.5 rounded-none hover:bg-white/60 transition-colors flex items-center justify-between group cursor-pointer bg-transparent border-0"
                            >
                              <div className="flex flex-col">
                                <span className="font-urbanist text-[14.5px] sm:text-[15px] font-medium text-[#3E1A10] group-hover:text-[#7C402E]">
                                  {idx + 1}. {exp.shortTitle}
                                </span>
                                <span className="font-sans text-[11px] text-[#7A6E65] line-clamp-1">
                                  {exp.tagline}
                                </span>
                              </div>
                              <ChevronRight size={14} className="text-[#7C402E] shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div
                    key={item.label}
                    className="w-full flex items-center justify-between text-left py-2.5 sm:py-3 group/item cursor-pointer border-b border-line/10 last:border-b-0"
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
                      className={`font-urbanist text-[22px] sm:text-[24px] leading-[1.35] tracking-[0.035em] transition-all duration-300 ${isActive
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
                        className={`transition-all duration-300 ease-out transform ${isActive
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
            <div className="mt-8 pt-6 border-t border-line/30 flex items-center gap-3 font-urbanist">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBooking(true);
                }}
                className="bg-[#4E2418] text-white px-5 py-2.5 text-[10.5px] font-medium tracking-[0.18em] uppercase hover:bg-forest transition-colors cursor-pointer"
              >
                BOOK NOW
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
                  className={`flex items-center justify-between px-4 py-3 bg-transparent border border-line text-ink text-[13.5px] cursor-pointer transition-all duration-200 ease-in-out hover:bg-ink/5 ${currentLang === l.code ? '!bg-ink !text-white !border-ink' : ''
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

      {selectedExperience && (
        <ExperienceModal
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
          onBookNow={() => setBooking(true)}
        />
      )}
    </>
  );
}
