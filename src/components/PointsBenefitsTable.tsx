import { Typography } from "@material-tailwind/react";
import diamond from "../assets/images/Mask-group-diamond.webp";
import unreal from "../assets/images/Mask-group-unreal.webp";
import gold from "../assets/images/Mask-group-gold.webp";

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
                  <Typography variant="small" className="leading-none" placeholder="">
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
                          Gold
                        </p>
                        <img src={gold} alt="gold tier" />
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <p className="absolute ml-[10px] mt-[13px] font-bold text-white">
                          Diamond
                        </p>
                        <img src={diamond} alt="diamond tier" />
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <p className="absolute ml-[10px] mt-[13px] font-bold text-white">
                          Unreal
                        </p>
                        <img src={unreal} alt="unreal tier" />
                      </>
                    )}
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none"
                      placeholder=""
                    >
                      {แต้มสะสม}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-[23px]"
                      placeholder=""
                    >
                      {สิทธิประโยชน์}
                      {/* ERROR: Warning: validateDOMNesting(...): <p> cannot appear as a descendant of <p>. */}
                      {!isFirst && (
                        <>
                          <br />
                          <span className="text-[#1EAEF0] font-bold">
                            *หาก Points ครบแล้ว ถึงจะทราบ Rate*
                          </span>
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
