
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MapPin, Clock, ArrowRightCircle, ArrowLeftCircle, Loader2 } from 'lucide-react';
import { hrmsService } from '../services/hrmsService';
import { AttendanceRecord } from '../types';

const Attendance: React.FC = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState<AttendanceRecord[]>([]);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    fetchLogs();
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchLogs = async () => {
    if (!user) return;
    const data = await hrmsService.getAttendance(user.id);
    setLogs(data);
    const today = new Date().toISOString().split('T')[0];
    const punchToday = data.find(l => l.date === today);
    if (punchToday) setIsCheckedIn(true);
  };

  const handlePunch = async () => {
    if (!user) return;
    setLoading(true);
    if (!isCheckedIn) {
      await hrmsService.punchIn(user.id);
      setIsCheckedIn(true);
    } else {
      alert("Shift ended. Punch recorded locally.");
      setIsCheckedIn(false);
    }
    await fetchLogs();
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-2xl overflow-hidden text-center p-10 space-y-8">
            <div>
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2 block">Live Clock</span>
              <h2 className="text-6xl font-black text-slate-800 tabular-nums tracking-tighter">{currentTime}</h2>
              <p className="text-slate-400 font-bold mt-2">{new Date().toDateString()}</p>
            </div>

            <button
              onClick={handlePunch}
              disabled={loading}
              className={`w-full py-8 rounded-[30px] text-xl font-black transition-all transform active:scale-95 flex items-center justify-center gap-3 shadow-2xl ${
                !isCheckedIn 
                ? 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700' 
                : 'bg-rose-600 text-white shadow-rose-100 hover:bg-rose-700'
              }`}
            >
              {loading ? <Loader2 className="animate-spin" /> : (isCheckedIn ? <ArrowLeftCircle size={32} /> : <ArrowRightCircle size={32} />)}
              {isCheckedIn ? 'Punch Out' : 'Punch In'}
            </button>

            <div className="flex items-center justify-center gap-2 text-slate-400 text-[10px] font-black uppercase">
              <MapPin size={14} /> Registered: Office - Hyderabad HQ
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-full">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-black text-slate-800 text-lg">Shift History</h3>
              <Clock className="text-slate-300" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">In Time</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.length === 0 ? (
                    <tr><td colSpan={3} className="px-6 py-20 text-center text-slate-400 font-medium">No records found for this month.</td></tr>
                  ) : logs.map((log, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700">{log.date}</td>
                      <td className="px-6 py-4 font-mono text-slate-600">{log.checkIn}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-tight">Present</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
