import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useEffect, useState } from "react";

import vBucks from "../images/vbucks-coins.png";
import { CustomButton } from "../components/Button";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { IoMdPricetag } from "react-icons/io";

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
  price: number | null;
  styles: Styles[];
  previewVideos: [
    {
      url: string;
    }
  ];
  images: {
    background: string;
  };
  // displayAssets: DisplayAsset[];
}

interface Styles {
  image: string;
}

// interface DisplayAsset {
//   materialInstance: string;
//   background: string;
// }

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
  const [styles, setStyles] = useState<Styles[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string | null>();

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await axios.get<ResponseData>(
          `https://dadashop-backend.vercel.app/api/v1/item/${itemId}`
        );
        setItem(response.data.data.item);
        setStyles(response.data.data.item.styles);
        setSelectedStyle(response.data.data.item.previewVideos[0]?.url || "")
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

  const convertVbuckToTHB = (price: number | null) => {
    if (price === null) {
      return 0;
    }
    const baht = (price / 100) * 5;
    return baht;
  };

  return (
    <>
      {loading ? (
        <div className="px-6 flex items-center justify-center">
          <CircularProgress className="self-center" />
        </div>
      ) : item ? (
        // Do it here
        <div className="flex flex-row screen_1170:flex-col items-center justify-center max-h-[90vh] gap-6 pr-6 pl-6">
          {selectedStyle ? (
            <video
              preload="true"
              className="max-w-[520px] h-[90vh] rounded-lg screen_1170:h-[375px] screen_445:h-[256px]"
              muted
              loop
              autoPlay
              playsInline
              src={selectedStyle}
            ></video>
          ) : (
            <img
              loading="lazy"
              src={item.images.background}
              alt={item.description}
              className="h-[90vh] rounded-lg screen_1170:h-[375px] screen_445:h-[256px]"
            />
          )}
          <div className="w-[2px] min-h-[90vh] bg-black/60 screen_1170:min-h-[2px] screen_1170:min-w-[15%]"></div>
          <div className="max-h-[90vh] max-w-[450px] w-[450px] overflow-y-auto scrollbar screen_1170:w-[315px]">
            <div className="flex flex-col items-center justify-center mr-4 screen_1170:ml-4">
              <div className="text-[28px] text-black/80 uppercase text-center">
                {item?.name}
              </div>
              <p>
                {item.rarity.name} {item.type.name}
              </p>
              <div className="flex flex-col items-start justify-center my-2">
                <div className="flex items-center">
                  <img src={vBucks} alt="V-Bucks" className="w-6 h-6 mr-2" />
                  <p className="font-bold text-2xl">{item.price || "-"}</p>
                </div>
                <div className="flex items-start justify-center">
                  <IoMdPricetag className="w-6 h-6 mr-2 text-[#ffc007] self-center" />
                  <p className="font-bold text-2xl">
                    {convertVbuckToTHB(item.price) || "-"} บาท
                  </p>
                </div>
              </div>
              <p className="italic text-center text-sm mb-4">
                {item.description || "-"}
              </p>
              {/* <div className="mb-4">details...</div> */}
              <div className="flex flex-col gap-2">
                <CustomButton
                  text={"ขั้นตอนการสั่งซื้อ"}
                  link={"/ItemPriceTable"}
                  className={"text-lg"}
                />
                <Link
                  to={"https://discord.com/invite/5t8Juy7FHu"}
                  className="text-white leading-normal p-4 px-6 flex flex-col justify-center items-center bg-[#4b2762] rounded-[20px] hover:bg-[#4b2762]/90"
                >
                  <p className="text-xl">ราคา Member</p>
                  <p className="text-xs">ตรวจสอบใน Discord</p>
                </Link>
              </div>
              <div className="mt-4 mb-2 font-bold">Styles: </div>
              <div className="flex items-center justify-center flex-wrap gap-3 mb-2">
                {styles.length !== 0 ? (
                  styles.map((style, i) => (
                    <div
                      key={i + "_" + style}
                      className="cursor-pointer bg-[#1780d8] rounded-xl"
                    >
                      <img
                        src={style.image}
                        alt=""
                        className="rounded-xl w-[80px] transition ease-in-out duration-300 hover:scale-110 hover:brightness-105"
                        onClick={() => setSelectedStyle((item.previewVideos.length === 1 ? item.previewVideos[0]?.url : item.previewVideos[i]?.url) || null)}
                      />
                    </div>
                  ))
                ) : (
                  <p>No style</p>
                )}
              </div>
            </div>
          </div>
          <div
            className="absolute top-5 right-5 cursor-pointer screen_1170:top-2 screen_1170:right-2"
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
