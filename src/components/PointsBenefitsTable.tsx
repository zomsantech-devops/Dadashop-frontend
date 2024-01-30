import { Typography } from "@material-tailwind/react";
import rare from "../images/Mask group (4).png";
import epic from "../images/Mask group (1).png";
import mythic from "../images/Mask group (2).png";

const TABLE_HEAD = ["ระดับ", "แต้มสะสม", "สิทธิประโยชน์"];

const TABLE_ROWS = [
  {
    ระดับ: "John Michael",
    แต้มสะสม: "1-299 Dada Points",
    สิทธิประโยชน์: "-",
  },
  {
    ระดับ: "Alexa Liras",
    แต้มสะสม: "300-2999 Dada Points",
    สิทธิประโยชน์: "เติม Fortnite Rate พิเศษ (Rate ใน Server Discord)",
  },
  {
    ระดับ: "Laurent Perrier",
    แต้มสะสม: "3000+ Dada Points",
    สิทธิประโยชน์: "เติม Fortnite Rate พิเศษมว้ากกก (Rate ใน Server Discord)",
  },
];

export function PointsBenefitsTable() {
  return (
    <div className="p-[15px]">
      <p className="text-[24px] font-bold">Tier ของสมาชิก</p>
      <div className="w-full rounded-[10px] mt-[15px] overflow-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className=" bg-[#E7F9FD]  px-[20px] py-[15px]">
                  <Typography variant="small" className="leading-none">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ ระดับ, แต้มสะสม, สิทธิประโยชน์ }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const isFirst = index === 0;
              const classes = isLast
                ? "px-[10px] h-[77px] relative"
                : "h-[77px] px-[10px] border-b border-blue-gray-50 relative";

              return (
                <tr key={ระดับ}>
                  <td className={classes}>
                    {index === 0 && (
                      <>
                        <p className="absolute ml-[10px] mt-[13px] font-bold text-white">
                          RARE
                        </p>
                        <img src={rare} alt="" />
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <p className="absolute ml-[10px] mt-[13px] font-bold text-white">
                          EPIC
                        </p>
                        <img src={epic} alt="" />
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <p className="absolute ml-[10px] mt-[13px] font-bold text-white">
                          MYTHIC
                        </p>
                        <img src={mythic} alt="" />
                      </>
                    )}
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none "
                    >
                      {แต้มสะสม}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-[23px] "
                    >
                      {สิทธิประโยชน์}
                      {/* ERROR: Warning: validateDOMNesting(...): <p> cannot appear as a descendant of <p>. */}
                      {!isFirst && (
                        <>
                          <br />
                          <p className="text-[#1EAEF0] font-bold">
                            *หาก Points ครบแล้ว ถึงจะทราบ Rate*
                          </p>
                        </>
                      )}
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