
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
        contents: "Generate a professional quarterly performance review for a Senior Software Engineer at Prakura IT Solutions who has exceeded expectations in React development and mentorship but needs to improve on documentation. Keep it under 150 words.",
        config: {
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      setAiFeedback(response.text || "Could not generate feedback.");
    } catch (err) {
      setAiFeedback("AI Feedback generation is only available with a valid API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-2">My Performance Goals</h2>
        <p className="text-sm text-slate-500 mb-6">Quarterly Review Cycle (Q2 2024)</p>
        
        <div className="space-y-4">
          <GoalItem title="Complete Project Alpha Deployment" progress={75} color="blue" />
          <GoalItem title="Mentor 5 New Interns" progress={100} color="green" />
          <GoalItem title="Achieve 95% Code Coverage" progress={40} color="orange" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl text-white shadow-xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold">AI Performance Assistant</h3>
            <p className="text-blue-100 text-sm mt-1">Get generated insights and feedback drafts powered by Gemini.</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 min-h-[150px] border border-white/20">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center h-24">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="text-xs font-bold mt-4 uppercase tracking-widest text-blue-200">Analyzing Performance Data...</p>
            </div>
          ) : aiFeedback ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{aiFeedback}</p>
          ) : (
            <div className="text-center py-8">
              <p className="text-blue-100 italic">No feedback draft generated yet.</p>
            </div>
          )}
        </div>
        
        <button 
          onClick={generateAIFeedback}
          disabled={isGenerating}
          className="mt-6 w-full py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all disabled:opacity-50"
        >
          {aiFeedback ? 'Regenerate Draft' : 'Generate Review Draft'}
        </button>
      </div>
    </div>
  );
};

const GoalItem = ({ title, progress, color }: any) => {
  const barColors: any = {
    blue: 'bg-blue-600',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-bold text-slate-700">{title}</span>
        <span className="font-bold text-slate-500">{progress}%</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${barColors[color]} transition-all duration-1000`} 
          style={{ width: `${progress}%` }} 
        />
      </div>
    </div>
  );
};

export default PerformanceSystem;
