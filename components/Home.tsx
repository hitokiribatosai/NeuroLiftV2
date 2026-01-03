import React from 'react';
import { Hero } from './Hero';
import { Features } from './Features';
import { FooterCTA } from './FooterCTA';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col animate-in fade-in duration-700">
      <Hero />
      <Features />
      <FooterCTA />
    </div>
  );
};
