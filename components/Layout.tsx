
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  CalendarDays, 
  Wallet, 
  GraduationCap, 
  BarChart3, 
  UserCircle,
  LogOut,
  Menu,
  X,
  Bell,
  BookOpenCheck
} from 'lucide-react';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/', roles: ['SUPER_ADMIN', 'HR', 'MANAGER', 'TRAINER', 'EMPLOYEE', 'INTERN'] },
    { name: 'Employees', icon: Users, path: '/employees', roles: ['SUPER_ADMIN', 'HR', 'MANAGER'] },
    { name: 'Attendance', icon: Clock, path: '/attendance', roles: ['SUPER_ADMIN', 'HR', 'MANAGER', 'TRAINER', 'EMPLOYEE', 'INTERN'] },
    { name: 'Leaves', icon: CalendarDays, path: '/leaves', roles: ['SUPER_ADMIN', 'HR', 'MANAGER', 'TRAINER', 'EMPLOYEE', 'INTERN'] },
    { name: 'Payroll', icon: Wallet, path: '/payroll', roles: ['SUPER_ADMIN', 'HR'] },
    { name: 'Internships', icon: GraduationCap, path: '/internships', roles: ['SUPER_ADMIN', 'HR', 'TRAINER', 'INTERN'] },
    { name: 'Faculty', icon: BookOpenCheck, path: '/faculty', roles: ['SUPER_ADMIN', 'HR', 'TRAINER'] },
    { name: 'Performance', icon: BarChart3, path: '/performance', roles: ['SUPER_ADMIN', 'HR', 'MANAGER', 'TRAINER', 'EMPLOYEE'] },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredMenu = menuItems.filter(item => user && item.roles.includes(item.roles.find(r => r === user.role) || ''));

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">Prakura</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {filteredMenu.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <UserCircle size={24} className="text-slate-400" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-700">{user?.firstName} {user?.lastName}</span>
              <span className="text-xs text-slate-500 font-medium">{user?.role}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-semibold text-slate-800">
              {menuItems.find(m => m.path === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-medium overflow-hidden">
               {user?.avatar ? <img src={user.avatar} alt="Profile" /> : <UserCircle size={28} />}
            </div>
          </div>
        </header>

        {/* Page Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
           <Outlet />
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute inset-0 z-50 bg-black/50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-64 h-full bg-white flex flex-col p-6 animate-slide-in-left" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-xl text-indigo-600">Prakura</span>
                <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
              </div>
              <nav className="space-y-2">
                {filteredMenu.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600"
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Layout;
