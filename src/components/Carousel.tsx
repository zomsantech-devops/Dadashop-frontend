import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { DisplayAssetsItem } from "../types";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface CarouselDisplayAssetProps {
  displayAssets: DisplayAssetsItem[];
}

export const CarouselSlider = ({ displayAssets }: CarouselDisplayAssetProps) => {
  return (
    <Carousel
      showArrows={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      useKeyboardArrows={true}
      dynamicHeight={true}
      renderArrowPrev={(clickHandler, hasPrev) => {
        return (
          <div
            className={`${
              hasPrev ? "absolute" : "hidden"
            } top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-100 cursor-pointer z-20`}
            onClick={clickHandler}
          >
            <FaChevronLeft
              size={30}
              className="p-2 rounded-full shadow-sm bg-white/80 text-gray-800 hover:bg-white"
            />
          </div>
        );
      }}
      renderArrowNext={(clickHandler, hasNext) => {
        return (
          <div
            className={`${
              hasNext ? "absolute" : "hidden"
            } top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-100 cursor-pointer z-20`}
            onClick={clickHandler}
          >
            <FaChevronRight
              size={30}
              className="p-2 rounded-full shadow-sm bg-white/80 text-gray-800 hover:bg-white"
            />
          </div>
        );
      }}
    >
      {displayAssets.map((asset) => (
        <LazyLoadImage
          effect="blur"
          key={asset.materialInstance}
          src={asset.background}
          alt={asset.displayAsset}
          className={`aspect-square w-[520px] screen_610:w-[375px] screen_445:w-[275px] rounded-lg`}
        />
      ))}
    </Carousel>
  );
};
