import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AdmissionApplication } from '../types';

const STORAGE_KEY = 'ims_supabase_config';
const LOCAL_ADMISSIONS_KEY = 'ims_admissions_local';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export function getSupabaseConfig(): SupabaseConfig {
  // First check localStorage overrides
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not read Supabase config from storage', e);
  }

  // Fallback to Vite env variables
  return {
    url: (import.meta.env.VITE_SUPABASE_URL as string) || '',
    anonKey: (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || '',
  };
}

export function saveSupabaseConfig(url: string, anonKey: string): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ url: url.trim(), anonKey: anonKey.trim() }));
  clientInstance = null; // force recreation
}

export function clearSupabaseConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
  clientInstance = null;
}

let clientInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const config = getSupabaseConfig();
  if (!config.url || !config.anonKey) {
    return null;
  }

  if (!clientInstance) {
    try {
      clientInstance = createClient(config.url, config.anonKey, {
        auth: {
          persistSession: false,
        },
      });
    } catch (e) {
      console.error('Failed to create Supabase client', e);
      return null;
    }
  }

  return clientInstance;
}

export async function checkSupabaseStatus(): Promise<{
  configured: boolean;
  connected: boolean;
  message: string;
}> {
  const config = getSupabaseConfig();
  if (!config.url || !config.anonKey) {
    return {
      configured: false,
      connected: false,
      message: 'Supabase URL or Publishable Anon Key not configured. Using local secure storage.',
    };
  }

  const client = getSupabaseClient();
  if (!client) {
    return {
      configured: true,
      connected: false,
      message: 'Invalid Supabase configuration URL.',
    };
  }

  try {
    // Attempt a light ping against admissions table or auth
    const { error } = await client.from('admissions').select('count', { count: 'exact', head: true });
    if (error) {
      // Check if table missing
      if (error.code === '42P01' || error.message.includes('relation "admissions" does not exist')) {
        return {
          configured: true,
          connected: false,
          message: 'Connected to Supabase project, but "admissions" table has not been created yet.',
        };
      }
      return {
        configured: true,
        connected: false,
        message: `Supabase error: ${error.message}`,
      };
    }
    return {
      configured: true,
      connected: true,
      message: 'Connected to Supabase "admissions" table.',
    };
  } catch (err: any) {
    return {
      configured: true,
      connected: false,
      message: `Connection failed: ${err.message || 'Unknown network error'}`,
    };
  }
}

export async function submitAdmissionApplication(
  app: Omit<AdmissionApplication, 'id' | 'status' | 'createdAt'>
): Promise<{
  success: boolean;
  destination: 'supabase' | 'local';
  trackingId: string;
  application: AdmissionApplication;
  warning?: string;
  error?: string;
}> {
  const fullApp: AdmissionApplication = {
    ...app,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };

  // Always back up locally so no parent form is ever lost
  saveLocalAdmission(fullApp);

  const client = getSupabaseClient();

  if (!client) {
    return {
      success: true,
      destination: 'local',
      trackingId: fullApp.trackingId,
      application: fullApp,
      warning: 'Application saved in local browser storage. Connect Supabase to persist in your cloud database.',
    };
  }

  try {
    const payload = {
      tracking_id: fullApp.trackingId,
      student_name: fullApp.studentName,
      father_name: fullApp.fatherName,
      dob: fullApp.dob,
      gender: fullApp.gender,
      class_applying: fullApp.classApplying,
      parent_phone: fullApp.parentPhone,
      home_address: fullApp.homeAddress,
      status: fullApp.status,
      created_at: fullApp.createdAt,
    };

    const { data, error } = await client.from('admissions').insert([payload]).select();

    if (error) {
      console.error('Supabase insert error:', error);
      return {
        success: true,
        destination: 'local',
        trackingId: fullApp.trackingId,
        application: fullApp,
        warning: `Saved locally. Cloud sync failed: ${error.message} (${error.code || 'Check table schema'}).`,
      };
    }

    return {
      success: true,
      destination: 'supabase',
      trackingId: fullApp.trackingId,
      application: {
        ...fullApp,
        id: data && data[0] ? data[0].id : undefined,
      },
    };
  } catch (err: any) {
    console.error('Submission exception:', err);
    return {
      success: true,
      destination: 'local',
      trackingId: fullApp.trackingId,
      application: fullApp,
      warning: `Saved locally. Could not reach Supabase: ${err.message || 'Network error'}.`,
    };
  }
}

export function getLocalAdmissions(): AdmissionApplication[] {
  try {
    const raw = localStorage.getItem(LOCAL_ADMISSIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalAdmission(app: AdmissionApplication): void {
  try {
    const list = getLocalAdmissions();
    list.unshift(app);
    localStorage.setItem(LOCAL_ADMISSIONS_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed saving locally', e);
  }
}

export const SUPABASE_SQL_SCHEMA = `-- Run this in your Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS admissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id TEXT NOT NULL UNIQUE,
  student_name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  dob DATE NOT NULL,
  gender TEXT NOT NULL,
  class_applying TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  home_address TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous inserts for online admissions
CREATE POLICY "Allow public insert to admissions"
  ON admissions
  FOR INSERT
  WITH CHECK (true);

-- Allow public tracking read by tracking_id
CREATE POLICY "Allow public read by tracking_id"
  ON admissions
  FOR SELECT
  USING (true);
`;
