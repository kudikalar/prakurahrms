
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MapPin, Clock, ArrowRightCircle, ArrowLeftCircle, Loader2, Map as MapIcon, Navigation, Coffee, Info } from 'lucide-react';
import { hrmsService } from '../services/hrmsService';
import { AttendanceRecord } from '../types';
import { GoogleGenAI } from "@google/genai";

const Attendance: React.FC = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState<AttendanceRecord[]>([]);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [locationIntel, setLocationIntel] = useState<string | null>(null);
  const [isIntelLoading, setIsIntelLoading] = useState(false);

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
      fetchVicinityIntel();
    } else {
      alert("Shift ended. Punch recorded locally.");
      setIsCheckedIn(false);
    }
    await fetchLogs();
    setLoading(false);
  };

  const fetchVicinityIntel = async () => {
    setIsIntelLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: "Suggest 3 highly-rated cafes or lunch spots within a 5-minute walk of Hitech City, Hyderabad for an employee lunch break. Provide brief descriptions.",
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: {
                latitude: 17.4483,
                longitude: 78.3915
              }
            }
          }
        }
      });
      setLocationIntel(response.text || "No intelligence found.");
    } catch (err) {
      console.error(err);
      setLocationIntel("Unable to load vicinity data.");
    } finally {
      setIsIntelLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[48px] border border-slate-200 shadow-2xl overflow-hidden text-center p-12 space-y-10 relative">
            <div className="absolute top-0 right-0 p-8">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center animate-pulse">
                    <Navigation size={24} />
                </div>
            </div>
            <div>
              <span className="text-[12px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-4 block italic">Live Terminal</span>
              <h2 className="text-7xl font-black text-slate-800 tabular-nums tracking-tighter leading-none">{currentTime}</h2>
              <p className="text-slate-400 font-bold mt-4 uppercase tracking-widest text-xs">{new Date().toDateString()}</p>
            </div>

            <button
              onClick={handlePunch}
              disabled={loading}
              className={`w-full py-10 rounded-[36px] text-2xl font-black transition-all transform active:scale-95 flex flex-col items-center justify-center gap-4 shadow-2xl ${
                !isCheckedIn 
                ? 'bg-slate-900 text-white shadow-slate-200 hover:bg-indigo-600' 
                : 'bg-rose-600 text-white shadow-rose-100 hover:bg-rose-700'
              }`}
            >
              {loading ? <Loader2 className="animate-spin" size={40} /> : (isCheckedIn ? <ArrowLeftCircle size={48} /> : <ArrowRightCircle size={48} />)}
              <span className="uppercase tracking-[0.2em] text-sm">{isCheckedIn ? 'Complete Shift' : 'Initiate Session'}</span>
            </button>

            <div className="pt-6 border-t border-slate-50 flex items-center justify-center gap-3 text-slate-400 text-[11px] font-black uppercase tracking-widest">
              <MapPin size={16} className="text-indigo-600" /> HQ: Madhapur, Hyderabad
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-3">
                  <Clock className="text-indigo-600" size={24} />
                  <h3 className="font-black text-slate-800 text-xl tracking-tight italic">Roster Logs</h3>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:underline">Download PDF</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Timeline</th>
                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Entry Time</th>
                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Validation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.length === 0 ? (
                    <tr><td colSpan={3} className="px-8 py-24 text-center text-slate-400 font-bold uppercase tracking-widest italic opacity-50">Zero sequence detected.</td></tr>
                  ) : logs.map((log, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-8 py-6 font-black text-slate-800 tracking-tight">{log.date}</td>
                      <td className="px-8 py-6 font-mono font-black text-indigo-600">{log.checkIn}</td>
                      <td className="px-8 py-6">
                        <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-xl text-[11px] font-black uppercase tracking-tighter">Verified</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Maps Grounding Intel */}
          <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-[40px] p-10 text-white relative overflow-hidden group shadow-2xl">
            <MapIcon className="absolute right-[-40px] bottom-[-40px] w-64 h-64 text-white/5 rotate-12 transition-transform group-hover:scale-110 duration-700" />
            <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                            <Coffee size={20} className="text-indigo-300" />
                        </div>
                        <h4 className="font-black tracking-tight text-xl italic">Vicinity Intelligence</h4>
                    </div>
                    {isIntelLoading && <Loader2 className="animate-spin text-indigo-400" size={20} />}
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    {!locationIntel && !isIntelLoading ? (
                        <div className="text-center py-4">
                            <button onClick={fetchVicinityIntel} className="text-xs font-black uppercase tracking-widest bg-white text-indigo-900 px-6 py-3 rounded-xl hover:bg-indigo-50 transition-all flex items-center gap-2 mx-auto">
                                <Info size={14} /> Scan Area
                            </button>
                        </div>
                    ) : (
                        <p className="text-indigo-100 text-sm leading-relaxed font-medium">
                            {locationIntel}
                        </p>
                    )}
                </div>
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em]">Data sourced via Google Maps Real-time API</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
