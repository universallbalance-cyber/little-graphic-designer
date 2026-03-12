import React from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MusicPlayer = ({ 
    volume, 
    setVolume, 
    isPlaying, 
    togglePlayPause, 
    onNextSong, 
    onPrevSong,
    currentSong,
    inGame = false
}) => {
  const handleVolumeChange = () => {
    setVolume(volume > 0 ? 0 : 50);
  };
  
  if (inGame) {
    return (
      <div className="flex items-center gap-2">
        <Button onClick={togglePlayPause} variant="outline" size="icon" className="bg-white/80 hover:bg-purple-50 border-2 border-purple-300 rounded-full w-10 h-10 md:w-12 md:h-12">
          {isPlaying ? <Pause className="w-5 h-5 text-purple-600" /> : <Play className="w-5 h-5 text-purple-600" />}
        </Button>
      </div>
    );
  }

  return (
    <motion.div 
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/20 w-72"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center gap-3">
        <Music className="text-purple-300 w-5 h-5 flex-shrink-0" />
        <p className="text-sm font-semibold text-purple-200 truncate" title={currentSong?.title || 'No Song'}>{currentSong?.title || 'Select Music'}</p>
      </div>
      
      <div className="flex items-center justify-center gap-6 my-3">
        <Button onClick={onPrevSong} variant="ghost" size="icon" className="text-purple-300 hover:text-white rounded-full">
            <SkipBack className="w-7 h-7" />
        </Button>
        <Button onClick={togglePlayPause} variant="ghost" size="icon" className="bg-white/20 hover:bg-white/30 rounded-full w-14 h-14">
            {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white" />}
        </Button>
        <Button onClick={onNextSong} variant="ghost" size="icon" className="text-purple-300 hover:text-white rounded-full">
            <SkipForward className="w-7 h-7" />
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleVolumeChange} variant="ghost" size="icon" className="p-0 h-auto text-purple-300 hover:text-white">
            {volume > 0 ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </Button>
        <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-300"
        />
      </div>
    </motion.div>
  );
};

export default MusicPlayer;