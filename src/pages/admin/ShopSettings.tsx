import LeftSidebar from "../../components/shared/LeftSidebar";

import { ChangeEvent, useEffect, useState } from "react";

import check from "../../assets/icons/checkAdmin.webp";
import busy from "../../assets/icons/busyAdmin.webp";
import close from "../../assets/icons/closeAdmin.webp";

import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaBahtSign } from "react-icons/fa6";
import EditableCard from "../../components/EditableCard";

const ShopSettings = () => {
  const [status, setStatus] = useState<string>("");
  const [openTime, setOpenTime] = useState<string>("");
  const [closeTime, setCloseTime] = useState<string>("");
  const [newOpenTime, setNewOpenTime] = useState<string>(openTime);
  const [newCloseTime, setNewCloseTime] = useState<string>(closeTime);
  const [initialRate, setInitialRate] = useState<number>(0);
  const [updateRate, setUpdateRate] = useState<number>(initialRate);
  const [content, setContent] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>(status);
  const [initialText, setInitialText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewOpenTime(event.target.value);
  };

  const handleCloseTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCloseTime(event.target.value);
  };

  const onSubmitHandle = async (event: React.FormEvent) => {
    event.preventDefault();
    const rawToken = localStorage.getItem("token");
    try {
      if (rawToken) {
        const token = rawToken.replace(/"/g, "");
        await axios.post(
          `${process.env.REACT_APP_API}/setting/time`,
          {
            open_time: newOpenTime,
            close_time: newCloseTime,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Time updated Successfully", { autoClose: 1500 });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      toast.error("Failed to update times", { autoClose: 1500 });
      console.error("Failed to update times", error);
    }
  };

  const onUpdateRate = async (event: React.FormEvent) => {
    event.preventDefault();
    const rawToken: string | null = localStorage.getItem("token");
    try {
      if (rawToken) {
        const token = rawToken.replace(/"/g, "");
        console.log(token);
        await axios.patch(
          `${process.env.REACT_APP_API}/setting/currency/${updateRate}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Update Rate Successfully", { autoClose: 1500 });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      toast.error("Failed to update Rate", { autoClose: 1500 });
      console.error("Failed to update Rate", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const getTime = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/setting/time`
        );
        setStatus(response.data.data.status);
        setOpenTime(response.data.data.open_time);
        setCloseTime(response.data.data.close_time);
        setSelectedStatus(response.data.data.status);
        setNewOpenTime(response.data.data.open_time);
        setNewCloseTime(response.data.data.close_time);
      } catch (error: any) {
        console.error(error.response);
      }
    };

    const getRate = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/setting/currency`
        );
        setInitialRate(response.data.data.rate);
        setUpdateRate(response.data.data.rate);
      } catch (error: any) {
        console.error(error.response);
      }
    };

    const getThumbnailContent = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/setting/content/title`
        );
        setInitialText(response.data.data.content);
      } catch (error: any) {
        console.error(error.response);
      } finally {
        setIsLoading(false);
      }
    };

    getTime();
    getRate();
    getThumbnailContent();
  }, []);

  useEffect(() => {
    const getContent = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/setting/content/${selectedStatus}`
        );
        setContent(response.data.data.content);
      } catch (error) {}
    };
    getContent();
  }, [selectedStatus]);

  const onStatusHandle = async (status: string) => {
    const rawToken = localStorage.getItem("token");
    try {
      if (rawToken) {
        const token = rawToken.replace(/"/g, "");
        await axios.get(
          `${process.env.REACT_APP_API}/setting/time/toggle/${status}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Status updated", { autoClose: 1500 });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error: any) {
      toast.error("Failed to update status ", { autoClose: 1500 });
      console.error("Update status failed", error.response);
    }
  };

  const getTextColorClass = (status: string) => {
    if (status === "OPEN") {
      return "text-[#4BAE4F]";
    } else if (status === "MAINTENANCE") {
      return "text-[#FEC006]";
    } else {
      return "text-[#EA3359]";
    }
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedRate = parseInt(value);
    if (!value) {
      setUpdateRate(0);
    } else if (!isNaN(parsedRate)) {
      setUpdateRate(parsedRate);
    }
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
    setContent(e.target.value); //-
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleContentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const rawToken = localStorage.getItem("token");
    try {
      if (rawToken) {
        const token = rawToken.replace(/"/g, "");
        await axios.post(
          `${process.env.REACT_APP_API}/setting/content/${selectedStatus}`,
          { content },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Content updated!");
      }
    } catch (error: any) {
      console.error("Update content failed", error.response);
    }
  };

  return (
    <main className="flex flex-row">
      <LeftSidebar />
      {isLoading ? (
        <div className="">Loading...</div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 px-6 w-[580px] my-6 mb-10 mx-auto relative">
          <div className="text-center text-5xl font-bold mt-10 mb-6 leading-[58px]">
            Update Shop Status
          </div>

          <div className="w-full rounded-xl border shadow-md">
            <div className="flex flex-col space-y-1.5 p-6 font-bold text-center text-xl">
              Click to change shop status{" "}
              <span className={`${getTextColorClass(status)}`}>[{status}]</span>
            </div>
            <div className="flex items-center justify-center gap-4 p-6 pt-0 screen_605:flex-col">
              <button
                className={`flex items-center justify-center gap-2 rounded-lg p-4 bg-[#4BAE4F] text-white ${
                  status === "OPEN" && "bg-[#4BAE4F]/40 cursor-not-allowed"
                } ${
                  status === "MAINTENANCE" &&
                  "bg-[#4BAE4F]/40 cursor-not-allowed"
                } `}
                onClick={() => onStatusHandle("OPEN")}
                disabled={status === "OPEN" || status === "MAINTENANCE"}
              >
                <img src={check} alt="check" className="w-5 h-5 self-center" />
                Set Open
              </button>
              <button
                className={`flex items-center justify-center gap-2 rounded-lg p-4 bg-[#FEC006] text-white ${
                  status === "MAINTENANCE" && "bg-[#FEC006] "
                }`}
                onClick={() => onStatusHandle("MAINTENANCE")}
              >
                <img src={busy} alt="check" className="w-5 h-5 self-center" />
                {status === "MAINTENANCE"
                  ? "Out Maintenance"
                  : "Set Maintenance"}
              </button>
              <button
                className={`flex items-center justify-center gap-2 rounded-lg p-4 bg-[#EA3359] text-white ${
                  status === "CLOSED" && "bg-[#EA3359]/40 cursor-not-allowed"
                } ${
                  status === "MAINTENANCE" &&
                  "bg-[#EA3359]/40 cursor-not-allowed"
                }`}
                onClick={() => onStatusHandle("CLOSED")}
                disabled={status === "CLOSED" || status === "MAINTENANCE"}
              >
                <img src={close} alt="check" className="w-5 h-5 self-center" />
                Set Close
              </button>
            </div>
          </div>

          {/* Edit content */}
          <div className="w-full rounded-xl border shadow-md">
            <div className="flex flex-col space-y-1.5 p-6 font-bold text-center text-xl">
              Edit content
            </div>
            <div className="p-6 pt-0 flex flex-col gap-4">
              <label className="font-bold">Status:</label>
              <select
                className="border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
                name="status"
                onChange={handleSelect}
                value={selectedStatus}
              >
                {selectedStatus === "MAINTENANCE" && (
                  <>
                    <option value="MAINTENANCE">Maintenance</option>
                    <option value="OPEN">Open</option>
                    <option value="CLOSED">Close</option>
                  </>
                )}
                {selectedStatus === "OPEN" && (
                  <>
                    <option value="OPEN">Open</option>
                    <option value="MAINTENANCE">Maintenance</option>
                    <option value="CLOSED">Close</option>
                  </>
                )}
                {selectedStatus === "CLOSED" && (
                  <>
                    <option value="CLOSED">Close</option>
                    <option value="OPEN">Open</option>
                    <option value="MAINTENANCE">Maintenance</option>
                  </>
                )}
              </select>

              <form onSubmit={handleContentSubmit}>
                <label className="font-bold">Content: </label>
                <textarea
                  name="content"
                  value={content}
                  onChange={handleContentChange}
                  className="w-full border border-blue-gray-50 rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3] mb-[15px]"
                />
                <button
                  type="submit"
                  className={`bg-[#1EAEF0] rounded-[10px] px-12 py-2 opacity-100 hover:opacity-80 font-bold text-white w-full disabled:bg-[#1EAEF0]/20 disabled:cursor-not-allowed`}
                  disabled={!content}
                >
                  อัพเดต Content
                </button>
              </form>
            </div>
          </div>

          {/* SET TIME OPEN-CLOSE */}
          <div className="w-full rounded-xl border shadow-md">
            <div className="flex flex-col space-y-1.5 p-6 font-bold text-center text-xl mt-4">
              Set open - close time
            </div>
            <form
              onSubmit={onSubmitHandle}
              className="p-6 pt-0 flex flex-col gap-4"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <div>
                  <label
                    htmlFor="openTime"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Open Time ({openTime})
                  </label>
                  <input
                    id="openTime"
                    type="time"
                    value={newOpenTime}
                    onChange={handleOpenTimeChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="closeTime"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Close Time ({closeTime})
                  </label>
                  <input
                    id="closeTime"
                    type="time"
                    value={newCloseTime}
                    onChange={handleCloseTimeChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className={`bg-[#1EAEF0] rounded-[10px] px-12 py-2 opacity-100 hover:opacity-80 font-bold text-white w-full disabled:bg-[#1EAEF0]/20 disabled:cursor-not-allowed`}
                disabled={
                  newCloseTime === closeTime && newOpenTime === openTime
                }
              >
                อัพเดตเวลา
              </button>
            </form>
          </div>
          {/* SET RATE PRICE */}
          <div className="text-center text-5xl font-bold mt-10 mb-3 leading-[58px]">
            SET RATE PRICE
          </div>
          <div className="w-full rounded-xl border shadow-md">
            <div className="p-6 pt-6 flex flex-col gap-4">
              <div className="flex flex-col items-center justify-center">
                <div className="bg-emerald-500/20 p-3 w-fit rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
                  <FaBahtSign
                    className="rounded-full bg-emerald-500 text-white/80 p-1"
                    size={20}
                  />
                  <p>
                    Current rate is{" "}
                    <span className="font-bold text-lg">"{initialRate}"</span>
                  </p>
                </div>
              </div>

              <form
                onSubmit={onUpdateRate}
                className="flex flex-col items-center justify-center"
              >
                <div className="flex items-center gap-x-2 mb-4">
                  <input
                    type="number"
                    name="rate"
                    value={updateRate}
                    onChange={handleRateChange}
                    min={0}
                    max={100}
                    className="w-[60px] border border-blue-gray-50 rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
                  />
                  <div className="">
                    บาท : <span className="font-bold">100</span> v-bucks
                  </div>
                </div>
                <button
                  type="submit"
                  className={`bg-[#1EAEF0] rounded-[10px] px-12 py-2 opacity-100 hover:opacity-80 font-bold text-white w-full disabled:bg-[#1EAEF0]/20 disabled:cursor-not-allowed`}
                  disabled={!updateRate}
                >
                  อัพเดตเรทราคา
                </button>
              </form>
              <Link
                to={"/item-shop"}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline mt-2"
              >
                Go to item shop
              </Link>
            </div>
          </div>

          {/* Update thumbnail */}
          <div className="text-center text-5xl font-bold mt-10 mb-3 leading-[58px]">
            UPDATE THUMBNAIL
          </div>
          <div className="w-full rounded-xl border shadow-md">
            <EditableCard initialText={initialText} />
          </div>
        </div>
      )}
    </main>
  );
};
export default ShopSettings;
