
import React from 'react';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  Award, 
  MoreVertical,
  Plus
} from 'lucide-react';

const Internships: React.FC = () => {
  const batches = [
    { id: '1', name: 'MERN Stack Developer', code: 'BATCH-2024-01', interns: 15, trainer: 'Vikram Sahai', progress: 75, status: 'ACTIVE' },
    { id: '2', name: 'Data Science & AI', code: 'BATCH-2024-02', interns: 12, trainer: 'Dr. Aruna Reddy', progress: 40, status: 'ACTIVE' },
    { id: '3', name: 'Java Spring Boot', code: 'BATCH-2023-11', interns: 20, trainer: 'Sanjay Dutt', progress: 100, status: 'COMPLETED' },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Internship & Training Management</h2>
          <p className="text-slate-500">Track active batches, trainer assignments, and intern progress.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95">
          <Plus size={18} />
          Create New Batch
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Interns</p>
            <h4 className="text-2xl font-black text-slate-800">47</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Ongoing Batches</p>
            <h4 className="text-2xl font-black text-slate-800">02</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
            <Award size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Certificates Issued</p>
            <h4 className="text-2xl font-black text-slate-800">182</h4>
          </div>
        </div>
      </div>

      {/* Batch Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {batches.map((batch) => (
          <div key={batch.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col overflow-hidden group">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${batch.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                  {batch.status}
                </div>
                <button className="text-slate-300 hover:text-slate-600 transition-colors"><MoreVertical size={20} /></button>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">{batch.name}</h3>
              <p className="text-slate-400 text-sm font-medium mb-6 uppercase tracking-tight">{batch.code}</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Users size={18} className="text-slate-400" />
                  <span className="text-sm font-semibold">{batch.interns} Interns Enrolled</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <BookOpen size={18} className="text-slate-400" />
                  <span className="text-sm font-semibold">Trainer: {batch.trainer}</span>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                  <span>CURRICULUM PROGRESS</span>
                  <span>{batch.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${batch.progress === 100 ? 'bg-green-500' : 'bg-indigo-600'}`} 
                    style={{ width: `${batch.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
               <button className="flex-1 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors">Manage Interns</button>
               <button className="flex-1 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {/* Batch Activity */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-800 mb-4">Upcoming Training Events</h3>
        <div className="space-y-4">
          <div className="flex gap-4 items-start p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
            <div className="bg-indigo-50 text-indigo-600 w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0">
               <span className="text-xs font-bold">MAY</span>
               <span className="text-lg font-black leading-none">20</span>
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Final Presentation - Web Dev Batch 01</h4>
              <p className="text-sm text-slate-500">Mock project presentations for the hiring panel.</p>
              <span className="text-xs font-semibold text-indigo-600 mt-1 inline-block">10:00 AM @ Conference Room B</span>
            </div>
          </div>
          <div className="flex gap-4 items-start p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
            <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0">
               <span className="text-xs font-bold">MAY</span>
               <span className="text-lg font-black leading-none">22</span>
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Python Basics Workshop</h4>
              <p className="text-sm text-slate-500">Orientation session for the new AI batch.</p>
              <span className="text-xs font-semibold text-blue-600 mt-1 inline-block">02:30 PM @ Lab 4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Internships;
