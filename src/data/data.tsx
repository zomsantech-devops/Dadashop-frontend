import axios from "axios";

// const values = {
//     "range": "value!A1:BB7",
//     "majorDimension": "ROWS",
//     "values": [
//         [
//             "Dada D1",
//             "",
//             "",
//             "Dada D2",
//             "",
//             "",
//             "Dada D3",
//             "",
//             "",
//             "Dada D4",
//             "",
//             "",
//             "Dada D5",
//             "",
//             "",
//             "Dada D6",
//             "",
//             "",
//             "Dada D7",
//             "",
//             "",
//             "Dada D8",
//             "",
//             "",
//             "Dada D9",
//             "",
//             "",
//             "Dada D10",
//             "",
//             "",
//             "Dada G1",
//             "",
//             "",
//             "Dada G2",
//             "",
//             "",
//             "Dada G3",
//             "",
//             "",
//             "Dada G4",
//             "",
//             "",
//             "Dada G5",
//             "",
//             "",
//             "Dada G6",
//             "",
//             "",
//             "Dada G7",
//             "",
//             "",
//             "Dada G8"
//         ],
//         [
//             "9700",
//             "",
//             "",
//             "8100",
//             "",
//             "",
//             "9100",
//             "",
//             "",
//             "1200",
//             "",
//             "",
//             "3700",
//             "",
//             "",
//             "15100",
//             "",
//             "",
//             "9600",
//             "",
//             "",
//             "7100",
//             "",
//             "",
//             "2800",
//             "",
//             "",
//             "6100",
//             "",
//             "",
//             "8340",
//             "",
//             "",
//             "11260",
//             "",
//             "",
//             "10100",
//             "",
//             "",
//             "5600",
//             "",
//             "",
//             "3200",
//             "",
//             "",
//             "2700",
//             "",
//             "",
//             "9100",
//             "",
//             "",
//             "18100"
//         ],
//         [
//             "พร้อมส่ง",
//             "ตอนนี้",
//             "",
//             "พร้อมส่ง",
//             "ตอนนี้",
//             "",
//             "พร้อมส่ง",
//             "ตอนนี้",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "17.49",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "17.51",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "17.52",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "8.14",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "8.51",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "9.33",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "11.10",
//             "",
//             "พร้อมส่ง",
//             "ตอนนี้",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "12.16",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "14.39",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "17.52",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "8.10",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "9.14",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "10.15",
//             "",
//             "พร้อมส่ง",
//             "ตอนนี้"
//         ],
//         [
//             "พร้อมส่ง",
//             "ตอนนี้",
//             "",
//             "พร้อมส่ง",
//             "ตอนนี้",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "14.11",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "17.49",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "17.51",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "20.09",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "8.22",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "9.03",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "9.54",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "11.12",
//             "",
//             "พร้อมส่ง",
//             "ตอนนี้",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "12.17",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "15.32",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "19.22",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "8.10",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "10.09",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "11.08",
//             "",
//             "พร้อมส่ง",
//             "ตอนนี้"
//         ],
//         [
//             "พร้อมส่ง",
//             "ตอนนี้",
//             "",
//             "พร้อมส่ง",
//             "ตอนนี้",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "17.46",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "17.49",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "17.51",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "21.28",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "8.22",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "9.07",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "10.02",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "11.12",
//             "",
//             "พร้อมส่ง",
//             "ตอนนี้",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "12.17",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "15.32",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "20.24",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "9.00",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "10.14",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "11.09",
//             "",
//             "พร้อมส่ง",
//             "ตอนนี้"
//         ],
//         [
//             "พร้อมส่ง",
//             "ตอนนี้",
//             "",
//             "พร้อมส่ง",
//             "ตอนนี้",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "17.47",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "17.49",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "17.51",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "8.12",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "8.23",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "9.31",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "10.22",
//             "",
//             "พร้อมส่ง",
//             "ตอนนี้",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "12.13",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "12.17",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "15.45",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "21.10",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "9.07",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "10.14",
//             "",
//             "พร้อมส่ง",
//             "ตอนนี้",
//             "",
//             "พร้อมส่ง",
//             "ตอนนี้"
//         ],
//         [
//             "พร้อมส่ง",
//             "ตอนนี้",
//             "",
//             "พร้อมส่ง",
//             "ตอนนี้",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "17.47",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "17.49",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "17.51",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "8.14",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "8.23",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "9.32",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "10.22",
//             "",
//             "พร้อมส่ง",
//             "ตอนนี้",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "12.15",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "13.26",
//             "",
//             "พร้อมส่งวันนี้เวลา",
//             "15.45",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "8.08",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "9.14",
//             "",
//             "ส่งได้พรุ่งนี้",
//             "10.14",
//             "",
//             "พร้อมส่ง",
//             "ตอนนี้",
//             "",
//             "พร้อมส่ง",
//             "ตอนนี้"
//         ]
//     ]
// }

