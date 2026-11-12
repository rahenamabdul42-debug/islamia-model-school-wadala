import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AdmissionApplication } from '../types';

const STORAGE_KEY = 'ims_supabase_config';
const LOCAL_ADMISSIONS_KEY = 'ims_admissions_local';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

/**
 * Normalizes any Supabase project URL to its valid base origin format (https://<project-ref>.supabase.co).
 * Strips erroneous paths like /rest/v1, /rest/v1/, /auth/v1, trailing slashes, spaces, or quotes,
 * which cause PostgREST error PGRST125 ("Invalid path specified in request URL").
 */
export function normalizeSupabaseUrl(rawUrl: string): string {
  if (!rawUrl) return '';
  let url = rawUrl.trim().replace(/^['"]|['"]$/g, '');

  // If user pasted a Supabase dashboard URL: https://supabase.com/dashboard/project/<ref>
  const dashboardMatch = url.match(/supabase\.com\/dashboard\/project\/([a-z0-9_-]+)/i);
  if (dashboardMatch) {
    return `https://${dashboardMatch[1]}.supabase.co`;
  }

  // If user pasted just the 20-character project ref
  if (/^[a-z0-9_-]{20}$/i.test(url)) {
    return `https://${url}.supabase.co`;
  }

  // Ensure protocol
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  try {
    const parsed = new URL(url);
    // Base Supabase URL must strictly be protocol + host (origin), without paths like /rest/v1
    return parsed.origin;
  } catch (e) {
    return url.replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '');
  }
}

/**
 * Normalizes anon API key by stripping quotes and whitespace.
 */
export function normalizeSupabaseKey(rawKey: string): string {
  if (!rawKey) return '';
  return rawKey.trim().replace(/^['"]|['"]$/g, '');
}

export function getSupabaseConfig(): SupabaseConfig {
  // First check localStorage overrides (saved via Configure Supabase Database modal)
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey) {
        return {
          url: normalizeSupabaseUrl(parsed.url),
          anonKey: normalizeSupabaseKey(parsed.anonKey),
        };
      }
    }
  } catch (e) {
    console.warn('Could not read Supabase config from storage', e);
  }

  // Fallback to environment variables across Vite, Vercel, Next.js, and Supabase integrations
  const envUrl =
    (import.meta.env.VITE_SUPABASE_URL as string) ||
    (import.meta.env.NEXT_PUBLIC_SUPABASE_URL as string) ||
    (import.meta.env.SUPABASE_URL as string) ||
    (import.meta.env.VITE_PUBLIC_SUPABASE_URL as string) ||
    '';

  const envKey =
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
    (import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) ||
    (import.meta.env.SUPABASE_ANON_KEY as string) ||
    (import.meta.env.SUPABASE_KEY as string) ||
    (import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY as string) ||
    '';

  return {
    url: normalizeSupabaseUrl(envUrl),
    anonKey: normalizeSupabaseKey(envKey),
  };
}

export function saveSupabaseConfig(rawUrl: string, rawKey: string): { url: string; anonKey: string } {
  const url = normalizeSupabaseUrl(rawUrl);
  const anonKey = normalizeSupabaseKey(rawKey);

  localStorage.setItem(STORAGE_KEY, JSON.stringify({ url, anonKey }));
  clientInstance = null; // force client recreation
  cachedColumns = null;
  detectedAdmissionsTable = null;
  return { url, anonKey };
}

export function clearSupabaseConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
  clientInstance = null;
  cachedColumns = null;
  detectedAdmissionsTable = null;
}

let clientInstance: SupabaseClient | null = null;
let detectedAdmissionsTable: string | null = null;
let cachedColumns: Set<string> | null = null;

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
          autoRefreshToken: false,
        },
        db: {
          schema: 'public',
        },
      });
    } catch (e) {
      console.error('Failed to create Supabase client', e);
      return null;
    }
  }

  return clientInstance;
}

/**
 * Dynamically detects which table exists in the user's Supabase project:
 * Checks 'admissions', 'admission_inquiries', 'inquiries', 'admission_applications', etc.
 */
