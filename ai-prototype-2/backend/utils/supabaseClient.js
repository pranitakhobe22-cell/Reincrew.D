const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('[Supabase] Missing credentials. Supabase functionality will be disabled.');
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

module.exports = supabase;
