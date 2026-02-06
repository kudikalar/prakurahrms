
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  Award, 
  MoreVertical,
  Plus,
  Loader2,
  X,
  ChevronRight,
  GraduationCap,
  Target,
  Search,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { hrmsService } from '../services/hrmsService';
import { TrainingBatch, Intern, Faculty } from '../types';

const Internships: React.FC = () => {
  const [batches, setBatches] = useState<TrainingBatch[]>([]);
  const [availableFaculties, setAvailableFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInternModalOpen, setIsInternModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<TrainingBatch | null>(null);
  const [interns, setInterns] = useState<Intern[]>([]);
  
  // Form States
  const [newBatch, setNewBatch] = useState({
    name: '', 
    trainerName: '', 
    trainerId: '', 
    status: 'ACTIVE' as const,
    startDate: '', 
    endDate: '', 
    progress: 0, 
    curriculum: ['Initial Training'],
    timings: '10:00 AM - 12:00 PM'
  });

  const [newIntern, setNewIntern] = useState({
    firstName: '', lastName: '', email: '', college: '', performanceScore: 0
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [batchData, facultyData] = await Promise.all([
        hrmsService.getBatches(),
        hrmsService.getFaculties()
      ]);
      setBatches(batchData);
      
      const activeFaculties = facultyData.filter(f => f.status === 'ACTIVE');
      setAvailableFaculties(activeFaculties);
      
      // Default to first active faculty if none selected
      if (activeFaculties.length > 0) {
        setNewBatch(prev => ({
          ...prev,
          trainerId: activeFaculties[0].id,
          trainerName: activeFaculties[0].name
        }));
      }
    } catch (err) {
      console.error("Failed to load initial academy data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatch.trainerId) {
      alert("Please select an active faculty member.");
      return;
    }
    setLoading(true);
    try {
      const code = `BATCH-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
      await hrmsService.createBatch({ ...newBatch, code } as any);
      
      // Refresh batches
      const batchData = await hrmsService.getBatches();
      setBatches(batchData);
      
      setIsCreateModalOpen(false);
      
      // Reset form to first active faculty
      if (availableFaculties.length > 0) {
        setNewBatch({
          name: '', 
          trainerName: availableFaculties[0].name, 
          trainerId: availableFaculties[0].id, 
          status: 'ACTIVE' as const,
          startDate: '', 
          endDate: '', 
          progress: 0, 
          curriculum: ['Initial Training'],
          timings: '10:00 AM - 12:00 PM'
        });
      }
    } catch (err) {
      alert("Error creating batch");
    } finally {
      setLoading(false);
    }
  };

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const facultyId = e.target.value;
    const faculty = availableFaculties.find(f => f.id === facultyId);
    if (faculty) {
      setNewBatch(prev => ({
        ...prev,
        trainerId: faculty.id,
        trainerName: faculty.name
      }));
    }
  };

  const openInternManagement = async (batch: TrainingBatch) => {
    setSelectedBatch(batch);
    const data = await hrmsService.getInterns(batch.id);
    setInterns(data);
    setIsInternModalOpen(true);
  };

  const handleAddIntern = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBatch) return;
    setLoading(true);
    await hrmsService.addIntern({
      ...newIntern,
      batchId: selectedBatch.id,
      joinDate: new Date().toISOString().split('T')[0]
    });
    const data = await hrmsService.getInterns(selectedBatch.id);
    setInterns(data);
    setNewIntern({ firstName: '', lastName: '', email: '', college: '', performanceScore: 0 });
    setLoading(false);
  };

  const openBatchDetails = (batch: TrainingBatch) => {
    setSelectedBatch(batch);
    setIsDetailsOpen(true);
  };

  if (loading && batches.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-400">
        <Loader2 size={48} className="animate-spin text-indigo-600" />
        <p className="font-black text-sm uppercase tracking-widest">Initializing Academy...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic">Training Academy</h2>
          <p className="text-slate-500 font-medium">Developing tomorrow's tech leaders at Prakura.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-indigo-600 shadow-xl shadow-slate-100 transition-all active:scale-95"
        >
          <Plus size={20} />
          Launch New Batch
        </button>
      </header>

      {/* Academy Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5 group cursor-default">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
            <Users size={28} />
          </div>
          <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Active Interns</p>
            <h4 className="text-3xl font-black text-slate-800">
              {batches.reduce((acc, b) => acc + (b.status === 'ACTIVE' ? 1 : 0), 0) * 12} 
              <span className="text-sm font-bold text-slate-300 ml-1">Est. Candidates</span>
            </h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5 group cursor-default">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
            <Calendar size={28} />
          </div>
          <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Ongoing Streams</p>
            <h4 className="text-3xl font-black text-slate-800">0{batches.length}</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5 group cursor-default">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
            <Award size={28} />
          </div>
          <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Avg Performance</p>
            <h4 className="text-3xl font-black text-slate-800">92%</h4>
          </div>
        </div>
      </div>

      {/* Batch Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {batches.map((batch) => (
          <div key={batch.id} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col overflow-hidden group">
            <div className="p-8 flex-1">
              <div className="flex justify-between items-start mb-6">
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${batch.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                  {batch.status}
                </div>
                <button className="text-slate-300 hover:text-indigo-600 transition-colors"><MoreVertical size={22} /></button>
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors leading-tight">{batch.name}</h3>
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-8">{batch.code}</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-600 bg-slate-50 p-3 rounded-2xl">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                    <BookOpen size={16} />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Lead Trainer</span>
                    <span className="text-sm font-bold text-slate-800 truncate">{batch.trainerName}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-600 bg-slate-50 p-3 rounded-2xl">
                   <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                    <Clock size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Batch Timings</span>
                    <span className="text-sm font-bold text-slate-800">{batch.timings}</span>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="flex justify-between text-[10px] font-black text-slate-500 mb-3 tracking-widest">
                  <span>SYLLABUS PROGRESS</span>
                  <span>{batch.progress}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${batch.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'}`} 
                    style={{ width: `${batch.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex gap-3">
               <button 
                onClick={() => openInternManagement(batch)}
                className="flex-1 py-4 bg-white border border-slate-200 text-slate-700 text-xs font-black rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest active:scale-95 shadow-sm"
               >
                 Roster
               </button>
               <button 
                onClick={() => openBatchDetails(batch)}
                className="flex-1 py-4 bg-indigo-600 text-white text-xs font-black rounded-2xl hover:bg-indigo-700 transition-all uppercase tracking-widest active:scale-95 shadow-lg shadow-indigo-100"
               >
                 Details
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Batch Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
          <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-8 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Setup New Stream</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Initialize a fresh learning cohort</p>
              </div>
              <button onClick={() => setIsCreateModalOpen(false)} className="w-10 h-10 flex items-center justify-center hover:bg-slate-200 rounded-full text-slate-400 transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleCreateBatch} className="p-10 space-y-6">
              <div className="space-y-4">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Batch Identity</label>
                <input required placeholder="Batch Name (e.g. AWS Cloud Mastery)" value={newBatch.name} onChange={e => setNewBatch({...newBatch, name: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Starts</label>
                  <input required type="date" value={newBatch.startDate} onChange={e => setNewBatch({...newBatch, startDate: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-indigo-100 font-bold" />
                </div>
                <div className="space-y-4">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Ends</label>
                  <input required type="date" value={newBatch.endDate} onChange={e => setNewBatch({...newBatch, endDate: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-indigo-100 font-bold" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Assign Faculty</label>
                  <select 
                    required
                    value={newBatch.trainerId}
                    onChange={handleFacultyChange}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-indigo-100 font-bold appearance-none bg-white"
                  >
                    <option value="" disabled>Select Expert</option>
                    {availableFaculties.length > 0 ? (
                      availableFaculties.map(faculty => (
                        <option key={faculty.id} value={faculty.id}>
                          {faculty.name} ({faculty.designation})
                        </option>
                      ))
                    ) : (
                      <option disabled>No active faculty found</option>
                    )}
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Shift Timings</label>
                  <input required placeholder="E.g. 09:00 AM - 12:00 PM" value={newBatch.timings} onChange={e => setNewBatch({...newBatch, timings: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-indigo-100 font-bold" />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white font-black py-5 rounded-3xl hover:bg-indigo-600 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-[0.98]">
                {loading ? <Loader2 size={24} className="animate-spin" /> : <GraduationCap size={24} />}
                COMMENCE BATCH
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Intern Roster Modal */}
      {isInternModalOpen && selectedBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl animate-in fade-in">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl flex flex-col h-[85vh] overflow-hidden">
             <div className="p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">{selectedBatch.name}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Roster • {interns.length} Candidates Enrolled</p>
                </div>
                <button onClick={() => setIsInternModalOpen(false)} className="text-slate-400 hover:text-rose-600 transition-colors"><X size={28} /></button>
             </div>
             
             <div className="flex-1 overflow-auto flex">
                <div className="w-1/3 p-8 border-r border-slate-100 bg-slate-50/30">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Enroll New Candidate</h4>
                  <form onSubmit={handleAddIntern} className="space-y-4">
                     <input required placeholder="First Name" value={newIntern.firstName} onChange={e => setNewIntern({...newIntern, firstName: e.target.value})} className="w-full p-4 rounded-2xl border border-slate-200 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500" />
                     <input required placeholder="Last Name" value={newIntern.lastName} onChange={e => setNewIntern({...newIntern, lastName: e.target.value})} className="w-full p-4 rounded-2xl border border-slate-200 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500" />
                     <input required type="email" placeholder="Edu Email" value={newIntern.email} onChange={e => setNewIntern({...newIntern, email: e.target.value})} className="w-full p-4 rounded-2xl border border-slate-200 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500" />
                     <input required placeholder="Institution" value={newIntern.college} onChange={e => setNewIntern({...newIntern, college: e.target.value})} className="w-full p-4 rounded-2xl border border-slate-200 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500" />
                     <button type="submit" className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all uppercase tracking-widest text-xs">Add to Batch</button>
                  </form>
                </div>
                
                <div className="w-2/3 p-8">
                   <div className="relative mb-6">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input placeholder="Search roster..." className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 text-sm font-bold outline-none" />
                   </div>
                   <div className="space-y-4">
                      {interns.length === 0 ? (
                        <div className="h-40 flex items-center justify-center text-slate-400 italic font-medium">No interns enrolled yet.</div>
                      ) : (
                        interns.map((int) => (
                          <div key={int.id} className="p-5 border border-slate-100 rounded-3xl flex items-center justify-between hover:border-indigo-200 transition-all group">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
                                  {int.firstName[0]}{int.lastName[0]}
                                </div>
                                <div>
                                   <p className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{int.firstName} {int.lastName}</p>
                                   <p className="text-[10px] font-bold text-slate-400 uppercase">{int.college}</p>
                                </div>
                             </div>
                             <div className="text-right">
                                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                                  <Target size={14} />
                                  <span className="text-sm font-black">{int.performanceScore}%</span>
                                </div>
                                <span className="text-[10px] font-black text-slate-300 uppercase">IQ Rating</span>
                             </div>
                          </div>
                        ))
                      )}
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Batch Details View (Overlaid) */}
      {isDetailsOpen && selectedBatch && (
        <div className="fixed inset-0 z-[60] bg-white animate-in slide-in-from-right duration-500 overflow-auto">
          <div className="max-w-7xl mx-auto p-10 space-y-12">
            <button 
              onClick={() => setIsDetailsOpen(false)}
              className="group flex items-center gap-3 text-slate-400 hover:text-indigo-600 transition-colors font-black text-xs uppercase tracking-widest"
            >
              <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-indigo-200 transition-all">
                <ChevronRight size={20} className="rotate-180" />
              </div>
              Back to Streams
            </button>

            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">Stream Detail</span>
                  <span className="text-slate-300 font-black">•</span>
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">{selectedBatch.code}</span>
                </div>
                <h1 className="text-6xl font-black text-slate-800 tracking-tighter leading-none italic">{selectedBatch.name}</h1>
                <p className="text-xl text-slate-500 font-medium max-w-2xl">Advanced technical training program focused on real-world engineering challenges at Prakura.</p>
              </div>
              <div className="flex gap-4">
                <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-center min-w-[140px]">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Timeline</p>
                  <p className="text-lg font-black text-slate-800">6 Months</p>
                </div>
                <div className="p-6 bg-indigo-600 rounded-[2.5rem] text-white text-center min-w-[140px] shadow-xl shadow-indigo-100">
                  <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1">Total Capacity</p>
                  <p className="text-lg font-black">20 Seats</p>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
                  <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                    <BookOpen className="text-indigo-600" /> Syllabus Execution
                  </h3>
                  <div className="space-y-6">
                    {selectedBatch.curriculum.map((topic, i) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-200/50 hover:shadow-lg transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center font-black text-slate-400 text-sm italic">
                            0{i + 1}
                          </div>
                          <span className="font-black text-slate-700 tracking-tight">{topic}</span>
                        </div>
                        <CheckCircle2 className={i < 2 ? "text-emerald-500" : "text-slate-200"} size={24} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-indigo-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[100px] transition-transform group-hover:scale-110"></div>
                  <h3 className="text-xl font-black mb-6 uppercase tracking-widest flex items-center gap-2">
                    <Target className="text-indigo-300" /> Faculty Brief
                  </h3>
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-16 h-16 bg-white/10 rounded-[2rem] flex items-center justify-center font-black text-2xl border border-white/20">
                      {selectedBatch.trainerName[0]}
                    </div>
                    <div>
                      <p className="text-lg font-black">{selectedBatch.trainerName}</p>
                      <p className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Lead Instructor</p>
                    </div>
                  </div>
                  <p className="text-indigo-100 font-medium italic leading-relaxed">
                    "This cohort is pushing boundaries in modern development. We're seeing unprecedented interest in the aggregation pipelines module."
                  </p>
                </div>

                <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Course Artifacts</h4>
                   <div className="space-y-4">
                      {['Curriculum PDF', 'Assignment Board', 'Recorded Sessions'].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                          <span className="text-sm font-bold text-slate-700">{item}</span>
                          <ChevronRight size={16} className="text-slate-300" />
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Internships;
