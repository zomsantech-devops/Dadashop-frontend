import { useEffect, useState } from "react";
import Footer from "../components/Footer";

import { cardData } from "../data/data";
import { VerticalCard } from "../components/VerticalCard";
import { HorizontalCard } from "../components/HorizontalCard";

interface CardProps {
  image: string;
  title: string;
  bulletColor: string;
  list: BulletList[];
  button: {
    name: string;
    link: string;
    color: {
      from: string;
      via?: string;
      to: string;
    };
  };
  preset_type: number;
}

interface BulletList {
  content: string;
}

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
        {/* <div className="grid grid-cols-12 self-center gap-[20px] screen_960:gap-[40px] screen_500:w-full"> */}
          {data.map((cardElement, index) => (
            <VerticalCard key={index} cardData={cardElement} />
          ))}
          <HorizontalCard />
          {/* <div className="w-[585px] h-min screen_1250:w-[440px] screen_500:w-full rounded-[30px] price-and-how-to-box">
            <div className="w-full rounded-t-[30px] bg-lime-100 overflow-hidden">
              <img
                src={"https://dadashop-backend.vercel.app/api/v1/image/banner-1"}
                alt="giftImage"
                className="w-full aspect-square object-cover object-top"
              ></img>
            </div>
            <div className="p-[15px]">
              <h1 className="font-bold text-[28px]">ส่ง Gift</h1>
              <div className="flex flex-col justify-center gap-3 mb-5 mt-3 ml-10">
                <p>
                  <span className="list-bullet-gift"></span>สั่ง Item หรือ
                  Battle Pass ชุดเริ่มต้น
                </p>
                <p>
                  <span className="list-bullet-gift"></span>ไม่ใช่การส่ง V-Bucks
                  (ลูกค้าจะได้รับเป็น Item)
                </p>
                <p>
                  <span className="list-bullet-gift"></span>
                  ต้องเป็นเพื่อนกันในเกม{" "}
                  <span className="font-bold">อย่างน้อย 48 ชั่วโมง</span>
                </p>
              </div>
              <Link
                to="/price-fortnite/how-to-gift"
                className="link-how-to-btn-purple w-full text-center block px-4 py-3 bg-[#1c85b6] text-white rounded-3xl bg-gradient-to-r from-[#BA6EEA] via-[#A5B7E1] to-[#3ABFCD] text-xl font-bold"
              >
                ขั้นตอนการสั่งซื้อ Gift
              </Link>
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ItemPriceTable;
