// import { useState } from "react";

import { BiRightArrowAlt } from "react-icons/bi";

export default function QuestionBar() {

  function inputBoxSubmitHandler(e) {
    e.preventDefault();
    e.target.elements.questionInput.blur();
  }

  return (
    <div className="h-full w-full flex flex-row justify-center">
      <button className="min-w-max text-sm font-semibold border-none bg-white outline-none px-3 p-1 rounded-2xl flex flex-row gap-2 items-center justify-center">Answer This Question <BiRightArrowAlt /></button>
      <form
        className="h-full w-[80%] p-2 flex flex-row justify-start items-center"
        onSubmit={(e) => inputBoxSubmitHandler(e)}
      >
        <input
          name="questionInput"
          autoComplete="off"
          className="h-full xl:w-1/2 w-full text-white font-semibold bg-transparent rounded-full px-4 outline-none"
          placeholder="Enter Your question"
        />
      </form>
    </div>
  );
}
