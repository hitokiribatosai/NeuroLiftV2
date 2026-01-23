import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { playNotificationSound } from '../utils/audio';
import { safeStorage } from '../utils/storage';

type ClockMode = 'stopwatch' | 'timer';

interface ClockContextType {
    // Workout Timer
    workoutDuration: number;
    setWorkoutDuration: React.Dispatch<React.SetStateAction<number>>;
    isWorkoutActive: boolean;
    setIsWorkoutActive: (active: boolean) => void;
    resetWorkout: () => void;

    // Utility Clock
    mode: ClockMode;
    setMode: (mode: ClockMode) => void;
    timerActive: boolean;
    setTimerActive: (active: boolean) => void;
    duration: number; // For stopwatch (counts up)
    setDuration: React.Dispatch<React.SetStateAction<number>>;
    countdownRemaining: number | null; // For timer (counts down)
    setCountdownRemaining: React.Dispatch<React.SetStateAction<number | null>>;

    // Shared / Helpers
    countdownMinutes: string;
    setCountdownMinutes: (mins: string) => void;
    countdownSeconds: string;
    setCountdownSeconds: (secs: string) => void;
    laps: number[];
    addLap: () => void;
    resetClock: () => void;
    startTimer: (mins: number, secs: number) => void;
    restRemaining: number | null;
    setRestRemaining: (seconds: number | null) => void;
}

const ClockContext = createContext<ClockContextType | undefined>(undefined);

export const ClockProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // --- WORKOUT TIMER STATE (Tracker) ---
    const [workoutDuration, setWorkoutDuration] = useState(() => {
        const saved = safeStorage.getItem('neuroLift_workout_duration');
        return saved ? parseInt(saved) : 0;
    });
    const [isWorkoutActive, setIsWorkoutActive] = useState(() => {
        return safeStorage.getItem('neuroLift_workout_active') === 'true';
    });

    // --- UTILITY CLOCK STATE (Clock Tab) ---
    const [utilityMode, setUtilityMode] = useState<ClockMode>(() => {
        return (safeStorage.getItem('neuroLift_clock_mode') as ClockMode) || 'stopwatch';
    });
    const [isUtilityActive, setIsUtilityActive] = useState(() => {
        return safeStorage.getItem('neuroLift_clock_active') === 'true';
    });
    const [utilityDuration, setUtilityDuration] = useState(() => { // Stopwatch
        const saved = safeStorage.getItem('neuroLift_clock_duration');
        return saved ? parseInt(saved) : 0;
    });
    const [utilityCountdown, setUtilityCountdown] = useState<number | null>(() => { // Timer
        const saved = safeStorage.getItem('neuroLift_clock_countdown');
        return saved ? parseInt(saved) : null;
    });

    // UI Helpers for Timer Input
    const [countdownMinutes, setCountdownMinutes] = useState(() => {
        return safeStorage.getItem('neuroLift_clock_mins') || '01';
    });
    const [countdownSeconds, setCountdownSeconds] = useState(() => {
        return safeStorage.getItem('neuroLift_clock_secs') || '00';
    });
    const [laps, setLaps] = useState<number[]>(() => {
        return safeStorage.getParsed<number[]>('neuroLift_clock_laps', []);
    });
    const [restRemaining, setRestRemaining] = useState<number | null>(null);

    // Initial Registration
    useEffect(() => {
        // Platform check removed
    }, []);

    // Persistence
    useEffect(() => {
        safeStorage.setItem('neuroLift_workout_duration', workoutDuration.toString());
        safeStorage.setItem('neuroLift_workout_active', isWorkoutActive.toString());

        safeStorage.setItem('neuroLift_clock_mode', utilityMode);
        safeStorage.setItem('neuroLift_clock_active', isUtilityActive.toString());
        safeStorage.setItem('neuroLift_clock_duration', utilityDuration.toString());
        safeStorage.setItem('neuroLift_clock_countdown', utilityCountdown?.toString() || '');

        safeStorage.setItem('neuroLift_clock_mins', countdownMinutes);
        safeStorage.setItem('neuroLift_clock_secs', countdownSeconds);
        safeStorage.setItem('neuroLift_clock_laps', JSON.stringify(laps));
    }, [workoutDuration, isWorkoutActive, utilityMode, isUtilityActive, utilityDuration, utilityCountdown, countdownMinutes, countdownSeconds, laps]);

    // Timer Logic
    useEffect(() => {
        let interval: any;
        if (isWorkoutActive || isUtilityActive || (restRemaining !== null && restRemaining > 0)) {
            interval = setInterval(() => {
                // Workout Timer (Always counts up if active)
                if (isWorkoutActive) {
                    setWorkoutDuration(d => d + 1);
                }

                // Utility Clock
                if (isUtilityActive) {
                    if (utilityMode === 'stopwatch') {
                        setUtilityDuration(d => d + 1);
                    } else if (utilityCountdown !== null && utilityCountdown > 0) {
                        setUtilityCountdown(r => (r !== null ? r - 1 : 0));
                    } else if (utilityCountdown === 0) {
                        setIsUtilityActive(false);
                        setUtilityCountdown(null);
                        playNotificationSound();
                    }
                }

                // Rest Timer
                if (restRemaining !== null && restRemaining > 0) {
                    setRestRemaining(r => (r !== null ? r - 1 : null));
                } else if (restRemaining === 0) {
                    setRestRemaining(null);
                    playNotificationSound();
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isWorkoutActive, isUtilityActive, utilityMode, utilityCountdown, restRemaining]);

    const addLap = () => {
        if (utilityMode === 'stopwatch') {
            setLaps(prev => [utilityDuration, ...prev]);
        }
    };

    const resetClock = () => { // Resets Utility Clock
        setUtilityDuration(0);
        setLaps([]);
        setUtilityCountdown(null);
        setIsUtilityActive(false);
    };

    const resetWorkout = () => {
        setWorkoutDuration(0);
        setIsWorkoutActive(false);
    };

    const startTimer = (mins: number, secs: number) => {
        const totalSecs = (mins * 60) + secs;
        if (totalSecs > 0) {
            setUtilityCountdown(totalSecs);
            setIsUtilityActive(true);
            setUtilityMode('timer');
        }
    };

    return (
        <ClockContext.Provider value={{
            // Workout State
            workoutDuration, setWorkoutDuration,
            isWorkoutActive, setIsWorkoutActive,
            resetWorkout,

            // Utility Clock State
            mode: utilityMode, setMode: setUtilityMode,
            timerActive: isUtilityActive, setTimerActive: setIsUtilityActive,
            duration: utilityDuration, setDuration: setUtilityDuration,
            countdownRemaining: utilityCountdown, setCountdownRemaining: setUtilityCountdown,

            // Shared/UI
            countdownMinutes, setCountdownMinutes,
            countdownSeconds, setCountdownSeconds,
            laps, addLap,
            resetClock,
            startTimer,
            restRemaining,
            setRestRemaining
        }}>
            {children}
        </ClockContext.Provider>
    );
};

export const useClock = () => {
    const context = useContext(ClockContext);
    if (context === undefined) {
        throw new Error('useClock must be used within a ClockProvider');
    }
    return context;
};
