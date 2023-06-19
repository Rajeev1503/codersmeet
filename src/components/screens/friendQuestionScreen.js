import { useContext, useEffect, useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { userContext } from "../../context/user-context";
import serverUrl from "../../assets/serverUrl";

export default function FriendQuestionScreen(props) {
  const { userData, remoteUserData } = useContext(userContext);
  const [recordingConfirmationModal, setRecordingConfirmationModal] =
    useState(false);
  const [recordingSendConfirmModal, setRecordingSendConfirmModal] =
    useState(false);
  function auto_grow(e) {
    if (e.target.style.height !== "120px") {
      e.target.style.height = "5px";
      e.target.style.height = e.target.scrollHeight + "px";
    } else {
      e.target.style.overflowY = "scroll";
    }
  }

  return (
    <div className="relative h-full w-full flex flex-row justify-start items-start">
      {remoteUserData?.currentQuestion && (
        <>
          {props.isRecording ? (
            <button
              className="h-min min-w-max text-sm font-semibold border-none bg-white outline-none px-3 p-1 rounded-2xl flex flex-row items-center justify-center"
              onClick={() => {
                props.pauseScreenRecorder();
                setRecordingSendConfirmModal(true);
              }}
            >
              Stop recording
              {/* <BiRightArrowAlt /> */}
            </button>
          ) : (
            <button
              className="h-min min-w-max text-sm font-semibold border-none bg-white outline-none px-3 p-1 rounded-2xl flex flex-row items-center justify-center"
              onClick={() => setRecordingConfirmationModal(true)}
            >
              Solve
            </button>
          )}
        </>
      )}
      <form className="h-full w-[80%] flex flex-row justify-start items-center">
        <textarea
          name="questionInput"
          autoComplete="off"
          rows={3}
          className="h-full w-full text-white font-semibold bg-transparent px-4 outline-none"
          value={
            remoteUserData ? remoteUserData?.currentQuestion : "No Question"
          }
          readOnly
        />
      </form>
      {recordingConfirmationModal && (
        <div className="z-50 absolute top-10 text-[#fff] bg-[#222] p-4 w-[90%] rounded-2xl font-semibold">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-lg">Ready to answer?</h1>
              <p className="text-xs">Your screen will be recorded</p>
            </div>
            <div className="flex flex-row gap-2 justify-start">
              <button
                className="h-min min-w-max text-sm font-semibold border-none bg-white text-black outline-none px-3 p-1 rounded-2xl flex flex-row items-center justify-center"
                onClick={() => setRecordingConfirmationModal(false)}
              >
                Cancel
              </button>
              <button
                className="h-min min-w-max text-sm font-semibold border-none bg-white text-black outline-none px-3 p-1 rounded-2xl flex flex-row items-center justify-center"
                onClick={() => {
                  setRecordingConfirmationModal(false);
                  props.shareScreen();
                }}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
      {recordingSendConfirmModal && (
        <div className="z-50 absolute top-10 text-[#fff] bg-[#222] p-4 w-[90%] rounded-2xl font-semibold">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-lg">What to do with recorded video?</h1>
            </div>
            <div className="flex flex-row gap-2 justify-start">
              <button
                className="h-min min-w-max text-sm font-semibold border-none bg-white text-black outline-none px-3 p-1 rounded-2xl flex flex-row items-center justify-center"
                onClick={() => {
                  props.deleteScreenRecorder();
                  setRecordingSendConfirmModal(false);
                }}
              >
                Delete
              </button>
              <button
                className="h-min min-w-max text-sm font-semibold border-none bg-white text-black outline-none px-3 p-1 rounded-2xl flex flex-row items-center justify-center"
                onClick={() => {
                  props.resumeScreenRecorder();
                  setRecordingSendConfirmModal(false);
                }}
              >
                resume
              </button>
              <button
                className="h-min min-w-max text-sm font-semibold border-none bg-white text-black outline-none px-3 p-1 rounded-2xl flex flex-row items-center justify-center"
                onClick={() => {
                  setRecordingSendConfirmModal(false);
                  props.shareScreen();
                  props.sendMessage("approval", "Did you understood my answer");
                }}
              >
                Get approval from {remoteUserData.fullname}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
