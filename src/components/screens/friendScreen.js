// import { useEffect, useRef } from "react";
import { useContext } from "react";
import { BiUpvote } from "react-icons/bi";
import { userContext } from "../../context/user-context";
export default function FriendScreen(props) {
  const { remoteUserData } = useContext(userContext);
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
        <div className="text-white text-sm font-semibold">
          {remoteUserData ? (
            <div className="flex flex-row gap-2">
              <div>
              <span>{remoteUserData.fullname} </span>
              <span className=" lowercase">
                ({remoteUserData.username})
              </span>
              </div>
              <button className="bg-red-500 p-1 px-2 text-white rounded-2xl text-xs font-semibold">
                Report
              </button>
              <button className=" rounded-2xl p-1 px-3 text-black flex flex-row gap-1 justify-center items-center bg-[#fff]">
                <BiUpvote />
                upvote
              </button>
            </div>
          ) : (
            <div className="text-white text-xl">Waiting for connection...</div>
          )}
        </div>
      </div>
    </div>
  );
}
