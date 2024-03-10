import axios from "axios";
import { startTransition, useEffect, useRef, useState } from "react";

import vBucks from "../assets/icons/vbucks-coins.webp";
import { CustomButton } from "../components/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  IoMdPricetag,
  IoMdPlay,
  IoMdVolumeHigh,
  IoMdVolumeOff,
} from "react-icons/io";
import {
  // DisplayAssetsItem,
  IdProps,
  Item,
  // Styles,
  Bundle,
} from "../types";
import noImg from "../assets/images/empty.webp";
import { useGenerationStore } from "../state/idea-generation";
import { ItemHistory } from "../components/ItemHistory";
import { convertVbuckToTHB } from "../lib/utils";
import React from "react";
import ItemDetailSkeleton from "../components/skeleton/ItemDetailSkeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { CarouselSlider } from "../components/Carousel";

export const ItemDetail = ({ itemId, onClose }: IdProps) => {
  const [item, setItem] = useState<Item | null>();
  const [loading, setLoading] = useState<boolean>(false);
  // const [styles, setStyles] = useState<Styles[]>([]);
  // const [previewVideo, setPreviewVideo] = useState<string | null>();
  // const [displayAssets, setDisplayAssets] = useState<DisplayAssetsItem[]>([]);
  const [channelName, setChannelName] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [rate, setRate] = useState<number>(5);
  const [bundleId, setBundleId] = useState<string | null>();
  const [bundle, setBundle] = useState<Bundle>();
  const [isMuted, setIsMuted] = useState(false);

  const { isPlaying, setIsPlaying } = useGenerationStore();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setItem(null);
    // setDisplayAssets([]);
    // setStyles([]);
    // setPreviewVideo(null);
    setBundle({
      id: "",
      name: "",
      price: "",
    });

    const fetchItem = async () => {
      if (itemId) {
        setLoading(true);
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API}/item/${itemId}`
          );
          startTransition(() => {
            setItem(response.data.data.item);
            // setStyles(response.data.data.item.styles);
            // setPreviewVideo(
            //   response.data.data.item.previewVideos[0]?.url || ""
            // );
            // setDisplayAssets(response.data.data.item.displayAssets);
            setLoading(false);
          });
        } catch (error) {
          setLoading(false);
          console.error("Error fetching data:", error);
        } finally {
        }
      }
    };

    const getRate = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/setting/currency`
        );
        setRate(response.data.data.rate);
      } catch (error) {}
    };

    fetchItem();
    getRate();
  }, [itemId]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const itemBundleId = searchParams.get("p_id");

    if (itemBundleId) {
      setBundleId(itemBundleId);
    }

    const fetchBundle = async () => {
      if (itemBundleId) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API}/item/${itemBundleId}`
          );
          startTransition(() => {
            setBundle(response.data.data.item);
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchBundle();
  }, [location.search]);

  useEffect(() => {
    const uniqueSection = Array.from(
      new Set(item?.styles.map((cn) => cn.channelName || ""))
    );

    setChannelName(uniqueSection);
  }, [item?.styles]);

  const handleItemClick = (itemId: string, p_id?: string) => {
    let navigatePath = `/item-shop/${itemId}`;
    if (p_id) {
      navigatePath += `?p_id=${p_id}`;
    }
    navigate(navigatePath);
  };

  // Video stuff
  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
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
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [onClose, setIsPlaying]);
  // End video stuff

  const toggleVideoMute = () => {
    if (videoRef.current) {
      const newMuteState = !videoRef.current.muted;
      videoRef.current.muted = newMuteState;
      setIsMuted(newMuteState); // Update state to reflect the change
    }
  };

  return (
    <>
      {loading ? (
        <ItemDetailSkeleton />
      ) : item ? (
        <div className="flex screen_1250:flex-col items-center justify-center max-h-[80vh] screen_1250:max-h-none gap-6 px-6 screen_1250:pt-4">
          {item.type.id !== "emote" ? (
            item.type.id !== "bundle" ? (
              item.displayAssets.length !== 0 ? (
                <div className="max-w-[520px] w-[520px] h-fit screen_610:w-[375px] screen_445:w-[275px] rounded-lg">
                  <CarouselSlider displayAssets={item.displayAssets} />
                </div>
              ) : item.previewVideos[0]?.url ? (
                <div className="relative">
                  <video
                    preload="true"
                    className="max-w-[520px] h-[80vh] rounded-lg screen_1250:h-[375px] screen_445:h-[256px] cursor-pointer"
                    muted
                    loop
                    autoPlay
                    playsInline
                    src={item.previewVideos[0].url}
                    onClick={toggleVideoPlay}
                    ref={videoRef}
                    onPlay={handlePlay}
                    onPause={handlePause}
                  ></video>
                  {!isPlaying && (
                    <div
                      className="absolute left-3 bottom-3"
                      onClick={toggleVideoPlay}
                    >
                      <IoMdPlay
                        className="text-white cursor-pointer hover:scale-125 transition ease-in-out duration-300"
                        size={25}
                      />
                    </div>
                  )}
                </div>
              ) : item.images?.background ? (
                <div className="max-w-[520px] screen_610:w-[375px] screen_445:w-[275px] rounded-lg">
                  <LazyLoadImage
                    effect="blur"
                    loading="lazy"
                    src={item.images.background}
                    alt={"item in set"}
                    className={`aspect-square rounded-lg`}
                  />
                </div>
              ) : (
                <img
                  loading="lazy"
                  src={noImg}
                  alt="empty"
                  className={`rounded-lg`}
                />
              )
            ) : (
              <div className="flex flex-col mt-4">
                <div className="flex items-center justify-center flex-wrap gap-3 w-[648px] screen_910:w-auto">
                  {item.grants.length !== 0 ? (
                    item.grants.map((grant) => (
                      <div key={grant.id} className="cursor-pointer rounded-xl">
                        {!grant.images?.icon_background ? (
                          <>
                            <img
                              loading="lazy"
                              src={noImg}
                              alt="empty"
                              className="rounded-xl w-[120px] transition ease-in-out duration-300 hover:scale-110 hover:brightness-105 screen_445:w-[80px]"
                            />
                          </>
                        ) : (
                          <div className="transition ease-in-out duration-300 hover:scale-110 hover:brightness-105">
                            <LazyLoadImage
                              effect="blur"
                              src={grant.images.icon_background}
                              alt="item grant"
                              className="bg-[#1780d8] rounded-xl w-[120px] screen_445:w-[80px]"
                              onClick={() =>
                                handleItemClick(grant.id, itemId as string)
                              }
                            />
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <img
                      loading="lazy"
                      src={noImg}
                      alt="empty"
                      className="rounded-lg"
                    />
                  )}
                </div>
              </div>
            )
          ) : // Emote preview video
          item.previewVideos ? (
            <div className="relative">
              <video
                preload="true"
                className="h-[80vh] rounded-lg screen_610:h-[375px] cursor-pointer"
                loop
                autoPlay
                playsInline
                onClick={toggleVideoPlay}
                src={item.previewVideos[0].url}
                ref={videoRef}
                onPlay={handlePlay}
                onPause={handlePause}
                muted={isMuted}
              ></video>
              {!isPlaying && (
                <div
                  className="absolute left-3 bottom-3"
                  onClick={toggleVideoPlay}
                >
                  <IoMdPlay
                    className="text-white cursor-pointer hover:scale-125 transition ease-in-out duration-300"
                    size={25}
                  />
                </div>
              )}
              <div
                className="absolute right-3 bottom-3"
                onClick={toggleVideoMute}
              >
                {isMuted ? (
                  <IoMdVolumeOff
                    className="text-white cursor-pointer hover:scale-125 transition ease-in-out duration-300"
                    size={25}
                  />
                ) : (
                  <IoMdVolumeHigh
                    className="text-white cursor-pointer hover:scale-125 transition ease-in-out duration-300"
                    size={25}
                  />
                )}
              </div>
            </div>
          ) : (
            <LazyLoadImage
              effect="blur"
              loading="lazy"
              src={item.images.background}
              alt="empty"
              className={`max-w-[520px] h-[80vh] object-cover rounded-lg screen_1250:h-[325px] screen_445:h-[256px]`}
            />
          )}

          <div className="w-[2px] min-h-[80vh] bg-black/60 screen_1250:min-h-[2px] screen_1250:min-w-[15%]"></div>
          <div className="min-w-[min(50vw,500px)] max-h-[80vh] max-w-[560px] w-[560px] screen_1250:max-h-full text-center screen_810:min-w-none overflow-auto py-6">
            <div className="flex flex-col items-center justify-center px-2.5 mr-4 screen_1250:ml-4">
              <div className="text-[30px] font-bold text-black/80 uppercase text-center">
                {item?.name}
              </div>
              <p>
                {item.rarity.name} {item.type.name}
              </p>

              <p className="mt-2 font-bold text-2xl">
                {bundle?.name && (
                  <>
                    <span>&#40;</span>
                    <span
                      className="text-[#3D82D1] cursor-pointer hover:brightness-110"
                      onClick={() => handleItemClick(bundleId || "")}
                    >
                      {bundle?.name}
                    </span>
                    <span>&#41;</span>
                  </>
                )}
              </p>
              <div className="flex flex-col items-start justify-center my-2">
                <div className="flex items-center">
                  <img
                    loading="lazy"
                    src={vBucks}
                    alt="V-Bucks"
                    className="w-6 h-6 mr-2"
                  />
                  {!item.price ? (
                    <div className="flex gap-2">
                      <p className="font-bold text-2xl">{bundle?.price}</p>
                    </div>
                  ) : (
                    <p className="font-bold text-2xl">{item.price}</p>
                  )}
                </div>
                <div className="flex items-start justify-center">
                  <IoMdPricetag className="w-6 h-6 mr-2 text-[#ffc007] self-center" />
                  <p className="font-bold text-2xl">
                    {convertVbuckToTHB(item.price, rate) ||
                      convertVbuckToTHB(
                        parseInt(bundle?.price || "0"),
                        rate
                      )}{" "}
                    บาท
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
              {item.styles.length !== 0 && (
                <>
                  {channelName.map((cn) => (
                    <section key={cn}>
                      <h1 className="pt-3.5 pb-2 text-lg font-bold text-black/80 mb-2">
                        {(cn).toUpperCase()}
                      </h1>
                      <div className="flex items-center justify-center flex-wrap gap-3 mb-2">
                        {item.styles
                          .filter((style) => style.channelName === cn)
                          .map((style, i) => (
                            <div
                              key={i + "_" + style}
                              className="cursor-pointer rounded-xl"
                            >
                              <LazyLoadImage
                                width={80}
                                height={80}
                                effect="blur"
                                src={style.image}
                                alt="style item"
                                className="rounded-xl bg-[#1780d8] transition ease-in-out duration-300 hover:scale-110 hover:brightness-105"
                              />
                            </div>
                          ))}
                      </div>
                    </section>
                  ))}
                </>
              )}
              {item.grants.length !== 0 && (
                <>
                  <h1 className="pt-3.5 pb-2 text-lg font-bold text-black/80 mb-2">
                    INCLUDING
                  </h1>

                  <div className="flex w-full items-center justify-center flex-wrap gap-3 mb-2">
                    {/* Skin */}

                    {item.type.id === "outfit" &&
                      item.images?.icon_background && (
                        <div className="cursor-pointer rounded-xl">
                          <LazyLoadImage
                            width={80}
                            height={80}
                            effect="blur"
                            src={item.images.icon_background}
                            alt={"bg icon"}
                            className={`rounded-xl w-[80px] transition ease-in-out duration-300 hover:scale-110 hover:brightness-105`}
                          />
                        </div>
                      )}

                    {/* Grant */}
                    {item.grants.map(
                      (grant) =>
                        grant.images?.icon_background && (
                          <div
                            key={grant.id}
                            className="cursor-pointer rounded-xl"
                            onClick={() =>
                              handleItemClick(grant.id, itemId as string)
                            }
                          >
                            <LazyLoadImage
                              width={80}
                              height={80}
                              effect="blur"
                              src={grant.images.icon_background}
                              alt="item grant"
                              className="rounded-xl w-[80px] transition ease-in-out duration-300 hover:scale-110 hover:brightness-105"
                            />
                          </div>
                        )
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="px-6">Item not found! Please try again.</p>
      )}
    </>
  );
};

export const MemoItemDetail = React.memo(ItemDetail);
