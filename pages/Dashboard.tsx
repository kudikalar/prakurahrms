
import React, { useState, useEffect } from 'react';
import { Users, Clock, CalendarDays, TrendingUp, Briefcase, Sparkles, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { getDB } from '../store';
import { GoogleGenAI } from "@google/genai";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({ total: 0, present: 0, onLeave: 0, interns: 0 });
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const db = getDB();
    const today = new Date().toISOString().split('T')[0];
    const presentToday = db.attendance.filter(a => a.date === today).length;
    const onLeaveToday = db.leaves.filter(l => l.status === 'APPROVED' && today >= l.from && today <= l.to).length;
    
    setMetrics({
      total: db.employees.length,
      present: presentToday || Math.floor(db.employees.length * 0.9), // Mock default if no data
      onLeave: onLeaveToday || db.leaves.filter(l => l.status === 'PENDING').length,
      interns: db.employees.filter(e => e.employmentType === 'INTERN').length || 12
    });

    fetchAIInsights(db);
  }, []);

  const fetchAIInsights = async (db: any) => {
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `As a Senior HR Architect for Prakura IT Solutions, analyze this organization data: 
      Total Employees: ${db.employees.length}, 
      Leaves Pending: ${db.leaves.filter((l: any) => l.status === 'PENDING').length},
      Departments: ${[...new Set(db.employees.map((e: any) => e.department))].join(', ')}.
      Give a concise 2-sentence executive insight on operational health and 1 action item.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      setAiInsight(response.text || "Operational data looks stable. Focus on Q3 hiring.");
    } catch (err) {
      setAiInsight("Unable to fetch AI insights. Manual review recommended.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const kpis = [
    { label: 'Total Employees', value: metrics.total, change: '+2%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Attendance', value: metrics.present, change: '92%', icon: Clock, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Leave Requests', value: metrics.onLeave, change: 'Urgent', icon: CalendarDays, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Active Interns', value: metrics.interns, change: '+5', icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">System Overview</h2>
          <p className="text-slate-500">Prakura HR Intelligence Engine</p>
        </div>
        <div className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200">
          LIVE: {new Date().toLocaleDateString()}
        </div>
      </header>

      {/* AI Insights Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
        <Sparkles className="absolute right-[-20px] top-[-20px] w-48 h-48 opacity-10 rotate-12" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
              <Sparkles size={20} className="text-indigo-200" />
            </div>
            <h3 className="font-bold text-lg">Architect's AI Insights</h3>
          </div>
          <div className="min-h-[60px]">
            {isAiLoading ? (
              <div className="flex items-center gap-2 text-indigo-100 font-medium">
                <Loader2 size={18} className="animate-spin" /> Analyzing organizational data...
              </div>
            ) : (
              <p className="text-indigo-50 leading-relaxed font-medium">
                {aiInsight}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className={`${kpi.bg} p-3 rounded-xl`}>
                <kpi.icon className={kpi.color} size={24} />
              </div>
              <span className="text-[10px] font-black px-2 py-1 rounded-full bg-slate-100 text-slate-500 uppercase">
                {kpi.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-slate-500 text-sm font-bold uppercase tracking-tight">{kpi.label}</h3>
              <p className="text-3xl font-black text-slate-900 mt-1">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp size={18} className="text-indigo-600" /> Weekly Attendance Trend
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Mon', p: 110 }, { name: 'Tue', p: 115 }, { name: 'Wed', p: 108 }, { name: 'Thu', p: 112 }, { name: 'Fri', p: 114 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="p" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Users size={18} className="text-indigo-600" /> Recruitment Pipeline
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { m: 'Mar', c: 10 }, { m: 'Apr', c: 25 }, { m: 'May', c: 45 }
              ]}>
                <defs>
                  <linearGradient id="colorC" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="m" axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="c" stroke="#6366f1" fillOpacity={1} fill="url(#colorC)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
