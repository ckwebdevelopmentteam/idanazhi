'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Phone, Mail, MapPin, ChevronDown, ArrowRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { BrandLogo } from '@/components/layout/brand-logo';
import { IdanazhiSymbol } from '@/components/layout/idanazhi-symbol';
import { OrnamentalArrow } from '@/components/layout/ornamental-arrow';
import { BookingPanel } from '@/components/sections/booking-panel';
import { mainNavLinks, experienceSubCategories } from '@/data/navigation';
import { ExperienceModal } from '@/components/ui/experience-modal';
import { experiencesData, ExperienceItem } from '@/data/experiences';

export function Header() {
  const pathname = usePathname();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [experienceDropdownOpen, setExperienceDropdownOpen] = useState(false);
  const [mobileExpExpanded, setMobileExpExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [booking, setBooking] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollYRef = useRef(0);

  // Sync active option with current route
  useEffect(() => {
    if (pathname.startsWith('/stay')) {
      setSelectedOption('STAY');
    } else if (pathname.startsWith('/experiences')) {
      setSelectedOption('EXPERIENCE');
    } else if (pathname.startsWith('/events') || pathname.startsWith('/celebrations')) {
      setSelectedOption('EVENTS');
    } else if (pathname.startsWith('/business-model')) {
      setSelectedOption('BUSINESS MODEL');
    } else {
      setSelectedOption(null);
    }
  }, [pathname]);

  const activeOption =
    selectedOption ||
    (pathname.startsWith('/stay')
      ? 'STAY'
      : pathname.startsWith('/experiences')
      ? 'EXPERIENCE'
      : pathname.startsWith('/events') || pathname.startsWith('/celebrations')
      ? 'EVENTS'
      : pathname.startsWith('/business-model')
      ? 'BUSINESS MODEL'
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
        setExperienceDropdownOpen(false);
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

  const isHeaderVisible = isVisible || mobileMenuOpen || booking || contactOpen || Boolean(selectedExperience);
  const isLightHeader = scrolled || pathname !== '/';

  useEffect(() => {
    const isAnyModalOpen = mobileMenuOpen || booking || contactOpen || Boolean(selectedExperience);
    document.body.style.overflow = isAnyModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, booking, contactOpen, selectedExperience]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setBooking(false);
        setContactOpen(false);
        setExperienceDropdownOpen(false);
        setSelectedExperience(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setExperienceDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setExperienceDropdownOpen(false);
    }, 180);
  };

  return (
    <>
      <header
        className={`fixed z-40 top-0 left-0 w-full text-white bg-[rgba(45,25,18,0.36)] backdrop-blur-[12px] flex! flex-col! h-auto! p-0! border-b-0! transition-all duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] will-change-transform ${
          isLightHeader
            ? '!text-ink !bg-paper/98 !backdrop-blur-[14px] !shadow-[0_4px_20px_rgba(45,25,18,0.06)] !border-transparent'
            : ''
        } ${
          isHeaderVisible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 box-border flex flex-col max-[1080px]:max-w-[1160px] max-[1080px]:px-5 max-[960px]:max-w-full max-[960px]:px-4">
          {/* Desktop primary navigation (>= 961px) - Corner Full Logo, Main Tabs, Book Now */}
          <nav
            className="hidden min-[961px]:flex items-center justify-between gap-6 py-[11px] pb-[13px] w-full box-border"
            aria-label="Desktop primary navigation"
          >
            {/* Left Corner: Full Brand Logo */}
            <Link
              href="/"
              aria-label="IDANAZHI Farm Stay"
              className="flex items-center shrink-0 no-underline transition-opacity duration-200 hover:opacity-85 py-0.5"
            >
              <img
                src="/images/weddings/logo/idanazhi_farm_stay_logo.svg"
                alt="IDANAZHI Farm Stay"
                className={`h-9 md:h-10 lg:h-11 w-auto max-w-[185px] lg:max-w-[210px] object-contain transition-all duration-300 ${
                  isLightHeader ? '' : 'brightness-0 invert'
                }`}
              />
            </Link>

            {/* Center: Main Tabs (Stay, Experience, Events, Business Model) */}
            <div className="flex items-center gap-6 lg:gap-8 xl:gap-9">
              {mainNavLinks.map((item) => {
                const isActive = activeOption === item.label;
                const hasSubCategories = Boolean(item.subCategories && item.subCategories.length > 0);

                if (hasSubCategories) {
                  return (
                    <div
                      key={item.label}
                      className="relative group"
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleDropdownMouseLeave}
                    >
                      <Link
                        href={item.href}
                        className={`inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.16em] no-underline whitespace-nowrap py-1.5 px-1 transition-all duration-200 max-[1080px]:text-[10.5px] max-[1080px]:tracking-[0.12em] ${
                          isActive || experienceDropdownOpen
                            ? isLightHeader
                              ? 'text-[#84382B] font-bold'
                              : 'text-white font-bold'
                            : isLightHeader
                            ? 'text-[#4E2418]/70 hover:text-[#4E2418] font-normal'
                            : 'text-white/75 hover:text-white font-normal'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-200 group-hover:rotate-180 ${
                            experienceDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </Link>

                      {/* Dropdown Menu for Experience Sub-Categories (Pure White Background, Brown Text, No Descriptions) */}
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[275px] transition-all duration-200 ease-out z-50 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-hover:visible ${
                          experienceDropdownOpen
                            ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                            : 'opacity-0 -translate-y-1 pointer-events-none invisible'
                        }`}
                      >
                        <div className="py-2 px-1.5 bg-white border border-[#7C402E]/25 shadow-[0_16px_36px_rgba(45,25,18,0.16)]">
                          <div className="flex flex-col">
                            {experienceSubCategories.map((sub) => (
                              <Link
                                key={sub.id}
                                href={sub.href}
                                onClick={() => setExperienceDropdownOpen(false)}
                                className="group flex items-center justify-between px-3.5 py-2.5 text-[#4E2418] hover:text-[#84382B] hover:bg-[#7C402E]/8 transition-all duration-150 no-underline"
                              >
                                <span className="font-urbanist text-[14px] font-medium tracking-[0.02em]">
                                  {sub.shortTitle}
                                </span>
                                <ArrowRight
                                  size={13}
                                  className="text-[#84382B] opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150 shrink-0 ml-2"
                                />
                              </Link>
                            ))}
                          </div>
                          <div className="mt-1 pt-1.5 border-t border-[#7C402E]/15 px-3.5 pb-1">
                            <Link
                              href="/experiences"
                              onClick={() => setExperienceDropdownOpen(false)}
                              className="text-[10px] uppercase font-sans font-semibold tracking-[0.16em] text-[#84382B] hover:text-[#4E2418] inline-flex items-center gap-1 transition-colors"
                            >
                              <span>Explore All Experiences</span>
                              <ArrowRight size={11} />
                            </Link>
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
                    className={`font-sans text-[11px] uppercase tracking-[0.16em] no-underline whitespace-nowrap py-1.5 px-1 transition-all duration-200 max-[1080px]:text-[10.5px] max-[1080px]:tracking-[0.12em] ${
                      isActive
                        ? isLightHeader
                          ? 'text-[#84382B] font-bold'
                          : 'text-white font-bold'
                        : isLightHeader
                        ? 'text-[#4E2418]/70 hover:text-[#4E2418] font-normal'
                        : 'text-white/75 hover:text-white font-normal'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Right Corner: Book Now Option */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setBooking(true)}
                className={`font-sans text-[10.5px] tracking-[0.18em] uppercase font-semibold px-4 py-2 border transition-all duration-200 cursor-pointer active:scale-95 ${
                  isLightHeader
                    ? 'border-[#7C402E] text-[#7C402E] hover:bg-[#7C402E] hover:text-white'
                    : 'border-white/90 text-white hover:bg-white hover:text-ink'
                }`}
              >
                BOOK NOW
              </button>
            </div>
          </nav>

          {/* Mobile & Tablet navigation (< 961px) - Corner Full Logo & Corner Actions */}
          <nav
            className="flex min-[961px]:hidden items-center justify-between py-2.5 w-full box-border"
            aria-label="Mobile primary navigation"
          >
            {/* Left Corner: Full Brand Logo */}
            <Link
              href="/"
              aria-label="IDANAZHI Farm Stay"
              className="flex items-center shrink-0 transition-transform duration-200 active:scale-95 no-underline py-0.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <img
                src="/images/weddings/logo/idanazhi_farm_stay_logo.svg"
                alt="IDANAZHI Farm Stay"
                className={`h-7 sm:h-8 w-auto max-w-[145px] sm:max-w-[165px] object-contain transition-all duration-300 ${
                  isLightHeader ? '' : 'brightness-0 invert'
                }`}
              />
            </Link>

            {/* Right Corner: Book Now button + Hamburger Button */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setBooking(true)}
                className={`font-sans text-[9px] sm:text-[10px] tracking-[0.16em] uppercase font-semibold px-2.5 py-1.5 border transition-all duration-200 cursor-pointer active:scale-95 ${
                  isLightHeader
                    ? 'border-[#7C402E] text-[#7C402E] hover:bg-[#7C402E] hover:text-white'
                    : 'border-white/80 text-white hover:bg-white hover:text-ink'
                }`}
              >
                BOOK NOW
              </button>
              <button
                type="button"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-drawer"
                onClick={() => setMobileMenuOpen(true)}
                className={`group inline-flex items-center p-1.5 -mr-1.5 bg-transparent border-0 cursor-pointer transition-all duration-200 active:scale-95 ${
                  isLightHeader ? 'text-ink' : 'text-white'
                }`}
              >
                <span className="flex flex-col justify-center items-start w-5 h-4 gap-[4.5px]" aria-hidden="true">
                  <span
                    className={`block h-[1.75px] w-5 rounded-full transition-all duration-300 ease-out ${
                      isLightHeader ? 'bg-[#7C402E]' : 'bg-white'
                    }`}
                  />
                  <span
                    className={`block h-[1.75px] w-3.5 rounded-full transition-all duration-300 ease-out group-hover:w-5 ${
                      isLightHeader ? 'bg-[#7C402E]' : 'bg-white'
                    }`}
                  />
                  <span
                    className={`block h-[1.75px] w-4.5 rounded-full transition-all duration-300 ease-out group-hover:w-5 ${
                      isLightHeader ? 'bg-[#7C402E]' : 'bg-white'
                    }`}
                  />
                </span>
                <span className="sr-only">Menu</span>
              </button>
            </div>
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
          {/* Top Bar: Full Logo (Left) | Close X (Right) */}
          <div className="h-[68px] sm:h-[76px] px-6 max-[480px]:px-5 flex items-center justify-between shrink-0 border-b border-line/20 bg-paper sticky top-0 z-20">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center transition-opacity hover:opacity-80"
              aria-label="IDANAZHI Farm Stay"
            >
              <img
                src="/images/weddings/logo/idanazhi_farm_stay_logo.svg"
                alt="IDANAZHI Farm Stay"
                className="h-8 sm:h-9 w-auto max-w-[165px] object-contain"
              />
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

          {/* Navigation Items List - Main Tabs: Stay, Experience (with subcategories), Events, Business Model */}
          <div className="flex-1 px-8 max-[480px]:px-6 pt-6 sm:pt-8 pb-10 flex flex-col justify-start">
            <nav className="flex flex-col gap-1 sm:gap-1.5" aria-label="Mobile Navigation Links">
              {mainNavLinks.map((item) => {
                const isActive = currentIndicatorOption === item.label;
                const hasSubCategories = Boolean(item.subCategories && item.subCategories.length > 0);

                if (hasSubCategories) {
                  return (
                    <div key={item.label} className="w-full flex flex-col border-b border-line/15 pb-2">
                      <div className="w-full flex items-center justify-between py-2 sm:py-2.5">
                        <Link
                          href={item.href}
                          onClick={() => {
                            setSelectedOption(item.label);
                            setMobileMenuOpen(false);
                          }}
                          className={`font-urbanist text-[22px] sm:text-[24px] leading-[1.35] tracking-[0.035em] transition-all duration-300 no-underline ${
                            isActive
                              ? 'text-[#84382B] font-medium'
                              : 'text-[#5C2E20]/80 font-light hover:text-[#3E1A10]'
                          }`}
                        >
                          {item.title}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileExpExpanded(!mobileExpExpanded)}
                          className="p-2 text-[#4E2418] bg-transparent border-0 cursor-pointer flex items-center gap-1 text-[11px] uppercase tracking-[0.14em]"
                          aria-label={mobileExpExpanded ? 'Collapse sub-categories' : 'Expand sub-categories'}
                        >
                          <span className="text-[10px] text-muted">Sub-categories</span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${
                              mobileExpExpanded ? 'rotate-180 text-[#84382B]' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Expandable Sub-Categories */}
                      <div
                        className={`flex flex-col gap-2 pl-3 pt-1 border-l-2 border-[#84382B]/30 transition-all duration-300 ${
                          mobileExpExpanded ? 'block' : 'hidden'
                        }`}
                      >
                        {experienceSubCategories.map((sub) => (
                          <Link
                            key={sub.id}
                            href={sub.href}
                            onClick={() => {
                              setSelectedOption('EXPERIENCE');
                              setMobileMenuOpen(false);
                            }}
                            className="font-urbanist text-[15px] sm:text-[16px] text-[#4E2418]/85 hover:text-[#84382B] py-1 transition-colors flex items-center justify-between no-underline"
                          >
                            <span>{sub.shortTitle}</span>
                            <ArrowRight size={13} className="text-[#84382B] opacity-60" />
                          </Link>
                        ))}
                        <Link
                          href="/experiences"
                          onClick={() => {
                            setSelectedOption('EXPERIENCE');
                            setMobileMenuOpen(false);
                          }}
                          className="text-[11px] uppercase font-sans font-semibold tracking-[0.16em] text-[#84382B] pt-1"
                        >
                          View All Experiences →
                        </Link>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={item.label}
                    className="w-full flex items-center justify-between text-left py-2.5 sm:py-3 group/item cursor-pointer border-b border-line/10"
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
                      className={`font-urbanist text-[22px] sm:text-[24px] leading-[1.35] tracking-[0.035em] transition-all duration-300 no-underline ${
                        isActive
                          ? 'text-[#84382B] font-medium translate-x-1'
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
                  <p className="m-0 text-[13.5px] text-muted leading-[1.4]">IDANAZHI, Kumbidi, Kerala, India</p>
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
                  <strong className="block text-[11px] uppercase tracking-[0.12em] mb-[3px] text-ink">Email</strong>
                  <a href="mailto:concierge@idanazhi.com" className="m-0 text-[13.5px] text-muted leading-[1.4] transition-colors duration-200 ease-in-out hover:text-ink">concierge@idanazhi.com</a>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-3.5 bg-[#4E2418] text-white font-sans text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 ease-in-out hover:bg-[#84382B] cursor-pointer"
              onClick={() => {
                setContactOpen(false);
                setBooking(true);
              }}
            >
              REQUEST A CALL BACK
            </button>
          </div>
        </div>
      )}

      {/* Booking Dialog Modal */}
      {booking && (
        <BookingPanel
          close={() => setBooking(false)}
        />
      )}

      {/* Experience Details Modal if triggered */}
      {selectedExperience && (
        <ExperienceModal
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
          onBookNow={() => {
            setSelectedExperience(null);
            setBooking(true);
          }}
        />
      )}
    </>
  );
}