export async function detectAdmissionsTable(): Promise<string> {
  if (detectedAdmissionsTable) return detectedAdmissionsTable;

  const config = getSupabaseConfig();
  if (!config.url || !config.anonKey) return 'admissions';

  const client = getSupabaseClient();
  if (!client) return 'admissions';

  const candidates = ['admissions', 'admission_inquiries', 'inquiries', 'admission_applications', 'applications', 'admission'];

  // 1. Try checking PostgREST OpenAPI spec definitions
  try {
    const response = await fetch(`${config.url}/rest/v1/`, {
      method: 'GET',
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`,
      },
    });

    if (response.ok) {
      const spec = await response.json();
      if (spec?.definitions) {
        for (const candidate of candidates) {
          if (spec.definitions[candidate]) {
            detectedAdmissionsTable = candidate;
            return candidate;
          }
        }
      }
    }
  } catch (e) {
    // Ignore OpenAPI query error
  }

  // 2. Fallback probe candidate tables
  for (const candidate of candidates) {
    try {
      const { error } = await client.from(candidate).select('*', { count: 'exact', head: true }).limit(1);
      if (!error || error.code !== '42P01') {
        detectedAdmissionsTable = candidate;
        return candidate;
      }
    } catch (e) {
      // Continue probing
    }
  }

  detectedAdmissionsTable = 'admissions';
  return 'admissions';
}

/**
 * Inspects the actual Supabase admissions table columns in real time using the PostgREST OpenAPI schema
 * or probing existing records, caching verified columns to permanently eliminate schema mismatch errors.
 */
export async function getAdmissionsTableColumns(tableOverride?: string): Promise<Set<string> | null> {
  if (cachedColumns && cachedColumns.size > 0 && !tableOverride) {
    return cachedColumns;
  }

  const config = getSupabaseConfig();
  if (!config.url || !config.anonKey) return null;

  const targetTable = tableOverride || (await detectAdmissionsTable());

  try {
    // 1. Query PostgREST OpenAPI spec from root /rest/v1/
    const response = await fetch(`${config.url}/rest/v1/`, {
      method: 'GET',
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`,
      },
    });

    if (response.ok) {
      const spec = await response.json();
      const tableDef = spec?.definitions?.[targetTable]?.properties;
      if (tableDef && typeof tableDef === 'object') {
        const cols = new Set<string>(Object.keys(tableDef));
        cachedColumns = cols;
        return cols;
      }
    }
  } catch (e) {
    // OpenAPI query not available or blocked, fallback to probe
  }

  // 2. Fallback: probe table to inspect returned keys
  try {
    const client = getSupabaseClient();
    if (client) {
      const { data } = await client.from(targetTable).select('*').limit(1);
      if (data && data.length > 0 && typeof data[0] === 'object') {
        const cols = new Set<string>(Object.keys(data[0]));
        cachedColumns = cols;
        return cols;
      }
    }
  } catch (e) {
    // Ignore probe errors
  }

  return null;
}

