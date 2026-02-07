
import React from 'react';

const LMSModule: React.FC<{ user: any }> = ({ user }) => {
  const courses = [
    { id: 1, title: 'Advanced React Patterns', duration: '12h', progress: 45, level: 'Advanced' },
    { id: 2, title: 'Prisma ORM & PostgreSQL', duration: '6h', progress: 100, level: 'Intermediate' },
    { id: 3, title: 'Microservices with NestJS', duration: '18h', progress: 10, level: 'Advanced' }
  ];

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Learning Center</h2>
          <p className="text-slate-500 text-sm">Upskill with Prakura's technical curriculum.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">Browse Catalog</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="h-32 bg-slate-100 flex items-center justify-center font-black text-slate-300 text-4xl uppercase tracking-widest">{course.title.charAt(0)}</div>
            <div className="p-6 flex-1 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">{course.level}</span>
                <span className="text-[10px] text-slate-400 font-bold">{course.duration}</span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg">{course.title}</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>PROGRESS</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${course.progress}%` }} />
                </div>
              </div>
              <button className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all ${
                course.progress === 100 ? 'bg-green-100 text-green-700' : 'bg-slate-900 text-white hover:bg-black'
              }`}>
                {course.progress === 100 ? 'View Certificate' : 'Continue Learning'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LMSModule;
