
import React, { useState, useEffect, useRef } from 'react';
import { User, DBConnectionState } from '../types';

const DatabaseManager: React.FC<{ user: User }> = ({ user }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<'IDLE' | 'SYNCING' | 'READY'>('IDLE');

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] PRISMA: ${msg}`, ...prev].slice(0, 20));
  };

  const syncDatabase = () => {
    setStatus('SYNCING');
    addLog("Reading introspection engine...");
    setTimeout(() => {
      addLog("Generating Prisma Client artifacts...");
      setTimeout(() => {
        addLog("Establishing connection pool (size: 5)...");
        setTimeout(() => {
          addLog("Database 'prakura_prod' synchronized successfully.");
          setStatus('READY');
        }, 800);
      }, 800);
    }, 800);
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Persistence Console</h2>
          <p className="text-slate-500 font-medium tracking-tight">Managing PostgreSQL Clusters and Prisma Client Sync.</p>
        </div>
        <button 
          onClick={syncDatabase}
          disabled={status === 'SYNCING'}
          className="bg-slate-950 text-white px-10 py-5 rounded-[2rem] font-black shadow-4xl hover:bg-black transition-all uppercase tracking-[3px] text-xs disabled:opacity-50"
        >
          {status === 'SYNCING' ? 'Syncing Engine...' : 'Initialize Prisma Sync'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-8">
            <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Connection Spec</h3>
            <div className="space-y-6">
              <SpecItem label="Provider" value="PostgreSQL 16.2" />
              <SpecItem label="Host" value="db.prakura.internal" />
              <SpecItem label="Active Pool" value="5/10 Units" />
              <SpecItem label="Latency" value="12ms" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-slate-950 rounded-[4rem] overflow-hidden shadow-4xl h-[600px] flex flex-col border border-white/5">
            <div className="bg-white/5 px-10 py-6 border-b border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[5px]">Standard Output (STDOUT)</span>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
              </div>
            </div>
            <div className="flex-1 p-10 font-mono text-xs leading-relaxed overflow-y-auto custom-scrollbar">
              {logs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full opacity-20 text-slate-400 gap-5">
                   <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                   <p className="font-black uppercase tracking-[5px]">Awaiting Signal</p>
                </div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="mb-3 flex gap-5 animate-in slide-in-from-left duration-300">
                    <span className="text-slate-600 font-black">{logs.length - i}</span>
                    <span className="text-emerald-400/90">{log}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpecItem = ({ label, value }: any) => (
  <div className="space-y-2">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-2">{label}</p>
    <div className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-slate-800 uppercase italic">{value}</div>
  </div>
);

export default DatabaseManager;
