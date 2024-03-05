import { Button, Typography } from "@material-tailwind/react";
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "./Modal";
import determineTier from "./DetermineTier";

interface UserBalance {
  id: string;
  discord_id: string;
  discord_username: string;
  name: string;
  name_display: string;
  current_points: number;
  total_points: number;
  tier: string;
}

interface MemberTableProps {
  members: UserBalance[] | undefined;
  onSave: (id: string, editedData: UserBalance, index: number) => Promise<void>;
  setEditIndex: Dispatch<SetStateAction<number | null>>;
  editIndex: number | null;
}

const TABLE_HEAD = [
  "เพิ่มเติม",
  "name",
  "tier",
  "discord_username",
  "id",
  "points ปัจจุบัน",
  "points ตลอดชีพ",
];

export default function MemberTable({
  members,
  onSave,
  setEditIndex,
  editIndex,
}: MemberTableProps) {
  const [editedUserData, setEditedUserData] = useState<UserBalance | null>(
    null
  );
  const [addPoints, setAddPoints] = useState<number>(0);

  const handleEdit = (index: number, userData: UserBalance) => {
    setEditIndex(index);
    setEditedUserData(userData);
  };

  const handleEditUserDataChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof UserBalance
  ) => {
    setEditedUserData((prevData) => {
      if (!prevData) {
        return prevData;
      }
      const updatedData = {
        ...prevData,
        [field]: e.target.value,
      };

      if (field === "total_points") {
        updatedData.tier = determineTier(Number(e.target.value));
      }

      return updatedData;
    });
  };

  const handleAddPoints = () => {
    setEditedUserData((prevData) => {
      if (!prevData) {
        return prevData;
      }

      const updatedData = {
        ...prevData,
        current_points: prevData.current_points + addPoints,
        total_points: prevData.total_points + addPoints,
      };

      updatedData.tier = determineTier(updatedData.total_points);

      return updatedData;
    });
    setAddPoints(0);
  };

  const handleSave = async (id: string, editedData: UserBalance) => {
    await onSave(id, editedData, editIndex || 0);
    setEditIndex(null);
    setEditedUserData(null);
  };

  const handleCloseModal = () => {
    setEditIndex(null);
    setEditedUserData(null);
  };

  return (
    <div>
      <div className="w-full rounded-[20px] overflow-auto border border-blue-gray-50">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className=" bg-[#E7F9FD] px-[20px] py-[15px]">
                  <Typography variant="small" className="leading-none" placeholder="">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members &&
              members.map(
                (
                  {
                    id,
                    discord_id,
                    discord_username,
                    name,
                    name_display,
                    current_points,
                    total_points,
                    tier,
                  },
                  index
                ) => {
                  const isLast = index === members.length - 1;
                  const classes = isLast
                    ? "px-[20px] py-[15px]"
                    : "px-[20px] py-[15px] border-b border-blue-gray-50";
                  return (
                    <tr key={id}>
                      <td className={classes} style={{ width: "95px" }}>
                        <Button
                          placeholder=""
                          className="shadow-none bg-[#1EAEF0] text-white rounded-[10px] px-[10px] py-[5px] text-[12px] opacity-80 hover:opacity-100"
                          onClick={() =>
                            handleEdit(index, {
                              id,
                              discord_id,
                              discord_username,
                              name,
                              name_display,
                              current_points,
                              total_points,
                              tier,
                            })
                          }
                        >
                          Edit
                        </Button>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none"
                          placeholder=""
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none"
                          placeholder=""
                        >
                          {tier}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none"
                          placeholder=""
                        >
                          {discord_username}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none"
                          placeholder=""
                        >
                          {id}
                        </Typography>
                      </td>
                      <td className={classes} style={{ width: "145px" }}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none"
                          placeholder=""
                        >
                          {current_points}
                        </Typography>
                      </td>
                      <td className={classes} style={{ width: "160px" }}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none"
                          placeholder=""
                        >
                          {total_points}
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </div>
      <Modal open={!!editedUserData} onClose={handleCloseModal}>
        {editedUserData && (
          <div className="flex flex-col w-[600px] screen_810:w-[350px] screen_500:w-[250px]">
            <p className="font-bold text-[24px] mb-[10px]">Edit User</p>
            <label className="mb-[3px] font-bold">ID</label>
            <input
              type="text"
              className=" bg-[#E7F9FD] mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-none outline-none"
              readOnly
              value={editedUserData.id}
            />
            <label className="mb-[3px] font-bold">Discord id</label>
            <input
              type="text"
              className="border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
              value={editedUserData.discord_id}
              onChange={(e) => handleEditUserDataChange(e, "discord_id")}
            />
            <label className="mb-[3px] font-bold">Discord username</label>
            <input
              type="text"
              className="border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
              value={editedUserData.discord_username}
              onChange={(e) => handleEditUserDataChange(e, "discord_username")}
            />
            <label className="mb-[3px] font-bold">Name</label>
            <input
              type="text"
              className="border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
              value={editedUserData.name}
              onChange={(e) => handleEditUserDataChange(e, "name")}
            />
            <label className="mb-[3px] font-bold flex">Name Display</label>
            <input
              type="text"
              className="border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
              value={editedUserData.name_display}
              onChange={(e) => handleEditUserDataChange(e, "name_display")}
            />
            <label className="mb-[3px] font-bold">Current Points</label>
            <div className="flex gap-[5px]">
              <input
                type="number"
                className="w-[110px] border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
                value={editedUserData.current_points}
                onChange={(e) => handleEditUserDataChange(e, "current_points")}
              />
              {/* <---added point---> */}
              <input
                type="number"
                className="w-[95px] border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
                value={addPoints > 0 ? addPoints : ""}
                placeholder="เพิ่มแต้ม"
                onChange={(e) => setAddPoints(Number(e.target.value))}
              />
              {/* <------> */}
              <button
                className="h-fit mt-[7px] ml-[3px] font-bold text-[#1EAEF0] opacity-80 hover:opacity-100"
                onClick={handleAddPoints}
              >
                เพิ่ม
              </button>
            </div>

            <label className="mb-[3px] font-bold">Total Points</label>
            <input
              type="number"
              className="border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
              value={editedUserData.total_points}
              onChange={(e) => handleEditUserDataChange(e, "total_points")}
            />
            <label className="mb-[3px] font-bold">Tier</label>
            <input
              type="text"
              className="bg-[#E7F9FD] mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-none outline-none"
              readOnly
              value={editedUserData.tier}
            />
            <button
              onClick={() => handleSave(editedUserData.id, editedUserData)}
              className="font-bold text-[#1EAEF0] opacity-80 hover:opacity-100 w-fit mx-auto"
            >
              บันทึก
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
