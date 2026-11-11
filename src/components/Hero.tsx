import React from 'react';
import { SCHOOL_INFO, SCHOOL_STATS, PRINCIPAL_MESSAGE } from '../data/schoolData';
import { Sparkles, ArrowRight, BookOpen, Award, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';

interface HeroProps {
  onOpenAdmission: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAdmission }) => {
  return (
    <section className="relative bg-emerald-950 text-white overflow-hidden">
      {/* Decorative Islamic Geometric Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, #fde047 2%, transparent 0%), radial-gradient(circle at 75px 75px, #fde047 2%, transparent 0%)`,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Hero Banner Grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Text & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Arabic Motto Calligraphy Bar */}
            <div className="inline-flex items-center gap-3 bg-emerald-900/80 border border-emerald-700/60 rounded-full px-4 py-1.5 backdrop-blur-sm">
              <span className="font-serif text-amber-300 text-sm font-bold tracking-wide">
                {SCHOOL_INFO.arabicMotto}
              </span>
              <span className="text-emerald-400 text-xs">·</span>
              <span className="text-emerald-100 text-xs font-medium">
                {SCHOOL_INFO.mottoTranslation}
              </span>
            </div>

            {/* School Title & Welcome */}
            <div className="space-y-3">
              <div className="text-xs uppercase font-bold tracking-widest text-amber-400">
                Welcome to Islamia Model School Wadala
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-tight">
                Islamia Model <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400">
                  School Wadala
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-emerald-100 font-serif italic">
                "{SCHOOL_INFO.tagline}"
              </p>
            </div>

            {/* Introduction Paragraph */}
            <p className="text-sm sm:text-base text-emerald-200/90 leading-relaxed max-w-2xl">
              Nurturing enlightened minds and exemplary character in Wadala, Punjab.
              We provide state-of-the-art modern scientific, linguistic, and technological education
              deeply rooted in Quranic morals, Sunnah traditions, and personal discipline.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenAdmission}
                className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#about"
                className="px-6 py-3.5 bg-emerald-900/60 hover:bg-emerald-800/80 text-white font-semibold text-sm uppercase tracking-wider rounded-xl border border-emerald-700/80 backdrop-blur-sm transition flex items-center gap-2"
              >
                <span>Explore Our School</span>
              </a>
            </div>

            {/* Key Trust Highlights */}
            <div className="pt-4 border-t border-emerald-900/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-emerald-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>BISE Affiliated</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Nazra & Tajweed Quran</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>STEM & Science Labs</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero School Visual (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Outer Golden Glow Border */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500/40 via-emerald-500/30 to-amber-300/40 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-500"></div>

              {/* Main School Building Photograph */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-emerald-700/60 bg-emerald-900">
                <img
                  src="/images/hero-building.jpg"
                  alt="Islamia Model School Wadala Campus Building"
                  className="w-full h-[360px] sm:h-[420px] object-cover transform group-hover:scale-105 transition duration-700"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-transparent to-black/20" />

                {/* Floating Admission Open Tag */}
                <div className="absolute top-4 right-4 bg-amber-400 text-slate-950 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>Admissions Open 2026-27</span>
                </div>

                {/* Bottom Photo Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300 block">
                    Campus Landmark
                  </span>
                  <p className="text-xs text-emerald-100 font-medium">
                    Islamia Model School Wadala — Purpose-built educational campus with spacious grounds and modern facilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* School Statistics Section Strip */}
        <div className="mt-14 pt-10 border-t border-emerald-900/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {SCHOOL_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="bg-emerald-900/40 border border-emerald-800/60 rounded-xl p-5 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="text-2xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-emerald-200/80 mt-1 leading-snug">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Principal's Welcome Message Card */}
        <div className="mt-12 bg-white text-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl border border-stone-200">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Principal Photo */}
            <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center text-center">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-md border-2 border-emerald-800">
                <img
                  src={PRINCIPAL_MESSAGE.image}
                  alt={PRINCIPAL_MESSAGE.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-3">
                <h2 className="text-base font-bold text-emerald-950 font-serif">
                  {PRINCIPAL_MESSAGE.name}
                </h2>
                <span className="text-xs font-semibold text-emerald-800 block">
                  {PRINCIPAL_MESSAGE.designation}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  {PRINCIPAL_MESSAGE.qualification}
                </span>
              </div>
            </div>

            {/* Principal Message Prose */}
            <div className="md:col-span-8 lg:col-span-9 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Principal's Welcome Address</span>
              </div>
              <blockquote className="border-l-4 border-amber-500 pl-4 py-1 italic font-serif text-sm sm:text-base text-slate-800 leading-relaxed bg-amber-50/50 rounded-r-lg">
                "{PRINCIPAL_MESSAGE.quote}"
              </blockquote>
              <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {PRINCIPAL_MESSAGE.messageParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
