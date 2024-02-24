import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface ShopHistoryProps {
  shopHistory: string[] | null;
}

export const ItemHistory = ({ shopHistory }: ShopHistoryProps) => {
  const [showTable, setShowTable] = useState(false);

  if (shopHistory === null) {
    return <div>No shop history available.</div>;
  }

  const calculateDaysAgo = (date: string) => {
    const now = new Date();
    const shopDate = new Date(date);
    const differenceInTime = now.getTime() - shopDate.getTime();
    return Math.floor(differenceInTime / (1000 * 3600 * 24));
  };

  const sortedShopHistory = shopHistory.sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );
  const firstTenShopHistory = sortedShopHistory.slice(0, 10);

  return (
    <div>
      <div
        className="font-bold cursor-pointer"
        onClick={() => setShowTable(!showTable)}
      >
        <span className="text-black/80">Shop History:</span>{" "}
        <span className="text-xl">{shopHistory.length}</span>{" "}
        <FaChevronDown
          className={`inline-block w-3 ${
            showTable && "rotate-180"
          } text-[#3D82D1] transition ease-in-out duration-300`}
        />
      </div>
      <div
        className={`mt-2 transition-all duration-300 ease-in-out ${
          showTable ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ overflow: "hidden" }}
      >
        <table className="w-full">
          <thead>
            <tr>
              <th align="right" className="pr-4">
                วันที่
              </th>
              <th align="left">ล่าสุด</th>
            </tr>
          </thead>
          <tbody>
            {firstTenShopHistory.map((date, index) => (
              <tr key={index}>
                <td align="right" className="pr-4">
                  {new Date(date).toLocaleDateString("th-TH", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td align="left">
                  {calculateDaysAgo(date) === 0
                    ? "วันนี้"
                    : calculateDaysAgo(date) === 1
                    ? "เมื่อวาน"
                    : calculateDaysAgo(date) + " วันที่แล้ว"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
