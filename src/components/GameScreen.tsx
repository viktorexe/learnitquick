'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { getModeInfo } from '@/utils/questionGenerator';
import { 
  Zap, 
  Users, 
  Trophy,
  Clock,
  Coins,
  CheckCircle,
  XCircle,
  Flame
} from 'lucide-react';

export const GameScreen = () => {
  const {
    questions,
    currentQuestion,
    currentGameMode,
    players,
    correctAnswers,
    wrongAnswers,
    coinsEarned,
    streak,
    answerQuestion,
    nextQuestion,
    endGame,
    updateBotScores,
    playerAvatar,
    playerName,
  } = useGameStore();

  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showCountdown, setShowCountdown] = useState(true);
  const [countdownNum, setCountdownNum] = useState(3);
  const [coinAnimation, setCoinAnimation] = useState(false);
  const [shakeWrong, setShakeWrong] = useState(false);

  const question = questions[currentQuestion];
  const modeInfo = currentGameMode ? getModeInfo(currentGameMode) : null;
  const progress = ((currentQuestion) / questions.length) * 100;

  // Sort players by score for live leaderboard
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const playerRank = sortedPlayers.findIndex(p => p.id === 'player') + 1;

  // Initial countdown
  useEffect(() => {
    if (showCountdown) {
      const timer = setInterval(() => {
        setCountdownNum((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowCountdown(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showCountdown]);

  // Question timer
  useEffect(() => {
    if (showCountdown || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAnswer(-1); // Time's up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showCountdown, showResult, currentQuestion]);

  const handleAnswer = useCallback((answer: string | number) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    const correct = answerQuestion(answer);
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setCoinAnimation(true);
      setTimeout(() => setCoinAnimation(false), 1000);
    } else {
      setShakeWrong(true);
      setTimeout(() => setShakeWrong(false), 500);
    }

    // Update bot scores
    updateBotScores();

    // Move to next question or end game
    setTimeout(() => {
      if (currentQuestion >= questions.length - 1) {
        endGame();
      } else {
        nextQuestion();
        setShowResult(false);
        setSelectedAnswer(null);
        setTimeLeft(15);
      }
    }, 1500);
  }, [showResult, answerQuestion, updateBotScores, currentQuestion, questions.length, endGame, nextQuestion]);

  // Countdown screen
  if (showCountdown) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            key={countdownNum}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="mb-8"
          >
            {countdownNum > 0 ? (
              <span className="text-9xl font-bold gradient-text">{countdownNum}</span>
            ) : (
              <span className="text-6xl font-bold text-green-400">GO!</span>
            )}
          </motion.div>
          
          <motion.p 
            className="text-xl text-gray-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Get ready...
          </motion.p>

          {/* Show opponents joining */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 glass rounded-2xl p-4 max-w-sm mx-auto"
          >
            <p className="text-sm text-gray-400 mb-3">Players in match</p>
            <div className="flex justify-center -space-x-2">
              {players.slice(0, 8).map((player, i) => (
                <motion.div
                  key={player.id}
                  initial={{ scale: 0, x: -20 }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 border-[#1a1a2e] ${
                    player.id === 'player' 
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 ring-2 ring-indigo-400' 
                      : 'bg-gradient-to-br from-gray-600 to-gray-700'
                  }`}
                >
                  {player.avatar}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (!question || !modeInfo) return null;

  return (
    <div className="min-h-screen p-4 md:p-6 flex flex-col">
      {/* Coin animation */}
      <AnimatePresence>
        {coinAnimation && (
          <motion.div
            initial={{ scale: 0, y: 0, opacity: 1 }}
            animate={{ scale: 1, y: -100, opacity: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 z-50 text-4xl"
          >
            +10 🪙
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6 max-w-4xl mx-auto w-full"
      >
        {/* Mode badge */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${modeInfo.color} bg-opacity-20`}>
          <span className="text-xl">{modeInfo.icon}</span>
          <span className="text-white font-medium text-sm">{modeInfo.title}</span>
        </div>

        {/* Timer */}
        <motion.div
          className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            timeLeft <= 5 ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-white'
          }`}
          animate={timeLeft <= 5 ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Infinity : 0 }}
        >
          <Clock className="w-4 h-4" />
          <span className="font-bold">{timeLeft}s</span>
        </motion.div>

        {/* Coins earned */}
        <motion.div 
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20"
          animate={coinAnimation ? { scale: [1, 1.2, 1] } : {}}
        >
          <Coins className="w-4 h-4 text-yellow-400" />
          <span className="font-bold text-yellow-400">{coinsEarned}</span>
        </motion.div>
      </motion.div>

      {/* Progress bar */}
      <div className="max-w-4xl mx-auto w-full mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span className="flex items-center gap-1">
            <Flame className={`w-4 h-4 ${streak >= 3 ? 'text-orange-400' : 'text-gray-500'}`} />
            {streak} streak
          </span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 progress-glow"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto w-full">
        {/* Main question area */}
        <div className="flex-1 flex flex-col">
          {/* Question card */}
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className={`glass-strong rounded-3xl p-8 mb-6 ${shakeWrong ? 'shake' : ''}`}
          >
            <p className="text-3xl md:text-4xl font-bold text-white text-center leading-relaxed">
              {question.question}
            </p>
          </motion.div>

          {/* Answer options */}
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectAnswer = String(option) === String(question.correctAnswer);
              
              let buttonStyle = 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20';
              
              if (showResult) {
                if (isCorrectAnswer) {
                  buttonStyle = 'bg-green-500/20 border-green-500/50';
                } else if (isSelected && !isCorrectAnswer) {
                  buttonStyle = 'bg-red-500/20 border-red-500/50';
                }
              }

              return (
                <motion.button
                  key={index}
                  onClick={() => !showResult && handleAnswer(option)}
                  disabled={showResult}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={!showResult ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                  className={`p-6 rounded-2xl border-2 transition-all duration-200 relative overflow-hidden ${buttonStyle}`}
                >
                  <span className="text-2xl md:text-3xl font-bold text-white relative z-10">
                    {option}
                  </span>
                  
                  {/* Result indicators */}
                  {showResult && isCorrectAnswer && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2"
                    >
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </motion.div>
                  )}
                  
                  {showResult && isSelected && !isCorrectAnswer && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2"
                    >
                      <XCircle className="w-6 h-6 text-red-400" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Streak indicator */}
          <AnimatePresence>
            {streak >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <span className="text-orange-400 font-bold">{streak}x Streak! +{Math.floor(streak / 3) * 2} bonus</span>
                  <Flame className="w-5 h-5 text-orange-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live leaderboard sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-72 glass rounded-2xl p-4 h-fit"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">Live Rankings</span>
            </div>
            <span className="text-xs text-gray-400">Your rank: #{playerRank}</span>
          </div>

          <div className="space-y-2">
            {sortedPlayers.slice(0, 5).map((player, index) => {
              const isPlayer = player.id === 'player';
              return (
                <motion.div
                  key={player.id}
                  layout
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    isPlayer 
                      ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30' 
                      : 'bg-white/5'
                  }`}
                >
                  <span className={`w-6 text-center font-bold ${
                    index === 0 ? 'text-yellow-400' : 
                    index === 1 ? 'text-gray-300' : 
                    index === 2 ? 'text-amber-600' : 'text-gray-500'
                  }`}>
                    {index === 0 ? '👑' : index + 1}
                  </span>
                  <span className="text-xl">{player.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate ${isPlayer ? 'text-indigo-300' : 'text-white'}`}>
                      {isPlayer ? 'You' : player.name}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-gray-300">{player.score}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Quick stats */}
          <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-400">{correctAnswers}</p>
              <p className="text-xs text-gray-400">Correct</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-400">{wrongAnswers}</p>
              <p className="text-xs text-gray-400">Wrong</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
