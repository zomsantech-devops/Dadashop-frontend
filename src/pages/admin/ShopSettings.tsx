import LeftSidebar from "../../components/shared/LeftSidebar";
import check from "../../assets/icons/checkAdmin.svg";
import busy from "../../assets/icons/busyAdmin.svg";
import close from "../../assets/icons/closeAdmin.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaBahtSign } from "react-icons/fa6";

const ShopSettings = () => {
  const [status, setStatus] = useState<string>("");
  const [openTime, setOpenTime] = useState<string>("");
  const [closeTime, setCloseTime] = useState<string>("");
  const [newOpenTime, setNewOpenTime] = useState<string>("");
  const [newCloseTime, setNewCloseTime] = useState<string>("");
  const [initialRate, setInitialRate] = useState<number>(0);
  const [updateRate, setUpdateRate] = useState<number>(0);

  const navigate = useNavigate();

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
    try {
      await axios.post(`${process.env.REACT_APP_API}/setting/time`, {
        open_time: newOpenTime,
        close_time: newCloseTime,
      });
      toast.success("Time updated Successfully", { autoClose: 1500 });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.success("Failed to update times", { autoClose: 1500 });
      console.error("Failed to update times", error);
    }
  };

  const onUpdateRate = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.patch(
        `${process.env.REACT_APP_API}/setting/currency/${updateRate}`
      );
      toast.success("Update Rate Successfully", { autoClose: 1500 });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.success("Failed to update Rate", { autoClose: 1500 });
      console.error("Failed to update Rate", error);
    }
  };

  useEffect(() => {
    const getTime = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/setting/time`
        );
        setStatus(response.data.data.status);
        setOpenTime(response.data.data.open_time);
        setCloseTime(response.data.data.close_time);
      } catch (error: any) {}
    };

    const getRate = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/setting/currency`
        );
        setInitialRate(response.data.data.rate);
      } catch (error) {}
    };

    getTime();
    getRate();
  }, [navigate, status]);

  const onStatusHandle = async (status: string) => {
    try {
      await axios.get(
        `${process.env.REACT_APP_API}/setting/time/toggle/${status}`
      );
      toast.success("Status updated", { autoClose: 1500 });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error: any) {
      toast.success("Failed to update status ", { autoClose: 1500 });
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

  return (
    <main className="flex flex-row">
      <LeftSidebar />
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
              }`}
              onClick={() => onStatusHandle("OPEN")}
              disabled={status === "OPEN"}
            >
              <img src={check} alt="check" className="w-5 h-5 self-center" />
              Set Open
            </button>
            <button
              className={`flex items-center justify-center gap-2 rounded-lg p-4 bg-[#FEC006] text-white ${
                status === "MAINTENANCE" && "bg-[#FEC006]/40 cursor-not-allowed"
              }`}
              onClick={() => onStatusHandle("MAINTENANCE")}
              disabled={status === "MAINTENANCE"}
            >
              <img src={busy} alt="check" className="w-5 h-5 self-center" />
              Set Maintenance
            </button>
            <button
              className={`flex items-center justify-center gap-2 rounded-lg p-4 bg-[#EA3359] text-white ${
                status === "CLOSED" && "bg-[#EA3359]/40 cursor-not-allowed"
              }`}
              onClick={() => onStatusHandle("CLOSED")}
              disabled={status === "CLOSED"}
            >
              <img src={close} alt="check" className="w-5 h-5 self-center" />
              Set Close
            </button>
          </div>
        </div>

        {/* Edit content */}
        <div className="w-full rounded-xl border shadow-md">
          <div className="flex flex-col space-y-1.5 p-6 font-bold text-center text-xl">
            Edit content (WIP)
          </div>
          <div className="p-6 pt-0 flex flex-col gap-4">
            <p className="text-center">
              Current content text is{" "}
              <span className="font-bold text-lg">
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
                saepe!"
              </span>
            </p>

            <form>
              {/* <div className="flex items-center gap-x-2 mb-4">
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
          </div> */}
              <button
                type="submit"
                className={`bg-[#1EAEF0] rounded-[10px] px-12 py-2 opacity-100 hover:opacity-80 font-bold text-white w-full cursor-not-allowed disabled:bg-[#1EAEF0]/50 disabled:hover:opacity-100`}
                disabled={true}
              >
                อัพเดต Content
              </button>
            </form>
          </div>
        </div>

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
              className={`bg-[#1EAEF0] rounded-[10px] px-12 py-2 opacity-100 hover:opacity-80 font-bold text-white w-full`}
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

            <form onSubmit={onUpdateRate} className="flex flex-col items-center justify-center">
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
                className={`bg-[#1EAEF0] rounded-[10px] px-12 py-2 opacity-100 hover:opacity-80 font-bold text-white w-full`}
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
      </div>
    </main>
  );
};
export default ShopSettings;
