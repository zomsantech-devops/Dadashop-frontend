import { BasicTable } from "../../components/BasicTable";
import Footer from "../../components/shared/Footer";
import CircularProgress from "@mui/material/CircularProgress";

import { transformData } from "../../data/data";

import { useEffect, useState } from "react";
import { TransformedData } from "../../types";

function CheckQueueD() {
  const [dData, setDData] = useState<TransformedData[] | undefined>(undefined);
  const [readyToSendCount, setReadyToSendCount] = useState(0);
  const [readyToSendNowCount, setReadyToSendowCount] = useState(0);
  const [readyToSendAtCount, setReadyToSendAtCount] = useState(0);

  useEffect(() => {
    const fetchDataAndUseDData = async () => {
      try {
        const { dData } = await transformData();
        const modifiedDData = dData.map((item) => ({
          ...item,
          isAvailable: !item.productName.includes("(ปิดรับเพื่อน)"),
        }));
        setDData(modifiedDData);

        const readyToSendCount = dData?.reduce((sum, item) => {
          return (
            sum +
            item.infos.filter(
              (info) =>
                info.status === "พร้อมส่ง" ||
                info.status === "ส่งได้เวลา"
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
            item.infos.filter((info) => info.status === "ส่งได้เวลา")
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
        <div className="flex flex-col text-center mt-[40px] mb-[25px]">
          <h1 className="font-bold text-[38px] leading-[45px] screen_930:text-4xl screen_445:text-3xl">
            คิวส่ง Gift
          </h1>
          <p className="text-[26px] whitespace-nowrap text-[#524A59] leading-[45px] screen_930:text-2xl screen_445:text-xl">
            Dada D1-D10
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
          {dData ? (
            dData.map((item, index) =>
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
                  {dData[index + 1] && (
                    <BasicTable
                      name={dData[index + 1].productName.replace(
                        " (ปิดรับเพื่อน)",
                        ""
                      )}
                      vBucks={dData[index + 1].vBucks}
                      infos={dData[index + 1].infos}
                      isAvailable={dData[index + 1].isAvailable}
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
