import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Tracker } from './components/features/Tracker';
import { ProgramPlanner } from './components/features/ProgramPlanner';
import { Nutrition } from './components/features/Nutrition';
import { Journal } from './components/features/Journal';
import { Clock } from './components/features/Clock';
import { LanguageProvider } from './contexts/LanguageContext';
import { ClockProvider } from './contexts/ClockContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [currentView, setCurrentView] = React.useState(() => {
    const hash = window.location.hash.replace('#', '');
    return ['home', 'tracker', 'planner', 'nutrition', 'journal', 'clock'].includes(hash) ? hash : 'home';
  });

  React.useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      const validViews = ['home', 'tracker', 'planner', 'nutrition', 'journal', 'clock'];
      if (validViews.includes(hash)) {
        setCurrentView(hash);
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSetView = (view: string) => {
    if (view !== currentView) {
      window.history.pushState(null, '', `/#${view}`);
      setCurrentView(view);
      window.scrollTo(0, 0);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'home': return <Home setCurrentView={handleSetView} />;
      case 'tracker': return <Tracker />;
      case 'planner': return <ProgramPlanner />;
      case 'nutrition': return <Nutrition />;
      case 'journal': return <Journal />;
      case 'clock': return <Clock />;
      default: return <Home setCurrentView={handleSetView} />;
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <ClockProvider>
          <div className="min-h-screen bg-[#0a0a0a] text-white transition-colors duration-300 selection:bg-teal-500/30 selection:text-teal-200 overflow-x-hidden">
            <Navbar currentView={currentView} setCurrentView={handleSetView} />

            <main className="pt-24">
              {renderView()}
            </main>
          </div>
        </ClockProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
