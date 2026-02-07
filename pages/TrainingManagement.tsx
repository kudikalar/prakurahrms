
import React, { useState } from 'react';

interface TrainingManagementProps {
  batches: any[];
  onAddBatch: (batch: any) => void;
}

const TrainingManagement: React.FC<TrainingManagementProps> = ({ batches, onAddBatch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBatch, setNewBatch] = useState({ name: '', trainer: '', interns: 10, status: 'Upcoming' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBatch({ ...newBatch, id: 'b' + Date.now() });
    setIsModalOpen(false);
    setNewBatch({ name: '', trainer: '', interns: 10, status: 'Upcoming' });
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Academy Tracks</h2>
          <p className="text-slate-500 font-medium tracking-tight">Active Training and Internship Life-cycles.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black shadow-3xl hover:bg-blue-700 transition-all flex items-center gap-3 uppercase tracking-[3px] text-xs"
        >
          Initialize Batch
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {batches.map(batch => (
          <div key={batch.id} className="bg-white rounded-[3.5rem] border border-slate-200 shadow-sm overflow-hidden group hover:shadow-2xl transition-all">
            <div className={`h-3 w-full ${batch.status === 'Completed' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
            <div className="p-10 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">{batch.name}</h3>
                <span className="px-4 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest">{batch.status}</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SME Instructor</span>
                  <span className="text-sm font-black text-slate-800 italic uppercase">{batch.trainer}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enrolled Count</span>
                  <span className="text-sm font-black text-slate-800">{batch.interns} Personnel</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-[4rem] shadow-4xl overflow-hidden animate-in zoom-in-95 border border-white/20">
            <div className="p-12 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="font-black text-4xl text-slate-950 tracking-tighter uppercase italic">Register Track</h3>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[4px] mt-3">Initialize new training identity</p>
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
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Track Identification</label>
                <input required className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black focus:ring-[10px] focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all" value={newBatch.name} onChange={e => setNewBatch({...newBatch, name: e.target.value})} />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Designated Trainer</label>
                <input required className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black focus:ring-[10px] focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all" value={newBatch.trainer} onChange={e => setNewBatch({...newBatch, trainer: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Intern Quota</label>
                  <input type="number" className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none focus:border-blue-500 transition-all" value={newBatch.interns} onChange={e => setNewBatch({...newBatch, interns: parseInt(e.target.value)})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Lifecycle Phase</label>
                  <select className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none focus:border-blue-500 transition-all uppercase" value={newBatch.status} onChange={e => setNewBatch({...newBatch, status: e.target.value})}>
                    <option>Upcoming</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-6 bg-blue-600 text-white font-black rounded-[2.5rem] shadow-3xl hover:bg-blue-700 transition-all active:scale-[0.98] uppercase tracking-[4px] text-xs">Activate Training Stream</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingManagement;
