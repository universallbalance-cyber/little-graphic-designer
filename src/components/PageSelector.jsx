import React, { forwardRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export const coloringPagesData = {
  animals: [
    { id: 'animal-1', name: 'Fox', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/animal1-mP43xrzJEqi059yk.png' },
    { id: 'animal-2', name: 'Pig', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/animal2-ALp21g5q1rsnNxlQ.png' },
    { id: 'animal-3', name: 'Dog', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/animal3-AQEeLoqboaSvkJl8.png' },
    { id: 'animal-4', name: 'Cow', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/animal4-Aq2G5KME5GfpJ10x.png' },
    { id: 'animal-5', name: 'Panda', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/animal5-mP43xrzJWwHb0w6o.png' },
    { id: 'animal-6', name: 'Cat', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/animal6-Yg24ZKv3wlUWRbog.png' },
    { id: 'animal-7', name: 'Lion', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/animal7-dOqZOgvWe5IMQeo3.png' },
    { id: 'animal-8', name: 'Bear', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/animal8-Yan0lKxPx9toaZ5W.png' },
    { id: 'animal-9', name: 'Rabbit', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/animal9-A85MvXzPQEuvJoEp.png' },
  ],
  'baby dinosaur': [
    { id: 'babydino-1', name: 'Baby Rex', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/babydino1.1-YD0Eq9rvVvClXPpY.png' },
    { id: 'babydino-2', name: 'Baby Ptero', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/babydino7-A1az8keKa1HX9wR1.png' },
    { id: 'babydino-3', name: 'Baby Stego', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/babydino6-AoP48lDe4VU04bE4.png' },
    { id: 'babydino-4', name: 'Baby Raptor', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/babydino5-YZ9EO5M26vIxPNKZ.png' },
    { id: 'babydino-5', name: 'Baby Bronto', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/babydino4-AE07NeEpjlFl7VbX.png' },
    { id: 'babydino-6', name: 'Baby Trike', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/babydino3-mP4389ZpxliJzZRo.png' },
    { id: 'babydino-7', name: 'Baby Dino', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/babydino2-AzGMx9OrpXsxLknZ.png' },
  ],
  'CuteAnimals' : [
    { id: 'dino-1', name: 'Stomper', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/7-AQEe21a8j1cjD0Qv.png' },
    { id: 'dino-2', name: 'T-Rex', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/6-Y4LPMKBO6aUzy04Z.png' },
    { id: 'dino-3', name: 'Raptor', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/5-YBgjvVWl5gCBQNGb.png' },
    { id: 'dino-4', name: 'Stegosaurus', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/4-m6L23kOPqXTbEKp6.png' },
    { id: 'dino-5', name: 'Triceratops', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/3-AMqD9G3aa6HqZKX0.png' },
    { id: 'dino-6', name: 'Pterodactyl', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/2-mnl4PeOn9xU1DNEW.png' },
    { id: 'dino-7', name: 'Brontosaurus', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/1-ALp2QvZBBNFbq16e.png' },
  ],
  fruit: [
    { id: 'fruit-1', name: 'Strawberry', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/fruit1-mv0P19MExjiakJpX.png' },
    { id: 'fruit-2', name: 'Watermelon', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/fruit2-AMqD9Mj7XZUM1Q7z.png' },
    { id: 'fruit-3', name: 'Orange', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/fruit3-mv0P19MEoJhyxeoK.png' },
    { id: 'fruit-4', name: 'Pineapple', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/fruit4-YNqMlZzvXvtkPLzn.png' },
    { id: 'fruit-5', name: 'Grapes', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/fruit5-d95ZByNR6lfKGNr3.png' },
    { id: 'fruit-6', name: 'Apple', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/fruit6-AQEe2G6NpqiM42yl.png' },
    { id: 'fruit-7', name: 'Cherries', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/fruit7-YD0EqaZ1O1in4OOX.png' },
    { id: 'fruit-8', name: 'Banana', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/fruit8-mePg60WMZkU9DoE3.png' },
    { id: 'fruit-9', name: 'Lemon', imageUrl: 'https://assets.zyrosite.com/dOq4ypO8x6fPq8OL/fruit10-YrD4MzO7yrtRvBMQ.png' },
  ],
};

const PageSelector = forwardRef(({ selectedCategory, currentPage, onPageSelect }, ref) => {
  const pages = coloringPagesData[selectedCategory] || [];

  useEffect(() => {
    if (!currentPage?.id) return;
    const thumbElement = document.getElementById(`thumb-${currentPage.id}`);
    thumbElement?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [currentPage]);

  return (
    <div ref={ref} className="flex-1 w-full overflow-x-auto no-scrollbar">
      <div className="flex gap-3 pb-2 px-1">
        {pages.map((page, index) => (
          <motion.button
            key={page.id}
            id={`thumb-${page.id}`} // Added id for scrolling
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageSelect({ ...page, category: selectedCategory })}
            className={`
              flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden
              border-4 transition-all shadow-lg
              ${currentPage?.id === page.id 
                ? 'border-purple-500 shadow-purple-500/50 scale-105' 
                : 'border-white hover:border-purple-300'
              }
            `}
          >
            <div className="w-full h-full bg-white flex items-center justify-center p-1">
               <img src={page.imageUrl} alt={page.name} className="max-w-full max-h-full object-contain" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
});

PageSelector.displayName = 'PageSelector';
export default PageSelector;