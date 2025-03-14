"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Stars, BookOpen, Music, Palette, Award, Moon, Sun, Cloud } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Game } from '@/components/Home/Game';
import Hero from '@/components/Home/Hero';

const kannadaLetters = [
  // Vowels (ಸ್ವರಗಳು)
  { letter: 'ಅ', color: 'bg-gradient-to-br from-purple-500 to-indigo-500', sound: 'a', animal: '🐘', word: 'ಅನೆ (ane - elephant)' },
  { letter: 'ಆ', color: 'bg-gradient-to-br from-pink-500 to-red-500', sound: 'aa', animal: '🐒', word: 'ಆನೆ (aane - monkey)' },
  { letter: 'ಇ', color: 'bg-gradient-to-br from-blue-500 to-cyan-500', sound: 'i', animal: '🐁', word: 'ಇಲಿ (ili - mouse)' },
  { letter: 'ಈ', color: 'bg-gradient-to-br from-green-500 to-emerald-500', sound: 'ee', animal: '🪰', word: 'ಈಗ (eega - fly)' },
  { letter: 'ಉ', color: 'bg-gradient-to-br from-yellow-500 to-amber-500', sound: 'u', animal: '🐫', word: 'ಉಂಟೆ (unte - camel)' },
  { letter: 'ಊ', color: 'bg-gradient-to-br from-orange-500 to-red-500', sound: 'oo', animal: '🦉', word: 'ಊಟ (oota - food)' },
  { letter: 'ಋ', color: 'bg-gradient-to-br from-purple-500 to-violet-500', sound: 'ru', animal: '🦊', word: 'ಋಷಿ (rushi - sage)' },
  { letter: 'ಎ', color: 'bg-gradient-to-br from-blue-500 to-cyan-500', sound: 'e', animal: '🐀', word: 'ಎಲಿ (eli - rat)' },
  { letter: 'ಏ', color: 'bg-gradient-to-br from-green-500 to-emerald-500', sound: 'ae', animal: '🧠', word: 'ಏಕೆ (yeke - why)' },
  { letter: 'ಐ', color: 'bg-gradient-to-br from-yellow-500 to-amber-500', sound: 'ai', animal: '🦅', word: 'ಐದು (aidu - five)' },
  { letter: 'ಒ', color: 'bg-gradient-to-br from-orange-500 to-red-500', sound: 'o', animal: '1️⃣', word: 'ಒಂದು (ondu - one)' },
  { letter: 'ಓ', color: 'bg-gradient-to-br from-purple-500 to-indigo-500', sound: 'o', animal: '📖', word: 'ಓದು (odu - read)' },
  { letter: 'ಔ', color: 'bg-gradient-to-br from-pink-500 to-red-500', sound: 'au', animal: '🤝', word: 'ಔಷಧ (aushadha - medicine)' },
  { letter: 'ಅಂ', color: 'bg-gradient-to-br from-purple-500 to-indigo-500', sound: 'am', animal: '🦢', word: 'ಅಂಗಡಿ (angadi - shop)' },
];

