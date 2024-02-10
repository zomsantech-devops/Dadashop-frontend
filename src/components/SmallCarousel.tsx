import React, { useState, useEffect, useRef } from 'react';

import "./thickthighdrivemecrazy.css"

interface CarouselProps {
  displayAssets: { display_id: string; image_background: string }[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

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
    }, 3000); 
    return () => clearInterval(interval);
  }, [displayAssets.length]);

  return (
    <div className="carousel-container">
      <div className="image-wrapper">
        {displayAssets.map((asset, index) => (
          <img
            key={asset.display_id}
            src={asset.image_background}
            alt={`Slide ${index}`}
            className={`carousel-image ${index === current ? 'active' : ''} ${index === (current + 1) % displayAssets.length ? 'next' : ''}`}
          />
        ))}

      </div>
    </div>
  );
};
