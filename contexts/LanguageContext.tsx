import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { safeStorage } from '../utils/storage';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = safeStorage.getItem('language') as Language;
    return (saved === 'en' || saved === 'fr' || saved === 'ar') ? saved : 'en';
  });

  useEffect(() => {
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    const html = document.documentElement;

    // Set direction and language
    html.dir = dir;
    html.lang = language;

    // iOS Safari fix: re-assert dark mode colors immediately after dir change.
    // When dir switches to RTL, Safari re-evaluates the CSS cascade and may
    // temporarily apply system auto-colors (black text). Force overrides here.
    html.style.colorScheme = 'only dark';
    html.style.color = '#ffffff';
    html.style.setProperty('-webkit-text-fill-color', '#ffffff');
    html.style.backgroundColor = '#0a0a0a';
    document.body.style.color = '#ffffff';
    document.body.style.setProperty('-webkit-text-fill-color', '#ffffff');
    document.body.style.backgroundColor = '#0a0a0a';

    // Re-assert after first repaint to catch delayed WebKit repaints (iOS Safari)
    const raf = requestAnimationFrame(() => {
      html.style.color = '#ffffff';
      html.style.setProperty('-webkit-text-fill-color', '#ffffff');
      document.body.style.color = '#ffffff';
      document.body.style.setProperty('-webkit-text-fill-color', '#ffffff');
    });

    safeStorage.setItem('language', language);

    return () => cancelAnimationFrame(raf);
  }, [language]);

  const t = (key: keyof typeof translations['en']) => {
    return translations[language][key] || translations['en'][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir: language === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
