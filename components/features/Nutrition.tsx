import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card } from '../ui/Card';

export const Nutrition: React.FC = () => {
  const { t } = useLanguage();

  // Calorie Tracker State
  const [dailyCalories, setDailyCalories] = useState(0);
  const [caloriesInput, setCaloriesInput] = useState('');

  const addCalories = () => {
    const amount = parseInt(caloriesInput);
    if (!isNaN(amount)) {
      setDailyCalories(prev => prev + amount);
      setCaloriesInput('');
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-24 min-h-[70vh] flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="p-8 bg-zinc-900/80">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center justify-center gap-2">
            <span className="text-teal-400">🔥</span> {t('cal_title')}
          </h3>

          <div className="relative flex items-center justify-center py-10">
            <div className="absolute inset-0 bg-teal-500/10 rounded-full blur-2xl"></div>
            <div className="relative text-center">
              <div className="text-6xl font-mono font-bold text-white">{dailyCalories}</div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest mt-2">{t('cal_consumed')}</div>
            </div>
          </div>

          <div className="space-y-6 mt-10">
            <div className="flex gap-2">
              <input
                type="number"
                value={caloriesInput}
                onChange={(e) => setCaloriesInput(e.target.value)}
                placeholder="e.g. 500"
                className="flex-1 bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
              />
              <button
                onClick={addCalories}
                className="bg-teal-600 hover:bg-teal-500 text-white px-6 rounded-lg font-bold transition-colors"
              >
                {t('cal_add')}
              </button>
            </div>

            <button
              onClick={() => setDailyCalories(0)}
              className="w-full text-xs text-zinc-500 hover:text-red-400 transition-colors uppercase tracking-widest font-medium"
            >
              {t('cal_reset')}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};