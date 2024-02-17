import { BasicTable } from "../../components/BasicTable";
import Footer from "../../components/shared/Footer";
import CircularProgress from "@mui/material/CircularProgress";

import { TransformedData, transformData } from "../../data/data";

import { useEffect, useState } from "react";

function CheckQueueD() {
  const [dData, setDData] = useState<TransformedData[] | undefined>(undefined);
  const [readyToSendCount, setReadyToSendCount] = useState(0);
  const [readyToSendNowCount, setReadyToSendowCount] = useState(0);
  const [readyToSendAtCount, setReadyToSendAtCount] = useState(0);

  useEffect(() => {
    const fetchDataAndUseDData = async () => {
      try {
        const { dData } = await transformData();
        setDData(dData);

        const readyToSendCount = dData?.reduce((sum, item) => {
          return (
            sum +
            item.infos.filter(
              (info) =>
                info.status === "พร้อมส่ง" ||
                info.status === "พร้อมส่งวันนี้เวลา"
            ).length
          );
        }, 0);
        const readyToSendNowCount = dData?.reduce((sum, item) => {
          return (
            sum + item.infos.filter((info) => info.status === "พร้อมส่ง").length
          );
        }, 0);
        const readyToSendAtCount = dData?.reduce((sum, item) => {
          return (
            sum +
            item.infos.filter((info) => info.status === "พร้อมส่งวันนี้เวลา")
              .length
          );
        }, 0);
        setReadyToSendCount(readyToSendCount || 0);
        setReadyToSendowCount(readyToSendNowCount || 0);
        setReadyToSendAtCount(readyToSendAtCount || 0);
      } catch (error) {
        console.error("Error fetching and using data:", error);
      }
    };
    fetchDataAndUseDData();
    const intervalId = setInterval(fetchDataAndUseDData, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center px-[30px]">
        <p className="text-center text-4xl font-bold mt-[40px] mb-[25px] leading-[58px] screen_930:text-3xl screen_445:text-2xl">
          คิวส่ง Gift
          <br />
          <span className="text-5xl whitespace-nowrap text-[#1EAEF0] leading-[65px] screen_930:text-4xl screen_445:text-3xl">
            Dada D1-D10
          </span>
          <br />
        </p>
        <div className="flex flex-col gap-[20px] screen_605:w-full self-center items-center">
          <div className="w-full mx-auto text-center  mb-[15px] bg-[#E7F9FD] py-[20px] rounded-[30px] min-w-[300px]">
            <p className="text-[36px]  screen_400:text-3xl font-bold">
              คิวว่าง <span>{readyToSendCount}</span> ชิ้น
            </p>
            <p className="text-[24px] leading-[44px]  ">
              พร้อมส่งทันที{" "}
              <span className="text-green-600">{readyToSendNowCount}</span> ชิ้น
            </p>
            <p className="text-[24px] leading-[44px]  ">
              ส่งได้ตามเวลา{" "}
              <span className="text-yellow-600">{readyToSendAtCount}</span> ชิ้น
            </p>
          </div>
          {dData ? (
            dData.map((item, index) =>
              index % 2 === 0 ? (
                <div
                  key={index}
                  className="flex screen_1170:flex-col screen_605:w-full gap-[20px]"
                >
                  <BasicTable
                    name={item.productName}
                    vBucks={item.vBucks}
                    infos={item.infos}
                  />
                  {dData[index + 1] && (
                    <BasicTable
                      name={dData[index + 1].productName}
                      vBucks={dData[index + 1].vBucks}
                      infos={dData[index + 1].infos}
                    />
                  )}
                </div>
              ) : null
            )
          ) : (
            <CircularProgress className="self-center" />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CheckQueueD;
