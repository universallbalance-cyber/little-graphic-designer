import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, Eraser, Type, PaintBucket, Hand, Move } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const tools = [
  { id: 'bucket', icon: PaintBucket, label: 'Paint Bucket', color: 'from-green-400 to-green-600' },
  { id: 'move-text', icon: Move, label: 'Move Text', color: 'from-indigo-400 to-indigo-600' },
  { id: 'pan', icon: Hand, label: 'Pan', color: 'from-yellow-400 to-yellow-600' },
];

const pointSizes = [
  { size: 4, label: 'Small' },
  { size: 8, label: 'Medium' },
  { size: 16, label: 'Thick' },
];

const fontTypes = [
  { font: 'Arial', label: 'Arial' },
  { font: 'Verdana', label: 'Verdana' },
  { font: 'Georgia', label: 'Georgia' },
  { font: 'Courier New', label: 'Courier New' },
  { font: 'Brush Script MT', label: 'Cursive' },
];

const ToolPalette = ({ 
  selectedTool, 
  setSelectedTool, 
  brushSize, 
  setBrushSize,
  eraserSize,
  setEraserSize,
  selectedFont,
  setSelectedFont
}) => {

  const handleBrushSizeChange = (size) => {
    setSelectedTool('brush');
    setBrushSize(size);
  };

  const handleEraserSizeChange = (size) => {
    setSelectedTool('eraser');
    setEraserSize(size);
  };
  
  const handleFontChange = (font) => {
    setSelectedTool('text');
    setSelectedFont(font);
  };

  const handleToolClick = (toolId) => {
    setSelectedTool(toolId);
  };

  const isBrushSelected = selectedTool === 'brush';
  const isEraserSelected = selectedTool === 'eraser';
  const isTextSelected = selectedTool === 'text';

  return (
    <div className="flex flex-row md:flex-col gap-2 md:gap-3 px-2 md:px-0">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <motion.button
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center
                      transition-all duration-300 shadow-lg flex-shrink-0
                      ${isBrushSelected
                        ? `bg-gradient-to-br from-blue-400 to-blue-600 text-white scale-110 shadow-xl` 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                      }
                    `}
                    title="Pencil"
                >
                    <Pencil className="w-6 h-6" />
                </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="bg-white/80 backdrop-blur-sm border-purple-300">
                {pointSizes.map(({size, label}) => (
                    <DropdownMenuItem key={size} onSelect={() => handleBrushSizeChange(size)} className={`flex items-center gap-2 cursor-pointer hover:bg-purple-100 ${brushSize === size && isBrushSelected ? 'bg-purple-200' : ''}`}>
                       <span className="font-semibold">{label}</span>
                       <div className="w-6 h-6 flex items-center justify-center">
                         <div style={{width: size, height: size}} className="bg-gray-800 rounded-full" />
                       </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <motion.button
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center
                      transition-all duration-300 shadow-lg flex-shrink-0
                      ${isEraserSelected
                        ? `bg-gradient-to-br from-pink-400 to-pink-600 text-white scale-110 shadow-xl` 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                      }
                    `}
                    title="Eraser"
                >
                    <Eraser className="w-6 h-6" />
                </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="bg-white/80 backdrop-blur-sm border-purple-300">
                {pointSizes.map(({size, label}) => (
                    <DropdownMenuItem key={size} onSelect={() => handleEraserSizeChange(size)} className={`flex items-center gap-2 cursor-pointer hover:bg-pink-100 ${eraserSize === size && isEraserSelected ? 'bg-pink-200' : ''}`}>
                       <span className="font-semibold">{label}</span>
                       <div className="w-6 h-6 flex items-center justify-center">
                         <div style={{width: size, height: size}} className="bg-gray-800 rounded-full" />
                       </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <motion.button
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center
                      transition-all duration-300 shadow-lg flex-shrink-0
                      ${isTextSelected
                        ? `bg-gradient-to-br from-purple-400 to-purple-600 text-white scale-110 shadow-xl` 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                      }
                    `}
                    title="Text"
                >
                    <Type className="w-6 h-6" />
                </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="bg-white/80 backdrop-blur-sm border-purple-300">
                {fontTypes.map(({font, label}) => (
                    <DropdownMenuItem key={font} onSelect={() => handleFontChange(font)} className={`cursor-pointer hover:bg-purple-100 ${selectedFont === font && isTextSelected ? 'bg-purple-200' : ''}`}>
                       <span style={{ fontFamily: font }} className="font-semibold">{label}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>

      {tools.map((tool, index) => {
        const Icon = tool.icon;
        const isSelected = selectedTool === tool.id;
        
        return (
          <motion.button
            key={tool.id}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: (index + 3) * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleToolClick(tool.id)}
            className={`
              w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center
              transition-all duration-300 shadow-lg flex-shrink-0
              ${isSelected
                ? `bg-gradient-to-br ${tool.color} text-white scale-110 shadow-xl` 
                : 'bg-white text-gray-600 hover:bg-gray-50'
              }
            `}
            title={tool.label}
          >
            <Icon className="w-6 h-6" />
          </motion.button>
        );
      })}
    </div>
  );
};

export default ToolPalette;