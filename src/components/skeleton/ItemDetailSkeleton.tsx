const ItemDetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex screen_1250:flex-col items-center justify-center gap-6 px-6 screen_1250:pt-4">
        {/* Image/Video Placeholder */}
        <div className="bg-gray-300 rounded-lg w-[520px] h-[80vh] screen_1250:h-[375px] screen_610:w-[375px] screen_445:w-[275px]"></div>

        <div className="w-[2px] min-h-[80vh] bg-gray-300 screen_1250:min-h-[2px] screen_1250:min-w-[15%]"></div>

        {/* Text and Button Placeholders */}
        <div className="min-w-[min(50vw,500px)] max-h-[80vh] screen_1250:max-h-full text-center screen_810:min-w-none overflow-auto py-6">
          <div className="flex flex-col items-center justify-center px-2.5 mr-4 screen_1250:ml-4">
            {/* Item Name Placeholder */}
            <div className="bg-gray-300 h-8 w-3/4 rounded screen_610:w-full"></div>
            {/* Item Type and Rarity Placeholder */}
            <div className="bg-gray-300 h-4 w-1/2 rounded mt-2"></div>
            {/* Price Placeholder */}
            <div className="bg-gray-300 h-6 w-1/4 rounded mt-2"></div>
            {/* Description Placeholder */}
            <div className="bg-gray-300 h-4 w-5/6 rounded mt-2"></div>
            {/* Button Placeholders */}
            <div className="bg-gray-300 h-10 w-3/4 rounded mt-2"></div>
            <div className="bg-gray-300 h-10 w-3/4 rounded mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemDetailSkeleton;
