import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useEffect, useState } from "react";

import vBucks from "../images/vbucks-coins.png";
import { CustomButton } from "../components/Button";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

interface IdProps {
  itemId: string | null;
  onClose: () => void;
}

interface Item {
  name: string;
  description: string;
  rarity: {
    name: string;
  };
  type: {
    name: string;
  };
  price: number;
  previewVideos: [
    {
      url: string;
    }
  ];
  images: {
    background: string;
  };
}

interface ResponseData {
  success: boolean;
  data: {
    result: boolean;
    item: Item;
  };
}

const ItemDetail = ({ itemId, onClose }: IdProps) => {
  const [item, setItem] = useState<Item>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await axios.get<ResponseData>(
          `https://dadashop-backend.vercel.app/api/v1/item/${itemId}`
        );
        setItem(response.data.data.item);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (itemId) {
      fetchItem();
    }
  }, [itemId]);

  console.log(item?.images.background);

  return (
    <>
      {loading ? (
        <div className="px-6 flex items-center justify-center">
          <CircularProgress className="self-center" />
        </div>
      ) : item ? (
        <div className="flex flex-row screen_1170:flex-col items-center justify-center max-h-[90vh] gap-6 pr-4 pl-6">
          {item.previewVideos[0] ? (
            <video
              preload="true"
              className="h-[90vh] rounded-lg screen_1170:h-[375px] screen_445:h-[256px]"
              muted
              loop
              autoPlay
              playsInline
              src={item.previewVideos[0]?.url}
            ></video>
          ) : (
            <img
              loading="lazy"
              src={item.images.background}
              alt={item.description}
              className="h-[90vh] rounded-lg screen_1170:h-[375px] screen_445:h-[256px]"
            />
          )}
          <div className="w-[2px] min-h-[90vh] bg-black screen_1170:min-h-[2px] screen_1170:min-w-[15%]"></div>
          <div className="max-h-[90vh] max-w-[400px] overflow-y-auto scrollbar screen_1170:max-w-fit">
            <div className="flex flex-col items-center justify-center mr-4 screen_1170:ml-4">
              <div className="text-[28px] text-black/80 uppercase">
                {item?.name}
              </div>
              <p>
                {item.rarity.name} {item.type.name}
              </p>
              <div className="flex items-center mb-2">
                <img src={vBucks} alt="V-Bucks" className="w-5 h-5 mr-2" />
                <p className="font-extrabold">{item.price || "-"}</p>
              </div>
              <p className="italic text-center text-sm mb-2">
                Roses are red, violets are blue, victory is sweet, but not
                without you.
              </p>
              <div className="mb-4">details...</div>
              <div className="flex flex-col gap-2">
                <CustomButton
                  text={"ขั้นตอนการสั่งซื้อ"}
                  link={""}
                  className={"text-lg"}
                />
                <Link
                  to={""}
                  className="text-white leading-normal p-4 px-6 flex flex-col justify-center items-center bg-[#4b2762] rounded-[20px] hover:bg-[#4b2762]/90"
                >
                  <p className="text-xl">ราคา Member</p>
                  <p className="text-xs">ตรวจสอบใน Discord</p>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="absolute top-5 right-5 cursor-pointer"
            onClick={onClose}
          >
            <IoMdClose className="hover:bg-black/20 rounded-xl w-5 h-5 p-0.5" />
          </div>
        </div>
      ) : (
        <p>No item found.</p>
      )}
    </>
  );
};

export default ItemDetail;
