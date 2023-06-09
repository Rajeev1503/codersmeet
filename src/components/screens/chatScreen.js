import { FiSend } from "react-icons/fi";

export default function ChatScreen() {
    return (
        <div className="h-full flex flex-col justify-end px-4">
            {/* messages */}
            <div>
                <div className="relative flex flex-col h-full w-full text-white py-8">
                    <div
                        className={`relative bottom-0 w-full flex flex-row justify-start text-white float-left clear-right`}
                    >
                        <div className="max-w-max flex flex-row gap-2 bg-[#262629] rounded-lg my-2 py-1 px-4 ">
                            <div className="text-[0.95rem]">
                                <div>Hello</div>
                            </div>
                            <div className="flex gap-2 min-w-max">
                                <div className="text-[0.65rem] self-end text-white text-opacity-70 text-right">
                                    10:00pm
                                </div>
                                <div className="self-end text-white text-opacity-70">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`relative bottom-0 full flex flex-row justify-end text-white float-right clear-left `}
                    >
                        <div
                            className="max-w-max flex flex-row gap-2 bg-[#1c72e9] rounded-lg my-2 py-1 px-4"
                        >
                            <div className="text-[0.95rem]">
                                <div>Hello</div>
                            </div>
                            <div className="flex gap-2 min-w-max">
                                <div className="text-[0.65rem] self-end text-white text-opacity-70 text-right">
                                    11:00pm
                                </div>
                                <div className="self-end text-white text-opacity-70">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form className="flex flex-row items-center gap-2">

                <div className="flex flex-row items-center text-white w-full bg-transparent border-2 border-[#222] rounded-lg p-2 font-semibold">

                    <input
                        className="w-[95%] px-3 outline-none bg-transparent"
                        placeholder="Type your message" />
                    <div className="w-[5%]">
                        <FiSend />
                    </div>
                </div>
            </form>
        </div>
    )
}