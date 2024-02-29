import { Link } from "react-router-dom";
import { CardProps } from "../types";

interface VerticalCardProps {
  cardData: CardProps;
}

export const HorizontalCard = ({ cardData }: VerticalCardProps) => {
  const { image, title, list, button } = cardData;

  return (
    <div className="col-span-12 screen_1250:w-[900px] screen_960:w-[440px] screen_500:w-full rounded-[30px] price-and-how-to-box">
      <div className="h-[585px] screen_960:w-full screen_960:h-auto rounded-t-[30px] bg-lime-100 overflow-hidden">
        <img
          src={image}
          alt="giftImage"
          className="h-[585px] w-full object-contain screen_960:h-auto screen_960:w-full"
        ></img>
      </div>
      <div className="p-[15px]">
        <h1 className="font-bold text-[28px] screen_1250:text-xl screen_960:text-[28px]">{title}</h1>
        <div className="flex flex-col justify-center gap-3 mb-5 mt-3 ml-10 w-fit">
          {list.map((item, index) => (
            <p
              key={index}
              className="overflow-hidden text-ellipsis whitespace-break-spaces screen_1250:text-sm screen_960:text-base"
            >
              <span
                className={`inline-block w-[5px] h-[5px] rounded-full mr-[0.5em] mb-0.5`}
                style={{ backgroundColor: `${item.color}` }}
              ></span>
              {item.content}
            </p>
          ))}
        </div>
        <Link
          to={button.link}
          className={`link-how-to-btn-purple w-full text-center block px-4 py-3 bg-[#1c85b6] text-white rounded-3xl text-xl font-bold`}
          style={{
            background: `linear-gradient(90deg, ${button.color.from} 0%, ${button.color.via} 50%, ${button.color.to} 100%)`,
          }}
        >
          {button.name}
        </Link>
      </div>
    </div>
  );
};
