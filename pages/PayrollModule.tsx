
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
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase">Finance Console</h2>
          <p className="text-slate-500 font-medium">Processing disbursements for Prakura IT workforce.</p>
        </div>
        <button 
          onClick={runPayroll}
          disabled={isProcessing || payrollStatus === 'PROCESSED'}
          className={`px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-[3px] transition-all shadow-2xl ${
            payrollStatus === 'PROCESSED' 
              ? 'bg-emerald-100 text-emerald-700 cursor-default' 
              : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-blue-500/20'
          }`}
        >
          {isProcessing ? 'CALCULATING ENGINE...' : payrollStatus === 'PROCESSED' ? 'BATCH RELEASED' : 'INITIALIZE PAYROLL'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <StatItem label="Total Disbursement" value={`₹${(employees.length * 45000).toLocaleString()}`} color="blue" />
        <StatItem label="Statutory Deductions" value={`₹${(employees.length * 4500).toLocaleString()}`} color="red" />
        <StatItem label="Cycle Status" value={payrollStatus} color={payrollStatus === 'PROCESSED' ? 'green' : 'orange'} />
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50 italic font-black text-[10px] text-slate-400 uppercase tracking-[4px]">
          Personnel Remuneration Registry
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[3px]">
                <th className="px-10 py-6">Staff Identification</th>
                <th className="px-10 py-6">Remuneration (Net)</th>
                <th className="px-10 py-6">Batch Status</th>
                <th className="px-10 py-6 text-right">Draft</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map(emp => (
                <tr key={emp.id} className="hover:bg-slate-50/50 transition-all">
                  <td className="px-10 py-8 font-black text-slate-800 text-sm uppercase italic">{emp.name}</td>
                  <td className="px-10 py-8 text-sm text-slate-600 font-black">₹{(42000 + Math.random()*15000).toLocaleString(undefined, {maximumFractionDigits:0})}</td>
                  <td className="px-10 py-8">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                      payrollStatus === 'PROCESSED' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {payrollStatus === 'PROCESSED' ? 'RELEASED' : 'STAGED'}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <button className="p-3 text-slate-300 hover:text-blue-600 transition-all"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></button>
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

const StatItem = ({ label, value, color }: any) => {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    red: 'bg-red-50 text-red-600 border-red-100',
    green: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
  };
  return (
    <div className={`p-8 rounded-[2rem] border ${colors[color]} shadow-sm`}>
      <p className="text-[10px] font-black uppercase tracking-[3px] opacity-70 mb-2">{label}</p>
      <p className="text-3xl font-black tracking-tighter uppercase italic">{value}</p>
    </div>
  );
};

export default PayrollModule;
