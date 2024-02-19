import LeftSidebar from "../../components/shared/LeftSidebar";
import check from "../../assets/icons/checkAdmin.svg";
import busy from "../../assets/icons/busyAdmin.svg";
import close from "../../assets/icons/closeAdmin.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShopSettings = () => {
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [openTime, setOpenTime] = useState<string>("");
  const [closeTime, setCloseTime] = useState<string>("");

  const navigate = useNavigate();

  const handleOpenTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenTime(event.target.value);
  };

  const handleCloseTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCloseTime(event.target.value);
  };

  // TODO: Toast
  const onSubmitHandle = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API}/setting/time`, {
        open_time: openTime,
        close_time: closeTime,
      });
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to update times", error);
      setIsLoading(false);
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
    setIsLoading(true);
    try {
      await axios.get(
        `${process.env.REACT_APP_API}/setting/time/toggle/${status}`
      );
      setIsLoading(false);
      window.location.reload();
    } catch (error: any) {
      console.error("Update status failed", error.response);
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-row">
      <LeftSidebar />
      <div className="flex flex-col items-center justify-center gap-4 w-[910px] my-6 screen_910:w-full mx-auto relative pb-[50px] screen_1070:pl-20 screen_500:pb-0 screen_500:pr-4">
        <div className="font-bold text-center">
          Click to change shop status <span className="">[{status}]</span>
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
                value={openTime}
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
                value={closeTime}
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
