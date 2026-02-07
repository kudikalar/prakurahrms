
import React, { useState, useEffect, useRef } from 'react';
import { User, DBConnectionState } from '../types';
import { GoogleGenAI } from "@google/genai";

const DatabaseManager: React.FC<{ user: User }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'console' | 'schema' | 'service'>('console');
  const [connState, setConnState] = useState<DBConnectionState>({
    status: 'DISCONNECTED',
    engineStatus: 'IDLE',
    latency: 0,
    activePools: 0,
    lastMigration: '2024-05-15 09:12',
    databaseName: 'prakura_hrms_prod',
    prismaVersion: '5.12.0'
  });

  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string, type: 'info' | 'query' | 'error' = 'info') => {
    const prefix = type === 'query' ? 'prisma:query ' : type === 'error' ? 'prisma:error ' : 'prisma:info  ';
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${prefix}${msg}`]);
  };

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const initiatePrismaConnection = async () => {
    setConnState(prev => ({ ...prev, status: 'CONNECTING', engineStatus: 'GENERATING' }));
    setLogs([]);
    
    const steps = [
      { msg: "Reading environment variables from .env...", type: 'info' },
      { msg: "Environment variable DATABASE_URL detected.", type: 'info' },
      { msg: "Prisma Client (v5.12.0) initializing...", type: 'info' },
      { msg: "Introspecting database schema from 'public'...", type: 'info' },
      { msg: "Generating Prisma Client artifacts (index.d.ts)...", type: 'info' },
      { msg: "SELECT version();", type: 'query' },
      { msg: "Database engine: PostgreSQL 16.2", type: 'info' },
      { msg: "Opening connection pool (min: 2, max: 10)...", type: 'info' },
      { msg: "SELECT count(*) FROM \"User\";", type: 'query' },
      { msg: "Prisma Client is ready. All models mapped.", type: 'info' }
    ];

    for (const step of steps) {
      await new Promise(r => setTimeout(r, 400));
      addLog(step.msg, step.type as any);
    }

    setConnState(prev => ({
      ...prev,
      status: 'CONNECTED',
      engineStatus: 'READY',
      latency: 8,
      activePools: 5
    }));
  };

  const prismaSchema = `// schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  name          String
  role          Role      @default(EMPLOYEE)
  designation   String?
  department    String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  profile       Profile?
}

model Profile {
  id          String   @id @default(uuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id])
  panCard     String?
  aadhaar     String?
  skills      String[]
}`;

  const prismaServiceCode = `// prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient 
  implements OnModuleInit, OnModuleDestroy {
  
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('PostgreSQL via Prisma Connected Successfully');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}`;

  return (
    <div className="space-y-6">
      {/* Top Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard label="PostgreSQL Version" value="16.2" icon="🐘" />
        <MetricCard label="Prisma Client" value={connState.prismaVersion} icon="💎" />
        <MetricCard label="Active Pool" value={connState.activePools} icon="🔗" />
        <MetricCard label="Engine Latency" value={`${connState.latency}ms`} icon="⚡" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Connection Config Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Prisma Config
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Provider</label>
                <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-sm font-semibold text-slate-700">postgresql</div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Database URL</label>
                <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-[11px] font-mono text-slate-500 break-all leading-relaxed">
                  postgresql://admin:********@db.prakura.internal:5432/hrms_prod?sslmode=require
                </div>
              </div>
              <div className="pt-4">
                <button 
                  onClick={initiatePrismaConnection}
                  disabled={connState.status === 'CONNECTING'}
                  className={`w-full py-3 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                    connState.status === 'CONNECTED' 
                      ? 'bg-emerald-500 text-white shadow-emerald-200' 
                      : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200'
                  }`}
                >
                  {connState.status === 'CONNECTING' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Connecting Engine...
                    </>
                  ) : connState.status === 'CONNECTED' ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      Client Connected
                    </>
                  ) : 'Initialize Prisma Client'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl shadow-indigo-100">
            <h4 className="font-bold text-lg mb-2">Prisma Migration</h4>
            <p className="text-indigo-100 text-xs mb-4">Last successful migration was synchronized 2 days ago.</p>
            <div className="space-y-2">
              <MigrationStep label="20240515_add_payroll_table" status="Applied" />
              <MigrationStep label="20240514_fix_profile_relation" status="Applied" />
            </div>
            <button className="w-full mt-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-sm font-bold transition-all">
              Push Schema Changes
            </button>
          </div>
        </div>

        {/* Development Workbench */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex space-x-2 bg-slate-100 p-1 rounded-xl w-fit">
            <TabBtn active={activeTab === 'console'} onClick={() => setActiveTab('console')}>Prisma Log</TabBtn>
            <TabBtn active={activeTab === 'schema'} onClick={() => setActiveTab('schema')}>schema.prisma</TabBtn>
            <TabBtn active={activeTab === 'service'} onClick={() => setActiveTab('service')}>prisma.service.ts</TabBtn>
          </div>

          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl h-[500px] flex flex-col">
            <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                {activeTab === 'console' ? 'Standard Output' : activeTab === 'schema' ? 'Prisma Definitions' : 'Backend Service Pattern'}
              </span>
              <button 
                onClick={() => navigator.clipboard.writeText(activeTab === 'schema' ? prismaSchema : prismaServiceCode)}
                className="text-[10px] font-bold text-slate-400 hover:text-white transition-colors"
              >
                Copy Content
              </button>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar font-mono text-xs leading-relaxed">
              {activeTab === 'console' ? (
                logs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-600 space-y-3">
                    <svg className="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                    <p className="italic">Waiting for engine initialization...</p>
                  </div>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className="mb-1.5 flex gap-3">
                      <span className="text-slate-500 whitespace-nowrap">{i + 1}</span>
                      <span className={log.includes('prisma:query') ? 'text-blue-400' : log.includes('prisma:error') ? 'text-red-400' : 'text-slate-300'}>
                        {log}
                      </span>
                    </div>
                  ))
                )
              ) : (
                <pre className="text-emerald-400 whitespace-pre">
                  {activeTab === 'schema' ? prismaSchema : prismaServiceCode}
                </pre>
              )}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, icon }: any) => (
  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex items-center justify-between">
      <span className="text-lg">{icon}</span>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
    </div>
    <p className="mt-2 text-xl font-bold text-slate-800">{value}</p>
  </div>
);

const MigrationStep = ({ label, status }: any) => (
  <div className="flex items-center justify-between text-[11px] py-1">
    <span className="text-indigo-200 truncate pr-4">{label}</span>
    <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-bold">{status}</span>
  </div>
);

const TabBtn = ({ active, onClick, children }: any) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
      active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
    }`}
  >
    {children}
  </button>
);

export default DatabaseManager;
