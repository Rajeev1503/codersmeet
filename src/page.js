// "use client";
// import FriendScreen from "./components/screens/friendScreen";
// import UserScreen from "./components/screens/userScreen";
// import ChatScreen from "./components/screens/chatScreen";
// import { useEffect, useRef, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { io } from "socket.io-client";
// import LeftPanel from "./components/screens/left-panel";
// import ControlsScreen from "./components/screens/controlsScreen";
// import QuestionBar from "./components/screens/questionBar";
// import Peer from "peerjs";

// const ENDPOINT = "http://localhost:8080";
// let socket;
// export default function Home() {
//   const [peerId, setPeerId] = useState("");
//   const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
//   const remoteVideoRef = useRef(null);
//   const currentUserVideoRef = useRef(null);
//   const peerInstance = useRef(null);

//   useEffect(() => {
//     socket()
//   }, []);
//   async function socket(){
//     const peer = new Peer();

//     peer.on("open", (id) => {
//       setPeerId(id);
//     });

//     peer.on("call", async (call) => {
//       var getUserMedia = await navigator.getUserMedia({
//         video: true,
//         audio: true,
//       });

//       currentUserVideoRef.current.srcObject = getUserMedia;
//       currentUserVideoRef.current.play();
//       call.answer(getUserMedia);
//       call.on("stream", function (remoteStream) {
//         remoteVideoRef.current.srcObject = remoteStream;
//         remoteVideoRef.current.play();
//       });
//     });

//     peerInstance.current = peer;
//   }

//   const call = async (remotePeerId) => {
//     var getUserMedia = await navigator.getUserMedia({
//       video: true,
//       audio: true,
//     });

//     currentUserVideoRef.current.srcObject = getUserMedia;
//     currentUserVideoRef.current.play();

//     const call = peerInstance.current.call(remotePeerId, getUserMedia);

//     call.on("stream", (remoteStream) => {
//       remoteVideoRef.current.srcObject = remoteStream;
//       remoteVideoRef.current.play();
//     });
//   };

//   const [friendMaxLayout, setFriendMaxLayout] = useState(false);
//   const [userMaxLayout, setUserMaxLayout] = useState(false);
//   const [showChatBox, setShowChatBox] = useState(true);
//   const [initialLayout, setInitialLayout] = useState(true);

//   function initialLayoutHandler() {
//     if (userMaxLayout || friendMaxLayout) {
//       setInitialLayout(true);
//       setFriendMaxLayout(false);
//       setUserMaxLayout(false);
//       return;
//     } else return;
//   }

//   return (
//     <main className="bg-[#000] h-[100vh] w-full">
//       <div className="h-[6%] flex flex-row justify-between items-center border-b border-[#222] w-full">
//         <QuestionBar />
//       </div>
//       <div className="h-[94%] w-full flex flex-row  ">
//         <div className="w-[4%] h-full border-r border-[#222]">
//           <LeftPanel />
//         </div>
//         <div
//           className={`${
//             showChatBox ? "w-[70%]" : "w-[96%] "
//           } transition-all duration-500 h-full flex flex-col items-center gap-4 border-r border-[#222]`}
//         >
//           <div
//             className={`${
//               showChatBox
//                 ? "w-full"
//                 : friendMaxLayout || userMaxLayout
//                 ? "w-[70%]"
//                 : "w-[90%]"
//             } transition-all duration-500 h-[85%] relative p-4 flex flex-row items-center justify-center`}
//           >
//             <div
//               className={`${
//                 userMaxLayout
//                   ? "cursor-pointer absolute w-64 h-64 bottom-4 right-10 z-10"
//                   : friendMaxLayout
//                   ? "w-full h-full"
//                   : "w-1/2 h-full"
//               } transition-all duration-500 flex flex-row items-center justify-center`}
//               onClick={() => {
//                 setInitialLayout(false);
//                 setFriendMaxLayout(true);
//                 setUserMaxLayout(false);
//               }}
//             >
//               <FriendScreen
//                 socket={{ socket: socket }}
//                 userMaxLayout={userMaxLayout}
//                 friendMaxLayout={friendMaxLayout}
//                 showChatBox={showChatBox}
//                 initialLayout={initialLayout}
//               />
//             </div>
//             <div
//               className={`${
//                 !userMaxLayout
//                   ? !friendMaxLayout
//                     ? "w-1/2 h-full "
//                     : "cursor-pointer absolute w-64 h-64 bottom-4 right-10 z-10"
//                   : "w-full h-full"
//               } transition-all duration-500 flex flex-row items-center justify-center`}
//               onClick={() => {
//                 setInitialLayout(false);
//                 setFriendMaxLayout(false);
//                 setUserMaxLayout(true);
//               }}
//             >
//               <UserScreen
//                 socket={{ socket: socket }}
//                 userMaxLayout={userMaxLayout}
//                 showChatBox={showChatBox}
//                 friendMaxLayout={friendMaxLayout}
//                 initialLayout={initialLayout}
//                 currentUserVideoRef={currentUserVideoRef}
//               />
//             </div>
//           </div>
//           <div className="h-[15%] w-full border-t border-[#222]">
//             <ControlsScreen
//               setShowChatBox={() => setShowChatBox(!showChatBox)}
//               initialLayoutHandler={() => {
//                 initialLayoutHandler();
//               }}
//               nextUserHandler={() => nextUserHandler()}
//             />
//           </div>
//         </div>
//         <div
//           className={`${
//             showChatBox ? "w-[26%]" : "w-0"
//           } overflow-hidden transition-all duration-500 h-full `}
//         >
//           <div className="w-full h-full py-8 px-4">
//             <ChatScreen socket={{ socket: socket }} />
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
