import React, { useState, useEffect } from 'react';
interface DisplayAssets {
    display_id: string;
    image_background: string;
  }
  
  interface CardWithSlidingImagesProps {
    displayAssets: DisplayAssets[];
  }

  interface CardWithSlidingImagesProps {
    displayAssets: DisplayAssets[];
    isDataLoaded: boolean; 
  }
  

  export const CardWithSlidingImages: React.FC<CardWithSlidingImagesProps> = ({ displayAssets, isDataLoaded }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      if (!isDataLoaded) {
        // If data is not loaded yet, do not start the animation
        return;
      }
      
      // Data is loaded, start the animation
      const intervalId = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % displayAssets.length);
      }, 3000); // Change images every 3 seconds
  
      return () => clearInterval(intervalId);
    }, [displayAssets.length, isDataLoaded]); // Add isDataLoaded as a dependency
  
    return (
      <div className="card">
        {displayAssets.map((asset, index) => (
          <img
            key={index}
            src={asset.image_background}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
    );
  };