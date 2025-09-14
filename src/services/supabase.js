import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://nmprniaucgjeyneuprin.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tcHJuaWF1Y2dqZXluZXVwcmluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMDAwMjMsImV4cCI6MjA2NTc3NjAyM30.jPTOABmUGmvP5WQRjuYfBedPQsTV9GMpT1mcPnQ4sMY"; // Your real anon key
export const supabase = createClient(supabaseUrl, supabaseKey);
