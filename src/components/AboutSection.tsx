import React, { useState } from 'react';
import { ABOUT_DETAILS, SCHOOL_INFO } from '../data/schoolData';
import { Target, Compass, Heart, Shield, Award, BookCheck, History, Check } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'history' | 'philosophy' | 'values'>('mission');

  return (
    <section id="about" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full mb-3">
            <span>About Our Institution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-emerald-950 tracking-tight">
            A Legacy of Knowledge, Moral Discipline & Excellence in Wadala
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {ABOUT_DETAILS.overview}
          </p>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex flex-wrap items-center gap-2 border-b border-stone-300 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('mission')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'mission'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Mission & Vision
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'history'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Our History & Milestones
          </button>
          <button
            onClick={() => setActiveTab('philosophy')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'philosophy'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Educational Philosophy
          </button>
          <button
            onClick={() => setActiveTab('values')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'values'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Discipline & Character
          </button>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'mission' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm relative overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 mb-4">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-emerald-950 font-serif mb-2">Our Mission</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {ABOUT_DETAILS.pillars[0].text}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm relative overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 mb-4">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-emerald-950 font-serif mb-2">Our Vision</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {ABOUT_DETAILS.pillars[1].text}
                  </p>
                </div>
              </div>

              <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-sm space-y-3">
                <h4 className="font-serif font-bold text-base text-amber-300">
                  Core Educational Commitments
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-emerald-100">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Holistic English-medium curriculum</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Nazra Quran with verified Tajweed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Experiential science laboratory classes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Character, humility and civic duty</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-stone-100">
                <img
                  src="/images/classroom.jpg"
                  alt="Students in classroom at Islamia Model School Wadala"
                  className="w-full h-80 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 bg-white border-t border-stone-200">
                  <p className="text-xs text-slate-600 font-medium italic">
                    "Educating the mind without educating the heart is no education at all." — Inspiring future doctors, engineers, scholars, and moral leaders in Wadala.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            <div className="lg:col-span-8 space-y-4">
              <div className="border-l-2 border-emerald-800 ml-3 pl-6 space-y-8">
                {ABOUT_DETAILS.history.map((item) => (
                  <div key={item.year} className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber-500 border-4 border-white shadow-sm" />
                    <span className="text-xs font-black font-mono text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      {item.year}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1 font-serif">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
                <img
                  src="/images/hero-building.jpg"
                  alt="Historic campus development"
                  className="w-full h-52 object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
                <div className="text-xs text-slate-600 leading-relaxed">
                  <span className="font-bold text-emerald-950 block mb-1">
                    25 Years of Community Trust
                  </span>
                  From an initial cluster of 65 students in 2001, Islamia Model School Wadala has expanded into a premier regional institution educating over 1,250 learners.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'philosophy' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
            <div className="lg:col-span-7 space-y-5">
              <h3 className="text-2xl font-serif font-bold text-emerald-950">
                Synthesis of Modern Science and Eternal Faith
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We believe that modern science and technology reveal the magnificent signs of the Creator (Ayat-ullah). Rather than viewing religious instruction and secular curriculum as separate, our educational philosophy integrates them into an organic whole.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white rounded-xl border border-stone-200">
                  <h4 className="text-xs font-bold uppercase text-emerald-800 mb-1">
                    Intellectual Rigor
                  </h4>
                  <p className="text-xs text-slate-600">
                    Questioning, conceptual experimentation, and mathematics mastery over rote learning.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-stone-200">
                  <h4 className="text-xs font-bold uppercase text-emerald-800 mb-1">
                    Spiritual Solace
                  </h4>
                  <p className="text-xs text-slate-600">
                    Daily prayers, Quranic contemplation, and cultivating inner peace and contentment.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <img
                src="/images/teacher-mentoring.jpg"
                alt="Teacher mentoring students with care"
                className="w-full h-72 object-cover rounded-2xl shadow-md border border-stone-200"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

        {activeTab === 'values' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-emerald-950 font-serif mb-2">
                Discipline & Punctuality
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Students are trained to value time as an amanah (trust). Consistent attendance, neat uniforms, and organized study habits are reinforced daily.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-emerald-950 font-serif mb-2">
                Adab (Respect & Courtesy)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Respect toward elders, gentle speech with peers, and humility in success. Our school grounds are free from rough language and bullying.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-emerald-950 font-serif mb-2">
                Honesty & Integrity
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Instilling uncompromising honesty in examinations, assignments, and peer interactions. Truthfulness (Sidq) is the foundation of scholarship.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
