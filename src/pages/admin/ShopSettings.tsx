import LeftSidebar from "../../components/shared/LeftSidebar";
import check from "../../assets/icons/checkAdmin.svg";
import busy from "../../assets/icons/busyAdmin.svg";
import close from "../../assets/icons/closeAdmin.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ShopSettings = () => {
  const [status, setStatus] = useState<string>("");
  const [openTime, setOpenTime] = useState<string>("");
  const [closeTime, setCloseTime] = useState<string>("");
  const [newOpenTime, setNewOpenTime] = useState<string>("");
  const [newCloseTime, setNewCloseTime] = useState<string>("");

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

  useEffect(() => {
    const rawToken: string | null = localStorage.getItem("token");
    const getAuthenticated = async () => {
      try {
        if (rawToken) {
          const token = rawToken.replace(/"/g, "");
          await axios.get(`${process.env.REACT_APP_API}/auth/protected`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          console.error("Token not found in localStorage");
          navigate("/login");
        }
      } catch (error: any) {
        console.error("Authentication failed", error.response?.data);
        navigate("/login");
      }
    };

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

    getAuthenticated();
    getTime();
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

  return (
    <main className="flex flex-row">
      <LeftSidebar />
      <div className="flex flex-col items-center justify-center gap-4 px-6 w-[910px] my-6 mb-10 screen_910:w-full mx-auto relative">
        <div className="text-center text-5xl font-bold mt-10 mb-6 leading-[58px]">
          Update Shop Status
        </div>
        <div className="font-bold text-center">
          Click to change shop status{" "}
          <span className={`${getTextColorClass(status)}`}>[{status}]</span>
        </div>
        <div className="flex items-center justify-center gap-4 screen_605:flex-col">
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

        <div className="font-bold text-center">Set open - close time</div>
        <form onSubmit={onSubmitHandle}>
          <div className="flex gap-4 mb-4">
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
    </main>
  );
};
export default ShopSettings;
