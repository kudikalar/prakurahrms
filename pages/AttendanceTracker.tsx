
import React, { useState } from 'react';
import { AttendanceStatus } from '../types';

interface AttendanceTrackerProps {
  logs: any[];
  onAddLog: (log: any) => void;
}

const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({ logs, onAddLog }) => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchTime, setPunchTime] = useState<string | null>(null);

  const handlePunch = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (!isPunchedIn) {
      setPunchTime(timeStr);
      setIsPunchedIn(true);
    } else {
      const newLog = {
        date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        checkIn: punchTime,
        checkOut: timeStr,
        status: AttendanceStatus.PRESENT
      };
      onAddLog(newLog);
      setIsPunchedIn(false);
      setPunchTime(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center space-y-8 py-16">
        <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl ${isPunchedIn ? 'bg-green-50' : 'bg-blue-50'}`}>
          <svg className={`w-16 h-16 ${isPunchedIn ? 'text-green-500 animate-pulse' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tighter uppercase italic">
            {isPunchedIn ? `Active since ${punchTime}` : 'Shift Standby'}
          </h2>
          <p className="text-slate-500 mt-2 font-bold uppercase tracking-widest text-xs">Today: {new Date().toLocaleDateString()}</p>
        </div>
        <button 
          onClick={handlePunch}
          className={`px-16 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[4px] shadow-2xl transition-all transform active:scale-95 ${
            isPunchedIn 
              ? 'bg-red-500 text-white hover:bg-red-600 shadow-red-200' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
          }`}
        >
          {isPunchedIn ? 'Terminate Shift' : 'Initialize Shift'}
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Verification Logs</h3>
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{logs.length} Cycles</span>
        </div>
        <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto custom-scrollbar">
          {logs.length === 0 ? (
            <div className="p-16 text-center text-slate-400 italic font-bold">No attendance logs identified in system.</div>
          ) : (
            logs.map((log, idx) => (
              <div key={idx} className="p-8 px-10 flex items-center justify-between hover:bg-slate-50 transition-all group">
                <div className="flex items-center space-x-16">
                  <p className="text-sm font-black text-slate-800 w-32 uppercase italic">{log.date}</p>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Entry</p>
                    <p className="text-sm font-black text-slate-600 italic">{log.checkIn}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Exit</p>
                    <p className="text-sm font-black text-slate-600 italic">{log.checkOut}</p>
                  </div>
                </div>
                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700`}>
                  {log.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracker;
