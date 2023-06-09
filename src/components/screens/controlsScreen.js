import {
  BiCamera,
  BiCameraOff,
  BiChat,
  BiMicrophone,
  BiMicrophoneOff,
  BiMoon,
  BiSkipNext,
} from "react-icons/bi";
import { CgScreen } from "react-icons/cg";
import { BsLayoutSplit } from "react-icons/bs";

export default function ControlsScreen(props) {

  
  return (
    <div className="h-full w-full flex flex-row flex-wrap gap-3 justify-center items-center p-2"> 
      <div className="cursor-pointer rounded-full p-1 flex flex-row gap-1 items-center justify-center px-3 text-sm bg-white text-black"
      onClick={props.initialLayoutHandler}
      >
        <span className="text-3xl">
          <BsLayoutSplit />
        </span>
      </div>   
      <div className="cursor-pointer rounded-full p-1 flex flex-row gap-1 items-center justify-center px-3 text-sm bg-white text-black" onClick={()=>props.toggleMic()} >
        <span className="text-3xl">
          {props.audioState ? <BiMicrophone /> : <BiMicrophoneOff />}
        </span>
      </div>   
      <div className="cursor-pointer rounded-full p-1 flex flex-row gap-1 items-center justify-center px-3 text-sm bg-white text-black" onClick={()=>props.toggleCamera()}>
        <span className="text-3xl">
          {props.videoState ? <BiCamera /> : <BiCameraOff />}
        </span>
      </div>
      <div className="cursor-pointer rounded-full p-1 flex flex-row gap-1 items-center justify-center px-3 text-sm bg-white text-black">
        <span className="text-3xl">
          <CgScreen />
        </span>
      </div>
      <button className="cursor-pointer rounded-full p-1 flex flex-row gap-1 items-center justify-center px-3 text-sm bg-white text-black"
      onClick={props.nextUserHandler} disabled={props.userChanged}>
        <span className="text-3xl">
          <BiSkipNext />
        </span>
      </button>
      <div className="cursor-pointer rounded-full p-1 flex flex-row gap-1 items-center justify-center px-3 text-sm bg-white text-black" onClick={props.setShowChatBox}>
        <span className="text-3xl">
        <BiChat />
        </span>
      </div>
      
    </div>
  );
}
