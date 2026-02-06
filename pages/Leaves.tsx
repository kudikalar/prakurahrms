
import React, { useState } from 'react';
import { Calendar, Plus, Info, Clock, CheckCircle2, XCircle } from 'lucide-react';

const Leaves: React.FC = () => {
  const [showApplyModal, setShowApplyModal] = useState(false);

  const stats = [
    { label: 'Casual Leave', available: 8, used: 4, total: 12, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Sick Leave', available: 10, used: 2, total: 12, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Earned Leave', available: 15, used: 3, total: 18, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const requests = [
    { id: '1', type: 'Casual Leave', from: '2024-05-20', to: '2024-05-22', days: 3, reason: 'Family function', status: 'PENDING' },
    { id: '2', type: 'Sick Leave', from: '2024-05-05', to: '2024-05-06', days: 2, reason: 'Fever', status: 'APPROVED' },
    { id: '3', type: 'Earned Leave', from: '2024-04-10', to: '2024-04-14', days: 5, reason: 'Personal work', status: 'APPROVED' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Leave Management</h2>
          <p className="text-slate-500">Track your leave balance and manage applications.</p>
        </div>
        <button 
          onClick={() => setShowApplyModal(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95"
        >
          <Plus size={18} />
          Apply for Leave
        </button>
      </header>

      {/* Balance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm group">
            <div className="flex justify-between items-center mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl transition-transform group-hover:scale-110`}>
                <Calendar size={22} />
              </div>
              <button className="text-slate-300 hover:text-slate-500"><Info size={18} /></button>
            </div>
            <h4 className="text-slate-500 text-sm font-bold uppercase tracking-wider">{stat.label}</h4>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-slate-800">{stat.available}</span>
              <span className="text-slate-400 font-bold text-sm">/ {stat.total} Days Left</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-6 overflow-hidden">
               <div 
                 className={`h-full ${stat.color.replace('text', 'bg')} transition-all duration-1000`} 
                 style={{ width: `${(stat.available / stat.total) * 100}%` }}
               />
            </div>
          </div>
        ))}
      </div>

      {/* Requests History */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 text-lg">My Requests History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Duration</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Reason</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-5">
                    <span className="font-bold text-slate-700">{req.type}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-800">{req.days} Days</span>
                      <span className="text-xs text-slate-400 tracking-tight">{req.from} to {req.to}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm text-slate-600 italic">"{req.reason}"</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      req.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 
                      req.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {req.status === 'PENDING' && <Clock size={12} />}
                      {req.status === 'APPROVED' && <CheckCircle2 size={12} />}
                      {req.status === 'REJECTED' && <XCircle size={12} />}
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase underline decoration-indigo-200">View Details</button>
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

export default Leaves;
