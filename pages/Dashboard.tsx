
import React from 'react';
import { User, UserRole } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  user: User;
  stats: {
    employees: number;
    batches: number;
    jobs: number;
    leaves: number;
  };
  recentLeaves: any[];
  onAction: (tab: string) => void;
  onApproveLeave: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, stats, recentLeaves, onAction, onApproveLeave }) => {
  const isAdmin = user.role === UserRole.SUPER_ADMIN;
  const isHR = user.role === UserRole.HR_ADMIN || isAdmin;

  return (
    <div className="space-y-10">
      {/* Dynamic Welcome */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-10 shadow-3xl border border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[130px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-[3px] border border-blue-500/20">
              Identity: {user.role.replace('_', ' ')}
            </span>
            <span className="px-4 py-1.5 bg-white/5 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-[3px] border border-white/5">
              Unit: {user.department}
            </span>
          </div>
          <h2 className="text-5xl font-black tracking-tighter leading-none italic uppercase">{isAdmin ? 'ADMIN CONSOLE' : isHR ? 'HR COMMAND' : 'MEMBER DASH'}</h2>
          <p className="text-slate-400 font-medium max-w-xl text-xl leading-relaxed">
            {isAdmin 
              ? `System Overview: Managing ${stats.employees} users and enterprise modules.` 
              : isHR 
                ? `Operational Status: ${stats.leaves} pending approvals and ${stats.jobs} open roles.`
                : `Welcome back, ${user.name.split(' ')[0]}. Track your logs and progress below.`}
          </p>
        </div>
        <div className="relative z-10 flex flex-wrap gap-5">
          <button onClick={() => onAction('attendance')} className="px-10 py-5 bg-white/5 hover:bg-white/10 backdrop-blur-2xl rounded-[1.75rem] font-black text-xs transition-all border border-white/10 tracking-[3px] uppercase">Attendance Logs</button>
          {isHR && <button onClick={() => onAction('employees')} className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-[1.75rem] font-black text-xs shadow-2xl transition-all transform hover:-translate-y-1 tracking-[3px] uppercase">Onboard Pro</button>}
        </div>
      </div>

      {/* Metric Suite - Dynamic Based on Role */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {(isAdmin || isHR) && <StatCard title="Workforce" value={stats.employees} trend="+4%" color="blue" />}
        <StatCard title="Academy Tracks" value={stats.batches} trend="Live" color="indigo" />
        {isHR && <StatCard title="Recruitment" value={stats.jobs} trend="Critical" color="emerald" />}
        <StatCard title={isHR ? "Pending Review" : "My Absences"} value={isHR ? stats.leaves : 0} trend={isHR ? "Urgent" : "Active"} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase">Performance Flow</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[4px] mt-2">Active Productivity Index</p>
              </div>
              <div className="flex bg-slate-100 p-2 rounded-[1.5rem] border border-slate-200">
                <button className="px-6 py-2.5 text-[10px] font-black bg-white shadow-lg rounded-xl text-slate-900 uppercase tracking-widest">Global</button>
                <button className="px-6 py-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Personal</button>
              </div>
            </div>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[{name:'M',v:40},{name:'T',v:55},{name:'W',v:48},{name:'T',v:62},{name:'F',v:58},{name:'S',v:15}]}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} dy={20} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} dx={-20} />
                  <Tooltip contentStyle={{ borderRadius: '2rem', border: 'none', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.2)', padding: '24px' }} />
                  <Area type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={5} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {isHR && (
            <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-10">
                  <h3 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-5">
                    Approval Queue
                    <span className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-black">{recentLeaves.length}</span>
                  </h3>
                  <button onClick={() => onAction('leaves')} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Full Pipeline</button>
              </div>
              <div className="space-y-6">
                {recentLeaves.length === 0 ? (
                  <div className="py-24 text-center bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-black uppercase tracking-[3px] text-xs">Approvals clear.</p>
                  </div>
                ) : (
                  recentLeaves.map(leave => (
                    <div key={leave.id} className="flex items-center justify-between p-8 bg-slate-50/80 rounded-[2.5rem] hover:bg-white hover:shadow-2xl transition-all group border border-transparent hover:border-slate-100">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center font-black text-white text-xl shadow-xl">{leave.type[0]}</div>
                        <div>
                          <p className="font-black text-slate-900 text-lg uppercase italic">{leave.type} Leave Request</p>
                          <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">{leave.userId} • {leave.startDate}</p>
                        </div>
                      </div>
                      <button onClick={() => onApproveLeave(leave.id)} className="px-8 py-4 bg-emerald-500 text-[10px] font-black text-white rounded-[1.5rem] hover:bg-emerald-600 shadow-xl uppercase tracking-widest">Approve</button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-10">
          <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-200">
            <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-10 italic uppercase underline decoration-blue-500/20">Workspace Hub</h3>
            <div className="grid grid-cols-2 gap-6">
              <DashAction label="My Logs" icon="🕒" color="bg-blue-50 text-blue-600" onClick={() => onAction('attendance')} />
              <DashAction label="Learning" icon="🎓" color="bg-emerald-50 text-emerald-600" onClick={() => onAction('lms')} />
              {isHR && <DashAction label="Hiring" icon="💼" color="bg-orange-50 text-orange-600" onClick={() => onAction('recruitment')} />}
              {isAdmin && <DashAction label="Systems" icon="⚙️" color="bg-indigo-50 text-indigo-600" onClick={() => onAction('system')} />}
            </div>
          </div>

          {(isAdmin || isHR) && (
            <div className="bg-gradient-to-br from-blue-700 to-indigo-900 p-12 rounded-[3.5rem] text-white shadow-3xl relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg></div>
               <div className="relative z-10 space-y-8">
                  <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center backdrop-blur-3xl border border-white/20 shadow-2xl">
                     <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h4 className="text-3xl font-black tracking-tighter uppercase italic">AI LAB</h4>
                  <p className="text-blue-100 text-sm font-medium leading-relaxed">Synthesize internal recognition assets and broadcasts via Gemini.</p>
                  <button onClick={() => onAction('creative-lab')} className="w-full py-5 bg-white text-blue-700 font-black rounded-2xl text-[10px] shadow-2xl transition-all uppercase tracking-[3px]">Start AI Engine</button>
               </div>
            </div>
          )}

          <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-200">
             <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-10 italic uppercase">Holidays</h3>
             <div className="space-y-8">
               <HolidayItem date="Aug 15" label="Independence" color="bg-orange-50 text-orange-600" />
               <HolidayItem date="Oct 02" label="Gandhi Jayanti" color="bg-emerald-50 text-emerald-600" />
               <HolidayItem date="Dec 25" label="Christmas" color="bg-red-50 text-red-600" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, color }: any) => {
  const colorMap: any = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
  };
  return (
    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 hover:shadow-3xl hover:scale-105 transition-all duration-500 group overflow-hidden relative">
      <div className="flex items-center justify-between mb-6">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[3px]">{title}</p>
        <span className={`text-[10px] font-black px-4 py-1.5 rounded-xl border ${colorMap[color]}`}>{trend}</span>
      </div>
      <h4 className="text-5xl font-black text-slate-950 tracking-tighter group-hover:text-blue-600 transition-colors">{value}</h4>
    </div>
  );
};

const DashAction = ({ label, icon, color, onClick }: any) => (
  <button onClick={onClick} className={`p-8 rounded-[2.5rem] ${color} flex flex-col items-center justify-center gap-4 hover:shadow-2xl transition-all transform active:scale-90 group border border-transparent hover:scale-110`}>
    <span className="text-4xl transition-transform group-hover:scale-125">{icon}</span>
    <span className="text-[10px] font-black uppercase tracking-[3px]">{label}</span>
  </button>
);

const HolidayItem = ({ date, label, color }: any) => (
  <div className="flex items-center gap-6 group">
    <div className={`w-16 h-16 rounded-[1.5rem] ${color} flex flex-col items-center justify-center border border-current shadow-xl group-hover:scale-110 transition-transform`}>
      <span className="text-[10px] font-black uppercase leading-none opacity-80">{date.split(' ')[0]}</span>
      <span className="text-2xl font-black mt-1 leading-none">{date.split(' ')[1]}</span>
    </div>
    <span className="text-lg font-black text-slate-800 tracking-tight italic uppercase">{label}</span>
  </div>
);

export default Dashboard;
