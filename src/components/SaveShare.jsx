import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const SaveShare = ({ canvasRef, textElements }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const getCombinedCanvas = () => {
    if (!canvasRef?.current) return null;

    const mainCanvas = canvasRef.current;
    const combinedCanvas = document.createElement('canvas');
    combinedCanvas.width = mainCanvas.width;
    combinedCanvas.height = mainCanvas.height;
    const ctx = combinedCanvas.getContext('2d');

    // Draw the main canvas content
    ctx.drawImage(mainCanvas, 0, 0);

    // Draw text elements
    if (textElements) {
        textElements.forEach(text => {
            ctx.fillStyle = text.color;
            ctx.font = `${text.size}px ${text.font}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text.text, text.x, text.y);
        });
    }

    return combinedCanvas;
  }

  const handleSave = () => {
    const combinedCanvas = getCombinedCanvas();
    if (!combinedCanvas) return;
    
    const link = document.createElement('a');
    link.download = 'my-masterpiece.png';
    link.href = combinedCanvas.toDataURL('image/png');
    link.click();
  };

  const handleShare = async () => {
    const combinedCanvas = getCombinedCanvas();
    if (!combinedCanvas) return;

    combinedCanvas.toBlob(async (blob) => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'My Coloring Masterpiece!',
            text: 'Check out what I created with the Little Graphic Designer app! 🎨',
            files: [new File([blob], 'masterpiece.png', { type: 'image/png' })],
          });
        } catch (error) {
          console.error('Error sharing:', error);
          alert("Couldn't share the image. Your browser might not support it.");
        }
      } else {
        alert("Web Share API is not supported in your browser. Try saving the image first!");
      }
    }, 'image/png');
  };

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSave}
        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-2 px-3 md:px-4 rounded-full shadow-lg"
      >
        <Download className="w-5 h-5 md:w-6 md:h-6"/>
        <span className="hidden md:inline">Save</span>
      </motion.button>

      <AlertDialog open={isShareOpen} onOpenChange={setIsShareOpen}>
        <AlertDialogTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-2 px-3 md:px-4 rounded-full shadow-lg"
          >
            <Share2 className="w-5 h-5 md:w-6 md:h-6"/>
            <span className="hidden md:inline">Share</span>
          </motion.button>
        </AlertDialogTrigger>
      </AlertDialog>
    </div>
  );
};

export default SaveShare;