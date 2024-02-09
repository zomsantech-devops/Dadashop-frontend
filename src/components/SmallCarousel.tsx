import { useEffect, useState } from "react";

interface CarouselProps {
  displayAssets: DisplayAssets[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

interface DisplayAssets {
  display_id: string;
  image_background: string;
}

export const SmallCarousel = ({
  displayAssets,
  autoSlide = false,
  autoSlideInterval = 3000,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const next = () =>
    setCurrentIndex((curr) =>
      curr === displayAssets?.length - 1 ? 0 : curr + 1
    );

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, next]);

  return (
    <div className="overflow-hidden relative">
      <div className="flex">
        <img
          loading="lazy"
          src={displayAssets[currentIndex]?.image_background || ""}
          alt={displayAssets[currentIndex]?.display_id}
          className="aspect-square object-cover"
        />
      </div>
    </div>
  );
};
