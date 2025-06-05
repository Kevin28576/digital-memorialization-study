import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Smartphone, Monitor, Headphones, HelpCircle } from 'lucide-react';

const ExperienceSection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [activeTab, setActiveTab] = useState('vr-memorial');

  // Define tabs content
  const tabs = [
    {
      id: 'vr-memorial',
      label: '虛擬實境追思空間',
      icon: <Headphones className="h-5 w-5" />,
      title: '虛擬實境追思空間',
      description: '透過沉浸式 3D 環境，親友可在不同地點共同進行追思、分享回憶與情感支持。',
      imageUrl: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: [
        '可自訂的追思空間，支援個人照片與影片上傳',
        '互動式回憶牆分享功能',
        '即時語音通話支援',
        '專屬私人家庭房間設計'
      ]
    },
    {
      id: 'holographic',
      label: '全息投影儀式體驗',
      icon: <Monitor className="h-5 w-5" />,
      title: '全息臨場技術',
      description: '透過逼真的投影技術，讓無法親臨現場者亦能感受到實體臨場的存在感。',
      imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: [
        '多角度可視的高畫質投影效果',
        '即時傳輸以支援線上同步參與',
        '可錄製儀式畫面作為永久追思資料',
        '可與一般儀式場地整合使用'
      ]
    },
    {
      id: 'mobile-app',
      label: '手機端紀念互動',
      icon: <Smartphone className="h-5 w-5" />,
      title: '行動裝置追思體驗',
      description: '透過手機應用程式即可進入追思空間，無論科技使用門檻如何，都能參與其中。',
      imageUrl: 'https://images.pexels.com/photos/5053740/pexels-photo-5053740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: [
        '不受時間地點限制的紀念方式',
        '儀式即時直播功能',
        '留言牆與照片分享互動平台',
        '基於位置的紀念提醒通知'
      ]
    },
    {
      id: 'qa',
      label: '常見問題',
      icon: <HelpCircle className="h-5 w-5" />,
      title: '常見問題與解答',
      description: '關於數位告別的常見疑問與解釋，說明其如何與傳統告別方式相輔相成。',
      imageUrl: 'https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: [
        '數位參與是否與實體參與一樣有意義？',
        '線上追思空間的安全性如何保障？',
        '數位紀念是否能永久保存？',
        '參與者需要準備哪些技術設備？'
      ]
    }
  ];

  const activeContent = tabs.find(tab => tab.id === activeTab);

  return (
    <section ref={ref} id="案例展示" className="section bg-primary-50">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="mb-4">數位告別 <span className="gradient-text">應用場景</span></h2>
          <p className="text-neutral-600 text-lg">
            探索各種數位紀念與告別技術。這些創新提供了新的方式，讓人們即使相隔兩地，仍能連結彼此、緬懷故人、傳遞思念。
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary-600 text-white shadow-md' 
                  : 'bg-white text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeContent && (
          <motion.div 
            key={activeContent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div 
                className="h-64 lg:h-auto bg-cover bg-center"
                style={{ backgroundImage: `url(${activeContent.imageUrl})` }}
              ></div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-4">{activeContent.title}</h3>
                <p className="text-neutral-600 mb-6">{activeContent.description}</p>
                
                <h4 className="font-medium text-lg mb-3">主要特點:</h4>
                <ul className="space-y-2">
                  {activeContent.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary-500 mt-2 mr-2"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="btn-primary mt-8">
                  {activeTab === 'qa' ? '閱讀完整問答' : `深入了解 ${activeContent.label}`}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;