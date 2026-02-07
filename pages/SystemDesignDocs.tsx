
import React from 'react';

const SystemDesignDocs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <header className="border-b border-slate-200 pb-12">
        <div className="flex items-center gap-5 mb-6">
           <span className="px-5 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-[4px] shadow-xl shadow-blue-200">Confidential</span>
           <span className="text-[10px] text-slate-400 font-black uppercase tracking-[4px]">Revision 3.0 • Production Spec</span>
        </div>
        <h1 className="text-6xl font-black text-slate-950 tracking-tighter uppercase italic leading-none">System Architecture & Engineering Blueprints</h1>
        <p className="text-slate-500 mt-6 text-2xl font-medium max-w-3xl leading-relaxed">Enterprise Infrastructure for High-Velocity IT Training and Software Development Scalability.</p>
      </header>

      <section className="space-y-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-5">
          <span className="w-12 h-12 bg-slate-950 text-white rounded-2xl flex items-center justify-center text-lg font-black">01</span>
          Core Technical Stack
        </h2>
        <div className="bg-slate-950 p-12 rounded-[3.5rem] text-slate-300 font-mono text-sm leading-relaxed overflow-x-auto shadow-4xl border border-white/5 relative">
          <div className="absolute top-0 right-0 p-12 opacity-5"><svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg></div>
          <pre>{`
[ Client Engine ]
React 19 (ESM) -> Tailwind CSS (JIT Engine) -> LocalStorage Persistence
      |
      V
[ Distributed Layer ]
Nginx Ingress -> Cloudflare Edge Caching -> RBAC Middleware
      |
      V
[ Logic Processing Units ]
Modular Monolith Architecture:
  |-- ERP_CORE_HR (Personnel Identity Management)
  |-- ERP_ATTENDANCE (Time-series Log Analytics)
  |-- ERP_FINANCE (Remuneration Processing)
  |-- ERP_ACADEMY (Course-ware & Progress Tracks)
      |
      V
[ Storage Persistent Tier ]
PostgreSQL 16 (Primary ACID Database)
Redis 7.2 (Real-time Session State & Latency Reduction)
S3 Distributed Store (Prakura Asset Documents & KYC)
          `}</pre>
        </div>
      </section>

      <section className="space-y-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-5">
          <span className="w-12 h-12 bg-slate-950 text-white rounded-2xl flex items-center justify-center text-lg font-black">02</span>
          ER Model & Data Schema
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <TableDefinition 
            name="Professional_Identity" 
            fields={['id (UUID Primary)', 'email (Indexed Unique)', 'access_key (Encrypted)', 'privilege_role (Enum)', 'unit_dept (FK)']} 
          />
          <TableDefinition 
            name="Operational_TimeLog" 
            fields={['id', 'user_id (FK)', 'inception_time', 'termination_time', 'verification_status', 'geo_point']} 
          />
          <TableDefinition 
            name="Disbursement_History" 
            fields={['id', 'batch_id', 'user_id (FK)', 'net_amount', 'statutory_deductions', 'payout_ts']} 
          />
          <TableDefinition 
            name="Academy_Batches" 
            fields={['id', 'track_name', 'sme_instructor_id (FK)', 'enrollment_count', 'lifecycle_status']} 
          />
        </div>
      </section>

      <footer className="pt-16 border-t border-slate-200 text-center pb-20">
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[5px]">© 2024 Prakura IT Solutions Private Limited</p>
      </footer>
    </div>
  );
};

const TableDefinition = ({ name, fields }: any) => (
  <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all">
    <h4 className="text-xl font-black text-blue-600 mb-6 uppercase italic tracking-tighter">Entity: {name}</h4>
    <ul className="space-y-3">
      {fields.map((f: string) => (
        <li key={f} className="flex items-center gap-4 text-xs font-black font-mono text-slate-500 uppercase tracking-tighter">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
          {f}
        </li>
      ))}
    </ul>
  </div>
);

export default SystemDesignDocs;
