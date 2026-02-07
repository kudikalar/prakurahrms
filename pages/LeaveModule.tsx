
import React, { useState } from 'react';
import { User } from '../types';

interface LeaveModuleProps {
  user: User;
  leaves: any[];
  onAddLeave: (l: any) => void;
}

const LeaveModule: React.FC<LeaveModuleProps> = ({ user, leaves, onAddLeave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ type: 'CL', start: '', end: '', reason: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLeave({
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      userId: user.name,
      status: 'PENDING',
      startDate: formData.start,
      endDate: formData.end,
      createdAt: new Date().toLocaleDateString()
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Absence Matrix</h2>
          <p className="text-slate-500 font-medium tracking-tight">Time-off allocation and synchronization.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black shadow-3xl hover:bg-blue-700 transition-all flex items-center gap-3 uppercase tracking-[3px] text-xs"
        >
          Request Absence
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <QuotaCard label="Casual (CL)" remaining={10} color="blue" />
        <QuotaCard label="Sick (SL)" remaining={8} color="orange" />
        <QuotaCard label="Paid (PL)" remaining={15} color="emerald" />
        <QuotaCard label="Loss of Pay" remaining={0} color="red" />
      </div>

      <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-slate-100 font-black text-slate-900 uppercase tracking-[3px] bg-slate-50/50 italic text-sm">Absence History Pipeline</div>
        <div className="divide-y divide-slate-100">
          {leaves.length === 0 ? (
            <div className="p-24 text-center text-slate-400 font-black uppercase tracking-[4px] text-xs">Registry Clear</div>
          ) : (
            leaves.map(l => (
              <div key={l.id} className="p-10 flex items-center justify-between hover:bg-blue-50/30 transition-all">
                <div className="flex items-center gap-8">
                  <div className="w-16 h-16 bg-blue-50 rounded-[1.5rem] flex items-center justify-center font-black text-blue-600 text-xl shadow-sm">{l.type}</div>
                  <div>
                    <p className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">{l.type} Request</p>
                    <p className="text-xs text-slate-400 font-black uppercase tracking-[2px] mt-2">{l.startDate} <span className="mx-2 text-slate-200">/</span> {l.endDate}</p>
                  </div>
                </div>
                <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${l.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>{l.status}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-[4rem] shadow-4xl overflow-hidden animate-in zoom-in-95 border border-white/20">
            <div className="p-12 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="font-black text-4xl text-slate-950 tracking-tighter uppercase italic">Absence Spec</h3>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[4px] mt-3">Formal request submission protocol</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-16 h-16 rounded-[2rem] bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-500 transition-all hover:rotate-90 flex items-center justify-center shadow-lg"
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-12 space-y-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Absence Classification</label>
                <select className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none focus:border-blue-500 transition-all uppercase" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                  <option value="CL">Casual Leave</option>
                  <option value="SL">Sick Leave</option>
                  <option value="PL">Paid Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Start Date</label>
                  <input type="date" required className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none focus:border-blue-500 transition-all" value={formData.start} onChange={e => setFormData({...formData, start: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">End Date</label>
                  <input type="date" required className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none focus:border-blue-500 transition-all" value={formData.end} onChange={e => setFormData({...formData, end: e.target.value})} />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Justification</label>
                <textarea required rows={3} className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none focus:border-blue-500 transition-all resize-none" value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} />
              </div>
              <button type="submit" className="w-full py-6 bg-blue-600 text-white font-black rounded-[2.5rem] shadow-3xl hover:bg-blue-700 transition-all active:scale-[0.98] uppercase tracking-[4px] text-xs">Broadcast Request Protocol</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const QuotaCard = ({ label, remaining, color }: any) => {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    red: 'bg-red-50 text-red-600 border-red-100',
  };
  return (
    <div className={`p-8 rounded-[2.5rem] border ${colors[color]} shadow-sm`}>
      <p className="text-[10px] font-black uppercase tracking-[3px] opacity-70 mb-2">{label}</p>
      <p className="text-4xl font-black tracking-tighter uppercase italic">{remaining} Days</p>
    </div>
  );
};

export default LeaveModule;
