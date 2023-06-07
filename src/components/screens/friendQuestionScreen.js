export default function FriendQuestionScreen() {
  
    return (
      <div className="flex text-white flex-col flex-wrap gap-3 justify-center items-center p-2">
        {/* <Buttons>Next</Buttons> */}
        <div className="flex flex-row flex-wrap gap-3 justify-center items-center p-2 font-semibold">
          <span className="text-xl">Question: </span><span className="text-lg">What is closures?</span>
          <button className="text-sm bg-[#222] text-white p-1 px-2 rounded-lg">Solve this question</button>
        </div>
      </div>
    );
  }
  