import { startTransition, useEffect, useState } from "react";
import Footer from "../components/shared/Footer";
import { PointsBenefitsTable } from "../components/PointsBenefitsTable";
import axios from "axios";
import MemberCard from "../components/MemberCard";
import determineTier from "../components/DetermineTier";
import arrow from "../assets/icons/arrow-down-sign-to-navigate.webp";
import { UserBalance } from "../types";

function CheckPoints() {
  const [searchValue, setSearchValue] = useState("");
  const [userBalance, setUserBalance] = useState<UserBalance | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "โปรดระบุหมายเลข Member หรือชื่อ Member ของคุณ"
  );

  useEffect(() => {
    function updatePlaceholder() {
      if (window.innerWidth <= 500) {
        setPlaceholder("โปรดระบุหมายเลข Member...");
      } else {
        setPlaceholder(
          "โปรดระบุหมายเลข Member หรือชื่อ Member ของคุณ"
        );
      }
    }

    updatePlaceholder(); 

    window.addEventListener("resize", updatePlaceholder);

    return () => {
      window.removeEventListener("resize", updatePlaceholder);
    };
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setNotFound(false);
  
    startTransition(() => {
      axios.get(`${process.env.REACT_APP_API}/user-balance/${searchValue}`)
        .then(response => {
          setUserBalance(response.data);
          setLoading(false);
        })
        .catch(error => {
          setNotFound(true);
          console.error(error);
          setLoading(false);
        });
    });
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
          <div
            className={`text-center text-4xl font-bold mt-[40px] leading-[58px] mx-auto screen_930:text-[33px] screen_445:text-3xl`}
          >
            Dada Points
          </div>
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
                placeholder={placeholder}
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
          <ul className=" max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-400">
            <li className="flex items-center mt-3">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
              กำลังค้นหาสมาชิก...
            </li>
          </ul>
        )}
        {notFound && (
          <p className="mt-[10px] text-red-600">ไม่พบหมายเลขหรือชื่อสมาชิก</p>
        )}
        <div className={`mt-[${userBalance ? "0" : "40"}px]`}>
          <div className="w-full bg-white mt-[20px] rounded-[30px] overflow-hidden points-benefits-box">
            <div className="w-full bg-lime-100">
              <img
                src={
                  `${process.env.REACT_APP_API}/image/memberperks`
                }
                alt="pointsBenefits"
                className=""
              />
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
