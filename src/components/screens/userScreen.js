// import { useEffect, useRef } from "react";

import { BiCamera, BiCameraOff } from "react-icons/bi";

export default function UserScreen(props) {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center pt-2">
      <div className=" p-2 px-2 w-full">
        <div className="w-full">
          <video
            className={`${!props.videoState && 'hidden'} ${props.initialLayout ? 'aspect-[16/9]': 'aspect-[9/16] xl:aspect-[16/9]'}  border border-white object-cover h-full w-full`}
            ref={props.localStream}
            autoPlay
          ></video>
        <div className={`${props.videoState && 'hidden'} border border-white aspect-[9/16] xl:aspect-[16/9] h-full w-full flex flex-row justify-center items-center text-white text-6xl`}>
          <BiCameraOff />
        </div>
        </div>
      </div>
      <div
        className={`${
          props.initialLayout ? "" : props.userMaxLayout ? "" : "hidden"
        } flex flex-row justify-center items-center gap-2 p-1`}
      >
        <div className="text-white">
          <span className="text-white text-sm font-semibold">{props.currentUserId}(user)</span>
        </div>
      </div>
    </div>
  );
}
