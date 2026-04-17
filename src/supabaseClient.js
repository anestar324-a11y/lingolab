import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ddgykktmrlmtscjnjqac.supabase.co';
const SUPABASE_KEY = 'sb_publishable_C9_JN-Y4_URbmT3hXZzvCw_A-0FBfTJ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
