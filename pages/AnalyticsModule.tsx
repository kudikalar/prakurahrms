
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AnalyticsModule: React.FC<{ employees: any[] }> = ({ employees }) => {
  const deptData = [
    { name: 'Engineering', count: employees.filter(e => e.department === 'Engineering').length || 12 },
    { name: 'HR', count: employees.filter(e => e.department === 'HR').length || 4 },
    { name: 'Academy', count: 8 },
    { name: 'Exec', count: 3 }
  ];

  const RISK_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-10">
       <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase">Intelligence Hub</h2>
          <p className="text-slate-500 font-medium">Advanced workforce analytics and trend forecasting.</p>
        </div>
        <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black shadow-2xl hover:bg-black transition-all uppercase tracking-[2px] text-xs">Export Enterprise Audit</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-sm">
          <h3 className="text-xl font-black text-slate-800 mb-10 uppercase italic underline decoration-blue-500/20">Distribution By Unit</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '2rem', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-sm">
          <h3 className="text-xl font-black text-slate-800 mb-10 uppercase italic underline decoration-indigo-500/20">Operational Stability Risk</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{name:'Secure', value: 75}, {name:'Alert', value: 20}, {name:'Critical', value: 5}]} innerRadius={80} outerRadius={110} paddingAngle={10} dataKey="value">
                   {deptData.map((_, index) => <Cell key={`cell-${index}`} fill={RISK_COLORS[index % RISK_COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModule;
