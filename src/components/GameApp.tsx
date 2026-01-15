'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { HomeScreen } from '@/components/HomeScreen';
import { MathMenu } from '@/components/MathMenu';
import { GameScreen } from '@/components/GameScreen';
import { ResultsScreen } from '@/components/ResultsScreen';

export const GameApp = () => {
  const { currentScreen } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      <AnimatePresence mode="wait">
        {currentScreen === 'home' && (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <HomeScreen />
          </motion.div>
        )}

        {currentScreen === 'math-menu' && (
          <motion.div
            key="math-menu"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <MathMenu />
          </motion.div>
        )}

        {currentScreen === 'game' && (
          <motion.div
            key="game"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <GameScreen />
          </motion.div>
        )}

        {currentScreen === 'results' && (
          <motion.div
            key="results"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ResultsScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
