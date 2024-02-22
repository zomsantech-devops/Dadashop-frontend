import { Link } from "react-router-dom";
import { CardProps } from "../types";
import { useState } from "react";

interface VerticalCardProps {
  cardData: CardProps;
}

export const HorizontalCard = ({ cardData }: VerticalCardProps) => {
  const { image, title, list, button } = cardData;

  // States to manage truncation
  const [isTitleTruncated, setIsTitleTruncated] = useState(true);
  const [truncateContent, setTruncateContent] = useState(list.map(() => true));

  // Function to toggle title truncation
  const toggleTitleTruncation = () => {
    setIsTitleTruncated(!isTitleTruncated);
  };

  // Function to toggle content truncation
  const toggleContentTruncation = (index: number) => {
    const newTruncateContent = [...truncateContent];
    newTruncateContent[index] = !newTruncateContent[index];
    setTruncateContent(newTruncateContent);
  };

  return (
    <div className="col-span-6 w-[585px] h-min screen_1250:max-w-[440px] screen_500:w-full rounded-[30px] price-and-how-to-box">
      <div className="w-full rounded-t-[30px] bg-lime-100 overflow-hidden">
        <img
          src={image}
          alt="giftImage"
          className="w-full aspect-square object-cover object-top"
        ></img>
      </div>
      <div className="p-[15px] flex flex-col justify-between h-full">
        <div>
          <h1
            className={`font-bold text-[28px] ${
              isTitleTruncated ? "truncate" : ""
            }`}
            onClick={toggleTitleTruncation}
          >
            {title}
          </h1>
          <div className="flex flex-col justify-center gap-3 mb-5 mt-3 ml-10">
            {list.map((item, index) => (
              <div key={index} className="flex items-center">
                <span
                  className="inline-block w-[5px] h-[5px] rounded-full mr-2"
                  style={{ backgroundColor: `${item.color}` }}
                ></span>
                <p
                  className={`w-full ${
                    truncateContent[index] ? "truncate" : ""
                  }`}
                  onClick={() => toggleContentTruncation(index)}
                >
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
        <Link
          to={button.link}
          className="link-how-to-btn-purple w-full text-center block px-4 py-3 bg-[#1c85b6] text-white rounded-3xl text-xl font-bold mt-2"
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
