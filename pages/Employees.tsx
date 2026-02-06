
import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Mail, Download, MoreHorizontal, Loader2, UserPlus } from 'lucide-react';
import { hrmsService } from '../services/hrmsService';
import { Employee, EmploymentType } from '../types';

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmp, setNewEmp] = useState({
    firstName: '', lastName: '', email: '', department: 'Engineering', designation: '', empCode: '', salary: 0
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    const data = await hrmsService.getEmployees();
    setEmployees(data);
    setLoading(false);
  };

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const code = `PRK-${Math.floor(1000 + Math.random() * 9000)}`;
    await hrmsService.addEmployee({
      ...newEmp,
      empCode: code,
      joiningDate: new Date().toISOString().split('T')[0],
      employmentType: EmploymentType.FULL_TIME,
      status: 'ACTIVE'
    } as any);
    await fetchEmployees();
    setIsModalOpen(false);
  };

  const filtered = employees.filter(e => 
    `${e.firstName} ${e.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.empCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Staff Directory</h2>
          <p className="text-slate-500 font-medium">Manage organization hierarchy and talent pool</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-indigo-100 transition-all active:scale-95"
        >
          <UserPlus size={20} /> Add Staff
        </button>
      </header>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, code..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
          />
        </div>
        <button className="px-5 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2">
          <Filter size={18} /> Filters
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center text-slate-400 gap-4">
            <Loader2 className="animate-spin text-indigo-600" size={40} />
            <span className="font-bold">Syncing with DB...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Profile</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Employee ID</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/50 group transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-black">
                          {emp.firstName[0]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{emp.firstName} {emp.lastName}</p>
                          <p className="text-xs text-slate-400 font-medium">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">{emp.empCode}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-600">{emp.department}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-green-100 text-green-700 uppercase">
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-300 hover:text-indigo-600"><MoreHorizontal size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden scale-in">
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-800">Add New Member</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400">✕</button>
            </div>
            <form onSubmit={handleAddEmployee} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="First Name" onChange={e => setNewEmp({...newEmp, firstName: e.target.value})} className="px-4 py-3 rounded-xl border border-slate-200 w-full outline-none focus:ring-2 focus:ring-indigo-600" />
                <input required placeholder="Last Name" onChange={e => setNewEmp({...newEmp, lastName: e.target.value})} className="px-4 py-3 rounded-xl border border-slate-200 w-full outline-none focus:ring-2 focus:ring-indigo-600" />
              </div>
              <input required type="email" placeholder="Corporate Email" onChange={e => setNewEmp({...newEmp, email: e.target.value})} className="px-4 py-3 rounded-xl border border-slate-200 w-full outline-none focus:ring-2 focus:ring-indigo-600" />
              <input required placeholder="Designation" onChange={e => setNewEmp({...newEmp, designation: e.target.value})} className="px-4 py-3 rounded-xl border border-slate-200 w-full outline-none focus:ring-2 focus:ring-indigo-600" />
              <button type="submit" className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl hover:bg-indigo-700 transition-all">Create Profile</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
