
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
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-20"><svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black tracking-tight">AI Creative Lab</h2>
          <p className="text-blue-100 mt-2 max-w-xl">Supercharge your HR engagement. Generate professional banners, recognition posts, and personalized announcements in seconds.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
        <div className="space-y-4">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">What are we creating today?</label>
          <textarea 
            className="w-full h-32 p-6 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-lg font-medium"
            placeholder="e.g. Employee of the Month recognition for Rahul Sharma who completed Project Alpha..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => generateAssets('text')}
              disabled={isGenerating || !prompt}
              className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isGenerating && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              Draft Announcement
            </button>
            <button 
              onClick={() => generateAssets('image')}
              disabled={isGenerating || !prompt}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              Generate Recognition Banner
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {resultText && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm animate-in slide-in-from-left duration-500">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Content Draft</span>
              <button onClick={() => navigator.clipboard.writeText(resultText)} className="text-blue-600 text-xs font-bold hover:underline">Copy Text</button>
            </div>
            <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed">
              {resultText}
            </div>
          </div>
        )}

        {resultImage && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm animate-in slide-in-from-right duration-500">
             <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Generated Creative</span>
              <a href={resultImage} download="banner.png" className="text-blue-600 text-xs font-bold hover:underline">Download</a>
            </div>
            <img src={resultImage} className="w-full rounded-2xl shadow-lg border border-slate-100" alt="Generated Banner" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeLab;
