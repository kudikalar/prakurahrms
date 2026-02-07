
import React, { useState } from 'react';
import { Asset, User } from '../types';

interface Props {
  assets: Asset[];
  employees: User[];
  onUpdate: (a: Asset[]) => void;
}

const AssetManagement: React.FC<Props> = ({ assets, employees, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAsset, setNewAsset] = useState<Partial<Asset>>({ name: '', type: 'LAPTOP', status: 'FUNCTIONAL', serialNumber: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assetObj: Asset = {
      ...newAsset as Asset,
      id: 'A' + Date.now(),
      allocatedDate: new Date().toISOString().split('T')[0]
    };
    onUpdate([...assets, assetObj]);
    setIsModalOpen(false);
    setNewAsset({ name: '', type: 'LAPTOP', status: 'FUNCTIONAL', serialNumber: '' });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic">Inventory Engine</h2>
          <p className="text-slate-500 font-medium tracking-tight">Managing {assets.length} hardware units across Prakura IT Solution sites.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-2xl shadow-blue-500/20 hover:bg-blue-700 transition-all uppercase tracking-widest text-xs">+ Register Asset</button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/80 text-[10px] font-black text-slate-400 uppercase tracking-[3px]">
              <th className="px-10 py-6">Hardware Item</th>
              <th className="px-10 py-6">Classification</th>
              <th className="px-10 py-6">Serial Registry</th>
              <th className="px-10 py-6">User Allocation</th>
              <th className="px-10 py-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {assets.map(asset => (
              <tr key={asset.id} className="hover:bg-blue-50/30 transition-all animate-in fade-in duration-300">
                <td className="px-10 py-8 font-black text-slate-800 text-sm uppercase italic">{asset.name}</td>
                <td className="px-10 py-8"><span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black rounded-lg uppercase tracking-tight">{asset.type}</span></td>
                <td className="px-10 py-8 font-mono text-xs text-slate-500 font-black">{asset.serialNumber}</td>
                <td className="px-10 py-8 text-sm text-slate-600 font-black italic">{asset.allocatedTo || 'STORAGE'}</td>
                <td className="px-10 py-8">
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                    asset.status === 'FUNCTIONAL' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {asset.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {assets.length === 0 && (
          <div className="py-20 text-center text-slate-400 italic font-bold">No assets registered in global inventory.</div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in">
          <div className="bg-white w-full max-w-xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-10 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <h3 className="font-black text-3xl text-slate-900 tracking-tighter uppercase italic">Inventory Entry</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Initialize hardware registry</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-500 transition-all hover:rotate-90 flex items-center justify-center shadow-sm"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input label="Item Identification" value={newAsset.name} onChange={(v:string) => setNewAsset({...newAsset, name: v})} required />
                <Input label="Registry Serial #" value={newAsset.serialNumber} onChange={(v:string) => setNewAsset({...newAsset, serialNumber: v})} required />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <Select label="Hardware Class" options={['LAPTOP', 'ID_CARD', 'MOBILE', 'ACCESS_KEY']} value={newAsset.type} onChange={(v:string) => setNewAsset({...newAsset, type: v as any})} />
                <Select label="Operation Status" options={['FUNCTIONAL', 'DAMAGED']} value={newAsset.status} onChange={(v:string) => setNewAsset({...newAsset, status: v as any})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Personnel Allocation</label>
                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none appearance-none" value={newAsset.allocatedTo} onChange={e => setNewAsset({...newAsset, allocatedTo: e.target.value})}>
                  <option value="">STORAGE (UNALLOCATED)</option>
                  {employees.map(e => <option key={e.id} value={e.name}>{e.name.toUpperCase()}</option>)}
                </select>
              </div>
              <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-[0.98] uppercase tracking-[3px] text-xs">Confirm Hardware Registration</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Input = ({ label, value, onChange, required }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">{label}</label>
    <input required={required} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none focus:border-blue-500 transition-all" value={value} onChange={e => onChange(e.target.value)} />
  </div>
);

const Select = ({ label, options, value, onChange }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">{label}</label>
    <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black outline-none appearance-none uppercase" value={value} onChange={e => onChange(e.target.value)}>
      {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default AssetManagement;
