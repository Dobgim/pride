import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lljapzhyoburyamoygzd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsamFwemh5b2J1cnlhbW95Z3pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2NzA2MzcsImV4cCI6MjEwMzI0NjYzN30.bktLKRdUeOwrwaN56zixX8t323bW2mBffs-j4Jn_G4k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
