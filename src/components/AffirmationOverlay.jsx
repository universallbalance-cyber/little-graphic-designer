import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const affirmations = [
  "You're creating magic! ✨",
  "Your creativity is amazing! 🌟",
  "Beautiful colors! Keep going! 🎨",
  "You're an artist! 🖌️",
  "This is wonderful! 💖",
  "Your imagination is limitless! 🌈",
  "Keep shining bright! ⭐",
  "You're doing great! 🎉",
];

const AffirmationOverlay = () => {
  const [affirmation] = useState(() => 
    affirmations[Math.floor(Math.random() * affirmations.length)]
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.8 }}
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
      >
        <div className="affirmation-text bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full shadow-2xl text-2xl font-bold">
          {affirmation}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AffirmationOverlay;