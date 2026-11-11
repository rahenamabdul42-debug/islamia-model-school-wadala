import React, { useState } from 'react';
import { ACADEMIC_PROGRAMS } from '../data/schoolData';
import { AcademicProgram } from '../types';
import { BookOpen, Clock, Users, Check, X, ArrowRight } from 'lucide-react';

interface AcademicProgramsProps {
  onSelectProgramForAdmission: (className: string) => void;
}

export const AcademicPrograms: React.FC<AcademicProgramsProps> = ({
  onSelectProgramForAdmission,
}) => {
  const [selectedProgram, setSelectedProgram] = useState<AcademicProgram | null>(null);

  return (
    <section id="academics" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full mb-3">
            <span>Structured Learning Pathway</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-emerald-950 tracking-tight">
            Academic Programs from Early Years to Secondary Matriculation
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Every developmental stage receives specialized pedagogy, dedicated faculty, and balanced intellectual and Islamic character nurturing.
          </p>
        </div>

        {/* 6 Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ACADEMIC_PROGRAMS.map((program) => (
            <div
              key={program.id}
              className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-200 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Program Card Image */}
              <div className="relative h-48 overflow-hidden bg-stone-200">
                <img
                  src={program.image}
                  alt={program.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <span className="text-xs font-bold font-mono tracking-wide bg-emerald-900/90 px-2.5 py-1 rounded border border-emerald-700/60">
                    {program.ageRange}
                  </span>
                  <span className="text-xs font-medium text-amber-300 font-serif">
                    {program.urduName}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                    {program.gradeRange}
                  </div>
                  <h3 className="text-xl font-bold font-serif text-emerald-950">
                    {program.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {program.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5 pt-2 border-t border-stone-200">
                  {program.highlights.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Card CTA */}
                <div className="pt-3 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProgram(program)}
                    className="text-xs font-bold uppercase tracking-wider text-emerald-800 hover:text-emerald-900 transition flex items-center gap-1 group-hover:underline"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onSelectProgramForAdmission(program.name)}
                    className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-lg transition shadow-sm"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Program Detail Modal Drawer */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="relative h-44 overflow-hidden bg-emerald-950 text-white">
              <img
                src={selectedProgram.image}
                alt={selectedProgram.name}
                className="w-full h-full object-cover opacity-40"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent p-6 flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                      {selectedProgram.gradeRange} · {selectedProgram.ageRange}
                    </span>
                    <h3 className="text-2xl font-serif font-black text-white">
                      {selectedProgram.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className="p-1.5 text-white/80 hover:text-white rounded-lg bg-black/30 hover:bg-black/50 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-900 mb-1">
                  Program Overview & Objectives
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {selectedProgram.curriculumDetails}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-900 mb-2">
                  Key Subjects Covered
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedProgram.subjects.map((sub, i) => (
                    <div
                      key={i}
                      className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-xs font-medium text-slate-800 flex items-center gap-2"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-900 mb-2">
                  Class Timings & Routine
                </h4>
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 font-medium">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  <span>Daily Academic Timings: {selectedProgram.timing}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedProgram(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const targetName = selectedProgram.name;
                  setSelectedProgram(null);
                  onSelectProgramForAdmission(targetName);
                }}
                className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow transition flex items-center gap-1.5"
              >
                <span>Apply for {selectedProgram.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
