
import React, { useState } from 'react';

const PayrollModule: React.FC<{ employees: any[] }> = ({ employees }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [payrollStatus, setPayrollStatus] = useState('PENDING');

  const runPayroll = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPayrollStatus('PROCESSED');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Payroll Cycle - May 2024</h2>
              <button 
                onClick={runPayroll}
                disabled={isProcessing || payrollStatus === 'PROCESSED'}
                className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                  payrollStatus === 'PROCESSED' 
                    ? 'bg-green-100 text-green-700 cursor-default' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                }`}
              >
                {isProcessing ? 'Calculating...' : payrollStatus === 'PROCESSED' ? 'Completed' : 'Run Payroll'}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Payout</p>
                <p className="text-xl font-bold text-slate-800">₹{(employees.length * 45000).toLocaleString()}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Deductions</p>
                <p className="text-xl font-bold text-red-500">₹{(employees.length * 4500).toLocaleString()}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</p>
                <p className={`text-xl font-bold ${payrollStatus === 'PROCESSED' ? 'text-green-500' : 'text-orange-500'}`}>{payrollStatus}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase">
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Net Salary</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {employees.map(emp => (
                  <tr key={emp.id}>
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">{emp.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">₹{(40000 + Math.random()*20000).toLocaleString(undefined, {maximumFractionDigits:0})}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${payrollStatus === 'PROCESSED' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                        {payrollStatus === 'PROCESSED' ? 'PAID' : 'PENDING'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollModule;
