import FBIcon from "../assets/icons/facebook_white.webp";
import DiscordIcon from "../assets/icons/discord_white.webp";

import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { BtnProps } from "../types";

export const FBButton = () => (
  <Link
    target="_blank"
    to="https://www.facebook.com/dadafnth/"
    className="text-white leading-normal flex justify-center w-[140px] py-[14px] bg-[#1EAEF0] hover:bg-[#1EAEF0]/90 rounded-[20px] whitespace-nowrap hover:scale-105 transition ease-in-out duration-300"
  >
    <span className="mr-[7px] flex">
      <img src={FBIcon} alt="FBIcon" className="w-[16px] h-[16px] mt-[3px]" />
    </span>
    ทัก FB
  </Link>
);

export const DiscordButton = () => (
  <Link
    target="_blank"
    to="https://discord.com/invite/5t8Juy7FHu"
    className="text-white leading-normal flex w-[180px] py-[14px] justify-center bg-[#7289DA] hover:bg-[#7289DA]/90 rounded-[20px] whitespace-nowrap hover:scale-105 transition ease-in-out duration-300"
  >
    <span className="mr-[7px] flex ">
      <img
        src={DiscordIcon}
        alt="DiscordIcon"
        className="w-[16px] h-[16px] mt-[3px]"
      />
    </span>
    ทัก Discord
  </Link>
);

export const DarkButton = ({ text, link, className }: BtnProps) => (
  <Link
    target="_blank"
    to={link}
    className={cn(
      "text-white leading-normal flex w-[180px] py-[14px] justify-center bg-[#28283C] rounded-[20px] whitespace-nowrap hover:bg-[#28283C]/90",
      className
    )}
  >
    {text}
  </Link>
);

export const SmallDarkButton = ({ text, link, className }: BtnProps) => (
  <Link
    target="_blank"
    to={link}
    className={cn(
      "text-white leading-normal flex w-[140px] py-[14px] justify-center bg-[#28283C] rounded-[20px] whitespace-nowrap hover:bg-[#28283C]/90",
      className
    )}
  >
    {text}
  </Link>
);

export const CustomButton = ({ text, link, className }: BtnProps) => (
  <Link
    to={link}
    className={cn(
      "text-white leading-normal flex p-4 px-6 justify-center bg-[#28283C] rounded-[20px] hover:bg-[#28283C]/90",
      className
    )}
  >
    {text}
  </Link>
);
