import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useEffect, useState } from "react";

import vBucks from "../images/vbucks-coins.png";
import { CustomButton } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { IoMdPricetag } from "react-icons/io";
import { Carousel } from "../components/Carousel";

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
    id: string;
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
  grants: Grants[];
  displayAssets: DisplayAssets[];
}

interface Styles {
  channelName: string;
  image: string;
  video_url: string;
}

interface Grants {
  id: string;
  images: {
    icon_background: string;
  };
}

interface DisplayAssets {
  displayAsset: string;
  background: string;
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
  const [styles, setStyles] = useState<Styles[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string | null>();
  const [displayAssets, setDisplayAssets] = useState<DisplayAssets[]>([]);
  const [channelName, setChannelName] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await axios.get<ResponseData>(
          `https://dadashop-backend.vercel.app/api/v1/item/${itemId}`
        );
        setItem(response.data.data.item);
        setStyles(response.data.data.item.styles);
        setSelectedStyle(response.data.data.item.previewVideos[0]?.url || "");
        setDisplayAssets(response.data.data.item.displayAssets);
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

  useEffect(() => {
    const uniqueSection = Array.from(
      new Set(styles.map((cn) => cn.channelName || ""))
    );

    setChannelName(uniqueSection);
  }, [styles]);

  const convertVbuckToTHB = (price: number | null) => {
    if (price === null) {
      return 0;
    }
    const baht = (price / 100) * 5;
    return baht;
  };

  const handleItemClick = (itemId: string) => {
    navigate(`/item-shop?id=${itemId}`);
  };

  return (
    <>
      {loading ? (
        <div className="px-6 flex items-center justify-center">
          <CircularProgress className="self-center" />
        </div>
      ) : item ? (
        <div className="flex screen_1170:flex-col items-center justify-center max-h-[80vh] screen_1170:max-h-none gap-6 px-6 screen_1170:pt-4">
          {item.type.id !== "emote" ? (
            item.type.id !== "bundle" ? (
              <div className="max-w-[520px] screen_610:w-[375px] screen_445:w-[275px] rounded-lg">
                <Carousel>
                  {displayAssets.map((asset) => (
                    <img
                      key={asset.displayAsset}
                      src={asset.background}
                      alt={asset.displayAsset}
                      className={`aspect-square rounded-lg`}
                    />
                  ))}
                </Carousel>
              </div>
            ) : (
              <div className="flex items-center justify-center flex-wrap gap-3 w-[648px] screen_910:w-auto">
                {item.grants.length !== 0 ? (
                  item.grants.map((grant) => (
                    <div
                      key={grant.id}
                      className="cursor-pointer bg-[#1780d8] rounded-xl"
                    >
                      <img
                        src={grant.images.icon_background}
                        alt=""
                        className="rounded-xl w-[120px] transition ease-in-out duration-300 hover:scale-110 hover:brightness-105 screen_445:w-[80px]"
                        onClick={() => handleItemClick(grant.id)}
                      />
                    </div>
                  ))
                ) : (
                  <p className="w-96 text-center">No grant</p>
                )}
              </div>
            )
          ) : (
            selectedStyle && (
              <video
                preload="true"
                className="max-w-[520px] h-[80vh] rounded-lg screen_1170:h-[375px] screen_445:h-[256px]"
                muted
                loop
                autoPlay
                playsInline
                src={selectedStyle}
              ></video>
            )
          )}

          <div className="w-[2px] min-h-[80vh] bg-black/60 screen_1170:min-h-[2px] screen_1170:min-w-[15%]"></div>
          <div className="min-w-[min(50vw,500px)] max-h-[80vh] text-center screen_810:min-w-none overflow-auto py-6">
            <div className="flex flex-col items-center justify-center px-2.5 mr-4 screen_1170:ml-4">
              <div className="text-[30px] font-bold text-black/80 uppercase text-center">
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
              <div className="flex flex-col gap-2">
                <CustomButton
                  text={"ขั้นตอนการสั่งซื้อ"}
                  link={"/item-price-table"}
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
              {styles.length !== 0 && (
                <>
                  {channelName.map((cn) => (
                    <section key={cn}>
                      <h1 className="pt-3.5 pb-2 text-lg font-bold text-black/80 mb-2">
                        {cn}
                      </h1>
                      <div className="flex items-center justify-center flex-wrap gap-3 mb-2">
                        {styles
                          .filter((style) => style.channelName === cn)
                          .map((style, i) => (
                            <div
                              key={i + "_" + style}
                              className="cursor-pointer bg-[#1780d8] rounded-xl"
                            >
                              <img
                                src={style.image}
                                alt=""
                                className="rounded-xl w-[80px] transition ease-in-out duration-300 hover:scale-110 hover:brightness-105"
                                onClick={() =>
                                  setSelectedStyle(
                                    (item.previewVideos.length === 1
                                      ? item.previewVideos[0]?.url
                                      : item.previewVideos[i]?.url) || null
                                  )
                                }
                              />
                            </div>
                          ))}
                      </div>
                    </section>
                  ))}
                </>
              )}
            </div>
          </div>
          <div
            className="absolute top-2 right-2 cursor-pointer screen_1170:top-3 screen_1170:right-3 screen_443:top-2 screen_443:right-2"
            onClick={onClose}
          >
            <IoMdClose className="hover:bg-black/20 rounded-xl w-5 h-5 p-0.5 screen_443:w-6 screen_443:h-6" />
          </div>
        </div>
      ) : (
        <p>No item found.</p>
      )}
    </>
  );
};

export default ItemDetail;
