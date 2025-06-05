import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import ParticlesBackground from './ui/ParticlesBackground.tsx';

const HeroSection: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }
    }
  };

  return (
    <section 
      id="首頁"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 to-secondary-800/90 z-0"></div>

      {/* Floating Particles Background */}
      <ParticlesBackground />

      <div className="container-custom relative z-10 text-center my-16 pt-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={loaded ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white backdrop-blur-sm text-sm font-medium mb-4">
              探索新的告別方式
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-white mb-6 leading-tight"
          >
            <span className="gradient-text font-bold">數位時代的</span>
            最後告別 <br />
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          >
            穿梭於虛擬與現實，探索科技與人性如何共構平衡的告別方式
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#告別方式"
              className="btn-primary w-full sm:w-auto"
            >
              告別方式一覽
            </a>
            <a 
              href="#數據趨勢"
              className="btn-outline text-white border-white hover:bg-white/10 w-full sm:w-auto"
            >
              探索全球趨勢
            </a>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          >
            <a href="#options" className="text-white/70 hover:text-white transition-colors">
              <ArrowDown size={28} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;