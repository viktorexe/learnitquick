import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type GameMode = 
  | 'tables' 
  | 'comparison' 
  | 'addition' 
  | 'subtraction' 
  | 'multiplication'
  | 'carry-addition'
  | 'counting'
  | 'number-sequence';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  correctAnswers: number;
  isBot: boolean;
  rank?: number;
}

export interface Question {
  id: string;
  question: string;
  options: (string | number)[];
  correctAnswer: string | number;
  type: GameMode;
  points: number;
}

export interface GameState {
  // User state
  playerName: string;
  playerAvatar: string;
  totalCoins: number;
  gamesPlayed: number;
  totalCorrect: number;
  
  // Current game state
  currentScreen: 'home' | 'subjects' | 'math-menu' | 'game' | 'results' | 'learn';
  currentGameMode: GameMode | null;
  currentDifficulty: Difficulty;
  currentQuestion: number;
  questions: Question[];
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  coinsEarned: number;
  streak: number;
  maxStreak: number;
  timeRemaining: number;
  isGameActive: boolean;
  
  // Multiplayer simulation
  players: Player[];
  matchId: string;
  
  // Achievements
  achievements: string[];
  
  // Actions
  setPlayerName: (name: string) => void;
  setPlayerAvatar: (avatar: string) => void;
  setCurrentScreen: (screen: GameState['currentScreen']) => void;
  startGame: (mode: GameMode, difficulty: Difficulty) => void;
  answerQuestion: (answer: string | number) => boolean;
  nextQuestion: () => void;
  endGame: () => void;
  resetGame: () => void;
  addCoins: (amount: number) => void;
  updateBotScores: () => void;
  setQuestions: (questions: Question[]) => void;
}

// Bot names and avatars for fake multiplayer
const botNames = [
  'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Quinn', 'Avery',
  'Charlie', 'Skyler', 'Jamie', 'Drew', 'Sage', 'River', 'Phoenix', 'Blake',
  'Hayden', 'Dakota', 'Reese', 'Finley', 'Emerson', 'Rowan', 'Parker', 'Sawyer'
];

const avatars = ['🦁', '🐯', '🐻', '🐼', '🐨', '🦊', '🐰', '🐸', '🦄', '🐲', '🦋', '🌟'];

const generateBots = (count: number): Player[] => {
  const shuffledNames = [...botNames].sort(() => Math.random() - 0.5);
  return shuffledNames.slice(0, count).map((name, index) => ({
    id: `bot-${index}`,
    name,
    avatar: avatars[Math.floor(Math.random() * avatars.length)],
    score: 0,
    correctAnswers: 0,
    isBot: true,
  }));
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial user state
      playerName: '',
      playerAvatar: '🚀',
      totalCoins: 0,
      gamesPlayed: 0,
      totalCorrect: 0,
      
      // Initial game state
      currentScreen: 'home',
      currentGameMode: null,
      currentDifficulty: 'easy',
      currentQuestion: 0,
      questions: [],
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      coinsEarned: 0,
      streak: 0,
      maxStreak: 0,
      timeRemaining: 0,
      isGameActive: false,
      
      // Multiplayer
      players: [],
      matchId: '',
      
      // Achievements
      achievements: [],
      
      // Actions
      setPlayerName: (name) => set({ playerName: name }),
      setPlayerAvatar: (avatar) => set({ playerAvatar: avatar }),
      
      setCurrentScreen: (screen) => set({ currentScreen: screen }),
      
      startGame: (mode, difficulty) => {
        const bots = generateBots(7);
        const state = get();
        
        set({
          currentGameMode: mode,
          currentDifficulty: difficulty,
          currentQuestion: 0,
          score: 0,
          correctAnswers: 0,
          wrongAnswers: 0,
          coinsEarned: 0,
          streak: 0,
          maxStreak: 0,
          isGameActive: true,
          currentScreen: 'game',
          matchId: `match-${Date.now()}`,
          players: [
            {
              id: 'player',
              name: state.playerName || 'You',
              avatar: state.playerAvatar,
              score: 0,
              correctAnswers: 0,
              isBot: false,
            },
            ...bots,
          ],
        });
      },
      
      answerQuestion: (answer) => {
        const state = get();
        const currentQ = state.questions[state.currentQuestion];
        
        if (!currentQ) return false;
        
        const isCorrect = String(answer) === String(currentQ.correctAnswer);
        
        if (isCorrect) {
          const streakBonus = Math.floor(state.streak / 3) * 2;
          const coinsForQuestion = 10 + streakBonus;
          
          set((state) => ({
            score: state.score + currentQ.points,
            correctAnswers: state.correctAnswers + 1,
            coinsEarned: state.coinsEarned + coinsForQuestion,
            streak: state.streak + 1,
            maxStreak: Math.max(state.maxStreak, state.streak + 1),
            players: state.players.map((p) =>
              p.id === 'player'
                ? { ...p, score: p.score + currentQ.points, correctAnswers: p.correctAnswers + 1 }
                : p
            ),
          }));
        } else {
          set((state) => ({
            wrongAnswers: state.wrongAnswers + 1,
            streak: 0,
            players: state.players.map((p) =>
              p.id === 'player' ? { ...p } : p
            ),
          }));
        }
        
        return isCorrect;
      },
      
      nextQuestion: () => {
        set((state) => ({
          currentQuestion: state.currentQuestion + 1,
        }));
      },
      
      updateBotScores: () => {
        set((state) => ({
          players: state.players.map((p) => {
            if (p.isBot) {
              // Bots have varying skill levels
              const skill = 0.4 + Math.random() * 0.5;
              const gotCorrect = Math.random() < skill;
              
              if (gotCorrect) {
                const points = 10 + Math.floor(Math.random() * 5);
                return {
                  ...p,
                  score: p.score + points,
                  correctAnswers: p.correctAnswers + 1,
                };
              }
            }
            return p;
          }),
        }));
      },
      
      endGame: () => {
        const state = get();
        
        // Calculate final rankings
        const sortedPlayers = [...state.players].sort((a, b) => b.score - a.score);
        const rankedPlayers = sortedPlayers.map((p, index) => ({ ...p, rank: index + 1 }));
        
        set((state) => ({
          isGameActive: false,
          currentScreen: 'results',
          totalCoins: state.totalCoins + state.coinsEarned,
          gamesPlayed: state.gamesPlayed + 1,
          totalCorrect: state.totalCorrect + state.correctAnswers,
          players: rankedPlayers,
        }));
      },
      
      resetGame: () => {
        set({
          currentGameMode: null,
          currentQuestion: 0,
          questions: [],
          score: 0,
          correctAnswers: 0,
          wrongAnswers: 0,
          coinsEarned: 0,
          streak: 0,
          maxStreak: 0,
          isGameActive: false,
          players: [],
          matchId: '',
        });
      },
      
      addCoins: (amount) => {
        set((state) => ({
          totalCoins: state.totalCoins + amount,
        }));
      },
      
      setQuestions: (questions) => set({ questions }),
    }),
    {
      name: 'learnitquick-storage',
      partialize: (state) => ({
        playerName: state.playerName,
        playerAvatar: state.playerAvatar,
        totalCoins: state.totalCoins,
        gamesPlayed: state.gamesPlayed,
        totalCorrect: state.totalCorrect,
        achievements: state.achievements,
      }),
    }
  )
);
