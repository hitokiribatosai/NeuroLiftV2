import React from 'react';
import { SpotlightButton } from './ui/SpotlightButton';
import { HERO_FEATURES } from '../constants/bentoGrid';
import { useLanguage } from '../contexts/LanguageContext';

interface HomeProps {
  setCurrentView: (view: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentView }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 pt-12 pb-20 md:pt-20 md:pb-32 text-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[100px] -z-10 opacity-30 animate-pulse"></div>

        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900/50 rounded-full border border-zinc-800 mb-4 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">v2.0 Beta Live</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-tight">
            Scientific <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">Hypertrophy</span>
          </h1>

          <p className="text-lg text-zinc-400 max-w-lg mx-auto leading-relaxed">
            The intelligent workout tracker that adapts to your goals. No spreadsheets. No guesswork. Just gains.
          </p>

          <div className="pt-8 flex flex-col items-center gap-4">
            <SpotlightButton
              onClick={() => setCurrentView('tracker')}
              className="px-12 py-5 text-lg font-black uppercase tracking-widest shadow-2xl shadow-teal-500/20"
            >
              Start Tracking
            </SpotlightButton>
            <p className="text-xs text-zinc-600 font-mono">No account required</p>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[180px] gap-4">
          {HERO_FEATURES.map((feature) => (
            <button
              key={feature.id}
              onClick={() => feature.link !== '#' && setCurrentView(feature.link)}
              className={`relative group p-6 rounded-3xl border text-left transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between overflow-hidden ${feature.className}`}
            >
              <div className="absolute top-0 right-0 p-32 bg-white/5 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full -z-0"></div>

              <div className="relative z-10">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">{feature.title}</h3>
                <p className="text-sm text-zinc-400">{feature.description}</p>
              </div>

              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0 translate-x-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};
