import { Link } from "react-router-dom";
import { useEffect, useState, startTransition } from "react";
import axios from "axios";

import Footer from "../components/shared/Footer";

function HomePage() {
  const [status, setStatus] = useState<string>("");
  const [openTime, setOpenTime] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const getTimeAndContent = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/setting/time`
        );
        const { status, open_time } = response.data.data;

        startTransition(() => {
          setStatus(status);
          setOpenTime(open_time);
        });

        const contentResponse = await axios.get(
          `${process.env.REACT_APP_API}/setting/content/${status}`
        );
        setContent(contentResponse.data.data.content);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    getTimeAndContent();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center mb-10 px-7">
      {status === "OPEN" ? (
        <div className="flex flex-col items-center mt-5 my-8 gap-1">
          <div className="w-24 h-24">
            <img src={`${process.env.REACT_APP_API}/image/check`} alt="check" />
          </div>
          <div className="text-4xl font-bold text-center">
            <p>
              <span className="text-[#39843B]">ร้านเปิด</span> Available
            </p>
          </div>
          <p className="text-center">{content}</p>
        </div>
      ) : status === "MAINTENANCE" ? (
        <div className="flex flex-col items-center mt-5 my-8 gap-1">
          <div className="w-24 h-24">
            <img src={`${process.env.REACT_APP_API}/image/busy`} alt="busy" />
          </div>
          <div className="text-4xl font-bold text-center">
            <span className="text-[#C4960C]">ไม่ว่างชั่วคราว</span> Busy
          </div>
          <p className="text-center">{content}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-5 my-8 gap-1">
          <div className="w-24 h-24">
            <img src={`${process.env.REACT_APP_API}/image/close`} alt="close" />
          </div>
          <div className="text-4xl font-bold text-center">
            <span className="text-[#CF173D]">นอกเวลาทำการ</span> Closed
          </div>
          <p className="text-center">
            {content} <span className="font-bold">{openTime}</span> น.
          </p>
        </div>
      )}
      <div className="flex screen_1250:flex-col self-center gap-8 screen_960:gap-10 screen_500:w-full">
        <div className="flex w-[600px] h-[400px] rounded-3xl bg-[url('https://dadashop-backend.vercel.app/api/v1/image/bg-1')] bg-cover overflow-hidden price-and-how-to-box screen_610:w-[450px] screen_610:self-center screen_500:w-[350px] screen_500:h-[300px]">
          <div className="flex flex-1 justify-center items-center">
            <img
              src={`${process.env.REACT_APP_API}/image/box-1`}
              alt="vBucksImage"
              className="h-full object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center items-start">
            <div className="text-3xl font-bold text-white mb-2 screen_500:text-2xl">
              เติม Fortnite
            </div>
            <div className="flex gap-1.5 screen_610:flex-col ">
              <Link
                to="/price-fortnite"
                className="border-2 text-center border-white/30 bg-white/30 py-2 px-8 text-white rounded-[20px] hover:scale-105 transition ease-in-out duration-300 "
              >
                ราคา
              </Link>
              <Link
                to="/item-shop"
                className="border-2 border-white/30 py-2 px-8 text-white rounded-[20px] hover:scale-105 transition ease-in-out duration-300"
              >
                Item Shop
              </Link>
            </div>
          </div>
        </div>

        <div className="flex w-[600px] h-[400px] rounded-3xl bg-[url('https://dadashop-backend.vercel.app/api/v1/image/bg-2')] bg-cover overflow-hidden price-and-how-to-box screen_610:w-[450px] screen_610:self-center screen_500:w-[350px] screen_500:h-[300px]">
          <div className="flex-1 flex justify-center items-center">
            <img
              src={`${process.env.REACT_APP_API}/image/box-2`}
              alt="vBucksImage"
              className="h-full object-cover"
            ></img>
          </div>
          <div className="flex-1 flex flex-col justify-center items-start">
            <div className="w-full">
              <div className="text-3xl font-bold text-white mb-2 screen_500:text-2xl">
                บริการอื่นๆ
              </div>
              <div className="flex gap-1.5 text-center screen_610:flex-col screen_610:w-[152.75px]">
                <Link
                  to="/price-other"
                  className="border-2 border-white/30 bg-white/30 p-2 px-8 text-white rounded-[20px] hover:scale-105 transition ease-in-out duration-300"
                >
                  ราคา
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

export default HomePage;
