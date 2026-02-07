
import React from 'react';

const SystemDesignDocs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 space-y-12">
      <header className="border-b border-slate-200 pb-8">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Architecture & Engineering Specs</h1>
        <p className="text-slate-500 mt-2 text-lg">Prakura IT Solutions HRMS - Production Grade Blueprint</p>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
          High-Level Architecture
        </h2>
        <div className="bg-slate-900 p-8 rounded-2xl text-slate-300 font-mono text-sm leading-relaxed overflow-x-auto shadow-xl">
          <pre>{`
[ Client Tier ]
React + TS SPA -> Tailwind CSS -> State (Context/Redux)
      |
      V
[ API Gateway / Load Balancer ]
Nginx / AWS ALB
      |
      V
[ Application Tier: Modular Monolith ]
Node.js (NestJS) -> Auth Middleware -> RBAC Handler
  |-- Core HR Module
  |-- Attendance & Time Engine
  |-- Payroll & Finance Processing
  |-- Training & Internship Tracker
  |-- Recruitment ATS Engine
      |
      V
[ Data & Storage Tier ]
PostgreSQL (Primary Relational)
Redis (Caching & Real-time Attendance Sessions)
S3 (Document Storage: Aadhaar, PAN, Certificates)
          `}</pre>
        </div>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 leading-relaxed">
            <strong>Architecture Choice: Modular Monolith.</strong> We chose a Modular Monolith over Microservices for the current Small-to-Medium scale of Prakura IT. This ensures low operational overhead and fast development while maintaining strictly defined module boundaries for future microservice extraction if the scale hits 10k+ employees.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
          Database Schema (ER Design)
        </h2>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TableDoc 
              name="Users" 
              fields={['id (UUID)', 'email (Unique)', 'password_hash', 'role (Enum)', 'status', 'is_tenant_admin']} 
            />
            <TableDoc 
              name="Profiles" 
              fields={['id', 'user_id (FK)', 'pan', 'aadhaar', 'joining_date', 'reporting_to (FK)', 'skills[]']} 
            />
            <TableDoc 
              name="Attendance" 
              fields={['id', 'user_id (FK)', 'check_in', 'check_out', 'location_point', 'status (Enum)', 'date']} 
            />
            <TableDoc 
              name="Training_Batches" 
              fields={['id', 'name', 'trainer_id (FK)', 'start_date', 'end_date', 'intern_ids[]']} 
            />
          </div>
          <p className="text-xs text-slate-400 mt-4 italic font-medium">Indexing Strategy: GIN index on 'skills', B-Tree on 'user_id' and 'date' in Attendance/Payroll tables.</p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
          Security & Compliance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SecurityCard 
            title="Authentication" 
            content="Stateless JWT with short-lived access tokens (15m) and long-lived refresh tokens stored in HTTP-only cookies. Refresh Token Rotation (RTR) implemented." 
          />
          <SecurityCard 
            title="Authorization" 
            content="Role-Based Access Control (RBAC) via middleware. Decorators on API endpoints: @Roles(UserRole.HR_ADMIN)." 
          />
          <SecurityCard 
            title="Data Privacy" 
            content="AES-256 encryption for sensitive document storage. Database level encryption for Aadhaar and PAN fields." 
          />
          <SecurityCard 
            title="Audit Trails" 
            content="Change Data Capture (CDC) or application-level logging for all payroll and employee profile modifications." 
          />
        </div>
      </section>

      <footer className="pt-10 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-500 font-medium">© 2024 Prakura IT Solutions. Confidential Engineering Document.</p>
      </footer>
    </div>
  );
};

const TableDoc = ({ name, fields }: any) => (
  <div className="bg-white p-4 rounded-xl border border-slate-100">
    <h4 className="font-bold text-blue-600 mb-2">Table: {name}</h4>
    <ul className="text-xs space-y-1 font-mono text-slate-600">
      {fields.map((f: string) => <li key={f}>• {f}</li>)}
    </ul>
  </div>
);

const SecurityCard = ({ title, content }: any) => (
  <div className="p-5 border-l-4 border-blue-500 bg-white shadow-sm rounded-r-xl">
    <h4 className="font-bold text-slate-800 mb-2">{title}</h4>
    <p className="text-sm text-slate-500 leading-relaxed">{content}</p>
  </div>
);

export default SystemDesignDocs;
