import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import ParticlesBackground from './ui/ParticlesBackground.tsx';

const HeroSection: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    setLoaded(true);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowArrow(false);
      } else {
        setShowArrow(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.15,
        when: 'beforeChildren',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: 'easeOut',
      },
    },
  };

  return (
      <section
          id="首頁"
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/90 to-[#020617]/90 z-0" />

        <ParticlesBackground />

        <div className="container-custom relative z-10 text-center my-16 pt-16">
          <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={loaded ? 'visible' : 'hidden'}
              className="max-w-3xl mx-auto"
          >
            <motion.span
                variants={itemVariants}
                className="inline-block px-4 py-1 mb-6 rounded-full text-cyan-300 border border-cyan-500/30 backdrop-blur-sm text-sm tracking-widest uppercase"
            >
              VIRTUAL MEMORIAL TECH
            </motion.span>

            <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight"
            >
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-white animate-shimmer">
              數位時代的
            </span>
              <br />
              <span className="text-white">最後告別</span>
            </motion.h1>

            <motion.p
                variants={itemVariants}
                className="text-slate-400 text-lg md:text-xl mt-6 mb-10 leading-relaxed"
            >
              虛實交錯的世界中，我們正重新定義告別的儀式感。<br />
              與我們一起探索這個數位轉型中的人文關懷。
            </motion.p>

            <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                  href="#告別方式"
                  className="btn border border-cyan-400 text-cyan-300 hover:bg-cyan-500/10 hover:shadow-cyan-500/30 transition-all duration-300"
              >
                查看選項
              </a>
              <a
                  href="#數據趨勢"
                  className="btn border border-slate-600 text-slate-400 hover:bg-white/5 hover:shadow-lg transition-all duration-300"
              >
                趨勢資料
              </a>
            </motion.div>
          </motion.div>
        </div>

        {showArrow && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 animate-arrow-pulse">
              <a href="#告別方式" className="text-cyan-400 hover:text-white transition-colors">
                <ArrowDown size={32} strokeWidth={1.5} />
              </a>
            </div>
        )}
      </section>
  );
};

export default HeroSection;
