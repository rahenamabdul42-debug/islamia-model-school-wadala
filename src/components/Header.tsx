import React, { useState, useEffect } from 'react';
import { SchoolLogo } from './SchoolLogo';
import { Phone, MessageCircle, Menu, X, Database, CheckCircle2, AlertCircle } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { checkSupabaseStatus } from '../lib/supabase';

interface HeaderProps {
  onOpenAdmission: () => void;
  onOpenSupabaseConfig: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAdmission,
  onOpenSupabaseConfig,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [supabaseConnected, setSupabaseConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    checkSupabaseStatus().then((res) => {
      setSupabaseConnected(res.connected);
    });
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Academics', href: '#academics' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Islamic Education', href: '#islamic-education' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Faculty', href: '#faculty' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Utility Announcement Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 sm:px-8 border-b border-emerald-900/60 font-sans">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Admissions Open 2026–2027
            </span>
            <span className="hidden md:inline text-emerald-400/80">·</span>
            <span className="hidden md:inline text-emerald-200">
              Wadala, Punjab, Pakistan
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            {/* Supabase status badge button */}
            <button
              onClick={onOpenSupabaseConfig}
              title="Click to view Supabase database connection details"
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50 transition cursor-pointer"
            >
              <Database className="w-3 h-3 text-amber-300" />
              <span className="hidden sm:inline">Database:</span>
              {supabaseConnected ? (
                <span className="text-emerald-300 font-semibold flex items-center gap-1">
                  Supabase Live <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                </span>
              ) : (
                <span className="text-amber-200 font-medium">Local / Config</span>
              )}
            </button>

            {/* WhatsApp Link */}
            <a
              href={`https://wa.me/${SCHOOL_INFO.whatsapp}?text=Assalamu%20Alaikum,%20I%20would%20like%20to%20inquire%20about%20admissions%20at%20Islamia%20Model%20School%20Wadala.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-200 hover:text-white transition"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">WhatsApp:</span>
              <span className="font-mono text-[11px]">{SCHOOL_INFO.whatsappDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 bg-white/95 backdrop-blur-md border-b ${
          isScrolled ? 'border-emerald-900/15 shadow-md py-2.5' : 'border-stone-200 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single Brand Wordmark / Emblem Lockup */}
          <a
            href="/"
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus:outline-none"
            aria-label="Islamia Model School Wadala Home"
          >
            <SchoolLogo size={46} />
            <div className="flex flex-col">
              <span className="font-serif font-black tracking-tight text-emerald-950 text-base sm:text-lg leading-tight group-hover:text-emerald-800 transition">
                ISLAMIA MODEL SCHOOL
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-amber-700 tracking-widest uppercase">
                Wadala • Punjab
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Clean typography with hover underlines) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs font-semibold text-slate-700 tracking-wide uppercase">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-emerald-800 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-700 hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAdmission}
              className="px-4 sm:px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 whitespace-nowrap shrink-0 border border-emerald-700 flex items-center gap-1.5"
            >
              <span>Apply for Admission</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-emerald-900 hover:bg-stone-100 rounded-lg transition"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-5 shadow-xl animate-fadeIn">
            <nav className="flex flex-col space-y-3 text-sm font-semibold text-slate-800">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg hover:bg-emerald-50 hover:text-emerald-900 transition flex items-center justify-between"
                >
                  <span>{link.label}</span>
                </a>
              ))}
              <div className="pt-3 border-t border-stone-200 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmission();
                  }}
                  className="w-full py-3 text-center text-xs font-bold tracking-wider uppercase text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow transition"
                >
                  Apply for Admission
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSupabaseConfig();
                  }}
                  className="w-full py-2 text-center text-xs font-medium text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition"
                >
                  Configure Supabase Cloud Database
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
