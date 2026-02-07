
import React from 'react';

const LMSModule: React.FC<{ user: any }> = ({ user }) => {
  const courses = [
    { id: 1, title: 'Advanced React Architecture', duration: '12h', progress: 45, level: 'Advanced' },
    { id: 2, title: 'Enterprise Backend with Prisma', duration: '6h', progress: 100, level: 'Intermediate' },
    { id: 3, title: 'AI Integration Strategies', duration: '18h', progress: 15, level: 'Advanced' }
  ];

  return (
    <div className="space-y-10">
       <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic">Academy Console</h2>
          <p className="text-slate-500 font-medium tracking-tight">Upskill with Prakura's specialized technical curriculum.</p>
        </div>
        <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-2xl shadow-blue-500/20 uppercase tracking-[2px] text-xs">Explore Catalog</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-blue-400 transition-all hover:shadow-2xl">
            <div className="h-48 bg-slate-900 flex items-center justify-center font-black text-white/5 text-8xl uppercase tracking-widest transition-all group-hover:text-blue-500/10">
              {course.title.charAt(0)}
            </div>
            <div className="p-10 flex-1 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-1 rounded-xl uppercase tracking-widest">{course.level}</span>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{course.duration} CLOCK</span>
              </div>
              <h3 className="font-black text-slate-900 text-2xl uppercase italic tracking-tighter leading-none">{course.title}</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Progress Index</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${course.progress}%` }} />
                </div>
              </div>
              <button className={`w-full mt-4 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-[3px] transition-all ${
                course.progress === 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-900 text-white hover:bg-black'
              }`}>
                {course.progress === 100 ? 'Download Credentials' : 'Continue Track'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LMSModule;
