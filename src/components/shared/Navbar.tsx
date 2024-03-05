import FBIcon from "../../assets/icons/facebook.webp";
import DiscordIcon from "../../assets/icons/discord.webp";
import { FaChevronDown } from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SidebarMain from "./SidebarMain";

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 975);

  const location = useLocation();

  // useEffect(() => {
  //   handleToggleDropdownClose();
  //   setMobileDropdownOpen(false);
  // }, [location.pathname]);

  const handleToggleDropdownOpen = () => {
    setDropdownOpen(true);
  };

  const handleToggleDropdownClose = () => {
    setDropdownOpen(false);
  };

  const handleToggleMobileDropdown = () => {
    setMobileDropdownOpen(!isMobileDropdownOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 975);
      // NEW
      window.innerWidth > 975 && setMobileDropdownOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  useEffect(() => {
    window.innerWidth < 975 && setIsMobile(true);
  }, []);

  return (
    <div
      className={`${
        isMobile ? " py-0" : "gap-7 py-2"
      } flex flex-col items-center justify-between px-28 screen_1170:px-10 screen_1070:px-5 sm:px-8 bg-white sticky top-0 z-30 navbar-shadow`}
    >
      <div className="w-full flex items-center">
        {/* LOGO */}
        <Link to="/">
          <img
            loading="lazy"
            src={`${process.env.REACT_APP_API}/image/logo`}
            alt="logo"
            className="h-20 w-auto  object-cover screen_443:-ml-3.5"
          />
        </Link>
        {!isMobile && (
          <>
            <div className="flex gap-2 mx-auto justify-center items-center middle-navbar">
              <Link
                to="/item-shop"
                className={`${
                  location.pathname.includes("/item-shop")
                    ? "bg-[#3d82d1] text-white"
                    : "text-gray-700"
                }  px-4 py-2 rounded-full transition ease-in-out duration-300 hover:bg-[#3d82d1] hover:text-white`}
              >
                Item Shop
              </Link>

              <Link
                to="/price-fortnite"
                className={`${
                  location.pathname === "/price-fortnite"
                    ? "bg-[#3d82d1] text-white"
                    : "text-gray-700"
                }  px-4 py-2 rounded-full transition ease-in-out duration-300 hover:bg-[#3d82d1] hover:text-white`}
              >
                เติม Fortnite
              </Link>

              {/* MAIN DROPDOWN */}
              <div
                className={`${
                  location.pathname === "/check-queue/d1-d10" ||
                  location.pathname === "/check-queue/g1-g8" ||
                  location.pathname === "/check-queue/zz1-zz6"
                    ? "bg-[#3d82d1] text-white"
                    : "text-gray-700"
                } relative group px-4 py-2 rounded-full transition ease-in-out duration-300 hover:bg-[#3d82d1] hover:text-white`}
                onMouseEnter={handleToggleDropdownOpen}
                onMouseLeave={handleToggleDropdownClose}
              >
                <div className="absolute top-8 left-1 h-5 w-full rounded-bl-full"></div>
                <div className="cursor-pointer">
                  <p className="relative inline-block ">
                    คิวส่ง Gift
                    <FaChevronDown className="inline-block w-3 ml-2 mb-1" />
                  </p>
                </div>
                {/* DROPDOWN */}
                {isDropdownOpen && (
                  <div
                    className="bg-white text-black w-48 absolute mt-3 rounded-xl drop-down p-3 opacity-100 transition-opacity duration-300"
                    onMouseEnter={handleToggleDropdownOpen}
                  >
                    <Link
                      to="/check-queue/zz1-zz6"
                      className={`${
                        location.pathname === "/check-queue/zz1-zz6"
                          ? "bg-[#3d82d1] text-white"
                          : "text-gray-700"
                      } w-full block px-4 py-2 rounded-full transition ease-in-out duration-300 text-gray-700 hover:bg-[#3d82d1] hover:text-white`}
                      onClick={handleToggleDropdownClose}
                    >
                      Dada ZZ1-ZZ6
                    </Link>
                    <Link
                      to="/check-queue/d1-d10"
                      className={`${
                        location.pathname === "/check-queue/d1-d10"
                          ? "bg-[#3d82d1] text-white"
                          : "text-gray-700"
                      } my-1 w-full block px-4 py-2 rounded-full transition ease-in-out duration-300 text-gray-700 hover:bg-[#3d82d1] hover:text-white`}
                      onClick={handleToggleDropdownClose}
                    >
                      Dada D1-D10
                    </Link>
                    <Link
                      to="/check-queue/g1-g8"
                      className={`${
                        location.pathname === "/check-queue/g1-g8"
                          ? "bg-[#3d82d1] text-white"
                          : "text-gray-700"
                      } group/name w-full whitespace-nowrap block px-4 py-2 rounded-full transition ease-in-out duration-300 text-gray-700 hover:bg-[#3d82d1] hover:text-white`}
                      onClick={handleToggleDropdownClose}
                    >
                      Dada G1-G8
                      <br />
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
              <Link
                to="/price-other"
                className={`${
                  location.pathname === "/price-other"
                    ? "bg-[#3d82d1] text-white"
                    : "text-gray-700"
                } px-4 py-2 rounded-full transition ease-in-out duration-300 hover:bg-[#3d82d1] hover:text-white`}
              >
                บริการอื่นๆ
              </Link>

              <Link
                to="/check-points"
                className={`${
                  location.pathname === "/check-points"
                    ? "bg-[#3d82d1] text-white"
                    : "text-gray-700"
                }  px-4 py-2 rounded-full transition ease-in-out duration-300 hover:bg-[#3d82d1] hover:text-white`}
              >
                Dada Points
              </Link>
            </div>
          </>
        )}
        {!isMobile && (
          <div className="flex gap-[20px]">
            <Link target="_blank" to="https://www.facebook.com/dadafnth/">
              <img
                src={FBIcon}
                alt="facebook"
                className="w-[24px] opacity-50 hover:opacity-100"
              />
            </Link>
            <Link target="_blank" to="https://discord.com/invite/5t8Juy7FHu">
              <img
                src={DiscordIcon}
                alt="discord"
                className="w-[24px] opacity-50 hover:opacity-100"
              />
            </Link>
          </div>
        )}
        {isMobile && (
          <div className="ml-auto flex align-center">
            <button
              className="flex-col items-center justify-center hidden lg:flex"
              onClick={handleToggleMobileDropdown}
              aria-label="Toggle mobile menu"
            >
              <span
                className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMobileDropdownOpen
                    ? "rotate-45 translate-y-1"
                    : "-translate-y-0.5"
                }`}
              ></span>
              <span
                className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                  isMobileDropdownOpen && "opacity-0"
                }`}
              ></span>
              <span
                className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMobileDropdownOpen
                    ? "-rotate-45 -translate-y-1"
                    : "translate-y-0.5"
                }`}
              ></span>
            </button>
          </div>
        )}
      </div>
      {isMobileDropdownOpen && (
        <div className="">
          <SidebarMain
            handleToggleMobileDropdown={handleToggleMobileDropdown}
          />
        </div>
      )}
    </div>
  );
}

export default Navbar;
