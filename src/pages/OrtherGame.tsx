import { useEffect, useState } from "react";
import Footer from "../components/shared/Footer";

import { VerticalCard } from "../components/VerticalCard";
import { HorizontalCard } from "../components/HorizontalCard";
import { CardProps } from "../types";
import axios from "axios";

function ItemPriceTable() {
  const [data, setData] = useState<CardProps[]>([]);

  useEffect(() => {
    const getPreset = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/preset`);
        const filteredData = response.data.data.filter(
          (preset: { location: string }) => preset.location === "price-other"
        );
        setData(filteredData);
      } catch (error: any) {}
    };

    getPreset();

    const toggleBodyOverflow = () => {
      document.body.style.overflow = "auto";
    };

    toggleBodyOverflow();

    return () => {
      toggleBodyOverflow();
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center px-[30px]">
        <div className="flex justify-center gap-4 screen_420:gap-0">
          <p className="text-center text-4xl font-bold leading-normal my-[40px] screen_930:text-3xl screen_445:text-2xl">
            บริการอื่นๆ
          </p>
        </div>
        <div className="grid grid-cols-12 screen_960:flex screen_960:flex-col self-center gap-[20px] screen_960:gap-[40px] screen_500:w-full">
          {data.map((cardElement, index) =>
            data.length % 2 !== 0 && index === data.length - 1 ? (
              <div key={index} className="col-start-4 screen_1250:col-start-auto col-span-6 screen_1250:col-span-12">
                <HorizontalCard cardData={cardElement} />
              </div>
            ) : (
              <div key={index} className="col-span-6">
                <VerticalCard key={index} cardData={cardElement} />
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ItemPriceTable;
