import React from 'react';
import { motion } from 'framer-motion';

const presetColors = [
  '#FF6B9D', '#C44569', '#F8B500', '#FFA801',
  '#4ECDC4', '#45B7D1', '#5F27CD', '#341F97',
  '#26DE81', '#20BF6B', '#FC5C65', '#EB3B5A',
  '#FD79A8', '#FDCB6E', '#6C5CE7', '#A29BFE',
  '#00B894', '#00CEC9', '#FF7675', '#FFFFFF',
  '#2D3436', '#636E72', '#B2BEC3', '#DFE6E9'
];

const ColorPicker = ({ selectedColor, setSelectedColor }) => {
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative"
      >
        <label className="hidden md:block text-sm font-semibold text-gray-700 mb-1">
          Custom
        </label>
        <div className="relative">
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-12 h-12 md:w-14 md:h-14 rounded-xl cursor-pointer border-4 border-white shadow-lg p-0"
            style={{ appearance: 'none', WebkitAppearance: 'none', backgroundColor: 'transparent' }}
          />
        </div>
      </motion.div>

      <div>
        <label className="hidden md:block text-sm font-semibold text-gray-700 mb-1">
          Quick Colors
        </label>
        <div className="flex flex-wrap gap-1.5 md:gap-2 max-w-xs md:max-w-md">
          {presetColors.slice(0, 16).map((color, index) => (
            <motion.button
              key={color}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.02 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedColor(color)}
              className={`
                w-8 h-8 md:w-10 md:h-10 rounded-lg shadow-md transition-all
                ${selectedColor === color ? 'ring-4 ring-purple-500 ring-offset-2' : ''}
              `}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;