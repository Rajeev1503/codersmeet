import { useContext } from "react";
import { BiCameraOff } from "react-icons/bi";
import { userContext } from "../../context/user-context";

export default function UserScreen({
  layoutValues: {
    initialLayout,
    userMaxLayout,
    setInitialLayout,
    setFriendMaxLayout,
    setUserMaxLayout,
  },
  ...props
}) {
  const { userData } = useContext(userContext);

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center pt-2">
      <div className=" p-2 px-2 w-full">
        <div className="w-full" onClick={()=>{setUserMaxLayout(true); setFriendMaxLayout(false); setInitialLayout(false)}}>
          <video
            className={`${!props.videoState && "hidden"} ${
              initialLayout
                ? "aspect-[16/9]"
                : "aspect-[9/16] xl:aspect-[16/9]"
            }  border border-white object-cover h-[99%] w-[99%]`}
            ref={props.localStream}
            autoPlay
          ></video>
          <div
            className={`text-white flex justify-center items-center text-5xl ${props.videoState && "hidden"} ${
              initialLayout
                ? "aspect-[16/9]"
                : "aspect-[9/16] xl:aspect-[16/9]"
            }  border border-white object-cover h-[99%] w-[99%]`}
          >
            <BiCameraOff />
          </div>
        </div>
      </div>
      <div
        className={`${
          initialLayout ? "" : userMaxLayout ? "" : "hidden"
        } flex flex-row justify-center items-center gap-2 p-1`}
      >
        <div className="text-white p-1">
          <div className="text-white text-sm font-semibold">
            {userData ? (
              <div onClick={() => props.showProfileModalHandler("user")}>
                <span>{userData.fullname} </span>
                <span className=" lowercase">({userData.username})</span>
              </div>
            ) : (
              "Loading..."
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