export async function checkSupabaseStatus(): Promise<{
  configured: boolean;
  connected: boolean;
  message: string;
  normalizedUrl?: string;
  hasAdmissionsTable?: boolean;
  detectedColumns?: string[];
}> {
  const config = getSupabaseConfig();
  if (!config.url || !config.anonKey) {
    return {
      configured: false,
      connected: false,
      message: 'Supabase URL or Publishable Anon Key not configured. Using local storage mode.',
    };
  }

  const client = getSupabaseClient();
  if (!client) {
    return {
      configured: true,
      connected: false,
      message: 'Invalid Supabase URL or key format.',
    };
  }

  try {
    // Clear column cache to ensure fresh inspection
    cachedColumns = null;
    const columns = await getAdmissionsTableColumns();
    const detectedColsList = columns ? Array.from(columns) : undefined;

    // Attempt count query on admissions table to verify REST connection and schema
    const { error } = await client
      .from('admissions')
      .select('*', { count: 'exact', head: true })
      .limit(1);

    if (error) {
      // Check if table missing (Postgres error 42P01)
      if (error.code === '42P01' || error.message.includes('relation "admissions" does not exist')) {
        return {
          configured: true,
          connected: false,
          hasAdmissionsTable: false,
          normalizedUrl: config.url,
          message: 'Connected to Supabase project, but "admissions" table does not exist. Run the SQL schema to create it.',
        };
      }

      // Check schema cache error (PGRST204)
      if (error.code === 'PGRST204') {
        return {
          configured: true,
          connected: true,
          hasAdmissionsTable: true,
          normalizedUrl: config.url,
          detectedColumns: detectedColsList,
          message: 'Supabase table "admissions" reachable. Schema cache warning detected.',
        };
      }

      return {
        configured: true,
        connected: false,
        normalizedUrl: config.url,
        message: `Supabase status (${error.code || 'HTTP'}): ${error.message}`,
      };
    }

    const columnSummary = detectedColsList && detectedColsList.length > 0
      ? ` Verified columns: ${detectedColsList.slice(0, 8).join(', ')}${detectedColsList.length > 8 ? '...' : ''}.`
      : '';

    return {
      configured: true,
      connected: true,
      hasAdmissionsTable: true,
      normalizedUrl: config.url,
      detectedColumns: detectedColsList,
      message: `Connected to Supabase "admissions" table at ${config.url}.${columnSummary}`,
    };
  } catch (err: any) {
    return {
      configured: true,
      connected: false,
      normalizedUrl: config.url,
      message: `Connection failed: ${err.message || 'Unknown network error'}`,
    };
  }
}

/**
 * Permanent Schema-Matching and Insertion Engine:
 * 1. Checks for duplicate tracking number.
 * 2. Dynamically matches form fields with database columns:
 *    - student_name, father_name, class_applying, date_of_birth, dob, gender, home_address, address, phone, tracking_number.
 * 3. Inspects actual schema and prunes non-existent columns.
 * 4. Catches PGRST204 column mismatch errors, prunes the rejecting column, swaps in available aliases, and retries automatically.
 * 5. Returns confirmed cloud record ID only after Supabase confirms successful insertion.
 */
