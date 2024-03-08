import axios from "axios";
import { useEffect, useState } from "react";
import MemberTable from "../../components/MemberTable";
import Modal from "../../components/Modal";
import determineTier from "../../components/DetermineTier";
import LeftSidebar from "../../components/shared/LeftSidebar";
import { UserBalance } from "../../types";
import { toast } from "react-toastify";

function Admin() {
  const [searchValue, setSearchValue] = useState("");
  const [userBalance, setUserBalance] = useState<UserBalance[] | undefined>(
    undefined
  );
  const [notFound, setNotFound] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newUserData, setNewUserData] = useState({
    id: "",
    discord_id: "",
    discord_username: "",
    name: "",
    name_display: "Anonymous#",
    current_points: 0,
    total_points: 0,
    tier: "Gold",
  });
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [isToggleChecked, setIsToggleChecked] = useState(false);

  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        let response;
        if (searchValue.length > 0) {
          response = await axios.get(
            `${process.env.REACT_APP_API}/user-balance/${searchValue}`
          );
          setUserBalance([response.data]);
        } else {
          response = await axios.get(
            `${process.env.REACT_APP_API}/user-balance`
          );
          setUserBalance(response.data);
        }
        setNotFound(false);
      } catch (error) {
        setNotFound(true);
        console.error(error);
      }
    };
    fetchUserBalance();
  }, [searchValue]);

  const handleSave = async (
    id: string,
    editedData: UserBalance,
    index: number
  ) => {
    try {
      if (!userBalance) {
        console.error("userBalance is undefined");
        return;
      }

      const updatedUserBalance = [...userBalance];
      updatedUserBalance[index] = {
        ...updatedUserBalance[index],
        ...editedData,
      };
      setUserBalance(updatedUserBalance);

      const rawToken: string | null = localStorage.getItem("token");
      if (rawToken) {
        const token = rawToken.replace(/"/g, "");
        await axios.post(
          `${process.env.REACT_APP_API}/user-balance/${id}`,
          {
            ...editedData,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        toast.warn("Unauthorization");
      }
      toast.success("Update user complete");
    } catch (error) {
      toast.error("Failed to update user");
      console.error(error);
    }
  };

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newCurrentPoints = newUserData.current_points;
    let newTotalPoints =
      newUserData.total_points >= 0 ? newUserData.total_points : 0;

    if (e.target.name === "current_points") {
      newCurrentPoints = parseInt(e.target.value, 10);
      newTotalPoints = newCurrentPoints;
    } else if (e.target.name === "total_points") {
      newTotalPoints = parseInt(e.target.value, 10);
    } else {
      setNewUserData({
        ...newUserData,
        [e.target.name]: e.target.value,
      });
      return;
    }

    const newTier = determineTier(newTotalPoints);

    setNewUserData({
      ...newUserData,
      current_points: newCurrentPoints,
      total_points: newTotalPoints,
      tier: newTier,
    });
  };

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setUserBalance((prevUserBalance) => {
        const newUserBalance = prevUserBalance
          ? [...prevUserBalance, newUserData]
          : [newUserData];
        const updatedUserBalance = newUserBalance.map((user, index) => ({
          ...user,
          id: String(index + 1),
        }));
        return updatedUserBalance;
      });

      const rawToken: string | null = localStorage.getItem("token");

      if (rawToken) {
        const token = rawToken.replace(/"/g, "");
        await axios.post(
          `${process.env.REACT_APP_API}/user-balance`,
          {
            id: (userBalance?.length ?? 0) + 1,
            discord_id: newUserData.discord_id,
            discord_username: newUserData.discord_username,
            name: newUserData.name,
            name_display: newUserData.name_display,
            current_points: newUserData.current_points,
            total_points: newUserData.total_points,
            tier: newUserData.tier,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setAddUserOpen(false);
        setNewUserData({
          id: "",
          discord_id: "",
          discord_username: "",
          name: "",
          name_display: "Anonymous#",
          current_points: 0,
          total_points: 0,
          tier: "Gold",
        });
      } else {
        toast.error("Unauthorization")
      }
      toast.success("Add user complete")
    } catch (error) {
      toast.error("Failed to add user")
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setEditIndex(null);
    setNewUserData({
      id: "",
      discord_id: "",
      discord_username: "",
      name: "",
      name_display: "Anonymous#",
      current_points: 0,
      total_points: 0,
      tier: "Gold",
    });
    setAddUserOpen(false);
  };

  const handleToggleChange = () => {
    setIsToggleChecked(!isToggleChecked);

    setNewUserData((prevUserData) => ({
      ...prevUserData,
      name_display: isToggleChecked ? `Anonymous#` : prevUserData.name,
    }));
  };

  return (
    <main className="">
      <LeftSidebar />
      <div className="flex flex-col justify-center px-[30px] w-[910px] my-6 screen_910:w-full mx-auto relative">
        <div className="text-center text-5xl font-bold my-10 leading-[58px]">
          Member ทั้งหมด
        </div>
        <form>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative text-[#28283C]">
            <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm border border-gray-300 rounded-[30px] focus:border-[#1EAEF0] outline-[#02A7F3]"
              placeholder="โปรดระบุหมายเลข Member หรือชื่อ Member ของคุณ"
              required
              autoComplete="off"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </form>
        {notFound && (
          <p className="mt-[10px] text-red-600">ไม่พบหมายเลขหรือชื่อสมาชิก</p>
        )}
        <button
          onClick={() => {
            setAddUserOpen(!addUserOpen);
          }}
          className="bg-[#1EAEF0] rounded-[10px] px-[10px] py-[5px] opacity-80 hover:opacity-100 w-fit mt-[20px] font-bold text-white"
        >
          เพิ่มสมาชิก
        </button>
        <Modal open={!!addUserOpen} onClose={handleCloseModal}>
          {newUserData && (
            <div className="flex flex-col w-[600px] screen_810:w-[350px] screen_500:w-[250px]">
              <p className="font-bold text-[24px] mb-[10px]">เพิ่มสมาชิก</p>
              <form onSubmit={handleAddUser} className="flex flex-col">
                <label className="mb-[3px] font-bold">ID:</label>
                <input
                  type="text"
                  value={(userBalance?.length ?? 0) + 1}
                  readOnly
                  className=" bg-[#E7F9FD] mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-none outline-none"
                />
                <label className="mb-[3px] font-bold">Discord id:</label>
                <input
                  type="text"
                  name="discord_id"
                  value={newUserData.discord_id}
                  autoComplete="off"
                  onChange={handleNewUserChange}
                  className="border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
                />
                <label className="mb-[3px] font-bold">Discord username:</label>
                <input
                  type="text"
                  name="discord_username"
                  value={newUserData.discord_username}
                  autoComplete="off"
                  onChange={handleNewUserChange}
                  className="border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
                />
                <label className="mb-[3px] font-bold">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newUserData.name}
                  autoComplete="off"
                  onChange={handleNewUserChange}
                  className="border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
                />
                <label className="mb-[3px] font-bold flex">
                  Name Display:
                  <label className="relative inline-flex items-center cursor-pointer ml-auto h-fit my-auto">
                    <input
                      type="checkbox"
                      checked={isToggleChecked}
                      onChange={handleToggleChange}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </label>
                <input
                  type="text"
                  name="name_display"
                  value={newUserData.name_display}
                  autoComplete="off"
                  onChange={handleNewUserChange}
                  className="border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
                />
                <label className="mb-[3px] font-bold">Current Points:</label>
                <input
                  type="number"
                  name="current_points"
                  value={newUserData.current_points}
                  onChange={handleNewUserChange}
                  className="border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
                />
                <label className="mb-[3px] font-bold">Total Points:</label>
                <input
                  type="number"
                  name="total_points"
                  value={newUserData.total_points}
                  onChange={handleNewUserChange}
                  className="border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
                />
                <label className="mb-[3px] font-bold">Tier:</label>
                <input
                  type="text"
                  value={newUserData.tier}
                  readOnly
                  className=" bg-[#E7F9FD] mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-none outline-none"
                />
                <button
                  type="submit"
                  className="font-bold text-[#1EAEF0] opacity-80 hover:opacity-100 w-fit mx-auto"
                >
                  เพิ่มสมาชิก
                </button>
              </form>
            </div>
          )}
        </Modal>
        <div className={`mt-[20px]`}>
          <MemberTable
            members={userBalance}
            onSave={handleSave}
            setEditIndex={setEditIndex}
            editIndex={editIndex}
          />
        </div>
      </div>
    </main>
  );
}

export default Admin;
