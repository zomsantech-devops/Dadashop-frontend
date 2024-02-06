import LeftSidebar from "../components/LeftSidebar";

const ChangeImages = () => {
  return (
    <main className="flex flex-row">
      <LeftSidebar />
      {/* Change image side */}
      <div className="flex flex-col items-center justify-center w-[910px] my-6 screen_910:w-full mx-auto relative pb-[50px] screen_1070:pl-20 screen_500:pb-0 screen_500:pr-4">
        <div className="flex flex-col w-[600px] screen_810:w-[350px] screen_500:w-[250px]">
          <p className="font-bold text-[24px] mb-[10px]">แก้ไขภาพ Banners</p>
          <form className="flex flex-col">
            <label className="mb-[3px] font-bold">Banner name:</label>
            <select
              className="border border-blue-gray-50 mb-[15px] rounded-[5px] px-[10px] py-[5px] focus:border-[#1EAEF0] outline-[#02A7F3]"
              name="image_type"
            >
              <option value="gift">How To Gift</option>
              <option value="else">How To Else</option>
              <option value="dada-point">Dada Points</option>
            </select>

            <label className="mb-[3px] font-bold">Upload new image:</label>
            <input type="file" accept="image/*" className="mb-[15px]" />

            <div className="flex gap-4 mb-[15px] screen_445:flex-col">
              <div className="">
                <label className="mb-[3px] font-bold">Old image:</label>
                <img
                  src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
                  alt=""
                  className="mb-[3px] w-[250px]"
                />
              </div>
              <div className="">
                <label className="mb-[3px] font-bold">New image:</label>
                <img
                  src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
                  alt=""
                  className="mb-[15px] w-[250px]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#1EAEF0] rounded-[10px] px-4 py-2 opacity-100 hover:opacity-80 w-full font-bold text-white"
            >
              อัพเดตรูปภาพ
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
export default ChangeImages;
