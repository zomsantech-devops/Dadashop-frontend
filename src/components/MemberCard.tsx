import diamond from "../assets/images/Member-card-diamond.webp";
import unreal from "../assets/images/Member-card-unreal.webp";
import gold from "../assets/images/Member-card-gold.webp";
import { MemberCardProps } from "../types";

function MemberCard({
  tier,
  name_display,
  present_points,
  all_points,
}: MemberCardProps) {
  const tier_upperCase = tier.toUpperCase();
  return (
    <div className="self-center relative w-[750px] screen_810:w-[550px] screen_610:w-[450px] screen_500:w-[340px] screen_400:w-[300px] mb-[135px] screen_610:mb-[110px] screen_500:mb-[90px]">
      <div className="flex items-center justify-center">
        <p className="absolute font-bold text-[24px] screen_810:leading-tight screen_610:text-[16px] screen_500:text-[12px] text-center text-white">
          {tier_upperCase} Member
          <br />
          <span className="text-[16px] screen_500:text-[12px] glow-text">
            {name_display}
          </span>
        </p>
        {tier_upperCase === "DIAMOND" && (
          <img src={diamond} alt="Diamond Member" className="block mx-auto" />
        )}
        {tier_upperCase === "UNREAL" && (
          <img src={unreal} alt="Unreal Member" className="block mx-auto" />
        )}
        {tier_upperCase === "GOLD" && (
          <img src={gold} alt="Gold Member" className="block mx-auto" />
        )}
      </div>
      <div className="bg-[#28283C] rounded-[30px] screen_610:rounded-[20px] w-full h-[305px] screen_810:h-[200px] screen_610:h-[180px] absolute screen_500:h-[120px]   top-[200px] screen_810:top-[190px] screen_610:top-[150px] screen_500:top-[130px] screen_400:top-[110px] -z-10 pt-[170px] screen_810:pt-[90px] screen_610:pt-[75px] screen_500:pt-[45px] flex items-center justify-center gap-[85px] screen_610:justify-evenly screen_610:gap-[15px] screen_610:px-[15px]">
        <div className="text-white text-center font-bold">
          <p className="screen_500:text-[12px]">
            Points <span className="whitespace-nowrap ">ปัจจุบัน</span>
          </p>
          <p className="text-[24px] screen_610:text-[20px] screen_500:text-[16px]">
            {present_points}
          </p>
        </div>
        <div className="w-[1px] h-[60px] screen_610:h-[45px] bg-white"></div>
        <div className="text-white text-center font-bold">
          <p className="screen_500:text-[12px]">
            Points <span className="whitespace-nowrap">ตลอดชีพ</span>
          </p>
          <p className="text-[24px] screen_610:text-[20px] screen_500:text-[16px]">
            {all_points}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MemberCard;
