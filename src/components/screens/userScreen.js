// import { useEffect, useRef } from "react";

export default function UserScreen(props) {
  // let localStream;
  // const userFeed = useRef();

  // useEffect(() => {
  //   userCameraFeed();
  // }, []);

  // async function userCameraFeed(props) {
  //   localStream = props.localStream
  //   userFeed.current.srcObject = localStream;
  // }

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center pt-2">
      <div className=" p-2 px-2 w-full">
        <div className="w-full">
          <video
            className="aspect-[16/9] object-cover h-full w-full"
            ref={props.localStream}
            autoPlay
          ></video>
        </div>
      </div>
      <div
        className={`${
          props.initialLayout ? "" : props.userMaxLayout? '':'hidden'
        } flex flex-row justify-center items-center gap-2 p-1`}
      >
        <div className="text-white">
          <span className="text-white text-2xl">John Doe</span>
          <span className="text-sm font-semibold">(User's screen)</span>
        </div>
      </div>
    </div>
  );
}
