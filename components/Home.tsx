import React from 'react';
import { Dashboard } from './Dashboard';
import { Features } from './Features';
import { FooterCTA } from './FooterCTA';

interface HomeProps {
  setCurrentView: (view: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentView }) => {
  return (
    <div className="flex flex-col animate-in fade-in duration-700">
      <Dashboard setCurrentView={setCurrentView} />
      <Features />
      <FooterCTA setCurrentView={setCurrentView} />
    </div>
  );
};
