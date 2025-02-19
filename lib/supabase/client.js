import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fhnkvzkcegamuyiakjfj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZobmt2emtjZWdhbXV5aWFramZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MTkwODcsImV4cCI6MjA1NTM5NTA4N30.vpCuyjuQNbrN956HSMKw2XN8JssuWNMem9aRZbFpbb0';

export const supabase = createClient(supabaseUrl, supabaseKey);