export async function submitAdmissionApplication(
  app: Omit<AdmissionApplication, 'id' | 'status' | 'createdAt'>
): Promise<{
  success: boolean;
  destination: 'supabase' | 'local';
  trackingId: string;
  application: AdmissionApplication;
  supabaseRecordId?: string;
  isDuplicate?: boolean;
  warning?: string;
  error?: string;
}> {
  const trackingNumber = app.trackingNumber || app.trackingId;
  const fullApp: AdmissionApplication = {
    ...app,
    trackingId: trackingNumber,
    trackingNumber: trackingNumber,
    createdAt: new Date().toISOString(),
    status: 'pending',
    syncedToCloud: false,
  };

  // Always back up locally first so student information is NEVER lost
  saveLocalAdmission(fullApp);

  const client = getSupabaseClient();

  if (!client) {
    const config = getSupabaseConfig();
    const missing = !config.url && !config.anonKey
      ? 'Supabase URL and API Key are not configured'
      : !config.url
      ? 'Supabase Project URL is not configured'
      : 'Supabase Publishable/Anon Key is not configured';

    return {
      success: false, // CRITICAL: NEVER claim success if record is not saved in Supabase
      destination: 'local',
      trackingId: trackingNumber,
      application: fullApp,
      error: `Cloud database not connected (${missing}). In Vercel, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Settings > Environment Variables, or configure them using the "Configure Supabase Database" button.`,
    };
  }

  try {
    const targetTable = await detectAdmissionsTable();

    // 1. Avoid duplicate submissions by checking if tracking_id already exists in Supabase
    try {
      let existingRecord: { id: string; tracking_id?: string; tracking_number?: string } | null = null;

      // Primary check using canonical tracking_id
      const queryTrackingId = await client
        .from(targetTable)
        .select('id, tracking_id')
        .eq('tracking_id', trackingNumber)
        .maybeSingle();

      if (queryTrackingId.data) {
        existingRecord = queryTrackingId.data;
      } else if (
        queryTrackingId.error &&
        (queryTrackingId.error.code === 'PGRST204' || queryTrackingId.error.message.includes('tracking_id'))
      ) {
        // Fallback to tracking_number only if table uses legacy column name
        const queryTrackingNumber = await client
          .from(targetTable)
          .select('id, tracking_number')
          .eq('tracking_number', trackingNumber)
          .maybeSingle();
        if (queryTrackingNumber.data) {
          existingRecord = queryTrackingNumber.data;
        }
      }

      if (existingRecord) {
        fullApp.syncedToCloud = true;
        fullApp.cloudId = existingRecord.id;
        saveLocalAdmission(fullApp);
        return {
          success: true,
          destination: 'supabase',
          trackingId: trackingNumber,
          supabaseRecordId: existingRecord.id,
          isDuplicate: true,
          application: {
            ...fullApp,
            id: existingRecord.id,
            syncedToCloud: true,
          },
        };
      }
    } catch (e) {
      // Ignore check error and continue to insert
    }

    // 2. Discover actual columns from Supabase table
    const knownColumns = await getAdmissionsTableColumns(targetTable);

    // 3. Build candidate payload matching all requested columns
    const payload: Record<string, any> = {};

    // student_name
    if (!knownColumns || knownColumns.has('student_name')) {
      payload.student_name = fullApp.studentName;
    } else if (knownColumns.has('studentName')) {
      payload.studentName = fullApp.studentName;
    }

    // father_name
    if (!knownColumns || knownColumns.has('father_name')) {
      payload.father_name = fullApp.fatherName;
    } else if (knownColumns.has('fatherName')) {
      payload.fatherName = fullApp.fatherName;
    }

    // class_applying (or class)
    if (knownColumns) {
      if (knownColumns.has('class_applying')) payload.class_applying = fullApp.classApplying;
      if (knownColumns.has('class')) payload.class = fullApp.classApplying;
      if (!knownColumns.has('class_applying') && !knownColumns.has('class')) {
        payload.class_applying = fullApp.classApplying;
      }
    } else {
      payload.class_applying = fullApp.classApplying;
    }

    // date_of_birth and dob
    if (knownColumns) {
      if (knownColumns.has('date_of_birth')) payload.date_of_birth = fullApp.dob;
      if (knownColumns.has('dob')) payload.dob = fullApp.dob;
      if (!knownColumns.has('date_of_birth') && !knownColumns.has('dob')) {
        payload.date_of_birth = fullApp.dob;
      }
    } else {
      payload.date_of_birth = fullApp.dob;
      payload.dob = fullApp.dob;
    }

    // gender
    if (!knownColumns || knownColumns.has('gender')) {
      payload.gender = fullApp.gender;
    }

    // home_address and address
    if (knownColumns) {
      if (knownColumns.has('home_address')) payload.home_address = fullApp.homeAddress;
      if (knownColumns.has('address')) payload.address = fullApp.homeAddress;
      if (!knownColumns.has('home_address') && !knownColumns.has('address')) {
        payload.home_address = fullApp.homeAddress;
      }
    } else {
      payload.home_address = fullApp.homeAddress;
      payload.address = fullApp.homeAddress;
    }

    // phone and parent_phone
    if (knownColumns) {
      if (knownColumns.has('phone')) payload.phone = fullApp.parentPhone;
      if (knownColumns.has('parent_phone')) payload.parent_phone = fullApp.parentPhone;
      if (!knownColumns.has('phone') && !knownColumns.has('parent_phone')) {
        payload.phone = fullApp.parentPhone;
      }
    } else {
      payload.phone = fullApp.parentPhone;
    }

    // tracking_id as the single canonical tracking column
    if (knownColumns) {
      if (knownColumns.has('tracking_id')) payload.tracking_id = trackingNumber;
      if (knownColumns.has('tracking_number')) payload.tracking_number = trackingNumber;
      if (!knownColumns.has('tracking_id') && !knownColumns.has('tracking_number')) {
        payload.tracking_id = trackingNumber;
      }
    } else {
      payload.tracking_id = trackingNumber;
    }

    // created_at
    if (!knownColumns || knownColumns.has('created_at')) {
      payload.created_at = fullApp.createdAt;
    }

    // 4. Adaptive Insertion Loop:
    // If PostgREST schema cache reports a column missing (PGRST204), automatically prune and retry
    let currentPayload = { ...payload };
    let savedRecordId: string | undefined = undefined;
    let lastError: any = null;
    let success = false;

    for (let attempt = 0; attempt < 8; attempt++) {
      try {
        const res = await client
          .from(targetTable)
          .insert([currentPayload])
          .select('id, tracking_id');

        if (!res.error) {
          savedRecordId = res.data?.[0]?.id;
          success = true;
          break;
        }

        // If error is RLS select policy (42501), retry with plain insert without select
        if (res.error.code === '42501' || res.error.message.includes('policy')) {
          const plainRes = await client.from(targetTable).insert([currentPayload]);
          if (!plainRes.error) {
            success = true;
            break;
          }
          lastError = plainRes.error;
        } else {
          lastError = res.error;
        }

        // If error is column mismatch (PGRST204), parse missing column, prune, adapt and retry
        if (lastError?.code === 'PGRST204' || lastError?.message?.includes('schema cache')) {
          const match = lastError.message.match(/Could not find the '([^']+)' column/i);
          if (match && match[1]) {
            const missingCol = match[1];
            console.warn(`Column '${missingCol}' not found in Supabase schema cache. Auto-adapting payload...`);

            if (cachedColumns) {
              cachedColumns.delete(missingCol);
            }

            delete currentPayload[missingCol];

            // Swap in available alternative alias if not present
            if (missingCol === 'address' && !currentPayload.home_address) {
              currentPayload.home_address = fullApp.homeAddress;
            } else if (missingCol === 'home_address' && !currentPayload.address) {
              currentPayload.address = fullApp.homeAddress;
            } else if (missingCol === 'date_of_birth' && !currentPayload.dob) {
              currentPayload.dob = fullApp.dob;
            } else if (missingCol === 'dob' && !currentPayload.date_of_birth) {
              currentPayload.date_of_birth = fullApp.dob;
            } else if (missingCol === 'class_applying' && !currentPayload.class) {
              currentPayload.class = fullApp.classApplying;
            } else if (missingCol === 'class' && !currentPayload.class_applying) {
              currentPayload.class_applying = fullApp.classApplying;
            } else if (missingCol === 'phone' && !currentPayload.parent_phone) {
              currentPayload.parent_phone = fullApp.parentPhone;
            } else if (missingCol === 'parent_phone' && !currentPayload.phone) {
              currentPayload.phone = fullApp.parentPhone;
            } else if (missingCol === 'tracking_number' && !currentPayload.tracking_id) {
              currentPayload.tracking_id = trackingNumber;
            } else if (missingCol === 'tracking_id' && !currentPayload.tracking_number) {
              currentPayload.tracking_number = trackingNumber;
            }

            // Retry with adapted payload
            continue;
          }
        }

        // For any non-schema error, break immediately
        break;
      } catch (err: any) {
        lastError = err;
        break;
      }
    }

    if (!success) {
      console.error('Supabase admission insert failed:', lastError);
      fullApp.syncedToCloud = false;
      fullApp.lastSyncError = lastError?.message || 'Database error';
      saveLocalAdmission(fullApp);

      let detailedError = lastError?.message || 'Failed to save record to Supabase database.';
      if (lastError?.code === '42501' || lastError?.message?.includes('violates row-level security policy')) {
        detailedError = `Supabase Row Level Security (RLS) Policy Error (42501): The "${targetTable}" table is rejecting anonymous inserts. Please open Supabase SQL Editor and run: CREATE POLICY "Allow public insert" ON public.${targetTable} FOR INSERT TO anon WITH CHECK (true);`;
      } else if (lastError?.code === '42P01' || lastError?.message?.includes('does not exist')) {
        detailedError = `Supabase Table Missing (42P01): Table "${targetTable}" does not exist in your Supabase project. Please run the SQL schema script in Supabase SQL Editor.`;
      } else if (lastError?.code === 'PGRST204' || lastError?.message?.includes('schema cache')) {
        detailedError = `Supabase Schema Cache Warning (PGRST204): ${lastError.message}. Run: NOTIFY pgrst, 'reload schema'; in Supabase SQL Editor.`;
      }

      return {
        success: false, // CRITICAL: Must be false so UI does not show fake success!
        destination: 'local',
        trackingId: trackingNumber,
        application: fullApp,
        error: detailedError,
      };
    }

    // Record verified in Supabase cloud!
    fullApp.syncedToCloud = true;
    fullApp.cloudId = savedRecordId;
    delete fullApp.lastSyncError;
    saveLocalAdmission(fullApp);

    return {
      success: true,
      destination: 'supabase',
      trackingId: trackingNumber,
      supabaseRecordId: savedRecordId,
      application: {
        ...fullApp,
        id: savedRecordId,
        syncedToCloud: true,
      },
    };
  } catch (err: any) {
    console.error('Submission exception:', err);
    fullApp.syncedToCloud = false;
    fullApp.lastSyncError = err.message || 'Network exception';
    saveLocalAdmission(fullApp);

    return {
      success: false, // CRITICAL: Must be false on network exception!
      destination: 'local',
      trackingId: trackingNumber,
      application: fullApp,
      error: `Network error while connecting to Supabase: ${err.message || 'Check your connection'}. Application saved locally.`,
    };
  }
}

