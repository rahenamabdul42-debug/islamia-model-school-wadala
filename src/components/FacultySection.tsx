import React, { useState } from 'react';
import { FACULTY_MEMBERS } from '../data/schoolData';
import { GraduationCap, Briefcase, Award, Sparkles } from 'lucide-react';

export const FacultySection: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const departments = ['All', 'Administration', 'Islamic Studies', 'Sciences & Mathematics', 'Primary & Early Years'];

  const filteredFaculty =
    selectedDept === 'All'
      ? FACULTY_MEMBERS
      : FACULTY_MEMBERS.filter((m) => m.department === selectedDept);

  return (
    <section id="faculty" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full mb-3">
            <span>Our Mentors & Educators</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-emerald-950 tracking-tight">
            Qualified Faculty & Islamic Scholars
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Our esteemed faculty members combine high academic qualifications with deep moral commitment, ensuring every child receives patient individual attention.
          </p>
        </div>

        {/* Department Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                selectedDept === dept
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Faculty Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFaculty.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Teacher Image */}
              <div className="relative h-64 overflow-hidden bg-stone-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 block">
                    {member.department}
                  </span>
                  <h3 className="text-lg font-bold font-serif">{member.name}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{member.role}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Qualification & Experience Badges */}
                <div className="pt-3 border-t border-stone-200 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="font-semibold text-slate-900 truncate">
                      {member.qualification}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-slate-600 font-mono text-[11px]">
                      Experience: {member.experience}
                    </span>
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
