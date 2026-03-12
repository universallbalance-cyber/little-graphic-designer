import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ToolManager from '@/managers/ToolManager';
import AffirmationOverlay from '@/components/AffirmationOverlay';
import { Palette } from 'lucide-react';

const ColoringCanvas = ({
  canvasRef,
  currentPage,
  selectedTool,
  selectedColor,
  brushSize,
  zoom,
  pan,
  setPan,
  mysticalMode,
  saveState,
  undoManager,
  selectedFont,
  lastPlacedText,
  setLastPlacedText
}) => {
  const containerRef = useRef(null);
  const [toolManager] = useState(() => new ToolManager());
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const [showAffirmation, setShowAffirmation] = useState(false);
  const canvasBeforeTextRef = useRef(null);
  const [isTextDragging, setIsTextDragging] = useState(false);
  const [draggedText, setDraggedText] = useState(null);

  useEffect(() => {
    if (!canvasRef.current || !currentPage?.imageUrl) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = currentPage.imageUrl;
    img.onload = () => {
      const pad = 32;
      const mw = container.clientWidth - pad;
      const mh = container.clientHeight - pad;
      const ar = img.width / img.height;
      let cw = mw;
      let ch = cw / ar;
      if (ch > mh) {
        ch = mh;
        cw = ch * ar;
      }
      canvas.width = cw;
      canvas.height = ch;
      
      undoManager.clear();
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      saveState();
    };
    img.onerror = () => console.error('Failed to load image:', currentPage.imageUrl);
  }, [currentPage, canvasRef, saveState, undoManager]);

  useEffect(() => {
    if (mysticalMode && Math.random() > 0.7) {
      setShowAffirmation(true);
      setTimeout(() => setShowAffirmation(false), 3000);
    }
  }, [mysticalMode, selectedColor]);

  const getCanvasPoint = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const drawTextOnCanvas = useCallback((textInfo) => {
    if (!canvasRef.current || !textInfo || !textInfo.content) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.font = textInfo.font;
    ctx.fillStyle = textInfo.color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(textInfo.content, textInfo.x, textInfo.y);
  }, [canvasRef]);

  const handleInteractionStart = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const point = getCanvasPoint(e);

    if (selectedTool === 'pan') {
      setIsPanning(true);
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      setLastPanPoint({ x: clientX, y: clientY });
      return;
    }
    
    if (selectedTool === 'move-text' && lastPlacedText) {
      // Save the canvas state before we start erasing the text
      canvasBeforeTextRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      // Remove the text from the previous undo state
      const stateBeforeText = undoManager.getPreviousState();
      if (stateBeforeText) {
        ctx.putImageData(stateBeforeText, 0, 0);
      }
      
      setIsTextDragging(true);
      setDraggedText({ ...lastPlacedText, x: point.x, y: point.y });
      
      // Draw the text at the new position immediately
      drawTextOnCanvas({ ...lastPlacedText, x: point.x, y: point.y });
      return;
    }
    
    if (selectedTool === 'text') {
        const userText = prompt("Enter your text:");
        if (userText) {
            saveState();
            const newText = {
                content: userText,
                x: point.x,
                y: point.y,
                font: `30px ${selectedFont}`,
                color: selectedColor,
            };
            toolManager.drawText(newText, ctx);
            setLastPlacedText(newText);
            saveState();
        }
        return;
    }

    saveState();
    toolManager.startTool({ tool: selectedTool, point, color: selectedColor, canvas, ctx, brushSize });
  };

  const handleInteractionMove = (e) => {
    e.preventDefault();
    if (isPanning) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = clientX - lastPanPoint.x;
      const dy = clientY - lastPanPoint.y;
      setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      setLastPanPoint({ x: clientX, y: clientY });
      return;
    }
    
    if (selectedTool === 'move-text' && isTextDragging && draggedText && canvasBeforeTextRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const point = getCanvasPoint(e);
        
        // Restore canvas to state before text
        ctx.putImageData(canvasBeforeTextRef.current, 0, 0);
        
        // Update dragged text position
        const updatedText = { ...draggedText, x: point.x, y: point.y };
        setDraggedText(updatedText);
        
        // Draw text at new position
        drawTextOnCanvas(updatedText);
        return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const point = getCanvasPoint(e);

    toolManager.moveTool({ point, canvas, ctx, brushSize, color: selectedColor });
  };

  const handleInteractionEnd = (e) => {
    e.preventDefault();
    setIsPanning(false);
    
    if (selectedTool === 'move-text' && isTextDragging && draggedText) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Restore canvas to clean state (before text)
        if (canvasBeforeTextRef.current) {
          ctx.putImageData(canvasBeforeTextRef.current, 0, 0);
        }
        
        // Draw final text position
        drawTextOnCanvas(draggedText);
        
        // Save the final state
        saveState();
        
        // Clear text placement mode
        setLastPlacedText(null);
        setIsTextDragging(false);
        setDraggedText(null);
        canvasBeforeTextRef.current = null;
        return;
    }
    
    toolManager.endTool();
  };
  
  const getCursor = () => {
    if (isPanning) return 'grabbing';
    if (selectedTool === 'pan') return 'grab';
    if (selectedTool === 'move-text' && lastPlacedText) return 'move';
    if (selectedTool === 'text') return 'text';
    return 'crosshair';
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center relative overflow-hidden bg-purple-200/50 p-4 touch-none"
    >
      {!currentPage ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-8"
        >
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
            <Palette className="w-20 h-20 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Ready to Color?
          </h2>
          <p className="text-xl text-white/90 drop-shadow-md">
            Go back home to select a new category and start your magical journey! ✨
          </p>
        </motion.div>
      ) : (
        <motion.div 
          className="relative"
          style={{
             cursor: getCursor()
          }}
          onMouseDown={handleInteractionStart}
          onMouseMove={handleInteractionMove}
          onMouseUp={handleInteractionEnd}
          onMouseLeave={handleInteractionEnd}
          onTouchStart={handleInteractionStart}
          onTouchMove={handleInteractionMove}
          onTouchEnd={handleInteractionEnd}
          animate={{
            scale: zoom,
            x: pan.x,
            y: pan.y,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <canvas
            ref={canvasRef}
            className={`bg-white rounded-2xl shadow-2xl border-8 border-white ${
              mysticalMode ? 'mystical-glow' : ''
            }`}
            style={{
              transformOrigin: 'center center',
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />
          {showAffirmation && <AffirmationOverlay />}
        </motion.div>
      )}
    </div>
  );
};

export default ColoringCanvas;