import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gamepad2, Brush, Palette, Image as Images, MousePointer } from 'lucide-react';

const InstructionCard = ({ icon, title, children }) => (
    <div className="bg-white/10 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-white">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-yellow-300">{title}</h3>
        </div>
        <p className="text-white/80 text-sm">{children}</p>
    </div>
);

const Instructions = ({ onClose }) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.8, y: 50, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.8, y: 50, opacity: 0 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                    className="bg-gradient-to-br from-[#2c2c54] to-[#40407a] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 border-2 border-purple-400/50 relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-purple-300 hover:text-white transition-colors"
                    >
                        <X size={28} />
                    </button>

                    <h2 className="text-4xl font-titan text-center text-white mb-6" style={{ WebkitTextStroke: '1px #a29bfe' }}>How to Play</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InstructionCard icon={<Gamepad2 />} title="Choose a Category">
                            To start your adventure, pick a category from the main screen. Each one is filled with unique pages to color!
                        </InstructionCard>

                        <InstructionCard icon={<Images />} title="Pick a Page">
                            Once in the coloring area, use the carousel at the bottom to browse and select a coloring page. Use the arrows to see more!
                        </InstructionCard>

                        <InstructionCard icon={<Brush />} title="Select Your Tools">
                            The toolbar on the left has everything you need!
                            <ul className="list-disc list-inside mt-2 text-xs space-y-1">
                                <li><b>Pencil & Eraser:</b> Click to open a menu and select a size.</li>
                                <li><b>Text Tool:</b> Click to choose a font, then click on the canvas to add text.</li>
                                <li><b>Move Text:</b> Select this to drag your text around.</li>
                                <li><b>Paint Bucket:</b> Fills an entire area with color.</li>
                                <li><b>Pan Tool:</b> Click and drag to move the canvas around.</li>
                            </ul>
                        </InstructionCard>

                        <InstructionCard icon={<Palette />} title="Choose a Color">
                            Use the color palette at the bottom. Pick from the quick colors or click the multicolor circle to choose any color you can imagine!
                        </InstructionCard>

                        <InstructionCard icon={<MousePointer />} title="Zoom & Pan">
                            Use the zoom controls at the bottom right to get a closer look. You can also use the Pan tool to move your view.
                        </InstructionCard>
                        
                        <div className="md:col-span-2 text-center text-yellow-300 font-semibold p-3 bg-white/5 rounded-lg">
                           Have fun and let your creativity shine! ✨
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Instructions;