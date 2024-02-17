import { Link, useLocation } from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";
import { FaChevronLeft, FaImage } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { GrPowerReset } from "react-icons/gr";
import { toast } from "react-toastify";

const LeftSidebar = () => {
  const [isNavSmall, setIsNavSmall] = useState(window.innerWidth < 1250);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsNavSmall(window.innerWidth < 1250);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isNavSmall]);

  useEffect(() => {
    window.innerWidth < 1250 && setIsNavSmall(true);
  }, []);

  const resetItem = async () => {
    setIsLoading(true);
    try {
      await axios.get("https://dadashop-backend.vercel.app/api/v1/item/reset");
      toast.success("Reset API Successfully");
      setIsLoading(false);
    } catch (error) {
      toast.error("Reset API Failed");
      setIsLoading(false);
      console.error("Reset API Item Failed");
    }
  };

  return (
    <section
      className={`fixed left-0 top-0 z-10 flex flex-col justify-between overflow-auto border-r border-r-[#1EAEF0] bg-[#1EAEF0] pb-5 pt-2 text-white ${
        isNavSmall ? "w-20 screen_930:w-16 h-screen" : "w-60 h-screen"
      }`}
    >
      {!isNavSmall ? (
        <>
          <Link
            to={"/"}
            className={`relative flex justify-start gap-4 rounded-lg p-4 w-fit ${
              location.pathname === "/" ? "bg-blue-500" : ""
            }`}
          >
            <FaChevronLeft className="w-5 h-5 self-center" />
            <p className="">Home Page</p>
          </Link>
          <div className="flex w-full flex-1 flex-col gap-2 px-4 pt-6">
            <Link
              to={"/admin123dada"}
              className={`relative flex justify-start gap-4 rounded-lg p-4 ${
                location.pathname === "/admin123dada" ? "bg-blue-500" : ""
              }`}
            >
              <IoPersonAdd className="w-5 h-5 self-center" />
              <p className="">Add Member</p>
            </Link>
            <Link
              to={"/change-image"}
              className={`relative flex justify-start gap-4 rounded-lg p-4 ${
                location.pathname === "/change-image" ? "bg-blue-500" : ""
              }`}
            >
              <FaImage className="w-5 h-5 self-center" />
              <p className="">Change Images</p>
            </Link>
          </div>
        </>
      ) : (
        <>
          <Link
            to={"/"}
            className={`flex items-center justify-center gap-4 rounded-lg p-4 w-full ${
              location.pathname === "/" ? "bg-blue-500" : ""
            }`}
          >
            <FaChevronLeft className="w-5 h-5 self-center" />
          </Link>
          <div className="flex w-full flex-1 flex-col gap-2 px-3 pt-6 screen_930:px-1">
            <Link
              to={"/admin123dada"}
              className={`flex items-center justify-center gap-4 rounded-lg p-4 ${
                location.pathname === "/admin123dada" ? "bg-blue-500" : ""
              }`}
            >
              <IoPersonAdd className="w-5 h-5 self-center" />
            </Link>
            <Link
              to={"/change-image"}
              className={`flex items-center justify-center gap-4 rounded-lg p-4 ${
                location.pathname === "/change-image" ? "bg-blue-500" : ""
              }`}
            >
              <FaImage className="w-5 h-5 self-center" />
            </Link>
          </div>
        </>
      )}

      {!isNavSmall ? (
        <div className="self-center">
          <button
            className={`relative flex justify-start gap-4 rounded-lg p-4 bg-[#e1510f] ${
              isLoading && "bg-[#e1510f]/50 cursor-not-allowed"
            }`}
            onClick={resetItem}
            disabled={isLoading}
          >
            <GrPowerReset
              className={`w-5 h-5 self-center ${isLoading && "animate-spin"}`}
            />
            Reset API
          </button>
        </div>
      ) : (
        <div className="self-center">
          <button
            className={`flex items-center justify-center gap-4 rounded-lg p-4 bg-[#e1510f] ${
              isLoading && "bg-[#e1510f]/50 cursor-not-allowed"
            }`}
            onClick={resetItem}
            disabled={isLoading}
          >
            <GrPowerReset
              className={`w-5 h-5 self-center ${isLoading && "animate-spin"}`}
            />
          </button>
        </div>
      )}
    </section>
  );
};

export default LeftSidebar;
