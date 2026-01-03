import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { JournalEntry, CustomMeasurement } from '../../types';
import { Card } from '../ui/Card';
import { SpotlightButton } from '../ui/SpotlightButton';

export const Journal: React.FC = () => {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [formData, setFormData] = useState<Partial<JournalEntry>>({});
  const [customFields, setCustomFields] = useState<CustomMeasurement[]>([]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [newCustomField, setNewCustomField] = useState({ name: '', value: '', unit: 'cm' });

  useEffect(() => {
    const saved = localStorage.getItem('neuroLift_journal');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  const handleSave = () => {
    const newEntry: JournalEntry = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString(),
      ...formData,
      customMeasurements: customFields
    } as JournalEntry;

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('neuroLift_journal', JSON.stringify(updated));
    setFormData({});
    setCustomFields([]);
  };

  const handleChange = (field: keyof JournalEntry, value: string) => {
    setFormData(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const addCustomField = () => {
    if (newCustomField.name && newCustomField.value) {
      setCustomFields([...customFields, {
        id: crypto.randomUUID(),
        name: newCustomField.name,
        value: parseFloat(newCustomField.value),
        unit: newCustomField.unit
      }]);
      setNewCustomField({ name: '', value: '', unit: 'cm' });
      setShowCustomInput(false);
    }
  };

  const InputField = ({ label, field }: { label: string, field: keyof JournalEntry }) => (
    <div>
      <label className="text-xs text-zinc-500 block mb-1">{label}</label>
      <input
        type="number"
        value={formData[field] || ''}
        onChange={e => handleChange(field, e.target.value)}
        className="w-full bg-black border border-zinc-700 rounded px-3 py-2 text-white focus:border-teal-500 outline-none"
      />
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-3xl font-bold text-white mb-8">{t('journal_title')}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-6 space-y-6 bg-zinc-900/80">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">{t('journal_add_entry')}</h3>
              <span className="text-xs text-zinc-500">{new Date().toLocaleDateString()}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField label={t('field_weight')} field="weight" />
              <InputField label={t('field_neck')} field="neck" />
              <InputField label={t('field_shoulders')} field="shoulders" />
              <InputField label={t('field_chest')} field="chest" />
              <InputField label="Biceps (L)" field="biceps_left" />
              <InputField label="Biceps (R)" field="biceps_right" />
              <InputField label={t('field_forearms')} field="forearms" />
              <InputField label={t('field_waist')} field="waist" />
              <InputField label={t('field_hips')} field="hips" />
              <InputField label="Thigh (L)" field="thigh_left" />
              <InputField label="Thigh (R)" field="thigh_right" />
              <InputField label={t('field_calves')} field="calves" />
            </div>

            {/* Custom Fields List */}
            {customFields.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                {customFields.map(f => (
                  <div key={f.id} className="flex justify-between text-sm text-zinc-300 bg-zinc-900 p-2 rounded">
                    <span>{f.name}</span>
                    <span>{f.value} {f.unit}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Add Custom Field UI */}
            {showCustomInput ? (
              <div className="p-3 bg-zinc-800/50 rounded-lg space-y-2 border border-zinc-700">
                <input
                  placeholder="Measure Name (e.g. Wrist)"
                  value={newCustomField.name}
                  onChange={e => setNewCustomField({ ...newCustomField, name: e.target.value })}
                  className="w-full bg-black text-xs p-2 rounded border border-zinc-700 text-white"
                />
                <div className="flex gap-2">
                  <input
                    placeholder="Value"
                    type="number"
                    value={newCustomField.value}
                    onChange={e => setNewCustomField({ ...newCustomField, value: e.target.value })}
                    className="w-2/3 bg-black text-xs p-2 rounded border border-zinc-700 text-white"
                  />
                  <select
                    value={newCustomField.unit}
                    onChange={e => setNewCustomField({ ...newCustomField, unit: e.target.value })}
                    className="w-1/3 bg-black text-xs rounded border border-zinc-700 text-white"
                  >
                    <option value="cm">cm</option>
                    <option value="kg">kg</option>
                    <option value="in">in</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-1">
                  <button onClick={addCustomField} className="flex-1 bg-teal-600 text-white text-xs py-1 rounded">Add</button>
                  <button onClick={() => setShowCustomInput(false)} className="flex-1 bg-zinc-700 text-white text-xs py-1 rounded">Cancel</button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowCustomInput(true)}
                className="w-full py-2 border border-dashed border-zinc-700 text-zinc-400 text-xs rounded hover:border-teal-500 hover:text-teal-400 transition-colors flex items-center justify-center gap-1"
              >
                <span>+</span> {t('add_custom')}
              </button>
            )}

            <SpotlightButton onClick={handleSave} className="w-full justify-center mt-4">
              {t('save')}
            </SpotlightButton>
          </Card>
        </div>

        {/* History / Chart */}
        <div className="lg:col-span-2 space-y-6">
          {entries.length === 0 ? (
            <div className="text-zinc-500 text-center py-20 border border-dashed border-zinc-800 rounded-xl">
              Start tracking your comprehensive metrics today.
            </div>
          ) : (
            entries.map(entry => (
              <div key={entry.id} className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900 transition-all">
                <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2">
                  <span className="text-teal-400 font-mono font-bold">{entry.date}</span>
                  {entry.weight && <span className="text-white font-bold">{entry.weight} kg</span>}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-zinc-400">
                  {entry.chest && <div>Chest: <span className="text-zinc-200">{entry.chest}</span></div>}
                  {entry.waist && <div>Waist: <span className="text-zinc-200">{entry.waist}</span></div>}
                  {entry.biceps_right && <div>Arms: <span className="text-zinc-200">{entry.biceps_right}</span></div>}
                  {entry.thigh_right && <div>Legs: <span className="text-zinc-200">{entry.thigh_right}</span></div>}

                  {/* Show custom measurements */}
                  {entry.customMeasurements?.map(c => (
                    <div key={c.id} className="text-teal-500/80">
                      {c.name}: <span className="text-teal-200">{c.value}{c.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
