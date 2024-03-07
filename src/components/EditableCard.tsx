import React, { useState } from "react";
import noImg from "../assets/images/empty.webp";

import { FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

interface EditableCardProps {
  initialText?: string;
  initialImgSrc?: string;
}

const EditableCard = ({ initialText, initialImgSrc }: EditableCardProps) => {
  const [text, setText] = useState<string>("DADA");
  const [imgSrc, setImgSrc] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImgSrc(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const deleteImg = () => {
    setImgSrc("");
  };

  return (
    <div className="p-6 pt-6 flex items-center justify-between gap-4 screen_400:p-4 screen_400:pt-5">
      <div className="flex items-center justify-center gap-4">
        {isEditing ? (
          imgSrc ? (
            <>
              <div className="relative">
                <img src={imgSrc} alt="Uploaded" className="w-24 h-auto object-cover" />
                <button
                  className="absolute -top-4 -right-5 cursor-pointer"
                  onClick={deleteImg}
                >
                  <IoMdClose className={`w-5 h-5`} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-24 h-auto border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center py-5">
                  <svg
                    className="w-8 h-8 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          )
        ) : (
          <div className="flex items-center">
            {imgSrc ? (
              <img src={noImg} alt="Uploaded" className="w-24 h-auto" />
            ) : (
              <div>Img</div>
            )}
          </div>
        )}
        <div>
          {isEditing ? (
            <input
              type="text"
              value={text}
              className="w-full border border-blue-gray-50 rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
              onChange={(e) => setText(e.target.value)}
            />
          ) : (
            <p>{text || "DADA"}</p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button onClick={() => setIsEditing(!isEditing)}>
          <FaEdit className="w-5 h-5 self-center text-black/60" />
        </button>
        {/* {isEditing && <input type="file" onChange={handleImageChange} />} */}
      </div>
    </div>
  );
};

export default EditableCard;
