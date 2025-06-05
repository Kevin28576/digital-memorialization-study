import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Laptop, Globe, Video, MonitorSmartphone } from 'lucide-react';
import OptionCard from './ui/OptionCard.tsx';

const DigitalFarewellOptions: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const options = [
    {
      id: 1,
      title: '虛擬實境追思服務',
      description: '透過沉浸式 VR 空間，讓全球親友無論身處何地皆能一同參與告別儀式。',
      icon: <Video className="h-8 w-8 text-primary-500" />,
      color: 'from-primary-500 to-primary-600'
    },
    {
      id: 2,
      title: '全息投影告別儀式',
      description: '逼真的投影技術，讓無法到場者也能感受臨場參與的真實感。',
      icon: <MonitorSmartphone className="h-8 w-8 text-secondary-500" />,
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      id: 3,
      title: '數位回憶花園',
      description: '線上平台可分享與重溫回憶、照片與故事，供親友永久保存與追思。',
      icon: <Globe className="h-8 w-8 text-accent-500" />,
      color: 'from-accent-500 to-accent-600'
    },
    {
      id: 4,
      title: 'AI 追思生成技術',
      description: '結合人工智慧，創造個人化且會隨時間演變的紀念方式，捕捉逝者生命本質。',
      icon: <Laptop className="h-8 w-8 text-success-500" />,
      color: 'from-success-500 to-success-600'
    }
  ];

  return (
      <section id="告別方式" className="section bg-neutral-50">
        <div className="container-custom">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="mb-4">數位告別 <span className="gradient-text">解決方案</span></h2>
            <p className="text-neutral-600 text-lg">
              探索結合科技與傳統的創新方式，提供在數位時代中連結情感與紀念故人的全新可能。
            </p>
          </motion.div>

          <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {options.map((option) => (
                <OptionCard
                    key={option.id}
                    title={option.title}
                    description={option.description}
                    icon={option.icon}
                    gradientClass={option.color}
                />
            ))}
          </motion.div>
        </div>
      </section>
  );
};

export default DigitalFarewellOptions;
