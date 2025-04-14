// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

export const supabase = createClient("https://lahdueuocnmtamgybroa.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhaGR1ZXVvY25tdGFtZ3licm9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNjUxMDIsImV4cCI6MjA1Njc0MTEwMn0.X-CgPM3SZ8bHwzU764d8xFC3W9kU0ktYAjpmi5enfX8");
