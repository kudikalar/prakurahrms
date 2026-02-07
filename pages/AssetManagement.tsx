
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
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Hardware Registry</h2>
          <p className="text-slate-500 font-medium tracking-tight">Managing {assets.length} Enterprise Units across global sites.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black shadow-3xl hover:bg-blue-700 transition-all uppercase tracking-[3px] text-xs">+ Register Asset</button>
      </div>

      <div className="bg-white rounded-[3.5rem] border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/80 text-[10px] font-black text-slate-400 uppercase tracking-[4px]">
              <th className="px-12 py-8">Hardware Specification</th>
              <th className="px-12 py-8">Class</th>
              <th className="px-12 py-8">Serial #</th>
              <th className="px-12 py-8">Personnel Allocation</th>
              <th className="px-12 py-8">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {assets.map(asset => (
              <tr key={asset.id} className="hover:bg-blue-50/30 transition-all">
                <td className="px-12 py-10 font-black text-slate-900 text-lg uppercase italic leading-none">{asset.name}</td>
                <td className="px-12 py-10"><span className="px-4 py-1.5 bg-slate-950 text-white text-[10px] font-black rounded-xl uppercase tracking-tighter">{asset.type}</span></td>
                <td className="px-12 py-10 font-mono text-xs text-slate-500 font-black uppercase">{asset.serialNumber}</td>
                <td className="px-12 py-10 text-sm text-slate-800 font-black italic uppercase tracking-tight">{asset.allocatedTo || 'STORAGE DEPOT'}</td>
                <td className="px-12 py-10">
                  <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${asset.status === 'FUNCTIONAL' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {asset.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {assets.length === 0 && (
          <div className="py-24 text-center text-slate-400 font-black uppercase tracking-[4px] text-xs">Inventory Stream Empty</div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-[4rem] shadow-4xl overflow-hidden animate-in zoom-in-95 border border-white/20">
            <div className="p-12 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <h3 className="font-black text-4xl text-slate-950 tracking-tighter uppercase italic">Asset Registry</h3>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[4px] mt-3">Initialize hardware identification entry</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-16 h-16 rounded-[2rem] bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-500 transition-all hover:rotate-90 flex items-center justify-center shadow-lg"
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-12 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Item Name</label>
                  <input required className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none focus:border-blue-500 transition-all" value={newAsset.name} onChange={e => setNewAsset({...newAsset, name: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Registry Serial #</label>
                  <input required className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none focus:border-blue-500 transition-all" value={newAsset.serialNumber} onChange={e => setNewAsset({...newAsset, serialNumber: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Class</label>
                  <select className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none transition-all uppercase" value={newAsset.type} onChange={e => setNewAsset({...newAsset, type: e.target.value as any})}>
                    <option>LAPTOP</option>
                    <option>ID_CARD</option>
                    <option>MOBILE</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Status</label>
                  <select className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none transition-all uppercase" value={newAsset.status} onChange={e => setNewAsset({...newAsset, status: e.target.value as any})}>
                    <option>FUNCTIONAL</option>
                    <option>DAMAGED</option>
                  </select>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-3">Personnel Allocation</label>
                <select className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-black outline-none transition-all uppercase" value={newAsset.allocatedTo} onChange={e => setNewAsset({...newAsset, allocatedTo: e.target.value})}>
                  <option value="">UNALLOCATED (DEPOT)</option>
                  {employees.map(e => <option key={e.id} value={e.name}>{e.name.toUpperCase()}</option>)}
                </select>
              </div>
              <button type="submit" className="w-full py-6 bg-blue-600 text-white font-black rounded-[2.5rem] shadow-3xl hover:bg-blue-700 transition-all active:scale-[0.98] uppercase tracking-[4px] text-xs">Verify & Commit Registry Entry</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetManagement;
