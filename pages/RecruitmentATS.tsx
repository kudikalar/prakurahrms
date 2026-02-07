
import React, { useState } from 'react';

interface RecruitmentATSProps {
  jobs: any[];
  onAddJob: (job: any) => void;
}

const RecruitmentATS: React.FC<RecruitmentATSProps> = ({ jobs, onAddJob }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', dept: 'Engineering', applicants: 0, status: 'Open', description: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddJob({
      ...newJob,
      id: Date.now().toString(),
      applicants: 0,
      createdAt: new Date().toLocaleDateString()
    });
    setIsModalOpen(false);
    setNewJob({ title: '', dept: 'Engineering', applicants: 0, status: 'Open', description: '' });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Recruitment Engine</h2>
          <p className="text-slate-500 font-medium tracking-tight">Active Job Pipeline and Candidate Flow.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black shadow-3xl hover:bg-blue-700 transition-all flex items-center gap-3 uppercase tracking-[3px] text-xs"
        >
          Post New Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.length === 0 ? (
          <div className="col-span-full py-24 text-center bg-white rounded-[3.5rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-black uppercase tracking-[4px] text-sm">No Active Listings Identified</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all group">
              <div className="flex items-center justify-between mb-8">
                <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest">{job.status}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{job.createdAt}</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic group-hover:text-blue-600 transition-colors">{job.title}</h3>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[3px] mt-2">{job.dept}</p>
              
              <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-black text-slate-900">{job.applicants}</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Applicants</span>
                </div>
                <button className="px-6 py-3 bg-slate-50 text-slate-900 text-[10px] font-black rounded-xl hover:bg-slate-100 transition-all uppercase tracking-widest">Details</button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-[4rem] shadow-4xl overflow-hidden animate-in zoom-in-95 border border-white/20">
            <div className="p-12 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="font-black text-4xl text-slate-950 tracking-tighter uppercase italic">New Role Spec</h3>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[4px] mt-3">Initialize career portal entry</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-16 h-16 rounded-[2rem] bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-500 transition-all hover:rotate-90 flex items-center justify-center shadow-lg"
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-12 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Role Title</label>
                  <input required className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black focus:ring-[10px] focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Target Unit</label>
                  <select className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none focus:border-blue-500 transition-all uppercase" value={newJob.dept} onChange={e => setNewJob({...newJob, dept: e.target.value})}>
                    <option>Engineering</option>
                    <option>HR</option>
                    <option>Sales</option>
                    <option>Training</option>
                  </select>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Description</label>
                <textarea rows={4} className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none focus:border-blue-500 transition-all resize-none" value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})} />
              </div>
              <button type="submit" className="w-full py-6 bg-blue-600 text-white font-black rounded-[2.5rem] shadow-3xl hover:bg-blue-700 transition-all active:scale-[0.98] uppercase tracking-[4px] text-xs">Publish Career Portal Listing</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruitmentATS;
