import React, { useState } from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Navigation,
  ExternalLink,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.phone.trim() || !formState.message.trim()) {
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100/70 px-3.5 py-1 rounded-full mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Campus Location & Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-emerald-950 tracking-tight">
            Contact Islamia Model School Wadala
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            We welcome parents and guardians to visit our campus during official hours, schedule a personal meeting with our administration, or get in touch via phone and WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards & WhatsApp (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Campus Address Card */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-800 text-white shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-emerald-950">
                    {SCHOOL_INFO.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {SCHOOL_INFO.address}
                  </p>
                  <span className="text-[11px] text-amber-700 font-semibold block mt-1">
                    {SCHOOL_INFO.location}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-start gap-3.5 text-xs text-slate-600">
                <Clock className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block">Visiting Hours:</span>
                  <span>{SCHOOL_INFO.officeHours}</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Numbers & WhatsApp */}
            <div className="bg-emerald-950 text-white rounded-2xl p-6 shadow-xl space-y-4 border border-emerald-800/80">
              <h3 className="font-serif font-bold text-base text-amber-300">
                Direct Communication Channels
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-emerald-300 block text-[10px] uppercase font-bold">Mobile / Admissions Desk:</span>
                    <a href={`tel:${SCHOOL_INFO.phone}`} className="font-mono text-sm text-white hover:text-amber-300 transition">
                      {SCHOOL_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-emerald-300 block text-[10px] uppercase font-bold">Campus Landline:</span>
                    <a href={`tel:${SCHOOL_INFO.landline}`} className="font-mono text-sm text-white hover:text-amber-300 transition">
                      {SCHOOL_INFO.landline}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-emerald-300 block text-[10px] uppercase font-bold">Email:</span>
                    <a href={`mailto:${SCHOOL_INFO.email}`} className="text-white hover:text-amber-300 transition truncate block">
                      {SCHOOL_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action Button */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${SCHOOL_INFO.whatsapp}?text=Assalamu%20Alaikum,%20I%20am%20contacting%20regarding%20Islamia%20Model%20School%20Wadala.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp ({SCHOOL_INFO.whatsappDisplay})</span>
                </a>
              </div>
            </div>

            {/* Google Maps Visual Embed Placeholder */}
            <div className="bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
              <div className="p-3 bg-stone-200 text-xs font-bold text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-emerald-800" />
                  School Map & Directions
                </span>
                <span className="text-[10px] text-slate-500">Wadala, Punjab</span>
              </div>
              <div className="h-44 bg-emerald-900/10 relative flex flex-col items-center justify-center p-4 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center mb-2 shadow">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-serif font-bold text-xs text-emerald-950">
                  Islamia Model School Wadala Campus
                </span>
                <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
                  Conveniently situated on Main Circular Road, Wadala with easy bus & van transport connectivity across surrounding villages and towns.
                </p>
                <a
                  href="https://maps.google.com/?q=Wadala+Punjab+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 text-[11px] font-bold text-emerald-800 hover:underline inline-flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-stone-50 rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm flex flex-col justify-between">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fadeIn my-auto">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-serif text-emerald-950">
                  Thank You for Contacting Us
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your message has been received by the Islamia Model School Wadala administration desk. Our representative will contact you shortly via phone/WhatsApp.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: '', phone: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="px-5 py-2.5 bg-emerald-800 text-white font-bold text-xs rounded-xl shadow transition"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="text-lg font-serif font-bold text-emerald-950">
                    Send an Official Inquiry
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Leave your contact details and questions regarding admissions, fee structures, or school visits.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700 uppercase tracking-wider">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Haji Abdul Rasheed"
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700 uppercase tracking-wider">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="0300-1234567"
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider">
                    Inquiry Subject
                  </label>
                  <select
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-xs"
                  >
                    <option value="Admission Inquiry 2026">Admission Inquiry 2026-2027</option>
                    <option value="Fee Structure & Scholarships">Fee Structure & Orphan Concessions</option>
                    <option value="Hifz-cum-Schooling Track">Hifz-cum-Schooling Quranic Track</option>
                    <option value="Secondary Board Prep">Secondary Board Examination Inquiries</option>
                    <option value="General Question">General Campus Question</option>
                  </select>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider">
                    Your Message / Question <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Please write your inquiry here..."
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Message to School Office</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
