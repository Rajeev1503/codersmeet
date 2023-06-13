import { useContext, useEffect } from "react"
import { userContext } from "../../context/user-context"

export default function UserProfile(props) {

    return (
        <div className="bg-[#111] border border-[#222]  h-[60vh] w-[60vw] text-white">
            <div className="h-full w-full flex flex-row gap-2 justify-center">
                <div className="bg-[#222] w-1/3 flex flex-col gap-2 justify-start items-center p-4">
                    <div className="self-center rounded-full"><div className="bg-gray-800 h-72 w-72 rounded-full" src=""/></div>
                    <div className="capitalize text-2xl">{props.userData.fullname}</div>
                    <div className="lowercase">{props.userData.username}</div>
                    <div>Total Upvotes: {props.userData.upvotes}</div>
                </div>
                <div className="w-2/3 flex flex-col gap-8 justify-start items-start p-4">
                    <div className="text-3xl">Achievements</div>
                    <div className="text-3xl">Contributions</div>
                    <div className="text-3xl">Questions Solved</div>
                    <div className="text-3xl">Reviews</div>
                </div>
            </div>
        </div>
    )
}