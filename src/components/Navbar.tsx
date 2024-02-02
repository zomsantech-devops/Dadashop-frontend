import FBIcon from "../images/facebook (1).png";
import DiscordIcon from "../images/discord (2).png";
import logo from "../images/dada-logo-horizontal.png";
import { FaChevronDown } from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [isGiftDropdownOpen, setGiftDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 850);
  const [animateCollapseIn, setAnimateCollapseIn] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setAnimateCollapseIn(true);
    setTimeout(() => {
      setMobileDropdownOpen(false);
      setAnimateCollapseIn(false);
    }, 450);
  }, [location.pathname]);

  const handleToggleDropdownOpen = () => {
    setDropdownOpen(true);
  };

  const handleToggleDropdownClose = () => {
    setDropdownOpen(false);
  };

  const handleToggleMobileDropdown = () => {
    if (isMobileDropdownOpen) {
      setAnimateCollapseIn(true);
      setTimeout(() => {
        setMobileDropdownOpen(false);
        setAnimateCollapseIn(false);
      }, 450);
    }
    setMobileDropdownOpen(true);
  };

  const handleToggleGiftDropdown = () => {
    setGiftDropdownOpen(!isGiftDropdownOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.outerWidth < 920);
      // NEW
      window.outerWidth > 920 && setMobileDropdownOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <div
      className={`${
        isMobile ? "gap-4 py-0" : "gap-7 py-2"
      } flex flex-col items-center justify-between px-28 lg:px-14 md:px-10 sm:px-8 bg-white sticky top-0 z-30 navbar-shadow`}
    >
      <div className="w-full flex items-center">
        {/* LOGO */}
        <Link to="/">
          <img src={logo} alt="logo" className="h-20" />
        </Link>
        {!isMobile && (
          <>
            <div className="flex gap-2 mx-auto justify-center items-center middle-navbar">
              <Link
                to="/ItemShop"
                className={`${
                  location.pathname === "/ItemShop"
                    ? "bg-[#3d82d1] text-white"
                    : "text-gray-700"
                } px-4 py-2 rounded-full transition ease-in-out duration-300 hover:bg-[#3d82d1] hover:text-white`}
              >
                <p>Item Shop</p>
              </Link>

              <Link
                to="/ItemPriceTable"
                className={`${
                  location.pathname === "/ItemPriceTable"
                    ? "bg-[#3d82d1] text-white"
                    : "text-gray-700"
                } px-4 py-2 rounded-full transition ease-in-out duration-300 hover:bg-[#3d82d1] hover:text-white`}
              >
                ราคา & ขั้นตอนการซื้อ
              </Link>

              {/* MAIN DROPDOWN */}
              <div
                className={`${
                  location.pathname === "/CheckQueue/D1-D10" ||
                  location.pathname === "/CheckQueue/G1-G8" ||
                  location.pathname === "/CheckQueue/ZZ1-ZZ6"
                    ? "bg-[#3d82d1] text-white"
                    : "text-gray-700"
                } relative group px-4 py-2 rounded-full transition ease-in-out duration-300 hover:bg-[#3d82d1] hover:text-white`}
                onMouseEnter={handleToggleDropdownOpen}
                onMouseLeave={handleToggleDropdownClose}
              >
                <div className="absolute top-8 left-1 h-10 w-full rounded-bl-full"></div>
                <div className="cursor-pointer">
                  <p className="relative inline-block">
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
                      to="/CheckQueue/ZZ1-ZZ6"
                      className="w-full block px-4 py-2 rounded-md transition ease-in-out duration-300 text-gray-700 hover:bg-[#3d82d1] hover:text-white"
                    >
                      Dada ZZ1-ZZ6
                    </Link>
                    <Link
                      to="/CheckQueue/D1-D10"
                      className="my-1 w-full block px-4 py-2 rounded-md transition ease-in-out duration-300 text-gray-700 hover:bg-[#3d82d1] hover:text-white"
                    >
                      Dada D1-D10
                    </Link>
                    <Link
                      to="/CheckQueue/G1-G8"
                      className="w-full whitespace-nowrap block px-4 py-2 rounded-md transition ease-in-out duration-300 text-gray-700 hover:bg-[#3d82d1] hover:text-white"
                    >
                      Dada G1-G8
                      <br />
                      <span className="text-red-400">(ปิดรับเพื่อนแล้ว)</span>
                    </Link>
                  </div>
                )}
              </div>
              <Link
                to="/CheckPoints"
                className={`${
                  location.pathname === "/CheckPoints"
                    ? "bg-[#3d82d1] text-white"
                    : "text-gray-700"
                } px-4 py-2 rounded-full transition ease-in-out duration-300 hover:bg-[#3d82d1] hover:text-white`}
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
                alt=""
                className="w-[24px] opacity-50 hover:opacity-100"
              />
            </Link>
            <Link target="_blank" to="https://discord.com/invite/5t8Juy7FHu">
              <img
                src={DiscordIcon}
                alt=""
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
        <div
          className={`w-full flex flex-col gap-1 pl-2.5 mb-4 ${
            animateCollapseIn ? "animate-collapseOut" : "animate-expandIn"
          } overflow-hidden`}
        >
          <Link
            to="/ItemShop"
            className={`${
              location.pathname === "/ItemShop" &&
              "px-4 rounded-full transition ease-in-out duration-300 bg-[#3d82d1] text-white"
            } py-2 relative w-fit block text-gray-700`}
          >
            Item Shop
          </Link>
          <Link
            to="/ItemPriceTable"
            className={`${
              location.pathname === "/ItemPriceTable" &&
              "px-4 rounded-full transition ease-in-out duration-300 bg-[#3d82d1] text-white"
            } py-2 relative w-fit block text-gray-700`}
          >
            ราคา & ขั้นตอนการซื้อ
          </Link>
          <button
            className={`${
              location.pathname === "/CheckQueue/D1-D10" ||
              location.pathname === "/CheckQueue/G1-G8" ||
              location.pathname === "/CheckQueue/ZZ1-ZZ6"
                ? "px-4 rounded-full transition ease-in-out duration-300 bg-[#3d82d1] text-white"
                : "text-gray-700"
            } py-2 relative w-fit block`}
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
            <div className="pl-4 flex flex-col gap-1">
              <Link
                to="/CheckQueue/ZZ1-ZZ6"
                className="w-fit block px-4 py-2 rounded-full transition ease-in-out duration-300 text-gray-700 hover:bg-[#3d82d1] hover:text-white"
              >
                Dada ZZ1-ZZ6
              </Link>
              <Link
                to="/CheckQueue/D1-D10"
                className="w-fit block px-4 py-2 rounded-full transition ease-in-out duration-300 text-gray-700 hover:bg-[#3d82d1] hover:text-white"
              >
                Dada D1-D10
              </Link>
              <Link
                to="/CheckQueue/G1-G8"
                className="w-fit block px-4 py-2 rounded-full transition ease-in-out duration-300 text-gray-700 hover:bg-[#3d82d1] hover:text-white"
              >
                Dada G1-G8{" "}
                <span className="text-red-600">(ปิดรับเพื่อนแล้ว)</span>
              </Link>
            </div>
          )}
          <Link
            to="/CheckPoints"
            className={`${
              location.pathname === "/CheckPoints" &&
              "px-4 rounded-full transition ease-in-out duration-300 bg-[#3d82d1] text-white"
            } py-2 relative w-fit block`}
          >
            Dada Points
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