export default function Home() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [showExplode, setShowExplode] = useState(false);
  const [currentLetter, setCurrentLetter] = useState(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const letterVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: {
      scale: 1.1,
      y: [0, -15, 0],
      transition: {
        y: {
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse"
        }
      }
    },
    tap: {
      scale: 0.95,
      rotate: [0, 10, -10, 10, 0],
      transition: { duration: 0.4 }
    }
  };

  const handleLetterClick = (letter: any) => {
    setCurrentLetter(letter);
    setShowExplode(true);

    // Play sound
    const utterance = new SpeechSynthesisUtterance(letter.sound);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => setShowExplode(false), 2000);
  };
 

  return (
      <main className={`min-h-screen transition-all duration-1000 ease-in-out bg-gradient-to-b from-purple-400 via-pink-300 to-yellow-200`}>

      <Hero kannadaLetters={kannadaLetters} />

      {/* Kannada Letters Section */}
      <section id="letters" className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className={`text-4xl md:text-5xl font-bold text-center mb-16 text-shadow-lg text-purple-300`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let's Start with These Letters!
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {kannadaLetters.map((item: any, index: any) => (
              <motion.div
                key={index}
                className={`aspect-square rounded-3xl ${item.color} p-8 flex flex-col items-center justify-center cursor-pointer shadow-xl relative overflow-hidden`}
                variants={letterVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                transition={{
                  duration: 0.5,
                  delay: index * 0.1
                }}
                onClick={() => handleLetterClick(item)}
              >
                <motion.div
                  className="absolute inset-0 bg-white opacity-0"
                  animate={showExplode && currentLetter === item ? {
                    scale: [1, 3],
                    opacity: [0, 0.2, 0]
                  } : {}}
                  transition={{ duration: 0.8 }}
                />

                <motion.span
                  className="text-8xl md:text-9xl font-bold text-white text-shadow-lg"
                  animate={currentLetter === item ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, -5, 5, -5, 0]
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {item.letter}
                </motion.span>

                <motion.div
                  className="absolute bottom-4 text-white text-xl font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  [{item.sound}]
                </motion.div>

                <AnimatePresence>
                  {currentLetter === item && (
                    <motion.div
                      className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col items-center justify-center z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="text-6xl"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {item?.animal || 'Default Animal'}
                      </motion.div>
                      <motion.div
                        className="text-xl text-white text-center mt-4 px-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {item?.word || 'Default Word'}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className={`text-4xl md:text-5xl font-bold text-center mb-16 text-shadow-lg text-purple-300`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Learning Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BookOpen className="w-16 h-16" />,
                title: "Interactive Learning",
                description: "Learn through fun animations and games"
              },
              {
                icon: <Music className="w-16 h-16" />,
                title: "Audio Support",
                description: "Hear the correct pronunciation"
              },
              {
                icon: <Palette className="w-16 h-16" />,
                title: "Colorful Experience",
                description: "Engaging visuals for better learning"
              },
              {
                icon: <Award className="w-16 h-16" />,
                title: "Achievement Rewards",
                description: "Earn stars as you learn"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`bg-white/90 backdrop-blur-lg rounded-3xl p-8 transform transition-all duration-500 shadow-xl`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 20px rgba(147, 51, 234, 0.5)"
                }}
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className={`mb-6 text-purple-600`}
                    animate={{
                      rotate: [0, 10, -10, 10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className={`text-2xl font-bold mb-4 text-gray-800`}>
                    {feature.title}
                  </h3>
                  <p className={`text-xl text-gray-600`}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Game Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className={`text-4xl md:text-5xl font-bold text-center mb-16 text-shadow-lg text-purple-300`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Fun Matching Game
          </motion.h2>

          {/* Game Component */}
          <Game kannadaLetters={kannadaLetters} />
        </div>
      </section>

      {/* Progress Tracker */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className={`text-4xl md:text-5xl font-bold text-center mb-16 text-shadow-lg text-purple-300`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Track Your Progress
          </motion.h2>

          <motion.div
            className={`bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center">
              <motion.div
                className="flex items-center justify-center mb-8"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      strokeWidth="8"
                      stroke="#e9d5ff"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      strokeWidth="8"
                      stroke="#a855f7"
                      strokeLinecap="round"
                      strokeDasharray="251.2"
                      strokeDashoffset="251.2"
                      animate={{ strokeDashoffset: 125.6 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </svg>
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center text-5xl font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                  >
                    <span className="text-purple-600">50%</span>
                  </motion.div>
                </div>
              </motion.div>

              <h3 className={`text-2xl font-bold mb-4 text-purple-600`}>
                You're Halfway There!
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 w-full">
                {kannadaLetters.map((item, index) => (
                  <motion.div
                    key={`progress-${index}`}
                    className={`rounded-lg p-4 flex items-center justify-center ${index < 3 ? 'bg-green-500/20' : 'bg-gray-300/20'
                      }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className={`text-2xl font-bold ${index < 3 ? 'text-green-600' : 'text-gray-500'}`}>
                      {item.letter}
                    </span>
                    {index < 3 && (
                      <motion.span
                        className="ml-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        ✅
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.p
            className={`text-lg text-purple-300`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Made with ❤️ for Kannada Learning
          </motion.p>
        </div>
      </footer>

      {/* Floating Bubbles Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full mix-blend-multiply filter blur-xl"
            style={{
              backgroundColor: `hsla(${Math.random() * 50 + 300}, 70%, 75%, 0.3)`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, Math.random() * 0.5 + 0.8, 1],
            }}
            initial={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
    </main>
  );
}