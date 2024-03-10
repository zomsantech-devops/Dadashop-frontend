import { memo } from "react";
import vBucks from "../assets/icons/vbucks-coins.webp";
import { convertVbuckToTHB, isToday } from "../lib/utils";
import { SmallCarousel } from "./SmallCarousel";

interface ItemComponentProps {
  item: ItemProps;
  handleItemClick: (itemId: string) => void;
  rate: number;
}

interface ItemProps {
  _id?: string | null;
  id?: string | null;
  name: string | null;
  finalPrice: number | null;
  display_assets: DisplayAssets[];
  section_name?: string | null;
  type_name?: string | null;
  release_date?: string | null;
}

interface DisplayAssets {
  display_id: string;
  image_background: string;
  image_url: string;
}

const ItemCard = memo(({ item, handleItemClick, rate }: ItemComponentProps) => {
  return (
    <li
      className="relative w-[187px] cursor-pointer screen_500:w-full"
      onClick={() => handleItemClick(item.id || "")}
    >
      {isToday(new Date(item.release_date || "")) && (
        <div className="absolute -top-2 -right-2 text-white bg-[#cb3369] px-2 py-0.5 rounded-md font-bold z-[20]">
          NEW!
        </div>
      )}
      <div className="relative group overflow-hidden rounded-lg">
        {item.display_assets.length !== 0 && (
          <div className="w-[187px]">
            <SmallCarousel displayAssets={item.display_assets} />
          </div>
        )}
        <div className="absolute bottom-0 item-title-shadow text-white p-2 pt-4 text-xl uppercase antialiased leading-6 card-bg w-full rounded-lg screen_445:text-lg screen_445:leading-normal">
          <div className="font-bold leading-5 pb-1.5 pt-2 screen_445:pb-0 mini:text-sm mini:leading-5">
            {item.name}
          </div>
          <div className="flex items-center justify-between screen_375:text-base mini:text-xs">
            <div className="flex items-center justify-center">
              <img src={vBucks} alt="V-Bucks" className="w-5 h-5 mr-1" />
              <p className="font-bold">{item.finalPrice || "-"}</p>
            </div>
            <div className="text-[#aafffa]">
              <p className="font-bold">
                {convertVbuckToTHB(item.finalPrice, rate) || "-"} บาท
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
});

export { ItemCard };
