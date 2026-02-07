
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
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase">Talent Pipeline</h2>
          <p className="text-slate-500 font-medium tracking-tight">Managing recruitment flow and enterprise job openings.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black shadow-2xl shadow-slate-200 hover:bg-black transition-all flex items-center gap-2 uppercase tracking-widest text-xs"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          Post New Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-slate-400">
            <p className="text-lg font-bold uppercase tracking-widest">No active job listings</p>
            <p className="text-sm font-medium">Initialize the hiring process by creating a role.</p>
          </div>
        ) : (
          jobs.map((job, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-200 transition-all group animate-in zoom-in-95 duration-300 relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-lg ${job.status === 'Open' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                  {job.status}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{job.createdAt}</span>
              </div>
              <h3 className="text-2xl font-black text-slate-800 group-hover:text-blue-600 transition-colors tracking-tighter uppercase italic">{job.title}</h3>
              <p className="text-[10px] text-slate-400 font-black mt-2 uppercase tracking-[3px]">{job.dept}</p>
              
              <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-slate-100 border-4 border-white flex items-center justify-center text-[10px] font-black text-slate-400">?</div>)}
                  </div>
                  <span className="text-xs font-black text-slate-800 tracking-tight">{job.applicants} Applied</span>
                </div>
                <button className="px-4 py-2 bg-slate-50 text-blue-600 text-[10px] font-black rounded-xl hover:bg-blue-50 transition-all uppercase tracking-widest">Pipeline</button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-10 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div>
                <h3 className="font-black text-3xl text-slate-800 tracking-tighter uppercase italic">Job Specification</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Initialize career portal listing</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-500 transition-all hover:rotate-90 flex items-center justify-center shadow-sm"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Official Role Title</label>
                  <input required className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none focus:border-blue-500 transition-all" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Department Unit</label>
                  <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none" value={newJob.dept} onChange={e => setNewJob({...newJob, dept: e.target.value})}>
                    <option>Engineering</option>
                    <option>HR & People</option>
                    <option>Marketing</option>
                    <option>Sales & Success</option>
                    <option>Training</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Detailed Description</label>
                <textarea rows={4} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none resize-none focus:border-blue-500" placeholder="Enter key responsibilities and required skills..." value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})} />
              </div>
              <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-[0.98] uppercase tracking-[3px] text-xs">Publish Career Opening</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruitmentATS;
