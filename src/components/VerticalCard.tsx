import { Link } from "react-router-dom";

interface CardProps {
  image: string;
  title: string;
  list: BulletList[];
  button: {
    name: string;
    link: string;
    color: {
      from: string;
      via?: string;
      to: string;
    };
  };
}

interface BulletList {
  content: string;
  color: string;
}

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
        <h1 className="font-bold text-[28px]">{title}</h1>
        <div className="flex flex-col justify-center gap-3 mb-5 mt-3 ml-10">
          {list.map((item, index) => (
            <p key={index}>
              <span
                className={`inline-block w-[5px] h-[5px] ${item.color} rounded-full mr-[0.5em] mb-0.5`}
              ></span>
              {item.content}
            </p>
          ))}
        </div>
        <Link
          to={button.link}
          className={`link-how-to-btn-purple w-full text-center block px-4 py-3 bg-[#1c85b6] text-white rounded-3xl bg-gradient-to-r ${button.color.from} ${button.color.via} ${button.color.to} text-xl font-bold`}
        >
          {button.name}
        </Link>
      </div>
    </div>
  );
};
