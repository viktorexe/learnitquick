import { Question, GameMode, Difficulty } from '@/store/gameStore';

const generateId = () => Math.random().toString(36).substring(2, 9);

// Shuffle array helper
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate wrong answers that are close to the correct answer
const generateWrongAnswers = (correct: number, count: number): number[] => {
  const wrong: number[] = [];
  const offsets = [-3, -2, -1, 1, 2, 3, -5, 5, -10, 10];
  
  while (wrong.length < count) {
    const offset = offsets[Math.floor(Math.random() * offsets.length)];
    const wrongAnswer = correct + offset;
    if (wrongAnswer > 0 && !wrong.includes(wrongAnswer) && wrongAnswer !== correct) {
      wrong.push(wrongAnswer);
    }
  }
  
  return wrong;
};

// Tables questions (multiplication tables 1-10)
const generateTablesQuestions = (difficulty: Difficulty, count: number): Question[] => {
  const questions: Question[] = [];
  const maxTable = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 7 : 10;
  const maxMultiplier = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 7 : 10;
  
  for (let i = 0; i < count; i++) {
    const table = Math.floor(Math.random() * maxTable) + 1;
    const multiplier = Math.floor(Math.random() * maxMultiplier) + 1;
    const answer = table * multiplier;
    const wrongAnswers = generateWrongAnswers(answer, 3);
    
    questions.push({
      id: generateId(),
      question: `${table} × ${multiplier} = ?`,
      options: shuffleArray([answer, ...wrongAnswers]),
      correctAnswer: answer,
      type: 'tables',
      points: 10,
    });
  }
  
  return questions;
};

// Comparison questions (< = >)
const generateComparisonQuestions = (difficulty: Difficulty, count: number): Question[] => {
  const questions: Question[] = [];
  const maxNum = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 50 : 100;
  
  for (let i = 0; i < count; i++) {
    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;
    
    let correctAnswer: string;
    if (num1 < num2) correctAnswer = '<';
    else if (num1 > num2) correctAnswer = '>';
    else correctAnswer = '=';
    
    questions.push({
      id: generateId(),
      question: `${num1} __ ${num2}`,
      options: ['<', '=', '>'],
      correctAnswer,
      type: 'comparison',
      points: 10,
    });
  }
  
  return questions;
};

// Addition questions
const generateAdditionQuestions = (difficulty: Difficulty, count: number): Question[] => {
  const questions: Question[] = [];
  const maxNum = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 50;
  
  for (let i = 0; i < count; i++) {
    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;
    const answer = num1 + num2;
    const wrongAnswers = generateWrongAnswers(answer, 3);
    
    questions.push({
      id: generateId(),
      question: `${num1} + ${num2} = ?`,
      options: shuffleArray([answer, ...wrongAnswers]),
      correctAnswer: answer,
      type: 'addition',
      points: 10,
    });
  }
  
  return questions;
};

// Subtraction questions
const generateSubtractionQuestions = (difficulty: Difficulty, count: number): Question[] => {
  const questions: Question[] = [];
  const maxNum = difficulty === 'easy' ? 15 : difficulty === 'medium' ? 30 : 50;
  
  for (let i = 0; i < count; i++) {
    // Ensure no negative answers
    let num1 = Math.floor(Math.random() * maxNum) + 5;
    let num2 = Math.floor(Math.random() * num1) + 1;
    
    const answer = num1 - num2;
    const wrongAnswers = generateWrongAnswers(answer, 3).map(n => Math.max(0, n));
    
    questions.push({
      id: generateId(),
      question: `${num1} − ${num2} = ?`,
      options: shuffleArray([answer, ...wrongAnswers.slice(0, 3)]),
      correctAnswer: answer,
      type: 'subtraction',
      points: 10,
    });
  }
  
  return questions;
};

// Simple multiplication (not tables, but word problems style)
const generateMultiplicationQuestions = (difficulty: Difficulty, count: number): Question[] => {
  const questions: Question[] = [];
  const maxNum = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 7 : 10;
  
  const scenarios = [
    { template: (a: number, b: number) => `If you have ${a} bags with ${b} apples each, how many apples do you have?`, emoji: '🍎' },
    { template: (a: number, b: number) => `${a} friends each have ${b} candies. Total candies?`, emoji: '🍬' },
    { template: (a: number, b: number) => `${a} boxes × ${b} toys = ?`, emoji: '🧸' },
    { template: (a: number, b: number) => `There are ${a} rows with ${b} stars each. Total stars?`, emoji: '⭐' },
    { template: (a: number, b: number) => `${a} groups of ${b} = ?`, emoji: '👥' },
  ];
  
  for (let i = 0; i < count; i++) {
    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;
    const answer = num1 * num2;
    const wrongAnswers = generateWrongAnswers(answer, 3);
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    questions.push({
      id: generateId(),
      question: scenario.template(num1, num2),
      options: shuffleArray([answer, ...wrongAnswers]),
      correctAnswer: answer,
      type: 'multiplication',
      points: 10,
    });
  }
  
  return questions;
};

