import FBIcon from "../../assets/icons/facebook.webp";
import DiscordIcon from "../../assets/icons/discord.webp";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="flex gap-[30px] flex-col text-center mt-[110px] md:mt-[50px] pb-[50px] px-[30px]">
      <p>ช่องทางการติดต่อ</p>
      <div className="flex gap-[30px] justify-center">
        <Link target="_blank" to="https://www.facebook.com/dadafnth/">
          <img
            src={FBIcon}
            alt="facebook"
            className="w-[32px] opacity-50 hover:opacity-100"
          />
        </Link>
        <Link target="_blank" to="https://discord.com/invite/5t8Juy7FHu">
          <img
            src={DiscordIcon}
            alt="discord"
            className="w-[32px] opacity-50 hover:opacity-100"
          />
        </Link>
      </div>
    </div>
  );
}

export default Footer;
