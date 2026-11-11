import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { AcademicPrograms } from './components/AcademicPrograms';
import { FacilitiesSection } from './components/FacilitiesSection';
import { IslamicEducationSection } from './components/IslamicEducationSection';
import { FacultySection } from './components/FacultySection';
import { AdmissionSection } from './components/AdmissionSection';
import { GallerySection } from './components/GallerySection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { NewsSection } from './components/NewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';
import { PrintableAdmissionSlip } from './components/PrintableAdmissionSlip';
import { AdmissionApplication } from './types';
import { getLocalAdmissions } from './lib/supabase';
import { Search, FileText, CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [selectedAdmissionSlip, setSelectedAdmissionSlip] = useState<AdmissionApplication | null>(null);
  const [targetClassForAdmission, setTargetClassForAdmission] = useState<string>('Grade 1');
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [trackingSearchInput, setTrackingSearchInput] = useState('');
  const [trackingSearchResult, setTrackingSearchResult] = useState<AdmissionApplication | null>(null);
  const [trackingSearchError, setTrackingSearchError] = useState<string | null>(null);

  const scrollToAdmissions = (className?: string) => {
    if (className) {
      setTargetClassForAdmission(className);
    }
    const el = document.getElementById('admissions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchTracking = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackingSearchError(null);
    setTrackingSearchResult(null);

    const query = trackingSearchInput.trim().toUpperCase();
    if (!query) return;

    const list = getLocalAdmissions();
    const found = list.find((a) => a.trackingId.toUpperCase() === query);

    if (found) {
      setTrackingSearchResult(found);
    } else {
      setTrackingSearchError(`No recorded application found with tracking ID "${query}". Please verify the number or submit an admission form.`);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800 flex flex-col font-sans">
      {/* 1. Header & Navigation */}
      <Header
        onOpenAdmission={() => scrollToAdmissions()}
        onOpenSupabaseConfig={() => setIsSupabaseModalOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero onOpenAdmission={() => scrollToAdmissions()} />

        {/* Quick Tracking ID Floating Banner / Strip */}
        <div className="bg-amber-400 text-slate-950 py-2.5 px-4 sm:px-8 font-sans border-b border-amber-500">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider">Already Applied?</span>
              <span className="hidden sm:inline text-slate-800">
                Check status or reprint your official admission confirmation slip.
              </span>
            </div>
            <button
              onClick={() => setIsTrackingModalOpen(true)}
              className="px-3 py-1 bg-slate-950 text-amber-300 hover:text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track Admission Slip</span>
            </button>
          </div>
        </div>

        {/* 3. About Section */}
        <AboutSection />

        {/* 4. Academic Programs */}
        <AcademicPrograms
          onSelectProgramForAdmission={(className) => scrollToAdmissions(className)}
        />

        {/* 5. Facilities Section */}
        <FacilitiesSection />

        {/* 6. Special Islamic Education Section */}
        <IslamicEducationSection />

        {/* 7. Faculty & Mentors */}
        <FacultySection />

        {/* 8. Online Admission Section */}
        <AdmissionSection
          initialClass={targetClassForAdmission}
          onOpenConfirmationSlip={(app) => setSelectedAdmissionSlip(app)}
          onOpenSupabaseConfig={() => setIsSupabaseModalOpen(true)}
        />

        {/* 9. Photo Gallery */}
        <GallerySection />

        {/* 10. School Activities */}
        <ActivitiesSection />

        {/* 11. News & Announcements */}
        <NewsSection />

        {/* 12. Contact Us */}
        <ContactSection />
      </main>

      {/* 13. Footer */}
      <Footer
        onOpenAdmission={() => scrollToAdmissions()}
        onOpenSupabaseConfig={() => setIsSupabaseModalOpen(true)}
      />

      {/* Supabase Configuration Modal */}
      <SupabaseConfigModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
      />

      {/* Printable Slip Modal */}
      {selectedAdmissionSlip && (
        <PrintableAdmissionSlip
          application={selectedAdmissionSlip}
          onClose={() => setSelectedAdmissionSlip(null)}
        />
      )}

      {/* Track Admission Slip Modal */}
      {isTrackingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-emerald-950 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-300" />
                <h3 className="text-sm font-bold">Track Admission Application</h3>
              </div>
              <button
                onClick={() => {
                  setIsTrackingModalOpen(false);
                  setTrackingSearchInput('');
                  setTrackingSearchResult(null);
                  setTrackingSearchError(null);
                }}
                className="text-emerald-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <form onSubmit={handleSearchTracking} className="space-y-3">
                <label className="block font-bold text-slate-700 uppercase tracking-wider">
                  Enter Tracking ID (e.g. IMS-2026-G1-1234)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={trackingSearchInput}
                    onChange={(e) => setTrackingSearchInput(e.target.value)}
                    placeholder="IMS-2026-..."
                    className="flex-1 px-3 py-2 border border-stone-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg shadow-sm transition"
                  >
                    Track
                  </button>
                </div>
              </form>

              {trackingSearchError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl leading-relaxed">
                  {trackingSearchError}
                </div>
              )}

              {trackingSearchResult && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Application Record Found</span>
                  </div>
                  <div className="text-[11px] text-slate-700 space-y-1">
                    <div>
                      Student: <span className="font-bold text-slate-900">{trackingSearchResult.studentName}</span>
                    </div>
                    <div>
                      Father: <span className="font-semibold">{trackingSearchResult.fatherName}</span>
                    </div>
                    <div>
                      Class: <span className="font-semibold text-emerald-800">{trackingSearchResult.classApplying}</span>
                    </div>
                    <div>
                      Tracking: <span className="font-mono font-bold">{trackingSearchResult.trackingId}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsTrackingModalOpen(false);
                      setSelectedAdmissionSlip(trackingSearchResult);
                    }}
                    className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-lg transition flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Open Printable Confirmation Slip</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
