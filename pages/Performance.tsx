
import React from 'react';
import { Target, Star, MessageSquare, TrendingUp, BarChart } from 'lucide-react';

const Performance: React.FC = () => {
  const kpis = [
    { title: 'Project Delivery', target: 100, actual: 92, unit: '%' },
    { title: 'Client Satisfaction', target: 4.5, actual: 4.8, unit: 'Stars' },
    { title: 'Code Quality Index', target: 90, actual: 88, unit: '/100' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Performance Management</h2>
          <p className="text-slate-500">Annual Review Period: Q1 2024</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200">
           <Star className="text-amber-400 fill-amber-400" size={20} />
           <span className="font-black text-xl text-slate-800">4.8</span>
           <span className="text-xs font-bold text-slate-400 uppercase">Current Rating</span>
        </div>
      </header>

      {/* KPI Section */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2 font-bold text-slate-800">
          <Target className="text-indigo-600" size={20} />
          Key Performance Indicators (KPIs)
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {kpis.map((kpi, i) => (
            <div key={i} className="text-center space-y-3">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">{kpi.title}</h4>
              <div className="relative inline-flex items-center justify-center">
                 {/* Simplified circular progress visualization */}
                 <div className="w-24 h-24 rounded-full border-8 border-slate-50 flex items-center justify-center">
                    <span className="text-xl font-black text-slate-800">{kpi.actual}{kpi.unit}</span>
                 </div>
              </div>
              <p className="text-xs text-slate-400 font-medium italic">Target: {kpi.target}{kpi.unit}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Manager Feedback */}
        <section className="bg-indigo-900 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="text-indigo-300" size={24} />
            <h3 className="text-xl font-bold">Manager's Feedback</h3>
          </div>
          <blockquote className="text-indigo-100 italic leading-relaxed mb-6">
            "Rahul has shown exceptional growth this quarter, especially in leading the migration to Microservices. His mentorship of the junior interns in the MERN batch has been highly appreciated by the training department."
          </blockquote>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-indigo-700 rounded-full flex items-center justify-center font-bold">SR</div>
             <div>
                <p className="font-bold">Siddharth Rao</p>
                <p className="text-xs text-indigo-300 font-medium">Technical Director</p>
             </div>
          </div>
        </section>

        {/* Skill Matrix */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
           <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="text-emerald-600" size={24} />
            <h3 className="text-xl font-bold text-slate-800">Skill Competency</h3>
          </div>
          <div className="space-y-5">
             {[
               { skill: 'React & Frontend', score: 95 },
               { skill: 'Node.js Backend', score: 88 },
               { skill: 'System Design', score: 75 },
               { skill: 'Team Leadership', score: 82 }
             ].map((s, idx) => (
               <div key={idx}>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span className="uppercase">{s.skill}</span>
                    <span>{s.score}/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${s.score}%` }}></div>
                  </div>
               </div>
             ))}
          </div>
        </section>
      </div>

      {/* Career Roadmap */}
      <section className="bg-slate-50 rounded-3xl p-8 border border-dashed border-slate-300">
         <div className="flex items-center gap-3 mb-4">
            <BarChart className="text-indigo-600" size={24} />
            <h3 className="text-xl font-bold text-slate-800">Career Progression</h3>
          </div>
          <div className="flex items-center gap-6">
             <div className="px-4 py-3 bg-white border border-slate-200 rounded-2xl flex-1 text-center shadow-sm">
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Previous Role</p>
                <p className="font-bold text-slate-600">Associate Engineer</p>
             </div>
             <div className="text-indigo-600 animate-pulse">→</div>
             <div className="px-4 py-3 bg-indigo-600 border border-indigo-700 rounded-2xl flex-1 text-center shadow-lg shadow-indigo-100">
                <p className="text-xs text-indigo-200 font-bold uppercase mb-1">Current Role</p>
                <p className="font-bold text-white">Sr. Software Engineer</p>
             </div>
             <div className="text-slate-300">→</div>
             <div className="px-4 py-3 bg-white border border-slate-200 rounded-2xl flex-1 text-center opacity-50 grayscale">
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Target Role</p>
                <p className="font-bold text-slate-600">Tech Lead</p>
             </div>
          </div>
      </section>
    </div>
  );
};

export default Performance;
