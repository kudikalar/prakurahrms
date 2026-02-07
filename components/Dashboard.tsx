
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
  const isHR = [UserRole.SUPER_ADMIN, UserRole.HR_ADMIN, UserRole.HR_MANAGER].includes(user.role);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-[2px] border border-blue-500/20">Active Session</span>
            <span className="text-slate-600 text-[10px] font-black uppercase tracking-[2px]">• Production Workspace</span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter leading-none">COMMAND CENTER</h2>
          <p className="text-slate-400 font-medium max-w-lg text-lg">Prakura ERP is orchestrating {stats.employees} staff and {stats.batches} training tracks for you.</p>
        </div>
        <div className="relative z-10 flex flex-wrap gap-4">
          <button onClick={() => onAction('attendance')} className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-2xl font-black text-sm transition-all border border-white/10 tracking-widest uppercase">Manage Logs</button>
          {isHR && <button onClick={() => onAction('employees')} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black text-sm shadow-2xl shadow-blue-500/30 transition-all transform hover:-translate-y-1 tracking-widest uppercase">Direct Onboarding</button>}
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Total Staff" value={stats.employees} trend="+4.2%" color="blue" subtitle="Current Roster" />
        <StatCard title="Active Tracks" value={stats.batches} trend="Live" color="indigo" subtitle="Trainee Batches" />
        <StatCard title="Open Roles" value={stats.jobs} trend="Critical" color="emerald" subtitle="Career Portal" />
        <StatCard title="Pending" value={stats.leaves} trend="Urgent" color="orange" subtitle="Leave Approvals" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tighter">OPERATIONAL FLOW</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[3px] mt-2">Enterprise Attendance Analysis</p>
              </div>
              <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                <button className="px-5 py-2 text-[10px] font-black bg-white shadow-lg rounded-xl text-slate-900 uppercase tracking-widest transition-all">Daily</button>
                <button className="px-5 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly</button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { name: 'MON', val: 45 }, { name: 'TUE', val: 52 }, { name: 'WED', val: 48 },
                  { name: 'THU', val: 61 }, { name: 'FRI', val: 55 }, { name: 'SAT', val: 20 },
                ]}>
                  <defs>
                    <linearGradient id="mainGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} dy={15} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} dx={-15} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', padding: '20px' }}
                    itemStyle={{ fontWeight: 900, color: '#1e293b' }}
                  />
                  <Area type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={4} fill="url(#mainGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
            <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-8 flex items-center gap-4">
              PENDING APPROVALS
              <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs">{recentLeaves.length}</span>
            </h3>
            <div className="space-y-6">
              {recentLeaves.length === 0 ? (
                <div className="py-20 text-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                  <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center shadow-sm mb-4">
                    <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="text-slate-400 font-bold tracking-tight">Queue clear. No pending approvals found.</p>
                </div>
              ) : (
                recentLeaves.map((leave, i) => (
                  <div key={leave.id} className="flex items-center justify-between p-6 bg-slate-50/80 rounded-3xl hover:bg-white hover:shadow-xl hover:scale-[1.01] transition-all group border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-white text-lg shadow-lg">
                        {leave.type[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                           <p className="font-black text-slate-800">{leave.type} Leave Request</p>
                           <span className="text-[10px] font-black text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md uppercase tracking-widest">Urgent</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-1">{leave.startDate} to {leave.endDate} • {leave.reason}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <button onClick={() => onApproveLeave(leave.id)} className="px-6 py-3 bg-emerald-500 text-[10px] font-black text-white rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-200 uppercase tracking-widest">Approve</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar widgets */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
            <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-8">EXECUTIVE TOOLS</h3>
            <div className="grid grid-cols-2 gap-5">
              <DashAction label="Time Log" icon="🕒" color="bg-blue-50 text-blue-600" onClick={() => onAction('attendance')} />
              <DashAction label="Hardware" icon="💻" color="bg-emerald-50 text-emerald-600" onClick={() => onAction('assets')} />
              <DashAction label="Pipeline" icon="💼" color="bg-orange-50 text-orange-600" onClick={() => onAction('recruitment')} />
              <DashAction label="Reports" icon="📊" color="bg-indigo-50 text-indigo-600" onClick={() => onAction('analytics')} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-125 transition-transform duration-700"><svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg></div>
             <div className="relative z-10 space-y-6">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <h4 className="text-2xl font-black tracking-tighter">AI CREATIVE LAB</h4>
                <p className="text-blue-100 text-sm font-medium leading-relaxed">Instantly draft employee recognition posts and dynamic announcements with Gemini Intelligence.</p>
                <button onClick={() => onAction('creative-lab')} className="w-full py-4 bg-white text-blue-700 font-black rounded-2xl text-xs hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)] transition-all uppercase tracking-[2px]">Initialize AI Engine</button>
             </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
             <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-8 uppercase italic">Calender</h3>
             <div className="space-y-6">
               <HolidayItem date="Aug 15" label="Independence Day" color="bg-orange-50 text-orange-600" />
               <HolidayItem date="Oct 02" label="Gandhi Jayanti" color="bg-emerald-50 text-emerald-600" />
               <HolidayItem date="Dec 25" label="Christmas" color="bg-red-50 text-red-600" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, color, subtitle }: any) => {
  const colorMap: any = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
  };
  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 hover:shadow-2xl hover:scale-[1.03] transition-all duration-500 group relative overflow-hidden">
      <div className={`absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity transform group-hover:rotate-12`}>
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>
      </div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">{title}</p>
        <span className={`text-[10px] font-black px-3 py-1 rounded-lg border ${colorMap[color]}`}>{trend}</span>
      </div>
      <h4 className="text-4xl font-black text-slate-900 tracking-tighter group-hover:text-blue-600 transition-colors">{value}</h4>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">{subtitle}</p>
    </div>
  );
};

const DashAction = ({ label, icon, color, onClick }: any) => (
  <button onClick={onClick} className={`p-6 rounded-3xl ${color} flex flex-col items-center justify-center gap-3 hover:shadow-2xl transition-all transform active:scale-90 group border border-transparent hover:border-white/20 hover:scale-105`}>
    <span className="text-3xl group-hover:animate-bounce">{icon}</span>
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

const HolidayItem = ({ date, label, color }: any) => (
  <div className="flex items-center gap-5 group">
    <div className={`w-14 h-14 rounded-2xl ${color} flex flex-col items-center justify-center border border-current shadow-lg group-hover:scale-110 transition-transform`}>
      <span className="text-[10px] font-black uppercase leading-none opacity-80">{date.split(' ')[0]}</span>
      <span className="text-xl font-black leading-none mt-0.5">{date.split(' ')[1]}</span>
    </div>
    <span className="text-sm font-black text-slate-700 tracking-tight">{label}</span>
  </div>
);

export default Dashboard;
