
import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  BookOpen, 
  Clock, 
  Plus, 
  Loader2, 
  Search,
  Award,
  CalendarDays,
  Edit,
  Trash2,
  Power,
  X,
  Camera,
  CheckCircle2
} from 'lucide-react';
import { hrmsService } from '../services/hrmsService';
import { Faculty, TrainingBatch } from '../types';

const FacultyPage: React.FC = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [batches, setBatches] = useState<TrainingBatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<Faculty, 'id'>>({
    name: '',
    designation: '',
    specialty: [],
    experience: '',
    email: '',
    avatar: '',
    status: 'ACTIVE',
    activeBatches: []
  });

  const [currentSpecialty, setCurrentSpecialty] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [facultyData, batchData] = await Promise.all([
        hrmsService.getFaculties(),
        hrmsService.getBatches()
      ]);
      setFaculties(facultyData);
      setBatches(batchData);
    } catch (err) {
      console.error("Failed to fetch faculty data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingFaculty(null);
    setFormData({
      name: '',
      designation: '',
      specialty: [],
      experience: '',
      email: '',
      avatar: '',
      status: 'ACTIVE',
      activeBatches: []
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faculty: Faculty) => {
    setEditingFaculty(faculty);
    setFormData({
      name: faculty.name,
      designation: faculty.designation,
      specialty: faculty.specialty,
      experience: faculty.experience,
      email: faculty.email,
      avatar: faculty.avatar || '',
      status: faculty.status,
      activeBatches: faculty.activeBatches
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this faculty member? This will delete their profile permanently.')) return;
    setLoading(true);
    await hrmsService.deleteFaculty(id);
    await fetchData();
  };

  const handleToggleStatus = async (faculty: Faculty) => {
    const newStatus = faculty.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    await hrmsService.updateFaculty(faculty.id, { status: newStatus });
    await fetchData();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const addSpecialty = () => {
    if (currentSpecialty.trim() && !formData.specialty.includes(currentSpecialty.trim())) {
      setFormData({ ...formData, specialty: [...formData.specialty, currentSpecialty.trim()] });
      setCurrentSpecialty('');
    }
  };

  const removeSpecialty = (index: number) => {
    setFormData({ ...formData, specialty: formData.specialty.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingFaculty) {
        await hrmsService.updateFaculty(editingFaculty.id, formData);
      } else {
        await hrmsService.addFaculty(formData);
      }
      setIsModalOpen(false);
      await fetchData();
    } catch (err) {
      alert('Error saving faculty member');
    } finally {
      setLoading(false);
    }
  };

  const filteredFaculties = faculties.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.specialty.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Expert Faculty</h2>
          <p className="text-slate-500 font-medium italic">Managed directory of Prakura's technical instructors.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter by skill..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <button 
            onClick={handleOpenAdd}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95 flex items-center gap-2"
          >
            <Plus size={16} /> Add Profile
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {filteredFaculties.map((faculty) => (
          <div key={faculty.id} className={`bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-500 ${faculty.status === 'INACTIVE' ? 'opacity-70 grayscale' : ''}`}>
            {/* Left: Identity Profile */}
            <div className={`w-full md:w-1/3 p-8 text-white flex flex-col items-center justify-center text-center relative overflow-hidden ${faculty.status === 'ACTIVE' ? 'bg-slate-900' : 'bg-slate-500'}`}>
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/20 to-transparent"></div>
               <div className="relative z-10 space-y-4">
                  <div className="w-24 h-24 bg-white/10 rounded-[2rem] mx-auto border border-white/20 flex items-center justify-center overflow-hidden shadow-2xl backdrop-blur-md">
                    {faculty.avatar ? (
                      <img src={faculty.avatar} alt={faculty.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-black text-indigo-300">{faculty.name.split(' ').map(n => n[0]).join('')}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-black italic">{faculty.name}</h3>
                    <p className="text-[10px] font-black uppercase text-indigo-200 tracking-[0.2em]">{faculty.designation}</p>
                  </div>
                  <div className="pt-2">
                    <span className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest ${faculty.status === 'ACTIVE' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                      {faculty.status}
                    </span>
                  </div>
               </div>
            </div>

            {/* Right: Details & Timings */}
            <div className="flex-1 p-8 space-y-6 flex flex-col justify-between relative">
              <div className="absolute top-6 right-6 flex gap-2">
                <button 
                  onClick={() => handleToggleStatus(faculty)}
                  className={`p-2 rounded-xl transition-all ${faculty.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}
                  title="Toggle Status"
                >
                  <Power size={18} />
                </button>
                <button 
                  onClick={() => handleOpenEdit(faculty)}
                  className="p-2 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(faculty.id)}
                  className="p-2 bg-slate-50 text-slate-400 hover:text-rose-600 rounded-xl transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2 text-slate-400">
                    <Award size={16} className="text-indigo-600" />
                    <span className="text-xs font-black uppercase tracking-widest">{faculty.experience} EXPERIENCE</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {faculty.specialty.map((s, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[9px] font-black uppercase text-slate-600">{s}</span>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Active Schedule & Timings</h4>
                  <div className="space-y-3">
                    {faculty.activeBatches && faculty.activeBatches.length > 0 ? faculty.activeBatches.map(bId => {
                      const batch = batches.find(b => b.id === bId);
                      return batch ? (
                        <div key={bId} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group/item hover:bg-white hover:border-indigo-200 transition-all">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-indigo-600 shadow-sm group-hover/item:scale-110 transition-transform">
                                <BookOpen size={18} />
                              </div>
                              <div>
                                <p className="text-sm font-black text-slate-800">{batch.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">{batch.code}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <div className="flex items-center gap-1.5 text-indigo-600 font-black text-xs mb-1">
                                <Clock size={14} />
                                {batch.timings}
                              </div>
                              <span className="text-[9px] font-black text-slate-300 uppercase italic">Weekly Stream</span>
                           </div>
                        </div>
                      ) : null;
                    }) : (
                      <div className="p-8 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center">
                         <CalendarDays size={24} className="text-slate-200 mb-2" />
                         <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">No active sessions assigned</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                 <div className="flex items-center gap-2">
                    <Mail size={14} className="text-slate-300" />
                    <span className="text-xs font-bold text-slate-500">{faculty.email}</span>
                 </div>
                 <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline decoration-indigo-200 underline-offset-4">Performance Log</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Unified Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">{editingFaculty ? 'Edit Profile' : 'Register Faculty'}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{editingFaculty ? `UID: ${editingFaculty.id}` : 'Create a new expert credential'}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 transition-all">
                <X size={28} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10">
              <form id="facultyForm" onSubmit={handleSubmit} className="space-y-8">
                {/* Avatar Upload */}
                <div className="flex items-center gap-8 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 h-24 rounded-[2rem] bg-white border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer hover:border-indigo-400 transition-all overflow-hidden relative group"
                  >
                    {formData.avatar ? (
                      <img src={formData.avatar} className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="text-slate-300 group-hover:text-indigo-400" size={32} />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                       <Plus size={24} className="text-white" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-slate-800 tracking-tight">Profile Identity</p>
                    <p className="text-xs font-bold text-slate-400 uppercase">JPEG or PNG, Max 2MB</p>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-6 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-bold" placeholder="E.g. Siddharth Rao" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Corporate Email</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-6 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-bold" placeholder="name@prakura.in" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Designation</label>
                    <input required value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} className="w-full px-6 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-bold" placeholder="E.g. Principal Trainer" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Experience Level</label>
                    <input required value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} className="w-full px-6 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-bold" placeholder="E.g. 10+ Years" />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Specializations</label>
                  <div className="flex gap-2">
                    <input 
                      value={currentSpecialty} 
                      onChange={e => setCurrentSpecialty(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
                      className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-indigo-100 font-bold" 
                      placeholder="Add skill (e.g. AWS, Node.js)" 
                    />
                    <button type="button" onClick={addSpecialty} className="px-6 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase hover:bg-indigo-600 transition-all">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {formData.specialty.map((s, i) => (
                      <span key={i} className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-bold text-sm">
                        {s} <button type="button" onClick={() => removeSpecialty(i)} className="hover:text-rose-500"><X size={14} /></button>
                      </span>
                    ))}
                    {formData.specialty.length === 0 && <p className="text-xs text-slate-400 italic">No skills added yet.</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Status</label>
                  <div className="flex gap-4">
                    {['ACTIVE', 'INACTIVE'].map(s => (
                      <button 
                        key={s}
                        type="button"
                        onClick={() => setFormData({...formData, status: s as any})}
                        className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border transition-all ${formData.status === s ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-400 border-slate-200'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
               <button onClick={() => setIsModalOpen(false)} className="flex-1 py-5 bg-white border border-slate-200 text-slate-600 font-black rounded-[2rem] hover:bg-slate-100 transition-all uppercase tracking-widest text-xs">Dismiss</button>
               <button 
                form="facultyForm" 
                type="submit" 
                disabled={loading}
                className="flex-[2] py-5 bg-indigo-600 text-white font-black rounded-[2rem] hover:bg-indigo-700 shadow-2xl shadow-indigo-100 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3 disabled:opacity-70"
               >
                 {loading ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle2 size={20} />}
                 {editingFaculty ? 'Save Profile Changes' : 'Confirm Registration'}
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyPage;
