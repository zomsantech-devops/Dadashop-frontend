import Footer from "../components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import vBucks from "../images/vbucks-coins.png";

interface Item {
  _id: string;
  id: string;
  type_id: string;
  type_name: string;
  name: string;
  description: string;
  rarity_id: string;
  images_background: string;
  images_full_background: string;
  finalPrice: number | null;
  time_fetch: string;
  time_update: string;
  uid_update: string;
  __v: number;
}

interface ResponseData {
  success: boolean;
  message: Item[];
}

function ItemShop() {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ResponseData>(
          "https://dadashop-backend.vercel.app/api/v1/item/"
        );
        setData(response.data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div>
      <div className="flex flex-col justify-center px-[30px]">
        <p className="text-center text-5xl font-bold leading-normal my-[40px]">
          รายการไอเทม
        </p>
        <div className="flex flex-col self-center gap-[20px] screen_960:gap-[40px] screen_500:w-full">
          <h1>Items:</h1>
          <ul className="grid grid-cols-6 lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-1 gap-4">
            {data.map((item) => (
              <li key={item._id} className="cursor-pointer">
                <div className="relative group overflow-hidden rounded-lg">
                  <img
                    loading="lazy"
                    src={item.images_background}
                    alt={item.name}
                    className="w-[187px] rounded-lg transition ease-in-out duration-300 group-hover:scale-110 group-hover:brightness-105 overflow-hidden"
                  />
                  <div className="absolute bottom-0 item-title-shadow text-white p-2 pt-4 fn-font tracking-wider text-2xl uppercase antialiased leading-6 card-bg w-full rounded-lg">
                    <h3 className="pb-1.5 pt-2">{item.name}</h3>
                    <div className="flex">
                      <img
                        src={vBucks}
                        alt="V-Bucks"
                        className="w-5 h-5 mr-2"
                      />
                      <p>{item.finalPrice || "-"}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ItemShop;
