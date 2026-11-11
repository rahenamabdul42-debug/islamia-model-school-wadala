import React from 'react';
import { SchoolLogo } from './SchoolLogo';
import { SCHOOL_INFO, ACADEMIC_PROGRAMS } from '../data/schoolData';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Heart,
  ExternalLink,
  ChevronRight,
  Database,
} from 'lucide-react';

interface FooterProps {
  onOpenAdmission: () => void;
  onOpenSupabaseConfig: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmission,
  onOpenSupabaseConfig,
}) => {
  return (
    <footer className="bg-emerald-950 text-white border-t border-emerald-900">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Logo Lockup (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <SchoolLogo size={52} light />
              <div className="flex flex-col">
                <span className="font-serif font-black tracking-tight text-white text-base leading-tight">
                  ISLAMIA MODEL SCHOOL
                </span>
                <span className="text-[11px] font-bold text-amber-300 tracking-widest uppercase">
                  WADALA • PUNJAB
                </span>
              </div>
            </div>

            <p className="text-xs text-emerald-200/90 leading-relaxed font-serif">
              "{SCHOOL_INFO.tagline}"
            </p>

            <p className="text-xs text-emerald-300/80 leading-relaxed">
              Providing holistic modern English-medium schooling blended with rigorous Islamic ethics (Akhlaq), Quranic Tajweed, and character building since 2001 in Wadala, Punjab, Pakistan.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs">
              <button
                onClick={onOpenSupabaseConfig}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-amber-300 border border-emerald-700/60 transition"
              >
                <Database className="w-3.5 h-3.5" />
                <span>Supabase Database Settings</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-amber-300 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-emerald-200">
              <li>
                <a href="#about" className="hover:text-white transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>About Our School</span>
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-white transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>Academic Programs</span>
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-white transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>School Facilities</span>
                </a>
              </li>
              <li>
                <a href="#islamic-education" className="hover:text-white transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>Islamic Education</span>
                </a>
              </li>
              <li>
                <a href="#faculty" className="hover:text-white transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>Faculty & Mentors</span>
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>Photo Gallery</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>Contact Information</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Levels (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-amber-300 uppercase tracking-wider">
              Academic Programs
            </h4>
            <ul className="space-y-2 text-emerald-200">
              {ACADEMIC_PROGRAMS.map((prog) => (
                <li key={prog.id}>
                  <button
                    onClick={onOpenAdmission}
                    className="hover:text-white transition text-left flex items-center gap-1 text-emerald-200"
                  >
                    <ChevronRight className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{prog.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Socials (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-amber-300 uppercase tracking-wider">
              Contact & Location
            </h4>
            <div className="space-y-2 text-emerald-200">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{SCHOOL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${SCHOOL_INFO.phone}`} className="hover:text-white font-mono">
                  {SCHOOL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-white truncate">
                  {SCHOOL_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${SCHOOL_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:text-white font-medium"
                >
                  WhatsApp: {SCHOOL_INFO.whatsappDisplay}
                </a>
              </div>
            </div>

            {/* Social Media Link Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-emerald-900/90 hover:bg-emerald-800 text-emerald-100 rounded text-[11px] border border-emerald-700/60 transition"
              >
                Facebook
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-emerald-900/90 hover:bg-emerald-800 text-emerald-100 rounded text-[11px] border border-emerald-700/60 transition"
              >
                YouTube
              </a>
              <a
                href={`https://wa.me/${SCHOOL_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-emerald-900/90 hover:bg-emerald-800 text-emerald-100 rounded text-[11px] border border-emerald-700/60 transition"
              >
                WhatsApp Channel
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="bg-emerald-950/90 border-t border-emerald-900 py-6 px-4 sm:px-8 text-center text-xs text-emerald-300/70">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            © {new Date().getFullYear()} {SCHOOL_INFO.name}. All Rights Reserved. Wadala, Punjab, Pakistan.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>BISE Affiliated</span>
            <span>·</span>
            <span>Punjab Education Department</span>
            <span>·</span>
            <span>Quality with Values</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
