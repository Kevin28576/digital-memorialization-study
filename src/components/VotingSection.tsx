import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ThumbsUp, ThumbsDown, Users } from 'lucide-react';
import { db, ref, set, onValue } from '../firebase/firebase';

interface VoteStats {
  accept: number;
  reject: number;
  total: number;
  userVote: null | 'accept' | 'reject';
}

const VotingSection: React.FC = () => {
  const { ref: viewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [voteStats, setVoteStats] = useState<VoteStats>({
    accept: 0,
    reject: 0,
    total: 0,
    userVote: null,
  });

  useEffect(() => {
    const voteRef = ref(db, 'votes');
    onValue(voteRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const savedVote = localStorage.getItem('userVote');
        setVoteStats({
          ...data,
          userVote: savedVote === 'accept' || savedVote === 'reject' ? (savedVote as 'accept' | 'reject') : null
        });
      }
    });
  }, []);

  const handleVote = (vote: 'accept' | 'reject') => {
    if (voteStats.userVote !== null) return;

    const newStats = {
      accept: voteStats.accept + (vote === 'accept' ? 1 : 0),
      reject: voteStats.reject + (vote === 'reject' ? 1 : 0),
      total: voteStats.total + 1,
    };

    // 將投票結果送到 Firebase
    set(ref(db, 'votes'), newStats);

    // 更新本地狀態和 localStorage
    setVoteStats(prev => ({ ...newStats, userVote: vote }));
    localStorage.setItem('userVote', vote);
  };

  const calculatePercentage = (value: number) => {
    return voteStats.total === 0 ? 0 : Math.round((value / voteStats.total) * 100);
  };

  return (
      <section ref={viewRef} id="voting" className="section bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="container-custom">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="mb-4">你的<span className="gradient-text">看法</span>很重要</h2>
            <p className="text-neutral-600 text-lg">
              在這個逐漸轉變的告別方式中，我們想了解你對數位告別的想法。<br />
              你會考慮為自己或親人選擇虛擬告別儀式嗎？
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-8 text-center">
                <h3 className="text-2xl font-semibold mb-8">你會考慮數位告別的選項嗎？</h3>

                <div className="flex flex-col md:flex-row gap-6 justify-center mb-10">
                  <button
                      onClick={() => handleVote('accept')}
                      disabled={voteStats.userVote !== null}
                      className={`btn ${
                          voteStats.userVote === 'accept'
                              ? 'bg-success-100 text-success-700 border-2 border-success-500'
                              : 'bg-white border-2 border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                      } rounded-xl py-4 px-6 flex items-center justify-center gap-3 disabled:opacity-80`}
                  >
                    <ThumbsUp size={24} className={voteStats.userVote === 'accept' ? 'text-success-500' : ''} />
                    <span className="font-medium text-lg">會，我可以接受</span>
                  </button>

                  <button
                      onClick={() => handleVote('reject')}
                      disabled={voteStats.userVote !== null}
                      className={`btn ${
                          voteStats.userVote === 'reject'
                              ? 'bg-error-100 text-error-700 border-2 border-error-500'
                              : 'bg-white border-2 border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                      } rounded-xl py-4 px-6 flex items-center justify-center gap-3 disabled:opacity-80`}
                  >
                    <ThumbsDown size={24} className={voteStats.userVote === 'reject' ? 'text-error-500' : ''} />
                    <span className="font-medium text-lg">不，我偏好傳統方式</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-neutral-500 mb-6">
                  <Users size={18} />
                  <span>{voteStats.total} 人已投票</span>
                </div>

                <div className="bg-neutral-100 h-6 rounded-full overflow-hidden">
                  <div
                      className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-1000 ease-out"
                      style={{ width: `${calculatePercentage(voteStats.accept)}%` }}
                  ></div>
                </div>

                <div className="flex justify-between mt-2 text-sm font-medium text-neutral-600">
                  <div>{calculatePercentage(voteStats.accept)}% 可以接受</div>
                  <div>{calculatePercentage(voteStats.reject)}% 偏好傳統</div>
                </div>
              </div>
            </motion.div>

            {voteStats.userVote && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 text-center"
                >
                  <p className="text-neutral-600">
                    感謝你分享你的看法，這有助於我們理解大眾對於在重要人生時刻中使用科技的接受度。
                  </p>
                </motion.div>
            )}
          </div>
        </div>
      </section>
  );
};

export default VotingSection;
