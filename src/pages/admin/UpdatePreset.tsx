import { ChangeEvent, useEffect, useState } from "react";
import LeftSidebar from "../../components/shared/LeftSidebar";
import axios from "axios";
import { VerticalCard } from "../../components/VerticalCard";
import { CardProps } from "../../types";
import { toast } from "react-toastify";

const UpdatePreset = () => {
  const [data, setData] = useState<CardProps[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState("1");
  const [selectedPresetLocation, setSelectedPresetLocation] =
    useState<string>("price-fortnite");
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
    location: "",
    preset_id: "",
  });
  const [image, setImage] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPreset = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/preset`);
        setData(response.data.data);

        if (response.data.data.length > 0) {
          const firstPresetId = response.data.data[0].preset_id;
          setSelectedPresetId(firstPresetId);
          // This will trigger the second useEffect to fetch the preset by ID
        }
      } catch (error: any) {}
    };

    getPreset();
  }, []);

  useEffect(() => {
    const getPresetById = async () => {
      if (!selectedPresetId) return;
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/preset/${selectedPresetId}`
        );
        if (response.data.data) {
          setSelectedPreset(response.data.data);
          // Update selectedPresetLocation based on fetched data
          setSelectedPresetLocation(
            response.data.data.location || "price-fortnite"
          ); // Default to 'price-fortnite' if location is undefined
        } else {
          console.warn("No preset data found for the given ID");
        }
      } catch (error) {
        console.error("Failed to fetch preset by ID:", error);
      }
    };

    getPresetById();
  }, [selectedPresetId]);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPresetId(e.target.value);
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
      setSelectedPreset({
        ...selectedPreset,
        image: URL.createObjectURL(selectedFile),
      });
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedPreset({ ...selectedPreset, title: e.target.value });
  };

  const handleBulletChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const newList = [...selectedPreset.list];
      newList[index].content = e.target.value;
      setSelectedPreset({ ...selectedPreset, list: newList });
    };

  const handleBulletColorChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const newList = [...selectedPreset.list];
      newList[index].color = e.target.value;
      setSelectedPreset({ ...selectedPreset, list: newList });
    };

  const handleButtonTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedPreset({
      ...selectedPreset,
      button: {
        ...selectedPreset.button,
        name: e.target.value,
      },
    });
  };

  const handleButtonLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedPreset({
      ...selectedPreset,
      button: {
        ...selectedPreset.button,
        link: e.target.value,
      },
    });
  };

  const handleGradientColorChange =
    (colorKey: "from" | "via" | "to") => (e: ChangeEvent<HTMLInputElement>) => {
      const newButtonColor = {
        ...selectedPreset.button.color,
        [colorKey]: e.target.value,
      };
      setSelectedPreset({
        ...selectedPreset,
        button: {
          ...selectedPreset.button,
          color: newButtonColor,
        },
      });
    };

  const handleSelectLocation = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPresetLocation(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      image: `${process.env.REACT_APP_API}/image/preset-${selectedPresetId}`,
      title: selectedPreset.title,
      list: selectedPreset.list.map(({ content, color }) => ({
        content,
        color: color.toLowerCase(),
      })),
      button: {
        name: selectedPreset.button.name,
        link: selectedPreset.button.link,
        color: {
          from: selectedPreset.button.color.from.toLowerCase(),
          via: selectedPreset.button.color.via?.toLowerCase(),
          to: selectedPreset.button.color.to.toLowerCase(),
        },
      },
      location: selectedPresetLocation,
      preset_id: selectedPresetId,
    };

    const rawToken: string | null = localStorage.getItem("token");

    if (image) {
      try {
        if (rawToken) {
          const token = rawToken.replace(/"/g, "");
          await axios.post(
            `${process.env.REACT_APP_API}/image/preset-${selectedPresetId}`,
            { image },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          toast.success("Upload Image Successfully");
        } else {
          toast.warn("Token not found in localStorage");
          setIsLoading(false);
          console.error("Token not found in localStorage");
        }
      } catch (error) {
        toast.error("Upload Image Failed");
        setIsLoading(false);
        console.error("Upload Error:" + error);
      }
    }

    try {
      if (rawToken) {
        const token = rawToken.replace(/"/g, "");
        await axios.patch(
          `${process.env.REACT_APP_API}/preset/${selectedPresetId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Preset has been Updated");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Failed");
      setIsLoading(false);
      console.error(error);
    }
  };

  const deletePreset = async () => {
    // Confirm with the user
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this preset?"
    );
    if (isConfirmed) {
      setIsLoading(true); // Optional: Set loading state

      try {
        const rawToken = localStorage.getItem("token");
        if (!rawToken) {
          toast.warn("Token not found in localStorage");
          setIsLoading(false); // Reset loading state
          return;
        }

        const token = rawToken.replace(/"/g, "");
        await axios.delete(
          `${process.env.REACT_APP_API}/preset/${selectedPresetId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Preset has been deleted successfully. Reload in 2 seconds..."
        );

        await axios.delete(
          `${process.env.REACT_APP_API}/image/preset-${selectedPresetId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Preset Image has been deleted successfully.");
      } catch (error) {
        toast.error("Failed to delete the preset");
        console.error(error);
      } finally {
        setIsLoading(false); // Reset loading state
      }
    }
  };

  return (
    <main>
      <LeftSidebar />
      <div className="flex flex-col justify-center px-[30px] w-fit my-6 screen_910:w-full mx-auto relative">
        <div className="text-center text-5xl font-bold my-10 leading-[58px]">
          Update Preset
        </div>
        <div className="grid grid-cols-10 gap-8">
          <div className="col-span-5 screen_930:col-span-10">
            <form onSubmit={handleSubmit} className="flex flex-col">
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
                <p className="text-sm opacity-60">
                  *Upload to {process.env.REACT_APP_API}/image/preset-
                  {selectedPresetId}
                </p>
                <label className="mb-2 font-bold mr-2">Upload new image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className=""
                />
              </div>

              <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col">
                  <label className="mb-[3px] font-bold">Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={selectedPreset.title}
                    onChange={handleTitleChange}
                    className="border border-blue-gray-50 rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-[3px] font-bold">Bullet 1:</label>
                  <div className="flex items-center justify-start">
                    <input
                      type="text"
                      name="bullet_1"
                      value={selectedPreset.list[0].content}
                      onChange={handleBulletChange(0)}
                      className="w-[85%] border border-blue-gray-50 rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3] mr-2"
                    />
                    <input
                      type="color"
                      className="p-1 h-10 w-[15%] bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                      id="hs-color-input"
                      value={selectedPreset.list[0].color}
                      onChange={handleBulletColorChange(0)}
                      title="Choose your color"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="mb-[3px] font-bold">Bullet 2:</label>
                  <div className="flex items-center justify-start">
                    <input
                      type="text"
                      name="bullet_2"
                      value={selectedPreset.list[1].content}
                      onChange={handleBulletChange(1)}
                      className="w-[85%] border border-blue-gray-50 rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3] mr-2"
                    />
                    <input
                      type="color"
                      className="p-1 h-10 w-[15%] bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                      id="hs-color-input"
                      value={selectedPreset.list[1].color}
                      onChange={handleBulletColorChange(1)}
                      title="Choose your color"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="mb-[3px] font-bold">Bullet 3:</label>
                  <div className="flex items-center justify-start">
                    <input
                      type="text"
                      name="bullet_3"
                      value={selectedPreset.list[2].content}
                      onChange={handleBulletChange(2)}
                      className="w-[85%] border border-blue-gray-50 rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3] mr-2"
                    />
                    <input
                      type="color"
                      className="p-1 h-10 w-[15%] bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                      id="hs-color-input"
                      value={selectedPreset.list[2].color}
                      onChange={handleBulletColorChange(2)}
                      title="Choose your color"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="mb-[3px] font-bold">Button name:</label>
                  <input
                    type="text"
                    name="button_name"
                    value={selectedPreset.button.name}
                    onChange={handleButtonTitleChange}
                    className="border border-blue-gray-50 rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-[3px] font-bold">Link (Path):</label>
                  <div className="flex w-full items-center gap-2 screen_540:flex-col screen_540:items-start">
                    <input
                      type="text"
                      name="link"
                      value={selectedPreset.button.link}
                      onChange={handleButtonLinkChange}
                      className="flex-1 border border-blue-gray-50 rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3] screen_540:w-full"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="mb-[3px] font-bold">Gradient:</label>
                  <div className="flex items-center justify-start gap-2">
                    <input
                      type="color"
                      className="p-1 h-10 w-full bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                      id="hs-color-input"
                      value={selectedPreset.button.color.from}
                      onChange={handleGradientColorChange("from")}
                      title="Choose your color"
                    />
                    <input
                      type="color"
                      className="p-1 h-10 w-full bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                      id="hs-color-input"
                      value={selectedPreset.button.color.via}
                      onChange={handleGradientColorChange("via")}
                      title="Choose your color"
                    />
                    <input
                      type="color"
                      className="p-1 h-10 w-full bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                      id="hs-color-input"
                      value={selectedPreset.button.color.to}
                      onChange={handleGradientColorChange("to")}
                      title="Choose your color"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="mb-[3px] font-bold">
                    Location (หน้า เติม fortnite หรือ หน้าบริการอื่นๆ):
                  </label>
                  <select
                    className="border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
                    name="location"
                    value={selectedPresetLocation}
                    onChange={handleSelectLocation}
                  >
                    <option value="price-fortnite">price-fortnite</option>
                    <option value="price-other">price-other</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className={`bg-[#1EAEF0] rounded-[10px] px-4 py-2 opacity-100 hover:opacity-80 w-full font-bold text-white ${
                  isLoading && "bg-[#1EAEF0]/50"
                }`}
                disabled={isLoading}
              >
                อัพเดต Preset
              </button>
            </form>

            {/* Separator */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-red-500"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-red-500">Danger Zone</span>
              </div>
            </div>
            {/* Separator */}

            {/* Delete preset */}
            <button
              className={`bg-red-500 rounded-[10px] px-4 py-2 opacity-100 hover:opacity-80 w-full font-bold text-white ${
                isLoading && "bg-red-500/50"
              }`}
              disabled={isLoading}
              onClick={deletePreset}
            >
              Delete This Preset
            </button>
          </div>

          <div className="col-span-5 screen_930:col-span-10">
            <VerticalCard cardData={selectedPreset} />
          </div>
        </div>
      </div>
    </main>
  );
};
export default UpdatePreset;
