
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User;
  onLogout: () => void;
  onOpenSystemDocs: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onOpenSystemDocs }) => {
  return (
    <header className="h-16 border-b border-slate-200 bg-white glass-effect z-10 sticky top-0 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-slate-800 capitalize">
          Welcome, {user.name.split(' ')[0]}
        </h2>
        <span className="hidden md:inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded uppercase">
          {user.role.replace('_', ' ')}
        </span>
      </div>

      <div className="flex items-center space-x-6">
        <button 
          onClick={onOpenSystemDocs}
          className="text-slate-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Architecture Docs
        </button>

        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">{user.name}</p>
            <p className="text-xs text-slate-500">{user.designation}</p>
          </div>
          <img 
            src={user.profileImage || `https://picsum.photos/seed/${user.id}/100`} 
            alt="Profile" 
            className="w-10 h-10 rounded-full border-2 border-slate-200 shadow-sm object-cover"
          />
          <button 
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            title="Logout"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
