import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface OptionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradientClass: string;
}

const OptionCard: React.FC<OptionCardProps> = ({ title, description, icon, gradientClass }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="card group h-full flex flex-col hover:transform hover:scale-[1.02] transition-all"
    >
      <div className={`p-6 bg-gradient-to-r ${gradientClass} h-24 flex items-center justify-center rounded-t-xl`}>
        <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
          {icon}
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-neutral-600 mb-4 flex-grow">{description}</p>
        <div className="flex justify-end mt-2">
          <button className="text-primary-600 font-medium flex items-center group-hover:text-primary-800 transition-colors">
            深入瞭解
            <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OptionCard;