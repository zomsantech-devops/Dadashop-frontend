import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

import vBucks from "../assets/icons/vbucks-coins.png";
import { CustomButton } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose, IoMdPricetag } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { Carousel } from "../components/Carousel";
import {
  DisplayAssetsItem,
  IdProps,
  Item,
  ResponseData,
  Styles,
} from "../types";
import noImg from "../assets/images/empty.jpg";
import { useGenerationStore } from "../state/idea-generation";
import { ItemHistory } from "../components/ItemHistory";

const ItemDetail = ({ itemId, onClose }: IdProps) => {
  const [item, setItem] = useState<Item>();
  const [loading, setLoading] = useState<boolean>(false);
  const [styles, setStyles] = useState<Styles[]>([]);
  const [previewVideo, setPreviewVideo] = useState<string | null>();
  const [displayAssets, setDisplayAssets] = useState<DisplayAssetsItem[]>([]);
  const [channelName, setChannelName] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isPlaying, setIsPlaying } = useGenerationStore();

  const navigate = useNavigate();

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      // Toggle the isPlaying state to reflect the change for UI purposes.
      setIsPlaying(!videoRef.current.paused);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await axios.get<ResponseData>(
          `${process.env.REACT_APP_API}/item/${itemId}`
        );
        setItem(response.data.data.item);
        setStyles(response.data.data.item.styles);
        setPreviewVideo(response.data.data.item.previewVideos[0]?.url || "");
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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [onClose, setIsPlaying]);

  return (
    <>
      {loading ? (
        <div className="px-6 flex items-center justify-center">
          <CircularProgress className="self-center" />
        </div>
      ) : item ? (
        <div className="flex screen_1250:flex-col items-center justify-center max-h-[80vh] screen_1250:max-h-none gap-6 px-6 screen_1250:pt-4">
          {item.type.id !== "emote" ? (
            item.type.id !== "bundle" ? (
              displayAssets.length !== 0 ? (
                <div className="max-w-[520px] screen_610:w-[375px] screen_445:w-[275px] rounded-lg">
                  <Carousel>
                    {displayAssets.map((asset) => (
                      <img
                        key={asset.materialInstance}
                        src={asset.background || noImg}
                        alt={asset.displayAsset}
                        className={`aspect-square rounded-lg`}
                      />
                    ))}
                  </Carousel>
                </div>
              ) : previewVideo ? (
                <div className="relative">
                  <video
                    preload="true"
                    className="max-w-[520px] h-[80vh] rounded-lg screen_1250:h-[375px] screen_445:h-[256px] cursor-pointer"
                    muted
                    loop
                    autoPlay
                    playsInline
                    src={previewVideo}
                    onClick={toggleVideoPlay}
                    ref={videoRef}
                    onPlay={handlePlay}
                    onPause={handlePause}
                  ></video>
                  {!isPlaying && (
                    <div className="absolute left-3 bottom-3">
                      <FaPlay className="text-white" />
                    </div>
                  )}
                </div>
              ) : (
                <img src={noImg} alt="empty" className={`rounded-lg`} />
              )
            ) : (
              <div className="flex flex-col">
                <p className="text-2xl font-bold text-center mb-4">
                  {item.grants.length} ไอเท็มในเซ็ต
                </p>
                <div className="flex items-center justify-center flex-wrap gap-3 w-[648px] screen_910:w-auto">
                  {item.grants.length !== 0 ? (
                    item.grants.map((grant) => (
                      <div
                        key={grant.id}
                        className="cursor-pointer rounded-xl"
                      >
                        {!grant.images.icon_background ? (
                          <>
                            <img
                              src={noImg}
                              alt="empty"
                              className="rounded-xl w-[120px] transition ease-in-out duration-300 hover:scale-110 hover:brightness-105 screen_445:w-[80px]"
                            />
                            <p className="text-center">(No image)</p>
                          </>
                        ) : (
                          <img
                            src={grant.images.icon_background}
                            alt=""
                            className="bg-[#1780d8] rounded-xl w-[120px] transition ease-in-out duration-300 hover:scale-110 hover:brightness-105 screen_445:w-[80px]"
                            onClick={() => handleItemClick(grant.id)}
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <img src={noImg} alt="empty" className="rounded-lg" />
                  )}
                </div>
              </div>
            )
          ) : previewVideo ? (
            <div className="relative">
              <video
                preload="true"
                className="max-w-[520px] h-[80vh] rounded-lg screen_610:h-[375px] cursor-pointer"
                loop
                autoPlay
                playsInline
                src={previewVideo}
                onClick={toggleVideoPlay}
                ref={videoRef}
                onPlay={handlePlay}
                onPause={handlePause}
              ></video>
              {!isPlaying && (
                <div className="absolute left-3 bottom-3">
                  <FaPlay className="text-white" />
                </div>
              )}
            </div>
          ) : (
            <img
              src={item.images.background}
              alt="empty"
              className={`max-w-[520px] h-[80vh] object-cover rounded-lg screen_1250:h-[325px] screen_445:h-[256px]`}
            />
          )}

          <div className="w-[2px] min-h-[80vh] bg-black/60 screen_1250:min-h-[2px] screen_1250:min-w-[15%]"></div>
          <div className="min-w-[min(50vw,500px)] max-h-[80vh] screen_1250:max-h-full text-center screen_810:min-w-none overflow-auto py-6">
            <div className="flex flex-col items-center justify-center px-2.5 mr-4 screen_1250:ml-4">
              <div className="text-[30px] font-bold text-black/80 uppercase text-center">
                {item?.name}
              </div>
              <p>
                {item.rarity.name} {item.type.name}
              </p>
              <div className="flex flex-col items-start justify-center my-2">
                <div className="flex items-center">
                  <img src={vBucks} alt="V-Bucks" className="w-6 h-6 mr-2" />
                  {!item.price ? (
                    <div className="flex gap-2">
                      <p className="font-bold text-2xl">{item.price}</p>
                      <p className="font-bold text-2xl">
                        (
                        <span className="text-[#3D82D1] cursor-pointer">
                          {item.set.name}
                        </span>
                        )
                      </p>
                    </div>
                  ) : (
                    <p className="font-bold text-2xl">{item.price}</p>
                  )}
                </div>
                <div className="flex items-start justify-center">
                  <IoMdPricetag className="w-6 h-6 mr-2 text-[#ffc007] self-center" />
                  <p className="font-bold text-2xl">
                    {convertVbuckToTHB(item.price)} บาท
                  </p>
                </div>
              </div>
              <p className="italic text-center text-sm mb-2">
                {item.description || "-"}
              </p>
              <div className="mb-4">
                <ItemHistory shopHistory={item.shopHistory} />
              </div>
              <div className="flex flex-col gap-2">
                <CustomButton
                  text={"ขั้นตอนการสั่งซื้อ"}
                  link={"/price-fortnite"}
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
