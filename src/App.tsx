import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar.tsx';
import HeroSection from './components/HeroSection.tsx';
import DigitalFarewellOptions from './components/DigitalFarewellOptions.tsx';
import VotingSection from '../VotingSection.tsx';
import DataVisualization from './components/DataVisualization.tsx';
import ExperienceSection from './components/ExperienceSection.tsx';
import InfoSection from './components/InfoSection.tsx';
import Footer from './components/Footer.tsx';

function App() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main>
        <HeroSection />
        <DigitalFarewellOptions />
        <VotingSection />
        <DataVisualization />
        <ExperienceSection />
        <InfoSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;