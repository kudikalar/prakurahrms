
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase">Batch Console</h2>
          <p className="text-slate-500 font-medium tracking-tight">Monitor technical training lifecycle for Prakura Academy.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-2xl shadow-blue-500/20 hover:bg-blue-700 transition-all uppercase tracking-[2px] text-xs"
        >
          Create New Batch
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {batches.map(batch => (
          <div key={batch.id} className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden group hover:border-blue-400 transition-all animate-in fade-in duration-300">
            <div className={`h-2.5 w-full ${
              batch.status === 'Completed' ? 'bg-emerald-500' : batch.status === 'In Progress' ? 'bg-blue-500' : 'bg-slate-300'
            }`} />
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors uppercase italic">{batch.name}</h3>
                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg ${
                  batch.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : batch.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {batch.status}
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Lead Trainer</span>
                  <span className="font-black text-slate-800">{batch.trainer}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Enrollment</span>
                  <span className="font-black text-slate-800">{batch.interns} Interns</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {batches.length === 0 && (
          <div className="col-span-full py-20 text-center bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-slate-400">
            <p className="text-lg font-bold">No training batches initiated.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in">
          <div className="bg-white w-full max-w-xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-10 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <h3 className="font-black text-3xl text-slate-900 tracking-tighter uppercase italic">Batch Registration</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Initialize new technical track</p>
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
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Track Name</label>
                <input required className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none focus:border-blue-500" placeholder="e.g. MERN Stack 2024-Q3" value={newBatch.name} onChange={e => setNewBatch({...newBatch, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Designated Trainer</label>
                <input required className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none focus:border-blue-500" placeholder="Enter Full Name" value={newBatch.trainer} onChange={e => setNewBatch({...newBatch, trainer: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Intern Limit</label>
                  <input type="number" required className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none" value={newBatch.interns} onChange={e => setNewBatch({...newBatch, interns: parseInt(e.target.value)})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Current Status</label>
                  <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none appearance-none uppercase" value={newBatch.status} onChange={e => setNewBatch({...newBatch, status: e.target.value})}>
                    <option>Upcoming</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-[0.98] uppercase tracking-[3px] text-xs">Confirm Batch Initiation</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingManagement;
