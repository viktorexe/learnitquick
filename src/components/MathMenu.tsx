'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useGameStore, GameMode, Difficulty } from '@/store/gameStore';
import { getModeInfo, generateQuestions } from '@/utils/questionGenerator';
import { 
  ArrowLeft, 
  Zap, 
  Users, 
  Clock, 
  Star,
  ChevronRight,
  Sparkles,
  GraduationCap,
  BookOpen
} from 'lucide-react';

const gameModes: GameMode[] = [
  'tables',
  'comparison',
  'addition',
  'subtraction',
  'multiplication',
  'carry-addition',
  'counting',
  'number-sequence',
];

const difficultyConfig: Record<Difficulty, { label: string; color: string; stars: number }> = {
  easy: { label: 'Easy', color: 'from-green-500 to-emerald-600', stars: 1 },
  medium: { label: 'Medium', color: 'from-yellow-500 to-orange-600', stars: 2 },
  hard: { label: 'Hard', color: 'from-red-500 to-rose-600', stars: 3 },
};

export const MathMenu = () => {
  const { setCurrentScreen, startGame, setQuestions, playerAvatar, playerName, totalCoins } = useGameStore();
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [hoveredMode, setHoveredMode] = useState<GameMode | null>(null);

  const handleModeSelect = (mode: GameMode) => {
    setSelectedMode(mode);
    setShowDifficultyModal(true);
  };

  const handleStartGame = (difficulty: Difficulty) => {
    if (selectedMode) {
      const questions = generateQuestions(selectedMode, difficulty, 10);
      setQuestions(questions);
      startGame(selectedMode, difficulty);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 100, damping: 12 },
    },
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8 max-w-6xl mx-auto"
      >
        <motion.button
          onClick={() => setCurrentScreen('home')}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
            <span className="text-2xl">{playerAvatar}</span>
            <span className="text-white font-medium hidden sm:inline">{playerName}</span>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 px-4 py-2 rounded-full border border-yellow-500/30">
            <span className="text-yellow-400">🪙</span>
            <span className="font-bold text-yellow-400">{totalCoins}</span>
          </div>
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Math <span className="gradient-text">Arena</span>
        </h1>
        <p className="text-gray-400 text-lg">Choose your challenge and compete with others!</p>
      </motion.div>

      {/* Learning Center Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="max-w-6xl mx-auto mb-8"
      >
        <motion.div
          onClick={() => setCurrentScreen('learn')}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="glass-strong rounded-2xl p-6 cursor-pointer relative overflow-hidden group border border-emerald-500/20 hover:border-emerald-500/40 transition-all"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 opacity-50 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <GraduationCap className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  Learning Center
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">NEW</span>
                </h3>
                <p className="text-gray-400 text-sm">Master tables, carry forward & more at your own pace - no competition!</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">Interactive Lessons</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Live players indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center mb-8"
      >
        <div className="glass rounded-full px-6 py-3 flex items-center gap-3">
          <div className="flex -space-x-2">
            {['🦁', '🐯', '🐻', '🦊'].map((avatar, i) => (
              <motion.div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm border-2 border-[#1a1a2e]"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
              >
                {avatar}
              </motion.div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-gray-300 text-sm font-medium">
              <span className="text-green-400">247</span> players online
            </span>
          </div>
        </div>
      </motion.div>

      {/* Game Mode Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
      >
        {gameModes.map((mode, index) => {
          const modeInfo = getModeInfo(mode);
          const isHovered = hoveredMode === mode;

          return (
            <motion.div
              key={mode}
              variants={itemVariants}
              onHoverStart={() => setHoveredMode(mode)}
              onHoverEnd={() => setHoveredMode(null)}
              onClick={() => handleModeSelect(mode)}
              className="group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="glass-strong rounded-2xl p-6 h-full relative overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300"
              >
                {/* Background gradient on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${modeInfo.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Icon */}
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${modeInfo.color} flex items-center justify-center text-2xl mb-4 shadow-lg relative z-10`}
                  animate={isHovered ? { rotate: [0, -10, 10, 0], scale: 1.1 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {modeInfo.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-1 relative z-10">{modeInfo.title}</h3>
                <p className="text-gray-400 text-sm mb-4 relative z-10">{modeInfo.description}</p>

                {/* Stats */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Users className="w-3 h-3" />
                    <span>{Math.floor(Math.random() * 50) + 10} playing</span>
                  </div>
                  <motion.div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${modeInfo.color} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}
                    animate={isHovered ? { x: [0, 5, 0] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </motion.div>
                </div>

                {/* Floating particles on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            x: Math.random() * 100 - 50,
                            y: -100,
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="absolute bottom-4 left-1/2 w-2 h-2 rounded-full bg-white/50"
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 max-w-2xl mx-auto"
      >
        <div className="glass rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-white font-semibold mb-1">Pro Tip</h4>
              <p className="text-gray-400 text-sm">
                Answer questions correctly in a row to build your streak! Each 3-streak gives you bonus coins! 🔥
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Difficulty Selection Modal */}
      <AnimatePresence>
        {showDifficultyModal && selectedMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowDifficultyModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl p-8 max-w-md w-full"
            >
              {/* Mode info */}
              <div className="text-center mb-8">
                <motion.div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getModeInfo(selectedMode).color} flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg`}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {getModeInfo(selectedMode).icon}
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">{getModeInfo(selectedMode).title}</h2>
                <p className="text-gray-400">{getModeInfo(selectedMode).description}</p>
              </div>

              {/* Difficulty selection */}
              <div className="space-y-3 mb-8">
                <p className="text-sm text-gray-400 text-center mb-4">Select difficulty level</p>
                {(Object.keys(difficultyConfig) as Difficulty[]).map((diff) => {
                  const config = difficultyConfig[diff];
                  return (
                    <motion.button
                      key={diff}
                      onClick={() => handleStartGame(diff)}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center`}>
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="text-white font-semibold">{config.label}</p>
                          <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${i < config.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>10 Q</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Game info */}
              <div className="flex justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>8 Players</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">🪙</span>
                  <span>10 coins/correct</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
