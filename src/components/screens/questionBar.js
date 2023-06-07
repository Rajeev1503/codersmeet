// import { useState } from "react";

export default function QuestionBar() {
  // const [questionInputValue, setQuestionInputValue] = useState();

  function inputBoxSubmitHandler(e) {
    e.preventDefault();
    // setQuestionInputValue(e.target.elements.questionInput.value);
    e.target.elements.questionInput.blur();
  }

  return (
    <div className="h-full w-full">
      <form
        className="h-full w-full p-2 flex flex-row justify-center items-center"
        onSubmit={(e) => inputBoxSubmitHandler(e)}
      >
        <input
          name="questionInput"
          autoComplete="off"
          className="h-full w-1/2 text-white font-semibold bg-transparent rounded-full px-4 outline-none"
          placeholder="Enter Your question"
        />
      </form>
    </div>
  );
}
