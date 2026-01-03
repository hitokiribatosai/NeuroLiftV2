import React, { useState } from 'react';
import { MuscleGroup, WorkoutPlan } from '../types';
import { generateAIWorkout } from '../services/geminiService';
import { SpotlightButton } from './ui/SpotlightButton';
import { useLanguage } from '../contexts/LanguageContext';
import { getLocalizedMuscleName } from '../utils/exerciseData';

export const AIWorkoutGenerator: React.FC = () => {
  // Changed to array to support multiple selections
  const [selectedMuscles, setSelectedMuscles] = useState<MuscleGroup[]>([]);
  const [focusDescription, setFocusDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [workout, setWorkout] = useState<WorkoutPlan | null>(null);
  const { t, language } = useLanguage();

  const toggleMuscle = (muscle: MuscleGroup) => {
    if (selectedMuscles.includes(muscle)) {
      setSelectedMuscles(selectedMuscles.filter(m => m !== muscle));
    } else {
      setSelectedMuscles([...selectedMuscles, muscle]);
    }
  };

  const handleGenerate = async () => {
    if (selectedMuscles.length === 0) return;
    setLoading(true);
    setWorkout(null);
    
    // Pass array of selected muscles
    const plan = await generateAIWorkout(selectedMuscles, "Intermediate", focusDescription);
    setWorkout(plan);
    setLoading(false);
  };

  return (
    <section id="generator" className="relative border-y border-zinc-800 bg-zinc-900/30 py-24">
       {/* Background Grid Accent */}
       <div className="absolute inset-0 -z-10 grid-bg opacity-10" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
        {/* Left: Interactive Controls */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white">{t('gen_title')}</h2>
            <p className="mt-2 text-zinc-400">{t('gen_desc')}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Object.values(MuscleGroup).map((muscle) => (
              <button
                key={muscle}
                onClick={() => toggleMuscle(muscle)}
                className={`group relative overflow-hidden rounded-md border p-4 text-left transition-all duration-200
                  ${selectedMuscles.includes(muscle) 
                    ? 'border-teal-500 bg-teal-500/10 text-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.3)]' 
                    : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
                  }`}
              >
                {/* Translating muscle names for UI display */}
                <span className="relative z-10 text-sm font-medium">{getLocalizedMuscleName(muscle, language)}</span>
                {selectedMuscles.includes(muscle) && (
                  <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-teal-400 shadow-[0_0_5px_rgba(45,212,191,1)] animate-pulse" />
                )}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">{t('gen_custom_focus_label')}</label>
            <textarea 
              value={focusDescription}
              onChange={(e) => setFocusDescription(e.target.value)}
              placeholder={t('gen_custom_focus_placeholder')}
              className="w-full rounded-lg border border-zinc-800 bg-black/50 p-3 text-sm text-white placeholder-zinc-600 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              rows={3}
            />
          </div>

          <div className="pt-2">
             <SpotlightButton 
              onClick={handleGenerate} 
              disabled={loading || selectedMuscles.length === 0}
              className={`w-full justify-center sm:w-auto ${loading ? 'opacity-70 cursor-wait' : ''}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('gen_loading')}
                </>
              ) : t('gen_btn')}
            </SpotlightButton>
          </div>
        </div>

        {/* Right: The Output / "Display" */}
        <div className="relative min-h-[500px] rounded-2xl border border-zinc-800 bg-black shadow-2xl overflow-hidden">
          {/* Decorative UI Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-3 backdrop-blur-sm">
            <div className="flex space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
              <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
            </div>
            <div className="text-xs font-mono text-zinc-500">AI_COACH_V2.5.exe</div>
          </div>

          <div className="p-6">
            {!workout && !loading && (
               <div className="flex h-full flex-col items-center justify-center space-y-4 pt-20 opacity-50">
                 <div className="h-16 w-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <svg className="h-8 w-8 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                 </div>
                 <p className="text-sm font-mono text-zinc-500">{t('gen_system_ready')}</p>
               </div>
            )}

            {workout && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white tracking-tight">{workout.title}</h3>
                    <span className="rounded bg-teal-500/10 px-2 py-1 text-xs font-mono text-teal-400 border border-teal-500/20">
                      {workout.estimatedDuration}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">{workout.description}</p>
                </div>

                <div className="space-y-4">
                  {workout.exercises.map((ex, idx) => (
                    <div key={idx} className="group relative rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:bg-zinc-800/80">
                       <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500 rounded-l-lg opacity-0 transition-opacity group-hover:opacity-100"></div>
                       <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-zinc-200">{ex.name}</h4>
                            <p className="text-xs text-zinc-500 mt-1 font-mono">{ex.notes}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-white">{ex.sets} Sets</div>
                            <div className="text-xs text-teal-400">{ex.reps}</div>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};