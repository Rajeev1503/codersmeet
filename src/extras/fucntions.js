// let socket, peerConnection;

// const [searchParams, setSearchParams] = useSearchParams();
// let user = searchParams.get("user");
// let remoteUser = searchParams.get("remoteuser");
// const servers = {
//   iceServers: [
//     {
//       urls: [
//         "stun:stun1.1.google.com:19302",
//         "stun:stun2.1.google.com:19302",
//       ],
//     },
//   ],
// };

// useEffect(() => {
//   peerConnection = new RTCPeerConnection(servers);
//   console.log(peerConnection);
//   socket = io(ENDPOINT);
//   socket.on("connect", () => {
//     if (socket.connected) {
//       return socket.emit("userconnect", { Name: user, userId: user });
//     }
//   });
//   socket.on("receiveoffer", (data) => {
//     console.log("receive offer");
//     createAnswer(data);
//   });

//   socket.on("ReceiveAnswer", (data) => {
//     addAnswer(data);
//   });
// }, []);

// async function createOffer() {
//   let offer = await peerConnection.createOffer();
//   await peerConnection.setLocalDescription(offer);
//   console.log("offer sent");
//   socket.emit("offerSentToRemote", {
//     hostuser: user,
//     remoteUser: remoteUser,
//     offer: peerConnection.localDescription,
//   });
// }

// async function createAnswer(data) {
//   console.log(remoteUser)
//   console.log("data: "+ data)
//   await peerConnection.setRemoteDescription(data.offer);
//   let answer = await peerConnection.createAnswer();
//   socket.emit("answerSentToUser1", {
//     answer: answer,
//     sender: data.remoteUser,
//     receiver: data.hostuser,
//   });
// }

// async function addAnswer(data) {
//   if (!peerConnection.currentRemoteDescription) {
//     peerConnection.setRemoteDescription(data.answer);
//   }
// }

// function nextUserHandler() {
//   createOffer();
// }