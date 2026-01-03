import React, { useState, useEffect } from 'react';
import { SpotlightButton } from '../ui/SpotlightButton';
import { useLanguage } from '../../contexts/LanguageContext';

export const Timer: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor((ms / 60000) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    const centiseconds = Math.floor((ms / 10) % 100);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center pt-24 text-center animate-in fade-in zoom-in duration-500">
      <div className="relative mb-10">
        <div className="absolute inset-0 blur-3xl bg-teal-500/20 rounded-full animate-pulse-slow"></div>
        <div className="relative text-8xl font-mono font-bold tracking-wider text-white tabular-nums drop-shadow-2xl">
          {formatTime(time)}
        </div>
      </div>
      
      <div className="flex gap-4 z-10">
        <SpotlightButton onClick={() => setIsActive(!isActive)}>
          {isActive ? t('timer_stop') : t('timer_start')}
        </SpotlightButton>
        <SpotlightButton variant="secondary" onClick={() => { setIsActive(false); setTime(0); }}>
          {t('timer_reset')}
        </SpotlightButton>
      </div>
    </div>
  );
};
