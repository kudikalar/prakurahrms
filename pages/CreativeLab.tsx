
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const CreativeLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultText, setResultText] = useState<string | null>(null);

  const generateAssets = async (type: 'image' | 'text') => {
    setIsGenerating(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      if (type === 'image') {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: `Generate a high-quality professional employee recognition banner for: ${prompt}. Minimalist, corporate style.` }] },
          config: { imageConfig: { aspectRatio: "16:9" } }
        });
        const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
        if (part?.inlineData) setResultImage(`data:image/png;base64,${part.inlineData.data}`);
      } else {
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Draft a creative and engaging internal announcement for: ${prompt}. Use a modern tone, include emojis, and keep it professional.`,
        });
        setResultText(response.text || "Failed to generate text.");
      }
    } catch (e) {
      console.error(e);
      alert("AI Generation failed. Check API key settings.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-900 rounded-[3rem] p-12 text-white shadow-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10"><svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg></div>
        <div className="relative z-10 space-y-4">
          <h2 className="text-4xl font-black tracking-tighter uppercase italic">Creative Intelligence</h2>
          <p className="text-blue-100 mt-2 max-w-2xl text-lg font-medium leading-relaxed">Supercharge enterprise engagement. Generate professional recognition banners and personalized broadcasts instantly with Gemini.</p>
        </div>
      </div>

      <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-sm p-12">
        <div className="space-y-6">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[4px] ml-4">Creative Specification</label>
          <textarea 
            className="w-full h-48 p-10 rounded-[3rem] bg-slate-50 border border-slate-200 focus:ring-[16px] focus:ring-blue-500/5 focus:border-blue-500 transition-all outline-none text-xl font-black italic tracking-tight resize-none"
            placeholder="e.g. Employee of the Month recognition for Rahul Sharma who completed Project Alpha ahead of schedule..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="flex flex-wrap gap-6 pt-4">
            <button 
              onClick={() => generateAssets('text')}
              disabled={isGenerating || !prompt}
              className="px-12 py-5 bg-slate-950 text-white rounded-[2rem] font-black text-xs uppercase tracking-[3px] hover:bg-black transition-all disabled:opacity-50 flex items-center gap-3 shadow-2xl"
            >
              {isGenerating && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              Draft Protocol
            </button>
            <button 
              onClick={() => generateAssets('image')}
              disabled={isGenerating || !prompt}
              className="px-12 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[3px] hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-3 shadow-2xl shadow-blue-500/20"
            >
              {isGenerating && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              Generate Banner
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {resultText && (
          <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-sm animate-in slide-in-from-left duration-700 relative overflow-hidden">
            <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-100">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[4px]">AI Protocol Draft</span>
              <button onClick={() => navigator.clipboard.writeText(resultText)} className="text-blue-600 text-[10px] font-black hover:underline uppercase tracking-widest">Copy Registry</button>
            </div>
            <div className="prose prose-slate max-w-none text-slate-800 text-lg leading-relaxed italic font-medium">
              {resultText}
            </div>
          </div>
        )}

        {resultImage && (
          <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-sm animate-in slide-in-from-right duration-700">
             <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-100">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[4px]">Generated Enterprise Asset</span>
              <a href={resultImage} download="prakura_recognition.png" className="text-blue-600 text-[10px] font-black hover:underline uppercase tracking-widest">Download Asset</a>
            </div>
            <img src={resultImage} className="w-full rounded-[2.5rem] shadow-3xl border border-slate-100" alt="Generated Banner" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeLab;
