import Footer from "../components/Footer";
import { FBButton, DiscordButton } from "../components/Button";
import arrow from "../images/arrow-down-sign-to-navigate.png";

import { Link } from "react-router-dom";
import { dadaID } from "../constants";

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
          <div className="screen_930:w-full screen_930:text-[20px] font-bold bg-[#E7F9FD] w-[870px] text-xl leading-[40px] p-7 rounded-[30px] self-center">
            <p className="mb-[15px]">
              1. เพิ่มเพื่อนในเกม{" "}
              <span className="text-blue-600 font-bold">ทุกตัว</span> ตามนี้ และ
              แจ้งชื่อในเกมของลูกค้าให้ทางร้านทราบด้วย
            </p>
            <ul className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4">
              {dadaID.map((id, index) => {
                return (
                  <li
                    key={index}
                    className="p-1 bg-[#515151] text-center text-white rounded-xl"
                  >
                    {id}
                  </li>
                );
              })}
            </ul>
            <p className="text-center px-4 py-2 rounded-3xl transition ease-in-out duration-300 bg-[#0c63c5] text-white mt-6">
              รอ 48 ชั่วโมง หลังเป็นเพื่อนกัน ถึงจะเริ่มสั่งไอเทมได้ครับ 😊
            </p>
          </div>
          <div className="screen_930:w-full font-bold bg-[#E7F9FD] w-[870px] p-[30px] rounded-[30px] self-center">
            <p className="screen_930:text-[20px] text-[24px] leading-[40px]">
              2. เช็คคิวกับตัวละครที่เรามีเพื่อน หากมีคิวว่าง
              ถึงจะสั่งซื้อได้ครับ :)
            </p>
            <div className="flex flex-row flex-wrap gap-2 mt-4">
              <Link
                to="/CheckQueue/D1-D10"
                className="w-fit text-center px-4 py-2 rounded-3xl transition ease-in-out duration-300 bg-[#0c63c5] text-white cursor-pointer"
              >
                เช็คคิว Dada D1-D10
              </Link>
              {/* TODO: Change path */}
              <Link
                to="/CheckQueue/D1-D10"
                className="w-fit text-center px-4 py-2 rounded-3xl transition ease-in-out duration-300 bg-[#0c63c5] text-white cursor-pointer"
              >
                เช็คคิว Dada ZZ1-ZZ6
              </Link>
              <Link
                to="/CheckQueue/G1-G8"
                className="w-fit text-center px-4 py-2 rounded-3xl transition ease-in-out duration-300 bg-[#0c63c5] text-white cursor-pointer"
              >
                เช็คคิว Dada G1-G8 (ปิดรับเพื่อนแล้ว)
              </Link>
            </div>
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
