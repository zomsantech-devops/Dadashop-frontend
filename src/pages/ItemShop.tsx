import Footer from "../components/shared/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { DateDisplay } from "../components/DateDisplay";
import Modal from "../components/ItemModal";
import { MemoItemDetail } from "./ItemDetail";
import { useNavigate, useParams } from "react-router-dom";

import "../components/misterPepper.css";
import { ItemProps } from "../types";
import { isToday } from "../lib/utils";
import { getRate } from "../utils/api";
import { Categories } from "../components/Categories";
import { ItemCard } from "../components/ItemCard";
import ItemShopSkeleton from "../components/skeleton/ItemShopSkeleton";

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

    const initializeData = async () => {
      await fetchData();
      const rate = await getRate();
      if (rate) setRate(rate);
    };

    initializeData();
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
      { name: "New", count: newItemsCount },
      ...categoryCounts,
    ]);
    setSelectedCategory("All");
  }, [data]);

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
          <ItemShopSkeleton />
        ) : (
          <>
            {/* Categories tabs */}
            <Categories
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
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
                          <ItemCard
                            key={item.id}
                            item={item}
                            handleItemClick={handleItemClick}
                            rate={rate}
                          />
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
                        <ItemCard
                          key={item.id}
                          item={item}
                          handleItemClick={handleItemClick}
                          rate={rate}
                        />
                      ))
                  : data
                      .filter((item) => item.type_name === selectedCategory)
                      .map((item) => (
                        <ItemCard
                          key={item.id}
                          item={item}
                          handleItemClick={handleItemClick}
                          rate={rate}
                        />
                      ))}
              </ul>
            </div>
          </>
        )}
      </div>
      {selectedItemId && (
        <Modal open={open} onClose={handleCloseModal}>
          <MemoItemDetail itemId={selectedItemId} onClose={handleCloseModal} />
        </Modal>
      )}
      <Footer />
    </>
  );
}

export default ItemShop;
