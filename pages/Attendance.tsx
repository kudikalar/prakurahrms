
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
// Added missing BarChart3 icon to the imports from lucide-react
import { MapPin, Clock, ArrowRightCircle, ArrowLeftCircle, BarChart3 } from 'lucide-react';

const Attendance: React.FC = () => {
  const { user } = useAuth();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckInOut = () => {
    if (!isCheckedIn) {
      setIsCheckedIn(true);
      setCheckInTime(new Date().toLocaleTimeString());
    } else {
      setIsCheckedIn(false);
      setCheckInTime(null);
      alert("Successfully Checked Out. Total Hours: 8h 15m (Mocked)");
    }
  };

  const mockLogs = [
    { date: '2024-05-15', in: '09:05 AM', out: '06:12 PM', status: 'PRESENT', hours: '9h 07m' },
    { date: '2024-05-14', in: '08:55 AM', out: '06:05 PM', status: 'PRESENT', hours: '9h 10m' },
    { date: '2024-05-13', in: '10:15 AM', out: '06:00 PM', status: 'LATE', hours: '7h 45m' },
    { date: '2024-05-10', in: '-', out: '-', status: 'ABSENT', hours: '-' },
    { date: '2024-05-09', in: '09:02 AM', out: '06:08 PM', status: 'PRESENT', hours: '9h 06m' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Punch Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-8 text-center space-y-6">
              <div className="inline-flex flex-col items-center">
                <span className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-2">Current Time</span>
                <h2 className="text-5xl font-black text-slate-800 tabular-nums">{currentTime}</h2>
                <p className="text-slate-500 mt-2 font-medium">{new Date().toDateString()}</p>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl flex flex-col gap-4 border border-slate-100">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Employee ID</span>
                  <span className="font-bold text-slate-800">{user?.employeeId || 'PRK-TEMP'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Designation</span>
                  <span className="font-bold text-slate-800">Software Engineer</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleCheckInOut}
                  className={`flex items-center justify-center gap-3 py-6 rounded-2xl text-lg font-bold transition-all transform active:scale-95 shadow-lg ${
                    !isCheckedIn 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200' 
                    : 'bg-red-600 text-white hover:bg-red-700 shadow-red-200'
                  }`}
                >
                  {!isCheckedIn ? (
                    <>
                      <ArrowRightCircle size={28} />
                      Punch In
                    </>
                  ) : (
                    <>
                      <ArrowLeftCircle size={28} />
                      Punch Out
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-2 text-slate-400 text-xs uppercase font-bold">
                  <MapPin size={14} />
                  Office Location (Hyderabad)
                </div>
              </div>

              {isCheckedIn && (
                <div className="animate-pulse flex items-center justify-center gap-3 py-3 px-4 bg-green-50 text-green-700 rounded-xl border border-green-200">
                  <Clock size={18} />
                  <span className="font-semibold">Shift started at {checkInTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Attendance History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-lg">My Attendance Logs</h3>
              <select className="bg-slate-50 border-none text-sm font-semibold rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500">
                <option>May 2024</option>
                <option>April 2024</option>
                <option>March 2024</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">In Time</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Out Time</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Working Hours</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockLogs.map((log, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-700">{log.date}</td>
                      <td className="px-6 py-4 text-slate-600">{log.in}</td>
                      <td className="px-6 py-4 text-slate-600">{log.out}</td>
                      <td className="px-6 py-4 font-semibold text-slate-800">{log.hours}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          log.status === 'PRESENT' ? 'bg-green-100 text-green-700' : 
                          log.status === 'LATE' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-indigo-900 rounded-2xl p-6 text-white flex items-center justify-between">
            <div>
              <h4 className="text-indigo-200 text-sm font-medium uppercase mb-1">Total Hours This Month</h4>
              <p className="text-3xl font-bold">156.5 Hours</p>
            </div>
            <div className="h-12 w-12 bg-indigo-800 rounded-xl flex items-center justify-center">
              <BarChart3 size={24} className="text-indigo-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
