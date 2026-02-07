
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
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center space-y-6">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${isPunchedIn ? 'bg-green-50' : 'bg-blue-50'}`}>
          <svg className={`w-12 h-12 ${isPunchedIn ? 'text-green-500 animate-pulse' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            {isPunchedIn ? `Punched In at ${punchTime}` : 'Ready to Work'}
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Date: {new Date().toLocaleDateString()}</p>
        </div>
        <button 
          onClick={handlePunch}
          className={`px-12 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all transform active:scale-95 ${
            isPunchedIn 
              ? 'bg-red-500 text-white hover:bg-red-600 shadow-red-200' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
          }`}
        >
          {isPunchedIn ? 'Punch Out Now' : 'Punch In Now'}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Recent Attendance Logs</h3>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{logs.length} Entries</span>
        </div>
        <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto custom-scrollbar">
          {logs.map((log, idx) => (
            <AttendanceRow key={idx} {...log} />
          ))}
        </div>
      </div>
    </div>
  );
};

const AttendanceRow = ({ date, checkIn, checkOut, status }: any) => {
  const statusColors: any = {
    [AttendanceStatus.PRESENT]: 'bg-green-100 text-green-700',
    [AttendanceStatus.LATE]: 'bg-yellow-100 text-yellow-700',
    [AttendanceStatus.ABSENT]: 'bg-red-100 text-red-700',
    [AttendanceStatus.WFH]: 'bg-blue-100 text-blue-700',
  };
  return (
    <div className="p-4 px-6 flex items-center justify-between hover:bg-slate-50 animate-in slide-in-from-top-2 duration-300">
      <div className="flex items-center space-x-12">
        <p className="text-sm font-bold text-slate-700 w-32">{date}</p>
        <div className="space-y-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase">Check In</p>
          <p className="text-sm font-semibold text-slate-600">{checkIn}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase">Check Out</p>
          <p className="text-sm font-semibold text-slate-600">{checkOut}</p>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${statusColors[status]}`}>
        {status}
      </span>
    </div>
  );
};

export default AttendanceTracker;
