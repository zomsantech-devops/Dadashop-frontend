import { Link } from "react-router-dom";
import { CardProps } from "../types";

interface VerticalCardProps {
  cardData: CardProps;
}

export const VerticalCard = ({ cardData }: VerticalCardProps) => {
  const { image, title, list, button } = cardData;

  return (
    <div className="col-span-6 w-[585px] h-min screen_1250:w-[440px] screen_500:w-full rounded-[30px] price-and-how-to-box">
      <div className="w-full rounded-t-[30px] bg-lime-100 overflow-hidden">
        <img
          src={image}
          alt="giftImage"
          className="w-full aspect-square object-cover object-top"
        />
      </div>
      <div className="p-[15px]">
        <h1 className="font-bold text-[28px] screen_1250:text-xl screen_960:text-[28px]">{title}</h1>
        <div className="flex flex-col justify-center gap-3 mb-5 mt-3 ml-10 w-fit">
          {list.map((item, index) => (
            <p
              key={index}
              className="overflow-hidden whitespace-break-spaces break-all screen_1250:text-sm screen_960:text-base"
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
