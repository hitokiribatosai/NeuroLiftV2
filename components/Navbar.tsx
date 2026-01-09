import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useFontSize, FontSize } from '../contexts/FontSizeContext';
import { Language } from '../types';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { language, setLanguage, t, dir } = useLanguage();
  const { fontSize, setFontSize } = useFontSize();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.settings-container')) {
        setIsSettingsOpen(false);
      }
    };
    if (isSettingsOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isSettingsOpen]);

  const navItems = [
    { id: 'home', label: t('nav_home') },
    { id: 'planner', label: t('nav_planner') },
    { id: 'tracker', label: t('nav_workout') },
    { id: 'journal', label: t('nav_journal') },
    { id: 'clock', label: t('nav_clock') },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'ar', label: 'العربية' },
  ];

  const fontSizes: { id: FontSize; label: string }[] = [
    { id: 'small', label: 'Small' },
    { id: 'medium', label: 'Medium' },
    { id: 'large', label: 'Large' },
    { id: 'xlarge', label: 'X-Large' },
  ];

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-800 shadow-sm' : 'bg-transparent'}`}
      dir={dir}
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        ...(scrolled ? { WebkitBackdropFilter: 'blur(12px)' } : {})
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        {/* Logo */}
        <div className="flex shrink-0 items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
          <img src="/logo.png" alt="NeuroLift" className="h-10 w-auto rounded-xl shadow-lg" />
        </div>

        {/* Settings Hamburger/Gear */}
        <div className="relative settings-container">
          <button
            onClick={(e) => { e.stopPropagation(); setIsSettingsOpen(!isSettingsOpen); }}
            className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all shadow-sm ${isSettingsOpen ? 'bg-zinc-800 border-zinc-700 text-teal-400' : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'}`}
            title="Settings"
          >
            <motion.svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: isSettingsOpen ? 90 : 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </motion.svg>
          </button>

          <AnimatePresence>
            {isSettingsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`absolute top-full mt-2 w-64 bg-zinc-950 border border-zinc-800 rounded-3xl p-4 shadow-2xl z-[100] ${dir === 'rtl' ? 'right-0' : 'left-0'}`}
              >
                {/* Language Section */}
                <div className="mb-6">
                  <h3 className="text-[0.625rem] font-black text-zinc-500 uppercase tracking-widest mb-3 px-2 flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {t('language')}
                  </h3>
                  <div className="grid grid-cols-1 gap-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); }}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${language === lang.code ? 'bg-teal-500/10 text-teal-400' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'}`}
                      >
                        <span className="text-xs font-bold">{lang.label}</span>
                        {language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size Section */}
                <div>
                  <h3 className="text-[0.625rem] font-black text-zinc-500 uppercase tracking-widest mb-3 px-2 flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
                    Font Size
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {fontSizes.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setFontSize(size.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${fontSize === size.id ? 'bg-teal-500/10 border-teal-500/50 text-teal-400 shadow-sm' : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'}`}
                      >
                        <span className="text-[0.625rem] font-bold mb-1">{size.label}</span>
                        <span className="font-black" style={{ fontSize: size.id === 'small' ? '0.75rem' : size.id === 'medium' ? '0.875rem' : size.id === 'large' ? '1rem' : '1.125rem' }}>Aa</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Items - Scrollable Middle */}
        <div className="relative flex flex-1 items-center ms-4 overflow-hidden mask-linear-fade">
          <div className="flex items-center gap-6 text-sm font-bold text-zinc-400 overflow-x-auto whitespace-nowrap scrollbar-hide py-3 px-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`relative py-1 transition-colors hover:text-white shrink-0 uppercase tracking-widest text-[0.625rem] ${currentView === item.id ? 'text-teal-400' : 'text-zinc-200'}`}
              >
                <span className="relative z-10">{item.label}</span>
                {currentView === item.id && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.6)]"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </button>
            ))}
            <div className="w-4 shrink-0 sm:hidden"></div>
          </div>
          {/* Scroll Indicator Arrow */}
          <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-teal-500/50 animate-pulse sm:hidden ${dir === 'rtl' ? 'left-0 rotate-180' : 'right-0'}`}>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};
