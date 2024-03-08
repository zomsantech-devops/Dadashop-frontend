import React, { useState } from "react";
import noImg from "../assets/images/empty.webp";

import { FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import axios from "axios";
import { toast } from "react-toastify";

interface EditableCardProps {
  initialText?: string;
}

const EditableCard = ({ initialText }: EditableCardProps) => {
  const [content, setText] = useState<string | undefined>(initialText);
  const [Image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>(
    "https://dadashop-backend.vercel.app/api/v1/image/thumbnail"
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const onCancel = () => {
    setIsEditing(false);
    if (!previewImage) {
      setPreviewImage(
        "https://dadashop-backend.vercel.app/api/v1/image/thumbnail"
      );
    }

    if (!content) {
      setText(initialText);
    }
  };

  const onUpdateThumbnail = async () => {
    const formData = new FormData();
    if (Image) {
      formData.append("image", Image); // Assuming 'image' is the correct field name expected by your backend
    }

    const rawToken: string | null = localStorage.getItem("token");
    if (!rawToken) {
      toast.warn("Token not found in localStorage");
      console.error("Token not found in localStorage");
      return;
    }
    const token = rawToken.replace(/"/g, "");

    // Upload image
    if (Image) {
      try {
        await axios.post(
          `${process.env.REACT_APP_API}/image/thumbnail`,
          formData, // Send formData instead of JSON
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data", // This is crucial for file upload
            },
          }
        );
        toast.success("Upload Image Successfully");
      } catch (error) {
        toast.error("Upload Image Failed");
        console.error("Upload Error:", error);
      }
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API}/setting/content/title`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Text update Successfully");
    } catch (error) {
      toast.error("Text update Failed");
      console.error("Text update error:", error);
    } finally {
      setIsEditing(false)
    }
  };

  return (
    <div
      className={`p-6 pt-6 flex items-center justify-between gap-4 screen_400:p-4 screen_400:pt-5 ${
        isEditing && "flex-col"
      } screen_605:flex-col`}
    >
      <div className="flex items-center justify-start gap-4 w-full screen_500:flex-col">
        {isEditing ? (
          previewImage ? (
            <>
              <div className="relative">
                <img
                  src={previewImage}
                  alt="Uploaded"
                  className="h-auto w-[150px] bg-black/20"
                />
                <button
                  className="absolute -top-4 -right-5 cursor-pointer"
                  onClick={() => setPreviewImage("")}
                >
                  <IoMdClose
                    className={`w-5 h-5 rounded-full bg-red-500/80 text-white`}
                  />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center">
              <label className="flex flex-col items-center justify-center h-auto w-[150px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
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
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>
            </div>
          )
        ) : (
          <div className="flex items-center">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Uploaded"
                className="h-auto w-[150px] bg-black/20"
              />
            ) : (
              <img
                src={noImg}
                alt="Uploaded"
                className="h-auto w-[150px] bg-black/20"
              />
            )}
          </div>
        )}
        <div>
          {isEditing ? (
            <input
              type="text"
              value={content}
              className="w-full border border-blue-gray-50 rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
              onChange={(e) => setText(e.target.value)}
            />
          ) : (
            <p>{content}</p>
          )}
        </div>
      </div>
      {/* Button */}
      <div className="flex items-center justify-center screen_605:w-full">
        {isEditing ? (
          <div className="flex gap-2">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-red-500 text-slate-50 shadow hover:bg-red-500/90 h-9 px-4 py-2 screen_605:w-full"
              onClick={onCancel}
            >
              <div className="flex items-center justify-center">
                <CiCircleRemove className="w-5 h-5 mr-1" />
                <p>Cancel</p>
              </div>
            </button>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-green-500 text-slate-50 shadow hover:bg-green-500/90 h-9 px-4 py-2 screen_605:w-full"
              onClick={onUpdateThumbnail}
            >
              <div className="flex items-center justify-center">
                <CiCircleCheck className="w-5 h-5 mr-1" />
                <p>Confirm</p>
              </div>
            </button>
          </div>
        ) : (
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-[#1EAEF0] text-slate-50 shadow hover:bg-[#1EAEF0]/90 h-9 px-4 py-2 screen_605:w-full"
            onClick={() => setIsEditing(true)}
          >
            <div className="flex items-center justify-center">
              <FaEdit className="w-4 h-4 mr-1" />
              <p>Edit</p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default EditableCard;
