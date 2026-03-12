import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MysticalMode = ({ mysticalMode, setMysticalMode }) => {
  const toggleMysticalMode = () => {
    setMysticalMode(!mysticalMode);
  };
  
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={toggleMysticalMode}
        variant="outline"
        size="icon"
        className={`bg-white/80 rounded-full w-10 h-10 md:w-12 md:h-12 relative overflow-hidden transition-all duration-300
          ${mysticalMode 
            ? 'border-2 border-purple-400 shadow-lg shadow-purple-500/50' 
            : 'border-2 border-purple-300 hover:bg-purple-50'
          }
        `}
        title="Toggle Mystical Mode"
      >
        <Sparkles className={`w-5 h-5 md:w-6 md:h-6 text-purple-600 transition-transform duration-500 ${mysticalMode ? 'animate-spin' : ''}`} />
        {mysticalMode && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        )}
      </Button>
    </motion.div>
  );
};

export default MysticalMode;