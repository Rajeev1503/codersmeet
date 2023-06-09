import QuestionBar from "./components/screens/questionBar";
import LeftPanel from "./components/screens/left-panel";
import FriendScreen from "./components/screens/friendScreen";
import UserScreen from "./components/screens/userScreen";
import ControlsScreen from "./components/screens/controlsScreen";
import ChatScreen from "./components/screens/chatScreen";
import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
let peer,
  currentUserId,
  currentRemoteUserId,
  randomRemoteUserId,
  mediaConnection,
  localStream,
  videoTrack,
  audioTrack;

  const peerJsServerConfig = {
    config: {
      iceServers: [
        { url: "stun:stun.l.google.com:19302" },
        {
          urls: "stun:a.relay.metered.ca:80",
        },
        {
          urls: "turn:a.relay.metered.ca:80",
          username: "80f2af5598002ac9a80cc167",
          credential: "jo5Km/7SHDPnJ/0S",
        },
        {
          urls: "turn:a.relay.metered.ca:80?transport=tcp",
          username: "80f2af5598002ac9a80cc167",
          credential: "jo5Km/7SHDPnJ/0S",
        },
        {
          urls: "turn:a.relay.metered.ca:443",
          username: "80f2af5598002ac9a80cc167",
          credential: "jo5Km/7SHDPnJ/0S",
        },
        {
          urls: "turn:a.relay.metered.ca:443?transport=tcp",
          username: "80f2af5598002ac9a80cc167",
          credential: "jo5Km/7SHDPnJ/0S",
        },
      ],
    },
  }
const serverUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://codersmeetbackend.vercel.app";