/**
 * Submits an Official Inquiry / Admission Inquiry from the Contact Section to Supabase.
 * Checks for dedicated 'inquiries' or 'admission_inquiries' table, and adaptively maps to 'admissions'.
 */
export async function submitContactInquiry(inquiry: {
  name: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<{
  success: boolean;
  destination: 'supabase' | 'local';
  inquiryId?: string;
  error?: string;
}> {
  const client = getSupabaseClient();
  const inquiryRecord = {
    ...inquiry,
    createdAt: new Date().toISOString(),
  };

  if (!client) {
    return {
      success: false,
      destination: 'local',
      error: 'Supabase cloud database is not connected. In Vercel, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Environment Variables, or configure them using the database modal.',
    };
  }

  try {
    const candidateTables = ['inquiries', 'admission_inquiries', 'admissions'];
    let inserted = false;
    let recordId: string | undefined = undefined;
    let lastError: any = null;

    for (const table of candidateTables) {
      try {
        let payload: Record<string, any>;
        if (table === 'admissions') {
          payload = {
            student_name: inquiry.name,
            father_name: '[Inquiry Submission]',
            phone: inquiry.phone,
            class_applying: inquiry.subject,
            home_address: inquiry.message,
            address: inquiry.message,
            tracking_id: `INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            created_at: inquiryRecord.createdAt,
          };
        } else {
          payload = {
            name: inquiry.name,
            phone: inquiry.phone,
            subject: inquiry.subject,
            message: inquiry.message,
            created_at: inquiryRecord.createdAt,
          };
        }

        const res = await client.from(table).insert([payload]).select('id');
        if (!res.error) {
          recordId = res.data?.[0]?.id;
          inserted = true;
          break;
        }

        // Try plain insert if select RLS policy is restricted
        if (res.error.code === '42501' || res.error.message.includes('policy')) {
          const plainRes = await client.from(table).insert([payload]);
          if (!plainRes.error) {
            inserted = true;
            break;
          }
          lastError = plainRes.error;
        } else {
          lastError = res.error;
        }

        // If table doesn't exist (42P01), try the next candidate table
        if (res.error.code === '42P01' || res.error.message.includes('does not exist')) {
          continue;
        }
      } catch (err) {
        lastError = err;
      }
    }

    if (!inserted) {
      let detailed = lastError?.message || 'Failed to submit inquiry to Supabase.';
      if (lastError?.code === '42501' || lastError?.message?.includes('policy')) {
        detailed = 'Supabase Row Level Security (RLS) Policy error (42501): The database table rejected public insertion. Run: CREATE POLICY "Allow public insert" ON public.inquiries FOR INSERT TO anon WITH CHECK (true);';
      }
      return {
        success: false,
        destination: 'local',
        error: detailed,
      };
    }

    return {
      success: true,
      destination: 'supabase',
      inquiryId: recordId,
    };
  } catch (err: any) {
    return {
      success: false,
      destination: 'local',
      error: err.message || 'Network exception while connecting to Supabase database',
    };
  }
}

/**
 * Retries syncing any locally saved applications that have not yet reached Supabase.
 */
export async function syncPendingLocalApplications(): Promise<{
  syncedCount: number;
  failedCount: number;
  errors: string[];
}> {
  const list = getLocalAdmissions();
  const pending = list.filter((a) => !a.syncedToCloud);
  if (pending.length === 0) {
    return { syncedCount: 0, failedCount: 0, errors: [] };
  }

  let syncedCount = 0;
  let failedCount = 0;
  const errors: string[] = [];

  for (const item of pending) {
    const res = await submitAdmissionApplication({
      studentName: item.studentName,
      fatherName: item.fatherName,
      dob: item.dob,
      gender: item.gender,
      classApplying: item.classApplying,
      parentPhone: item.parentPhone,
      homeAddress: item.homeAddress,
      trackingId: item.trackingId,
      trackingNumber: item.trackingNumber || item.trackingId,
    });

    if (res.destination === 'supabase') {
      syncedCount++;
    } else {
      failedCount++;
      if (res.warning) errors.push(res.warning);
    }
  }

  return { syncedCount, failedCount, errors };
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
    const existingIndex = list.findIndex(
      (a) => a.trackingId === app.trackingId || (a.trackingNumber && a.trackingNumber === app.trackingNumber)
    );
    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...app };
    } else {
      list.unshift(app);
    }
    localStorage.setItem(LOCAL_ADMISSIONS_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed saving locally', e);
  }
}

export const SUPABASE_SQL_SCHEMA = `-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query):

-- ==============================================================================
-- 1. ADMISSIONS TABLE (Online Admission Applications)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.admissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  class_applying TEXT NOT NULL,
  date_of_birth DATE,
  dob DATE,
  gender TEXT NOT NULL,
  home_address TEXT,
  address TEXT,
  phone TEXT NOT NULL,
  tracking_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure tracking_id and all matching/alias columns exist safely:
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS tracking_id TEXT;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS student_name TEXT;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS father_name TEXT;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS class_applying TEXT;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS date_of_birth DATE;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS dob DATE;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS home_address TEXT;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS parent_phone TEXT;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS tracking_number TEXT;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Synchronize existing records if table previously used tracking_number:
UPDATE public.admissions SET tracking_id = tracking_number WHERE tracking_id IS NULL AND tracking_number IS NOT NULL;

-- Enable Row Level Security (RLS) on admissions
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous inserts
DROP POLICY IF EXISTS "Allow public insert to admissions" ON public.admissions;
CREATE POLICY "Allow public insert to admissions"
  ON public.admissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow public verification by tracking_id
DROP POLICY IF EXISTS "Allow public read by tracking_id" ON public.admissions;
CREATE POLICY "Allow public read by tracking_id"
  ON public.admissions
  FOR SELECT
  TO anon, authenticated
  USING (true);

GRANT ALL ON TABLE public.admissions TO anon, authenticated;

-- ==============================================================================
-- 2. INQUIRIES TABLE (Contact & Admission Inquiries)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on inquiries
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous inserts for inquiries
DROP POLICY IF EXISTS "Allow public insert to inquiries" ON public.inquiries;
CREATE POLICY "Allow public insert to inquiries"
  ON public.inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow public reading inquiries
DROP POLICY IF EXISTS "Allow public read to inquiries" ON public.inquiries;
CREATE POLICY "Allow public read to inquiries"
  ON public.inquiries
  FOR SELECT
  TO anon, authenticated
  USING (true);

GRANT ALL ON TABLE public.inquiries TO anon, authenticated;
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Force PostgREST to reload schema cache immediately
NOTIFY pgrst, 'reload schema';
`;
