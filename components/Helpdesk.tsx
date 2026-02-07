
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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic">Support Center</h2>
          <p className="text-slate-500 font-medium tracking-tight">Submit IT or Facility support tickets for resolution.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-2xl shadow-blue-500/20 transition-all hover:bg-blue-700 uppercase tracking-widest text-xs">New Ticket</button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {tickets.map(ticket => (
          <div key={ticket.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-400 transition-all animate-in slide-in-from-right duration-300">
            <div className="flex items-center gap-6">
              <div className={`p-5 rounded-2xl ${ticket.status === 'OPEN' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'} shadow-sm`}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-800 tracking-tighter uppercase italic">{ticket.subject}</h4>
                <div className="flex gap-4 mt-2">
                   <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{ticket.category} UNIT</span>
                   <span className={`text-[10px] font-black uppercase tracking-widest ${ticket.priority === 'HIGH' || ticket.priority === 'URGENT' ? 'text-red-500' : 'text-slate-400'}`}>Priority: {ticket.priority}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                ticket.status === 'OPEN' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
              }`}>{ticket.status}</span>
              <p className="text-[10px] text-slate-400 mt-3 font-black uppercase tracking-widest">TS: {ticket.createdAt}</p>
            </div>
          </div>
        ))}
        {tickets.length === 0 && (
          <div className="py-20 text-center bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-slate-400">
            <p className="text-lg font-bold">No active support tickets.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in">
          <div className="bg-white w-full max-w-xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-10 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div>
                <h3 className="font-black text-3xl text-slate-800 tracking-tighter uppercase italic">Open Ticket</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Formal support request initiation</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-500 transition-all hover:rotate-90 flex items-center justify-center shadow-sm"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Issue Identification</label>
                <input required className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none focus:border-blue-500" placeholder="e.g. Printer connectivity failure" value={newTicket.subject} onChange={e => setNewTicket({...newTicket, subject: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Classification</label>
                  <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none appearance-none uppercase" value={newTicket.category} onChange={e => setNewTicket({...newTicket, category: e.target.value as any})}>
                    <option>IT</option>
                    <option>PAYROLL</option>
                    <option>LEAVE</option>
                    <option>FACILITY</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">SLA Priority</label>
                  <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none appearance-none uppercase" value={newTicket.priority} onChange={e => setNewTicket({...newTicket, priority: e.target.value as any})}>
                    <option>LOW</option>
                    <option>MEDIUM</option>
                    <option>HIGH</option>
                    <option>URGENT</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-[0.98] uppercase tracking-[3px] text-xs">Broadcast Support Ticket</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Helpdesk;
