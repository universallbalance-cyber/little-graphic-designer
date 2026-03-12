import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, BookOpen } from 'lucide-react';
import MusicPlayer from '@/components/MusicPlayer';
import Instructions from '@/components/Instructions';
import { coloringPagesData } from '@/components/PageSelector';

const categories = [
  { id: 'animals', name: 'Animals', image: coloringPagesData.animals[0].imageUrl, gradient: 'from-green-400 to-blue-500' },
  { id: 'baby dinosaur', name: 'Baby Dinosaurs', image: coloringPagesData['baby dinosaur'][0].imageUrl, gradient: 'from-pink-500 to-purple-600' },
  { id: 'CuteAnimals', name: 'Cute Animals', image: coloringPagesData.CuteAnimals[0].imageUrl, gradient: 'from-yellow-400 to-orange-500' },
  { id: 'fruit', name: 'Fruit', image: coloringPagesData.fruit[0].imageUrl, gradient: 'from-red-500 to-yellow-500' },
];

const StartupPage = ({ 
    onStart, 
    musicVolume, 
    setMusicVolume,
    currentSong,
    isPlaying,
    onPlayPause,
    onNextSong,
    onPrevSong
}) => {
  const [showInstructions, setShowInstructions] = useState(false);
  
  return (
    <div className="h-full w-full flex flex-col items-center bg-[#1a1a2e] relative overflow-auto p-4">
      {showInstructions && <Instructions onClose={() => setShowInstructions(false)} />}
      
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/50"
            initial={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, scale: 0, opacity: 0 }}
            animate={{ scale: Math.random() * 0.8 + 0.2, opacity: 1, y: [0, Math.random() * 20 - 10] }}
            transition={{ delay: Math.random() * 2, duration: Math.random() * 3 + 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          >
            <Star fill="currentColor" strokeWidth="0" />
          </motion.div>
        ))}
      </div>
      
      <main className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center text-center py-8">
        
        <h1 className="font-titan text-6xl md:text-8xl text-white text-center uppercase tracking-wider" style={{ WebkitTextStroke: '2px #a29bfe' }}>
          Little Graphic
          <span className="block text-5xl md:text-7xl -mt-2 text-yellow-300" style={{ WebkitTextStroke: '2px #fdcb6e' }}>Designer</span>
        </h1>

        <div className="my-6 space-y-4">
          <MusicPlayer 
              volume={musicVolume} 
              setVolume={setMusicVolume}
              isPlaying={isPlaying}
              togglePlayPause={onPlayPause}
              onNextSong={onNextSong}
              onPrevSong={onPrevSong}
              currentSong={currentSong}
              inGame={false}
          />
           <motion.button 
              onClick={() => setShowInstructions(true)}
              className="bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.1, boxShadow: '0px 0px 20px rgba(71, 221, 209, 0.7)' }}
              whileTap={{ scale: 0.95 }}
            >
              <BookOpen />
              Instructions
          </motion.button>
        </div>


        <div className="w-full flex flex-col items-center gap-6">
          {categories.map((category, index) => {
            return (
              <motion.button 
                key={category.id} 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                onClick={() => onStart(category.id)} 
                className="w-full max-w-xs relative rounded-full border-2 p-1 transition-all duration-300 border-gray-600"
                whileHover={{ scale: 1.05, borderColor: '#fde047' }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`w-full h-full bg-gradient-to-r ${category.gradient} rounded-full flex items-center justify-between p-2`}>
                  <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center p-1 border-2 border-white/50 flex-shrink-0">
                    <img src={category.image} alt={category.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="flex-1 text-center text-xl md:text-2xl font-bold text-white uppercase tracking-wider" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
                    {category.name}
                  </span>
                  <div className="w-16"></div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </main>
    </div>
  );
};
export default StartupPage;