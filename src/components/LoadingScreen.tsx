'use client';

import { motion } from 'framer-motion';

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Outer ring */}
        <motion.div
          className="w-24 h-24 rounded-full border-4 border-indigo-500/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50" />
        </motion.div>
        
        {/* Inner ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-pink-500/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-pink-500 rounded-full shadow-lg shadow-pink-500/50" />
        </motion.div>
        
        {/* Center icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          🎮
        </motion.div>
      </motion.div>
      
      <motion.p
        className="mt-8 text-gray-400 text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Loading...
      </motion.p>
      
      {/* Loading dots */}
      <div className="flex gap-2 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-indigo-500 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
};
