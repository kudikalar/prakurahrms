
import React, { useState } from 'react';
import { UserRole } from '../types';

interface AuthScreenProps {
  onLogin: (email: string, pass: string) => void;
  onSignup: (user: any) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onSignup }) => {
  const [view, setView] = useState<'landing' | 'login' | 'signup'>('landing');
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '', 
    role: UserRole.EMPLOYEE, 
    designation: '', 
    department: 'Engineering' 
  });

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formData.password) {
      setError("Password is required.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    const { confirmPassword, ...signupData } = formData;
    onSignup(signupData);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }
    try {
      onLogin(formData.email, formData.password);
    } catch (err: any) {
      setError(err.message || "Invalid credentials.");
    }
  };

  const resetError = () => setError(null);

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col text-white">
        <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center font-black shadow-lg shadow-blue-500/20">P</div>
            <span className="font-bold text-2xl tracking-tighter uppercase italic">Prakura</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => { setView('login'); resetError(); }} className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Sign In</button>
            <button onClick={() => { setView('signup'); resetError(); }} className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all hover:bg-blue-700 shadow-xl shadow-blue-500/20">Register</button>
          </div>
        </nav>

        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center space-y-10 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none"></div>
          
          <div className="z-10 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[3px] animate-pulse">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Prakura IT Solutions • Unified ERP Suite
            </div>
            <h1 className="text-6xl md:text-9xl font-black max-w-6xl leading-[0.9] tracking-tighter">
              BEYOND <span className="text-blue-500 italic">HRMS.</span><br/>ENTERPRISE GROWTH.
            </h1>
            <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
              A comprehensive IT Solutions suite for training academies, tech firms, and digital enterprises. Built for speed, scale, and intelligence.
            </p>
            <div className="flex flex-wrap gap-6 justify-center pt-8">
              <button onClick={() => { setView('signup'); resetError(); }} className="bg-blue-600 hover:bg-blue-700 px-14 py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-blue-500/40 transition-all transform hover:-translate-y-2">Start Workspace</button>
              <button onClick={() => { setView('login'); resetError(); }} className="bg-white/5 hover:bg-white/10 backdrop-blur-xl px-14 py-6 rounded-[2rem] font-black text-xl transition-all border border-white/10">Member Login</button>
            </div>
          </div>
        </main>

        <footer className="p-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-slate-500 text-xs gap-4">
          <p>© 2024 Prakura IT Solutions Private Limited. All Rights Reserved.</p>
          <div className="flex gap-8 font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-blue-500">Privacy</a>
            <a href="#" className="hover:text-blue-500">Terms</a>
            <a href="#" className="hover:text-blue-500">Support</a>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
      
      <div className="max-w-md w-full z-10 space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center relative">
          <button 
            onClick={() => {setView('landing'); resetError();}} 
            className="group absolute -top-12 left-0 flex items-center gap-2 text-slate-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className="text-xs font-bold uppercase tracking-widest">Back to Home</span>
          </button>
          
          <button onClick={() => setView('landing')} className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center text-4xl font-black text-white mb-8 shadow-2xl shadow-blue-500/40 transition-transform hover:scale-105">P</button>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase">{view === 'login' ? 'Welcome Back' : 'Create Seat'}</h2>
          <p className="text-slate-500 mt-2 font-medium">{view === 'login' ? 'Access your Prakura IT Workspace' : 'Initialize your professional profile'}</p>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-3xl border border-slate-700/50 p-10 rounded-[2.5rem] shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold rounded-2xl animate-in shake duration-300">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {error}
              </div>
            </div>
          )}

          {view === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <AuthInput label="Work Email" type="email" value={formData.email} onChange={(v: string) => setFormData({...formData, email: v})} />
              <AuthInput label="Secret Password" type="password" value={formData.password} onChange={(v: string) => setFormData({...formData, password: v})} />
              <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-[0.98] uppercase tracking-[2px] text-sm">Enter Workspace</button>
              <div className="pt-2 text-center">
                <span className="text-sm text-slate-500 font-medium">New member? </span>
                <button type="button" onClick={() => {setView('signup'); resetError();}} className="text-blue-500 font-bold hover:underline">Register Here</button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <AuthInput label="Full Name" value={formData.name} onChange={(v: string) => setFormData({...formData, name: v})} />
              <AuthInput label="Work Email" type="email" value={formData.email} onChange={(v: string) => setFormData({...formData, email: v})} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AuthInput label="Set Password" type="password" value={formData.password} onChange={(v: string) => setFormData({...formData, password: v})} />
                <AuthInput label="Confirm Password" type="password" value={formData.confirmPassword} onChange={(v: string) => setFormData({...formData, confirmPassword: v})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <AuthInput label="Designation" value={formData.designation} onChange={(v: string) => setFormData({...formData, designation: v})} />
                <AuthInput label="Unit" value={formData.department} onChange={(v: string) => setFormData({...formData, department: v})} />
              </div>
              <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all mt-4 uppercase tracking-[2px] text-sm">Create Workspace</button>
              <div className="pt-2 text-center">
                <span className="text-sm text-slate-500 font-medium">Already a member? </span>
                <button type="button" onClick={() => {setView('login'); resetError();}} className="text-blue-500 font-bold hover:underline">Sign In</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const AuthInput = ({ label, type = 'text', value, onChange }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[2px] ml-1">{label}</label>
    <input 
      required 
      type={type} 
      className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700/50 rounded-2xl text-white font-medium focus:border-blue-500 outline-none transition-all placeholder:text-slate-700" 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
    />
  </div>
);

export default AuthScreen;
