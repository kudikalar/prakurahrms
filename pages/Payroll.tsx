
import React, { useState } from 'react';
import { Download, Eye, DollarSign, CreditCard, Building2, Receipt } from 'lucide-react';

const Payroll: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-04');

  const payrollSummary = {
    gross: 450000,
    net: 395000,
    deductions: 55000,
    employeesPaid: 12
  };

  const employees = [
    { id: '1', name: 'Rahul Verma', designation: 'Sr. Developer', basic: 25000, allowance: 15000, deductions: 5000, net: 35000 },
    { id: '2', name: 'Sneha Rao', designation: 'HR Executive', basic: 18000, allowance: 7000, deductions: 3000, net: 22000 },
    { id: '3', name: 'Amit Singh', designation: 'Project Manager', basic: 45000, allowance: 25000, deductions: 10000, net: 60000 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Payroll Management</h2>
          <p className="text-slate-500">Manage salary processing and Indian tax compliances (PF, ESI, TDS).</p>
        </div>
        <div className="flex gap-3">
          <input 
            type="month" 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100">
            Run Payroll
          </button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-green-50 p-2 rounded-lg text-green-600"><DollarSign size={20} /></div>
            <span className="text-sm font-semibold text-slate-500">Total Net Pay</span>
          </div>
          <p className="text-2xl font-black text-slate-900">₹3,95,000</p>
          <div className="mt-2 text-xs text-slate-400">For {selectedMonth}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-red-50 p-2 rounded-lg text-red-600"><CreditCard size={20} /></div>
            <span className="text-sm font-semibold text-slate-500">Total Deductions</span>
          </div>
          <p className="text-2xl font-black text-slate-900">₹55,000</p>
          <div className="mt-2 text-xs text-slate-400">PF, PT, TDS</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Building2 size={20} /></div>
            <span className="text-sm font-semibold text-slate-500">Employer Contrib.</span>
          </div>
          <p className="text-2xl font-black text-slate-900">₹22,400</p>
          <div className="mt-2 text-xs text-slate-400">Statutory Compliance</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600"><Receipt size={20} /></div>
            <span className="text-sm font-semibold text-slate-500">Tax Liabilities</span>
          </div>
          <p className="text-2xl font-black text-slate-900">₹18,500</p>
          <div className="mt-2 text-xs text-slate-400">Current Month TDS</div>
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Payroll Records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Employee</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Basic (₹)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Allowances (₹)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Deductions (₹)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Net Pay (₹)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800">{emp.name}</span>
                      <span className="text-xs text-slate-500">{emp.designation}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{emp.basic.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-600">{emp.allowance.toLocaleString()}</td>
                  <td className="px-6 py-4 text-red-600 font-medium">-{emp.deductions.toLocaleString()}</td>
                  <td className="px-6 py-4 font-black text-slate-900 underline decoration-indigo-200">{emp.net.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors"><Eye size={18} /></button>
                      <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors"><Download size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
