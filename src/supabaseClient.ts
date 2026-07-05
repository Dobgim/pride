import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cyyntnyvzfrmqdgpodbp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5eW50bnl2emZybXFkZ3BvZGJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxOTI5MzksImV4cCI6MjA5ODc2ODkzOX0.kls9Ua0_3MOW7pairJmbp9aPrZs7BDnAkJBNSm78L48';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
