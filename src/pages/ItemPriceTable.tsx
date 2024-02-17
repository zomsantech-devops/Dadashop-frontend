import { useEffect, useState } from "react";
import Footer from "../components/shared/Footer";

import { cardData } from "../data/data";
import { VerticalCard } from "../components/VerticalCard";
import { HorizontalCard } from "../components/HorizontalCard";
import { CardProps } from "../types";

function ItemPriceTable() {
  const [data, setData] = useState<CardProps[]>([]);

  useEffect(() => {
    setData(cardData);
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
        <p className="text-center text-4xl font-bold leading-normal my-[40px] screen_930:text-3xl screen_445:text-2xl">
          เติม Fortnite
        </p>
        <div className="grid grid-cols-12 screen_960:flex screen_960:flex-col self-center gap-[20px] screen_960:gap-[40px] screen_500:w-full">
          {data.map((cardElement, index) =>
            data.length % 2 !== 0 && index === data.length - 1 ? (
              <HorizontalCard key={index} cardData={cardElement} />
            ) : (
              <VerticalCard key={index} cardData={cardElement} />
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ItemPriceTable;
