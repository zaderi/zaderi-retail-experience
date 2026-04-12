import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// These must match the names in your .env file exactly
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidSupabaseUrl = (value?: string) => typeof value === 'string' && /^https?:\/\//.test(value);
const isValidSupabaseKey = (value?: string) => typeof value === 'string' && value.trim().length > 0 && !value.includes('your_supabase');

const supabaseConfigured = isValidSupabaseUrl(supabaseUrl) && isValidSupabaseKey(supabaseAnonKey);

if (!supabaseConfigured) {
  console.warn('Supabase is not configured. Data inserts are disabled until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
}

export const supabase: SupabaseClient | null = supabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;