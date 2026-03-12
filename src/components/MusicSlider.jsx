import React from 'react';
import { Music } from 'lucide-react';

const MusicSlider = ({ value, setValue }) => {
  return (
    <div className="bg-lime-300 border-4 border-black rounded-full p-2 flex items-center gap-3 w-full max-w-xs shadow-[0_6px_0_0_#4d7c0f]">
      <Music className="text-black w-7 h-7" />
      <div className="relative flex-1 h-6 bg-yellow-200 rounded-full border-2 border-black">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="absolute w-full h-full appearance-none bg-transparent cursor-pointer"
          style={{ zIndex: 2 }}
        />
        <div className="absolute top-1/2 -translate-y-1/2 left-0 h-4 rounded-full bg-gradient-to-r from-red-500 to-green-500" style={{ width: `${value}%`, zIndex: 1 }}></div>
      </div>
    </div>
  );
};

export default MusicSlider;