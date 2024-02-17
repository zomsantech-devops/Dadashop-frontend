import { Link } from "react-router-dom";

interface CardProps {
  image: string;
  title: string;
  bulletColor: string;
  list: BulletList[];
  button: {
    name: string;
    link: string;
    color: {
      from: string;
      via?: string;
      to: string;
    };
  };
  preset_type: number;
}

interface BulletList {
  content: string;
}

export const HorizontalCard = () => {

  return (
    <div className="col-span-12 screen_1250:w-[900px] screen_960:w-[440px] screen_500:w-full rounded-[30px] price-and-how-to-box">
      <div className="h-[585px] screen_960:w-full screen_960:h-auto rounded-t-[30px] bg-lime-100 overflow-hidden">
        <img
          src={"https://dadashop-backend.vercel.app/api/v1/image/banner-1"}
          alt="giftImage"
        //   className="h-[585px] w-full object-cover object-top screen_960:h-auto screen_960:w-full"
          className="h-[585px] w-full object-contain screen_960:h-auto screen_960:w-full"
        //   className="w-full aspect-square object-cover object-top"
        ></img>
      </div>
      <div className="p-[15px]">
        <h1 className="font-bold text-[28px]">ส่ง Gift</h1>
        {/* สามารถเปลี่ยนสีได้เลยครับ แค่ใส่โค้ดสี HEX ลงใน bg-[โค้ดสี] */}
        <div className="flex flex-col justify-center gap-3 mb-5 mt-3 ml-10">
          <p>
            <span className="list-bullet-gift"></span>สั่ง Item หรือ Battle Pass
            ชุดเริ่มต้น
          </p>
          <p>
            <span className="list-bullet-gift"></span>ไม่ใช่การส่ง V-Bucks
            (ลูกค้าจะได้รับเป็น Item)
          </p>
          <p>
            <span className="list-bullet-gift"></span>
            ต้องเป็นเพื่อนกันในเกม{" "}
            <span className="font-bold">อย่างน้อย 48 ชั่วโมง</span>
          </p>
        </div>
        {/* อันนี้เป็นสี gradient จากซ้ายไปขวา ใส่ตามนี้เลยครับ form -> via -> to (bg-[โค้ดสี]) */}
        {/* Hover ขอบเรืองแสง สามารถก็อบตัว link-how-to-btn-purple ไปหาในไฟล์ index.css ได้เลยครับ */}
        <Link
          to="/price-fortnite/how-to-gift"
          className="link-how-to-btn-purple w-full text-center block px-4 py-3 bg-[#1c85b6] text-white rounded-3xl bg-gradient-to-r from-[#BA6EEA] via-[#A5B7E1] to-[#3ABFCD] text-xl font-bold"
        >
          ขั้นตอนการสั่งซื้อ Gift
        </Link>
      </div>
    </div>
  );
};
