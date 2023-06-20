import { FiSend } from "react-icons/fi";

export default function ChatScreen(props) {
  const sendMessageHandler = (e) => {
    e.preventDefault();
    props.sendMessage("message",e.target.messageInput.value);
    e.target.messageInput.value = ''
  };

  console.log(props?.messages)

  return (
    <div className="h-full flex flex-col justify-end px-4">
      {props.messages.length == 0 ? (
        <div className="w-full h-full flex flex-row justify-center items-center text-xl text-white">
          Start messaging
        </div>
      ) : (
        <div className="h-full w-full overflow-y-scroll">
          <div className="relative flex flex-col first:mt-auto h-full w-full text-white py-2">
            {props.messages.map((message, i) => {
              const currentuser = message.userId == props.currentUserId;
              return (
                <div
                  key={i}
                  className={`relative bottom-0 w-full flex flex-row ${
                    currentuser ? "justify-end" : "justify-start"
                  } text-white`}
                >
                  <div
                    className={`max-w-max flex flex-row gap-2 ${
                      currentuser ? "bg-blue-500" : "bg-[#262629]"
                    } rounded-lg my-2 py-1 px-4 `}
                  >
                    <div className="text-[0.95rem]">
                      <div>{message.message}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <form
        className="flex flex-row items-center gap-2"
        onSubmit={(e) => {
          sendMessageHandler(e);
        }}
      >
        <div className="flex flex-row items-center text-white w-full bg-transparent border-2 border-[#222] rounded-lg p-2 font-semibold">
          <input
            name="messageInput"
            autoComplete="off"
            className="w-[95%] text-white px-3 outline-none bg-transparent data-[auto-complete]:bg-transparent"
            placeholder="Type your message"
          />
          <button type="onSubmit" className="w-[5%]">
            <FiSend />
          </button>
        </div>
      </form>
    </div>
  );
}
