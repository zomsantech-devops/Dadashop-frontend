import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface SidebarProps {
  handleToggleMobileDropdown: () => void;
  isMobileDropdownOpen: boolean;
}

const SidebarMain = ({
  handleToggleMobileDropdown,
  isMobileDropdownOpen,
}: SidebarProps) => {
  //   const [isOpen, setIsOpen] = useState(window.innerWidth > 1370);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1170);
  const [isGiftDropdownOpen, setGiftDropdownOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1170);
      //   setIsOpen(window.innerWidth > 1370);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggleGiftDropdown = () => {
    setGiftDropdownOpen(!isGiftDropdownOpen);
  };

  const sidebarClassName = `fixed top-0 right-0 h-full z-40 flex flex-col bg-[#ececec] text-[#171717] px-3 py-3.5 transition-transform duration-300 ease-in-out ${
    isMobileDropdownOpen ? "translate-x-0" : "-translate-x-full"
  }`;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 ${
          isMobileDropdownOpen ? "block" : "hidden"
        }`}
        onClick={handleToggleMobileDropdown}
      ></div>
      <div
        className={sidebarClassName}
      >
        <div className="">
          <div className="flex items-center justify-between text-sm">
            <Link
              to={"/"}
              className={`flex h-10 items-center gap-2 rounded-lg w-full px-4 mr-2 ${
                location.pathname === "/" ? "bg-blue-500 text-white" : ""
              } hover:bg-blue-500 hover:text-white`}
            >
              <FaHome className="w-5 h-5" />
              <p className="grow overflow-hidden text-ellipsis whitespace-nowrap">
                Home page
              </p>
            </Link>
            <button
              onClick={handleToggleMobileDropdown}
              className={`cursor-pointer p-1 rounded-md hover:bg-blue-500 text-black hover:text-white border-2 transform transition-transform duration-300 ease-in-out`}
            >
              <IoMdClose className={`w-5 h-5`} />
            </button>
          </div>

          <>
            <div className="my-2 ml-2 h-px w-7 bg-gray-400" />

            <nav
              className={`flex flex-col space-y-2 mt-4 w-full  text-sm transition-width duration-300 ease-in-out`}
            >
              <div className="pb-0.5 last:pb-0">
                <Link
                  to={"/item-shop"}
                  className={`flex h-10 items-center gap-2 rounded-lg px-4 ${
                    location.pathname === "/item-shop"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  <p className="grow overflow-hidden text-ellipsis whitespace-nowrap">
                    Item Shop
                  </p>
                </Link>
              </div>
              <div className="pb-0.5 last:pb-0">
                <Link
                  to={"/price-fortnite"}
                  className={`flex h-10 items-center gap-2 rounded-lg w-full px-4 ${
                    location.pathname === "/price-fortnite"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  <p className="grow overflow-hidden text-ellipsis whitespace-nowrap">
                    เติม fortnite
                  </p>
                </Link>
              </div>
              <div className="pb-0.5 last:pb-0">
                <button
                  className={`${
                    location.pathname === "/check-queue/d1-d10" ||
                    location.pathname === "/check-queue/g1-g8" ||
                    location.pathname === "/check-queue/zz1-zz6"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-500 hover:text-white"
                  } flex h-10 items-center gap-2 rounded-lg w-full px-4`}
                  onClick={handleToggleGiftDropdown}
                >
                  คิวส่ง Gift
                  <span
                    className={`inline-block w-[12px] ml-[5px] transition-transform transform ${
                      isGiftDropdownOpen && "rotate-180"
                    }`}
                  >
                    <FaChevronDown className="inline-block w-3" />
                  </span>
                </button>
                {isGiftDropdownOpen && (
                  <div className="pl-4 mt-2 flex flex-col gap-1">
                    <Link
                      to="/check-queue/zz1-zz6"
                      className={`${
                        location.pathname === "/check-queue/zz1-zz6"
                          ? "bg-blue-500 text-white"
                          : "hover:bg-blue-500 hover:text-white"
                      } flex h-10 items-center gap-2 rounded-lg w-full px-4`}
                    >
                      Dada ZZ1-ZZ6
                    </Link>
                    <Link
                      to="/check-queue/d1-d10"
                      className={`${
                        location.pathname === "/check-queue/d1-d10"
                          ? "bg-blue-500 text-white"
                          : "hover:bg-blue-500 hover:text-white"
                      } flex h-10 items-center gap-2 rounded-lg w-full px-4`}
                    >
                      Dada D1-D10
                    </Link>
                    <Link
                      to="/check-queue/g1-g8"
                      className={`${
                        location.pathname === "/check-queue/g1-g8"
                          ? "bg-blue-500 text-white"
                          : "hover:bg-blue-500 hover:text-white"
                      } flex flex-col h-16 justify-center gap-2 rounded-lg w-full px-4`}
                    >
                      <div className="">Dada G1-G8 </div>
                      <span
                        className={`${
                          location.pathname === "/check-queue/g1-g8"
                            ? "text-[#23d9d9]"
                            : "text-red-400"
                        } text-red-400 group-hover/name:text-[#23d9d9]`}
                      >
                        (ปิดรับเพื่อนแล้ว)
                      </span>
                    </Link>
                  </div>
                )}
              </div>
              <div className="pb-0.5 last:pb-0">
                <Link
                  to={"/price-other"}
                  className={`flex h-10 items-center gap-2 rounded-lg w-full px-4 ${
                    location.pathname === "/price-other"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  <p className="grow overflow-hidden text-ellipsis whitespace-nowrap">
                    บริการอื่นๆ
                  </p>
                </Link>
              </div>
              <div className="pb-0.5 last:pb-0">
                <Link
                  to={"/check-points"}
                  className={`flex h-10 items-center gap-2 rounded-lg w-full px-4 ${
                    location.pathname === "/check-points"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  <p className="grow overflow-hidden text-ellipsis whitespace-nowrap">
                    Dada points
                  </p>
                </Link>
              </div>
            </nav>
          </>
        </div>
      </div>
    </>
  );
};

export default SidebarMain;
