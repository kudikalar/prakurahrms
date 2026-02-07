
import React, { useState } from 'react';
import { UserRole } from '../types';

interface Employee {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  designation: string;
  department: string;
}

interface EmployeeManagementProps {
  employees: Employee[];
  onAdd: (emp: Employee) => void;
}

const EmployeeManagement: React.FC<EmployeeManagementProps> = ({ employees, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmp, setNewEmp] = useState({
    name: '',
    email: '',
    password: 'password123',
    designation: '',
    department: 'Engineering',
    role: UserRole.EMPLOYEE
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...newEmp,
      id: Math.random().toString(36).substr(2, 9),
    });
    setIsModalOpen(false);
    setNewEmp({ name: '', email: '', password: 'password123', designation: '', department: 'Engineering', role: UserRole.EMPLOYEE });
  };

  const filtered = employees.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase italic">Workforce Hub</h2>
          <p className="text-slate-500 font-medium tracking-tight">Enterprise-grade directory for Prakura IT professionals.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] font-black shadow-2xl shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center gap-2 uppercase tracking-widest text-xs"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Direct Onboarding
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-slate-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </span>
            <input 
              type="text" 
              placeholder="Filter by name, email or designation..." 
              className="w-full pl-14 pr-8 py-4 rounded-[1.5rem] bg-white border border-slate-200 focus:outline-none focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-sm font-black uppercase tracking-tight"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 text-slate-400 text-[10px] font-black uppercase tracking-[3px]">
                <th className="px-10 py-6">Staff Identification</th>
                <th className="px-10 py-6">Operational Unit</th>
                <th className="px-10 py-6">Privilege Level</th>
                <th className="px-10 py-6 text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-blue-50/30 transition-all group">
                  <td className="px-10 py-8">
                    <div className="flex items-center space-x-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                        {emp.name[0]}
                      </div>
                      <div>
                        <p className="text-lg font-black text-slate-800 leading-none">{emp.name}</p>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1.5">{emp.designation}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-700 uppercase tracking-tight">{emp.department}</span>
                      <span className="text-[10px] text-slate-400 font-bold mt-1 lowercase">{emp.email}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black rounded-xl uppercase tracking-[2px] shadow-sm">
                      {emp.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <button className="text-slate-300 hover:text-blue-600 transition-all p-3 hover:bg-white hover:shadow-lg rounded-2xl"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10">
            <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="font-black text-3xl text-slate-900 tracking-tighter uppercase italic">Register Staff</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Initialize new professional workspace</p>
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
                <Input label="Staff Name" value={newEmp.name} onChange={(v: string) => setNewEmp({...newEmp, name: v})} required />
                <Input label="Work Email" type="email" value={newEmp.email} onChange={(v: string) => setNewEmp({...newEmp, email: v})} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input label="Access Key (Pass)" type="text" value={newEmp.password} onChange={(v: string) => setNewEmp({...newEmp, password: v})} required />
                <Input label="Official Title" value={newEmp.designation} onChange={(v: string) => setNewEmp({...newEmp, designation: v})} required />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <Select label="Core Unit" options={['Engineering', 'HR', 'Finance', 'Design', 'Training', 'Executive']} value={newEmp.department} onChange={(v: string) => setNewEmp({...newEmp, department: v})} />
                <Select label="Privilege" options={Object.values(UserRole)} value={newEmp.role} onChange={(v: string) => setNewEmp({...newEmp, role: v as UserRole})} />
              </div>
              <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-[0.98] uppercase tracking-[3px] text-xs">
                Activate Professional
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Input = ({ label, type = 'text', value, onChange, required }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">{label}</label>
    <input 
      type={type} 
      required={required}
      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all" 
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

const Select = ({ label, options, value, onChange }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">{label}</label>
    <select 
      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none focus:border-blue-500 transition-all uppercase"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {options.map((opt: string) => <option key={opt} value={opt}>{opt.replace('_', ' ')}</option>)}
    </select>
  </div>
);

export default EmployeeManagement;
