
import React from 'react';
import { 
  Users, 
  Clock, 
  CalendarDays, 
  TrendingUp, 
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const kpis = [
    { label: 'Total Employees', value: '124', change: '+5%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Present Today', value: '112', change: '92%', icon: Clock, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'On Leave', value: '8', change: '-2%', icon: CalendarDays, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Active Interns', value: '45', change: '+12', icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  const attendanceData = [
    { name: 'Mon', present: 110, late: 5 },
    { name: 'Tue', present: 115, late: 3 },
    { name: 'Wed', present: 108, late: 12 },
    { name: 'Thu', present: 112, late: 4 },
    { name: 'Fri', present: 114, late: 2 },
  ];

  const hiringTrend = [
    { month: 'Jan', count: 12 },
    { month: 'Feb', count: 18 },
    { month: 'Mar', count: 15 },
    { month: 'Apr', count: 25 },
    { month: 'May', count: 32 },
    { month: 'Jun', count: 28 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Welcome back, {user?.firstName}!</h2>
        <p className="text-slate-500">Here's what's happening at Prakura IT Solutions today.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div className={`${kpi.bg} p-3 rounded-xl`}>
                <kpi.icon className={kpi.color} size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${kpi.change.includes('+') ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {kpi.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-slate-500 text-sm font-medium">{kpi.label}</h3>
              <p className="text-3xl font-bold text-slate-900 mt-1">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Attendance Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp size={20} className="text-indigo-600" />
              Attendance Overview (Last 5 Days)
            </h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="present" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="late" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hiring Trend */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Intern Onboarding Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hiringTrend}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#6366f1" fillOpacity={1} fill="url(#colorCount)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Alerts */}
      <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Urgent Actions</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
            <AlertCircle className="text-red-600" size={24} />
            <div className="flex-1">
              <h4 className="font-semibold text-red-900">Pending Leave Approvals</h4>
              <p className="text-sm text-red-700">There are 12 leave requests awaiting your review.</p>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700">Review</button>
          </div>
          <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <Briefcase className="text-indigo-600" size={24} />
            <div className="flex-1">
              <h4 className="font-semibold text-indigo-900">New Intern Batch Starts Monday</h4>
              <p className="text-sm text-indigo-700">"Full Stack Web" batch with 15 students is scheduled to begin.</p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">Manage</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