export default function Home() {
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);

  useEffect(() => {
    getuserMediaHandler();
    peer = new Peer(peerJsServerConfig);
    peer.on("open", (id) => {
      currentUserId = id;
      pushIdToBackend(id);
    });

    peer.on("call", (call) => {
      call.answer(localStream);
      call.on("stream", function (remoteStream) {
        remoteVideoRef.current.srcObject = remoteStream;
      });
      call.on("close", function () {
        console.log("media stream trigger");
      });
    });

    peer.on("disconnected", () => {
      handlePeerClose();
    });

    window.addEventListener("beforeunload", () => {
      peer.disconnect();
    });
  }, []);

  // peerjs connection functions

  const getuserMediaHandler = () => {
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      videoTrack = mediaStream
        .getTracks()
        .find((track) => track.kind === "video");
      audioTrack = mediaStream
        .getTracks()
        .find((track) => track.kind === "audio");
      currentUserVideoRef.current.srcObject = mediaStream;
      localStream = mediaStream;
      console.log(audioTrack)
      console.log(localStream.getTracks())
    });
  };

  async function handlePeerClose() {
    try {
      const response = await fetch(`${serverUrl}/deleteids`, {
        method: "POST",

        keepalive: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentUserId }),
      });
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  async function pushIdToBackend(id) {
    try {
      const response = await fetch(`${serverUrl}/saveids`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  const callRemoteUser = (remotePeerId) => {
    currentRemoteUserId = remotePeerId;
    mediaConnection = peer.call(remotePeerId, localStream);
    mediaConnection.on("stream", (remoteStream) => {
      remoteVideoRef.current.srcObject = remoteStream;
    });
  };

  async function nextUserHandler() {
    const response = await fetch(`${serverUrl}/allids`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const allIds = await response.json();
    const allIdsFiltered = allIds.data.filter((e) => {
      return e !== currentUserId;
    });

    const arrLength = allIdsFiltered.length;
    const randomRemoteUserIdGenerator = () => {
      return (randomRemoteUserId =
        allIdsFiltered[Math.floor(Math.random() * arrLength)]);
    };
    if (!currentRemoteUserId) {
      randomRemoteUserIdGenerator();
    } else {
      do {
        randomRemoteUserIdGenerator();
      } while (randomRemoteUserId == currentRemoteUserId);
    }
    callRemoteUser(randomRemoteUserId);
  }

  let toggleCamera = async () => {
    if (!videoTrack) {
      return;
    } else if (videoTrack.enabled) {
      videoTrack.enabled = false;
    } else {
      videoTrack.enabled = true;
    }
  };

  let toggleMic = async () => {
    if (!audioTrack) {
      console.log("returned")
      return;
    } else if (audioTrack.enabled) {
      audioTrack.enabled = false;
    } else {
      audioTrack.enabled = true;
    }
  };

  // component functions and variables

  const [friendMaxLayout, setFriendMaxLayout] = useState(false);
  const [userMaxLayout, setUserMaxLayout] = useState(false);
  const [showChatBox, setShowChatBox] = useState(true);
  const [initialLayout, setInitialLayout] = useState(true);

  function initialLayoutHandler() {
    if (userMaxLayout || friendMaxLayout) {
      setInitialLayout(true);
      setFriendMaxLayout(false);
      setUserMaxLayout(false);
      return;
    } else return;
  }

  return (
    <main className="bg-[#000] h-[100vh] w-full">
      <div className="h-[6%] flex flex-row justify-between items-center border-b border-[#222] w-full">
        <QuestionBar />
        {/* <div className="text-white">{currentUserId}</div> */}
      </div>
      <div className="h-[94%] w-full flex flex-row  ">
        <div className="w-[4%] h-full border-r border-[#222]">
          <LeftPanel />
        </div>
        <div
          className={`${
            showChatBox ? "w-[70%]" : "w-[96%] "
          } transition-all duration-500 h-full flex flex-col items-center gap-4 border-r border-[#222]`}
        >
          <div
            className={`${
              showChatBox
                ? "w-full"
                : friendMaxLayout || userMaxLayout
                ? "w-[70%]"
                : "w-[90%]"
            } transition-all duration-500 h-[85%] relative p-4 flex flex-row items-center justify-center`}
          >
            <div
              className={`${
                userMaxLayout
                  ? "cursor-pointer absolute w-64 h-64 bottom-4 right-10 z-10"
                  : friendMaxLayout
                  ? "w-full h-full"
                  : "w-1/2 h-full"
              } transition-all duration-500 flex flex-row items-center justify-center`}
              onClick={() => {
                setInitialLayout(false);
                setFriendMaxLayout(true);
                setUserMaxLayout(false);
              }}
            >
              <FriendScreen
                userMaxLayout={userMaxLayout}
                friendMaxLayout={friendMaxLayout}
                showChatBox={showChatBox}
                initialLayout={initialLayout}
                remoteStream={remoteVideoRef}
              />
            </div>
            <div
              className={`${
                !userMaxLayout
                  ? !friendMaxLayout
                    ? "w-1/2 h-full "
                    : "cursor-pointer absolute w-64 h-64 bottom-4 right-10 z-10"
                  : "w-full h-full"
              } transition-all duration-500 flex flex-row items-center justify-center`}
              onClick={() => {
                setInitialLayout(false);
                setFriendMaxLayout(false);
                setUserMaxLayout(true);
              }}
            >
              <UserScreen
                userMaxLayout={userMaxLayout}
                showChatBox={showChatBox}
                friendMaxLayout={friendMaxLayout}
                initialLayout={initialLayout}
                localStream={currentUserVideoRef}
              />
            </div>
          </div>
          <div className="h-[15%] w-full border-t border-[#222]">
            <ControlsScreen
              setShowChatBox={() => setShowChatBox(!showChatBox)}
              initialLayoutHandler={() => {
                initialLayoutHandler();
              }}
              nextUserHandler={() => nextUserHandler()}
              toggleCamera={() => toggleCamera()}
              toggleMic={() => toggleMic()}
            />
          </div>
        </div>
        <div
          className={`${
            showChatBox ? "w-[26%]" : "w-0"
          } overflow-hidden transition-all duration-500 h-full `}
        >
          <div className="w-full h-full py-8 px-4">
            <ChatScreen />
          </div>
        </div>
      </div>
    </main>
  );
}
