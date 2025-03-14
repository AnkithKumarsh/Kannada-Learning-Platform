import { Cloud } from "lucide-react";
import { motion } from "framer-motion";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";

export default function Hero({ kannadaLetters }: { kannadaLetters: any[] }) {
  return (
    <>
      {/* Floating Objects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, Math.random() * 0.5 + 0.8, 1],
              rotate: [0, Math.random() * 360, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
          </motion.div>
        ))}
      </div>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="text-center z-10"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className={`text-6xl md:text-8xl font-bold mb-8 text-shadow-lg text-white`}
            animate={{
              textShadow: ['0 0 8px #a855f7', '0 0 15px #a855f7', '0 0 8px #a855f7']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ಕನ್ನಡ ಅಕ್ಷರಮಾಲೆ
          </motion.h1>
          <motion.p
            className={`text-3xl md:text-4xl mb-8 text-white`}
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Let's Learn Kannada Together!
          </motion.p>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.a
              href="#letters"
              className={`text-xl px-8 py-4 rounded-full font-bold bg-white text-purple-600 shadow-lg`}
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(168, 85, 247, 0.7)" }}
              whileTap={{ scale: 0.95 }}
            >
              Start Learning!
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Floating characters animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {kannadaLetters.map((item, index) => (
            <motion.div
              key={`floating-${index}`}
              className="absolute text-4xl md:text-5xl font-bold text-white opacity-20"
              initial={{
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
                rotate: Math.random() * 360
              }}
              animate={{
                x: [
                  typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                  typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                  typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0
                ],
                y: [
                  typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
                  typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
                  typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0
                ],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {item.letter}
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}