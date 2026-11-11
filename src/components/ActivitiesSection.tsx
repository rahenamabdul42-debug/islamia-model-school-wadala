import React from 'react';
import { SCHOOL_ACTIVITIES } from '../data/schoolData';
import { Sparkles, Calendar, Clock, Trophy, HeartHandshake } from 'lucide-react';

export const ActivitiesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100/70 px-3.5 py-1 rounded-full mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Co-Curricular Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-emerald-950 tracking-tight">
            School Activities & Character Building Events
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Education transcends textbooks. From daily morning Tilawat and sports tournaments to inter-school debates and science exhibitions, our students build confidence, sportsmanship, and eloquence.
          </p>
        </div>

        {/* Activities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SCHOOL_ACTIVITIES.map((act) => (
            <div
              key={act.id}
              className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-52 overflow-hidden bg-stone-300">
                <img
                  src={act.image}
                  alt={act.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-900/90 text-amber-300 px-2.5 py-0.5 rounded border border-emerald-700/50">
                    {act.category}
                  </span>
                  <span className="text-xs font-serif text-amber-200">
                    {act.urduTitle}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-serif text-emerald-950 group-hover:text-emerald-800 transition">
                    {act.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {act.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="font-medium text-slate-700">{act.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50/80 p-2 rounded-lg border border-emerald-100">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="text-[11px] font-medium leading-snug">{act.impact}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
