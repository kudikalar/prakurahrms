
import React, { useState } from 'react';
import { UserRole } from '../types';

interface EmployeeManagementProps {
  employees: any[];
  onAdd: (emp: any) => void;
}

const EmployeeManagement: React.FC<EmployeeManagementProps> = ({ employees, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmp, setNewEmp] = useState({
    name: '',
    email: '',
    password: 'prakura_pass_2024',
    designation: '',
    department: 'Engineering',
    role: UserRole.EMPLOYEE
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newEmp);
    setIsModalOpen(false);
    setNewEmp({ name: '', email: '', password: 'prakura_pass_2024', designation: '', department: 'Engineering', role: UserRole.EMPLOYEE });
  };

  const filtered = employees.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic underline decoration-blue-500/20">Workforce Hub</h2>
          <p className="text-slate-500 font-medium tracking-tight text-lg">Managing {employees.length} professional profiles in the Prakura ecosystem.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black shadow-3xl hover:bg-blue-700 transition-all flex items-center gap-3 uppercase tracking-[3px] text-xs transform hover:-translate-y-1"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Onboard Pro
        </button>
      </div>

      <div className="bg-white rounded-[3.5rem] shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-10 border-b border-slate-100 bg-slate-50/50">
          <div className="relative w-full max-w-xl">
            <span className="absolute inset-y-0 left-0 pl-6 flex items-center text-slate-400">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </span>
            <input 
              type="text" 
              placeholder="Filter identification records..." 
              className="w-full pl-16 pr-10 py-5 rounded-[2rem] bg-white border border-slate-200 focus:outline-none focus:ring-[12px] focus:ring-blue-500/5 focus:border-blue-500 transition-all text-sm font-black uppercase tracking-tight"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 text-slate-400 text-[10px] font-black uppercase tracking-[4px]">
                <th className="px-12 py-8">Identification</th>
                <th className="px-12 py-8">Corporate Unit</th>
                <th className="px-12 py-8">Privilege</th>
                <th className="px-12 py-8 text-right">Execute</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-blue-50/30 transition-all group">
                  <td className="px-12 py-10">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 rounded-[1.75rem] bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center font-black text-white text-2xl shadow-xl group-hover:scale-110 transition-transform">
                        {emp.name[0]}
                      </div>
                      <div>
                        <p className="text-xl font-black text-slate-950 tracking-tighter uppercase italic">{emp.name}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[3px] mt-2">{emp.designation}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-12 py-10">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-800 uppercase tracking-tighter">{emp.department}</span>
                      <span className="text-[10px] text-slate-400 font-bold mt-1.5 lowercase">{emp.email}</span>
                    </div>
                  </td>
                  <td className="px-12 py-10">
                    <span className="px-5 py-2 bg-slate-950 text-white text-[10px] font-black rounded-xl uppercase tracking-[3px] shadow-lg">
                      {emp.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-12 py-10 text-right">
                    <button className="text-slate-300 hover:text-blue-600 transition-all p-4 hover:bg-white hover:shadow-2xl rounded-[1.5rem]"><svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-[4rem] shadow-4xl overflow-hidden animate-in zoom-in-95 border border-white/20">
            <div className="p-12 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="font-black text-4xl text-slate-950 tracking-tighter uppercase italic">Authorize Staff</h3>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[4px] mt-3">Initialize New Professional Profile</p>
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
                <Input label="Professional Name" value={newEmp.name} onChange={(v: string) => setNewEmp({...newEmp, name: v})} required />
                <Input label="Work Email Address" type="email" value={newEmp.email} onChange={(v: string) => setNewEmp({...newEmp, email: v})} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Input label="Access Key (Generated)" type="text" value={newEmp.password} onChange={(v: string) => setNewEmp({...newEmp, password: v})} required />
                <Input label="Job Title" value={newEmp.designation} onChange={(v: string) => setNewEmp({...newEmp, designation: v})} required />
              </div>
              <div className="grid grid-cols-2 gap-10">
                <Select label="Enterprise Unit" options={['Engineering', 'HR', 'Finance', 'Design', 'Academy', 'Executive']} value={newEmp.department} onChange={(v: string) => setNewEmp({...newEmp, department: v})} />
                <Select label="System Privilege" options={Object.values(UserRole)} value={newEmp.role} onChange={(v: string) => setNewEmp({...newEmp, role: v as UserRole})} />
              </div>
              <button type="submit" className="w-full py-6 bg-blue-600 text-white font-black rounded-[2.5rem] shadow-3xl hover:bg-blue-700 transition-all active:scale-[0.98] uppercase tracking-[4px] text-xs">
                Activate Professional Identity
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Input = ({ label, type = 'text', value, onChange, required }: any) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">{label}</label>
    <input 
      type={type} 
      required={required}
      className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black focus:ring-[10px] focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all" 
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

const Select = ({ label, options, value, onChange }: any) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">{label}</label>
    <select 
      className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none focus:border-blue-500 transition-all uppercase"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {options.map((opt: string) => <option key={opt} value={opt}>{opt.replace('_', ' ')}</option>)}
    </select>
  </div>
);

export default EmployeeManagement;
