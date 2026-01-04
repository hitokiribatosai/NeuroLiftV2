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
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('neuroLift_journal');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  const resetFormContent = () => {
    setFormData({});
    setCustomFields([]);
    setEditingId(null);
  };

  const handleSelectEntry = (entry: JournalEntry) => {
    setEditingId(entry.id);
    const { id, date, customMeasurements, ...rest } = entry;
    setFormData(rest);
    setCustomFields(customMeasurements || []);
  };

  const handleDeleteEntry = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = entries.filter(ent => ent.id !== id);
    setEntries(updated);
    localStorage.setItem('neuroLift_journal', JSON.stringify(updated));
    if (editingId === id) resetFormContent();
  };

  const handleSave = () => {
    if (editingId) {
      // Update existing
      const updatedEntries = entries.map(ent => {
        if (ent.id === editingId) {
          return {
            ...ent,
            ...formData,
            customMeasurements: customFields
          };
        }
        return ent;
      });
      setEntries(updatedEntries);
      localStorage.setItem('neuroLift_journal', JSON.stringify(updatedEntries));
    } else {
      // Create new
      const newEntry: JournalEntry = {
        id: crypto.randomUUID(),
        date: new Date().toLocaleDateString(),
        ...formData,
        customMeasurements: customFields
      } as JournalEntry;

      const updated = [newEntry, ...entries];
      setEntries(updated);
      localStorage.setItem('neuroLift_journal', JSON.stringify(updated));
    }
    resetFormContent();
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
          <Card className={`p-6 space-y-6 ${editingId ? 'ring-1 ring-teal-500/50 bg-teal-500/5' : 'bg-zinc-900/80'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">
                  {editingId ? 'Edit Entry' : t('journal_add_entry')}
                </h3>
                {editingId && (
                  <button
                    onClick={resetFormContent}
                    className="text-[10px] text-teal-400 hover:text-teal-300 font-bold uppercase tracking-wider"
                  >
                    + Create New
                  </button>
                )}
              </div>
              <span className="text-xs text-zinc-500">
                {editingId ? entries.find(e => e.id === editingId)?.date : new Date().toLocaleDateString()}
              </span>
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
                  <div key={f.id} className="flex justify-between items-center text-sm text-zinc-300 bg-zinc-900 p-2 rounded group">
                    <span>{f.name}</span>
                    <div className="flex items-center gap-2">
                      <span>{f.value} {f.unit}</span>
                      <button
                        onClick={() => setCustomFields(customFields.filter(cf => cf.id !== f.id))}
                        className="text-zinc-600 hover:text-red-400 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
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
              {editingId ? 'Update Entry' : t('save')}
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
              <div
                key={entry.id}
                onClick={() => handleSelectEntry(entry)}
                className={`p-5 rounded-xl border transition-all cursor-pointer group relative ${editingId === entry.id
                    ? 'border-teal-500 bg-teal-500/5 shadow-[0_0_20px_rgba(20,184,166,0.1)]'
                    : 'border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900 hover:border-zinc-700'
                  }`}
              >
                {/* Delete button */}
                <button
                  onClick={(e) => handleDeleteEntry(e, entry.id)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-800/50 text-zinc-500 hover:bg-red-500/10 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all z-10"
                  title="Delete entry"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>

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
                {editingId === entry.id && (
                  <div className="mt-4 flex items-center gap-2 text-[10px] text-teal-400 font-bold uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></div>
                    Currently Editing
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
