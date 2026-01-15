'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { Sparkles, Coins, Trophy, Zap, ChevronRight, Lock, BookOpen, Calculator } from 'lucide-react';

const avatars = ['🚀', '🦁', '🐯', '🐻', '🐼', '🦊', '🦄', '🐲', '🌟', '🎮', '🎨', '🎪'];

export const HomeScreen = () => {
  const { 
    playerName, 
    playerAvatar, 
    totalCoins, 
    gamesPlayed, 
    totalCorrect,
    setPlayerName, 
    setPlayerAvatar, 
    setCurrentScreen 
  } = useGameStore();
  
  const [showNameInput, setShowNameInput] = useState(!playerName);
  const [inputName, setInputName] = useState(playerName);
  const [selectedAvatar, setSelectedAvatar] = useState(playerAvatar);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    if (!playerName) {
      setShowNameInput(true);
    }
  }, [playerName]);

  const handleStart = () => {
    if (inputName.trim()) {
      setPlayerName(inputName.trim());
      setPlayerAvatar(selectedAvatar);
      setShowNameInput(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <AnimatePresence mode="wait">
        {showNameInput ? (
          <motion.div
            key="name-input"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md"
          >
            <div className="glass-strong rounded-3xl p-8 space-y-8">
              {/* Logo */}
              <motion.div 
                className="text-center"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
              >
                <motion.div
                  className="inline-block mb-4"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-16 h-16 text-yellow-400" />
                </motion.div>
                <h1 className="text-4xl font-bold gradient-text mb-2">LearnItQuick</h1>
                <p className="text-gray-400">Let&apos;s make learning fun!</p>
              </motion.div>

              {/* Avatar Selection */}
              <div className="space-y-3">
                <label className="text-sm text-gray-400 block">Choose your avatar</label>
                <div className="grid grid-cols-6 gap-2">
                  {avatars.map((avatar) => (
                    <motion.button
                      key={avatar}
                      onClick={() => setSelectedAvatar(avatar)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-200 ${
                        selectedAvatar === avatar
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 ring-2 ring-white/30'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      {avatar}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Name Input */}
              <div className="space-y-3">
                <label className="text-sm text-gray-400 block">What&apos;s your name?</label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                    placeholder="Enter your name..."
                    maxLength={15}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-lg"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-3xl">
                    {selectedAvatar}
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <motion.button
                onClick={handleStart}
                disabled={!inputName.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl font-semibold text-lg text-white shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed btn-hover-effect relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Learning
                  <ChevronRight className="w-5 h-5" />
                </span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="main-menu"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-4xl"
          >
            {/* Header with stats */}
            <motion.div variants={itemVariants} className="flex justify-between items-center mb-8 px-4">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg shadow-indigo-500/30 cursor-pointer"
                  onClick={() => setShowNameInput(true)}
                >
                  {playerAvatar}
                </motion.div>
                <div>
                  <p className="text-gray-400 text-sm">Welcome back!</p>
                  <h2 className="text-xl font-bold text-white">{playerName}</h2>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <motion.div 
                  className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  <Coins className="w-5 h-5 text-yellow-400" />
                  <span className="font-bold text-yellow-400">{totalCoins}</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <span className="font-semibold text-white">{gamesPlayed}</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div variants={itemVariants} className="text-center mb-12">
              <motion.h1 
                className="text-5xl md:text-6xl font-bold gradient-text mb-4"
                animate={{ 
                  textShadow: [
                    '0 0 20px rgba(99, 102, 241, 0.5)',
                    '0 0 40px rgba(244, 114, 182, 0.5)',
                    '0 0 20px rgba(99, 102, 241, 0.5)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Choose Your Subject
              </motion.h1>
              <p className="text-gray-400 text-lg">Select a subject to start learning!</p>
            </motion.div>

            {/* Subject Cards */}
            <div className="grid md:grid-cols-2 gap-6 px-4">
              {/* Math Card - Active */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentScreen('math-menu')}
                className="group cursor-pointer"
              >
                <div className="glass-strong rounded-3xl p-8 relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 border border-white/10 hover:border-indigo-500/30">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Floating icon */}
                  <motion.div
                    className="relative z-10 mb-6"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                      <Calculator className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Mathematics</h3>
                  <p className="text-gray-400 mb-6 relative z-10">Tables, Addition, Subtraction & more</p>
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2 text-indigo-400">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm">8 Activities</span>
                    </div>
                    <motion.div
                      className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <ChevronRight className="w-5 h-5 text-indigo-400 group-hover:text-white" />
                    </motion.div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 text-6xl opacity-10">📐</div>
                </div>
              </motion.div>

              {/* English Card - Locked */}
              <motion.div
                variants={itemVariants}
                className="relative"
              >
                <div className="glass rounded-3xl p-8 relative overflow-hidden opacity-60 cursor-not-allowed border border-white/5">
                  {/* Lock overlay */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-20 flex items-center justify-center">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                        <Lock className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-400 font-medium">Coming Soon</p>
                    </motion.div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500/50 to-rose-600/50 flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-white/50" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white/50 mb-2">English</h3>
                  <p className="text-gray-500 mb-6">Reading, Spelling & Vocabulary</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm">Coming Soon</span>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 text-6xl opacity-5">📚</div>
                </div>
              </motion.div>
            </div>

            {/* Stats bar */}
            <motion.div 
              variants={itemVariants}
              className="mt-12 glass rounded-2xl p-6 mx-4"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-white">{gamesPlayed}</p>
                  <p className="text-gray-400 text-sm">Games Played</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-400">{totalCorrect}</p>
                  <p className="text-gray-400 text-sm">Correct Answers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-text-gold">{totalCoins}</p>
                  <p className="text-gray-400 text-sm">Total Coins</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
