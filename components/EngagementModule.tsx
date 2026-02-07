
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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic">Engagement Hub</h2>
          <p className="text-slate-500 font-medium tracking-tight">Internal broadcasts, surveys, and enterprise polls.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-2xl shadow-blue-500/20 transition-all hover:bg-blue-700 uppercase tracking-widest text-xs">Post Update</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6 overflow-y-auto max-h-[700px] custom-scrollbar">
          <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
            Internal Stream
          </h3>
          <div className="space-y-6">
             {announcements.length === 0 ? (
               <p className="text-slate-400 italic font-medium py-10 text-center">No active announcements.</p>
             ) : (
               announcements.map(ann => (
                 <div key={ann.id} className="p-8 bg-slate-50/50 border border-slate-100 rounded-[2rem] animate-in slide-in-from-left duration-300 group hover:bg-white hover:shadow-xl transition-all">
                    <p className="text-[10px] font-black text-blue-600 mb-2 uppercase tracking-[3px]">{ann.type} • {ann.time}</p>
                    <h4 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase italic">{ann.title}</h4>
                    <p className="text-sm text-slate-500 mt-3 font-medium leading-relaxed">{ann.content}</p>
                 </div>
               ))
             )}
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
          <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            Active Analytics
          </h3>
          <div className="p-10 bg-indigo-50/50 border border-indigo-100 rounded-[2.5rem] space-y-8">
             <h4 className="text-xl font-black text-slate-800 tracking-tight uppercase">Operational Preference 2024</h4>
             <div className="space-y-6">
                <PollOption label="Fully Remote" percentage={65} />
                <PollOption label="Hybrid Protocol" percentage={25} />
                <PollOption label="Office HQ" percentage={10} />
             </div>
             <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[3px] text-center pt-4 border-t border-indigo-100/50">85 Personnel Validated</p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in">
          <div className="bg-white w-full max-w-xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-10 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <h3 className="font-black text-3xl text-slate-900 tracking-tighter uppercase italic">Update Broadcast</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Initialize internal stream event</p>
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
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Update Headline</label>
                <input required className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none focus:border-blue-500" placeholder="Enter headline..." value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Event Details</label>
                <textarea required className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none resize-none focus:border-blue-500" rows={4} placeholder="Enter description..." value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} />
              </div>
              <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-[0.98] uppercase tracking-[3px] text-xs">Broadcast Protocol</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const PollOption = ({ label, percentage }: any) => (
  <div className="space-y-3">
    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-600">
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="h-2.5 w-full bg-slate-200/50 rounded-full overflow-hidden">
      <div className="h-full bg-indigo-600 rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }} />
    </div>
  </div>
);

export default EngagementModule;
