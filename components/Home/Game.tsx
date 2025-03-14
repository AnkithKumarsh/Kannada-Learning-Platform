import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Game = ({ kannadaLetters }: { kannadaLetters: any[] }) => {
  // Game state
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<any[]>([]);
  const [matched, setMatched] = useState<any[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [difficulty, setDifficulty] = useState('easy'); // easy, medium, hard
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [gameType, setGameType] = useState('letter-sound'); // letter-sound, letter-word

  // Initialize game
  useEffect(() => {
    if (gameStarted) {
      initializeGame();
      setTimerActive(true);
    }
  }, [gameStarted, difficulty, gameType]);

  // Timer logic  
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (timerActive && gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, gameStarted, gameCompleted]);

  // Check for game completion
  useEffect(() => {
    if (matched.length > 0 && matched.length === cards.length / 2) {
      setGameCompleted(true);
      setTimerActive(false);
      
      // Celebrate with confetti
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [matched, cards.length]);

  // Initialize game cards
  const initializeGame = () => {
    // Reset game state
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTimer(0);
    setGameCompleted(false);

    // Determine how many pairs to use based on difficulty
    let pairCount;
    switch (difficulty) {
      case 'easy':
        pairCount = 6;
        break;
      case 'medium':
        pairCount = 10;
        break;
      case 'hard':
        pairCount = 15;
        break;
      default:
        pairCount = 6;
    }

    // Get random letters
    const shuffledLetters = [...kannadaLetters].sort(() => 0.5 - Math.random()).slice(0, pairCount);
    
    // Create card pairs
    const cardPairs = shuffledLetters.flatMap((letter, index) => {
      const pair = [
        {
          id: `card-${index}-a`,
          content: letter.letter,
          type: 'letter',
          matchId: index,
        },
        gameType === 'letter-sound' ? 
        {
          id: `card-${index}-b`,
          content: letter.sound,
          type: 'sound',
          matchId: index,
        } : 
        {
          id: `card-${index}-b`,
          content: letter.word ? letter.word.split('(')[0].trim() : 'Word',
          type: 'word',
          matchId: index,
        }
      ];
      return pair;
    });

    // Shuffle cards
    const shuffledCards = [...cardPairs].sort(() => 0.5 - Math.random());
    setCards(shuffledCards);
  };

  // Handle card click
  const handleCardClick = (id: string) => {
    // Prevent clicking if already 2 cards flipped or already matched
    if (flipped.length === 2 || matched.includes(id) || flipped.includes(id)) return;

    // Add card to flipped cards
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    // Check for match if two cards are flipped
    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard.matchId === secondCard.matchId) {
        // It's a match!
        setMatched([...matched, firstId, secondId]);
        setFlipped([]);
        
        // Play sound for correct match
        const utterance = new SpeechSynthesisUtterance(firstCard.content);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);

        // Small confetti for each match
        confetti({
          particleCount: 50,
          spread: 30,
          origin: { y: 0.6 }
        });
      } else {
        // Not a match, flip back after delay
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  // Format timer display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Start new game
  const startNewGame = () => {
    setGameStarted(true);
    setGameCompleted(false);
  };

  // Restart game
  const restartGame = () => {
    initializeGame();
    setTimerActive(true);
  };

  return (
    <div className="w-full">
      {!gameStarted ? (
        <motion.div
          className="flex flex-col items-center justify-center py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h3 
            className="text-3xl font-bold mb-6 text-white"
            animate={{ 
              scale: [1, 1.05, 1],
              textShadow: [
                "0 0 5px rgba(168, 85, 247, 0.7)",
                "0 0 15px rgba(168, 85, 247, 0.9)",
                "0 0 5px rgba(168, 85, 247, 0.7)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Kannada Matching Game
          </motion.h3>
          
          <motion.div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-white text-lg">Choose Difficulty:</label>
              <div className="flex gap-2">
                {['easy', 'medium', 'hard'].map((level) => (
                  <motion.button
                    key={level}
                    className={`px-4 py-2 rounded-lg ${
                      difficulty === level 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-white/30 text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDifficulty(level)}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-white text-lg">Game Type:</label>
              <div className="flex gap-2">
                {[
                  { id: 'letter-sound', label: 'Letter - Sound' },
                  { id: 'letter-word', label: 'Letter - Word' }
                ].map((type) => (
                  <motion.button
                    key={type.id}
                    className={`px-4 py-2 rounded-lg ${
                      gameType === type.id 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-white/30 text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setGameType(type.id)}
                  >
                    {type.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.button
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(168, 85, 247, 0.7)" }}
            whileTap={{ scale: 0.95 }}
            onClick={startNewGame}
          >
            Start Game
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          {/* Game stats */}
          <div className="flex flex-col md:flex-row justify-between items-center w-full mb-6 gap-4">
            <div className="flex items-center gap-4">
              <motion.div
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white"
                animate={{ scale: moves > 0 && moves % 5 === 0 ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.5 }}
              >
                Moves: {moves}
              </motion.div>
              <motion.div
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white"
                animate={{ scale: timer > 0 && timer % 10 === 0 ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.5 }}
              >
                Time: {formatTime(timer)}
              </motion.div>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.div
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white"
                animate={{ scale: matched.length > 0 && matched.length % 2 === 0 ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.5 }}
              >
                Matched: {matched.length / 2} / {cards.length / 2}
              </motion.div>
              
              <motion.button
                className="bg-purple-600 p-2 rounded-lg text-white flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={restartGame}
              >
                <RefreshCw size={20} />
                Restart
              </motion.button>
            </div>
          </div>
          
          {/* Game board */}
          <motion.div 
            className={`grid grid-cols-3 md:grid-cols-4 lg:grid-cols-${difficulty === 'easy' ? 4 : (difficulty === 'medium' ? 5 : 6)} gap-3 md:gap-4 w-full`}
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { staggerChildren: 0.05 } }
            }}
            initial="initial"
            animate="animate"
          >
            {cards.map((card) => (
              <motion.div
                key={card.id}
                className={`aspect-square cursor-pointer ${
                  matched.includes(card.id) ? 'opacity-50' : ''
                }`}
                variants={{
                  initial: { scale: 0 },
                  animate: { scale: 1 }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCardClick(card.id)}
              >
                <div className="relative w-full h-full">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md ${
                      flipped.includes(card.id) || matched.includes(card.id) ? 'hidden' : ''
                    }`}
                    animate={{ rotateY: flipped.includes(card.id) || matched.includes(card.id) ? 180 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Sparkles className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <motion.div
                    className={`absolute inset-0 bg-white rounded-xl flex items-center justify-center ${
                      flipped.includes(card.id) || matched.includes(card.id) ? '' : 'hidden'
                    }`}
                    animate={{ rotateY: flipped.includes(card.id) || matched.includes(card.id) ? 0 : 180 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className={`text-center ${card.type === 'letter' ? 'text-5xl font-bold text-purple-600' : 'text-lg font-medium text-gray-700'}`}>
                      {card.content}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Game completion popup */}
          {gameCompleted && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="bg-white rounded-3xl p-8 max-w-md w-full"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 10, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Trophy className="w-20 h-20 text-yellow-500" />
                    </motion.div>
                  
                  <h3 className="text-3xl font-bold mt-4 mb-2 text-purple-600">Congratulations!</h3>
                  <p className="text-xl text-gray-700 mb-6 text-center">
                    You completed the game in {moves} moves and {formatTime(timer)}!
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <motion.button
                      className="py-3 px-6 rounded-xl bg-purple-600 text-white font-bold text-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setGameCompleted(false);
                        restartGame();
                      }}
                    >
                      Play Again
                    </motion.button>
                    
                    <motion.button
                      className="py-3 px-6 rounded-xl border-2 border-purple-600 text-purple-600 font-bold text-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setGameStarted(false);
                        setGameCompleted(false);
                      }}
                    >
                      New Game
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

// Instructions component
export const GameInstructions = () => {
  return (
    <motion.div
      className="max-w-4xl mx-auto mt-12 p-6 rounded-xl bg-white/10 backdrop-blur-sm text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-2xl font-bold mb-4">How to Play</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>Click on any card to flip it over and reveal what's underneath.</li>
        <li>Flip a second card to find its matching pair.</li>
        <li>If the cards match, they will stay face up.</li>
        <li>If they don't match, they will flip back over.</li>
        <li>Match all the card pairs to complete the game!</li>
        <li>Choose between matching Kannada letters to their sounds or to Kannada words.</li>
        <li>Challenge yourself with different difficulty levels.</li>
      </ul>
    </motion.div>
  );
};
