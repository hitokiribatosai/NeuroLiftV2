import React, { useState, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SpotlightButton } from '../ui/SpotlightButton';
import { chatWithNutritionist } from '../../services/geminiService';
import { Card } from '../ui/Card';

export const Nutrition: React.FC = () => {
  const { t } = useLanguage();
  
  // Chat State
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string, image?: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calorie Tracker State
  const [dailyCalories, setDailyCalories] = useState(0);
  const [caloriesInput, setCaloriesInput] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;
    
    const userMsg = input;
    const userImage = selectedImage;

    setMessages(prev => [...prev, { role: 'user', text: userMsg, image: userImage || undefined }]);
    setInput('');
    setSelectedImage(null);
    setLoading(true);

    const response = await chatWithNutritionist(userMsg, userImage || undefined);
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setLoading(false);
  };

  const addCalories = () => {
    const amount = parseInt(caloriesInput);
    if (!isNaN(amount)) {
      setDailyCalories(prev => prev + amount);
      setCaloriesInput('');
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-24 min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-8">
       
       {/* Left Column: Chat Assistant */}
       <div className="lg:col-span-2 flex flex-col h-[70vh] border border-zinc-800 rounded-2xl bg-zinc-900/50 overflow-hidden shadow-2xl">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-zinc-500 mt-20 flex flex-col items-center">
                <div className="h-16 w-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                   <svg className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <h3 className="font-bold text-white text-lg">{t('nutrition_title')}</h3>
                <p className="text-sm opacity-50 max-w-xs">{t('nutrition_chat_placeholder')}</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                 {m.image && (
                   <img src={m.image} alt="User upload" className="max-w-[200px] rounded-lg mb-2 border border-zinc-700" />
                 )}
                 <div className={`max-w-[85%] p-4 rounded-xl whitespace-pre-wrap ${m.role === 'user' ? 'bg-teal-600 text-white rounded-br-none' : 'bg-zinc-800 text-zinc-200 rounded-bl-none'}`}>
                   {m.text}
                 </div>
              </div>
            ))}
            {loading && <div className="text-xs text-teal-400 animate-pulse flex items-center gap-2"><div className="w-2 h-2 bg-teal-400 rounded-full"></div> {t('nutrition_analyzing')}</div>}
          </div>
          
          <div className="p-4 border-t border-zinc-800 bg-black flex gap-2 flex-col">
            {selectedImage && (
              <div className="flex items-center gap-2 bg-zinc-900 px-3 py-2 rounded-lg border border-zinc-700 w-fit">
                <span className="text-xs text-zinc-300">{t('nutrition_image_attached')}</span>
                <button onClick={() => setSelectedImage(null)} className="text-red-400 hover:text-red-300">×</button>
              </div>
            )}
            <div className="flex gap-2">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-3 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                title={t('img_upload_tip')}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
              />
              
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('nutrition_chat_placeholder')}
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-teal-500 outline-none"
              />
              <SpotlightButton onClick={handleSend} disabled={loading}>{t('nutrition_send')}</SpotlightButton>
            </div>
          </div>
       </div>

       {/* Right Column: Calorie Tracker */}
       <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 bg-zinc-900/80">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-teal-400">🔥</span> {t('cal_title')}
            </h3>

            <div className="relative flex items-center justify-center py-8">
               <div className="absolute inset-0 bg-teal-500/10 rounded-full blur-xl"></div>
               <div className="relative text-center">
                 <div className="text-5xl font-mono font-bold text-white">{dailyCalories}</div>
                 <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">{t('cal_consumed')}</div>
               </div>
            </div>

            <div className="space-y-4 mt-8">
              <div className="flex gap-2">
                <input 
                  type="number" 
                  value={caloriesInput}
                  onChange={(e) => setCaloriesInput(e.target.value)}
                  placeholder="e.g. 500"
                  className="flex-1 bg-black border border-zinc-700 rounded px-3 py-2 text-white focus:border-teal-500 outline-none"
                />
                <button 
                  onClick={addCalories}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 rounded font-medium transition-colors"
                >
                  {t('cal_add')}
                </button>
              </div>

              <button 
                onClick={() => setDailyCalories(0)}
                className="w-full text-xs text-zinc-500 hover:text-red-400 transition-colors"
              >
                {t('cal_reset')}
              </button>
            </div>
          </Card>

          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 text-sm text-zinc-400">
             <p className="mb-2 font-semibold text-white">{t('nutrition_tip_title')}</p>
             <p>{t('nutrition_tip_text')}</p>
          </div>
       </div>
    </div>
  );
};