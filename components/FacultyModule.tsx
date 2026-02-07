
import React, { useState } from 'react';

interface Props {
  faculties: any[];
  onAdd: (f: any) => void;
}

const FacultyModule: React.FC<Props> = ({ faculties, onAdd }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFac, setNewFac] = useState({ name: '', domain: '', rating: 5.0, activeBatches: 1 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newFac);
    setIsModalOpen(false);
    setNewFac({ name: '', domain: '', rating: 5.0, activeBatches: 1 });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic">Faculty Registry</h2>
          <p className="text-slate-500 font-medium tracking-tight">Managing SME instructors and curriculum leads for Prakura Academy.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-2xl shadow-blue-500/20 transition-all hover:bg-blue-700 uppercase tracking-widest text-xs">Add SME</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {faculties.map((f, i) => (
          <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm flex gap-8 items-center animate-in fade-in duration-300 hover:shadow-2xl transition-all">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[2rem] flex items-center justify-center font-black text-white text-3xl shadow-xl shadow-blue-500/20">{f.name.charAt(0)}</div>
            <div className="flex-1">
              <h4 className="font-black text-slate-900 text-2xl tracking-tighter uppercase italic">{f.name}</h4>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[3px] mt-1">{f.domain}</p>
              <div className="flex gap-8 mt-6">
                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SME Rating</p>
                  <p className="font-black text-slate-800 text-lg">⭐ {f.rating}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Load</p>
                  <p className="font-black text-slate-800 text-lg">{f.activeBatches} Tracks</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {faculties.length === 0 && (
          <div className="col-span-full py-20 text-center bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-slate-400 font-bold uppercase tracking-widest">No faculty registered.</div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in">
          <div className="bg-white w-full max-w-xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-10 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <h3 className="font-black text-3xl text-slate-900 tracking-tighter uppercase italic">SME Onboarding</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Initialize instructor profile</p>
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
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Professional Name</label>
                <input required className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none focus:border-blue-500 transition-all" value={newFac.name} onChange={e => setNewFac({...newFac, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Specialization Unit</label>
                <input required className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none placeholder:text-slate-300 focus:border-blue-500" placeholder="e.g. Distributed Systems Architecture" value={newFac.domain} onChange={e => setNewFac({...newFac, domain: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Initial Rating</label>
                  <input type="number" step="0.1" min="0" max="5" required className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none" value={newFac.rating} onChange={e => setNewFac({...newFac, rating: parseFloat(e.target.value)})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Target Load</label>
                  <input type="number" required className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none" value={newFac.activeBatches} onChange={e => setNewFac({...newFac, activeBatches: parseInt(e.target.value)})} />
                </div>
              </div>
              <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-[0.98] uppercase tracking-[3px] text-xs">Authorize SME Profile</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyModule;
