
import React, { useState } from 'react';

interface Props {
  announcements: any[];
  onAddAnnouncement: (a: any) => void;
}

const EngagementModule: React.FC<Props> = ({ announcements, onAddAnnouncement }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', type: 'NEWS' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAnnouncement({
      ...newPost,
      id: Date.now().toString(),
      time: 'Just now'
    });
    setIsModalOpen(false);
    setNewPost({ title: '', content: '', type: 'NEWS' });
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Personnel Stream</h2>
          <p className="text-slate-500 font-medium tracking-tight">Internal Broadcasts and Sentiment Analysis.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black shadow-3xl hover:bg-blue-700 transition-all uppercase tracking-[3px] text-xs">Broadcast Protocol</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm space-y-10 max-h-[800px] overflow-y-auto custom-scrollbar">
          <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic border-b border-slate-100 pb-8 flex items-center gap-5">
            <span className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">📡</span>
            Internal Stream
          </h3>
          <div className="space-y-10">
             {announcements.length === 0 ? (
               <p className="text-slate-400 font-black uppercase tracking-[4px] text-xs text-center py-20">No active updates</p>
             ) : (
               announcements.map(ann => (
                 <div key={ann.id} className="p-10 bg-slate-50/50 border border-slate-100 rounded-[3rem] group hover:bg-white hover:shadow-2xl transition-all">
                    <p className="text-[10px] font-black text-blue-600 mb-4 uppercase tracking-[4px]">{ann.type} <span className="mx-2 text-slate-200">/</span> {ann.time}</p>
                    <h4 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase italic tracking-tighter">{ann.title}</h4>
                    <p className="text-lg text-slate-600 mt-5 font-medium leading-relaxed">{ann.content}</p>
                 </div>
               ))
             )}
          </div>
        </div>

        <div className="space-y-10">
          <div className="bg-slate-900 p-12 rounded-[4rem] text-white shadow-3xl space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5"><svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg></div>
            <h3 className="text-3xl font-black tracking-tighter uppercase italic flex items-center gap-5">
              Sentiment Index
            </h3>
            <div className="space-y-8">
               <PollOption label="Operational Stability" percentage={92} />
               <PollOption label="Workforce Growth" percentage={78} />
               <PollOption label="Internal Synergy" percentage={85} />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-[4rem] shadow-4xl overflow-hidden animate-in zoom-in-95 border border-white/20">
            <div className="p-12 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <h3 className="font-black text-4xl text-slate-950 tracking-tighter uppercase italic">New Broadcast</h3>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[4px] mt-3">Initialize New Update Protocol</p>
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
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Headline</label>
                <input required className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none focus:border-blue-500 transition-all" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Details</label>
                <textarea required rows={4} className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none focus:border-blue-500 transition-all resize-none" value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} />
              </div>
              <button type="submit" className="w-full py-6 bg-blue-600 text-white font-black rounded-[2.5rem] shadow-3xl hover:bg-blue-700 transition-all active:scale-[0.98] uppercase tracking-[4px] text-xs">Verify & Broadcast Protocol</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const PollOption = ({ label, percentage }: any) => (
  <div className="space-y-4">
    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-300">
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
      <div className="h-full bg-blue-500 rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(59,130,246,0.5)]" style={{ width: `${percentage}%` }} />
    </div>
  </div>
);

export default EngagementModule;
