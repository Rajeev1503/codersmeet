export default function UserProfile(props) {
  return (
    <div className="bg-[#111] border-2 border-[#999] overflow-y-scroll h-[80vh] w-[100vw] lg:h-[60vh] lg:w-[60vw] text-white">
      <div className="h-full w-full flex flex-col items-start lg:flex-row gap-2 lg:justify-center p-4">
        <div className="h-full bg-[#141414] w-full lg:w-1/3 flex justify-center items-start">
          <div className="flex flex-col gap-2 justify-start items-start p-4">
            <div className="rounded-full overflow-hidden h-44 w-44 lg:h-72 lg:w-72">
              <img className="bg-gray-800 h-full w-full rounded-full" src="../../../public/userAvatar.webp" />
            </div>
            <br/>
            <div className="flex gap-2 items-center font-semibold"><span className="capitalize text-2xl">{props.userData.fullname}</span>
            <span className="lowercase">(@{props.userData.username})</span></div>
            <div>About: Hello I am a web developer </div>
            <div>Total Upvotes: {props.userData.upvotes}</div>
            {/* <div><span>Teaching Reviews: &#9733;&#9733;&#9733;&#9733;&#9734; </span><span>(1.2k reviews)</span></div> */}
          </div>
        </div>
        <div className="h-full w-full lg:w-2/3 flex flex-col gap-8 justify-start items-start p-4">
          <div className="text-3xl">Achievements</div>
          <div className="text-3xl">Contributions</div>
          {/* <div className="text-3xl">Questions Solved</div> */}
          <div className="text-3xl">Reviews</div>
        </div>
      </div>
    </div>
  );
}
