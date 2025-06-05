import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ThumbsUp, ThumbsDown, Users, Share2 } from 'lucide-react';
import { db, ref, set, onValue, push } from '../firebase/firebase';

interface VoteStats {
  accept: number;
  reject: number;
  total: number;
  userVote: null | 'accept' | 'reject';
}

interface Comment {
  id: string;
  type: 'accept' | 'reject';
  message: string;
  name?: string;
  createdAt: number;
  avatarUrl?: string;
}

const VotingSection: React.FC = () => {
  const { ref: viewRef, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const [voteStats, setVoteStats] = useState<VoteStats>({
    accept: 0,
    reject: 0,
    total: 0,
    userVote: null,
  });

  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrLoading, setQrLoading] = useState(true);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [voteBuffer, setVoteBuffer] = useState<'accept' | 'reject' | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const qrLink = 'https://kevin28576.github.io/digital-memorialization-study/';
  const qrImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrLink)}`;

  useEffect(() => {
    const voteRef = ref(db, 'votes/stats');
    onValue(voteRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const savedVote = localStorage.getItem('userVote');
        setVoteStats({
          accept: data.accept || 0,
          reject: data.reject || 0,
          total: data.total || 0,
          userVote: savedVote === 'accept' || savedVote === 'reject' ? (savedVote as 'accept' | 'reject') : null,
        });
      }
    });

    const commentsRef = ref(db, 'votes/comments');
    onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatted = Object.entries(data).map(([key, value]) => ({
          ...(value as Comment),
          id: key,
        }));
        formatted.sort((a, b) => b.createdAt - a.createdAt); // 最新的在最上面
        setComments(formatted);
      }
    });

    if (showQrModal) {
      const img = new Image();
      img.src = qrImageSrc;
      img.onload = () => setQrLoading(false);
    }

  }, [qrImageSrc, showQrModal]);

  const handleVote = (vote: 'accept' | 'reject') => {
    if (voteStats.userVote !== null) return;
    setVoteBuffer(vote);
    setShowCommentModal(true);
  };

  const submitVoteAndComment = async () => {
    if (!voteBuffer || isSubmitting) return;

    setIsSubmitting(true);

    const newStats = {
      accept: voteStats.accept + (voteBuffer === 'accept' ? 1 : 0),
      reject: voteStats.reject + (voteBuffer === 'reject' ? 1 : 0),
      total: voteStats.total + 1,
    };

    try {
      await set(ref(db, 'votes/stats'), newStats);
      setVoteStats({ ...newStats, userVote: voteBuffer });
      localStorage.setItem('userVote', voteBuffer);

      if (comment.trim()) {
        const newCommentRef = push(ref(db, 'votes/comments'));
        const newCommentId = newCommentRef.key;

        const commentData: any = {
          id: newCommentId,
          type: voteBuffer,
          message: comment.trim(),
          name: name.trim() || '匿名',
          createdAt: Date.now(),
        };

        if (name.trim()) {
          commentData.avatarUrl = avatar; // 只有非匿名時才加入
        }

        await set(newCommentRef, commentData);

      }

      // 清除表單狀態
      setComment('');
      setName('');
      setAvatar(null);
      setVoteBuffer(null);
      setShowCommentModal(false);
      setShowCommentBox(false);
      setShowComments(true);
    } catch (error) {
      console.error('提交失敗：', error);
      alert('提交過程發生錯誤，請稍後再試。');
    } finally {
      setIsSubmitting(false);
    }
  };
  const calculatePercentage = (value: number) => {
    return voteStats.total === 0 ? 0 : Math.round((value / voteStats.total) * 100);
  };

  const openQrModal = () => {
    setQrLoading(true);
    setShowQrModal(true);
  };

  return (
      <section ref={viewRef} id="voting" className="section bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="container-custom">
          {/* Header */}
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

          {/* Voting card */}
          <div className="max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden relative"
            >
              <button
                  onClick={openQrModal}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 transition z-10"
                  title="分享給朋友"
              >
                <Share2 className="w-5 h-5 text-primary-500" />
              </button>

              <div className="p-8 text-center">
                <h3 className="text-2xl font-semibold mb-8">你會考慮數位告別的選項嗎？</h3>
                <div className="flex flex-col md:flex-row gap-6 justify-center mb-10">
                  {['accept', 'reject'].map((vote) => (
                      <motion.button
                          key={vote}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleVote(vote as 'accept' | 'reject')}
                          disabled={voteStats.userVote !== null}
                          className={`btn ${
                              voteStats.userVote === vote
                                  ? vote === 'accept'
                                      ? 'bg-green-100 text-green-700 border-green-500'
                                      : 'bg-red-100 text-red-700 border-red-500'
                                  : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                          } border-2 rounded-xl py-4 px-6 flex items-center justify-center gap-3 disabled:opacity-70`}
                      >
                        {vote === 'accept' ? <ThumbsUp size={24} /> : <ThumbsDown size={24} />}
                        <span className="font-medium text-lg">
                      {vote === 'accept' ? '會，我可以接受' : '不，我偏好傳統方式'}
                    </span>
                      </motion.button>
                  ))}
                </div>

                {/* Stats */}
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

            {/* Show comments button */}
            <motion.div className="text-center mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowComments((prev) => !prev)}
                  className="relative inline-block px-6 py-3 rounded-full font-semibold shadow-md transition-all
                         bg-primary-600 text-white hover:bg-primary-700"
              >
                {showComments ? '隱藏其他人的意見' : '看看其他人的意見'}
                <span
                    className="absolute -top-2 -right-2 bg-white text-primary-600 text-xs font-bold px-2 py-0.5
                           rounded-full shadow border border-primary-600"
                >
                {comments.length}
              </span>
              </motion.button>
            </motion.div>

            {/* Comments section */}
            <AnimatePresence>
              {showComments && (
                  <motion.div
                      key="comments"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden mt-10"
                  >
                    <div className="max-w-3xl mx-auto">
                      {comments.length === 0 ? (
                          <div className="text-center text-neutral-500 italic py-6">
                            目前還沒有留言，成為第一個分享想法的人吧！
                          </div>
                      ) : (
                          <ul className="grid gap-4">
                            {[...comments]
                                .sort((a, b) => b.createdAt - a.createdAt)
                                .map((c) => (
                                    <li
                                        key={c.id}
                                        className="bg-white/80 backdrop-blur border border-neutral-200 rounded-xl shadow-sm px-5 py-4 flex gap-4 items-start"
                                    >
                                      {/* Avatar */}
                                      <div className="flex-shrink-0 w-10 h-10">
                                        {c.avatarUrl && c.name ? (
                                            <img
                                                src={c.avatarUrl}
                                                alt="頭像"
                                                className="w-10 h-10 rounded-full object-cover border shadow"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white flex items-center justify-center font-bold text-sm uppercase shadow-sm">
                                              {c.name?.charAt(0) || '匿'}
                                            </div>
                                        )}
                                      </div>

                                      {/* Comment body */}
                                      <div className="flex-1">
                                        <div className="flex items-center justify-start gap-2 mb-1 flex-wrap">
                                          <span className="font-semibold text-neutral-800 text-sm">
                                            {c.name || '匿名'}
                                          </span>
                                                                        <span
                                                                            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                                                                                c.type === 'accept'
                                                                                    ? 'bg-green-100 text-green-700'
                                                                                    : 'bg-red-100 text-red-700'
                                                                            }`}
                                                                        >
                                            {c.type === 'accept' ? '接受' : '拒絕'}
                                          </span>
                                                                        <span className="text-xs text-neutral-400 italic">
                                            {new Date(c.createdAt).toLocaleString()}
                                          </span>
                                        </div>
                                        <p className="text-neutral-700 leading-relaxed text-sm whitespace-pre-wrap">
                                          {c.message}
                                        </p>
                                      </div>

                                      {/* Optional code */}
                                      <div className="ml-auto text-xs text-neutral-400 italic">
                                        {c.id && <>ID：{c.id.slice(-5).toUpperCase()}</>}
                                      </div>
                                    </li>
                                ))}
                          </ul>
                      )}
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Comment modal */}
        {showCommentModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-xl p-6 shadow-xl max-w-md w-full text-center">
                {!showCommentBox ? (
                    <>
                      <h4 className="text-xl font-semibold mb-3">想告訴我們為什麼你這樣選擇嗎？</h4>
                      <p className="text-neutral-600 mb-4">這將幫助我們更深入了解你的想法。</p>
                      <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => setShowCommentBox(true)}
                            className="btn bg-primary-600 text-white hover:bg-primary-700"
                        >
                          願意分享
                        </button>
                        <button
                            onClick={submitVoteAndComment}
                            className="btn border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                        >
                          直接送出
                        </button>
                      </div>
                    </>
                ) : (
                    <>
                      <h4 className="text-xl font-semibold mb-3">分享你的想法</h4>

                      <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="你的名字（可留空為匿名）"
                          className="w-full mb-3 p-3 border rounded-lg"
                      />

                      {name.trim() && (
                          <div className="mb-4 text-left">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                              上傳頭像（選填）
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                className="block w-full text-sm text-neutral-600
             file:mr-4 file:py-2 file:px-4
             file:rounded-full file:border-0
             file:text-sm file:font-semibold
             file:bg-primary-50 file:text-primary-700
             hover:file:bg-primary-100"

                            onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                      if (typeof reader.result === 'string') {
                                        setAvatar(reader.result); // base64
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                            />
                            {avatar && (
                                <img
                                    src={avatar}
                                    alt="頭像預覽"
                                    className="mt-2 w-16 h-16 rounded-full object-cover border"
                                />
                            )}
                          </div>
                      )}

                      <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="請輸入你的留言..."
                          className="w-full mb-4 p-4 border rounded-lg"
                          rows={3}
                      />

                      <div className="flex justify-center gap-4">
                        <button
                            disabled={isSubmitting}
                            onClick={submitVoteAndComment}
                            className={`btn bg-primary-600 text-white hover:bg-primary-700 flex items-center justify-center gap-2 ${
                                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                          {isSubmitting ? (
                              <>
                                <span className="loader border-white border-t-transparent border-2 w-4 h-4 rounded-full animate-spin" />
                                傳送中...
                              </>
                          ) : (
                              '提交留言與投票'
                          )}
                        </button>
                        <button
                            onClick={() => {
                              setShowCommentModal(false);
                              setAvatar(null);
                            }}
                            className="btn border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                        >
                          取消
                        </button>
                      </div>
                    </>
                )}
              </div>
            </div>
        )}

        <AnimatePresence>
          {showQrModal && (
              <motion.div
                  key="qr-modal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
              >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full text-center relative"
                >
                  <h4 className="text-xl font-semibold mb-4">歡迎掃描 QR Code</h4>
                  <p className="text-neutral-600 mb-4">一起填寫意見表單，讓我們聽見你的想法！</p>

                  {qrLoading ? (
                      <div className="w-[200px] h-[200px] flex items-center justify-center mx-auto mb-4">
                        <div className="w-12 h-12 border-4 border-primary-300 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                  ) : (
                      <img
                          src={qrImageSrc}
                          alt="QR Code"
                          className="mx-auto mb-4 w-[200px] h-[200px]"
                      />
                  )}

                  <button
                      onClick={() => setShowQrModal(false)}
                      className="btn bg-primary-600 text-white hover:bg-primary-700 w-full"
                  >
                    關閉
                  </button>
                </motion.div>
              </motion.div>
          )}
        </AnimatePresence>

      </section>
  );
};

export default VotingSection;
