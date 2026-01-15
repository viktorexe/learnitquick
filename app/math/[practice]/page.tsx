'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const playerNames = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery'];

const generateQuestion = (type: string) => {
  switch (type) {
    case 'tables':
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      return { question: `${num1} × ${num2}`, answer: num1 * num2, options: generateOptions(num1 * num2) };
    case 'compare':
      const a = Math.floor(Math.random() * 50) + 1;
      const b = Math.floor(Math.random() * 50) + 1;
      const correctOp = a > b ? '>' : a < b ? '<' : '=';
      return { question: `${a} ___ ${b}`, answer: correctOp, options: ['<', '=', '>'] };
    case 'addition':
      const add1 = Math.floor(Math.random() * 20) + 1;
      const add2 = Math.floor(Math.random() * 20) + 1;
      return { question: `${add1} + ${add2}`, answer: add1 + add2, options: generateOptions(add1 + add2) };
    case 'subtraction':
      const sub1 = Math.floor(Math.random() * 20) + 10;
      const sub2 = Math.floor(Math.random() * 10) + 1;
      return { question: `${sub1} - ${sub2}`, answer: sub1 - sub2, options: generateOptions(sub1 - sub2) };
    case 'counting':
      const count = Math.floor(Math.random() * 20) + 1;
      return { question: `Count: ${'🟢'.repeat(count)}`, answer: count, options: generateOptions(count) };
    case 'shapes':
      const shapes = ['🔴', '🔵', '🟢', '🟡'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const shapeCount = Math.floor(Math.random() * 10) + 1;
      return { question: `How many ${shape}?\n${shape.repeat(shapeCount)}`, answer: shapeCount, options: generateOptions(shapeCount) };
    default:
      return { question: '1 + 1', answer: 2, options: [1, 2, 3, 4] };
  }
};

const generateOptions = (correct: number) => {
  const options = [correct];
  while (options.length < 4) {
    const opt = correct + Math.floor(Math.random() * 10) - 5;
    if (opt > 0 && !options.includes(opt)) options.push(opt);
  }
  return options.sort(() => Math.random() - 0.5);
};

export default function PracticePage() {
  const router = useRouter();
  const params = useParams();
  const practice = params.practice as string;
  
  const [coins, setCoins] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState<any>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [players, setPlayers] = useState<any[]>([]);
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    const savedCoins = localStorage.getItem('coins');
    if (savedCoins) setCoins(parseInt(savedCoins));
    
    const initialPlayers = playerNames.slice(0, 5).map((name, i) => ({
      name,
      score: Math.floor(Math.random() * 30) + 10,
      avatar: ['🦊', '🐼', '🐨', '🦁', '🐯'][i]
    }));
    initialPlayers.push({ name: 'You', score: 0, avatar: '⭐' });
    setPlayers(initialPlayers);
    
    setQuestion(generateQuestion(practice));
  }, [practice]);

  const handleAnswer = (answer: any) => {
    setSelectedAnswer(answer);
    const correct = answer === question.answer;
    setIsCorrect(correct);
    
    if (correct) {
      const newScore = score + 10;
      const newCoins = coins + 10;
      setScore(newScore);
      setCoins(newCoins);
      localStorage.setItem('coins', newCoins.toString());
      
      setPlayers(prev => prev.map(p => 
        p.name === 'You' ? { ...p, score: newScore } : 
        { ...p, score: p.score + Math.floor(Math.random() * 15) }
      ));
    }
    
    setTimeout(() => {
      if (currentQuestion < 9) {
        setCurrentQuestion(currentQuestion + 1);
        setQuestion(generateQuestion(practice));
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setGameFinished(true);
      }
    }, 1500);
  };

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const userRank = sortedPlayers.findIndex(p => p.name === 'You') + 1;

  if (gameFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 0 }}
              animate={{ y: window.innerHeight + 100, opacity: [0, 1, 0] }}
              transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 2, repeat: Infinity }}
            >
              {['🎉', '⭐', '🏆', '✨'][Math.floor(Math.random() * 4)]}
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="glass p-12 rounded-3xl max-w-2xl w-full"
          >
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl font-bold text-white text-center mb-8"
            >
              🏆 Game Over! 🏆
            </motion.h1>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/20 p-8 rounded-2xl mb-8"
            >
              <p className="text-white text-3xl text-center mb-4">Your Rank</p>
              <p className="text-yellow-300 text-8xl font-bold text-center">#{userRank}</p>
              <p className="text-white text-2xl text-center mt-4">Score: {score} points</p>
              <p className="text-yellow-300 text-2xl text-center mt-2">+{score} 🪙</p>
            </motion.div>

            <div className="space-y-3 mb-8">
              <p className="text-white text-2xl font-bold text-center mb-4">Leaderboard</p>
              {sortedPlayers.map((player, index) => (
                <motion.div
                  key={player.name}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-xl ${
                    player.name === 'You' ? 'bg-yellow-400/30 border-2 border-yellow-300' : 'bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-white">#{index + 1}</span>
                    <span className="text-3xl">{player.avatar}</span>
                    <span className="text-xl font-semibold text-white">{player.name}</span>
                  </div>
                  <span className="text-2xl font-bold text-white">{player.score}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="flex-1 bg-white text-purple-600 py-4 rounded-xl font-bold text-xl"
              >
                Play Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/math')}
                className="flex-1 bg-purple-500 text-white py-4 rounded-xl font-bold text-xl"
              >
                Back to Math
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-10 p-6 flex justify-between items-center"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push('/math')}
          className="glass px-6 py-3 rounded-full text-white font-semibold"
        >
          ← Exit
        </motion.button>
        <div className="glass px-6 py-3 rounded-full">
          <span className="text-white text-xl font-bold">Question {currentQuestion + 1}/10</span>
        </div>
        <motion.div
          className="glass px-6 py-3 rounded-full flex items-center gap-2"
          animate={{ scale: isCorrect ? [1, 1.2, 1] : 1 }}
        >
          <span className="text-3xl">🪙</span>
          <span className="text-2xl font-bold text-white">{coins}</span>
        </motion.div>
      </motion.header>

      <div className="relative z-10 flex gap-6 px-6 pb-6" style={{ height: 'calc(100vh - 120px)' }}>
        {/* Main Game Area */}
        <div className="flex-1 flex flex-col">
          {/* Progress Bar */}
          <motion.div className="glass p-4 rounded-2xl mb-6">
            <div className="w-full bg-white/20 rounded-full h-4">
              <motion.div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / 10) * 100}%` }}
              />
            </div>
          </motion.div>

          {/* Question Card */}
          <motion.div
            key={currentQuestion}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass p-12 rounded-3xl mb-6 flex-1 flex items-center justify-center"
          >
            <h2 className="text-6xl md:text-8xl font-bold text-white text-center whitespace-pre-line">
              {question.question}
            </h2>
          </motion.div>

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option: any, index: number) => (
              <motion.button
                key={index}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: selectedAnswer === null ? 1.05 : 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => selectedAnswer === null && handleAnswer(option)}
                disabled={selectedAnswer !== null}
                className={`p-8 rounded-2xl text-4xl font-bold transition-all ${
                  selectedAnswer === option
                    ? isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'glass text-white hover:bg-white/20'
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {isCorrect !== null && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className={`mt-6 p-6 rounded-2xl text-center ${
                  isCorrect ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                <p className="text-white text-3xl font-bold">
                  {isCorrect ? '🎉 Correct! +10 coins!' : '❌ Try again next time!'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live Leaderboard */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-80 glass p-6 rounded-3xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <h3 className="text-white text-2xl font-bold">Live Rankings</h3>
          </div>
          
          <div className="space-y-3">
            {sortedPlayers.map((player, index) => (
              <motion.div
                key={player.name}
                layout
                className={`p-4 rounded-xl flex items-center justify-between ${
                  player.name === 'You' ? 'bg-yellow-400/30 border-2 border-yellow-300' : 'bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-white">#{index + 1}</span>
                  <span className="text-2xl">{player.avatar}</span>
                  <span className="text-lg font-semibold text-white">{player.name}</span>
                </div>
                <motion.span
                  key={player.score}
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  className="text-xl font-bold text-white"
                >
                  {player.score}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
