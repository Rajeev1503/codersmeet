import {
  BiCamera,
  BiCameraOff,
  BiChat,
  BiMicrophone,
  BiMicrophoneOff,
} from "react-icons/bi";
import { CgScreen } from "react-icons/cg";
import { BsLayoutSplit } from "react-icons/bs";
import { RxTrackNext } from "react-icons/rx";
import {LuScreenShare, LuScreenShareOff} from 'react-icons/lu'
import {TbArrowsDiff} from 'react-icons/tb'

export default function ControlsScreen(props) {
  return (
    <div className="relative h-full w-full flex flex-row flex-wrap gap-3 justify-center items-center p-2">
      <div
        className="cursor-pointer rounded-full p-3 flex flex-row gap-1 items-center justify-center px-3 text-sm bg-white text-black"
        onClick={props.initialLayoutHandler}
      >
        <span className="text-xl">
          <BsLayoutSplit />
        </span>
      </div>
      <div
        className="cursor-pointer rounded-full p-3 flex flex-row gap-1 items-center justify-center px-3 text-sm bg-white text-black"
        onClick={() => props.toggleMic()}
      >
        <span className="text-xl">
          {props.audioState ? <BiMicrophone /> : <BiMicrophoneOff />}
        </span>
      </div>
      <div
        className="cursor-pointer rounded-full p-3 flex flex-row gap-1 items-center justify-center px-3 text-sm bg-white text-black"
        onClick={() => props.toggleCamera()}
      >
        <span className="text-xl">
          {props.videoState ? <BiCamera /> : <BiCameraOff />}
        </span>
      </div>
      <div
        className="cursor-pointer rounded-full p-3 flex flex-row gap-1 items-center justify-center px-3 text-sm bg-white text-black"
        onClick={() => props.shareScreen()}
      >
        <span className="text-xl">
          {props.screenShareState ? <LuScreenShareOff /> : <LuScreenShare/>}
        </span>
      </div>
      <button
        className="cursor-pointer rounded-full p-3 flex flex-row gap-1 items-center justify-center px-3 text-sm bg-white text-black"
        onClick={() => {
          props.nextUserHandler();
        }}
        disabled={props.userChanged}
      >
        <span className="text-xl">
          <RxTrackNext />
        </span>
      </button>
      <div
        className="absolute right-0 cursor-pointer p-3 flex flex-row gap-1 items-center justify-center px-3 text-sm bg-transparent text-white"
        onClick={props.setShowChatBox}
      >
        <span className="text-2xl">
          <TbArrowsDiff />
        </span>
      </div>
    </div>
  );
}
