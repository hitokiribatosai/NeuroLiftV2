import React from 'react';
import { UserProfile } from '../../types';

interface StepGoalsProps {
    data: Partial<UserProfile>;
    updateData: (data: Partial<UserProfile>) => void;
    onNext: () => void;
    onBack: () => void;
}

const goals = [
    { id: 'hypertrophy', label: 'Build Muscle', icon: '💪', desc: 'Maximize growth (8-12 reps)' },
    { id: 'strength', label: 'Get Stronger', icon: '🏋️', desc: 'Lift heavier weights (1-5 reps)' },
    { id: 'weight_loss', label: 'Lose Fat', icon: '🔥', desc: 'High intensity & cardio' },
    { id: 'endurance', label: 'Endurance', icon: '🏃', desc: 'Stamina & performance' },
] as const;

export const StepGoals: React.FC<StepGoalsProps> = ({ data, updateData, onNext, onBack }) => {
    return (
        <div className="flex flex-col h-full animate-in slide-in-from-right duration-500">
            <div className="flex-1">
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Primary Goal</h2>
                <p className="text-zinc-400 mb-8">What are you training for?</p>

                <div className="grid gap-4">
                    {goals.map((g) => (
                        <button
                            key={g.id}
                            onClick={() => {
                                updateData({ goal: g.id });
                                // Optional: auto-advance or let user click next
                            }}
                            className={`p-6 rounded-3xl border text-left transition-all relative overflow-hidden group ${data.goal === g.id
                                    ? 'bg-teal-500 border-teal-500 shadow-[0_0_30px_rgba(20,184,166,0.3)]'
                                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                                }`}
                        >
                            <div className="flex items-center gap-4 relative z-10">
                                <span className="text-4xl">{g.icon}</span>
                                <div>
                                    <h3 className={`text-xl font-black uppercase tracking-tight ${data.goal === g.id ? 'text-white' : 'text-zinc-200'}`}>
                                        {g.label}
                                    </h3>
                                    <p className={`text-xs font-bold uppercase tracking-widest ${data.goal === g.id ? 'text-teal-100' : 'text-zinc-500'}`}>
                                        {g.desc}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex gap-4 pt-8">
                <button onClick={onBack} className="px-6 py-4 rounded-xl font-bold text-zinc-500 hover:text-white transition-colors">
                    Back
                </button>
                <button
                    onClick={onNext}
                    disabled={!data.goal}
                    className="flex-1 bg-white text-black rounded-xl font-black uppercase tracking-widest hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    Next Step
                </button>
            </div>
        </div>
    );
};
