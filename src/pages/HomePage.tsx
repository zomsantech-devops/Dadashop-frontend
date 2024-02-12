import Footer from "../components/Footer";
import characterBG from "../images/bgSeasonLatest.png";
import HomePageBtn from "../components/HomePageBtn";
import cart from "../images/shopping-cart (1).png";
import medal from "../images/medal (1).png";
import carlendar from "../images/booking (1).png";
import whiteLogo from "../images/dada-logo-horizontal-white.png";
import fortniteGGLogo from "../images/fortniteGG.png";

import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <div className="h-[715px] homePageBGArea_920px:h-[615px] md:h-[550px] screen_540:h-[500px] screen_445:h-[430px] screen_443:h-[465px] relative">
        {/* <img src={bg}  alt="" className={`h-[${height}px] w-full absolute -z-20`}  /> */}
        <img src={"https://dadashop-backend.vercel.app/api/v1/image/banner-99"} alt="" className={`h-full w-full absolute -z-20`} />
        <div className="flex justify-center text-white font-bold">
          <div className="text-center px-[30px]">
            <img
              src={"https://dadashop-backend.vercel.app/api/v1/image/logo-middle"}
              alt="whiteLogo"
              className="h-[270px] screen_540:h-[190px] screen_445:h-[150px] -mt-[50px] screen_540:-mt-[25px] screen_445:-mt-[15px]  mx-[auto]"
            />
            <p className="text-[48px] md:text-[36px] screen_540:text-[32px]  leading-[58px] -mt-[90px] screen_540:-mt-[60px] screen_445:-mt-[40px] screen_445:leading-normal ">
              บริการรับเติมเกม Fortnite
            </p>
          </div>
          {/* <img src={characterBG}  alt="" className="w-[1090px] absolute mt-[195.5px] -z-10"  /> */}
          <img
            src={"https://dadashop-backend.vercel.app/api/v1/image/banner-4"}
            alt=""
            className="w-[1090px] absolute bottom-0 -z-10"
          />
          {/* <Link target="_blank" to="https://fortnite.gg/shop" className="absolute mt-[560px] homePageBGArea_920px:mt-[480px] md:mt-[450px] bg-[#28283C] py-[15px] px-[44px] rounded-[20px] text-2xl item-shop-btn">Item Shop</Link> */}
          <Link
            target="_blank"
            to="https://fortnite.gg/shop"
            className="absolute bottom-[75px] sm:bottom-[280px] screen_540:bottom-[260px] screen_445:bottom-[205px] screen_443:bottom-[200px] bg-[#28283C] py-[15px] px-[25px] rounded-[20px] text-2xl item-shop-btn"
          >
            Item Shop
            {/* <br />  */}
            <img
              src={fortniteGGLogo}
              alt="fortniteGGLogo"
              className="inline-flex h-[16px] mx-[5px]"
            />
            <span className="text-[12px]">Fortnite.gg</span>
          </Link>
        </div>
      </div>
      <div className="px-[30px]">
        <div className="grid grid-rows-1 grid-cols-[330px_330px_330px] homePageCatagories_1150px:grid-rows-2 homePageCatagories_1150px:grid-cols-[330px_330px] md:grid-rows-1 md:grid-cols-[330px]  gap-[50px] justify-center mt-[110px] md:mt-[50px] relative">
          <HomePageBtn
            page={"/item-price-table"}
            icon={cart}
            text={"ราคา & ขั้นตอนการซื้อ"}
          />
          <div className="relative">
            <div className="homepage-btn homepage-btn-overlay opacity-0 absolute h-full w-[330px] px-[44px] py-[30px] flex flex-col text-2xl font-bold rounded-[30px] text-white place-content-between">
              <Link to="/check-queue/d1-d10">Dada D1-D10</Link>
              <Link to="/check-queue/g1-g8">
                Dada G1-G8{" "}
                <span className="text-[10px]">(ปิดรับเพื่อนแล้ว)</span>
              </Link>
            </div>
            <div className="queue-btn">
              <HomePageBtn page={"#"} icon={carlendar} text={"คิวส่ง Gift"} />
            </div>
          </div>

          <HomePageBtn
            page={"/check-points"}
            icon={medal}
            text={"Dada Points"}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
