import Footer from "../components/shared/Footer";
import {
  FBButton,
  DiscordButton,
  DarkButton,
  SmallDarkButton,
} from "../components/Button";
import arrow from "../assets/icons/arrow-down-sign-to-navigate.webp";

import { Link } from "react-router-dom";

function HowToElse() {
  return (
    <div>
      <div className="flex flex-col justify-center px-[30px]">
        <div className="relative">
          <Link
            to="/price-fortnite"
            className="screen_1070:invisible absolute top-[30px] ml-[70px] flex gap-[5px] items-center"
          >
            <img
              src={arrow}
              alt="Arrow icon"
              className="w-[12px] h-[12px] rotate-90 mt-[2px]"
            />
            ราคา & ขั้นตอนการซื้อ
          </Link>
          <p className="text-center text-5xl font-bold my-[40px] leading-[58px] screen_540:text-3xl">
            ขั้นตอนการสั่งซื้อ
            <br />
            <span className="text-[36px] leading-[44px] screen_540:text-2xl">
              V-Bucks / Packs / Fortnite Crew
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-[20px] ">
          <div className="screen_930:w-full screen_930:text-[20px] font-bold bg-[#E7F9FD] w-[870px] text-xl leading-[40px] p-[30px] rounded-[30px] self-center">
            <p className=" mb-[15px] text-[17px] screen_930:text-[16px]">
              1. เข้าเว็บ Epic Games และทำการ Login ID
              ที่เราเล่นไว้รอก่อนได้เลยครับ 😊 (ให้ทำการ Login ให้ถูก ID
              ที่เราเล่น เช่น หากลูกค้าเล่นบน PlayStation ให้กด Login ด้วย
              PlayStation ID เป็นต้น เพื่อป้องกันการผูกผิดไอดี)
            </p>
            <div className="flex w-fit gap-[15px] text-[16px] hover:scale-105 transition ease-in-out duration-300 ">
              <DarkButton
                text={"Login Epic Games"}
                link="https://www.epicgames.com/account/connections#accounts"
                className=""
              />
            </div>
          </div>
          <div className="screen_930:w-full screen_930:text-[20px] font-bold bg-[#E7F9FD] w-[870px] text-xl leading-[40px] p-[30px] rounded-[30px] self-center">
            <p className=" mb-[15px] text-[17px] screen_930:text-[16px]">
              2. สมัคร ID XBOX ของลูกค้า โดยเข้า Link ข้างล่าง แล้วกด{" "}
              <span className="text-blue-600">Create one!</span> (หากมี ID XBOX
              อยู่แล้ว ให้ข้ามข้อนี้ได้เลยครับ)
            </p>
            <div className="flex w-fit gap-[15px] text-[16px] hover:scale-105 transition ease-in-out duration-300">
              <DarkButton
                text={"สมัคร ID XBOX"}
                link="https://account.xbox.com/profile"
                className=""
              />
            </div>
          </div>
          <div className="screen_930:w-full screen_930:text-[20px] font-bold bg-[#E7F9FD] w-[870px] text-xl leading-[40px] p-[30px] rounded-[30px] self-center">
            <p className=" mb-[15px] text-[17px] screen_930:text-[16px]">
              3. ทำการผูก ID Epic เข้ากับ ID XBOX โดยการกด Link นี้เลย
            </p>
            <div className="flex gap-[15px] w-fit text-[16px] hover:scale-105 transition ease-in-out duration-300">
              <SmallDarkButton
                text={"ผูก ID"}
                link="https://www.epicgames.com/id/link/xbl?successRedirect=https%3A%2F%2Fwww.epicgames.com%2Faccount%2Fconnections%3Flang%3Den-US%26connected%3Dxbox%26tab%3Daccounts&client_id=007c0bfe154c4f5396648f013c641dcf&lang=en_US"
                className=""
              />
            </div>
          </div>
          <div className="screen_930:w-full screen_930:text-[20px] font-bold bg-[#E7F9FD] w-[870px] text-xl leading-[40px] p-[30px] rounded-[30px] self-center">
            <div className="text-[17px] screen_930:text-[16px]">4. สั่งซื้อ โดยการแจ้งสิ่งที่ต้องการ</div>
            <ul className="ml-10 md:ml-8 sm:ml-5">
              <li className="flex flex-col whitespace-normal text-[17px] screen_930:text-[16px]">
                <p>
                  <span className="list-bullet"></span>V-Bucks
                </p>
                <div className="ml-10 md:ml-8 sm:ml-5">
                  <p>
                    <span className="list-bullet"></span>1000
                  </p>
                  <p>
                    <span className="list-bullet"></span>2800
                  </p>
                  <p>
                    <span className="list-bullet"></span>5000
                  </p>
                  <p>
                    <span className="list-bullet"></span>13500
                  </p>
                </div>
              </li>
              <li className="flex items-center text-[17px] screen_930:text-[16px]">
                <span className="list-bullet"></span>Packs
              </li>
              <li className="flex items-center text-[17px] screen_930:text-[16px]">
                <span className="list-bullet"></span>Fortnite Crew
              </li>
            </ul>
            <p className=" mb-[15px] text-[17px] screen_930:text-[16px]">(ทักแล้วรอ Admin คอนเฟิร์มครับผม)</p>
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
