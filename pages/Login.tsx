
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Loader2, Sparkles, Wand2 } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@prakura.in');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row animate-in fade-in duration-1000">
      {/* Left Branding Side */}
      <div className="hidden md:flex flex-1 bg-slate-900 relative items-center justify-center p-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-slate-900 to-slate-950"></div>
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]"></div>
        
        <div className="relative z-10 max-w-lg space-y-10">
           <div className="inline-flex items-center justify-center w-24 h-24 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl">
              <span className="text-white text-5xl font-black italic tracking-tighter">PKR</span>
           </div>
           <div className="space-y-4">
              <h1 className="text-6xl font-black text-white leading-none tracking-tighter italic">Neuro-Powered <br/> <span className="text-indigo-400">Human Resources.</span></h1>
              <p className="text-xl text-slate-400 font-medium italic">Prakura IT Solutions: Architecting the future of talent management with Gemini Intelligence.</p>
           </div>
           <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-indigo-400">
                    <Sparkles size={20} />
                    <span className="font-black uppercase tracking-widest text-[10px]">Vision Intel</span>
                 </div>
                 <p className="text-slate-500 font-medium text-sm">Automated performance and sentiment analysis.</p>
              </div>
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-indigo-400">
                    <Wand2 size={20} />
                    <span className="font-black uppercase tracking-widest text-[10px]">Creative Hub</span>
                 </div>
                 <p className="text-slate-500 font-medium text-sm">In-house AI asset generation for trainers.</p>
              </div>
           </div>
        </div>
      </div>

      {/* Right Login Side */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-20">
        <div className="max-w-md w-full">
          {/* Mobile Logo */}
          <div className="md:hidden text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-2xl mb-4 shadow-xl">
              <span className="text-white text-2xl font-black">PKR</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900">Prakura HRMS</h1>
          </div>

          <div className="bg-white p-10 md:p-14 rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/50">
            <div className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">Welcome Back</h2>
                <p className="text-slate-500 mt-2 font-bold uppercase tracking-widest text-[10px]">Enter corporate credentials</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Corporate Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="architect@prakura.in"
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all font-bold placeholder:text-slate-300"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Master Key</label>
                  <a href="#" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Reset</a>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all font-bold placeholder:text-slate-300"
                />
              </div>

              {error && (
                <div className="p-4 bg-rose-50 text-rose-600 text-xs font-black uppercase tracking-widest rounded-2xl border border-rose-100 animate-shake">
                  {error}
                </div>
              )}

              <button
                disabled={loading}
                type="submit"
                className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-5 rounded-2xl transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-2xl uppercase tracking-widest text-sm"
              >
                {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck size={20} />}
                {loading ? 'Authenticating...' : 'Commence Session'}
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-slate-50">
               <div className="flex flex-col gap-4">
                  <p className="text-[10px] text-center text-slate-400 font-black uppercase tracking-[0.3em]">Simulation Presets</p>
                  <div className="flex flex-wrap justify-center gap-3">
                     <button onClick={() => {setEmail('admin@prakura.in'); setPassword('admin123')}} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">Admin</button>
                     <button onClick={() => {setEmail('hr@prakura.in'); setPassword('hr123')}} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">HR</button>
                     <button onClick={() => {setEmail('emp@prakura.in'); setPassword('emp123')}} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">Staff</button>
                  </div>
               </div>
            </div>
          </div>

          <p className="text-center mt-12 text-slate-400 text-[10px] font-black uppercase tracking-widest italic opacity-50">
            &copy; 2024 Prakura IT Solutions Private Limited
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
