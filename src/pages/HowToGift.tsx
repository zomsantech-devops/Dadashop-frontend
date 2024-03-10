import Footer from "../components/shared/Footer";
import { FBButton, DiscordButton, CustomButton } from "../components/Button";
import arrow from "../assets/icons/arrow-down-sign-to-navigate.webp";
import { FaRegCheckCircle } from "react-icons/fa";

import { Link } from "react-router-dom";
import { dadaID } from "../constants";
import { useState } from "react";

function HowToGift() {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setClickedIndex(index);
    // Click to copy
    navigator.clipboard.writeText(dadaID[index]);
    setTimeout(() => {
      setClickedIndex(null);
    }, 2000);
  };

  return (
    <div>
      <div className="flex flex-col justify-center px-[30px]">
        <div className="relative">
          <Link
            to="/price-fortnite"
            className="screen_1070:invisible absolute top-[30px] ml-[70px] flex gap-[5px] items-center"
          >
            <img
              src={arrow}
              alt="Arrow icon"
              className="w-[12px] h-[12px] rotate-90 mt-[2px]"
            />
            ราคา & ขั้นตอนการซื้อ
          </Link>
          <p className="text-center text-5xl font-bold my-[40px] leading-[58px] screen_540:text-3xl">
            ขั้นตอนการสั่งซื้อ
            <br />
            <span className="text-4xl leading-[44px] screen_540:text-3xl">Gift</span>
          </p>
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="screen_930:w-full screen_930:text-[20px] font-bold bg-[#E7F9FD] w-[870px] text-xl leading-[40px] p-7 rounded-[30px] self-center">
            <div className="mb-[15px]">
              1. เพิ่มเพื่อนในเกม{" "}
              <span className="text-blue-600 font-bold">ทุกตัว</span> ตามนี้
              และแจ้งชื่อในเกมของลูกค้าให้ทางร้านทราบด้วย
            </div>
            <ul className="grid grid-cols-5 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4">
              {dadaID.map((id, index) => {
                return (
                  <li
                    key={index}
                    className="p-1 bg-[#515151] text-center text-white rounded-xl cursor-pointer hover:bg-[#515151]/90"
                    onClick={() => handleClick(index)}
                  >
                    {clickedIndex === index ? (
                      <div className="flex items-center justify-center gap-x-1 text-[#4ADC71]">
                        <FaRegCheckCircle />
                        <p>Copied!</p>
                      </div>
                    ) : (
                      id
                    )}
                  </li>
                );
              })}
            </ul>
            {/* code emoji in html -> https://www.w3schools.com/charsets/ref_emoji_smileys.asp */}
            <p className="text-center px-4 py-2 rounded-3xl transition ease-in-out duration-300 bg-[#0c63c5] text-white mt-6">
              รอ 48 ชั่วโมง หลังเป็นเพื่อนกัน ถึงจะเริ่มสั่งไอเทมได้ครับ
              &#128522;
            </p>
          </div>
          <div className="screen_930:w-full font-bold bg-[#E7F9FD] w-[870px] p-[30px] rounded-[30px] self-center">
            <p className="screen_930:text-[20px] text-xl leading-[40px]">
              2. เช็คคิวกับตัวละครที่เรามีเพื่อน หากมีคิวว่าง
              ถึงจะสั่งซื้อได้ครับ &#128522;
            </p>
            <div className="flex flex-row flex-wrap gap-2.5 mt-4">
              <div className="flex gap-[15px] text-[16px] hover:scale-105 transition ease-in-out duration-300">
                <CustomButton
                  text={"เช็คคิว Dada D1-D10"}
                  link="/check-queue/d1-d10"
                  className=""
                />
              </div>
              <div className="flex gap-[15px] text-[16px] hover:scale-105 transition ease-in-out duration-300">
                <CustomButton
                  text={"เช็คคิว Dada ZZ1-ZZ6"}
                  link="/check-queue/zz1-zz6"
                  className=""
                />
              </div>
              <div className="flex gap-[15px] text-[16px] hover:scale-105 transition ease-in-out duration-300">
                <CustomButton
                  text={"เช็คคิว Dada G1-G8 (ปิดรับเพื่อนแล้ว)"}
                  link="/check-queue/g1-g8"
                  className=""
                />
              </div>
            </div>
          </div>
          <div className="screen_930:w-full font-bold bg-[#E7F9FD] w-[870px] text-xl screen_930:text-[20px] leading-[40px] p-[30px] rounded-[30px] self-center">
            <div className="">3. สั่งซื้อ โดยการแจ้ง</div>
            <ul className="ml-10 md:ml-8 sm:ml-5">
              <li className="flex items-center">
                <span className="list-bullet"></span>Item ที่ต้องการ
              </li>
              <li className="flex items-center">
                <span className="list-bullet"></span>ชื่อในเกมของลูกค้า
              </li>
            </ul>
            <p className="mb-[15px]">
              (ทักแล้วรอ Admin คอนเฟิร์ม ห้ามทักซ้ำเด็ดขาดครับ
              ไม่งั้นอาจจะหลุดคิวได้)
            </p>
            <div className="flex gap-[15px] text-[16px]">
              <FBButton />
              <DiscordButton />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HowToGift;
