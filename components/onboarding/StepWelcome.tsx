import React from 'react';
import { SpotlightButton } from '../ui/SpotlightButton';

interface StepWelcomeProps {
    onNext: () => void;
}

export const StepWelcome: React.FC<StepWelcomeProps> = ({ onNext }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-6 animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(20,184,166,0.5)]">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">NeuroLift</span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-md mb-12 leading-relaxed">
                The only science-backed workout tracker designed to help you build muscle and strength intelligently.
            </p>

            <SpotlightButton onClick={onNext} className="w-full max-w-xs py-5 text-lg font-black uppercase tracking-[0.2em]">
                Get Started
            </SpotlightButton>

            <p className="text-xs text-zinc-600 mt-8 font-mono">
                Takes less than 60 seconds
            </p>
        </div>
    );
};
