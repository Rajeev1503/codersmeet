import { MdOutlineForum, MdLogin } from "react-icons/md";
import Logo from "../logo";
export default function TopPanel(props) {
  // const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  return (
    <div className="h-full w-full">
      <div className="h-full w-full flex flex-row justify-between items-center text-black text-xl p-2 px-6">
        <Logo />
        <div className="flex flex-row justify-center items-center gap-4">
          {/* <div className="cursor-pointer p-2 bg-white rounded-full">
            <BiMoon />
          </div> */}
          <a
            href="https://codersmeetforum.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer p-2 bg-white rounded-full"
          >
            <MdOutlineForum />
          </a>
          {/* <div className="cursor-pointer p-2 bg-white rounded-full">
            <BiUser />
          </div> */}
          {props.cookie.token && (
            <div
              className="cursor-pointer bg-white text-black font-semibold p-2 rounded-full"
              onClick={() => {
                props.removeCookie("token");
              }}
            >
              <MdLogin />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
