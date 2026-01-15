'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { 
  ArrowLeft, 
  BookOpen, 
  Calculator,
  Grid3X3,
  ArrowRight,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Star,
  Lightbulb
} from 'lucide-react';

type LearnMode = 'menu' | 'tables' | 'tables-practice' | 'carry-forward' | 'comparison';

interface TableData {
  number: number;
  color: string;
}

const tables: TableData[] = [
  { number: 1, color: 'from-rose-500 to-pink-600' },
  { number: 2, color: 'from-orange-500 to-amber-600' },
  { number: 3, color: 'from-yellow-500 to-lime-600' },
  { number: 4, color: 'from-green-500 to-emerald-600' },
  { number: 5, color: 'from-teal-500 to-cyan-600' },
  { number: 6, color: 'from-cyan-500 to-blue-600' },
  { number: 7, color: 'from-blue-500 to-indigo-600' },
  { number: 8, color: 'from-indigo-500 to-purple-600' },
  { number: 9, color: 'from-purple-500 to-fuchsia-600' },
  { number: 10, color: 'from-fuchsia-500 to-pink-600' },
];

export const LearnScreen = () => {
  const { setCurrentScreen, playerAvatar, playerName, totalCoins } = useGameStore();
  const [learnMode, setLearnMode] = useState<LearnMode>('menu');
  const [selectedTable, setSelectedTable] = useState<number>(1);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [carryStep, setCarryStep] = useState(0);

  const handleBack = () => {
    if (learnMode === 'menu') {
      setCurrentScreen('math-menu');
    } else if (learnMode === 'tables-practice') {
      setLearnMode('tables');
      setPracticeIndex(0);
      setShowAnswer(false);
    } else {
      setLearnMode('menu');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
          onClick={handleBack}
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

      <AnimatePresence mode="wait">
        {/* Learn Menu */}
        {learnMode === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto"
          >
            {/* Title */}
            <div className="text-center mb-12">
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 mb-4"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <GraduationCap className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                Learning <span className="gradient-text">Center</span>
              </h1>
              <p className="text-gray-400 text-lg">Master math concepts at your own pace!</p>
            </div>

            {/* Learning Options */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Tables Learning */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setLearnMode('tables')}
                className="group cursor-pointer"
              >
                <div className="glass-strong rounded-3xl p-8 relative overflow-hidden border border-white/10 hover:border-emerald-500/30 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <motion.div
                    className="relative z-10 mb-6"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <Grid3X3 className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Times Tables</h3>
                  <p className="text-gray-400 mb-4 relative z-10">Learn multiplication tables 1 to 10 with interactive flashcards</p>

                  <div className="flex items-center gap-2 text-emerald-400 relative z-10">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm">10 Tables to master</span>
                  </div>

                  <div className="absolute top-4 right-4 text-5xl opacity-10">✖️</div>
                </div>
              </motion.div>

              {/* Carry Forward Learning */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setLearnMode('carry-forward')}
                className="group cursor-pointer"
              >
                <div className="glass-strong rounded-3xl p-8 relative overflow-hidden border border-white/10 hover:border-blue-500/30 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <motion.div
                    className="relative z-10 mb-6"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Calculator className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Carry Forward</h3>
                  <p className="text-gray-400 mb-4 relative z-10">Understand how to add numbers with carrying step by step</p>

                  <div className="flex items-center gap-2 text-blue-400 relative z-10">
                    <Lightbulb className="w-4 h-4" />
                    <span className="text-sm">Visual step-by-step guide</span>
                  </div>

                  <div className="absolute top-4 right-4 text-5xl opacity-10">➕</div>
                </div>
              </motion.div>

              {/* Comparison Learning */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setLearnMode('comparison')}
                className="group cursor-pointer"
              >
                <div className="glass-strong rounded-3xl p-8 relative overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <motion.div
                    className="relative z-10 mb-6"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <span className="text-2xl font-bold text-white">&lt; &gt;</span>
                    </div>
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Comparing Numbers</h3>
                  <p className="text-gray-400 mb-4 relative z-10">Learn about less than, greater than, and equal signs</p>

                  <div className="flex items-center gap-2 text-purple-400 relative z-10">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">Fun visual examples</span>
                  </div>

                  <div className="absolute top-4 right-4 text-5xl opacity-10">⚖️</div>
                </div>
              </motion.div>

              {/* More Coming Soon */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="glass rounded-3xl p-8 relative overflow-hidden border border-white/5 opacity-60">
                  <div className="absolute inset-0 bg-black/20" />
                  
                  <div className="relative z-10 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white/50" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white/50 mb-2 relative z-10">More Coming</h3>
                  <p className="text-gray-500 mb-4 relative z-10">Subtraction, Division, and more lessons coming soon!</p>

                  <div className="flex items-center gap-2 text-gray-500 relative z-10">
                    <span className="text-sm">Stay tuned!</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Tips Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 glass rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Learning Tip</h4>
                  <p className="text-gray-400 text-sm">
                    Take your time in the Learning Center! There&apos;s no timer or competition here. 
                    Once you feel confident, head to the Math Arena to test your skills and earn coins! 🌟
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Tables Learning */}
        {learnMode === 'tables' && (
          <TablesLearning
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
            setLearnMode={setLearnMode}
            setPracticeIndex={setPracticeIndex}
            setShowAnswer={setShowAnswer}
          />
        )}

        {/* Tables Practice */}
        {learnMode === 'tables-practice' && (
          <TablesPractice
            selectedTable={selectedTable}
            practiceIndex={practiceIndex}
            setPracticeIndex={setPracticeIndex}
            showAnswer={showAnswer}
            setShowAnswer={setShowAnswer}
            setLearnMode={setLearnMode}
          />
        )}

        {/* Carry Forward Learning */}
        {learnMode === 'carry-forward' && (
          <CarryForwardLearning
            step={carryStep}
            setStep={setCarryStep}
          />
        )}

        {/* Comparison Learning */}
        {learnMode === 'comparison' && (
          <ComparisonLearning />
        )}
      </AnimatePresence>
    </div>
  );
};

// Tables Learning Component
const TablesLearning = ({
  selectedTable,
  setSelectedTable,
  setLearnMode,
  setPracticeIndex,
  setShowAnswer,
}: {
  selectedTable: number;
  setSelectedTable: (n: number) => void;
  setLearnMode: (mode: LearnMode) => void;
  setPracticeIndex: (n: number) => void;
  setShowAnswer: (b: boolean) => void;
}) => {
  const tableData = tables.find(t => t.number === selectedTable)!;

  return (
    <motion.div
      key="tables"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto"
    >
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Times Tables <span className="gradient-text">1-10</span>
        </h1>
        <p className="text-gray-400">Select a table to learn, then practice with flashcards!</p>
      </div>

      {/* Table Selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {tables.map((table) => (
          <motion.button
            key={table.number}
            onClick={() => setSelectedTable(table.number)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-14 h-14 rounded-xl font-bold text-xl transition-all ${
              selectedTable === table.number
                ? `bg-gradient-to-br ${table.color} text-white shadow-lg`
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {table.number}
          </motion.button>
        ))}
      </div>

      {/* Selected Table Display */}
      <motion.div
        key={selectedTable}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-strong rounded-3xl p-8 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tableData.color} flex items-center justify-center text-lg`}>
              {selectedTable}
            </span>
            Table of {selectedTable}
          </h2>
          <motion.button
            onClick={() => {
              setPracticeIndex(0);
              setShowAnswer(false);
              setLearnMode('tables-practice');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-xl bg-gradient-to-r ${tableData.color} text-white font-semibold flex items-center gap-2 shadow-lg`}
          >
            Practice
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((multiplier, index) => (
            <motion.div
              key={multiplier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-xl p-4 text-center hover:bg-white/10 transition-colors group"
            >
              <div className="text-gray-400 text-sm mb-1">
                {selectedTable} × {multiplier}
              </div>
              <div className={`text-2xl font-bold bg-gradient-to-r ${tableData.color} bg-clip-text text-transparent`}>
                {selectedTable * multiplier}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Memory Tips */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          Memory Tips for Table of {selectedTable}
        </h3>
        <div className="text-gray-400 space-y-2">
          {selectedTable === 1 && (
            <p>🌟 Easy! Any number times 1 equals itself. 5 × 1 = 5, 9 × 1 = 9</p>
          )}
          {selectedTable === 2 && (
            <p>🌟 Double the number! 2 × 3 = 3 + 3 = 6. It&apos;s like counting by 2s!</p>
          )}
          {selectedTable === 5 && (
            <p>🌟 Ends in 0 or 5! Count by 5s: 5, 10, 15, 20... Use your fingers!</p>
          )}
          {selectedTable === 10 && (
            <p>🌟 Just add a 0! 10 × 7 = 70. The easiest table of all!</p>
          )}
          {selectedTable === 9 && (
            <p>🌟 Finger trick! Hold up 10 fingers, fold down the multiplier finger. Left digits = tens, right = ones!</p>
          )}
          {![1, 2, 5, 9, 10].includes(selectedTable) && (
            <p>🌟 Practice makes perfect! Say them out loud: &quot;{selectedTable} times 1 is {selectedTable}, {selectedTable} times 2 is {selectedTable * 2}...&quot;</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Tables Practice (Flashcards)
const TablesPractice = ({
  selectedTable,
  practiceIndex,
  setPracticeIndex,
  showAnswer,
  setShowAnswer,
  setLearnMode,
}: {
  selectedTable: number;
  practiceIndex: number;
  setPracticeIndex: (n: number) => void;
  showAnswer: boolean;
  setShowAnswer: (b: boolean) => void;
  setLearnMode: (mode: LearnMode) => void;
}) => {
  const multipliers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const currentMultiplier = multipliers[practiceIndex];
  const answer = selectedTable * currentMultiplier;
  const tableData = tables.find(t => t.number === selectedTable)!;

  const handleNext = () => {
    if (practiceIndex < 9) {
      setPracticeIndex(practiceIndex + 1);
      setShowAnswer(false);
    } else {
      setLearnMode('tables');
      setPracticeIndex(0);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (practiceIndex > 0) {
      setPracticeIndex(practiceIndex - 1);
      setShowAnswer(false);
    }
  };

  return (
    <motion.div
      key="tables-practice"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Practice: Table of {selectedTable}
        </h1>
        <p className="text-gray-400">Tap the card to reveal the answer!</p>
      </div>

      {/* Progress */}
      <div className="flex justify-center gap-2 mb-8">
        {multipliers.map((_, idx) => (
          <motion.div
            key={idx}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === practiceIndex
                ? `bg-gradient-to-r ${tableData.color}`
                : idx < practiceIndex
                ? 'bg-green-500'
                : 'bg-white/20'
            }`}
            animate={idx === practiceIndex ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Flashcard */}
      <motion.div
        onClick={() => setShowAnswer(!showAnswer)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="cursor-pointer perspective-1000 mb-8"
      >
        <motion.div
          className="relative w-full h-72 md:h-80"
          animate={{ rotateY: showAnswer ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front of card */}
          <div
            className={`absolute inset-0 glass-strong rounded-3xl p-8 flex flex-col items-center justify-center backface-hidden bg-gradient-to-br ${tableData.color}/10 border border-white/10`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-6xl md:text-7xl font-bold text-white mb-4">
              {selectedTable} × {currentMultiplier}
            </div>
            <div className="text-gray-400 flex items-center gap-2">
              <span>Tap to reveal</span>
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                👆
              </motion.span>
            </div>
          </div>

          {/* Back of card */}
          <div
            className={`absolute inset-0 glass-strong rounded-3xl p-8 flex flex-col items-center justify-center bg-gradient-to-br ${tableData.color}/20 border-2 border-white/20`}
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="text-sm text-gray-400 mb-2">
              {selectedTable} × {currentMultiplier} =
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`text-8xl md:text-9xl font-bold bg-gradient-to-r ${tableData.color} bg-clip-text text-transparent`}
            >
              {answer}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-2xl"
            >
              ✨
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-center gap-4">
        <motion.button
          onClick={handlePrev}
          disabled={practiceIndex === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 glass rounded-xl text-white font-medium disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </motion.button>

        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-xl text-white font-medium flex items-center gap-2 bg-gradient-to-r ${tableData.color}`}
        >
          {practiceIndex === 9 ? 'Finish' : 'Next'}
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Carry Forward Learning Component
const CarryForwardLearning = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (n: number) => void;
}) => {
  const examples = [
    { num1: 27, num2: 15, steps: ['Step 1: Add ones: 7 + 5 = 12', 'Step 2: Write 2, carry 1 to tens', 'Step 3: Add tens: 2 + 1 + 1(carry) = 4', 'Step 4: Answer is 42!'] },
    { num1: 38, num2: 45, steps: ['Step 1: Add ones: 8 + 5 = 13', 'Step 2: Write 3, carry 1 to tens', 'Step 3: Add tens: 3 + 4 + 1(carry) = 8', 'Step 4: Answer is 83!'] },
    { num1: 56, num2: 28, steps: ['Step 1: Add ones: 6 + 8 = 14', 'Step 2: Write 4, carry 1 to tens', 'Step 3: Add tens: 5 + 2 + 1(carry) = 8', 'Step 4: Answer is 84!'] },
  ];

  const [exampleIndex, setExampleIndex] = useState(0);
  const example = examples[exampleIndex];

  return (
    <motion.div
      key="carry-forward"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Carry Forward <span className="gradient-text">Addition</span>
        </h1>
        <p className="text-gray-400">When adding makes a number bigger than 9, we carry!</p>
      </div>

      {/* Concept Explanation */}
      <div className="glass-strong rounded-3xl p-8 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">What is Carrying?</h3>
            <p className="text-gray-400">
              When you add two digits and get a number <span className="text-blue-400 font-semibold">10 or more</span>, 
              you write down the ones digit and &quot;carry&quot; the tens digit to the next column. 
              It&apos;s like saying &quot;this column is full, let me move some to the next!&quot;
            </p>
          </div>
        </div>

        {/* Visual Example */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Numbers */}
          <div className="text-center">
            <div className="inline-block glass rounded-2xl p-6">
              {/* Carry indicator */}
              <motion.div
                className="text-sm text-blue-400 mb-2 h-6"
                animate={step >= 1 ? { opacity: 1 } : { opacity: 0 }}
              >
                {step >= 2 && <span className="inline-block w-8 text-center">1</span>}
                <span className="inline-block w-8"></span>
              </motion.div>

              {/* First number */}
              <div className="text-5xl font-mono font-bold text-white flex justify-center">
                <motion.span
                  className={`inline-block w-12 text-center ${step >= 2 ? 'text-blue-400' : ''}`}
                >
                  {Math.floor(example.num1 / 10)}
                </motion.span>
                <motion.span
                  className={`inline-block w-12 text-center ${step === 0 ? 'text-yellow-400' : ''}`}
                >
                  {example.num1 % 10}
                </motion.span>
              </div>

              {/* Second number with plus */}
              <div className="text-5xl font-mono font-bold text-white flex justify-center">
                <span className="text-pink-400 mr-2">+</span>
                <motion.span
                  className={`inline-block w-12 text-center ${step >= 2 ? 'text-blue-400' : ''}`}
                >
                  {Math.floor(example.num2 / 10)}
                </motion.span>
                <motion.span
                  className={`inline-block w-12 text-center ${step === 0 ? 'text-yellow-400' : ''}`}
                >
                  {example.num2 % 10}
                </motion.span>
              </div>

              {/* Line */}
              <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded my-4"></div>

              {/* Answer */}
              <div className="text-5xl font-mono font-bold flex justify-center">
                <motion.span
                  className={`inline-block w-12 text-center transition-all ${step >= 3 ? 'text-green-400' : 'text-gray-600'}`}
                >
                  {step >= 3 ? Math.floor((example.num1 + example.num2) / 10) : '?'}
                </motion.span>
                <motion.span
                  className={`inline-block w-12 text-center transition-all ${step >= 1 ? 'text-green-400' : 'text-gray-600'}`}
                >
                  {step >= 1 ? (example.num1 + example.num2) % 10 : '?'}
                </motion.span>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {example.steps.map((stepText, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={idx <= step ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 0 }}
                className={`p-4 rounded-xl transition-all ${
                  idx === step
                    ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30'
                    : idx < step
                    ? 'bg-green-500/10 border border-green-500/20'
                    : 'bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    idx < step ? 'bg-green-500 text-white' : idx === step ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-400'
                  }`}>
                    {idx < step ? '✓' : idx + 1}
                  </div>
                  <span className={`${idx <= step ? 'text-white' : 'text-gray-500'}`}>
                    {stepText}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <motion.button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 glass rounded-xl text-white font-medium disabled:opacity-30 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous Step
          </motion.button>

          {step < 3 ? (
            <motion.button
              onClick={() => setStep(step + 1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-medium flex items-center gap-2"
            >
              Next Step
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          ) : (
            <motion.button
              onClick={() => {
                setExampleIndex((exampleIndex + 1) % examples.length);
                setStep(0);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-medium flex items-center gap-2"
            >
              Try Another
              <Sparkles className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Practice tip */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Remember!</h3>
        <p className="text-gray-400">
          Always start from the <span className="text-yellow-400 font-semibold">right side</span> (ones column) and work your way left. 
          If you get 10 or more, write the ones digit down and carry the 1! 
        </p>
      </div>
    </motion.div>
  );
};

// Comparison Learning Component
const ComparisonLearning = () => {
  const [currentExample, setCurrentExample] = useState(0);

  const examples = [
    { left: 5, right: 8, symbol: '<', explanation: '5 is smaller than 8, so we use < (less than)' },
    { left: 12, right: 7, symbol: '>', explanation: '12 is bigger than 7, so we use > (greater than)' },
    { left: 9, right: 9, symbol: '=', explanation: '9 is the same as 9, so we use = (equal to)' },
    { left: 3, right: 10, symbol: '<', explanation: '3 is smaller than 10, so we use < (less than)' },
    { left: 15, right: 11, symbol: '>', explanation: '15 is bigger than 11, so we use > (greater than)' },
  ];

  const example = examples[currentExample];

  return (
    <motion.div
      key="comparison"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Comparing <span className="gradient-text">Numbers</span>
        </h1>
        <p className="text-gray-400">Learn when to use &lt;, &gt;, and = signs!</p>
      </div>

      {/* Symbol Guide */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { symbol: '<', name: 'Less Than', desc: 'Left is smaller', color: 'from-blue-500 to-cyan-500', emoji: '⬅️' },
          { symbol: '=', name: 'Equal To', desc: 'Both are same', color: 'from-purple-500 to-pink-500', emoji: '🤝' },
          { symbol: '>', name: 'Greater Than', desc: 'Left is bigger', color: 'from-orange-500 to-red-500', emoji: '➡️' },
        ].map((item, idx) => (
          <motion.div
            key={item.symbol}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-strong rounded-2xl p-6 text-center"
          >
            <div className={`text-5xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-2`}>
              {item.symbol}
            </div>
            <h3 className="text-white font-semibold">{item.name}</h3>
            <p className="text-gray-400 text-sm">{item.desc} {item.emoji}</p>
          </motion.div>
        ))}
      </div>

      {/* Tip */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Easy Trick!</h3>
            <p className="text-gray-400">
              The &lt; and &gt; symbols are like an alligator&apos;s mouth - 
              <span className="text-green-400 font-semibold"> the mouth always wants to eat the bigger number!</span> 🐊
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Example */}
      <motion.div
        key={currentExample}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-strong rounded-3xl p-8 mb-8"
      >
        <div className="text-center mb-6">
          <p className="text-gray-400 mb-4">Example {currentExample + 1} of {examples.length}</p>
          
          <div className="flex items-center justify-center gap-6">
            {/* Left number */}
            <motion.div
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center"
              animate={{ scale: example.symbol === '>' ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span className="text-4xl font-bold text-white">{example.left}</span>
            </motion.div>

            {/* Symbol */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="text-6xl font-bold gradient-text"
            >
              {example.symbol}
            </motion.div>

            {/* Right number */}
            <motion.div
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center"
              animate={{ scale: example.symbol === '<' ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span className="text-4xl font-bold text-white">{example.right}</span>
            </motion.div>
          </div>

          {/* Visual representation with dots */}
          <div className="flex justify-center gap-12 mt-8">
            <div className="text-center">
              <div className="flex flex-wrap gap-1 justify-center max-w-32">
                {Array.from({ length: example.left }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="w-4 h-4 rounded-full bg-blue-500"
                  />
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-2">{example.left} dots</p>
            </div>

            <div className="text-center">
              <div className="flex flex-wrap gap-1 justify-center max-w-32">
                {Array.from({ length: example.right }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="w-4 h-4 rounded-full bg-pink-500"
                  />
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-2">{example.right} dots</p>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center p-4 bg-white/5 rounded-xl"
        >
          <p className="text-white text-lg">{example.explanation}</p>
        </motion.div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-center gap-4">
        <motion.button
          onClick={() => setCurrentExample(Math.max(0, currentExample - 1))}
          disabled={currentExample === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 glass rounded-xl text-white font-medium disabled:opacity-30 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </motion.button>

        <motion.button
          onClick={() => setCurrentExample((currentExample + 1) % examples.length)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white font-medium flex items-center gap-2"
        >
          {currentExample === examples.length - 1 ? 'Start Over' : 'Next Example'}
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};
