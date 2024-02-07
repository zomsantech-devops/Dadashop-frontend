import Footer from "../components/Footer";
import { PointsBenefitsTable } from "../components/PointsBenefitsTable";
import pointsBenefits from "../images/pointsBenefits.png";
import axios from "axios";
import { useState } from "react";
import MemberCard from "../components/MemberCard";
import determineTier from "../components/DetermineTier";
import arrow from "../images/arrow-down-sign-to-navigate.png";

interface UserBalance {
  id: string;
  discord_id: string;
  discord_username: string;
  name: string;
  name_display: string;
  current_points: number;
  total_points: number;
  tier: string;
}

function CheckPoints() {
  const [searchValue, setSearchValue] = useState("");
  const [userBalance, setUserBalance] = useState<UserBalance | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setLoading(true);
      setNotFound(false);
      const response = await axios.get(
        `https://dada-game-items-api-emmys-projects-cd7ef475.vercel.app/dadaUsers/user_balance/${searchValue}`
      );
      setUserBalance(response.data);
    } catch (error) {
      setNotFound(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackButtonClick = () => {
    setUserBalance(null);
    setSearchValue("");
  };

  return (
    <>
      <div className="flex flex-col justify-center px-[30px] w-[910px] screen_910:w-full mx-auto">
        <div className="relative">
          {userBalance && (
            <button
              onClick={handleBackButtonClick}
              className="absolute top-[30px] flex gap-[5px] items-center"
            >
              <img
                src={arrow}
                alt="Arrow icon"
                className="w-[12px] h-[12px] rotate-90 mt-[2px]"
              />
              กลับ
            </button>
          )}
          <p
            className={`text-center text-5xl font-bold mt-[40px] leading-[58px] mx-auto screen_445:text-4xl`}
          >
            Dada Points
          </p>
        </div>
        {userBalance && (
          <MemberCard
            name_display={userBalance.name_display}
            discord_username={userBalance.discord_username}
            name={userBalance.name}
            tier={determineTier(userBalance.total_points)}
            present_points={userBalance.current_points}
            all_points={userBalance.total_points}
          />
        )}
        {!userBalance && (
          <form onSubmit={handleSubmit} className="mt-[40px]">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative text-[#28283C]">
              <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm border border-gray-300 rounded-[30px] focus:border-[#1EAEF0] outline-[#02A7F3]"
                placeholder="กรอก ID หรือชื่อสมาชิก"
                required
                autoComplete="off"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-[#1EAEF0] hover:bg-[#02A7F3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[30px] text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
        )}
        {loading && (
          <div className="flex gap-[5px] mt-[20px]">
            <div className="h-3 w-3 bg-[#28283C] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-3 w-3 bg-[#28283C] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-3 w-3 bg-[#28283C] rounded-full animate-bounce"></div>
          </div>
        )}
        {notFound && (
          <p className="mt-[10px] text-red-600">ไม่พบหมายเลขหรือชื่อสมาชิก</p>
        )}
        <div className={`mt-[${userBalance ? "0" : "40"}px]`}>
          {/* <div className="mt-[135px] screen_610:mt-[50px]"> */}
          <p className="text-[24px] font-bold">เงื่อนไขสิทธิประโยชน์</p>
          <div className="w-full bg-white mt-[20px] rounded-[30px] overflow-hidden points-benefits-box">
            <div className="w-full bg-lime-100">
              <img src={pointsBenefits} alt="pointsBenefits" />
            </div>
            <PointsBenefitsTable />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CheckPoints;
