import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <span className={`text-2xl font-bold ${isScrolled ? 'text-primary-600' : 'text-white'}`}>
            數位告別
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {['首頁', '告別方式', '數據趨勢', '案例展示', '關於本研究'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`font-medium transition-colors ${
                isScrolled ? 'text-neutral-700 hover:text-primary-600' : 'text-white/90 hover:text-white'
              }`}
            >
              {item}
            </a>
          ))}
          <button className="btn-primary">留下你的故事</button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className={`p-2 rounded-lg ${isScrolled ? 'text-neutral-700' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t"
        >
          <div className="container-custom py-4 flex flex-col space-y-4">
            {['首頁', '告別方式', '數據趨勢', '案例展示', '關於本研究'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-medium text-neutral-700 hover:text-primary-600 py-2"
              >
                {item}
              </a>
            ))}
            <button className="btn-primary mt-2">留下你的故事</button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;