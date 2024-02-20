import { Link } from "react-router-dom";
import wraith from "../assets/images/wraith_apex.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import check from "../assets/icons/check.svg";
import busy from "../assets/icons/busy.svg";
import close from "../assets/icons/close.svg";

function HomePage() {
  const [status, setStatus] = useState<string>("");
  const [openTime, setOpenTime] = useState<string>("");

  useEffect(() => {
    const getTime = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/setting/time`
        );
        setStatus(response.data.data.status);
        setOpenTime(response.data.data.open_time)
      } catch (error: any) {}
    };

    getTime();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center mb-10 px-7">
      {status === "OPEN" ? (
        <div className="flex flex-col items-center mt-5 my-8 gap-1">
          <div className="w-24 h-24">
            <img src={check} alt="check" />
          </div>
          <div className="text-4xl font-bold text-center">
            <span className="text-[#4BAE4F]">ร้านเปิด</span> Available
          </div>
          <p className="text-center">
            เลือกบริการที่คุณต้องการได้เลย สั่งซื้อผ่าน Discord หรือ Facebook
            ได้เลยครับ
          </p>
        </div>
      ) : status === "MAINTENANCE" ? (
        <div className="flex flex-col items-center mt-5 my-8 gap-1">
          <div className="w-24 h-24">
            <img src={busy} alt="busy" />
          </div>
          <div className="text-4xl font-bold text-center">
            <span className="text-[#C4960C]">ไม่ว่างชั่วคราว</span> Busy
          </div>
          <p className="text-center">
            เนื่องจากแอดมินไม่สามารถให้บริการได้ชั่วคราว ขอมอบส่วนลด 5%
            ให้สำหรับการสั่งซื้อผ่าน Discord Ticket จนกว่าแอดมินจะกลับมา
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-5 my-8 gap-1">
          <div className="w-24 h-24">
            <img src={close} alt="close" />
          </div>
          <div className="text-4xl font-bold text-center">
            <span className="text-[#CF173D]">นอกเวลาทำการ</span> Closed
          </div>
          <p className="text-center">
            ร้านจะกลับมาให้บริการอีกครั้งในเวลา{" "}
            <span className="font-bold">{openTime}</span> น.
          </p>
        </div>
      )}
      <div className="flex screen_1250:flex-col self-center gap-8 screen_960:gap-10 screen_500:w-full">
        <div className="flex w-[600px] h-[475px] rounded-3xl bg-lime-100 overflow-hidden bg-gradient-to-b from-[#B0DE90] via-[#4AA155] via-80% to-[#3A9A4E] price-and-how-to-box screen_610:w-[450px] screen_610:self-center screen_500:w-[350px] screen_500:h-[350px]">
          <div className="relative flex-1 flex justify-center items-center">
            <img
              src={wraith}
              alt="vBucksImage"
              className="absolute -bottom-36 -left-4 h-[575px] min-w-max screen_610:-left-12 screen_500:h-[450px]"
            ></img>
          </div>
          <div className="flex-1 flex justify-start items-center z-20">
            <div className="w-full">
              <div className="text-3xl font-bold text-white mb-2 screen_500:text-2xl">
                เติม Fortnite
              </div>
              <div className="flex gap-1.5 screen_610:flex-col w-fit">
                <Link
                  to="#"
                  className="text-center bg-white/30 p-2 px-8 text-white rounded-[20px] hover:scale-105 transition ease-in-out duration-300"
                >
                  ราคา
                </Link>
                <Link
                  to="/item-shop"
                  className="border-2 border-white/30 p-2 px-8 text-white rounded-[20px] hover:scale-105 transition ease-in-out duration-300"
                >
                  Item Shop
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex w-[600px] h-[475px] rounded-3xl bg-lime-100 overflow-hidden bg-gradient-to-b from-[#80E2FF] via-[#7ed0fc] via-80% to-[#56ADF3] price-and-how-to-box screen_610:w-[450px] screen_610:self-center screen_500:w-[350px] screen_500:h-[350px]">
          <div className="flex-1 flex justify-center items-center">
            <img
              src={wraith}
              alt="vBucksImage"
              className="absolute -bottom-36 -left-4 h-[575px] min-w-max screen_610:-left-12 screen_500:h-[450px]"
            ></img>
          </div>
          <div className="flex-1 flex justify-start items-center z-20">
            <div className="w-full">
              <div className="text-3xl font-bold text-white mb-2 screen_500:text-2xl screen_500:text-center">
                เติมเกมอื่นๆ
              </div>
              <div className="flex gap-1.5 screen_500:justify-center">
                <Link
                  to="#"
                  className="bg-white/30 p-2 px-8 text-white rounded-[20px] hover:scale-105 transition ease-in-out duration-300"
                >
                  ราคา
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
