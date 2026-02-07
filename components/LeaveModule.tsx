
import React, { useState } from 'react';
import { User } from '../types';

interface LeaveModuleProps {
  user: User;
  leaves: any[];
  onAddLeave: (l: any) => void;
}

const LeaveModule: React.FC<LeaveModuleProps> = ({ user, leaves, onAddLeave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dbLog, setDbLog] = useState<string[]>([]);
  const [formData, setFormData] = useState({ type: 'CL', start: '', end: '', reason: '' });

  const simulateDbQuery = (query: string) => {
    setDbLog(prev => [`[PRISMA] ${query}`, ...prev].slice(0, 5));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    simulateDbQuery(`prisma.leaveRequest.create({ data: { userId: "${user.id}", ...formData } })`);
    onAddLeave({
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      userId: user.name,
      status: 'PENDING',
      createdAt: new Date().toLocaleDateString()
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase">Time Off Console</h2>
          <p className="text-slate-500 font-medium">Analyze balances and synchronize absences.</p>
        </div>
        <button 
          onClick={() => {
            setIsModalOpen(true);
            simulateDbQuery(`prisma.leaveBalance.findUnique({ where: { userId: "${user.id}" } })`);
          }}
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20 uppercase tracking-[2px] text-xs"
        >
          Request Absence
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <BalanceCard label="Casual (CL)" used={2} total={12} color="blue" />
        <BalanceCard label="Sick (SL)" used={1} total={10} color="orange" />
        <BalanceCard label="Privilege (PL)" used={0} total={15} color="green" />
        <BalanceCard label="Unpaid (LOP)" used={0} total={Infinity} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 font-black text-slate-900 uppercase tracking-widest text-sm bg-slate-50/50 italic">My Request Pipeline</div>
          <div className="divide-y divide-slate-100">
            {leaves.length === 0 ? (
              <div className="p-20 text-center text-slate-400 italic">No time-off requests detected in the system.</div>
            ) : (
              leaves.map(l => (
                <div key={l.id} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center font-black text-blue-600 shadow-sm">{l.type}</div>
                    <div>
                      <p className="font-black text-slate-800 leading-none">{l.type} Request</p>
                      <p className="text-xs text-slate-400 font-medium mt-1.5 uppercase tracking-widest">{l.start} <span className="mx-2 text-slate-300">→</span> {l.end}</p>
                    </div>
                  </div>
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                    l.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {l.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl overflow-hidden">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[3px] mb-6">Database Synchronization Logs</h4>
          <div className="font-mono text-[10px] space-y-3">
            {dbLog.map((log, i) => (
              <div key={i} className="text-emerald-400/70 leading-relaxed border-l-2 border-emerald-500/20 pl-4 animate-in slide-in-from-left">
                {log}
              </div>
            ))}
            {dbLog.length === 0 && <p className="text-slate-600 italic">Listening for database transactions...</p>}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in">
          <div className="bg-white w-full max-w-xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-10 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="font-black text-3xl text-slate-900 tracking-tighter uppercase italic">Absence Spec</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Formal request submission</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-500 transition-all hover:rotate-90 flex items-center justify-center shadow-sm"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Absence Classification</label>
                <select className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none appearance-none" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                  <option value="CL">Casual Leave</option>
                  <option value="SL">Sick Leave</option>
                  <option value="PL">Paid Leave</option>
                  <option value="LOP">Loss of Pay</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Inception Date</label>
                  <input type="date" className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none" onChange={e => setFormData({...formData, start: e.target.value})} required />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Termination Date</label>
                  <input type="date" className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none" onChange={e => setFormData({...formData, end: e.target.value})} required />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Justification</label>
                <textarea className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none resize-none" rows={3} placeholder="Provide professional context..." onChange={e => setFormData({...formData, reason: e.target.value})} required />
              </div>
              <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-2xl shadow-blue-500/30 hover:bg-blue-700 transition-all active:scale-[0.98] uppercase tracking-[3px] text-xs">Synchronize Absence</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const BalanceCard = ({ label, used, total, color }: any) => {
  const colors: any = {
    blue: 'border-blue-200 bg-blue-50/50 text-blue-600',
    orange: 'border-orange-200 bg-orange-50/50 text-orange-600',
    green: 'border-emerald-200 bg-emerald-50/50 text-emerald-600',
    red: 'border-red-200 bg-red-50/50 text-red-600',
  };
  return (
    <div className={`p-8 rounded-[2rem] border ${colors[color]} shadow-sm hover:scale-105 transition-all group`}>
      <p className="text-[10px] font-black uppercase tracking-[3px] opacity-70 mb-3">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-4xl font-black tracking-tighter">{total === Infinity ? used : total - used}</p>
        <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Units Available</p>
      </div>
      <div className="mt-6 h-1 w-full bg-current opacity-10 rounded-full overflow-hidden">
        <div className="h-full bg-current opacity-100" style={{ width: `${total === Infinity ? 0 : (used/total)*100}%` }}></div>
      </div>
    </div>
  );
};

export default LeaveModule;
