import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kyjfsmuxoircxabdvloc.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = supabaseKey && createClient(supabaseUrl, supabaseKey);

export default supabase;
