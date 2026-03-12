import React from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ZoomControls = ({ zoom, setZoom, isMobile = false }) => {
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
  };

  const containerClasses = isMobile 
    ? "flex items-center justify-center w-full"
    : "hidden md:flex flex-col items-center";

  return (
    <div className={containerClasses}>
      {!isMobile && (
        <label className="text-sm font-semibold text-gray-700 mb-2">
          Zoom
        </label>
      )}
      <div className="flex items-center gap-2">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleZoomOut}
            variant="outline"
            size="icon"
            className="bg-white hover:bg-purple-50 border-2 border-purple-300"
          >
            <ZoomOut className="w-5 h-5" />
          </Button>
        </motion.div>

        <div className="px-3 py-2 bg-white rounded-lg border-2 border-purple-300 font-semibold min-w-[70px] text-center">
          {Math.round(zoom * 100)}%
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleZoomIn}
            variant="outline"
            size="icon"
            className="bg-white hover:bg-purple-50 border-2 border-purple-300"
          >
            <ZoomIn className="w-5 h-5" />
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleReset}
            variant="outline"
            size="icon"
            className="bg-white hover:bg-purple-50 border-2 border-purple-300"
          >
            <Maximize2 className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ZoomControls;