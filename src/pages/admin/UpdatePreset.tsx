import { ChangeEvent, useEffect, useState } from "react";
import LeftSidebar from "../../components/shared/LeftSidebar";
import axios from "axios";
import { VerticalCard } from "../../components/VerticalCard";
import { CardProps } from "../../types";

const UpdatePreset = () => {
  const [data, setData] = useState<CardProps[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<number>(1);
  const [selectedPreset, setSelectedPreset] = useState<CardProps>({
    image: "",
    title: "",
    list: [
      {
        content: "",
        color: "",
      },
      {
        content: "",
        color: "",
      },
      {
        content: "",
        color: "",
      },
    ],
    button: {
      name: "",
      link: "",
      color: {
        from: "",
        via: "",
        to: "",
      },
    },
  });

  useEffect(() => {
    const getPreset = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/preset`);
        setData(response.data.data);
      } catch (error: any) {}
    };

    getPreset();
  }, []);

  useEffect(() => {
    const getPresetById = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/preset/${selectedPresetId}`
        );
        setSelectedPreset(response.data.data);
      } catch (error: any) {}
    };

    getPresetById();
  }, [selectedPresetId]);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPresetId(parseInt(e.target.value));
  };

  return (
    <main>
      <LeftSidebar />
      <div className="flex flex-col justify-center px-[30px] w-[910px] my-6 screen_910:w-full mx-auto relative">
        <div className="text-center text-5xl font-bold my-10 leading-[58px]">
          Update Preset
        </div>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-6 screen_930:col-span-12">
            <form className="flex flex-col">
              <label className="mb-[3px] font-bold">Preset id:</label>
              <select
                className="border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
                name="preset"
                onChange={handleSelect}
              >
                {/* <option value="empty">Select Preset</option> */}
                {data.map((preset) => (
                  <option key={preset.preset_id} value={preset.preset_id}>
                    {preset.preset_id}
                  </option>
                ))}
              </select>

              <div className="mb-[15px]">
                <label className="mb-2 font-bold">Upload new image:</label>
                <input type="file" accept="image/*" className="" />
              </div>

              <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col">
                  <label className="mb-[3px] font-bold">Title:</label>
                  <input
                    type="text"
                    name="title"
                    className="border border-blue-gray-50 rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-[3px] font-bold">Bullet 1:</label>
                  <div className="flex items-center justify-start">
                    <input
                      type="text"
                      name="bullet_1"
                      className="w-[85%] border border-blue-gray-50 rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3] mr-2"
                    />
                    <input
                      type="color"
                      className="p-1 h-10 w-[15%] bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                      id="hs-color-input"
                      value="#1EAEF0"
                      title="Choose your color"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="mb-[3px] font-bold">Bullet 2:</label>
                  <div className="flex items-center justify-start">
                    <input
                      type="text"
                      name="bullet_1"
                      className="w-[85%] border border-blue-gray-50 rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3] mr-2"
                    />
                    <input
                      type="color"
                      className="p-1 h-10 w-[15%] bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                      id="hs-color-input"
                      value="#1EAEF0"
                      title="Choose your color"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="mb-[3px] font-bold">Bullet 3:</label>
                  <div className="flex items-center justify-start">
                    <input
                      type="text"
                      name="bullet_1"
                      className="w-[85%] border border-blue-gray-50 rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3] mr-2"
                    />
                    <input
                      type="color"
                      className="p-1 h-10 w-[15%] bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                      id="hs-color-input"
                      value="#1EAEF0"
                      title="Choose your color"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="mb-[3px] font-bold">Name:</label>
                  <input
                    type="text"
                    name="name"
                    className="border border-blue-gray-50 rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-[3px] font-bold">Link (Path):</label>
                  <input
                    type="text"
                    name="link"
                    className="border border-blue-gray-50 rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-[3px] font-bold">Gradient:</label>
                  <div className="flex items-center justify-start">
                    <input
                      type="color"
                      className="p-1 h-10 w-full bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                      id="hs-color-input"
                      value="#1EAEF0"
                      title="Choose your color"
                    />
                    <input
                      type="color"
                      className="p-1 h-10 w-full bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none mx-2"
                      id="hs-color-input"
                      value="#1EAEF0"
                      title="Choose your color"
                    />
                    <input
                      type="color"
                      className="p-1 h-10 w-full bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                      id="hs-color-input"
                      value="#1EAEF0"
                      title="Choose your color"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={`bg-[#1EAEF0] rounded-[10px] px-4 py-2 opacity-100 hover:opacity-80 w-full font-bold text-white`}
              >
                อัพเดตรูปภาพ
              </button>
            </form>
          </div>
          <div className="col-span-6 screen_930:col-span-12">
            <VerticalCard cardData={selectedPreset} />
          </div>
        </div>
      </div>
    </main>
  );
};
export default UpdatePreset;
