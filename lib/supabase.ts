import { createClient } from '@supabase/supabase-js';

// Configuration from user prompt
const supabaseUrl = 'https://zipwpxhzisxjgiiqxjer.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppcHdweGh6aXN4amdpaXF4amVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1MzU5MTksImV4cCI6MjA4NTExMTkxOX0.GZIpozcKGCuoLLkdPPm3fIUJa17MtJQGfqgworBO5XU';

export const supabase = createClient(supabaseUrl, supabaseKey);