import Footer from "../components/Footer";
import {
  FBButton,
  DiscordButton,
  DarkButton,
  SmallDarkButton,
} from "../components/Button";
import arrow from "../images/arrow-down-sign-to-navigate.png";

import { Link } from "react-router-dom";

function HowToElse() {
  return (
    <div>
      <div className="flex flex-col justify-center px-[30px]">
        <div className="relative">
          <Link
            to="/ItemPriceTable"
            className="screen_1070:invisible absolute top-[30px] ml-[70px] flex gap-[5px] items-center"
          >
            <img
              src={arrow}
              alt="Arrow icon"
              className="w-[12px] h-[12px] rotate-90 mt-[2px]"
            />
            ราคา & ขั้นตอนการซื้อ
          </Link>
          <p className="text-center text-5xl font-bold my-[40px] leading-[58px]">
            ขั้นตอนการสั่งซื้อ
            <br />
            <span className="text-[36px] leading-[44px]">
              V-Bucks / Packs / Fortnite Crew
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="screen_930:w-full screen_930:text-[20px] font-bold bg-[#E7F9FD] w-[870px] text-[24px] leading-[40px] p-[30px] rounded-[30px] self-center">
            <p className=" mb-[15px]">
              1. เข้าเว็บ Epic Games และทำการ Login ID
              ที่เราเล่นไว้รอก่อนได้เลยครับ 😊 (ให้ทำการ Login ให้ถูก ID
              ที่เราเล่น เช่น หากลูกค้าเล่นบน PlayStation ให้กด Login ด้วย
              PlayStation ID เป็นต้น เพื่อป้องกันการผูกผิดไอดี)
            </p>
            <div className="flex gap-[15px] text-[16px]">
              <DarkButton
                text={"Login Epic Games"}
                link="https://www.epicgames.com/account/connections#accounts"
              />
            </div>
          </div>
          <div className="screen_930:w-full screen_930:text-[20px] font-bold bg-[#E7F9FD] w-[870px] text-[24px] leading-[40px] p-[30px] rounded-[30px] self-center">
            <p className=" mb-[15px]">
              2. สมัคร ID XBOX ของลูกค้า (ตอนสมัครต้องกรอกปีเกิดให้อายุ &gt;20
              ครับ)
            </p>
            <div className="flex gap-[15px] text-[16px]">
              <DarkButton
                text={"สมัคร ID XBOX"}
                link="https://account.xbox.com/profile"
              />
            </div>
          </div>
          <div className="screen_930:w-full screen_930:text-[20px] font-bold bg-[#E7F9FD] w-[870px] text-[24px] leading-[40px] p-[30px] rounded-[30px] self-center">
            <p className=" mb-[15px]">
              3. ทำการผูก ID Epic เข้ากับ ID XBOX โดยการกด Link นี้เลย
            </p>
            <div className="flex gap-[15px] text-[16px]">
              <SmallDarkButton
                text={"ผูก ID"}
                link="https://www.epicgames.com/id/link/xbl?successRedirect=https%3A%2F%2Fwww.epicgames.com%2Faccount%2Fconnections%3Flang%3Den-US%26connected%3Dxbox%26tab%3Daccounts&client_id=007c0bfe154c4f5396648f013c641dcf&lang=en_US"
              />
            </div>
          </div>
          <div className="screen_930:w-full screen_930:text-[20px] font-bold bg-[#E7F9FD] w-[870px] text-[24px] leading-[40px] p-[30px] rounded-[30px] self-center">
            <p className=" mb-[15px]">
              4. สั่งซื้อ โดยการแจ้งสิ่งที่ต้องการ
              <ul className="list-disc ml-[20px]">
                <li>V-Bucks 1000/2800/5000/13500</li>
                <li>Packs</li>
                <li>Fortnite Crew</li>
              </ul>
              (ทักแล้วรอ Admin คอนเฟิร์มครับผม)
            </p>
            <div className="flex gap-[15px] text-[16px]">
              <FBButton />
              <DiscordButton />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HowToElse;
