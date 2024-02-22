import { BasicTable } from "../../components/BasicTable";
import Footer from "../../components/shared/Footer";
import CircularProgress from "@mui/material/CircularProgress";

import { transformData } from "../../data/data";

import { useEffect, useState } from "react";
import { TransformedData } from "../../types";

function CheckQueueZZ() {
  const [zzData, setZZData] = useState<TransformedData[] | undefined>(
    undefined
  );
  const [readyToSendCount, setReadyToSendCount] = useState(0);
  const [readyToSendNowCount, setReadyToSendowCount] = useState(0);
  const [readyToSendAtCount, setReadyToSendAtCount] = useState(0);

  useEffect(() => {
    const fetchDataAndUseZZData = async () => {
      try {
        const { zzData } = await transformData();
        const modifiedZZData = zzData.map((item) => ({
          ...item,
          isAvailable: !item.productName.includes("(ปิดรับเพื่อน)"),
        }));
        setZZData(modifiedZZData);

        const readyToSendCount = zzData?.reduce((sum, item) => {
          return (
            sum +
            item.infos.filter(
              (info) =>
                info.status === "พร้อมส่ง" ||
                info.status === "พร้อมส่งวันนี้เวลา"
            ).length
          );
        }, 0);
        const readyToSendNowCount = zzData?.reduce((sum, item) => {
          return (
            sum + item.infos.filter((info) => info.status === "พร้อมส่ง").length
          );
        }, 0);
        const readyToSendAtCount = zzData?.reduce((sum, item) => {
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
    fetchDataAndUseZZData();
    const intervalId = setInterval(fetchDataAndUseZZData, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center px-[30px]">
        <div className="flex flex-col text-center mt-[40px] mb-[25px]">
          <h1 className="font-bold text-4xl screen_930:text-3xl screen_445:text-2xl">
            คิวส่ง Gift
          </h1>
          <p className="text-2xl whitespace-nowrap text-[#524A59] leading-[65px] screen_930:text-xl screen_445:text-lg">
            Dada ZZ1-ZZ6
          </p>
          <div className="w-full flex flex-col items-center text-white mt-3 text-2xl screen_445:text-xl">
            {/* HIDDEN */}
            <p className="hidden">{readyToSendCount}</p>
            <div className="flex flex-col justify-center w-[300px] screen_930:w-[250px] screen_445:w-[200px] gap-1.5">
              <div className="flex-grow rounded-[32px] py-2 px-16 bg-[#00AB66] screen_930:px-10 screen_445:px-8">
                <p className="text-[20px] leading-[40px] screen_930:text-[17px] screen_445:text-[15px] ">
                  พร้อมส่งทันที{" "}
                  <span className="text-white font-bold">
                    {readyToSendNowCount}
                  </span>
                </p>
              </div>
              <div className="flex-grow rounded-[32px] py-2 px-16 bg-[#90F0C9] text-black screen_930:px-10 screen_445:px-8">
                <p className="text-[20px] leading-[40px] screen_930:text-[17px] screen_445:text-[15px]">
                  ส่งได้ตามเวลา{" "}
                  <span className="font-bold">{readyToSendAtCount}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col screen_605:w-full gap-[20px] w-min self-center items-center mt-2">
          {zzData ? (
            zzData.map((item, index) =>
              index % 2 === 0 ? (
                <div
                  key={index}
                  className="flex screen_1170:flex-col screen_605:w-full gap-[20px]"
                >
                  <BasicTable
                    name={item.productName.replace(" (ปิดรับเพื่อน)", "")}
                    vBucks={item.vBucks}
                    infos={item.infos}
                    isAvailable={item.isAvailable}
                  />
                  {zzData[index + 1] && (
                    <BasicTable
                      name={zzData[index + 1].productName.replace(
                        " (ปิดรับเพื่อน)",
                        ""
                      )}
                      vBucks={zzData[index + 1].vBucks}
                      infos={zzData[index + 1].infos}
                      isAvailable={zzData[index + 1].isAvailable}
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

export default CheckQueueZZ;
