import { useNavigate } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import emptyImage from "../images/empty.jpg";
import { toast } from "react-toastify";

interface AllImages {
  _id: string;
  name: string;
  dataUrl: string;
}

const ChangeImages = () => {
  const [allImages, setAllImages] = useState<AllImages[]>([]);
  const [selectedBanner, setSelectedBanner] = useState<string>("");
  const [selectedBannerDataUrl, setSelectedBannerDataUrl] =
    useState<string>("");
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const rawToken: string | null = localStorage.getItem("token");
    const getAuthenticated = async () => {
      try {
        if (rawToken) {
          const token = rawToken.replace(/"/g, "");
          await axios.get(
            "https://dadashop-backend.vercel.app/api/v1/auth/protected",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log(response);
        } else {
          console.error("Token not found in localStorage");
          navigate("/login");
        }
      } catch (error: any) {
        console.error("Authentication failed", error.response?.data);
        navigate("/login");
      }
    };

    const getAllImages = async () => {
      try {
        if (rawToken) {
          const token = rawToken.replace(/"/g, "");
          const response = await axios.get(
            "https://dadashop-backend.vercel.app/api/v1/image",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setAllImages(response.data.data);
        } else {
          console.error("Token not found in localStorage");
          navigate("/login");
        }
      } catch (error) {}
    };

    getAuthenticated();
    getAllImages();
  }, [navigate]);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedBannerName = e.target.value;
    console.log(selectedBannerName);
    setSelectedBanner(selectedBannerName);

    const banner = allImages.find((img) => img.name === selectedBannerName);
    if (banner) {
      setSelectedBannerDataUrl(banner.dataUrl);
    } else {
      setSelectedBannerDataUrl("");
    }
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    const rawToken: string | null = localStorage.getItem("token");
    try {
      console.log(rawToken);
      if (rawToken) {
        const token = rawToken.replace(/"/g, "");
        const response = await axios.post(
          `https://dadashop-backend.vercel.app/api/v1/image/${selectedBanner}`,
          { image },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        toast.success("Upload Image Successfully")
        setTimeout(() => {
          toast.success("Please reload this page...")
        }, 1000);
        setIsLoading(false)
      } else {
        toast.warn("Token not found in localStorage")
        setIsLoading(false)
        console.error("Token not found in localStorage");
      }
    } catch (error) {
      toast.error("Upload Image Failed")
      setIsLoading(false)
      console.error("Upload Error:" + error);
    }
  };

  return (
    <main className="flex flex-row">
      <LeftSidebar />
      {/* Change image side */}
      <div className="flex flex-col items-center justify-center w-[910px] my-6 screen_910:w-full mx-auto relative pb-[50px] screen_1070:pl-20 screen_500:pb-0 screen_500:pr-4">
        <div className="flex flex-col w-[600px] screen_810:w-[350px] screen_500:w-[250px]">
          <p className="font-bold text-[24px] mb-[10px]">แก้ไขภาพ Banners</p>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="mb-[3px] font-bold">Banner name:</label>
            <select
              className="border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
              name="image_type"
              onChange={handleSelect}
            >
              <option value="empty">Select Banner</option>
              {allImages.map((img) => (
                <option key={img._id} value={img.name}>
                  {img.name}
                </option>
              ))}
            </select>

            <label className="mb-[3px] font-bold">Upload new image:</label>
            <input
              type="file"
              accept="image/*"
              className="mb-[15px]"
              onChange={handleUpload}
            />

            <div className="flex flex-col gap-4 mb-[15px]">
              <div className="">
                <label className="mb-1 font-bold">Old image: </label>
                <img
                  src={selectedBannerDataUrl || emptyImage}
                  alt=""
                  className="mb-1 h-[200px]"
                />
              </div>
              <div className="">
                <label className="mb-1 font-bold">New image:</label>
                <img
                  src={previewImage || emptyImage}
                  alt=""
                  className="mb-[15px] h-[200px]"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`bg-[#1EAEF0] rounded-[10px] px-4 py-2 opacity-100 hover:opacity-80 w-full font-bold text-white ${isLoading && "bg-[#1EAEF0]/50"}`}
              disabled={isLoading}
            >
              อัพเดตรูปภาพ
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
export default ChangeImages;
