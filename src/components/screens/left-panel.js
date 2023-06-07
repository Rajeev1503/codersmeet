import { BiUser } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { MdOutlineForum, MdLogin } from "react-icons/md";
import Logo from "../logo";
export default function LeftPanel() {
  return (
    <div className="p-2 h-full">
      <div className="h-full flex flex-col justify-between items-center text-black text-2xl p-2">
        <div className="">
          <Logo />
        </div>
        <div className="flex flex-col justify-center items-center gap-8 pb-16">
          <div className="cursor-pointer p-2 bg-white rounded-2xl">
            <MdOutlineForum />
          </div>
          <div className="cursor-pointer p-2 bg-white rounded-2xl">
            <FiSettings />
          </div>
          <div className="cursor-pointer p-2 bg-white rounded-2xl">
            <BiUser />
          </div>
          <a
            href={"/signup"}
            className="bg-white text-black font-semibold p-2 rounded-full"
          >
            <MdLogin />
          </a>
        </div>
      </div>
    </div>
  );
}
