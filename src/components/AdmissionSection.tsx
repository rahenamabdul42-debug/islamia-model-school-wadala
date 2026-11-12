import React, { useState } from 'react';
import { ADMISSION_CLASSES, SCHOOL_INFO } from '../data/schoolData';
import {
  submitAdmissionApplication,
  checkSupabaseStatus,
  getLocalAdmissions,
  syncPendingLocalApplications,
} from '../lib/supabase';
import { AdmissionApplication } from '../types';
import {
  FileText,
  User,
  Calendar,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Database,
  Printer,
  Sparkles,
  ArrowRight,
  RefreshCw,
  CloudUpload,
} from 'lucide-react';

interface AdmissionSectionProps {
  initialClass?: string;
  onOpenConfirmationSlip: (app: AdmissionApplication) => void;
  onOpenSupabaseConfig: () => void;
}

export const AdmissionSection: React.FC<AdmissionSectionProps> = ({
  initialClass = '',
  onOpenConfirmationSlip,
  onOpenSupabaseConfig,
}) => {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    dob: '',
    gender: 'Male' as 'Male' | 'Female' | '',
    classApplying: initialClass || 'Grade 1',
    parentPhone: '',
    homeAddress: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<AdmissionApplication | null>(null);
  const [submissionDestination, setSubmissionDestination] = useState<'supabase' | 'local'>('local');
  const [supabaseRecordId, setSupabaseRecordId] = useState<string | undefined>(undefined);
  const [submissionWarning, setSubmissionWarning] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [dbStatus, setDbStatus] = useState<{ configured: boolean; connected: boolean; message: string }>({
    configured: false,
    connected: false,
    message: '',
  });
  const [pendingCount, setPendingCount] = useState(0);
  const [syncingPending, setSyncingPending] = useState(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  const refreshStatus = () => {
    checkSupabaseStatus().then((res) => setDbStatus(res));
    const list = getLocalAdmissions();
    const pending = list.filter((a) => !a.syncedToCloud);
    setPendingCount(pending.length);
  };

  const handleSyncPending = async () => {
    setSyncingPending(true);
    setSyncNotice(null);
    try {
      const res = await syncPendingLocalApplications();
      if (res.syncedCount > 0) {
        setSyncNotice(`Synced ${res.syncedCount} offline application(s) to Supabase cloud successfully.`);
      } else if (res.failedCount > 0) {
        setSyncNotice(`Could not sync ${res.failedCount} application(s). Check connection or table schema.`);
      } else {
        setSyncNotice('All applications are already synchronized with Supabase.');
      }
      refreshStatus();
    } catch (err: any) {
      setSyncNotice(`Sync error: ${err.message || 'Unknown network error'}`);
    } finally {
      setSyncingPending(false);
    }
  };

  React.useEffect(() => {
    refreshStatus();
  }, []);

  // Sync if prop changes
  React.useEffect(() => {
    if (initialClass) {
      setFormData((prev) => ({ ...prev, classApplying: initialClass }));
    }
  }, [initialClass]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.studentName.trim()) {
      errs.studentName = 'Student full name is required';
    } else if (formData.studentName.trim().length < 3) {
      errs.studentName = 'Name must be at least 3 characters';
    }

    if (!formData.fatherName.trim()) {
      errs.fatherName = 'Father / Guardian name is required';
    }

    if (!formData.dob) {
      errs.dob = 'Date of birth is required';
    }

    if (!formData.gender) {
      errs.gender = 'Please select student gender';
    }

    if (!formData.classApplying) {
      errs.classApplying = 'Please select the target class';
    }

    if (!formData.parentPhone.trim()) {
      errs.parentPhone = 'Parent phone number is required';
    } else if (!/^03[0-9]{2}[-]?[0-9]{7}$/.test(formData.parentPhone.replace(/\s+/g, '')) && formData.parentPhone.length < 10) {
      errs.parentPhone = 'Enter valid phone number (e.g. 0300-1234567)';
    }

    if (!formData.homeAddress.trim()) {
      errs.homeAddress = 'Complete home address is required';
    } else if (formData.homeAddress.trim().length < 10) {
      errs.homeAddress = 'Please provide full residential address in Wadala / Punjab';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const generateTrackingNumber = (className: string) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = className.includes('Grade')
      ? 'G' + className.replace(/\D/g, '')
      : className.substring(0, 3).toUpperCase();
    return `IMS-2026-${code}-${randomSuffix}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);
    setSubmissionWarning(null);

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const trackingId = generateTrackingNumber(formData.classApplying);
      const result = await submitAdmissionApplication({
        studentName: formData.studentName.trim(),
        fatherName: formData.fatherName.trim(),
        dob: formData.dob,
        gender: formData.gender,
        classApplying: formData.classApplying,
        parentPhone: formData.parentPhone.trim(),
        homeAddress: formData.homeAddress.trim(),
        trackingId,
      });

      if (result.success) {
        setSubmittedApp(result.application);
        setSubmissionDestination(result.destination);
        setSupabaseRecordId(result.supabaseRecordId);
        setSubmissionWarning(result.warning || null);
        refreshStatus();
      } else {
        setSubmissionError(result.error || 'Failed to submit application. Please try again.');
      }
    } catch (err: any) {
      setSubmissionError(err.message || 'An unexpected error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      studentName: '',
      fatherName: '',
      dob: '',
      gender: 'Male',
      classApplying: 'Grade 1',
      parentPhone: '',
      homeAddress: '',
    });
    setSubmittedApp(null);
    setErrors({});
    setSubmissionWarning(null);
    setSubmissionError(null);
  };

  return (
    <section id="admissions" className="py-20 bg-emerald-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300 bg-emerald-900/90 border border-emerald-700/60 px-4 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Academic Session 2026–2027</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
            Online Admission Application
          </h2>
          <p className="mt-3 text-sm sm:text-base text-emerald-200/90 leading-relaxed">
            Register your child for Playgroup, Nursery, Kindergarten, or Grade 1 to 10 at Islamia Model School Wadala. Instant tracking ID and printable slip issued upon submission.
          </p>
        </div>

        {/* Database Status Ribbon & Action Buttons */}
        <div className="max-w-3xl mx-auto mb-8 space-y-2">
          <div className="bg-emerald-900/70 border border-emerald-700/60 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-emerald-200">
                {dbStatus.connected ? (
                  <span className="text-emerald-300 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Supabase Cloud Connected: Online admissions table "public.admissions" is live & ready.
                  </span>
                ) : (
                  <span>
                    Database mode: Local storage active. Link your Supabase project URL to enable instant cloud sync.
                  </span>
                )}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {pendingCount > 0 && (
                <button
                  type="button"
                  onClick={handleSyncPending}
                  disabled={syncingPending}
                  className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg transition text-[11px] flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-60"
                  title="Upload locally cached admissions to Supabase"
                >
                  <RefreshCw className={`w-3 h-3 ${syncingPending ? 'animate-spin text-slate-950' : 'text-slate-950'}`} />
                  <span>{syncingPending ? 'Syncing...' : `Sync ${pendingCount} Pending to Cloud`}</span>
                </button>
              )}
              <button
                onClick={onOpenSupabaseConfig}
                className="px-3 py-1 bg-emerald-800 hover:bg-emerald-700 text-amber-300 font-semibold rounded-lg border border-emerald-600 transition text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <span>{dbStatus.connected ? 'Manage Supabase' : 'Configure Supabase Database'}</span>
              </button>
            </div>
          </div>

          {syncNotice && (
            <div className="p-3 bg-emerald-900/90 border border-emerald-600 rounded-xl text-xs text-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{syncNotice}</span>
              </div>
              <button
                onClick={() => setSyncNotice(null)}
                className="text-emerald-300 hover:text-white text-xs underline ml-4"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>

        {/* Main Application Container */}
        <div className="max-w-3xl mx-auto bg-white text-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl border border-stone-200">
          {submittedApp ? (
            /* Success State */
            <div className="space-y-6 text-center animate-fadeIn py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1">
                  Application Successfully Registered
                </span>
                <h3 className="text-2xl font-serif font-black text-emerald-950">
                  Welcome to Islamia Model School Wadala!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto">
                  Application for <span className="font-bold text-slate-900">{submittedApp.studentName}</span> has been recorded.
                </p>
              </div>

              {/* Cloud Confirmation or Local Notice */}
              {submissionDestination === 'supabase' ? (
                <div className="bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs p-4 rounded-xl max-w-md mx-auto text-left flex items-start gap-3 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sm block text-emerald-950">
                      ✓ Confirmed: Saved in Supabase Cloud Database
                    </span>
                    <p className="mt-1 text-emerald-800 leading-relaxed">
                      Admission record was directly inserted into the <code className="font-mono bg-emerald-100/90 px-1 py-0.5 rounded font-bold text-emerald-950">admissions</code> table in Supabase.
                    </p>
                    {supabaseRecordId && (
                      <div className="mt-1.5 font-mono text-[11px] text-emerald-700 font-medium">
                        Cloud Record ID: {supabaseRecordId}
                      </div>
                    )}
                  </div>
                </div>
              ) : submissionWarning ? (
                <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs p-3.5 rounded-xl max-w-md mx-auto text-left flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{submissionWarning}</p>
                </div>
              ) : null}

              {/* Tracking Number Card */}
              <div className="bg-stone-50 border-2 border-dashed border-emerald-700/50 rounded-2xl p-6 max-w-md mx-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Official Admission Tracking Number
                </span>
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-900 tracking-widest my-2 select-all">
                  {submittedApp.trackingId}
                </div>
                <p className="text-[11px] text-slate-500">
                  Class: <span className="font-semibold text-slate-800">{submittedApp.classApplying}</span> · Father: <span className="font-semibold text-slate-800">{submittedApp.fatherName}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => onOpenConfirmationSlip(submittedApp)}
                  className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>View & Print Official Slip</span>
                </button>

                <button
                  onClick={handleResetForm}
                  className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-slate-700 font-semibold text-xs rounded-xl transition"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          ) : (
            /* Online Admission Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-stone-200 pb-4">
                <h3 className="text-lg font-serif font-bold text-emerald-950">
                  Candidate & Parent Registration Form
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Please fill out all 7 required fields accurately as per government NADRA B-Form.
                </p>
              </div>

              {submissionError && (
                <div className="bg-rose-50 border border-rose-300 text-rose-950 text-xs p-4 rounded-xl flex items-start gap-3 shadow-sm">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-1.5">
                    <span className="font-bold text-sm block text-rose-950">Cloud Database Submission Error</span>
                    <p className="leading-relaxed text-rose-900">{submissionError}</p>
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={onOpenSupabaseConfig}
                        className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-lg transition inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <Database className="w-3.5 h-3.5 text-amber-300" />
                        <span>Configure / Verify Supabase Database</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 1. Student Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    1. Student Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder="e.g. Muhammad Abdullah"
                      className={`w-full px-3.5 py-2.5 text-xs bg-stone-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 transition ${
                        errors.studentName ? 'border-rose-400 bg-rose-50/50' : 'border-stone-300'
                      }`}
                    />
                    <User className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                  {errors.studentName && (
                    <span className="text-[11px] text-rose-600 font-medium block">
                      {errors.studentName}
                    </span>
                  )}
                </div>

                {/* 2. Father Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    2. Father / Guardian Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.fatherName}
                      onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                      placeholder="e.g. Tariq Mehmood"
                      className={`w-full px-3.5 py-2.5 text-xs bg-stone-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 transition ${
                        errors.fatherName ? 'border-rose-400 bg-rose-50/50' : 'border-stone-300'
                      }`}
                    />
                    <User className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                  {errors.fatherName && (
                    <span className="text-[11px] text-rose-600 font-medium block">
                      {errors.fatherName}
                    </span>
                  )}
                </div>

                {/* 3. Date of Birth */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    3. Date of Birth <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      max="2023-01-01"
                      className={`w-full px-3.5 py-2.5 text-xs bg-stone-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 transition ${
                        errors.dob ? 'border-rose-400 bg-rose-50/50' : 'border-stone-300'
                      }`}
                    />
                  </div>
                  {errors.dob && (
                    <span className="text-[11px] text-rose-600 font-medium block">
                      {errors.dob}
                    </span>
                  )}
                </div>

                {/* 4. Gender */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    4. Gender <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: 'Male' })}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold uppercase transition flex items-center justify-center gap-2 border ${
                        formData.gender === 'Male'
                          ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                          : 'bg-stone-50 text-slate-700 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      <span>Male (Boy)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: 'Female' })}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold uppercase transition flex items-center justify-center gap-2 border ${
                        formData.gender === 'Female'
                          ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                          : 'bg-stone-50 text-slate-700 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      <span>Female (Girl)</span>
                    </button>
                  </div>
                  {errors.gender && (
                    <span className="text-[11px] text-rose-600 font-medium block">
                      {errors.gender}
                    </span>
                  )}
                </div>

                {/* 5. Class Applying For */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    5. Class Applying For <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.classApplying}
                    onChange={(e) => setFormData({ ...formData, classApplying: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 transition"
                  >
                    {ADMISSION_CLASSES.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 6. Parent Phone Number */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    6. Parent / Guardian Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.parentPhone}
                      onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                      placeholder="0300-1234567"
                      className={`w-full px-3.5 py-2.5 text-xs bg-stone-50 border rounded-xl font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 transition ${
                        errors.parentPhone ? 'border-rose-400 bg-rose-50/50' : 'border-stone-300'
                      }`}
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                  {errors.parentPhone ? (
                    <span className="text-[11px] text-rose-600 font-medium block">
                      {errors.parentPhone}
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-500 block">
                      Test date and admission slip status will be SMS'd to this number.
                    </span>
                  )}
                </div>

                {/* 7. Home Address */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    7. Permanent / Residential Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      rows={2}
                      value={formData.homeAddress}
                      onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
                      placeholder="House / Mohallah, Street, Village / Sector, Wadala, District Sialkot / Gujranwala, Punjab"
                      className={`w-full px-3.5 py-2.5 text-xs bg-stone-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 transition ${
                        errors.homeAddress ? 'border-rose-400 bg-rose-50/50' : 'border-stone-300'
                      }`}
                    />
                    <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                  {errors.homeAddress && (
                    <span className="text-[11px] text-rose-600 font-medium block">
                      {errors.homeAddress}
                    </span>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-stone-200">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                      <span>Recording Admission Application...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 text-amber-300" />
                      <span>Submit Admission Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-2">
                  No online registration fee is charged. Official confirmation slip will be generated instantly.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
