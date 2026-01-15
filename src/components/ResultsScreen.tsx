'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useSoundManager } from '@/utils/sounds';
import { 
  Trophy, 
  Medal,
  Flame,
  Target,
  RotateCcw,
  Home,
  Sparkles,
  Crown
} from 'lucide-react';

export const ResultsScreen = () => {
  const soundManager = useSoundManager();
  const {
    players,
    correctAnswers,
    wrongAnswers,
    coinsEarned,
    maxStreak,
    questions,
    setCurrentScreen,
    resetGame,
    totalCoins,
  } = useGameStore();

  const [showConfetti, setShowConfetti] = useState(false);
  const [revealedRanks, setRevealedRanks] = useState(0);
  const [showStats, setShowStats] = useState(false);

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const playerRank = sortedPlayers.findIndex(p => p.id === 'player') + 1;
  const isTopThree = playerRank <= 3;
  const accuracy = questions.length > 0 ? Math.round((correctAnswers / questions.length) * 100) : 0;

  // Reveal animation sequence
  useEffect(() => {
    // Show confetti for top 3
    if (isTopThree) {
      setShowConfetti(true);
      soundManager.playVictory();
      setTimeout(() => setShowConfetti(false), 5000);
    }

    // Reveal ranks one by one
    const rankTimer = setInterval(() => {
      setRevealedRanks(prev => {
        if (prev >= 5) {
          clearInterval(rankTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 300);

    // Show stats after ranks
    setTimeout(() => setShowStats(true), 2000);

    return () => clearInterval(rankTimer);
  }, [isTopThree]);

  const handlePlayAgain = () => {
    resetGame();
    setCurrentScreen('math-menu');
  };

  const handleGoHome = () => {
    resetGame();
    setCurrentScreen('home');
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-amber-500';
      case 2: return 'from-gray-300 to-gray-400';
      case 3: return 'from-amber-600 to-orange-700';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Confetti animation */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: -20,
                  background: [
                    '#6366f1', '#f472b6', '#34d399', '#fbbf24', '#ef4444', '#8b5cf6'
                  ][Math.floor(Math.random() * 6)],
                }}
                initial={{ y: -20, opacity: 1, rotate: 0 }}
                animate={{
                  y: window.innerHeight + 100,
                  opacity: [1, 1, 0],
                  rotate: 720,
                  x: Math.random() * 200 - 100,
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          {isTopThree ? (
            <>
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                Amazing Performance!
              </h1>
            </>
          ) : (
            <>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                ⭐
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Great Effort!
              </h1>
            </>
          )}
          <p className="text-gray-400 text-lg">
            You finished #{playerRank} out of {players.length} players
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-strong rounded-3xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Final Standings</h2>
            </div>

            {/* Podium for top 3 */}
            <div className="flex justify-center items-end gap-2 mb-6 h-40">
              {/* Second place */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: revealedRanks >= 2 ? '6rem' : 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                {revealedRanks >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-2"
                  >
                    <div className="text-3xl mb-1">{sortedPlayers[1]?.avatar}</div>
                    <p className="text-xs text-gray-400 truncate max-w-16">
                      {sortedPlayers[1]?.id === 'player' ? 'You' : sortedPlayers[1]?.name}
                    </p>
                  </motion.div>
                )}
                <div className="w-20 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-lg flex items-end justify-center pb-2 h-full">
                  <span className="text-2xl">🥈</span>
                </div>
              </motion.div>

              {/* First place */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: revealedRanks >= 1 ? '8rem' : 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                {revealedRanks >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-2"
                  >
                    <motion.div 
                      className="text-3xl mb-1 relative"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Crown className="w-5 h-5 text-yellow-400 absolute -top-5 left-1/2 -translate-x-1/2 crown-bounce" />
                      {sortedPlayers[0]?.avatar}
                    </motion.div>
                    <p className="text-xs text-gray-400 truncate max-w-16">
                      {sortedPlayers[0]?.id === 'player' ? 'You' : sortedPlayers[0]?.name}
                    </p>
                  </motion.div>
                )}
                <div className="w-24 bg-gradient-to-t from-yellow-500 to-amber-400 rounded-t-lg flex items-end justify-center pb-2 h-full relative overflow-hidden">
                  <span className="text-2xl relative z-10">🥇</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-yellow-300/30 to-transparent"
                    animate={{ y: [0, -100, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              {/* Third place */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: revealedRanks >= 3 ? '4rem' : 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                {revealedRanks >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-2"
                  >
                    <div className="text-3xl mb-1">{sortedPlayers[2]?.avatar}</div>
                    <p className="text-xs text-gray-400 truncate max-w-16">
                      {sortedPlayers[2]?.id === 'player' ? 'You' : sortedPlayers[2]?.name}
                    </p>
                  </motion.div>
                )}
                <div className="w-20 bg-gradient-to-t from-amber-700 to-amber-600 rounded-t-lg flex items-end justify-center pb-2 h-full">
                  <span className="text-2xl">🥉</span>
                </div>
              </motion.div>
            </div>

            {/* Full rankings list */}
            <div className="space-y-2">
              {sortedPlayers.slice(0, 5).map((player, index) => {
                const isPlayer = player.id === 'player';
                const isRevealed = index < revealedRanks;

                return (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isRevealed ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      isPlayer 
                        ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30' 
                        : 'bg-white/5'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getRankColor(index + 1)} flex items-center justify-center text-sm font-bold text-white`}>
                      {index + 1}
                    </div>
                    <span className="text-2xl">{player.avatar}</span>
                    <div className="flex-1">
                      <p className={`font-semibold ${isPlayer ? 'text-indigo-300' : 'text-white'}`}>
                        {isPlayer ? 'You' : player.name}
                      </p>
                      <p className="text-xs text-gray-400">{player.correctAnswers} correct</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">{player.score}</p>
                      <p className="text-xs text-gray-400">points</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats and rewards */}
          <div className="space-y-6">
            {/* Your performance */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={showStats ? { opacity: 1, x: 0 } : {}}
              className="glass-strong rounded-3xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Your Performance</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Accuracy */}
                <div className="glass rounded-2xl p-4 text-center">
                  <div className="relative w-20 h-20 mx-auto mb-2">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <motion.circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={226}
                        initial={{ strokeDashoffset: 226 }}
                        animate={{ strokeDashoffset: 226 - (226 * accuracy / 100) }}
                        transition={{ delay: 0.5, duration: 1 }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#f472b6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                      {accuracy}%
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">Accuracy</p>
                </div>

                {/* Correct/Wrong */}
                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-400">{correctAnswers}</p>
                      <p className="text-xs text-gray-400">Correct</p>
                    </div>
                    <div className="w-px h-12 bg-white/10" />
                    <div className="text-center">
                      <p className="text-3xl font-bold text-red-400">{wrongAnswers}</p>
                      <p className="text-xs text-gray-400">Wrong</p>
                    </div>
                  </div>
                </div>

                {/* Max streak */}
                <div className="glass rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{maxStreak}</p>
                    <p className="text-xs text-gray-400">Best Streak</p>
                  </div>
                </div>

                {/* Rank */}
                <div className="glass rounded-2xl p-4 flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getRankColor(playerRank)} flex items-center justify-center`}>
                    <Medal className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">#{playerRank}</p>
                    <p className="text-xs text-gray-400">Final Rank</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Coins earned */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={showStats ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="glass-strong rounded-3xl p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-3xl shadow-lg shadow-yellow-500/30"
                  >
                    🪙
                  </motion.div>
                  <div>
                    <p className="text-gray-400 text-sm">Coins Earned</p>
                    <motion.p
                      className="text-4xl font-bold gradient-text-gold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring' }}
                    >
                      +{coinsEarned}
                    </motion.p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Total Balance</p>
                  <p className="text-2xl font-bold text-white">{totalCoins}</p>
                </div>
              </div>

              {/* Bonus breakdown */}
              {maxStreak >= 3 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Streak Bonus ({maxStreak}x)</span>
                    <span className="text-orange-400 font-medium">+{Math.floor(maxStreak / 3) * 2}</span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={showStats ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="flex gap-4"
            >
              <motion.button
                onClick={handlePlayAgain}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl font-semibold text-white shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 btn-hover-effect"
              >
                <RotateCcw className="w-5 h-5" />
                Play Again
              </motion.button>

              <motion.button
                onClick={handleGoHome}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="py-4 px-6 glass rounded-xl font-semibold text-white flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
              >
                <Home className="w-5 h-5" />
                Home
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Encouragement message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showStats ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <div className="glass rounded-2xl p-4 inline-flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <p className="text-gray-300">
              {accuracy >= 80 
                ? "Outstanding! You're a math superstar! 🌟" 
                : accuracy >= 60 
                  ? "Great job! Keep practicing to improve! 💪" 
                  : "Good effort! Practice makes perfect! 📚"}
            </p>
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
