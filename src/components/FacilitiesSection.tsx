import React, { useState } from 'react';
import { SCHOOL_FACILITIES } from '../data/schoolData';
import { Facility } from '../types';
import {
  Building2,
  FlaskConical,
  Monitor,
  BookOpen,
  Trophy,
  GraduationCap,
  Droplets,
  ShieldCheck,
  Moon,
  CheckCircle,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-5 h-5 text-emerald-700" />,
  FlaskConical: <FlaskConical className="w-5 h-5 text-emerald-700" />,
  Monitor: <Monitor className="w-5 h-5 text-emerald-700" />,
  BookOpen: <BookOpen className="w-5 h-5 text-emerald-700" />,
  Trophy: <Trophy className="w-5 h-5 text-emerald-700" />,
  GraduationCap: <GraduationCap className="w-5 h-5 text-emerald-700" />,
  Droplets: <Droplets className="w-5 h-5 text-emerald-700" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-700" />,
  Moon: <Moon className="w-5 h-5 text-emerald-700" />,
};

export const FacilitiesSection: React.FC = () => {
  const [activeFacility, setActiveFacility] = useState<Facility>(SCHOOL_FACILITIES[0]);

  return (
    <section id="facilities" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full mb-3">
            <span>Campus Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-emerald-950 tracking-tight">
            Purpose-Built Facilities for 21st-Century Learning
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Our campus in Wadala provides modern labs, purified drinking water, full security, expansive sports grounds, and serene prayer spaces.
          </p>
        </div>

        {/* Featured Facility Spotlight Banner */}
        <div className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-lg mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Image Showcase (7 cols) */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[320px] bg-stone-900">
              <img
                src={activeFacility.image}
                alt={activeFacility.title}
                className="w-full h-full object-cover transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 text-white lg:hidden">
                <span className="text-xs uppercase font-bold text-amber-300">
                  {activeFacility.subtitle}
                </span>
                <h3 className="text-xl font-bold">{activeFacility.title}</h3>
              </div>
            </div>

            {/* Content Details (5 cols) */}
            <div className="lg:col-span-5 p-8 lg:p-10 space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  {iconMap[activeFacility.icon] || <Building2 className="w-5 h-5 text-emerald-700" />}
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                    {activeFacility.subtitle}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-emerald-950">
                    {activeFacility.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeFacility.description}
              </p>

              {/* Feature Points */}
              <div className="space-y-2.5 pt-2 border-t border-stone-200">
                {activeFacility.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 hover:text-emerald-950 underline"
                >
                  Schedule a Campus Tour in Wadala
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 9 Facility Selection Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SCHOOL_FACILITIES.map((facility) => {
            const isSelected = activeFacility.id === facility.id;
            return (
              <button
                key={facility.id}
                onClick={() => setActiveFacility(facility)}
                className={`text-left rounded-2xl p-5 border transition-all duration-200 flex items-start gap-4 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-900 text-white border-emerald-800 shadow-md ring-2 ring-amber-400/50'
                    : 'bg-white hover:bg-emerald-50/50 text-slate-800 border-stone-200 shadow-sm'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center ${
                    isSelected ? 'bg-emerald-800 text-amber-300' : 'bg-emerald-50 text-emerald-800'
                  }`}
                >
                  {iconMap[facility.icon] || <Building2 className="w-5 h-5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider block truncate ${
                      isSelected ? 'text-amber-300' : 'text-emerald-700'
                    }`}
                  >
                    {facility.subtitle}
                  </span>
                  <h4
                    className={`text-base font-bold font-serif truncate mt-0.5 ${
                      isSelected ? 'text-white' : 'text-emerald-950'
                    }`}
                  >
                    {facility.title}
                  </h4>
                  <p
                    className={`text-xs mt-1 line-clamp-2 ${
                      isSelected ? 'text-emerald-200' : 'text-slate-500'
                    }`}
                  >
                    {facility.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
