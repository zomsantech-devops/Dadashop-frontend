import { BasicTable } from "../../components/BasicTable";
import Footer from "../../components/shared/Footer";
import { useEffect, useState } from "react";
import { transformData } from "../../data/data";
import CircularProgress from "@mui/material/CircularProgress";
import { TransformedData } from "../../types";

function CheckQueueG() {
  const [gData, setGData] = useState<TransformedData[] | undefined>(undefined);
  const [readyToSendCount, setReadyToSendCount] = useState(0);
  const [readyToSendNowCount, setReadyToSendNowCount] = useState(0);
  const [readyToSendAtCount, setReadyToSendAtCount] = useState(0);

  useEffect(() => {
    const fetchDataAndUseDData = async () => {
      try {
        const { gData } = await transformData();
        const modifiedGData = gData.map((item) => ({
          ...item,
          isAvailable: !item.productName.includes("(ปิดรับเพื่อน)"),
        }));
        setGData(modifiedGData);

        const readyToSendCount = gData?.reduce((sum, item) => {
          return (
            sum +
            item.infos.filter(
              (info) =>
                info.status === "พร้อมส่ง" ||
                info.status === "พร้อมส่งวันนี้เวลา"
            ).length
          );
        }, 0);
        const readyToSendNowCount = gData?.reduce((sum, item) => {
          return (
            sum + item.infos.filter((info) => info.status === "พร้อมส่ง").length
          );
        }, 0);
        const readyToSendAtCount = gData?.reduce((sum, item) => {
          return (
            sum +
            item.infos.filter((info) => info.status === "พร้อมส่งวันนี้เวลา")
              .length
          );
        }, 0);
        setReadyToSendCount(readyToSendCount || 0);
        setReadyToSendNowCount(readyToSendNowCount || 0);
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
          <h1 className="font-bold text-5xl screen_445:text-[40px]">
            คิวส่ง Gift
          </h1>
          <p className="text-[38px] whitespace-nowrap text-[#524A59] leading-[65px] screen_930:text-4xl screen_445:text-3xl">
            Dada G1-G8
          </p>
          <div className="w-full flex flex-col items-center text-white mt-3 text-2xl screen_445:text-xl">
            {/* HIDDEN */}
            <p className="hidden">{readyToSendCount}</p>
            <div className="flex flex-col justify-center w-[350px] screen_445:w-[300px] gap-1.5">
              <div className="flex-grow rounded-[32px] py-3 px-16 bg-[#BC1842]">
                <div className="font-semibold">
                  <span className="font-bold text-[28px]">ปิด</span>{" "}
                  รับคำขอเพื่อน
                </div>
                <p className="text-sm text-gray-200/80 screen_445:text-xs">
                  เนื่องจากรายชื่อเพื่อนเต็ม
                </p>
              </div>
              <div className="flex-grow rounded-[32px] py-3 px-16 bg-[#00AB66]">
                <p className="text-[24px] leading-[44px]">
                  พร้อมส่งทันที{" "}
                  <span className="text-white font-bold">
                    {readyToSendNowCount}
                  </span>
                </p>
              </div>
              <div className="flex-grow rounded-[32px] py-3 px-16 bg-[#90F0C9] text-black">
                <p className="text-[24px] leading-[44px]">
                  ส่งได้ตามเวลา{" "}
                  <span className="font-bold">{readyToSendAtCount}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col screen_605:w-full gap-[20px] w-min self-center items-center mt-2">
          {gData ? (
            gData.map((item, index) =>
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
                  {gData[index + 1] && (
                    <BasicTable
                      name={gData[index + 1].productName.replace(
                        " (ปิดรับเพื่อน)",
                        ""
                      )}
                      vBucks={gData[index + 1].vBucks}
                      infos={gData[index + 1].infos}
                      isAvailable={gData[index + 1].isAvailable}
                    />
                  )}
                </div>
              ) : null
            )
          ) : (
            <CircularProgress />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CheckQueueG;
