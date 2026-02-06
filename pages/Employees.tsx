
import React, { useState } from 'react';
import { Search, Filter, Plus, Mail, Phone, Download, MoreHorizontal } from 'lucide-react';

const Employees: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const employees = [
    { id: '1', empCode: 'PRK-1001', name: 'Rahul Verma', email: 'rahul.v@prakura.in', dept: 'Engineering', role: 'Software Engineer', type: 'FULL_TIME', status: 'ACTIVE' },
    { id: '2', empCode: 'PRK-1002', name: 'Sneha Rao', email: 'sneha.r@prakura.in', dept: 'HR', role: 'HR Executive', type: 'FULL_TIME', status: 'ACTIVE' },
    { id: '3', empCode: 'PRK-1003', name: 'Vikram Sahai', email: 'vikram.s@prakura.in', dept: 'Training', role: 'Lead Trainer', type: 'TRAINER', status: 'ACTIVE' },
    { id: '4', empCode: 'PRK-1004', name: 'Ananya Gupta', email: 'ananya.g@prakura.in', dept: 'Marketing', role: 'Digital Marketer', type: 'CONTRACT', status: 'ACTIVE' },
    { id: '5', empCode: 'PRK-INT-201', name: 'Manish Kumar', email: 'manish.k@prakura.in', dept: 'Engineering', role: 'Intern', type: 'INTERN', status: 'ACTIVE' },
  ];

  const filteredEmployees = employees.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.empCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Employee Directory</h2>
          <p className="text-slate-500">Manage all staff members, interns, and external trainers.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">
            <Download size={18} />
            Export
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100">
            <Plus size={18} />
            Add Employee
          </button>
        </div>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, code, or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 shrink-0">
            <Filter size={18} className="text-slate-400" />
            Filters
          </button>
          <select className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 shrink-0">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>HR</option>
            <option>Marketing</option>
            <option>Training</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Employee</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Employee ID</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Department</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/80 transition-all cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                        {emp.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{emp.name}</span>
                        <span className="text-xs text-slate-400">{emp.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-600 tracking-tight">
                      {emp.empCode}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-600">{emp.dept}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-600">{emp.role}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                       <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-indigo-600 hover:bg-indigo-50 transition-all"><Mail size={16} /></button>
                       <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-indigo-600 hover:bg-indigo-50 transition-all"><MoreHorizontal size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 border-t border-slate-100 flex items-center justify-between">
           <span className="text-sm text-slate-500 font-medium">Showing {filteredEmployees.length} of {employees.length} employees</span>
           <div className="flex gap-2">
              <button className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-400 disabled:opacity-50" disabled>Previous</button>
              <button className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
