import { createClient } from '@supabase/supabase-js';

// Only bypass SSL in development (not in Vercel production)
if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

// Supabase configuration with fallback values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mbkasmairjeubtpwcykj.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ia2FzbWFpcmpldWJ0cHdjeWtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1Mjc2MDUsImV4cCI6MjA4MzEwMzYwNX0.0RVegxwCgaJ3Jl5f6rwwdywSLh4iOYx7rXtyj54_aFM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

