import { useState, useEffect, memo } from "react";
import { SmallCarouselProps } from "../types";
import noImg from "../assets/images/empty.webp";

import "./thickthighdrivemecrazy.css";

export const SmallCarousel = memo(({ displayAssets }: SmallCarouselProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (displayAssets.length <= 1) {
      return;
    }
    const interval = setInterval(() => {
      setCurrent((current) => (current + 1) % displayAssets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [displayAssets.length]);

  return (
    <div className="carousel-container">
      <div className="image-wrapper transition duration-300 hover:scale-110">
        {displayAssets.map((asset, index) => (
          <div
            key={asset.display_id + "_" + index}
            className={`carousel-image-container ${
              index === current ? "active" : ""
            }`}
          >
            <img
              loading="lazy"
              src={asset.image_background}
              alt={`Slide ${index}`}
              className="carousel-image"
            />
            <img
              loading="lazy"
              src={asset.image_url || noImg}
              alt={`URL Slide ${index}`}
              className="url-overlay"
            />
          </div>
        ))}
      </div>
    </div>
  );
});
