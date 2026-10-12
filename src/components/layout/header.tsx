'use client';

import Link from 'next/link';
import { CircleUserRound, X, ChevronRight, Phone, Mail, MapPin, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { RafflesLogo } from '@/components/layout/raffles-logo';
import { BookingPanel } from '@/components/sections/booking-panel';

const navLinks = [
  { label: 'ABOUT', href: '/#about' },
  { label: 'ROOMS & SUITES', href: '/singapore/#stay' },
  { label: 'LAKESHORE ACCOMODATION', href: '/singapore/#stay' },
  { label: 'DINING', href: '/singapore/#dining' },
  { label: 'WELLNESS', href: '/singapore/experiences/#wellness' },
  { label: 'EXPERIENCES', href: '/singapore/experiences/' },
  { label: 'CELEBRATION', href: '/hotels-resorts/#celebration' },
  { label: 'OFFERS', href: '/hotels-resorts/' },
  { label: 'GALLERY', href: '/singapore/#story' },
  { label: 'GIFT CARD', href: '/hotels-resorts/' },
];

const menuDestinations = [
  'Singapore',
  'Dubai',
  'Udaipur',
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
  { name: 'Raffles 1887 Heritage', href: '/singapore/' },
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
  const [accountOpen, setAccountOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [accountTab, setAccountTab] = useState<'signin' | 'join'>('signin');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const isAnyModalOpen = menu || booking || contactOpen || accountOpen || langOpen;
    document.body.style.overflow = isAnyModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menu, booking, contactOpen, accountOpen, langOpen]);

  return (
    <>
      <header className={`site-header ${scrolled ? 'header-solid' : ''}`}>
        <div className="header-container">
          {/* TOP ROW */}
          <div className="header-top-row">
            {/* Left: Two-line Hamburger Button */}
            <div className="header-top-left">
              <button
                type="button"
                aria-label="Open navigation menu"
                className="nav-hamburger-btn"
                onClick={() => setMenu(true)}
              >
                <span className="hamburger-line" />
                <span className="hamburger-line" />
              </button>
            </div>

            {/* Center: Raffles Emblem, Wordmark, and Udaipur Subtext */}
            <div className="header-top-center">
              <Link href="/" className="header-brand" aria-label="Raffles Udaipur Home">
                <RafflesLogo className="brand-crest-svg" />
                <span className="brand-location">UDAIPUR</span>
              </Link>
            </div>

            {/* Right: Language, Contact, and Account with User Icon */}
            <div className="header-top-right">
              <div className="header-utilities">
                <button
                  type="button"
                  className="utility-btn"
                  aria-label="Select language"
                  onClick={() => setLangOpen(true)}
                >
                  {currentLang}
                </button>
                <button
                  type="button"
                  className="utility-btn"
                  onClick={() => setContactOpen(true)}
                >
                  Contact
                </button>
                <button
                  type="button"
                  className="utility-btn utility-account"
                  onClick={() => setAccountOpen(true)}
                >
                  <CircleUserRound size={17} strokeWidth={1.4} className="account-icon" />
                  <span>Account</span>
                </button>
              </div>
            </div>
          </div>

          {/* THIN HORIZONTAL DIVIDER */}
          <div className="header-divider" />

          {/* BOTTOM ROW (PRIMARY NAVIGATION LINKS) */}
          <nav className="header-bottom-row" aria-label="Primary navigation">
            {navLinks.map((item) => (
              <Link key={item.label} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* FULL-SCREEN NAVIGATION OVERLAY (HAMBURGER DRAWER) */}
      {menu && (
        <div className="menu-overlay" role="dialog" aria-modal="true" aria-label="Main navigation">
          <div className="menu-head">
            <button
              type="button"
              aria-label="Close menu"
              className="modal-close-btn"
              onClick={() => setMenu(false)}
            >
              <X size={22} />
            </button>
            <Link href="/" className="header-brand dark" onClick={() => setMenu(false)}>
              <RafflesLogo className="brand-crest-svg" />
              <span className="brand-location">UDAIPUR</span>
            </Link>
            <button
              type="button"
              className="rates-button"
              onClick={() => {
                setMenu(false);
                setBooking(true);
              }}
            >
              CHECK RATES
            </button>
          </div>

          <div className="menu-content">
            <div>
              <p className="eyebrow">DESTINATIONS</p>
              <div className="destination-list">
                {menuDestinations.map((place) => (
                  <Link
                    key={place}
                    href={
                      place === 'Singapore'
                        ? '/singapore/'
                        : place === 'Dubai'
                        ? '/dubai/'
                        : place === 'Udaipur'
                        ? '/'
                        : '/hotels-resorts/'
                    }
                    onClick={() => setMenu(false)}
                  >
                    <span>{place}</span>
                    <ChevronRight size={18} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="menu-secondary-col">
              <p className="eyebrow">EXPLORE RAFFLES</p>
              <div className="menu-links">
                {menuLinks.map((link) => (
                  <Link key={link.name} href={link.href} onClick={() => setMenu(false)}>
                    {link.name}
                  </Link>
                ))}
                <button
                  type="button"
                  className="menu-text-action"
                  onClick={() => {
                    setMenu(false);
                    setContactOpen(true);
                  }}
                >
                  Contact Concierge
                </button>
                <button
                  type="button"
                  className="menu-text-action"
                  onClick={() => {
                    setMenu(false);
                    setAccountOpen(true);
                  }}
                >
                  ALL Loyalty &amp; Account
                </button>
              </div>

              <div className="menu-cta-wrap">
                <button
                  type="button"
                  className="button dark-btn"
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

      {/* CONTACT MODAL */}
      {contactOpen && (
        <div className="custom-modal-overlay" role="dialog" aria-modal="true" aria-label="Contact Raffles">
          <div className="custom-modal-card">
            <button
              type="button"
              className="custom-modal-close"
              aria-label="Close contact dialog"
              onClick={() => setContactOpen(false)}
            >
              <X size={20} />
            </button>

            <div className="modal-brand-header">
              <RafflesLogo className="brand-crest-svg" />
              <span className="brand-location">UDAIPUR</span>
            </div>

            <p className="eyebrow text-center">WE ARE HERE FOR YOU</p>
            <h2 className="modal-title">At Your Service</h2>
            <p className="modal-description">
              Allow our legendary butlers and dedicated concierge team to curate every detail of your sanctuary on Lake Udaisagar.
            </p>

            <div className="contact-info-list">
              <div className="contact-item">
                <MapPin size={17} className="contact-icon" />
                <div>
                  <strong>Address</strong>
                  <p>Raffles Udaipur, Lake Udaisagar, Udaipur, Rajasthan 313024, India</p>
                </div>
              </div>
              <div className="contact-item">
                <Phone size={17} className="contact-icon" />
                <div>
                  <strong>Telephone</strong>
                  <a href="tel:+912942779000">+91 294 277 9000</a>
                </div>
              </div>
              <div className="contact-item">
                <Mail size={17} className="contact-icon" />
                <div>
                  <strong>Email Concierge</strong>
                  <a href="mailto:udaipur@raffles.com">udaipur@raffles.com</a>
                </div>
              </div>
            </div>

            <div className="modal-actions-row">
              <a href="mailto:udaipur@raffles.com" className="button dark-btn modal-submit-btn">
                SEND AN INQUIRY
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ACCOUNT / ALL ACCOR MODAL */}
      {accountOpen && (
        <div className="custom-modal-overlay" role="dialog" aria-modal="true" aria-label="Account Login">
          <div className="custom-modal-card">
            <button
              type="button"
              className="custom-modal-close"
              aria-label="Close account dialog"
              onClick={() => setAccountOpen(false)}
            >
              <X size={20} />
            </button>

            <div className="modal-brand-header">
              <RafflesLogo className="brand-crest-svg" />
              <span className="brand-location">UDAIPUR</span>
            </div>

            <p className="eyebrow text-center">ALL — ACCOR LIVE LIMITLESS</p>
            <h2 className="modal-title">
              {accountTab === 'signin' ? 'Welcome Back' : 'Join For Free'}
            </h2>

            <div className="account-tab-switcher">
              <button
                type="button"
                className={`tab-btn ${accountTab === 'signin' ? 'active' : ''}`}
                onClick={() => setAccountTab('signin')}
              >
                SIGN IN
              </button>
              <button
                type="button"
                className={`tab-btn ${accountTab === 'join' ? 'active' : ''}`}
                onClick={() => setAccountTab('join')}
              >
                JOIN ALL ACCOR
              </button>
            </div>

            {accountTab === 'signin' ? (
              <form className="modal-form" onSubmit={(e) => { e.preventDefault(); setAccountOpen(false); }}>
                <label>
                  <span>Email or Member Card Number</span>
                  <input type="text" placeholder="name@example.com" required />
                </label>
                <label>
                  <span>Password</span>
                  <input type="password" placeholder="••••••••" required />
                </label>
                <button type="submit" className="button dark-btn modal-submit-btn">
                  SIGN IN
                </button>
                <p className="modal-subtext">
                  Member rates, bespoke upgrades, and limitless hospitality experiences across the globe.
                </p>
              </form>
            ) : (
              <form className="modal-form" onSubmit={(e) => { e.preventDefault(); setAccountOpen(false); }}>
                <label>
                  <span>First Name</span>
                  <input type="text" placeholder="First Name" required />
                </label>
                <label>
                  <span>Last Name</span>
                  <input type="text" placeholder="Last Name" required />
                </label>
                <label>
                  <span>Email Address</span>
                  <input type="email" placeholder="name@example.com" required />
                </label>
                <button type="submit" className="button dark-btn modal-submit-btn">
                  CREATE ACCOUNT &amp; JOIN ALL
                </button>
                <p className="modal-subtext">
                  By joining, you agree to the ALL Accor Terms of Membership and Privacy Policy.
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* LANGUAGE SELECTOR MODAL */}
      {langOpen && (
        <div className="custom-modal-overlay" role="dialog" aria-modal="true" aria-label="Select Language">
          <div className="custom-modal-card lang-modal-card">
            <button
              type="button"
              className="custom-modal-close"
              aria-label="Close language selector"
              onClick={() => setLangOpen(false)}
            >
              <X size={20} />
            </button>

            <p className="eyebrow text-center">GLOBAL PREFERENCES</p>
            <h2 className="modal-title">Select Language</h2>

            <div className="lang-list">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  className={`lang-option ${currentLang === l.code ? 'active' : ''}`}
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

      {/* BOOKING PANEL */}
      {booking && <BookingPanel close={() => setBooking(false)} />}
    </>
  );
}
