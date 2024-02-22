import { useEffect } from "react";
import Footer from "../components/shared/Footer";

import { Link } from "react-router-dom";

function OrtherGame() {

  useEffect(() => {
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
             บริการอื่นๆ
        </p>
        <div className="flex screen_960:flex-col self-center gap-[20px] screen_960:gap-[40px] screen_500:w-full">
          {/* GIFT */}
          <div className="w-[585px] h-min screen_1250:w-[440px] screen_500:w-full rounded-[30px] price-and-how-to-box">
            <div className="w-full rounded-t-[30px] bg-lime-100 overflow-hidden">
              <img
                src={`${process.env.REACT_APP_API}/image/banner-1`}
                alt="giftImage"
                className="w-full aspect-square object-cover object-top"
              ></img>
            </div>
            <div className="p-[15px]">
              <h1 className="font-bold text-[28px]">ส่ง Gift</h1>
              {/* สามารถเปลี่ยนสีได้เลยครับ แค่ใส่โค้ดสี HEX ลงใน bg-[โค้ดสี] */}
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
              {/* อันนี้เป็นสี gradient จากซ้ายไปขวา ใส่ตามนี้เลยครับ form -> via -> to (bg-[โค้ดสี]) */}
              {/* Hover ขอบเรืองแสง สามารถก็อบตัว link-how-to-btn-purple ไปหาในไฟล์ index.css ได้เลยครับ */}
              <Link
                to="/price-fortnite/how-to-gift"
                className="link-how-to-btn-purple w-full text-center block px-4 py-3 bg-[#1c85b6] text-white rounded-3xl bg-gradient-to-r from-[#BA6EEA] via-[#A5B7E1] to-[#3ABFCD] text-xl font-bold"
              >
                ขั้นตอนการสั่งซื้อ Gift
              </Link>
            </div>
          </div>
          {/* V-BUCKs */}
          <div className="w-[585px] h-min screen_1250:w-[440px] screen_500:w-full rounded-[30px] price-and-how-to-box">
            <div className="w-full rounded-t-[30px] bg-lime-100 overflow-hidden">
              <img
                src={`${process.env.REACT_APP_API}/image/banner-2`}
                alt="vBucksImage"
                className="w-full aspect-square object-cover object-top"
              ></img>
            </div>
            <div className="p-[15px]">
              <h1 className="w-full font-bold text-[28px] screen_1250:leading-tight screen_1250:mb-[5px] whitespace-normal">
                เติม V-Bucks, Packs, Fortnite Crew
              </h1>
              {/* สามารถเปลี่ยนสีได้เลยครับ แค่ใส่โค้ดสี HEX ลงใน bg-[โค้ดสี] */}
              <div className="flex flex-col justify-center gap-3 mb-5 mt-3 ml-10">
                <p>
                  <span className="list-bullet-else"></span>ลูกค้าต้องนำ ID Epic
                  มาผูกกับ ID XBOX ของลูกค้าเอง
                </p>
                <p>
                  <span className="list-bullet-else"></span>ไม่ต้องรอ 48 ชั่วโมง
                </p>
                <p>
                  <span className="list-bullet-else"></span>ได้ทันทีภายใน 10 ถึง
                  20 นาที
                </p>
              </div>
              {/* อันนี้เป็นสี gradient จากซ้ายไปขวา ใส่ตามนี้เลยครับ form -> via -> to (bg-[โค้ดสี]) */}
              {/* Hover ขอบเรืองแสง สามารถก็อบตัว link-how-to-btn-green ไปหาในไฟล์ index.css ได้เลยครับ */}
              <Link
                to="/price-fortnite/how-to-else"
                className="link-how-to-btn-green w-full text-center block px-4 py-3 bg-[#1c85b6] text-white rounded-3xl bg-gradient-to-r from-[#BBB251] via-[#ABD499] to-[#2FD491] text-xl font-bold"
              >
                ขั้นตอนการสั่งซื้อผ่าน XBOX
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OrtherGame;
