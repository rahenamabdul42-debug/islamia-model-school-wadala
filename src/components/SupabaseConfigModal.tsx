import React, { useState, useEffect } from 'react';
import {
  getSupabaseConfig,
  saveSupabaseConfig,
  clearSupabaseConfig,
  checkSupabaseStatus,
  SUPABASE_SQL_SCHEMA,
} from '../lib/supabase';
import { Database, Check, AlertCircle, RefreshCw, Copy, ExternalLink, X, Shield, Key } from 'lucide-react';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({
  isOpen,
  onClose,
  onStatusChange,
}) => {
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [testing, setTesting] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [status, setStatus] = useState<{
    configured: boolean;
    connected: boolean;
    message: string;
    detectedColumns?: string[];
  }>({ configured: false, connected: false, message: 'Checking...' });

  useEffect(() => {
    if (isOpen) {
      const cfg = getSupabaseConfig();
      setUrl(cfg.url || '');
      setAnonKey(cfg.anonKey || '');
      verifyStatus();
    }
  }, [isOpen]);

  const verifyStatus = async () => {
    setTesting(true);
    const result = await checkSupabaseStatus();
    setStatus(result);
    setTesting(false);
    if (onStatusChange) onStatusChange();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = saveSupabaseConfig(url, anonKey);
    setUrl(normalized.url);
    setAnonKey(normalized.anonKey);
    await verifyStatus();
  };

  const handleReset = async () => {
    clearSupabaseConfig();
    setUrl('');
    setAnonKey('');
    await verifyStatus();
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-700/50 rounded-lg border border-emerald-500/30">
              <Database className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Supabase Database Integration</h3>
              <p className="text-xs text-emerald-200">
                Online admission form cloud storage configuration
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Status Banner */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 ${
              status.connected
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : status.configured
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-stone-50 border-stone-200 text-stone-700'
            }`}
          >
            {status.connected ? (
              <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : status.configured ? (
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <Shield className="w-5 h-5 text-stone-500 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <div className="font-semibold flex items-center justify-between">
                <span>
                  {status.connected
                    ? 'Connected to Supabase'
                    : status.configured
                    ? 'Configuration Needs Attention'
                    : 'Local Storage Mode Active'}
                </span>
                <button
                  type="button"
                  onClick={verifyStatus}
                  disabled={testing}
                  className="text-xs flex items-center gap-1 font-medium underline hover:opacity-80"
                >
                  <RefreshCw className={`w-3 h-3 ${testing ? 'animate-spin' : ''}`} />
                  Test Connection
                </button>
              </div>
              <p className="text-xs mt-1 leading-relaxed opacity-90">{status.message}</p>
              {status.detectedColumns && status.detectedColumns.length > 0 && (
                <div className="mt-2 pt-2 border-t border-emerald-200/60 text-[11px]">
                  <span className="font-semibold text-emerald-900 block mb-1">
                    Verified admissions columns detected:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {status.detectedColumns.map((col) => (
                      <span
                        key={col}
                        className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-mono text-[10px] font-medium"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Supabase Project URL
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://your-project-id.supabase.co"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Found in Supabase Dashboard &gt; Project Settings &gt; API. Use base URL: <code className="font-mono text-emerald-800">https://[project-id].supabase.co</code> (any trailing <code className="font-mono text-rose-700">/rest/v1</code> is automatically stripped to prevent PGRST125 errors).
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Supabase Publishable (Anon) Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={anonKey}
                  onChange={(e) => setAnonKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm font-mono text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
                />
                <Key className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
              <span className="text-[11px] text-amber-700 mt-1 block font-medium">
                Security note: Only use your public `anon` key. Never expose your `service_role` key.
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium underline"
              >
                Clear Saved Credentials (Use Local Storage)
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg border border-stone-200 hover:bg-stone-50 transition"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={testing}
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition flex items-center gap-1.5"
                >
                  {testing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                  Save & Connect
                </button>
              </div>
            </div>
          </form>

          {/* Vercel Deployment Instructions Card */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 text-xs space-y-2">
            <span className="font-bold text-emerald-950 block text-xs uppercase tracking-wider">
              Permanent Setup for Vercel Live Website
            </span>
            <p className="text-emerald-900 leading-relaxed text-[11px]">
              To ensure all students on your live Vercel URL are connected to Supabase automatically without configuring anything in their browser, add these 2 environment variables in <strong className="text-emerald-950">Vercel Dashboard &gt; Project &gt; Settings &gt; Environment Variables</strong>:
            </p>
            <div className="space-y-1 font-mono text-[11px] bg-white p-2.5 rounded-lg border border-emerald-300">
              <div><strong className="text-emerald-900">VITE_SUPABASE_URL</strong> = <span className="text-slate-500">https://[your-project-id].supabase.co</span></div>
              <div><strong className="text-emerald-900">VITE_SUPABASE_ANON_KEY</strong> = <span className="text-slate-500">eyJhbGciOi... (your publishable anon key)</span></div>
            </div>
            <p className="text-[11px] text-emerald-800">
              Also supported: <code className="font-mono text-emerald-950">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="font-mono text-emerald-950">SUPABASE_URL</code>. Once saved in Vercel, trigger a <strong>Redeploy</strong>.
            </p>
          </div>

          {/* SQL Table Creation Helper */}
          <div className="border-t border-stone-200 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Required Supabase SQL Schema & RLS Policies
              </span>
              <button
                onClick={handleCopySchema}
                className="text-xs flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-medium"
              >
                {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSchema ? 'Copied to Clipboard' : 'Copy SQL'}
              </button>
            </div>
            <pre className="bg-slate-900 text-slate-200 text-[11px] p-3 rounded-lg overflow-x-auto font-mono max-h-36 leading-relaxed">
              {SUPABASE_SQL_SCHEMA}
            </pre>
            <p className="text-[11px] text-slate-500 mt-2">
              Paste this in your Supabase SQL Editor once. It creates the table with Row Level Security allowing safe admission application submissions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
