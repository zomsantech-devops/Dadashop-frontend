import axios from "axios";

export const cardData = [
  {
    image: `${process.env.REACT_APP_API}/image/banner-1`,
    title: "ส่ง Gift",
    list: [
      {
        content: "สั่ง Item หรือ Battle Pass ชุดเริ่มต้น",
        color: "bg-[#ba6eea]",
      },
      {
        content: "ไม่ใช่การส่ง V-Bucks (ลูกค้าจะได้รับเป็น Item)",
        color: "bg-[#ba6eea]",
      },
      {
        content: "ต้องเป็นเพื่อนกันในเกม อย่างน้อย 48 ชั่วโมง",
        color: "bg-[#ba6eea]",
      },
    ],
    button: {
      name: "ขั้นตอนการสั่งซื้อ Gift",
      link: "/price-fortnite/how-to-gift",
      color: {
        from: "from-[#BA6EEA]",
        via: "via-[#A5B7E1]",
        to: "to-[#3ABFCD]",
      },
    },
  },
  {
    image: `${process.env.REACT_APP_API}/image/banner-2`,
    title: "เติม V-Bucks, Packs, Fortnite Crew",
    list: [
      {
        content: "ลูกค้าต้องนำ ID Epic มาผูกกับ ID XBOX ของลูกค้าเอง",
        color: "bg-[#abd499]",
      },
      {
        content: "ไม่ต้องรอ 48 ชั่วโมง",
        color: "bg-[#abd499]",
      },
      {
        content: "ได้ทันทีภายใน 10 ถึง 20 นาที",
        color: "bg-[#abd499]",
      },
    ],
    button: {
      name: "ขั้นตอนการสั่งซื้อผ่าน XBOX",
      link: "/price-fortnite/how-to-else",
      color: {
        from: "from-[#BBB251]",
        via: "via-[#ABD499]",
        to: "to-[#2FD491]",
      },
    },
  },
  {
    image: `${process.env.REACT_APP_API}/image/banner-2`,
    title: "Title",
    list: [
      {
        content: "Bullet 1",
        color: "bg-[#EF4444]",
      },
      {
        content: "Bullet 2",
        color: "bg-[#EF4444]",
      },
      {
        content: "Bullet 3",
        color: "bg-[#EF4444]",
      },
    ],
    button: {
      name: "Button",
      link: "/price-fortnite",
      color: {
        from: "from-[#EF4444]",
        via: "via-[#F59E0B]",
        to: "to-[#EAB308]",
      },
    },
  },
];

interface APIResponse {
  values: any[][];
}

interface ProductInfo {
  status: string;
  time: string;
  buyerName: string;
}

export interface TransformedData {
  productName: string;
  vBucks: string;
  infos: ProductInfo[];
}

interface TransformResult {
  data: TransformedData[];
  dData: TransformedData[];
  gData: TransformedData[];
  zzData: TransformedData[];
}

const API_KEY = process.env.REACT_APP_API_KEY;
const fetchDataFromAPI = async (): Promise<APIResponse | null> => {
  try {
    const response = await axios.get<APIResponse>(
      `https://sheets.googleapis.com/v4/spreadsheets/1NBwy_CtvO68I9hCW1g6lRDT2rj6wngpYu-QaxpfgW28/values/value?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`
    );
    const data = response.data;

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const transformData = async (): Promise<TransformResult> => {
  const values = await fetchDataFromAPI();

  if (!values || !values.values) {
    console.error("Invalid data format:", values);
    return { data: [], dData: [], gData: [], zzData: [] };
  }

  const data: TransformedData[] = [];
  const dData: TransformedData[] = [];
  const gData: TransformedData[] = [];
  const zzData: TransformedData[] = [];

  // for (let i = 0;i < values.values.length; i++) {
  for (let i = 0; i < values.values[0].length; i += 3) {
    const productName = values.values[0][i];

    const vBucks = values.values[1][i];

    const infos: ProductInfo[] = [];

    for (let j = 2; j < 7; j++) {
      const status = values.values[j][i];

      const time = values.values[j][i + 1];

      const buyerName = values.values[j][i + 2];
      infos.push({ status, time, buyerName });
    }

    const productData = { productName, vBucks, infos };
    data.push(productData);

    if (productName[5] === "D") {
      dData.push(productData);
    } else if (productName[5] === "G") {
      gData.push(productData);
    } else if (productName[5] === "Z") {
      zzData.push(productData);
    }
  }
  return { data, dData, gData, zzData };
};

export { transformData };
