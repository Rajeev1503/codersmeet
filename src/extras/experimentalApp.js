import { useEffect, useReducer, useRef, useState } from "react";
import QuestionBar from "./components/screens/questionBar";
import LeftPanel from "./components/screens/left-panel";
import FriendScreen from "./components/screens/friendScreen";
import UserScreen from "./components/screens/userScreen";
import ControlsScreen from "./components/screens/controlsScreen";
import ChatScreen from "./components/screens/chatScreen";
import peerJsServerConfig from "./assets/peerJsServers";
import Peer from "peerjs";
import Logo from "./components/logo";
// let peer,
//   currentUserId,
//   dataConnection,
//   mediaConnection,
//   localStream,
//   videoTrack,
//   audioTrack;

const serverUrl =
  process.env.NODE_ENV === "development"
    ? "https://codersmeetbackend.vercel.app"
    : "https://codersmeetbackend.vercel.app";

export default function App() {

  function functionsReducer (state, action) {
    console.log("triggered")
    switch (action.type) {
      case'add_peer': {
        console.log("here")
        return {...state, peer: action.payload };
      }
      case 'ADD_DATA_CONNECTION': {
        return {...state, mediaConnection: action.payload };
      }
      case 'ADD_MEDIA_STRESM': {
        return { mediaStream: action.payload };
      }
      case 'ADD_LOCAL_STREAM': {
        return { localStorage: action.payload };
      }
      case 'LOCAL_VIDEO_TRACK': {
        return { localVideoTrack: action.payload };
      }
      case 'LOCAL_AUDIO_TRACK': {
        return { localAudioTrack: action.payload };
      }
      case 'CURRENT_USER_ID': {
        return { currentUserId: action.payload };
      }
      case 'CURRENT_REMOTE_USER_ID': {
        return { currentRemoteUserId: action.payload };
      }
      default:
        return state;
    }
  };

  const initialStates = {
    peer: null,
    dataConnection: null,
    mediaConnection: null,
    localStream: null,
    localVideoTrack: null,
    localAudioTrack: null,
    currentUserId: null,
    currentRemoteUserId: null,
  }

  const [state, dispatch] = useReducer(functionsReducer, initialStates);

  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const [videoState, setVideoState] = useState(true);
  const [audioState, setAudioState] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getuserMediaHandler();
    let peerJs = new Peer(peerJsServerConfig);
    console.log(peerJs)
    dispatch({ type: 'add_peer', payload: peerJs });
    console.log(state)
    state.peer.on("open", (id) => {
      pushIdToBackend(id);
    });

    state.peer.on("call", (call) => {
      call.answer(state.localStream);
      const dataConnection = state.peer.connect(call.peer);
      dispatch({ type: "ADD_DATA_CONNECTION", payload: dataConnection });
      call.on("stream", function (remoteStream) {
        if (remoteStream) {
          
        }
        remoteVideoRef.current.srcObject = remoteStream;
      });
    });

    state.peer.on("disconnected", () => {
      handlePeerClose();
    });

    state.peer.on("connection", function (conn) {
      conn.on("open", function () {
        conn.on("data", function (data) {
          setMessages((prev) => [...prev, data]);
        });
      });
    });

    window.addEventListener("beforeunload", () => {
      state.peer.disconnect();
    });
  }, []);

  // peerjs connection functions

  const getuserMediaHandler = () => {
    try {
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        const videoTrack = mediaStream
          .getTracks()
          .find((track) => track.kind === "video");
        dispatch({ type: "LOCAL_VIDEO_TRACK", payload: videoTrack });
        const audioTrack = mediaStream
          .getTracks()
          .find((track) => track.kind === "audio");
        dispatch({ type: "LOCAL_AUDIO_TRACK", payload: audioTrack });
        currentUserVideoRef.current.srcObject = mediaStream;
        dispatch({ type: "ADD_LOCAL_STREAM", payload: mediaStream });
      });
    } catch (err) {
      console.log(err);
    }
  };

  async function handlePeerClose() {
    fetch(`${serverUrl}/deleteids`, {
      method: "POST",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentUserId: state.currentUserId }),
    })
      .then((res) => {
        return res.json;
      })
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
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        dispatch({ type: "CURRENT_USER_ID", payload: id });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const callRemoteUser = (remotePeerId) => {
    const mediaConnection = state.peer.call(remotePeerId, state.localStream);
    dispatch({ type: "ADD_MEDIA_CONNECTION", payload: mediaConnection });
    const dataConnection = state.peer.connect(remotePeerId);
    dispatch({ type: "ADD_DATA_CONNECTION", payload: dataConnection });
    mediaConnection.on("stream", (remoteStream) => {
      if (remoteStream) {
        dispatch({ type: "CURRENT_REMOTE_USER_ID", payload: remotePeerId });
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
          return e !== state.currentUserId;
        });
        let newIndex = Math.floor(Math.random() * allIdsFiltered.length);
        if (
          state.currentRemoteUserId &&
          allIdsFiltered[newIndex] == state.currentRemoteUserId
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
    if (!state.videoTrack) {
      return;
    } else if (state.videoTrack.enabled) {
      state.videoTrack.enabled = false;
      setVideoState(false);
    } else {
      state.videoTrack.enabled = true;
      setVideoState(true);
    }
  };

  let toggleMic = async () => {
    if (!state.audioTrack) {
      return;
    } else if (state.audioTrack.enabled) {
      state.audioTrack.enabled = false;
      setAudioState(false);
    } else {
      state.audioTrack.enabled = true;
      setAudioState(true);
    }
  };

  const sendMessage = (message) => {
    // Send messages
    if (!state.currentRemoteUserId) {
      return;
    } else {
      const messageData = {
        userId: state.currentUserId,
        message: message,
      };
      setMessages((prev) => [...prev, messageData]);
      state.dataConnection.send(messageData);
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
                currentRemoteUserId={state.currentRemoteUserId}
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
                currentUserId={state.currentUserId}
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
              currentUserId={state.currentUserId}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
