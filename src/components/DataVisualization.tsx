import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const DataVisualization: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const comparisonData = [
    { name: '環境影響', traditional: 85, digital: 25 },
    { name: '費用', traditional: 80, digital: 40 },
    { name: '全球可及性', traditional: 30, digital: 95 },
    { name: '客製化程度', traditional: 60, digital: 90 },
    { name: '長期保存性', traditional: 45, digital: 85 }
  ];

  const adoptionData = [
    { name: '2019', value: 5 },   // 幾乎未採用
    { name: '2020', value: 18 },  // 疫情初起，有零星嘗試
    { name: '2021', value: 30 },  // 開始有企業提供數位告別服務
    { name: '2022', value: 34 },  // 增速放緩，社會仍偏保守
    { name: '2023', value: 37 },  // 小幅成長，觀望居多
    { name: '2024', value: 41 },  // 技術更穩定，部分人開始接受
    { name: '2025', value: 46, predicted: true }, // 預測，仍為少數選擇
    { name: '2026', value: 51, predicted: true }, // 探索式採用提升
    { name: '2027', value: 55, predicted: true }  // 可見趨勢成形
  ];

  const reasonsData = [
    { name: '無法親自出席', value: 20 },       // 跨國／疫情／距離限制
    { name: '節省時間與金錢', value: 15 },     // 費用／交通
    { name: '可長期保存與回顧', value: 30 },   // 數位紀錄性
    { name: '更能表達個人特色', value: 15 },   // 客製化、多媒體
    { name: '減少對環境的影響', value: 20 }    // 無印刷／交通碳排
  ];

  const COLORS = ['#3b6ef5', '#14b8a6', '#f97316', '#22c55e', '#6b7280'];

  return (
      <section ref={ref} id="數據趨勢" className="section bg-white">
        <div className="container-custom">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="mb-4">數據化的<span className="gradient-text">洞察</span></h2>
            <p className="text-neutral-600 text-lg">
              透過數據視覺化與分析，探索傳統與數位告別方式的趨勢與比較。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="card p-6"
            >
              <h3 className="mb-4 text-xl font-semibold">傳統 vs 數位方式比較</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="traditional" name="傳統" fill="#6b7280" />
                    <Bar dataKey="digital" name="數位" fill="#3b6ef5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 text-neutral-600">
                透過不同指標比較傳統與數位告別方式。環境影響與費用得分愈低愈佳。
              </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="card p-6"
            >
              <h3 className="mb-4 text-xl font-semibold">選擇數位告別的原因</h3>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                        data={reasonsData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}：${(percent * 100).toFixed(0)}%`}
                    >
                      {reasonsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 text-neutral-600">
                影響人們選擇數位告別的主要考量因素。
              </p>
            </motion.div>
          </div>

          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="card p-6 max-w-4xl mx-auto"
          >
            <h3 className="mb-4 text-xl font-semibold">全球採用趨勢（2019–2027）</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adoptionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Bar dataKey="value" name="採用率 (%)">
                    {adoptionData.map((entry, index) => (
                        <Cell
                            key={`bar-${index}`}
                            fill={entry.predicted ? '#6b7280' : '#3b6ef5'}
                        />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-neutral-600">
              數位告別形式自 2020 年起受到疫情推動而逐步發展，儘管整體接受度仍有限，但採用率呈現穩定成長。
              至 2025 年後預期將突破 50%，顯示其在未來有成為輔助性主流儀式的潛力。<br/>
              灰色柱狀代表預測資料。
            </p>
          </motion.div>
        </div>
      </section>
  );
};

export default DataVisualization;
