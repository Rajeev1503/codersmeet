import {
  BiCamera,
  BiChat,
  BiMicrophoneOff,
  BiMoon,
  BiSkipNext,
} from "react-icons/bi";
import { CgScreen } from "react-icons/cg";
import { BsLayoutSplit } from "react-icons/bs";

export default function ControlsScreen(props) {
  return (
    <div className="h-full w-full flex flex-row flex-wrap gap-3 justify-center items-center p-2">
      <div className="cursor-pointer rounded-full p-1 flex flex-row gap-1 items-center justify-center px-3 text-sm bg-white text-black font-semibold"
      onClick={props.initialLayoutHandler}
      >
        <span className="text-2xl">
          <BiMoon />
        </span>
      </div>  
      <div className="cursor-pointer rounded-full p-1 flex flex-row gap-1 items-center justify-center px-3 text-sm bg-white text-black font-semibold"
      onClick={props.initialLayoutHandler}
      >
        <span className="text-2xl">
          <BsLayoutSplit />
        </span>
      </div>   
      <div className="cursor-pointer rounded-full p-1 flex flex-row gap-1 items-center justify-center px-3 pr-5 text-sm bg-white text-black font-semibold">
        <span className="text-2xl">
          <BiMicrophoneOff />
        </span>
        Mic
      </div>   
      <div className="cursor-pointer rounded-full p-1 flex flex-row gap-1 items-center justify-center px-3 pr-5 text-sm bg-white text-black font-semibold">
        <span className="text-2xl">
          <BiCamera />
        </span>
        Camera
      </div>
      <div className="cursor-pointer rounded-full p-1 flex flex-row gap-1 items-center justify-center px-3 pr-5 text-sm bg-white text-black font-semibold">
        <span className="text-2xl">
          <CgScreen />
        </span>
        Present
      </div>
      <div className="cursor-pointer rounded-full p-1 flex flex-row gap-1 items-center justify-center px-3 pr-5 text-sm bg-white text-black font-semibold"
      onClick={props.nextUserHandler}>
        <span className="text-2xl">
          <BiSkipNext />
        </span>
        Next
      </div>
      <div className="cursor-pointer rounded-full p-1 flex flex-row gap-1 items-center justify-center px-3 pr-5 text-sm bg-white text-black font-semibold" onClick={props.setShowChatBox}>
        <span className="text-2xl">
        <BiChat />
        </span>
        Chats
      </div>
      <div className="cursor-pointer rounded-full p-1 flex flex-row gap-1 items-center justify-center px-3 pr-5 text-sm bg-white text-black font-semibold" onClick={props.closeCurrentCall}>
        <span className="text-2xl">
        close call
        </span>
      </div>
      
    </div>
  );
}
