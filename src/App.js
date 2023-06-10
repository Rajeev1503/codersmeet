import { useEffect, useRef, useState } from "react";
import QuestionBar from "./components/screens/questionBar";
import LeftPanel from "./components/screens/left-panel";
import FriendScreen from "./components/screens/friendScreen";
import UserScreen from "./components/screens/userScreen";
import ControlsScreen from "./components/screens/controlsScreen";
import ChatScreen from "./components/screens/chatScreen";
import peerJsServerConfig from "./assets/peerJsServers";
import Peer from "peerjs";
import Logo from "./components/logo";
let peer, dataConnection, mediaConnection, localStream, videoTrack, audioTrack;

const serverUrl =
  process.env.NODE_ENV === "development"
    ? "https://codersmeetbackend.vercel.app"
    : "https://codersmeetbackend.vercel.app";

export default function Home() {
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const [videoState, setVideoState] = useState(true);
  const [audioState, setAudioState] = useState(true);
  const [currentRemoteUserId, setCurrentRemoteUserId] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getuserMediaHandler();
    peer = new Peer(peerJsServerConfig);
    peer.on("open", (id) => {
      pushIdToBackend(id);
    });

    peer.on("call", (call) => {
      call.answer(localStream);
      dataConnection = peer.connect(call.peer);
      call.on("stream", function (remoteStream) {
        if (remoteStream) {
          setCurrentRemoteUserId(call.peer);
        }
        remoteVideoRef.current.srcObject = remoteStream;
      });
    });

    peer.on("disconnected", () => {
      handlePeerClose();
    });

    peer.on("connection", function (conn) {
      conn.on("open", function () {
        conn.on("data", function (data) {
          setMessages((prev) => [...prev, data]);
        });
      });
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
    });
  };

  async function handlePeerClose() {
    fetch(`${serverUrl}/deleteids`, {
      method: "POST",

      keepalive: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentUserId }),
    })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }

  async function pushIdToBackend(id) {
    fetch(`${serverUrl}/saveids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then(() => {
        setCurrentUserId(id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const callRemoteUser = (remotePeerId) => {
    mediaConnection = peer.call(remotePeerId, localStream);
    dataConnection = peer.connect(remotePeerId);
    mediaConnection.on("stream", (remoteStream) => {
      if (remoteStream) {
        setCurrentRemoteUserId(remotePeerId);
      }
      remoteVideoRef.current.srcObject = remoteStream;
    });
  };

  async function nextUserHandler() {
    fetch(`${serverUrl}/allids`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong");
      })
      .then((allIds) => {
        const allIdsFiltered = allIds.data.filter((e) => {
          return e !== currentUserId;
        });
        let newIndex = Math.floor(Math.random() * allIdsFiltered.length);
        if (
          currentRemoteUserId &&
          allIdsFiltered[newIndex] == currentRemoteUserId
        ) {
          newIndex++;
        }
        callRemoteUser(allIdsFiltered[newIndex]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  let toggleCamera = async () => {
    if (!videoTrack) {
      return;
    } else if (videoTrack.enabled) {
      videoTrack.enabled = false;
      setVideoState(false);
    } else {
      videoTrack.enabled = true;
      setVideoState(true);
    }
  };

  let toggleMic = async () => {
    if (!audioTrack) {
      return;
    } else if (audioTrack.enabled) {
      audioTrack.enabled = false;
      setAudioState(false);
    } else {
      audioTrack.enabled = true;
      setAudioState(true);
    }
  };

  const sendMessage = (message) => {
    // Send messages
    if(!currentRemoteUserId){
      return;
    }
    else{

      const messageData = {
        userId: currentUserId,
        message: message,
      };
      setMessages((prev) => [...prev, messageData]);
      dataConnection.send(messageData);
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
        <div className="w-[4%]">
          <Logo />
        </div>
        <div className="w-[96%]">
          <QuestionBar />
        </div>
      </div>
      <div className="h-[94%] w-full flex flex-row ">
        <div className="hidden xl:block w-0 xl:w-[4%] h-full border-r border-[#222]">
          <LeftPanel />
        </div>
        <div
          className={`${
            showChatBox ? "w-[100%] xl:w-[70%]" : "w-[100%] xl:w-[96%] "
          } transition-all duration-500 h-full flex flex-col items-center gap-4 border-r border-[#222]`}
        >
          <div
            className={`${
              showChatBox
                ? "w-full"
                : friendMaxLayout || userMaxLayout
                ? "w-[90%] xl:w-[70%]"
                : "w-[100%] xl:w-[90%]"
            } transition-all duration-500 h-[90%] relative p-4 flex flex-col xl:flex-row items-center justify-center`}
          >
            <div
              className={`${
                userMaxLayout
                  ? "cursor-pointer absolute w-20 xl:w-64 h-64 bottom-5 right-10 z-10"
                  : friendMaxLayout
                  ? "w-full h-full"
                  : "w-full xl:w-1/2 h-full"
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
                currentRemoteUserId={currentRemoteUserId}
              />
            </div>
            <div
              className={`${
                !userMaxLayout
                  ? !friendMaxLayout
                    ? "w-full xl:w-1/2 h-full "
                    : "cursor-pointer absolute w-20 xl:w-64 h-64 bottom-5 right-10 z-10"
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
                videoState={videoState}
                audioState={audioState}
                currentUserId={currentUserId}
              />
            </div>
          </div>
          <div className="h-[10%] w-full border-t border-[#222]">
            <ControlsScreen
              setShowChatBox={() => setShowChatBox(!showChatBox)}
              initialLayoutHandler={() => {
                initialLayoutHandler();
              }}
              nextUserHandler={() => nextUserHandler()}
              videoState={videoState}
              audioState={audioState}
              toggleCamera={() => toggleCamera()}
              toggleMic={() => toggleMic()}
            />
          </div>
        </div>
        <div
          className={`${
            showChatBox ? "hidden xl:block xl:w-[26%]" : "w-0"
          } hidden xl:block overflow-hidden transition-all duration-500 h-full `}
        >
          <div className="w-full h-full py-8 px-4">
            <ChatScreen
              sendMessage={sendMessage}
              messages={messages}
              currentUserId={currentUserId}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
