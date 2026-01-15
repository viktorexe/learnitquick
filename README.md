# 🎮 LearnItQuick - Educational Math Games for Kids

A beautiful, interactive educational quiz game designed for first graders. Features a premium, modern UI with gamification elements to make learning math fun!

## ✨ Features

### 🎯 Math Practice Modes
- **Times Tables** - Master multiplication tables 1-10
- **Compare Numbers** - Learn less than, greater than, equal (< = >)
- **Addition** - Practice adding numbers
- **Subtraction** - Practice taking away numbers  
- **Word Problems** - Fun multiplication story problems
- **Carry Forward Addition** - Addition with carrying over
- **Counting** - Count objects and find totals
- **Number Patterns** - Find the missing number in sequences

### 🎮 Gamification
- **Coin System** - Earn 10 coins for each correct answer
- **Streak Bonuses** - Build streaks for extra coins
- **Fake Multiplayer** - Compete against AI players in real-time
- **Live Rankings** - See your position on the leaderboard
- **Celebration Animations** - Confetti and sounds for achievements

### 🎨 Premium UI/UX
- Modern glassmorphism design
- Smooth Framer Motion animations
- Responsive design for all devices
- Dark mode optimized
- Sound effects for feedback
- Particle effects and animated backgrounds

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd learnitquick

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy!

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## 🛠 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles & animations
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main page
├── components/
│   ├── AnimatedBackground.tsx
│   ├── GameApp.tsx      # Main app orchestrator
│   ├── GameScreen.tsx   # Quiz gameplay
│   ├── HomeScreen.tsx   # Welcome & subject selection
│   ├── MathMenu.tsx     # Math game modes
│   └── ResultsScreen.tsx # Game results & rankings
├── store/
│   └── gameStore.ts     # Zustand state management
└── utils/
    ├── questionGenerator.ts # Question generation logic
    └── sounds.ts           # Sound effects manager
```

## 🎓 Educational Features

- **Adaptive Difficulty**: Easy, Medium, and Hard modes
- **Immediate Feedback**: Visual and audio cues for correct/incorrect answers
- **Progress Tracking**: Coins, games played, and accuracy stats
- **Learning Focus**: Questions designed for 1st grade curriculum

## 📝 License

MIT License - feel free to use for educational purposes!

---

Made with ❤️ for young learners
