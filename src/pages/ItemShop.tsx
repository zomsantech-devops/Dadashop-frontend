import Footer from "../components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import vBucks from "../images/vbucks-coins.png";
import CircularProgress from "@mui/material/CircularProgress";
import { DateDisplay } from "../components/DateDisplay";
import Modal from "../components/ItemModal";
import ItemDetail from "./ItemDetail";
import { useLocation, useNavigate } from "react-router-dom";

interface Item {
  _id: string | null;
  id: string | null;
  type_id: string | null;
  type_name: string | null;
  name: string | null;
  description: string | null;
  rarity_id: string | null;
  rarity_name: string | null;
  images_texture_background: string | null;
  images_item: string | null;
  images_background: string | null;
  images_full_background: string | null;
  display_assets: any[];
  section_name: string | null;
  finalPrice: number | null;
  time_fetch: string | null;
  time_update: string | null;
  uid_update: string | null;
  __v: number | null;
}

interface ResponseData {
  success: boolean;
  data: Item[];
}

function ItemShop() {
  const [data, setData] = useState<Item[]>([]);
  const [categories, setCategories] = useState<
    { name: string; count: number }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [section, setSection] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (itemId: string) => {
    setSelectedItemId(itemId);
    setOpen(true);

    navigate(`/item-shop?id=${itemId}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const itemId = searchParams.get("id");

    if (itemId) {
      setSelectedItemId(itemId);
      setOpen(true);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<ResponseData>(
          "https://dadashop-backend.vercel.app/api/v1/item/"
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

    fetchData();
  }, []);

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(data.map((item) => item.type_name || ""))
    );
    const categoryCounts = uniqueCategories.map((category) => ({
      name: category,
      count: data.filter((item) => item.type_name === category).length,
    }));
    setCategories([{ name: "All", count: data.length }, ...categoryCounts]);
    setSelectedCategory("All");
  }, [data]);

  useEffect(() => {
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
  }, [data]);
  

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "All" : category);
  };

  const capitalize = (word: string) => {
    const firstLetterCap = word.charAt(0).toUpperCase();
    const remainingLetters = word.slice(1);
    const capitalizedWord = firstLetterCap + remainingLetters;
    return capitalizedWord;
  };

  const convertVbuckToTHB = (price: number | null) => {
    if (price === null) {
      return 0;
    }
    const baht = (price / 100) * 5;
    return baht;
  };

  return (
    <>
      <div className="flex flex-col justify-center px-[30px] screen_445:px-3">
        <div className="text-center my-[40px]">
          <p className="text-5xl font-bold leading-normal my-1">
            Daily Item Shop
          </p>
          <div className="text-3xl text-[#4a4a59]">
            <DateDisplay />
          </div>
        </div>
        {isLoading ? (
          <CircularProgress className="self-center" />
        ) : (
          <>
            <div className="flex self-center justify-left gap-4 mb-5 overflow-x-auto max-w-full screen_500:gap-2 scrollbar-category">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`px-4 py-2 rounded-2xl font-bold whitespace-nowrap ${
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
            <div className="flex flex-col self-center gap-[20px] screen_960:gap-[40px] screen_500:w-full">
              {selectedCategory === "All" &&
                section.map((sec) => (
                  <section key={sec}>
                    <h1 className="pt-3.5 pb-2 text-4xl text-black/80 font-semibold">
                      {sec}
                    </h1>
                    <ul className="grid grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 screen_810:grid-cols-3 sm:grid-cols-2 gap-4 screen_500:place-items-center screen_445:gap-2">
                      {data
                        .filter((item) => item.section_name === sec)
                        .map((item) => (
                          <li
                            key={item._id || ""}
                            className="w-[187px] cursor-pointer screen_500:w-full"
                            onClick={() => handleItemClick(item.id || "")}
                          >
                            <div className="relative group overflow-hidden rounded-lg">
                              <img
                                loading="lazy"
                                src={item.images_background || ""}
                                alt={item.name || ""}
                                className="rounded-lg transition ease-in-out duration-300 group-hover:scale-110 group-hover:brightness-105 overflow-hidden"
                              />
                              <div className="absolute bottom-0 item-title-shadow text-white p-2 pt-4 text-xl uppercase antialiased leading-6 card-bg w-full rounded-lg screen_445:text-lg screen_445:leading-normal">
                                <h3 className="text-[20px] font-bold leading-5 pb-1.5 pt-2 screen_445:pb-0">
                                  {item.name}
                                </h3>
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
                                      {convertVbuckToTHB(item.finalPrice) ||
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
                  </section>
                ))}
              <ul className="grid grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 screen_810:grid-cols-3 sm:grid-cols-2 gap-4 screen_500:place-items-center screen_445:gap-2">
                {data
                  .filter((item) => item.type_name === selectedCategory)
                  .map((item) => (
                    <li
                      key={item._id || ""}
                      className="w-[187px] cursor-pointer screen_500:w-full"
                      onClick={() => handleItemClick(item.id || "")}
                    >
                      <div className="relative group overflow-hidden rounded-lg">
                        <img
                          loading="lazy"
                          src={item.images_background || ""}
                          alt={item.name || ""}
                          className="rounded-lg transition ease-in-out duration-300 group-hover:scale-110 group-hover:brightness-105 overflow-hidden"
                        />
                        <div className="absolute bottom-0 item-title-shadow text-white p-2 pt-4 text-xl uppercase antialiased leading-6 card-bg w-full rounded-lg screen_445:text-lg screen_445:leading-normal">
                          <h3 className="text-[20px] font-bold leading-5 pb-1.5 pt-2 screen_445:pb-0">
                            {item.name}
                          </h3>
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
                                {convertVbuckToTHB(item.finalPrice) || "-"} บาท
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
        <Modal open={open} onClose={() => setOpen(false)}>
          <ItemDetail
            itemId={selectedItemId}
            onClose={() => {
              navigate(`/item-shop`);
              setOpen(false);
            }}
          />
        </Modal>
      )}
      <Footer />
    </>
  );
}

export default ItemShop;
