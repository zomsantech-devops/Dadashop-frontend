import { Link } from "react-router-dom";
import wraith from "../assets/images/wraith_apex.jpg";

function HomePage() {
  return (
    <div className="w-full flex flex-col justify-center items-center mb-10 px-7">
      <div className="flex flex-col items-center mt-5 my-8 gap-1">
        <div className="w-24 h-24">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                fill="#4BAE4F"
              ></path>
            </g>
          </svg>
        </div>
        <div className="text-4xl font-bold">
          <span className="text-[#4BAE4F]">ร้านเปิด</span> Available
        </div>
        <p className="text-center">
          เลือกบริการที่คุณต้องการได้เลย สั่งซื้อผ่าน Discord หรือ Facebook
          ได้เลยครับ
        </p>
      </div>
      <div className="flex screen_1250:flex-col self-center gap-8 screen_960:gap-10 screen_500:w-full">
        {/* <div className="flex w-[600px] h-[475px] rounded-3xl bg-lime-100 overflow-hidden bg-gradient-to-b from-[#B0DE90] via-[#4AA155] via-80% to-[#3A9A4E] price-and-how-to-box screen_610:flex-col-reverse screen_610:w-[450px] screen_610:self-center">
          <div className="relative flex-1 flex justify-center items-center">
            <img
              src={wraith}
              alt="vBucksImage"
              className="absolute -bottom-36 -left-4 h-[575px] min-w-max"
            ></img>
          </div>
          <div className="flex-1 flex justify-start items-center">
            <div className="w-full">
              <div className="text-3xl font-bold text-white mb-2">
                เติม Fortnite
              </div>
              <div className="flex gap-1.5">
                <Link
                  to="#"
                  className="bg-white/30 p-2 px-8 text-white rounded-[20px] hover:scale-105 transition ease-in-out duration-300"
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
        </div> */}
        <div className="flex w-[600px] h-[475px] rounded-3xl bg-lime-100 overflow-hidden bg-gradient-to-b from-[#B0DE90] via-[#4AA155] via-80% to-[#3A9A4E] price-and-how-to-box screen_610:w-[450px] screen_610:self-center screen_500:w-[350px] screen_500:h-[450px]">
          <div className="relative flex-1 flex justify-center items-center">
            <img
              src={wraith}
              alt="vBucksImage"
              className="absolute -bottom-36 -left-4 h-[575px] min-w-max screen_610:-left-12 screen_500:-left-16 screen_500:h-[550px]"
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

        <div className="relative flex w-[600px] h-[475px] rounded-3xl bg-lime-100 overflow-hidden bg-gradient-to-b from-[#80E2FF] via-[#7ed0fc] via-80% to-[#56ADF3] price-and-how-to-box screen_610:w-[450px] screen_610:self-center screen_500:w-[350px] screen_500:h-[450px]">
          <div className="flex-1 flex justify-center items-center">
            <img
              src={wraith}
              alt="vBucksImage"
              className="absolute -bottom-36 -left-4 h-[575px] min-w-max screen_610:-left-12 screen_500:-left-16 screen_500:h-[550px]"
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
      {/* <div className="w-24 h-24">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.1299 13.8H11.5C11.7357 13.8 11.8536 13.8 11.9268 13.8732C12 13.9464 12 14.0643 12 14.3V18.7299C12 19.6205 12 20.0659 12.1962 20.1091C12.3925 20.1523 12.5795 19.7482 12.9537 18.9399L15.6851 13.0402C16.2768 11.7621 16.5726 11.1231 16.2777 10.6615C15.9828 10.2 15.2786 10.2 13.8701 10.2H12.5C12.2643 10.2 12.1464 10.2 12.0732 10.1268C12 10.0536 12 9.9357 12 9.7V5.27013C12 4.37946 12 3.93413 11.8038 3.89091C11.6075 3.8477 11.4205 4.25182 11.0463 5.06006L8.31493 10.9597C7.72321 12.2379 7.42735 12.8769 7.72228 13.3385C8.01721 13.8 8.72143 13.8 10.1299 13.8Z"
              fill="#FEC006"
            ></path>{" "}
          </g>
        </svg>
      </div>
      <div className="w-24 h-24">
        <svg
          viewBox="0 0 60.601004 60.601004"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <defs></defs>
            <path
              d="m 8.4286277,35.764253 0,-10.9275 43.7450003,0 0,10.9275 -43.7450003,0 z M 30.299878,2.9592527 c -15.1,0 -27.3400003,12.2412503 -27.3400003,27.3412503 0,15.09875 12.2400003,27.34125 27.3400003,27.34125 15.1,0 27.34125,-12.2425 27.34125,-27.34125 0,-15.1 -12.24125,-27.3412503 -27.34125,-27.3412503"
              fill="#EA3359"
            ></path>
          </g>
        </svg>
      </div> */}
    </div>
  );
}

export default HomePage;
