import { Typography } from "@material-tailwind/react";
import { BasicTableProps } from "../types";

const TABLE_HEAD = ["สถานะ", "เวลา", "ชื่อลูกค้า"];

export function BasicTable({
  name,
  vBucks,
  infos,
  isAvailable,
}: BasicTableProps) {
  const getTextColorClass = (vBucks: number) => {
    if (vBucks >= 10000) {
      return "bg-[#0165A4]";
    } else if (vBucks >= 5000) {
      return "bg-[#00AB66]";
    } else {
      return "bg-black";
    }
  };

  return (
    <div className="text-[18px]">
      <div className="flex justify-between">
        <div className="flex items-center justify-center screen_500:flex-col gap-x-1.5">
          <p className="text-3xl font-bold screen_400:text-xl">{name}</p>
          {isAvailable ? (
            ""
          ) : (
            <p className="bg-[#BC1842] text-white px-2 py-1 rounded-xl text-sm screen_500:self-start screen_500:text-base">
              <span className="font-bold">ปิด</span> รับเพื่อน
            </p>
          )}
        </div>

        <div
          className={`flex items-center ${
            isAvailable ? "" : "screen_500:flex-col"
          } gap-x-1.5 my-auto`}
        >
          <p>V-Bucks</p>
          <span
            className={`w-[60px] text-center font-bold text-white px-2 py-1 rounded-xl text-sm screen_500:self-start screen_500:text-base screen_500:w-auto ${getTextColorClass(
              parseInt(vBucks)
            )}`}
          >
            {vBucks}
          </span>
        </div>
      </div>

      <div className="w-[545px] screen_605:max-w-full rounded-[30px] mt-[15px] border border-[rgba(160, 160, 160, 0.50)] overflow-auto whitespace-nowrap">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-[#2E2E2E] text-white px-[20px] py-[15px] "
                  scope="col"
                  style={{
                    maxWidth:
                      index === 0 ? "250px" : index === 1 ? "90px" : "250px",
                  }}
                >
                  <Typography variant="small" className="leading-none" placeholder="">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {infos.map(({ status, time, buyerName }, index) => {
              const newStatus =
                status === "พร้อมส่งวันนี้เวลา" ? "ส่งได้เวลา" : status;

              const isReady = newStatus === "พร้อมส่ง";
              const isReadyAt = newStatus === "ส่งได้เวลา";
              const classes = isReady
                ? "px-4 py-1"
                : isReadyAt
                ? "px-4 py-1"
                : "px-4 py-1";

              const statusClasses = isReady
                ? "text-center py-3 bg-[#00AB66] text-white rounded-2xl"
                : isReadyAt
                ? "text-center py-3 bg-[#90F0C9] text-black rounded-2xl"
                : "text-center py-3 bg-[#000000] text-[#cfcfcf] rounded-2xl";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <Typography
                    placeholder=""
                      variant="small"
                      color="blue-gray"
                      className={` text-[16px] font-normal leading-none w-[115px] ${statusClasses}`}
                    >
                      {status || ""}
                      {/* Providing a default value if status is undefined */}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                    placeholder=""
                      variant="small"
                      color="blue-gray"
                      className="text-[16px] font-normal leading-none"
                    >
                      {time || ""}
                      {/* Providing a default value if time is undefined */}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                    placeholder=""
                      variant="small"
                      color="blue-gray"
                      className="text-[16px] font-normal leading-none"
                    >
                      {buyerName || ""}
                      {/* Providing a default value if buyerName is undefined */}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
