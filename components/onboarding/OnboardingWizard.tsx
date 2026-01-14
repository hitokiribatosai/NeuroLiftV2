import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { StepWelcome } from './StepWelcome';
import { StepGoals } from './StepGoals';
import { safeStorage } from '../../utils/storage';

interface OnboardingWizardProps {
    onComplete: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [data, setData] = useState<Partial<UserProfile>>({
        unitSystem: 'metric'
    });

    const updateData = (newData: Partial<UserProfile>) => {
        setData(prev => ({ ...prev, ...newData }));
    };

    const next = () => setStep(s => s + 1);
    const back = () => setStep(s => s - 1);

    const finish = () => {
        // Save profile to storage
        safeStorage.setItem('neuroLift_user_profile', JSON.stringify(data));
        // Mark onboarding as done
        safeStorage.setItem('neuroLift_onboarding_completed', 'true');
        onComplete();
    };

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
            {/* Progress Bar */}
            <div className="h-1 bg-zinc-900 w-full">
                <div
                    className="h-full bg-teal-500 transition-all duration-500"
                    style={{ width: `${((step + 1) / 3) * 100}%` }}
                ></div>
            </div>

            <div className="flex-1 max-w-lg w-full mx-auto p-6 md:p-10">
                {step === 0 && <StepWelcome onNext={next} />}
                {step === 1 && <StepGoals data={data} updateData={updateData} onNext={finish} onBack={back} />}
                {/* We'll add Biometrics and Experience later if needed, for now just 2 steps to verify flow */}
            </div>
        </div>
    );
};
