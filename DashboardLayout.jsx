import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, FileText, Settings, LogOut, Menu, X, 
  ChevronDown, Bell
} from 'lucide-react';

const DashboardLayout = ({ children, user, isAdmin }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const menuItems = [
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: FileText, label: 'Jobs', path: '/jobs' },
    ...(isAdmin ? [{ icon: Settings, label: 'Admin', path: '/admin' }] : [])
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static transition-transform duration-300 ease-in-out
      `}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4 bg-blue-600 text-white">
            <h1 className="text-xl font-bold">Inventory System</h1>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center px-2 py-2 text-sm font-medium rounded-md
                  hover:bg-gray-50 hover:text-blue-600"
              >
                <item.icon className="mr-3 h-6 w-6" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-1 rounded-full hover:bg-gray-100">
                <Bell className="h-6 w-6" />
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    {user?.email?.[0].toUpperCase()}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <button
                      onClick={() => supabase.auth.signOut()}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
