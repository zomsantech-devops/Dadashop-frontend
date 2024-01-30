import FBIcon from '../images/facebook_white.png'
import DiscordIcon from '../images/discord_white.png'

import { Link } from 'react-router-dom';

export const FBButton = () => (
    <Link target="_blank" to="https://www.facebook.com/dadafnth/" className=" text-white leading-normal flex justify-center w-[140px] py-[14px] bg-[#1EAEF0] rounded-[20px] whitespace-nowrap">
      <span className='mr-[7px] flex '>
        <img src={FBIcon} alt="FBIcon" className='w-[16px] h-[16px] mt-[3px]' />
      </span>
      ทัก FB
    </Link>
  );
  
  export const DiscordButton = () => (
    <Link target="_blank" to="https://discord.com/invite/5t8Juy7FHu" className="text-white leading-normal flex w-[180px] py-[14px] justify-center bg-[#7289DA] rounded-[20px] whitespace-nowrap">
      <span className='mr-[7px] flex '>
        <img src={DiscordIcon} alt="DiscordIcon" className='w-[16px] h-[16px] mt-[3px]' />
      </span>
      ทัก Discord
    </Link>
  );

interface BtnProps {
    text: string,
    link: string
}

  export const DarkButton = ({text, link}: BtnProps) => (
    <Link target="_blank" to={link} className="text-white leading-normal flex w-[180px] py-[14px] justify-center bg-[#28283C] rounded-[20px] whitespace-nowrap">
      {text}
    </Link>
  );

  export const SmallDarkButton = ({text, link}: BtnProps) => (
    <Link target="_blank" to={link} className="text-white leading-normal flex w-[140px] py-[14px] justify-center bg-[#28283C] rounded-[20px] whitespace-nowrap">
      {text}
    </Link>
  );
