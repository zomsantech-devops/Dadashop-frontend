const ItemShopSkeleton = () => {
  return (
    <>
      <div className="flex self-center justify-left gap-4 mb-5 overflow-x-auto max-w-[1200px] screen_1250:max-w-full screen_500:gap-2 scrollbar-category rounded-xl">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="px-4 py-2 rounded-2xl font-bold whitespace-nowrap screen_445:text-sm bg-gray-200 animate-pulse h-10 w-24 screen_500:w-20"
          >
            {/* Optionally, you can insert a lighter div here to represent the text */}
          </div>
        ))}
      </div>
      <div className="flex flex-col self-center gap-[20px] screen_960:gap-[40px] screen_500:w-full">
        <section>
          <div className="animate-pulse">
            <div className="w-1/4 h-6 bg-gray-300 rounded-md mb-4 screen_930:h-5 screen_445:h-4"></div>
          </div>

          <ul className="grid grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 screen_810:grid-cols-3 sm:grid-cols-2 gap-4 screen_500:place-items-center screen_445:gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <li
                key={index}
                className="list-none relative w-[187px] cursor-pointer screen_500:w-full animate-pulse"
              >
                <div className="rounded-lg bg-gray-300 h-[200px]"></div>
                <div className="absolute bottom-0 w-full h-1/3 bg-gray-300 rounded-b-lg">
                  <div className="h-4 bg-gray-200 rounded mt-2 w-3/4 mx-auto"></div>
                  <div className="flex justify-between mx-2 mt-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};
export default ItemShopSkeleton;
