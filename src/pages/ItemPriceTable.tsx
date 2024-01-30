import Footer from "../components/Footer";
import arrow from "../images/right-arrow (1).png";
import giftImage from "../images/gift.jpeg";
import vBucksImage from "../images/vbucks.jpeg";

import { Link } from "react-router-dom";

function ItemPriceTable() {
  return (
    <div>
      <div className="flex flex-col justify-center px-[30px]">
        <p className="text-center text-5xl font-bold leading-normal my-[40px]">
          ราคา & ขั้นตอนการสั่งซื้อ
        </p>
        <div className="flex screen_960:flex-col self-center gap-[20px] screen_960:gap-[40px] screen_500:w-full">
          <div className="w-[585px] h-min pricetable_1250:w-[440px] screen_500:w-full rounded-[30px] price-and-how-to-box">
            <div className="w-full rounded-t-[30px] bg-lime-100 overflow-hidden">
              <img
                src={giftImage}
                alt="giftImage"
                className="w-full h-auto"
              ></img>
            </div>
            <div className="p-[15px]">
              <p className="font-bold text-[28px]">ส่ง Gift</p>
              <p className="leading-[25px] mb-[20px]">
                ส่ง Gift คือ การส่ง Item ใน Item Shop
                แต่ละวันผ่านระบบส่งของขวัญให้กับเพื่อนภายในเกม
                <br />
                (เฉพาะ Item ที่ใช้ V-Bucks ซื้อ (รวมถึง Battle Pass
                ชุดเริ่มต้น))
                <br />
                <span className="font-bold text-[#1EAEF0]">
                  *ส่ง Gift ไม่ใช่การส่ง V-Bucks
                </span>
                <br />
                <span className="font-bold text-[#1EAEF0]">
                  *ตามกฎของเกมต้องเป็นเพื่อนกันก่อน 48 ชั่วโมง ถึงจะเริ่มส่ง
                  Gift ได้
                </span>
              </p>
              <div className=" border border-[#DAD1CC] border-1 rounded-[25px]">
                <Link
                  to="/ItemPriceTable/HowToGift"
                  className="link-how-to-btn flex  w-full  py-[10px] px-[15px] font-bold items-center"
                >
                  ขั้นตอนการซื้อสินค้า
                  <img
                    src={arrow}
                    alt="Arrow icon"
                    className="h-[34px] ml-auto"
                  ></img>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-[585px] h-min pricetable_1250:w-[440px] screen_500:w-full rounded-[30px] price-and-how-to-box">
            <div className="w-full rounded-t-[30px] bg-lime-100 overflow-hidden">
              <img
                src={vBucksImage}
                alt="vBucksImage"
                className="w-full h-auto"
              ></img>
            </div>
            <div className="p-[15px]">
              <p className="w-full font-bold text-[28px] pricetable_1250:leading-tight pricetable_1250:mb-[5px] whitespace-normal">
                เติม V-Bucks, Packs, Fortnite Crew
              </p>
              <p className="leading-[25px] mb-[20px]">
                เติมโดยการเข้า ID ลูกค้าผ่านทาง XBOX (เข้าผ่าน Link ไม่มีการขอ
                ID, Password ลูกค้า ยกเว้น Fortnite Crew)
                ลูกค้าจะต้องทำการเชื่อม ID EPIC เข้ากับ ID XBOX ของลูกค้า (Admin
                มีวิธีเชื่อมให้)
                <br />
                <span className="font-bold text-[#1EAEF0]">
                  * V-Bucks จะเติมได้ตามจำนวนที่เกมมีเท่านั้น
                  (1000/2800/5000/13500) ไม่สามารถกำหนดปริมาณที่อยากเติมเองได้
                </span>
              </p>
              <div className=" border border-[#DAD1CC] border-1 rounded-[25px]">
                <Link
                  to="/ItemPriceTable/HowToElse"
                  className="link-how-to-btn flex w-full rounded-[25px] py-[10px] px-[15px] font-bold items-center"
                >
                  ขั้นตอนการซื้อสินค้า
                  <img
                    src={arrow}
                    alt="Arrow icon"
                    className="h-[34px] ml-auto"
                  ></img>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ItemPriceTable;
