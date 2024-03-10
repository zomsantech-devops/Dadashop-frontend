import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaImage,
  FaBars,
  FaEdit,
  FaUserPlus,
  FaRedo,
  FaCog,
  FaPlusSquare,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LeftSidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 1370);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1170);

  const location = useLocation();

  const closeSidebar = () => {
    isMobile && setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1170);
      setIsOpen(window.innerWidth > 1370);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const resetItem = async () => {
    setIsLoading(true);
    try {
      await axios.get(`${process.env.REACT_APP_API}/item/reset`);
      toast.success("Reset API Successfully");
      setIsLoading(false);
    } catch (error) {
      toast.error("Reset API Failed");
      setIsLoading(false);
      console.error("Reset API Item Failed");
    }
  };

  const resetItemDatabase = async () => {
    const rawToken: string | null = localStorage.getItem("token");
    setIsLoading(true);
    try {
      if (rawToken) {
        const token = rawToken.replace(/"/g, "");
        await axios.delete(`${process.env.REACT_APP_API}/item`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Reset database item Successfully");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Reset Item Database fail");
      setIsLoading(false);
      console.error("Reset API Item Failed");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-opacity-50 ${
          isOpen ? "block" : "hidden"
        } ${isMobile ? "bg-black z-30" : "bg-transparent"}`}
        onClick={closeSidebar}
      ></div>
      <div
        className={`fixed top-0 left-0 h-full z-40 flex flex-col justify-between bg-[#171717] text-[#ececec] ${
          isOpen ? "w-64 px-3 py-3.5" : "w-0"
        } transition-width duration-300 ease-in-out`}
      >
        <div className="">
          <div className="flex items-center justify-between text-sm">
            <Link
              to={"/"}
              className={`flex h-10 items-center gap-2 rounded-lg w-full px-2 mr-2 ${
                location.pathname === "/" ? "bg-blue-500" : ""
              } ${!isOpen ? "hidden" : ""} hover:bg-[#212121]`}
            >
              <FaHome className="w-5 h-5" />
              <p className="grow overflow-hidden text-ellipsis whitespace-nowrap">
                Back to Dada
              </p>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`cursor-pointer p-1 rounded-md hover:bg-[#212121] ${
                !isOpen
                  ? "absolute -right-11 top-3 bg-white border-2 border-black text-black hover:text-white"
                  : "border-2 text-[#ececec]"
              } transform transition-transform duration-300 ease-in-out`}
            >
              <FaBars className={`w-5 h-5 ${!isOpen ? "" : "rotate-180"}`} />
            </button>
          </div>

          {isOpen && (
            <>
              <div className="my-2 ml-2 h-px w-7 bg-gray-700" />

              <nav
                className={`flex flex-col space-y-2 mt-4 w-full text-[#ececec] text-sm transition-width duration-300 ease-in-out`}
              >
                <div className="pb-0.5 last:pb-0">
                  <Link
                    to={"/admin123dada"}
                    className={`flex h-10 items-center gap-2 rounded-lg px-2 ${
                      location.pathname === "/admin123dada"
                        ? "bg-[#424242]"
                        : "hover:bg-[#212121]"
                    }`}
                  >
                    <FaUserPlus className="w-5 h-5 self-center" />
                    <p className="grow overflow-hidden text-ellipsis whitespace-nowrap">
                      Add Member
                    </p>
                  </Link>
                </div>
                <div className="pb-0.5 last:pb-0">
                  <Link
                    to={"/change-image"}
                    className={`flex h-10 items-center gap-2 rounded-lg w-full px-2 ${
                      location.pathname === "/change-image"
                        ? "bg-[#424242]"
                        : "hover:bg-[#212121]"
                    }`}
                  >
                    <FaImage className="w-5 h-5 self-center" />
                    <p className="grow overflow-hidden text-ellipsis whitespace-nowrap">
                      Change Images
                    </p>
                  </Link>
                </div>
                <div className="pb-0.5 last:pb-0">
                  <Link
                    to={"/shop-setting"}
                    className={`flex h-10 items-center gap-2 rounded-lg w-full px-2 ${
                      location.pathname === "/shop-setting"
                        ? "bg-[#424242]"
                        : "hover:bg-[#212121]"
                    }`}
                  >
                    <FaCog className="w-5 h-5 self-center" />
                    <p className="grow overflow-hidden text-ellipsis whitespace-nowrap">
                      Shop Settings
                    </p>
                  </Link>
                </div>
                <div className="pb-0.5 last:pb-0">
                  <Link
                    to={"/update-preset"}
                    className={`flex h-10 items-center gap-2 rounded-lg w-full px-2 ${
                      location.pathname === "/update-preset"
                        ? "bg-[#424242]"
                        : "hover:bg-[#212121]"
                    }`}
                  >
                    <FaEdit className="w-5 h-5 self-center" />
                    <p className="grow overflow-hidden text-ellipsis whitespace-nowrap">
                      Update Preset
                    </p>
                  </Link>
                </div>
                <div className="pb-0.5 last:pb-0">
                  <Link
                    to={"/create-preset"}
                    className={`flex h-10 items-center gap-2 rounded-lg w-full px-2 ${
                      location.pathname === "/create-preset"
                        ? "bg-[#424242]"
                        : "hover:bg-[#212121]"
                    }`}
                  >
                    <FaPlusSquare className="w-5 h-5 self-center" />
                    <p className="grow overflow-hidden text-ellipsis whitespace-nowrap">
                      Create Preset
                    </p>
                  </Link>
                </div>
              </nav>
            </>
          )}
        </div>
        {isOpen && (
          <div className="">
            <button
              className={`flex h-12 items-center justify-center rounded-lg w-full p-4 bg-[#f1e043] ${
                isLoading && "bg-[#f1e043]/50 cursor-not-allowed"
              }`}
              onClick={resetItemDatabase}
              disabled={isLoading}
            >
              <div className="flex items-center justify-center gap-4">
                <FaRedo
                  className={`w-5 h-5 text-black ${
                    isLoading && "animate-spin"
                  }`}
                />
                <p className="grow overflow-hidden text-ellipsis whitespace-nowrap text-black">
                  Reset Item Database
                </p>
              </div>
            </button>
            <button
              className={`flex h-12 items-center justify-center rounded-lg w-full p-4 mt-3 bg-[#e1510f] ${
                isLoading && "bg-[#e1510f]/50 cursor-not-allowed"
              }`}
              onClick={resetItem}
              disabled={isLoading}
            >
              <div className="flex items-center justify-center gap-4">
                <FaRedo className={`w-5 h-5 ${isLoading && "animate-spin"}`} />
                <p className="grow overflow-hidden text-ellipsis whitespace-nowrap">
                  Reset API
                </p>
              </div>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default LeftSidebar;
