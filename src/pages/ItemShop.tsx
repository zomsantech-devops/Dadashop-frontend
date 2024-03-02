import Footer from "../components/shared/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import vBucks from "../assets/icons/vbucks-coins.webp";
import CircularProgress from "@mui/material/CircularProgress";
import { DateDisplay } from "../components/DateDisplay";
import Modal from "../components/ItemModal";
import { MemoItemDetail } from "./ItemDetail";
import { useNavigate, useParams } from "react-router-dom";
import { SmallCarousel } from "../components/SmallCarousel";

import "../components/misterPepper.css";
import { ItemProps } from "../types";
import { convertVbuckToTHB, isToday } from "../lib/utils";
import { capitalize } from "@mui/material";

export interface ResponseData {
  success: boolean;
  data: ItemProps[];
}

function ItemShop() {
  const { id } = useParams<{ id?: string }>();

  const [data, setData] = useState<ItemProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [section, setSection] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [categories, setCategories] = useState<
    { name: string; count: number }[]
  >([
    { name: "All", count: 0 },
    { name: "New", count: 0 },
  ]);
  const [rate, setRate] = useState<number>(5);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<ResponseData>(
          `${process.env.REACT_APP_API}/item`
        );
        const filteredData = response.data.data.filter(
          (item) => item.id !== null
        );
        setData(filteredData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
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

    fetchData();
    getRate();
  }, []);

  useEffect(() => {
    if (id) {
      setSelectedItemId(id);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [id]);

  const handleItemClick = (itemId: string) => {
    setSelectedItemId(itemId);
    navigate(`/item-shop/${itemId}`);
  };

  const handleCloseModal = () => {
    setOpen(false);
    navigate("/item-shop");
  };

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(data.map((item) => item.type_name || ""))
    );
    const categoryCounts = uniqueCategories.map((category) => ({
      name: category,
      count: data.filter((item) => item.type_name === category).length,
    }));

    // Calculate count for "New" category based on items released today
    const newItemsCount = data.filter((item) => {
      const releaseDate = new Date(item.release_date || "");
      return isToday(releaseDate);
    }).length;

    const uniqueSection = Array.from(
      new Set(data.map((sec) => sec.section_name || ""))
    );

    const sortedSections = uniqueSection.sort((a, b) => {
      if (a === "Jam Tracks") return 1;
      if (b === "Jam Tracks") return -1;
      if (a === "Gear For Festival") return 1;
      if (b === "Gear For Festival") return -1;
      return 0;
    });

    setSection(sortedSections);
    setCategories([
      { name: "All", count: data.length },
      { name: "New", count: newItemsCount }, // Add the "New" category here
      ...categoryCounts,
    ]);
    setSelectedCategory("All");
  }, [data]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "All" : category);
  };

  return (
    <>
      <div className="flex flex-col justify-center px-[30px] screen_445:px-3">
        <div className="text-center my-[40px]">
          {/* Header */}
          <p className="text-[38px] font-bold leading-normal my-1 screen_930:text-4xl screen_445:text-3xl">
            Daily Item Shop
          </p>
          {/* Date */}
          <div className="text-[26px] text-[#4a4a59] screen_930:text-2xl screen_445:text-xl">
            <DateDisplay />
          </div>
        </div>
        {/* Fetching data */}
        {isLoading ? (
          <CircularProgress className="self-center" />
        ) : (
          <>
            {/* Categories tabs */}
            <div className="flex self-center justify-left gap-4 mb-5 overflow-x-auto max-w-[1200px] screen_1250:max-w-full screen_500:gap-2 scrollbar-category rounded-xl">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`px-4 py-2 rounded-2xl font-bold whitespace-nowrap screen_445:text-sm ${
                    selectedCategory === category.name
                      ? "bg-[#3d82d1] text-white"
                      : "bg-gray-200 text-gray-800"
                  } hover:bg-[#3d82d1] hover:text-white focus:outline-none`}
                >
                  {category.count}{" "}
                  {capitalize(category.name.replace(/^sparks_/, ""))}
                </button>
              ))}
            </div>
            {/* Fetch all items */}
            <div className="flex flex-col self-center gap-[20px] screen_960:gap-[40px] screen_500:w-full">
              {selectedCategory === "All" &&
                section.map((sec) => (
                  <section key={sec}>
                    <h1 className="pt-3.5 pb-2 text-[26px] text-black/80 font-semibold screen_930:text-xl screen_445:text-lg mb-2">
                      {sec}
                    </h1>
                    <ul className="grid grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 screen_810:grid-cols-3 sm:grid-cols-2 gap-4 screen_500:place-items-center screen_445:gap-2">
                      {data
                        .filter((item) => item.section_name === sec)
                        .map((item) => (
                          <li
                            key={item._id || ""}
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
                                  <SmallCarousel
                                    displayAssets={item.display_assets || []}
                                  />
                                </div>
                              )}
                              <div className="absolute bottom-0 item-title-shadow text-white p-2 pt-4 text-lg uppercase antialiased leading-6 card-bg w-full rounded-lg screen_445:text-lg screen_445:leading-normal">
                                <div className="font-bold leading-5 pb-1.5 pt-2 screen_445:pb-0">
                                  {item.name}
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center justify-center">
                                    <img
                                      src={vBucks}
                                      alt="V-Bucks"
                                      className="w-5 h-5 mr-1"
                                    />
                                    <p className="font-bold">
                                      {item.finalPrice || "-"}
                                    </p>
                                  </div>
                                  <div className="text-[#aafffa]">
                                    <p className="font-bold">
                                      {convertVbuckToTHB(
                                        item.finalPrice,
                                        rate
                                      ) || "-"}{" "}
                                      บาท
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </section>
                ))}
              <ul className="grid grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 screen_810:grid-cols-3 sm:grid-cols-2 gap-4 screen_500:place-items-center screen_445:gap-2">
                {selectedCategory === "New"
                  ? data
                      .filter((item) =>
                        isToday(new Date(item.release_date || ""))
                      )
                      .map((item) => (
                        <li
                          key={item._id || ""}
                          className="relative w-[187px] cursor-pointer screen_500:w-full"
                          onClick={() => handleItemClick(item.id || "")}
                        >
                          <div className="absolute -top-2 -right-2 text-white bg-[#cb3369] px-2 py-0.5 rounded-md font-bold z-[20]">
                            NEW!
                          </div>
                          <div className="relative group overflow-hidden rounded-lg">
                            {item.display_assets.length !== 0 && (
                              <div className="w-[187px]">
                                <SmallCarousel
                                  displayAssets={item.display_assets}
                                />
                              </div>
                            )}
                            <div className="absolute bottom-0 item-title-shadow text-white p-2 pt-4 text-xl uppercase antialiased leading-6 card-bg w-full rounded-lg screen_445:text-lg screen_445:leading-normal">
                              <div className="text-[20px] font-bold leading-5 pb-1.5 pt-2 screen_445:pb-0">
                                {item.name}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center justify-center">
                                  <img
                                    src={vBucks}
                                    alt="V-Bucks"
                                    className="w-5 h-5 mr-1"
                                  />
                                  <p className="font-bold">
                                    {item.finalPrice || "-"}
                                  </p>
                                </div>
                                <div className="text-[#aafffa]">
                                  <p className="font-bold">
                                    {convertVbuckToTHB(item.finalPrice, rate) ||
                                      "-"}{" "}
                                    บาท
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                  : data
                      .filter((item) => item.type_name === selectedCategory)
                      .map((item) => (
                        <li
                          key={item._id || ""}
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
                                <SmallCarousel
                                  displayAssets={item.display_assets}
                                />
                              </div>
                            )}
                            <div className="absolute bottom-0 item-title-shadow text-white p-2 pt-4 text-xl uppercase antialiased leading-6 card-bg w-full rounded-lg screen_445:text-lg screen_445:leading-normal">
                              <div className="text-[20px] font-bold leading-5 pb-1.5 pt-2 screen_445:pb-0">
                                {item.name}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center justify-center">
                                  <img
                                    src={vBucks}
                                    alt="V-Bucks"
                                    className="w-5 h-5 mr-1"
                                  />
                                  <p className="font-bold">
                                    {item.finalPrice || "-"}
                                  </p>
                                </div>
                                <div className="text-[#aafffa]">
                                  <p className="font-bold">
                                    {convertVbuckToTHB(item.finalPrice, rate) ||
                                      "-"}{" "}
                                    บาท
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
              </ul>
            </div>
          </>
        )}
      </div>
      {selectedItemId && (
        // <Modal open={open} onClose={handleCloseModal}>
        //   <div className="">Hello</div>
        // </Modal>
        <Modal open={open} onClose={handleCloseModal}>
          <MemoItemDetail itemId={selectedItemId} onClose={handleCloseModal} />
        </Modal>
      )}
      <Footer />
    </>
  );
}

export default ItemShop;