// Carry forward addition (with carrying)
const generateCarryAdditionQuestions = (difficulty: Difficulty, count: number): Question[] => {
  const questions: Question[] = [];
  
  for (let i = 0; i < count; i++) {
    let num1: number, num2: number;
    
    if (difficulty === 'easy') {
      // Two digit + single digit with carry
      num1 = Math.floor(Math.random() * 40) + 15;
      num2 = Math.floor(Math.random() * 9) + (10 - (num1 % 10)); // Ensure carry
    } else if (difficulty === 'medium') {
      // Two digit + two digit with carry
      num1 = Math.floor(Math.random() * 50) + 20;
      num2 = Math.floor(Math.random() * 50) + 20;
    } else {
      // Larger numbers
      num1 = Math.floor(Math.random() * 100) + 50;
      num2 = Math.floor(Math.random() * 100) + 50;
    }
    
    const answer = num1 + num2;
    const wrongAnswers = generateWrongAnswers(answer, 3);
    
    questions.push({
      id: generateId(),
      question: `${num1} + ${num2} = ?`,
      options: shuffleArray([answer, ...wrongAnswers]),
      correctAnswer: answer,
      type: 'carry-addition',
      points: 12, // Slightly more points for harder questions
    });
  }
  
  return questions;
};

// Counting questions
const generateCountingQuestions = (difficulty: Difficulty, count: number): Question[] => {
  const questions: Question[] = [];
  const emojis = ['🍎', '⭐', '🎈', '🌸', '🐱', '🐶', '🎁', '🌈', '🚀', '🎪'];
  
  for (let i = 0; i < count; i++) {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const maxCount = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20;
    const answer = Math.floor(Math.random() * maxCount) + 3;
    const display = Array(answer).fill(emoji).join(' ');
    const wrongAnswers = generateWrongAnswers(answer, 3).filter(n => n > 0);
    
    questions.push({
      id: generateId(),
      question: `Count: ${display}`,
      options: shuffleArray([answer, ...wrongAnswers.slice(0, 3)]),
      correctAnswer: answer,
      type: 'counting',
      points: 10,
    });
  }
  
  return questions;
};

// Number sequence (what comes next)
const generateNumberSequenceQuestions = (difficulty: Difficulty, count: number): Question[] => {
  const questions: Question[] = [];
  
  for (let i = 0; i < count; i++) {
    const step = difficulty === 'easy' ? 1 : difficulty === 'medium' ? Math.floor(Math.random() * 2) + 1 : Math.floor(Math.random() * 3) + 2;
    const start = Math.floor(Math.random() * 20) + 1;
    const sequence = [start, start + step, start + step * 2, start + step * 3];
    const answer = start + step * 4;
    const wrongAnswers = generateWrongAnswers(answer, 3);
    
    questions.push({
      id: generateId(),
      question: `What comes next? ${sequence.join(', ')}, ?`,
      options: shuffleArray([answer, ...wrongAnswers]),
      correctAnswer: answer,
      type: 'number-sequence',
      points: 10,
    });
  }
  
  return questions;
};

// Main generator function
export const generateQuestions = (mode: GameMode, difficulty: Difficulty, count: number = 10): Question[] => {
  switch (mode) {
    case 'tables':
      return generateTablesQuestions(difficulty, count);
    case 'comparison':
      return generateComparisonQuestions(difficulty, count);
    case 'addition':
      return generateAdditionQuestions(difficulty, count);
    case 'subtraction':
      return generateSubtractionQuestions(difficulty, count);
    case 'multiplication':
      return generateMultiplicationQuestions(difficulty, count);
    case 'carry-addition':
      return generateCarryAdditionQuestions(difficulty, count);
    case 'counting':
      return generateCountingQuestions(difficulty, count);
    case 'number-sequence':
      return generateNumberSequenceQuestions(difficulty, count);
    default:
      return generateAdditionQuestions(difficulty, count);
  }
};

// Get mode display info
export const getModeInfo = (mode: GameMode): { title: string; icon: string; color: string; description: string } => {
  const modes: Record<GameMode, { title: string; icon: string; color: string; description: string }> = {
    tables: {
      title: 'Times Tables',
      icon: '✖️',
      color: 'from-violet-500 to-purple-600',
      description: 'Master multiplication tables 1-10',
    },
    comparison: {
      title: 'Compare Numbers',
      icon: '⚖️',
      color: 'from-blue-500 to-cyan-600',
      description: 'Learn less than, greater than, equal',
    },
    addition: {
      title: 'Addition',
      icon: '➕',
      color: 'from-green-500 to-emerald-600',
      description: 'Practice adding numbers',
    },
    subtraction: {
      title: 'Subtraction',
      icon: '➖',
      color: 'from-orange-500 to-amber-600',
      description: 'Practice taking away numbers',
    },
    multiplication: {
      title: 'Word Problems',
      icon: '🧮',
      color: 'from-pink-500 to-rose-600',
      description: 'Solve fun multiplication stories',
    },
    'carry-addition': {
      title: 'Carry Forward',
      icon: '🔢',
      color: 'from-indigo-500 to-blue-600',
      description: 'Addition with carrying over',
    },
    counting: {
      title: 'Counting',
      icon: '🔢',
      color: 'from-teal-500 to-green-600',
      description: 'Count objects and find totals',
    },
    'number-sequence': {
      title: 'Number Patterns',
      icon: '📊',
      color: 'from-fuchsia-500 to-pink-600',
      description: 'Find the missing number',
    },
  };
  
  return modes[mode];
};
