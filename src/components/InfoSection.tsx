import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Leaf, DollarSign, Globe } from 'lucide-react';

const InfoSection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const iconContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const iconVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const benefitItems = [
    {
      icon: <Globe className="h-10 w-10 text-primary-500" />,
      title: "全球可及性",
      description: "讓世界各地的親友皆可參與，不再受限於距離或交通條件。"
    },
    {
      icon: <Leaf className="h-10 w-10 text-success-500" />,
      title: "環境永續",
      description: "數位方式可降低傳統告別儀式中所造成的碳排放與資源消耗。"
    },
    {
      icon: <DollarSign className="h-10 w-10 text-accent-500" />,
      title: "經濟負擔較低",
      description: "在保有儀式感的同時，減少場地、交通與硬體支出。"
    },
    {
      icon: <Heart className="h-10 w-10 text-error-500" />,
      title: "情感連結延伸",
      description: "透過科技遠距連結，讓思念與支持不受空間限制。"
    }
  ];

  return (
    <section ref={ref} id="關於本研究" className="section bg-gradient-to-br from-primary-900/95 to-secondary-800/95 text-white">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="mb-4 text-white">為何探討<span className="text-accent-300">數位告別</span></h2>
          <p className="text-white/80 text-lg">
            數位告別不只是技術轉向，更是對現代社會多元需求的回應。透過下列面向，我們分析其可能帶來的優勢與挑戰。
          </p>
        </motion.div>

        <motion.div 
          variants={iconContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefitItems.map((item, index) => (
            <motion.div 
              key={index} 
              variants={iconVariants}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl inline-flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-white/80">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-semibold mb-4">在傳統與科技之間尋找平衡</h3>
          <p className="text-white/80 mb-8">
            數位告別並非要取代傳統儀式，而是提供一種新的可能，讓不同文化與需求能在當代背景下找到合適的表達方式。
          </p>
          <a className="btn-accent" href="#數據趨勢">進一步閱讀趨勢數據</a>
        </motion.div>
      </div>
    </section>
  );
};

export default InfoSection;