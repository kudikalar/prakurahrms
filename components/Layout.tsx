
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
  BookOpenCheck,
  Wand2
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
    { name: 'AI Creative Lab', icon: Wand2, path: '/ai-lab', roles: ['SUPER_ADMIN', 'HR', 'MANAGER', 'TRAINER', 'EMPLOYEE', 'INTERN'] },
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
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-white font-black text-xl tracking-tighter">PKR</span>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tight text-slate-800 leading-none">Prakura</span>
            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-0.5 italic">IT Solutions</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {filteredMenu.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-100' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 3 : 2} />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-slate-50 rounded-2xl">
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden">
                {user?.avatar ? <img src={user.avatar} alt="P" className="w-full h-full object-cover" /> : <UserCircle size={20} className="text-slate-300" />}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-black text-slate-700 truncate">{user?.firstName} {user?.lastName}</span>
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{user?.role}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors font-bold text-sm"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">
              {menuItems.find(m => m.path === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500 relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-100"></div>
            <div className="text-right hidden sm:block">
               <p className="text-xs font-black text-slate-800 tracking-tight">{new Date().toDateString()}</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Office Hours: 09:00 - 18:00</p>
            </div>
          </div>
        </header>

        {/* Page Area */}
        <div className="flex-1 overflow-auto p-4 md:p-10">
           <Outlet />
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute inset-0 z-50 bg-slate-900/40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-64 h-full bg-white flex flex-col p-6 animate-slide-in-left" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-8">
                <span className="font-black text-xl text-indigo-600 tracking-tighter">PKR Prakura</span>
                <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
              </div>
              <nav className="space-y-2">
                {filteredMenu.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-bold"
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