export const cardData = [
  {
    image: "https://dadashop-backend.vercel.app/api/v1/image/banner-1",
    title: "ส่ง Gift",
    bulletColor: "#ba6eea",
    list: [
      {
        content: "สั่ง Item หรือ Battle Pass ชุดเริ่มต้น",
      },
      {
        content: "ไม่ใช่การส่ง V-Bucks (ลูกค้าจะได้รับเป็น Item)",
      },
      {
        content: "ต้องเป็นเพื่อนกันในเกม อย่างน้อย 48 ชั่วโมง",
      },
    ],
    button: {
      name: "ขั้นตอนการสั่งซื้อ Gift",
      link: "/price-fortnite/how-to-gift",
      color: {
        from: "#BA6EEA",
        via: "#A5B7E1",
        to: "#3ABFCD",
      },
    },
    preset_type: 1,
  },
  {
    image: "https://dadashop-backend.vercel.app/api/v1/image/banner-2",
    title: "เติม V-Bucks, Packs, Fortnite Crew",
    bulletColor: "#abd499",
    list: [
      {
        content: "ลูกค้าต้องนำ ID Epic มาผูกกับ ID XBOX ของลูกค้าเอง",
      },
      {
        content: "ไม่ต้องรอ 48 ชั่วโมง",
      },
      {
        content: "ได้ทันทีภายใน 10 ถึง 20 นาที",
      },
    ],
    button: {
      name: "ขั้นตอนการสั่งซื้อผ่าน XBOX",
      link: "/price-fortnite/how-to-else",
      color: {
        from: "#BBB251",
        via: "#ABD499",
        to: "#2FD491",
      },
    },
    preset_type: 2,
  },
  // {
  //   image: "https://dadashop-backend.vercel.app/api/v1/image/banner-2",
  //   title: "เติม V-Bucks, Packs, Fortnite Crew",
  //   bulletColor: "#abd499",
  //   list: [
  //     {
  //       content: "ลูกค้าต้องนำ ID Epic มาผูกกับ ID XBOX ของลูกค้าเอง",
  //     },
  //     {
  //       content: "ไม่ต้องรอ 48 ชั่วโมง",
  //     },
  //     {
  //       content: "ได้ทันทีภายใน 10 ถึง 20 นาที",
  //     },
  //   ],
  //   button: {
  //     name: "ขั้นตอนการสั่งซื้อผ่าน XBOX",
  //     link: "/price-fortnite/how-to-else",
  //     color: {
  //       from: "#BBB251",
  //       via: "#ABD499",
  //       to: "#2FD491",
  //     },
  //   },
  //   preset_type: 3,
  // },
  // {
  //   image: "https://dadashop-backend.vercel.app/api/v1/image/banner-2",
  //   title: "เติม V-Bucks, Packs, Fortnite Crew",
  //   bulletColor: "#abd499",
  //   list: [
  //     {
  //       content: "ลูกค้าต้องนำ ID Epic มาผูกกับ ID XBOX ของลูกค้าเอง",
  //     },
  //     {
  //       content: "ไม่ต้องรอ 48 ชั่วโมง",
  //     },
  //     {
  //       content: "ได้ทันทีภายใน 10 ถึง 20 นาที",
  //     },
  //   ],
  //   button: {
  //     name: "ขั้นตอนการสั่งซื้อผ่าน XBOX",
  //     link: "/price-fortnite/how-to-else",
  //     color: {
  //       from: "#BBB251",
  //       via: "#ABD499",
  //       to: "#2FD491",
  //     },
  //   },
  //   preset_type: 4,
  // },
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
