// import { useEffect, useRef } from "react";
import { BiUpvote } from "react-icons/bi";
export default function FriendScreen(props) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center pt-2">
      <div className="p-2 px-2 w-full">
        <div className="w-full border border-white">
          <video
            className={`${
              props.initialLayout
                ? "aspect-[16/9]"
                : " aspect-[9/16] xl:aspect-[16/9]"
            } object-cover h-full w-full`}
            ref={props.remoteStream}
            autoPlay
          ></video>
        </div>
      </div>
      <div
        className={`${
          props.initialLayout ? "" : props.friendMaxLayout ? "" : "hidden"
        } flex flex-row justify-center items-center gap-2 p-1`}
      >
        <div className="text-white">
          <span className="text-white text-sm font-semibold">
            {props.currentRemoteUserId}
          </span>
        </div>
        {props.currentRemoteUserId ? (
          <>
            <button className="bg-red-500 p-1 px-2 text-white rounded-lg text-xs font-semibold">
              Report
            </button>
            <div className="rounded-full p-1 px-3 text-white flex flex-row gap-1 items-center bg-[#222]">
              <BiUpvote />
              upvote
            </div>
          </>) :<><div className="text-white text-xl">Waiting for connection...</div></>
        }
      </div>
    </div>
  );
}
