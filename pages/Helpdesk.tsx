
import React, { useState } from 'react';
import { Ticket } from '../types';

interface Props {
  tickets: Ticket[];
  onAdd: (t: Ticket) => void;
}

const Helpdesk: React.FC<Props> = ({ tickets, onAdd }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState<Partial<Ticket>>({ subject: '', category: 'IT', priority: 'MEDIUM' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...newTicket as Ticket,
      id: 'T' + Date.now(),
      status: 'OPEN',
      createdAt: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(false);
    setNewTicket({ subject: '', category: 'IT', priority: 'MEDIUM' });
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Support Matrix</h2>
          <p className="text-slate-500 font-medium tracking-tight">Internal SLA Tracking and Resolution Engine.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black shadow-3xl hover:bg-blue-700 transition-all uppercase tracking-[3px] text-xs">Broadcast Ticket</button>
      </div>

      <div className="space-y-6">
        {tickets.length === 0 ? (
          <div className="py-24 text-center bg-white rounded-[3.5rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-black uppercase tracking-[4px] text-xs">Support Stream Idle</p>
          </div>
        ) : (
          tickets.map(ticket => (
            <div key={ticket.id} className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm flex items-center justify-between group hover:shadow-2xl transition-all">
              <div className="flex items-center gap-10">
                <div className={`p-6 rounded-[2rem] ${ticket.status === 'OPEN' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic group-hover:text-blue-600 transition-colors">{ticket.subject}</h4>
                  <div className="flex gap-6 mt-3">
                     <span className="text-[10px] text-slate-400 uppercase font-black tracking-[3px]">{ticket.category} UNIT</span>
                     <span className={`text-[10px] font-black uppercase tracking-[3px] ${ticket.priority === 'HIGH' || ticket.priority === 'URGENT' ? 'text-red-500' : 'text-slate-400'}`}>SLA: {ticket.priority}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${ticket.status === 'OPEN' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>{ticket.status}</span>
                <p className="text-[10px] text-slate-400 mt-4 font-black uppercase tracking-[2px]">Logged: {ticket.createdAt}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-[4rem] shadow-4xl overflow-hidden animate-in zoom-in-95 border border-white/20">
            <div className="p-12 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div>
                <h3 className="font-black text-4xl text-slate-950 tracking-tighter uppercase italic">Open Ticket</h3>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[4px] mt-3">Formal support request initiation protocol</p>
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
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Issue Spec</label>
                <input required className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none focus:border-blue-500 transition-all" value={newTicket.subject} onChange={e => setNewTicket({...newTicket, subject: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Category</label>
                  <select className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none transition-all uppercase" value={newTicket.category} onChange={e => setNewTicket({...newTicket, category: e.target.value as any})}>
                    <option>IT</option>
                    <option>PAYROLL</option>
                    <option>LEAVE</option>
                    <option>FACILITY</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Priority</label>
                  <select className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none transition-all uppercase" value={newTicket.priority} onChange={e => setNewTicket({...newTicket, priority: e.target.value as any})}>
                    <option>LOW</option>
                    <option>MEDIUM</option>
                    <option>HIGH</option>
                    <option>URGENT</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-6 bg-blue-600 text-white font-black rounded-[2.5rem] shadow-3xl hover:bg-blue-700 transition-all active:scale-[0.98] uppercase tracking-[4px] text-xs">Verify & Broadcast Support Request</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Helpdesk;
