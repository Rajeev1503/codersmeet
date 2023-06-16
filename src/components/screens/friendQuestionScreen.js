import { useContext, useEffect } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { userContext } from "../../context/user-context";
import serverUrl from "../../assets/serverUrl";

export default function FriendQuestionScreen(props) {
  const { userData, remoteUserData } = useContext(userContext);

  function auto_grow(e) {
    if (e.target.style.height !== "120px") {
      e.target.style.height = "5px";
      e.target.style.height = e.target.scrollHeight + "px";
    } else {
      e.target.style.overflowY = "scroll";
    }
  }

  return (
    <div className="h-full w-full flex flex-row justify-start items-start">
      {props.isRecording? <button className="h-min min-w-max text-sm font-semibold border-none bg-white outline-none px-3 p-1 rounded-2xl flex flex-row items-center justify-center" onClick={props.screenRecorderStop()}>
        stopRecording
         {/* <BiRightArrowAlt /> */}
      </button>:<button className="h-min min-w-max text-sm font-semibold border-none bg-white outline-none px-3 p-1 rounded-2xl flex flex-row items-center justify-center" onClick={props.screenRecorderStart()}>
        Solve
         {/* <BiRightArrowAlt /> */}
      </button> }
      <form className="h-full w-[80%] flex flex-row justify-start items-center">
        <textarea
          name="questionInput"
          autoComplete="off"
          rows={3}
          className="h-full w-full text-white font-semibold bg-transparent px-4 outline-none"
          value={remoteUserData? remoteUserData?.currentQuestion : 'No Question'}
          readOnly
        />
      </form>
    </div>
  );
}
