import React from 'react';
import { ISLAMIC_EDUCATION_PILLARS, DAILY_DUA_OF_THE_WEEK } from '../data/schoolData';
import { BookOpen, Moon, Heart, Sparkles, CheckCircle2, Award } from 'lucide-react';

export const IslamicEducationSection: React.FC = () => {
  return (
    <section id="islamic-education" className="py-20 bg-emerald-950 text-white relative overflow-hidden">
      {/* Subtle Islamic Motif Background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, #fde047 2px, transparent 0%)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300 bg-emerald-900/90 border border-emerald-700/60 px-4 py-1.5 rounded-full mb-3 backdrop-blur-sm">
            <Moon className="w-3.5 h-3.5 text-amber-300" />
            <span>Spiritual & Moral Core</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
            Islamic Education & Character Building
          </h2>
          <p className="mt-3 text-sm sm:text-base text-emerald-200/90 leading-relaxed font-serif">
            "The best of you are those who learn the Quran and teach it." — Prophetic Tradition
          </p>
        </div>

        {/* Highlighted Dua / Hadith of the Week Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 border border-amber-400/40 rounded-3xl p-6 sm:p-8 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Daily Supplication of the Week (روزمرہ دعا)</span>
              </div>

              {/* Arabic Calligraphy Display */}
              <div className="font-serif text-2xl sm:text-3xl text-amber-200 font-bold tracking-wide text-right sm:text-left leading-relaxed">
                {DAILY_DUA_OF_THE_WEEK.arabic}
              </div>

              <div className="text-xs text-emerald-200 italic font-mono">
                {DAILY_DUA_OF_THE_WEEK.transliteration}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs text-emerald-100">
                <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-700/50">
                  <span className="text-[10px] text-amber-300 block font-bold uppercase">English Translation:</span>
                  <p className="mt-0.5">{DAILY_DUA_OF_THE_WEEK.english}</p>
                </div>
                <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-700/50 text-right">
                  <span className="text-[10px] text-amber-300 block font-bold uppercase">اردو ترجمہ:</span>
                  <p className="mt-0.5 font-serif text-sm">{DAILY_DUA_OF_THE_WEEK.urdu}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-emerald-950/80 rounded-2xl border border-emerald-700/60 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center mb-2">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Daily Hifz & Nazra Class
              </span>
              <p className="text-[11px] text-emerald-300 mt-1">
                Every student spends 40 minutes each morning in dedicated Quran recitation with correct Tajweed rules.
              </p>
            </div>
          </div>
        </div>

        {/* 6 Islamic Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {ISLAMIC_EDUCATION_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-emerald-900/60 border border-emerald-800/80 hover:border-amber-400/60 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl backdrop-blur-sm group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 font-serif">
                    {pillar.urduTitle}
                  </span>
                  <span className="text-xs font-mono text-emerald-400">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-serif text-white group-hover:text-amber-200 transition">
                  {pillar.title}
                </h3>

                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-emerald-800/60 text-[11px] text-amber-300/90 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{pillar.details}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Showcase: Photo of Islamic Class */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-emerald-900/40 rounded-3xl p-6 sm:p-8 border border-emerald-800/60">
          <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-xl border border-emerald-700/60">
            <img
              src="/images/islamic-class.jpg"
              alt="Quran Nazra class at Islamia Model School Wadala"
              className="w-full h-72 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Award className="w-4 h-4" />
              <span>Certified Tajweed Faculty</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">
              Nurturing Akhlaq, Cleanliness & Punctual Salah
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
              At Islamia Model School Wadala, Islamic studies are living practices.
              Students offer daily Zuhr prayers in congregation, practice Sunnah dining etiquette,
              and participate in annual Seerah and Naat competitions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-emerald-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Daily Congregational Zuhr Prayer</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Separate Qaris for Boys & Girls</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Practical Wudu & Taharah Drills</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Weekly Friday Ethics Khutbah</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
