import React from 'react';
import { AdmissionApplication } from '../types';
import { SchoolLogo } from './SchoolLogo';
import { SCHOOL_INFO } from '../data/schoolData';
import { Printer, X, CheckCircle2, Calendar, Phone, MapPin, User, FileText, Download } from 'lucide-react';

interface PrintableAdmissionSlipProps {
  application: AdmissionApplication;
  onClose: () => void;
}

export const PrintableAdmissionSlip: React.FC<PrintableAdmissionSlipProps> = ({
  application,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white print:fixed-none">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6 print:m-0 print:border-none print:shadow-none">
        {/* Screen Action Bar (hidden on print) */}
        <div className="bg-emerald-900 text-white px-6 py-3 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-300" />
            <span className="font-semibold text-sm">Admission Application Confirmed</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition shadow"
            >
              <Printer className="w-4 h-4" />
              Print Official Slip
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Slip Body */}
        <div className="p-8 sm:p-10 font-sans text-slate-800 print:p-6" id="admission-slip-content">
          {/* Header */}
          <div className="border-b-2 border-emerald-900 pb-5 mb-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <SchoolLogo size={72} />
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif font-black text-emerald-950 tracking-wide uppercase">
                    ISLAMIA MODEL SCHOOL WADALA
                  </h1>
                  <p className="text-xs font-semibold text-emerald-800 tracking-wider">
                    Wadala, District Sialkot / Gujranwala Division, Punjab, Pakistan
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                    Affiliated with BISE Gujranwala & Punjab Education Department • Estd. 2001
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0 border-l border-stone-200 pl-4 hidden sm:block">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Office Copy / Student Slip
                </span>
                <span className="text-xs font-bold text-emerald-800">Session 2026-2027</span>
                <span className="text-[10px] text-slate-500 block">Phone: {SCHOOL_INFO.phone}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-stone-300 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-950 px-3 py-1 rounded border border-emerald-200 font-mono font-bold">
                <span>TRACKING ID:</span>
                <span className="text-emerald-700 tracking-widest">{application.trackingId}</span>
              </div>
              <div className="text-slate-500">
                Submitted on: <span className="font-semibold text-slate-800">{new Date(application.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </div>

          {/* Student & Parent Details Grid */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-900 border-b border-emerald-200 pb-1 mb-3">
              Candidate Particulars
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Student Full Name</span>
                <span className="text-sm font-bold text-slate-900">{application.studentName}</span>
              </div>

              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Father / Guardian Name</span>
                <span className="text-sm font-bold text-slate-900">{application.fatherName}</span>
              </div>

              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Class Applied For</span>
                <span className="text-sm font-bold text-emerald-800">{application.classApplying}</span>
              </div>

              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Date of Birth & Gender</span>
                <span className="text-sm font-bold text-slate-900">
                  {application.dob} · <span className="text-slate-600">{application.gender}</span>
                </span>
              </div>

              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Parent Contact Phone</span>
                <span className="text-sm font-bold text-slate-900 font-mono">{application.parentPhone}</span>
              </div>

              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Application Status</span>
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-amber-100 text-amber-800 border border-amber-300">
                  PROVISIONAL / REGISTERED
                </span>
              </div>

              <div className="sm:col-span-2 bg-stone-50 p-3 rounded-lg border border-stone-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Home / Residential Address</span>
                <span className="text-xs font-medium text-slate-800">{application.homeAddress}</span>
              </div>
            </div>
          </div>

          {/* Checklist & Instructions */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 mb-6 text-xs text-amber-950">
            <h3 className="font-bold text-xs uppercase tracking-wide text-amber-900 mb-2">
              Mandatory Documents Checklist for Admission Desk Verification:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center gap-2">
                <input type="checkbox" readOnly checked className="accent-emerald-700" />
                <span>Original & Attested Copy of NADRA B-Form</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" readOnly checked className="accent-emerald-700" />
                <span>Father / Guardian CNIC Photocopy</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" readOnly checked className="accent-emerald-700" />
                <span>4 Blue-background Passport Size Photos</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" readOnly checked className="accent-emerald-700" />
                <span>Previous School Leaving Certificate (SLC)</span>
              </div>
            </div>
          </div>

          {/* Instructions Notes */}
          <div className="text-[11px] text-slate-500 space-y-1 mb-8 leading-relaxed border-t border-stone-200 pt-3">
            <p>1. Please bring this printed confirmation slip along with the required documents to the school admission desk.</p>
            <p>2. Diagnostic assessment / interview date will be communicated via SMS on the registered parent phone number.</p>
            <p>3. Office Timings: Monday to Saturday from 8:00 AM to 1:30 PM (Friday until 12:00 PM).</p>
          </div>

          {/* Signatures & Seal Section */}
          <div className="pt-6 border-t-2 border-dashed border-stone-300 grid grid-cols-3 gap-6 text-center text-xs">
            <div className="flex flex-col items-center">
              <div className="h-12 border-b border-slate-400 w-full mb-1"></div>
              <span className="font-semibold text-slate-700 text-[11px]">Parent / Guardian Signature</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 border-b border-slate-400 w-full mb-1 flex items-center justify-center">
                <span className="text-[10px] text-slate-400 italic font-serif">[Official Stamp]</span>
              </div>
              <span className="font-semibold text-slate-700 text-[11px]">Admission Incharge</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 border-b border-slate-400 w-full mb-1 flex items-center justify-center">
                <span className="font-serif italic text-emerald-950 text-xs font-semibold">[Authorized Signatory]</span>
              </div>
              <span className="font-semibold text-slate-700 text-[11px]">Principal / Patron [Stamp]</span>
            </div>
          </div>
        </div>

        {/* Footer actions for screen */}
        <div className="bg-stone-100 px-6 py-4 border-t border-stone-200 flex items-center justify-between print:hidden">
          <span className="text-xs text-slate-500">
            Keep your tracking number safe for admissions inquiries.
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-stone-300 rounded-lg hover:bg-white transition"
            >
              Done
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow transition flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              Print / Save as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
