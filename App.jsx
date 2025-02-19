import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fhnkvzkcegamuyiakjfj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZobmt2emtjZWdhbXV5aWFramZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MTkwODcsImV4cCI6MjA1NTM5NTA4N30.vpCuyjuQNbrN956HSMKw2XN8JssuWNMem9aRZbFpbb0';
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check authentication status
    const session = supabase.auth.getSession();
    if (session) {
      setUser(session.user);
      checkAdminStatus(session.user);
    }

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user);
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const checkAdminStatus = async (user) => {
    if (!user) return;
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (data && data.role === 'admin') {
      setIsAdmin(true);
    }
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <DashboardLayout user={user} isAdmin={isAdmin}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute isAdmin={isAdmin}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/inventory" element={<InventoryView />} />
            <Route path="/inventory/:id" element={<ItemDetailView />} />
            <Route path="/jobs" element={<JobManagement />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </DashboardLayout>
      </div>
    </BrowserRouter>
  );
