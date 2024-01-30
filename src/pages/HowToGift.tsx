import Footer from "../components/Footer";
import { FBButton, DiscordButton } from "../components/Button";
import arrow from "../images/arrow-down-sign-to-navigate.png";

import { Link } from "react-router-dom";

function HowToGift() {
  return (
    <div>
      <div className="flex flex-col justify-center px-[30px]">
        <div className="relative">
          <Link
            to="/ItemPriceTable"
            className="screen_1070:invisible absolute top-[30px] ml-[70px] flex gap-[5px] items-center"
          >
            <img
              src={arrow}
              alt="Arrow icon"
              className="w-[12px] h-[12px] rotate-90 mt-[2px]"
            />
            ราคา & ขั้นตอนการซื้อ
          </Link>
          <p className="text-center text-5xl font-bold my-[40px] leading-[58px]">
            ขั้นตอนการสั่งซื้อ
            <br />
            <span className="text-[36px] leading-[44px]">Gift</span>
          </p>
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="screen_930:w-full screen_930:text-[20px] font-bold bg-[#E7F9FD] w-[870px]  text-[24px] leading-[40px] p-[30px] rounded-[30px] self-center">
            <p className=" mb-[15px]">
              1. เพิ่มเพื่อนในเกมทุกตัวตามนี้
              <ul className="list-disc ml-[20px]">
                <li>Dada D1</li>
                <li>Dada D2</li>
                <li>Dada D3</li>
                <li>Dada D4</li>
                <li>Dada D5</li>
                <li>Dada D6</li>
                <li>Dada D7</li>
                <li>Dada D8</li>
                <li>Dada D9</li>
                <li>Dada D10</li>
              </ul>
              แล้วรอ 48 ชั่วโมง จึงจะเริ่มส่ง Gift ได้
              (แจ้งชื่อในเกมให้แอดมินทราบด้วยนะครับ หลังเพิ่มมา)
            </p>
            <div className="flex gap-[15px] text-[16px]">
              <FBButton />
              <DiscordButton />
            </div>
          </div>
          <div className="screen_930:w-full font-bold bg-[#E7F9FD] screen_930:text-[20px] w-[870px] text-[24px] leading-[40px] p-[30px] rounded-[30px] self-center">
            <p>
              2. เช็คคิวกับตัวละครที่เรามีเพื่อน หากมีคิวว่าง
              ถึงจะสั่งซื้อได้ครับ :)
            </p>
          </div>
          <div className="screen_930:w-full font-bold bg-[#E7F9FD] w-[870px] text-[24px] screen_930:text-[20px] leading-[40px] p-[30px] rounded-[30px] self-center">
            <p className=" mb-[15px]">
              3. สั่งซื้อ โดยการแจ้ง
              <ul className="list-disc ml-[20px]">
                <li>Item ที่ต้องการ</li>
                <li>ชื่อในเกมของลูกค้า</li>
              </ul>
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
