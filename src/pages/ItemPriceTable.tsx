import { useEffect, useState } from "react";
import Footer from "../components/shared/Footer";

import { VerticalCard } from "../components/VerticalCard";
import { HorizontalCard } from "../components/HorizontalCard";
import { CardProps } from "../types";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function ItemPriceTable() {
  const [data, setData] = useState<CardProps[]>([]);
  const location = useLocation();

  useEffect(() => {
    const getPreset = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/preset`
        );
        setData(response.data.data);
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
    <p className="text-center text-4xl font-bold leading-normal my-[40px] screen_930:text-3xl screen_500:text-[24px] screen_420:text-[20px] screen_400:text-[19px]">
      เติม Fortnite หรือ
    </p>
    <Link
      to="/price-other"
      className={`${
        location.pathname === "/price-other"
      } text-center text-4xl font-bold leading-normal my-[40px] screen_930:text-3xl screen_500:text-[24px] screen_420:text-[20px] screen_400:text-[px] hover:text-red-700 text-[#3d82d1] `}
    >
      "บริการอื่นๆ"
    </Link>
  </div>
        
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
