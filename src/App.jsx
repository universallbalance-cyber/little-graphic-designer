import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import ColoringCanvas from '@/components/ColoringCanvas';
import ToolPalette from '@/components/ToolPalette';
import ColorPicker from '@/components/ColorPicker';
import PageSelector from '@/components/PageSelector';
import ZoomControls from '@/components/ZoomControls';
import MysticalMode from '@/components/MysticalMode';
import SaveShare from '@/components/SaveShare';
import StartupPage from '@/components/StartupPage';
import { Toaster } from '@/components/ui/toaster';
import { coloringPagesData } from '@/components/PageSelector';
import { ChevronLeft, ChevronRight, Undo2, Undo, Redo } from 'lucide-react';
import MusicPlayer from '@/components/MusicPlayer';
import UndoManager from '@/managers/UndoManager';

export const regularSongs = [
  { id: 1, title: 'Happy Dance', url: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/dance1-AzGMJWabxLHeGqbd.mp3' },
  { id: 2, title: 'Groovy Tune', url: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/dance5-YD0EPLeN4ghy0r5D.mp3' },
  { id: 3, title: 'Sunshine Beats', url: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/dance4-mxB26eOD89fEk7jP.mp3' },
  { id: 4, title: 'Playful Melody', url: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/dance3-Y4LPjw5Zn1U5wJjo.mp3' },
  { id: 5, title: 'Funky Jam', url: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/dance2-mP43xbz09WT21KWe.mp3' },
];

export const mysticalSongs = [
  { id: 1, title: 'Enchanted Forest', url: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/mystical1-mxB2a9DpXbF2Kq1O.mp3' },
  { id: 2, title: 'Starlight Dream', url: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/mystical2-AVLxeXr6aJUDKJyQ.mp3' },
  { id: 3, title: 'Magic Meadow', url: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/mystical3-mk34QMrpvaSP2nWL.mp3' },
];

function App() {
  const [selectedTool, setSelectedTool] = useState('bucket');
  const [brushSize, setBrushSize] = useState(8);
  const [eraserSize, setEraserSize] = useState(8);
  const [selectedColor, setSelectedColor] = useState('#FF6B9D');
  const [currentPage, setCurrentPage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [mysticalMode, setMysticalMode] = useState(false);
  const [appStarted, setAppStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFont, setSelectedFont] = useState('Arial');
  
  const [lastPlacedText, setLastPlacedText] = useState(null);
  
  const [musicVolume, setMusicVolume] = useState(50);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const pageSelectorRef = useRef(null);
  const [undoManager] = useState(() => new UndoManager());

  const songList = mysticalMode ? mysticalSongs : regularSongs;
  const currentSong = songList[currentSongIndex];

  const handleNextSong = useCallback(() => {
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songList.length);
  }, [songList.length]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }
  }, []);

  useEffect(() => {
    setCurrentSongIndex(0);
  }, [mysticalMode]);

  useEffect(() => {
    if(audioRef.current && currentSong?.url) {
        const wasPlaying = isPlaying;
        audioRef.current.src = currentSong.url;
        if (wasPlaying) {
            audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        } else {
            audioRef.current.pause();
        }
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume / 100;
    }
  }, [musicVolume]);
  
  useEffect(() => {
    if (isPlaying && audioRef.current?.src) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handlePrevSong = () => {
      setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songList.length) % songList.length);
  };

  const togglePlayPause = () => {
      setIsPlaying(!isPlaying);
  };

  const handleStart = (category) => {
    setSelectedCategory(category);
    const categoryPages = coloringPagesData[category];
    if (categoryPages && categoryPages.length > 0) {
      setCurrentPage({ ...categoryPages[0], category: category });
    }
    setAppStarted(true);
  };

  const handleGoBack = () => {
    setAppStarted(false);
    setCurrentPage(null);
    setSelectedCategory(null);
    setLastPlacedText(null);
  };

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
    setPan({ x: 0, y: 0 });
    setZoom(1);
    undoManager.clear();
    setLastPlacedText(null);
  }, [undoManager]);

  const handlePageNavigation = (direction) => {
    if (!currentPage || !selectedCategory) return;
    const categoryPages = coloringPagesData[selectedCategory];
    const currentIndex = categoryPages.findIndex(p => p.id === currentPage.id);
    if (currentIndex === -1) return;
    let newIndex = currentIndex + direction;
    if (newIndex < 0) {
      newIndex = categoryPages.length - 1;
    } else if (newIndex >= categoryPages.length) {
      newIndex = 0;
    }
    const newPage = { ...categoryPages[newIndex], category: selectedCategory };
    handlePageChange(newPage);
  };
  
  const handleUndo = () => {
    if (!canvasRef.current) return;
    undoManager.undo(canvasRef.current);
    setLastPlacedText(null);
  };

  const handleRedo = () => {
    if (!canvasRef.current) return;
    undoManager.redo(canvasRef.current);
    setLastPlacedText(null);
  };
  
  const saveState = useCallback(() => {
    if (canvasRef.current) {
      undoManager.saveState(canvasRef.current);
    }
  }, [undoManager]);

  return (
    <div className="h-full w-full">
        {!appStarted ? (
          <StartupPage
            onStart={handleStart}
            musicVolume={musicVolume}
            setMusicVolume={setMusicVolume}
            currentSong={currentSong || regularSongs[0]}
            isPlaying={isPlaying}
            onPlayPause={togglePlayPause}
            onNextSong={handleNextSong}
            onPrevSong={handlePrevSong}
          />
        ) : (
          <>
            <Helmet>
              <title> Little Graphic Designer - Unleash Your Creativity!</title>
              <meta name="description" content="A fun and interactive coloring book app with mystical modes, affirmations, and creative tools for kids and adults!" />
            </Helmet>
            <div className="h-full w-full overflow-hidden relative">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
                  <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-pink-300 rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>
              </motion.div>
              <div className="relative z-10 h-full flex flex-col">
                <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className="bg-white/90 backdrop-blur-md shadow-xl border-b-4 border-purple-400 p-2 md:p-4">
                  <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-4">
                      <button onClick={handleGoBack} className="flex items-center gap-2 text-xl md:text-2xl font-bold text-purple-600 hover:scale-105 transition-transform">
                        <Undo2 className="w-8 h-8"/> <span className="hidden md:inline">Back</span>
                      </button>
                      <button onClick={handleUndo} title="Undo" className="p-2 bg-yellow-200 rounded-full hover:bg-yellow-300 transition-colors">
                        <Undo className="w-6 h-6 text-yellow-700"/>
                      </button>
                      <button onClick={handleRedo} title="Redo" className="p-2 bg-blue-200 rounded-full hover:bg-blue-300 transition-colors">
                        <Redo className="w-6 h-6 text-blue-700"/>
                      </button>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                      <MusicPlayer 
                          volume={musicVolume} 
                          setVolume={setMusicVolume} 
                          isPlaying={isPlaying} 
                          togglePlayPause={togglePlayPause} 
                          onNextSong={handleNextSong}
                          onPrevSong={handlePrevSong}
                          currentSong={currentSong}
                          inGame={true}
                      />
                      <MysticalMode mysticalMode={mysticalMode} setMysticalMode={setMysticalMode} />
                      <SaveShare canvasRef={canvasRef} />
                    </div>
                  </div>
                </motion.header>
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                  <motion.aside initial={{ x: -100 }} animate={{ x: 0 }} className="w-full md:w-20 bg-white/90 backdrop-blur-md shadow-xl md:border-r-4 border-purple-400 flex md:flex-col justify-start md:justify-center items-center md:py-6 overflow-x-auto no-scrollbar">
                    <ToolPalette 
                      selectedTool={selectedTool} 
                      setSelectedTool={setSelectedTool} 
                      brushSize={brushSize}
                      setBrushSize={setBrushSize}
                      eraserSize={eraserSize}
                      setEraserSize={setEraserSize}
                      selectedFont={selectedFont}
                      setSelectedFont={setSelectedFont}
                    />
                  </motion.aside>
                  <main className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 relative overflow-hidden">
                      <ColoringCanvas 
                        canvasRef={canvasRef}
                        currentPage={currentPage} 
                        selectedTool={selectedTool} 
                        selectedColor={selectedColor} 
                        brushSize={selectedTool === 'brush' ? brushSize : eraserSize}
                        zoom={zoom} 
                        pan={pan} 
                        setPan={setPan} 
                        mysticalMode={mysticalMode} 
                        saveState={saveState}
                        undoManager={undoManager}
                        selectedFont={selectedFont}
                        lastPlacedText={lastPlacedText}
                        setLastPlacedText={setLastPlacedText}
                      />
                    </div>
                     {/* Mobile Bottom Bar */}
                    <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="bg-white/90 backdrop-blur-md shadow-xl border-t-4 border-purple-400 p-2 md:hidden">
                      <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-4">
                        <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
                        <div className="flex items-center w-full">
                          <motion.button onClick={() => handlePageNavigation(-1)} className="p-2 bg-purple-200 rounded-l-lg hover:bg-purple-300 transition-colors" whileTap={{ scale: 0.9 }}>
                              <ChevronLeft className="text-purple-700"/>
                          </motion.button>
                          <PageSelector
                            ref={pageSelectorRef}
                            selectedCategory={selectedCategory}
                            currentPage={currentPage}
                            onPageSelect={handlePageChange}
                          />
                          <motion.button onClick={() => handlePageNavigation(1)} className="p-2 bg-purple-200 rounded-r-lg hover:bg-purple-300 transition-colors" whileTap={{ scale: 0.9 }}>
                              <ChevronRight className="text-purple-700"/>
                          </motion.button>
                        </div>
                        <ZoomControls zoom={zoom} setZoom={setZoom} isMobile={true} />
                      </div>
                    </motion.div>
                    
                    {/* Desktop Bottom Section */}
                    <div className="hidden md:flex flex-col items-center gap-4 bg-white/90 backdrop-blur-md shadow-xl border-t-4 border-purple-400 p-4">
                      <div className="flex items-center w-full max-w-5xl">
                          <motion.button onClick={() => handlePageNavigation(-1)} className="p-3 bg-purple-200 rounded-l-lg hover:bg-purple-300 transition-colors" whileTap={{ scale: 0.9 }}>
                              <ChevronLeft className="text-purple-700"/>
                          </motion.button>
                          <PageSelector
                            ref={pageSelectorRef}
                            selectedCategory={selectedCategory}
                            currentPage={currentPage}
                            onPageSelect={handlePageChange}
                          />
                          <motion.button onClick={() => handlePageNavigation(1)} className="p-3 bg-purple-200 rounded-r-lg hover:bg-purple-300 transition-colors" whileTap={{ scale: 0.9 }}>
                              <ChevronRight className="text-purple-700"/>
                          </motion.button>
                      </div>
                      <div className="flex items-center justify-center gap-8 w-full max-w-5xl">
                          <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
                          <ZoomControls zoom={zoom} setZoom={setZoom} />
                      </div>
                    </div>
                  </main>
                </div>
              </div>
              <Toaster />
            </div>
          </>
        )}
    </div>
  );
}

export default App;