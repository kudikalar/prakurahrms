
import React, { useState, useRef } from 'react';
import { 
  Wand2, 
  Sparkles, 
  Video, 
  Image as ImageIcon, 
  Upload, 
  Download, 
  Loader2, 
  ArrowRight,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const CreativeLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [image, setImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultVideo, setResultVideo] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoStatus, setVideoStatus] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResultImage(null);
        setResultVideo(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImage = async () => {
    if (!image || !prompt) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = image.split(',')[1];
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: 'image/png' } },
            { text: prompt }
          ]
        }
      });

      const part = response.candidates[0].content.parts.find(p => p.inlineData);
      if (part) {
        setResultImage(`data:image/png;base64,${part.inlineData.data}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error generating image. Ensure prompt is descriptive.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!image) return;
    setLoading(true);
    setVideoStatus('Initializing Veo Engine...');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = image.split(',')[1];
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt || 'Professional cinematic movement',
        image: {
          imageBytes: base64Data,
          mimeType: 'image/png'
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        setVideoStatus('Processing frames... (this may take a minute)');
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await response.blob();
      setResultVideo(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      alert("Video generation failed. Please try a different projecting image.");
    } finally {
      setLoading(false);
      setVideoStatus('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight italic">AI Creative Lab</h2>
          <p className="text-slate-500 font-medium mt-1">Harness the power of Gemini and Veo for Prakura assets.</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-[2rem] border border-slate-200">
          <button 
            onClick={() => setActiveTab('image')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'image' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <ImageIcon size={18} /> Vision Lab
          </button>
          <button 
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'video' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Video size={18} /> Motion Lab
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Source Panel */}
        <div className="space-y-8">
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden p-10 space-y-8">
             <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-800 italic">Source Asset</h3>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-all shadow-sm"
                >
                  <Upload size={20} />
                </button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
             </div>

             <div className="aspect-video bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden relative group">
                {image ? (
                  <>
                    <img src={image} className="w-full h-full object-cover" alt="Source" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                       <span className="text-white font-black uppercase tracking-widest text-xs">Replace Asset</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center space-y-4 px-10">
                    <div className="w-16 h-16 bg-white rounded-2xl border border-slate-100 flex items-center justify-center mx-auto text-slate-300">
                        <ImageIcon size={32} />
                    </div>
                    <p className="text-slate-400 font-bold text-sm tracking-tight uppercase">Upload a PNG or JPEG to begin intelligence synthesis</p>
                  </div>
                )}
             </div>

             <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Architectural Prompt</label>
                <div className="relative">
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={activeTab === 'image' ? "E.g. Add a professional blue corporate filter..." : "E.g. Create a slow cinematic zoom into the center..."}
                    className="w-full px-8 py-6 rounded-[2rem] border border-slate-200 outline-none focus:ring-4 focus:ring-indigo-100 font-bold transition-all bg-slate-50/50 min-h-[140px]"
                  />
                  <div className="absolute right-6 bottom-6">
                    <Sparkles className="text-indigo-300" size={24} />
                  </div>
                </div>
             </div>

             <button 
               disabled={!image || loading}
               onClick={activeTab === 'image' ? handleEditImage : handleGenerateVideo}
               className="w-full py-8 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 disabled:bg-slate-100 disabled:text-slate-300 transition-all shadow-2xl flex items-center justify-center gap-4"
             >
                {loading ? <Loader2 size={24} className="animate-spin" /> : (activeTab === 'image' ? <Wand2 size={24} /> : <Play size={24} />)}
                {loading ? 'Synthesizing...' : (activeTab === 'image' ? 'Refine Vision' : 'Generate Motion')}
             </button>
             
             {loading && videoStatus && (
               <div className="text-center animate-pulse">
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{videoStatus}</p>
               </div>
             )}
          </div>
        </div>

        {/* Result Panel */}
        <div className="space-y-8">
           <div className="bg-white rounded-[40px] border border-slate-200 shadow-2xl overflow-hidden p-10 space-y-8 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-800 italic">Synthesized Result</h3>
                <div className="flex gap-2">
                   {(resultImage || resultVideo) && (
                     <button className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-all">
                        <Download size={20} />
                     </button>
                   )}
                </div>
              </div>

              <div className="flex-1 bg-slate-900 rounded-[2.5rem] flex items-center justify-center overflow-hidden min-h-[300px] relative">
                 {!resultImage && !resultVideo && !loading ? (
                    <div className="text-center p-10 space-y-4">
                       <RotateCcw className="text-slate-700 mx-auto" size={48} />
                       <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Awaiting Generation Sequence</p>
                    </div>
                 ) : loading ? (
                    <div className="text-center space-y-4">
                       <div className="relative inline-block">
                          <div className="w-20 h-20 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400" size={24} />
                       </div>
                       <p className="text-indigo-400 font-black uppercase tracking-widest text-[10px]">Processing Neuro-layers</p>
                    </div>
                 ) : (
                    <>
                       {activeTab === 'image' && resultImage && <img src={resultImage} className="w-full h-full object-contain" alt="Result" />}
                       {activeTab === 'video' && resultVideo && (
                         <video src={resultVideo} className="w-full h-full object-contain" controls autoPlay loop />
                       )}
                    </>
                 )}
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4">
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Synthesis Model</p>
                    <p className="text-sm font-black text-slate-800 tracking-tight italic">{activeTab === 'image' ? 'Gemini 2.5 Flash Image' : 'Veo 3.1 Preview'}</p>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Processing Time</p>
                    <p className="text-sm font-black text-slate-800 tracking-tight italic">{activeTab === 'image' ? '~4.2s' : '~45s'}</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
      
      {/* Documentation Card */}
      <footer className="bg-gradient-to-br from-slate-800 to-slate-950 rounded-[40px] p-12 text-white shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-10 text-slate-700/20 select-none pointer-events-none">
            <h1 className="text-[140px] font-black tracking-tighter leading-none italic">PKR</h1>
         </div>
         <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <AlertCircle className="text-indigo-400" size={20} />
                  <h4 className="font-black italic tracking-tight uppercase text-lg">Architect's Note</h4>
               </div>
               <p className="text-slate-400 font-medium leading-relaxed text-sm">Use descriptive prompts for best results. When editing images, mention lighting and atmosphere. For video, describe the camera path clearly.</p>
            </div>
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-400" size={20} />
                  <h4 className="font-black italic tracking-tight uppercase text-lg">Compliance</h4>
               </div>
               <p className="text-slate-400 font-medium leading-relaxed text-sm">All generated content adheres to Prakura IT Solutions private data policy. Assets are only available for internal branding use.</p>
            </div>
            <div className="flex items-center justify-end">
               <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-400 transition-all flex items-center gap-2">
                  Learn Synthesis <ArrowRight size={16} />
               </button>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default CreativeLab;
