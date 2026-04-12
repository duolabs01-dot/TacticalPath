import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env automatically (works with Vite's env loading)
const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);