import { BiMoon, BiUser } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { MdOutlineForum, MdLogin } from "react-icons/md";
import Logo from "../logo";
export default function LeftPanel() {
  return (
    <div className="p-2 h-full">
      <div className="h-full flex flex-col justify-end items-center text-black text-2xl p-2">
        
        <div className="flex flex-col justify-center items-center gap-8 pb-8">
        <div className="cursor-pointer p-3 bg-white rounded-full">
            <BiMoon />
          </div>
          <div className="cursor-pointer p-3 bg-white rounded-full">
            <MdOutlineForum />
          </div>
          <div className="cursor-pointer p-3 bg-white rounded-full">
            <FiSettings />
          </div>
          <div className="cursor-pointer p-3 bg-white rounded-full">
            <BiUser />
          </div>
          <a
            href={"/signup"}
            className="bg-white text-black font-semibold p-3 rounded-full"
          >
            <MdLogin />
          </a>
        </div>
      </div>
    </div>
  );
}
