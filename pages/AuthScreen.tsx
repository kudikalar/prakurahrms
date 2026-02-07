
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
    designation: 'Professional',
    department: 'Operations'
  });

  const handleRoleChange = (role: UserRole) => {
    let dept = 'Operations';
    let desig = 'Professional';
    
    if (role === UserRole.HR_ADMIN) {
      dept = 'Human Resources';
      desig = 'HR Executive';
    } else if (role === UserRole.SUPER_ADMIN) {
      dept = 'Administration';
      desig = 'System Admin';
    } else {
      dept = 'Engineering';
      desig = 'Member';
    }

    setFormData({
      ...formData,
      role,
      department: dept,
      designation: desig
    });
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formData.password) return setError("Security Key is mandatory.");
    if (formData.password.length < 6) return setError("Key must be 6+ chars.");
    if (formData.password !== formData.confirmPassword) return setError("Keys do not match.");
    
    const { confirmPassword, ...signupData } = formData;
    onSignup(signupData);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      onLogin(formData.email, formData.password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col text-white">
        <nav className="p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-[1.25rem] flex items-center justify-center font-black shadow-2xl">P</div>
            <span className="font-black text-3xl tracking-tighter uppercase italic">Prakura</span>
          </div>
          <div className="flex gap-6 items-center">
            <button onClick={() => setView('login')} className="text-sm font-black text-slate-500 hover:text-white transition-all uppercase tracking-widest">Login</button>
            <button onClick={() => setView('signup')} className="bg-white text-slate-950 px-8 py-3 rounded-2xl text-sm font-black transition-all hover:bg-blue-500 hover:text-white shadow-xl">Join Us</button>
          </div>
        </nav>

        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center space-y-12 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>
          
          <div className="z-10 space-y-8 animate-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[4px] backdrop-blur-md">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Enterprise IT Infrastructure
            </div>
            <h1 className="text-7xl md:text-[10rem] font-black max-w-7xl leading-[0.8] tracking-tighter">
              UNIFY YOUR <span className="text-blue-500 italic underline decoration-blue-500/30">ENGINE.</span>
            </h1>
            <p className="text-slate-500 text-xl md:text-3xl max-w-3xl mx-auto font-medium leading-relaxed">
              Role-based HRMS designed for IT Solutions & Academy lifecycle.
            </p>
            <div className="flex flex-wrap gap-8 justify-center pt-10">
              <button onClick={() => setView('signup')} className="bg-blue-600 hover:bg-blue-700 px-16 py-6 rounded-3xl font-black text-2xl shadow-[0_20px_50px_rgba(37,99,235,0.3)] transition-all transform hover:-translate-y-2 uppercase tracking-tight">Register Workspace</button>
              <button onClick={() => setView('login')} className="bg-white/5 hover:bg-white/10 backdrop-blur-2xl px-16 py-6 rounded-3xl font-black text-2xl transition-all border border-white/10 uppercase tracking-tight">Member Portal</button>
            </div>
          </div>
        </main>

        <footer className="p-12 border-t border-white/5 text-center text-slate-600 text-xs font-bold uppercase tracking-[4px]">
          © 2024 Prakura IT Solutions Private Limited
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent opacity-40"></div>
      
      <div className="max-w-md w-full z-10 space-y-10 animate-in fade-in zoom-in duration-500">
        <div className="text-center relative">
          <button 
            onClick={() => {setView('landing'); setError(null);}} 
            className="group absolute -top-16 left-0 flex items-center gap-3 text-slate-500 hover:text-white transition-all"
          >
            <svg className="w-6 h-6 transition-transform group-hover:-translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className="text-[10px] font-black uppercase tracking-[3px]">Back to Home</span>
          </button>
          
          <button onClick={() => setView('landing')} className="w-24 h-24 bg-blue-600 rounded-[2.5rem] mx-auto flex items-center justify-center text-5xl font-black text-white mb-10 shadow-3xl transform hover:scale-110 transition-transform">P</button>
          <h2 className="text-5xl font-black text-white tracking-tighter uppercase">{view === 'login' ? 'Welcome' : 'Register'}</h2>
        </div>

        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-[3.5rem] shadow-2xl">
          {error && (
            <div className="mb-8 p-5 bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-black rounded-2xl animate-bounce uppercase tracking-widest text-center">
              Error: {error}
            </div>
          )}

          {view === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-8">
              <AuthInput label="Corporate Email" type="email" value={formData.email} onChange={(v: string) => setFormData({...formData, email: v})} />
              <AuthInput label="Security Key" type="password" value={formData.password} onChange={(v: string) => setFormData({...formData, password: v})} />
              <button type="submit" className="w-full py-6 bg-blue-600 text-white font-black rounded-[2rem] shadow-2xl hover:bg-blue-700 transition-all uppercase tracking-[3px] text-xs">Enter Dashboard</button>
              <p className="text-center text-[10px] text-slate-500 font-black uppercase tracking-[2px]">
                New here? <button type="button" onClick={() => setView('signup')} className="text-blue-500 underline">Create Workspace</button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-6">
              <AuthInput label="Full Professional Name" value={formData.name} onChange={(v: string) => setFormData({...formData, name: v})} />
              <AuthInput label="Work Email Address" type="email" value={formData.email} onChange={(v: string) => setFormData({...formData, email: v})} />
              
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[3px] ml-2">Assign Role & Unit</label>
                <div className="grid grid-cols-3 gap-3">
                   {(['EMPLOYEE', 'HR', 'ADMIN'] as const).map(r => (
                     <button
                        key={r}
                        type="button"
                        onClick={() => handleRoleChange(r === 'HR' ? UserRole.HR_ADMIN : r === 'ADMIN' ? UserRole.SUPER_ADMIN : UserRole.EMPLOYEE)}
                        className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                          (r === 'HR' && formData.role === UserRole.HR_ADMIN) || 
                          (r === 'ADMIN' && formData.role === UserRole.SUPER_ADMIN) ||
                          (r === 'EMPLOYEE' && formData.role === UserRole.EMPLOYEE)
                            ? 'bg-blue-600 text-white border-blue-500 shadow-lg' 
                            : 'bg-white/5 text-slate-500 border-white/10 hover:border-white/30'
                        }`}
                     >
                       {r}
                     </button>
                   ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <AuthInput label="Set Key" type="password" value={formData.password} onChange={(v: string) => setFormData({...formData, password: v})} />
                <AuthInput label="Verify Key" type="password" value={formData.confirmPassword} onChange={(v: string) => setFormData({...formData, confirmPassword: v})} />
              </div>
              
              <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                <p className="text-[9px] font-black text-blue-400 uppercase tracking-[2px] text-center">
                  UNIT: {formData.department.toUpperCase()} • {formData.designation.toUpperCase()}
                </p>
              </div>

              <button type="submit" className="w-full py-6 bg-blue-600 text-white font-black rounded-[2rem] shadow-2xl hover:bg-blue-700 transition-all mt-4 uppercase tracking-[3px] text-xs">Initialize Professional Profile</button>
              <p className="text-center text-[10px] text-slate-500 font-black uppercase tracking-[2px]">
                Active seat? <button type="button" onClick={() => setView('login')} className="text-blue-500 underline">Sign In</button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const AuthInput = ({ label, type = 'text', value, onChange }: any) => (
  <div className="space-y-2.5">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[3px] ml-2">{label}</label>
    <input 
      required 
      type={type} 
      className="w-full px-7 py-5 bg-white/5 border border-white/10 rounded-[2rem] text-white font-bold focus:border-blue-500 outline-none transition-all placeholder:text-slate-700" 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
    />
  </div>
);

export default AuthScreen;
