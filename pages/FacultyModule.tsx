
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
    onAdd({ ...newFac, id: 'f' + Date.now() });
    setIsModalOpen(false);
    setNewFac({ name: '', domain: '', rating: 5.0, activeBatches: 1 });
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">SME Registry</h2>
          <p className="text-slate-500 font-medium tracking-tight">Curriculum Leads and Subject Matter Experts.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black shadow-3xl hover:bg-blue-700 transition-all uppercase tracking-[3px] text-xs">Authorize SME</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {faculties.length === 0 ? (
          <div className="col-span-full py-24 text-center bg-white rounded-[3.5rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-black uppercase tracking-[4px] text-xs">Faculty Stream Empty</p>
          </div>
        ) : (
          faculties.map((f, i) => (
            <div key={i} className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm flex gap-10 items-center hover:shadow-3xl transition-all group">
              <div className="w-28 h-28 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[2.5rem] flex items-center justify-center font-black text-white text-4xl shadow-xl group-hover:scale-110 transition-transform">{f.name.charAt(0)}</div>
              <div className="flex-1">
                <h4 className="font-black text-slate-900 text-3xl tracking-tighter uppercase italic">{f.name}</h4>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[4px] mt-2">{f.domain}</p>
                <div className="flex gap-10 mt-8">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SME Rating</p>
                    <p className="font-black text-slate-900 text-xl italic mt-1">⭐ {f.rating}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Operational Load</p>
                    <p className="font-black text-slate-900 text-xl italic mt-1">{f.activeBatches} Tracks</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in">
          <div className="bg-white w-full max-w-xl rounded-[4rem] shadow-4xl overflow-hidden animate-in zoom-in-95 border border-white/20">
            <div className="p-12 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <h3 className="font-black text-4xl text-slate-950 tracking-tighter uppercase italic">Authorize SME</h3>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[4px] mt-3">Initialize New Curriculum Lead Profile</p>
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
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Professional Name</label>
                <input required className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black focus:border-blue-500 transition-all" value={newFac.name} onChange={e => setNewFac({...newFac, name: e.target.value})} />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Specialization Unit</label>
                <input required className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none focus:border-blue-500 transition-all" value={newFac.domain} onChange={e => setNewFac({...newFac, domain: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Rating</label>
                  <input type="number" step="0.1" className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none transition-all" value={newFac.rating} onChange={e => setNewFac({...newFac, rating: parseFloat(e.target.value)})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Target Load</label>
                  <input type="number" className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none transition-all" value={newFac.activeBatches} onChange={e => setNewFac({...newFac, activeBatches: parseInt(e.target.value)})} />
                </div>
              </div>
              <button type="submit" className="w-full py-6 bg-blue-600 text-white font-black rounded-[2.5rem] shadow-3xl hover:bg-blue-700 transition-all active:scale-[0.98] uppercase tracking-[4px] text-xs">Authorize SME Profile</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyModule;
