
import React, { useState } from 'react';
import { User } from '../types';
import { GoogleGenAI } from "@google/genai";

const PerformanceSystem: React.FC<{ user: User }> = ({ user }) => {
  const [aiFeedback, setAiFeedback] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAIFeedback = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a professional quarterly performance review for ${user.name} at Prakura IT Solutions who has exceeded expectations in technical development but needs to improve on documentation. Keep it under 150 words.`,
        config: { thinkingConfig: { thinkingBudget: 0 } }
      });
      setAiFeedback(response.text || "Could not generate feedback.");
    } catch (err) {
      setAiFeedback("AI Feedback generation failed. Verify API configuration.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-200">
        <h2 className="text-3xl font-black text-slate-900 mb-2 uppercase italic tracking-tighter">Growth Matrix</h2>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[4px] mb-12">Performance Review Cycle: Q2 2024</p>
        
        <div className="space-y-10">
          <GoalItem title="Infrastructure Deployment Alpha" progress={85} color="blue" />
          <GoalItem title="Personnel Mentorship Track" progress={100} color="green" />
          <GoalItem title="Architecture Documentation Coverage" progress={45} color="orange" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-700 to-indigo-900 p-12 rounded-[3.5rem] text-white shadow-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-125 transition-transform duration-1000">
          <svg className="w-48 h-48" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-start justify-between gap-10">
          <div className="space-y-4">
            <h3 className="text-4xl font-black tracking-tighter uppercase italic">AI Performance Synthesis</h3>
            <p className="text-blue-100 text-lg font-medium leading-relaxed max-w-xl">Leverage Gemini Intelligence to synthesize professional performance insights and growth trajectories based on operational data.</p>
            <button 
              onClick={generateAIFeedback}
              disabled={isGenerating}
              className="mt-6 px-12 py-5 bg-white text-blue-700 font-black rounded-[2rem] text-xs uppercase tracking-[3px] shadow-2xl transition-all hover:scale-105 disabled:opacity-50"
            >
              {isGenerating ? 'Analyzing Matrix...' : 'Generate Review Synthesis'}
            </button>
          </div>
          
          <div className="w-full md:w-96 bg-white/10 backdrop-blur-3xl rounded-[2.5rem] p-10 min-h-[300px] border border-white/20 shadow-2xl animate-in zoom-in duration-500">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center h-48 gap-6">
                <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-white/30 border-t-white"></div>
                <p className="text-[10px] font-black uppercase tracking-[4px] text-blue-200 animate-pulse">Scanning Registry...</p>
              </div>
            ) : aiFeedback ? (
              <p className="text-sm leading-relaxed italic font-medium text-white/90">{aiFeedback}</p>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center gap-4 opacity-50">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                <p className="text-[10px] font-black uppercase tracking-[3px]">Waiting for initialization</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const GoalItem = ({ title, progress, color }: any) => {
  const barColors: any = {
    blue: 'bg-blue-600',
    green: 'bg-emerald-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <span className="font-black text-slate-800 text-lg uppercase tracking-tight italic">{title}</span>
        <span className="font-black text-slate-400 text-xs tracking-widest">{progress}%</span>
      </div>
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
        <div 
          className={`h-full ${barColors[color]} transition-all duration-1000 rounded-full shadow-lg`} 
          style={{ width: `${progress}%` }} 
        />
      </div>
    </div>
  );
};

export default PerformanceSystem;
