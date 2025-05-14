import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kyjfsmuxoircxabdvloc.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
console.log(supabaseKey);

const supabase = supabaseKey && createClient(supabaseUrl, supabaseKey);

export default supabase;
