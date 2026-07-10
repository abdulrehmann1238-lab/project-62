import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

const words = ["TRAIN", "RECOVER", "PERFORM", "TRANSFORM"];
const percentages = [0, 12, 28, 51, 76, 100];

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [percentIndex, setPercentIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Percentage counter progression
  useEffect(() => {
    if (percentIndex < percentages.length - 1) {
      const target = percentages[percentIndex + 1];
      const duration = 500; // time to step
      const stepTime = Math.max(Math.floor(duration / (target - percentages[percentIndex])), 15);
      
      let current = percentages[percentIndex];
      const timer = setInterval(() => {
        current += 1;
        setPercentage(current);
        if (current >= target) {
          clearInterval(timer);
          setPercentIndex(prev => prev + 1);
        }
      }, stepTime);
      return () => clearInterval(timer);
    } else if (!isFinished) {
      // Allow the 100% state to linger for visual resolution
      const finishTimer = setTimeout(() => {
        setIsFinished(true);
        const exitTimer = setTimeout(() => {
          onComplete();
        }, 1200); // Wait for mask and scale animations to complete
        return () => clearTimeout(exitTimer);
      }, 600);
      return () => clearTimeout(finishTimer);
    }
  }, [percentIndex, onComplete, isFinished]);

  // Words rotation
  useEffect(() => {
    const wordTimer = setInterval(() => {
      setWordIndex(prev => (prev + 1) % words.length);
    }, 800);
    return () => clearInterval(wordTimer);
  }, []);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF8F5] overflow-hidden"
          exit={{
            clipPath: 'circle(0% at 50% 50%)',
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Subtle luxurious background image fade-in */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center opacity-[0.03] scale-[1.05]"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200')` 
            }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 3, ease: 'easeOut' }}
          />

          {/* Luxury Floating Dust Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-gold/20"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, -100],
                  x: [0, (Math.random() - 0.5) * 40],
                  opacity: [0, 0.4, 0],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center justify-center z-10 w-full max-w-md px-6">
            
            {/* Logo Emblem Drawing (SVG) */}
            <div className="relative w-32 h-32 mb-8">
              <svg viewBox="0 0 100 100" className="w-full h-full text-gold">
                {/* Thin outer geometric luxury circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="283"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                
                {/* Inner Crest Shape: Intersecting Luxury Arch / Letter A */}
                <motion.path
                  d="M50 18 L25 80 L35 80 L50 38 L65 80 L75 80 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  strokeDasharray="300"
                  initial={{ strokeDashoffset: 300 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
                />
                
                {/* Intersecting horizontal horizon line representing balance/wellness */}
                <motion.line
                  x1="15"
                  y1="58"
                  x2="85"
                  y2="58"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, ease: "easeInOut", delay: 0.6 }}
                />
              </svg>
            </div>

            {/* Brand Letter-by-Letter Reveal */}
            <h1 className="font-serif text-3xl tracking-[0.4em] text-charcoal mb-2 select-none flex items-center justify-center pl-[0.4em]">
              {"AURELIA".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              className="text-[10px] tracking-[0.6em] text-gold uppercase pl-[0.6em] mb-12 select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
            >
              wellness ecosystem
            </motion.p>

            {/* Gold Divider Line Drawing */}
            <div className="relative w-48 h-[1px] bg-gold/10 mb-8 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gold"
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }}
              />
            </div>

            {/* Rotating Concept Words */}
            <div className="h-6 flex items-center justify-center overflow-hidden mb-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[wordIndex]}
                  className="font-sans text-[11px] tracking-[0.5em] text-charcoal/60 uppercase select-none"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* High-End Percentage counter */}
            <div className="font-serif text-2xl font-light tracking-widest text-gold select-none">
              {percentage}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
