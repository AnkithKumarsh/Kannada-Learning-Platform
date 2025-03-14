"use client";

import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from 'canvas-confetti';
import { kannadaVowels } from "@/lib/KannadaLetters";


export default function LearnPage() {
  const [currentLetter, setCurrentLetter] = useState(null);
  const [showExplode, setShowExplode] = useState(false);

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
    <>
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
            
            {kannadaVowels.map((item: any, index: any) => (
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
    </>
  );
}