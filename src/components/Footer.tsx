import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
      <footer className="bg-neutral-900 text-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-xl font-bold mb-4">數位告別研究</h4>
              <p className="text-neutral-400 mb-6">
                本專題探索科技如何在後疫情時代中改變我們紀念與告別的方式。
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">網站導覽</h4>
              <ul className="space-y-2">
                <li><a href="#告別方式" className="text-neutral-400 hover:text-white transition-colors">告別方式</a></li>
                <li><a href="#數據趨勢" className="text-neutral-400 hover:text-white transition-colors">數據趨勢</a></li>
                <li><a href="#案例展示" className="text-neutral-400 hover:text-white transition-colors">案例展示</a></li>
                <li><a href="#關於本研究" className="text-neutral-400 hover:text-white transition-colors">關於本研究</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">參考資源</h4>
              <ul className="space-y-2">
                <li><a href="https://digi-trans.institute/ai%E5%91%8A%E5%88%A5%E5%BC%8F-%E9%9C%87%E6%92%BC%E7%99%BB%E5%A0%B4/" className="text-neutral-400 hover:text-white transition-colors">研究資料來源(數位轉型學院)</a></li>
                <li><a href="https://www.youtube.com/watch?v=H0WMpmh5O3U" className="text-neutral-400 hover:text-white transition-colors">相關案例(TVBS)</a></li>
                <li><a href="https://www.arec.com/remote_funera-tw.html" className="text-neutral-400 hover:text-white transition-colors">技術應用說明(AREC智慧告別式解決方案企業)</a></li>
                <li><a href="https://www.eslite.com/product/1001120162855028?srsltid=AfmBOorQjYqtaCGrp0Jthb9bsC4CvG13WHctoeC86VTakJkUhLtPNqBy" className="text-neutral-400 hover:text-white transition-colors">訪談摘要(如何在網路時代好好說再見: 從直播告別式到管理數位遺產)</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">聯絡資訊</h4>
              <p className="text-neutral-400 flex items-center mb-2">
                <Mail size={16} className="mr-2" /> student.project@email.edu.tw
              </p>
              <p className="text-neutral-400 text-sm">
                指導老師：周宗楨 老師<br />
                專題小組：國際人文視野實踐課程
              </p>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8 text-neutral-500 flex flex-col md:flex-row justify-between items-center">
            <p>© {currentYear} 數位告別專題網站。僅供學術展示使用。</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">隱私政策</a>
              <a href="#" className="hover:text-white transition-colors">資料使用聲明</a>
              <a href="#" className="hover:text-white transition-colors">無障礙設計</a>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
