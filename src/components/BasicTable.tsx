import { Typography } from "@material-tailwind/react";
 
const TABLE_HEAD = ["สถานะ", "เวลา", "ชื่อลูกค้า"];

interface BasicTableProps {
    name: string,
    vBucks: string,
    infos: {
      status: string,
      time: string,
      buyerName: string,
    }[]
}
 
export function BasicTable({name,vBucks, infos}: BasicTableProps) {
  const getTextColorClass = (vBucks: number) => {
    if (vBucks > 10000) {
      return 'text-[#1EAEF0]';
    } else if (vBucks > 5000) {
      return 'text-[#8DD71C]';
    } else {
      return 'text-red-600';
    }
  };

  const getBorderColorClass = (vBucks: number) => {
    if (vBucks > 10000) {
      return 'border-[#1EAEF0]';
    } else if (vBucks > 5000) {
      return 'border-[#8DD71C]';
    } else {
      return 'border-red-600';
    }
  };
  
  return (
    <div className="">
      <div className="flex">
        <p className="text-[24px] font-bold">{name}</p>
        <p className={`ml-auto self-end border my-auto ${getBorderColorClass(parseInt(vBucks))} px-[15px] py-[5px] rounded-[20px] screen_420:text-[12px]`}>V-Bucks คงเหลือ <span className={`font-bold ${getTextColorClass(parseInt(vBucks))}`}>{vBucks}</span></p>
      </div>
        
      <div className=" w-[545px] screen_605:max-w-full rounded-[30px] mt-[15px] border border-[rgba(160, 160, 160, 0.50)] overflow-auto whitespace-nowrap">
        <table className="w-full min-w-max table-auto text-left">
                <thead>
                <tr>
                    {TABLE_HEAD.map((head, index) => (
                    <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-[#E7F9FD]  px-[20px] py-[15px] "
                        scope="col"
                        style={{ maxWidth: index === 0 ? '250px' : index === 1 ? '90px' : '250px'}}
                    >
                        <Typography
                        variant="small"
                        className="leading-none"
                        >
                        {head}
                        </Typography>
                    </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {infos.map(({ status, time, buyerName }, index) => {
                    const isReady = status === 'พร้อมส่ง'; 
                    const isReadyAt = status === 'พร้อมส่งวันนี้เวลา'; 
                    const classes =  isReady ? "px-[20px] py-[15px] bg-[#CFE8A940]": isReadyAt ? "px-[20px] py-[15px] bg-[#FFF7BC40]" : "px-[20px] py-[15px] border-b border-blue-gray-50 bg-[#F9DCDD]";

                    return (
                    <tr key={index}>
                        <td className={classes}>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none "
                        >
                            {status}
                        </Typography>
                        </td>
                        <td className={classes}>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none "
                        >
                            {time}
                        </Typography>
                        </td>
                        <td className={classes}>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none "
                        >
                            {buyerName}
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