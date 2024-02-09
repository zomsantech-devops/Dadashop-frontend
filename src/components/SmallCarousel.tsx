import React, { useState, useEffect, useRef } from 'react';

import "./thickthighdrivemecrazy.css"



interface DisplayAssets {
  display_id: string;
  image_background: string;
}

interface SmallCarouselProps {
  displayAssets: DisplayAssets[];
}


export const SmallCarousel: React.FC<SmallCarouselProps> = ({ displayAssets }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current => (current + 1) % displayAssets.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, [displayAssets.length]);

  const nextIndex = displayAssets && displayAssets.length > 0 ? (current + 1) % displayAssets.length : 0;

  return (
    <div className="carousel-container">
<div 
  key={current}
  className="carousel-slide" 
  style={{ backgroundImage: `url(${displayAssets[current]?.image_background})` }}
>
  <div 
    className="overlay" 
    key={current} 
    style={{ backgroundImage: `url(${displayAssets[nextIndex]?.image_background})` }}
  >
  </div>
    </div>
    </div>
  );
};