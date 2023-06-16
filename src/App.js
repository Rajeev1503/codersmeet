import { useContext, useEffect, useRef, useState } from "react";
import FriendScreen from "./components/screens/friendScreen";
import UserScreen from "./components/screens/userScreen";
import ControlsScreen from "./components/screens/controlsScreen";
import ChatScreen from "./components/screens/chatScreen";
import peerJsServerConfig from "./assets/peerJsServers";
import Peer from "peerjs";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { userContext } from "./context/user-context";
import UserProfile from "./components/screens/userProfile";
import TopPanel from "./components/screens/top-panel";
import serverUrl from "./assets/serverUrl";
import UserQuestionScreen from "./components/screens/userQuestionScreen";
import FriendQuestionScreen from "./components/screens/friendQuestionScreen";
let peer,
  currentUserId,
  currentRemoteUserId,
  dataConnection,
  mediaConnection,
  localStream,
  screenStream,
  videoTrack,
  screenSharing,
  audioTrack,
  connectionState,
  mediaRecorder,
  recordedData = [];

export default function App() {
  const { userData, setUserData, remoteUserData, setRemoteUserData } =
    useContext(userContext);

  const [cookie,setCookie, removeCookie] = useCookies(["token"]);

  const navigate = useNavigate();

  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const [videoState, setVideoState] = useState(true);
  const [audioState, setAudioState] = useState(true);
  const [screenShareState, setScreenShareState] = useState(false);
  const [currentUserIdState, setCurrentUserId] = useState("");
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (!cookie.token) {
      if (localStream) {
        localStream.getTracks().forEach(function (track) {
          track.stop();
          currentUserVideoRef.current.srcObject = null;
        });
      }
      return navigate("/auth");
    } else {
      return;
    }
  }, [cookie.token]);

  useEffect(() => {
    if (!cookie.token) {
      return;
    }
    getuserMediaHandler();
    peer = new Peer(peerJsServerConfig);

    peer.on("open", (id) => {
      currentUserId = id;
      setCurrentUserId(id);
      pushIdToBackend(id);
    });

    peer.on("call", (call) => {
      if (connectionState) {
        return;
      } else {
        call.answer(localStream);
        if (call.open) {
          connectionState = true;
        }
        dataConnection = peer.connect(call.peer);
        call.on("stream", function (remoteStream) {
          currentRemoteUserId = call.peer;
          getRemoteUserData(call.peer);
          remoteVideoRef.current.srcObject = remoteStream;
        });
        call.on("error", function (err) {
          console.log(err);
        });
      }
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
      conn.on("close", function () {
        currentRemoteUserId = "";
        nextUserHandler();
      });
    });

    window.addEventListener("beforeunload", () => {
      peer.disconnect();
    });
  }, []);

  // peerjs connection functions

  const getuserMediaHandler = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        videoTrack = mediaStream
          .getTracks()
          .find((track) => track.kind === "video");
        audioTrack = mediaStream
          .getTracks()
          .find((track) => track.kind === "audio");
        currentUserVideoRef.current.srcObject = mediaStream;
        localStream = mediaStream;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handlePeerClose() {
    fetch(`${serverUrl}/deleteids`, {
      method: "POST",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentUserId: currentUserId }),
    })
      .then((res) => {
        return res.json;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function pushIdToBackend(id) {
    fetch(`${serverUrl}/user/saveid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookie.token,
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setUserData(response.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const callRemoteUser = async (remotePeerId) => {
    mediaConnection = peer.call(remotePeerId, localStream);
    console.log(mediaConnection.peerConnection);
    dataConnection = peer.connect(remotePeerId);
    mediaConnection.on("stream", (remoteStream) => {
      currentRemoteUserId = remotePeerId;
      connectionState = true;
      getRemoteUserData(remotePeerId);
      remoteVideoRef.current.srcObject = remoteStream;
    });
  };

  function getRemoteUserData(peerId) {
    fetch(`${serverUrl}/user/findbypeer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ peerId }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setRemoteUserData(response.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function nextUserHandler() {
    if (currentRemoteUserId) {
      currentRemoteUserId = "";
      mediaConnection.close();
      dataConnection.close();
    }
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

  const shareScreen = () => {
    if (screenShareState) {
      return stopScreenSharing();
    }

    navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then((stream) => {
        screenStream = stream;
        let videoTrack = screenStream.getVideoTracks()[0];
        videoTrack.onended = () => {
          stopScreenSharing();
        };
        if (peer) {
          let sender = mediaConnection.peerConnection
            .getSenders()
            .find(function (s) {
              return s.track.kind == videoTrack.kind;
            });
          sender.replaceTrack(videoTrack);
          currentUserVideoRef.current.srcObject = videoTrack;
          setScreenShareState(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function stopScreenSharing() {
    if (!screenShareState) return;
    let videoTrack = localStream.getVideoTracks()[0];
    if (peer) {
      let sender = mediaConnection.peerConnection
        .getSenders()
        .find(function (s) {
          return s.track.kind == videoTrack.kind;
        });
      sender.replaceTrack(videoTrack);
    }
    screenStream.getTracks().forEach(function (track) {
      track.stop();
    });

    currentUserVideoRef.current.srcObject = videoTrack;
    setScreenShareState(false);
  }

  function screenRecorderStart() {
    const options = {
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 2500000,
      mimeType: 'video/webm',
    };
    setIsRecording(true);
    console.log("recording");
    mediaRecorder = new MediaRecorder(localStream, options);
    mediaRecorder.start();
    console.log(mediaRecorder)
    mediaRecorder.ondataavailable = (e) => {
      console.log("data")
      console.log(e)
      recordedData.push(e.data);
    };
    mediaRecorder.onstop = () => {
      console.log("stop")
      setIsRecording(false);
      const blob = new Blob(recordedData, {
        type: "video/mp4",
      });
      recordedData = [];

      const RecUrl = URL.createObjectURL(blob);
      currentUserVideoRef.current.controls = true;
      currentUserVideoRef.current.srcObject = RecUrl;
    };
  }

  function screenRecorderStop() {
    mediaRecorder.stop();
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
    if (!currentRemoteUserId) {
      return;
    } else {
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
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileModalData, setProfileModalData] = useState("");

  function initialLayoutHandler() {
    if (userMaxLayout || friendMaxLayout) {
      setInitialLayout(true);
      setFriendMaxLayout(false);
      setUserMaxLayout(false);
      return;
    } else return;
  }

  function showProfileModalHandler(profileType) {
    setShowProfileModal(true);
    if (profileType == "remoteUser") {
      return setProfileModalData(<UserProfile userData={remoteUserData} />);
    } else {
      return setProfileModalData(<UserProfile userData={userData} />);
    }
  }

  return (
    <main className="bg-[#111] h-[100vh] w-full">
      <div className="h-[6%] border-b border-[#222] w-full">
        <TopPanel cookie={cookie} removeCookie={removeCookie} />
      </div>
      <div className="h-[94%] w-full flex flex-row ">
        <div
          className={`${
            showChatBox ? "w-[100%] xl:w-[74%]" : "w-[100%] xl:w-[100%] "
          } transition-all duration-500 h-full flex flex-col items-center gap-4 border-r border-[#222]`}
        >
          <div
            className={`${
              showChatBox
                ? "w-full"
                : friendMaxLayout || userMaxLayout
                ? "w-[90%] xl:w-[74%]"
                : "w-[100%] xl:w-[100%]"
            } transition-all duration-500 h-[92%] relative p-4 flex flex-col md:flex-row gap-1 items-center justify-center`}
          >
            {showProfileModal && (
              <div className="absolute z-50">
                <div
                  className="cursor-pointer absolute top-2 right-3 text-white"
                  onClick={() => setShowProfileModal(false)}
                >
                  x
                </div>
                {profileModalData}
              </div>
            )}
            <div
              className={`${
                userMaxLayout
                  ? "cursor-pointer absolute w-20 xl:w-64 h-64 bottom-5 right-10 z-10"
                  : friendMaxLayout
                  ? "w-full h-full"
                  : "w-full xl:w-1/2 h-full"
              } transition-all duration-500 flex flex-row items-center justify-center`}
            >
              <FriendScreen
                layoutValues={{
                  initialLayout: initialLayout,
                  showChatBox: showChatBox,
                  friendMaxLayout: friendMaxLayout,
                  userMaxLayout: userMaxLayout,
                  setInitialLayout: setInitialLayout,
                  setFriendMaxLayout: setFriendMaxLayout,
                  setUserMaxLayout: setUserMaxLayout,
                }}
                remoteStream={remoteVideoRef}
                currentRemoteUserId={currentRemoteUserId}
                showProfileModalHandler={showProfileModalHandler}
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
            >
              <UserScreen
                layoutValues={{
                  initialLayout: initialLayout,
                  showChatBox: showChatBox,
                  friendMaxLayout: friendMaxLayout,
                  userMaxLayout: userMaxLayout,
                  setInitialLayout: setInitialLayout,
                  setFriendMaxLayout: setFriendMaxLayout,
                  setUserMaxLayout: setUserMaxLayout,
                }}
                localStream={currentUserVideoRef}
                videoState={videoState}
                audioState={audioState}
                currentUserId={currentUserId}
                showProfileModalHandler={showProfileModalHandler}
              />
            </div>
          </div>
          <div className="h-[8%] w-full border-t border-[#222]">
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
              shareScreen={shareScreen}
              screenShareState={screenShareState}
            />
          </div>
        </div>
        <div
          className={`${
            showChatBox ? "hidden xl:flex flex-col gap-2 xl:w-[26%]" : "w-0 "
          } hidden xl:block overflow-hidden transition-all duration-500 h-full `}
        >
          <div className="flex flex-col gap-1 flex-grow max-h-[25%] w-full border-b border-[#222]">
            <div className="py-1 h-1/2 px-2 flex flex-col gap-2 justify-start items-start border-b border-[#222]">
              <span className="text-xs text-[#aaa]">
                Remote user's question
              </span>
              <FriendQuestionScreen
                placeholder="Remote User's question"
                isRecording={isRecording}
                screenRecorderStart={() => screenRecorderStart}
                screenRecorderStop={() => screenRecorderStop}
              />
            </div>
            <div className="py-1 h-1/2 px-2 flex flex-col gap-2 justify-start items-start">
              <span className="text-xs text-[#aaa]">Your question</span>
              <UserQuestionScreen placeholder="Remote User's question" />
            </div>
          </div>
          <div className="max-h-[75%] w-full flex-grow p-4">
            <ChatScreen
              sendMessage={sendMessage}
              messages={messages}
              currentUserId={currentUserIdState}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
