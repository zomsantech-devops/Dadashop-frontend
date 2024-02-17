import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CarouselProps } from "../types";

export const Carousel = ({ children: slides }: CarouselProps) => {
  const [curr, setCurr] = useState<number>(0);
  const [isSingleImage, setIsSingleImage] = useState<boolean>(false);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides?.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides?.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (slides?.length === 1) {
      setIsSingleImage(true);
    }
  }, [slides?.length]);

  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>
      {!isSingleImage && (
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={prev}
            className="p-1 rounded-full shadow-sm bg-white/80 text-gray-800 hover:bg-white"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="p-1 rounded-full shadow-sm bg-white/80 text-gray-800 hover:bg-white"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      )}

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`
                transition-all w-3 h-3 bg-white rounded-full
                ${curr === i ? "p-1" : "bg-opacity-50"}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
