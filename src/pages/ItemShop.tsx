import Footer from "../components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import vBucks from "../images/vbucks-coins.png";
import CircularProgress from "@mui/material/CircularProgress";

interface Item {
  _id: string;
  id: string;
  type_id: string;
  type_name: string;
  name: string;
  description: string;
  rarity_id: string;
  images_background: string;
  images_full_background: string;
  finalPrice: number | null;
  time_fetch: string;
  time_update: string;
  uid_update: string;
  __v: number;
}

interface ResponseData {
  success: boolean;
  message: Item[];
}

function ItemShop() {
  const [data, setData] = useState<Item[]>([]);
  const [categories, setCategories] = useState<
    { name: string; count: number }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<ResponseData>(
          "https://dadashop-backend.vercel.app/api/v1/item/"
        );
        setData(response.data.message);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(data.map((item) => item.type_name))
    );
    const categoryCounts = uniqueCategories.map((category) => ({
      name: category,
      count: data.filter((item) => item.type_name === category).length,
    }));
    setCategories([{ name: "All", count: data.length }, ...categoryCounts]);
    setSelectedCategory("All");
  }, [data]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "All" : category);
  };

  return (
    <>
      <div className="flex flex-col justify-center px-[30px]">
        <p className="text-center text-5xl font-bold leading-normal my-[40px]">
          รายการไอเทม
        </p>
        {isLoading ? (
          <CircularProgress className="self-center" />
        ) : (
          <>
            <div className="flex self-center justify-left gap-4 mb-5 overflow-x-auto max-w-full">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`px-4 py-2 rounded-md ${
                    selectedCategory === category.name
                      ? "bg-[#3d82d1] text-white"
                      : "bg-gray-200 text-gray-800"
                  } hover:bg-[#3d82d1] hover:text-white focus:outline-none`}
                >
                  {category.name.replace(/^sparks_/, "")} ({category.count})
                </button>
              ))}
            </div>
            <div className="flex flex-col self-center gap-[20px] screen_960:gap-[40px] screen_500:w-full">
              <ul className="grid grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 screen_810:grid-cols-3 sm:grid-cols-2 screen_445:grid-cols-1 gap-4 screen_500:self-center">
                {data
                  .filter((item) =>
                    selectedCategory === "All"
                      ? true
                      : selectedCategory
                      ? item.type_name === selectedCategory
                      : true
                  )
                  .map((item) => (
                    <li
                      key={item._id}
                      className="w-[187px] screen_445:w-[256px] cursor-pointer"
                    >
                      <div className="relative group overflow-hidden rounded-lg">
                        <img
                          loading="lazy"
                          src={item.images_background}
                          alt={item.name}
                          className="rounded-lg transition ease-in-out duration-300 group-hover:scale-110 group-hover:brightness-105 overflow-hidden"
                        />
                        <div className="absolute bottom-0 item-title-shadow text-white p-2 pt-4 fn-font tracking-wider text-2xl uppercase antialiased leading-6 card-bg w-full rounded-lg">
                          <h3 className="pb-1.5 pt-2">{item.name}</h3>
                          <div className="flex">
                            <img
                              src={vBucks}
                              alt="V-Bucks"
                              className="w-5 h-5 mr-2"
                            />
                            <p>{item.finalPrice || "-"}</p>
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
      <Footer />
    </>
  );
}

export default ItemShop;
